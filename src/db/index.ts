import { db } from './config';

export { db };

const initializeDatabase = async () => {
  try {
    await db.open();
    await db.initialize();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

initializeDatabase();