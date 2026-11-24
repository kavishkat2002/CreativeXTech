"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppWindow,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Binary,
  Blocks,
  Bot,
  BrainCircuit,
  Bug,
  Calculator,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Cloud,
  CloudCog,
  Code2,
  Coins,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Globe2,
  HardDrive,
  Layers,
  LayoutGrid,
  Lock,
  MessageSquare,
  Network,
  PhoneCall,
  Rocket,
  Scale,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Terminal,
  Timer,
  Users2,
  Workflow,
  Zap,
} from "lucide-react";

import { SiteFooter } from "@/components/site-header";

interface SoftwareDomain {
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
  techStack: string[];
  mockScreenTitle: string;
  mockScreenRows: Array<{ label: string; detail: string; status: string; statusType: "success" | "orange" | "blue" }>;
}

const softwareDomains: SoftwareDomain[] = [
  {
    id: "web",
    number: "01",
    name: "Enterprise Web Applications & Portals",
    tagline: "Sub-second page speeds, high concurrency, and resilient cloud architectures.",
    summary:
      "We design and build bespoke web platforms, customer self-service portals, internal operational tools, and commercial dashboards using Next.js, React, Node.js, and TypeScript. Optimized for high transactional throughput and zero performance degradation.",
    metricLabel: "Core Web Vitals Target",
    metricValue: "99 / 100",
    metricBadge: "Sub-50ms TTFB",
    icon: AppWindow,
    keyFeatures: [
      "Server-Side Rendering (SSR) & Edge API routes for lightning-fast loads",
      "Role-Based Access Control (RBAC) with granular permission trees",
      "Real-time WebSocket data updates & reactive dashboard visualization",
      "Responsive, touch-optimized interfaces engineered for mobile & desktop",
      "Strict OWASP Top 10 security hardening & CSRF/XSS protection",
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Node.js", "Redis"],
    mockScreenTitle: "ENTERPRISE WEB PLATFORM / LIVE TELEMETRY",
    mockScreenRows: [
      { label: "Edge SSR Execution (Global CDN)", detail: "Cloudflare Workers / Latency: 14ms", status: "Healthy / Optimal", statusType: "success" },
      { label: "Concurrent Active Sessions", detail: "4,820 Users · Memory Usage: 32%", status: "Auto-Scaled", statusType: "success" },
      { label: "Database Connection Pool", detail: "PostgreSQL PGBouncer: 24/100 connections", status: "Active / Low Load", statusType: "blue" },
      { label: "Security Audit Status", detail: "Zero high-severity vulnerabilities flagged", status: "SOC2 Ready", statusType: "success" },
    ],
  },
  {
    id: "mobile",
    number: "02",
    name: "Mobile App Development (iOS & Android)",
    tagline: "Native performance, offline capabilities, and intuitive user experiences.",
    summary:
      "From consumer-facing mobile platforms to frontline field service tools. We develop cross-platform applications using Flutter as well as native Swift and Kotlin apps featuring offline caching, push notifications, and hardware integrations.",
    metricLabel: "Animation Frame Rate",
    metricValue: "60 FPS",
    metricBadge: "Native Performance",
    icon: Smartphone,
    keyFeatures: [
      "Single-codebase Flutter development delivering pixel-perfect iOS & Android parity",
      "Offline-first SQLite/Hive database with automatic background synchronization",
      "Biometric authentication (FaceID, TouchID, Android Fingerprint)",
      "Bluetooth hardware hooks: portable receipt printers, barcode scanners, GPS",
      "Push notification pipelines via Firebase Cloud Messaging (FCM) & APNs",
    ],
    techStack: ["Flutter", "Dart", "Swift", "Kotlin", "Firebase", "SQLite"],
    mockScreenTitle: "MOBILE CLIENT TELEMETRY & APP LIFECYCLE",
    mockScreenRows: [
      { label: "iOS App Store Release (v2.4.1)", detail: "Crash-free sessions: 99.82%", status: "Production Live", statusType: "success" },
      { label: "Android Play Store Release (v2.4.1)", detail: "Active device installs: 12,400+", status: "Production Live", statusType: "success" },
      { label: "Offline Sync Engine", detail: "Background worker queued: 0 pending items", status: "Synced (1s ago)", statusType: "blue" },
      { label: "Push Notification Delivery", detail: "Avg delivery time: 340ms (FCM)", status: "Active Channel", statusType: "success" },
    ],
  },
  {
    id: "saas",
    number: "03",
    name: "Multi-Tenant SaaS Product Engineering",
    tagline: "Bespoke SaaS architectures built for international ARR growth and tenant isolation.",
    summary:
      "We partner with ambitious founders and enterprise innovation labs to build B2B and B2C SaaS platforms. Architected for multi-tenancy, automated user onboarding, subscription billing, usage metering, and horizontal scale.",
    metricLabel: "Tenant Database Isolation",
    metricValue: "100%",
    metricBadge: "Row-Level Security",
    icon: Blocks,
    keyFeatures: [
      "Row-Level Security (RLS) and schema-isolated multi-tenant architectures",
      "Automated subscription management with Stripe, PayHere, and custom invoicing",
      "Team management with invitation links, SSO, and audit log generation",
      "Self-service onboarding flows with interactive user walkthroughs",
      "Usage-based billing meters & webhook notification engines",
    ],
    techStack: ["Next.js", "PostgreSQL RLS", "Stripe API", "Supabase", "Docker", "SendGrid"],
    mockScreenTitle: "SAAS MULTI-TENANT ENGINE / AUDIT DASHBOARD",
    mockScreenRows: [
      { label: "Total Active Organizations", detail: "348 Tenants across 6 countries", status: "Active Multi-Tenant", statusType: "success" },
      { label: "Subscription MRR Ledger", detail: "Monthly Recurring: $42,800 USD", status: "Stripe Synced", statusType: "success" },
      { label: "Tenant Data Isolation Check", detail: "PostgreSQL RLS security tests: 100% pass", status: "Strict Isolation", statusType: "blue" },
      { label: "Webhook Event Dispatcher", detail: "99.98% successful delivery rate", status: "Operational", statusType: "success" },
    ],
  },
  {
    id: "microservices",
    number: "04",
    name: "API Gateways, Microservices & Event Streams",
    tagline: "High-throughput asynchronous backends designed for enterprise fault tolerance.",
    summary:
      "When legacy monolithic backends crumble under load, Creativex Technology architecturally breaks them down into decoupled microservices, gRPC services, and event-driven message queues that scale independently across cloud clusters.",
    metricLabel: "Peak Request Throughput",
    metricValue: "15,000+ req/s",
    metricBadge: "P99 < 35ms",
    icon: Network,
    keyFeatures: [
      "High-speed REST, GraphQL, and binary gRPC endpoint engineering",
      "Event streaming and asynchronous task queues via Apache Kafka and Redis/BullMQ",
      "Centralized API rate limiting, IP whitelisting, and JWT security filtering",
      "Distributed OpenTelemetry tracing and structured JSON error logging",
      "Automated database connection pooling and read-replica replication",
    ],
    techStack: ["Go (Golang)", "Node.js", "Python FastAPIs", "Kafka", "PostgreSQL", "Docker"],
    mockScreenTitle: "DISTRIBUTED BACKEND & EVENT BROKER MESH",
    mockScreenRows: [
      { label: "API Gateway (Kong / Envoy)", detail: "Request throughput: 14,200 req/sec", status: "Sub-20ms Latency", statusType: "success" },
      { label: "Worker Queue (BullMQ / Redis)", detail: "Active jobs: 42 · Failed jobs: 0", status: "Queue Healthy", statusType: "success" },
      { label: "Primary Database (PostgreSQL)", detail: "Replication lag: < 2ms (Read Replicas: 3)", status: "In Sync", statusType: "blue" },
      { label: "Serverless Compute Clusters", detail: "P95 execution duration: 18ms", status: "Auto-Scaled", statusType: "success" },
    ],
  },
  {
    id: "modernization",
    number: "05",
    name: "Legacy System Modernization & Migration",
    tagline: "Migrate legacy databases and brittle desktop software without operational disruption.",
    summary:
      "Eliminate technical debt, slow database queries, and unsupported legacy codebases. We execute safe, phased migrations from legacy platforms (PHP, .NET Framework, FoxPro, Access) into modern, containerized cloud applications.",
    metricLabel: "System Maintenance Savings",
    metricValue: "-68%",
    metricBadge: "Post-Migration",
    icon: HardDrive,
    keyFeatures: [
      "Comprehensive legacy codebase and relational schema dependency mapping",
      "Strangler-fig migration methodology ensuring zero downtime for live business operations",
      "Automated data cleansing, deduplication, and staging ETL pipelines",
      "Modernization of user workflows to eliminate manual data re-entry and paper forms",
      "Post-migration performance verification and automated regression testing",
    ],
    techStack: ["PostgreSQL", "TypeScript", "Python ETL", "Cloudflare", "AWS RDS", "Docker"],
    mockScreenTitle: "STRANGLER-FIG MIGRATION PIPELINE STATUS",
    mockScreenRows: [
      { label: "Legacy Monolith Routing", detail: "82% traffic redirected to modern microservices", status: "Incremental Cutover", statusType: "blue" },
      { label: "Dual-Write Database Sync", detail: "Zero record mismatch across 1.2M rows", status: "100% Parity Verified", statusType: "success" },
      { label: "Legacy API Proxy Layer", detail: "Translates SOAP / XML into REST JSON", status: "Active Bridge", statusType: "success" },
      { label: "Error Rate Baseline", detail: "Reduced by 88% compared to legacy stack", status: "Optimal Reliability", statusType: "success" },
    ],
  },
  {
    id: "offshore",
    number: "06",
    name: "Dedicated Offshore Engineering Squads",
    tagline: "Senior software engineering capacity for Australia, UAE, UK, and global tech firms.",
    summary:
      "Augment your in-house product team with senior software engineers, tech leads, and QA specialists based in Colombo, Sri Lanka. Seamless timezone overlap, direct Slack integration, fluent English communication, and disciplined sprint delivery.",
    metricLabel: "Average Engineering Tenure",
    metricValue: "4.8 Years",
    metricBadge: "Low Attrition",
    icon: Users2,
    keyFeatures: [
      "Vetted Senior & Lead Software Engineers with top-tier University degrees (Moratuwa, Colombo)",
      "Direct integration into your Jira/Linear boards, daily standups, and GitHub PR workflows",
      "Timezone overlap: 5+ hours with Australia (AEST), full day with UAE (GST), afternoon overlap with UK (GMT)",
      "Strict IP assignment, NDA agreements, and secure hardware endpoint policies",
      "Flexible squad scaling: expand or contract sprint capacity with 30-day notice",
    ],
    techStack: ["Full-Stack TS", "Python", "Flutter", "Go", "AWS", "GCP", "Kubernetes"],
    mockScreenTitle: "DEDICATED OFFSHORE POD HEALTH & SPRINT VELOCITY",
    mockScreenRows: [
      { label: "Active Squad Alpha (Sydney Client)", detail: "4 Senior Devs + 1 QA · AEST Overlap: 5.5 hrs", status: "Sprint 42 Active", statusType: "success" },
      { label: "Active Squad Beta (Dubai Client)", detail: "3 Full-Stack Devs · GST Overlap: 7.0 hrs", status: "Sprint 18 Active", statusType: "success" },
      { label: "Daily Pull Request Velocity", detail: "Avg PR review time: 1.8 hours", status: "High Velocity", statusType: "blue" },
      { label: "Sprint Milestone Delivery", detail: "98.4% user stories accepted on first review", status: "Verified SLA", statusType: "success" },
    ],
  },
];

interface EngagementModel {
  id: string;
  title: string;
  badge: string;
  summary: string;
  highlights: string[];
  idealFor: string;
}

const engagementModels: EngagementModel[] = [
  {
    id: "fixed-scope",
    title: "Agile Milestone & Fixed Scope",
    badge: "DEFINED SPECIFICATIONS",
    summary:
      "Ideal for well-scoped MVPs, custom business portals, or specific functional modules. Features locked pricing, defined sprint milestones, and transparent delivery dates.",
    highlights: [
      "Rigorous discovery phase with UI/UX prototypes and architecture design",
      "Sprint-based milestone payments tied directly to verified acceptance criteria",
      "Guaranteed delivery timeline with defined scope boundaries",
      "60-day post-launch warranty with zero unexpected change-order charges",
    ],
    idealFor: "Startups building initial MVPs or SMEs digitizing a specific internal operational workflow.",
  },
  {
    id: "dedicated-squad",
    title: "Dedicated Engineering Squad",
    badge: "MOST POPULAR FOR SCALE",
    summary:
      "A cross-functional, dedicated pod of senior engineers, QA, and a tech lead working exclusively on your product backlog under your technical leadership.",
    highlights: [
      "Autonomous or fully integrated sprint capacity dedicated 100% to your codebase",
      "Seamless timezone overlap with Australia, UAE, UK, and Singapore",
      "Direct engineer communication in your team Slack, Jira, and GitHub",
      "Predictable monthly billing with zero recruitment overhead or hardware fees",
    ],
    idealFor: "Overseas tech firms, growing SaaS companies, and enterprise engineering departments.",
  },
  {
    id: "modernization-retainer",
    title: "Architecture & Modernization Pod",
    badge: "ENTERPRISE TRANSFORMATION",
    summary:
      "Senior architects and systems engineers who safely untangle legacy codebases, migrate databases, implement CI/CD, and resolve mission-critical scalability bottlenecks.",
    highlights: [
      "Deep architecture audits and technical debt risk assessments",
      "Zero-downtime database and microservice migration pipelines",
      "DevOps, containerization, and automated test coverage implementation",
      "Continuous mentoring and documentation for your internal staff",
    ],
    idealFor: "Established enterprises with mission-critical legacy software needing modernization.",
  },
];

const faqs = [
  {
    q: "Why is Sri Lanka considered a premier destination for custom software development?",
    a: "Sri Lanka has established an elite global reputation for high-value software engineering rather than low-end body shopping. The nation produces world-class computer science graduates from prestigious institutions (University of Moratuwa, University of Colombo, SLIIT) with fluent English proficiency, high ethical standards, and low attrition rates. International companies in Australia, the UAE, the UK, and Singapore leverage Sri Lanka to achieve senior engineering velocity at significant cost efficiencies compared to Western tech hubs.",
  },
  {
    q: "How much does custom software development cost in Sri Lanka?",
    a: "Custom software development in Sri Lanka is highly competitive and cost-effective. A focused minimum viable product (MVP) or custom internal portal typically ranges between LKR 850,000 and LKR 2,500,000 ($2,800 to $8,000 USD). Comprehensive multi-tenant SaaS platforms, high-concurrency enterprise applications, and complex mobile ecosystems range from LKR 3,800,000 upwards ($12,000+ USD) depending on architectural complexity, database scale, and third-party integrations.",
  },
  {
    q: "Who owns the software source code, database, and intellectual property?",
    a: "You do. Under our standard software engineering agreements, your organization retains 100% ownership of all source code, database schemas, digital assets, and proprietary algorithms upon milestone completion. We provide full GitHub repository access from Day 1 and operate with strict Non-Disclosure Agreements (NDAs).",
  },
  {
    q: "How do Creativex Technology dedicated squads collaborate with overseas clients?",
    a: "We integrate directly into your existing communication and sprint ecosystem. Our squads operate in your Slack channels, participate in your daily stand-ups via Zoom/Google Meet, track user stories in Jira or Linear, and submit Pull Requests to your GitHub repositories. Timezone overlap with Australia (AEST), the Gulf (GST), and the UK (GMT) ensures real-time collaboration during regular working hours.",
  },
  {
    q: "What engineering standards and testing methodologies do you enforce?",
    a: "We adhere to rigorous production-grade standards: automated unit and integration testing with minimum 85% code coverage, strict TypeScript static typing, automated linting via ESLint and Prettier, automated containerized builds with GitHub Actions, and static application security testing (SAST) to prevent vulnerabilities before deployment.",
  },
  {
    q: "What happens after the software is deployed to production?",
    a: "We provide comprehensive post-launch warranty support on all projects. Additionally, we offer defined Service Level Agreement (SLA) maintenance packages covering 24/7 server monitoring, proactive database backups, third-party API deprecation updates, and continuous performance optimization.",
  },
];

export function CustomSoftwareClient() {
  const [activeTab, setActiveTab] = useState("web");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Estimator State
  const [projectType, setProjectType] = useState<"mvp" | "saas" | "enterprise" | "mobile">("saas");
  const [scaleLevel, setScaleLevel] = useState<"standard" | "high" | "enterprise">("high");

  const currentDomain = softwareDomains.find((d) => d.id === activeTab) || softwareDomains[0];
  const DomainIcon = currentDomain.icon;

  // Investment calculation
  const calculateEstimate = () => {
    let baseLKR = 1800000;
    let baseUSD = 5800;
    let baseWeeks = 6;
    let squadDesc = "2 Full-Stack Devs + 1 QA";

    if (projectType === "mvp") {
      baseLKR = 500000;
      baseUSD = 1650;
      baseWeeks = 4;
      squadDesc = "2 Full-Stack Devs";
    } else if (projectType === "saas") {
      baseLKR = 2600000;
      baseUSD = 8200;
      baseWeeks = 8;
      squadDesc = "1 Tech Lead + 2 Senior Devs + 1 QA";
    } else if (projectType === "enterprise") {
      baseLKR = 4500000;
      baseUSD = 14200;
      baseWeeks = 12;
      squadDesc = "1 Solutions Architect + 3 Senior Devs + 1 QA + 1 DevOps";
    } else if (projectType === "mobile") {
      baseLKR = 2200000;
      baseUSD = 7000;
      baseWeeks = 7;
      squadDesc = "2 Flutter Engineers + 1 Backend Dev + 1 QA";
    }

    if (scaleLevel === "standard") {
      return { lkr: baseLKR, usd: baseUSD, weeks: baseWeeks, squadDesc };
    }
    if (scaleLevel === "high") {
      return {
        lkr: Math.round(baseLKR * 1.45),
        usd: Math.round(baseUSD * 1.45),
        weeks: Math.round(baseWeeks * 1.3),
        squadDesc,
      };
    }
    return {
      lkr: Math.round(baseLKR * 2.1),
      usd: Math.round(baseUSD * 2.1),
      weeks: Math.round(baseWeeks * 1.7),
      squadDesc: "Full Dedicated Engineering Pod (5 Engineers)",
    };
  };

  const estimate = calculateEstimate();

  return (
    <div className="bg-[#0b0c0b] text-[#e4e7e4] min-h-screen">
      {/* ── 1. Hero Section: Software Engineering in Sri Lanka ── */}
      <section className="relative pt-24 pb-16 sm:pb-20 overflow-hidden border-b border-[#1e241e] bg-[#0b0c0b]">
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="site-width relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#141814] border border-[#222822] mb-5 sm:mb-6">
                <Code2 className="w-3.5 h-3.5 text-[#ff5a36]" />
                <span className="text-[11px] font-mono font-semibold tracking-wider text-[#ff5a36] uppercase">
                  Production-Grade Engineering · Sri Lanka &amp; Global
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-3">
                Custom Software Development in Sri Lanka
              </h1>
              <p className="text-lg sm:text-2xl font-medium text-[#d4d8d4] tracking-tight mb-5">
                Senior Squads. Zero Technical Debt.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-[#a5aaa5] leading-relaxed mb-7 sm:mb-8 max-w-2xl">
                Creativex Technology (Pvt) Ltd engineers enterprise web applications, mobile platforms, multi-tenant SaaS products, and dedicated offshore squads. From Colombo to Australia, the UAE, and the UK, we build software designed to survive real production scale.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#ff5a36] text-white px-5 sm:px-6 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#e04826] transition-colors text-center"
                >
                  Schedule an Engineering Consultation <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#estimator"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-lg border border-[#2a302a] bg-[#121512] text-sm font-medium text-white hover:border-[#ff5a36] hover:bg-[#161a16] transition-colors text-center"
                >
                  <Calculator className="w-4 h-4 text-[#ff5a36]" />
                  Estimate Project Cost &amp; Timeline
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[#1e241e] text-xs text-[#a5aaa5]">
                <div className="flex items-center gap-2.5">
                  <BadgeCheck className="w-4 h-4 text-[#ff5a36] shrink-0" />
                  <span>100% Source Code Ownership</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <BadgeCheck className="w-4 h-4 text-[#ff5a36] shrink-0" />
                  <span>Senior English-Fluent Squads</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <BadgeCheck className="w-4 h-4 text-[#ff5a36] shrink-0" />
                  <span>Full Timezone Overlap</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Production Telemetry Card */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#222822] bg-[#101310] p-5 sm:p-6 relative">
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#1e241e] mb-4 sm:mb-5">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-[#ff5a36]" />
                    <span className="text-xs font-mono font-semibold text-white tracking-wider uppercase">
                      PRODUCTION PIPELINE TELEMETRY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded border border-[#222822] bg-[#141814] text-[#d4d4d8] font-medium">
                    PIPELINE VERIFIED
                  </span>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 sm:mb-5">
                  <div className="p-3 sm:p-3.5 rounded-lg bg-[#141814] border border-[#1e241e]">
                    <span className="text-[11px] text-[#8c928c] block mb-1">Test Coverage Baseline</span>
                    <strong className="text-xl font-bold text-white font-mono">94.8%</strong>
                    <span className="text-[10px] text-[#8c928c] block mt-0.5">Automated Unit + E2E</span>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-lg bg-[#141814] border border-[#1e241e]">
                    <span className="text-[11px] text-[#8c928c] block mb-1">Sprint Milestone Velocity</span>
                    <strong className="text-xl font-bold text-white font-mono">98.6%</strong>
                    <span className="text-[10px] text-[#ff5a36] block mt-0.5">On-Time Acceptance</span>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="space-y-2.5 mb-4 sm:mb-5 text-xs">
                  <div className="p-2.5 rounded-md bg-[#141814] border border-[#1e241e] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <GitPullRequest className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                      <span className="text-white truncate">PR #142 (Auth Microservice)</span>
                    </div>
                    <span className="text-[#d4d4d8] font-mono text-[11px] shrink-0">CI Passed</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-[#141814] border border-[#1e241e] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Zap className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                      <span className="text-white truncate">Edge API Deployment</span>
                    </div>
                    <span className="text-[#ff5a36] font-mono text-[11px] shrink-0">Deployed (18s ago)</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-[#141814] border border-[#1e241e] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                      <span className="text-white truncate">Security Scan (Snyk SAST)</span>
                    </div>
                    <span className="text-[#d4d4d8] font-mono text-[11px] shrink-0">0 CVEs</span>
                  </div>
                </div>

                {/* Direct Action Link */}
                <a
                  href="#capabilities"
                  className="w-full py-2.5 rounded-lg border border-[#2a302a] bg-[#151915] text-xs font-semibold text-center text-[#ff5a36] hover:bg-[#1a201a] block transition-colors"
                >
                  Explore All 6 Software Domains ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Executive Answer Statement (AEO/GEO Optimized) ── */}
      <section className="py-14 sm:py-16 bg-[#090b09] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-[#ff5a36] font-bold block mb-3">
              The Engineering Distinction
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight mb-5 sm:mb-6">
              Why leading enterprises partner with Creativex Technology for custom software development.
            </h2>
            <p className="text-sm sm:text-base text-[#a5aaa5] leading-relaxed mb-5 sm:mb-6">
              Commercial software products inevitably reach operational limits when your business model requires unique customer workflows, proprietary pricing algorithms, or high-throughput data processing. Off-the-shelf templates cannot deliver the differentiation necessary to lead competitive markets.
            </p>
            <p className="text-sm sm:text-base text-[#a5aaa5] leading-relaxed">
              <strong>Creativex Technology (Pvt) Ltd is a verified software development company headquartered in Rajagiriya, Colombo, Sri Lanka.</strong> We bridge strategic product design, modern full-stack development (Next.js, TypeScript, Flutter, Python, PostgreSQL), and disciplined agile sprint delivery to engineer digital assets that scale seamlessly for domestic enterprises and global offshore partners.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Interactive 6-Domain Engineering Explorer ── */}
      <section id="capabilities" className="py-16 sm:py-20 bg-[#0c0e0c] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <p className="section-index">Capabilities / 01—06</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                Full-Lifecycle Software Engineering Spectrum
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8c928c] max-w-md mt-2 md:mt-0">
              Select an engineering domain below to inspect architectural patterns, technology stacks, and live telemetry standards.
            </p>
          </div>

          {/* Domain Selector Tab Strip (All Tabs Visible & Accessible) */}
          <div
            role="tablist"
            aria-label="Software Engineering Domains"
            className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2 p-2 rounded-xl bg-[#121512] border border-[#1e241e] mb-6 sm:mb-8"
          >
            {softwareDomains.map((d) => {
              const Icon = d.icon;
              const isActive = activeTab === d.id;
              return (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(d.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                    isActive
                      ? "bg-[#ff5a36] text-white"
                      : "text-[#a5aaa5] hover:text-white hover:bg-[#1a1f1a]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{d.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Domain Live Display Card */}
          <div role="tabpanel" className="rounded-xl border border-[#222822] bg-[#0e110e] p-5 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Details & Capabilities */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#ff5a36]/10 border border-[#ff5a36]/30 flex items-center justify-center shrink-0">
                    <DomainIcon className="w-5 h-5 text-[#ff5a36]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#ff5a36] font-semibold">
                      DOMAIN {currentDomain.number} / 06
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{currentDomain.name}</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#ff5a36] font-medium mb-3">{currentDomain.tagline}</p>
                <p className="text-xs sm:text-sm text-[#a5aaa5] leading-relaxed mb-6">{currentDomain.summary}</p>

                {/* Key Features */}
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-3">
                  Production Engineering Capabilities
                </h4>
                <ul className="space-y-2.5 mb-6">
                  {currentDomain.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#c5cbc5]">
                      <Check className="w-3.5 h-3.5 text-[#ff5a36] mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Tags */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8c928c] block mb-2">
                    TECHNOLOGY ECOSYSTEM &amp; FRAMEWORKS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentDomain.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-[#161a16] border border-[#242c24] text-[11px] text-[#c0c5c0] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Telemetry Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-lg border border-[#222822] bg-[#0b0d0b] p-4 sm:p-5">
                  {/* Mock Screen Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e241e] mb-4 gap-2">
                    <span className="text-[10px] font-mono text-[#8c928c] uppercase tracking-wider truncate">
                      {currentDomain.mockScreenTitle}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#d4d4d8] px-2 py-0.5 rounded bg-[#141814] border border-[#222822] shrink-0">
                      <Check className="w-3 h-3 text-[#ff5a36]" />
                      VERIFIED ACTIVE
                    </span>
                  </div>

                  {/* Highlight Stat Pill */}
                  <div className="p-3 rounded-lg bg-[#111511] border border-[#1e241e] mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8c928c] block">{currentDomain.metricLabel}</span>
                      <strong className="text-base sm:text-lg font-mono text-white font-bold">{currentDomain.metricValue}</strong>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#1a1f1a] border border-[#2a302a] text-[#ff5a36] font-semibold">
                      {currentDomain.metricBadge}
                    </span>
                  </div>

                  {/* Rows */}
                  <div className="space-y-2 mb-4">
                    {currentDomain.mockScreenRows.map((row, i) => (
                      <div key={i} className="p-2.5 rounded bg-[#101310] border border-[#1a1f1a] text-xs">
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <span className="font-semibold text-white text-[11px] truncate">{row.label}</span>
                          <span
                            className={`font-mono text-[10px] font-medium shrink-0 ${
                              row.statusType === "success"
                                ? "text-[#e4e7e4]"
                                : row.statusType === "orange"
                                ? "text-[#ff5a36]"
                                : "text-[#a5aaa5]"
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
                  <Link
                    href="/contact"
                    className="w-full py-2.5 rounded-lg bg-[#181d18] border border-[#2a342a] text-xs font-semibold text-white hover:bg-[#ff5a36] hover:border-[#ff5a36] text-center block transition-colors"
                  >
                    Architect This For Your Organization →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Interactive Cost & Sprint Timeline Estimator ── */}
      <section id="estimator" className="py-16 sm:py-20 bg-[#090b09] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <p className="section-index">Project Feasibility &amp; Budget</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 sm:mb-4">
              Interactive Custom Software Cost &amp; Timeline Estimator
            </h2>
            <p className="text-xs sm:text-sm text-[#8c928c]">
              Estimate realistic engineering budgets, delivery timelines, and squad compositions for your software project in Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls Card */}
            <div className="lg:col-span-6 rounded-xl border border-[#222822] bg-[#0e110e] p-5 sm:p-8">
              <h3 className="text-sm sm:text-base font-bold text-white mb-5 sm:mb-6 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#ff5a36]" />
                Select Project Scope Parameters
              </h3>

              {/* Selector 1: Project Type */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-white block mb-2.5">Software Category</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "mvp", label: "MVP / Startup Prototype" },
                    { id: "saas", label: "B2B / Multi-Tenant SaaS" },
                    { id: "enterprise", label: "Enterprise Web Platform" },
                    { id: "mobile", label: "Cross-Platform Mobile App" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={projectType === item.id}
                      onClick={() => {
                        setProjectType(item.id as "mvp" | "saas" | "enterprise" | "mobile");
                        if (item.id === "mvp") {
                          setScaleLevel("standard");
                        }
                      }}
                      className={`p-3 rounded-lg border text-left text-xs font-semibold flex items-center justify-between gap-2 transition-colors ${
                        projectType === item.id
                          ? "border-[#ff5a36] bg-[#1a1412] text-white"
                          : "border-[#1e241e] bg-[#121512] text-[#8c928c] hover:text-white hover:border-[#2e362e]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {projectType === item.id && <Check className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 2: Architectural Scale */}
              <div className="mb-6 sm:mb-8">
                <label className="text-xs font-semibold text-white block mb-2.5">Architecture &amp; Scale Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: "standard", label: "Standard MVP", sub: "Core User Stories" },
                    { id: "high", label: "Production Scale", sub: "APIs & High Traffic" },
                    { id: "enterprise", label: "Enterprise Grade", sub: "High Concurrency + RLS" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={scaleLevel === item.id}
                      onClick={() => setScaleLevel(item.id as "standard" | "high" | "enterprise")}
                      className={`p-2.5 sm:p-3 rounded-lg border text-left transition-colors ${
                        scaleLevel === item.id
                          ? "border-[#ff5a36] bg-[#1a1412] text-white"
                          : "border-[#1e241e] bg-[#121512] text-[#8c928c] hover:text-white hover:border-[#2e362e]"
                      }`}
                    >
                      <span className="text-xs font-semibold block">{item.label}</span>
                      <span className="text-[10px] text-[#8c928c] block mt-0.5">{item.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope Inclusions Checklist */}
              <div className="pt-5 sm:pt-6 border-t border-[#1e241e] space-y-2 text-xs text-[#8c928c]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>100% Intellectual Property &amp; Source Code Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>Automated CI/CD Pipeline &amp; Containerization setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>60-Day Post-Launch Warranty Support included</span>
                </div>
              </div>
            </div>

            {/* Right Estimator Results Card */}
            <div className="lg:col-span-6 rounded-xl border border-[#222822] bg-[#101310] p-5 sm:p-8">
              <span className="text-[11px] font-mono font-semibold text-[#ff5a36] uppercase tracking-wider block mb-2">
                ESTIMATED ENGINEERING INVESTMENT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">Transparent Budget &amp; Timeline Range</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="p-4 rounded-lg bg-[#141b14] border border-[#222a22]">
                  <span className="text-xs text-[#8c928c] block mb-1">Sri Lanka Domestic Tier</span>
                  <strong className="text-xl sm:text-2xl font-mono text-white font-bold">
                    LKR {(estimate.lkr / 1000000).toFixed(2)}M
                  </strong>
                  <span className="text-[10px] text-[#8c928c] block mt-1">Milestone-based billing</span>
                </div>

                <div className="p-4 rounded-lg bg-[#141b14] border border-[#222a22]">
                  <span className="text-xs text-[#8c928c] block mb-1">International Offshore Tier</span>
                  <strong className="text-xl sm:text-2xl font-mono text-white font-bold">
                    ${estimate.usd.toLocaleString()} USD
                  </strong>
                  <span className="text-[10px] text-[#8c928c] block mt-1">~65% savings vs US/AU</span>
                </div>
              </div>

              {/* Delivery Timeline Pill */}
              <div className="p-4 rounded-lg bg-[#151915] border border-[#1e241e] mb-5 sm:mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs gap-2">
                  <span className="text-[#a5aaa5] flex items-center gap-1.5 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#ff5a36]" />
                    Estimated Sprint Timeline:
                  </span>
                  <strong className="text-white font-mono text-right">{estimate.weeks} Weeks (Agile)</strong>
                </div>
                <div className="flex items-center justify-between text-xs gap-2">
                  <span className="text-[#a5aaa5] flex items-center gap-1.5 shrink-0">
                    <Users2 className="w-3.5 h-3.5 text-[#ff5a36]" />
                    Recommended Squad:
                  </span>
                  <strong className="text-white font-mono text-right">{estimate.squadDesc}</strong>
                </div>
              </div>

              <Link
                href={`/contact?scope=${projectType}&scale=${scaleLevel}`}
                className="w-full py-3.5 rounded-lg bg-[#ff5a36] text-white text-sm font-semibold text-center hover:bg-[#e04826] transition-colors block"
              >
                Request a Detailed Technical Scope &amp; Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Three Engagement Models (Domestic & Offshore) ── */}
      <section className="py-16 sm:py-20 bg-[#0c0e0c] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <p className="section-index">Flexible Engagement Models</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 sm:mb-4">
              How You Can Engage Creativex Technology Engineering
            </h2>
            <p className="text-xs sm:text-sm text-[#8c928c]">
              We adapt to your organizational structure—delivering end-to-end turnkey software products or augmenting your team with senior offshore engineering squads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementModels.map((model) => (
              <div key={model.id} className="p-5 sm:p-6 rounded-xl border border-[#222822] bg-[#0e110e] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#ff5a36] font-semibold tracking-wider block mb-2">
                    {model.badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 sm:mb-3">{model.title}</h3>
                  <p className="text-xs text-[#8c928c] leading-relaxed mb-5 sm:mb-6">{model.summary}</p>

                  <h4 className="text-[11px] uppercase tracking-wider text-white font-semibold mb-3">Model Highlights</h4>
                  <ul className="space-y-2 mb-6">
                    {model.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#c5cbc5]">
                        <Check className="w-3.5 h-3.5 text-[#ff5a36] mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#1a1f1a]">
                  <span className="text-[10px] text-[#8c928c] block mb-1">BEST SUITED FOR:</span>
                  <p className="text-xs text-[#ff5a36] font-medium">{model.idealFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Global Offshore Engine: The Sri Lanka Advantage ── */}
      <section className="py-16 sm:py-20 bg-[#090b09] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <p className="section-index">Global Timezone Compatibility</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 sm:mb-4">
              The Sri Lankan Engineering Advantage
            </h2>
            <p className="text-xs sm:text-sm text-[#8c928c]">
              Why global technology companies in Australia, the UAE, the UK, and Singapore choose dedicated software squads in Colombo over low-cost commodity outsourcing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="p-4 sm:p-5 rounded-xl border border-[#222822] bg-[#0e110e]">
              <span className="text-xs font-mono font-bold text-[#ff5a36] block mb-1.5 sm:mb-2">AUSTRALIA (AEST)</span>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2">5+ Hours Overlap</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                Colombo starts early: our squads overlap with your morning stand-ups in Sydney, Melbourne, and Brisbane without scheduling friction.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-[#222822] bg-[#0e110e]">
              <span className="text-xs font-mono font-bold text-[#ff5a36] block mb-1.5 sm:mb-2">UAE &amp; GULF (GST)</span>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2">Near-Exact Business Day</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                Only 1.5 hours difference from Dubai, Abu Dhabi, and Doha. Work simultaneously in real-time throughout the entire working week.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-[#222822] bg-[#0e110e]">
              <span className="text-xs font-mono font-bold text-[#ff5a36] block mb-1.5 sm:mb-2">UNITED KINGDOM (GMT)</span>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2">Afternoon Overlap</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                Colombo squads deliver fresh pull requests by your midday, creating an agile 24-hour development cycle for UK engineering teams.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-[#222822] bg-[#0e110e]">
              <span className="text-xs font-mono font-bold text-[#ff5a36] block mb-1.5 sm:mb-2">SINGAPORE (SGT)</span>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2">Full Business Day</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                Just 2.5 hours apart. Collaborate with high-bandwidth senior developers across the ASEAN economic corridor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Frequently Asked Questions (FAQPage AEO / GEO Engine) ── */}
      <section className="py-16 sm:py-20 bg-[#0c0e0c] border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 sm:mb-4">
              Answers for Engineering Leaders &amp; Business Decision Makers
            </h2>
            <p className="text-xs sm:text-sm text-[#8c928c]">
              Direct answers to common questions regarding software pricing, IP rights, overseas collaboration, and development standards.
            </p>
          </div>

          <div className="max-w-3xl space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border bg-[#0d100d] overflow-hidden transition-colors ${
                    isOpen ? "border-[#ff5a36]/40" : "border-[#1e241e]"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#121612] transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-white leading-snug">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#ff5a36] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8c928c] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#a0a5a0] leading-relaxed border-t border-[#181d18] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. Conversion CTA & Technical Discovery Booking ── */}
      <section className="py-16 sm:py-20 bg-[#090b09]">
        <div className="site-width">
          <div className="rounded-2xl border border-[#222822] bg-[#101310] p-6 sm:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141814] text-[#ff5a36] border border-[#222822] text-xs font-mono font-semibold mb-5 sm:mb-6">
              <Calendar className="w-3.5 h-3.5" />
              <span>COLOMBO ENGINEERING DISCOVERY CALL</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 sm:mb-4">
              Bring your product vision or enterprise roadmap to life.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#a5aaa5] max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Consult directly with our senior software architects in Rajagiriya, Colombo. We will evaluate technical feasibility, recommend database architectures, and provide milestone estimates.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#ff5a36] text-white px-6 sm:px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#e04826] transition-colors text-center"
              >
                Book a Free Engineering Consultation <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-lg border border-[#2a302a] bg-[#141814] text-sm font-medium text-white hover:border-[#ff5a36] hover:bg-[#181c18] transition-colors text-center"
              >
                Review Capabilities Spectrum
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
