import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShoeImage } from './ShoeImage';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, toggleWishlist, moveToCartFromWishlist, setCurrentView, viewProductDetails } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F5FAF6] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Wishlist Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D7E8DC] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-current" />
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#183C2B] tracking-tight">
                My Saved Wishlist
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#587064] mt-1">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>

          <button
            onClick={() => setCurrentView('shop')}
            className="px-4 py-2 border border-[#D7E8DC] bg-white hover:bg-[#DFF3E4] text-[#183C2B] text-xs font-semibold rounded-xl transition-colors self-start sm:self-auto cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>

        {/* Wishlist Grid */}
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#D7E8DC] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Image Stage */}
                <div 
                  onClick={() => viewProductDetails(product)}
                  className="aspect-[4/3] w-full bg-[#F5FAF6] overflow-hidden relative cursor-pointer"
                >
                  <ShoeImage
                    src={product.image}
                    alt={product.name}
                    category={product.category}
                    className="w-full h-full"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    title="Remove from wishlist"
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#587064] hover:text-red-600 transition-colors shadow-xs cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#587064] tracking-wider">
                      {product.category} · {product.gender}
                    </span>
                    <h3 
                      onClick={() => viewProductDetails(product)}
                      className="font-display text-sm font-bold text-[#183C2B] truncate hover:text-[#5FAF78] cursor-pointer mt-0.5"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-[#183C2B] tabular-nums">
                        ₹{product.discountedPrice.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.discountedPrice && (
                        <span className="text-xs text-[#587064] line-through tabular-nums">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Cart CTA */}
                  <button
                    onClick={() => moveToCartFromWishlist(product.id)}
                    className="w-full py-2.5 px-4 bg-[#183C2B] hover:bg-[#112d20] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F5FAF6] border border-[#D7E8DC] text-[#587064] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#183C2B]">Your wishlist is empty</h3>
              <p className="text-xs text-[#587064] mt-1">
                Save footwear you love by tapping the heart icon on any shoe card.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('shop')}
              className="px-6 py-3 bg-[#183C2B] hover:bg-[#112d20] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Discover Shoes
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
