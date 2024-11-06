import { Room, Element, Zone } from '../types';
import { PlanLimits } from '../types/subscription';

export const planLimits: PlanLimits = {
  starter: {
    maxRooms: 2,
    maxZones: 3,
    maxUsers: 5,
    price: 9.99,
    name: 'Starter',
    description: 'Ideal para casas pequeñas',
    features: [
      'Hasta 2 habitaciones',
      'Hasta 3 zonas',
      'Hasta 5 usuarios',
      'Rotación automática',
      'Soporte básico'
    ]
  },
  basic: {
    maxRooms: 5,
    maxZones: 5,
    maxUsers: 10,
    price: 19.99,
    name: 'Basic',
    description: 'Perfecto para casas medianas',
    features: [
      'Hasta 5 habitaciones',
      'Hasta 5 zonas',
      'Hasta 10 usuarios',
      'Rotación automática',
      'Soporte prioritario',
      'Estadísticas avanzadas'
    ]
  },
  professional: {
    maxRooms: 10,
    maxZones: 10,
    maxUsers: 20,
    price: 49.99,
    name: 'Professional',
    description: 'Para casas grandes',
    features: [
      'Hasta 10 habitaciones',
      'Hasta 10 zonas',
      'Hasta 20 usuarios',
      'Rotación automática',
      'Soporte 24/7',
      'Estadísticas avanzadas',
      'API de integración'
    ]
  },
  enterprise: {
    maxRooms: -1, // Ilimitado
    maxZones: -1, // Ilimitado
    maxUsers: -1, // Ilimitado
    price: 99.99,
    name: 'Enterprise',
    description: 'Para grandes organizaciones',
    features: [
      'Habitaciones ilimitadas',
      'Zonas ilimitadas',
      'Usuarios ilimitados',
      'Rotación automática',
      'Soporte dedicado 24/7',
      'Estadísticas avanzadas',
      'API de integración',
      'Personalización completa',
      'Onboarding personalizado'
    ]
  }
};

export const initialRooms: Partial<Room>[] = [
  {
    id: crypto.randomUUID(),
    element: 'Agua' as Element,
    currentZone: 'Cocina' as Zone,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    element: 'Aire' as Element,
    currentZone: 'Terraza' as Zone,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    element: 'Fuego' as Element,
    currentZone: 'Azotea' as Zone,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    element: 'Tierra' as Element,
    currentZone: 'Pasillos' as Zone,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: crypto.randomUUID(),
    element: 'Éter' as Element,
    currentZone: 'Escaleras' as Zone,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];