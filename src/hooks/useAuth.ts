import { useState, useCallback } from 'react';
import { userService } from '../services';
import { DBUser } from '../db/schema';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const user = await userService.findByEmail(email);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (!user.is_active) {
        throw new Error('Usuario desactivado');
      }

      // En producción usar bcrypt.compare
      if (user.password !== password) {
        throw new Error('Contraseña incorrecta');
      }

      await userService.updateLastLogin(user.id);

      // No devolver el password
      const { password: _, ...safeUser } = user;
      return safeUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: Partial<DBUser>) => {
    try {
      setLoading(true);
      setError(null);

      const existingUser = await userService.findByEmail(userData.email!);
      if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
      }

      const id = await userService.create(userData);
      const newUser = await userService.findById(id);

      if (!newUser) throw new Error('Error creating user');

      // No devolver el password
      const { password: _, ...safeUser } = newUser;
      return safeUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrar usuario';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    login,
    register
  };
};