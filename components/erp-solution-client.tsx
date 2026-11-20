"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDot,
  ClipboardCheck,
  Clock,
  Coins,
  Cpu,
  Database,
  Download,
  Factory,
  FileCheck2,
  FileSpreadsheet,
  Globe,
  HardDrive,
  Headphones,
  HelpCircle,
  Layers,
  Lock,
  MessageSquare,
  Network,
  Package,
  PhoneCall,
  Printer,
  RefreshCw,
  ScanBarcode,
  Search,
  Server,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";

// ─── Module Data ─────────────────────────────────────────────────────────────

interface ErpModule {
  id: string;
  number: string;
  name: string;
  tagline: string;
  summary: string;
  metricLabel: string;
  metricValue: string;
  metricBadge: string;
  icon: React.ElementType;
  keyFeatures: string[];
  sriLankaContext: string;
  mockScreenTitle: string;
  mockScreenRows: Array<{ label: string; detail: string; status: string; statusType: "green" | "orange" | "blue" }>;
}

const erpModules: ErpModule[] = [
  {
    id: "inventory",
    number: "01",
    name: "Inventory & Warehouse (WMS)",
    tagline: "Total stock visibility across central warehouses and regional depots.",
    summary:
      "Eliminate inventory leakage, stock discrepancies, and blind spots. Real-time batch, serial, and bin tracking connected directly with physical barcode scanners and thermal printers.",
    metricLabel: "Inventory Accuracy",
    metricValue: "99.8%",
    metricBadge: "Sub-10ms Ledger Sync",
    icon: Boxes,
    keyFeatures: [
      "Multi-depot inventory tracking (Colombo central, Pettah wholesale, Kandy, Galle)",
      "Automated stock reorder points with minimum/maximum buffer triggers",
      "Batch, lot, and expiry date management with FIFO/FEFO automation",
      "Wireless barcode scanner integration & rapid stocktake auditing",
      "Damage, return, and inter-branch transit quarantine ledgers",
    ],
    sriLankaContext:
      "Engineered for Sri Lankan distribution hubs where outstation transit and fast Pettah wholesale movements require instant stock updates.",
    mockScreenTitle: "CENTRAL INVENTORY LEDGER / LIVE TELEMETRY",
    mockScreenRows: [
      { label: "Central Depot (Peliyagoda)", detail: "18,450 Units · 342 SKUs Active", status: "Optimal Stock", statusType: "green" },
      { label: "Pettah Wholesale Hub", detail: "4,200 Units · High Turnover", status: "Reorder Triggered", statusType: "orange" },
      { label: "Kandy Regional Outlet", detail: "2,840 Units · In Transit: 600", status: "Synced (12s ago)", statusType: "blue" },
      { label: "Quarantine / Inspection", detail: "42 Units awaiting QC release", status: "Under Review", statusType: "orange" },
    ],
  },
  {
    id: "pos",
    number: "02",
    name: "Multi-Branch POS & Retail Billing",
    tagline: "Sub-2-second cashier checkout with offline-first synchronization.",
    summary:
      "Keep customer queues moving even during network or power fluctuations. Cashier terminals process sales locally and sync seamlessly with head-office accounts the moment connectivity resumes.",
    metricLabel: "Average Checkout Speed",
    metricValue: "1.8 sec",
    metricBadge: "Offline-Resilient",
    icon: BarChart3,
    keyFeatures: [
      "Offline-first POS engine: continue cashier billing during Internet drops",
      "Barcode scanning, scale weighing, and dual-display customer screens",
      "Multi-tier pricing, festive discount matrices, and promotional bundles",
      "Split payments: Cash, Card, LankaQR, Koko, and Corporate credit accounts",
      "Centralized real-time daily sales, register opening/closing, and petty cash audits",
    ],
    sriLankaContext:
      "Built for retail reality in Sri Lanka: resilient against grid dropouts, supporting local payment schemes (LankaQR), and bilingual receipts.",
    mockScreenTitle: "ACTIVE CASHIER TERMINALS / BRANCH NETWORK",
    mockScreenRows: [
      { label: "Colombo Flagship — Terminal 01", detail: "LKR 1,240,500 Invoiced (284 bills)", status: "Active / Online", statusType: "green" },
      { label: "Colombo Flagship — Terminal 02", detail: "LKR 980,200 Invoiced (210 bills)", status: "Active / Online", statusType: "green" },
      { label: "Negombo Branch — Terminal 01", detail: "LKR 640,000 (Offline Buffer: 18 bills)", status: "Local Store Active", statusType: "blue" },
      { label: "Galle Branch — Terminal 01", detail: "LKR 810,400 Invoiced (195 bills)", status: "Active / Online", statusType: "green" },
    ],
  },
  {
    id: "procurement",
    number: "03",
    name: "Procurement & Supply Chain",
    tagline: "Automated vendor evaluation, purchase orders, and landed cost tracking.",
    summary:
      "Transform procurement from manual email chains into an automated, auditable approval pipeline. Compare vendor quotations, generate purchase orders, and record Goods Received Notes (GRN) with zero errors.",
    metricLabel: "Procurement Cycle Time",
    metricValue: "-42%",
    metricBadge: "Automated Approval",
    icon: ClipboardCheck,
    keyFeatures: [
      "Automated Purchase Requisition (PR) to Purchase Order (PO) workflow",
      "Supplier quotation comparison matrices with historical price analytics",
      "Comprehensive Goods Received Note (GRN) and automated 3-way matching",
      "Import shipment tracking with customs duty, clearance, and landed cost calculation",
      "Supplier performance scorecards (lead time, defect rate, price adherence)",
    ],
    sriLankaContext:
      "Calculates true landed cost including Sri Lanka Customs tariffs, port handling charges, and exchange rate variations for imported goods.",
    mockScreenTitle: "PURCHASE ORDERS & VENDOR APPROVAL PIPELINE",
    mockScreenRows: [
      { label: "PO-2026-884 (Packaging Material)", detail: "LKR 1,850,000 · Supplier: TL Packing", status: "Approved / Dispatched", statusType: "green" },
      { label: "PO-2026-885 (Electronic Components)", detail: "USD 14,200 · Sea Freight Shipment", status: "Customs Clearing", statusType: "blue" },
      { label: "PO-2026-886 (FMCG Raw Inventory)", detail: "LKR 3,420,000 · Director Approval", status: "Pending Review", statusType: "orange" },
      { label: "GRN-9021 (Warehouse Bay 02)", detail: "500 units inspected & verified", status: "Ledger Updated", statusType: "green" },
    ],
  },
  {
    id: "vansales",
    number: "04",
    name: "Van-Sales & Distribution (DMS)",
    tagline: "Empower field sales reps with real-time mobile order and credit management.",
    summary:
      "Equip van-sales drivers and field representatives with an Android/iOS mobile ERP app. Issue on-the-spot mobile invoices, check customer credit limits, collect cheques, and reconcile truck inventory at end-of-day.",
    metricLabel: "Daily Field Efficiency",
    metricValue: "+35%",
    metricBadge: "Live GPS & Invoicing",
    icon: Truck,
    keyFeatures: [
      "Mobile van-sale billing: print thermal receipts directly from portable Bluetooth printers",
      "Customer outstanding balance & credit limit enforcement in the field",
      "Cheque collection recording with return-cheque alerts and receipt dispatch",
      "GPS route planning, store visit check-ins, and outstation territory mapping",
      "Evening van stock reconciliation: zero-discrepancy inventory returns",
    ],
    sriLankaContext:
      "Designed specifically for Sri Lankan distribution models where route sales reps handle wholesale credit terms and post-dated cheques.",
    mockScreenTitle: "FLEET DISPATCH & VAN-SALES ROUTE DASHBOARD",
    mockScreenRows: [
      { label: "Van 04 — Colombo / Kelaniya Route", detail: "Rep: Kamal P. · Invoiced: LKR 480,000", status: "Route 78% Done", statusType: "green" },
      { label: "Van 07 — Kandy / Kurunegala Route", detail: "Rep: Nimal S. · Invoiced: LKR 620,000", status: "Route 64% Done", statusType: "green" },
      { label: "Van 12 — Southern Coastal Route", detail: "Rep: Asanka D. · Cheques: LKR 310,000", status: "Reconciling EOD", statusType: "blue" },
      { label: "Stock Discrepancy Alert", detail: "Van 02 · 1 unit carton unverified", status: "Audit Flagged", statusType: "orange" },
    ],
  },
  {
    id: "accounting",
    number: "05",
    name: "Financial Accounting & Tax Compliance",
    tagline: "Automated general ledger, accounts, and Sri Lankan VAT/SVAT schedules.",
    summary:
      "Stop spending weeks closing month-end accounts. Transactions from sales, inventory, and procurement automatically flow into double-entry ledgers with built-in Sri Lankan Inland Revenue (IRD) compliance.",
    metricLabel: "Month-End Close Time",
    metricValue: "2 Days",
    metricBadge: "RAMIS / IRD Ready",
    icon: Coins,
    keyFeatures: [
      "Real-time double-entry general ledger, balance sheet, and automated profit & loss",
      "Sri Lankan statutory tax automation: VAT schedules, SVAT vouchers, and WHT tracking",
      "Automated bank statement reconciliation for Commercial Bank, Sampath, HNB, and BOC",
      "Aging accounts receivable (AR) and payable (AP) with automated WhatsApp payment nudges",
      "Cost-center and branch-level profitability analysis with multi-currency handling",
    ],
    sriLankaContext:
      "100% aligned with Sri Lankan tax regulations, providing export-ready RAMIS schedule files for hassle-free tax filing.",
    mockScreenTitle: "FINANCIAL LEDGER & STATUTORY TAX CONSOLE",
    mockScreenRows: [
      { label: "General Ledger Balance", detail: "Assets: LKR 142.8M · Balanced", status: "Audit Verified", statusType: "green" },
      { label: "Monthly VAT / SVAT Schedule", detail: "Input VAT vs Output VAT Net: OK", status: "Ready for RAMIS", statusType: "green" },
      { label: "Overdue Receivables (>60 Days)", detail: "4 Corporate accounts flagged", status: "WhatsApp Nudge Sent", statusType: "orange" },
      { label: "Bank Reconciliation (ComBank)", detail: "98.4% auto-matched with bank feed", status: "Synced Today", statusType: "blue" },
    ],
  },
  {
    id: "hr",
    number: "06",
    name: "HR, Payroll & Attendance",
    tagline: "EPF/ETF compliance, biometric clock-in, and automated digital payslips.",
    summary:
      "Unify workforce management with your ERP operations. Automatically calculate salaries, overtime (OT), late deductions, and statutory EPF/ETF contributions while dispatching payslips directly via WhatsApp.",
    metricLabel: "Payroll Processing Time",
    metricValue: "15 min",
    metricBadge: "100% EPF/ETF Compliant",
    icon: Users,
    keyFeatures: [
      "Sri Lankan statutory payroll: EPF (8% employee + 12% employer) & ETF (3% employer)",
      "Biometric fingerprint and facial recognition attendance terminal integration",
      "Shift allowances, overtime (OT) formulas, Poya and public holiday premium calculations",
      "Leave approval workflows, balance tracking, and medical certificates management",
      "Automated confidential PDF payslip generation with direct WhatsApp & email delivery",
    ],
    sriLankaContext:
      "Pre-configured with Sri Lankan labor laws, Shop & Office Act rules, statutory holidays, and commercial bank payroll file exports.",
    mockScreenTitle: "MONTHLY PAYROLL & ATTENDANCE AUDIT",
    mockScreenRows: [
      { label: "Active Staff Headcount", detail: "148 Employees across 5 locations", status: "Clocked In: 142", statusType: "green" },
      { label: "EPF/ETF Statutory Ledger", detail: "Form C formatted & CRIB checked", status: "Compliance OK", statusType: "green" },
      { label: "Overtime (OT) Verification", detail: "320 OT hours verified by supervisors", status: "Approved", statusType: "green" },
      { label: "Digital Payslip Dispatch", detail: "148 Encrypted PDFs queued", status: "Ready to Dispatch", statusType: "blue" },
    ],
  },
];

// ─── Comparison Data ─────────────────────────────────────────────────────────

const comparisonRows = [
  {
    feature: "Software Ownership & Intellectual Property",
    creativeX: "100% Perpetual IP Ownership. You own the source code and database.",
    cots: "Rented. Zero ownership; you lose access if subscription halts.",
    advantage: true,
  },
  {
    feature: "Per-User / Per-Seat License Fees",
    creativeX: "LKR 0 (Zero). Add 10, 50, or 500 staff members without penalty.",
    cots: "$60 to $150 per user/month. Expenses surge as you grow.",
    advantage: true,
  },
  {
    feature: "Sri Lankan Tax Compliance (VAT, SVAT, EPF)",
    creativeX: "Native IRD / RAMIS schedules built-in from Day 1.",
    cots: "Foreign systems require complex, expensive localization add-ons.",
    advantage: true,
  },
  {
    feature: "Workflow & Interface Tailoring",
    creativeX: "100% engineered to match your operational reality.",
    cots: "Rigid structure; forces your team to change how they do business.",
    advantage: true,
  },
  {
    feature: "Hardware & Offline POS Resilience",
    creativeX: "Operates offline during power/net drops; syncs when restored.",
    cots: "Pure cloud COTS locks cashiers out when connectivity drops.",
    advantage: true,
  },
  {
    feature: "Local Support & Emergency SLA",
    creativeX: "Dedicated Colombo engineering squad; on-site and phone support.",
    cots: "Remote ticket queues or outsourced third-party partners.",
    advantage: true,
  },
];

