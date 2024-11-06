import { db } from './database';
import { DBSubscription } from '../db/schema';
import { stripe } from '../config/stripe';

export const subscriptionService = {
  async create(subscription: Partial<DBSubscription>): Promise<string> {
    const id = crypto.randomUUID();

    await db.query(
      `INSERT INTO subscriptions (
        id, organization_id, plan, status, stripe_subscription_id,
        stripe_customer_id, current_period_start, current_period_end,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        id,
        subscription.organization_id,
        subscription.plan,
        subscription.status || 'trial',
        subscription.stripe_subscription_id,
        subscription.stripe_customer_id,
        subscription.current_period_start,
        subscription.current_period_end
      ]
    );

    return id;
  },

  async update(id: string, changes: Partial<DBSubscription>): Promise<void> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(changes).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) return;

    values.push(id);
    await db.query(
      `UPDATE subscriptions SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
  },

  async findById(id: string): Promise<DBSubscription | null> {
    return await db.getOne('SELECT * FROM subscriptions WHERE id = ?', [id]);
  },

  async findByOrganization(organizationId: string): Promise<DBSubscription | null> {
    return await db.getOne(
      'SELECT * FROM subscriptions WHERE organization_id = ? ORDER BY created_at DESC LIMIT 1',
      [organizationId]
    );
  },

  async list(): Promise<DBSubscription[]> {
    return await db.query('SELECT * FROM subscriptions ORDER BY created_at DESC');
  },

  async cancel(id: string): Promise<void> {
    const subscription = await this.findById(id);
    if (!subscription) throw new Error('Subscription not found');

    if (subscription.stripe_subscription_id) {
      await stripe.subscriptions.cancel(subscription.stripe_subscription_id);
    }

    await this.update(id, {
      status: 'cancelled',
      cancelled_at: new Date()
    });
  },

  async createInvoice(subscriptionId: string, amount: number): Promise<void> {
    await db.query(
      `INSERT INTO subscription_invoices (
        id, subscription_id, amount, currency, status,
        created_at
      ) VALUES (UUID(), ?, ?, 'EUR', 'unpaid', NOW())`,
      [subscriptionId, amount]
    );
  }
};