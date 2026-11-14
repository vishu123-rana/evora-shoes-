import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShoeImage } from './ShoeImage';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    updateCartItemSize,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    finalTotal,
    setCurrentView,
    viewProductDetails
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Free delivery threshold: 999
  const freeDeliveryThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#D7E8DC]">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#D7E8DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#183C2B]" />
              <h2 className="font-display text-lg font-bold text-[#183C2B]">
                Your Bag ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-[#587064] hover:text-[#183C2B] hover:bg-[#F5FAF6] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-[#F5FAF6] px-5 py-3 border-b border-[#D7E8DC]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#183C2B]">
                  {remainingForFreeShipping > 0 
                    ? `Add ₹${remainingForFreeShipping.toLocaleString('en-IN')} more for Free Delivery`
                    : '🎉 You have unlocked Free Standard Delivery!'}
                </span>
                <span className="text-[#587064] font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#D7E8DC] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#183C2B] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#D7E8DC] space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-4 first:pt-0 flex gap-4">
                  {/* Shoe Thumbnail */}
                  <div 
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      viewProductDetails(item.product);
                    }}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5FAF6] shrink-0 cursor-pointer border border-[#D7E8DC]"
                  >
                    <ShoeImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      colorHex={item.selectedColor.hex}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            viewProductDetails(item.product);
                          }}
                          className="text-sm font-bold text-[#183C2B] truncate hover:text-[#5FAF78] cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#587064] hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#587064] mt-0.5">
                        <span className="flex items-center gap-1">
                          <span 
                            className="w-2 h-2 rounded-full inline-block border border-[#D7E8DC]" 
                            style={{ backgroundColor: item.selectedColor.hex }} 
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                        <span>·</span>
                        {/* Inline Size Selector */}
                        <div className="flex items-center gap-1">
                          <span>Size:</span>
                          <select
                            value={item.selectedSize}
                            onChange={(e) => updateCartItemSize(item.cartItemId, Number(e.target.value))}
                            className="text-xs font-semibold text-[#183C2B] bg-[#F5FAF6] rounded px-1 py-0.5 border border-[#D7E8DC] cursor-pointer"
                          >
                            {item.product.sizes.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#D7E8DC] rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#587064] hover:bg-[#F5FAF6] text-xs font-bold transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-bold text-[#183C2B] tabular-nums text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#587064] hover:bg-[#F5FAF6] text-xs font-bold transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#183C2B] tabular-nums">
                          ₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F5FAF6] text-[#587064] border border-[#D7E8DC] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#183C2B]">Your bag is empty</h3>
                  <p className="text-xs text-[#587064] mt-1 max-w-xs mx-auto">
                    Explore our crafted footwear designed for comfort and everyday life.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('shop');
                  }}
                  className="px-5 py-2.5 bg-[#183C2B] hover:bg-[#112d20] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer Order Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#D7E8DC] bg-[#F5FAF6]/70 space-y-4">
              
              {/* Coupon Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#DFF3E4] border border-[#A8D5BA] rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-[#183C2B] font-medium">
                      <Sparkles className="w-4 h-4 text-[#5FAF78]" />
                      <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-{appliedCoupon.discountPercent}%)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#587064] hover:text-[#183C2B] font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#587064] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon (e.g. WELCOME10)"
                        className="w-full pl-8 pr-3 py-2 text-xs border border-[#D7E8DC] rounded-lg focus:outline-none focus:border-[#5FAF78] text-[#183C2B] uppercase font-medium bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#183C2B] hover:bg-[#112d20] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#587064] pt-2 border-t border-[#D7E8DC]">
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
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-[#183C2B] tabular-nums">
                    {shippingFee === 0 ? <span className="text-[#5FAF78]">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-[#183C2B] pt-2 border-t border-[#D7E8DC]">
                  <span>Final Total</span>
                  <span className="font-display text-base tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-6 bg-[#183C2B] hover:bg-[#112d20] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-[#587064] text-center">
                Taxes calculated at checkout · Safe 256-bit encrypted checkout
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
