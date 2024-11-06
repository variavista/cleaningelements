import { useState } from 'react';
import { db } from '../db/config';
import { User } from '../types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    return await db.users.toArray();
  };

  const getUserByEmail = async (email: string) => {
    return await db.users.where('email').equals(email).first();
  };

  const addUser = async (user: Partial<User>) => {
    return await db.users.add(user as User);
  };

  const updateUser = async (id: string, changes: Partial<User>) => {
    return await db.users.update(id, changes);
  };

  const deleteUser = async (id: string) => {
    return await db.users.delete(id);
  };

  return { users, getUsers, getUserByEmail, addUser, updateUser, deleteUser };
};