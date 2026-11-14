import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Star, 
  Heart, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface Colorway {
  id: string;
  name: string;
  primary: string; // e.g. Red
  secondary: string; // e.g. White
  accent: string; // e.g. Black
  bgGlow: string; // Background smoke glow
  hex: string;
}

const COLORWAYS: Colorway[] = [
  {
    id: 'chicago',
    name: 'Chicago Retro 85 (Varsity Red & Black)',
    primary: '#DC2626', // Varsity Red
    secondary: '#FFFFFF', // Clean White
    accent: '#171717', // Stealth Black
    bgGlow: 'rgba(220, 38, 38, 0.45)',
    hex: '#DC2626'
  },
  {
    id: 'royal',
    name: 'Royal Court (Deep Blue & Black)',
    primary: '#1D4ED8', // Royal Blue
    secondary: '#FFFFFF',
    accent: '#111827',
    bgGlow: 'rgba(29, 78, 216, 0.45)',
    hex: '#1D4ED8'
  },
  {
    id: 'forest',
    name: 'Evora Pine (Forest Green & Black)',
    primary: '#15803D', // Forest Green
    secondary: '#FFFFFF',
    accent: '#18181B',
    bgGlow: 'rgba(21, 128, 61, 0.45)',
    hex: '#15803D'
  },
  {
    id: 'shadow',
    name: 'Shadow Onyx (Stealth Grey & Black)',
    primary: '#4B5563', // Smoke Grey
    secondary: '#E5E7EB',
    accent: '#0F172A',
    bgGlow: 'rgba(75, 85, 99, 0.45)',
    hex: '#374151'
  }
];

