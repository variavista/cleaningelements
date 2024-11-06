import { db } from './database';
import { DBUser } from '../db/schema';
import bcrypt from 'bcrypt';

export const authService = {
  async login(email: string, password: string): Promise<DBUser> {
    const user = await db.getOne<DBUser>(
      'SELECT * FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (!user.is_active) {
      throw new Error('Usuario desactivado');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }

    // Update last login
    await db.query(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Don't return the password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as DBUser;
  },

  async register(userData: Partial<DBUser>): Promise<DBUser> {
    // Check if email exists
    const existingUser = await db.getOne<DBUser>(
      'SELECT id FROM users WHERE email = ?',
      [userData.email!.toLowerCase()]
    );

    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password!, 10);

    // Create user
    const id = crypto.randomUUID();
    await db.query(
      `INSERT INTO users (
        id, email, password, name, role, is_active, created_at, last_login
      ) VALUES (?, ?, ?, ?, ?, true, NOW(), NOW())`,
      [
        id,
        userData.email!.toLowerCase(),
        hashedPassword,
        userData.name || userData.email!.split('@')[0],
        userData.role || 'user'
      ]
    );

    // Get created user
    const newUser = await db.getOne<DBUser>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    if (!newUser) {
      throw new Error('Error creating user');
    }

    // Don't return the password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword as DBUser;
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await db.getOne<DBUser>(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Contraseña actual incorrecta');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );
  }
};