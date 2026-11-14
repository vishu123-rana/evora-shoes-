import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Trash2, 
  Clock, 
  ArrowRight, 
  Truck, 
  CheckCircle2,
  RotateCcw,
  ArrowLeftRight,
  ShoppingBag,
  ExternalLink,
  Check,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Address, ReturnRequest } from '../types';
import { ShoeImage } from './ShoeImage';

export const AccountDashboard: React.FC = () => {
  const {
    currentUser,
    logout,
    orders,
    wishlist,
    cart,
    products,
    savedAddresses,
    addAddress,
    removeAddress,
    setCurrentView,
    setTrackingQuery,
    viewProductDetails,
    setIsSizeChartOpen,
    showToast,
    returnRequests,
    submitReturnRequest,
    recentlyViewed: recentIds,
    recentlyCompared: comparedIds,
    comparedProducts,
    addToCompare,
    removeFromCompare,
    isCompared,
    setIsCompareModalOpen,
    addToCart
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    | 'profile' 
    | 'orders' 
    | 'returns'
    | 'saved-cart'
    | 'wishlist' 
    | 'addresses' 
    | 'compared'
    | 'recently-viewed' 
    | 'payments' 
    | 'security'
  >('orders');

  // Return & Exchange form state
  const [showNewReturnModal, setShowNewReturnModal] = useState(false);
  const [selectedReturnOrder, setSelectedReturnOrder] = useState<string>(orders[0]?.orderNumber || 'EVO-84291');
  const [selectedReturnProduct, setSelectedReturnProduct] = useState<string>(orders[0]?.items[0]?.productId || 'evo-01');
  const [returnType, setReturnType] = useState<'Return' | 'Exchange'>('Exchange');
  const [exchangeSize, setExchangeSize] = useState<number>(10);
  const [returnReason, setReturnReason] = useState<ReturnRequest['reason']>('Wrong Size');
  const [returnNotes, setReturnNotes] = useState<string>('');

  // New address state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    houseStreet: '',
    area: '',
    city: '',
    district: '',
    state: '',
    pinCode: '',
    isDefault: false
  });

  // Password change state
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F5FAF6] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center space-y-4 border border-[#D7E8DC] shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#183C2B]">Please sign in</h2>
          <p className="text-xs text-[#587064]">Access your orders, saved addresses and preferences.</p>
          <button
            onClick={() => setCurrentView('home')}
            className="px-6 py-2.5 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));
  
  // Real recently viewed products
  const viewedProducts = recentIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  // Real recently compared products
  const comparedList = comparedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.houseStreet || !newAddr.city || !newAddr.pinCode) {
      showToast('Please fill all required address fields', 'error');
      return;
    }
    addAddress(newAddr);
    setShowAddAddress(false);
    setNewAddr({
      fullName: currentUser.fullName,
      phone: currentUser.phone,
      email: currentUser.email,
      houseStreet: '',
      area: '',
      city: '',
      district: '',
      state: '',
      pinCode: '',
      isDefault: false
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPw || newPw.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }
    showToast('Security password updated successfully', 'success');
    setCurrentPw('');
    setNewPw('');
  };

  const handleStartReturnFromOrder = (orderNumber: string, productId: string) => {
    setSelectedReturnOrder(orderNumber);
    setSelectedReturnProduct(productId);
    setActiveTab('returns');
    setShowNewReturnModal(true);
  };

  const handleSubmitReturnForm = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedOrder = orders.find((o) => o.orderNumber === selectedReturnOrder);
    const matchedItem = matchedOrder?.items.find((it) => it.productId === selectedReturnProduct) || matchedOrder?.items[0];
    const targetProduct = products.find((p) => p.id === selectedReturnProduct) || matchedItem?.product;

    if (!targetProduct) {
      showToast('Unable to locate product details for return', 'error');
      return;
    }

    const pickupAddr = matchedOrder?.shippingAddress || savedAddresses[0] || {
      id: 'addr-default',
      fullName: currentUser.fullName,
      phone: currentUser.phone,
      email: currentUser.email,
      houseStreet: 'Main Street',
      area: 'Indiranagar',
      city: 'Bengaluru',
      district: 'Bengaluru Urban',
      state: 'Karnataka',
      pinCode: '560038',
      isDefault: true
    };

    submitReturnRequest({
      orderNumber: selectedReturnOrder,
      productId: targetProduct.id,
      productName: targetProduct.name,
      productImage: targetProduct.image,
      size: matchedItem?.selectedSize || 9,
      color: matchedItem?.selectedColor.name || targetProduct.colors[0].name,
      type: returnType,
      exchangeSize: returnType === 'Exchange' ? exchangeSize : undefined,
      exchangeColor: targetProduct.colors[0].name,
      reason: returnReason,
      additionalComments: returnNotes,
      pickupAddress: pickupAddr
    });

    setShowNewReturnModal(false);
    setReturnNotes('');
  };

  return (
    <div className="min-h-screen bg-[#F5FAF6] py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Account Header Hero */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7E8DC] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#183C2B] text-white font-display text-2xl font-bold flex items-center justify-center shrink-0">
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-extrabold text-[#183C2B]">
                  {currentUser.fullName}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#DFF3E4] text-[#183C2B] px-2.5 py-0.5 rounded-full">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-[#587064] mt-1">{currentUser.email} · {currentUser.phone || '+91 98765 43210'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser.role === 'admin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className="px-4 py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Open Admin Console
              </button>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 border border-[#D7E8DC] hover:bg-[#DFF3E4]/50 text-[#183C2B] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-[#587064]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Layout: Left Tabs + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-3 border border-[#D7E8DC] shadow-xs space-y-1">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
              { id: 'returns', label: `Returns & Exchanges (${returnRequests.length})`, icon: RotateCcw },
              { id: 'saved-cart', label: `Shopping Bag (${cart.length})`, icon: ShoppingBag },
              { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
              { id: 'addresses', label: `Addresses (${savedAddresses.length})`, icon: MapPin },
              { id: 'compared', label: `Compared Shoes (${comparedProducts.length})`, icon: ArrowLeftRight },
              { id: 'recently-viewed', label: `Recently Viewed (${viewedProducts.length})`, icon: Clock },
              { id: 'payments', label: 'Payment Options', icon: ShieldCheck },
              { id: 'security', label: 'Account Security', icon: ShieldCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#183C2B] text-white shadow-xs'
                      : 'text-[#587064] hover:bg-[#DFF3E4]/50 hover:text-[#183C2B]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-[#D7E8DC] shadow-sm min-h-[420px]">
            
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#183C2B]">Purchase History</h3>
                    <p className="text-xs text-[#587064]">Track shipments, view invoices, or request doorstep returns.</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('returns');
                      setShowNewReturnModal(true);
                    }}
                    className="px-3.5 py-1.5 bg-[#DFF3E4] text-[#183C2B] hover:bg-[#A8D5BA] rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Return / Exchange Request</span>
                  </button>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div key={ord.id} className="p-5 rounded-2xl border border-[#D7E8DC] hover:border-[#A8D5BA] transition-all bg-[#F5FAF6] space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D7E8DC]/60 gap-2">
                          <div>
                            <span className="font-mono text-xs font-bold text-[#183C2B]">{ord.orderNumber}</span>
                            <span className="text-[#587064] text-xs ml-2">Placed on {ord.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#DFF3E4] text-[#183C2B]">
                              {ord.status}
                            </span>
                            <button
                              onClick={() => {
                                setTrackingQuery(ord.orderNumber);
                                setCurrentView('track-order');
                              }}
                              className="text-xs font-bold text-[#183C2B] hover:text-[#5FAF78] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>Track</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-3">
                          {ord.items.map((item) => (
                            <div key={item.cartItemId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs p-2 rounded-xl bg-white border border-[#D7E8DC]/50">
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F5FAF6] shrink-0 border border-[#D7E8DC]">
                                  <ShoeImage src={item.product.image} alt={item.product.name} category={item.product.category} className="w-full h-full" />
                                </div>
                                <div>
                                  <p className="font-bold text-[#183C2B] text-xs sm:text-sm">{item.product.name}</p>
                                  <p className="text-[#587064] text-[11px]">Size {item.selectedSize} · {item.selectedColor.name} · Qty {item.quantity}</p>
                                  <p className="text-[#183C2B] font-bold text-xs mt-0.5">₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 self-end sm:self-center">
                                <button
                                  onClick={() => handleStartReturnFromOrder(ord.orderNumber, item.productId)}
                                  className="px-3 py-1 bg-[#F5FAF6] hover:bg-[#DFF3E4] text-[#183C2B] border border-[#D7E8DC] rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  <RotateCcw className="w-3 h-3 text-[#5FAF78]" />
                                  <span>Return / Exchange</span>
                                </button>
                                <button
                                  onClick={() => viewProductDetails(item.product)}
                                  className="px-3 py-1 text-[#587064] hover:text-[#183C2B] text-[11px] font-semibold"
                                >
                                  View Shoe
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order total & delivery */}
                        <div className="flex justify-between items-center pt-3 border-t border-[#D7E8DC]/60 text-xs">
                          <span className="text-[#587064]">
                            Est. Delivery: <strong className="text-[#183C2B]">{ord.estimatedDelivery}</strong> · {ord.paymentMethod} ({ord.paymentStatus})
                          </span>
                          <span className="font-display font-bold text-sm text-[#183C2B] tabular-nums">
                            ₹{ord.total.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] space-y-3">
                    <Package className="w-10 h-10 text-[#587064] mx-auto opacity-50" />
                    <p className="text-xs text-[#587064]">You haven't placed any footwear orders yet.</p>
                    <button
                      onClick={() => setCurrentView('shop')}
                      className="px-4 py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Shop EVORA Collection
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* RETURNS & EXCHANGES TAB */}
            {activeTab === 'returns' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#183C2B]">Return & Exchange Requests</h3>
                    <p className="text-xs text-[#587064]">
                      7-day doorstep collection and replacement dispatch with zero courier fee.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNewReturnModal(!showNewReturnModal)}
                    className="px-4 py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showNewReturnModal ? 'Close Form' : 'Request New Return / Exchange'}</span>
                  </button>
                </div>

                {/* Return Request Form */}
                {showNewReturnModal && (
                  <form onSubmit={handleSubmitReturnForm} className="p-5 rounded-2xl bg-[#F5FAF6] border border-[#A8D5BA] space-y-4">
                    <h4 className="font-display text-sm font-bold text-[#183C2B] flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-[#5FAF78]" />
                      <span>Schedule Doorstep Return or Sizing Exchange</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#183C2B] block mb-1">Select Order *</label>
                        <select
                          value={selectedReturnOrder}
                          onChange={(e) => setSelectedReturnOrder(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                        >
                          {orders.map((o) => (
                            <option key={o.orderNumber} value={o.orderNumber}>
                              {o.orderNumber} (Placed: {o.date} - ₹{o.total})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#183C2B] block mb-1">Select Shoe *</label>
                        <select
                          value={selectedReturnProduct}
                          onChange={(e) => setSelectedReturnProduct(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                        >
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.category})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#183C2B] block mb-1">Request Type *</label>
                        <div className="flex gap-2">
                          {(['Exchange', 'Return'] as const).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setReturnType(t)}
                              className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                                returnType === t
                                  ? 'bg-[#183C2B] text-white border-[#183C2B]'
                                  : 'bg-white text-[#183C2B] border-[#D7E8DC] hover:bg-[#DFF3E4]'
                              }`}
                            >
                              {t === 'Exchange' ? 'Exchange (Size/Color)' : 'Return (Full Refund)'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {returnType === 'Exchange' && (
                        <div>
                          <label className="text-xs font-bold text-[#183C2B] block mb-1">New Requested Size (UK) *</label>
                          <select
                            value={exchangeSize}
                            onChange={(e) => setExchangeSize(Number(e.target.value))}
                            className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                          >
                            {[6, 7, 8, 9, 10, 11, 12].map((s) => (
                              <option key={s} value={s}>UK {s}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className={returnType === 'Exchange' ? '' : 'sm:col-span-2'}>
                        <label className="text-xs font-bold text-[#183C2B] block mb-1">Reason for Return *</label>
                        <select
                          value={returnReason}
                          onChange={(e) => setReturnReason(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                        >
                          <option value="Wrong Size">Wrong Size / Fit Issue</option>
                          <option value="Uncomfortable / Fit">Uncomfortable / Insufficient Arch Support</option>
                          <option value="Defective / Damaged">Manufacturing Defect or Damage</option>
                          <option value="Not as Pictured">Color / Styling Different Than Pictured</option>
                          <option value="Changed Mind">Changed Mind</option>
                          <option value="Other">Other Reason</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">Additional Notes (Optional)</label>
                      <input
                        type="text"
                        value={returnNotes}
                        onChange={(e) => setReturnNotes(e.target.value)}
                        placeholder="e.g. Please send size 10 in pure white colorway"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowNewReturnModal(false)}
                        className="px-4 py-2 bg-white border border-[#D7E8DC] text-xs font-bold rounded-xl text-[#587064] hover:text-[#183C2B]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Schedule Doorstep Pickup
                      </button>
                    </div>
                  </form>
                )}

                {/* Returns List */}
                {returnRequests.length > 0 ? (
                  <div className="space-y-4">
                    {returnRequests.map((ret) => (
                      <div key={ret.id} className="p-5 rounded-2xl border border-[#D7E8DC] bg-[#F5FAF6] space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#D7E8DC]/60 gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#183C2B]">{ret.rmaNumber}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#183C2B] text-white uppercase">
                              {ret.type}
                            </span>
                            <span className="text-[#587064] text-xs">For Order {ret.orderNumber}</span>
                          </div>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#DFF3E4] text-[#183C2B]">
                            {ret.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border border-[#D7E8DC]">
                            <ShoeImage src={ret.productImage} alt={ret.productName} category="Sneakers" className="w-full h-full" />
                          </div>
                          <div className="flex-1 text-xs">
                            <h5 className="font-bold text-[#183C2B]">{ret.productName}</h5>
                            <p className="text-[#587064]">
                              Original: Size {ret.size} ({ret.color})
                              {ret.type === 'Exchange' && ret.exchangeSize && ` → Replacement: UK ${ret.exchangeSize}`}
                            </p>
                            <p className="text-[#587064] text-[11px] mt-0.5">
                              Reason: <strong>{ret.reason}</strong> {ret.additionalComments ? `(${ret.additionalComments})` : ''}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#D7E8DC]/60 flex items-center justify-between text-xs text-[#587064]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#5FAF78]" />
                            <span>Pickup Scheduled: <strong className="text-[#183C2B]">{ret.pickupDate}</strong></span>
                          </div>
                          <span>Zero Return Courier Charge</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] space-y-2">
                    <RotateCcw className="w-8 h-8 text-[#587064] mx-auto opacity-50" />
                    <p className="text-xs text-[#587064]">No active return or exchange requests.</p>
                  </div>
                )}
              </div>
            )}

            {/* SAVED SHOPPING CART TAB */}
            {activeTab === 'saved-cart' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#183C2B]">Saved Shopping Bag</h3>
                    <p className="text-xs text-[#587064]">Footwear currently reserved in your bag.</p>
                  </div>
                  {cart.length > 0 && (
                    <button
                      onClick={() => setCurrentView('checkout')}
                      className="px-4 py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Proceed to Checkout →
                    </button>
                  )}
                </div>

                {cart.length > 0 ? (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.cartItemId} className="p-4 rounded-2xl border border-[#D7E8DC] bg-[#F5FAF6] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div 
                            onClick={() => viewProductDetails(item.product)}
                            className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-[#D7E8DC] cursor-pointer"
                          >
                            <ShoeImage src={item.product.image} alt={item.product.name} category={item.product.category} className="w-full h-full" />
                          </div>
                          <div>
                            <h4 
                              onClick={() => viewProductDetails(item.product)}
                              className="font-bold text-xs sm:text-sm text-[#183C2B] hover:underline cursor-pointer"
                            >
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-[#587064]">
                              Size {item.selectedSize} · {item.selectedColor.name} · Qty {item.quantity}
                            </p>
                            <span className="text-xs font-bold text-[#183C2B] block mt-1">
                              ₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => viewProductDetails(item.product)}
                          className="px-3 py-1.5 bg-white border border-[#D7E8DC] hover:border-[#5FAF78] text-xs font-bold text-[#183C2B] rounded-xl transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] space-y-3">
                    <ShoppingBag className="w-8 h-8 text-[#587064] mx-auto opacity-50" />
                    <p className="text-xs text-[#587064]">Your shopping bag is currently empty.</p>
                    <button
                      onClick={() => setCurrentView('shop')}
                      className="px-4 py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Browse Catalogue
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#183C2B]">My Wishlist</h3>
                  <p className="text-xs text-[#587064]">Footwear styles saved for later consideration.</p>
                </div>

                {wishlistProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistProducts.map((p) => (
                      <div key={p.id} className="p-4 rounded-2xl border border-[#D7E8DC] bg-[#F5FAF6] space-y-3 flex flex-col justify-between">
                        <div>
                          <div 
                            onClick={() => viewProductDetails(p)}
                            className="aspect-[4/3] rounded-xl overflow-hidden bg-white mb-2 cursor-pointer"
                          >
                            <ShoeImage src={p.image} alt={p.name} category={p.category} className="w-full h-full object-cover" />
                          </div>
                          <h4 
                            onClick={() => viewProductDetails(p)}
                            className="font-bold text-xs text-[#183C2B] hover:underline cursor-pointer truncate"
                          >
                            {p.name}
                          </h4>
                          <span className="text-xs font-bold text-[#183C2B] block mt-0.5">₹{p.discountedPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-[#D7E8DC]/60">
                          <button
                            onClick={() => addToCart(p, p.sizes[0] || 8, p.colors[0], 1)}
                            className="flex-1 py-1.5 bg-[#183C2B] text-white text-xs font-bold rounded-xl hover:bg-[#5FAF78] transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add to Bag</span>
                          </button>
                          <button
                            onClick={() => viewProductDetails(p)}
                            className="px-2.5 py-1.5 bg-white border border-[#D7E8DC] text-[#183C2B] text-xs font-bold rounded-xl hover:bg-[#F5FAF6] cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] space-y-2">
                    <Heart className="w-8 h-8 text-[#587064] mx-auto opacity-50" />
                    <p className="text-xs text-[#587064]">No items in your wishlist yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* COMPARED SHOES TAB */}
            {activeTab === 'compared' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#183C2B]">Compared Footwear Styles</h3>
                    <p className="text-xs text-[#587064]">Side-by-side technical specs, arch support, and cushioning.</p>
                  </div>
                  {comparedList.length > 0 && (
                    <button
                      onClick={() => setIsCompareModalOpen(true)}
                      className="px-4 py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>Open Side-by-Side Comparison →</span>
                    </button>
                  )}
                </div>

                {comparedList.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {comparedList.map((p) => (
                      <div key={p.id} className="p-4 rounded-2xl border border-[#D7E8DC] bg-[#F5FAF6] space-y-3 flex flex-col justify-between">
                        <div>
                          <div 
                            onClick={() => viewProductDetails(p)}
                            className="aspect-[4/3] rounded-xl overflow-hidden bg-white mb-2 cursor-pointer"
                          >
                            <ShoeImage src={p.image} alt={p.name} category={p.category} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] font-bold uppercase text-[#5FAF78]">{p.category}</span>
                          <h4 
                            onClick={() => viewProductDetails(p)}
                            className="font-bold text-xs text-[#183C2B] hover:underline cursor-pointer truncate"
                          >
                            {p.name}
                          </h4>
                          <span className="text-xs font-bold text-[#183C2B] block mt-0.5">₹{p.discountedPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-[#D7E8DC]/60">
                          <button
                            onClick={() => setIsCompareModalOpen(true)}
                            className="flex-1 py-1.5 bg-[#183C2B] text-white text-xs font-bold rounded-xl hover:bg-[#5FAF78] transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <ArrowLeftRight className="w-3 h-3" />
                            <span>Compare Specs</span>
                          </button>
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded-xl"
                            title="Remove from compare"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] space-y-2">
                    <ArrowLeftRight className="w-8 h-8 text-[#587064] mx-auto opacity-50" />
                    <p className="text-xs text-[#587064]">No shoes currently queued in your comparison.</p>
                  </div>
                )}
              </div>
            )}

            {/* RECENTLY VIEWED TAB */}
            {activeTab === 'recently-viewed' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#183C2B]">Recently Viewed Styles</h3>
                  <p className="text-xs text-[#587064]">Footwear models you explored recently.</p>
                </div>

                {viewedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {viewedProducts.map((p) => (
                      <div key={p.id} className="p-3 bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] flex flex-col justify-between hover:border-[#5FAF78] transition-all">
                        <div 
                          onClick={() => viewProductDetails(p)} 
                          className="aspect-square w-full rounded-xl overflow-hidden bg-white mb-2 cursor-pointer"
                        >
                          <ShoeImage src={p.image} alt={p.name} category={p.category} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 onClick={() => viewProductDetails(p)} className="text-xs font-bold text-[#183C2B] truncate cursor-pointer hover:underline">{p.name}</h4>
                          <span className="text-xs font-bold text-[#183C2B] block mt-0.5">₹{p.discountedPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-1 pt-2 mt-2 border-t border-[#D7E8DC]/60">
                          <button
                            onClick={() => viewProductDetails(p)}
                            className="flex-1 py-1 text-[11px] font-bold bg-white text-[#183C2B] border border-[#D7E8DC] rounded-lg hover:bg-[#DFF3E4]"
                          >
                            View Shoe
                          </button>
                          <button
                            onClick={() => {
                              if (isCompared(p.id)) removeFromCompare(p.id);
                              else addToCompare(p.id);
                            }}
                            className={`p-1.5 rounded-lg border text-[11px] ${
                              isCompared(p.id) ? 'bg-[#183C2B] text-white border-[#183C2B]' : 'bg-white text-[#183C2B] border-[#D7E8DC]'
                            }`}
                            title="Compare"
                          >
                            <ArrowLeftRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] space-y-2">
                    <Clock className="w-8 h-8 text-[#587064] mx-auto opacity-50" />
                    <p className="text-xs text-[#587064]">No recently viewed footwear recorded yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#183C2B]">Saved Addresses</h3>
                    <p className="text-xs text-[#587064]">Manage delivery destinations for fast doorstep checkout.</p>
                  </div>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="px-4 py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showAddAddress ? 'Cancel' : 'Add New Address'}</span>
                  </button>
                </div>

                {showAddAddress && (
                  <form onSubmit={handleSaveAddress} className="p-5 rounded-2xl bg-[#F5FAF6] border border-[#A8D5BA] space-y-4">
                    <h4 className="font-display text-sm font-bold text-[#183C2B]">Add Delivery Address</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-[#183C2B] block mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newAddr.fullName}
                          onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#183C2B] block mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={newAddr.phone}
                          onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-[#183C2B] block mb-1">House / Flat / Street *</label>
                        <input
                          type="text"
                          required
                          value={newAddr.houseStreet}
                          onChange={(e) => setNewAddr({ ...newAddr, houseStreet: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#183C2B] block mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#183C2B] block mb-1">PIN Code *</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newAddr.pinCode}
                          onChange={(e) => setNewAddr({ ...newAddr, pinCode: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="px-4 py-2 bg-white border border-[#D7E8DC] text-xs font-bold rounded-xl text-[#587064]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#183C2B] text-white text-xs font-bold rounded-xl hover:bg-[#5FAF78]"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {savedAddresses.map((addr) => (
                    <div key={addr.id} className="p-4 rounded-2xl border border-[#D7E8DC] bg-[#F5FAF6] flex items-center justify-between gap-4">
                      <div className="space-y-0.5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#183C2B]">{addr.fullName}</span>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-[#DFF3E4] text-[#183C2B] font-bold px-2 py-0.5 rounded-full">
                              Default Address
                            </span>
                          )}
                        </div>
                        <p className="text-[#587064]">{addr.houseStreet}, {addr.area}</p>
                        <p className="text-[#587064]">{addr.city}, {addr.state} - {addr.pinCode}</p>
                        <p className="text-[#587064] font-mono text-[11px]">{addr.phone}</p>
                      </div>

                      {savedAddresses.length > 1 && (
                        <button
                          onClick={() => removeAddress(addr.id)}
                          className="p-2 text-[#587064] hover:text-red-600 rounded-lg"
                          title="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#183C2B]">Personal Profile</h3>
                  <p className="text-xs text-[#587064]">Your registered account details and contact preferences.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#587064]">Full Name</span>
                    <p className="font-bold text-sm text-[#183C2B]">{currentUser.fullName}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#587064]">Email Address</span>
                    <p className="font-bold text-sm text-[#183C2B]">{currentUser.email}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#587064]">Phone Number</span>
                    <p className="font-bold text-sm text-[#183C2B]">{currentUser.phone || '+91 98765 43210'}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#587064]">Account Status</span>
                    <p className="font-bold text-sm text-[#5FAF78]">Active Verified Customer</p>
                  </div>
                </div>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#183C2B]">Payment Options & Gateways</h3>
                  <p className="text-xs text-[#587064]">Supported payment methods protected by 256-bit bank encryption.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#183C2B]">UPI & QR Transfers</span>
                      <span className="text-[10px] bg-[#DFF3E4] text-[#183C2B] font-bold px-2 py-0.5 rounded">Active</span>
                    </div>
                    <p className="text-[11px] text-[#587064]">Direct instant settlement via GPay, PhonePe, Paytm, and BHIM.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#183C2B]">Credit / Debit Cards</span>
                      <span className="text-[10px] bg-[#DFF3E4] text-[#183C2B] font-bold px-2 py-0.5 rounded">Active</span>
                    </div>
                    <p className="text-[11px] text-[#587064]">Visa, Mastercard, RuPay, and American Express with 3D Secure OTP verification.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#183C2B]">Cash on Delivery (COD)</span>
                      <span className="text-[10px] bg-[#DFF3E4] text-[#183C2B] font-bold px-2 py-0.5 rounded">Enabled</span>
                    </div>
                    <p className="text-[11px] text-[#587064]">Pay by cash or doorstep UPI scanner upon delivery for orders up to ₹5,000.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#183C2B]">Net Banking</span>
                      <span className="text-[10px] bg-[#DFF3E4] text-[#183C2B] font-bold px-2 py-0.5 rounded">Active</span>
                    </div>
                    <p className="text-[11px] text-[#587064]">Instant portal checkout across 50+ major Indian banks.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#183C2B]">Security & Credentials</h3>
                  <p className="text-xs text-[#587064]">Update your access password and review 2FA protections.</p>
                </div>

                <form onSubmit={handleUpdatePassword} className="p-5 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-4 max-w-md">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#183C2B]">Change Password</h4>
                  <div>
                    <label className="text-xs font-bold text-[#183C2B] block mb-1">Current Password</label>
                    <input
                      type="password"
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#183C2B] block mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
