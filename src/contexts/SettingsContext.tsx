import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSettings } from '../types';
import { useAuth } from './AuthContext';
import { db } from '../db';

interface SettingsContextType {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
  updateSettings: (changes: Partial<UserSettings>) => Promise<void>;
  saveSettings: () => Promise<void>;
}

const defaultSettings: Omit<UserSettings, 'id'> = {
  userId: '',
  emailNotifications: true,
  weeklyDigest: true,
  taskReminders: true,
  theme: 'light',
  createdAt: new Date(),
  updatedAt: new Date()
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        let userSettings = await db.settings.where('userId').equals(user.id).first();
        
        if (!userSettings) {
          const newSettings: UserSettings = {
            id: crypto.randomUUID(),
            userId: user.id,
            ...defaultSettings
          };
          
          await db.settings.add(newSettings);
          userSettings = newSettings;
        }
        
        setSettings(userSettings);
      } catch (err) {
        console.error('Error loading settings:', err);
        setError('Error loading settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user]);

  const updateSettings = async (changes: Partial<UserSettings>) => {
    if (!settings?.id) return;
    
    const updatedSettings = {
      ...settings,
      ...changes,
      updatedAt: new Date()
    };
    
    setSettings(updatedSettings);
  };

  const saveSettings = async () => {
    if (!settings?.id) return;

    try {
      await db.settings.update(settings.id, {
        ...settings,
        updatedAt: new Date()
      });
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Error saving settings');
      throw err;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, error, updateSettings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};