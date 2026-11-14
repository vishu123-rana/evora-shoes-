import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Check, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    login, 
    register,
    showToast 
  } = useStore();

  const [email, setEmail] = useState('partapvinay269@gmail.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // Register fields
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    register(regFullName, regEmail, regPhone, regPassword);
  };

  const handleQuickDemoCustomer = () => {
    login('partapvinay269@gmail.com', 'password123');
  };

  const handleQuickDemoAdmin = () => {
    login('admin@evorashoes.com', 'admin123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D7E8DC] z-10">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-[#587064] hover:text-[#183C2B] rounded-lg transition-colors cursor-pointer"
          aria-label="Close auth dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switchers */}
        <div className="flex border-b border-[#D7E8DC] mb-6">
          <button
            onClick={() => setAuthModalTab('login')}
            className={`flex-1 pb-3 text-sm font-bold tracking-wide transition-colors cursor-pointer border-b-2 -mb-px ${
              authModalTab === 'login'
                ? 'border-[#183C2B] text-[#183C2B]'
                : 'border-transparent text-[#587064] hover:text-[#183C2B]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthModalTab('register')}
            className={`flex-1 pb-3 text-sm font-bold tracking-wide transition-colors cursor-pointer border-b-2 -mb-px ${
              authModalTab === 'register'
                ? 'border-[#183C2B] text-[#183C2B]'
                : 'border-transparent text-[#587064] hover:text-[#183C2B]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Demo Pre-fill Buttons */}
        <div className="mb-5 p-2.5 bg-[#F5FAF6] rounded-xl border border-[#D7E8DC] flex items-center justify-between text-xs">
          <span className="text-[#587064] font-medium">Quick 1-Click Fill:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleQuickDemoCustomer}
              className="px-2.5 py-1 bg-white border border-[#D7E8DC] rounded-lg font-semibold text-[#183C2B] hover:bg-[#DFF3E4] transition-colors cursor-pointer"
            >
              Customer
            </button>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="px-2.5 py-1 bg-[#DFF3E4] text-[#183C2B] border border-[#A8D5BA] rounded-lg font-semibold hover:bg-[#A8D5BA] transition-colors cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>

        {/* LOGIN FORM */}
        {authModalTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#183C2B] block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#587064] absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#183C2B]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordSent(true);
                    showToast('Password reset link sent to your email', 'info');
                  }}
                  className="text-[11px] text-[#587064] hover:text-[#183C2B] font-semibold cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#587064] absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/50"
                />
              </div>
            </div>

            {forgotPasswordSent && (
              <p className="text-[11px] text-[#183C2B] bg-[#DFF3E4] border border-[#A8D5BA] p-2 rounded-xl">
                Instructions to reset your password have been dispatched.
              </p>
            )}

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[#587064]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#183C2B]"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md mt-2 cursor-pointer"
            >
              Sign In to EVORA
            </button>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#183C2B] block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#587064] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. Vinay Partap"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-[#183C2B] block mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/50"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#183C2B] block mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/50 tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#183C2B] block mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/50"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#183C2B] block mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#5FAF78] text-[#183C2B] bg-[#F5FAF6]/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md mt-2 cursor-pointer"
            >
              Create My Account
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
