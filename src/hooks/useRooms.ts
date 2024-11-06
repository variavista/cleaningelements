import { useState } from 'react';
import { db } from '../db/config';
import { Room } from '../types';

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const getRooms = async () => {
    return await db.rooms.toArray();
  };

  const getRoomByElement = async (element: string) => {
    return await db.rooms.get(element);
  };

  const updateRoom = async (element: string, changes: Partial<Room>) => {
    return await db.rooms.update(element, changes);
  };

  return { rooms, getRooms, getRoomByElement, updateRoom };
};

// Direct exports for standalone usage
export const getRooms = async () => {
  return await db.rooms.toArray();
};

export const updateRoom = async (element: string, changes: Partial<Room>) => {
  return await db.rooms.update(element, changes);
};