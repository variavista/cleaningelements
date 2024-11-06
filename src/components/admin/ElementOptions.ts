import { 
  Droplets, Wind, Flame, Mountain, Star,
  Snowflake, Zap, Cog, TreePine, Diamond,
  Sun, Cloud, Waves, Flower, Lightbulb,
  Moon, CloudLightning, Sparkles, CloudFog, Atom
} from 'lucide-react';
import { Element } from '../../types';

export interface ElementOption {
  value: Element;
  label: string;
  icon: typeof Droplets;
  gradient: string;
  description: string;
}

export const elementOptions: ElementOption[] = [
  { 
    value: 'Agua', 
    label: 'Agua', 
    icon: Droplets,
    gradient: 'from-blue-500 to-cyan-400',
    description: 'Fluido y adaptable'
  },
  { 
    value: 'Aire', 
    label: 'Aire', 
    icon: Wind,
    gradient: 'from-gray-500 to-gray-400',
    description: 'Libre y ligero'
  },
  { 
    value: 'Fuego', 
    label: 'Fuego', 
    icon: Flame,
    gradient: 'from-red-500 to-orange-400',
    description: 'Intenso y transformador'
  },
  { 
    value: 'Tierra', 
    label: 'Tierra', 
    icon: Mountain,
    gradient: 'from-green-500 to-emerald-400',
    description: 'Estable y nutriente'
  },
  { 
    value: 'Éter', 
    label: 'Éter', 
    icon: Star,
    gradient: 'from-purple-500 to-violet-400',
    description: 'Místico y espiritual'
  },
  { 
    value: 'Hielo', 
    label: 'Hielo', 
    icon: Snowflake,
    gradient: 'from-cyan-500 to-blue-400',
    description: 'Frío y preservador'
  },
  { 
    value: 'Rayo', 
    label: 'Rayo', 
    icon: Zap,
    gradient: 'from-yellow-500 to-amber-400',
    description: 'Veloz y energético'
  },
  { 
    value: 'Metal', 
    label: 'Metal', 
    icon: Cog,
    gradient: 'from-zinc-500 to-gray-400',
    description: 'Fuerte y resistente'
  },
  { 
    value: 'Madera', 
    label: 'Madera', 
    icon: TreePine,
    gradient: 'from-lime-500 to-green-400',
    description: 'Crecimiento y vida'
  },
  { 
    value: 'Cristal', 
    label: 'Cristal', 
    icon: Diamond,
    gradient: 'from-sky-500 to-indigo-400',
    description: 'Claridad y pureza'
  },
  { 
    value: 'Lava', 
    label: 'Lava', 
    icon: Flame,
    gradient: 'from-orange-500 to-red-400',
    description: 'Fundido y poderoso'
  },
  { 
    value: 'Vapor', 
    label: 'Vapor', 
    icon: Cloud,
    gradient: 'from-blue-400 to-gray-300',
    description: 'Etéreo y cambiante'
  },
  { 
    value: 'Arena', 
    label: 'Arena', 
    icon: Waves,
    gradient: 'from-yellow-600 to-amber-500',
    description: 'Fluido y moldeable'
  },
  { 
    value: 'Planta', 
    label: 'Planta', 
    icon: Flower,
    gradient: 'from-emerald-500 to-green-400',
    description: 'Vital y renovable'
  },
  { 
    value: 'Luz', 
    label: 'Luz', 
    icon: Lightbulb,
    gradient: 'from-yellow-400 to-amber-300',
    description: 'Brillante e iluminador'
  },
  { 
    value: 'Sombra', 
    label: 'Sombra', 
    icon: Moon,
    gradient: 'from-gray-700 to-gray-600',
    description: 'Misterioso y profundo'
  },
  { 
    value: 'Tormenta', 
    label: 'Tormenta', 
    icon: CloudLightning,
    gradient: 'from-indigo-600 to-purple-500',
    description: 'Caótico y poderoso'
  },
  { 
    value: 'Polvo', 
    label: 'Polvo', 
    icon: Sparkles,
    gradient: 'from-stone-500 to-gray-400',
    description: 'Sutil y omnipresente'
  },
  { 
    value: 'Niebla', 
    label: 'Niebla', 
    icon: CloudFog,
    gradient: 'from-gray-400 to-slate-300',
    description: 'Misterioso y envolvente'
  },
  { 
    value: 'Plasma', 
    label: 'Plasma', 
    icon: Atom,
    gradient: 'from-fuchsia-500 to-pink-400',
    description: 'Energético y radiante'
  }
];