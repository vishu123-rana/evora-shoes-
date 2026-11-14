import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShoeImage } from './ShoeImage';

export const OrderTrackingPage: React.FC = () => {
  const { trackingQuery, setTrackingQuery, getOrderById, orders, setCurrentView } = useStore();
  const [searchInput, setSearchInput] = useState(trackingQuery || 'EVO-84291');

  const currentOrder = getOrderById(searchInput) || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setTrackingQuery(searchInput.trim());
  };

  const stepsList = [
    { title: 'Order Placed', desc: 'Order placed & payment authorized' },
    { title: 'Confirmed', desc: 'Warehouse inventory verified' },
    { title: 'Packed', desc: 'Quality inspected & boxed' },
    { title: 'Shipped', desc: 'Dispatched with carrier' },
    { title: 'Out for Delivery', desc: 'Courier associate assigned' },
    { title: 'Delivered', desc: 'Delivered to recipient' }
  ];

  const currentStatusIndex = currentOrder
    ? stepsList.findIndex((s) => s.title.toLowerCase() === currentOrder.status.toLowerCase())
    : 3; // Default shipped

  return (
    <div className="min-h-screen bg-[#F5FAF6] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title & Search Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#587064]">
            Real-Time Logistics
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#183C2B] tracking-tight">
            TRACK YOUR EVORA ORDER
          </h1>
          <p className="text-xs sm:text-sm text-[#587064]">
            Enter your 8-digit order number from your receipt to check current transit milestones.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="pt-2 flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Package className="w-4 h-4 text-[#587064] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                placeholder="Enter Order # (e.g. EVO-84291)"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono border border-[#D7E8DC] rounded-xl bg-white focus:outline-none focus:border-[#5FAF78] text-[#183C2B] uppercase font-semibold"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Track
            </button>
          </form>
        </div>

        {/* Tracked Order Details Card */}
        {currentOrder ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D7E8DC] shadow-sm space-y-8">
            
            {/* Header info row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D7E8DC] gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#183C2B] text-base">
                    {currentOrder.orderNumber}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    currentOrder.status === 'Delivered'
                      ? 'bg-[#DFF3E4] text-[#183C2B]'
                      : currentOrder.status === 'Cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-[#DFF3E4] text-[#183C2B]'
                  }`}>
                    {currentOrder.status}
                  </span>
                </div>
                <p className="text-xs text-[#587064] mt-1">
                  Placed on {currentOrder.date} · Delivery Method: {currentOrder.deliveryMethod} Express
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-[#587064] block tracking-wider">
                  Estimated Delivery Date
                </span>
                <span className="font-display text-base font-bold text-[#183C2B]">
                  {currentOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* 6-Step Visual Timeline: Order Placed → Confirmed → Packed → Shipped → Out for Delivery → Delivered */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#183C2B] mb-6">
                Milestone Progress Timeline
              </h3>

              {/* Desktop Stepper Bar */}
              <div className="relative hidden md:block mb-8">
                {/* Connecting track line */}
                <div className="absolute top-4 left-6 right-6 h-1 bg-[#D7E8DC] -z-0">
                  <div 
                    className="h-full bg-[#183C2B] transition-all duration-500"
                    style={{
                      width: `${Math.max(0, Math.min(100, (currentStatusIndex / (stepsList.length - 1)) * 100))}%`
                    }}
                  />
                </div>

                <div className="grid grid-cols-6 gap-2 text-center relative z-10">
                  {stepsList.map((step, idx) => {
                    const isCompleted = idx <= currentStatusIndex;
                    const isCurrent = idx === currentStatusIndex;
                    return (
                      <div key={step.title} className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all ${
                            isCompleted
                              ? 'bg-[#183C2B] text-white font-bold'
                              : 'bg-[#F5FAF6] text-[#587064] border border-[#D7E8DC]'
                          } ${isCurrent ? 'ring-4 ring-[#DFF3E4] scale-110' : ''}`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={`text-[11px] font-bold mt-2 leading-tight ${
                          isCurrent ? 'text-[#183C2B]' : isCompleted ? 'text-[#183C2B]' : 'text-[#587064]/70'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile / Vertical Timeline View */}
              <div className="space-y-4 md:hidden">
                {stepsList.map((step, idx) => {
                  const isCompleted = idx <= currentStatusIndex;
                  const isCurrent = idx === currentStatusIndex;
                  return (
                    <div key={step.title} className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                          isCompleted ? 'bg-[#183C2B] text-white font-bold' : 'bg-[#F5FAF6] text-[#587064] border border-[#D7E8DC]'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${isCurrent ? 'text-[#183C2B]' : 'text-[#587064]'}`}>
                          {step.title}
                        </p>
                        <p className="text-[11px] text-[#587064]/70">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carrier Information */}
            <div className="p-4 bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#D7E8DC] flex items-center justify-center text-[#183C2B]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#183C2B] block">Logistics Partner: BlueDart Air Express</span>
                  <span className="text-[#587064] font-mono">AWB Tracking # BD7289192EVO</span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[#587064] block">Need Help with Delivery?</span>
                <span className="font-semibold text-[#183C2B]">support@evorashoes.com</span>
              </div>
            </div>

            {/* Items inside this tracked order */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#183C2B] mb-3">
                Shipment Contents:
              </h3>
              <div className="divide-y divide-[#D7E8DC]/60 border border-[#D7E8DC] rounded-2xl p-4 bg-white space-y-3">
                {currentOrder.items.map((item) => (
                  <div key={item.cartItemId} className="pt-3 first:pt-0 flex items-center gap-4">
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
                        Size {item.selectedSize} · {item.selectedColor.name} · Qty {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-bold text-sm text-[#183C2B] tabular-nums">
                      ₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Address */}
            <div className="p-4 bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] text-xs text-[#587064] flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#5FAF78] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#183C2B]">{currentOrder.shippingAddress.fullName}</p>
                <p>{currentOrder.shippingAddress.houseStreet}, {currentOrder.shippingAddress.area}</p>
                <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.pinCode}</p>
              </div>
            </div>

          </div>
        ) : (
          <div className="p-10 bg-white rounded-3xl border border-[#D7E8DC] text-center space-y-3 shadow-sm">
            <AlertCircle className="w-8 h-8 text-[#587064] mx-auto" />
            <h3 className="font-display text-lg font-bold text-[#183C2B]">
              Order not found
            </h3>
            <p className="text-xs text-[#587064] max-w-sm mx-auto">
              Please double check the order number or click below to track sample demo order EVO-84291.
            </p>
            <button
              onClick={() => {
                setSearchInput('EVO-84291');
                setTrackingQuery('EVO-84291');
              }}
              className="px-5 py-2.5 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
            >
              Track Sample Order (EVO-84291)
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
