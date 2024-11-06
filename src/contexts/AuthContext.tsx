import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { db } from '../db/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, room?: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const clearError = () => setError(null);

  const login = async (email: string, password: string) => {
    try {
      clearError();
      const existingUser = await db.users.where('email').equals(email).first();
      
      if (!existingUser) {
        throw new Error('Usuario no encontrado');
      }

      if (!existingUser.isActive) {
        throw new Error('Usuario desactivado');
      }

      // En producción usar bcrypt.compare
      if (existingUser.password !== password) {
        throw new Error('Contraseña incorrecta');
      }

      const userData = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
        room: existingUser.room,
        isActive: existingUser.isActive
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // Update last login
      await db.users.update(existingUser.id, {
        lastLogin: new Date()
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
      throw err;
    }
  };

  const register = async (email: string, password: string, room?: string) => {
    try {
      clearError();
      const existingUser = await db.users.where('email').equals(email).first();
      
      if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
      }

      const newUser = {
        id: crypto.randomUUID(),
        email,
        password, // En producción usar hash
        name: email.split('@')[0],
        role: email === 'info@cleaningelements.com' ? 'superadmin' : 'user',
        room,
        isActive: true,
        createdAt: new Date(),
        lastLogin: new Date()
      };

      await db.users.add(newUser);
      
      const userData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        room: newUser.room,
        isActive: newUser.isActive
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrar usuario';
      setError(message);
      throw err;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      clearError();
      if (!user?.id) throw new Error('Usuario no encontrado');

      const dbUser = await db.users.get(user.id);
      if (!dbUser) throw new Error('Usuario no encontrado');

      if (dbUser.password !== currentPassword) {
        throw new Error('Contraseña actual incorrecta');
      }

      await db.users.update(user.id, { password: newPassword });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cambiar la contraseña';
      setError(message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      logout,
      register,
      changePassword,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};