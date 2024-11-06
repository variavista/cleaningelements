import { 
  Droplets, Wind, Flame, Mountain, Star, Cloud, Waves, Sparkles,
  Leaf, Zap, Sun, Moon, Snowflake, Rainbow, Heart, Diamond,
  Flower2, Trees, Gem, Coffee
} from 'lucide-react';
import { Element } from '../../types';

export interface ElementOption {
  value: Element;
  label: string;
  icon: React.FC<{ className?: string }>;
  description: string;
  gradient: string;
}

export const elementOptions: ElementOption[] = [
  {
    value: 'Agua',
    label: 'Agua',
    icon: Droplets,
    description: 'Fluye con calma y adaptabilidad',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    value: 'Aire',
    label: 'Aire',
    icon: Wind,
    description: 'Libertad y pensamiento claro',
    gradient: 'from-slate-500 to-gray-400'
  },
  {
    value: 'Fuego',
    label: 'Fuego',
    icon: Flame,
    description: 'Pasión y transformación',
    gradient: 'from-red-500 to-orange-400'
  },
  {
    value: 'Tierra',
    label: 'Tierra',
    icon: Mountain,
    description: 'Estabilidad y crecimiento',
    gradient: 'from-green-500 to-emerald-400'
  },
  {
    value: 'Éter',
    label: 'Éter',
    icon: Star,
    description: 'Conexión y equilibrio',
    gradient: 'from-purple-500 to-violet-400'
  },
  {
    value: 'Nube',
    label: 'Nube',
    icon: Cloud,
    description: 'Suavidad y transformación',
    gradient: 'from-gray-400 to-blue-300'
  },
  {
    value: 'Océano',
    label: 'Océano',
    icon: Waves,
    description: 'Profundidad y misterio',
    gradient: 'from-blue-600 to-indigo-400'
  },
  {
    value: 'Luz',
    label: 'Luz',
    icon: Sparkles,
    description: 'Claridad y verdad',
    gradient: 'from-yellow-300 to-amber-400'
  },
  {
    value: 'Bosque',
    label: 'Bosque',
    icon: Trees,
    description: 'Vida y renovación',
    gradient: 'from-green-600 to-emerald-500'
  },
  {
    value: 'Rayo',
    label: 'Rayo',
    icon: Zap,
    description: 'Energía y poder',
    gradient: 'from-yellow-400 to-amber-500'
  },
  {
    value: 'Sol',
    label: 'Sol',
    icon: Sun,
    description: 'Vitalidad y fuerza',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    value: 'Luna',
    label: 'Luna',
    icon: Moon,
    description: 'Intuición y misterio',
    gradient: 'from-indigo-400 to-purple-500'
  },
  {
    value: 'Hielo',
    label: 'Hielo',
    icon: Snowflake,
    description: 'Claridad y preservación',
    gradient: 'from-blue-200 to-cyan-300'
  },
  {
    value: 'Arcoíris',
    label: 'Arcoíris',
    icon: Rainbow,
    description: 'Diversidad y armonía',
    gradient: 'from-red-400 via-green-400 to-blue-400'
  },
  {
    value: 'Corazón',
    label: 'Corazón',
    icon: Heart,
    description: 'Amor y compasión',
    gradient: 'from-pink-400 to-red-400'
  },
  {
    value: 'Cristal',
    label: 'Cristal',
    icon: Diamond,
    description: 'Claridad y reflexión',
    gradient: 'from-blue-300 to-purple-300'
  },
  {
    value: 'Flor',
    label: 'Flor',
    icon: Flower2,
    description: 'Belleza y crecimiento',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    value: 'Jade',
    label: 'Jade',
    icon: Gem,
    description: 'Sabiduría y serenidad',
    gradient: 'from-emerald-400 to-green-500'
  },
  {
    value: 'Tierra Fértil',
    label: 'Tierra Fértil',
    icon: Leaf,
    description: 'Abundancia y nutrición',
    gradient: 'from-green-500 to-lime-400'
  },
  {
    value: 'Aroma',
    label: 'Aroma',
    icon: Coffee,
    description: 'Esencia y percepción',
    gradient: 'from-amber-600 to-yellow-500'
  }
];