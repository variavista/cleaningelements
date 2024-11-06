import { db } from '../db/config';
import type { DBSettings } from '../db/config';

export interface UserSettingsHook {
  getUserSettings: (userId: string) => Promise<DBSettings | undefined>;
  updateUserSettings: (userId: string, changes: Partial<DBSettings>) => Promise<number>;
}

export const useUserSettings = (): UserSettingsHook => {
  const getUserSettings = async (userId: string): Promise<DBSettings | undefined> => {
    return await db.settings.where('userId').equals(userId).first();
  };

  const updateUserSettings = async (userId: string, changes: Partial<DBSettings>): Promise<number> => {
    const settings = await getUserSettings(userId);
    if (settings) {
      return await db.settings.update(settings.id!, changes);
    } else {
      await db.settings.add({
        userId,
        theme: 'dark',
        emailNotifications: true,
        taskReminders: true,
        language: 'es',
        ...changes
      } as DBSettings);
      return 1;
    }
  };

  return {
    getUserSettings,
    updateUserSettings
  };
};