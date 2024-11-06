export type SubscriptionPlan = 'starter' | 'basic' | 'professional' | 'enterprise';

export interface PlanLimit {
  maxRooms: number;
  maxZones: number;
  maxUsers: number;
  price: number;
  name: string;
  description: string;
  features: string[];
}

export interface PlanLimits {
  [key: string]: PlanLimit;
}

export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'trial';

export interface Subscription {
  id: string;
  organizationId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  trialEndsAt?: Date;
  cancelledAt?: Date;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionInvoice {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'unpaid' | 'failed';
  stripeInvoiceId?: string;
  invoiceUrl?: string;
  paidAt?: Date;
  createdAt: Date;
}