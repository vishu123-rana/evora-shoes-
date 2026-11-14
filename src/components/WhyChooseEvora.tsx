import React from 'react';
import { 
  ShieldCheck, 
  Feather, 
  Sparkles, 
  RotateCcw, 
  Award, 
  Leaf, 
  Truck, 
  HeartHandshake,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhyChooseEvora: React.FC = () => {
  const { setCurrentView, setFilters } = useStore();

  const handleExplore = (category?: string) => {
    if (category) {
      setFilters(prev => ({ ...prev, category, inStockOnly: false }));
    }
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const pillars = [
    {
      icon: Feather,
      title: 'Ultralight Kinetic Cushioning',
      subtitle: 'Under 220g Per Shoe',
      description: 'Proprietary CloudFoam™ dual-density midsoles absorb up to 94% of heel-strike ground impact, relieving joint and lower-back pressure through 10,000+ daily steps.'
    },
    {
      icon: Award,
      title: 'Artisan Napa Craftsmanship',
      subtitle: 'Italian Leather & High-Flex Soles',
      description: 'Constructed from sustainably tanned full-grain Napa leather and vulcanized carbon-rubber soles engineered to resist abrasion for over 1,000,000 foot strikes.'
    },
    {
      icon: RotateCcw,
      title: '7-Day Doorstep Size Swap',
      subtitle: 'Hassle-Free Exchange Guarantee',
      description: 'Not sure about your size? We offer free doorstep size swaps and returns across 24,000+ Indian PIN codes. If it does not fit like a glove, we replace it immediately.'
    },
    {
      icon: ShieldCheck,
      title: 'Fair Luxury Pricing',
      subtitle: 'Zero Middleman Markups',
      description: 'By selling direct to you, we eliminate department store markups. You get European boutique craftsmanship that retails elsewhere for ₹12,000+ starting at just ₹2,799.'
    },
    {
      icon: Leaf,
      title: 'Responsible Eco Footprint',
      subtitle: 'Recycled Aeroknit & Clean Dyes',
      description: 'Uppers knitted from recycled ocean and post-consumer polymers, bonded with water-based solvent-free adhesives and packaged in 100% biodegradable boxes.'
    },
    {
      icon: Truck,
      title: 'Express All-India Delivery',
      subtitle: 'Fast Dispatch & Live Tracking',
      description: 'Orders dispatched within 24 hours from our climate-controlled fulfillment hubs with real-time SMS and WhatsApp delivery tracking plus COD support.'
    }
  ];

  const metrics = [
    { value: '4.9 / 5', label: 'Average Customer Rating', note: 'From 12,400+ verified buyers' },
    { value: '100,000+', label: 'Happy Walkers & Runners', note: 'Across India and international' },
    { value: '99.4%', label: 'True-to-Size Accuracy', note: 'Validated by podiatric fit tests' },
    { value: '24,000+', label: 'Indian PIN Codes Served', note: 'Fast express doorstep dispatch' }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F5FAF6] border-y border-[#D7E8DC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFF3E4] border border-[#A8D5BA] text-[11px] font-bold uppercase tracking-wider text-[#183C2B] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#5FAF78]" />
            <span>THE EVORA DIFFERENCE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
            WHY CHOOSE EVORA SHOES?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Every stitch, sole curve, and cushioning compound is thoughtfully engineered to deliver effortless movement, day-long posture support, and timeless modern aesthetics.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D7E8DC] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#DFF3E4] text-[#183C2B] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#183C2B]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#111111]">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#5FAF78] block mb-2">
                    {item.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-[#183C2B]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5FAF78]" />
                  <span>Standard on every EVORA pair</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Metrics Bar */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#D7E8DC] shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#183C2B] tracking-tight tabular-nums block">
                  {m.value}
                </span>
                <p className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                  {m.label}
                </p>
                <span className="text-[11px] text-gray-500 block">
                  {m.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleExplore('Walking Shoes')}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#183C2B] hover:bg-[#112d20] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>Explore Walking Shoes</span>
            <ArrowRight className="w-4 h-4 text-[#A8D5BA]" />
          </button>
          <button
            onClick={() => handleExplore('Running Shoes')}
            className="w-full sm:w-auto px-7 py-3.5 bg-white text-[#183C2B] border border-[#D7E8DC] hover:border-[#183C2B] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Explore Sports & Running</span>
            <ArrowRight className="w-4 h-4 text-[#5FAF78]" />
          </button>
        </div>

      </div>
    </section>
  );
};
