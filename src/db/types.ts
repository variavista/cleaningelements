import { Element, Zone } from '../types';

export interface DBUser {
  id?: number;
  email: string;
  password: string;
  room: Element;
  isAdmin: boolean;
  createdAt: Date;
}

export interface DBZone {
  id?: number;
  name: Zone;
  assignedTo: Element;
  createdAt: Date;
}

export interface DBTask {
  id?: number;
  description: string;
  zoneName: Zone;
  completed: boolean;
  createdAt: Date;
}

export interface DBUserSettings {
  id?: number;
  userId: number;
  emailNotifications: boolean;
  weeklyDigest: boolean;
  taskReminders: boolean;
  language: 'es' | 'en';
  createdAt: Date;
}