import React from 'react';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '../../types/subscription';
import { planLimits } from '../../db/initial-data';

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  isPopular?: boolean;
  onSelect?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ 
  plan,
  isPopular = false,
  onSelect 
}) => {
  const planDetails = planLimits[plan];
  
  const getPlanColor = () => {
    switch (plan) {
      case 'starter':
        return 'from-blue-500 to-blue-600';
      case 'basic':
        return 'from-green-500 to-green-600';
      case 'professional':
        return 'from-purple-500 to-purple-600';
      case 'enterprise':
        return 'from-orange-500 to-orange-600';
    }
  };

  return (
    <div className={`relative bg-gray-800/60 backdrop-blur-md rounded-xl border ${
      isPopular ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-gray-700/50'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Más Popular
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">
            {planDetails.name}
          </h3>
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {planDetails.price}€
            </span>
            <span className="text-gray-400 ml-2">/mes</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-700/50 p-2 rounded-lg">
              <span className="text-white">
                {planDetails.maxRooms === -1 ? 'Sin límite' : `${planDetails.maxRooms} habitaciones`}
              </span>
            </div>
            <div className="bg-gray-700/50 p-2 rounded-lg">
              <span className="text-white">
                {planDetails.maxZones === -1 ? 'Sin límite' : `${planDetails.maxZones} zonas`}
              </span>
            </div>
          </div>

          <ul className="space-y-3">
            {planDetails.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onSelect}
          className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${getPlanColor()} text-white font-semibold hover:opacity-90 transition-opacity`}
        >
          Seleccionar Plan
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;