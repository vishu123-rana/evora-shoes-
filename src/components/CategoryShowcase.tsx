import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES_DATA } from '../data/products';
import { ShoeImage } from './ShoeImage';

export const CategoryShowcase: React.FC = () => {
  const { setCurrentView, setFilters } = useStore();

  const handleCategorySelect = (categoryName: string) => {
    setFilters(prev => ({
      ...prev,
      category: categoryName,
      gender: 'All',
      ageGroup: 'All',
      inStockOnly: false
    }));
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-white border-b border-gray-200">
      
      {/* Typography: Oversized Pale-Gray Decorative Watermark */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden opacity-30"
      >
        <span className="font-display font-black text-[120px] sm:text-[180px] lg:text-[240px] tracking-tighter text-gray-300 whitespace-nowrap uppercase">
          CATEGORIES
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5FAF78]">
              CURATED SILHOUETTES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
              EXPLORE BY CATEGORY
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters(prev => ({ ...prev, category: 'All' }));
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'auto' });
            }}
            className="text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#5FAF78] flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 10 Category Cards Grid - Static Clean Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className="cursor-pointer bg-[#F9FAFB] hover:bg-white rounded-2xl p-3.5 border border-gray-200 hover:border-gray-300 shadow-xs hover:shadow-sm flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#F1F3F5] relative mb-3 flex items-center justify-center p-2">
                <div className="w-full h-full flex items-center justify-center">
                  <ShoeImage
                    src={cat.image}
                    alt={cat.name}
                    category={cat.slug}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-sm font-bold text-[#111111] hover:text-[#183C2B] flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                  {cat.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
