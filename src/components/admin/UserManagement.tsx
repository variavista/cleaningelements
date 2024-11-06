import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../hooks/useDatabase';
import { User } from '../../types';
import UserTable from './UserTable';
import { Users } from 'lucide-react';

const UserManagement: React.FC = () => {
  const { getUsers, updateUser, deleteUser } = useDatabase();
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedUsers = await getUsers();
      setUsers(loadedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditForm(user);
  };

  const handleSave = async () => {
    if (!editingId || !editForm) return;

    try {
      await updateUser(editingId, editForm);
      setEditingId(null);
      setEditForm({});
      await loadUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error al actualizar el usuario');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error al eliminar el usuario');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setEditForm(prev => ({ ...prev, isAdmin: checked }));
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
          <Users className="w-6 h-6" />
          <span>Gestión de Usuarios</span>
        </h2>
        <span className="text-gray-400 text-sm">
          {users.length} usuarios registrados
        </span>
      </div>

      {error && (
        <div className="p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 p-6">
        <UserTable
          users={users}
          editingId={editingId}
          editForm={editForm}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={handleChange}
          onDelete={handleDelete}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default UserManagement;