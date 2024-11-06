import { testConnection } from '../src/config/database';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  try {
    console.log('Testing database connection...');
    console.log('Database configuration:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER
    });
    
    const success = await testConnection();
    
    if (success) {
      console.log('✅ Database connection test successful');
      process.exit(0);
    } else {
      console.log('❌ Database connection test failed');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch(console.error);