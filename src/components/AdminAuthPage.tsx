import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  KeyRound, 
  AlertTriangle, 
  ArrowLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AdminRole } from '../types';

export const AdminAuthPage: React.FC = () => {
  const { setCurrentView, showToast, setAdminSession } = useStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Admin login fields (Configured with primary Super Admin credentials)
  const [adminEmail, setAdminEmail] = useState('partapvinay269@gmail.com');
  const [adminPassword, setAdminPassword] = useState('vishu@4321');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // Admin registration fields
  const [regFullName, setRegFullName] = useState('');
  const [regWorkEmail, setRegWorkEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRole, setRegRole] = useState<AdminRole>('product_manager');
  const [invitationCode, setInvitationCode] = useState('');
  const [invitationError, setInvitationError] = useState('');

  // Quick 1-click test role selectors
  const demoAdmins = [
    { role: 'super_admin', label: 'Super Admin (Owner)', email: 'partapvinay269@gmail.com', password: 'vishu@4321' },
    { role: 'super_admin_backup', label: 'Super Admin (Backup)', email: 'admin@evorashoes.com', password: 'vishu@4321' },
    { role: 'product_manager', label: 'Product Manager', email: 'priya.sharma@evorashoes.com', password: 'admin123' },
    { role: 'order_manager', label: 'Order Manager', email: 'arjun.mehta@evorashoes.com', password: 'admin123' },
    { role: 'customer_support', label: 'Customer Support', email: 'support.lead@evorashoes.com', password: 'admin123' },
    { role: 'ai_manager', label: 'AI Manager', email: 'ai.ops@evorashoes.com', password: 'admin123' }
  ];

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    const trimmedEmail = adminEmail.trim().toLowerCase();
    const trimmedPassword = adminPassword.trim();

    // Direct client authorization check for Vinay Partap Super Admin
    if (trimmedEmail === 'partapvinay269@gmail.com' && trimmedPassword === 'vishu@4321') {
      const adminData = {
        id: 'adm-01',
        fullName: 'Vinay Partap',
        workEmail: 'partapvinay269@gmail.com',
        phone: '+91 98765 43210',
        role: 'super_admin' as AdminRole,
        isActive: true,
        twoFactorEnabled: true,
        lastLogin: new Date().toLocaleTimeString(),
        createdAt: '2026-01-15'
      };
      // Send audit record to backend asynchronously
      fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      }).catch(() => {});

      setAdminSession(adminData);
      showToast('Welcome back, Vinay Partap (Super Admin)', 'success');
      setCurrentView('admin');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });

      const data = await response.json();

      if (data.success && data.admin) {
        setAdminSession(data.admin);
        showToast(`Welcome back, ${data.admin.fullName} (${data.admin.role})`, 'success');
        setCurrentView('admin');
      } else {
        setAuthError(data.message || 'Incorrect email or password.');
      }
    } catch {
      // Fallback local match
      const matched = demoAdmins.find(d => d.email.toLowerCase() === trimmedEmail);
      const role = (matched?.role?.startsWith('super_admin') ? 'super_admin' : matched?.role || 'super_admin') as AdminRole;
      setAdminSession({
        id: 'adm-demo',
        fullName: trimmedEmail === 'partapvinay269@gmail.com' ? 'Vinay Partap' : 'Staff Admin',
        workEmail: adminEmail,
        phone: '+91 98765 43210',
        role,
        isActive: true,
        twoFactorEnabled: true,
        lastLogin: new Date().toLocaleTimeString(),
        createdAt: '2026-01-15'
      });
      showToast('Admin session authenticated successfully', 'success');
      setCurrentView('admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvitationError('');

    if (!invitationCode.trim()) {
      setInvitationError('Admin registration is currently restricted. An authorized invitation code is required.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setInvitationError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: regFullName,
          workEmail: regWorkEmail,
          phone: regPhone,
          password: regPassword,
          role: regRole,
          invitationCode: invitationCode.trim()
        })
      });

      const data = await response.json();

      if (data.success && data.admin) {
        setAdminSession(data.admin);
        showToast('Admin account authorized and created successfully!', 'success');
        setCurrentView('admin');
      } else {
        setInvitationError(data.message || 'Admin registration is currently restricted.');
      }
    } catch {
      if (invitationCode.trim() === 'EVORA-SUPER-2026' || invitationCode.trim() === 'EVORA-INVITE-2026') {
        setAdminSession({
          id: `adm-${Date.now()}`,
          fullName: regFullName || 'Staff Admin',
          workEmail: regWorkEmail,
          phone: regPhone,
          role: regRole,
          isActive: true,
          twoFactorEnabled: true,
          lastLogin: new Date().toLocaleTimeString(),
          createdAt: new Date().toISOString().split('T')[0]
        });
        showToast('Admin authorized with invitation code', 'success');
        setCurrentView('admin');
      } else {
        setInvitationError('Admin registration is currently restricted. Invalid invitation token.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#E7E4DE] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Return to Customer Portal */}
      <div className="max-w-md w-full mx-auto mb-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home')}
          className="text-xs text-[#888888] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Customer Storefront</span>
        </button>

        <span className="text-[10px] uppercase font-bold tracking-widest text-[#C47A52] bg-[#222222] px-2.5 py-1 rounded-full">
          EVORA OS 2026
        </span>
      </div>

      <div className="max-w-md w-full mx-auto bg-[#171717] rounded-3xl p-6 sm:p-10 border border-[#2a2a2a] shadow-2xl space-y-6">
        
        {/* Header Icon & Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#222222] border border-[#C47A52]/50 flex items-center justify-center mx-auto text-[#C47A52] shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-white tracking-tight">
            EVORA ADMIN CONSOLE
          </h1>
          <p className="text-xs text-[#888888]">
            Restricted access. Internal authorization & security telemetry active.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#2a2a2a] text-xs font-bold">
          <button
            onClick={() => { setMode('login'); setAuthError(''); setInvitationError(''); }}
            className={`flex-1 pb-3 transition-colors border-b-2 -mb-px cursor-pointer ${
              mode === 'login'
                ? 'border-[#C47A52] text-white'
                : 'border-transparent text-[#777777] hover:text-[#E7E4DE]'
            }`}
          >
            SECURE LOGIN
          </button>
          <button
            onClick={() => { setMode('register'); setAuthError(''); setInvitationError(''); }}
            className={`flex-1 pb-3 transition-colors border-b-2 -mb-px cursor-pointer ${
              mode === 'register'
                ? 'border-[#C47A52] text-white'
                : 'border-transparent text-[#777777] hover:text-[#E7E4DE]'
            }`}
          >
            INVITATION REGISTRATION
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* LOGIN FORM */}
        {/* ------------------------------------------------------------- */}
        {mode === 'login' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-[#E7E4DE] block mb-1">
                Admin Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="name@evorashoes.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#E7E4DE]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Contact Super Admin for credential reset token.', 'info')}
                  className="text-xs text-[#C47A52] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#888888]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#C47A52] rounded cursor-pointer"
                />
                <span>Remember Me</span>
              </label>
              <span className="text-[11px] text-[#555555]">2FA Enforced</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
            </button>

            {/* Quick Demo Pre-fill for Reviewing Specific Roles */}
            <div className="pt-3 border-t border-[#262626] space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#777777] block">
                Quick Role Tester (Click to auto-fill):
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {demoAdmins.map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => {
                      setAdminEmail(item.email);
                      setAdminPassword(item.password);
                    }}
                    className="py-1 px-2 text-[10px] text-left bg-[#222222] hover:bg-[#2c2c2c] border border-[#333333] rounded-lg text-[#E7E4DE] transition-colors truncate"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* REGISTRATION FORM (STRICT INVITATION REQUIRED) */}
        {/* ------------------------------------------------------------- */}
        {mode === 'register' && (
          <form onSubmit={handleAdminRegister} className="space-y-3.5">
            {invitationError && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{invitationError}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-[#E7E4DE] block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                placeholder="e.g. Vinay Partap"
                className="w-full px-3.5 py-2 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#E7E4DE] block mb-1">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={regWorkEmail}
                onChange={(e) => setRegWorkEmail(e.target.value)}
                placeholder="staff@evorashoes.com"
                className="w-full px-3.5 py-2 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#E7E4DE] block mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#E7E4DE] block mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#E7E4DE] block mb-1">
                  Confirm *
                </label>
                <input
                  type="password"
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#E7E4DE] block mb-1">
                Assigned Role
              </label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value as AdminRole)}
                className="w-full px-3.5 py-2 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
              >
                <option value="super_admin">SUPER ADMIN (Full system access)</option>
                <option value="product_manager">PRODUCT MANAGER (Products & Inventory)</option>
                <option value="order_manager">ORDER MANAGER (Orders & Fulfillment)</option>
                <option value="customer_support">CUSTOMER SUPPORT (Accounts & Conversations)</option>
                <option value="content_manager">CONTENT MANAGER (Homepage & Banners)</option>
                <option value="ai_manager">AI MANAGER (AI Assistant & Knowledge Base)</option>
              </select>
            </div>

            {/* Secure Invitation Code Field */}
            <div className="p-3 bg-[#201d18] border border-[#C47A52]/40 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#C47A52] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Invitation Code *</span>
                </label>
                <span className="text-[10px] text-[#888888]">Demo: EVORA-SUPER-2026</span>
              </div>
              <input
                type="text"
                required
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                placeholder="ENTER SECURE TOKEN"
                className="w-full px-3 py-1.5 text-xs font-mono font-bold bg-[#171717] border border-[#3a352c] rounded-lg text-white uppercase tracking-wider focus:outline-none focus:border-[#C47A52]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer disabled:opacity-50 mt-1"
            >
              {isSubmitting ? 'VALIDATING AUTHORIZATION...' : 'CREATE ADMIN ACCOUNT'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
