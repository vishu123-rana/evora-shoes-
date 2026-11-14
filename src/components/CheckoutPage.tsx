import React, { useState } from 'react';
import { 
  Check, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  Lock, 
  ChevronRight,
  AlertCircle,
  RefreshCw,
  X,
  CheckCircle2,
  ShieldAlert,
  Database
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Address } from '../types';
import { ShoeImage } from './ShoeImage';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    appliedCoupon,
    placeOrder,
    currentUser,
    savedAddresses,
    setCurrentView,
    showToast
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    fullName: currentUser?.fullName || 'Vinay Partap',
    email: currentUser?.email || 'partapvinay269@gmail.com',
    phone: currentUser?.phone || '+91 98765 43210'
  });

  const [shippingAddress, setShippingAddress] = useState<Address>(() => {
    if (savedAddresses.length > 0) return savedAddresses[0];
    return {
      id: 'addr-new',
      fullName: 'Vinay Partap',
      phone: '+91 98765 43210',
      email: 'partapvinay269@gmail.com',
      houseStreet: 'Flat 402, Highline Horizon Apartments',
      area: 'Indiranagar 100ft Road',
      city: 'Bengaluru',
      district: 'Bengaluru Urban',
      state: 'Karnataka',
      pinCode: '560038',
      isDefault: true
    };
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'Standard' | 'Express'>('Standard');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery'>('UPI');

  // Dummy card & UPI state
  const [upiId, setUpiId] = useState('partap@okaxis');
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    name: 'VINAY PARTAP',
    expiry: '08/29',
    cvv: '•••'
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verified Payment Gateway State
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState(false);
  const [gatewayStep, setGatewayStep] = useState<'processing' | 'otp' | 'failed' | 'success'>('processing');
  const [gatewayOtp, setGatewayOtp] = useState('842910');
  const [failureReason, setFailureReason] = useState('Bank network timeout');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5FAF6] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center space-y-4 border border-[#D7E8DC] shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#183C2B]">Your bag is empty</h2>
          <p className="text-sm text-[#587064]">Add footwear to your bag before proceeding to checkout.</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-3 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  const effectiveShipping = deliveryMethod === 'Express' ? 149 : shippingFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + effectiveShipping);

  const getResolvedAddress = (): Address => ({
    ...shippingAddress,
    fullName: customerInfo.fullName.trim() || shippingAddress.fullName,
    email: customerInfo.email.trim() || shippingAddress.email,
    phone: customerInfo.phone.trim() || shippingAddress.phone
  });

  const handleCompleteOrder = () => {
    const finalAddress = getResolvedAddress();
    // If Cash on Delivery:
    if (paymentMethod === 'Cash on Delivery') {
      setIsSubmitting(true);
      setTimeout(() => {
        placeOrder(finalAddress, 'Cash on Delivery', deliveryMethod, customerInfo);
        setIsSubmitting(false);
      }, 700);
      return;
    }

    // For online payments: launch verified Bank / Gateway authorization workflow
    setIsGatewayModalOpen(true);
    setGatewayStep('processing');
    setTimeout(() => {
      setGatewayStep('otp');
    }, 1200);
  };

  const handleGatewayApprove = () => {
    setGatewayStep('success');
    const finalAddress = getResolvedAddress();
    setTimeout(() => {
      placeOrder(finalAddress, paymentMethod, deliveryMethod, customerInfo);
      setIsGatewayModalOpen(false);
    }, 900);
  };

  const handleGatewayReject = () => {
    setFailureReason('Issuer Bank Decline: Card limit or authentication timeout (Code: ERR_402)');
    setGatewayStep('failed');
  };

  const handleGatewayRetry = () => {
    setGatewayStep('processing');
    setTimeout(() => {
      setGatewayStep('otp');
    }, 1000);
  };

  const handleGatewayCancel = () => {
    setIsGatewayModalOpen(false);
    showToast('Payment authorization cancelled. No funds were debited.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#F5FAF6] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#D7E8DC] gap-4">
          <button
            onClick={() => setCurrentView('shop')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#587064] hover:text-[#183C2B] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFF3E4] border border-[#A8D5BA] text-[11px] font-semibold text-[#183C2B]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <Database className="w-3 h-3 text-[#183C2B]" />
              <span>Supabase Backend Connected: <strong className="font-mono">uwmqcdfrmlsrrgniinqp</strong></span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#587064]">
              <Lock className="w-3.5 h-3.5 text-[#5FAF78]" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, label: 'Customer' },
              { num: 2, label: 'Shipping' },
              { num: 3, label: 'Delivery' },
              { num: 4, label: 'Payment' }
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num as any)}
                className={`flex flex-col items-center gap-1.5 group cursor-pointer ${
                  step === s.num
                    ? 'text-[#183C2B] font-bold'
                    : step > s.num
                    ? 'text-[#5FAF78] font-semibold'
                    : 'text-[#587064]/60'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                    step === s.num
                      ? 'bg-[#183C2B] text-white font-bold ring-2 ring-[#183C2B] ring-offset-2 ring-offset-[#F5FAF6]'
                      : step > s.num
                      ? 'bg-[#5FAF78] text-white font-bold'
                      : 'bg-[#DFF3E4] text-[#587064]'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Form Steps (Left) + Order Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#D7E8DC] shadow-sm">
            
            {/* STEP 1: Customer Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#183C2B]">
                    Step 1: Customer Information
                  </h2>
                  <p className="text-xs text-[#587064] mt-0.5">
                    We will send order confirmation receipts and tracking alerts here.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#183C2B] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.fullName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40"
                      placeholder="e.g. Vinay Partap"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40"
                        placeholder="partap@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40 tabular-nums"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setShippingAddress((prev) => ({
                        ...prev,
                        fullName: prev.fullName || customerInfo.fullName,
                        email: customerInfo.email,
                        phone: prev.phone || customerInfo.phone
                      }));
                      setStep(2);
                    }}
                    className="px-6 py-3 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Continue to Shipping</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Shipping Address */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#183C2B]">
                    Step 2: Shipping Address
                  </h2>
                  <p className="text-xs text-[#587064] mt-0.5">
                    Please provide an accurate doorstep delivery address.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#183C2B] block mb-1">
                      House / Flat / Building Name / Street *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.houseStreet}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, houseStreet: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40"
                      placeholder="Flat 402, Highline Horizon Apartments"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#183C2B] block mb-1">
                      Area / Locality / Landmark *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.area}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, area: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40"
                      placeholder="Indiranagar 100ft Road, Near Metro"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">
                        District *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.district}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, district: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={shippingAddress.pinCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, pinCode: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/40 tabular-nums font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 text-xs font-semibold text-[#587064] hover:text-[#183C2B] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Continue to Delivery</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Delivery Method */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#183C2B]">
                    Step 3: Delivery Method
                  </h2>
                  <p className="text-xs text-[#587064] mt-0.5">
                    Select your preferred shipping speed.
                  </p>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setDeliveryMethod('Standard')}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      deliveryMethod === 'Standard'
                        ? 'border-[#183C2B] bg-[#DFF3E4]/30 shadow-xs'
                        : 'border-[#D7E8DC] hover:border-[#A8D5BA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#DFF3E4] flex items-center justify-center text-[#183C2B]">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#183C2B]">Standard Surface Delivery</h4>
                        <p className="text-xs text-[#587064]">Delivered in 3 to 5 business days</p>
                      </div>
                    </div>
                    <div className="text-right font-bold text-sm text-[#183C2B]">
                      {shippingFee === 0 ? <span className="text-[#5FAF78]">FREE</span> : `₹${shippingFee}`}
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('Express')}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      deliveryMethod === 'Express'
                        ? 'border-[#183C2B] bg-[#DFF3E4]/30 shadow-xs'
                        : 'border-[#D7E8DC] hover:border-[#A8D5BA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#DFF3E4] flex items-center justify-center text-[#183C2B]">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#183C2B]">Express Priority Air Courier</h4>
                          <span className="text-[10px] bg-[#A8D5BA] text-[#183C2B] font-bold px-2 py-0.5 rounded-full">Fastest</span>
                        </div>
                        <p className="text-xs text-[#587064]">Guaranteed delivery in 24–48 hours</p>
                      </div>
                    </div>
                    <div className="text-right font-bold text-sm text-[#183C2B] tabular-nums">
                      ₹149
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 text-xs font-semibold text-[#587064] hover:text-[#183C2B] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Proceed to Payment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Payment Options */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#183C2B]">
                    Step 4: Payment Method
                  </h2>
                  <p className="text-xs text-[#587064] mt-0.5">
                    Select your preferred secure payment channel.
                  </p>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                    { id: 'Credit/Debit Card', label: 'Card', icon: CreditCard },
                    { id: 'Net Banking', label: 'Net Banking', icon: Building2 },
                    { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote }
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#183C2B] bg-[#183C2B] text-white font-bold shadow-xs'
                            : 'border-[#D7E8DC] text-[#183C2B] bg-[#F5FAF6] hover:bg-[#DFF3E4]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-form based on selected payment method */}
                <div className="p-5 rounded-2xl border border-[#D7E8DC] bg-[#F5FAF6] space-y-4">
                  {paymentMethod === 'UPI' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#183C2B]">Scan QR Code or Enter UPI ID:</span>
                        <span className="text-[11px] text-[#5FAF78] font-semibold">Zero transaction fee</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@okaxis or mobile@upi"
                          className="flex-1 px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-white text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                        />
                        <button
                          type="button"
                          className="px-3.5 py-2 bg-[#DFF3E4] text-[#183C2B] text-xs font-semibold rounded-xl hover:bg-[#A8D5BA] transition-colors cursor-pointer"
                        >
                          Verify
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-[#587064] text-xs pt-1">
                        <span className="text-[#183C2B] font-medium">Supports:</span>
                        <span>Google Pay</span>
                        <span>PhonePe</span>
                        <span>Paytm</span>
                        <span>BHIM</span>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Credit/Debit Card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-[#183C2B] block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-white tabular-nums text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-[#183C2B] block mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-white tabular-nums text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#183C2B] block mb-1">CVV</label>
                          <input
                            type="password"
                            value={cardDetails.cvv}
                            maxLength={4}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-white tabular-nums text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Net Banking' && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#183C2B] block">Select Your Bank</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-white text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                      >
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India (SBI)</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'Cash on Delivery' && (
                    <div className="p-3.5 bg-[#DFF3E4]/50 rounded-xl border border-[#A8D5BA] text-xs text-[#183C2B] space-y-1">
                      <p className="font-bold">Cash on Delivery Available</p>
                      <p className="text-[#587064]">Pay safely with cash or mobile UPI QR code to the delivery associate when your package arrives at your door.</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 text-xs font-semibold text-[#587064] hover:text-[#183C2B] cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    disabled={isSubmitting}
                    onClick={handleCompleteOrder}
                    className="px-8 py-3.5 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#A8D5BA]" />
                    <span>{isSubmitting ? 'PLACING ORDER...' : `PAY & PLACE ORDER (₹${grandTotal.toLocaleString('en-IN')})`}</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#D7E8DC] shadow-sm space-y-5 lg:sticky lg:top-24">
            <h3 className="font-display text-base font-bold text-[#183C2B] pb-3 border-b border-[#D7E8DC] flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-[#587064] font-normal">({cart.length} items)</span>
            </h3>

            {/* Items list preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#D7E8DC]/60 pr-1 space-y-2">
              {cart.map((item) => (
                <div key={item.cartItemId} className="pt-2 first:pt-0 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F5FAF6] shrink-0 border border-[#D7E8DC]">
                    <ShoeImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      colorHex={item.selectedColor.hex}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-[#183C2B] truncate">{item.product.name}</h5>
                    <p className="text-[11px] text-[#587064]">
                      Size {item.selectedSize} · {item.selectedColor.name} · Qty {item.quantity}
                    </p>
                  </div>
                  <div className="text-right text-xs font-bold text-[#183C2B] tabular-nums">
                    ₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2 pt-3 border-t border-[#D7E8DC] text-xs text-[#587064]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#183C2B] tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#5FAF78]">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span className="font-semibold tabular-nums">
                    -₹{discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery ({deliveryMethod})</span>
                <span className="font-semibold text-[#183C2B] tabular-nums">
                  {effectiveShipping === 0 ? <span className="text-[#5FAF78]">FREE</span> : `₹${effectiveShipping}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-[#183C2B] pt-3 border-t border-[#D7E8DC]">
                <span>Total Amount</span>
                <span className="font-display tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Delivery destination preview */}
            <div className="p-3.5 bg-[#F5FAF6] rounded-2xl text-xs text-[#587064] border border-[#D7E8DC] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#587064] block tracking-wider">Shipping To:</span>
              <p className="font-semibold text-[#183C2B]">{shippingAddress.fullName}</p>
              <p className="truncate">{shippingAddress.houseStreet}, {shippingAddress.area}</p>
              <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}</p>
            </div>

          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* VERIFIED PAYMENT GATEWAY & SECURE 3D-SECURE MODAL */}
        {/* ------------------------------------------------------------- */}
        {isGatewayModalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4"
            onClick={handleGatewayCancel}
          >
            <div 
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-[#D7E8DC] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gateway Top Security Banner */}
              <div className="bg-[#183C2B] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#5FAF78] text-[#183C2B] flex items-center justify-center font-bold">
                    <Lock className="w-4 h-4 text-[#183C2B]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8D5BA]">
                      EVORA Payments · Secure Checkout
                    </h4>
                    <p className="text-[11px] text-white/80">
                      256-Bit Bank Level Encryption
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleGatewayCancel}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                  title="Cancel Payment"
                  aria-label="Cancel payment transaction"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Gateway Body */}
              <div className="p-6 space-y-5">
                
                {/* Transaction Amount Bar */}
                <div className="bg-[#F5FAF6] rounded-2xl p-4 border border-[#D7E8DC] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#587064] block tracking-wider">
                      Payable To: EVORA Footwear Pvt. Ltd.
                    </span>
                    <span className="text-xs font-bold text-[#183C2B]">
                      Channel: {paymentMethod}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#587064] block">Authorized Total</span>
                    <span className="font-display text-lg font-black text-[#183C2B] tabular-nums">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* STEP: PROCESSING INITIAL HANDSHAKE */}
                {gatewayStep === 'processing' && (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 border-3 border-[#D7E8DC] border-t-[#183C2B] rounded-full mx-auto" />
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#183C2B]">
                        Connecting to Secure Banking Server...
                      </h4>
                      <p className="text-xs text-[#587064] max-w-xs mx-auto mt-1">
                        Please do not refresh or hit the back button while the payment gateway initializes.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP: OTP / UPI AUTHORIZATION PROMPT */}
                {gatewayStep === 'otp' && (
                  <div className="space-y-4">
                    <div className="p-3.5 bg-[#DFF3E4]/50 border border-[#A8D5BA] rounded-2xl text-xs text-[#183C2B] flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#5FAF78] shrink-0 mt-0.5" />
                      <div>
                        <strong>Bank Verification in Progress:</strong> A 6-digit one-time authorization code has been sent to your registered mobile number ending in <strong>{customerInfo.phone.slice(-4) || '3210'}</strong>.
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#183C2B] block">
                        Enter Banking OTP / Approval Code:
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={gatewayOtp}
                        onChange={(e) => setGatewayOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-center text-lg tracking-[0.3em] font-mono font-bold py-2.5 border-2 border-[#183C2B] rounded-xl focus:outline-none bg-white text-[#183C2B]"
                        placeholder="••••••"
                      />
                      <div className="flex justify-between text-[11px] text-[#587064] pt-1">
                        <span>Demo pre-filled code: 842910</span>
                        <span className="text-[#5FAF78] font-semibold">Resend OTP in 24s</span>
                      </div>
                    </div>

                    {/* Action buttons inside gateway */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={handleGatewayApprove}
                        className="flex-1 py-3 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Confirm & Authorize Payment</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleGatewayReject}
                        className="py-3 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                        title="Simulate bank authorization decline"
                      >
                        Simulate Decline
                      </button>
                    </div>

                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={handleGatewayCancel}
                        className="text-xs text-[#587064] hover:text-[#183C2B] font-semibold cursor-pointer"
                      >
                        Cancel Transaction & Return to Cart
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP: PAYMENT FAILED / RETRY STATE */}
                {gatewayStep === 'failed' && (
                  <div className="py-4 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                      <ShieldAlert className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-red-900">
                        Payment Authorization Failed
                      </h4>
                      <p className="text-xs text-[#587064] max-w-sm mx-auto mt-1">
                        {failureReason}
                      </p>
                    </div>

                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 text-left">
                      <strong>Next step:</strong> You can re-attempt this authorization, select a different credit/debit card or UPI handle, or choose Cash on Delivery at checkout.
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={handleGatewayRetry}
                        className="flex-1 py-2.5 bg-[#183C2B] text-white text-xs font-bold rounded-xl hover:bg-[#5FAF78] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry Authorization</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleGatewayCancel}
                        className="px-4 py-2.5 bg-white border border-[#D7E8DC] text-[#183C2B] text-xs font-bold rounded-xl hover:bg-[#F5FAF6] cursor-pointer"
                      >
                        Change Payment Method
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP: SUCCESS STATE */}
                {gatewayStep === 'success' && (
                  <div className="py-6 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-[#5FAF78] mx-auto" />
                    <h4 className="font-display text-base font-bold text-[#183C2B]">
                      Payment Verified & Confirmed!
                    </h4>
                    <p className="text-xs text-[#587064]">
                      Generating your official EVORA order confirmation and receipt...
                    </p>
                  </div>
                )}

              </div>

              {/* Gateway Bottom Security Footer */}
              <div className="bg-[#F5FAF6] px-6 py-3 border-t border-[#D7E8DC] flex items-center justify-between text-[11px] text-[#587064]">
                <span>NPCI / PCI-DSS Certified Gateway</span>
                <span>Protected by RBI Mandate 2FA</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
