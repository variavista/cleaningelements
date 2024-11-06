import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface SuggestionFormProps {
  onSubmit: (title: string, description: string) => void;
}

const SuggestionForm: React.FC<SuggestionFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800/60 backdrop-blur-md rounded-lg shadow-lg border border-gray-700/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Nueva Sugerencia
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1">
            Título
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Título de la sugerencia"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Describe tu sugerencia..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Enviar Sugerencia</span>
        </button>
      </div>
    </form>
  );
};

export default SuggestionForm;