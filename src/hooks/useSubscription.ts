import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { subscriptionService } from '../services';
import { SubscriptionPlan } from '../types/subscription';
import { planLimits } from '../db/initial-data';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubscription = useCallback(async (
    organizationId: string,
    plan: SubscriptionPlan
  ) => {
    try {
      setLoading(true);
      setError(null);

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not initialized');

      // Get current subscription
      const currentSubscription = await subscriptionService.findByOrganization(organizationId);
      if (currentSubscription?.status === 'active') {
        throw new Error('Organization already has an active subscription');
      }

      // Create checkout session
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscriptions/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organizationId,
          plan,
          priceId: planLimits[plan].stripePrice
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating checkout session');
      }

      const session = await response.json();

      // Redirect to checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error creating subscription';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelSubscription = useCallback(async (subscriptionId: string) => {
    try {
      setLoading(true);
      setError(null);
      await subscriptionService.cancel(subscriptionId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error cancelling subscription';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSubscription = useCallback(async (organizationId: string) => {
    try {
      setLoading(true);
      setError(null);
      return await subscriptionService.findByOrganization(organizationId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error getting subscription';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createSubscription,
    cancelSubscription,
    getSubscription
  };
};