import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, Download, AlertCircle } from 'lucide-react';
import { Subscription, SubscriptionInvoice } from '../../types';
import { useSubscription } from '../../hooks/useSubscription';
import { planLimits } from '../../db/initial-data';
import Modal from '../ui/Modal';

interface SubscriptionDetailsProps {
  subscription: Subscription;
  onClose: () => void;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  subscription,
  onClose
}) => {
  const { getInvoices, cancelSubscription } = useSubscription();
  const [invoices, setInvoices] = useState<SubscriptionInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, [subscription.id]);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const loadedInvoices = await getInvoices(subscription.id);
      setInvoices(loadedInvoices);
    } catch (error) {
      console.error('Error loading invoices:', error);
      setError('Error al cargar las facturas');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription(subscription.id);
      onClose();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      setError('Error al cancelar la suscripción');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Detalles de Suscripción"
    >
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Plan Info */}
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white capitalize">
              Plan {subscription.plan}
            </h4>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              subscription.status === 'active'
                ? 'bg-green-900/50 text-green-300'
                : subscription.status === 'cancelled'
                ? 'bg-yellow-900/50 text-yellow-300'
                : 'bg-red-900/50 text-red-300'
            }`}>
              {subscription.status === 'active' ? 'Activo' :
               subscription.status === 'cancelled' ? 'Cancelado' : 'Expirado'}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Precio mensual</span>
              <span className="text-white font-medium">
                ${planLimits[subscription.plan].price}/mes
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Próximo cobro</span>
              <span className="text-white font-medium">
                {formatDate(subscription.currentPeriodEnd)}
              </span>
            </div>

            {subscription.cancelledAt && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Cancelado el</span>
                <span className="text-white font-medium">
                  {formatDate(subscription.cancelledAt)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
          <h4 className="text-lg font-semibold text-white mb-4">
            Características del Plan
          </h4>
          <ul className="space-y-2">
            {planLimits[subscription.plan].features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <span className="mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Invoices */}
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
          <h4 className="text-lg font-semibold text-white mb-4">
            Historial de Facturas
          </h4>
          
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : invoices.length > 0 ? (
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                >
                  <div>
                    <div className="text-white font-medium">
                      ${invoice.amount} {invoice.currency.toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatDate(invoice.createdAt)}
                    </div>
                  </div>
                  {invoice.invoiceUrl && (
                    <a
                      href={invoice.invoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 p-2"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">
              No hay facturas disponibles
            </p>
          )}
        </div>

        {/* Actions */}
        {subscription.status === 'active' && (
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Cancelar Suscripción
            </button>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <Modal
          isOpen={true}
          onClose={() => setShowCancelConfirm(false)}
          title="Confirmar Cancelación"
        >
          <div className="space-y-4">
            <p className="text-gray-300">
              ¿Estás seguro de que deseas cancelar esta suscripción? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
              >
                No, mantener
              </button>
              <button
                onClick={handleCancelSubscription}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
};

export default SubscriptionDetails;