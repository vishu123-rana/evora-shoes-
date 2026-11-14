import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Check, 
  Eye, 
  ArrowLeftRight 
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoeImage } from './ShoeImage';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  priority = false 
}) => {
  const { 
    viewProductDetails, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    setQuickViewProduct,
    addToCompare,
    removeFromCompare,
    isCompared
  } = useStore();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);
  const [sizeSelectorOpen, setSizeSelectorOpen] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const isFavorite = isInWishlist(product.id);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.sizes.length > 1 && !sizeSelectorOpen) {
      setSizeSelectorOpen(true);
      return;
    }
    addToCart(product, selectedSize, activeColor, 1);
    setIsAdded(true);
    setSizeSelectorOpen(false);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleConfirmAddSize = (e: React.MouseEvent, size: number) => {
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, size, activeColor, 1);
    setIsAdded(true);
    setSizeSelectorOpen(false);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div 
      onClick={() => viewProductDetails(product)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F5F7]">
        
        {/* Primary Image - Static */}
        <div className="w-full h-full flex items-center justify-center p-3">
          <ShoeImage
            src={product.image}
            alt={`${product.name} in ${activeColor.name}`}
            category={product.category}
            colorHex={activeColor.hex}
            priority={priority}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-[#183C2B] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Best Seller
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="bg-[#5FAF78] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              New
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="bg-[#2f6048] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Limited Run
            </span>
          )}
        </div>

        {/* Discount Tag */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <span className="bg-[#DFF3E4] text-[#183C2B] border border-[#A8D5BA] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              {product.discountPercent}% OFF
            </span>
          </div>
        )}

        {/* Action Button Overlays on Image */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-20">
          
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            title="Quick View"
            className="w-8 h-8 rounded-full bg-white/95 hover:bg-[#DFF3E4] text-[#183C2B] border border-[#D7E8DC] shadow-sm flex items-center justify-center cursor-pointer"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isCompared(product.id)) {
                removeFromCompare(product.id);
              } else {
                addToCompare(product.id);
              }
            }}
            title={isCompared(product.id) ? 'Remove from Comparison' : 'Compare with other shoes'}
            className={`w-8 h-8 rounded-full border shadow-sm flex items-center justify-center cursor-pointer ${
              isCompared(product.id)
                ? 'bg-[#183C2B] text-white border-[#183C2B]'
                : 'bg-white/95 hover:bg-[#DFF3E4] text-[#183C2B] border-[#D7E8DC]'
            }`}
            aria-label={isCompared(product.id) ? 'Remove from comparison' : 'Compare shoe'}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={handleHeartClick}
            title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className={`w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-[#D7E8DC] shadow-sm flex items-center justify-center cursor-pointer ${
              isFavorite ? 'text-red-600' : 'text-[#183C2B]'
            }`}
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Size Flyout when clicking Quick Add */}
        {sizeSelectorOpen && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 bg-white p-3 border-t border-[#D7E8DC] z-30 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#183C2B]">Select Size:</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSizeSelectorOpen(false);
                }}
                className="text-xs text-[#587064] hover:text-[#183C2B] font-semibold"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={(e) => handleConfirmAddSize(e, s)}
                  className={`py-1.5 text-xs font-bold rounded border cursor-pointer ${
                    selectedSize === s
                      ? 'bg-[#183C2B] text-white border-[#183C2B] shadow-xs'
                      : 'bg-white text-[#183C2B] border-[#D7E8DC] hover:bg-[#DFF3E4]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        
        <div>
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-gray-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-xs tabular-nums">{product.rating}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-display text-base font-bold text-[#111111] hover:text-[#183C2B] leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Colors Swatches & Pricing Footer */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(i);
                }}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border cursor-pointer ${
                  selectedColorIndex === i 
                    ? 'ring-2 ring-[#111111] ring-offset-1' 
                    : 'border-gray-200'
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={`Select color ${c.name}`}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-gray-400 font-medium">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          {/* Price & Add to Cart button */}
          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-sm sm:text-base font-black text-[#111111] tabular-nums">
                  ₹{product.discountedPrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.discountedPrice && (
                  <span className="text-[11px] text-gray-400 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleQuickAdd}
              title={isAdded ? 'Added to Bag' : 'Add to Bag'}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0 ${
                isAdded
                  ? 'bg-[#5FAF78] text-white'
                  : 'bg-[#111111] hover:bg-[#183C2B] text-white'
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">ADDED</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold hidden sm:inline">BAG</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
