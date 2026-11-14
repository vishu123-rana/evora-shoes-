import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Star, 
  RotateCcw, 
  ShieldCheck, 
  Zap,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShoeImage } from './ShoeImage';
import { Product, ProductColor } from '../types';
import heroShoeImage from '../assets/images/regenerated_image_1791177634545.png';
import walkingCategoryHeroImg from '../assets/images/gemini_generated_image_r5rvafr5rvafr5rv.png';

interface ShowcaseShoeItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badge: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  description: string;
  highlights: string[];
  colors: {
    name: string;
    hex: string;
    image: string;
  }[];
  sizes: number[];
  productRefId: string;
}

export const HeroSection: React.FC = () => {
  const { 
    setCurrentView, 
    setFilters, 
    products, 
    addToCart, 
    viewProductDetails,
    toggleWishlist,
    isInWishlist,
    showToast
  } = useStore();

  // Curate showcase shoe models with photorealistic color variants
  const showcaseShoes: ShowcaseShoeItem[] = React.useMemo(() => [
    {
      id: 'showcase-0',
      name: 'EVORA Retro High 85',
      tagline: 'Iconic Chicago Heritage · Full-Grain Leather & Ankle Lock',
      category: 'Retro Sneakers',
      badge: 'ICONIC 1985',
      originalPrice: 5299,
      discountedPrice: 3699,
      discountPercent: 30,
      rating: 4.9,
      reviewsCount: 342,
      description: 'Inspiradas en la leyenda. Built with full-grain leather, high padded collar support, perforated breathability, and heavy-duty stitched rubber cupsole.',
      highlights: ['High-Top Ankle Lock', 'Chicago Colorway', 'Stitched Cupsole'],
      colors: [
        {
          name: 'Chicago Varsity Red & Black',
          hex: '#DC2626',
          image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80'
        },
        {
          name: 'Royal Court Blue & Black',
          hex: '#1D4ED8',
          image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80'
        },
        {
          name: 'Pine Forest Green & Black',
          hex: '#15803D',
          image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      sizes: [7, 8, 9, 10, 11, 12],
      productRefId: 'evo-12'
    },
    {
      id: 'showcase-1',
      name: 'EVORA Urban Runner Pro',
      tagline: 'Ultralight Kinetic Cushioning · All-Day Forward Motion',
      category: 'Running Shoes',
      badge: 'FLAGSHIP 2026',
      originalPrice: 5499,
      discountedPrice: 3849,
      discountPercent: 30,
      rating: 4.9,
      reviewsCount: 246,
      description: 'Engineered with Aeroknit breathable mesh and high-rebound CloudFoam midsole absorbing 94% of heel strike impact on marathon tracks and city asphalt.',
      highlights: ['Responsive CloudFoam', '3D Engineered Mesh', 'Free 7-Day Trial'],
      colors: [
        {
          name: 'Pure White & Slate',
          hex: '#E2E8F0',
          image: heroShoeImage
        },
        {
          name: 'Mist Grey & Obsidian',
          hex: '#334155',
          image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80'
        },
        {
          name: 'Cobalt Pulse',
          hex: '#1E3A8A',
          image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      sizes: [7, 8, 9, 10, 11, 12],
      productRefId: 'evo-01'
    },
    {
      id: 'showcase-2',
      name: 'EVORA AirWalk Cloud-9',
      tagline: 'Doctor-Backed Orthopedic Cushioning & Arch Relief',
      category: 'Walking Shoes',
      badge: 'DOCTOR BACKED',
      originalPrice: 4799,
      discountedPrice: 3299,
      discountPercent: 31,
      rating: 4.9,
      reviewsCount: 318,
      description: 'Weighing just 195g, the AirWalk features an impact-diffusing air-chamber sole with podiatric arch support to eliminate joint strain through 10,000+ daily steps.',
      highlights: ['Joint Shock Shield', 'Dynamic Arch Cradle', 'Featherlight 195g'],
      colors: [
        {
          name: 'Mist Silver & Cloud White',
          hex: '#CBD5E1',
          image: walkingCategoryHeroImg
        },
        {
          name: 'Rose Dust & Cashmere',
          hex: '#E7CBCB',
          image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=80'
        },
        {
          name: 'Midnight Navy',
          hex: '#1E293B',
          image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      sizes: [6, 7, 8, 9, 10, 11],
      productRefId: 'evo-03'
    },
    {
      id: 'showcase-3',
      name: 'EVORA Apex Court Sneaker',
      tagline: 'Handcrafted Italian Napa Leather · Minimalist Street Style',
      category: 'Sneakers',
      badge: 'ICONIC DESIGN',
      originalPrice: 6299,
      discountedPrice: 4499,
      discountPercent: 28,
      rating: 4.8,
      reviewsCount: 189,
      description: 'Clean silhouette constructed from sustainable full-grain napa leather with cupsole stitching and anatomical latex insoles for timeless luxury.',
      highlights: ['Italian Napa Leather', 'Reinforced Cupsole', 'Breathable Liner'],
      colors: [
        {
          name: 'Chalk White & Tan Suede',
          hex: '#F1F5F9',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80'
        },
        {
          name: 'Triple Obsidian Black',
          hex: '#0F172A',
          image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80'
        },
        {
          name: 'Forest Green & Gum',
          hex: '#14532D',
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80'
        }
      ],
      sizes: [7, 8, 9, 10, 11, 12],
      productRefId: 'evo-02'
    }
  ], []);

  // Active showcase shoe index
  const [activeShoeIndex, setActiveShoeIndex] = useState(0);
  const currentShoe = showcaseShoes[activeShoeIndex];

  // Active color & size state for current shoe
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(currentShoe.sizes[2] || currentShoe.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);

  const currentColor = currentShoe.colors[selectedColorIndex] || currentShoe.colors[0];

  const handleColorChange = (index: number) => {
    setSelectedColorIndex(index);
  };

  const handleShoeSwitch = (newIndex: number) => {
    setActiveShoeIndex(newIndex);
    setSelectedColorIndex(0);
    setSelectedSize(showcaseShoes[newIndex].sizes[2] || showcaseShoes[newIndex].sizes[0]);
  };

  // Resolve matching product in store
  const matchedProduct: Product | undefined = products.find(p => p.id === currentShoe.productRefId) || products[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!matchedProduct) return;

    const chosenColor: ProductColor = {
      name: currentColor.name,
      hex: currentColor.hex
    };

    addToCart(matchedProduct, selectedSize, chosenColor, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!matchedProduct) return;

    const chosenColor: ProductColor = {
      name: currentColor.name,
      hex: currentColor.hex
    };

    addToCart(matchedProduct, selectedSize, chosenColor, 1);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNavClick = (view: string, filterConfig?: { category?: string; gender?: string; isNewArrival?: boolean }) => {
    setCurrentView(view);
    if (filterConfig) {
      setFilters(prev => ({
        ...prev,
        category: filterConfig.category || 'All',
        gender: filterConfig.gender || 'All',
        ageGroup: 'All',
        collection: 'All',
        inStockOnly: false,
        sortBy: filterConfig.isNewArrival ? 'newest' : 'featured'
      }));
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const isShoeInWishlist = matchedProduct ? isInWishlist(matchedProduct.id) : false;

  return (
    <section className="relative overflow-hidden min-h-[92vh] lg:min-h-screen bg-gradient-to-br from-[#E6F4EA] via-[#EDF7F2] to-[#E2F0EC] flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Static ambient radial background */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#A8D5BA]/35 to-[#86EFAC]/25 rounded-full blur-3xl pointer-events-none select-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#5FAF78]/15 rounded-full blur-2xl pointer-events-none select-none" 
      />

      {/* Main Glassmorphism Panel Container - Static Display */}
      <div className="max-w-7xl w-full mx-auto relative z-10 flex-1 flex flex-col justify-between">
        
        {/* ========================================================================= */}
        {/* GLASS PANEL */}
        {/* ========================================================================= */}
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-white/75 backdrop-glass-panel border border-white/80 shadow-[0_25px_65px_-15px_rgba(24,60,43,0.12),0_10px_25px_-5px_rgba(0,0,0,0.04)] overflow-hidden p-6 sm:p-10 lg:p-12 flex-1 flex flex-col justify-between">
          
          {/* Subtle Glass Noise & Highlight Highlights */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/30 pointer-events-none select-none" />
          
          {/* ------------------------------------------------------------- */}
          {/* PANEL TOP BAR: Logo + Navigation Links */}
          {/* ------------------------------------------------------------- */}
          <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-gray-900/[0.06]">
            
            {/* Top-Left: EVORA Brand Mark */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2.5 focus:outline-none cursor-pointer"
                aria-label="EVORA Home"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-display font-black text-lg shadow-sm">
                  E
                </div>
                <div className="text-left">
                  <span className="font-display text-xl sm:text-2xl font-black tracking-widest text-[#111111] block leading-tight">
                    EVORA
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.26em] text-gray-500 font-bold block">
                    ATELIER 2026
                  </span>
                </div>
              </button>

              {/* Shoe switch indicators (mobile only) */}
              <div className="flex items-center gap-1.5 md:hidden">
                {showcaseShoes.map((shoe, idx) => (
                  <button
                    key={shoe.id}
                    onClick={() => handleShoeSwitch(idx)}
                    className={`h-2 rounded-full cursor-pointer ${
                      activeShoeIndex === idx ? 'w-6 bg-[#111111]' : 'w-2 bg-gray-300'
                    }`}
                    aria-label={`View ${shoe.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Top Navigation Links */}
            <nav className="flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-4 text-xs font-bold uppercase tracking-wider text-gray-700">
              <button
                onClick={() => handleNavClick('shop', { gender: 'men' })}
                className="px-3 py-1.5 rounded-full hover:bg-white/80 hover:text-[#183C2B] cursor-pointer"
              >
                Men
              </button>
              <button
                onClick={() => handleNavClick('shop', { gender: 'women' })}
                className="px-3 py-1.5 rounded-full hover:bg-white/80 hover:text-[#183C2B] cursor-pointer"
              >
                Women
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Kids Shoes' })}
                className="px-3 py-1.5 rounded-full hover:bg-white/80 hover:text-[#183C2B] cursor-pointer"
              >
                Kids
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Walking Shoes' })}
                className="px-3 py-1.5 rounded-full bg-[#DFF3E4] text-[#183C2B] font-extrabold hover:bg-[#cdecd5] cursor-pointer"
              >
                Walking Shoes
              </button>
              <button
                onClick={() => handleNavClick('shop', { isNewArrival: true })}
                className="px-3 py-1.5 rounded-full hover:bg-white/80 hover:text-[#183C2B] cursor-pointer"
              >
                New Arrivals
              </button>
              <button
                onClick={() => {
                  showToast('Custom shoe colorway selected', 'info');
                  handleColorChange((selectedColorIndex + 1) % currentShoe.colors.length);
                }}
                className="px-3.5 py-1.5 rounded-full border border-gray-300 hover:border-[#5FAF78] hover:bg-white text-[#111111] hover:text-[#183C2B] flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Sliders className="w-3.5 h-3.5 text-[#5FAF78]" />
                <span>Customize</span>
              </button>
            </nav>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* MAIN SHOWCASE ARENA: 3-Column Grid + Static Shoe Showcase */}
          {/* ------------------------------------------------------------- */}
          <div className="relative py-8 sm:py-12 lg:py-16 my-auto">
            
            {/* Oversized Background Typography: "EVORA" Watermark */}
            <div 
              aria-hidden="true" 
              className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden z-0"
            >
              <span className="font-display font-black text-[130px] sm:text-[230px] lg:text-[340px] xl:text-[400px] tracking-tighter text-[#183C2B]/[0.05] whitespace-nowrap uppercase leading-none transform -translate-y-4">
                EVORA
              </span>
            </div>

            {/* 3-Part Layout: Left Meta | Center Realistic Shoe | Right Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative z-10">
              
              {/* ========================================================= */}
              {/* LEFT COLUMN: Name, Price, Description, Add To Cart */}
              {/* ========================================================= */}
              <div className="lg:col-span-4 space-y-5 text-center lg:text-left">
                {/* Badge & Category */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <span className="px-3 py-1 bg-[#111111] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                    {currentShoe.badge}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5FAF78]">
                    {currentShoe.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-800 text-xs font-bold bg-white/80 px-2 py-0.5 rounded-md border border-gray-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{currentShoe.rating}</span>
                    <span className="text-gray-400 font-normal">({currentShoe.reviewsCount})</span>
                  </div>
                </div>

                {/* Product Name */}
                <div className="space-y-1.5">
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-[1.05]">
                    {currentShoe.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-[#183C2B] tracking-wide">
                    {currentShoe.tagline}
                  </p>
                </div>

                {/* Pricing Block */}
                <div className="flex items-baseline justify-center lg:justify-start gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#111111] tabular-nums">
                    ₹{currentShoe.discountedPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base text-gray-400 line-through tabular-nums font-semibold">
                    ₹{currentShoe.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#DFF3E4] text-[#183C2B] text-xs font-extrabold uppercase rounded-md">
                    {currentShoe.discountPercent}% OFF
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  {currentShoe.description}
                </p>

                {/* Feature Highlights */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                  {currentShoe.highlights.map((h, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 border border-gray-200 text-[11px] font-semibold text-gray-700 shadow-2xs"
                    >
                      <Check className="w-3 h-3 text-[#5FAF78]" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>

                {/* Action Buttons: Add to Cart + Wishlist */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`px-7 py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md cursor-pointer ${
                      isAdded
                        ? 'bg-[#5FAF78] text-white'
                        : 'bg-[#111111] hover:bg-[#183C2B] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#5FAF78]" />
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>

                  {matchedProduct && (
                    <button
                      onClick={() => toggleWishlist(matchedProduct.id)}
                      className={`p-4 rounded-2xl border cursor-pointer shadow-xs ${
                        isShoeInWishlist 
                          ? 'bg-rose-50 border-rose-300 text-rose-600' 
                          : 'bg-white/90 border-gray-200 text-gray-700 hover:text-rose-600 hover:border-gray-300'
                      }`}
                      aria-label="Add to wishlist"
                      title={isShoeInWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart className={`w-5 h-5 ${isShoeInWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  )}
                </div>

              </div>

              {/* ========================================================= */}
              {/* CENTER COLUMN: Realistic Shoe Image (Clean Static Display) */}
              {/* ========================================================= */}
              <div className="lg:col-span-4 relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[380px] lg:min-h-[440px]">
                
                {/* Left / Right Switchers */}
                <button
                  onClick={() => handleShoeSwitch((activeShoeIndex - 1 + showcaseShoes.length) % showcaseShoes.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#111111] border border-gray-200 shadow-md cursor-pointer hidden sm:flex"
                  aria-label="Previous showcase shoe"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleShoeSwitch((activeShoeIndex + 1) % showcaseShoes.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#111111] border border-gray-200 shadow-md cursor-pointer hidden sm:flex"
                  aria-label="Next showcase shoe"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Overlapping Realistic Shoe Container */}
                <div 
                  onClick={() => matchedProduct && viewProductDetails(matchedProduct)}
                  className="relative w-full max-w-[420px] lg:max-w-[500px] flex flex-col items-center justify-center cursor-pointer"
                >
                  {/* Static Shoe Shadow */}
                  <div 
                    aria-hidden="true" 
                    className="absolute -bottom-6 w-4/5 h-8 bg-black/25 rounded-full blur-xl pointer-events-none select-none" 
                  />

                  {/* Static Realistic Shoe Image */}
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.18)]">
                      <ShoeImage
                        src={currentColor.image}
                        alt={`${currentShoe.name} in ${currentColor.name}`}
                        category={currentShoe.category}
                        colorHex={currentColor.hex}
                        priority={true}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Interactive Specs Hint */}
                  <div className="mt-2 text-center opacity-80">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center justify-center gap-1.5">
                      <Zap className="w-3 h-3 text-[#5FAF78]" />
                      <span>Click shoe for 360° Specs</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* ========================================================= */}
              {/* RIGHT COLUMN: Size Options, Color Swatches, Buy Now */}
              {/* ========================================================= */}
              <div className="lg:col-span-4 space-y-6 text-center lg:text-left lg:pl-4">
                
                {/* 1. Color Swatches Selection */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Colorway
                    </span>
                    <span className="text-xs font-extrabold text-[#111111]">
                      {currentColor.name}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    {currentShoe.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleColorChange(idx)}
                        className={`relative p-1 rounded-full cursor-pointer ${
                          selectedColorIndex === idx 
                            ? 'ring-2 ring-[#111111] ring-offset-2 ring-offset-white' 
                            : 'opacity-80 hover:opacity-100'
                        }`}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                      >
                        <span 
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full block border border-gray-300 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Shoe Size Selector */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Select UK / IND Size
                    </span>
                    <span className="text-xs font-bold text-[#5FAF78]">
                      True To Size Fit
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {currentShoe.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2.5 rounded-xl text-xs font-black cursor-pointer border ${
                          selectedSize === sz
                            ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                            : 'bg-white/90 text-gray-800 border-gray-200 hover:border-gray-400 hover:bg-white'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Delivery & Guarantee Highlights */}
                <div className="bg-white/70 rounded-2xl p-3.5 border border-gray-200/80 space-y-2 text-left">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                    <ShieldCheck className="w-4 h-4 text-[#5FAF78] shrink-0" />
                    <span>Free Express Shipping across India</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <RotateCcw className="w-3.5 h-3.5 text-[#5FAF78] shrink-0" />
                    <span>7-Day Doorstep Exchange & Size Swap Guarantee</span>
                  </div>
                </div>

                {/* 4. Instant "Buy Now" CTA Button */}
                <div className="pt-1">
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#183C2B] to-[#2D5A42] hover:from-[#111111] hover:to-[#183C2B] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>BUY NOW · ₹{currentShoe.discountedPrice.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4 text-[#A8D5BA]" />
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* PANEL FOOTER: Model Selector Tabs + Trust Badges */}
          {/* ------------------------------------------------------------- */}
          <div className="relative z-20 pt-6 border-t border-gray-900/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Model Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mr-1 hidden sm:inline">
                Models:
              </span>
              {showcaseShoes.map((shoe, idx) => (
                <button
                  key={shoe.id}
                  onClick={() => handleShoeSwitch(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer border ${
                    activeShoeIndex === idx
                      ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                      : 'bg-white/70 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  {shoe.name.replace('EVORA ', '')}
                </button>
              ))}
            </div>

            {/* Quick Assurance Tags */}
            <div className="flex items-center gap-4 text-gray-500 text-[11px] font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#5FAF78]" />
                100% Authentic
              </span>
              <span>·</span>
              <span>COD Available</span>
              <span>·</span>
              <span>Secure UPI & Card</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
