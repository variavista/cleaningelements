import { Zone } from '../types';

export const defaultTasks: Record<Zone, string[]> = {
  'Cocina': [
    'Remojar filtros de campana extractora con desengrasante (noche anterior)',
    'Limpiar filtros de campana extractora',
    'Limpiar polvo encima de las neveras',
    'Limpiar polvo encima de la campana extractora',
    'Limpiar polvo del mueble de madera',
    'Limpiar polvo de las estanterías',
    'Limpiar la ventana de la cocina',
    'Remojar paños de cocina en lejía (noche anterior)',
    'Lavar y secar paños de cocina',
    'Limpiar encimera y barra americana con agua y jabón',
    'Limpiar manchas en paredes de la cocina',
    'Limpiar el horno',
    'Limpiar el microondas',
    'Limpiar neveras por fuera',
    'Barrer el suelo de la cocina',
    'Fregar el suelo de la cocina'
  ],
  'Terraza': [
    'Limpiar polvo de estanterías',
    'Limpiar polvo debajo de la escalera',
    'Barrer suelo de la terraza, moviendo el mobiliario',
    'Fregar suelo de la terraza, moviendo el mobiliario',
    'Regar plantas de la terraza',
    'Limpiar mesa de cristal'
  ],
  'Azotea': [
    'Barrer suelo de la azotea',
    'Limpiar encimera de la azotea',
    'Limpiar cocina de la azotea',
    'Limpiar polvo de estanterías',
    'Limpiar horno de piedra',
    'Limpiar pileta',
    'Desinfectar retrete',
    'Reponer papel higiénico si es necesario',
    'Regar plantas en estanterías y suelo',
    'Fregar suelo de la azotea'
  ],
  'Pasillos': [
    'Barrer pasillos',
    'Limpiar polvo de muebles del pasillo',
    'Limpiar polvo de bordes de madera del pasillo',
    'Fregar suelo del pasillo'
  ],
  'Escaleras': [
    'Barrer escaleras desde la entrada superior hasta la calle',
    'Fregar escaleras desde la entrada superior hasta la calle'
  ]
};