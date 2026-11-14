import { AiKnowledgeItem, AiAssistantSettings, AdminUser, AuditLog, AiConversation, SupportTicket } from '../types';

export const INITIAL_KNOWLEDGE_BASE: AiKnowledgeItem[] = [
  {
    id: 'kb-01',
    category: 'Brand Information',
    title: 'About EVORA',
    content: 'EVORA is a modern footwear brand engineered with the philosophy "Every Step, Every Generation." EVORA creates premium, comfortable, and stylish footwear across all age groups: Kids, Teens, Adults, and Seniors. We combine athletic ergonomics, breathable engineered knits, premium grain leathers, and memory-rebound cloud soles for everyday life.',
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-02',
    category: 'Shipping Policy',
    title: 'Delivery Timelines & Shipping Rates',
    content: 'Standard Delivery is FREE on all orders above ₹999 across India. Orders below ₹999 incur a flat ₹99 shipping fee. Delivery across major metro cities takes 2-4 business days. Regional and tier-2/3 cities take 4-6 business days. Express Next-Day Delivery is available at checkout for ₹149 in selected PIN codes.',
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-03',
    category: 'Return Policy',
    title: '7-Day Easy Doorstep Returns & Exchanges',
    content: 'EVORA provides an unconditional 7-day doorstep return and exchange policy from delivery date. Shoes must be in unworn condition with original shoebox and tags intact. Reverse pickup is scheduled automatically with zero return courier fee.',
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-04',
    category: 'Refund Policy',
    title: 'Instant Refund Processing',
    content: 'Once the returned footwear passes quality check at our regional fulfillment hub (usually 24 hours from pickup), refunds are instantly credited to the original payment source (UPI / Card / NetBanking takes 2-4 days, or instant EVORA Store Credit with an extra 5% bonus).',
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-05',
    category: 'Payment Information',
    title: 'Accepted Payment Methods & Security',
    content: 'EVORA accepts UPI (Google Pay, PhonePe, Paytm, BHIM), all major Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking across 50+ banks, and Cash on Delivery (COD) for orders up to ₹5,000. All transactions are protected by 256-bit bank-grade SSL encryption. EVORA never asks for passwords, OTPs, or CVV in chat.',
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-06',
    category: 'Size Guide',
    title: 'Footwear Sizing & Width Recommendations',
    content: 'EVORA footwear follows standard UK / India sizing. If you normally wear Nike, Adidas, or Puma UK 8, select UK 8 in EVORA. For wide feet or athletic running shoes where foot expansion occurs, we recommend sizing up by half or 1 full UK size. Kids shoes feature flexible toe-boxes for growing feet.',
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-07',
    category: 'Product Information',
    title: 'Materials, Cushioning & Craftsmanship',
    content: 'All EVORA running and sports shoes feature proprietary CloudStep dual-density nitrogen-infused foam outsoles. Formal and lifestyle shoes feature full-grain vegetable-tanned nappa leather, cushioned OrthoLite insoles, and anti-slip rubber outsoles.',
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-08',
    category: 'FAQs',
    title: 'How do I clean and care for my EVORA shoes?',
    content: 'For knit and mesh shoes, gently wipe off surface dust with a dry brush and spot clean using lukewarm water with mild detergent. Do not machine dry or expose to direct harsh sunlight. For leather shoes, use neutral leather balm or cream with a microfiber cloth.',
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-09',
    category: 'Customer Support Guidelines',
    title: 'Customer Escalation & Operating Hours',
    content: 'AI Support is online 24 hours a day, 7 days a week. Human specialist support is operational Monday to Saturday from 9:00 AM to 8:00 PM IST. If human agents are offline, inquiries submit into priority support tickets answered within 4 business hours.',
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-10',
    category: 'Promotional Information',
    title: 'Current Coupons & Offers',
    content: 'New customers can use code WELCOME10 for 10% off their first order. For orders above ₹4,000, code EVORA500 gives ₹500 instant discount.',
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-11',
    category: 'Store Policies',
    title: 'Warranty & Manufacturing Guarantee',
    content: 'Every authentic pair of EVORA footwear comes with a 6-month manufacturer warranty covering sole de-lamination, structural eyelet failure, and stitching defects under regular intended wear.',
    updatedAt: '2026-10-04'
  }
];

