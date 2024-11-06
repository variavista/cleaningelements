import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { SubscriptionPlan } from '../../types/subscription';
import { planLimits } from '../../db/initial-data';
import SubscriptionCard from './SubscriptionCard';
import CreateSubscriptionModal from './CreateSubscriptionModal';
import ParticleBackground from '../ui/ParticleBackground';

const SubscriptionsManager: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowCreateModal(true);
  };

  return (
    <>
      <ParticleBackground />
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            Planes de Suscripción
          </h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Crear Suscripción</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SubscriptionCard
            plan="starter"
            onSelect={() => handlePlanSelect('starter')}
          />
          <SubscriptionCard
            plan="basic"
            isPopular
            onSelect={() => handlePlanSelect('basic')}
          />
          <SubscriptionCard
            plan="professional"
            onSelect={() => handlePlanSelect('professional')}
          />
          <SubscriptionCard
            plan="enterprise"
            onSelect={() => handlePlanSelect('enterprise')}
          />
        </div>
      </div>

      <CreateSubscriptionModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedPlan(null);
        }}
        selectedPlan={selectedPlan}
      />
    </>
  );
};

export default SubscriptionsManager;