import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  LayoutDashboard,
  BarChart2,
  Package,
  Users,
  Sparkles,
  Settings,
  TrendingUp,
  Search,
  Bell,
  AlertCircle,
  Layers,
} from "lucide-react";
import type { Solution } from "@/lib/solutions";

interface StartupsSaasSolutionSectionProps {
  solution: Solution;
}

export function StartupsSaasSolutionSection({
  solution,
}: StartupsSaasSolutionSectionProps) {
  return (
    <article
      className="solution-page-detail saas-enhanced-solution"
      id={solution.slug}
      aria-label="Startups & SaaS Products Solution"
    >
      <div className="site-width saas-enhanced-container">
        {/* Top Two-Column Grid: Left Copy & Right Product Dashboard Mockup */}
        <div className="saas-enhanced-top-grid">
          {/* Left Column: Heading, Subhead, Description & CTA */}
          <div className="saas-copy-col">
            <div className="saas-kicker-group">
              <div className="saas-index-badge">
                <span className="saas-index-accent">01</span>
                <span className="saas-index-sep"> / </span>
                <span className="saas-index-total">05</span>
              </div>
              <p className="saas-kicker-label">INDUSTRY OPERATING SYSTEM</p>
            </div>

            <h2 className="saas-main-title">
              Startups &amp; SaaS<br />
              Products
            </h2>

            <h3 className="saas-sub-headline">
              {solution.headline || "Build the right product, then build it to scale."}
            </h3>

            <p className="saas-lead-desc">
              {solution.copy ||
                "Work with a senior product and engineering team to shape an AI-native opportunity, validate the core experience, and deliver a secure cloud product ready for real customers."}
            </p>

            <div className="saas-cta-action">
              <Link href="/contact" className="saas-discuss-btn">
                <span>Discuss this solution</span>
                <ArrowUpRight className="saas-btn-arrow" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: Realistic SaaS Product Dashboard UI Mockup */}
          <div className="saas-mockup-col" aria-hidden="true">
            <div className="saas-mockup-card">
              {/* Dark Left Sidebar */}
              <aside className="saas-mockup-sidebar">
                <div className="saas-mockup-brand">
                  <span className="saas-brand-dot" />
                  <span className="saas-brand-text">CreativeX</span>
                </div>

                <nav className="saas-mockup-nav">
                  <div className="saas-nav-link is-active">
                    <LayoutDashboard className="saas-nav-svg" />
                    <span>Dashboard</span>
                  </div>
                  <div className="saas-nav-link">
                    <BarChart2 className="saas-nav-svg" />
                    <span>Analytics</span>
                  </div>
                  <div className="saas-nav-link">
                    <Package className="saas-nav-svg" />
                    <span>Products</span>
                  </div>
                  <div className="saas-nav-link">
                    <Users className="saas-nav-svg" />
                    <span>Users</span>
                  </div>
                  <div className="saas-nav-link">
                    <Sparkles className="saas-nav-svg" />
                    <span>AI Assistant</span>
                  </div>
                  <div className="saas-nav-link">
                    <Settings className="saas-nav-svg" />
                    <span>Settings</span>
                  </div>
                </nav>
              </aside>

              {/* Main Content Dashboard Area */}
              <main className="saas-mockup-content">
                {/* Search Bar / Top Utility Row */}
                <div className="saas-mockup-topbar">
                  <div className="saas-search-input-pill">
                    <Search className="saas-search-icon" />
                    <span>Search workflows...</span>
                  </div>
                  <div className="saas-user-group">
                    <div className="saas-bell-wrap">
                      <Bell className="saas-bell-icon" />
                      <span className="saas-bell-badge" />
                    </div>
                    <div className="saas-avatar-circle">
                      <span>CX</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Page Title */}
                <div className="saas-page-header">
                  <h4 className="saas-page-title">Product Dashboard</h4>
                </div>

                {/* 3 Metric Cards */}
                <div className="saas-metrics-strip">
                  {/* Card 1 */}
                  <div className="saas-metric-box">
                    <span className="saas-metric-sub">Active Users</span>
                    <div className="saas-metric-num-row">
                      <span className="saas-metric-num">12,480</span>
                      <svg className="saas-sparkline" viewBox="0 0 34 16" fill="none">
                        <path
                          d="M 2 13 Q 10 12, 16 7 T 32 3"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="saas-trend-sub is-positive">
                      <span className="trend-icon">↗</span> +18% this month
                    </span>
                  </div>

                  {/* Card 2 */}
                  <div className="saas-metric-box">
                    <span className="saas-metric-sub">Revenue</span>
                    <div className="saas-metric-num-row">
                      <span className="saas-metric-num">$28,4K</span>
                      <svg className="saas-sparkline" viewBox="0 0 34 16" fill="none">
                        <path
                          d="M 2 14 Q 12 11, 18 5 T 32 2"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="saas-trend-sub is-positive">
                      <span className="trend-icon">↗</span> +24% this month
                    </span>
                  </div>

                  {/* Card 3 */}
                  <div className="saas-metric-box">
                    <span className="saas-metric-sub">Growth</span>
                    <div className="saas-metric-num-row">
                      <span className="saas-metric-num">+32%</span>
                      <svg className="saas-sparkline" viewBox="0 0 34 16" fill="none">
                        <path
                          d="M 2 12 Q 10 13, 18 6 T 32 3"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="saas-trend-sub is-neutral">vs last month</span>
                  </div>
                </div>

                {/* Bottom Row: User Growth Chart & AI Insights */}
                <div className="saas-widgets-grid">
                  {/* Left: User Growth Chart */}
                  <div className="saas-widget-card chart-widget">
                    <div className="saas-widget-header">
                      <span className="saas-widget-title">User Growth</span>
                    </div>
                    <div className="saas-chart-container">
                      <svg className="saas-line-chart" viewBox="0 0 215 95" fill="none">
                        {/* Grid & Axis Lines */}
                        <g className="saas-grid-lines">
                          <text x="3" y="14" className="chart-label">50</text>
                          <line x1="20" y1="12" x2="210" y2="12" stroke="rgba(11,12,11,0.05)" strokeDasharray="2 2" />
                          
                          <text x="3" y="32" className="chart-label">40</text>
                          <line x1="20" y1="30" x2="210" y2="30" stroke="rgba(11,12,11,0.05)" strokeDasharray="2 2" />
                          
                          <text x="3" y="50" className="chart-label">30</text>
                          <line x1="20" y1="48" x2="210" y2="48" stroke="rgba(11,12,11,0.05)" strokeDasharray="2 2" />
                          
                          <text x="3" y="68" className="chart-label">20</text>
                          <line x1="20" y1="66" x2="210" y2="66" stroke="rgba(11,12,11,0.05)" strokeDasharray="2 2" />
                        </g>

                        {/* Baseline Curve (Slate / Gray) */}
                        <path
                          d="M 28 66 Q 62 58, 92 60 T 136 46 T 174 42 T 210 30"
                          fill="none"
                          stroke="#cbd5e1"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        {/* Primary Growth Curve (Vibrant Orange) */}
                        <path
                          d="M 28 56 Q 62 42, 92 46 T 136 32 T 174 26 T 210 14"
                          fill="none"
                          stroke="#ff5a36"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />

                        {/* Current Value Marker */}
                        <circle cx="210" cy="14" r="3.5" fill="#ff5a36" stroke="#ffffff" strokeWidth="1.5" />

                        {/* Month labels */}
                        <g className="saas-month-labels">
                          <text x="28" y="88" textAnchor="middle" className="chart-month">Jan</text>
                          <text x="64" y="88" textAnchor="middle" className="chart-month">Feb</text>
                          <text x="100" y="88" textAnchor="middle" className="chart-month">Mar</text>
                          <text x="136" y="88" textAnchor="middle" className="chart-month">Apr</text>
                          <text x="172" y="88" textAnchor="middle" className="chart-month">May</text>
                          <text x="208" y="88" textAnchor="middle" className="chart-month">Jun</text>
                        </g>
                      </svg>
                    </div>
                  </div>

                  {/* Right: AI Insights Card */}
                  <div className="saas-widget-card insights-widget">
                    <div className="saas-widget-header">
                      <span className="saas-widget-title">AI Insights</span>
                    </div>
                    <div className="saas-insights-stack">
                      <div className="saas-insight-row">
                        <div className="insight-badge blue">
                          <Sparkles className="badge-svg" />
                        </div>
                        <span className="insight-copy">User engagement increased by 16%</span>
                      </div>

                      <div className="saas-insight-row">
                        <div className="insight-badge green">
                          <TrendingUp className="badge-svg" />
                        </div>
                        <span className="insight-copy">Feature adoption is growing</span>
                      </div>

                      <div className="saas-insight-row">
                        <div className="insight-badge cyan">
                          <AlertCircle className="badge-svg" />
                        </div>
                        <span className="insight-copy">Potential churn risk detected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* Bottom Section: 3 Equal Columns with Vertical Divider Lines */}
        <div className="saas-bottom-grid">
          {/* Column 1: What we build */}
          <div className="saas-bottom-col">
            <h4 className="saas-col-heading">What we build</h4>
            <div className="saas-feature-list">
              <div className="saas-feature-entry">
                <div className="saas-icon-container">
                  {/* Layered Box / Circuit Icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                </div>
                <span className="saas-feature-text">AI-native product discovery</span>
              </div>

              <div className="saas-feature-entry">
                <div className="saas-icon-container">
                  {/* Target / Crosshair Icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="22" y1="12" x2="18" y2="12" />
                    <line x1="6" y1="12" x2="2" y2="12" />
                    <line x1="12" y1="6" x2="12" y2="2" />
                    <line x1="12" y1="22" x2="12" y2="18" />
                  </svg>
                </div>
                <span className="saas-feature-text">MVP-to-scale engineering</span>
              </div>

              <div className="saas-feature-entry">
                <div className="saas-icon-container">
                  {/* Multi-cube / Analytics Blocks */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                </div>
                <span className="saas-feature-text">
                  Cloud platform and product analytics
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Designed outcomes */}
          <div className="saas-bottom-col">
            <h4 className="saas-col-heading">Designed outcomes</h4>
            <div className="saas-feature-list">
              <div className="saas-feature-entry">
                <div className="saas-icon-container">
                  {/* Speedometer / Gauge Icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 2v4" />
                    <path d="m4.93 4.93 2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="m4.93 19.07 2.83-2.83" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="m14.5 9.5 4.5-4.5" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <span className="saas-feature-text">Faster product learning</span>
              </div>

              <div className="saas-feature-entry">
                <div className="saas-icon-container">
                  {/* Shield / Foundation Badge Icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="saas-feature-text">
                  A credible production foundation
                </span>
              </div>

              <div className="saas-feature-entry">
                <div className="saas-icon-container">
                  {/* Roadmap / Decision Branches Icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 3h5v5" />
                    <path d="M8 3H3v5" />
                    <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
                    <path d="m15 9 6-6" />
                  </svg>
                </div>
                <span className="saas-feature-text">Clearer roadmap decisions</span>
              </div>
            </div>
          </div>

          {/* Column 3: Typical system shape & 3D Isometric Architecture Diagram */}
          <div className="saas-bottom-col saas-col-system">
            <h4 className="saas-col-heading">Typical system shape</h4>
            <div className="saas-system-subhead">
              <Layers className="saas-layers-badge" aria-hidden="true" />
              <span className="saas-system-title">
                {solution.system || "AI-native SaaS platform"}
              </span>
            </div>

            {/* 3D Isometric Architecture Stack Illustration */}
            <div className="saas-isometric-wrapper">
              <svg
                viewBox="0 0 320 215"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="saas-isometric-svg"
                aria-label="3-tier isometric architecture diagram: Application UI, Service Orchestration, and Cloud Database"
              >
                <defs>
                  {/* Top orange gradient */}
                  <linearGradient id="isoOrangePlane" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff5a36" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#ff411a" stopOpacity="0.78" />
                  </linearGradient>

                  {/* Middle frosted slate gradient */}
                  <linearGradient id="isoSlatePlane" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.75" />
                  </linearGradient>

                  {/* Bottom blueprint grid gradient */}
                  <linearGradient id="isoBlueprintPlane" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.55" />
                  </linearGradient>
                </defs>

                {/* Vertical Projection Connector Lines (Dashed Guides) */}
                <g stroke="rgba(11, 12, 11, 0.22)" strokeWidth="1" strokeDasharray="3 3">
                  <line x1="160" y1="28" x2="160" y2="118" />
                  <line x1="285" y1="78" x2="285" y2="168" />
                  <line x1="160" y1="128" x2="160" y2="218" />
                  <line x1="35" y1="78" x2="35" y2="168" />
                </g>

                {/* --- LAYER 3: BOTTOM (Data & Cloud Foundation) --- */}
                <g className="iso-layer iso-layer-bottom" transform="translate(0, 90)">
                  <path
                    d="M 160 28 L 285 78 L 160 128 L 35 78 Z"
                    fill="url(#isoBlueprintPlane)"
                    stroke="rgba(11, 12, 11, 0.22)"
                    strokeWidth="1.2"
                  />
                  {/* Technical Blueprint Wireframe Lines */}
                  <path
                    d="M 97.5 53 L 222.5 103 M 160 28 L 160 128 M 72.5 93 L 197.5 43 M 122.5 113 L 247.5 63"
                    stroke="rgba(11, 12, 11, 0.12)"
                    strokeWidth="0.8"
                  />
                  {/* Database / storage blocks */}
                  <rect
                    x="135"
                    y="65"
                    width="22"
                    height="12"
                    rx="2"
                    fill="rgba(11, 12, 11, 0.08)"
                    stroke="rgba(11, 12, 11, 0.24)"
                    strokeWidth="0.8"
                  />
                  <rect
                    x="165"
                    y="75"
                    width="22"
                    height="12"
                    rx="2"
                    fill="rgba(11, 12, 11, 0.08)"
                    stroke="rgba(11, 12, 11, 0.24)"
                    strokeWidth="0.8"
                  />
                </g>

                {/* --- LAYER 2: MIDDLE (API Gateways & Service Mesh) --- */}
                <g className="iso-layer iso-layer-middle" transform="translate(0, 45)">
                  <path
                    d="M 160 28 L 285 78 L 160 128 L 35 78 Z"
                    fill="url(#isoSlatePlane)"
                    stroke="rgba(11, 12, 11, 0.28)"
                    strokeWidth="1.2"
                    filter="drop-shadow(0 4px 8px rgba(0,0,0,0.04))"
                  />
                  {/* Service Mesh Filaments */}
                  <path
                    d="M 80 60 L 160 78 L 240 60 M 110 90 L 160 78 L 210 90 M 160 40 L 160 116"
                    stroke="rgba(11, 12, 11, 0.16)"
                    strokeWidth="0.9"
                    strokeDasharray="2 2"
                  />
                  <circle cx="160" cy="78" r="3" fill="#ff5a36" fillOpacity="0.75" />
                  <circle cx="110" cy="90" r="2.5" fill="rgba(11, 12, 11, 0.4)" />
                  <circle cx="210" cy="90" r="2.5" fill="rgba(11, 12, 11, 0.4)" />
                </g>

                {/* --- LAYER 1: TOP (AI-Native Application UI & Intelligence) --- */}
                <g className="iso-layer iso-layer-top" transform="translate(0, 0)">
                  <path
                    d="M 160 28 L 285 78 L 160 128 L 35 78 Z"
                    fill="url(#isoOrangePlane)"
                    stroke="#ff5a36"
                    strokeWidth="1.5"
                    filter="drop-shadow(0 6px 16px rgba(255, 90, 54, 0.32))"
                  />
                  {/* Clean UI Grid on Orange Plane */}
                  <g stroke="rgba(255, 255, 255, 0.38)" strokeWidth="0.8">
                    <line x1="97.5" y1="53" x2="222.5" y2="103" />
                    <line x1="128.7" y1="40.5" x2="253.7" y2="90.5" />
                    <line x1="66.2" y1="65.5" x2="191.2" y2="115.5" />
                    <line x1="97.5" y1="103" x2="222.5" y2="53" />
                    <line x1="66.2" y1="90.5" x2="191.2" y2="40.5" />
                    <line x1="128.7" y1="115.5" x2="253.7" y2="65.5" />
                  </g>
                  {/* Glowing Intelligence Node */}
                  <circle
                    cx="160"
                    cy="78"
                    r="4.5"
                    fill="#ffffff"
                    filter="drop-shadow(0 0 6px rgba(255,255,255,0.8))"
                  />
                  <circle cx="160" cy="78" r="1.8" fill="#ff5a36" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