export const INITIAL_AI_SETTINGS: AiAssistantSettings = {
  isEnabled: true,
  assistantName: 'EVORA Assistant',
  greetingMessage: "Hi! I'm EVORA Assistant 👋 How can I help you find your perfect pair?",
  tone: 'friendly',
  responseLength: 'concise',
  recommendedProductsRule: 'smart_match',
  supportEscalation: true,
  blockedTopics: ['Competitor comparisons', 'Unverified clinical claims', 'Internal company finances'],
  systemInstructions: 'You are the official EVORA AI shopping assistant. Be friendly, helpful, confident, professional and concise. Help customers discover footwear, find accurate sizes, track orders, understand return policies, and check materials.'
};

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'adm-01',
    fullName: 'Vinay Partap',
    workEmail: 'partapvinay269@gmail.com',
    phone: '+91 98765 43210',
    role: 'super_admin',
    isActive: true,
    twoFactorEnabled: true,
    lastLogin: '2026-10-04 18:30 IST',
    createdAt: '2026-01-15'
  },
  {
    id: 'adm-02',
    fullName: 'Priya Sharma',
    workEmail: 'priya.sharma@evorashoes.com',
    phone: '+91 98234 11223',
    role: 'product_manager',
    isActive: true,
    twoFactorEnabled: true,
    lastLogin: '2026-10-04 14:15 IST',
    createdAt: '2026-02-10'
  },
  {
    id: 'adm-03',
    fullName: 'Arjun Mehta',
    workEmail: 'arjun.mehta@evorashoes.com',
    phone: '+91 97112 33445',
    role: 'order_manager',
    isActive: true,
    twoFactorEnabled: false,
    lastLogin: '2026-10-04 11:45 IST',
    createdAt: '2026-03-01'
  },
  {
    id: 'adm-04',
    fullName: 'Ananya Rao',
    workEmail: 'support.lead@evorashoes.com',
    phone: '+91 98990 88776',
    role: 'customer_support',
    isActive: true,
    twoFactorEnabled: true,
    lastLogin: '2026-10-04 17:02 IST',
    createdAt: '2026-04-12'
  },
  {
    id: 'adm-05',
    fullName: 'Rohan Gupta',
    workEmail: 'ai.ops@evorashoes.com',
    phone: '+91 96554 22331',
    role: 'ai_manager',
    isActive: true,
    twoFactorEnabled: true,
    lastLogin: '2026-10-04 16:50 IST',
    createdAt: '2026-05-20'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-01',
    adminName: 'Vinay Partap',
    adminEmail: 'admin@evorashoes.com',
    role: 'super_admin',
    action: 'Admin Login',
    details: 'Successful 2FA login from authorized IP (103.24.112.5)',
    timestamp: '2026-10-04 18:30:12 IST',
    ipAddress: '103.24.112.5'
  },
  {
    id: 'log-02',
    adminName: 'Priya Sharma',
    adminEmail: 'priya.sharma@evorashoes.com',
    role: 'product_manager',
    action: 'Product Updated',
    details: 'Updated inventory count for EVORA Urban Runner (+25 units)',
    timestamp: '2026-10-04 14:15:30 IST',
    ipAddress: '103.24.112.18'
  },
  {
    id: 'log-03',
    adminName: 'Rohan Gupta',
    adminEmail: 'ai.ops@evorashoes.com',
    role: 'ai_manager',
    action: 'AI Settings Changed',
    details: 'Updated AI assistant greeting and refreshed size guide knowledge base',
    timestamp: '2026-10-04 11:20:00 IST',
    ipAddress: '103.24.112.9'
  },
  {
    id: 'log-04',
    adminName: 'Arjun Mehta',
    adminEmail: 'arjun.mehta@evorashoes.com',
    role: 'order_manager',
    action: 'Order Updated',
    details: 'Marked order EVO-84291 status as Dispatched with tracking carrier',
    timestamp: '2026-10-04 10:05:44 IST',
    ipAddress: '103.24.112.14'
  }
];

