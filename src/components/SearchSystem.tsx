import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShoeImage } from './ShoeImage';

export const SearchSystem: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    products, 
    viewProductDetails,
    setCurrentView,
    setFilters
  } = useStore();

  const [inputVal, setInputVal] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const quickPicks = [
    { label: 'Walking Shoes', filter: { category: 'Walking Shoes' } },
    { label: 'Running Shoes', filter: { category: 'Running Shoes' } },
    { label: 'Sneakers', filter: { category: 'Sneakers' } },
    { label: 'Men Footwear', filter: { gender: 'men' } },
    { label: 'Women Footwear', filter: { gender: 'women' } },
    { label: 'Kids Playground', filter: { gender: 'kids' } },
    { label: 'Senior Comfort', filter: { ageGroup: 'seniors' } },
    { label: 'Formal Oxfords', filter: { category: 'Formal Shoes' } }
  ];

  // Search logic across product names, categories, gender, age, colors, sizes
  const trimmed = inputVal.trim().toLowerCase();
  const searchResults = trimmed
    ? products.filter((p) => {
        const matchName = p.name.toLowerCase().includes(trimmed);
        const matchCategory = p.category.toLowerCase().includes(trimmed);
        const matchGender = p.gender.toLowerCase().includes(trimmed);
        const matchAge = p.ageGroup.toLowerCase().includes(trimmed);
        const matchColor = p.colors.some((c) => c.name.toLowerCase().includes(trimmed));
        const matchDesc = p.description.toLowerCase().includes(trimmed);
        const matchSize = !isNaN(Number(trimmed)) && p.sizes.includes(Number(trimmed));
        return matchName || matchCategory || matchGender || matchAge || matchColor || matchDesc || matchSize;
      })
    : [];

  const handleSelectProduct = (product: any) => {
    setIsSearchOpen(false);
    viewProductDetails(product);
  };

  const handleQuickPick = (filterConfig: any) => {
    setFilters(prev => ({
      ...prev,
      category: filterConfig.category || 'All',
      gender: filterConfig.gender || 'All',
      ageGroup: filterConfig.ageGroup || 'All',
      inStockOnly: false
    }));
    setSearchQuery('');
    setInputVal('');
    setIsSearchOpen(false);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleFullSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setSearchQuery(inputVal.trim());
    setIsSearchOpen(false);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Dimmed backdrop */}
      <div 
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-12">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#D7E8DC] overflow-hidden">
          
          {/* Search Header Input Form */}
          <form onSubmit={handleFullSearchSubmit} className="p-4 sm:p-5 border-b border-[#D7E8DC] flex items-center gap-3 bg-[#F5FAF6]">
            <Search className="w-5 h-5 text-[#587064] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search by shoe name, category, color, size, gender (e.g. Urban Runner, White, 9, Kids)..."
              className="flex-1 text-sm sm:text-base font-medium text-[#183C2B] placeholder:text-[#587064]/60 focus:outline-none bg-transparent"
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => setInputVal('')}
                className="text-[#587064] hover:text-[#183C2B] p-1 text-xs font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 rounded-xl text-[#587064] hover:text-[#183C2B] hover:bg-[#DFF3E4]/50 transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Suggestions when empty */}
          {!inputVal.trim() && (
            <div className="p-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#587064] block mb-3">
                  Trending Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickPicks.map((pick) => (
                    <button
                      key={pick.label}
                      onClick={() => handleQuickPick(pick.filter)}
                      className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#DFF3E4] hover:bg-[#A8D5BA] text-[#183C2B] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-[#5FAF78]" />
                      <span>{pick.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Shoes Preview */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#587064] block mb-3">
                  Popular Right Now
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {products.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="group p-3 rounded-2xl border border-[#D7E8DC] hover:border-[#A8D5BA] hover:shadow-sm cursor-pointer transition-all bg-[#F5FAF6] flex flex-col justify-between"
                    >
                      <div className="aspect-square w-full rounded-xl overflow-hidden bg-white mb-2">
                        <ShoeImage
                          src={p.image}
                          alt={p.name}
                          category={p.category}
                          className="w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#183C2B] truncate group-hover:text-[#5FAF78]">
                          {p.name}
                        </p>
                        <p className="text-[11px] font-semibold text-[#587064]">
                          ₹{p.discountedPrice.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results List */}
          {inputVal.trim() && searchResults.length > 0 && (
            <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto divide-y divide-[#D7E8DC]/60">
              <div className="text-xs text-[#587064] mb-3 font-semibold uppercase tracking-wider">
                {searchResults.length} {searchResults.length === 1 ? 'Product' : 'Products'} Found
              </div>

              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-[#F5FAF6] px-3 rounded-2xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F5FAF6] border border-[#D7E8DC] shrink-0">
                      <ShoeImage
                        src={product.image}
                        alt={product.name}
                        category={product.category}
                        colorHex={product.colors[0]?.hex}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#587064]">
                        {product.category} · {product.gender}
                      </span>
                      <h4 className="text-sm font-bold text-[#183C2B] truncate group-hover:text-[#5FAF78]">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#587064] truncate">
                        {product.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex items-center gap-3">
                    <div>
                      <span className="text-sm font-bold text-[#183C2B] tabular-nums">
                        ₹{product.discountedPrice.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.discountedPrice && (
                        <span className="text-xs text-[#587064] line-through tabular-nums block">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#587064] group-hover:text-[#183C2B] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No products found state with alternative recommendations */}
          {inputVal.trim() && searchResults.length === 0 && (
            <div className="p-8 text-center space-y-6">
              <div className="w-12 h-12 rounded-full bg-[#DFF3E4] text-[#183C2B] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-[#183C2B]">
                  No products found for “{inputVal}”
                </h3>
                <p className="text-xs text-[#587064] max-w-sm mx-auto">
                  We could not find any matching shoes. Check your spelling or browse our trending recommendations below.
                </p>
              </div>

              {/* Alternative Recommendations */}
              <div className="pt-4 border-t border-[#D7E8DC] text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#587064] block mb-3">
                  Alternative EVORA Bestsellers:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {products.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="p-3 bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] hover:border-[#A8D5BA] cursor-pointer transition-all"
                    >
                      <div className="aspect-square w-full rounded-xl overflow-hidden bg-white mb-2">
                        <ShoeImage
                          src={p.image}
                          alt={p.name}
                          category={p.category}
                          className="w-full h-full"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-[#183C2B] truncate">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#587064] font-semibold tabular-nums mt-0.5">
                        ₹{p.discountedPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="p-3 bg-[#F5FAF6] border-t border-[#D7E8DC] flex items-center justify-between text-[11px] text-[#587064] px-5">
            <span>Press <kbd className="font-sans px-1.5 py-0.5 bg-white border border-[#D7E8DC] rounded text-[10px] text-[#183C2B]">ENTER</kbd> to view all search results</span>
            <button
              onClick={() => {
                setSearchQuery('');
                setInputVal('');
                setIsSearchOpen(false);
                setCurrentView('shop');
              }}
              className="text-[#183C2B] font-bold hover:text-[#5FAF78] hover:underline cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
