import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  User, 
  Address, 
  Coupon, 
  Review, 
  ProductColor,
  AdminRole,
  AdminUser,
  AuditLog,
  AiKnowledgeItem,
  AiAssistantSettings,
  AiConversation,
  SupportTicket,
  ReturnRequest
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_REVIEWS, DEMO_USER } from '../data/products';
import { 
  INITIAL_KNOWLEDGE_BASE, 
  INITIAL_AI_SETTINGS, 
  INITIAL_ADMIN_USERS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_AI_CONVERSATIONS,
  INITIAL_SUPPORT_TICKETS
} from '../data/aiKnowledge';
import { saveOrderToSupabase } from '../lib/supabase';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface FilterState {
  category: string;
  gender: string;
  ageGroup: string;
  minPrice: number;
  maxPrice: number;
  sizes: number[];
  color: string;
  collection: string;
  rating: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'best-selling';
}

interface StoreContextType {
  // Navigation & Views
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  viewProductDetails: (p: Product | string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: number, color: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  updateCartItemSize: (cartItemId: string, newSize: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  shippingFee: number;
  finalTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string, size?: number) => void;

  // User & Auth
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => boolean;
  register: (fullName: string, email: string, phone: string, password?: string) => boolean;
  logout: () => void;
  toggleAdminRole: () => void;
  savedAddresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;

  // Orders
  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (
    shippingAddress: Address, 
    paymentMethod: any, 
    deliveryMethod: any,
    customerMeta?: { fullName?: string; email?: string; phone?: string }
  ) => Order;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;
  updateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  retrySyncOrderToSupabase: (orderId: string) => Promise<boolean>;
  syncAllPendingOrdersToSupabase: () => Promise<{ synced: number; failed: number }>;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  toggleCouponActive: (code: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;

  // Modals & UI States
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | string | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isSizeChartOpen: boolean;
  setIsSizeChartOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  trackingQuery: string;
  setTrackingQuery: (q: string) => void;

  // Admin & Role-based Access
  adminSession: AdminUser | null;
  setAdminSession: (admin: AdminUser | null) => void;
  adminUsers: AdminUser[];
  addAdminUser: (user: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => void;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string) => void;

  // AI Knowledge Base & Assistant
  knowledgeBase: AiKnowledgeItem[];
  addKnowledgeItem: (item: Omit<AiKnowledgeItem, 'id' | 'updatedAt'>) => void;
  updateKnowledgeItem: (id: string, updates: Partial<AiKnowledgeItem>) => void;
  deleteKnowledgeItem: (id: string) => void;
  aiSettings: AiAssistantSettings;
  updateAiSettings: (settings: Partial<AiAssistantSettings>) => void;
  aiConversations: AiConversation[];
  updateConversationStatus: (id: string, status: 'active' | 'resolved' | 'transferred') => void;
  recordCsat: (conversationId: string, rating: number, feedback?: string) => void;

  // Support Tickets
  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: {
    customerName: string;
    customerEmail: string;
    orderNumber?: string;
    issueCategory: SupportTicket['issueCategory'];
    subject: string;
    message: string;
  }) => string;
  addTicketResponse: (ticketId: string, message: string, sender: 'customer' | 'agent') => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  takeOverConversation: (conversationId: string, agentName: string) => void;

  // Product Comparison & Recently Viewed
  comparedProducts: string[];
  addToCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isCompared: (productId: string) => boolean;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  recentlyViewed: string[];
  recentlyCompared: string[];

  // Customer Support Hub Modal
  isSupportModalOpen: boolean;
  setIsSupportModalOpen: (open: boolean) => void;
  supportModalInitialTab: 'contact' | 'faq' | 'returns' | 'shipping' | 'whatsapp';
  openSupportModal: (tab?: 'contact' | 'faq' | 'returns' | 'shipping' | 'whatsapp') => void;

  // Returns & Exchanges
  returnRequests: ReturnRequest[];
  submitReturnRequest: (req: {
    orderNumber: string;
    productId: string;
    productName: string;
    productImage: string;
    size: number;
    color: string;
    type: 'Return' | 'Exchange';
    exchangeSize?: number;
    exchangeColor?: string;
    reason: ReturnRequest['reason'];
    additionalComments?: string;
    pickupAddress: Address;
  }) => ReturnRequest;
  updateReturnRequestStatus: (id: string, status: ReturnRequest['status']) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-01',
    fullName: 'Vinay Partap',
    phone: '+91 98765 43210',
    email: 'partapvinay269@gmail.com',
    houseStreet: 'Flat 402, Highline Horizon Apartments',
    area: 'Indiranagar 100ft Road',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    pinCode: '560038',
    isDefault: true
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-84291',
    orderNumber: 'EVO-84291',
    date: '2026-09-24',
    items: [
      {
        cartItemId: 'item-1',
        productId: 'evo-01',
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        selectedSize: 9,
        quantity: 1
      }
    ],
    subtotal: 3849,
    discount: 385,
    shippingFee: 0,
    total: 3464,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    shippingAddress: INITIAL_ADDRESSES[0],
    deliveryMethod: 'Standard',
    status: 'Shipped',
    estimatedDelivery: '2026-10-02',
    trackingEvents: [
      {
        status: 'Order Placed',
        date: '24 Sep 2026',
        time: '10:14 AM',
        description: 'Order placed successfully and payment confirmed via UPI',
        completed: true,
        current: false
      },
      {
        status: 'Confirmed',
        date: '24 Sep 2026',
        time: '11:30 AM',
        description: 'Order verified by EVORA Fulfillment Hub Bengaluru',
        completed: true,
        current: false
      },
      {
        status: 'Packed',
        date: '25 Sep 2026',
        time: '02:45 PM',
        description: 'Items inspected for quality and packed with eco-cushioning',
        completed: true,
        current: false
      },
      {
        status: 'Shipped',
        date: '26 Sep 2026',
        time: '09:00 AM',
        description: 'Dispatched with BlueDart Express Courier (AWB #BD7289192)',
        completed: true,
        current: true
      },
      {
        status: 'Out for Delivery',
        date: '02 Oct 2026',
        time: 'Pending',
        description: 'Agent will contact customer before final delivery',
        completed: false,
        current: false
      },
      {
        status: 'Delivered',
        date: '02 Oct 2026',
        time: 'Pending',
        description: 'Package delivered to recipient',
        completed: false,
        current: false
      }
    ],
    couponCode: 'WELCOME10'
  }
];

const INITIAL_RETURN_REQUESTS: ReturnRequest[] = [
  {
    id: 'ret-101',
    rmaNumber: 'RMA-84912',
    orderNumber: 'EVO-84291',
    productId: 'evo-01',
    productName: 'EVORA Urban Runner',
    productImage: INITIAL_PRODUCTS[0].image,
    size: 9,
    color: 'Pure White & Slate',
    type: 'Exchange',
    exchangeSize: 10,
    exchangeColor: 'Pure White & Slate',
    reason: 'Wrong Size',
    additionalComments: 'Slightly snug around the toe box. Requesting size UK 10 replacement.',
    pickupAddress: INITIAL_ADDRESSES[0],
    status: 'Pickup Scheduled',
    pickupDate: '28 Sep 2026',
    createdAt: '2026-09-25'
  }
];

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  gender: 'All',
  ageGroup: 'All',
  minPrice: 0,
  maxPrice: 10000,
  sizes: [],
  color: 'All',
  collection: 'All',
  rating: 0,
  inStockOnly: false,
  sortBy: 'featured'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Views
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [trackingQuery, setTrackingQuery] = useState<string>('EVO-84291');

  // Products - versioned cache to keep catalog updated with canonical fixes while preserving admin custom products
  const [products, setProducts] = useState<Product[]>(() => {
    const CACHE_KEY = 'evora_products_v10';
    try {
      // Purge old versions that may hold outdated dumbbell references
      ['evora_products_v6', 'evora_products_v5', 'evora_products_v4', 'evora_products_v3', 'evora_products'].forEach(k => {
        localStorage.removeItem(k);
      });
    } catch {
      // ignore
    }

    const saved = localStorage.getItem(CACHE_KEY);
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Merge to ensure canonical products always have the latest verified images & details
          const merged = INITIAL_PRODUCTS.map(ip => {
            const existing = parsed.find(p => p.id === ip.id);
            return existing
              ? {
                  ...ip,
                  stockCount: existing.stockCount ?? ip.stockCount,
                  inStock: existing.inStock ?? ip.inStock,
                }
              : ip;
          });
          const customProducts = parsed.filter(p => !INITIAL_PRODUCTS.some(ip => ip.id === p.id));
          return [...merged, ...customProducts];
        }
      } catch {
        // fallback
      }
    }

    return INITIAL_PRODUCTS;
  });

  // Filters
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('evora_cart');
    if (!saved) return [];
    try {
      const items: CartItem[] = JSON.parse(saved);
      // Synchronize product reference to guarantee fresh images and prices
      return items.map(item => {
        const freshProduct = INITIAL_PRODUCTS.find(p => p.id === item.productId);
        return freshProduct ? { ...item, product: freshProduct } : item;
      });
    } catch {
      return [];
    }
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('evora_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('evora_wishlist');
    return saved ? JSON.parse(saved) : ['evo-01', 'evo-03'];
  });

  // User & Auth
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('evora_user');
    if (saved) return JSON.parse(saved);
    return {
      ...DEMO_USER,
      addresses: INITIAL_ADDRESSES,
      createdAt: '2026-01-15'
    };
  });

  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('evora_addresses');
    return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('evora_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('evora_coupons_list');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('evora_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Modals & UI states
  const [quickViewProduct, setQuickViewProductState] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Admin & Role Session
  const [adminSession, setAdminSession] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('evora_admin_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.workEmail === 'admin@evorashoes.com' || parsed.id === 'adm-01') {
          parsed.workEmail = 'partapvinay269@gmail.com';
          parsed.fullName = 'Vinay Partap';
        }
        return parsed;
      } catch {
        return INITIAL_ADMIN_USERS[0];
      }
    }
    return INITIAL_ADMIN_USERS[0];
  });

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('evora_admin_users');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('evora_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // AI Knowledge Base, Settings & Conversations
  const [knowledgeBase, setKnowledgeBase] = useState<AiKnowledgeItem[]>(() => {
    const saved = localStorage.getItem('evora_knowledge_base');
    return saved ? JSON.parse(saved) : INITIAL_KNOWLEDGE_BASE;
  });

  const [aiSettings, setAiSettings] = useState<AiAssistantSettings>(() => {
    const saved = localStorage.getItem('evora_ai_settings');
    return saved ? JSON.parse(saved) : INITIAL_AI_SETTINGS;
  });

  const [aiConversations, setAiConversations] = useState<AiConversation[]>(() => {
    const saved = localStorage.getItem('evora_ai_conversations');
    return saved ? JSON.parse(saved) : INITIAL_AI_CONVERSATIONS;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('evora_support_tickets');
    return saved ? JSON.parse(saved) : INITIAL_SUPPORT_TICKETS;
  });

  // Product Comparison & Recently Viewed states
  const [comparedProducts, setComparedProducts] = useState<string[]>(() => {
    const saved = localStorage.getItem('evora_compared_products');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentlyCompared, setRecentlyCompared] = useState<string[]>(() => {
    const saved = localStorage.getItem('evora_recently_compared');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('evora_recently_viewed');
    return saved ? JSON.parse(saved) : ['evo-01', 'evo-02', 'evo-04', 'evo-16'];
  });
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Customer Support Hub modal state
  const [isSupportModalOpen, setIsSupportModalOpen] = useState<boolean>(false);
  const [supportModalInitialTab, setSupportModalInitialTab] = useState<'contact' | 'faq' | 'returns' | 'shipping' | 'whatsapp'>('contact');

  // Return & Exchange Requests state
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>(() => {
    const saved = localStorage.getItem('evora_return_requests');
    return saved ? JSON.parse(saved) : INITIAL_RETURN_REQUESTS;
  });


  useEffect(() => {
    localStorage.setItem('evora_admin_session', JSON.stringify(adminSession));
  }, [adminSession]);

  useEffect(() => {
    localStorage.setItem('evora_admin_users', JSON.stringify(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    localStorage.setItem('evora_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('evora_knowledge_base', JSON.stringify(knowledgeBase));
  }, [knowledgeBase]);

  useEffect(() => {
    localStorage.setItem('evora_ai_settings', JSON.stringify(aiSettings));
  }, [aiSettings]);

  useEffect(() => {
    localStorage.setItem('evora_ai_conversations', JSON.stringify(aiConversations));
  }, [aiConversations]);

  useEffect(() => {
    localStorage.setItem('evora_support_tickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      adminName: adminSession?.fullName || 'System',
      adminEmail: adminSession?.workEmail || 'system@evorashoes.com',
      role: adminSession?.role || 'super_admin',
      action,
      details,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      ipAddress: '103.24.112.5'
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 199)]);
  };

  const addAdminUser = (user: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const newUser: AdminUser = {
      ...user,
      id: `adm-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAdminUsers(prev => [newUser, ...prev]);
    addAuditLog('Admin User Created', `Created user account for ${newUser.fullName} (${newUser.role})`);
    setToasts(prev => [...prev, { id: String(Date.now()), message: `Admin ${newUser.fullName} authorized`, type: 'success' }]);
  };

  const updateAdminUser = (id: string, updates: Partial<AdminUser>) => {
    setAdminUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    addAuditLog('Admin Permissions Changed', `Updated profile/roles for admin ID ${id}`);
    setToasts(prev => [...prev, { id: String(Date.now()), message: 'Admin permissions updated', type: 'success' }]);
  };

  const addKnowledgeItem = (item: Omit<AiKnowledgeItem, 'id' | 'updatedAt'>) => {
    const newItem: AiKnowledgeItem = {
      ...item,
      id: `kb-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setKnowledgeBase(prev => [newItem, ...prev]);
    addAuditLog('AI Settings Changed', `Added knowledge base entry: ${newItem.title}`);
    setToasts(prev => [...prev, { id: String(Date.now()), message: 'Knowledge base entry created', type: 'success' }]);
  };

  const updateKnowledgeItem = (id: string, updates: Partial<AiKnowledgeItem>) => {
    setKnowledgeBase(prev => prev.map(k => k.id === id ? { ...k, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : k));
    addAuditLog('AI Settings Changed', `Updated knowledge base entry ID ${id}`);
    setToasts(prev => [...prev, { id: String(Date.now()), message: 'Knowledge item updated', type: 'success' }]);
  };

  const deleteKnowledgeItem = (id: string) => {
    setKnowledgeBase(prev => prev.filter(k => k.id !== id));
    addAuditLog('AI Settings Changed', `Deleted knowledge base entry ID ${id}`);
    setToasts(prev => [...prev, { id: String(Date.now()), message: 'Knowledge item removed', type: 'info' }]);
  };

  const updateAiSettings = (settings: Partial<AiAssistantSettings>) => {
    setAiSettings(prev => ({ ...prev, ...settings }));
    addAuditLog('AI Settings Changed', 'Updated AI Assistant parameters');
    setToasts(prev => [...prev, { id: String(Date.now()), message: 'AI configuration updated', type: 'success' }]);
  };

  const updateConversationStatus = (id: string, status: 'active' | 'resolved' | 'transferred') => {
    setAiConversations(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    setToasts(prev => [...prev, { id: String(Date.now()), message: `Conversation status: ${status}`, type: 'success' }]);
  };

  const createSupportTicket = (ticket: {
    customerName: string;
    customerEmail: string;
    orderNumber?: string;
    issueCategory: SupportTicket['issueCategory'];
    subject: string;
    message: string;
  }): string => {
    const newId = `EV-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket: SupportTicket = {
      id: newId,
      ticketNumber: newId,
      customerName: ticket.customerName,
      customerEmail: ticket.customerEmail,
      orderNumber: ticket.orderNumber,
      issueCategory: ticket.issueCategory,
      subject: ticket.subject,
      message: ticket.message,
      status: 'Open',
      priority: ticket.issueCategory === 'Payment' || ticket.issueCategory === 'Delivery' ? 'High' : 'Normal',
      createdDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      lastUpdate: 'Just now',
      responses: [
        {
          sender: 'customer',
          message: ticket.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    addAuditLog('Support Ticket Created', `Created ticket ${newId} for ${ticket.customerEmail}`);
    showToast(`Support ticket ${newId} created successfully`, 'success');
    return newId;
  };

  const addTicketResponse = (ticketId: string, message: string, sender: 'customer' | 'agent') => {
    setSupportTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId || t.ticketNumber === ticketId) {
          return {
            ...t,
            lastUpdate: 'Just now',
            status: sender === 'customer' ? 'In Progress' : 'Waiting for Customer',
            responses: [
              ...t.responses,
              {
                sender,
                message,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          };
        }
        return t;
      })
    );
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setSupportTickets(prev =>
      prev.map(t => (t.id === ticketId || t.ticketNumber === ticketId ? { ...t, status, lastUpdate: 'Just now' } : t))
    );
    showToast(`Ticket ${ticketId} status updated to ${status}`, 'info');
  };

  const recordCsat = (conversationId: string, rating: number, feedback?: string) => {
    setAiConversations(prev =>
      prev.map(c => (c.id === conversationId ? { ...c, csatRating: rating, csatFeedback: feedback } : c))
    );
    showToast('Thank you for rating your support experience!', 'success');
  };

  const takeOverConversation = (conversationId: string, agentName: string) => {
    setAiConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? {
              ...c,
              status: 'transferred',
              assignedAgent: agentName,
              messages: [
                ...c.messages,
                {
                  id: `sys-${Date.now()}`,
                  sender: 'system',
                  content: `${agentName} from EVORA customer support has joined the chat.`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              ]
            }
          : c
      )
    );
    addAuditLog('Live Agent Takeover', `${agentName} took over conversation ${conversationId}`);
    showToast(`You have taken over conversation #${conversationId}`, 'info');
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('evora_products_v10', JSON.stringify(products));
  }, [products]);

  // Keep selectedProduct and quickViewProduct in sync with freshest product record
  useEffect(() => {
    if (selectedProduct) {
      const refreshed = products.find(p => p.id === selectedProduct.id);
      if (refreshed && (refreshed.name !== selectedProduct.name || refreshed.discountedPrice !== selectedProduct.discountedPrice || refreshed.image !== selectedProduct.image)) {
        setSelectedProduct(refreshed);
      }
    }
    if (quickViewProduct) {
      const refreshed = products.find(p => p.id === quickViewProduct.id);
      if (refreshed && (refreshed.name !== quickViewProduct.name || refreshed.discountedPrice !== quickViewProduct.discountedPrice || refreshed.image !== quickViewProduct.image)) {
        setQuickViewProductState(refreshed);
      }
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem('evora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('evora_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('evora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('evora_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('evora_addresses', JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  useEffect(() => {
    localStorage.setItem('evora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('evora_coupons_list', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('evora_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const viewProductDetails = (product: Product | string) => {
    const id = typeof product === 'string' ? product : product?.id;
    const matched = products.find((p) => p.id === id) || (typeof product === 'object' ? product : null);
    if (matched) {
      setSelectedProduct(matched);
      setCurrentView('product-detail');
      window.scrollTo({ top: 0, behavior: 'auto' });

      // Track in recently viewed
      setRecentlyViewed((prev) => {
        const next = [matched.id, ...prev.filter((x) => x !== matched.id)].slice(0, 12);
        localStorage.setItem('evora_recently_viewed', JSON.stringify(next));
        return next;
      });
    }
  };

  // Product Comparison handlers
  const addToCompare = (productId: string) => {
    if (comparedProducts.includes(productId)) {
      showToast('Shoe is already in your comparison', 'info');
      return;
    }
    if (comparedProducts.length >= 4) {
      showToast('You can compare a maximum of 4 shoes at once', 'error');
      return;
    }
    const next = [...comparedProducts, productId];
    setComparedProducts(next);
    localStorage.setItem('evora_compared_products', JSON.stringify(next));

    setRecentlyCompared((prev) => {
      const updated = [productId, ...prev.filter((id) => id !== productId)].slice(0, 10);
      localStorage.setItem('evora_recently_compared', JSON.stringify(updated));
      return updated;
    });

    const shoe = products.find((p) => p.id === productId);
    showToast(`Added ${shoe ? shoe.name : 'shoe'} to comparison (${next.length}/4)`, 'success');
  };

  const removeFromCompare = (productId: string) => {
    const next = comparedProducts.filter((id) => id !== productId);
    setComparedProducts(next);
    localStorage.setItem('evora_compared_products', JSON.stringify(next));
  };

  const clearCompare = () => {
    setComparedProducts([]);
    localStorage.removeItem('evora_compared_products');
    showToast('Comparison list cleared', 'info');
  };

  const isCompared = (productId: string) => comparedProducts.includes(productId);

  // Customer Support Hub modal opener
  const openSupportModal = (tab: 'contact' | 'faq' | 'returns' | 'shipping' | 'whatsapp' = 'contact') => {
    setSupportModalInitialTab(tab);
    setIsSupportModalOpen(true);
  };

  // Returns & Exchanges operations
  const submitReturnRequest = (reqData: {
    orderNumber: string;
    productId: string;
    productName: string;
    productImage: string;
    size: number;
    color: string;
    type: 'Return' | 'Exchange';
    exchangeSize?: number;
    exchangeColor?: string;
    reason: ReturnRequest['reason'];
    additionalComments?: string;
    pickupAddress: Address;
  }): ReturnRequest => {
    const rmaNumber = `RMA-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRequest: ReturnRequest = {
      ...reqData,
      id: `ret-${Date.now()}`,
      rmaNumber,
      status: 'Pickup Scheduled',
      pickupDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReturnRequests((prev) => {
      const next = [newRequest, ...prev];
      localStorage.setItem('evora_return_requests', JSON.stringify(next));
      return next;
    });
    showToast(`${newRequest.type} request #${rmaNumber} generated! Doorstep pickup scheduled for ${newRequest.pickupDate}.`, 'success');
    return newRequest;
  };

  const updateReturnRequestStatus = (id: string, status: ReturnRequest['status']) => {
    setReturnRequests((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, status } : r));
      localStorage.setItem('evora_return_requests', JSON.stringify(next));
      return next;
    });
    showToast(`Return status updated to: ${status}`, 'info');
  };


  const setQuickViewProduct = (product: Product | string | null) => {
    if (!product) {
      setQuickViewProductState(null);
      return;
    }
    const id = typeof product === 'string' ? product : product.id;
    const matched = products.find((p) => p.id === id) || (typeof product === 'object' ? product : null);
    setQuickViewProductState(matched);
  };

  // Cart operations - guarantees saving canonical product ID, name, image, size, color, price
  const addToCart = (product: Product, size: number, color: ProductColor, quantity: number = 1) => {
    const canonical = products.find((p) => p.id === product.id) || product;
    const cartItemId = `${canonical.id}-${size}-${color.name}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity, product: canonical }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: canonical.id,
          product: canonical,
          selectedColor: color,
          selectedSize: size,
          quantity
        }
      ];
    });
    showToast(`Added "${canonical.name}" (Size ${size}) to your bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const updateCartItemSize = (cartItemId: string, newSize: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              selectedSize: newSize,
              cartItemId: `${item.productId}-${newSize}-${item.selectedColor.name}`
            }
          : item
      )
    );
    showToast(`Size updated to ${newSize}`, 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.discountedPrice * item.quantity, 0);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === clean && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Coupon requires minimum order of ₹${found.minOrder}`
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied! You saved ${found.discountPercent}%`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  let discountAmount = 0;
  if (appliedCoupon) {
    const rawDiscount = (subtotal * appliedCoupon.discountPercent) / 100;
    discountAmount = appliedCoupon.maxDiscount
      ? Math.min(rawDiscount, appliedCoupon.maxDiscount)
      : rawDiscount;
  }

  // Free delivery above 999
  const shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (productId: string, size?: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const chosenSize = size || product.sizes[0];
    addToCart(product, chosenSize, product.colors[0], 1);
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // Auth
  const login = (email: string): boolean => {
    const user: User = {
      id: 'usr-' + Math.random().toString(36).substring(2, 7),
      fullName: email.split('@')[0].toUpperCase(),
      email,
      phone: '+91 98765 43210',
      role: email.includes('admin') ? 'admin' : 'customer',
      addresses: savedAddresses,
      createdAt: '2026-09-30'
    };
    setCurrentUser(user);
    showToast(`Welcome back, ${user.fullName}!`, 'success');
    setIsAuthModalOpen(false);
    return true;
  };

  const register = (fullName: string, email: string, phone: string): boolean => {
    const user: User = {
      id: 'usr-' + Math.random().toString(36).substring(2, 7),
      fullName,
      email,
      phone,
      role: 'customer',
      addresses: savedAddresses,
      createdAt: '2026-09-30'
    };
    setCurrentUser(user);
    showToast(`Account created! Welcome to EVORA, ${fullName}`, 'success');
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
    if (currentView === 'admin' || currentView === 'account') {
      setCurrentView('home');
    }
  };

  const toggleAdminRole = () => {
    if (!currentUser) {
      setCurrentUser({
        id: 'adm-01',
        fullName: 'EVORA Store Admin',
        email: 'admin@evorashoes.com',
        phone: '+91 98765 00000',
        role: 'admin',
        addresses: savedAddresses,
        createdAt: '2026-01-01'
      });
      showToast('Switched to Admin Role', 'info');
      return;
    }
    const newRole = currentUser.role === 'admin' ? 'customer' : 'admin';
    setCurrentUser({ ...currentUser, role: newRole });
    showToast(`Role switched to ${newRole.toUpperCase()}`, 'info');
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: 'addr-' + Math.random().toString(36).substring(2, 8)
    };
    setSavedAddresses((prev) => [newAddr, ...prev]);
    showToast('Delivery address saved', 'success');
  };

  const removeAddress = (id: string) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address removed', 'info');
  };

  // Orders
  const placeOrder = (
    shippingAddress: Address,
    paymentMethod: Order['paymentMethod'],
    deliveryMethod: Order['deliveryMethod'],
    customerMeta?: { fullName?: string; email?: string; phone?: string }
  ): Order => {
    const orderNumber = `EVO-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: 'ord-' + Math.random().toString(36).substring(2, 9),
      orderNumber,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shippingFee: deliveryMethod === 'Express' ? 149 : shippingFee,
      total: finalTotal + (deliveryMethod === 'Express' ? 149 : 0),
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      shippingAddress,
      deliveryMethod,
      status: 'Confirmed',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      trackingEvents: [
        {
          status: 'Order Placed',
          date: 'Just now',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: `Order ${orderNumber} received and registered in EVORA core system`,
          completed: true,
          current: false
        },
        {
          status: 'Confirmed',
          date: 'Just now',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Payment authorized and warehouse allocation confirmed',
          completed: true,
          current: true
        },
        {
          status: 'Packed',
          date: 'Expected in 24 hrs',
          time: 'Pending',
          description: 'Footwear paired with individual dust bags & boxed',
          completed: false,
          current: false
        },
        {
          status: 'Shipped',
          date: 'Expected in 48 hrs',
          time: 'Pending',
          description: 'Handed over to priority logistics carrier',
          completed: false,
          current: false
        },
        {
          status: 'Out for Delivery',
          date: 'Pending',
          time: 'Pending',
          description: 'Out for doorstep delivery with driver contact',
          completed: false,
          current: false
        },
        {
          status: 'Delivered',
          date: 'Pending',
          time: 'Pending',
          description: 'Signed and delivered safely',
          completed: false,
          current: false
        }
      ],
      couponCode: appliedCoupon?.code,
      supabaseSynced: false
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setTrackingQuery(newOrder.orderNumber);
    clearCart();
    setCurrentView('order-confirmation');
    showToast(`Order ${orderNumber} placed successfully!`, 'success');

    // Asynchronously save order details to Supabase backend table
    saveOrderToSupabase(newOrder, customerMeta || {
      fullName: shippingAddress.fullName,
      email: shippingAddress.email,
      phone: shippingAddress.phone
    }).then((res) => {
      if (res.success) {
        const syncedAt = new Date().toISOString();
        setOrders((prev) =>
          prev.map((o) => (o.id === newOrder.id ? { ...o, supabaseSynced: true, supabaseSyncedAt: syncedAt, supabaseError: undefined } : o))
        );
        setLastPlacedOrder((prev) =>
          prev && prev.id === newOrder.id ? { ...prev, supabaseSynced: true, supabaseSyncedAt: syncedAt, supabaseError: undefined } : prev
        );
        showToast(`Order saved to Supabase backend tables!`, 'success');
      } else {
        console.warn('[Supabase Sync Notice]:', res.error);
        setOrders((prev) =>
          prev.map((o) => (o.id === newOrder.id ? { ...o, supabaseSynced: false, supabaseError: res.error } : o))
        );
        setLastPlacedOrder((prev) =>
          prev && prev.id === newOrder.id ? { ...prev, supabaseSynced: false, supabaseError: res.error } : prev
        );
      }
    });

    return newOrder;
  };

  const retrySyncOrderToSupabase = async (orderId: string): Promise<boolean> => {
    const targetOrder = orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!targetOrder) return false;

    const res = await saveOrderToSupabase(targetOrder, {
      fullName: targetOrder.shippingAddress.fullName,
      email: targetOrder.shippingAddress.email,
      phone: targetOrder.shippingAddress.phone
    });

    if (res.success) {
      const syncedAt = new Date().toISOString();
      setOrders(prev => prev.map(o => o.id === targetOrder.id ? { ...o, supabaseSynced: true, supabaseSyncedAt: syncedAt, supabaseError: undefined } : o));
      showToast(`Order ${targetOrder.orderNumber} synced to Supabase!`, 'success');
      return true;
    } else {
      setOrders(prev => prev.map(o => o.id === targetOrder.id ? { ...o, supabaseSynced: false, supabaseError: res.error } : o));
      showToast(`Sync notice: ${res.error}`, 'error');
      return false;
    }
  };

  const syncAllPendingOrdersToSupabase = async (): Promise<{ synced: number; failed: number }> => {
    let synced = 0;
    let failed = 0;
    for (const ord of orders) {
      if (!ord.supabaseSynced) {
        const res = await saveOrderToSupabase(ord, {
          fullName: ord.shippingAddress.fullName,
          email: ord.shippingAddress.email,
          phone: ord.shippingAddress.phone
        });
        if (res.success) synced++;
        else failed++;
      }
    }
    if (synced > 0) {
      const nowIso = new Date().toISOString();
      setOrders(prev => prev.map(o => ({ ...o, supabaseSynced: true, supabaseSyncedAt: nowIso })));
      showToast(`Successfully synced ${synced} order(s) to Supabase!`, 'success');
    }
    return { synced, failed };
  };

  const getOrderById = (orderIdOrNumber: string): Order | undefined => {
    const q = orderIdOrNumber.trim().toUpperCase();
    return orders.find(
      (o) => o.id.toUpperCase() === q || o.orderNumber.toUpperCase() === q
    );
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        
        // Update tracking status list
        const statusOrder: Order['status'][] = [
          'Order Placed',
          'Confirmed',
          'Packed',
          'Shipped',
          'Out for Delivery',
          'Delivered'
        ];
        const targetIdx = statusOrder.indexOf(newStatus);
        
        const updatedEvents = ord.trackingEvents.map((evt) => {
          const idx = statusOrder.indexOf(evt.status as any);
          return {
            ...evt,
            completed: idx <= targetIdx,
            current: idx === targetIdx
          };
        });

        return {
          ...ord,
          status: newStatus,
          trackingEvents: updatedEvents
        };
      })
    );
    showToast(`Order status updated to: ${newStatus}`, 'info');
  };

  // Product management for Admin
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'evo-' + Math.random().toString(36).substring(2, 7)
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added to catalog`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  // Coupons
  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    showToast(`Coupon "${coupon.code}" created!`, 'success');
  };

  const toggleCouponActive = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...reviewData,
      id: 'rev-' + Math.random().toString(36).substring(2, 8),
      date: 'Today',
      helpfulCount: 0
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you for your review! It is published.', 'success');
  };

  // Filters calculation
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const filteredProducts = products.filter((p) => {
    if (filters.category !== 'All') {
      const targetCat = filters.category.toLowerCase().replace(/shoes|footwear/gi, '').trim();
      const prodCat = p.category.toLowerCase().replace(/shoes|footwear/gi, '').trim();
      if (p.category !== filters.category && targetCat !== prodCat) {
        return false;
      }
    }
    if (filters.gender !== 'All') {
      const targetGender = filters.gender.toLowerCase();
      const prodGender = p.gender.toLowerCase();
      if (prodGender !== targetGender && prodGender !== 'unisex') {
        return false;
      }
    }
    if (filters.ageGroup !== 'All') {
      const targetAge = filters.ageGroup.toLowerCase();
      const prodAge = p.ageGroup.toLowerCase();
      if (prodAge !== targetAge) {
        return false;
      }
    }
    if (filters.collection !== 'All' && p.collection !== filters.collection) return false;
    if (p.discountedPrice < filters.minPrice || p.discountedPrice > filters.maxPrice) return false;
    if (filters.rating > 0 && p.rating < filters.rating) return false;
    if (filters.inStockOnly && !p.inStock) return false;
    if (filters.sizes.length > 0 && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
    if (filters.color !== 'All' && !p.colors.some((c) => c.name.toLowerCase().includes(filters.color.toLowerCase()))) return false;

    // Search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchGender = p.gender.toLowerCase().includes(q);
      const matchAge = p.ageGroup.toLowerCase().includes(q);
      const matchColor = p.colors.some((c) => c.name.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchDesc && !matchGender && !matchAge && !matchColor) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      case 'price-asc':
        return a.discountedPrice - b.discountedPrice;
      case 'price-desc':
        return b.discountedPrice - a.discountedPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'best-selling':
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      case 'featured':
      default:
        return (b.isBestSeller ? 2 : 0) - (a.isBestSeller ? 2 : 0);
    }
  });

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        viewProductDetails,
        searchQuery,
        setSearchQuery,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        filters,
        setFilters,
        resetFilters,
        filteredProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartItemSize,
        clearCart,
        cartCount,
        subtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        shippingFee,
        finalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        currentUser,
        isLoggedIn: !!currentUser,
        login,
        register,
        logout,
        toggleAdminRole,
        savedAddresses,
        addAddress,
        removeAddress,
        orders,
        lastPlacedOrder,
        placeOrder,
        getOrderById,
        updateOrderStatus,
        retrySyncOrderToSupabase,
        syncAllPendingOrdersToSupabase,
        coupons,
        addCoupon,
        toggleCouponActive,
        reviews,
        addReview,
        quickViewProduct,
        setQuickViewProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSizeChartOpen,
        setIsSizeChartOpen,
        authModalTab,
        setAuthModalTab,
        toasts,
        showToast,
        trackingQuery,
        setTrackingQuery,
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
        supportTickets,
        createSupportTicket,
        addTicketResponse,
        updateTicketStatus,
        recordCsat,
        takeOverConversation,

        // Product Comparison & Recently Viewed
        comparedProducts,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompared,
        isCompareModalOpen,
        setIsCompareModalOpen,
        recentlyViewed,
        recentlyCompared,

        // Support Hub Modal
        isSupportModalOpen,
        setIsSupportModalOpen,
        supportModalInitialTab,
        openSupportModal,

        // Returns & Exchanges
        returnRequests,
        submitReturnRequest,
        updateReturnRequestStatus
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
