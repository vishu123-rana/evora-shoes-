import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  MessageSquare, 
  PhoneCall, 
  Truck, 
  RotateCcw, 
  FileText, 
  Send, 
  CheckCircle2, 
  Search,
  ExternalLink,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Package
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SupportTicket } from '../types';

export const CustomerSupportModal: React.FC = () => {
  const {
    isSupportModalOpen,
    setIsSupportModalOpen,
    supportModalInitialTab,
    createSupportTicket,
    supportTickets,
    currentUser,
    orders,
    setCurrentView,
    setTrackingQuery,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'contact' | 'faq' | 'returns' | 'shipping' | 'whatsapp'>(
    supportModalInitialTab || 'faq'
  );

  // Sync tab if initialTab changed on reopen
  React.useEffect(() => {
    if (supportModalInitialTab) {
      setActiveTab(supportModalInitialTab);
    }
  }, [supportModalInitialTab, isSupportModalOpen]);

  // Contact form state
  const [ticketForm, setTicketForm] = useState({
    customerName: currentUser?.fullName || '',
    customerEmail: currentUser?.email || '',
    orderNumber: '',
    issueCategory: 'General Question' as SupportTicket['issueCategory'],
    subject: '',
    message: ''
  });
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ search & open state
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // WhatsApp configurable number
  const WHATSAPP_NUMBER = '919876543210';
  const WHATSAPP_DISPLAY = '+91 98765 43210';

  // Order tracking quick check
  const [quickOrderNumber, setQuickOrderNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<any | null>(null);

  if (!isSupportModalOpen) return null;

  const faqs = [
    {
      q: 'How do I choose the correct shoe size for EVORA shoes?',
      a: 'All EVORA footwear follows standard UK / India sizing. If you wear standard UK 8 or UK 9 in brands like Nike, Adidas, or Puma, order that identical size in EVORA. For running shoes or broader feet, sizing up by half or 1 full UK size provides optimal forefoot comfort. You can also view our interactive Size Chart modal.',
      cat: 'Sizing & Fit'
    },
    {
      q: 'What is EVORA’s 7-Day Doorstep Return & Exchange Policy?',
      a: 'We offer an unconditional 7-day doorstep return and exchange policy from the date of delivery. Footwear must remain in unworn, pristine condition with all original tags and box packaging. Return courier pickup is 100% free of charge.',
      cat: 'Returns & Refunds'
    },
    {
      q: 'How long does refund processing take?',
      a: 'Once the returned shoe arrives at our Bengaluru hub and passes quality inspection, prepaid orders (UPI, Card, Net Banking) are refunded back to the original payment source within 24–48 hours. Cash on Delivery orders are refunded via instant UPI transfer or NEFT directly to your bank account.',
      cat: 'Returns & Refunds'
    },
    {
      q: 'What are the delivery charges and shipping timelines across India?',
      a: 'Standard surface delivery is completely FREE on all orders of ₹999 and above. Metro destinations (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata) typically receive delivery in 2 to 4 business days. Express Priority Air Courier (₹149) guarantees dispatch within 24 hours.',
      cat: 'Shipping & Delivery'
    },
    {
      q: 'Do EVORA shoes come with a warranty against manufacturing defects?',
      a: 'Yes! Every pair of EVORA shoes carries our 6-Month Quality & Craftsmanship Guarantee covering sole delamination, upper stitching defects, and eyelet hardware under ordinary usage.',
      cat: 'Warranty & Quality'
    },
    {
      q: 'How should I clean and maintain my EVORA footwear?',
      a: 'Use a soft-bristle brush to remove dry dust and dirt. For engineered mesh uppers, clean with lukewarm water and mild gentle soap using a damp cloth. Never machine wash or tumble dry; always air-dry away from direct harsh sunlight or artificial heaters.',
      cat: 'Product Care'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.cat.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.customerName || !ticketForm.customerEmail || !ticketForm.subject || !ticketForm.message) {
      showToast('Please fill all required ticket fields', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = createSupportTicket({
        customerName: ticketForm.customerName,
        customerEmail: ticketForm.customerEmail,
        orderNumber: ticketForm.orderNumber || undefined,
        issueCategory: ticketForm.issueCategory,
        subject: ticketForm.subject,
        message: ticketForm.message
      });
      setSubmittedTicketId(ticketId);
      setIsSubmitting(false);
      showToast(`Support Ticket #${ticketId} created! An agent will respond shortly.`, 'success');
    }, 400);
  };

  const handleTrackQuickOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickOrderNumber.trim()) return;
    const match = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === quickOrderNumber.trim().toLowerCase() ||
        o.id.toLowerCase() === quickOrderNumber.trim().toLowerCase()
    );
    if (match) {
      setTrackingResult(match);
    } else {
      showToast(`No order found matching "${quickOrderNumber}"`, 'error');
      setTrackingResult(null);
    }
  };

  const openWhatsAppChat = (inquiryType: string = 'General Inquiry') => {
    const text = encodeURIComponent(
      `Hello EVORA Shoes Team! I would like assistance with: ${inquiryType}.${
        ticketForm.orderNumber ? ` My order number is ${ticketForm.orderNumber}.` : ''
      }`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-6"
      onClick={() => setIsSupportModalOpen(false)}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-[#D7E8DC] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#D7E8DC] bg-[#183C2B] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5FAF78] text-[#183C2B] flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5 text-[#183C2B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-white">
                  EVORA Concierge & Support Hub
                </h3>
                <span className="bg-[#5FAF78] text-[#183C2B] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  24/7 Available
                </span>
              </div>
              <p className="text-xs text-[#A8D5BA]">
                Sizing guidance, doorstep return requests, tracking, and dedicated WhatsApp support.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSupportModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close support dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-[#D7E8DC] bg-[#F5FAF6] px-4 sm:px-6 overflow-x-auto gap-1 sm:gap-2">
          {[
            { id: 'faq', label: 'FAQs & Answers', icon: HelpCircle },
            { id: 'whatsapp', label: 'WhatsApp Concierge', icon: PhoneCall },
            { id: 'contact', label: 'Create Ticket', icon: MessageSquare },
            { id: 'returns', label: 'Return Policy', icon: RotateCcw },
            { id: 'shipping', label: 'Shipping & Delivery', icon: Truck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSubmittedTicketId(null);
                }}
                className={`py-3 px-3.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'border-[#183C2B] text-[#183C2B] bg-white rounded-t-xl'
                    : 'border-transparent text-[#587064] hover:text-[#183C2B]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: FAQ & SEARCH */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#587064]" />
                <input
                  type="text"
                  placeholder="Search questions about sizes, returns, delivery, care..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-[#F5FAF6] border border-[#D7E8DC] rounded-xl text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                />
              </div>

              <div className="divide-y divide-[#D7E8DC] border border-[#D7E8DC] rounded-2xl overflow-hidden bg-white">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="transition-colors">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-[#F5FAF6] cursor-pointer"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5FAF78]">
                            {faq.cat}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-[#183C2B]">
                            {faq.q}
                          </h4>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#183C2B] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#587064] shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-[#587064] leading-relaxed bg-[#F5FAF6]/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick links to actions */}
              <div className="p-4 bg-[#DFF3E4]/50 border border-[#A8D5BA] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h5 className="font-bold text-[#183C2B]">Can’t find what you are looking for?</h5>
                  <p className="text-[#587064]">Speak directly with an EVORA customer specialist via WhatsApp or Ticket.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('whatsapp')}
                    className="px-3.5 py-2 bg-[#183C2B] text-white font-bold rounded-xl hover:bg-[#5FAF78] transition-colors cursor-pointer"
                  >
                    Chat on WhatsApp
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="px-3.5 py-2 bg-white border border-[#D7E8DC] text-[#183C2B] font-bold rounded-xl hover:bg-[#D7E8DC] transition-colors cursor-pointer"
                  >
                    Open Ticket
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WHATSAPP CONCIERGE */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-6">
              <div className="bg-[#E7F6EC] border border-[#A8D5BA] rounded-2xl p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto shadow-md">
                  <PhoneCall className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-[#183C2B]">
                    EVORA Official WhatsApp Concierge
                  </h4>
                  <p className="text-xs text-[#587064] max-w-md mx-auto mt-1">
                    Connect directly with a verified EVORA footwear fitting specialist on WhatsApp for sizing advice, order adjustments, and fast doorstep pickup scheduling.
                  </p>
                  <div className="inline-block mt-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-[#183C2B] border border-[#D7E8DC]">
                    Verified Business Number: {WHATSAPP_DISPLAY}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto pt-2">
                  {[
                    { label: 'Size & Fit Recommendation', topic: 'Size Recommendation' },
                    { label: 'Track Existing Order', topic: 'Order Status Inquiry' },
                    { label: 'Schedule Return / Exchange', topic: 'Return and Exchange' }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => openWhatsAppChat(item.topic)}
                      className="p-3 bg-white rounded-xl border border-[#D7E8DC] hover:border-[#25D366] text-xs font-semibold text-[#183C2B] transition-all hover:shadow-xs cursor-pointer flex flex-col items-center justify-center text-center gap-1"
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] text-[#25D366] font-bold flex items-center gap-0.5">
                        Start Chat <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openWhatsAppChat('General Shoe Inquiry')}
                    className="px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Launch WhatsApp Web / App</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#587064]">
                <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#183C2B]">
                    <Clock className="w-4 h-4 text-[#5FAF78]" />
                    <span>Operational Hours</span>
                  </div>
                  <p>Monday to Sunday: 9:00 AM – 9:00 PM IST</p>
                  <p className="text-[11px]">Inquiries sent outside hours are answered first thing the following morning.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#183C2B]">
                    <ShieldCheck className="w-4 h-4 text-[#5FAF78]" />
                    <span>Encrypted & Privacy Protected</span>
                  </div>
                  <p>All chats are end-to-end encrypted and handled directly by trained EVORA staff.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CREATE TICKET FORM */}
          {activeTab === 'contact' && (
            <div>
              {submittedTicketId ? (
                <div className="bg-[#DFF3E4] border border-[#A8D5BA] rounded-2xl p-8 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#5FAF78] mx-auto" />
                  <div>
                    <h4 className="font-display text-lg font-bold text-[#183C2B]">
                      Support Ticket Successfully Generated
                    </h4>
                    <p className="text-xs text-[#587064] mt-1">
                      Ticket Reference Number: <strong className="text-[#183C2B] font-mono">{submittedTicketId}</strong>
                    </p>
                  </div>
                  <p className="text-xs text-[#587064] max-w-md mx-auto">
                    A confirmation notice has been dispatched to {ticketForm.customerEmail}. Our tier-1 support desk typically resolves customer enquiries within 2–4 business hours.
                  </p>
                  <div className="pt-2 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSubmittedTicketId(null);
                        setTicketForm({
                          customerName: currentUser?.fullName || '',
                          customerEmail: currentUser?.email || '',
                          orderNumber: '',
                          issueCategory: 'Other',
                          subject: '',
                          message: ''
                        });
                      }}
                      className="px-4 py-2 bg-[#183C2B] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#5FAF78] transition-colors"
                    >
                      Submit Another Query
                    </button>
                    <button
                      onClick={() => setIsSupportModalOpen(false)}
                      className="px-4 py-2 bg-white border border-[#D7E8DC] text-[#183C2B] text-xs font-bold rounded-xl cursor-pointer hover:bg-[#F5FAF6] transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={ticketForm.customerName}
                        onChange={(e) => setTicketForm({ ...ticketForm, customerName: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-[#F5FAF6] text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                        placeholder="e.g. Vinay Partap"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={ticketForm.customerEmail}
                        onChange={(e) => setTicketForm({ ...ticketForm, customerEmail: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-[#F5FAF6] text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                        placeholder="e.g. customer@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">Issue Category *</label>
                      <select
                        value={ticketForm.issueCategory}
                        onChange={(e) => setTicketForm({ ...ticketForm, issueCategory: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-[#F5FAF6] text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                      >
                        <option value="Order">Order Inquiry</option>
                        <option value="Delivery">Shipping & Tracking</option>
                        <option value="Return">Return or Exchange Request</option>
                        <option value="Refund">Refund Follow-up</option>
                        <option value="Size">Shoe Sizing & Fit Help</option>
                        <option value="Product">Product Details & Materials</option>
                        <option value="Payment">Payment Verification</option>
                        <option value="General Question">General Question</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#183C2B] block mb-1">EVORA Order Number (Optional)</label>
                      <input
                        type="text"
                        value={ticketForm.orderNumber}
                        onChange={(e) => setTicketForm({ ...ticketForm, orderNumber: e.target.value })}
                        placeholder="e.g. EVO-84291"
                        className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-[#F5FAF6] text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#183C2B] block mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      placeholder="Brief summary of your enquiry"
                      className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-[#F5FAF6] text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#183C2B] block mb-1">Message Description *</label>
                    <textarea
                      required
                      rows={4}
                      value={ticketForm.message}
                      onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                      placeholder="Please include details (e.g. shoe name, requested replacement size, or address change)..."
                      className="w-full px-3 py-2 text-xs border border-[#D7E8DC] rounded-xl bg-[#F5FAF6] text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-[#183C2B] hover:bg-[#5FAF78] text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting Ticket...' : 'Submit Support Ticket'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: RETURN POLICY */}
          {activeTab === 'returns' && (
            <div className="space-y-5 text-xs text-[#587064] leading-relaxed">
              <div className="p-4 bg-[#DFF3E4] rounded-2xl border border-[#A8D5BA] flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-[#183C2B] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-[#183C2B]">
                    Unconditional 7-Day Doorstep Returns & Exchanges
                  </h4>
                  <p className="text-[11px] text-[#183C2B]/80">
                    Try your shoes at home on clean carpet or indoors. Not the right fit? We exchange or refund with zero return courier fee.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#183C2B] text-white flex items-center justify-center font-bold text-xs">1</div>
                  <h5 className="font-bold text-[#183C2B]">Request Pickup</h5>
                  <p className="text-[11px]">Go to your Account Dashboard or click "Return / Exchange" in order history within 7 days of delivery.</p>
                </div>
                <div className="p-4 bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#183C2B] text-white flex items-center justify-center font-bold text-xs">2</div>
                  <h5 className="font-bold text-[#183C2B]">Doorstep Collection</h5>
                  <p className="text-[11px]">Our logistics partner collects the packaged pair right from your doorstep. No printing or label required.</p>
                </div>
                <div className="p-4 bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#183C2B] text-white flex items-center justify-center font-bold text-xs">3</div>
                  <h5 className="font-bold text-[#183C2B]">Instant Refund / Exchange</h5>
                  <p className="text-[11px]">Upon warehouse arrival, replacement size dispatches immediately, or refund credits within 24 hours.</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h5 className="font-bold text-[#183C2B]">Return Eligibility Guidelines:</h5>
                <ul className="list-disc pl-5 space-y-1 text-[11px]">
                  <li>Footwear must be unworn outdoors with no visible tread abrasion or dirt.</li>
                  <li>Original branded shoe box, dust bag (if included), and tags must be returned together.</li>
                  <li>Exchanges are subject to inventory availability in the requested size or colorway.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 5: SHIPPING & DELIVERY */}
          {activeTab === 'shipping' && (
            <div className="space-y-5 text-xs text-[#587064] leading-relaxed">
              <div className="p-4 bg-[#F5FAF6] rounded-2xl border border-[#D7E8DC] flex items-center gap-3">
                <Truck className="w-6 h-6 text-[#5FAF78] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-[#183C2B]">Pan-India Fulfillment Standards</h4>
                  <p className="text-[11px]">Dispatched from our automated distribution center in Indiranagar, Bengaluru.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-[#D7E8DC] bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-[#183C2B]">Standard Surface Delivery</h5>
                    <span className="text-[#5FAF78] font-bold">FREE over ₹999</span>
                  </div>
                  <p className="text-[11px]">Transit duration: 3 to 5 business days nationwide. Metro hubs receive delivery in 48–72 hours.</p>
                </div>
                <div className="p-4 rounded-2xl border border-[#D7E8DC] bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-[#183C2B]">Express Priority Air Courier</h5>
                    <span className="text-[#183C2B] font-bold">₹149</span>
                  </div>
                  <p className="text-[11px]">Dispatched via air courier on same or next business morning. Typical delivery in 24 to 48 hours.</p>
                </div>
              </div>

              {/* Quick Order Lookup Form */}
              <div className="p-4 rounded-2xl bg-[#F5FAF6] border border-[#D7E8DC] space-y-3">
                <h5 className="font-bold text-[#183C2B]">Quick Order Status Lookup</h5>
                <form onSubmit={handleTrackQuickOrder} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter order number (e.g. EVO-84291)"
                    value={quickOrderNumber}
                    onChange={(e) => setQuickOrderNumber(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#D7E8DC] rounded-xl text-[#183C2B] focus:outline-none focus:border-[#5FAF78]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#183C2B] text-white text-xs font-bold rounded-xl hover:bg-[#5FAF78] transition-colors cursor-pointer"
                  >
                    Track
                  </button>
                </form>

                {trackingResult && (
                  <div className="p-3 bg-white rounded-xl border border-[#A8D5BA] space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#183C2B]">{trackingResult.orderNumber}</span>
                      <span className="bg-[#DFF3E4] text-[#183C2B] font-bold px-2 py-0.5 rounded text-[10px]">
                        {trackingResult.status}
                      </span>
                    </div>
                    <p className="text-[11px]">Destination: {trackingResult.shippingAddress.city}, {trackingResult.shippingAddress.state}</p>
                    <p className="text-[11px]">Estimated Delivery: <strong>{trackingResult.estimatedDelivery}</strong></p>
                    <button
                      onClick={() => {
                        setTrackingQuery(trackingResult.orderNumber);
                        setCurrentView('track-order');
                        setIsSupportModalOpen(false);
                      }}
                      className="text-[11px] font-bold text-[#5FAF78] hover:underline pt-1 inline-block cursor-pointer"
                    >
                      View Live Step-by-Step Milestones →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#D7E8DC] bg-[#F5FAF6] flex items-center justify-between text-xs text-[#587064]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#5FAF78] inline-block" />
            <span>Support agents online. Average WhatsApp response under 5 minutes.</span>
          </div>
          <button
            onClick={() => setIsSupportModalOpen(false)}
            className="px-4 py-1.5 bg-white border border-[#D7E8DC] hover:bg-[#D7E8DC] text-[#183C2B] font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
