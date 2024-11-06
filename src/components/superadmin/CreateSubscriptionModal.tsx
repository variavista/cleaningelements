import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SubscriptionPlan } from '../../types/subscription';
import { planLimits } from '../../db/initial-data';

interface CreateSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: SubscriptionPlan | null;
}

const CreateSubscriptionModal: React.FC<CreateSubscriptionModalProps> = ({
  isOpen,
  onClose,
  selectedPlan
}) => {
  const [organizationEmail, setOrganizationEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    try {
      setLoading(true);
      setError(null);
      
      // Aquí iría la lógica para crear la suscripción
      // Por ahora solo cerramos el modal
      onClose();
    } catch (err) {
      setError('Error al crear la suscripción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-800/90 rounded-lg shadow-xl max-w-md w-full mx-4 border border-gray-700/50">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h3 className="text-xl font-semibold text-white">
            Nueva Suscripción
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {selectedPlan && (
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Plan Seleccionado: {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
                </h4>
                <div className="text-sm text-gray-300">
                  <p>Límites del plan:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Hasta {planLimits[selectedPlan].maxRooms} habitaciones</li>
                    <li>Hasta {planLimits[selectedPlan].maxZones} zonas</li>
                    <li>Hasta {planLimits[selectedPlan].maxUsers} usuarios</li>
                  </ul>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email de la Organización
              </label>
              <input
                type="email"
                value={organizationEmail}
                onChange={(e) => setOrganizationEmail(e.target.value)}
                className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="organizacion@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !selectedPlan}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando...' : 'Crear Suscripción'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubscriptionModal;