import { createPool } from '../src/config/database';
import { readFileSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcrypt';

async function initializeDatabase() {
  const pool = createPool();
  
  try {
    const conn = await pool.getConnection();
    console.log('Connected to database successfully');

    // Read and execute schema
    const schema = readFileSync(join(__dirname, '../database/schema.sql'), 'utf8');
    const statements = schema.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await conn.query(statement);
      }
    }

    // Create superadmin if not exists
    const hashedPassword = await bcrypt.hash('CO2020sol@', 10);
    await conn.query(`
      INSERT IGNORE INTO users (
        id, email, password, name, role, is_active
      ) VALUES (
        UUID(), 
        'info@cleaningelements.com',
        ?,
        'Super Admin',
        'superadmin',
        true
      )
    `, [hashedPassword]);

    console.log('Database initialized successfully');
    conn.release();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

initializeDatabase().catch(console.error);