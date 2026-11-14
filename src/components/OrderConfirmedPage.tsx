import React, { useState } from 'react';
import { CheckCircle2, Package, ArrowRight, Truck, MapPin, Calendar, Clock, Database, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShoeImage } from './ShoeImage';
import { SUPABASE_SETUP_SQL, SUPABASE_PROJECT_ID } from '../lib/supabase';

export const OrderConfirmedPage: React.FC = () => {
  const { lastPlacedOrder, setCurrentView, setTrackingQuery, retrySyncOrderToSupabase, showToast } = useStore();
  const [copiedSql, setCopiedSql] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  if (!lastPlacedOrder) {
    return (
      <div className="min-h-screen bg-[#F5FAF6] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center space-y-4 border border-[#D7E8DC] shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#183C2B]">No recent order found</h2>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-3 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleTrackClick = () => {
    setTrackingQuery(lastPlacedOrder.orderNumber);
    setCurrentView('track-order');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    showToast('Supabase SQL schema copied to clipboard!', 'success');
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleRetrySync = async () => {
    setIsRetrying(true);
    await retrySyncOrderToSupabase(lastPlacedOrder.id);
    setIsRetrying(false);
  };

  return (
    <div className="min-h-screen bg-[#F5FAF6] py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Main Confirmation Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D7E8DC] shadow-xl space-y-8 text-center">
          
          {/* Animated checkmark header */}
          <div className="space-y-3">
            <div className="w-16 h-16 bg-[#DFF3E4] text-[#5FAF78] rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#183C2B] bg-[#DFF3E4] px-3.5 py-1 rounded-full inline-block">
              Payment Successful
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#183C2B] tracking-tight">
              ORDER CONFIRMED
            </h1>
            <p className="text-[#587064] text-sm max-w-md mx-auto">
              Thank you for stepping into EVORA. We’re hand-inspecting and packaging your footwear for priority dispatch.
            </p>
          </div>

          {/* Supabase Backend Sync Status Callout */}
          <div className="text-left rounded-2xl border p-4 transition-all">
            {lastPlacedOrder.supabaseSynced ? (
              <div className="flex items-start gap-3 bg-[#F0FDF4] border border-[#BBF7D0] p-4 rounded-xl text-xs text-[#166534]">
                <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold flex items-center gap-2">
                    <span>Saved to Supabase Backend</span>
                    <span className="px-2 py-0.5 bg-[#BBF7D0] text-[#14532D] text-[10px] rounded-full font-mono">
                      public.orders
                    </span>
                  </div>
                  <p className="text-[#15803D]">
                    Order #{lastPlacedOrder.orderNumber} and customer details were dispatched to Supabase project <strong className="font-mono">{SUPABASE_PROJECT_ID}</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl space-y-3 text-xs text-[#334155]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Database className="w-4 h-4 text-[#0EA5E9] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0F172A] block">
                        Supabase Backend Sync Status
                      </span>
                      <span className="text-[11px] text-[#64748B]">
                        Connected to project <strong className="font-mono text-[#0F172A]">{SUPABASE_PROJECT_ID}</strong>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleRetrySync}
                    disabled={isRetrying}
                    className="px-3 py-1.5 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{isRetrying ? 'Syncing...' : 'Sync to Supabase'}</span>
                  </button>
                </div>

                {lastPlacedOrder.supabaseError && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[11px] flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Note:</strong> {lastPlacedOrder.supabaseError}.
                      {lastPlacedOrder.supabaseError.includes('schema cache') && (
                        <span> Please create the <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">orders</code> table in your Supabase SQL editor using the schema script below.</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-1 flex items-center justify-between gap-2 border-t border-gray-200">
                  <span className="text-[11px] text-gray-500">Need table schema in Supabase?</span>
                  <button
                    onClick={handleCopySql}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-[#183C2B] hover:text-[#5FAF78] hover:bg-[#DFF3E4] rounded-md transition-colors cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Schema'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Core Order Metadata Banner */}
          <div className="p-4 sm:p-6 bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#587064] block tracking-wider">Order Number</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#183C2B]">{lastPlacedOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#587064] block tracking-wider">Total Paid</span>
              <span className="text-xs sm:text-sm font-bold text-[#183C2B] tabular-nums">₹{lastPlacedOrder.total.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#587064] block tracking-wider">Payment Method</span>
              <span className="text-xs sm:text-sm font-semibold text-[#183C2B]">{lastPlacedOrder.paymentMethod}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#587064] block tracking-wider">Est. Delivery</span>
              <span className="text-xs sm:text-sm font-bold text-[#5FAF78]">{lastPlacedOrder.estimatedDelivery}</span>
            </div>
          </div>

          {/* Products List in this Order */}
          <div className="space-y-3 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#183C2B]">
              Purchased Footwear:
            </h3>
            <div className="divide-y divide-[#D7E8DC]/60 border border-[#D7E8DC] rounded-2xl p-4 bg-white">
              {lastPlacedOrder.items.map((item) => (
                <div key={item.cartItemId} className="py-3 first:pt-0 last:pb-0 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5FAF6] shrink-0 border border-[#D7E8DC]">
                    <ShoeImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      colorHex={item.selectedColor.hex}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#183C2B] truncate">{item.product.name}</h4>
                    <p className="text-xs text-[#587064]">
                      UK/India Size {item.selectedSize} · {item.selectedColor.name} · Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right font-bold text-sm text-[#183C2B] tabular-nums">
                    ₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="p-5 rounded-2xl border border-[#D7E8DC] text-left bg-[#F5FAF6] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183C2B]">
              <MapPin className="w-4 h-4 text-[#5FAF78]" />
              <span>Doorstep Delivery Address:</span>
            </div>
            <div className="text-xs text-[#587064] space-y-0.5 pl-6">
              <p className="font-bold text-[#183C2B]">{lastPlacedOrder.shippingAddress.fullName} · {lastPlacedOrder.shippingAddress.phone}</p>
              <p>{lastPlacedOrder.shippingAddress.houseStreet}, {lastPlacedOrder.shippingAddress.area}</p>
              <p>{lastPlacedOrder.shippingAddress.city}, {lastPlacedOrder.shippingAddress.state} - {lastPlacedOrder.shippingAddress.pinCode}</p>
            </div>
          </div>

          {/* Action CTAs: Track Order & Return Home */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleTrackClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>TRACK YOUR ORDER</span>
            </button>

            <button
              onClick={() => setCurrentView('shop')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#DFF3E4] text-[#183C2B] border border-[#D7E8DC] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
