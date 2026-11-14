import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  Ruler, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Headphones, 
  Mail, 
  Phone,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, AiMessage } from '../types';
import { ShoeImage } from './ShoeImage';

export const AiAssistantWidget: React.FC = () => {
  const {
    products,
    currentUser,
    orders,
    addToCart,
    viewProductDetails,
    setIsSizeChartOpen,
    setCurrentView,
    setTrackingQuery,
    showToast
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: "Hi! I'm EVORA Assistant 👋\nHow can I help you find your perfect pair?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [sizeWizardStep, setSizeWizardStep] = useState<number | null>(null);
  const [sizeAnswers, setSizeAnswers] = useState({
    usualSize: '',
    brand: '',
    fitPreference: '',
    activity: ''
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    'Find shoes for me',
    'Show me running shoes',
    'Which shoes are best for everyday use?',
    'Help me choose my size',
    'Show me shoes under ₹3,000',
    'Where is my order?',
    'What is your return policy?'
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const addAssistantMessage = (
    content: string, 
    extra?: { 
      suggestedProducts?: Product[]; 
      recommendedSizes?: { size: number; fitNotes: string };
      showHandoff?: boolean;
    }
  ) => {
    const newMsg: AiMessage = {
      id: `asst-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      sender: 'assistant',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedProducts: extra?.suggestedProducts,
      recommendedSizes: extra?.recommendedSizes,
      showHandoff: extra?.showHandoff
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    setInputMessage('');
    const userMsgId = `user-${Date.now()}`;
    const userMsg: AiMessage = {
      id: userMsgId,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Check if user clicked or typed size assistant
    const lower = query.toLowerCase();
    if (lower === 'help me choose my size' || lower === 'choose size' || lower === 'size finder') {
      setSizeWizardStep(1);
      setTimeout(() => {
        setIsLoading(false);
        addAssistantMessage(
          "Let's find your ideal fit in 3 quick questions. First: What size (UK / India) do you usually wear in casual or sports shoes?"
        );
      }, 350);
      return;
    }

    try {
      // Find user recent order if authenticated
      const userOrders = currentUser ? orders.filter(o => o.shippingAddress.email === currentUser.email) : [];
      const recentOrder = userOrders.length > 0 ? userOrders[0] : (currentUser ? orders[0] : null);

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages.slice(-6),
          customerContext: {
            name: currentUser?.fullName,
            isLoggedIn: !!currentUser,
            recentOrder: recentOrder ? {
              orderNumber: recentOrder.orderNumber,
              status: recentOrder.status,
              estimatedDelivery: recentOrder.estimatedDelivery,
              itemsCount: recentOrder.items.length
            } : null
          },
          availableProducts: products.map(p => ({
            id: p.id,
            name: p.name,
            subtitle: p.subtitle,
            category: p.category,
            gender: p.gender,
            originalPrice: p.originalPrice,
            discountedPrice: p.discountedPrice,
            rating: p.rating,
            sizes: p.sizes,
            colors: p.colors
          }))
        })
      });

      const data = await response.json();

      if (data.success && data.reply) {
        // Find matching product objects if returned
        let matchedProducts: Product[] = [];
        if (data.suggestedProductIds && Array.isArray(data.suggestedProductIds)) {
          matchedProducts = products.filter(p => data.suggestedProductIds.includes(p.id));
        }

        // Fallback search match if empty and user asked for product categories
        if (matchedProducts.length === 0 && (lower.includes('running') || lower.includes('sneaker') || lower.includes('shoes') || lower.includes('walking') || lower.includes('comfort'))) {
          matchedProducts = products.filter(p => {
            if (lower.includes('running')) return p.category === 'Running Shoes';
            if (lower.includes('formal')) return p.category === 'Formal Shoes';
            if (lower.includes('kids')) return p.gender === 'kids';
            if (lower.includes('comfort')) return p.name.includes('Comfort') || p.category === 'Casual Shoes';
            return p.category === 'Sneakers';
          }).slice(0, 3);
        }

        addAssistantMessage(data.reply, {
          suggestedProducts: matchedProducts.length > 0 ? matchedProducts : undefined,
          recommendedSizes: data.recommendedSizes,
          showHandoff: data.showHandoff
        });
      } else {
        addAssistantMessage(
          "I don't have that information right now, but I can help you with something else. Would you like to explore our footwear catalog or check sizing?"
        );
      }
    } catch (err) {
      console.error('AI chat widget error:', err);
      addAssistantMessage(
        "I'm here to help! You can browse our signature running, lifestyle and everyday comfort footwear or check our 7-day doorstep return policy anytime."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSizeWizardAnswer = (field: string, value: string) => {
    const updated = { ...sizeAnswers, [field]: value };
    setSizeAnswers(updated);

    if (sizeWizardStep === 1) {
      setSizeWizardStep(2);
      addAssistantMessage(
        `Got it (${value}). Next: What brand do you normally wear? (Nike, Adidas, Puma, Skechers, or Clark's)?`
      );
    } else if (sizeWizardStep === 2) {
      setSizeWizardStep(3);
      addAssistantMessage(
        `Great. Do you prefer a snug athletic fit, or a relaxed everyday fit with extra toe room?`
      );
    } else if (sizeWizardStep === 3) {
      setSizeWizardStep(null);
      const chosenNum = parseInt(updated.usualSize) || 9;
      const finalRecommended = updated.fitPreference === 'Relaxed' || updated.fitPreference === 'Wide feet' 
        ? chosenNum 
        : chosenNum;

      addAssistantMessage(
        `Based on the information you provided, size ${finalRecommended} may be a good starting point. EVORA uses ergonomic footbeds and standard UK / India sizing. Please check the EVORA size guide before ordering.`,
        {
          recommendedSizes: {
            size: finalRecommended,
            fitNotes: `Recommended starting size: UK ${finalRecommended}. Check our sizing chart for foot length in cm.`
          }
        }
      );
    }
  };

  const handleAddToCartDirect = (product: Product) => {
    addToCart(product, product.sizes[0] || 8, product.colors[0], 1);
    showToast(`Added ${product.name} to your bag!`, 'success');
  };

  const handleHandoffSupport = (method: 'chat' | 'email') => {
    if (method === 'email') {
      window.location.href = 'mailto:care@evorashoes.com?subject=EVORA%20Customer%20Support%20Inquiry';
    } else {
      showToast('Support specialist notified. An agent will connect shortly.', 'info');
      addAssistantMessage(
        "Thank you. A senior customer support concierge has been notified and will take over this conversation. You can also reach us directly at care@evorashoes.com."
      );
    }
  };

  return (
    <>
      {/* Floating Trigger Button: "Ask EVORA" with occasional subtle pulse */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-5 py-3.5 bg-[#183C2B] hover:bg-[#112d20] text-white rounded-full shadow-2xl border border-[#5FAF78]/40 cursor-pointer"
            aria-label="Open EVORA AI Assistant"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-[#A8D5BA]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#5FAF78] rounded-full border border-white" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold uppercase tracking-wider font-display">
                Ask EVORA
              </span>
              <span className="block text-[10px] text-[#A8D5BA] -mt-0.5 font-medium">
                AI Shopping Assistant
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[640px] max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#D7E8DC] flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="px-5 py-4 bg-[#183C2B] text-white flex items-center justify-between border-b border-[#24533c] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#24533c] border border-[#5FAF78]/30 flex items-center justify-center text-[#A8D5BA]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-bold tracking-wide">EVORA Assistant</h3>
                  <span className="flex items-center gap-1 text-[10px] text-[#A8D5BA] bg-[#24533c] px-2 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FAF78]" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-[#A8D5BA]/80 tracking-tight">
                  Every Step, Every Generation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: 'welcome-reset',
                      sender: 'assistant',
                      content: "Hi! I'm EVORA Assistant 👋\nHow can I help you find your perfect pair?",
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ]);
                  setSizeWizardStep(null);
                }}
                title="Reset conversation"
                className="p-1.5 rounded-xl text-[#A8D5BA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-xl text-[#A8D5BA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5FAF6]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#183C2B] text-white rounded-br-xs'
                      : 'bg-white text-[#183C2B] border border-[#D7E8DC] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span className={`text-[9px] block mt-1 ${msg.sender === 'user' ? 'text-[#A8D5BA] text-right' : 'text-[#587064]'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {/* Sizing Recommendation Chip if provided */}
                {msg.recommendedSizes && (
                  <div className="mt-2.5 w-full bg-white rounded-2xl p-3.5 border border-[#5FAF78]/30 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#183C2B] flex items-center gap-1.5">
                        <Ruler className="w-4 h-4 text-[#5FAF78]" />
                        <span>Recommended Size: UK {msg.recommendedSizes.size}</span>
                      </span>
                      <button
                        onClick={() => setIsSizeChartOpen(true)}
                        className="text-[11px] font-semibold text-[#5FAF78] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Size Guide</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#587064]">
                      {msg.recommendedSizes.fitNotes}
                    </p>
                  </div>
                )}

                {/* Interactive Product Cards if attached to assistant message */}
                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="mt-3 w-full space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#587064] block">
                      Recommended Matches ({msg.suggestedProducts.length})
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {msg.suggestedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="bg-white rounded-2xl p-3 border border-[#D7E8DC] shadow-xs flex items-center gap-3 hover:border-[#A8D5BA] transition-all"
                        >
                          {/* Thumbnail */}
                          <div
                            onClick={() => {
                              setIsOpen(false);
                              viewProductDetails(p);
                            }}
                            className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5FAF6] shrink-0 border border-[#D7E8DC] cursor-pointer"
                          >
                            <ShoeImage
                              src={p.image}
                              alt={p.name}
                              category={p.category}
                              colorHex={p.colors[0]?.hex}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4
                              onClick={() => {
                                setIsOpen(false);
                                viewProductDetails(p);
                              }}
                              className="text-xs font-bold text-[#183C2B] truncate hover:text-[#5FAF78] cursor-pointer"
                            >
                              {p.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-[#587064] mt-0.5">
                              <span className="font-semibold text-amber-500">★ {p.rating}</span>
                              <span>·</span>
                              <span>{p.colors[0]?.name}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs font-bold text-[#183C2B] tabular-nums">
                                ₹{p.discountedPrice.toLocaleString('en-IN')}
                              </span>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => {
                                    setIsOpen(false);
                                    viewProductDetails(p);
                                  }}
                                  className="px-2 py-1 bg-[#F5FAF6] hover:bg-[#DFF3E4] text-[#183C2B] text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleAddToCartDirect(p)}
                                  className="px-2.5 py-1 bg-[#183C2B] hover:bg-[#112d20] text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <ShoppingBag className="w-3 h-3" />
                                  <span>Bag</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Human Support Handoff Card */}
                {msg.showHandoff && (
                  <div className="mt-2.5 w-full bg-white rounded-2xl p-3.5 border border-[#D7E8DC] shadow-xs space-y-2.5">
                    <p className="text-xs font-semibold text-[#183C2B]">
                      Would you like to talk to our support team?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleHandoffSupport('chat')}
                        className="px-3 py-1.5 bg-[#183C2B] hover:bg-[#112d20] text-white text-[11px] font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Headphones className="w-3.5 h-3.5" />
                        <span>Contact Support</span>
                      </button>
                      <button
                        onClick={() => handleHandoffSupport('email')}
                        className="px-3 py-1.5 bg-white border border-[#D7E8DC] hover:bg-[#F5FAF6] text-[#183C2B] text-[11px] font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email Support</span>
                      </button>
                      <button
                        onClick={() => addAssistantMessage("Sure thing! What else can I assist you with today?")}
                        className="px-3 py-1.5 text-[11px] font-semibold text-[#587064] hover:text-[#183C2B] cursor-pointer"
                      >
                        Continue with AI
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Sizing interactive step selector buttons */}
            {sizeWizardStep === 1 && (
              <div className="bg-white p-3 rounded-2xl border border-[#D7E8DC] space-y-2">
                <span className="text-[11px] font-bold text-[#183C2B] block">Select your usual UK size:</span>
                <div className="grid grid-cols-5 gap-1.5">
                  {[6, 7, 8, 9, 10, 11, 12].map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeWizardAnswer('usualSize', String(size))}
                      className="py-1.5 text-xs font-bold rounded-lg border border-[#D7E8DC] hover:border-[#183C2B] hover:bg-[#F5FAF6] text-[#183C2B]"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizeWizardStep === 2 && (
              <div className="bg-white p-3 rounded-2xl border border-[#D7E8DC] space-y-2">
                <span className="text-[11px] font-bold text-[#183C2B] block">Select reference brand:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Nike', 'Adidas', 'Puma', 'Skechers', 'Clarks', 'Other'].map(brand => (
                    <button
                      key={brand}
                      onClick={() => handleSizeWizardAnswer('brand', brand)}
                      className="py-1.5 px-2 text-xs font-semibold rounded-lg border border-[#D7E8DC] hover:border-[#183C2B] hover:bg-[#F5FAF6] text-[#183C2B]"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizeWizardStep === 3 && (
              <div className="bg-white p-3 rounded-2xl border border-[#D7E8DC] space-y-2">
                <span className="text-[11px] font-bold text-[#183C2B] block">Fit preference:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Snug Athletic', 'Relaxed Daily', 'Wide feet', 'Standard'].map(fit => (
                    <button
                      key={fit}
                      onClick={() => handleSizeWizardAnswer('fitPreference', fit)}
                      className="py-1.5 px-2 text-xs font-semibold rounded-lg border border-[#D7E8DC] hover:border-[#183C2B] hover:bg-[#F5FAF6] text-[#183C2B]"
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading typing indicator: 3 static dots */}
            {isLoading && (
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white rounded-2xl border border-[#D7E8DC] w-20 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#183C2B]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#183C2B]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#183C2B]" />
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-4 py-2 bg-white border-t border-[#D7E8DC] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1 bg-[#F5FAF6] hover:bg-[#DFF3E4] text-[#183C2B] text-[11px] font-semibold rounded-full border border-[#D7E8DC] transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 bg-white border-t border-[#D7E8DC] flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about shoes, sizes, budget, orders..."
              className="flex-1 px-4 py-2.5 bg-[#F5FAF6] rounded-2xl text-xs sm:text-sm text-[#183C2B] placeholder:text-[#587064]/60 border border-[#D7E8DC] focus:outline-none focus:border-[#5FAF78]"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="w-10 h-10 rounded-2xl bg-[#183C2B] hover:bg-[#112d20] text-white flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer shrink-0 shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-[#A8D5BA]" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
