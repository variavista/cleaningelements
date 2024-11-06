import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool: mysql.Pool;

export const createPool = () => {
  if (!pool) {
    const config = {
      host: process.env.DB_HOST || 'cleaningelements.com',
      port: Number(process.env.DB_PORT) || 3306,
      database: process.env.DB_NAME || 'cleaningelements',
      user: process.env.DB_USER || 'cleaningelements',
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: false
      }
    };

    console.log('Creating database pool with config:', {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user
    });

    pool = mysql.createPool(config);
  }
  return pool;
};

export const getPool = () => {
  if (!pool) {
    createPool();
  }
  return pool;
};

export const testConnection = async () => {
  try {
    console.log('Testing database connection...');
    const connection = await getPool().getConnection();
    console.log('Successfully connected to database');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error);
    return false;
  }
};