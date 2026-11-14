import React from 'react';
import { ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromotionalBanners: React.FC = () => {
  const { setCurrentView, setFilters, applyCoupon, setIsCartDrawerOpen } = useStore();

  const handleShopSale = () => {
    setFilters(prev => ({
      ...prev,
      category: 'All',
      gender: 'All',
      inStockOnly: false,
      sortBy: 'price-asc'
    }));
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleClaimWelcome = () => {
    applyCoupon('WELCOME10');
    setIsCartDrawerOpen(true);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Banner 1: NEW SEASON. NEW STEPS. */}
          <div className="relative rounded-3xl overflow-hidden bg-[#183C2B] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[280px] shadow-lg group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/[0.04] rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#A8D5BA] block">
                Autumn / Winter Flash Event
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                NEW SEASON. <br />NEW STEPS.
              </h3>
              <p className="text-xs sm:text-sm text-[#DFF3E4] max-w-sm">
                Up to 40% off selected lifestyle, athletic and orthopedic comfort footwear.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={handleShopSale}
                className="px-6 py-3 bg-white text-[#183C2B] hover:bg-[#DFF3E4] text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center gap-2 group-hover:shadow-md cursor-pointer"
              >
                <span>SHOP SALE</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Banner 2: WELCOME TO EVORA */}
          <div className="relative rounded-3xl overflow-hidden bg-[#F9FAFB] border border-gray-200 text-[#111111] p-8 sm:p-10 flex flex-col justify-between min-h-[280px] shadow-xs group">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5FAF78]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  New Member Exclusive
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#183C2B] leading-tight">
                WELCOME TO EVORA
              </h3>
              <p className="text-xs sm:text-sm text-[#587064] max-w-sm">
                Get 10% OFF your first order across our entire footwear catalog.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-[#D7E8DC] shadow-2xs font-mono font-bold text-xs text-[#183C2B]">
                <Tag className="w-3.5 h-3.5 text-[#587064]" />
                <span>WELCOME10</span>
              </div>

              <button
                onClick={handleClaimWelcome}
                className="px-5 py-2.5 bg-[#183C2B] hover:bg-[#112d20] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Claim Discount
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
