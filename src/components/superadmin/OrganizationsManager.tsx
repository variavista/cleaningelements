import React, { useState, useEffect } from 'react';
import { Plus, Building2, Users, Trash2, Edit2, Save, X } from 'lucide-react';
import { Organization } from '../../types';
import { db } from '../../db/config';
import CreateOrganizationModal from './CreateOrganizationModal';

const OrganizationsManager = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Organization>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      setError(null);
      const orgs = await db.organizations.toArray();
      setOrganizations(orgs);
    } catch (error) {
      console.error('Error loading organizations:', error);
      setError('Error al cargar las organizaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrganization = async (name: string, plan: 'free' | 'basic' | 'premium') => {
    try {
      const id = await db.organizations.add({
        id: crypto.randomUUID(),
        name,
        plan,
        isActive: true,
        createdAt: new Date()
      } as Organization);

      await loadOrganizations();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating organization:', error);
      setError('Error al crear la organización');
    }
  };

  const handleEdit = (org: Organization) => {
    setEditingId(org.id);
    setEditForm(org);
  };

  const handleSave = async () => {
    if (!editingId || !editForm.name) return;

    try {
      await db.organizations.update(editingId, {
        ...editForm,
        updatedAt: new Date()
      });
      setEditingId(null);
      setEditForm({});
      await loadOrganizations();
    } catch (error) {
      console.error('Error updating organization:', error);
      setError('Error al actualizar la organización');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await db.organizations.delete(id);
      await loadOrganizations();
    } catch (error) {
      console.error('Error deleting organization:', error);
      setError('Error al eliminar la organización');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Building2 className="w-6 h-6" />
          <span>Gestión de Organizaciones</span>
        </h2>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Organización</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="bg-gray-700/50 rounded-lg p-6 border border-gray-600/50"
          >
            {editingId === org.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full rounded-lg bg-gray-600/50 border border-gray-500 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleSave}
                    className="text-green-400 hover:text-green-300 p-2"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditForm({});
                    }}
                    className="text-gray-400 hover:text-gray-300 p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {org.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(org)}
                      className="text-blue-400 hover:text-blue-300 p-2"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(org.id)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>0 usuarios</span>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-600/50">
                    <button className="w-full bg-gray-600/50 text-white px-4 py-2 rounded-lg hover:bg-gray-500/50 transition-colors">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <CreateOrganizationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateOrganization}
      />
    </div>
  );
};

export default OrganizationsManager;