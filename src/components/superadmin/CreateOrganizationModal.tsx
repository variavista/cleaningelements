import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { Plan, Organization } from '../../types';
import { planLimits } from '../../db/initial-data';

interface CreateOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (organization: Partial<Organization>) => Promise<void>;
}

const CreateOrganizationModal: React.FC<CreateOrganizationModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [name, setName] = useState('');
  const [plan, setPlan] = useState<Plan>('free');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('El nombre de la organización es requerido');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit({
        name: name.trim(),
        plan,
        isActive: true,
        createdAt: new Date()
      });
      setName('');
      setPlan('free');
      onClose();
    } catch (err) {
      setError('Error al crear la organización');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const plans: Plan[] = ['free', 'basic', 'pro', 'enterprise'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-800/90 rounded-lg shadow-xl max-w-2xl w-full mx-4 border border-gray-700/50">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h3 className="text-xl font-semibold text-white">
            Nueva Organización
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Nombre de la Organización
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre de la organización"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-4">
                Plan de Suscripción
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {plans.map((planType) => {
                  const limits = planLimits[planType];
                  return (
                    <button
                      key={planType}
                      type="button"
                      onClick={() => setPlan(planType)}
                      className={`relative p-4 rounded-lg border transition-all ${
                        plan === planType
                          ? 'bg-blue-600/20 border-blue-500/50 ring-2 ring-blue-500/50'
                          : 'bg-gray-700/50 border-gray-600/50 hover:border-gray-500/50'
                      }`}
                    >
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-white capitalize mb-2">
                          {planType}
                        </h4>
                        <div className="space-y-2 text-sm text-gray-300">
                          <p>
                            {limits.maxHouses === -1 
                              ? '✓ Casas ilimitadas'
                              : `✓ Hasta ${limits.maxHouses} casas`}
                          </p>
                          <p>
                            {limits.maxUsersPerHouse === -1
                              ? '✓ Usuarios ilimitados'
                              : `✓ ${limits.maxUsersPerHouse} usuarios por casa`}
                          </p>
                          <p>
                            {limits.maxRoomsPerHouse === -1
                              ? '✓ Habitaciones ilimitadas'
                              : `✓ ${limits.maxRoomsPerHouse} habitaciones por casa`}
                          </p>
                        </div>
                        <div className="mt-4 text-xl font-bold text-white">
                          {limits.price === 0 ? 'Gratis' : `${limits.price}€/mes`}
                        </div>
                      </div>
                      {plan === planType && (
                        <div className="absolute top-2 right-2 text-blue-400">
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creando...</span>
                </>
              ) : (
                <span>Crear Organización</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganizationModal;