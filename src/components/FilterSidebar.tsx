import React from 'react';
import { SlidersHorizontal, RotateCcw, X, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES_DATA } from '../data/products';

interface FilterSidebarProps {
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  isMobileDrawer = false, 
  onCloseMobile 
}) => {
  const { filters, setFilters, resetFilters, filteredProducts, products } = useStore();

  const allSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const colorOptions = [
    { name: 'All', hex: '' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#18181B' },
    { name: 'Brown', hex: '#78350F' },
    { name: 'Grey', hex: '#64748B' },
    { name: 'Blue', hex: '#2563EB' },
    { name: 'Tan', hex: '#D6C7A1' }
  ];

  const collections = ['All', 'Core', 'Urban Street', 'Active Performance', 'Tailored Heritage', 'Cloud Walk'];

  const toggleSize = (size: number) => {
    setFilters(prev => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
      };
    });
  };

  const hasActiveFilters = 
    filters.category !== 'All' ||
    filters.gender !== 'All' ||
    filters.ageGroup !== 'All' ||
    filters.collection !== 'All' ||
    filters.color !== 'All' ||
    filters.sizes.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 10000 ||
    filters.rating > 0 ||
    filters.inStockOnly;

  return (
    <div className={`space-y-6 ${isMobileDrawer ? 'p-6' : ''}`}>
      
      {/* Header & Reset Button */}
      <div className="flex items-center justify-between pb-4 border-b border-[#D7E8DC]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#183C2B]" />
          <span className="font-display text-sm font-bold text-[#183C2B] uppercase tracking-wider">
            Filters ({filteredProducts.length} items)
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#587064] hover:text-[#183C2B] flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {isMobileDrawer && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-[#587064] hover:text-[#183C2B]"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#183C2B] block">
          Gender
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {['All', 'men', 'women', 'kids'].map((g) => (
            <button
              key={g}
              onClick={() => setFilters(prev => ({ ...prev, gender: g }))}
              className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                filters.gender === g
                  ? 'bg-[#183C2B] text-white border-[#183C2B] shadow-xs'
                  : 'bg-white text-[#183C2B] border-[#D7E8DC] hover:border-[#A8D5BA]'
              }`}
            >
              {g === 'All' ? 'All Genders' : g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Age Group Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#183C2B] block">
          Age Group
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {['All', 'kids', 'teens', 'adults', 'seniors'].map((age) => (
            <button
              key={age}
              onClick={() => setFilters(prev => ({ ...prev, ageGroup: age }))}
              className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                filters.ageGroup === age
                  ? 'bg-[#183C2B] text-white border-[#183C2B] shadow-xs'
                  : 'bg-white text-[#183C2B] border-[#D7E8DC] hover:border-[#A8D5BA]'
              }`}
            >
              {age === 'All' ? 'All Ages' : age.charAt(0).toUpperCase() + age.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#183C2B] block">
          Category
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <label 
            onClick={() => setFilters(prev => ({ ...prev, category: 'All' }))}
            className={`flex items-center justify-between text-xs py-1.5 px-2 rounded-md cursor-pointer transition-colors ${
              filters.category === 'All' ? 'bg-[#DFF3E4] font-semibold text-[#183C2B]' : 'text-[#587064] hover:bg-[#F5FAF6]'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[#587064] text-[11px] tabular-nums">{products.length}</span>
          </label>

          {CATEGORIES_DATA.map((cat) => {
            const count = products.filter(p => p.category === cat.slug).length;
            const isSelected = filters.category === cat.slug;
            return (
              <label
                key={cat.slug}
                onClick={() => setFilters(prev => ({ ...prev, category: cat.slug }))}
                className={`flex items-center justify-between text-xs py-1.5 px-2 rounded-md cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#DFF3E4] font-semibold text-[#183C2B]' : 'text-[#587064] hover:bg-[#F5FAF6]'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[#587064] text-[11px] tabular-nums">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#183C2B]">
            Max Price
          </label>
          <span className="text-xs font-bold text-[#183C2B] tabular-nums">
            ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="1500"
          max="10000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-[#183C2B] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#587064] tabular-nums">
          <span>₹1,500</span>
          <span>₹5,000</span>
          <span>₹10,000</span>
        </div>
      </div>

      {/* Size Selection Chips */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#183C2B] block">
          Shoe Sizes (UK / India)
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {allSizes.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#183C2B] text-white border-[#183C2B]'
                    : 'bg-white text-[#183C2B] border-[#D7E8DC] hover:border-[#A8D5BA]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#183C2B] block">
          Color Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((c) => {
            const isSelected = filters.color === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setFilters(prev => ({ ...prev, color: c.name }))}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#183C2B] text-white border-[#183C2B] font-semibold'
                    : 'bg-white text-[#183C2B] border-[#D7E8DC] hover:border-[#A8D5BA]'
                }`}
              >
                {c.hex && (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-[#D7E8DC] inline-block"
                    style={{ backgroundColor: c.hex }}
                  />
                )}
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Collection Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#183C2B] block">
          EVORA Collection
        </label>
        <div className="space-y-1">
          {collections.map((col) => (
            <label
              key={col}
              onClick={() => setFilters(prev => ({ ...prev, collection: col }))}
              className={`flex items-center text-xs py-1 px-2 rounded-md cursor-pointer transition-colors ${
                filters.collection === col ? 'bg-[#DFF3E4] font-semibold text-[#183C2B]' : 'text-[#587064] hover:bg-[#F5FAF6]'
              }`}
            >
              <span>{col === 'All' ? 'All Collections' : col}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In-Stock & Availability */}
      <div className="pt-2 border-t border-[#D7E8DC]">
        <label className="flex items-center justify-between text-xs font-medium text-[#183C2B] cursor-pointer">
          <span>In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="w-4 h-4 rounded accent-[#183C2B] cursor-pointer"
          />
        </label>
      </div>

      {/* Close button for mobile */}
      {isMobileDrawer && (
        <div className="pt-4">
          <button
            onClick={onCloseMobile}
            className="w-full py-3 bg-[#183C2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#112d20] transition-colors cursor-pointer shadow-xs"
          >
            Apply Filters ({filteredProducts.length} Results)
          </button>
        </div>
      )}

    </div>
  );
};
