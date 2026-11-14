import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award,
  ArrowUp
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setFilters, setIsSizeChartOpen, showToast, openSupportModal } = useStore();

  const handleNav = (view: string, filterConfig?: any) => {
    setCurrentView(view);
    if (filterConfig) {
      setFilters(prev => ({
        ...prev,
        ...filterConfig,
        inStockOnly: false
      }));
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <footer className="bg-[#111111] text-[#E5E7EB] pt-16 pb-12 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Trust Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#222222]">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#5FAF78] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Delivery</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Complimentary shipping on orders over ₹999 across India</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-[#5FAF78] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">7-Day Easy Returns</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Hassle-free doorstep pickup and sizing exchanges</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#5FAF78] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Genuine</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Hand-inspected authenticity and premium craftsmanship</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-[#5FAF78] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ergonomic Fit</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Podiatrist-backed arch support for all-day comfort</p>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns + Brand Column */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info Column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="space-y-1">
              <span className="font-display text-2xl font-black text-white tracking-widest block">
                EVORA SHOES
              </span>
              <p className="text-xs text-[#5FAF78] font-semibold">
                “Every Step Makes a Statement.”
              </p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Premium modern sneaker and performance footwear brand. Engineered with precision cushioning, breathable knit uppers, and tailored comfort.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1F2937] hover:bg-[#5FAF78] hover:text-[#111111] flex items-center justify-center text-gray-300 transition-colors"
                aria-label="EVORA on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1F2937] hover:bg-[#5FAF78] hover:text-[#111111] flex items-center justify-center text-gray-300 transition-colors"
                aria-label="EVORA on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1F2937] hover:bg-[#5FAF78] hover:text-[#111111] flex items-center justify-center text-gray-300 transition-colors"
                aria-label="EVORA on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1F2937] hover:bg-[#5FAF78] hover:text-[#111111] flex items-center justify-center text-gray-300 transition-colors"
                aria-label="EVORA on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => handleNav('shop', { gender: 'men' })} className="hover:text-white transition-colors cursor-pointer">
                  Men's Sneakers & Shoes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', { gender: 'women' })} className="hover:text-white transition-colors cursor-pointer">
                  Women's Sneakers & Shoes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', { category: 'Running Shoes' })} className="hover:text-white transition-colors cursor-pointer">
                  Running & Performance
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', { category: 'Walking Shoes' })} className="hover:text-white transition-colors cursor-pointer">
                  Walking & Daily Comfort
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', { isNewArrival: true })} className="hover:text-white transition-colors cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', { isSale: true })} className="hover:text-white text-[#5FAF78] font-bold transition-colors cursor-pointer">
                  Sale & Special Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => handleNav('track-order')} className="hover:text-white transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => openSupportModal('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Support Team
                </button>
              </li>
              <li>
                <button onClick={() => openSupportModal('whatsapp')} className="hover:text-white text-[#5FAF78] transition-colors cursor-pointer">
                  WhatsApp Direct Help
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeChartOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Interactive Size Chart
                </button>
              </li>
              <li>
                <button onClick={() => openSupportModal('returns')} className="hover:text-white transition-colors cursor-pointer">
                  7-Day Doorstep Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => openSupportModal('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => showToast('EVORA SHOES: Crafting comfortable modern footwear for all generations.', 'info')} className="hover:text-white transition-colors cursor-pointer">
                  About EVORA SHOES
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Careers: Send your portfolio to careers@evorashoes.com', 'info')} className="hover:text-white transition-colors">
                  Careers & Culture
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Stores: Flagship locations in Mumbai, Bengaluru, Delhi NCR, and Hyderabad.', 'info')} className="hover:text-white transition-colors">
                  Store Locator
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Sustainability: 100% recycled packaging & eco-friendly materials.', 'info')} className="hover:text-white transition-colors">
                  Eco & Sustainability
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-[#5FAF78] text-gray-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Policies & Legal
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => openSupportModal('shipping')} className="hover:text-white transition-colors cursor-pointer">
                  Shipping & Delivery SLA
                </button>
              </li>
              <li>
                <button onClick={() => openSupportModal('returns')} className="hover:text-white transition-colors cursor-pointer">
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Privacy Policy: Your data is protected by 256-bit encryption.', 'info')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Terms: Governed by standard consumer protection regulations.', 'info')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Staff & Admin Console Section in Footer */}
        <div className="pt-8 pb-4 border-t border-[#222222] flex flex-col md:flex-row items-center justify-between gap-4 bg-[#161616] p-5 rounded-2xl border border-[#262626]">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#222222] border border-[#333333] flex items-center justify-center text-[#5FAF78]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h5 className="text-xs font-bold text-white tracking-wide">
                  EVORA Internal Admin Portal & Dashboard
                </h5>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#5FAF78]/15 text-[#5FAF78] border border-[#5FAF78]/30">
                  Staff & Management
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  Supabase: uwmqcdfrmlsrrgniinqp
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Manage inventory, incoming orders, discounts, returns, customer enquiries, and catalog settings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => handleNav('admin')}
              className="px-4 py-2 bg-[#5FAF78] hover:bg-[#4E9C66] text-[#111111] font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#111111]" />
              <span>Open Admin Dashboard</span>
            </button>
            <button
              onClick={() => handleNav('admin-login')}
              className="px-3.5 py-2 bg-[#222222] hover:bg-[#2c2c2c] text-gray-300 hover:text-white text-xs font-medium rounded-xl border border-[#333333] transition-colors cursor-pointer"
            >
              <span>Admin Login</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            © {new Date().getFullYear()} EVORA SHOES Inc. All rights reserved. Every Step Makes a Statement.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-gray-400 text-[11px]">
              Accepted Payments: UPI · Cards · Net Banking · COD
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
