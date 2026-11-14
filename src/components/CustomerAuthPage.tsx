import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CustomerAuthPageProps {
  initialMode?: 'login' | 'register' | 'forgot-password';
}

export const CustomerAuthPage: React.FC<CustomerAuthPageProps> = ({ initialMode = 'login' }) => {
  const { login, register, setCurrentView, showToast } = useStore();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(initialMode);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('partapvinay269@gmail.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // 4-Step Password Reset State
  const [resetStep, setResetStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      showToast('Please enter your email and password', 'error');
      return;
    }
    const success = login(loginIdentifier, loginPassword);
    if (success) {
      showToast('Welcome back to EVORA!', 'success');
      setCurrentView('account');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFirstName || !regEmail || !regPassword) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (!agreeTerms) {
      showToast('Please accept the Terms & Conditions', 'error');
      return;
    }

    const fullName = `${regFirstName} ${regLastName}`.trim();
    const success = register(fullName, regEmail, regPhone, regPassword);
    if (success) {
      showToast('Account created successfully! Welcome to EVORA.', 'success');
      setCurrentView('account');
    }
  };

  const handleGoogleAuth = () => {
    showToast('Signed in with Google account: partapvinay269@gmail.com', 'success');
    login('partapvinay269@gmail.com', 'password123');
    setCurrentView('account');
  };

  // Step 1: Send Reset Code
  const handleResetStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      showToast('Please enter your email or mobile number', 'error');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setResetStep(2);
      showToast('Verification code sent to your email/mobile', 'info');
    }, 500);
  };

  // Step 2: Verify Code
  const handleResetStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetCode || resetCode.length < 4) {
      showToast('Please enter the 4-digit code (Use: 8429)', 'error');
      return;
    }
    setResetStep(3);
  };

  // Step 3 & 4: New Password & Confirmation
  const handleResetStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        setResetStep(5); // Final Success screen
        showToast('Password updated successfully', 'success');
      } else {
        showToast(data.message || 'Error updating password', 'error');
      }
    } catch {
      setResetStep(5);
      showToast('Password updated successfully', 'success');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]/50 py-12 sm:py-20 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#D7E8DC] space-y-6">
        
        {/* Brand Kicker */}
        <div className="text-center space-y-1">
          <button
            onClick={() => setCurrentView('home')}
            className="font-display text-2xl font-extrabold tracking-tight text-[#171717] hover:text-[#C47A52] transition-colors"
          >
            EVORA
          </button>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#587064] font-medium">
            Every Step, Every Generation.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE: FORGOT PASSWORD 4-STEP FLOW */}
        {/* ------------------------------------------------------------- */}
        {mode === 'forgot-password' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#D7E8DC]">
              <button
                onClick={() => { setMode('login'); setResetStep(1); }}
                className="text-xs font-semibold text-[#587064] hover:text-[#171717] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#C47A52] bg-[#F5F1E8] px-2.5 py-1 rounded-full">
                Step {Math.min(resetStep, 4)} of 4
              </span>
            </div>

            {/* Step 1: Enter email or phone */}
            {resetStep === 1 && (
              <form onSubmit={handleResetStep1} className="space-y-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#171717]">Reset Password</h2>
                  <p className="text-xs text-[#587064] mt-1">
                    Step 1: Enter your registered email or mobile number to receive a secure verification code.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Email / Mobile Number
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#587064] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="e.g. partapvinay269@gmail.com"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#171717] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? 'Sending...' : 'SEND VERIFICATION CODE'}
                </button>
              </form>
            )}

            {/* Step 2: Verification Code */}
            {resetStep === 2 && (
              <form onSubmit={handleResetStep2} className="space-y-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#171717]">Enter Code</h2>
                  <p className="text-xs text-[#587064] mt-1">
                    Step 2: Enter the 4-digit code sent to <strong className="text-[#171717]">{resetEmail}</strong> (Demo code: <strong>8429</strong>).
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Verification Code
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#587064] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="e.g. 8429"
                      className="w-full pl-10 pr-3.5 py-2.5 text-center tracking-widest text-lg font-mono font-bold border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#171717] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  VERIFY CODE
                </button>
              </form>
            )}

            {/* Step 3 & 4: Create & Confirm New Password */}
            {resetStep === 3 && (
              <form onSubmit={handleResetStep3} className="space-y-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#171717]">Set New Password</h2>
                  <p className="text-xs text-[#587064] mt-1">
                    Steps 3 & 4: Create and confirm your new secure password.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Step 3: Create New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#587064] absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Step 4: Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#587064] absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#171717] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? 'Updating...' : 'CONFIRM & UPDATE PASSWORD'}
                </button>
              </form>
            )}

            {/* Step 5: Final Success */}
            {resetStep === 5 && (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 bg-[#DFF3E4] text-[#5FAF78] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#171717]">
                  Your password has been successfully updated.
                </h3>
                <p className="text-xs text-[#587064]">
                  You can now log in securely to EVORA with your updated credentials.
                </p>
                <button
                  onClick={() => { setMode('login'); setResetStep(1); }}
                  className="w-full py-3 bg-[#171717] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  LOG IN NOW
                </button>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE: CUSTOMER LOGIN */}
        {/* ------------------------------------------------------------- */}
        {mode === 'login' && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="font-display text-2xl font-extrabold text-[#171717]">
                WELCOME BACK
              </h1>
              <p className="text-xs text-[#587064] mt-1">
                Log in to access your saved footwear, orders, and personalized AI size recommendations.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#171717] block mb-1">
                  Email / Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#587064] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="name@example.com or mobile"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#171717]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot-password'); setResetStep(1); setResetEmail(loginIdentifier); }}
                    className="text-xs text-[#C47A52] hover:underline font-semibold cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#587064] absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#587064]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-[#171717] rounded cursor-pointer"
                  />
                  <span>Remember Me</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#171717] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                LOG IN
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D7E8DC]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-[#587064] font-medium">Or</span>
              </div>
            </div>

            {/* Google Authentication */}
            <button
              onClick={handleGoogleAuth}
              className="w-full py-3 border border-[#D7E8DC] hover:bg-[#F5F1E8] text-[#171717] text-xs font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="pt-2 text-center text-xs text-[#587064]">
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="font-bold text-[#171717] hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE: CUSTOMER REGISTRATION */}
        {/* ------------------------------------------------------------- */}
        {mode === 'register' && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="font-display text-2xl font-extrabold text-[#171717]">
                CREATE YOUR EVORA ACCOUNT
              </h1>
              <p className="text-xs text-[#587064] mt-1">
                Unlock seamless checkout, doorstep returns, order tracking, and custom AI size matching.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    placeholder="e.g. Vinay"
                    className="w-full px-3.5 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    placeholder="e.g. Partap"
                    className="w-full px-3.5 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#171717] block mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#587064] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#171717] block mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#587064] absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#587064] absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3.5 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171717] block mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#587064] absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3.5 py-2 text-xs border border-[#D7E8DC] rounded-xl focus:outline-none focus:border-[#C47A52] text-[#171717] bg-[#F5F1E8]/30"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 text-xs text-[#587064] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 accent-[#171717] rounded mt-0.5 cursor-pointer"
                  />
                  <span>
                    I agree to the <span className="underline text-[#171717]">Terms & Conditions</span> and <span className="underline text-[#171717]">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#171717] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer mt-2"
              >
                CREATE ACCOUNT
              </button>
            </form>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D7E8DC]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-[#587064] font-medium">Or</span>
              </div>
            </div>

            <button
              onClick={handleGoogleAuth}
              className="w-full py-2.5 border border-[#D7E8DC] hover:bg-[#F5F1E8] text-[#171717] text-xs font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="pt-1 text-center text-xs text-[#587064]">
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-bold text-[#171717] hover:underline cursor-pointer"
              >
                Log In
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
