import React, { useState } from 'react';
import { User, Bell, Key, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import ParticleBackground from './ui/ParticleBackground';
import ChangePasswordModal from './auth/ChangePasswordModal';

const Settings = () => {
  const { user } = useAuth();
  const { settings, updateSettings, saveSettings } = useSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSettings();
      setShowSaveMessage(true);
      setTimeout(() => setShowSaveMessage(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <ParticleBackground />
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            Configuración
          </h2>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{isSaving ? 'Guardando...' : 'Guardar cambios'}</span>
          </button>
        </div>

        {showSaveMessage && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-500/50 text-green-200 rounded-lg">
            Cambios guardados correctamente
          </div>
        )}

        <div className="space-y-6">
          {/* Perfil */}
          <div className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">
                Perfil
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Habitación
                </label>
                <input
                  type="text"
                  value={user?.room}
                  readOnly
                  className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">
                Notificaciones
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">
                  Notificaciones por correo
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings?.emailNotifications}
                    onChange={(e) => updateSettings({ emailNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">
                  Resumen semanal
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings?.weeklyDigest}
                    onChange={(e) => updateSettings({ weeklyDigest: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">
                  Recordatorios de tareas
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings?.taskReminders}
                    onChange={(e) => updateSettings({ taskReminders: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Seguridad */}
          <div className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Key className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">
                Seguridad
              </h3>
            </div>

            <button 
              onClick={() => setShowPasswordModal(true)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>

      {/* Modal de cambio de contraseña */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
};

export default Settings;