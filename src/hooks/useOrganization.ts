import { useState, useCallback } from 'react';
import { organizationService } from '../services';
import { DBOrganization } from '../db/schema';

export const useOrganization = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrganization = useCallback(async (name: string, adminEmail: string) => {
    try {
      setLoading(true);
      setError(null);

      const existingOrg = await organizationService.findByAdminEmail(adminEmail);
      if (existingOrg) {
        throw new Error('Ya existe una organización con este administrador');
      }

      const id = await organizationService.create({
        name,
        admin_email: adminEmail,
        max_rooms: 5,
        max_zones: 5,
        max_users: 10
      });

      return await organizationService.findById(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la organización';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      return await organizationService.list();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al obtener las organizaciones';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrganization = useCallback(async (id: string, changes: Partial<DBOrganization>) => {
    try {
      setLoading(true);
      setError(null);
      await organizationService.update(id, changes);
      return await organizationService.findById(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar la organización';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteOrganization = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await organizationService.delete(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar la organización';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createOrganization,
    getOrganizations,
    updateOrganization,
    deleteOrganization
  };
};