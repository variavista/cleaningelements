import React, { useState } from 'react';
import { Users, Home, Settings as SettingsIcon, MessageSquarePlus } from 'lucide-react';
import UserManagement from './UserManagement';
import RoomManagement from './RoomManagement';
import ZoneManagement from './ZoneManagement';
import SystemSettings from './SystemSettings';
import SuggestionsManagement from './SuggestionsManagement';
import ParticleBackground from '../ui/ParticleBackground';

type AdminTab = 'users' | 'rooms' | 'zones' | 'settings' | 'suggestions';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  const tabs = [
    { id: 'users' as AdminTab, label: 'Usuarios', icon: Users },
    { id: 'rooms' as AdminTab, label: 'Habitaciones', icon: Home },
    { id: 'zones' as AdminTab, label: 'Zonas', icon: MessageSquarePlus },
    { id: 'suggestions' as AdminTab, label: 'Sugerencias', icon: MessageSquarePlus },
    { id: 'settings' as AdminTab, label: 'Sistema', icon: SettingsIcon },
  ];

  return (
    <>
      <ParticleBackground />
      <div className="max-w-7xl mx-auto py-8">
        <h2 className="text-2xl font-bold text-white mb-8">
          Panel de Administración
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
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'rooms' && <RoomManagement />}
          {activeTab === 'zones' && <ZoneManagement />}
          {activeTab === 'suggestions' && <SuggestionsManagement />}
          {activeTab === 'settings' && <SystemSettings />}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;