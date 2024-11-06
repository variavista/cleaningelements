import React, { useState, useEffect } from 'react';
import { Users2, Search } from 'lucide-react';
import { DBUser } from '../../db/schema';
import { db } from '../../db/config';

const GlobalUsersManager = () => {
  const [users, setUsers] = useState<DBUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await db.users.toArray();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Users2 className="w-6 h-6" />
          <span>Usuarios Globales</span>
        </h3>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar usuarios..."
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-3 text-gray-400 font-medium">Usuario</th>
              <th className="pb-3 text-gray-400 font-medium">Rol</th>
              <th className="pb-3 text-gray-400 font-medium">Organización</th>
              <th className="pb-3 text-gray-400 font-medium">Casa</th>
              <th className="pb-3 text-gray-400 font-medium">Estado</th>
              <th className="pb-3 text-gray-400 font-medium">Último Acceso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700/30">
                <td className="py-4">
                  <div>
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'superadmin'
                      ? 'bg-purple-900/50 text-purple-300'
                      : user.role === 'admin'
                      ? 'bg-blue-900/50 text-blue-300'
                      : 'bg-gray-800/50 text-gray-300'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 text-gray-300">
                  {user.organizationId || '-'}
                </td>
                <td className="py-4 text-gray-300">
                  {user.houseId || '-'}
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.isActive
                      ? 'bg-green-900/50 text-green-300'
                      : 'bg-red-900/50 text-red-300'
                  }`}>
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="py-4 text-gray-300">
                  {new Date(user.lastLogin).toLocaleString('es-ES', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GlobalUsersManager;