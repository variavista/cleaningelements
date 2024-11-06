import { useState } from 'react';
import { db } from '../db/config';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    return await db.tasks.toArray();
  };

  const getTasksByZone = async (zone: string) => {
    return await db.tasks.where('zone').equals(zone).toArray();
  };

  const addTask = async (task: Partial<Task>) => {
    return await db.tasks.add(task as Task);
  };

  const updateTask = async (id: string, changes: Partial<Task>) => {
    return await db.tasks.update(id, changes);
  };

  const deleteTask = async (id: string) => {
    return await db.tasks.delete(id);
  };

  return { tasks, getTasks, getTasksByZone, addTask, updateTask, deleteTask };
};

// Direct exports for standalone usage
export const getTasks = async () => {
  return await db.tasks.toArray();
};

export const addTask = async (task: Partial<Task>) => {
  return await db.tasks.add(task as Task);
};

export const updateTask = async (id: string, changes: Partial<Task>) => {
  return await db.tasks.update(id, changes);
};

export const deleteTask = async (id: string) => {
  return await db.tasks.delete(id);
};