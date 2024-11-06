import { useState, useCallback } from 'react';
import { db } from '../db/config';
import { Room, User, Task, Zone, Suggestion, Element } from '../types';

export const getRooms = async () => {
  try {
    return await db.rooms.toArray();
  } catch (err) {
    console.error('Error getting rooms:', err);
    throw err;
  }
};

export const addRoom = async (room: Partial<Room>) => {
  try {
    if (!room.element) throw new Error('Element is required');
    
    const newRoom: Room = {
      id: crypto.randomUUID(),
      element: room.element as Element,
      currentZone: room.currentZone || 'Libre',
      users: room.users || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.rooms.add(newRoom);
    return newRoom.id;
  } catch (err) {
    console.error('Error adding room:', err);
    throw err;
  }
};

export const updateRoom = async (id: string, updates: Partial<Room>) => {
  try {
    await db.rooms.update(id, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (err) {
    console.error('Error updating room:', err);
    throw err;
  }
};

export const deleteRoom = async (id: string) => {
  try {
    await db.rooms.delete(id);
  } catch (err) {
    console.error('Error deleting room:', err);
    throw err;
  }
};

export const getTasks = async (zone?: Zone) => {
  try {
    if (zone) {
      return await db.tasks.where('zone').equals(zone).toArray();
    }
    return await db.tasks.toArray();
  } catch (err) {
    console.error('Error getting tasks:', err);
    throw err;
  }
};

export const addTask = async (task: Partial<Task>) => {
  try {
    const newTask: Task = {
      id: crypto.randomUUID(),
      description: task.description || '',
      zone: task.zone!,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.tasks.add(newTask);
    return newTask.id;
  } catch (err) {
    console.error('Error adding task:', err);
    throw err;
  }
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
  try {
    await db.tasks.update(id, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (err) {
    console.error('Error updating task:', err);
    throw err;
  }
};

export const deleteTask = async (id: string) => {
  try {
    await db.tasks.delete(id);
  } catch (err) {
    console.error('Error deleting task:', err);
    throw err;
  }
};

export const getUsers = async () => {
  try {
    return await db.users.toArray();
  } catch (err) {
    console.error('Error getting users:', err);
    throw err;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await db.users.where('email').equals(email).first();
  } catch (err) {
    console.error('Error getting user by email:', err);
    throw err;
  }
};

export const addUser = async (user: Partial<User>) => {
  try {
    const newUser: User = {
      id: crypto.randomUUID(),
      email: user.email!,
      password: user.password!,
      room: user.room!,
      isAdmin: user.isAdmin || false,
      createdAt: new Date(),
      lastLogin: new Date()
    };

    await db.users.add(newUser);
    return newUser.id;
  } catch (err) {
    console.error('Error adding user:', err);
    throw err;
  }
};

export const updateUser = async (id: string, updates: Partial<User>) => {
  try {
    await db.users.update(id, {
      ...updates,
      lastLogin: updates.lastLogin || new Date()
    });
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await db.users.delete(id);
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
};

export const useDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const withLoading = useCallback(async <T,>(operation: () => Promise<T>) => {
    setLoading(true);
    try {
      const result = await operation();
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    withLoading,
    getRooms: () => withLoading(getRooms),
    addRoom: (room: Partial<Room>) => withLoading(() => addRoom(room)),
    updateRoom: (id: string, updates: Partial<Room>) => withLoading(() => updateRoom(id, updates)),
    deleteRoom: (id: string) => withLoading(() => deleteRoom(id)),
    getTasks: (zone?: Zone) => withLoading(() => getTasks(zone)),
    addTask: (task: Partial<Task>) => withLoading(() => addTask(task)),
    updateTask: (id: string, updates: Partial<Task>) => withLoading(() => updateTask(id, updates)),
    deleteTask: (id: string) => withLoading(() => deleteTask(id)),
    getUsers: () => withLoading(getUsers),
    getUserByEmail: (email: string) => withLoading(() => getUserByEmail(email)),
    addUser: (user: Partial<User>) => withLoading(() => addUser(user)),
    updateUser: (id: string, updates: Partial<User>) => withLoading(() => updateUser(id, updates)),
    deleteUser: (id: string) => withLoading(() => deleteUser(id))
  };
};