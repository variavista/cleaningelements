import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Zone } from '../types';
import { useAuth } from './AuthContext';
import { db } from '../db/config';

interface TaskContextType {
  tasks: Record<Zone, Task[]>;
  addTask: (zone: Zone, description: string) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  getZoneTasks: (zone: Zone) => Task[];
  getZoneProgress: (zone: Zone) => number;
  resetZoneTasks: (zone: Zone) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Record<Zone, Task[]>>({} as Record<Zone, Task[]>);

  useEffect(() => {
    loadAllTasks();
  }, []);

  const loadAllTasks = async () => {
    try {
      const allTasks = await db.tasks.toArray();
      const tasksByZone = allTasks.reduce((acc, task) => {
        if (!acc[task.zone]) {
          acc[task.zone] = [];
        }
        acc[task.zone].push(task);
        return acc;
      }, {} as Record<Zone, Task[]>);
      setTasks(tasksByZone);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const addTask = async (zone: Zone, description: string) => {
    if (!user) return;

    try {
      const newTask: Task = {
        id: `${zone.toLowerCase()}-${Date.now()}`,
        description,
        zone,
        completed: false,
        createdAt: new Date()
      };

      await db.tasks.add(newTask);
      setTasks(prev => ({
        ...prev,
        [zone]: [...(prev[zone] || []), newTask]
      }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (taskId: string) => {
    try {
      const task = await db.tasks.get(taskId);
      if (!task) return;

      const updated = { ...task, completed: !task.completed, updatedAt: new Date() };
      await db.tasks.put(updated);
      
      setTasks(prev => ({
        ...prev,
        [task.zone]: prev[task.zone].map(t => t.id === taskId ? updated : t)
      }));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const resetZoneTasks = async (zone: Zone) => {
    try {
      const zoneTasks = tasks[zone] || [];
      await db.transaction('rw', db.tasks, async () => {
        await Promise.all(
          zoneTasks.map(task => 
            db.tasks.update(task.id, { completed: false, updatedAt: new Date() })
          )
        );
      });

      setTasks(prev => ({
        ...prev,
        [zone]: prev[zone].map(task => ({ ...task, completed: false, updatedAt: new Date() }))
      }));
    } catch (error) {
      console.error('Error resetting tasks:', error);
    }
  };

  const getZoneTasks = (zone: Zone) => tasks[zone] || [];

  const getZoneProgress = (zone: Zone) => {
    const zoneTasks = tasks[zone] || [];
    if (zoneTasks.length === 0) return 0;
    const completed = zoneTasks.filter(task => task.completed).length;
    return Math.round((completed / zoneTasks.length) * 100);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      toggleTask,
      getZoneTasks,
      getZoneProgress,
      resetZoneTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};