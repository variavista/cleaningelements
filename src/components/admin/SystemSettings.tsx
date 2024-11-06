import React, { useState, useEffect } from 'react';
import { db } from '../../db';
import { Save, RotateCw } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [rotationDay, setRotationDay] = useState<number>(1);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await db.settings.toArray();
      if (settings.length > 0) {
        setRotationDay(settings[0].rotationDay || 1);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const settings = await db.settings.toArray();
      if (settings.length > 0) {
        await db.settings.update(settings[0].id!, { rotationDay });
      } else {
        await db.settings.add({ rotationDay });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleRotateNow = async () => {
    try {
      // Implement manual rotation logic here
      console.log('Manual rotation triggered');
    } catch (error) {
      console.error('Error rotating zones:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        Configuración del Sistema
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Rotación de Zonas
          </h3>
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Día de rotación semanal
              </label>
              <select
                value={rotationDay}
                onChange={(e) => setRotationDay(Number(e.target.value))}
                className="rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-4"
              >
                <option value={1}>Lunes</option>
                <option value={2}>Martes</option>
                <option value={3}>Miércoles</option>
                <option value={4}>Jueves</option>
                <option value={5}>Viernes</option>
                <option value={6}>Sábado</option>
                <option value={0}>Domingo</option>
              </select>
            </div>
            <button
              onClick={handleRotateNow}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center space-x-2"
            >
              <RotateCw className="w-5 h-5" />
              <span>Rotar Ahora</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
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