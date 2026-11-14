export interface ProductColor {
  name: string;
  hex: string;
  bgClass?: string;
}

export interface ProductMaterial {
  upper: string;
  lining: string;
  insole: string;
  outsole: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  category: 
    | 'Sneakers' 
    | 'Running Shoes' 
    | 'Casual Shoes' 
    | 'Formal Shoes' 
    | 'Walking Shoes' 
    | 'Boots' 
    | 'Sandals' 
    | 'Kids Shoes' 
    | 'Sports Shoes' 
    | 'Training Shoes'
    | 'Slip-ons';
  gender: 'men' | 'women' | 'kids' | 'unisex';
  ageGroup: 'kids' | 'teens' | 'adults' | 'seniors';
  collection: 'Core' | 'Urban Street' | 'Active Performance' | 'Tailored Heritage' | 'Cloud Walk';
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  isSale?: boolean;
  isTrending?: boolean;
  colors: ProductColor[];
  sizes: number[];
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  materials: ProductMaterial;
  careGuide: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: number;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  houseStreet: string;
  area: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  isDefault: boolean;
}

export interface TrackingEvent {
  status: 'Order Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  date: string;
  time: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending';
  shippingAddress: Address;
  deliveryMethod: 'Standard' | 'Express';
  status: 'Order Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  estimatedDelivery: string;
  trackingEvents: TrackingEvent[];
  couponCode?: string;
  supabaseSynced?: boolean;
  supabaseError?: string;
  supabaseSyncedAt?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrder: number;
  maxDiscount?: number;
  description: string;
  expiresAt: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  ageGroup: 'Kids Parent' | 'Teen' | 'Adult' | 'Senior';
  helpfulCount: number;
}

export type AdminRole = 
  | 'super_admin' 
  | 'product_manager' 
  | 'order_manager' 
  | 'customer_support' 
  | 'content_manager' 
  | 'ai_manager';

export interface AdminUser {
  id: string;
  fullName: string;
  workEmail: string;
  phone: string;
  role: AdminRole;
  isActive: boolean;
  twoFactorEnabled: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  adminEmail: string;
  role: AdminRole;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface AiMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system' | 'agent';
  content: string;
  timestamp: string;
  suggestedProducts?: Product[];
  recommendedSizes?: {
    size: number;
    fitNotes: string;
  };
  orderInfo?: Order;
  showHandoff?: boolean;
  showReturnPrompt?: boolean;
  showCsat?: boolean;
  quickReplies?: string[];
}

export type SupportCategory = 
  | 'Product Search' 
  | 'Product Recommendation' 
  | 'Size' 
  | 'Order' 
  | 'Delivery' 
  | 'Return' 
  | 'Refund' 
  | 'Payment' 
  | 'Account' 
  | 'Technical' 
  | 'Complaint' 
  | 'General Question' 
  | 'Other';

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerEmail: string;
  orderNumber?: string;
  issueCategory: 
    | 'Order' 
    | 'Delivery' 
    | 'Return' 
    | 'Refund' 
    | 'Payment' 
    | 'Product' 
    | 'Size' 
    | 'Account' 
    | 'Technical Problem' 
    | 'Other';
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Waiting for Customer' | 'Resolved' | 'Closed';
  priority: 'Normal' | 'High' | 'Urgent';
  assignedAgent?: string;
  createdDate: string;
  lastUpdate: string;
  responses: { sender: 'customer' | 'agent'; message: string; timestamp: string }[];
}

export interface AiConversation {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  topic: string;
  category?: SupportCategory;
  currentPage?: string;
  productsDiscussed: string[];
  status: 'active' | 'resolved' | 'transferred';
  assignedAgent?: string;
  csatRating?: number;
  csatFeedback?: string;
  messages: AiMessage[];
}

export interface AiKnowledgeItem {
  id: string;
  category: 
    | 'Brand Information' 
    | 'Product Information' 
    | 'Size Guide' 
    | 'Shipping Policy' 
    | 'Return Policy' 
    | 'Refund Policy' 
    | 'Payment Information' 
    | 'FAQs' 
    | 'Customer Support Guidelines' 
    | 'Promotional Information' 
    | 'Store Policies';
  title: string;
  content: string;
  updatedAt: string;
}

export interface AiAssistantSettings {
  isEnabled: boolean;
  assistantName: string;
  greetingMessage: string;
  tone: 'friendly' | 'professional' | 'concise';
  responseLength: 'concise' | 'balanced' | 'detailed';
  recommendedProductsRule: 'smart_match' | 'best_sellers' | 'trending';
  supportEscalation: boolean;
  blockedTopics: string[];
  systemInstructions: string;
}

export interface ReturnRequest {
  id: string;
  rmaNumber: string;
  orderNumber: string;
  productId: string;
  productName: string;
  productImage: string;
  size: number;
  color: string;
  type: 'Return' | 'Exchange';
  exchangeSize?: number;
  exchangeColor?: string;
  reason: 'Wrong Size' | 'Defective / Damaged' | 'Not as Pictured' | 'Uncomfortable / Fit' | 'Changed Mind' | 'Other';
  additionalComments?: string;
  pickupAddress: Address;
  status: 'Requested' | 'Pickup Scheduled' | 'In Transit' | 'Inspected & Approved' | 'Refund Completed' | 'Exchange Dispatched' | 'Rejected';
  pickupDate: string;
  createdAt: string;
}

