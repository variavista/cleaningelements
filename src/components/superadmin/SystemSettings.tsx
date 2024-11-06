import React, { useState } from 'react';
import { Save, Database, Mail, Bell } from 'lucide-react';

const SystemSettings = () => {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    backupEnabled: true,
    backupFrequency: 'daily',
    emailNotifications: true,
    maintenanceMode: false
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      // Aquí iría la lógica para guardar la configuración
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">
          Configuración del Sistema
        </h3>
      </div>

      <div className="space-y-6">
        {/* Backup Settings */}
        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600/50">
          <div className="flex items-center space-x-2 mb-6">
            <Database className="w-5 h-5 text-blue-400" />
            <h4 className="text-lg font-semibold text-white">Copias de Seguridad</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Backup Automático</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.backupEnabled}
                  onChange={(e) => setSettings({ ...settings, backupEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Frecuencia de Backup
              </label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                className="w-full rounded-lg bg-gray-600 border border-gray-500 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Diario</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600/50">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="w-5 h-5 text-yellow-400" />
            <h4 className="text-lg font-semibold text-white">Notificaciones</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Notificaciones por Email</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600/50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Modo Mantenimiento</h4>
              <p className="text-sm text-gray-400">
                Activa el modo mantenimiento para realizar actualizaciones del sistema
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;