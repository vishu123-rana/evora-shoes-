import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Award, Users, Footprints, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const useCounter = (target: number, _duration?: number, _trigger?: boolean) => {
  return target;
};

export const CustomerReviewsSection: React.FC = () => {
  const { reviews, products, viewProductDetails } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsTriggered(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const customersCount = useCounter(10000, 1400, statsTriggered);
  const stylesCount = useCounter(50, 1000, statsTriggered);

  const displayReviews = reviews.slice(0, 6);
  const totalSlides = Math.ceil(displayReviews.length / 3);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 sm:py-24 bg-white border-b border-gray-200">
      
      {/* 5. Typography: Oversized Pale-Gray Decorative Watermark */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden opacity-30"
      >
        <span className="font-display font-black text-[120px] sm:text-[180px] lg:text-[240px] tracking-tighter text-gray-300 whitespace-nowrap uppercase">
          REVIEWS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Real Statistics Counter Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-[#F9FAFB] rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs">
          <div className="space-y-1 text-center sm:text-left border-r border-gray-200 last:border-0 pr-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-center sm:justify-start gap-1">
              <Users className="w-3.5 h-3.5 text-[#5FAF78]" />
              <span>Happy Walkers</span>
            </span>
            <div className="font-display text-2xl sm:text-3xl font-black text-[#111111] tabular-nums">
              {customersCount.toLocaleString('en-IN')}+
            </div>
            <p className="text-[11px] text-gray-500">Satisfied customers across India</p>
          </div>

          <div className="space-y-1 text-center sm:text-left border-r border-gray-200 last:border-0 pr-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-center sm:justify-start gap-1">
              <Footprints className="w-3.5 h-3.5 text-[#5FAF78]" />
              <span>Catalog Styles</span>
            </span>
            <div className="font-display text-2xl sm:text-3xl font-black text-[#111111] tabular-nums">
              {stylesCount}+
            </div>
            <p className="text-[11px] text-gray-500">Sneakers, running, walking & sports</p>
          </div>

          <div className="space-y-1 text-center sm:text-left border-r border-gray-200 last:border-0 pr-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-center sm:justify-start gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Average Rating</span>
            </span>
            <div className="font-display text-2xl sm:text-3xl font-black text-[#111111] tabular-nums">
              4.8 ★
            </div>
            <p className="text-[11px] text-gray-500">From 1,200+ verified customer reviews</p>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-center sm:justify-start gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5FAF78]" />
              <span>Fit Guarantee</span>
            </span>
            <div className="font-display text-2xl sm:text-3xl font-black text-[#111111]">
              100%
            </div>
            <p className="text-[11px] text-gray-500">Free doorstep sizing exchange</p>
          </div>
        </div>

        {/* Section Header with Carousel Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5FAF78]">
              REAL TESTIMONIALS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              COMMUNITY REVIEWS
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              From daily fitness enthusiasts to marathoners and commuters. Here is what customers say about stepping into EVORA.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-gray-400 text-gray-800 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-2xs hover:shadow-sm"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-gray-400 text-gray-800 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-2xs hover:shadow-sm"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.slice(activeSlide * 3, activeSlide * 3 + 3).map((rev) => {
            const purchasedShoe = products.find((p) => p.id === rev.productId);

            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 hover:border-gray-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Rating Stars & Age Group */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 text-xs">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                      {rev.ageGroup}
                    </span>
                  </div>

                  {/* Headline & Body */}
                  <div>
                    <h3 className="text-sm font-bold text-[#111111] mb-1.5 leading-snug">
                      "{rev.title}"
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                </div>

                {/* Bottom author and purchased shoe card */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                      <img
                        src={rev.avatar}
                        alt={rev.customerName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#111111]">{rev.customerName}</span>
                        {rev.verifiedPurchase && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5FAF78] shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{rev.date}</span>
                    </div>
                  </div>

                  {/* Purchased product link */}
                  {purchasedShoe && (
                    <button
                      onClick={() => viewProductDetails(purchasedShoe)}
                      className="group text-right text-[11px] font-semibold text-gray-500 hover:text-[#111111] truncate max-w-[120px] transition-colors cursor-pointer"
                      title={`Purchased: ${purchasedShoe.name}`}
                    >
                      <span className="text-[9px] text-gray-400 block uppercase font-normal">Purchased:</span>
                      <span className="truncate block font-bold text-[#111111] group-hover:text-[#5FAF78] transition-colors">{purchasedShoe.name}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
