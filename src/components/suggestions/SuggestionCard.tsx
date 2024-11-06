import React from 'react';
import { ThumbsUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Suggestion } from '../../types';

interface SuggestionCardProps {
  suggestion: Suggestion;
  onVote: (id: string) => void;
  isVoted: boolean;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, onVote, isVoted }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'implemented':
        return <CheckCircle className="w-5 h-5 text-blue-400" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      case 'implemented':
        return 'Implementada';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">
          {suggestion.title}
        </h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon(suggestion.status)}
          <span className="text-sm text-gray-400">
            {getStatusText(suggestion.status)}
          </span>
        </div>
      </div>

      <p className="text-gray-300 mb-4">
        {suggestion.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onVote(suggestion.id)}
            className={`flex items-center space-x-1 transition-colors ${
              isVoted ? 'text-blue-400' : 'hover:text-blue-400'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{suggestion.votes}</span>
          </button>
          <span>Por: {suggestion.author}</span>
        </div>
        <span>
          {new Date(suggestion.createdAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short'
          })}
        </span>
      </div>
    </div>
  );
};

export default SuggestionCard;