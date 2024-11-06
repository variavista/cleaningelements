import Dexie from 'dexie';
import { DBUser, DBTask, DBZone, DBRoom, DBSuggestion, DBSettings, DBSubscription, DBOrganization } from './schema';
import { initialRooms } from './initial-data';

export class CleaningElementsDB extends Dexie {
  users!: Dexie.Table<DBUser, string>;
  tasks!: Dexie.Table<DBTask, string>;
  zones!: Dexie.Table<DBZone, string>;
  rooms!: Dexie.Table<DBRoom, string>;
  suggestions!: Dexie.Table<DBSuggestion, string>;
  settings!: Dexie.Table<DBSettings, string>;
  subscriptions!: Dexie.Table<DBSubscription, string>;
  organizations!: Dexie.Table<DBOrganization, string>;

  constructor() {
    super('CleaningElementsDB');
    
    this.version(1).stores({
      users: 'id, email, role, organizationId',
      tasks: 'id, zone, completed, organizationId',
      zones: 'id, name, organizationId',
      rooms: 'id, element, organizationId',
      suggestions: 'id, author, status, organizationId',
      settings: 'id, userId, organizationId',
      subscriptions: 'id, organizationId, plan, status',
      organizations: 'id, adminEmail'
    });

    // Add hooks
    this.users.hook('creating', function (primKey, obj, trans) {
      obj.createdAt = new Date();
      return obj;
    });

    this.rooms.hook('creating', function (primKey, obj, trans) {
      if (!obj.id) obj.id = crypto.randomUUID();
      return obj;
    });
  }

  async initialize() {
    try {
      const roomCount = await this.rooms.count();
      if (roomCount === 0) {
        await this.rooms.bulkAdd(initialRooms);
      }

      // Create superadmin if not exists
      const superadmin = await this.users.where('email').equals('info@cleaningelements.com').first();
      if (!superadmin) {
        await this.users.add({
          id: crypto.randomUUID(),
          email: 'info@cleaningelements.com',
          password: 'CO2020sol@', // En producción usar hash
          name: 'Super Admin',
          role: 'superadmin',
          isActive: true,
          createdAt: new Date(),
          lastLogin: new Date()
        });
      }

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error in database initialization:', error);
      throw error;
    }
  }
}

export const db = new CleaningElementsDB();