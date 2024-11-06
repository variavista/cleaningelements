import React, { createContext, useContext, useState, useEffect } from 'react';
import { Element, Room, Zone } from '../types';
import { getRooms, updateRoom } from '../hooks/useDatabase';

interface RoomContextType {
  rooms: Record<Element, Room>;
  getCurrentZone: (element: Element) => Zone;
  rotateZones: () => void;
  getWeekNumber: () => number;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

// All zones including rest period
const allZones: Zone[] = ['Cocina', 'Terraza', 'Azotea', 'Pasillos', 'Escaleras', 'Libre'];

// Default room assignments with one room resting
const defaultRooms: Record<Element, Room> = {
  'Agua': { element: 'Agua', users: [], currentZone: 'Cocina' },
  'Aire': { element: 'Aire', users: [], currentZone: 'Terraza' },
  'Fuego': { element: 'Fuego', users: [], currentZone: 'Azotea' },
  'Tierra': { element: 'Tierra', users: [], currentZone: 'Pasillos' },
  'Éter': { element: 'Éter', users: [], currentZone: 'Libre' }
};

const getCurrentWeekNumber = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  return Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
};

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState(defaultRooms);
  const [lastRotationWeek, setLastRotationWeek] = useState(() => {
    const saved = localStorage.getItem('lastRotationWeek');
    return saved ? parseInt(saved) : getCurrentWeekNumber();
  });

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    const currentWeek = getCurrentWeekNumber();
    if (currentWeek !== lastRotationWeek) {
      rotateZones();
      setLastRotationWeek(currentWeek);
      localStorage.setItem('lastRotationWeek', currentWeek.toString());
    }
  }, [lastRotationWeek]);

  const loadRooms = async () => {
    try {
      const loadedRooms = await getRooms();
      if (loadedRooms.length > 0) {
        const roomsRecord = loadedRooms.reduce((acc, room) => {
          acc[room.element] = room;
          return acc;
        }, {} as Record<Element, Room>);
        setRooms(roomsRecord);
      }
    } catch (error) {
      console.error('Error loading rooms:', error);
    }
  };

  const getCurrentZone = (element: Element): Zone => {
    return rooms[element].currentZone;
  };

  const rotateZones = () => {
    setRooms(prev => {
      const newRooms = { ...prev };
      const elements: Element[] = ['Agua', 'Aire', 'Fuego', 'Tierra', 'Éter'];
      
      // Get current zone assignments
      const currentAssignments = elements.map(element => ({
        element,
        currentZone: prev[element].currentZone
      }));

      // Rotate zones including rest period
      elements.forEach((element, index) => {
        const currentZoneIndex = allZones.indexOf(currentAssignments[index].currentZone);
        const nextZoneIndex = (currentZoneIndex + 1) % allZones.length;
        
        newRooms[element] = {
          ...prev[element],
          currentZone: allZones[nextZoneIndex],
        };

        // Update in database
        updateRoom(element, { currentZone: allZones[nextZoneIndex] })
          .catch(error => console.error('Error updating room:', error));
      });

      return newRooms;
    });
  };

  return (
    <RoomContext.Provider value={{
      rooms,
      getCurrentZone,
      rotateZones,
      getWeekNumber: getCurrentWeekNumber,
    }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};