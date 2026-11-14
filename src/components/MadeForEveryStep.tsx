import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { ShoeImage } from './ShoeImage';

export const MadeForEveryStep: React.FC = () => {
  const { setCurrentView, setFilters, products } = useStore();

  const categories = [
    {
      id: 'kids',
      title: 'Kids',
      tagline: 'Fun, comfortable and durable footwear.',
      description: 'Scuff-resistant caps, flexible soles and easy Velcro straps engineered for playground milestones.',
      cta: 'SHOP KIDS',
      ageGroup: 'kids',
      image: products.find(p => p.id === 'evo-13')?.image || INITIAL_PRODUCTS.find(p => p.id === 'evo-13')?.image || 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
      categoryFallback: 'Kids Shoes',
      colorHex: '#3B82F6'
    },
    {
      id: 'teens',
      title: 'Teens',
      tagline: 'Trendy sneakers and everyday styles.',
      description: 'Street-ready low-tops, retro gum soles and high-tops designed to match energetic campus culture.',
      cta: 'SHOP TEENS',
      ageGroup: 'teens',
      image: products.find(p => p.id === 'evo-02')?.image || INITIAL_PRODUCTS.find(p => p.id === 'evo-02')?.image || 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      categoryFallback: 'Sneakers',
      colorHex: '#18181B'
    },
    {
      id: 'adults',
      title: 'Adults',
      tagline: 'Modern footwear for work, travel and lifestyle.',
      description: 'Napa leather court sneakers, hybrid commuter shoes and breathable runners for life on the move.',
      cta: 'SHOP ADULTS',
      ageGroup: 'adults',
      image: products.find(p => p.id === 'evo-03')?.image || INITIAL_PRODUCTS.find(p => p.id === 'evo-03')?.image || 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
      categoryFallback: 'Formal Shoes',
      colorHex: '#78350F'
    },
    {
      id: 'seniors',
      title: 'Seniors',
      tagline: 'Comfort-focused footwear with easy everyday wear.',
      description: 'Hands-free step-in collars, wide-toe ergonomic boxes and joint-cradling anti-slip soles.',
      cta: 'SHOP COMFORT',
      ageGroup: 'seniors',
      image: products.find(p => p.id === 'evo-16')?.image || INITIAL_PRODUCTS.find(p => p.id === 'evo-16')?.image || 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=800&q=80',
      categoryFallback: 'Walking Shoes',
      colorHex: '#6B7280'
    }
  ];

  const handleCategoryClick = (ageGroup: string) => {
    setFilters(prev => ({
      ...prev,
      ageGroup,
      category: 'All',
      gender: 'All',
      inStockOnly: false
    }));
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-[#F9FAFB] border-b border-gray-200">
      
      {/* 5. Typography: Oversized Pale-Gray Decorative Watermark */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden opacity-30"
      >
        <span className="font-display font-black text-[120px] sm:text-[180px] lg:text-[240px] tracking-tighter text-gray-300 whitespace-nowrap uppercase">
          GENERATIONS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#5FAF78]">
            GENERATIONAL ARCHITECTURE
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight text-balance">
            MADE FOR EVERY STEP
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            From first steps in the playground to weekend travel and golden-age comfort. Footwear precision tailored for every phase of life.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.ageGroup)}
              className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm cursor-pointer"
            >
              {/* Card Image */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F4F5F7] relative flex items-center justify-center p-3">
                <div className="w-full h-full flex items-center justify-center">
                  <ShoeImage
                    src={cat.image}
                    alt={`${cat.title} Footwear - EVORA SHOES`}
                    category={cat.categoryFallback}
                    colorHex={cat.colorHex}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider text-[#111111] uppercase border border-gray-200 shadow-2xs">
                  {cat.title}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#111111] mb-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#183C2B] mb-2">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(cat.ageGroup);
                    }}
                    className="w-full py-2.5 px-4 bg-[#111111] hover:bg-[#183C2B] text-white text-xs font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>{cat.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5FAF78]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
