import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Users,
  Zap,
  Wrench,
  Activity,
  Clock,
  Radio,
  Sliders,
  Sparkles,
} from "lucide-react";
import type { Solution } from "@/lib/solutions";

interface HospitalitySolutionSectionProps {
  solution: Solution;
}

export function HospitalitySolutionSection({
  solution,
}: HospitalitySolutionSectionProps) {
  return (
    <article
      className="solution-page-detail hospitality-enhanced-solution"
      id={solution.slug}
      aria-label="Hospitality & Smart Facilities Solution"
    >
      <div className="site-width hospitality-enhanced-container">
        {/* Top Dual-Column Grid */}
        <div className="hospitality-top-grid">
          {/* Left Column: Heading, Subhead, Description & Actions */}
          <div className="hospitality-copy-col">
            <div className="hospitality-kicker-group">
              <div className="hospitality-index-badge">
                <span className="hospitality-index-accent">02</span>
                <span className="hospitality-index-sep"> / </span>
                <span className="hospitality-index-total">05</span>
              </div>
              <p className="hospitality-kicker-label">INDUSTRY OPERATING SYSTEM</p>
            </div>

            <h2 className="hospitality-main-title">
              Hospitality &amp;<br />
              Smart Facilities
            </h2>

            <h3 className="hospitality-sub-headline">
              {solution.headline || "Turn buildings into responsive operating environments."}
            </h3>

            <p className="hospitality-lead-desc">
              {solution.copy ||
                "Bring occupancy, energy, equipment, service requests, and staff workflows together to improve guest experience while making facilities easier to monitor and operate."}
            </p>
          </div>

          {/* Right Column: Architectural Photography with Floating Glassmorphic HUD Telemetry */}
          <div className="hospitality-media-col" aria-hidden="true">
            <div className="hospitality-hero-card">
              {/* Background Architectural Photo */}
              <img
                src="/images/smart-facility-hospitality.jpg"
                alt="Smart facility hospitality lounge with glass facade and ambient lighting"
                className="hospitality-hero-img"
                loading="eager"
              />

              {/* Ambient Vignette Overlay */}
              <div className="hospitality-hero-overlay" />

              {/* Telemetry Badge 1: Occupancy (Top-Left) */}
              <div className="hospitality-hud-badge badge-occupancy">
                <div className="hud-icon-wrap icon-occupancy">
                  {/* Occupancy / Room Radar Icon */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="hud-info">
                  <span className="hud-label">Occupancy</span>
                  <span className="hud-val">72%</span>
                </div>
              </div>

              {/* Telemetry Badge 2: Energy Usage (Middle-Left) */}
              <div className="hospitality-hud-badge badge-energy">
                <div className="hud-icon-wrap icon-energy">
                  {/* Energy / Power Grid Icon */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div className="hud-info">
                  <span className="hud-label">Energy Usage</span>
                  <span className="hud-val hud-val-green">
                    <span className="hud-arrow-down">↓</span> 18%
                  </span>
                </div>
              </div>

              {/* Telemetry Badge 3: Maintenance (Bottom-Right) */}
              <div className="hospitality-hud-badge badge-maintenance">
                <div className="hud-icon-wrap icon-maintenance">
                  {/* Maintenance Shield Icon */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="hud-info">
                  <span className="hud-label">Maintenance</span>
                  <span className="hud-val">2 Open</span>
                </div>
              </div>

              {/* Corner Circular Action Trigger Button */}
              <Link
                href="/contact"
                className="hospitality-corner-cta"
                aria-label="Discuss Hospitality and Smart Facilities Solution"
              >
                <ArrowRight className="corner-arrow-svg" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom 3-Column Grid with Vertical Divider Lines */}
        <div className="hospitality-bottom-grid">
          {/* Column 1: What we build */}
          <div className="hospitality-bottom-col">
            <h4 className="hospitality-col-heading">What we build</h4>
            <div className="hospitality-feature-list">
              <div className="hospitality-feature-entry">
                <div className="hospitality-icon-container">
                  {/* Occupancy and Energy Intelligence */}
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
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <span className="hospitality-feature-text">
                  Occupancy and energy intelligence
                </span>
              </div>

              <div className="hospitality-feature-entry">
                <div className="hospitality-icon-container">
                  {/* Preventive Maintenance Workflows */}
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
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <span className="hospitality-feature-text">
                  Preventive maintenance workflows
                </span>
              </div>

              <div className="hospitality-feature-entry">
                <div className="hospitality-icon-container">
                  {/* Guest and Staff Service Automation */}
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
                    <path d="M18 8a6 6 0 0 0-9.33-5" />
                    <path d="m14 15 4 4 4-4" />
                    <path d="M18 19v-9" />
                    <rect x="2" y="14" width="8" height="8" rx="2" />
                  </svg>
                </div>
                <span className="hospitality-feature-text">
                  Guest and staff service automation
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Designed outcomes */}
          <div className="hospitality-bottom-col">
            <h4 className="hospitality-col-heading">Designed outcomes</h4>
            <div className="hospitality-feature-list">
              <div className="hospitality-feature-entry">
                <div className="hospitality-icon-container">
                  {/* Earlier Maintenance Action */}
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
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="hospitality-feature-text">
                  Earlier maintenance action
                </span>
              </div>

              <div className="hospitality-feature-entry">
                <div className="hospitality-icon-container">
                  {/* Better Service Coordination */}
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
                    <path d="m18 15-6-6-6 6" />
                    <path d="M12 9v12" />
                    <path d="M20 4H4" />
                  </svg>
                </div>
                <span className="hospitality-feature-text">
                  Better service coordination
                </span>
              </div>

              <div className="hospitality-feature-entry">
                <div className="hospitality-icon-container">
                  {/* More Efficient Facility Use */}
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
                    <circle cx="12" cy="12" r="7" />
                    <path d="m14 10-4 4" />
                  </svg>
                </div>
                <span className="hospitality-feature-text">
                  More efficient facility use
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Typical system shape & Digital Twin / Facility Command Visual */}
          <div className="hospitality-bottom-col hospitality-col-system">
            <h4 className="hospitality-col-heading">Typical system shape</h4>
            <div className="hospitality-system-subhead">
              <Building2 className="hospitality-system-icon" aria-hidden="true" />
              <span className="hospitality-system-title">
                {solution.system || "Smart facility command center"}
              </span>
            </div>

            {/* Smart Facility Digital Twin Command Center Visual */}
            <div className="hospitality-twin-wrapper">
              <svg
                viewBox="0 0 320 215"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hospitality-twin-svg"
                aria-label="Smart Facility Command Center telemetry visualization with building zones and telemetry feeds"
              >
                <defs>
                  {/* Glowing orange sensor gradient */}
                  <radialGradient id="sensorGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff5a36" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff5a36" stopOpacity="0" />
                  </radialGradient>
                  {/* Green energy beacon */}
                  <radialGradient id="energyGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                  {/* Subtle technical background grid */}
                  <pattern id="facilityGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
                  </pattern>
                </defs>

                {/* Background Grid */}
                <rect width="320" height="215" fill="url(#facilityGrid)" rx="8" />

                {/* Building Zone Floor Boundaries (Isometric Perspective) */}
                <g stroke="rgba(255, 255, 255, 0.16)" strokeWidth="1">
                  {/* Base Floor Boundary */}
                  <polygon
                    points="160,25 290,85 160,145 30,85"
                    fill="rgba(255, 255, 255, 0.02)"
                  />
                  {/* Zone Divisions */}
                  <line x1="160" y1="25" x2="160" y2="145" stroke="rgba(255, 255, 255, 0.08)" />
                  <line x1="95" y1="55" x2="225" y2="115" stroke="rgba(255, 255, 255, 0.08)" />
                  <line x1="225" y1="55" x2="95" y2="115" stroke="rgba(255, 255, 255, 0.08)" />

                  {/* Vertical Structural Columns */}
                  <line x1="30" y1="85" x2="30" y2="155" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />
                  <line x1="160" y1="145" x2="160" y2="205" stroke="rgba(255, 255, 255, 0.18)" strokeDasharray="3 3" />
                  <line x1="290" y1="85" x2="290" y2="155" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="3 3" />

                  {/* Sub-level Infrastructure Deck */}
                  <polygon
                    points="160,85 290,145 160,205 30,145"
                    fill="none"
                    stroke="rgba(255, 90, 54, 0.28)"
                    strokeWidth="1.2"
                  />
                </g>

                {/* Central AI Facility Controller Node */}
                <g transform="translate(160, 85)">
                  {/* Pulse Rings */}
                  <circle cx="0" cy="0" r="28" fill="url(#sensorGlow)" />
                  <circle cx="0" cy="0" r="18" fill="none" stroke="#ff5a36" strokeWidth="1" strokeDasharray="3 2" />
                  <circle cx="0" cy="0" r="8" fill="#ff5a36" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                </g>

                {/* Distributed Telemetry Nodes */}
                {/* Zone A: Guest Rooms / Occupancy */}
                <g transform="translate(100, 60)">
                  <circle cx="0" cy="0" r="14" fill="url(#sensorGlow)" />
                  <circle cx="0" cy="0" r="4" fill="#ff5a36" />
                  <line x1="0" y1="0" x2="60" y2="25" stroke="#ff5a36" strokeWidth="1.2" strokeDasharray="2 2" />
                  <text x="-5" y="-8" fill="rgba(255,255,255,0.7)" fontSize="8.5" fontFamily="var(--font-mono)">HVAC 21°C</text>
                </g>

                {/* Zone B: Energy Substation */}
                <g transform="translate(220, 60)">
                  <circle cx="0" cy="0" r="14" fill="url(#energyGlow)" />
                  <circle cx="0" cy="0" r="4" fill="#10b981" />
                  <line x1="0" y1="0" x2="-60" y2="25" stroke="#10b981" strokeWidth="1.2" strokeDasharray="2 2" />
                  <text x="-15" y="-8" fill="#10b981" fontSize="8.5" fontFamily="var(--font-mono)">PWR -18%</text>
                </g>

                {/* Zone C: Ground Maintenance / Plant */}
                <g transform="translate(160, 165)">
                  <circle cx="0" cy="0" r="14" fill="url(#sensorGlow)" />
                  <circle cx="0" cy="0" r="4" fill="#ff5a36" />
                  <line x1="0" y1="-20" x2="0" y2="-80" stroke="rgba(255,90,54,0.6)" strokeWidth="1.2" />
                  <text x="12" y="4" fill="rgba(255,255,255,0.7)" fontSize="8.5" fontFamily="var(--font-mono)">Telemetry Live</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
