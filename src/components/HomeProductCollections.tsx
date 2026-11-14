import React, { useState } from 'react';
import { ArrowRight, Trophy, Sparkles, Star, ShoppingBag, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ShoeImage } from './ShoeImage';
import { Product } from '../types';

export const HomeProductCollections: React.FC = () => {
  const { products, setCurrentView, setFilters, viewProductDetails, addToCart } = useStore();
  const [featuredTab, setFeaturedTab] = useState<'all' | 'sneakers' | 'running' | 'new' | 'sale'>('all');

  // Best sellers for the asymmetric layout
  const bestSellersList = products.filter(p => p.isBestSeller);
  const largeFeaturedSneaker = bestSellersList[0] || products[0];
  const sixBestSellers = (bestSellersList.length > 6 ? bestSellersList.slice(1, 7) : products.slice(1, 7));

  // Large card size selection state
  const [largeSize, setLargeSize] = useState<number>(largeFeaturedSneaker?.sizes?.[0] || 8);
  const [largeAdded, setLargeAdded] = useState(false);

  // Featured products filtered for the 4-column grid
  const featuredProducts: Product[] = React.useMemo(() => {
    switch (featuredTab) {
      case 'sneakers':
        return products.filter(p => p.category === 'Sneakers').slice(0, 8);
      case 'running':
        return products.filter(p => p.category === 'Running Shoes' || p.category === 'Sports Shoes').slice(0, 8);
      case 'new':
        return products.filter(p => p.isNewArrival).slice(0, 8);
      case 'sale':
        return products.filter(p => p.discountPercent > 0).slice(0, 8);
      case 'all':
      default:
        return products.slice(0, 8);
    }
  }, [products, featuredTab]);

  const handleLargeAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (largeFeaturedSneaker) {
      addToCart(largeFeaturedSneaker, largeSize, largeFeaturedSneaker.colors[0], 1);
      setLargeAdded(true);
      setTimeout(() => setLargeAdded(false), 1800);
    }
  };

  const handleNavigateToShop = (categoryName?: string) => {
    if (categoryName) {
      setFilters(prev => ({ ...prev, category: categoryName, inStockOnly: false }));
    }
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-white">
      
      {/* ========================================================= */}
      {/* BEST SELLERS: ASYMMETRIC LAYOUT (1 LARGE + 6 SMALL) */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-[#F9FAFB] border-b border-gray-200">
        
        {/* Typography: Oversized Pale-Gray Decorative Watermark */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden opacity-30"
        >
          <span className="font-display font-black text-[120px] sm:text-[180px] lg:text-[240px] tracking-tighter text-gray-300 whitespace-nowrap uppercase">
            BESTSELLERS
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5FAF78] mb-1">
                <Trophy className="w-3.5 h-3.5 text-[#5FAF78]" />
                <span>CUSTOMER FAVORITES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
                BEST SELLERS
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-lg">
                Engineered for maximum street style and all-day comfort. Loved by athletes, creatives, and daily commuters.
              </p>
            </div>

            <button
              onClick={() => handleNavigateToShop()}
              className="text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#5FAF78] flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Premium Asymmetric Layout: 1 Large Left + 6 Smaller Right - Static */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* 1 Large Featured Sneaker on the Left (col-span-5) */}
            <div 
              onClick={() => viewProductDetails(largeFeaturedSneaker)}
              className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 hover:border-gray-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm cursor-pointer relative"
            >
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 bg-[#111111] text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                  #1 BEST SELLER
                </span>
                <span className="px-2.5 py-1 bg-[#DFF3E4] text-[#183C2B] text-[10px] font-bold uppercase rounded-lg">
                  {largeFeaturedSneaker.discountPercent}% OFF
                </span>
              </div>

              {/* Large Shoe Image Stage */}
              <div className="aspect-[4/3] w-full rounded-2xl bg-[#F4F5F7] overflow-hidden flex items-center justify-center p-6 relative my-2">
                <div className="w-full h-full flex items-center justify-center">
                  <ShoeImage
                    src={largeFeaturedSneaker.image}
                    alt={largeFeaturedSneaker.name}
                    category={largeFeaturedSneaker.category}
                    colorHex={largeFeaturedSneaker.colors[0]?.hex}
                    priority={true}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
              </div>

              {/* Product Meta */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="font-bold uppercase tracking-wider text-[11px] text-gray-400">
                      {largeFeaturedSneaker.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-800 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{largeFeaturedSneaker.rating}</span>
                      <span className="text-gray-400 font-normal">({largeFeaturedSneaker.reviewsCount})</span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-black text-[#111111] hover:text-[#183C2B] leading-tight">
                    {largeFeaturedSneaker.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {largeFeaturedSneaker.subtitle}
                  </p>
                </div>

                {/* Available Sizes selector */}
                <div onClick={(e) => e.stopPropagation()}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                    Select Size:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {largeFeaturedSneaker.sizes.slice(0, 6).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setLargeSize(sz)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                          largeSize === sz
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price and Add to Bag */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 line-through tabular-nums mr-2">
                      ₹{largeFeaturedSneaker.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xl font-black text-[#111111] tabular-nums">
                      ₹{largeFeaturedSneaker.discountedPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={handleLargeAddToCart}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs ${
                      largeAdded
                        ? 'bg-[#5FAF78] text-white shadow-md'
                        : 'bg-[#111111] hover:bg-[#183C2B] text-white'
                    }`}
                  >
                    {largeAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO BAG</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 6 Smaller Product Cards on the Right (col-span-7 in a 3x2 grid) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {sixBestSellers.map((shoe) => (
                <div
                  key={shoe.id}
                  onClick={() => viewProductDetails(shoe)}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 p-3.5 flex flex-col justify-between shadow-xs hover:shadow-sm cursor-pointer"
                >
                  {/* Image container */}
                  <div className="relative aspect-square w-full rounded-xl bg-[#F4F5F7] overflow-hidden flex items-center justify-center p-2 mb-2.5">
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoeImage
                        src={shoe.image}
                        alt={shoe.name}
                        category={shoe.category}
                        colorHex={shoe.colors[0]?.hex}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {shoe.discountPercent > 0 && (
                      <span className="absolute top-2 right-2 bg-[#DFF3E4] text-[#183C2B] text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {shoe.discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Card content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mb-0.5">
                        <span className="uppercase font-bold tracking-wider">{shoe.category}</span>
                        <div className="flex items-center gap-0.5 text-gray-700 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{shoe.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-display text-sm font-bold text-[#111111] hover:text-[#183C2B] truncate">
                        {shoe.name}
                      </h4>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-black text-[#111111] tabular-nums">
                          ₹{shoe.discountedPrice.toLocaleString('en-IN')}
                        </span>
                        {shoe.originalPrice > shoe.discountedPrice && (
                          <span className="text-[10px] text-gray-400 line-through tabular-nums">
                            ₹{shoe.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(shoe, shoe.sizes[0] || 8, shoe.colors[0], 1);
                        }}
                        title="Add to bag"
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-[#111111] hover:text-white text-gray-800 flex items-center justify-center cursor-pointer"
                        aria-label={`Add ${shoe.name} to cart`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* FEATURED PRODUCTS: 4-COLUMN PRODUCT GRID */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden py-12 sm:py-20 bg-white">
        
        {/* Typography: Oversized Pale-Gray Decorative Watermark */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden opacity-30"
        >
          <span className="font-display font-black text-[120px] sm:text-[180px] lg:text-[240px] tracking-tighter text-gray-300 whitespace-nowrap uppercase">
            FEATURED
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
          
          {/* Section Header with Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5FAF78] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#5FAF78]" />
                <span>HANDPICKED FOOTWEAR</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
                FEATURED PRODUCTS
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Discover iconic silhouettes built for running, walking, training, and modern streetwear.
              </p>
            </div>

            {/* Collection Filter Tabs */}
            <div className="flex overflow-x-auto gap-1.5 p-1.5 bg-[#F4F5F7] border border-gray-200 rounded-xl max-w-fit self-start md:self-auto scrollbar-none">
              {[
                { id: 'all', label: 'All Featured' },
                { id: 'sneakers', label: 'Sneakers' },
                { id: 'running', label: 'Running & Sports' },
                { id: 'new', label: 'New Arrivals' },
                { id: 'sale', label: 'Sale & Offers' }
              ].map((tab) => {
                const isSelected = featuredTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFeaturedTab(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Bottom Explore Button */}
          <div className="pt-4 text-center">
            <button
              onClick={() => handleNavigateToShop()}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] hover:bg-[#183C2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>EXPLORE ALL COLLECTIONS</span>
              <ArrowRight className="w-4 h-4 text-[#5FAF78]" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
