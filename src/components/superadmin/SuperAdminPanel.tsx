import React, { useState } from 'react';
import { Building2, Users, Settings as SettingsIcon, CreditCard } from 'lucide-react';
import OrganizationsManager from './OrganizationsManager';
import UsersManager from './UsersManager';
import SystemSettings from './SystemSettings';
import SubscriptionsManager from './SubscriptionsManager';
import ParticleBackground from '../ui/ParticleBackground';

type AdminTab = 'organizations' | 'users' | 'settings' | 'subscriptions';

const SuperAdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('organizations');

  const tabs = [
    { id: 'organizations' as AdminTab, label: 'Organizaciones', icon: Building2 },
    { id: 'users' as AdminTab, label: 'Usuarios', icon: Users },
    { id: 'subscriptions' as AdminTab, label: 'Suscripciones', icon: CreditCard },
    { id: 'settings' as AdminTab, label: 'Sistema', icon: SettingsIcon },
  ];

  return (
    <>
      <ParticleBackground />
      <div className="max-w-7xl mx-auto py-8">
        <h2 className="text-2xl font-bold text-white mb-8">
          Panel de SuperAdmin
        </h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-lg shadow-lg border border-gray-700/50 p-6">
          {activeTab === 'organizations' && <OrganizationsManager />}
          {activeTab === 'users' && <UsersManager />}
          {activeTab === 'subscriptions' && <SubscriptionsManager />}
          {activeTab === 'settings' && <SystemSettings />}
        </div>
      </div>
    </>
  );
};

export default SuperAdminPanel;