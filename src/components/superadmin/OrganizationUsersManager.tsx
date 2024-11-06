import React, { useState, useEffect } from 'react';
import { Building2, Search, UserPlus, UserMinus } from 'lucide-react';
import { db } from '../../db/config';
import { DBOrganization, DBUser } from '../../db/schema';

interface OrganizationUsers extends DBOrganization {
  users: DBUser[];
}

const OrganizationUsersManager = () => {
  const [organizations, setOrganizations] = useState<OrganizationUsers[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const orgs = await db.organizations.toArray();
      
      // Get users for each organization
      const orgsWithUsers = await Promise.all(
        orgs.map(async (org) => {
          const users = await db.users
            .where('organizationId')
            .equals(org.id)
            .toArray();
          return { ...org, users };
        })
      );

      setOrganizations(orgsWithUsers);
    } catch (error) {
      console.error('Error loading organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(search.toLowerCase())
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
          <Building2 className="w-6 h-6" />
          <span>Usuarios por Organización</span>
        </h3>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar organización..."
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredOrganizations.map((org) => (
          <div
            key={org.id}
            className="bg-gray-700/50 rounded-lg border border-gray-600/50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-600/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {org.name}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {org.users.length} usuarios
                  </p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Añadir Usuario</span>
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {org.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <div className="text-white font-medium">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-blue-900/50 text-blue-300'
                          : 'bg-gray-800/50 text-gray-300'
                      }`}>
                        {user.role}
                      </span>
                      <button className="text-red-400 hover:text-red-300 p-1">
                        <UserMinus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {org.users.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-400">
                      No hay usuarios en esta organización
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredOrganizations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">
              No se encontraron organizaciones
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationUsersManager;