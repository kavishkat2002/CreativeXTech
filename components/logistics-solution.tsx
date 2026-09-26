import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ship,
  FileCheck,
  Clock,
  Globe2,
  TrendingUp,
  ShieldCheck,
  Workflow,
  Radio,
  Boxes,
  Compass,
} from "lucide-react";
import type { Solution } from "@/lib/solutions";

interface LogisticsSolutionSectionProps {
  solution: Solution;
}

export function LogisticsSolutionSection({
  solution,
}: LogisticsSolutionSectionProps) {
  return (
    <article
      className="solution-page-detail logistics-enhanced-solution"
      id={solution.slug}
      aria-label="Export & Logistics Solution"
    >
      <div className="site-width logistics-enhanced-container">
        {/* Top Two-Column Grid Matching User Mockup */}
        <div className="logistics-top-grid">
          {/* Left Column: Heading, Subhead & Description */}
          <div className="logistics-copy-col">
            <div className="logistics-kicker-group">
              <div className="logistics-index-badge">
                <span className="logistics-index-accent">03</span>
                <span className="logistics-index-sep"> / </span>
                <span className="logistics-index-total">05</span>
              </div>
              <p className="logistics-kicker-label">INDUSTRY OPERATING SYSTEM</p>
            </div>

            <h2 className="logistics-main-title">
              Export &amp; Logistics
            </h2>

            <h3 className="logistics-sub-headline">
              {solution.headline || "Move goods with fewer blind spots and manual hand-offs."}
            </h3>

            <p className="logistics-lead-desc">
              {solution.copy ||
                "Connect shipment data, documents, teams, and exceptions in one operating layer so people can see what needs attention and act before delays become customer problems."}
            </p>
          </div>

          {/* Right Column: High-Resolution Container Port with Telemetry & Action Trigger */}
          <div className="logistics-media-col" aria-hidden="true">
            <div className="logistics-hero-card">
              <img
                src="/images/export-logistics-port.jpg"
                alt="Commercial container shipping port with gantry cranes at sunset"
                className="logistics-hero-img"
                loading="eager"
              />

              {/* Ambient Shadow Overlay */}
              <div className="logistics-hero-overlay" />

              {/* Telemetry Badge 1: Active Fleet / TEU (Top-Left) */}
              <div className="logistics-hud-badge badge-fleet">
                <div className="hud-icon-wrap icon-ship">
                  <Ship className="hud-svg" />
                </div>
                <div className="hud-info">
                  <span className="hud-label">Vessel Fleet</span>
                  <span className="hud-val">1,420 TEU</span>
                </div>
              </div>

              {/* Telemetry Badge 2: ETA Accuracy (Middle-Left) */}
              <div className="logistics-hud-badge badge-eta">
                <div className="hud-icon-wrap icon-eta">
                  <TrendingUp className="hud-svg" />
                </div>
                <div className="hud-info">
                  <span className="hud-label">ETA Precision</span>
                  <span className="hud-val hud-val-green">99.4%</span>
                </div>
              </div>

              {/* Telemetry Badge 3: Customs Clearance (Bottom-Left) */}
              <div className="logistics-hud-badge badge-compliance">
                <div className="hud-icon-wrap icon-compliance">
                  <ShieldCheck className="hud-svg" />
                </div>
                <div className="hud-info">
                  <span className="hud-label">Compliance</span>
                  <span className="hud-val">Automated</span>
                </div>
              </div>

              {/* Corner Circular Action Trigger Button */}
              <Link
                href="/contact"
                className="logistics-corner-cta"
                aria-label="Discuss Export and Logistics Solution"
              >
                <ArrowRight className="corner-arrow-svg" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom 3-Column Section with Vertical Divider Lines */}
        <div className="logistics-bottom-grid">
          {/* Column 1: What we build */}
          <div className="logistics-bottom-col">
            <h4 className="logistics-col-heading">What we build</h4>
            <div className="logistics-feature-list">
              <div className="logistics-feature-entry">
                <div className="logistics-icon-container">
                  {/* Document & compliance automation */}
                  <FileCheck className="feature-icon-svg" />
                </div>
                <span className="logistics-feature-text">
                  Document and compliance automation
                </span>
              </div>

              <div className="logistics-feature-entry">
                <div className="logistics-icon-container">
                  {/* Predictive ETA & exception handling */}
                  <Clock className="feature-icon-svg" />
                </div>
                <span className="logistics-feature-text">
                  Predictive ETA and exception handling
                </span>
              </div>

              <div className="logistics-feature-entry">
                <div className="logistics-icon-container">
                  {/* Shipment visibility & customer portals */}
                  <Globe2 className="feature-icon-svg" />
                </div>
                <span className="logistics-feature-text">
                  Shipment visibility and customer portals
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Designed outcomes */}
          <div className="logistics-bottom-col">
            <h4 className="logistics-col-heading">Designed outcomes</h4>
            <div className="logistics-feature-list">
              <div className="logistics-feature-entry">
                <div className="logistics-icon-container">
                  {/* Faster exception response */}
                  <TrendingUp className="feature-icon-svg" />
                </div>
                <span className="logistics-feature-text">
                  Faster exception response
                </span>
              </div>

              <div className="logistics-feature-entry">
                <div className="logistics-icon-container">
                  {/* Clearer operational visibility */}
                  <Compass className="feature-icon-svg" />
                </div>
                <span className="logistics-feature-text">
                  Clearer operational visibility
                </span>
              </div>

              <div className="logistics-feature-entry">
                <div className="logistics-icon-container">
                  {/* Less repetitive coordination */}
                  <Workflow className="feature-icon-svg" />
                </div>
                <span className="logistics-feature-text">
                  Less repetitive coordination
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Typical system shape & Operations Intelligence Platform Visual */}
          <div className="logistics-bottom-col logistics-col-system">
            <h4 className="logistics-col-heading">Typical system shape</h4>
            <div className="logistics-system-subhead">
              <Boxes className="logistics-system-icon" aria-hidden="true" />
              <span className="logistics-system-title">
                {solution.system || "Operations intelligence platform"}
              </span>
            </div>

            {/* Maritime Trade Corridor & Route Telemetry Diagram */}
            <div className="logistics-schematic-wrapper">
              <svg
                viewBox="0 0 340 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logistics-schematic-svg"
                aria-label="Operations intelligence telemetry diagram showing ocean freight corridors and port telemetry nodes"
              >
                <defs>
                  {/* Ambient coordinate radar grid */}
                  <pattern id="logisticsCoordGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(11, 12, 11, 0.05)" strokeWidth="0.8" />
                  </pattern>
                  {/* Port beacon radar glow */}
                  <radialGradient id="portBeaconPulse" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff5a36" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#ff5a36" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ff5a36" stopOpacity="0" />
                  </radialGradient>
                  {/* Destination emerald glow */}
                  <radialGradient id="destBeaconPulse" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Base Card Background Matching Section Background */}
                <rect width="340" height="220" fill="var(--paper-bright)" rx="12" stroke="rgba(11, 12, 11, 0.12)" strokeWidth="1" />
                <rect width="340" height="220" fill="url(#logisticsCoordGrid)" rx="12" />

                {/* Top Status HUD Header Bar */}
                <g transform="translate(16, 14)">
                  {/* Left: Container Feed Badge */}
                  <rect x="0" y="0" width="138" height="24" rx="12" fill="var(--paper-bright)" stroke="rgba(11, 12, 11, 0.12)" strokeWidth="1" />
                  <circle cx="12" cy="12" r="3.5" fill="#10b981" />
                  <circle cx="12" cy="12" r="6" fill="#10b981" fillOpacity="0.25" />
                  <text x="24" y="15" fill="#475569" fontSize="7.5" fontWeight="700" fontFamily="var(--font-sans)" letterSpacing="0.04em">
                    CONTAINER FEED
                  </text>
                  <text x="96" y="15" fill="#ff5a36" fontSize="7.5" fontWeight="800" fontFamily="var(--font-sans)">
                    LIVE
                  </text>

                  {/* Right: Route Telemetry Pill */}
                  <rect x="208" y="0" width="100" height="24" rx="12" fill="var(--paper-bright)" stroke="rgba(11, 12, 11, 0.12)" strokeWidth="1" />
                  <text x="258" y="15" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="750" fontFamily="var(--font-sans)" letterSpacing="0.04em">
                    ROUTE: CMB → RTM
                  </text>
                </g>

                {/* Secondary Feeder Line (Intermodal Feeder Stream) */}
                <path
                  d="M 30 70 Q 100 60, 170 68 Q 230 65, 310 50"
                  fill="none"
                  stroke="rgba(100, 116, 139, 0.18)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Primary Trade Corridor Sea Lane (Arching Curve) */}
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

                {/* In-Transit Cargo Vessel Beacon (Mid-corridor) */}
                <g transform="translate(108, 92)">
                  <circle cx="0" cy="0" r="9" fill="rgba(255, 90, 54, 0.2)" />
                  <circle cx="0" cy="0" r="3.5" fill="#ff5a36" />
                  <rect x="-24" y="-20" width="48" height="14" rx="3" fill="#0f172a" />
                  <text x="0" y="-10" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="750" fontFamily="var(--font-sans)">
                    IN TRANSIT
                  </text>
                </g>

                {/* Node 1: Origin Terminal (Southwest, centered at x=50) */}
                <g transform="translate(50, 142)">
                  <circle cx="0" cy="0" r="14" fill="rgba(15, 23, 42, 0.06)" />
                  <circle cx="0" cy="0" r="8" fill="var(--paper-bright)" stroke="#0f172a" strokeWidth="2" />
                  <circle cx="0" cy="0" r="3.5" fill="#0f172a" />

                  <text x="0" y="24" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="750" fontFamily="var(--font-sans)">
                    Origin Terminal
                  </text>
                  <text x="0" y="36" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="500" fontFamily="var(--font-sans)">
                    Port of Colombo
                  </text>
                  <rect x="-26" y="42" width="52" height="13" rx="3" fill="rgba(15, 23, 42, 0.05)" />
                  <text x="0" y="51.5" textAnchor="middle" fill="#334155" fontSize="6.5" fontWeight="700" fontFamily="var(--font-sans)">
                    DEP 06:40
                  </text>
                </g>

                {/* Node 2: Central Port Command & Clearance Hub (North Center, centered at x=170) */}
                <g transform="translate(170, 68)">
                  <circle cx="0" cy="0" r="24" fill="url(#portBeaconPulse)" />
                  <circle cx="0" cy="0" r="14" fill="none" stroke="#ff5a36" strokeWidth="1" strokeDasharray="3 2" />
                  <circle cx="0" cy="0" r="7" fill="#ff5a36" />
                  <circle cx="0" cy="0" r="2.5" fill="#ffffff" />

                  <text x="0" y="26" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="800" fontFamily="var(--font-sans)">
                    Central Port Hub
                  </text>
                  <text x="0" y="38" textAnchor="middle" fill="#ea580c" fontSize="7.5" fontWeight="650" fontFamily="var(--font-sans)">
                    Clearance 100%
                  </text>
                  <rect x="-35" y="44" width="70" height="13" rx="3" fill="rgba(255, 90, 54, 0.1)" />
                  <text x="0" y="53.5" textAnchor="middle" fill="#ea580c" fontSize="6.5" fontWeight="750" fontFamily="var(--font-sans)">
                    AUTO VERIFIED
                  </text>
                </g>

                {/* Node 3: Global Destination Terminal (Southeast, centered at x=290) */}
                <g transform="translate(290, 142)">
                  <circle cx="0" cy="0" r="14" fill="url(#destBeaconPulse)" />
                  <circle cx="0" cy="0" r="8" fill="var(--paper-bright)" stroke="#10b981" strokeWidth="2" />
                  <circle cx="0" cy="0" r="3.5" fill="#10b981" />

                  <text x="0" y="24" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="750" fontFamily="var(--font-sans)">
                    Global Destination
                  </text>
                  <text x="0" y="36" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="500" fontFamily="var(--font-sans)">
                    Port of Rotterdam
                  </text>
                  <rect x="-27" y="42" width="54" height="13" rx="3" fill="rgba(16, 185, 129, 0.1)" />
                  <text x="0" y="51.5" textAnchor="middle" fill="#059669" fontSize="6.5" fontWeight="700" fontFamily="var(--font-sans)">
                    ETA ON TIME
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
