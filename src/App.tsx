import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { HomeProductCollections } from './components/HomeProductCollections';
import { MadeForEveryStep } from './components/MadeForEveryStep';
import { PromotionalBanners } from './components/PromotionalBanners';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { InstagramGallery } from './components/InstagramGallery';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

// Full Views
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmedPage } from './components/OrderConfirmedPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { AccountDashboard } from './components/AccountDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminAuthPage } from './components/AdminAuthPage';
import { CustomerAuthPage } from './components/CustomerAuthPage';
import { WishlistPage } from './components/WishlistPage';

// AI Shopping Assistant & Overlays
import { AiAssistantWidget } from './components/AiAssistantWidget';
import { SearchSystem } from './components/SearchSystem';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { SizeChartModal } from './components/SizeChartModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ProductCompareModal } from './components/ProductCompareModal';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, selectedProduct, toasts, adminSession } = useStore();

  useEffect(() => {
    // Check if URL specifies admin login or admin view
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (hash === '#admin-login' || path === '/admin/login') {
      setCurrentView('admin-login');
    } else if (hash === '#admin' || path === '/admin') {
      setCurrentView('admin');
    }
  }, [setCurrentView]);

  const isAdminView = currentView === 'admin' || currentView === 'admin-login';

  const renderCurrentView = () => {
    switch (currentView) {
      case 'shop':
        return <ShopPage />;
      
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage product={selectedProduct} />
        ) : (
          <ShopPage />
        );
      
      case 'checkout':
        return <CheckoutPage />;
      
      case 'order-confirmation':
        return <OrderConfirmedPage />;
      
      case 'track-order':
        return <OrderTrackingPage />;
      
      case 'account':
        return <AccountDashboard />;
      
      case 'admin-login':
        return <AdminAuthPage />;

      case 'admin':
        return adminSession ? <AdminDashboard /> : <AdminAuthPage />;

      case 'customer-login':
        return <CustomerAuthPage initialMode="login" />;

      case 'customer-register':
        return <CustomerAuthPage initialMode="register" />;
      
      case 'wishlist':
        return <WishlistPage />;
      
      case 'home':
      default:
        return (
          <>
            {/* 1. Cinematic Hero Section */}
            <HeroSection />

            {/* 2. Featured Categories (Sneakers, Running, Formal, Boots, Kids, etc.) */}
            <CategoryShowcase />

            {/* 3. The EVORA Showcase (Best Sellers, New Arrivals, Trending Sneakers, Sports) */}
            <HomeProductCollections />

            {/* 4. Age-Based Shopping: MADE FOR EVERY STEP (Kids, Teens, Adults, Seniors) */}
            <MadeForEveryStep />

            {/* 5. Promotional Banners (Sale & Welcome Offer) */}
            <PromotionalBanners />

            {/* 6. Real Customer Reviews from Different Generations */}
            <CustomerReviewsSection />

            {/* 7. Instagram Community Showcase */}
            <InstagramGallery />

            {/* 8. Newsletter Subscription */}
            <NewsletterSection />
          </>
        );
    }
  };

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#E7E4DE]">
        {renderCurrentView()}

        {/* Toast Notifications */}
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold border ${
                toast.type === 'success'
                  ? 'bg-[#171717] text-white border-[#5FAF78]'
                  : toast.type === 'error'
                  ? 'bg-red-950 text-red-100 border-red-800'
                  : 'bg-[#222222] text-white border-[#333333]'
              }`}
            >
              {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-[#5FAF78] shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-[#C47A52] shrink-0" />}
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      {/* Header */}
      <Header />

      {/* Main Content View */}
      <main className="flex-1">
        <div key={currentView}>
          {renderCurrentView()}
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* EVORA AI Shopping Assistant: "Ask EVORA" floating widget */}
      <AiAssistantWidget />

      {/* Modals & Overlays */}
      <SearchSystem />
      <CartDrawer />
      <AuthModal />
      <SizeChartModal />
      <QuickViewModal />
      <ProductCompareModal />
      <CustomerSupportModal />

      {/* Toast Notifications */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold border ${
              toast.type === 'success'
                ? 'bg-[#183C2B] text-white border-[#5FAF78]'
                : toast.type === 'error'
                ? 'bg-red-950 text-red-100 border-red-800'
                : 'bg-white text-[#183C2B] border-[#D7E8DC]'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-[#A8D5BA] shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#5FAF78] shrink-0" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

