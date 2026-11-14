import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Ruler, 
  Check, 
  ChevronRight,
  ArrowLeft,
  Share2,
  Sparkles,
  Info,
  ArrowLeftRight
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoeImage } from './ShoeImage';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setCurrentView, 
    setIsSizeChartOpen,
    setIsCartDrawerOpen,
    products,
    reviews,
    addReview,
    showToast,
    addToCompare,
    removeFromCompare,
    isCompared,
    setIsCompareModalOpen
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 8);
  const [quantity, setQuantity] = useState<number>(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isAddedToBag, setIsAddedToBag] = useState(false);

  // Sync state whenever the viewed product changes
  useEffect(() => {
    setActiveImageIndex(0);
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    setQuantity(1);
    setIsZoomed(false);
  }, [product.id]);

  // Pincode checker state
  const [pinCode, setPinCode] = useState('560038');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>('Delivery in 2–4 business days (Free Delivery)');
  const [isCheckingPin, setIsCheckingPin] = useState(false);

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const allImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const activeImage = allImages[activeImageIndex] || product.image;

  // Filter reviews for this product
  const productReviews = reviews.filter(r => r.productId === product.id);

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedToBag(true);
    setTimeout(() => setIsAddedToBag(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const checkPinCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCode || pinCode.length !== 6) {
      showToast('Please enter a valid 6-digit PIN code', 'error');
      return;
    }
    setIsCheckingPin(true);
    setTimeout(() => {
      setIsCheckingPin(false);
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      const targetDay = days[Math.floor(Math.random() * days.length)];
      setDeliveryEstimate(`Express delivery available to PIN ${pinCode} by ${targetDay}. Eligible for Free Delivery!`);
      showToast(`Delivery confirmed for PIN ${pinCode}`, 'success');
    }, 400);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `EVORA ${product.name}`,
        text: product.subtitle,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard', 'info');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      showToast('Please provide your name and review', 'error');
      return;
    }
    addReview({
      productId: product.id,
      customerName: reviewName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: reviewRating,
      title: reviewTitle || 'Exceptional Quality',
      comment: reviewComment,
      verifiedPurchase: true,
      ageGroup: 'Adult'
    });
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewModal(false);
  };

  return (
    <div className="bg-white min-h-screen py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Bar */}
        <nav className="flex items-center space-x-2 text-xs text-[#587064] mb-6">
          <button 
            onClick={() => setCurrentView('home')} 
            className="hover:text-[#183C2B] flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <button 
            onClick={() => setCurrentView('shop')} 
            className="hover:text-[#183C2B]"
          >
            Shop
          </button>
          <span>/</span>
          <span className="text-[#587064]">{product.category}</span>
          <span>/</span>
          <span className="font-semibold text-[#183C2B] truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Contiguous PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* Left Column: Gallery & Zoom */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Interactive Zoom Stage */}
            <div 
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#D7E8DC] shadow-sm cursor-crosshair group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <ShoeImage
                src={activeImage}
                alt={`${product.name} - View ${activeImageIndex + 1}`}
                category={product.category}
                colorHex={selectedColor.hex}
                priority={true}
                className="w-full h-full"
              />

              {/* Magnified Loupe Overlay */}
              {isZoomed && (
                <div 
                  className="hidden md:block absolute inset-0 pointer-events-none z-30 transition-opacity duration-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '220%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
                {product.isBestSeller && (
                  <span className="bg-[#183C2B] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    Best Seller
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-[#DFF3E4] text-[#183C2B] border border-[#A8D5BA] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-2xs">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Subtle zoom instruction */}
              <div className="hidden md:block absolute bottom-4 left-4 z-20 text-[11px] text-[#587064] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md pointer-events-none border border-[#D7E8DC]">
                Roll over image to zoom
              </div>

              {/* Wishlist, Compare & Share buttons */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isCompared(product.id)) {
                      removeFromCompare(product.id);
                    } else {
                      addToCompare(product.id);
                    }
                  }}
                  title={isCompared(product.id) ? 'Remove from Comparison' : 'Compare with other shoes'}
                  className={`w-9 h-9 rounded-full border shadow-sm flex items-center justify-center cursor-pointer ${
                    isCompared(product.id)
                      ? 'bg-[#183C2B] text-white border-[#183C2B]'
                      : 'bg-white/95 hover:bg-[#DFF3E4] text-[#183C2B] border-[#D7E8DC]'
                  }`}
                  aria-label="Compare toggle"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/95 hover:bg-[#DFF3E4] text-[#183C2B] border border-[#D7E8DC] shadow-sm flex items-center justify-center cursor-pointer"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-9 h-9 rounded-full bg-white/95 hover:bg-white border border-[#D7E8DC] shadow-sm flex items-center justify-center cursor-pointer ${
                    isFavorite ? 'text-red-600' : 'text-[#183C2B]'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#183C2B] shadow-sm'
                        : 'border-[#D7E8DC] opacity-70 hover:opacity-100 hover:border-[#A8D5BA]'
                    }`}
                  >
                    <ShoeImage
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      category={product.category}
                      className="w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Specifications & Materials Accordion */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-[#D7E8DC] space-y-6">
              <div>
                <h3 className="font-display text-base font-bold text-[#183C2B] mb-3">
                  Product Description
                </h3>
                <p className="text-sm text-[#587064] leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-[#D7E8DC] pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#183C2B] mb-3">
                  Key Technical Features
                </h4>
                <ul className="space-y-2 text-xs text-[#587064]">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#5FAF78] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#D7E8DC] pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#183C2B] mb-3">
                  Materials & Craftsmanship
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#F5FAF6] border border-[#D7E8DC] p-2.5 rounded-lg">
                    <span className="text-[#587064] block text-[10px] uppercase font-semibold">Upper</span>
                    <span className="font-medium text-[#183C2B]">{product.materials.upper}</span>
                  </div>
                  <div className="bg-[#F5FAF6] border border-[#D7E8DC] p-2.5 rounded-lg">
                    <span className="text-[#587064] block text-[10px] uppercase font-semibold">Lining</span>
                    <span className="font-medium text-[#183C2B]">{product.materials.lining}</span>
                  </div>
                  <div className="bg-[#F5FAF6] border border-[#D7E8DC] p-2.5 rounded-lg">
                    <span className="text-[#587064] block text-[10px] uppercase font-semibold">Insole</span>
                    <span className="font-medium text-[#183C2B]">{product.materials.insole}</span>
                  </div>
                  <div className="bg-[#F5FAF6] border border-[#D7E8DC] p-2.5 rounded-lg">
                    <span className="text-[#587064] block text-[10px] uppercase font-semibold">Outsole</span>
                    <span className="font-medium text-[#183C2B]">{product.materials.outsole}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#D7E8DC] pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#183C2B] mb-1.5">
                  Care Guide
                </h4>
                <p className="text-xs text-[#587064] leading-relaxed">
                  {product.careGuide}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Purchase Module */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D7E8DC] shadow-sm space-y-6">
              
              {/* Category, Rating & Title */}
              <div>
                <div className="flex items-center justify-between text-xs text-[#587064] mb-2">
                  <span className="font-bold uppercase tracking-widest text-[11px] text-[#587064]">
                    EVORA · {product.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400 text-xs">
                      {'★'.repeat(5)}
                    </div>
                    <span className="font-bold text-[#183C2B] tabular-nums">{product.rating}</span>
                    <span className="text-[#587064] text-xs">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#183C2B] tracking-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#587064] mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Price Block */}
              <div className="pt-2 pb-4 border-b border-[#D7E8DC] flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-[#183C2B] tabular-nums">
                  ₹{product.discountedPrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.discountedPrice && (
                  <>
                    <span className="text-base text-[#587064] line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-[#183C2B] bg-[#DFF3E4] border border-[#A8D5BA] px-2 py-0.5 rounded">
                      Save {product.discountPercent}%
                    </span>
                  </>
                )}
                <span className="text-[11px] text-[#587064] block sm:inline">
                  (Incl. of all taxes)
                </span>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#183C2B]">
                    Color: <span className="font-normal text-[#587064]">{selectedColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`group relative p-1 rounded-full border-2 cursor-pointer ${
                        selectedColor.name === c.name
                          ? 'border-[#183C2B] ring-2 ring-[#183C2B] ring-offset-2'
                          : 'border-transparent hover:border-[#D7E8DC]'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-[#D7E8DC] shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#183C2B]">
                    Select Size (UK / India):
                  </span>
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-[#183C2B] hover:text-[#5FAF78] font-semibold flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 text-xs font-bold rounded-xl border cursor-pointer ${
                        selectedSize === s
                          ? 'bg-[#183C2B] text-white border-[#183C2B] shadow-md'
                          : 'bg-white text-[#183C2B] border-[#D7E8DC] hover:border-[#A8D5BA] hover:bg-[#F5FAF6]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="font-bold uppercase tracking-wider text-[#183C2B]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#D7E8DC] rounded-xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#587064] hover:bg-[#F5FAF6] hover:text-[#183C2B] font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-[#183C2B] tabular-nums text-xs">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#587064] hover:bg-[#F5FAF6] hover:text-[#183C2B] font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons: Add to Cart & Buy Now */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    isAddedToBag
                      ? 'bg-[#5FAF78] text-white border-2 border-[#5FAF78] shadow-md'
                      : 'bg-white hover:bg-[#F5FAF6] text-[#183C2B] border-2 border-[#183C2B]'
                  }`}
                >
                  {isAddedToBag ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>✓ ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO CART</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 bg-[#183C2B] hover:bg-[#112d20] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#A8D5BA]" />
                  <span>BUY NOW</span>
                </button>

                {/* Compare Bar Button */}
                <button
                  onClick={() => {
                    if (isCompared(product.id)) {
                      setIsCompareModalOpen(true);
                    } else {
                      addToCompare(product.id);
                    }
                  }}
                  className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    isCompared(product.id)
                      ? 'bg-[#DFF3E4] text-[#183C2B] border-[#5FAF78]'
                      : 'bg-[#F5FAF6] text-[#587064] hover:text-[#183C2B] border-[#D7E8DC] hover:border-[#A8D5BA]'
                  }`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-[#5FAF78]" />
                  <span>{isCompared(product.id) ? 'In Comparison · View Side-by-Side Table →' : 'Compare with Other EVORA Shoes'}</span>
                </button>
              </div>

              {/* PIN Code Delivery Checker */}
              <div className="pt-4 border-t border-[#D7E8DC] space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#183C2B] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#587064]" />
                  <span>Check Delivery Availability</span>
                </label>
                <form onSubmit={checkPinCode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit PIN code"
                    className="flex-1 px-3 py-2 text-xs border border-[#D7E8DC] rounded-lg focus:outline-none focus:border-[#5FAF78] text-[#183C2B] tabular-nums"
                  />
                  <button
                    type="submit"
                    disabled={isCheckingPin}
                    className="px-4 py-2 bg-[#183C2B] hover:bg-[#112d20] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isCheckingPin ? 'Checking...' : 'Check'}
                  </button>
                </form>

                {deliveryEstimate && (
                  <p className="text-xs text-[#183C2B] bg-[#DFF3E4] border border-[#A8D5BA] p-2.5 rounded-lg flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#5FAF78] shrink-0 mt-0.5" />
                    <span>{deliveryEstimate}</span>
                  </p>
                )}
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#D7E8DC] text-xs">
                <div className="flex items-center gap-2 text-[#587064]">
                  <Truck className="w-4 h-4 text-[#5FAF78] shrink-0" />
                  <span>Free delivery above ₹999</span>
                </div>
                <div className="flex items-center gap-2 text-[#587064]">
                  <RotateCcw className="w-4 h-4 text-[#5FAF78] shrink-0" />
                  <span>Easy 7-day returns</span>
                </div>
                <div className="flex items-center gap-2 text-[#587064]">
                  <ShieldCheck className="w-4 h-4 text-[#5FAF78] shrink-0" />
                  <span>100% Authentic EVORA</span>
                </div>
                <div className="flex items-center gap-2 text-[#587064]">
                  <Info className="w-4 h-4 text-[#5FAF78] shrink-0" />
                  <span>Cash on Delivery ready</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Customer Reviews Section on PDP */}
        <div className="mt-16 bg-white rounded-2xl p-6 sm:p-10 border border-[#D7E8DC]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D7E8DC]">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#183C2B]">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-400 text-sm">
                  {'★'.repeat(5)}
                </div>
                <span className="font-bold text-[#183C2B] text-sm tabular-nums">{product.rating} out of 5</span>
                <span className="text-[#587064] text-xs">· Based on {product.reviewsCount} verified reviews</span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-2.5 bg-[#183C2B] hover:bg-[#112d20] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
            >
              Write a Review
            </button>
          </div>

          {/* Reviews List */}
          <div className="divide-y divide-[#D7E8DC] mt-6">
            {productReviews.length > 0 ? (
              productReviews.map((rev) => (
                <div key={rev.id} className="py-6 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F5FAF6] border border-[#D7E8DC]">
                        <img 
                          src={rev.avatar} 
                          alt={rev.customerName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#183C2B]">{rev.customerName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-[#183C2B] bg-[#DFF3E4] border border-[#A8D5BA] px-1.5 py-0.5 rounded font-medium">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#587064]">{rev.date} · {rev.ageGroup}</span>
                      </div>
                    </div>

                    <div className="flex text-amber-400 text-xs">
                      {'★'.repeat(rev.rating)}
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-[#183C2B]">
                    {rev.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#587064] leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-[#587064] text-xs">
                Be the first to write a verified review for this shoe!
              </div>
            )}
          </div>
        </div>

        {/* You Might Also Like / Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-[#183C2B] mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-[#D7E8DC]">
            <div className="flex items-center justify-between pb-3 border-b border-[#D7E8DC]">
              <h3 className="font-display text-lg font-bold text-[#183C2B]">Write a Review</h3>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="text-[#587064] hover:text-[#183C2B] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#183C2B] block mb-1">Your Rating</label>
                <div className="flex gap-2 text-2xl text-amber-400 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={star <= reviewRating ? 'text-amber-400' : 'text-[#D7E8DC]'}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#183C2B] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Vinay Partap"
                  className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-lg focus:outline-none focus:border-[#5FAF78] text-[#183C2B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#183C2B] block mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Superb comfort on long runs"
                  className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-lg focus:outline-none focus:border-[#5FAF78] text-[#183C2B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#183C2B] block mb-1">Your Feedback</label>
                <textarea
                  rows={4}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share details regarding fit, material texture and comfort..."
                  className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-lg focus:outline-none focus:border-[#5FAF78] text-[#183C2B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#587064] hover:text-[#183C2B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#183C2B] text-white text-xs font-bold rounded-lg hover:bg-[#112d20] shadow-xs cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
