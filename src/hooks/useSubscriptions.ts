import { useState } from 'react';
import { db } from '../db/config';
import { Subscription, SubscriptionPlan, SubscriptionStatus } from '../types';

export const useSubscriptions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSubscriptions = async () => {
    try {
      return await db.subscriptions.toArray();
    } catch (err) {
      console.error('Error getting subscriptions:', err);
      throw err;
    }
  };

  const getSubscriptionById = async (id: string) => {
    try {
      return await db.subscriptions.get(id);
    } catch (err) {
      console.error('Error getting subscription:', err);
      throw err;
    }
  };

  const createSubscription = async (subscription: Partial<Subscription>) => {
    try {
      const id = await db.subscriptions.add({
        ...subscription,
        createdAt: new Date()
      } as Subscription);
      return id;
    } catch (err) {
      console.error('Error creating subscription:', err);
      throw err;
    }
  };

  const updateSubscription = async (id: string, changes: Partial<Subscription>) => {
    try {
      await db.subscriptions.update(id, {
        ...changes,
        updatedAt: new Date()
      });
    } catch (err) {
      console.error('Error updating subscription:', err);
      throw err;
    }
  };

  const deleteSubscription = async (id: string) => {
    try {
      await db.subscriptions.delete(id);
    } catch (err) {
      console.error('Error deleting subscription:', err);
      throw err;
    }
  };

  const updateSubscriptionStatus = async (id: string, status: SubscriptionStatus) => {
    try {
      await db.subscriptions.update(id, {
        status,
        updatedAt: new Date()
      });
    } catch (err) {
      console.error('Error updating subscription status:', err);
      throw err;
    }
  };

  const changePlan = async (id: string, newPlan: SubscriptionPlan) => {
    try {
      await db.subscriptions.update(id, {
        planId: newPlan,
        updatedAt: new Date()
      });
    } catch (err) {
      console.error('Error changing subscription plan:', err);
      throw err;
    }
  };

  return {
    loading,
    error,
    getSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription,
    updateSubscriptionStatus,
    changePlan
  };
};

// Direct exports for standalone usage
export const getSubscriptions = () => db.subscriptions.toArray();
export const createSubscription = (subscription: Partial<Subscription>) => 
  db.subscriptions.add({
    ...subscription,
    createdAt: new Date()
  } as Subscription);
export const updateSubscription = (id: string, changes: Partial<Subscription>) => 
  db.subscriptions.update(id, {
    ...changes,
    updatedAt: new Date()
  });