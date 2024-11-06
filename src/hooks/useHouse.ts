import { useState, useCallback } from 'react';
import { db } from '../db/config';
import { DBRoom, DBUser, DBZone } from '../db/schema';

export const useHouse = (houseId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getHouseUsers = useCallback(async () => {
    try {
      setLoading(true);
      return await db.users
        .where('houseId')
        .equals(houseId)
        .toArray();
    } catch (err) {
      console.error('Error getting house users:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [houseId]);

  const getHouseRooms = useCallback(async () => {
    try {
      setLoading(true);
      return await db.rooms
        .where('houseId')
        .equals(houseId)
        .toArray();
    } catch (err) {
      console.error('Error getting house rooms:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [houseId]);

  const getHouseZones = useCallback(async () => {
    try {
      setLoading(true);
      return await db.zones
        .where('houseId')
        .equals(houseId)
        .toArray();
    } catch (err) {
      console.error('Error getting house zones:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [houseId]);

  const addUserToHouse = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      
      const house = await db.houses.get(houseId);
      if (!house) {
        throw new Error('Casa no encontrada');
      }

      const currentUsers = await db.users
        .where('houseId')
        .equals(houseId)
        .count();

      if (currentUsers >= house.maxUsersPerHouse) {
        throw new Error('Límite de usuarios alcanzado para esta casa');
      }

      await db.users.update(userId, { houseId });
    } catch (err) {
      console.error('Error adding user to house:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [houseId]);

  return {
    loading,
    error,
    getHouseUsers,
    getHouseRooms,
    getHouseZones,
    addUserToHouse
  };
};