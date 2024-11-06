import { Task, Zone } from '../types';
import { defaultTasks } from '../data/defaultTasks';

export const createInitialTasks = (): Record<Zone, Task[]> => {
  const initial: Record<Zone, Task[]> = {} as Record<Zone, Task[]>;
  
  (Object.keys(defaultTasks) as Zone[]).forEach(zone => {
    initial[zone] = defaultTasks[zone].map((description, index) => ({
      id: `${zone}-${index}`,
      description,
      completed: false,
      zone
    }));
  });
  
  return initial;
};