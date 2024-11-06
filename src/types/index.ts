// Update the Element type to include all possible values
export type Element = 
  | 'Agua' 
  | 'Aire' 
  | 'Fuego' 
  | 'Tierra' 
  | 'Éter'
  | 'Nube'
  | 'Océano'
  | 'Luz'
  | 'Bosque'
  | 'Rayo'
  | 'Sol'
  | 'Luna'
  | 'Hielo'
  | 'Arcoíris'
  | 'Corazón'
  | 'Cristal'
  | 'Flor'
  | 'Jade'
  | 'Tierra Fértil'
  | 'Aroma';

export type Zone = 'Libre' | 'Cocina' | 'Terraza' | 'Azotea' | 'Pasillos' | 'Escaleras';

export type UserRole = 'superadmin' | 'admin' | 'user';

export interface Room {
  id: string;
  element: Element;
  currentZone: Zone;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  room?: Element;
  isActive: boolean;
  createdAt?: Date;
  lastLogin?: Date;
}

export interface Organization {
  id: string;
  name: string;
  adminEmail: string;
  subscriptionId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  maxRooms: number;
  maxZones: number;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  description: string;
  zone: Zone;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  status: 'pending' | 'approved' | 'implemented' | 'rejected';
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserSettings {
  id?: string;
  userId: string;
  emailNotifications: boolean;
  weeklyDigest: boolean;
  taskReminders: boolean;
  theme: 'light' | 'dark';
  createdAt?: Date;
  updatedAt?: Date;
}