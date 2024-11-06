import { Element, Zone } from '../types';

export interface DBOrganization {
  id: string;
  name: string;
  plan: 'free' | 'basic' | 'premium';
  maxHouses: number;
  maxUsersPerHouse: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface DBHouse {
  id: string;
  organizationId: string;
  name: string;
  address?: string;
  adminId: string;
  maxRooms: number;
  maxZones: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface DBRoom {
  id: string;
  houseId: string;
  element: Element;
  currentZone: Zone;
  users: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DBUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'superadmin' | 'admin' | 'user';
  organizationId?: string;
  houseId?: string;
  room?: Element;
  isActive: boolean;
  createdAt: Date;
  lastLogin: Date;
}

export interface DBTask {
  id: string;
  houseId: string;
  description: string;
  zone: Zone;
  completed: boolean;
  assignedTo?: string;
  completedBy?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export interface DBZone {
  id: string;
  houseId: string;
  name: Zone;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DBSuggestion {
  id: string;
  houseId: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  status: 'pending' | 'approved' | 'implemented' | 'rejected';
  createdAt: Date;
  updatedAt?: Date;
}

export interface DBSettings {
  id: string;
  userId: string;
  houseId: string;
  emailNotifications: boolean;
  weeklyDigest: boolean;
  taskReminders: boolean;
  theme: 'light' | 'dark';
  language: 'es' | 'en';
  createdAt: Date;
  updatedAt: Date;
}

export interface DBSubscription {
  id: string;
  organizationId: string;
  plan: 'free' | 'basic' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}