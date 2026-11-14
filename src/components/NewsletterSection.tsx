import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Use code WELCOME10 for 10% OFF', 'success');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#111111] text-white relative overflow-hidden border-b border-[#222222]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#5FAF78]" />
          <span>EVORA VIP INSIDER ACCESS</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white text-balance">
          JOIN THE EVORA INNER CIRCLE
        </h2>

        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
          Be the first to unlock early drops, limited edition restocks, private seasonal invitations, and exclusive member savings.
        </p>

        {subscribed ? (
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/10 border border-[#5FAF78]/40 text-white space-y-2 shadow-lg">
            <div className="flex items-center justify-center gap-2 text-[#5FAF78] font-display font-bold text-base">
              <Check className="w-5 h-5 text-[#5FAF78]" />
              <span>✓ Welcome to EVORA SHOES.</span>
            </div>
            <p className="text-xs text-gray-300">
              Your welcome voucher code is <strong className="text-white font-mono bg-white/15 px-2 py-0.5 rounded">WELCOME10</strong> (10% OFF your first order).
            </p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-700 rounded-xl text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#5FAF78] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-[#111111] hover:bg-[#5FAF78] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-gray-500">
          Zero spam. Unsubscribe anytime with a single click.
        </p>

      </div>
    </section>
  );
};
