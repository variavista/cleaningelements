import { db } from './database';
import { DBUser } from '../db/schema';
import bcrypt from 'bcrypt';

export const userService = {
  async findByEmail(email: string): Promise<DBUser | null> {
    return await db.getOne(
      'SELECT * FROM users WHERE email = ?',
      [email.toLowerCase()]
    );
  },

  async create(user: Partial<DBUser>): Promise<string> {
    const hashedPassword = await bcrypt.hash(user.password!, 10);
    const id = crypto.randomUUID();

    await db.query(
      `INSERT INTO users (id, email, password, name, role, is_active, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [id, user.email!.toLowerCase(), hashedPassword, user.name, user.role || 'user', true]
    );

    return id;
  },

  async update(id: string, changes: Partial<DBUser>): Promise<void> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(changes).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) return;

    values.push(id);
    await db.query(
      `UPDATE users SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
  },

  async updateLastLogin(id: string): Promise<void> {
    await db.query(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [id]
    );
  },

  async delete(id: string): Promise<void> {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  },

  async findById(id: string): Promise<DBUser | null> {
    return await db.getOne('SELECT * FROM users WHERE id = ?', [id]);
  },

  async list(organizationId?: string): Promise<DBUser[]> {
    if (organizationId) {
      return await db.query(
        'SELECT * FROM users WHERE organization_id = ? ORDER BY created_at DESC',
        [organizationId]
      );
    }
    return await db.query('SELECT * FROM users ORDER BY created_at DESC');
  }
};