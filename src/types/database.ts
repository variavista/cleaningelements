import { Element, Zone } from './index';

export interface DBUser {
  id?: string;
  email: string;
  password: string; // Stored as hash
  room: Element;
  isAdmin: boolean;
  createdAt: Date;
  lastLogin: Date;
}

export interface DBTask {
  id?: string;
  description: string;
  zone: Zone;
  completed: boolean;
  assignedTo: string; // User ID
  completedBy?: string; // User ID
  completedAt?: Date;
  createdAt: Date;
}

export interface DBZone {
  name: Zone;
  currentRoom: Element;
  lastRotation: Date;
  nextRotation: Date;
}

export interface DBRotation {
  id?: string;
  week: number;
  year: number;
  assignments: Record<Element, Zone>;
  startDate: Date;
  endDate: Date;
}

export interface DBSettings {
  id?: string;
  userId: string;
  theme: 'light' | 'dark';
  emailNotifications: boolean;
  taskReminders: boolean;
  language: 'es' | 'en';
}

export interface DBSystemSettings {
  id?: string;
  rotationDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  backupEnabled: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  maintenanceMode: boolean;
  lastBackup?: Date;
}