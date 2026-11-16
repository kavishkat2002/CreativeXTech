"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  MessageSquare,
  Search,
  Shield,
  ShoppingBag,
  Smartphone,
  Store,
  User,
  Zap,
} from "lucide-react";

interface ConversationItem {
  id: string;
  name: string;
  phone: string;
  channel: "Facebook Ad" | "Website" | "Direct WhatsApp";
  category: "Ordered" | "Inquiries" | "Meta Ads";
  time: string;
  preview: string;
  status: "automated" | "completed" | "human_takeover";
  cartItems?: string[];
  total?: string;
  messages: {
    sender: "customer" | "assistant" | "human_rep";
    time: string;
    text: string;
    productCard?: {
      title: string;
      price: string;
      inventory: string;
    };
  }[];
}

const conversations: ConversationItem[] = [
  {
    id: "conv-1",
    name: "Sanduni Jayawardena",
    phone: "+94 77 ••• 4291",
    channel: "Facebook Ad",
    category: "Meta Ads",
    time: "2m ago",
    preview: "Can you recommend something for hair fall and dry scalp?",
    status: "automated",
    messages: [
      {
        sender: "customer",
        time: "10:14 AM",
        text: "Hi! Saw your ad for herbal hair solutions. Can you recommend something for hair fall and dry scalp?",
      },
      {
        sender: "assistant",
        time: "10:14 AM",
        text: "Ayubowan Sanduni. We recommend our 100% natural Herbcey Neelayadi Herbal Hair Oil paired with the Keshakalpa Herbal Tonic. It nourishes the scalp, strengthens roots, and reduces hair fall noticeably in 14 days.",
        productCard: {
          title: "Herbcey Neelayadi Herbal Hair Oil (200ml)",
          price: "LKR 2,450.00",
          inventory: "In Stock · Islandwide 24h Dispatch",
        },
      },
      {
        sender: "customer",
        time: "10:15 AM",
        text: "That sounds good! I would like to order one bottle to Colombo 07 with Cash on Delivery please.",
      },
      {
        sender: "assistant",
        time: "10:15 AM",
        text: "Understood! Your order is pre-filled: 1x Neelayadi Hair Oil (200ml) — LKR 2,450 + standard delivery LKR 350. Please reply with your delivery address and recipient contact number to confirm.",
      },
    ],
  },
  {
    id: "conv-2",
    name: "Kasun Wickramasinghe",
    phone: "+94 71 ••• 8832",
    channel: "Website",
    category: "Ordered",
    time: "12m ago",
    preview: "Order confirmed #HBY-8921. Sent to courier.",
    status: "completed",
    cartItems: ["Moringa Vitality Powder 250g", "Ashwagandha Pure Capsules"],
    total: "LKR 4,900.00",
    messages: [
      {
        sender: "customer",
        time: "09:42 AM",
        text: "Hi, I would like to reorder the Moringa Vitality Powder and one bottle of Ashwagandha Capsules.",
      },
      {
        sender: "assistant",
        time: "09:42 AM",
        text: "Welcome back Kasun! Adding 1x Moringa Vitality Powder (250g) and 1x Ashwagandha Capsules (60 caps) to your cart. Total: LKR 4,900 with free delivery. Should we deliver to your registered Kandy address?",
      },
      {
        sender: "customer",
        time: "09:43 AM",
        text: "Yes, same address please. Cash on Delivery.",
      },
      {
        sender: "assistant",
        time: "09:43 AM",
        text: "Order confirmed. Reference: #HBY-8921. Scheduled for courier pickup today with tracking sent to your WhatsApp.",
      },
    ],
  },
  {
    id: "conv-3",
    name: "Dr. Priyantha Silva",
    phone: "+94 76 ••• 1109",
    channel: "Direct WhatsApp",
    category: "Inquiries",
    time: "24m ago",
    preview: "Human representative replying on WhatsApp Mobile.",
    status: "human_takeover",
    messages: [
      {
        sender: "customer",
        time: "09:20 AM",
        text: "Good morning, do you supply certified bulk Gotukola extract for compounding pharmacy research?",
      },
      {
        sender: "assistant",
        time: "09:20 AM",
        text: "Ayubowan Dr. Silva. Yes, Herbcey supplies batch-tested botanical extracts with HPLC purity certifications. Let me connect you directly with our production specialist.",
      },
      {
        sender: "human_rep",
        time: "09:22 AM",
        text: "Hello Dr. Silva, Dinithi here from Herbcey Production. I am reviewing our batch certificate of analysis for Gotukola extract right now and will share the purity report.",
      },
    ],
  },
];