// ─── FAQs ───────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Why should a Sri Lankan company choose custom ERP over SAP, NetSuite, or Odoo?",
    a: "Commercial off-the-shelf (COTS) ERP software imposes heavy ongoing costs: monthly per-user licensing ($60–$150/user), mandatory annual maintenance fees, and expensive customization contracts whenever your workflows change. Furthermore, foreign software is not designed for Sri Lankan realities—such as local VAT/SVAT schedules, van-sales credit cycles, and offline-first POS requirements. Creativex Technology provides 100% intellectual property ownership, zero recurring seat fees, and a platform engineered precisely around your business differentiators.",
  },
  {
    q: "How does Creativex Technology ERP handle Sri Lankan VAT, SVAT, and statutory taxes?",
    a: "Our accounting module is engineered specifically for Sri Lankan Inland Revenue Department (IRD) regulations. It automatically categorizes input/output VAT, generates RAMIS-compliant tax schedules, manages SVAT credit vouchers, and tracks Withholding Tax (WHT). Tax rate adjustments can be updated in seconds via system configuration without hiring expensive consultants.",
  },
  {
    q: "Can our cashiers continue billing if the Internet or power drops?",
    a: "Yes. Retail outlets in Sri Lanka require offline resilience. Creativex Technology POS terminals utilize an offline-first architecture. If your Internet connection drops, cashiers continue scanning barcodes, calculating totals, and printing receipts locally. The second connection restores, the local transaction buffer automatically synchronizes with the head office cloud database.",
  },
  {
    q: "What is the typical implementation timeline for a Creativex Technology ERP project?",
    a: "We deploy using an agile, phased modular methodology. Core modules (Inventory, Multi-Branch Billing, and Basic Accounting) typically go live within 8 to 12 weeks. Subsequent modules (Van-Sales, Procurement, HR/Payroll) rollout in planned 2-to-4 week sprints, ensuring zero disruption to your daily trading operations.",
  },
  {
    q: "How do you migrate our historical data from Excel or older legacy software?",
    a: "Our data engineering squad manages the entire migration pipeline. We extract, sanitize, deduplicate, and validate your existing customer registries, vendor ledgers, opening stock counts, and chart of accounts. We perform dry-run migrations in staging environments to verify financial balances before production cutover.",
  },
  {
    q: "Who owns the software source code and data?",
    a: "You do. Under our bespoke enterprise contracts, your organization owns 100% of the deployed software intellectual property, database schemas, and proprietary code. You can host the system on your own private cloud (AWS, Azure, Google Cloud) or on-premise local servers.",
  },
];

export function ErpSolutionClient() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [userCount, setUserCount] = useState(30);
  const [branchCount, setBranchCount] = useState(3);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeIndustry, setActiveIndustry] = useState<"wholesale" | "retail" | "manufacturing" | "logistics">("wholesale");

  const currentModule = erpModules.find((m) => m.id === activeTab) || erpModules[0];
  const ModuleIcon = currentModule.icon;

  // ── Cost & ROI Calculator Math ──
  // Typical COTS SaaS: $85/user/month * 12 = $1020/user/year. In LKR @ 310 = ~LKR 316,000/user/year.
  // 5 Years COTS per-user fees = userCount * 316,000 * 5
  // COTS implementation & maintenance = LKR 4,500,000 + (branchCount * 600,000)
  // Creativex Technology Custom ERP: One-time build (~LKR 4.5M - 8M depending on scale) + modest hosting (~LKR 35,000/mo)
  const cotsFiveYearCost = Math.round(userCount * 316000 * 5 + 4500000 + branchCount * 650000);
  const creativeXFiveYearCost = Math.round(5500000 + branchCount * 450000 + 35000 * 60);
  const estimatedSavingsLkr = Math.max(0, cotsFiveYearCost - creativeXFiveYearCost);
  const paybackMonths = Math.min(18, Math.max(6, Math.round((creativeXFiveYearCost / (cotsFiveYearCost / 60)) * 0.75)));

  return (
    <div className="erp-page-wrapper">
      {/* ── 1. Hero Section with Live System Telemetry ── */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#1e241e]">
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e241e_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="site-width relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff5a36]/10 border border-[#ff5a36]/30 mb-6">
                <Layers className="w-3.5 h-3.5 text-[#ff5a36]" />
                <span className="text-[11px] font-mono font-semibold tracking-wider text-[#ff5a36] uppercase">
                  Custom ERP Architecture · Sri Lanka
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-6">
                Custom ERP Solutions in Sri Lanka <br />
                <span className="text-[#a5aaa5] text-2xl sm:text-3xl lg:text-4xl font-normal">
                  Zero Per-Seat Licenses. 100% Operational Fit.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#a5aaa5] leading-relaxed mb-8 max-w-2xl">
                Replace rigid foreign software and fragile spreadsheets with a bespoke Enterprise Resource Planning platform. Built around Sri Lankan business realities—connecting multi-warehouse inventory, rapid POS cashier billing, field van sales, and automated IRD VAT/SVAT compliance.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#ff5a36] text-white px-6 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#e04826] transition-all shadow-lg shadow-[#ff5a36]/20"
                >
                  Schedule an Architecture Audit <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#calculator"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#2a302a] bg-[#121512] text-sm font-medium text-white hover:border-[#ff5a36]/50 hover:bg-[#181c18] transition-all"
                >
                  <Coins className="w-4 h-4 text-[#ff5a36]" />
                  Calculate 5-Year ROI Savings
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1e241e] text-xs text-[#8c928c]">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-[#ff5a36] shrink-0" />
                  <span>100% Source Code Ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-[#ff5a36] shrink-0" />
                  <span>RAMIS / VAT / SVAT Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-[#ff5a36] shrink-0" />
                  <span>Local Colombo SLA Support</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Real-time Telemetry Card */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#222822] bg-[#0d100d] p-6 shadow-2xl relative">
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-4 border-b border-[#1e241e] mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-semibold text-white tracking-wider uppercase flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#ff5a36]" />
                      CREATIVEX ENTERPRISE ENGINE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e241e] text-[#a5aaa5]">
                    PROD / v4.2.0
                  </span>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3.5 rounded-lg bg-[#121612] border border-[#1e241e]">
                    <span className="text-[11px] text-[#8c928c] block mb-1">Annual User License Drain</span>
                    <strong className="text-xl font-bold text-white font-mono">LKR 0</strong>
                    <span className="text-[10px] text-[#8c928c] block mt-0.5">vs LKR 4.8M on COTS</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#121612] border border-[#1e241e]">
                    <span className="text-[11px] text-[#8c928c] block mb-1">Central Ledger Latency</span>
                    <strong className="text-xl font-bold text-white font-mono">&lt; 8.4 ms</strong>
                    <span className="text-[10px] text-[#ff5a36] block mt-0.5">Sub-second updates</span>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="space-y-2.5 mb-5 text-xs">
                  <div className="p-2.5 rounded-md bg-[#141814] border border-[#1e241e] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Boxes className="w-3.5 h-3.5 text-[#ff5a36]" />
                      <span className="text-white">Pettah Wholesale Depot</span>
                    </div>
                    <span className="text-[#d4d4d8] font-mono text-[11px]">Stock Synced (4s ago)</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-[#141814] border border-[#1e241e] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-[#ff5a36]" />
                      <span className="text-white">Negombo Outlet POS 01</span>
                    </div>
                    <span className="text-[#3b82f6] font-mono text-[11px]">Offline Buffer: 0 pending</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-[#141814] border border-[#1e241e] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="w-3.5 h-3.5 text-[#ff5a36]" />
                      <span className="text-white">Monthly VAT / SVAT Returns</span>
                    </div>
                    <span className="text-[#d4d4d8] font-mono text-[11px]">Schedule Verified</span>
                  </div>
                </div>

                {/* Direct Action Link */}
                <a
                  href="#modules"
                  className="w-full py-2.5 rounded-lg border border-[#2a302a] bg-[#151915] text-xs font-semibold text-center text-[#ff5a36] hover:bg-[#1a201a] block transition-colors"
                >
                  Explore All 6 Enterprise Modules ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. The Core Problem & AEO Answer Statement ── */}
      <section className="py-16 bg-[#090b09] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-[#ff5a36] font-bold block mb-3">
              The Strategic Decision
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-6">
              Why Sri Lankan enterprises outgrow generic off-the-shelf ERP packages.
            </h2>
            <p className="text-base text-[#a5aaa5] leading-relaxed mb-6">
              Most businesses implement generic software like SAP Business One, NetSuite, or Odoo hoping for an easy fix. Within six months, they discover that every small operational tweak requires expensive external developer tickets, per-seat monthly license fees escalate rapidly as teams expand, and cashiers get locked out during local Internet drops.
            </p>
            <p className="text-base text-[#a5aaa5] leading-relaxed">
              <strong>Creativex Technology builds custom ERP software as a perpetual corporate asset.</strong> You pay for engineering milestones once, retain 100% intellectual property rights, and run scalable operations without continuous software taxes.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Interactive 6-Module Operational Explorer ── */}
      <section id="modules" className="py-20 bg-[#0c0e0c] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="section-index">Enterprise Modules / 01—06</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Modular Enterprise Architecture
              </h2>
            </div>
            <p className="text-sm text-[#8c928c] max-w-md mt-2 md:mt-0">
              Select an operational domain below to inspect live workflow interfaces, real data schemas, and local compliance capabilities.
            </p>
          </div>

          {/* Module Selector Tab Strip */}
          <div className="flex flex-wrap gap-2.5 mb-8 p-1.5 rounded-xl bg-[#121512] border border-[#1e241e]">
            {erpModules.map((m) => {
              const Icon = m.icon;
              const isActive = activeTab === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#ff5a36] text-white shadow-md shadow-[#ff5a36]/20"
                      : "text-[#a5aaa5] hover:text-white hover:bg-[#1a1f1a]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{m.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Module Live Display Card */}
          <div className="rounded-xl border border-[#222822] bg-[#0e110e] p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Details & Capabilities */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#ff5a36]/10 border border-[#ff5a36]/30 flex items-center justify-center">
                    <ModuleIcon className="w-5 h-5 text-[#ff5a36]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#ff5a36] font-semibold">
                      MODULE {currentModule.number} / 06
                    </span>
                    <h3 className="text-xl font-bold text-white">{currentModule.name}</h3>
                  </div>
                </div>

                <p className="text-sm text-[#ff5a36] font-medium mb-3">{currentModule.tagline}</p>
                <p className="text-sm text-[#a5aaa5] leading-relaxed mb-6">{currentModule.summary}</p>

                {/* Key Capabilities Checklist */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-white font-semibold mb-3">
                    Engineered Capabilities
                  </h4>
                  <ul className="space-y-2.5">
                    {currentModule.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#c5cbc5]">
                        <Check className="w-3.5 h-3.5 text-[#ff5a36] mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sri Lanka Operational Context Badge */}
                <div className="p-3.5 rounded-lg bg-[#141814] border border-[#222a22] text-xs text-[#a0a5a0] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#ff5a36] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white block mb-0.5">Sri Lanka Operational Reality:</strong>
                    <span>{currentModule.sriLankaContext}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Mock Telemetry Screen */}
              <div className="lg:col-span-5">
                <div className="rounded-lg border border-[#262c26] bg-[#080a08] p-5 shadow-xl">
                  {/* Mock Screen Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e241e] mb-4">
                    <span className="text-[10px] font-mono text-[#8c928c] uppercase tracking-wider">
                      {currentModule.mockScreenTitle}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#d4d4d8] px-2 py-0.5 rounded bg-[#141814] border border-[#222822]">
                      <Check className="w-3 h-3 text-[#ff5a36]" />
                      PRODUCTION ACTIVE
                    </span>
                  </div>

                  {/* Highlight Stat Pill */}
                  <div className="p-3 rounded-lg bg-[#111511] border border-[#1e241e] mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8c928c] block">{currentModule.metricLabel}</span>
                      <strong className="text-lg font-mono text-white font-bold">{currentModule.metricValue}</strong>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#ff5a36]/15 text-[#ff5a36] font-semibold">
                      {currentModule.metricBadge}
                    </span>
                  </div>

                  {/* Rows */}
                  <div className="space-y-2 mb-4">
                    {currentModule.mockScreenRows.map((row, i) => (
                      <div key={i} className="p-2.5 rounded bg-[#0f120f] border border-[#1a1f1a] text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-white text-[11px]">{row.label}</span>
                          <span
                            className={`font-mono text-[10px] font-medium ${
                              row.statusType === "green"
                                ? "text-[#ff5a36]"
                                : row.statusType === "orange"
                                ? "text-[#f59e0b]"
                                : "text-[#3b82f6]"
                            }`}
                          >
                            {row.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#8c928c]">{row.detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-3 border-t border-[#1a1f1a] flex items-center justify-between text-[11px]">
                    <span className="text-[#8c928c]">Deployable as a standalone module</span>
                    <Link href="/contact" className="text-[#ff5a36] font-semibold hover:underline flex items-center gap-1">
                      Request Module Demo <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Interactive 5-Year ERP Cost & ROI Savings Calculator ── */}
      <section id="calculator" className="py-20 bg-[#090b09] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-3xl mb-12">
            <p className="section-index">Financial Transparency &amp; TCO</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              5-Year ERP Cost &amp; ROI Calculator
            </h2>
            <p className="text-sm text-[#8c928c]">
              See how much your organization will save by commissioning custom ERP software rather than paying recurring monthly per-user license fees to foreign vendors like SAP, NetSuite, or Odoo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls Card */}
            <div className="lg:col-span-6 rounded-xl border border-[#222822] bg-[#0e110e] p-6 sm:p-8">
              <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#ff5a36]" />
                Adjust Your Enterprise Parameters
              </h3>

              {/* Slider 1: Active System Users */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white">Active System Users</label>
                  <span className="text-base font-mono font-bold text-[#ff5a36]">{userCount} Users</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={userCount}
                  onChange={(e) => setUserCount(Number(e.target.value))}
                  className="w-full accent-[#ff5a36] bg-[#1a1f1a] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8c928c] mt-1 font-mono">
                  <span>5 Users (Small Business)</span>
                  <span>50 Users (Mid SME)</span>
                  <span>150+ (Enterprise)</span>
                </div>
              </div>

              {/* Slider 2: Outlets / Warehouses */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white">Physical Outlets &amp; Warehouses</label>
                  <span className="text-base font-mono font-bold text-[#ff5a36]">{branchCount} Locations</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={branchCount}
                  onChange={(e) => setBranchCount(Number(e.target.value))}
                  className="w-full accent-[#ff5a36] bg-[#1a1f1a] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8c928c] mt-1 font-mono">
                  <span>1 Location</span>
                  <span>10 Locations</span>
                  <span>25+ Depots</span>
                </div>
              </div>

              {/* What This Includes */}
              <div className="pt-6 border-t border-[#1e241e] space-y-2 text-xs text-[#8c928c]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>Includes all 6 operational modules + custom database schema</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>Unlimited cashier terminal connections without extra charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>100% Perpetual code ownership with zero annual seat inflation</span>
                </div>
              </div>
            </div>

            {/* Right Financial Results Card */}
            <div className="lg:col-span-6 rounded-xl border border-[#2a342a] bg-[#101410] p-6 sm:p-8 shadow-2xl">
              <span className="text-[11px] font-mono font-semibold text-[#ff5a36] uppercase tracking-wider block mb-2">
                ESTIMATED 5-YEAR FINANCIAL IMPACT
              </span>
              <h3 className="text-2xl font-bold text-white mb-6">Total Cost of Ownership Comparison</h3>

              <div className="space-y-4 mb-8">
                {/* Generic COTS ERP Cost */}
                <div className="p-4 rounded-lg bg-[#151915] border border-[#222822]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#a5aaa5]">Generic Off-The-Shelf ERP (SAP / NetSuite / Odoo)</span>
                    <span className="text-[11px] text-[#f59e0b] font-mono">Per-Seat Tax</span>
                  </div>
                  <strong className="text-2xl font-mono text-white">
                    LKR {(cotsFiveYearCost / 1000000).toFixed(1)} Million
                  </strong>
                  <p className="text-[10px] text-[#8c928c] mt-1">
                    Based on ~$85/user/mo + mandatory annual maintenance + multi-branch fees.
                  </p>
                </div>

                {/* Creativex Technology Custom ERP Cost */}
                <div className="p-4 rounded-lg bg-[#141b14] border border-[#253525]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#ff5a36] font-semibold">Creativex Technology Bespoke Enterprise ERP</span>
                    <span className="text-[11px] text-[#ff5a36] font-mono font-bold">100% IP Asset</span>
                  </div>
                  <strong className="text-2xl font-mono text-[#ff5a36]">
                    LKR {(creativeXFiveYearCost / 1000000).toFixed(1)} Million
                  </strong>
                  <p className="text-[10px] text-[#8c928c] mt-1">
                    One-time milestone build + standard cloud infrastructure + zero per-user seat fees.
                  </p>
                </div>
              </div>

              {/* Total 5-Year Savings Highlight Box */}
              <div className="p-5 rounded-xl bg-[#121712] border border-[#263126] mb-6 text-center">
                <span className="text-xs font-mono font-semibold text-[#ff5a36] uppercase tracking-widest block mb-1">
                  PROJECTED 5-YEAR BOTTOM-LINE SAVINGS
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-black text-white mb-2">
                  LKR {(estimatedSavingsLkr / 1000000).toFixed(1)}M+
                </div>
                <p className="text-xs text-[#c5cbc5]">
                  Estimated investment break-even reached in approximately{" "}
                  <strong className="text-white">{paybackMonths} months</strong>.
                </p>
              </div>

              <Link
                href="/contact"
                className="w-full py-3.5 rounded-lg bg-[#ff5a36] text-white text-sm font-semibold text-center hover:bg-[#e04826] transition-all block"
              >
                Request a Custom Scope &amp; Commercial Proposal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Technical Architecture Comparison Table ── */}
      <section className="py-20 bg-[#0c0e0c] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-3xl mb-12">
            <p className="section-index">Architecture Breakdown</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Creativex Technology Custom ERP vs. Generic Off-The-Shelf Software
            </h2>
            <p className="text-sm text-[#8c928c]">
              An honest architectural comparison covering IP ownership, software licensing, customization freedom, local tax adaptation, and real support availability.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#222822] bg-[#0e110e]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#222822] bg-[#121612] text-white">
                  <th className="p-4 sm:p-5 font-bold">Key Architectural Criteria</th>
                  <th className="p-4 sm:p-5 font-bold text-[#ff5a36] bg-[#ff5a36]/10 border-x border-[#ff5a36]/20">
                    Creativex Technology Custom ERP (Sri Lanka)
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-[#8c928c]">
                    Generic COTS (SAP B1 / NetSuite / Odoo)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e241e] text-[#a5aaa5]">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-[#121512] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-white bg-[#ff5a36]/5 border-x border-[#ff5a36]/20 font-medium">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#ff5a36] shrink-0 mt-0.5" />
                        <span>{row.creativeX}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-[#8c928c]">{row.cots}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 6. Industry-Specific Operating Blueprints ── */}
      <section className="py-20 bg-[#090b09] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-3xl mb-12">
            <p className="section-index">Industry Blueprints / Sri Lanka</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Engineered for Your Specific Industry Vertical
            </h2>
            <p className="text-sm text-[#8c928c]">
              We do not impose a single generic template. Each ERP deployment is customized for the operational workflows of your exact sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Industry 1: Wholesale & FMCG Distribution */}
            <div className="p-6 rounded-xl border border-[#222822] bg-[#0e110e] hover:border-[#ff5a36]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#ff5a36]/10 border border-[#ff5a36]/30 flex items-center justify-center mb-4">
                  <Truck className="w-4 h-4 text-[#ff5a36]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Wholesale &amp; FMCG Distribution</h3>
                <p className="text-xs text-[#8c928c] leading-relaxed mb-4">
                  Optimized for fast-paced Pettah wholesale markets and regional route sales. Manages post-dated cheques, return handling, credit limits, and driver inventory balancing.
                </p>
                <ul className="text-xs text-[#c5cbc5] space-y-1.5 mb-6">
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Van sales Android app</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Cheque return tracking</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Credit aging enforcement</li>
                </ul>
              </div>
              <Link href="/solutions#retail-distribution" className="text-xs font-semibold text-[#ff5a36] hover:underline inline-flex items-center gap-1">
                View Distribution Blueprint <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Industry 2: Multi-Branch Retail & Supermarkets */}
            <div className="p-6 rounded-xl border border-[#222822] bg-[#0e110e] hover:border-[#ff5a36]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#ff5a36]/10 border border-[#ff5a36]/30 flex items-center justify-center mb-4">
                  <Building2 className="w-4 h-4 text-[#ff5a36]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Multi-Store Retail Chains</h3>
                <p className="text-xs text-[#8c928c] leading-relaxed mb-4">
                  Connect 5 to 50+ retail outlets with sub-2-second POS cashier checkouts, central warehouse automated replenishment, and multi-branch inventory transfers.
                </p>
                <ul className="text-xs text-[#c5cbc5] space-y-1.5 mb-6">
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Offline-first POS cashiers</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Inter-branch transit audits</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> LankaQR &amp; card integration</li>
                </ul>
              </div>
              <Link href="/solutions#retail-distribution" className="text-xs font-semibold text-[#ff5a36] hover:underline inline-flex items-center gap-1">
                View Retail Blueprint <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Industry 3: Manufacturing & Assembly */}
            <div className="p-6 rounded-xl border border-[#222822] bg-[#0e110e] hover:border-[#ff5a36]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#ff5a36]/10 border border-[#ff5a36]/30 flex items-center justify-center mb-4">
                  <Factory className="w-4 h-4 text-[#ff5a36]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Manufacturing &amp; Packaging</h3>
                <p className="text-xs text-[#8c928c] leading-relaxed mb-4">
                  Multi-level Bill of Materials (BOM), scrap and wastage logging, machine capacity scheduling, and batch quality tracking for plastics, tea, and apparel producers.
                </p>
                <ul className="text-xs text-[#c5cbc5] space-y-1.5 mb-6">
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Dynamic BOM calculations</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Production batch routing</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Quality control gates</li>
                </ul>
              </div>
              <Link href="/solutions#export-logistics" className="text-xs font-semibold text-[#ff5a36] hover:underline inline-flex items-center gap-1">
                View Manufacturing Blueprint <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Industry 4: Export & Logistics */}
            <div className="p-6 rounded-xl border border-[#222822] bg-[#0e110e] hover:border-[#ff5a36]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#ff5a36]/10 border border-[#ff5a36]/30 flex items-center justify-center mb-4">
                  <Globe className="w-4 h-4 text-[#ff5a36]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Export Logistics &amp; Port Cargo</h3>
                <p className="text-xs text-[#8c928c] leading-relaxed mb-4">
                  Container loading plans, multi-currency invoicing (USD/EUR/LKR), shipping customs documentation, freight forwarding ledgers, and port clearance milestone tracking.
                </p>
                <ul className="text-xs text-[#c5cbc5] space-y-1.5 mb-6">
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Multi-currency foreign accounts</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Customs &amp; BL documentation</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#ff5a36]" /> Demurrage risk warnings</li>
                </ul>
              </div>
              <Link href="/solutions#export-logistics" className="text-xs font-semibold text-[#ff5a36] hover:underline inline-flex items-center gap-1">
                View Logistics Blueprint <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Implementation Roadmap: Blueprint to Go-Live in 8–12 Weeks ── */}
      <section className="py-20 bg-[#0c0e0c] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-3xl mb-12">
            <p className="section-index">Disciplined Delivery / 5 Phases</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              From Blueprint to Production Go-Live in 8–12 Weeks
            </h2>
            <p className="text-sm text-[#8c928c]">
              We eliminate implementation delays through disciplined sprint execution, weekly live milestones, and direct collaboration with your operational staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 rounded-xl border border-[#222822] bg-[#0e110e]">
              <span className="text-xs font-mono font-bold text-[#ff5a36] block mb-2">WEEKS 1–2</span>
              <h3 className="text-sm font-bold text-white mb-2">01. Discovery &amp; Schema Mapping</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                On-site workflow audit in Colombo/depots. We map your chart of accounts, tax categories, and warehouse layouts.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[#222822] bg-[#0e110e]">
              <span className="text-xs font-mono font-bold text-[#ff5a36] block mb-2">WEEKS 3–6</span>
              <h3 className="text-sm font-bold text-white mb-2">02. Core Engine Build &amp; Cleanse</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                We engineer the database, inventory ledger, and billing pipeline while migrating and sanitizing your historical data.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[#222822] bg-[#0e110e]">
              <span className="text-xs font-mono font-bold text-[#ff5a36] block mb-2">WEEKS 7–8</span>
              <h3 className="text-sm font-bold text-white mb-2">03. Hardware &amp; API Integration</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                Connecting barcode scanners, thermal receipt printers, mobile van-sales apps, and WhatsApp Business notifications.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[#222822] bg-[#0e110e]">
              <span className="text-xs font-mono font-bold text-[#ff5a36] block mb-2">WEEKS 9–10</span>
              <h3 className="text-sm font-bold text-white mb-2">04. Parallel Run &amp; Training</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                Hands-on cashier and staff training. We run parallel operations alongside legacy systems to verify financial parity.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[#222822] bg-[#0e110e] border-[#ff5a36]/40 bg-[#141814]">
              <span className="text-xs font-mono font-bold text-[#ff5a36] block mb-2">WEEK 11+</span>
              <h3 className="text-sm font-bold text-white mb-2">05. Production Go-Live &amp; SLA</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                Full system cutover with dedicated on-site engineering presence and 24/7 emergency response SLA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Interactive FAQ Accordion (AEO/GEO) ── */}
      <section className="py-20 bg-[#090b09] border-b border-[#1e241e]">
        <div className="site-width max-w-4xl">
          <div className="mb-12">
            <p className="section-index">Knowledge &amp; FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Frequently Asked Questions on ERP in Sri Lanka
            </h2>
            <p className="text-sm text-[#8c928c]">
              Direct, transparent answers regarding costs, data migration, tax compliance, and source code ownership.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#222822] bg-[#0e110e] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#121612] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white flex items-center gap-3">
                      <span className="text-xs font-mono text-[#ff5a36]">0{idx + 1}.</span>
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#ff5a36] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8c928c] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#a5aaa5] leading-relaxed border-t border-[#1a1f1a]">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. Final High-Impact Conversion CTA ── */}
      <section className="py-20 bg-[#0c0e0c]">
        <div className="site-width">
          <div className="rounded-2xl border border-[#2e382e] bg-gradient-to-br from-[#121812] via-[#0d120d] to-[#0a0d0a] p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5a36]/15 text-[#ff5a36] border border-[#ff5a36]/30 text-xs font-mono font-semibold mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>COLOMBO ARCHITECTURE DISCOVERY SESSION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to replace software fees with a permanent enterprise asset?
            </h2>

            <p className="text-sm sm:text-base text-[#a5aaa5] max-w-2xl mx-auto mb-8 leading-relaxed">
              Schedule a 45-minute technical discovery session with our senior ERP architects in Rajagiriya, Colombo. We will audit your current workflow bottlenecks, estimate your 5-year savings, and provide an executable architecture roadmap.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#ff5a36] text-white px-8 py-4 rounded-lg text-sm font-bold hover:bg-[#e04826] transition-all shadow-xl shadow-[#ff5a36]/25"
              >
                Schedule Technical Discovery <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:0762345336"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border border-[#2a342a] bg-[#141a14] text-sm font-semibold text-white hover:border-[#ff5a36]/50 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#ff5a36]" />
                Call Directly: 076 2345 336
              </a>
            </div>

            <p className="text-xs text-[#8c928c] mt-6">
              Strict NDA guaranteed. No generic sales decks—speak directly with engineering leads.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

