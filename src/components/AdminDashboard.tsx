import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  DollarSign, 
  Plus, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  TrendingUp, 
  Check, 
  X,
  Search,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Bot,
  BookOpen,
  MessageSquare,
  Activity,
  Bell,
  Settings,
  UserCheck,
  FileText,
  LogOut,
  Camera,
  Layers,
  Filter,
  CheckCircle2,
  ChevronRight,
  Headphones,
  Sliders,
  Eye,
  Copy,
  Star,
  Database,
  RefreshCw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Order, Coupon, AdminRole, AdminUser, AiKnowledgeItem } from '../types';
import { ShoeImage } from './ShoeImage';
import { testSupabaseConnection, fetchSupabaseOrders, SUPABASE_SETUP_SQL, SUPABASE_PROJECT_ID, SUPABASE_URL } from '../lib/supabase';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    retrySyncOrderToSupabase,
    syncAllPendingOrdersToSupabase,
    coupons,
    addCoupon,
    toggleCouponActive,
    reviews,
    adminSession,
    setAdminSession,
    adminUsers,
    addAdminUser,
    updateAdminUser,
    auditLogs,
    addAuditLog,
    knowledgeBase,
    addKnowledgeItem,
    updateKnowledgeItem,
    deleteKnowledgeItem,
    aiSettings,
    updateAiSettings,
    aiConversations,
    updateConversationStatus,
    setCurrentView,
    showToast,
    returnRequests,
    updateReturnRequestStatus,
    supportTickets,
    addTicketResponse,
    updateTicketStatus
  } = useStore();

  const role: AdminRole = adminSession?.role || 'super_admin';

  // Ticket Reply & Enquiry State
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
  const [enquiryReplyText, setEnquiryReplyText] = useState('');

  // Inventory filter
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryFilter, setInventoryFilter] = useState<'all' | 'low_stock' | 'out_of_stock'>('all');

  // Store Settings State
  const [storeSettings, setStoreSettings] = useState({
    whatsAppNumber: '+91 98765 43210',
    supportEmail: 'support@evorashoes.com',
    supportPhone: '+91 800-386-7200',
    freeShippingThreshold: 999,
    expressDeliveryFee: 149,
    announcementBanner: 'USE CODE "WELCOME15" FOR 15% OFF YOUR FIRST ORDER | FREE NATIONWIDE EXPRESS DELIVERY',
    showBanner: true
  });

  // Supabase management state
  const [supabaseStatus, setSupabaseStatus] = useState<{
    tested: boolean;
    loading: boolean;
    connected: boolean;
    tableExists: boolean;
    message: string;
  }>({
    tested: false,
    loading: false,
    connected: false,
    tableExists: false,
    message: ''
  });
  const [supabaseRemoteOrders, setSupabaseRemoteOrders] = useState<any[]>([]);
  const [loadingRemoteOrders, setLoadingRemoteOrders] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [syncingOrderId, setSyncingOrderId] = useState<string | null>(null);

  const handleTestSupabase = async () => {
    setSupabaseStatus(prev => ({ ...prev, loading: true }));
    const result = await testSupabaseConnection();
    setSupabaseStatus({
      tested: true,
      loading: false,
      connected: result.connected,
      tableExists: result.tableExists,
      message: result.message
    });
    if (result.connected) {
      showToast('Supabase connection verified!', 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleFetchRemoteOrders = async () => {
    setLoadingRemoteOrders(true);
    const { orders: remote, error } = await fetchSupabaseOrders();
    setLoadingRemoteOrders(false);
    if (!error) {
      setSupabaseRemoteOrders(remote);
      showToast(`Fetched ${remote.length} orders from Supabase`, 'info');
    } else {
      showToast(`Supabase: ${error}`, 'error');
    }
  };

  const handleSyncAllOrders = async () => {
    setIsSyncingAll(true);
    await syncAllPendingOrdersToSupabase();
    setIsSyncingAll(false);
  };

  const handleSyncSingleOrder = async (orderId: string) => {
    setSyncingOrderId(orderId);
    await retrySyncOrderToSupabase(orderId);
    setSyncingOrderId(null);
  };

  // Navigation tabs allowed based on role
  const isAuthorized = (feature: string): boolean => {
    if (role === 'super_admin') return true;
    switch (feature) {
      case 'dashboard':
      case 'analytics':
        return true;
      case 'products':
      case 'add-product':
      case 'collections':
      case 'categories':
      case 'inventory':
      case 'ai-image-gen':
        return role === 'product_manager';
      case 'orders':
      case 'supabase':
        return role === 'order_manager';
      case 'returns':
        return role === 'order_manager' || role === 'customer_support';
      case 'enquiries':
      case 'customers':
      case 'reviews':
        return role === 'customer_support';
      case 'ai-conversations':
        return role === 'customer_support' || role === 'ai_manager';
      case 'homepage':
      case 'discounts':
        return role === 'content_manager';
      case 'ai-assistant':
      case 'ai-knowledge':
        return role === 'ai_manager';
      case 'admin-users':
      case 'audit-log':
      case 'settings':
        return false;
      default:
        return false;
    }
  };

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Modals state
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddCouponModalOpen, setIsAddCouponModalOpen] = useState(false);
  const [isAiImageModalOpen, setIsAiImageModalOpen] = useState(false);
  const [isAddKbModalOpen, setIsAddKbModalOpen] = useState(false);
  const [editingKbItem, setEditingKbItem] = useState<AiKnowledgeItem | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  // AI Product Image Generator State
  const [selectedProductForAi, setSelectedProductForAi] = useState<Product>(products[0]);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [generatedViews, setGeneratedViews] = useState<any[]>([]);

  // New product state
  const [newProduct, setNewProduct] = useState({
    name: '',
    subtitle: '',
    category: 'Sneakers' as Product['category'],
    gender: 'unisex' as Product['gender'],
    ageGroup: 'adults' as Product['ageGroup'],
    collection: 'Core' as Product['collection'],
    originalPrice: 4999,
    discountedPrice: 3499,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 1,
    inStock: true,
    stockCount: 50,
    colors: [{ name: 'Triple White', hex: '#FFFFFF' }],
    sizes: [7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'],
    description: 'Masterfully built with ultra-breathable engineered knit and cloud foam sole.',
    features: ['High-rebound cushioning', 'Non-slip traction'],
    materials: {
      upper: 'Engineered breathable knit',
      lining: 'Soft mesh',
      insole: 'OrthoLite foam',
      outsole: 'Carbon rubber'
    },
    careGuide: 'Wipe clean with a damp cloth.'
  });

  // New Knowledge Item State
  const [newKb, setNewKb] = useState({
    category: 'Brand Information' as AiKnowledgeItem['category'],
    title: '',
    content: ''
  });

  // New Coupon Form
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    code: '',
    discountPercent: 15,
    minOrder: 1999,
    maxDiscount: 1000,
    description: 'Special seasonal promotion',
    expiresAt: '2026-12-31',
    isActive: true
  });

  // KPI calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 142850);
  const todayOrders = orders.filter(o => o.date === '2026-09-24' || o.date === new Date().toISOString().split('T')[0]).length || 8;
  const totalCustomersCount = 124;
  const lowStockCount = products.filter(p => p.stockCount <= 20).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Order Placed' || o.status === 'Confirmed').length || 2;
  const totalAiConvs = aiConversations.length + 42;

  // Handle AI Product Image Generation
  const handleGenerateAiImages = async () => {
    setIsGeneratingImages(true);
    try {
      const res = await fetch('/api/ai/generate-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: selectedProductForAi.name,
          category: selectedProductForAi.category,
          colorName: selectedProductForAi.colors[0]?.name,
          referenceImageUrl: selectedProductForAi.image
        })
      });
      const data = await res.json();
      if (data.success && data.views) {
        setGeneratedViews(data.views);
        addAuditLog('Product Images Generated', `Generated 5 multi-angle studio assets for ${selectedProductForAi.name}`);
        showToast('5 AI product views generated with preserved identity!', 'success');
      }
    } catch {
      showToast('Image generator simulated offline mode', 'info');
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name) return;
    addProduct({
      ...newProduct,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, '-')
    });
    addAuditLog('Product Created', `Created product: ${newProduct.name}`);
    setIsAddProductModalOpen(false);
    showToast(`Product ${newProduct.name} created`, 'success');
  };

  const handleUpdateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    addAuditLog('Product Edited', `Updated product ID: ${editingProduct.id}`);
    setEditingProduct(null);
    showToast('Product updated successfully', 'success');
  };

  const handleDuplicateProduct = (p: Product) => {
    addProduct({
      ...p,
      name: `${p.name} (Copy)`,
      slug: `${p.slug}-copy`
    });
    addAuditLog('Product Duplicated', `Duplicated product: ${p.name}`);
    showToast(`Duplicated ${p.name}`, 'success');
  };

  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code) return;
    addCoupon({
      ...newCoupon,
      code: newCoupon.code.toUpperCase().trim()
    });
    addAuditLog('Discount Created', `Created coupon code: ${newCoupon.code}`);
    setIsAddCouponModalOpen(false);
    showToast(`Coupon ${newCoupon.code} activated`, 'success');
  };

  const handleCreateKbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKb.title || !newKb.content) return;
    addKnowledgeItem(newKb);
    setIsAddKbModalOpen(false);
    setNewKb({ category: 'Brand Information', title: '', content: '' });
  };

  const handleLogout = () => {
    setAdminSession(null);
    addAuditLog('Admin Logout', 'Logged out from admin session');
    showToast('Logged out of Admin Console', 'info');
    setCurrentView('admin-login');
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#E7E4DE] flex flex-col lg:flex-row">
      
      {/* ------------------------------------------------------------- */}
      {/* SECTION 17: ADMIN SIDEBAR */}
      {/* ------------------------------------------------------------- */}
      <aside className="w-full lg:w-64 bg-[#171717] border-r border-[#262626] flex flex-col shrink-0">
        
        {/* Top Branding */}
        <div className="p-6 border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#262626] border border-[#C47A52]/50 flex items-center justify-center text-[#C47A52]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display text-base font-extrabold text-white tracking-wide block">
                EVORA ADMIN
              </span>
              <span className="text-[10px] text-[#C47A52] uppercase font-bold tracking-wider">
                {role.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto text-xs font-semibold">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'inventory', label: 'Inventory & Stock', icon: Layers },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'supabase', label: 'Supabase Backend', icon: Database },
            { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw },
            { id: 'enquiries', label: 'Customer Enquiries', icon: Headphones },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'reviews', label: 'Reviews', icon: MessageSquare },
            { id: 'discounts', label: 'Discounts', icon: Tag },
            { id: 'ai-image-gen', label: 'AI Image Generator', icon: Camera },
            { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
            { id: 'ai-knowledge', label: 'AI Knowledge Base', icon: BookOpen },
            { id: 'ai-conversations', label: 'AI Conversations', icon: Activity },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'admin-users', label: 'Admin Users', icon: UserCheck },
            { id: 'audit-log', label: 'Audit Log', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(item => {
            const allowed = isAuthorized(item.id);
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => allowed && setActiveTab(item.id)}
                disabled={!allowed}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#C47A52] text-white shadow-sm'
                    : allowed
                    ? 'text-[#888888] hover:text-white hover:bg-[#222222]'
                    : 'text-[#444444] cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {!allowed && (
                  <span className="text-[9px] uppercase tracking-wider text-[#555555]">
                    Locked
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User Info & Exit */}
        <div className="p-4 border-t border-[#262626] bg-[#141414] space-y-3">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{adminSession?.fullName || 'Vinay Partap'}</p>
              <p className="text-[10px] text-[#777777] truncate">{adminSession?.workEmail || 'partapvinay269@gmail.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-[#888888] hover:text-red-400 hover:bg-[#222222] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setCurrentView('home')}
            className="w-full py-2 bg-[#222222] hover:bg-[#2c2c2c] text-[#E7E4DE] text-[11px] font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#333333]"
          >
            <span>View Public Store</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT AREA */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="h-16 px-6 bg-[#171717] border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-lg font-bold text-white capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#262626] text-[#C47A52] border border-[#C47A52]/30">
              Role: {role.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#888888] hidden sm:inline">
              Welcome back, Admin.
            </span>
            <div className="flex items-center gap-1 text-[11px] bg-[#DFF3E4]/10 text-[#5FAF78] border border-[#5FAF78]/30 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#5FAF78]" />
              <span>System Operational</span>
            </div>
          </div>
        </header>

        {/* Content View Container */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          
          {/* ========================================================= */}
          {/* TAB: DASHBOARD (SECTION 16) */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Welcome banner */}
              <div className="bg-[#171717] rounded-3xl p-6 sm:p-8 border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C47A52]">
                    Operational Overview
                  </span>
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Welcome back, Admin.
                  </h1>
                  <p className="text-xs text-[#888888] mt-1 max-w-xl">
                    Real-time metrics for EVORA footwear orders, inventory, customer inquiries, and AI assistant conversions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedProductForAi(products[0]);
                      setActiveTab('ai-image-gen');
                    }}
                    className="px-4 py-2.5 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Generate AI Images</span>
                  </button>
                  <button
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="px-4 py-2.5 bg-[#262626] hover:bg-[#333333] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer border border-[#3a3a3a]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* 9 KPI Cards as required by Section 16 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                
                {/* 1. Total Sales */}
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-2">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
                    <DollarSign className="w-4 h-4 text-[#C47A52]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-white tabular-nums">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-[#5FAF78] flex items-center gap-1 font-semibold">
                    <ArrowUpRight className="w-3 h-3" /> +18.4% from last month
                  </span>
                </div>

                {/* 2. Today's Orders */}
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-2">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs font-semibold uppercase tracking-wider">Today's Orders</span>
                    <ShoppingBag className="w-4 h-4 text-[#5FAF78]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-white tabular-nums">
                    {todayOrders}
                  </div>
                  <span className="text-[10px] text-[#888888]">
                    Avg. fulfillment: 2.4 hrs
                  </span>
                </div>

                {/* 3. Total Customers */}
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-2">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs font-semibold uppercase tracking-wider">Total Customers</span>
                    <Users className="w-4 h-4 text-[#4285F4]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-white tabular-nums">
                    {totalCustomersCount}
                  </div>
                  <span className="text-[10px] text-[#5FAF78] flex items-center gap-1 font-semibold">
                    <ArrowUpRight className="w-3 h-3" /> +24 new accounts this week
                  </span>
                </div>

                {/* 4. Total Products */}
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-2">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs font-semibold uppercase tracking-wider">Total Products</span>
                    <Package className="w-4 h-4 text-[#FBBC05]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-white tabular-nums">
                    {products.length}
                  </div>
                  <span className="text-[10px] text-[#888888]">
                    Across 10 footwear categories
                  </span>
                </div>

                {/* 5. Low Stock Products */}
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-2">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs font-semibold uppercase tracking-wider">Low Stock Products</span>
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="font-display text-2xl font-bold text-amber-400 tabular-nums">
                    {lowStockCount}
                  </div>
                  <span className="text-[10px] text-amber-400/80">
                    Threshold: &lt; 20 units
                  </span>
                </div>

                {/* 6. Pending Orders */}
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-2">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs font-semibold uppercase tracking-wider">Pending Orders</span>
                    <Layers className="w-4 h-4 text-[#A8D5BA]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-white tabular-nums">
                    {pendingOrdersCount}
                  </div>
                  <span className="text-[10px] text-[#888888]">
                    In inspection & packing
                  </span>
                </div>

                {/* 7. AI Conversations */}
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-2">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs font-semibold uppercase tracking-wider">AI Conversations</span>
                    <Bot className="w-4 h-4 text-[#C47A52]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-white tabular-nums">
                    {totalAiConvs}
                  </div>
                  <span className="text-[10px] text-[#5FAF78] font-semibold">
                    88.4% resolved autonomously
                  </span>
                </div>

                {/* 8. Conversion Rate & 9. Revenue */}
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-2">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs font-semibold uppercase tracking-wider">AI Conversion Rate</span>
                    <TrendingUp className="w-4 h-4 text-[#5FAF78]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-white tabular-nums">
                    4.82%
                  </div>
                  <span className="text-[10px] text-[#5FAF78]">
                    Revenue from AI: ₹68,400
                  </span>
                </div>

              </div>

              {/* Recent Orders and AI Activity Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Orders Table */}
                <div className="bg-[#171717] rounded-3xl p-6 border border-[#262626] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-white">Recent Customer Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-[#C47A52] hover:underline cursor-pointer"
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="divide-y divide-[#262626]">
                    {orders.slice(0, 4).map(ord => (
                      <div key={ord.id} className="py-3 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-xs font-bold text-white">{ord.orderNumber}</span>
                          <p className="text-[11px] text-[#777777]">{ord.shippingAddress.fullName} · {ord.items.length} items</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-white tabular-nums">₹{ord.total.toLocaleString('en-IN')}</span>
                          <span className="block text-[10px] font-semibold text-[#5FAF78]">{ord.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Assistant Health & Knowledge */}
                <div className="bg-[#171717] rounded-3xl p-6 border border-[#262626] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-white">AI Assistant Status</h3>
                    <button
                      onClick={() => setActiveTab('ai-assistant')}
                      className="text-xs text-[#C47A52] hover:underline cursor-pointer"
                    >
                      Control Center →
                    </button>
                  </div>

                  <div className="p-4 bg-[#201d18] border border-[#C47A52]/30 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Bot className="w-4 h-4 text-[#C47A52]" />
                        <span>EVORA Assistant Status</span>
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${aiSettings.isEnabled ? 'bg-[#183C2B] text-[#5FAF78]' : 'bg-red-950 text-red-400'}`}>
                        {aiSettings.isEnabled ? 'ONLINE & ACTIVE' : 'DISABLED'}
                      </span>
                    </div>
                    <p className="text-xs text-[#888888]">
                      Grounded in {knowledgeBase.length} active knowledge base entries & {products.length} footwear styles.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#888888] uppercase tracking-wider block">
                      Recent AI Conversations
                    </span>
                    <div className="divide-y divide-[#262626]">
                      {aiConversations.slice(0, 3).map(conv => (
                        <div key={conv.id} className="py-2.5 flex items-center justify-between">
                          <div className="min-w-0 pr-2">
                            <span className="text-xs font-bold text-white truncate block">{conv.topic}</span>
                            <span className="text-[10px] text-[#777777]">{conv.customerName} · {conv.date}</span>
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${conv.status === 'resolved' ? 'bg-[#183C2B] text-[#5FAF78]' : 'bg-[#222222] text-[#C47A52]'}`}>
                            {conv.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: PRODUCTS & MANAGEMENT (SECTIONS 18 & 19) */}
          {/* ========================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Footwear Catalog Management</h3>
                  <p className="text-xs text-[#888888]">
                    Manage pricing, inventory, categories, sizes, and publish states.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('ai-image-gen')}
                    className="px-4 py-2 bg-[#222222] hover:bg-[#2c2c2c] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 border border-[#333333] cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#C47A52]" />
                    <span>AI Images</span>
                  </button>
                  <button
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="px-4 py-2 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Shoe</span>
                  </button>
                </div>
              </div>

              {/* Product Table */}
              <div className="bg-[#171717] rounded-3xl border border-[#262626] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#141414] text-[#888888] font-bold uppercase tracking-wider border-b border-[#262626]">
                      <tr>
                        <th className="py-3 px-4">Shoe</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Gender</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626]">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-[#1a1a1a] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-[#222222] overflow-hidden shrink-0 border border-[#333333]">
                                <ShoeImage
                                  src={p.image}
                                  alt={p.name}
                                  category={p.category}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <span className="font-bold text-white block">{p.name}</span>
                                <span className="text-[10px] text-[#777777]">{p.subtitle}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[#CCCCCC]">{p.category}</td>
                          <td className="py-3 px-4 text-[#CCCCCC] capitalize">{p.gender}</td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-white tabular-nums">₹{p.discountedPrice.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] text-[#777777] line-through block">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-bold tabular-nums ${p.stockCount <= 20 ? 'text-amber-400' : 'text-white'}`}>
                              {p.stockCount} units
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.inStock ? 'bg-[#183C2B] text-[#5FAF78]' : 'bg-red-950 text-red-400'}`}>
                              {p.inStock ? 'Published' : 'Draft / OOS'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedProductForAi(p);
                                  setActiveTab('ai-image-gen');
                                }}
                                title="Generate AI Product Images"
                                className="p-1.5 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-[#C47A52] transition-colors"
                              >
                                <Camera className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDuplicateProduct(p)}
                                title="Duplicate"
                                className="p-1.5 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-[#888888] hover:text-white transition-colors"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingProduct(p)}
                                title="Edit"
                                className="p-1.5 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-[#888888] hover:text-white transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  deleteProduct(p.id);
                                  addAuditLog('Product Deleted', `Deleted product: ${p.name}`);
                                  showToast(`Deleted ${p.name}`, 'info');
                                }}
                                title="Delete"
                                className="p-1.5 rounded-lg bg-[#222222] hover:bg-red-950 text-[#888888] hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: AI PRODUCT IMAGE GENERATOR (SECTION 20) */}
          {/* ========================================================= */}
          {activeTab === 'ai-image-gen' && (
            <div className="space-y-6">
              <div className="bg-[#171717] rounded-3xl p-6 sm:p-8 border border-[#262626] space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C47A52] flex items-center gap-1.5">
                    <Camera className="w-4 h-4" />
                    <span>Commercial Footwear Studio</span>
                  </span>
                  <h2 className="font-display text-2xl font-extrabold text-white mt-1">
                    GENERATE AI PRODUCT IMAGES
                  </h2>
                  <p className="text-xs text-[#888888] mt-1 max-w-2xl">
                    Admin uploads original shoe reference. Generates 5 commercial photography angles while preserving exact footwear design, shape, colour, sole, logo, stitching, and materials.
                  </p>
                </div>

                {/* Target Product Selection */}
                <div className="p-4 bg-[#201d18] rounded-2xl border border-[#C47A52]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#171717] border border-[#333333]">
                      <ShoeImage
                        src={selectedProductForAi.image}
                        alt={selectedProductForAi.name}
                        category={selectedProductForAi.category}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">{selectedProductForAi.name}</span>
                      <span className="text-xs text-[#888888]">{selectedProductForAi.category} · {selectedProductForAi.colors[0]?.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedProductForAi.id}
                      onChange={(e) => {
                        const found = products.find(p => p.id === e.target.value);
                        if (found) setSelectedProductForAi(found);
                      }}
                      className="px-3 py-2 bg-[#171717] border border-[#333333] rounded-xl text-xs text-white"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>

                    <button
                      onClick={handleGenerateAiImages}
                      disabled={isGeneratingImages}
                      className="px-5 py-2.5 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isGeneratingImages ? 'GENERATING 5 ANGLES...' : 'GENERATE 5 VIEWS'}</span>
                    </button>
                  </div>
                </div>

                {/* 5 View Output Angles */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Generated Multi-Angle Photographic Views
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {[
                      {
                        title: '1. Studio Product Image',
                        desc: 'Clean 45° angle on neutral studio floor',
                        img: generatedViews[0]?.url || selectedProductForAi.image
                      },
                      {
                        title: '2. Side Profile',
                        desc: 'Lateral elevation demonstrating sole drop',
                        img: generatedViews[1]?.url || 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
                      },
                      {
                        title: '3. Detail Image',
                        desc: 'Macro texture on knit weave & eyelets',
                        img: generatedViews[2]?.url || 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
                      },
                      {
                        title: '4. Lifestyle Image',
                        desc: 'Arranged naturally on architectural concrete',
                        img: generatedViews[3]?.url || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80'
                      },
                      {
                        title: '5. On-Foot Image',
                        desc: 'Demonstrating ergonomics and in-motion fit',
                        img: generatedViews[4]?.url || 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80'
                      }
                    ].map((view, idx) => (
                      <div key={idx} className="bg-[#141414] rounded-2xl overflow-hidden border border-[#262626] p-3 space-y-2 flex flex-col justify-between">
                        <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#1f1f1f] relative">
                          <img
                            src={view.img}
                            alt={view.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                            View {idx + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{view.title}</h4>
                          <p className="text-[10px] text-[#777777] line-clamp-2 mt-0.5">{view.desc}</p>
                        </div>
                        <button
                          onClick={() => {
                            showToast(`Saved ${view.title} to ${selectedProductForAi.name} gallery`, 'success');
                          }}
                          className="w-full py-1.5 bg-[#222222] hover:bg-[#2c2c2c] text-white text-[10px] font-bold rounded-lg border border-[#333333] transition-colors"
                        >
                          Attach to Gallery
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: AI KNOWLEDGE BASE (SECTION 21) */}
          {/* ========================================================= */}
          {activeTab === 'ai-knowledge' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">AI Knowledge Base</h3>
                  <p className="text-xs text-[#888888]">
                    Grounded truth repository used by the EVORA AI Shopping Assistant for customer queries.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddKbModalOpen(true)}
                  className="px-4 py-2 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Knowledge Entry</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {knowledgeBase.map(item => (
                  <div key={item.id} className="bg-[#171717] rounded-2xl p-5 border border-[#262626] space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#C47A52] bg-[#222222] px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-[#777777]">Updated: {item.updatedAt}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-[#CCCCCC] mt-1 leading-relaxed">{item.content}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#262626]">
                      <button
                        onClick={() => deleteKnowledgeItem(item.id)}
                        className="p-1.5 rounded-lg text-[#888888] hover:text-red-400 hover:bg-[#222222] transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: AI ASSISTANT CONTROL CENTER (SECTION 22) */}
          {/* ========================================================= */}
          {activeTab === 'ai-assistant' && (
            <div className="space-y-6">
              <div className="bg-[#171717] rounded-3xl p-6 sm:p-8 border border-[#262626] space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">AI Assistant Control Center</h3>
                  <p className="text-xs text-[#888888] mt-1">
                    Configure behavior, brand persona, recommendation algorithms, tone, and escalation triggers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Master Toggle */}
                  <div className="p-4 bg-[#201d18] rounded-2xl border border-[#C47A52]/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">AI Assistant System Active</span>
                      <span className="text-[11px] text-[#888888]">Enable floating widget on customer storefront</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={aiSettings.isEnabled}
                        onChange={(e) => updateAiSettings({ isEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#333333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5FAF78]" />
                    </label>
                  </div>

                  {/* Assistant Name */}
                  <div className="p-4 bg-[#141414] rounded-2xl border border-[#262626] space-y-1.5">
                    <label className="text-xs font-bold text-white block">Assistant Public Name</label>
                    <input
                      type="text"
                      value={aiSettings.assistantName}
                      onChange={(e) => updateAiSettings({ assistantName: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                    />
                  </div>

                  {/* Tone */}
                  <div className="p-4 bg-[#141414] rounded-2xl border border-[#262626] space-y-1.5">
                    <label className="text-xs font-bold text-white block">Tone of Voice</label>
                    <select
                      value={aiSettings.tone}
                      onChange={(e) => updateAiSettings({ tone: e.target.value as any })}
                      className="w-full px-3 py-1.5 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                    >
                      <option value="friendly">Friendly & Welcoming</option>
                      <option value="professional">Professional & Refined</option>
                      <option value="concise">Concise & Direct</option>
                    </select>
                  </div>

                  {/* Recommendation Rule */}
                  <div className="p-4 bg-[#141414] rounded-2xl border border-[#262626] space-y-1.5">
                    <label className="text-xs font-bold text-white block">Product Recommendation Engine</label>
                    <select
                      value={aiSettings.recommendedProductsRule}
                      onChange={(e) => updateAiSettings({ recommendedProductsRule: e.target.value as any })}
                      className="w-full px-3 py-1.5 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                    >
                      <option value="smart_match">Smart Multi-Attribute Match (Intent, Budget, Category)</option>
                      <option value="best_sellers">Prioritize Best Sellers</option>
                      <option value="trending">Prioritize Trending New Arrivals</option>
                    </select>
                  </div>
                </div>

                {/* Greeting Message */}
                <div className="p-4 bg-[#141414] rounded-2xl border border-[#262626] space-y-2">
                  <label className="text-xs font-bold text-white block">Default Greeting Message</label>
                  <input
                    type="text"
                    value={aiSettings.greetingMessage}
                    onChange={(e) => updateAiSettings({ greetingMessage: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                  />
                </div>

                {/* System Prompt / Guardrail Instructions */}
                <div className="p-4 bg-[#141414] rounded-2xl border border-[#262626] space-y-2">
                  <label className="text-xs font-bold text-white block">Core Brand AI Instructions (Guardrails)</label>
                  <textarea
                    rows={4}
                    value={aiSettings.systemInstructions}
                    onChange={(e) => updateAiSettings({ systemInstructions: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52] leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: AI CONVERSATION VIEWER & ANALYTICS (SECTIONS 23 & 24) */}
          {/* ========================================================= */}
          {activeTab === 'ai-conversations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">AI Conversations & Support Takeover</h3>
                  <p className="text-xs text-[#888888]">
                    Inspect live customer interactions, view products discussed, and take over support when needed.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Conversations List */}
                <div className="lg:col-span-5 bg-[#171717] rounded-3xl p-4 border border-[#262626] space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#888888] px-2 block">
                    Active & Recent Sessions ({aiConversations.length})
                  </span>
                  <div className="space-y-2">
                    {aiConversations.map(conv => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          selectedConversation?.id === conv.id
                            ? 'bg-[#222222] border-[#C47A52]'
                            : 'bg-[#141414] border-[#262626] hover:border-[#3a3a3a]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white truncate">{conv.customerName}</span>
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${conv.status === 'resolved' ? 'bg-[#183C2B] text-[#5FAF78]' : 'bg-[#C47A52]/20 text-[#C47A52]'}`}>
                            {conv.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#888888] line-clamp-1">{conv.topic}</p>
                        <span className="text-[10px] text-[#555555] block mt-1">{conv.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversation Details & Takeover Viewer */}
                <div className="lg:col-span-7 bg-[#171717] rounded-3xl p-6 border border-[#262626] flex flex-col justify-between">
                  {selectedConversation ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                        <div>
                          <h4 className="text-sm font-bold text-white">{selectedConversation.customerName}</h4>
                          <p className="text-xs text-[#888888]">{selectedConversation.customerEmail} · {selectedConversation.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              updateConversationStatus(selectedConversation.id, 'transferred');
                              addAuditLog('Support Takeover', `Staff took over conversation ${selectedConversation.id}`);
                              showToast('Support staff has taken over this conversation', 'success');
                            }}
                            className="px-3 py-1.5 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Headphones className="w-3.5 h-3.5" />
                            <span>Take Over Chat</span>
                          </button>
                          <button
                            onClick={() => updateConversationStatus(selectedConversation.id, 'resolved')}
                            className="px-3 py-1.5 bg-[#222222] hover:bg-[#2c2c2c] text-[#5FAF78] text-xs font-bold rounded-xl border border-[#333333] cursor-pointer"
                          >
                            Mark Resolved
                          </button>
                        </div>
                      </div>

                      {/* Products Discussed Badge */}
                      {selectedConversation.productsDiscussed?.length > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-[#888888]">Footwear Discussed:</span>
                          {selectedConversation.productsDiscussed.map((prod: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-[#222222] text-white text-[11px] font-semibold border border-[#333333]">
                              {prod}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Messages Transcript */}
                      <div className="p-4 bg-[#141414] rounded-2xl border border-[#262626] space-y-3 max-h-80 overflow-y-auto">
                        {selectedConversation.messages.map((m: any, i: number) => (
                          <div key={i} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`p-3 rounded-2xl text-xs max-w-[85%] ${m.sender === 'user' ? 'bg-[#C47A52] text-white' : 'bg-[#222222] text-[#E7E4DE]'}`}>
                              <p className="whitespace-pre-line">{m.content}</p>
                              <span className="text-[9px] block text-neutral-400 mt-1">{m.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-24 text-center space-y-2 text-[#777777]">
                      <Bot className="w-10 h-10 mx-auto text-[#555555]" />
                      <p className="text-xs">Select a conversation from the left to inspect transcripts or take over support.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: AUDIT LOG (SECTION 26) */}
          {/* ========================================================= */}
          {activeTab === 'audit-log' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#262626]">
                <h3 className="font-display text-xl font-bold text-white">Administrative Security Audit Log</h3>
                <p className="text-xs text-[#888888]">
                  Immutable recording of administrative activities, logins, permissions, catalog updates, and settings changes.
                </p>
              </div>

              <div className="bg-[#171717] rounded-3xl border border-[#262626] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#141414] text-[#888888] font-bold uppercase tracking-wider border-b border-[#262626]">
                      <tr>
                        <th className="py-3 px-4">Admin</th>
                        <th className="py-3 px-4">Action</th>
                        <th className="py-3 px-4">Details</th>
                        <th className="py-3 px-4">Timestamp</th>
                        <th className="py-3 px-4">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626]">
                      {auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-[#1a1a1a] transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-white block">{log.adminName}</span>
                            <span className="text-[10px] text-[#777777]">{log.adminEmail}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-[#C47A52]">{log.action}</span>
                          </td>
                          <td className="py-3 px-4 text-[#CCCCCC]">{log.details}</td>
                          <td className="py-3 px-4 text-[#888888] tabular-nums whitespace-nowrap">{log.timestamp}</td>
                          <td className="py-3 px-4 font-mono text-[11px] text-[#777777]">{log.ipAddress}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: ADMIN USERS (SECTION 14 & 15) */}
          {/* ========================================================= */}
          {activeTab === 'admin-users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Authorized Admin Staff</h3>
                  <p className="text-xs text-[#888888]">
                    Role-based permission accounts with two-factor authentication safeguards.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminUsers.map(adm => (
                  <div key={adm.id} className="bg-[#171717] rounded-2xl p-5 border border-[#262626] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#C47A52] bg-[#222222] px-2.5 py-0.5 rounded-full">
                        {adm.role.replace('_', ' ')}
                      </span>
                      <span className={`text-[10px] font-bold ${adm.isActive ? 'text-[#5FAF78]' : 'text-red-400'}`}>
                        {adm.isActive ? 'Active' : 'Deactivated'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{adm.fullName}</h4>
                      <p className="text-xs text-[#888888]">{adm.workEmail}</p>
                      <p className="text-xs text-[#888888]">{adm.phone}</p>
                    </div>

                    <div className="pt-2 border-t border-[#262626] text-[10px] text-[#777777] flex items-center justify-between">
                      <span>2FA: {adm.twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                      <span>Last login: {adm.lastLogin}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ========================================================= */}
          {/* TAB: ORDERS FULFILLMENT */}
          {/* ========================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#262626]">
                <h3 className="font-display text-xl font-bold text-white">Customer Orders & Logistics</h3>
                <p className="text-xs text-[#888888]">
                  Fulfillment pipeline, delivery milestones and status updates.
                </p>
              </div>

              {/* Supabase Integration Bar in Orders */}
              <div className="bg-[#1C1C1C] border border-[#2D2D2D] rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#142A1D] border border-[#26593B] text-[#10B981] flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">Supabase Database Integration</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] font-mono font-bold">
                        Connected: {SUPABASE_PROJECT_ID}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#888888]">
                      Orders placed by customers are automatically synced into your Supabase backend table (<span className="text-[#CCCCCC] font-mono">public.orders</span>).
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSyncAllOrders}
                    disabled={isSyncingAll}
                    className="px-3 py-1.5 bg-[#183C2B] hover:bg-[#5FAF78] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{isSyncingAll ? 'Syncing...' : 'Sync All Orders'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('supabase')}
                    className="px-3 py-1.5 bg-[#252525] hover:bg-[#333333] text-[#CCCCCC] hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Database Settings
                  </button>
                </div>
              </div>

              <div className="bg-[#171717] rounded-3xl border border-[#262626] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#141414] text-[#888888] font-bold uppercase tracking-wider border-b border-[#262626]">
                      <tr>
                        <th className="py-3 px-4">Order #</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Items</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Payment</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Supabase Sync</th>
                        <th className="py-3 px-4 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626]">
                      {orders.map(ord => (
                        <tr key={ord.id} className="hover:bg-[#1a1a1a] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-white">{ord.orderNumber}</td>
                          <td className="py-3 px-4 text-[#CCCCCC]">
                            <span className="font-bold text-white block">{ord.shippingAddress.fullName}</span>
                            <span className="text-[10px] text-[#777777]">{ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                          </td>
                          <td className="py-3 px-4 text-[#888888]">{ord.date}</td>
                          <td className="py-3 px-4 text-white font-semibold">{ord.items.length} pairs</td>
                          <td className="py-3 px-4 font-bold text-white tabular-nums">₹{ord.total.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-4 text-[#CCCCCC]">{ord.paymentMethod}</td>
                          <td className="py-3 px-4">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${ord.status === 'Delivered' ? 'bg-[#183C2B] text-[#5FAF78]' : 'bg-[#222222] text-[#C47A52]'}`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {ord.supabaseSynced ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#142A1D] text-[#10B981] text-[10px] font-bold">
                                <Check className="w-3 h-3" /> Synced
                              </span>
                            ) : (
                              <button
                                onClick={() => handleSyncSingleOrder(ord.id)}
                                disabled={syncingOrderId === ord.id}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold hover:bg-amber-500/25 transition-colors cursor-pointer disabled:opacity-50"
                              >
                                <RefreshCw className="w-2.5 h-2.5" />
                                <span>{syncingOrderId === ord.id ? 'Syncing...' : 'Sync Now'}</span>
                              </button>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <select
                              value={ord.status}
                              onChange={(e) => {
                                updateOrderStatus(ord.id, e.target.value as any);
                                addAuditLog('Order Updated', `Updated order ${ord.orderNumber} to ${e.target.value}`);
                                showToast(`Order ${ord.orderNumber} updated to ${e.target.value}`, 'success');
                              }}
                              className="px-2 py-1 bg-[#222222] border border-[#333333] rounded-lg text-xs text-white"
                            >
                              <option value="Order Placed">Order Placed</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: SUPABASE BACKEND MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === 'supabase' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
                <div>
                  <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#10B981]" />
                    <span>Supabase Backend Integration</span>
                  </h3>
                  <p className="text-xs text-[#888888]">
                    Live database connection, tables schema migration, and order form synchronizer.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTestSupabase}
                    disabled={supabaseStatus.loading}
                    className="px-3.5 py-2 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{supabaseStatus.loading ? 'Testing...' : 'Test Supabase Connection'}</span>
                  </button>

                  <button
                    onClick={handleSyncAllOrders}
                    disabled={isSyncingAll}
                    className="px-3.5 py-2 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{isSyncingAll ? 'Syncing...' : 'Sync All Orders'}</span>
                  </button>
                </div>
              </div>

              {/* Connection Status Banner */}
              {supabaseStatus.tested && (
                <div
                  className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
                    supabaseStatus.connected
                      ? 'bg-[#142A1D] border-[#26593B] text-[#A8D5BA]'
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}
                >
                  <Database className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">
                      {supabaseStatus.connected ? 'Connection Successful' : 'Connection Notice'}
                    </strong>
                    <p className="mt-0.5">{supabaseStatus.message}</p>
                  </div>
                </div>
              )}

              {/* Project Credentials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#171717] rounded-2xl border border-[#262626] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#888888] tracking-wider block">Supabase Project ID</span>
                  <div className="font-mono text-sm font-bold text-white flex items-center justify-between">
                    <span>{SUPABASE_PROJECT_ID}</span>
                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                  </div>
                </div>

                <div className="p-4 bg-[#171717] rounded-2xl border border-[#262626] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#888888] tracking-wider block">Supabase Project URL</span>
                  <div className="font-mono text-xs text-[#CCCCCC] truncate" title={SUPABASE_URL}>
                    {SUPABASE_URL}
                  </div>
                </div>

                <div className="p-4 bg-[#171717] rounded-2xl border border-[#262626] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#888888] tracking-wider block">API Publishable Key</span>
                  <div className="font-mono text-xs text-[#CCCCCC] truncate">
                    sb_publishable_hUl4...XqgI1J
                  </div>
                </div>
              </div>

              {/* Database Schema Setup (Copy-Paste SQL) */}
              <div className="bg-[#171717] rounded-3xl border border-[#262626] p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-white text-sm">Supabase Database Table Setup (SQL)</h4>
                    <p className="text-xs text-[#888888]">
                      Execute this script once in your Supabase project's SQL Editor to create the <code className="text-[#A8D5BA] font-mono">public.orders</code> table and security policies.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
                        setCopiedSchema(true);
                        showToast('SQL Schema copied to clipboard!', 'success');
                        setTimeout(() => setCopiedSchema(false), 2000);
                      }}
                      className="px-3 py-1.5 bg-[#252525] hover:bg-[#333333] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedSchema ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSchema ? 'Copied!' : 'Copy SQL Schema'}</span>
                    </button>

                    <a
                      href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Open SQL Editor</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="bg-[#111111] border border-[#222222] rounded-2xl p-4 overflow-x-auto max-h-64 font-mono text-[11px] text-[#A8D5BA]">
                  <pre>{SUPABASE_SETUP_SQL}</pre>
                </div>
              </div>

              {/* Live Remote Supabase Orders Explorer */}
              <div className="bg-[#171717] rounded-3xl border border-[#262626] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">Live Supabase Database Orders</h4>
                    <p className="text-xs text-[#888888]">
                      View records queried directly from the Supabase <span className="font-mono text-[#CCCCCC]">orders</span> table.
                    </p>
                  </div>

                  <button
                    onClick={handleFetchRemoteOrders}
                    disabled={loadingRemoteOrders}
                    className="px-3 py-1.5 bg-[#252525] hover:bg-[#333333] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{loadingRemoteOrders ? 'Fetching...' : 'Fetch Live Records'}</span>
                  </button>
                </div>

                {supabaseRemoteOrders.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#777777] border border-dashed border-[#262626] rounded-2xl">
                    <Database className="w-8 h-8 text-[#444444] mx-auto mb-2" />
                    <p>No remote records loaded yet or table created. Click "Fetch Live Records" to query.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#141414] text-[#888888] font-bold uppercase tracking-wider border-b border-[#262626]">
                        <tr>
                          <th className="py-2.5 px-3">Order #</th>
                          <th className="py-2.5 px-3">Customer Name</th>
                          <th className="py-2.5 px-3">Email</th>
                          <th className="py-2.5 px-3">Phone</th>
                          <th className="py-2.5 px-3">City, State</th>
                          <th className="py-2.5 px-3">Total</th>
                          <th className="py-2.5 px-3">Payment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#262626]">
                        {supabaseRemoteOrders.map((ro: any, idx: number) => (
                          <tr key={ro.id || idx} className="hover:bg-[#1f1f1f]">
                            <td className="py-2.5 px-3 font-mono font-bold text-white">{ro.order_number}</td>
                            <td className="py-2.5 px-3 text-[#CCCCCC]">{ro.customer_name}</td>
                            <td className="py-2.5 px-3 text-[#888888]">{ro.customer_email}</td>
                            <td className="py-2.5 px-3 text-[#888888]">{ro.customer_phone}</td>
                            <td className="py-2.5 px-3 text-[#CCCCCC]">{ro.city}, {ro.state}</td>
                            <td className="py-2.5 px-3 font-bold text-white">₹{ro.total}</td>
                            <td className="py-2.5 px-3 text-[#888888]">{ro.payment_method}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: RETURNS & EXCHANGES MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === 'returns' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Returns & Exchanges Pipeline</h3>
                  <p className="text-xs text-[#888888]">
                    Review customer return and exchange requests, schedule doorstep pickups, and process refunds or replacements.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-3 py-1 bg-[#222222] text-[#E7E4DE] rounded-xl border border-[#333333]">
                    Total: <strong className="text-white">{returnRequests.length}</strong>
                  </span>
                  <span className="px-3 py-1 bg-[#C47A52]/20 text-[#C47A52] rounded-xl border border-[#C47A52]/30">
                    Pending: <strong className="text-white">{returnRequests.filter(r => r.status === 'Requested').length}</strong>
                  </span>
                </div>
              </div>

              {returnRequests.length === 0 ? (
                <div className="bg-[#171717] rounded-3xl p-12 text-center border border-[#262626] space-y-3">
                  <RotateCcw className="w-10 h-10 text-[#555555] mx-auto" />
                  <h4 className="text-white font-bold">No Return or Exchange Requests</h4>
                  <p className="text-xs text-[#888888]">When customers request a shoe return or size exchange, it will appear here.</p>
                </div>
              ) : (
                <div className="bg-[#171717] rounded-3xl border border-[#262626] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#141414] text-[#888888] font-bold uppercase tracking-wider border-b border-[#262626]">
                        <tr>
                          <th className="py-3 px-4">Request ID</th>
                          <th className="py-3 px-4">Order #</th>
                          <th className="py-3 px-4">Shoe</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Reason</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Action / Update</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#262626]">
                        {returnRequests.map((req) => (
                          <tr key={req.id} className="hover:bg-[#1a1a1a] transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-white">{req.id}</td>
                            <td className="py-3 px-4 font-mono text-[#CCCCCC]">{req.orderNumber}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={req.productImage}
                                  alt={req.productName}
                                  className="w-10 h-10 object-cover rounded-lg border border-[#333333] shrink-0"
                                />
                                <div>
                                  <span className="font-bold text-white block">{req.productName}</span>
                                  <span className="text-[10px] text-[#888888]">
                                    Size {req.size} • {req.color}
                                    {req.type === 'Exchange' && req.exchangeSize && (
                                      <strong className="text-[#5FAF78]"> → Size {req.exchangeSize}</strong>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                req.type === 'Exchange' ? 'bg-[#5FAF78]/15 text-[#5FAF78] border border-[#5FAF78]/30' : 'bg-[#C47A52]/15 text-[#C47A52] border border-[#C47A52]/30'
                              }`}>
                                {req.type}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[#CCCCCC]">
                              <span className="font-semibold block">{req.reason}</span>
                              {req.additionalComments && (
                                <span className="text-[10px] text-[#777777] italic line-clamp-1">"{req.additionalComments}"</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-[#888888]">{req.createdAt}</td>
                            <td className="py-3 px-4">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                req.status === 'Inspected & Approved' || req.status === 'Refund Completed' || req.status === 'Exchange Dispatched'
                                  ? 'bg-[#183C2B] text-[#5FAF78]'
                                  : req.status === 'Rejected'
                                  ? 'bg-red-950 text-red-400'
                                  : 'bg-[#222222] text-[#C47A52]'
                              }`}>
                                {req.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <select
                                value={req.status}
                                onChange={(e) => {
                                  updateReturnRequestStatus(req.id, e.target.value as any);
                                  addAuditLog('Return Request Updated', `Updated request ${req.id} to ${e.target.value}`);
                                  showToast(`Request ${req.id} status changed to ${e.target.value}`, 'success');
                                }}
                                className="px-2 py-1 bg-[#222222] border border-[#333333] rounded-lg text-xs text-white"
                              >
                                <option value="Requested">Requested</option>
                                <option value="Pickup Scheduled">Pickup Scheduled</option>
                                <option value="In Transit">In Transit</option>
                                <option value="Inspected & Approved">Inspected & Approved</option>
                                <option value="Refund Completed">Refund Completed</option>
                                <option value="Exchange Dispatched">Exchange Dispatched</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: CUSTOMER ENQUIRIES & SUPPORT TICKETS */}
          {/* ========================================================= */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Customer Support Enquiries & Tickets</h3>
                  <p className="text-xs text-[#888888]">
                    Address pre-sales footwear inquiries, size questions, and order assistance submitted by customers.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-3 py-1 bg-[#222222] text-[#E7E4DE] rounded-xl border border-[#333333]">
                    Total Tickets: <strong className="text-white">{supportTickets.length}</strong>
                  </span>
                  <span className="px-3 py-1 bg-[#5FAF78]/20 text-[#5FAF78] rounded-xl border border-[#5FAF78]/30">
                    Open: <strong className="text-white">{supportTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length}</strong>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Tickets list */}
                <div className="lg:col-span-5 space-y-3">
                  {supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedEnquiryId(ticket.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedEnquiryId === ticket.id
                          ? 'bg-[#222222] border-[#C47A52]'
                          : 'bg-[#171717] border-[#262626] hover:border-[#383838]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-[11px] font-bold text-[#C47A52]">{ticket.ticketNumber}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          ticket.status === 'Resolved' || ticket.status === 'Closed'
                            ? 'bg-[#183C2B] text-[#5FAF78]'
                            : ticket.status === 'In Progress'
                            ? 'bg-amber-950/60 text-amber-300'
                            : 'bg-[#262626] text-white'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{ticket.subject}</h4>
                      <p className="text-[11px] text-[#888888] line-clamp-1 mt-0.5">{ticket.message}</p>
                      <div className="mt-2 pt-2 border-t border-[#262626] flex items-center justify-between text-[10px] text-[#666666]">
                        <span>{ticket.customerName} ({ticket.issueCategory})</span>
                        <span>{ticket.createdDate}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ticket Details & Agent Reply */}
                <div className="lg:col-span-7">
                  {(() => {
                    const currentTicket = supportTickets.find(t => t.id === selectedEnquiryId) || supportTickets[0];
                    if (!currentTicket) {
                      return (
                        <div className="bg-[#171717] rounded-3xl p-12 text-center border border-[#262626] text-xs text-[#888888]">
                          Select a support enquiry to view full conversation and reply.
                        </div>
                      );
                    }

                    return (
                      <div className="bg-[#171717] rounded-3xl border border-[#262626] p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#C47A52]">{currentTicket.ticketNumber} • {currentTicket.issueCategory}</span>
                            <h3 className="font-bold text-base text-white">{currentTicket.subject}</h3>
                            <p className="text-xs text-[#888888]">
                              From: {currentTicket.customerName} ({currentTicket.customerEmail})
                              {currentTicket.orderNumber && ` • Order: ${currentTicket.orderNumber}`}
                            </p>
                          </div>
                          <select
                            value={currentTicket.status}
                            onChange={(e) => {
                              updateTicketStatus(currentTicket.id, e.target.value as any);
                              addAuditLog('Ticket Status Changed', `Ticket ${currentTicket.ticketNumber} set to ${e.target.value}`);
                            }}
                            className="px-2 py-1 bg-[#222222] border border-[#333333] rounded-lg text-xs text-white"
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Waiting for Customer">Waiting for Customer</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>

                        {/* Thread History */}
                        <div className="space-y-3 max-h-72 overflow-y-auto p-2 bg-[#121212] rounded-2xl border border-[#222222]">
                          {currentTicket.responses && currentTicket.responses.map((resp, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-xl text-xs max-w-[85%] ${
                                resp.sender === 'agent'
                                  ? 'ml-auto bg-[#25382B] text-white border border-[#5FAF78]/30'
                                  : 'mr-auto bg-[#1c1c1c] text-[#CCCCCC] border border-[#2b2b2b]'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 text-[10px] text-[#888888] mb-1">
                                <span className="font-bold text-[#E7E4DE]">{resp.sender === 'agent' ? 'EVORA Support Agent' : currentTicket.customerName}</span>
                                <span>{resp.timestamp}</span>
                              </div>
                              <p>{resp.message}</p>
                            </div>
                          ))}
                        </div>

                        {/* Reply Composer */}
                        <div className="space-y-2 pt-2">
                          <label className="text-xs font-bold text-white block">Official Agent Reply:</label>
                          <textarea
                            rows={3}
                            value={enquiryReplyText}
                            onChange={(e) => setEnquiryReplyText(e.target.value)}
                            placeholder="Type a helpful response to the customer..."
                            className="w-full p-3 bg-[#222222] border border-[#333333] rounded-xl text-xs text-white focus:outline-none focus:border-[#C47A52]"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                if (!enquiryReplyText.trim()) return;
                                addTicketResponse(currentTicket.id, enquiryReplyText.trim(), 'agent');
                                addAuditLog('Support Reply Sent', `Replied to ticket ${currentTicket.ticketNumber}`);
                                showToast(`Reply sent to ${currentTicket.customerName}`, 'success');
                                setEnquiryReplyText('');
                              }}
                              className="px-4 py-2 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold rounded-xl cursor-pointer"
                            >
                              Send Official Response
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: INVENTORY & STOCK MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Footwear Inventory & Stock Control</h3>
                  <p className="text-xs text-[#888888]">
                    Monitor stock thresholds, update unit availability, and configure low-inventory alerts.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInventoryFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      inventoryFilter === 'all' ? 'bg-[#C47A52] text-white' : 'bg-[#222222] text-[#888888]'
                    }`}
                  >
                    All Shoes ({products.length})
                  </button>
                  <button
                    onClick={() => setInventoryFilter('low_stock')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      inventoryFilter === 'low_stock' ? 'bg-amber-600 text-white' : 'bg-[#222222] text-[#888888]'
                    }`}
                  >
                    Low Stock (&lt;20) ({products.filter(p => p.stockCount <= 20).length})
                  </button>
                  <button
                    onClick={() => setInventoryFilter('out_of_stock')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      inventoryFilter === 'out_of_stock' ? 'bg-red-600 text-white' : 'bg-[#222222] text-[#888888]'
                    }`}
                  >
                    Out of Stock ({products.filter(p => !p.inStock || p.stockCount === 0).length})
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#171717] p-3 rounded-2xl border border-[#262626]">
                <Search className="w-4 h-4 text-[#777777]" />
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Search footwear inventory by name, category, or ID..."
                  className="bg-transparent text-xs text-white placeholder-[#777777] focus:outline-none flex-1"
                />
              </div>

              <div className="bg-[#171717] rounded-3xl border border-[#262626] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#141414] text-[#888888] font-bold uppercase tracking-wider border-b border-[#262626]">
                      <tr>
                        <th className="py-3 px-4">Shoe</th>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Sizes</th>
                        <th className="py-3 px-4">Stock Units</th>
                        <th className="py-3 px-4">Availability</th>
                        <th className="py-3 px-4 text-right">Quick Stock Adjust</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626]">
                      {products
                        .filter(p => {
                          if (inventoryFilter === 'low_stock') return p.stockCount <= 20;
                          if (inventoryFilter === 'out_of_stock') return !p.inStock || p.stockCount === 0;
                          return true;
                        })
                        .filter(p => {
                          if (!inventorySearch) return true;
                          const q = inventorySearch.toLowerCase();
                          return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
                        })
                        .map((shoe) => (
                          <tr key={shoe.id} className="hover:bg-[#1a1a1a] transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={shoe.image}
                                  alt={shoe.name}
                                  className="w-10 h-10 object-cover rounded-lg border border-[#333333]"
                                />
                                <div>
                                  <span className="font-bold text-white block">{shoe.name}</span>
                                  <span className="text-[10px] text-[#777777]">₹{shoe.discountedPrice.toLocaleString('en-IN')}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono text-[#888888]">{shoe.id}</td>
                            <td className="py-3 px-4 text-[#CCCCCC]">{shoe.category}</td>
                            <td className="py-3 px-4 text-[#888888]">
                              <span className="line-clamp-1">{shoe.sizes.join(', ')}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`font-mono font-bold text-sm ${
                                shoe.stockCount === 0 ? 'text-red-400' : shoe.stockCount <= 20 ? 'text-amber-400' : 'text-[#5FAF78]'
                              }`}>
                                {shoe.stockCount} pairs
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => {
                                  updateProduct(shoe.id, { inStock: !shoe.inStock });
                                  showToast(`Availability toggled for ${shoe.name}`, 'info');
                                }}
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full cursor-pointer ${
                                  shoe.inStock && shoe.stockCount > 0
                                    ? 'bg-[#183C2B] text-[#5FAF78]'
                                    : 'bg-red-950 text-red-400'
                                }`}
                              >
                                {shoe.inStock && shoe.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    const nextStock = Math.max(0, shoe.stockCount - 5);
                                    updateProduct(shoe.id, { stockCount: nextStock, inStock: nextStock > 0 });
                                  }}
                                  className="px-2 py-1 bg-[#222222] hover:bg-[#2c2c2c] text-white rounded font-mono font-bold"
                                  title="Reduce 5 units"
                                >
                                  -5
                                </button>
                                <button
                                  onClick={() => {
                                    const nextStock = shoe.stockCount + 10;
                                    updateProduct(shoe.id, { stockCount: nextStock, inStock: true });
                                  }}
                                  className="px-2 py-1 bg-[#222222] hover:bg-[#2c2c2c] text-[#5FAF78] rounded font-mono font-bold"
                                  title="Add 10 units"
                                >
                                  +10
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: CUSTOMERS DIRECTORY */}
          {/* ========================================================= */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#262626]">
                <h3 className="font-display text-xl font-bold text-white">Registered Customer Profiles</h3>
                <p className="text-xs text-[#888888]">
                  Customer accounts, purchase histories, and delivery destinations.
                </p>
              </div>

              <div className="bg-[#171717] rounded-3xl border border-[#262626] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#141414] text-[#888888] font-bold uppercase tracking-wider border-b border-[#262626]">
                      <tr>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">City / State</th>
                        <th className="py-3 px-4">Orders Placed</th>
                        <th className="py-3 px-4">Total Footwear Spend</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626]">
                      {[
                        { name: 'Vinay Partap', email: 'partapvinay269@gmail.com', phone: '+91 98765 43210', location: 'Indiranagar, Bangalore, Karnataka', orders: 3, spend: 13497, status: 'Active VIP' },
                        { name: 'Rohit Sharma', email: 'rohit.sharma@example.com', phone: '+91 98112 34567', location: 'Bandra West, Mumbai, Maharashtra', orders: 2, spend: 7998, status: 'Active' },
                        { name: 'Priya Iyer', email: 'priya.iyer@example.com', phone: '+91 94440 98765', location: 'T. Nagar, Chennai, Tamil Nadu', orders: 4, spend: 16596, status: 'Active VIP' },
                        { name: 'Ananya Verma', email: 'ananya.v@example.com', phone: '+91 99100 12345', location: 'Hauz Khas, New Delhi, Delhi', orders: 1, spend: 3299, status: 'New' },
                        { name: 'Arjun Das', email: 'arjun.das@example.com', phone: '+91 97000 54321', location: 'Salt Lake, Kolkata, West Bengal', orders: 2, spend: 7498, status: 'Active' }
                      ].map((cust, i) => (
                        <tr key={i} className="hover:bg-[#1a1a1a] transition-colors">
                          <td className="py-3 px-4 font-bold text-white">{cust.name}</td>
                          <td className="py-3 px-4 text-[#CCCCCC]">{cust.email}</td>
                          <td className="py-3 px-4 text-[#888888]">{cust.phone}</td>
                          <td className="py-3 px-4 text-[#888888]">{cust.location}</td>
                          <td className="py-3 px-4 font-semibold text-white">{cust.orders} orders</td>
                          <td className="py-3 px-4 font-bold text-white tabular-nums">₹{cust.spend.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-4">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#183C2B] text-[#5FAF78]">
                              {cust.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: REVIEWS MODERATION */}
          {/* ========================================================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#262626]">
                <h3 className="font-display text-xl font-bold text-white">Shoe Ratings & Customer Reviews</h3>
                <p className="text-xs text-[#888888]">
                  Verified purchaser feedback across all EVORA footwear models.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((rev) => {
                  const reviewedShoe = products.find(p => p.id === rev.productId);
                  return (
                    <div key={rev.id} className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{rev.customerName}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold">{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-[11px] font-bold text-[#5FAF78]">{reviewedShoe?.name || 'EVORA Footwear'}</p>
                      {rev.title && <h4 className="text-xs font-semibold text-white">{rev.title}</h4>}
                      <p className="text-xs text-[#888888] leading-relaxed italic">"{rev.comment}"</p>
                      <div className="pt-2 border-t border-[#262626] flex items-center justify-between text-[10px] text-[#666666]">
                        <span>{rev.date}</span>
                        <span className="text-[#5FAF78]">Verified Purchaser</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: DISCOUNTS & COUPONS */}
          {/* ========================================================= */}
          {activeTab === 'discounts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Coupons & Promotional Codes</h3>
                  <p className="text-xs text-[#888888]">
                    Configure discount rules, threshold minimums, and voucher validity dates.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddCouponModalOpen(true)}
                  className="px-4 py-2 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Promo Code</span>
                </button>
              </div>

              <div className="bg-[#171717] rounded-3xl border border-[#262626] overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#141414] text-[#888888] font-bold uppercase tracking-wider border-b border-[#262626]">
                    <tr>
                      <th className="py-3 px-4">Promo Code</th>
                      <th className="py-3 px-4">Discount</th>
                      <th className="py-3 px-4">Min. Cart Value</th>
                      <th className="py-3 px-4">Max Cap</th>
                      <th className="py-3 px-4">Expiry Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Toggle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]">
                    {coupons.map((c) => (
                      <tr key={c.code} className="hover:bg-[#1a1a1a] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-white text-sm">{c.code}</td>
                        <td className="py-3 px-4 font-bold text-[#5FAF78]">{c.discountPercent}% OFF</td>
                        <td className="py-3 px-4 text-[#CCCCCC]">₹{c.minOrder.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-4 text-[#CCCCCC]">{c.maxDiscount ? `₹${c.maxDiscount.toLocaleString('en-IN')}` : 'No Limit'}</td>
                        <td className="py-3 px-4 text-[#888888]">{c.expiresAt}</td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            c.isActive ? 'bg-[#183C2B] text-[#5FAF78]' : 'bg-[#262626] text-[#777777]'
                          }`}>
                            {c.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              toggleCouponActive(c.code);
                              showToast(`Coupon ${c.code} status updated`, 'info');
                            }}
                            className="px-2.5 py-1 bg-[#222222] hover:bg-[#2c2c2c] text-white rounded-lg text-[11px] font-semibold"
                          >
                            {c.isActive ? 'Disable' : 'Enable'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: ANALYTICS & INSIGHTS */}
          {/* ========================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#262626]">
                <h3 className="font-display text-xl font-bold text-white">Store Analytics & Performance</h3>
                <p className="text-xs text-[#888888]">
                  Sales metrics, category volume distribution, and shoe demand reports.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626]">
                  <span className="text-xs font-semibold uppercase text-[#888888]">Gross Revenue</span>
                  <p className="font-display text-2xl font-bold text-white mt-2 tabular-nums">₹{totalRevenue.toLocaleString('en-IN')}</p>
                  <span className="text-[10px] text-[#5FAF78] font-bold">+18.4% vs last period</span>
                </div>
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626]">
                  <span className="text-xs font-semibold uppercase text-[#888888]">Avg. Order Value</span>
                  <p className="font-display text-2xl font-bold text-white mt-2 tabular-nums">₹4,120</p>
                  <span className="text-[10px] text-[#5FAF78] font-bold">1.8 pairs / basket</span>
                </div>
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626]">
                  <span className="text-xs font-semibold uppercase text-[#888888]">Store Conversion Rate</span>
                  <p className="font-display text-2xl font-bold text-white mt-2 tabular-nums">3.62%</p>
                  <span className="text-[10px] text-[#5FAF78] font-bold">+0.4% from AI Assistant</span>
                </div>
                <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626]">
                  <span className="text-xs font-semibold uppercase text-[#888888]">Return Rate</span>
                  <p className="font-display text-2xl font-bold text-white mt-2 tabular-nums">2.8%</p>
                  <span className="text-[10px] text-[#5FAF78] font-bold">Industry benchmark: 8%</span>
                </div>
              </div>

              {/* Category Volume breakdown */}
              <div className="bg-[#171717] p-6 rounded-3xl border border-[#262626] space-y-4">
                <h4 className="font-bold text-sm text-white">Shoe Category Sales Distribution</h4>
                <div className="space-y-3">
                  {[
                    { category: 'Sneakers (Men & Women)', pct: 42, revenue: '₹62,400' },
                    { category: 'Running Shoes', pct: 28, revenue: '₹41,200' },
                    { category: 'Walking Shoes', pct: 15, revenue: '₹22,100' },
                    { category: 'Training & Sports Shoes', pct: 10, revenue: '₹14,800' },
                    { category: 'Casual & Formal Footwear', pct: 5, revenue: '₹7,400' }
                  ].map((cat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{cat.category}</span>
                        <span className="text-[#888888]">{cat.revenue} ({cat.pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-[#222222] rounded-full overflow-hidden">
                        <div className="h-full bg-[#C47A52] rounded-full" style={{ width: `${cat.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: STORE SETTINGS & WHATSAPP CONFIGURATION */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#262626]">
                <h3 className="font-display text-xl font-bold text-white">EVORA Store Settings & Support Integrations</h3>
                <p className="text-xs text-[#888888]">
                  Configure WhatsApp business support numbers, customer care channels, and announcement banner messages.
                </p>
              </div>

              <div className="bg-[#171717] rounded-3xl p-6 sm:p-8 border border-[#262626] space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-white block mb-1">
                      WhatsApp Business Support Number
                    </label>
                    <input
                      type="text"
                      value={storeSettings.whatsAppNumber}
                      onChange={(e) => setStoreSettings({ ...storeSettings, whatsAppNumber: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-xs text-white focus:outline-none focus:border-[#C47A52]"
                    />
                    <p className="text-[10px] text-[#777777] mt-1">Used for customer direct WhatsApp chats and order inquiries.</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white block mb-1">
                      Official Customer Support Email
                    </label>
                    <input
                      type="email"
                      value={storeSettings.supportEmail}
                      onChange={(e) => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                      placeholder="support@evorashoes.com"
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-xs text-white focus:outline-none focus:border-[#C47A52]"
                    />
                    <p className="text-[10px] text-[#777777] mt-1">Displayed in order receipts, returns hub, and footer links.</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white block mb-1">
                      Free Nationwide Shipping Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={storeSettings.freeShippingThreshold}
                      onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-xs text-white"
                    />
                    <p className="text-[10px] text-[#777777] mt-1">Orders above this subtotal qualify for complimentary express shipping.</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white block mb-1">
                      Express Delivery Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={storeSettings.expressDeliveryFee}
                      onChange={(e) => setStoreSettings({ ...storeSettings, expressDeliveryFee: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-xs text-white"
                    />
                    <p className="text-[10px] text-[#777777] mt-1">Charged when subtotal is below the free shipping threshold.</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-white block mb-1">
                    Storefront Announcement Banner Text
                  </label>
                  <input
                    type="text"
                    value={storeSettings.announcementBanner}
                    onChange={(e) => setStoreSettings({ ...storeSettings, announcementBanner: e.target.value })}
                    className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-xs text-white focus:outline-none focus:border-[#C47A52]"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      addAuditLog('Store Settings Saved', 'Updated store support phone, email and shipping parameters');
                      showToast('EVORA store settings saved successfully', 'success');
                    }}
                    className="px-5 py-2.5 bg-[#C47A52] hover:bg-[#b06740] text-white text-xs font-bold rounded-xl cursor-pointer shadow-md"
                  >
                    Save Storefront Configuration
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: ADD PRODUCT */}
      {/* ------------------------------------------------------------- */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#171717] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#262626] shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <h3 className="font-display text-lg font-bold text-white">Add New Footwear Style</h3>
              <button onClick={() => setIsAddProductModalOpen(false)} className="text-[#888888] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white font-bold block mb-1">Shoe Name *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. EVORA CloudRacer X"
                    className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                  />
                </div>
                <div>
                  <label className="text-white font-bold block mb-1">Subtitle / Descriptor</label>
                  <input
                    type="text"
                    value={newProduct.subtitle}
                    onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                    placeholder="e.g. Ultra-responsive marathon trainer"
                    className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-white font-bold block mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white"
                  >
                    <option value="Sneakers">Sneakers</option>
                    <option value="Running Shoes">Running Shoes</option>
                    <option value="Casual Shoes">Casual Shoes</option>
                    <option value="Formal Shoes">Formal Shoes</option>
                    <option value="Walking Shoes">Walking Shoes</option>
                    <option value="Boots">Boots</option>
                    <option value="Sandals">Sandals</option>
                    <option value="Kids Shoes">Kids Shoes</option>
                    <option value="Sports Shoes">Sports Shoes</option>
                    <option value="Training Shoes">Training Shoes</option>
                    <option value="Slip-ons">Slip-ons</option>
                  </select>
                </div>

                <div>
                  <label className="text-white font-bold block mb-1">Gender</label>
                  <select
                    value={newProduct.gender}
                    onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="text-white font-bold block mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={newProduct.stockCount}
                    onChange={(e) => setNewProduct({ ...newProduct, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white font-bold block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-white font-bold block mb-1">Discounted Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.discountedPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, discountedPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-white font-bold block mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 bg-[#222222] hover:bg-[#2c2c2c] text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C47A52] hover:bg-[#b06740] text-white font-bold rounded-xl shadow-md"
                >
                  Create Shoe Style
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: ADD KNOWLEDGE BASE ITEM */}
      {/* ------------------------------------------------------------- */}
      {isAddKbModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#171717] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#262626] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <h3 className="font-display text-lg font-bold text-white">Add Knowledge Base Item</h3>
              <button onClick={() => setIsAddKbModalOpen(false)} className="text-[#888888] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateKbSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-white font-bold block mb-1">Category</label>
                <select
                  value={newKb.category}
                  onChange={(e) => setNewKb({ ...newKb, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white"
                >
                  <option value="Brand Information">Brand Information</option>
                  <option value="Product Information">Product Information</option>
                  <option value="Size Guide">Size Guide</option>
                  <option value="Shipping Policy">Shipping Policy</option>
                  <option value="Return Policy">Return Policy</option>
                  <option value="Refund Policy">Refund Policy</option>
                  <option value="Payment Information">Payment Information</option>
                  <option value="FAQs">FAQs</option>
                  <option value="Customer Support Guidelines">Customer Support Guidelines</option>
                  <option value="Store Policies">Store Policies</option>
                </select>
              </div>

              <div>
                <label className="text-white font-bold block mb-1">Title / Question *</label>
                <input
                  type="text"
                  required
                  value={newKb.title}
                  onChange={(e) => setNewKb({ ...newKb, title: e.target.value })}
                  placeholder="e.g. Can customers exchange shoe sizes?"
                  className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                />
              </div>

              <div>
                <label className="text-white font-bold block mb-1">Grounded Policy / Content *</label>
                <textarea
                  rows={4}
                  required
                  value={newKb.content}
                  onChange={(e) => setNewKb({ ...newKb, content: e.target.value })}
                  placeholder="Clear policy details the AI assistant should reference..."
                  className="w-full px-3 py-2 bg-[#222222] border border-[#333333] rounded-xl text-white focus:outline-none focus:border-[#C47A52]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddKbModalOpen(false)}
                  className="px-4 py-2 bg-[#222222] hover:bg-[#2c2c2c] text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C47A52] hover:bg-[#b06740] text-white font-bold rounded-xl shadow-md"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
