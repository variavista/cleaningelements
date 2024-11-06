import { getPool } from '../config/database';

export const db = {
  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    return rows as T[];
  },

  async getOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    const results = rows as T[];
    return results.length > 0 ? results[0] : null;
  },

  async transaction<T>(callback: (connection: any) => Promise<T>): Promise<T> {
    const pool = getPool();
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};