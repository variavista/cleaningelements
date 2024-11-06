import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Filter } from 'lucide-react';
import SuggestionCard from './SuggestionCard';
import SuggestionForm from './SuggestionForm';
import { Suggestion } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { getSuggestions, addSuggestion, updateSuggestion } from '../../hooks/useSuggestions';
import ParticleBackground from '../ui/ParticleBackground';

const SuggestionsPage: React.FC = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [votedSuggestions, setVotedSuggestions] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'implemented'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSuggestions();
  }, []);

  useEffect(() => {
    if (user) {
      const savedVotes = localStorage.getItem(`votes-${user.id}`);
      if (savedVotes) {
        setVotedSuggestions(JSON.parse(savedVotes));
      }
    }
  }, [user]);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedSuggestions = await getSuggestions();
      setSuggestions(loadedSuggestions);
    } catch (error) {
      console.error('Error loading suggestions:', error);
      setError('Error al cargar las sugerencias');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id: string) => {
    if (!user) return;

    const suggestion = suggestions.find(s => s.id === id);
    if (!suggestion) return;

    try {
      if (votedSuggestions.includes(id)) {
        const newVotedSuggestions = votedSuggestions.filter(suggestionId => suggestionId !== id);
        setVotedSuggestions(newVotedSuggestions);
        await updateSuggestion(id, { votes: suggestion.votes - 1 });
        setSuggestions(suggestions.map(s =>
          s.id === id ? { ...s, votes: s.votes - 1 } : s
        ));
        localStorage.setItem(`votes-${user.id}`, JSON.stringify(newVotedSuggestions));
      } else {
        const newVotedSuggestions = [...votedSuggestions, id];
        setVotedSuggestions(newVotedSuggestions);
        await updateSuggestion(id, { votes: suggestion.votes + 1 });
        setSuggestions(suggestions.map(s =>
          s.id === id ? { ...s, votes: s.votes + 1 } : s
        ));
        localStorage.setItem(`votes-${user.id}`, JSON.stringify(newVotedSuggestions));
      }
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  };

  const handleSubmit = async (title: string, description: string) => {
    if (!user) return;

    try {
      const newSuggestion: Partial<Suggestion> = {
        id: crypto.randomUUID(),
        title,
        description,
        author: user.email,
        votes: 0,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addSuggestion(newSuggestion);
      setSuggestions([newSuggestion as Suggestion, ...suggestions]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding suggestion:', error);
    }
  };

  const filteredSuggestions = suggestions
    .filter(suggestion => filter === 'all' ? true : suggestion.status === filter)
    .sort((a, b) => b.votes - a.votes);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <ParticleBackground />
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            Sugerencias
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center space-x-2"
          >
            <MessageSquarePlus className="w-5 h-5" />
            <span>{showForm ? 'Cerrar' : 'Nueva Sugerencia'}</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-8">
            <SuggestionForm onSubmit={handleSubmit} />
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas</option>
              <option value="pending">Pendientes</option>
              <option value="approved">Aprobadas</option>
              <option value="implemented">Implementadas</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onVote={handleVote}
                isVoted={votedSuggestions.includes(suggestion.id)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">
                No hay sugerencias disponibles en esta categoría.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SuggestionsPage;