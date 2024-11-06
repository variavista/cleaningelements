import React, { useState, useEffect } from 'react';
import { getSuggestions, updateSuggestion, deleteSuggestion } from '../../hooks/useSuggestions';
import { Suggestion } from '../../types';
import { CheckCircle, XCircle, Trash2, MessageSquarePlus } from 'lucide-react';

const SuggestionsManagement = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedSuggestions = await getSuggestions();
      setSuggestions(loadedSuggestions.sort((a, b) => b.votes - a.votes));
    } catch (error) {
      console.error('Error loading suggestions:', error);
      setError('Error al cargar las sugerencias');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected' | 'implemented') => {
    try {
      await updateSuggestion(id, { status });
      setSuggestions(prev => prev.map(s => 
        s.id === id ? { ...s, status } : s
      ));
    } catch (error) {
      console.error('Error updating suggestion:', error);
      setError('Error al actualizar la sugerencia');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSuggestion(id);
      setSuggestions(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting suggestion:', error);
      setError('Error al eliminar la sugerencia');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <MessageSquarePlus className="w-6 h-6" />
          <span>Gestión de Sugerencias</span>
        </h2>
        <span className="text-gray-400 text-sm">
          {suggestions.length} sugerencias en total
        </span>
      </div>

      {error && (
        <div className="p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-gray-400">
                  Por: {suggestion.author} • {new Date(suggestion.createdAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleStatusChange(suggestion.id, 'approved')}
                  className={`p-2 rounded-lg transition-colors ${
                    suggestion.status === 'approved'
                      ? 'bg-green-900/20 text-green-400'
                      : 'hover:bg-gray-700/50 text-gray-400 hover:text-green-400'
                  }`}
                  title="Aprobar"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleStatusChange(suggestion.id, 'rejected')}
                  className={`p-2 rounded-lg transition-colors ${
                    suggestion.status === 'rejected'
                      ? 'bg-red-900/20 text-red-400'
                      : 'hover:bg-gray-700/50 text-gray-400 hover:text-red-400'
                  }`}
                  title="Rechazar"
                >
                  <XCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(suggestion.id)}
                  className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-red-400 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-300 mb-4">
              {suggestion.description}
            </p>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-400">
                {suggestion.votes} votos
              </span>
              <span className={`text-sm px-3 py-1 rounded-full ${
                suggestion.status === 'approved'
                  ? 'bg-green-900/20 text-green-400'
                  : suggestion.status === 'rejected'
                  ? 'bg-red-900/20 text-red-400'
                  : suggestion.status === 'implemented'
                  ? 'bg-blue-900/20 text-blue-400'
                  : 'bg-gray-700/50 text-gray-300'
              }`}>
                {suggestion.status === 'approved'
                  ? 'Aprobada'
                  : suggestion.status === 'rejected'
                  ? 'Rechazada'
                  : suggestion.status === 'implemented'
                  ? 'Implementada'
                  : 'Pendiente'}
              </span>
            </div>
          </div>
        ))}

        {suggestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay sugerencias disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestionsManagement;