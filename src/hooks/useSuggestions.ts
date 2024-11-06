import { useState } from 'react';
import { db } from '../db/config';
import { Suggestion } from '../types';

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const getSuggestions = async () => {
    return await db.suggestions.toArray();
  };

  const addSuggestion = async (suggestion: Partial<Suggestion>) => {
    if (!suggestion.id) {
      suggestion.id = crypto.randomUUID();
    }
    
    const newSuggestion: Suggestion = {
      id: suggestion.id,
      title: suggestion.title || '',
      description: suggestion.description || '',
      author: suggestion.author || '',
      votes: suggestion.votes || 0,
      status: suggestion.status || 'pending',
      createdAt: suggestion.createdAt || new Date(),
      updatedAt: suggestion.updatedAt || new Date()
    };

    await db.suggestions.add(newSuggestion);
    return newSuggestion.id;
  };

  const updateSuggestion = async (id: string, changes: Partial<Suggestion>) => {
    return await db.suggestions.update(id, {
      ...changes,
      updatedAt: new Date()
    });
  };

  const deleteSuggestion = async (id: string) => {
    return await db.suggestions.delete(id);
  };

  return { suggestions, getSuggestions, addSuggestion, updateSuggestion, deleteSuggestion };
};

// Direct exports for standalone usage
export const getSuggestions = async () => {
  return await db.suggestions.toArray();
};

export const addSuggestion = async (suggestion: Partial<Suggestion>) => {
  if (!suggestion.id) {
    suggestion.id = crypto.randomUUID();
  }
  
  const newSuggestion: Suggestion = {
    id: suggestion.id,
    title: suggestion.title || '',
    description: suggestion.description || '',
    author: suggestion.author || '',
    votes: suggestion.votes || 0,
    status: suggestion.status || 'pending',
    createdAt: suggestion.createdAt || new Date(),
    updatedAt: suggestion.updatedAt || new Date()
  };

  await db.suggestions.add(newSuggestion);
  return newSuggestion.id;
};

export const updateSuggestion = async (id: string, changes: Partial<Suggestion>) => {
  return await db.suggestions.update(id, {
    ...changes,
    updatedAt: new Date()
  });
};

export const deleteSuggestion = async (id: string) => {
  return await db.suggestions.delete(id);
};