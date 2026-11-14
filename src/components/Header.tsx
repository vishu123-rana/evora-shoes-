import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User as UserIcon, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Package, 
  LogOut, 
  SlidersHorizontal,
  ArrowLeftRight,
  HelpCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlist,
    currentUser,
    logout,
    setIsSearchOpen,
    setIsCartDrawerOpen,
    setIsAuthModalOpen,
    setAuthModalTab,
    toggleAdminRole,
    setFilters,
    comparedProducts,
    setIsCompareModalOpen,
    openSupportModal,
    showToast
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string, filterConfig?: { category?: string; gender?: string; isSale?: boolean; isNewArrival?: boolean }) => {
    setCurrentView(view);
    if (filterConfig) {
      setFilters(prev => ({
        ...prev,
        category: filterConfig.category || 'All',
        gender: filterConfig.gender || 'All',
        ageGroup: 'All',
        collection: 'All',
        inStockOnly: false,
        sortBy: filterConfig.isNewArrival ? 'newest' : filterConfig.isSale ? 'price-asc' : 'featured'
      }));
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <>
      {/* Top Announcement Bar */}
      {bannerVisible && (
        <div className="bg-[#183C2B] text-[#DFF3E4] text-xs py-2 px-4 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 text-center font-medium tracking-wide">
              <span>Free delivery on orders above ₹999</span>
              <span className="mx-2 opacity-40">·</span>
              <span className="text-[#A8D5BA]">Use code <strong>WELCOME10</strong> for 10% OFF</span>
              <span className="mx-2 opacity-40 hidden sm:inline">·</span>
              <span className="hidden sm:inline">Easy 7-day doorstep returns</span>
            </div>
            <button 
              onClick={() => setBannerVisible(false)}
              className="text-[#A8D5BA] hover:text-white p-0.5 text-xs transition-colors cursor-pointer"
              aria-label="Dismiss announcement"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Sticky Header: Slim white bar with centered EVORA SHOES branding */}
      <header
        className={`sticky top-0 z-40 border-b border-gray-100 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-[0_2px_15px_rgba(0,0,0,0.06)] py-0'
            : 'bg-white/98 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left Zone: Mobile menu trigger + Desktop Nav Links */}
          <div className="flex items-center gap-2 lg:flex-1">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-900 hover:text-[#5FAF78] focus:outline-none cursor-pointer transition-transform active:scale-95"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-wider font-semibold text-gray-800">
              <button
                onClick={() => handleNavClick('home')}
                className={`py-1 transition-colors hover:text-[#5FAF78] cursor-pointer ${
                  currentView === 'home' ? 'text-[#111111] font-bold border-b-2 border-[#111111]' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop', { gender: 'men' })}
                className="py-1 transition-colors hover:text-[#5FAF78] cursor-pointer"
              >
                Men
              </button>
              <button
                onClick={() => handleNavClick('shop', { gender: 'women' })}
                className="py-1 transition-colors hover:text-[#5FAF78] cursor-pointer"
              >
                Women
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Sneakers' })}
                className="py-1 transition-colors hover:text-[#5FAF78] cursor-pointer"
              >
                Sneakers
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Running Shoes' })}
                className="py-1 transition-colors hover:text-[#5FAF78] cursor-pointer"
              >
                Running
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Walking Shoes' })}
                className="py-1 transition-colors hover:text-[#5FAF78] cursor-pointer"
              >
                Walking
              </button>
              <button
                onClick={() => handleNavClick('shop', { isSale: true })}
                className="py-1 transition-colors hover:text-[#183C2B] text-[#5FAF78] font-bold cursor-pointer"
              >
                Sale
              </button>
            </nav>
          </div>

          {/* Center Zone: Centered EVORA SHOES Logo */}
          <div className="flex-1 sm:flex-initial text-center flex items-center justify-center">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex flex-col items-center justify-center focus:outline-none cursor-pointer"
              aria-label="EVORA SHOES Home"
            >
              <span className="font-display text-xl sm:text-2xl font-black tracking-widest text-[#111111] group-hover:text-[#5FAF78] transition-colors leading-none">
                EVORA SHOES
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-gray-500 font-semibold mt-0.5">
                EST. 2026
              </span>
            </button>
          </div>

          {/* Right Zone: Action Icons */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 lg:flex-1">
            
            {/* Quick Admin Toggle Button for Instant Testing */}
            <button
              onClick={toggleAdminRole}
              title={currentUser?.role === 'admin' ? 'Switch to Customer View' : 'Switch to Admin View'}
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-xl border transition-colors cursor-pointer ${
                currentUser?.role === 'admin'
                  ? 'bg-[#DFF3E4] text-[#183C2B] border-[#A8D5BA] font-semibold'
                  : 'bg-[#F5FAF6] text-[#587064] border-[#D7E8DC] hover:bg-[#DFF3E4]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{currentUser?.role === 'admin' ? 'Admin Mode' : 'Customer Mode'}</span>
            </button>

            {/* Support Hub Icon */}
            <button
              onClick={() => openSupportModal('faq')}
              title="Customer Support, FAQs & WhatsApp"
              className="p-2 text-gray-700 hover:text-[#111111] hover:bg-gray-100 rounded-full transition-colors relative cursor-pointer"
              aria-label="Open support and FAQ hub"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Compare Shoes Icon with badge */}
            <button
              onClick={() => {
                if (comparedProducts.length > 0) {
                  setIsCompareModalOpen(true);
                } else {
                  showToast('Add shoes to comparison by clicking the compare icon on any shoe card', 'info');
                }
              }}
              title="Compare Footwear Models"
              className="p-2 text-gray-700 hover:text-[#111111] hover:bg-gray-100 rounded-full transition-colors relative cursor-pointer"
              aria-label="Compare shoes"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {comparedProducts.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#5FAF78] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {comparedProducts.length}
                </span>
              )}
            </button>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-[#111111] hover:bg-gray-100 rounded-full transition-colors relative cursor-pointer"
              aria-label="Open search dialog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon with badge */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="p-2 text-gray-700 hover:text-[#111111] hover:bg-gray-100 rounded-full transition-colors relative cursor-pointer"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#111111] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account / Auth Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2 text-gray-700 hover:text-[#111111] hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                aria-label="User account menu"
              >
                <UserIcon className="w-5 h-5" />
                <ChevronDown className="w-3 h-3 hidden sm:inline-block opacity-60" />
              </button>

              {/* Account Dropdown Menu */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#D7E8DC] py-2 z-50"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-[#D7E8DC]">
                        <p className="text-xs text-[#587064]">Signed in as</p>
                        <p className="text-sm font-semibold text-[#183C2B] truncate">{currentUser.fullName}</p>
                        <p className="text-xs text-[#587064] truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#DFF3E4] text-[#183C2B]">
                          {currentUser.role}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleNavClick('account');
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#183C2B] hover:bg-[#F5FAF6] flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <UserIcon className="w-4 h-4 text-[#587064]" />
                        <span>My Account & Orders</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleNavClick('track-order');
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#183C2B] hover:bg-[#F5FAF6] flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Package className="w-4 h-4 text-[#587064]" />
                        <span>Track My Order</span>
                      </button>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            handleNavClick('admin');
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#183C2B] bg-[#DFF3E4] hover:bg-[#A8D5BA] flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <SlidersHorizontal className="w-4 h-4 text-[#183C2B]" />
                          <span>Admin Control Center</span>
                        </button>
                      )}

                      <div className="border-t border-[#D7E8DC] my-1" />

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <div className="p-3 text-center">
                      <p className="text-xs text-[#587064] mb-3">Sign in for personalized recommendations, faster checkout and order tracking.</p>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setAuthModalTab('login');
                          setIsAuthModalOpen(true);
                        }}
                        className="w-full py-2 px-4 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-semibold rounded-xl transition-colors mb-2 cursor-pointer"
                      >
                        Login to Account
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setAuthModalTab('register');
                          setIsAuthModalOpen(true);
                        }}
                        className="w-full py-2 px-4 border border-[#D7E8DC] hover:bg-[#DFF3E4] text-[#183C2B] text-xs font-medium rounded-xl transition-colors cursor-pointer mb-2"
                      >
                        Create New Account
                      </button>

                      <div className="border-t border-[#D7E8DC] my-1" />

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleNavClick('admin-login');
                        }}
                        className="w-full py-1.5 px-4 text-left text-[11px] text-[#587064] hover:text-[#183C2B] flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C47A52]" />
                        <span>Staff & Admin Portal</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Bag / Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-gray-700 hover:text-[#111111] hover:bg-gray-100 rounded-full transition-colors relative flex items-center cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#111111] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-10 border-r border-[#D7E8DC]">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#D7E8DC] flex items-center justify-between">
              <span className="font-display text-xl font-bold tracking-tight text-[#183C2B]">
                EVORA
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#587064] hover:text-[#183C2B] cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              <button
                onClick={() => handleNavClick('home')}
                className="w-full text-left py-2.5 px-3 text-sm font-semibold text-[#183C2B] rounded-xl hover:bg-[#DFF3E4]"
              >
                Home
              </button>

              <div className="pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#587064] px-3">
                Collections
              </div>

              <button
                onClick={() => handleNavClick('shop', { gender: 'men' })}
                className="w-full text-left py-2 px-3 text-sm text-[#183C2B] rounded-xl hover:bg-[#DFF3E4]"
              >
                Men's Footwear
              </button>
              <button
                onClick={() => handleNavClick('shop', { gender: 'women' })}
                className="w-full text-left py-2 px-3 text-sm text-[#183C2B] rounded-xl hover:bg-[#DFF3E4]"
              >
                Women's Footwear
              </button>
              <button
                onClick={() => handleNavClick('shop', { gender: 'kids' })}
                className="w-full text-left py-2 px-3 text-sm text-[#183C2B] rounded-xl hover:bg-[#DFF3E4]"
              >
                Kids' Collection
              </button>

              <div className="pt-2 pb-1">
                <button
                  onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                  className="w-full flex items-center justify-between py-1.5 px-3 text-[11px] font-bold uppercase tracking-wider text-[#587064] hover:text-[#183C2B] transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      categoriesExpanded ? 'rotate-180 text-[#183C2B]' : ''
                    }`}
                  />
                </button>
              </div>

              {categoriesExpanded && (
                <div className="space-y-0.5 pl-2">
                  <button
                    onClick={() => handleNavClick('shop', { category: 'Sneakers' })}
                    className="w-full text-left py-2 px-3 text-sm text-[#183C2B] rounded-xl hover:bg-[#DFF3E4] transition-colors"
                  >
                    Sneakers
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', { category: 'Running Shoes' })}
                    className="w-full text-left py-2 px-3 text-sm text-[#183C2B] rounded-xl hover:bg-[#DFF3E4] transition-colors"
                  >
                    Running Shoes
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', { category: 'Casual Shoes' })}
                    className="w-full text-left py-2 px-3 text-sm text-[#183C2B] rounded-xl hover:bg-[#DFF3E4] transition-colors"
                  >
                    Casual Shoes
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', { category: 'Formal Shoes' })}
                    className="w-full text-left py-2 px-3 text-sm text-[#183C2B] rounded-xl hover:bg-[#DFF3E4] transition-colors"
                  >
                    Formal Shoes
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', { category: 'Walking Shoes' })}
                    className="w-full text-left py-2 px-3 text-sm text-[#183C2B] rounded-xl hover:bg-[#DFF3E4] transition-colors"
                  >
                    Walking Shoes
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', { category: 'Slip-ons' })}
                    className="w-full text-left py-2 px-3 text-sm text-[#183C2B] rounded-xl hover:bg-[#DFF3E4] transition-colors"
                  >
                    Slip-ons & Comfort
                  </button>
                </div>
              )}

              <div className="pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#587064] px-3">
                Featured
              </div>
              <button
                onClick={() => handleNavClick('shop', { isNewArrival: true })}
                className="w-full text-left py-2 px-3 text-sm text-[#183C2B] font-semibold rounded-xl hover:bg-[#DFF3E4]"
              >
                New Arrivals
              </button>
              <button
                onClick={() => handleNavClick('shop', { isSale: true })}
                className="w-full text-left py-2 px-3 text-sm text-[#5FAF78] font-bold rounded-xl hover:bg-[#DFF3E4]"
              >
                Sale (Up to 40% Off)
              </button>
              <button
                onClick={() => handleNavClick('track-order')}
                className="w-full text-left py-2 px-3 text-sm text-[#183C2B] rounded-xl hover:bg-[#DFF3E4] flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-[#587064]" />
                <span>Track Order</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-[#D7E8DC] bg-[#F5FAF6] space-y-2">
              <button
                onClick={() => {
                  toggleAdminRole();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-xl border border-[#D7E8DC] text-xs font-semibold text-[#183C2B] bg-white hover:bg-[#DFF3E4] flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#5FAF78]" />
                <span>Switch to {currentUser?.role === 'admin' ? 'Customer' : 'Admin'} Mode</span>
              </button>
              
              {currentUser ? (
                <button
                  onClick={() => {
                    handleNavClick('account');
                  }}
                  className="w-full py-2.5 px-3 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  My Account ({currentUser.fullName})
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalTab('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 px-3 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
