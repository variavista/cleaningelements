import { db } from './database';
import { DBOrganization } from '../db/schema';

export const organizationService = {
  async create(org: Partial<DBOrganization>): Promise<string> {
    const id = crypto.randomUUID();

    await db.query(
      `INSERT INTO organizations (
        id, name, admin_email, max_rooms, max_zones, max_users,
        current_rooms, current_zones, current_users, is_active, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0, true, NOW())`,
      [id, org.name, org.admin_email, org.max_rooms, org.max_zones, org.max_users]
    );

    return id;
  },

  async update(id: string, changes: Partial<DBOrganization>): Promise<void> {
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
      `UPDATE organizations SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
  },

  async delete(id: string): Promise<void> {
    await db.transaction(async (connection) => {
      // Eliminar registros relacionados
      await connection.execute('DELETE FROM rooms WHERE organization_id = ?', [id]);
      await connection.execute('DELETE FROM zones WHERE organization_id = ?', [id]);
      await connection.execute('DELETE FROM tasks WHERE organization_id = ?', [id]);
      await connection.execute('DELETE FROM settings WHERE organization_id = ?', [id]);
      // Finalmente eliminar la organización
      await connection.execute('DELETE FROM organizations WHERE id = ?', [id]);
    });
  },

  async findById(id: string): Promise<DBOrganization | null> {
    return await db.getOne('SELECT * FROM organizations WHERE id = ?', [id]);
  },

  async findByAdminEmail(email: string): Promise<DBOrganization | null> {
    return await db.getOne(
      'SELECT * FROM organizations WHERE admin_email = ?',
      [email.toLowerCase()]
    );
  },

  async list(): Promise<DBOrganization[]> {
    return await db.query('SELECT * FROM organizations ORDER BY created_at DESC');
  },

  async incrementUsers(id: string): Promise<void> {
    await db.query(
      'UPDATE organizations SET current_users = current_users + 1 WHERE id = ?',
      [id]
    );
  },

  async decrementUsers(id: string): Promise<void> {
    await db.query(
      'UPDATE organizations SET current_users = current_users - 1 WHERE id = ?',
      [id]
    );
  }
};