import React, { useState } from 'react';
import { Users, Building2 } from 'lucide-react';
import GlobalUsersManager from './GlobalUsersManager';
import OrganizationUsersManager from './OrganizationUsersManager';

type UsersTab = 'global' | 'organizations';

const UsersManager = () => {
  const [activeTab, setActiveTab] = useState<UsersTab>('global');

  const tabs = [
    { id: 'global' as UsersTab, label: 'Usuarios Globales', icon: Users },
    { id: 'organizations' as UsersTab, label: 'Por Organización', icon: Building2 },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'global' && <GlobalUsersManager />}
        {activeTab === 'organizations' && <OrganizationUsersManager />}
      </div>
    </div>
  );
};

export default UsersManager;