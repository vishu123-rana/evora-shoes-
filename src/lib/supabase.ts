import { createClient } from '@supabase/supabase-js';
import { Order, Address } from '../types';

export const SUPABASE_PROJECT_ID = 'uwmqcdfrmlsrrgniinqp';
export const SUPABASE_URL = 
  (import.meta.env.VITE_SUPABASE_URL as string) || 
  `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const SUPABASE_ANON_KEY = 
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 
  'sb_publishable_hUl4NwckAO371Jzgejzo0w_t_XqgI1J';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseOrderRow {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  house_street: string;
  area: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  payment_method: string;
  payment_status: string;
  delivery_method: string;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  total: number;
  status: string;
  items: any[];
  items_summary: string;
  shipping_address: Address;
  coupon_code: string | null;
  estimated_delivery: string;
  created_at?: string;
}

export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql

CREATE TABLE IF NOT EXISTS public.orders (
  id text PRIMARY KEY,
  order_number text NOT NULL,
  customer_name text,
  customer_email text,
  customer_phone text,
  house_street text,
  area text,
  city text,
  district text,
  state text,
  pincode text,
  payment_method text,
  payment_status text,
  delivery_method text,
  subtotal numeric,
  discount numeric,
  shipping_fee numeric,
  total numeric,
  status text DEFAULT 'Confirmed',
  items jsonb,
  items_summary text,
  shipping_address jsonb,
  coupon_code text,
  estimated_delivery text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors and users to insert completed order forms
DROP POLICY IF EXISTS "Allow public order form submissions" ON public.orders;
CREATE POLICY "Allow public order form submissions" 
  ON public.orders
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reading orders
DROP POLICY IF EXISTS "Allow reading orders" ON public.orders;
CREATE POLICY "Allow reading orders" 
  ON public.orders
  FOR SELECT 
  TO anon, authenticated
  USING (true);

-- Allow updating order fulfillment status
DROP POLICY IF EXISTS "Allow updating orders" ON public.orders;
CREATE POLICY "Allow updating orders" 
  ON public.orders
  FOR UPDATE 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
`;

/**
 * Checks connection health to the configured Supabase project
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  tableExists: boolean;
  message: string;
}> {
  try {
    const { error } = await supabase.from('orders').select('id').limit(1);
    if (!error) {
      return {
        connected: true,
        tableExists: true,
        message: 'Connected to Supabase. "orders" table is online and ready.'
      };
    }

    if (error.code === 'PGRST205' || error.message.includes('Could not find the table')) {
      return {
        connected: true,
        tableExists: false,
        message: 'Connected to Supabase project, but "orders" table is not created yet. Please execute the SQL schema.'
      };
    }

    return {
      connected: false,
      tableExists: false,
      message: `Supabase returned: ${error.message}`
    };
  } catch (err: any) {
    return {
      connected: false,
      tableExists: false,
      message: err?.message || 'Failed to reach Supabase'
    };
  }
}

/**
 * Saves a completed order form into the Supabase database
 */
export async function saveOrderToSupabase(
  order: Order,
  customerMeta?: { fullName?: string; email?: string; phone?: string }
): Promise<{
  success: boolean;
  error?: string;
  data?: any;
}> {
  try {
    const itemsSummary = order.items
      .map(
        (it) =>
          `${it.product.name} (${it.selectedColor.name}, UK ${it.selectedSize}) x ${it.quantity} - ₹${it.product.discountedPrice * it.quantity}`
      )
      .join(' | ');

    const payload: SupabaseOrderRow = {
      id: order.id,
      order_number: order.orderNumber,
      customer_name: customerMeta?.fullName || order.shippingAddress.fullName || 'Customer',
      customer_email: customerMeta?.email || order.shippingAddress.email || '',
      customer_phone: customerMeta?.phone || order.shippingAddress.phone || '',
      house_street: order.shippingAddress.houseStreet || '',
      area: order.shippingAddress.area || '',
      city: order.shippingAddress.city || '',
      district: order.shippingAddress.district || '',
      state: order.shippingAddress.state || '',
      pincode: order.shippingAddress.pinCode || '',
      payment_method: order.paymentMethod,
      payment_status: order.paymentStatus,
      delivery_method: order.deliveryMethod,
      subtotal: order.subtotal,
      discount: order.discount,
      shipping_fee: order.shippingFee,
      total: order.total,
      status: order.status,
      items: order.items.map((i) => ({
        productId: i.productId,
        productName: i.product.name,
        category: i.product.category,
        size: i.selectedSize,
        color: i.selectedColor.name,
        colorHex: i.selectedColor.hex,
        quantity: i.quantity,
        unitPrice: i.product.discountedPrice,
        totalPrice: i.product.discountedPrice * i.quantity,
        image: i.product.image
      })),
      items_summary: itemsSummary,
      shipping_address: order.shippingAddress,
      coupon_code: order.couponCode || null,
      estimated_delivery: order.estimatedDelivery
    };

    const { data, error } = await supabase.from('orders').insert([payload]).select();

    if (error) {
      console.warn('[Supabase] Error saving order to Supabase:', error);
      return {
        success: false,
        error: error.message
      };
    }

    console.log('[Supabase] Successfully saved order to Supabase:', order.orderNumber, data);
    return {
      success: true,
      data
    };
  } catch (err: any) {
    console.error('[Supabase] Unexpected error saving order:', err);
    return {
      success: false,
      error: err?.message || 'Unknown network error'
    };
  }
}

/**
 * Fetches latest orders directly from Supabase
 */
export async function fetchSupabaseOrders(): Promise<{
  orders: any[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { orders: [], error: error.message };
    }

    return { orders: data || [] };
  } catch (err: any) {
    return { orders: [], error: err?.message || 'Network error' };
  }
}
