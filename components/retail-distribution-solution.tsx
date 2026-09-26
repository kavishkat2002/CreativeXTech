import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ScanLine,
  TrendingUp,
  BarChart3,
  Layers,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Network,
  PackageCheck,
} from "lucide-react";
import type { Solution } from "@/lib/solutions";

interface RetailDistributionSolutionSectionProps {
  solution: Solution;
}

export function RetailDistributionSolutionSection({
  solution,
}: RetailDistributionSolutionSectionProps) {
  return (
    <article
      className="solution-page-detail retail-enhanced-solution"
      id={solution.slug}
      aria-label="Retail & Distribution Solution"
    >
      <div className="site-width retail-enhanced-container">
        {/* Top Dual-Column Grid Matching User Mockup */}
        <div className="retail-top-grid">
          {/* Left Column: Heading, Subhead & Description */}
          <div className="retail-copy-col">
            <div className="retail-kicker-group">
              <div className="retail-index-badge">
                <span className="retail-index-accent">04</span>
                <span className="retail-index-sep"> / </span>
                <span className="retail-index-total">05</span>
              </div>
              <p className="retail-kicker-label">INDUSTRY OPERATING SYSTEM</p>
            </div>

            <h2 className="retail-main-title">
              Retail &amp; Distribution
            </h2>

            <h3 className="retail-sub-headline">
              {solution.headline || "Connect demand, inventory, orders, and frontline decisions."}
            </h3>

            <p className="retail-lead-desc">
              {solution.copy ||
                "Create a clearer view from warehouse to shelf with forecasting, order orchestration, and practical tools for teams managing stock, fulfillment, and customer demand."}
            </p>
          </div>

          {/* Right Column: High-Tech Distribution Warehouse Photography with Floating HUD Badges */}
          <div className="retail-media-col" aria-hidden="true">
            <div className="retail-hero-card">
              <img
                src="/images/retail-distribution-warehouse.jpg"
                alt="Automated smart retail distribution center and logistics warehouse"
                className="retail-hero-img"
                loading="eager"
              />

              {/* Ambient Dark Gradient Overlay */}
              <div className="retail-hero-overlay" />

              {/* Telemetry Badge 1: Stock Level Real-time (Matching User Mockup) */}
              <div className="retail-hud-badge badge-stock">
                <div className="retail-icon-wrap icon-barcode">
                  <ScanLine className="retail-hud-svg" />
                </div>
                <div className="retail-hud-info">
                  <span className="retail-hud-label">Stock Level</span>
                  <span className="retail-hud-val">Real-time</span>
                </div>
              </div>

              {/* Telemetry Badge 2: Forecast Precision (Mid-Left) */}
              <div className="retail-hud-badge badge-forecast">
                <div className="retail-icon-wrap icon-forecast">
                  <TrendingUp className="retail-hud-svg" />
                </div>
                <div className="retail-hud-info">
                  <span className="retail-hud-label">Forecast Accuracy</span>
                  <span className="retail-hud-val retail-hud-val-green">98.6%</span>
                </div>
              </div>

              {/* Telemetry Badge 3: Order Velocity (Bottom-Left) */}
              <div className="retail-hud-badge badge-velocity">
                <div className="retail-icon-wrap icon-velocity">
                  <PackageCheck className="retail-hud-svg" />
                </div>
                <div className="retail-hud-info">
                  <span className="retail-hud-label">Order Velocity</span>
                  <span className="retail-hud-val">Synchronized</span>
                </div>
              </div>

              {/* Corner Circular Action Trigger Button */}
              <Link
                href="/contact"
                className="retail-corner-cta"
                aria-label="Discuss Retail & Distribution Solution"
              >
                <ArrowRight className="corner-arrow-svg" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom 3-Column Section with Vertical Divider Lines */}
        <div className="retail-bottom-grid">
          {/* Column 1: What we build */}
          <div className="retail-bottom-col">
            <h4 className="retail-col-heading">What we build</h4>
            <div className="retail-feature-list">
              <div className="retail-feature-entry">
                <div className="retail-icon-container">
                  <BarChart3 className="retail-feature-icon-svg" />
                </div>
                <span className="retail-feature-text">
                  Demand and inventory forecasting
                </span>
              </div>

              <div className="retail-feature-entry">
                <div className="retail-icon-container">
                  <Layers className="retail-feature-icon-svg" />
                </div>
                <span className="retail-feature-text">
                  Order and fulfillment orchestration
                </span>
              </div>

              <div className="retail-feature-entry">
                <div className="retail-icon-container">
                  <Smartphone className="retail-feature-icon-svg" />
                </div>
                <span className="retail-feature-text">
                  Warehouse and field mobile tools
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Designed outcomes */}
          <div className="retail-bottom-col">
            <h4 className="retail-col-heading">Designed outcomes</h4>
            <div className="retail-feature-list">
              <div className="retail-feature-entry">
                <div className="retail-icon-container">
                  <CheckCircle2 className="retail-feature-icon-svg" />
                </div>
                <span className="retail-feature-text">
                  Better replenishment decisions
                </span>
              </div>

              <div className="retail-feature-entry">
                <div className="retail-icon-container">
                  <ShieldCheck className="retail-feature-icon-svg" />
                </div>
                <span className="retail-feature-text">
                  Fewer operational surprises
                </span>
              </div>

              <div className="retail-feature-entry">
                <div className="retail-icon-container">
                  <Zap className="retail-feature-icon-svg" />
                </div>
                <span className="retail-feature-text">
                  Faster order resolution
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Typical system shape & Distribution Decision Platform Visual */}
          <div className="retail-bottom-col retail-col-system">
            <h4 className="retail-col-heading">Typical system shape</h4>
            <div className="retail-system-subhead">
              <Network className="retail-system-icon" aria-hidden="true" />
              <span className="retail-system-title">
                {solution.system || "Distribution decision platform"}
              </span>
            </div>

            {/* Distribution & Shelf Replenishment Architecture Diagram */}
            <div className="retail-schematic-wrapper">
              <svg
                viewBox="0 0 340 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="retail-schematic-svg"
                aria-label="Distribution decision platform telemetry visualization showing supply pipeline and demand replenishment"
              >
                <defs>
                  {/* Subtle technical background grid */}
                  <pattern id="retailCoordGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
                  </pattern>

                  {/* Pulsing signal beacon glow */}
                  <radialGradient id="retailBeaconPulse" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff5a36" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#ff5a36" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ff5a36" stopOpacity="0" />
                  </radialGradient>

                  {/* Cyan fulfillment stream glow */}
                  <radialGradient id="retailCyanPulse" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </radialGradient>

                  {/* Emerald store beacon glow */}
                  <radialGradient id="retailEmeraldPulse" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Base Card Background Matching Section Background */}
                <rect width="340" height="220" fill="#0b0d11" rx="12" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                <rect width="340" height="220" fill="url(#retailCoordGrid)" rx="12" />

                {/* Top Status HUD Header Bar */}
                <g transform="translate(16, 14)">
                  {/* Left: Live Inventory Stream */}
                  <rect x="0" y="0" width="144" height="24" rx="12" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
                  <circle cx="12" cy="12" r="3.5" fill="#38bdf8" />
                  <circle cx="12" cy="12" r="6" fill="#38bdf8" fillOpacity="0.25" />
                  <text x="24" y="15" fill="rgba(255, 255, 255, 0.7)" fontSize="7.5" fontWeight="700" fontFamily="var(--font-sans)" letterSpacing="0.04em">
                    INVENTORY STREAM
                  </text>
                  <text x="110" y="15" fill="#38bdf8" fontSize="7.5" fontWeight="800" fontFamily="var(--font-sans)">
                    SYNC
                  </text>

                  {/* Right: Allocation Mode */}
                  <rect x="200" y="0" width="108" height="24" rx="12" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
                  <text x="254" y="15" textAnchor="middle" fill="#ff5a36" fontSize="7.5" fontWeight="750" fontFamily="var(--font-sans)" letterSpacing="0.04em">
                    PREDICTIVE ALLOC
                  </text>
                </g>

                {/* Secondary Demand Pulse Wave (Top background stream) */}
                <path
                  d="M 30 70 Q 100 55, 170 68 Q 230 62, 310 48"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.22)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Primary Fulfillment Corridor Arc */}
                <path
                  d="M 50 142 C 95 98, 125 68, 170 68 C 215 68, 245 98, 290 142"
                  fill="none"
                  stroke="rgba(255, 90, 54, 0.2)"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 50 142 C 95 98, 125 68, 170 68 C 215 68, 245 98, 290 142"
                  fill="none"
                  stroke="#ff5a36"
                  strokeWidth="2.5"
                  strokeDasharray="28 160"
                  strokeLinecap="round"
                />

                {/* In-Transit Automated Replenishment Dispatch Pill */}
                <g transform="translate(108, 92)">
                  <circle cx="0" cy="0" r="9" fill="rgba(255, 90, 54, 0.2)" />
                  <circle cx="0" cy="0" r="3.5" fill="#ff5a36" />
                  <rect x="-24" y="-20" width="48" height="14" rx="3" fill="#0b0d11" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />
                  <text x="0" y="-10" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="750" fontFamily="var(--font-sans)">
                    AUTO PICK
                  </text>
                </g>

                {/* Node 1: Central Distribution Center (DC) - Southwest, centered at x=50 */}
                <g transform="translate(50, 142)">
                  <circle cx="0" cy="0" r="14" fill="url(#retailCyanPulse)" />
                  <circle cx="0" cy="0" r="8" fill="#11141a" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="0" cy="0" r="3.5" fill="#38bdf8" />

                  <text x="0" y="24" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="750" fontFamily="var(--font-sans)">
                    Central DC
                  </text>
                  <text x="0" y="36" textAnchor="middle" fill="rgba(255, 255, 255, 0.65)" fontSize="7.5" fontWeight="500" fontFamily="var(--font-sans)">
                    Pallet Bulk Storage
                  </text>
                  <rect x="-26" y="42" width="52" height="13" rx="3" fill="rgba(56, 189, 248, 0.14)" />
                  <text x="0" y="51.5" textAnchor="middle" fill="#38bdf8" fontSize="6.5" fontWeight="700" fontFamily="var(--font-sans)">
                    99.4% IN STOCK
                  </text>
                </g>

                {/* Node 2: Decision Platform Engine - North Center, centered at x=170 */}
                <g transform="translate(170, 68)">
                  <circle cx="0" cy="0" r="24" fill="url(#retailBeaconPulse)" />
                  <circle cx="0" cy="0" r="14" fill="none" stroke="#ff5a36" strokeWidth="1" strokeDasharray="3 2" />
                  <circle cx="0" cy="0" r="7" fill="#ff5a36" />
                  <circle cx="0" cy="0" r="2.5" fill="#ffffff" />

                  <text x="0" y="26" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" fontFamily="var(--font-sans)">
                    Allocation Engine
                  </text>
                  <text x="0" y="38" textAnchor="middle" fill="#ff5a36" fontSize="7.5" fontWeight="650" fontFamily="var(--font-sans)">
                    Dynamic Reorder
                  </text>
                  <rect x="-35" y="44" width="70" height="13" rx="3" fill="rgba(255, 90, 54, 0.18)" />
                  <text x="0" y="53.5" textAnchor="middle" fill="#ff5a36" fontSize="6.5" fontWeight="750" fontFamily="var(--font-sans)">
                    PREDICTIVE ML
                  </text>
                </g>

                {/* Node 3: Retail Shelf & Store Frontline - Southeast, centered at x=290 */}
                <g transform="translate(290, 142)">
                  <circle cx="0" cy="0" r="14" fill="url(#retailEmeraldPulse)" />
                  <circle cx="0" cy="0" r="8" fill="#11141a" stroke="#10b981" strokeWidth="2" />
                  <circle cx="0" cy="0" r="3.5" fill="#10b981" />

                  <text x="0" y="24" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="750" fontFamily="var(--font-sans)">
                    Shelf &amp; Store
                  </text>
                  <text x="0" y="36" textAnchor="middle" fill="rgba(255, 255, 255, 0.65)" fontSize="7.5" fontWeight="500" fontFamily="var(--font-sans)">
                    Omnichannel Shelf
                  </text>
                  <rect x="-27" y="42" width="54" height="13" rx="3" fill="rgba(16, 185, 129, 0.16)" />
                  <text x="0" y="51.5" textAnchor="middle" fill="#10b981" fontSize="6.5" fontWeight="700" fontFamily="var(--font-sans)">
                    ZERO STOCKOUT
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
