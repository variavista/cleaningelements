import { useState, useCallback } from 'react';
import { db } from '../db/config';
import { CleaningZone, Element, ZoneAssignment } from '../types';

export const useZones = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getZones = useCallback(async () => {
    try {
      setLoading(true);
      const zones = await db.zones.toArray();
      return zones;
    } catch (err) {
      console.error('Error getting zones:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addZone = useCallback(async (zoneName: string, description?: string) => {
    try {
      setLoading(true);
      const newZone: Partial<CleaningZone> = {
        name: zoneName,
        description,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const id = await db.zones.add(newZone as CleaningZone);
      return id;
    } catch (err) {
      console.error('Error adding zone:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateZone = useCallback(async (id: string, changes: Partial<CleaningZone>) => {
    try {
      setLoading(true);
      changes.updatedAt = new Date();
      await db.zones.update(id, changes);
    } catch (err) {
      console.error('Error updating zone:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteZone = useCallback(async (id: string) => {
    try {
      setLoading(true);
      // First check if there are associated tasks
      const tasksCount = await db.tasks.where('zone').equals(id).count();
      if (tasksCount > 0) {
        throw new Error('No se puede eliminar una zona con tareas asociadas');
      }
      await db.zones.delete(id);
    } catch (err) {
      console.error('Error deleting zone:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getZones,
    addZone,
    updateZone,
    deleteZone
  };
};

// Direct exports for standalone usage
export const getZones = () => db.zones.toArray();
export const addZone = (zone: Partial<CleaningZone>) => db.zones.add(zone as CleaningZone);
export const updateZone = (id: string, changes: Partial<CleaningZone>) => db.zones.update(id, changes);
export const deleteZone = (id: string) => db.zones.delete(id);