import { useState } from 'react';
import { db } from '../db/config';
import { UserSettings } from '../types';

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings[]>([]);

  const getSettingsByUserId = async (userId: string) => {
    return await db.settings.where('userId').equals(userId).first();
  };

  const updateSettings = async (id: string, changes: Partial<UserSettings>) => {
    return await db.settings.update(id, changes);
  };

  return { settings, getSettingsByUserId, updateSettings };
};