export const INITIAL_AI_CONVERSATIONS: AiConversation[] = [
  {
    id: 'conv-101',
    customerName: 'Vinay Partap',
    customerEmail: 'partapvinay269@gmail.com',
    date: '2026-10-04 16:45 IST',
    topic: 'Size Recommendation & Running Shoes',
    productsDiscussed: ['EVORA Urban Runner', 'EVORA Motion Pro'],
    status: 'resolved',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        content: 'Hi! What size should I choose for the Urban Runner if I wear Nike UK 9?',
        timestamp: '16:45'
      },
      {
        id: 'msg-2',
        sender: 'assistant',
        content: 'Hi Vinay! EVORA footwear follows standard UK / India sizing. If you normally wear Nike UK 9, size 9 UK in EVORA Urban Runner will give you a supportive, ergonomic fit. For wide feet, going up half a size is great.',
        timestamp: '16:45'
      }
    ]
  },
  {
    id: 'conv-102',
    customerName: 'Kavita Sen',
    customerEmail: 'kavita.sen@gmail.com',
    date: '2026-10-04 15:12 IST',
    topic: 'Everyday walking shoes for senior parent',
    productsDiscussed: ['EVORA Daily Comfort', 'EVORA AirWalk'],
    status: 'resolved',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        content: 'Can you show me easy slip-on walking shoes for my mother who needs extra arch cushioning?',
        timestamp: '15:12'
      },
      {
        id: 'msg-4',
        sender: 'assistant',
        content: 'Certainly! I recommend our EVORA Daily Comfort and EVORA AirWalk. Both feature dual-density orthotic foam, wide non-constricting toe boxes, and zero-hassle slip-on collars.',
        timestamp: '15:13'
      }
    ]
  },
  {
    id: 'conv-103',
    customerName: 'Rahul Verma',
    customerEmail: 'rahul.v@outlook.com',
    date: '2026-10-04 12:30 IST',
    topic: 'Express Delivery PIN Code Inquiry',
    productsDiscussed: ['EVORA StreetFlex'],
    status: 'transferred',
    messages: [
      {
        id: 'msg-5',
        sender: 'user',
        content: 'Is express next-day delivery available to PIN code 560068 today before 7 PM?',
        timestamp: '12:30'
      },
      {
        id: 'msg-6',
        sender: 'assistant',
        content: 'I see you need same-day expedited dispatch for 560068. Let me connect you directly to our logistics team to ensure flight cutoff verification.',
        timestamp: '12:31',
        showHandoff: true
      }
    ]
  }
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'EV-10482',
    ticketNumber: 'EV-10482',
    customerName: 'Vinay Partap',
    customerEmail: 'partapvinay269@gmail.com',
    orderNumber: 'EVO-84291',
    issueCategory: 'Delivery',
    subject: 'Request for scheduled morning doorstep delivery',
    message: 'Can the courier associate call 30 minutes before arrival at Indiranagar 100ft road?',
    status: 'In Progress',
    priority: 'Normal',
    assignedAgent: 'Ananya Rao',
    createdDate: '2026-10-04 11:20 IST',
    lastUpdate: '2026-10-04 12:45 IST',
    responses: [
      {
        sender: 'customer',
        message: 'Can the courier associate call 30 minutes before arrival at Indiranagar 100ft road?',
        timestamp: '11:20 AM'
      },
      {
        sender: 'agent',
        message: 'Hi Vinay, we have tagged your airway bill with priority call-before-delivery instructions.',
        timestamp: '12:45 PM'
      }
    ]
  },
  {
    id: 'EV-10481',
    ticketNumber: 'EV-10481',
    customerName: 'Meera Kapoor',
    customerEmail: 'meera.k@gmail.com',
    orderNumber: 'EVO-83902',
    issueCategory: 'Size',
    subject: 'Size exchange for EVORA Classic Court (UK 7 to UK 8)',
    message: 'Shoe is slightly snug in the toe box. Requesting size exchange to UK 8.',
    status: 'Waiting for Customer',
    priority: 'Normal',
    assignedAgent: 'Ananya Rao',
    createdDate: '2026-10-03 16:10 IST',
    lastUpdate: '2026-10-04 09:30 IST',
    responses: [
      {
        sender: 'customer',
        message: 'Shoe is slightly snug in the toe box. Requesting size exchange to UK 8.',
        timestamp: '04:10 PM'
      },
      {
        sender: 'agent',
        message: 'Doorstep exchange pickup has been scheduled for tomorrow. Please keep original shoebox ready.',
        timestamp: '09:30 AM'
      }
    ]
  },
  {
    id: 'EV-10478',
    ticketNumber: 'EV-10478',
    customerName: 'Sanjay Reddy',
    customerEmail: 'sanjay.reddy@yahoo.com',
    orderNumber: 'EVO-82110',
    issueCategory: 'Payment',
    subject: 'Duplicate UPI charge inquiry',
    message: 'UPI deduction was recorded twice during checkout bank glitch.',
    status: 'Resolved',
    priority: 'High',
    assignedAgent: 'Ananya Rao',
    createdDate: '2026-10-02 14:00 IST',
    lastUpdate: '2026-10-03 10:15 IST',
    responses: [
      {
        sender: 'customer',
        message: 'UPI deduction was recorded twice during checkout bank glitch.',
        timestamp: '02:00 PM'
      },
      {
        sender: 'agent',
        message: 'Duplicate charge of ₹3,499 was reversed and credited back to your Axis bank account via reference UTR 84920194.',
        timestamp: '10:15 AM'
      }
    ]
  }
];