export const RetroJordanShowcase: React.FC = () => {
  const { 
    products, 
    addToCart, 
    setCurrentView, 
    viewProductDetails, 
    toggleWishlist, 
    isInWishlist,
    showToast 
  } = useStore();

  const [activeColorway, setActiveColorway] = useState<Colorway>(COLORWAYS[0]);
  const [selectedSize, setSelectedSize] = useState<number>(9);
  const [isAdded, setIsAdded] = useState(false);

  // Match with product evo-12
  const retroProduct = products.find(p => p.id === 'evo-12') || products[0];
  const inWishlist = retroProduct ? isInWishlist(retroProduct.id) : false;

  const handleAddToCart = () => {
    if (!retroProduct) return;
    addToCart(
      retroProduct, 
      selectedSize, 
      { name: activeColorway.name, hex: activeColorway.hex }, 
      1
    );
    setIsAdded(true);
    showToast(`Added ${retroProduct.name} (UK ${selectedSize}) to Bag`, 'success');
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!retroProduct) return;
    addToCart(
      retroProduct, 
      selectedSize, 
      { name: activeColorway.name, hex: activeColorway.hex }, 
      1
    );
    setCurrentView('checkout');
  };

  return (
    <div className="w-full bg-[#0A0A0A] rounded-3xl overflow-hidden border border-red-950/40 shadow-2xl relative text-white">
      {/* ========================================================= */}
      {/* ATMOSPHERIC BACKGROUND: Crimson smoke + Luminous Swoosh */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Deep gradient wash */}
        <div 
          className="absolute inset-0 bg-radial from-transparent via-[#140404] to-[#070101] opacity-90"
        />

        {/* Ambient atmospheric smoke glow */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full blur-[110px]"
          style={{ backgroundColor: activeColorway.bgGlow }}
        />
        <div 
          className="absolute bottom-10 -left-20 w-[450px] h-[350px] rounded-full blur-[90px]"
          style={{ backgroundColor: activeColorway.bgGlow, opacity: 0.6 }}
        />

        {/* Luminous Glowing White Swoosh / Energy Arc cutting behind shoes */}
        <svg 
          className="absolute top-8 left-1/2 -translate-x-1/2 w-[95%] max-w-[850px] h-auto opacity-85 drop-shadow-[0_0_35px_rgba(255,255,255,0.7)]"
          viewBox="0 0 1000 450" 
          fill="none"
        >
          <path
            d="M 60 270 C 140 120, 320 60, 560 160 C 720 220, 880 180, 960 120 C 820 240, 620 280, 420 230 C 260 190, 140 250, 100 340 Z"
            fill="url(#swooshGlow)"
          />
          <defs>
            <linearGradient id="swooshGlow" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
        
        {/* ========================================================= */}
        {/* TOP BAR: CÓMODOS • URBANO • [EMBLEM] • ESTILO RETRO • CLÁSICOS */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-none inline-block shadow-[0_0_8px_#DC2626]" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-red-500">
              EVORA RETRO COURT
            </span>
          </div>

          {/* Center Iconic Typographic Dots & Silhouette from user's poster */}
          <div className="hidden md:flex items-center gap-4 text-xs font-black uppercase tracking-[0.22em] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span>• CÓMODOS</span>
            <span>• URBANO</span>
            
            {/* Iconic Jumpman / Evora Athlete Silhouette Emblem */}
            <div className="mx-2 p-1.5 rounded-xl bg-white/10 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              <svg viewBox="0 0 40 40" className="w-6 h-6 fill-white">
                {/* Athletic leaping silhouette with outstretched sneaker ball gesture */}
                <circle cx="21" cy="9" r="3" />
                <path d="M 21 12 L 19 22 L 13 33 L 10 32 L 16 21 L 18 14 Z" />
                <path d="M 20 18 L 26 25 L 32 30 L 34 29 L 28 23 L 22 17 Z" />
                <path d="M 20 14 L 14 10 L 10 9 L 10 11 L 13 12 L 19 16 Z" />
                <path d="M 22 14 L 28 10 L 31 8 L 32 9 L 29 11 L 22 16 Z" />
              </svg>
            </div>

            <span>• ESTILO RETRO</span>
            <span>• CLÁSICOS</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => retroProduct && viewProductDetails(retroProduct)}
              className="text-[11px] font-bold uppercase tracking-wider text-white/80 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-red-400" />
              <span>Full Specs</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN VISUAL ARENA: Pair of High-Top Retro Sneakers */}
        {/* ========================================================= */}
        <div className="relative py-8 sm:py-12 my-2 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Column: Headline & Story */}
          <div className="w-full lg:w-5/12 space-y-4 text-center lg:text-left z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIMITED RETRO EDITION · 1985 HERITAGE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white leading-tight uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              EVORA RETRO <span className="text-red-500">HIGH '85</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Inspiradas en la leyenda de las canchas y el asfalto. Las Air Retro revolucionaron el estilo urbano combinando cuero granulado de primera calidad, cuello acolchado de alta sujeción y cámara de absorción anti-impacto.
            </p>

            {/* Price Badge */}
            <div className="flex items-baseline justify-center lg:justify-start gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                ₹3,699
              </span>
              <span className="text-base text-gray-400 line-through tabular-nums">
                ₹5,299
              </span>
              <span className="px-2.5 py-0.5 bg-red-600 text-white text-xs font-black uppercase rounded-md shadow-sm">
                30% OFF
              </span>
            </div>

            {/* Colorway Selection */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between max-w-xs mx-auto lg:mx-0 text-xs font-bold uppercase tracking-wider text-gray-400">
                <span>Colorway</span>
                <span className="text-white">{activeColorway.name.split('(')[0]}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {COLORWAYS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveColorway(c)}
                    className={`relative p-1 rounded-full cursor-pointer ${
                      activeColorway.id === c.id 
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0A0A0A]' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={c.name}
                  >
                    <span 
                      className="w-8 h-8 rounded-full block border-2 border-white/40 shadow-md"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between max-w-xs mx-auto lg:mx-0 text-xs font-bold uppercase tracking-wider text-gray-400">
                <span>Select UK / IND Size</span>
                <span className="text-red-400 font-semibold">In Stock</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {[7, 8, 9, 10, 11, 12].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-11 h-10 rounded-xl text-xs font-black cursor-pointer border ${
                      selectedSize === sz
                        ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                        : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:border-white/30'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                onClick={handleBuyNow}
                className="px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl flex items-center gap-2 shadow-[0_0_25px_rgba(220,38,38,0.6)] cursor-pointer"
              >
                <span>COMPRAR AHORA · ₹3,699</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleAddToCart}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl border border-white/20 flex items-center gap-2 cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>EN LA BOLSA</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-red-400" />
                    <span>AGREGAR AL CARRITO</span>
                  </>
                )}
              </button>

              {retroProduct && (
                <button
                  onClick={() => toggleWishlist(retroProduct.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer ${
                    inWishlist 
                      ? 'bg-red-950/60 border-red-500 text-red-500' 
                      : 'bg-white/5 border-white/15 text-white/70 hover:text-red-400'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500' : ''}`} />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: High-Fidelity Retro High Sneaker Pair Render */}
          <div className="w-full lg:w-7/12 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
            
            {/* Soft ground shadow reflection */}
            <div className="absolute -bottom-4 w-4/5 h-12 bg-black/80 rounded-full blur-2xl pointer-events-none" />

            {/* SVG Render of Pair of Air Jordan 1 / Retro High Sneakers */}
            <div className="w-full max-w-[620px] aspect-[4/3] relative flex items-center justify-center drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]">
              <svg 
                viewBox="0 0 800 600" 
                className="w-full h-full select-none"
              >
                <defs>
                  {/* Gradients for leather depth & realism */}
                  <linearGradient id="redLeatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={activeColorway.primary} />
                    <stop offset="60%" stopColor={activeColorway.primary} />
                    <stop offset="100%" stopColor="#991B1B" />
                  </linearGradient>

                  <linearGradient id="whiteLeatherGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>

                  <linearGradient id="blackPanelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#262626" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>

                  <linearGradient id="midsoleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="70%" stopColor="#F1F5F9" />
                    <stop offset="100%" stopColor="#CBD5E1" />
                  </linearGradient>

                  <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
                    <feOffset dx="0" dy="18" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.6" />
                    </feComponentTransfer>
                    <feMerge> 
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* =================================================== */}
                {/* SHOE 2 (BACKGROUND SHOE - TILTED UPWARD & BACKWARD) */}
                {/* Shows high-top ankle collar, heel counter & sole */}
                {/* =================================================== */}
                <g transform="translate(380, 50) rotate(32, 200, 200)" filter="url(#shadowBlur)">
                  {/* Upper Padded Ankle Collar - Black */}
                  <path 
                    d="M 120 120 C 120 70 190 60 250 80 C 270 88 280 120 270 160 L 220 170 L 120 140 Z" 
                    fill="#18181B" 
                  />
                  {/* Ankle Wings Collar Strap - Red */}
                  <path 
                    d="M 110 135 C 110 100 160 85 240 100 C 270 105 275 140 260 170 L 180 195 L 110 160 Z" 
                    fill="url(#redLeatherGrad)"
                    stroke="#B91C1C"
                    strokeWidth="2"
                  />
                  {/* Embossed Wings Logo on Collar */}
                  <circle cx="215" cy="130" r="14" fill="#18181B" opacity="0.8" />
                  <path d="M 205 130 Q 215 122 225 130 Q 215 138 205 130 Z" fill="#FFFFFF" opacity="0.9" />

                  {/* Heel Counter Overlay - Red */}
                  <path 
                    d="M 85 180 C 85 150 115 140 165 170 L 160 260 C 130 265 95 245 85 210 Z" 
                    fill="url(#redLeatherGrad)" 
                    stroke="#B91C1C"
                    strokeWidth="2"
                  />

                  {/* Mid Quarter Panel - White */}
                  <path 
                    d="M 160 170 L 255 180 L 240 265 L 155 260 Z" 
                    fill="url(#whiteLeatherGrad)" 
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                  />

                  {/* Iconic Swoosh on Background Shoe */}
                  <path 
                    d="M 150 200 C 180 205 230 200 270 165 C 265 190 220 230 185 235 C 160 238 140 225 150 200 Z" 
                    fill="#0F172A" 
                  />

                  {/* Toe Box & Mudguard - Red & White */}
                  <path 
                    d="M 250 180 L 320 230 C 340 250 330 280 280 290 L 235 270 Z" 
                    fill="url(#whiteLeatherGrad)" 
                  />
                  <path 
                    d="M 270 230 L 340 265 C 345 285 320 300 265 295 L 245 270 Z" 
                    fill="url(#redLeatherGrad)" 
                  />

                  {/* Midsole - Crisp White */}
                  <path 
                    d="M 80 220 L 265 300 C 265 315 235 322 170 305 L 75 245 Z" 
                    fill="url(#midsoleGrad)" 
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                  />
                  {/* Outsole Tread - Red */}
                  <path 
                    d="M 75 245 L 260 318 C 255 328 220 332 165 315 L 70 255 Z" 
                    fill={activeColorway.primary} 
                  />
                </g>

                {/* =================================================== */}
                {/* SHOE 1 (FOREGROUND SHOE - RESTING PROMINENTLY) */}
                {/* Classic Air Jordan 1 / High-top side 3/4 view */}
                {/* =================================================== */}
                <g transform="translate(100, 190)" filter="url(#shadowBlur)">
                  {/* Cast shadow directly under foreground shoe */}
                  <ellipse cx="260" cy="275" rx="240" ry="22" fill="#000000" opacity="0.75" />

                  {/* High Ankle Collar Padding - Black textured mesh */}
                  <path 
                    d="M 85 95 C 85 45 135 25 185 35 C 205 40 215 65 205 105 L 165 115 L 85 95 Z" 
                    fill="#18181B" 
                  />
                  {/* High Collar Red Overlay Panel */}
                  <path 
                    d="M 75 105 C 75 75 110 55 175 68 C 195 72 205 95 195 125 L 140 145 L 75 125 Z" 
                    fill="url(#redLeatherGrad)" 
                    stroke="#B91C1C"
                    strokeWidth="2.5"
                  />

                  {/* Ankle Collar Embossed Wings Crest */}
                  <circle cx="155" cy="98" r="15" fill="#111111" />
                  <path d="M 145 98 Q 155 90 165 98 Q 155 106 145 98 Z" fill="#FFFFFF" />
                  <text x="155" y="101" fill="#FFFFFF" fontSize="6" fontWeight="900" textAnchor="middle">EVORA</text>

                  {/* Rear Heel Counter Wrap - Red Leather */}
                  <path 
                    d="M 55 140 C 50 115 75 105 115 130 L 110 235 C 80 238 55 220 50 185 Z" 
                    fill="url(#redLeatherGrad)" 
                    stroke="#B91C1C"
                    strokeWidth="2.5"
                  />

                  {/* Heel Counter Lower Strip */}
                  <path 
                    d="M 50 180 C 50 160 80 155 115 165 L 110 240 L 50 240 Z" 
                    fill="url(#redLeatherGrad)" 
                  />

                  {/* Quarter Side Panel - Clean White Tumbled Leather */}
                  <path 
                    d="M 112 135 L 210 148 L 220 235 L 108 235 Z" 
                    fill="url(#whiteLeatherGrad)" 
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                  />

                  {/* Front Eyestay Lacing Panel - Black */}
                  <path 
                    d="M 160 110 L 265 175 L 245 220 L 195 155 Z" 
                    fill="#18181B" 
                    stroke="#27272A"
                    strokeWidth="1.5"
                  />

                  {/* Black Laces crossing horizontally */}
                  <line x1="175" y1="120" x2="195" y2="135" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <line x1="190" y1="135" x2="215" y2="150" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <line x1="205" y1="150" x2="235" y2="165" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <line x1="220" y1="165" x2="250" y2="180" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <line x1="235" y1="180" x2="265" y2="195" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

                  {/* Iconic Large Swoosh / Side Emblem - Gloss Black Leather */}
                  <path 
                    d="M 105 170 C 145 175 220 180 270 125 C 260 170 195 215 150 218 C 120 220 100 200 105 170 Z" 
                    fill="#111111" 
                    stroke="#27272A"
                    strokeWidth="1.5"
                  />

                  {/* Perforated Toe Box - Crisp White Leather with vent dots */}
                  <path 
                    d="M 245 190 L 370 215 C 385 225 385 240 370 248 L 240 245 Z" 
                    fill="url(#whiteLeatherGrad)" 
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                  />
                  {/* Ventilation Perforations */}
                  <circle cx="280" cy="220" r="1.8" fill="#94A3B8" />
                  <circle cx="295" cy="223" r="1.8" fill="#94A3B8" />
                  <circle cx="310" cy="226" r="1.8" fill="#94A3B8" />
                  <circle cx="325" cy="230" r="1.8" fill="#94A3B8" />
                  <circle cx="340" cy="233" r="1.8" fill="#94A3B8" />
                  <circle cx="295" cy="214" r="1.8" fill="#94A3B8" />
                  <circle cx="310" cy="217" r="1.8" fill="#94A3B8" />
                  <circle cx="325" cy="221" r="1.8" fill="#94A3B8" />

                  {/* Front Mudguard Toe Cap Wrap - Red Leather */}
                  <path 
                    d="M 270 225 L 375 235 C 395 242 390 255 365 258 L 260 252 Z" 
                    fill="url(#redLeatherGrad)" 
                    stroke="#B91C1C"
                    strokeWidth="2"
                  />

                  {/* Thick Stitched Rubber Midsole - Pure White */}
                  <path 
                    d="M 45 235 L 390 248 C 395 265 375 272 320 272 L 48 268 C 42 268 40 255 45 235 Z" 
                    fill="url(#midsoleGrad)" 
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                  />
                  {/* Midsole Stitching Line */}
                  <line x1="55" y1="242" x2="385" y2="254" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 2" />

                  {/* Rubber Traction Outsole - Red */}
                  <path 
                    d="M 48 268 L 375 272 C 370 282 340 285 300 285 L 50 280 C 44 280 44 274 48 268 Z" 
                    fill={activeColorway.primary} 
                  />
                </g>
              </svg>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM SECTION: Caption & Bold Dynamic WWW.EVORASHOES.COM */}
        {/* ========================================================= */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              Inspiradas en la leyenda, las <span className="text-white font-bold">Evora Retro High</span> revolucionaron el estilo urbano desde 1985. Combina comodidad, historia y actitud.
            </p>
          </div>

          {/* Bold Impactful Marquee Typography matching user's screenshot */}
          <div className="text-center sm:text-right">
            <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-wider text-white hover:text-red-500 transition-none select-none drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
              WWW.EVORASHOES.COM
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
