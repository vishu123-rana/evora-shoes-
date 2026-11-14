import React, { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import sneakersAdImg from '../assets/images/evora_premium_sneakers_advertisement.png';
import sandalsCategoryImg from '../assets/images/evora_mens_sandals_comfort_in_every_step.png';
import heroShoeImage from '../assets/images/regenerated_image_1791177634545.png';
import walkingCategoryHeroImg from '../assets/images/gemini_generated_image_r5rvafr5rvafr5rv.png';

interface CategoryHeroData {
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  image: string;
  tag: string;
}

const getCategoryHeroConfig = (category: string, gender: string, ageGroup: string): CategoryHeroData => {
  const normCat = (category || '').toLowerCase().trim();

  if (normCat.includes('walk')) {
    return {
      kicker: 'Cloud Walk Series · 2026 Collection',
      title: 'EVORA Walking Shoes',
      subtitle: 'Doctor-Backed Arch Support & Joint Relief',
      description: 'Engineered with anatomical arch cradles, impact-diffusing CloudFoam cushioning, and seamless breathable stretch knit to protect your knees and joints through 10,000+ daily steps.',
      badge: 'Joint Protection',
      image: walkingCategoryHeroImg,
      tag: 'Cloud Walk Lab'
    };
  }

  if (normCat.includes('sneak')) {
    return {
      kicker: 'Urban Street Silhouettes',
      title: 'EVORA Premium Sneakers',
      subtitle: 'Timeless Style & All-Day Velocity',
      description: 'Engineered with adaptive responsive cushioning and sculptured minimal lines. Built for street precision, low-profile skate agility, and iconic daily fashion.',
      badge: 'Street Precision',
      image: sneakersAdImg,
      tag: 'Urban Street'
    };
  }

  if (normCat.includes('run')) {
    return {
      kicker: 'Active Performance Series',
      title: 'EVORA Running Shoes',
      subtitle: 'Explosive Forward Propulsion',
      description: 'Constructed with proprietary Aeroknit breathable mesh and high-rebound CloudFoam midsoles absorbing 94% of heel strike impact on marathon tracks and city asphalt.',
      badge: 'High-Energy Return',
      image: heroShoeImage,
      tag: 'Performance Lab'
    };
  }

  if (normCat.includes('casual')) {
    return {
      kicker: 'Everyday Relaxed Craft',
      title: 'EVORA Casual Footwear',
      subtitle: 'Effortless Comfort For Long Days',
      description: 'Featherweight slip-ons, unlined suede silhouettes, and flexible cup soles that adapt to every stride. Perfect for weekend travels, cafes, and creative studios.',
      badge: 'Barefoot Softness',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      tag: 'Casual Atelier'
    };
  }

  if (normCat.includes('sport')) {
    return {
      kicker: 'Multi-Court & Turf Grip',
      title: 'EVORA Sports Shoes',
      subtitle: 'Lateral Agility & High-Traction Speed',
      description: 'Engineered with non-marking gum outsoles, torsion stability plates, and abrasion-resistant toe wraps for badminton, pickleball, tennis, and turf sports.',
      badge: 'Anti-Slip Court Traction',
      image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1000&q=80',
      tag: 'Sports Lab'
    };
  }

  if (normCat.includes('train')) {
    return {
      kicker: 'Studio, HIIT & Strength',
      title: 'EVORA Training Shoes',
      subtitle: 'Locked-In Platform Stability',
      description: 'Wide anatomical heel bases, dual-density high-impact foam, and reinforced medial sidewalls built for Olympic lifts, kettlebell circuits, and intense HIIT sessions.',
      badge: 'Locked-In Base',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80',
      tag: 'Studio Training'
    };
  }

  if (normCat.includes('formal') || normCat.includes('derby') || normCat.includes('oxford')) {
    return {
      kicker: 'Tailored Heritage Atelier',
      title: 'EVORA Formal Collection',
      subtitle: 'Hand-Burnished Leather & Podiatric Insole',
      description: 'Full-grain Italian leathers, Goodyear welt construction, and hidden memory foam arch pillows engineered for sharp executive elegance without sore heels.',
      badge: 'Full-Grain Leather',
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
      tag: 'Heritage Atelier'
    };
  }

  if (normCat.includes('boot')) {
    return {
      kicker: 'All-Terrain Expedition',
      title: 'EVORA Heritage Boots',
      subtitle: 'Rugged Weather-Proof Craftsmanship',
      description: 'Oiled waterproof nubuck, storm-welt construction, and high-traction deep-lug outsoles built to master rocky trails, wet streets, and chilly winter breezes.',
      badge: 'Weatherproof Nubuck',
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80',
      tag: 'Expedition Series'
    };
  }

  if (normCat.includes('slip')) {
    return {
      kicker: 'Hands-Free Daily Step-In',
      title: 'EVORA Slip-On Footwear',
      subtitle: 'Instant Step-In & Cushion Comfort',
      description: 'Elastic gusset stretch vamps and high-density memory foam footbeds designed for effortless slip-on simplicity, seniors, and active on-the-go lifestyles.',
      badge: 'Instant Step-In',
      image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80',
      tag: 'Daily Ease'
    };
  }

  if (normCat.includes('sandal')) {
    return {
      kicker: 'Summer Ergonomics',
      title: 'EVORA Ergonomic Sandals',
      subtitle: 'Anatomical Cork-Bed Breathability',
      description: 'Natural contoured cork footbeds, adjustable soft nubuck straps, and flexible EVA traction treads designed for restorative summer airflow and arch health.',
      badge: 'Anatomical Cork Bed',
      image: sandalsCategoryImg,
      tag: 'Summer Solstice'
    };
  }

  if (normCat.includes('kid')) {
    return {
      kicker: 'Growing Stride Tech',
      title: 'EVORA Kids Collection',
      subtitle: 'Flexible, Fun & Scuff-Proof Durability',
      description: 'Pediatric-inspired soft-flex soles, reinforced scuff guards, and simple hook-and-loop closures engineered for non-stop school and playground adventures.',
      badge: 'Scuff-Proof Tech',
      image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80',
      tag: 'Kids Footwear'
    };
  }

  if (gender === 'men') {
    return {
      kicker: "Men's Footwear At EVORA",
      title: "Men's Footwear Collection",
      subtitle: "Biomechanical Precision & Modern Stride",
      description: "Engineered specifically for men's biomechanics and foot widths. From responsive marathon runners to bespoke formal oxfords and versatile street sneakers.",
      badge: "Men's Fit Lab",
      image: heroShoeImage,
      tag: "Men's Line"
    };
  }

  if (gender === 'women') {
    return {
      kicker: "Women's Footwear At EVORA",
      title: "Women's Footwear Collection",
      subtitle: "Featherlight Comfort & Elegant Lines",
      description: "Featherlight knit walking sneakers, responsive cushioning trainers, and chic slip-ons designed to keep you feeling energized through demanding days.",
      badge: "Women's Fit Lab",
      image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80',
      tag: "Women's Line"
    };
  }

  return {
    kicker: 'Autumn / Winter 2026 Collection',
    title: 'EVORA Footwear Collection',
    subtitle: 'Every Step Makes a Statement',
    description: 'Engineered with adaptive responsive cushioning, breathable knit uppers, and sculptured minimal lines. Built for all-day velocity, street precision and generational comfort.',
    badge: 'Every Generation',
    image: sneakersAdImg,
    tag: 'Full Catalog'
  };
};

export const ShopPage: React.FC = () => {
  const { 
    filteredProducts, 
    filters, 
    setFilters, 
    resetFilters,
    searchQuery,
    setSearchQuery,
    products 
  } = useStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5FAF78]">
              <span>EVORA Footwear Collection</span>
              {searchQuery && (
                <>
                  <span className="text-gray-300">/</span>
                  <span className="text-[#111111] font-bold">Search: "{searchQuery}"</span>
                </>
              )}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
              {filters.category !== 'All' 
                ? filters.category 
                : filters.gender !== 'All' 
                ? `${filters.gender.toUpperCase()}'S FOOTWEAR`
                : filters.ageGroup !== 'All'
                ? `MADE FOR ${filters.ageGroup.toUpperCase()}`
                : 'ALL FOOTWEAR'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} premium styles engineered for everyday journeys.
            </p>
          </div>

          {/* Sort Controls & Mobile Filter Trigger */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 bg-white border border-[#D7E8DC] rounded-xl text-xs font-bold flex items-center gap-2 text-[#183C2B] hover:bg-[#F5FAF6] shadow-2xs cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#183C2B]" />
              <span>Filter ({filteredProducts.length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#D7E8DC] shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#587064]" />
              <label htmlFor="sort-select" className="text-xs text-[#587064] font-medium hidden sm:inline">Sort by:</label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="text-xs font-bold text-[#183C2B] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Styles</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Category Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Footwear', cfg: { category: 'All', gender: 'All' } },
            { id: 'men-sneakers', label: "Men's Sneakers", cfg: { category: 'Sneakers', gender: 'men' } },
            { id: 'women-sneakers', label: "Women's Sneakers", cfg: { category: 'Sneakers', gender: 'women' } },
            { id: 'running', label: 'Running Shoes', cfg: { category: 'Running Shoes', gender: 'All' } },
            { id: 'walking', label: 'Walking Shoes', cfg: { category: 'Walking Shoes', gender: 'All' } },
            { id: 'casual', label: 'Casual Shoes', cfg: { category: 'Casual Shoes', gender: 'All' } },
            { id: 'sports', label: 'Sports Shoes', cfg: { category: 'Sports Shoes', gender: 'All' } },
            { id: 'training', label: 'Training Shoes', cfg: { category: 'Training Shoes', gender: 'All' } },
            { id: 'new-arrivals', label: 'New Arrivals', cfg: { category: 'All', gender: 'All', sortBy: 'newest' } },
            { id: 'best-sellers', label: 'Best Sellers', cfg: { category: 'All', gender: 'All', sortBy: 'best-selling' } },
            { id: 'sale', label: 'Sale & Clearance', cfg: { category: 'All', gender: 'All', isSale: true, sortBy: 'price-asc' } }
          ].map((cat) => {
            const isMatch = 
              cat.id === 'all'
                ? filters.category === 'All' && filters.gender === 'All' && filters.sortBy === 'featured'
                : cat.id === 'men-sneakers'
                ? filters.category === 'Sneakers' && filters.gender === 'men'
                : cat.id === 'women-sneakers'
                ? filters.category === 'Sneakers' && filters.gender === 'women'
                : cat.id === 'new-arrivals'
                ? filters.sortBy === 'newest'
                : cat.id === 'best-sellers'
                ? filters.sortBy === 'best-selling'
                : filters.category === cat.cfg.category;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    category: cat.cfg.category || 'All',
                    gender: cat.cfg.gender || 'All',
                    ageGroup: 'All',
                    sortBy: (cat.cfg.sortBy as any) || 'featured',
                    inStockOnly: false
                  }));
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isMatch
                    ? 'bg-[#183C2B] text-white border-[#183C2B] shadow-xs'
                    : 'bg-white text-[#183C2B] border-[#D7E8DC] hover:border-[#5FAF78] hover:bg-[#DFF3E4]/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Active Filters Row (if any) */}
        {(filters.category !== 'All' || filters.gender !== 'All' || filters.ageGroup !== 'All' || filters.sizes.length > 0 || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#587064] font-medium text-[11px] uppercase tracking-wider">Active:</span>

            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#DFF3E4] text-[#183C2B] font-semibold text-xs border border-[#A8D5BA]">
                <span>Category: {filters.category}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, category: 'All' }))} className="hover:text-[#5FAF78]">×</button>
              </span>
            )}

            {filters.gender !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#DFF3E4] text-[#183C2B] font-semibold text-xs capitalize border border-[#A8D5BA]">
                <span>Gender: {filters.gender}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, gender: 'All' }))} className="hover:text-[#5FAF78]">×</button>
              </span>
            )}

            {filters.ageGroup !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#DFF3E4] text-[#183C2B] font-semibold text-xs capitalize border border-[#A8D5BA]">
                <span>Age: {filters.ageGroup}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, ageGroup: 'All' }))} className="hover:text-[#5FAF78]">×</button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#DFF3E4] text-[#183C2B] font-semibold text-xs border border-[#A8D5BA]">
                <span>Query: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-[#5FAF78]">×</button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs text-[#587064] hover:text-[#183C2B] underline ml-2 cursor-pointer font-medium"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Shop Layout: Sidebar (Left) + Product Grid (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-2xl p-6 border border-[#D7E8DC] shadow-xs sticky top-24">
            <FilterSidebar />
          </div>

          {/* Right Product Grid with Staggered Entrance */}
          <div className="lg:col-span-9 space-y-6">
            {/* Dynamic Category Campaign Advertisement Banner */}
            {(() => {
              const heroConfig = getCategoryHeroConfig(filters.category, filters.gender, filters.ageGroup);
              return (
                <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xs group transition-all duration-300 hover:shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                    <div className="md:col-span-7 p-6 sm:p-8 space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFF3E4] text-[#183C2B] text-[10px] font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5FAF78]" />
                        <span>{heroConfig.kicker}</span>
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111111] tracking-tight">
                        {heroConfig.title}
                      </h2>
                      <p className="text-xs font-bold text-[#183C2B] uppercase tracking-wide">
                        {heroConfig.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md">
                        {heroConfig.description}
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 text-[#111111] text-xs font-bold">
                          <span className="text-[#5FAF78]">✓</span>
                          <span>{heroConfig.badge}</span>
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Free 7-Day Doorstep Trial</span>
                      </div>
                    </div>
                    <div className="md:col-span-5 h-56 md:h-full min-h-[220px] relative overflow-hidden bg-[#F4F5F7] flex items-center justify-center p-4">
                      <img
                        src={heroConfig.image}
                        alt={heroConfig.title}
                        className="w-full h-full object-contain md:object-cover object-center"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-700 border border-gray-200">
                        {heroConfig.tag}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              /* No matching products found */
              <div className="bg-white rounded-3xl p-12 text-center border border-[#D7E8DC] space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-[#F5FAF6] text-[#587064] border border-[#D7E8DC] flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#183C2B]">
                  No footwear matches your filters
                </h3>
                <p className="text-xs text-[#587064] max-w-sm mx-auto">
                  Try adjusting or resetting your size, price or category filters to discover available EVORA styles.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#183C2B] hover:bg-[#112d20] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Bottom Sheet Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div 
            className="fixed inset-0 bg-black/60"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl overflow-y-auto z-10 border-t border-[#D7E8DC]">
            <div className="w-12 h-1 bg-[#D7E8DC] rounded-full mx-auto my-3" />
            <FilterSidebar 
              isMobileDrawer={true} 
              onCloseMobile={() => setMobileFilterOpen(false)} 
            />
          </div>
        </div>
      )}

    </div>
  );
};
