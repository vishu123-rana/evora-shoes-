import React, { useState } from 'react';
import { 
  X, 
  ArrowLeftRight, 
  Trash2, 
  Check, 
  ShoppingBag, 
  Eye, 
  Star, 
  Plus,
  Scale,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShoeImage } from './ShoeImage';
import { Product } from '../types';

export const ProductCompareModal: React.FC = () => {
  const {
    products,
    comparedProducts,
    removeFromCompare,
    clearCompare,
    addToCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
    viewProductDetails,
    addToCart,
    showToast
  } = useStore();

  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: number }>({});
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  if (comparedProducts.length === 0) return null;

  const comparedList = products.filter((p) => comparedProducts.includes(p.id));
  const availableToAdd = products.filter((p) => !comparedProducts.includes(p.id));

  const handleSizeChange = (productId: string, size: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuickAdd = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0] || 8;
    const color = product.colors[0];
    addToCart(product, size, color, 1);
  };

  return (
    <>
      {/* Floating Bar on bottom if comparison is active and modal is not open */}
      {!isCompareModalOpen && (
        <aside
          aria-label="Product comparison dock"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#183C2B] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#2d664b] flex items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#5FAF78] text-[#183C2B] flex items-center justify-center font-bold text-xs">
              <ArrowLeftRight className="w-4 h-4 text-[#183C2B]" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                <span>Compare Shoes</span>
                <span className="bg-[#5FAF78] text-[#183C2B] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {comparedList.length}/4
                </span>
              </div>
              <p className="text-[10px] text-[#A8D5BA] leading-tight">Side-by-side specs & cushioning</p>
            </div>
          </div>

          {/* Mini Thumbnails */}
          <div className="flex items-center -space-x-2 overflow-hidden px-1">
            {comparedList.map((p) => (
              <div
                key={p.id}
                className="w-8 h-8 rounded-lg overflow-hidden border border-white/40 bg-white shrink-0 relative group"
                title={p.name}
              >
                <ShoeImage
                  src={p.image}
                  alt={p.name}
                  category={p.category}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#5FAF78] hover:bg-[#4d9764] text-[#183C2B] text-xs font-extrabold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <span>Compare Now</span>
            </button>
            <button
              onClick={clearCompare}
              className="p-1.5 text-[#A8D5BA] hover:text-white transition-colors cursor-pointer"
              title="Clear comparison"
              aria-label="Clear all compared shoes"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* Full Screen Comparison Modal */}
      {isCompareModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsCompareModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-[#D7E8DC] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#D7E8DC] bg-[#F5FAF6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#183C2B] text-white flex items-center justify-center">
                  <ArrowLeftRight className="w-5 h-5 text-[#A8D5BA]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#183C2B]">
                    Footwear Specification Comparison
                  </h3>
                  <p className="text-xs text-[#587064]">
                    Compare silhouettes, arch ergonomics, materials, and pricing side-by-side.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearCompare}
                  className="px-3 py-1.5 text-xs text-[#587064] hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#D7E8DC] text-[#183C2B] flex items-center justify-center transition-colors cursor-pointer border border-[#D7E8DC]"
                  aria-label="Close comparison"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body / Scrollable Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Product Cards Grid */}
              <div className={`grid gap-4 ${
                comparedList.length === 1 ? 'grid-cols-1 md:grid-cols-2' :
                comparedList.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                comparedList.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
                {comparedList.map((product) => {
                  const selectedSize = selectedSizes[product.id] || product.sizes[0] || 8;
                  const savings = product.originalPrice - product.discountedPrice;

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-[#D7E8DC] p-4 flex flex-col justify-between hover:border-[#5FAF78] transition-all relative group shadow-xs"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-white/90 border border-[#D7E8DC] text-[#587064] hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                        title="Remove from compare"
                        aria-label={`Remove ${product.name} from comparison`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-3">
                        {/* Shoe Image */}
                        <div 
                          onClick={() => {
                            viewProductDetails(product);
                            setIsCompareModalOpen(false);
                          }}
                          className="aspect-[4/3] rounded-xl bg-[#F5FAF6] overflow-hidden cursor-pointer relative"
                        >
                          <ShoeImage
                            src={product.image}
                            alt={product.name}
                            category={product.category}
                            className="w-full h-full object-cover"
                          />
                          {product.discountPercent > 0 && (
                            <span className="absolute bottom-2 left-2 bg-[#DFF3E4] text-[#183C2B] font-bold text-[10px] px-2 py-0.5 rounded shadow-2xs border border-[#A8D5BA]">
                              {product.discountPercent}% OFF
                            </span>
                          )}
                        </div>

                        {/* Title & Category */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5FAF78]">
                            {product.category} · {product.gender.toUpperCase()}
                          </span>
                          <h4 
                            onClick={() => {
                              viewProductDetails(product);
                              setIsCompareModalOpen(false);
                            }}
                            className="font-display text-sm font-bold text-[#183C2B] hover:text-[#5FAF78] cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-[#587064] line-clamp-1 mt-0.5">
                            {product.subtitle}
                          </p>
                        </div>

                        {/* Pricing & Ratings */}
                        <div className="flex items-baseline justify-between pt-1 border-t border-[#D7E8DC]/60">
                          <div>
                            <span className="text-base font-extrabold text-[#183C2B] tabular-nums">
                              ₹{product.discountedPrice.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice > product.discountedPrice && (
                              <span className="text-xs text-[#587064] line-through ml-1.5 tabular-nums">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-[#183C2B]">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-bold">{product.rating}</span>
                            <span className="text-[10px] text-[#587064]">({product.reviewsCount})</span>
                          </div>
                        </div>

                        {/* Spec Table */}
                        <div className="space-y-2 pt-2 border-t border-[#D7E8DC]/60 text-xs">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#587064] block">Upper Material</span>
                            <p className="text-[11px] text-[#183C2B] line-clamp-1">{product.materials.upper}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#587064] block">Insole Cushioning</span>
                            <p className="text-[11px] text-[#183C2B] line-clamp-1">{product.materials.insole}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#587064] block">Outsole Traction</span>
                            <p className="text-[11px] text-[#183C2B] line-clamp-1">{product.materials.outsole}</p>
                          </div>

                          {/* Available Sizes */}
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#587064] block mb-1">
                              Select Size (UK)
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {product.sizes.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => handleSizeChange(product.id, s)}
                                  className={`px-2 py-0.5 text-[10px] font-bold rounded border transition-colors cursor-pointer ${
                                    selectedSize === s
                                      ? 'bg-[#183C2B] text-white border-[#183C2B]'
                                      : 'bg-[#F5FAF6] text-[#183C2B] border-[#D7E8DC] hover:bg-[#DFF3E4]'
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Color Swatches */}
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#587064] block mb-1">
                              Available Colorways ({product.colors.length})
                            </span>
                            <div className="flex items-center gap-1.5">
                              {product.colors.map((c, i) => (
                                <span
                                  key={i}
                                  className="w-3.5 h-3.5 rounded-full border border-[#D7E8DC]"
                                  style={{ backgroundColor: c.hex }}
                                  title={c.name}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Stock Status */}
                          <div className="pt-1 flex items-center justify-between text-[11px]">
                            <span className="text-[#587064]">Stock Availability:</span>
                            <span className={`font-bold ${product.inStock ? 'text-[#5FAF78]' : 'text-red-500'}`}>
                              {product.inStock ? `In Stock (${product.stockCount} units)` : 'Sold Out'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 mt-3 border-t border-[#D7E8DC] flex flex-col gap-2">
                        <button
                          onClick={() => handleQuickAdd(product)}
                          className="w-full py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add Size {selectedSize} to Bag</span>
                        </button>
                        <button
                          onClick={() => {
                            viewProductDetails(product);
                            setIsCompareModalOpen(false);
                          }}
                          className="w-full py-1.5 text-xs text-[#587064] hover:text-[#183C2B] font-semibold text-center transition-colors cursor-pointer"
                        >
                          View Full Details →
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Add Another Product Card Slot if under 4 shoes */}
                {comparedList.length < 4 && (
                  <div className="bg-[#F5FAF6] rounded-2xl border-2 border-dashed border-[#D7E8DC] p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[360px]">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#D7E8DC] flex items-center justify-center text-[#587064]">
                      <Plus className="w-6 h-6 text-[#5FAF78]" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#183C2B]">
                        Add Another Shoe
                      </h4>
                      <p className="text-xs text-[#587064] max-w-[200px] mt-0.5">
                        Compare up to 4 models from any collection.
                      </p>
                    </div>

                    <div className="relative w-full max-w-[240px]">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            addToCompare(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        defaultValue=""
                        className="w-full px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl text-[#183C2B] focus:outline-none focus:border-[#5FAF78] cursor-pointer"
                      >
                        <option value="" disabled>Select shoe to compare...</option>
                        {availableToAdd.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.category} - ₹{p.discountedPrice})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-[#D7E8DC] bg-[#F5FAF6] flex items-center justify-between text-xs text-[#587064]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5FAF78]" />
                <span>All shoes backed by EVORA 6-month craftsmanship guarantee & 7-day doorstep return policy.</span>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-2 bg-white border border-[#D7E8DC] hover:bg-[#D7E8DC] text-[#183C2B] font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
