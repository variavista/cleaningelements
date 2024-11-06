import React from 'react';
import { Element } from '../../types';
import { ElementOption } from './ElementOptions';

interface ElementSelectorProps {
  options: ElementOption[];
  selectedElement: Element | null;
  onSelect: (element: Element) => void;
}

const ElementSelector: React.FC<ElementSelectorProps> = ({
  options,
  selectedElement,
  onSelect
}) => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {options.map(({ value, label, icon: Icon, gradient }) => (
        <button
          key={value}
          onClick={() => onSelect(value)}
          className={`relative p-4 rounded-lg transition-all duration-300 ${
            selectedElement === value
              ? `bg-gradient-to-b ${gradient} shadow-lg`
              : 'bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600'
          }`}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <Icon className={`w-5 h-5 ${
              selectedElement === value ? 'text-white' : 'text-gray-300'
            }`} />
            <span className={`text-xs font-medium ${
              selectedElement === value ? 'text-white' : 'text-gray-300'
            }`}>
              {label}
            </span>
          </div>
          {selectedElement === value && (
            <div className="absolute inset-0 rounded-lg ring-2 ring-white/50 animate-pulse" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ElementSelector;