export function HerbceyCaseStudyClient() {
  const [activeTab, setActiveTab] = useState<"All" | "Ordered" | "Inquiries" | "Meta Ads">("All");
  const [selectedConv, setSelectedConv] = useState<ConversationItem>(conversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [humanTakeoverActive, setHumanTakeoverActive] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(300);

  // Takeover cooldown timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (humanTakeoverActive && cooldownSeconds > 0) {
      timer = setInterval(() => {
        setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (cooldownSeconds === 0) {
      setHumanTakeoverActive(false);
      setCooldownSeconds(300);
    }
    return () => clearInterval(timer);
  }, [humanTakeoverActive, cooldownSeconds]);

  const filtered = conversations.filter((c) => {
    if (activeTab !== "All" && c.category !== activeTab) return false;
    if (!searchQuery.trim()) return true;
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleTakeover = () => {
    if (humanTakeoverActive) {
      setHumanTakeoverActive(false);
      setCooldownSeconds(300);
    } else {
      setHumanTakeoverActive(true);
      setCooldownSeconds(300);
    }
  };

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full text-[#ededed] font-sans">
      {/* ── 1. SYSTEM OVERVIEW & DASHBOARD PREVIEW ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#0e100e] border-y border-[#202520]">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#ff5a36] font-mono font-semibold mb-2">
                Production Case Study · E-Commerce Commerce Engine
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Herbcey Store Dashboard &amp; WhatsApp Sync
              </h2>
              <p className="text-sm sm:text-base text-[#a3a3a3] mt-2 max-w-3xl leading-relaxed">
                Centralized operations console connecting inbound Meta ad inquiries, conversational product
                consultations, automated checkout, and real-time mobile app coexistence.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 rounded-md bg-[#161a16] border border-[#273027] text-xs font-mono text-[#d4d4d8]">
                Meta Cloud API: <strong>Connected</strong>
              </span>
              <span className="px-3 py-1.5 rounded-md bg-[#161a16] border border-[#273027] text-xs font-mono text-[#d4d4d8]">
                Mobile Sync: <strong>Echo Active</strong>
              </span>
            </div>
          </div>

          {/* Screenshot Display Frame */}
          <div className="overflow-hidden rounded-xl border border-[#242924] bg-[#121512] shadow-xl mb-12">
            <div className="flex items-center justify-between px-4 py-3 bg-[#171b17] border-b border-[#242924]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3f473f]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3f473f]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3f473f]" />
                <span className="text-xs text-[#8f968f] font-mono ml-2">
                  https://herbcey.store/dashboard — Store Operations Console
                </span>
              </div>
              <span className="text-xs font-mono text-[#8f968f]">
                Meta API Webhook: Active
              </span>
            </div>

            <div className="w-full bg-[#0b0d0b] flex items-center justify-center overflow-hidden">
              <img
                src="/images/herbcey-whatsapp-assistant.png"
                alt="Herbcey Store WhatsApp Assistant Dashboard"
                className="w-full h-auto max-h-[720px] object-contain block"
                loading="eager"
              />
            </div>
          </div>

          {/* ── 2. THREE OPERATIONAL METRIC CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            <div className="p-5 rounded-lg bg-[#141714] border border-[#232923]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8f968f]">
                Total Inquiries
              </span>
              <div className="text-3xl font-semibold text-white mt-1">1,428</div>
              <p className="text-xs text-[#a3a3a3] mt-1.5">
                Active customer threads handled across WhatsApp and Meta ads.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#141714] border border-[#232923]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8f968f]">
                Orders Confirmed
              </span>
              <div className="text-3xl font-semibold text-white mt-1">342</div>
              <p className="text-xs text-[#a3a3a3] mt-1.5">
                23.9% automated conversion rate from conversational checkout.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#141714] border border-[#232923]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8f968f]">
                Product Consultations
              </span>
              <div className="text-3xl font-semibold text-white mt-1">86</div>
              <p className="text-xs text-[#a3a3a3] mt-1.5">
                Active SKU guidance sessions with zero catalog hallucination.
              </p>
            </div>
          </div>

          {/* ── 3. INTERACTIVE CONSOLE EMULATOR ── */}
          <div className="rounded-xl border border-[#242924] bg-[#121512] p-5 sm:p-7 shadow-lg">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#222722] gap-4">
              <div>
                <span className="text-xs font-mono text-[#ff5a36] uppercase font-semibold">
                  Interactive Console Experience
                </span>
                <h3 className="text-xl font-semibold text-white mt-0.5">
                  Live Customer Inquiries &amp; WhatsApp Handoff
                </h3>
                <p className="text-xs text-[#a3a3a3] mt-1">
                  Select customer threads to inspect natural language consultations and test sales representative mobile coexistence.
                </p>
              </div>

              {/* Coexistence Simulator Switch */}
              <div className="flex items-center gap-3 bg-[#171b17] p-3 rounded-lg border border-[#293129]">
                <div>
                  <div className="text-[11px] font-mono text-[#8f968f]">WhatsApp Coexistence Mode:</div>
                  <div className="text-xs font-semibold text-white">
                    {humanTakeoverActive ? (
                      <span className="text-[#ff5a36]">Human Takeover ({formatCountdown(cooldownSeconds)} remaining)</span>
                    ) : (
                      <span>AI Assistant Active (Standing By)</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleTakeover}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    humanTakeoverActive
                      ? "bg-[#ff5a36] text-white hover:bg-[#ff6f4e]"
                      : "bg-[#222722] text-[#ededed] hover:bg-[#2b332b] border border-[#343d34]"
                  }`}
                >
                  {humanTakeoverActive ? "Reset to AI" : "Simulate Rep Mobile Reply"}
                </button>
              </div>
            </div>

            {/* Split Screen: Inbox list vs Thread reader */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
              {/* Left Column: Thread list */}
              <div className="lg:col-span-5 rounded-lg border border-[#222722] bg-[#151915] flex flex-col overflow-hidden">
                <div className="p-3 border-b border-[#222722] bg-[#181d18]">
                  <div className="relative mb-2.5">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"
                    />
                    <input
                      type="text"
                      placeholder="Search customer, phone (+94)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#111411] border border-[#282f28] rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#737373] focus:outline-none focus:border-[#ff5a36]"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    {(["All", "Ordered", "Inquiries", "Meta Ads"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                          activeTab === tab
                            ? "bg-[#ff5a36] text-white"
                            : "text-[#a3a3a3] hover:bg-[#202620]"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-[#202520] max-h-[440px] overflow-y-auto">
                  {filtered.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#737373]">
                      No conversations found in this category.
                    </div>
                  ) : (
                    filtered.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConv(conv)}
                        className={`p-3.5 cursor-pointer transition-colors ${
                          selectedConv.id === conv.id
                            ? "bg-[#1f251f] border-l-2 border-[#ff5a36]"
                            : "hover:bg-[#1a1f1a]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white">
                            {conv.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#8f968f]">{conv.time}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[11px] font-mono text-[#a3a3a3]">{conv.phone}</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#131613] border border-[#293129] text-[#d4d4d8] font-mono">
                            {conv.channel}
                          </span>
                        </div>
                        <p className="text-xs text-[#8f968f] line-clamp-1">{conv.preview}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Column: Chat transcript */}
              <div className="lg:col-span-7 rounded-lg border border-[#222722] bg-[#141714] flex flex-col justify-between overflow-hidden min-h-[440px]">
                {/* Chat Top Bar */}
                <div className="p-3.5 bg-[#181d18] border-b border-[#222722] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#242a24] border border-[#343d34] flex items-center justify-center text-xs font-semibold text-white">
                      {selectedConv.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {selectedConv.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#a3a3a3]">{selectedConv.phone}</div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#1c221c] text-[#d4d4d8] border border-[#2d372d]">
                    Source: {selectedConv.channel}
                  </span>
                </div>

                {/* Message stream */}
                <div className="p-4 space-y-3.5 overflow-y-auto max-h-[360px] bg-[#0f120f]">
                  {selectedConv.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${
                        msg.sender === "customer"
                          ? "items-start"
                          : "items-end"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-[#737373]">
                        <span>
                          {msg.sender === "customer"
                            ? selectedConv.name
                            : msg.sender === "human_rep"
                            ? "Herbcey Staff Member (Mobile Phone)"
                            : "Herbcey Store Assistant"}
                        </span>
                        <span>· {msg.time}</span>
                      </div>

                      <div
                        className={`p-3 rounded-lg max-w-[85%] text-xs leading-relaxed ${
                          msg.sender === "customer"
                            ? "bg-[#181d18] text-[#e5e5e5] border border-[#262e26]"
                            : msg.sender === "human_rep"
                            ? "bg-[#251f1c] text-[#f7ece8] border border-[#48332c]"
                            : "bg-[#202620] text-white border border-[#2f392f]"
                        }`}
                      >
                        {msg.text}

                        {/* Product recommendation card */}
                        {msg.productCard && (
                          <div className="mt-2.5 p-2.5 rounded bg-[#131613] border border-[#2a332a]">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white text-xs">
                                {msg.productCard.title}
                              </span>
                              <span className="font-mono text-[#ff5a36] font-semibold text-xs">
                                {msg.productCard.price}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#a3a3a3] block mt-1">
                              ✓ {msg.productCard.inventory}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Coexistence notification banner */}
                  {humanTakeoverActive && (
                    <div className="p-3 rounded-md bg-[#221c1a] border border-[#4a2e26] text-xs text-[#ffdcd4] flex items-center gap-2.5">
                      <Clock size={15} className="text-[#ff5a36] shrink-0" />
                      <span>
                        Sales rep replied on mobile WhatsApp. AI assistant is paused for{" "}
                        <strong>{formatCountdown(cooldownSeconds)}</strong> to allow direct human consultation.
                      </span>
                    </div>
                  )}
                </div>

                {/* Status footer */}
                <div className="p-3 bg-[#171b17] border-t border-[#222722] flex items-center justify-between text-xs text-[#8f968f]">
                  <span>
                    {humanTakeoverActive
                      ? "Human representative has manual ownership of this thread."
                      : "Herbcey Assistant running catalog inquiries and order capture."}
                  </span>
                  <span className="font-mono text-[11px] text-[#d4d4d8]">
                    Sync: Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FOUR ARCHITECTURE PILLARS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0b0d0b]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-[#ff5a36] font-semibold mb-1">
              Engineering Architecture
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Designed for Reliable E-Commerce Operations
            </h2>
            <p className="text-sm text-[#a3a3a3] mt-2">
              Four fundamental capabilities built specifically for direct-to-consumer conversational commerce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-lg bg-[#121512] border border-[#222722]">
              <div className="w-9 h-9 rounded bg-[#1a201a] border border-[#2d372d] flex items-center justify-center text-[#ff5a36] mb-4">
                <MessageSquare size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                Multi-Tab Inbox Categorization
              </h3>
              <p className="text-xs text-[#a3a3a3] leading-relaxed">
                Sorts incoming conversations into All, Ordered, Inquiries, and Meta Ads. Provides clear attribution for Click-to-WhatsApp ad campaigns.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#121512] border border-[#222722]">
              <div className="w-9 h-9 rounded bg-[#1a201a] border border-[#2d372d] flex items-center justify-center text-[#ff5a36] mb-4">
                <ShoppingBag size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                Catalog-Grounded Consultations
              </h3>
              <p className="text-xs text-[#a3a3a3] leading-relaxed">
                Recommends dosage, ingredients, and Ayurvedic guidelines strictly matched to active Herbcey inventory datasheets.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#121512] border border-[#222722]">
              <div className="w-9 h-9 rounded bg-[#1a201a] border border-[#2d372d] flex items-center justify-center text-[#ff5a36] mb-4">
                <Zap size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                Automated Order Confirmation
              </h3>
              <p className="text-xs text-[#a3a3a3] leading-relaxed">
                Extracts recipient addresses, phone numbers, and payment preferences (COD, bank deposit) into formatted orders for courier dispatch.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#121512] border border-[#222722]">
              <div className="w-9 h-9 rounded bg-[#1a201a] border border-[#2d372d] flex items-center justify-center text-[#ff5a36] mb-4">
                <Smartphone size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                Echo Active Mobile Sync
              </h3>
              <p className="text-xs text-[#a3a3a3] leading-relaxed">
                Mirrors messages to the business owner&apos;s phone. A 5-minute cooldown activates automatically when a human rep replies, preventing bot collision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. VERIFIED TECHNICAL SPECIFICATIONS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0e100e] border-t border-[#202520]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-widest text-[#ff5a36] font-semibold mb-1">
                Technical Architecture
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
                High-Volume WhatsApp Integration
              </h2>
              <p className="text-sm text-[#a3a3a3] mt-2.5 leading-relaxed">
                Built to handle seasonal spikes, viral Facebook ad campaigns, and bulk customer consultations with predictable latency and zero message loss.
              </p>

              <div className="space-y-3.5 mt-6">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#161a16] border border-[#283128] text-[#d4d4d8] mt-0.5">
                    <Check size={13} />
                  </div>
                  <div>
                    <strong className="text-xs font-semibold text-white block">Sub-Second Webhook Processing</strong>
                    <span className="text-xs text-[#a3a3a3]">
                      End-to-end processing latency under 400ms for incoming buyer messages.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#161a16] border border-[#283128] text-[#d4d4d8] mt-0.5">
                    <Check size={13} />
                  </div>
                  <div>
                    <strong className="text-xs font-semibold text-white block">HMAC-SHA256 Webhook Verification</strong>
                    <span className="text-xs text-[#a3a3a3]">
                      Authenticates every payload directly against Meta Cloud API security tokens.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#161a16] border border-[#283128] text-[#d4d4d8] mt-0.5">
                    <Check size={13} />
                  </div>
                  <div>
                    <strong className="text-xs font-semibold text-white block">Zero-Lockout Mobile Coexistence</strong>
                    <span className="text-xs text-[#a3a3a3]">
                      Store staff continue using their regular phone WhatsApp app without session drops.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-xl border border-[#242924] bg-[#121512] p-6 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-[#222722] mb-5">
                <span className="text-xs font-mono text-[#8f968f]">SYSTEM SPECIFICATIONS</span>
                <span className="text-xs font-mono text-[#d4d4d8]">PRODUCTION BENCHMARKS</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-lg bg-[#161a16] border border-[#232923]">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">Response Latency</span>
                  <div className="text-lg font-semibold text-white mt-1">&lt; 380ms</div>
                  <span className="text-[10px] text-[#a3a3a3]">99.8th percentile</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#161a16] border border-[#232923]">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">Order Accuracy</span>
                  <div className="text-lg font-semibold text-white mt-1">99.4%</div>
                  <span className="text-[10px] text-[#a3a3a3]">Address parsing</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#161a16] border border-[#232923]">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">Takeover Window</span>
                  <div className="text-lg font-semibold text-white mt-1">300s</div>
                  <span className="text-[10px] text-[#a3a3a3]">Auto-reset cooldown</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#161a16] border border-[#232923]">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">Ad Conversion</span>
                  <div className="text-lg font-semibold text-white mt-1">23.9%</div>
                  <span className="text-[10px] text-[#a3a3a3]">Click-to-order</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#161a16] border border-[#232923]">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">Bot Collision</span>
                  <div className="text-lg font-semibold text-white mt-1">0%</div>
                  <span className="text-[10px] text-[#a3a3a3]">Echo active verified</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#161a16] border border-[#232923]">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">System Uptime</span>
                  <div className="text-lg font-semibold text-white mt-1">99.98%</div>
                  <span className="text-[10px] text-[#a3a3a3]">24/7 operations</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#222722] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-[#a3a3a3]">
                  Ready to deploy a verified WhatsApp commerce assistant for your store?
                </span>
                <Link
                  href="/contact?project=herbcey-store-whatsapp-assistant"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#ff5a36] text-white text-xs font-semibold hover:bg-[#ff6f4e] transition-colors self-start sm:self-auto"
                >
                  Consult an Architect <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
