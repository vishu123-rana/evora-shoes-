import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Star, Check, ArrowRight, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductColor } from '../types';
import { ShoeImage } from './ShoeImage';

interface QuickViewModalInnerProps {
  product: Product;
  onClose: () => void;
}

const QuickViewModalInner: React.FC<QuickViewModalInnerProps> = ({ product, onClose }) => {
  const { 
    addToCart, 
    viewProductDetails, 
    toggleWishlist, 
    isInWishlist, 
    setIsSizeChartOpen 
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Standard', hex: '#000000' });
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 8);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleHeartClick = () => {
    toggleWishlist(product.id);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 750);
  };

  const handleViewFullDetails = () => {
    onClose();
    viewProductDetails(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D7E8DC] z-10 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#587064] hover:text-[#183C2B] rounded-lg transition-colors z-20 cursor-pointer"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Shoe Image */}
          <div className="sm:col-span-6 aspect-square w-full rounded-2xl overflow-hidden bg-[#F5FAF6] border border-[#D7E8DC] relative">
            <ShoeImage
              src={product.image}
              alt={product.name}
              category={product.category}
              colorHex={selectedColor.hex}
              className="w-full h-full"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-[#DFF3E4] text-[#183C2B] border border-[#A8D5BA] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Details & Actions */}
          <div className="sm:col-span-6 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-[#587064] mb-1">
                <span className="font-semibold uppercase tracking-wider">
                  {product.category} · {product.gender}
                </span>
                <div className="flex items-center gap-1 text-[#183C2B] font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#5FAF78] text-[#5FAF78]" />
                  <span>{product.rating}</span>
                  <span className="text-[#587064]">({product.reviewsCount})</span>
                </div>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#183C2B] tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#587064] mt-1 line-clamp-2">
                {product.subtitle}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 pt-1 border-t border-[#D7E8DC]">
              <span className="text-2xl font-black text-[#183C2B]">
                ₹{product.discountedPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.discountedPrice && (
                <span className="text-sm text-[#587064] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#183C2B] flex items-center justify-between">
                <span>Color: {selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border-2 cursor-pointer ${
                      selectedColor.name === c.name ? 'border-[#183C2B] shadow-xs' : 'border-white'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={`Select color ${c.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#183C2B]">
                  Select Size (UK/IND)
                </label>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-[11px] font-medium text-[#587064] hover:text-[#183C2B] flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size Chart</span>
                </button>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      selectedSize === s
                        ? 'bg-[#183C2B] text-white shadow-2xs'
                        : 'bg-[#F5FAF6] text-[#183C2B] hover:bg-[#E8F3EB] border border-[#D7E8DC]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    isAdded
                      ? 'bg-[#5FAF78] text-white shadow-md'
                      : 'bg-[#183C2B] hover:bg-[#112d20] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>✓ Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleHeartClick}
                  className={`p-3 rounded-xl border border-[#D7E8DC] hover:bg-[#F5FAF6] cursor-pointer ${
                    isFavorite ? 'text-red-600 bg-red-50 border-red-200' : 'text-[#183C2B]'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs font-semibold text-[#587064] hover:text-[#183C2B] pt-1 block cursor-pointer"
              >
                View Full Specifications & Materials →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct } = useStore();

  if (!quickViewProduct) return null;

  return (
    <QuickViewModalInner 
      product={quickViewProduct} 
      onClose={() => setQuickViewProduct(null)} 
    />
  );
};
