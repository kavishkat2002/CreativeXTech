import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  LayoutDashboard,
  Zap,
  CheckCircle,
  Briefcase,
  Search,
  Sparkles,
  Database,
  ShieldCheck,
  Send,
} from "lucide-react";
import type { Solution } from "@/lib/solutions";

interface ProfessionalServicesSolutionSectionProps {
  solution: Solution;
}

export function ProfessionalServicesSolutionSection({
  solution,
}: ProfessionalServicesSolutionSectionProps) {
  return (
    <article
      className="solution-page-detail services-enhanced-solution"
      id={solution.slug}
      aria-label="Professional Services Solution"
    >
      <div className="site-width services-enhanced-container">
        {/* Top Dual-Column Grid Matching User Mockup */}
        <div className="services-top-grid">
          {/* Left Column: Heading, Subhead & Description */}
          <div className="services-copy-col">
            <div className="services-kicker-group">
              <div className="services-index-badge">
                <span className="services-index-accent">05</span>
                <span className="services-index-sep"> / </span>
                <span className="services-index-total">05</span>
              </div>
              <p className="services-kicker-label">INDUSTRY OPERATING SYSTEM</p>
            </div>

            <h2 className="services-main-title">
              Professional Services
            </h2>

            <h3 className="services-sub-headline">
              {solution.headline || "Make firm knowledge easier to find, apply, and scale."}
            </h3>

            <p className="services-lead-desc">
              {solution.copy ||
                "Give teams governed access to trusted knowledge, automate repeatable document work, and create visibility across proposals, engagements, and client delivery."}
            </p>
          </div>

          {/* Right Column: Executive Firm Workspace Photography with Floating AI Assistant Card */}
          <div className="services-media-col" aria-hidden="true">
            <div className="services-hero-card">
              <img
                src="/images/professional-services-office.jpg"
                alt="Executive corporate professional services advisory office"
                className="services-hero-img"
                loading="eager"
              />

              {/* Ambient Soft Overlay */}
              <div className="services-hero-overlay" />

              {/* Floating AI Assistant Card (Matching User Mockup) */}
              <div className="services-assistant-card">
                <div className="assistant-card-header">
                  <div className="assistant-title-row">
                    <div className="assistant-sparkle-dot">
                      <Sparkles className="assistant-sparkle-icon" />
                    </div>
                    <h4 className="assistant-card-title">AI Assistant</h4>
                  </div>
                  <p className="assistant-card-sub">
                    Find knowledge, create drafts, answer client questions.
                  </p>
                </div>

                <div className="assistant-input-pill">
                  <span className="assistant-placeholder">Ask a question...</span>
                  <div className="assistant-enter-btn">
                    <ArrowRight className="assistant-arrow-icon" />
                  </div>
                </div>
              </div>

              {/* Corner Circular Action Trigger Button */}
              <Link
                href="/contact"
                className="services-corner-cta"
                aria-label="Discuss Professional Services Solution"
              >
                <ArrowRight className="corner-arrow-svg" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom 3-Column Section with Vertical Divider Lines */}
        <div className="services-bottom-grid">
          {/* Column 1: What we build */}
          <div className="services-bottom-col">
            <h4 className="services-col-heading">What we build</h4>
            <div className="services-feature-list">
              <div className="services-feature-entry">
                <div className="services-icon-container">
                  <BookOpen className="services-feature-icon-svg" />
                </div>
                <span className="services-feature-text">
                  Knowledge and research copilots
                </span>
              </div>

              <div className="services-feature-entry">
                <div className="services-icon-container">
                  <FileText className="services-feature-icon-svg" />
                </div>
                <span className="services-feature-text">
                  Proposal and document automation
                </span>
              </div>

              <div className="services-feature-entry">
                <div className="services-icon-container">
                  <LayoutDashboard className="services-feature-icon-svg" />
                </div>
                <span className="services-feature-text">
                  Client delivery dashboards
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Designed outcomes */}
          <div className="services-bottom-col">
            <h4 className="services-col-heading">Designed outcomes</h4>
            <div className="services-feature-list">
              <div className="services-feature-entry">
                <div className="services-icon-container">
                  <Zap className="services-feature-icon-svg" />
                </div>
                <span className="services-feature-text">
                  Faster knowledge access
                </span>
              </div>

              <div className="services-feature-entry">
                <div className="services-icon-container">
                  <CheckCircle className="services-feature-icon-svg" />
                </div>
                <span className="services-feature-text">
                  More consistent delivery
                </span>
              </div>

              <div className="services-feature-entry">
                <div className="services-icon-container">
                  <ShieldCheck className="services-feature-icon-svg" />
                </div>
                <span className="services-feature-text">
                  Less administrative work
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Typical system shape & Firm Intelligence Workspace Visual */}
          <div className="services-bottom-col services-col-system">
            <h4 className="services-col-heading">Typical system shape</h4>
            <div className="services-system-subhead">
              <Briefcase className="services-system-icon" aria-hidden="true" />
              <span className="services-system-title">
                {solution.system || "Firm intelligence workspace"}
              </span>
            </div>

            {/* Knowledge Graph & Firm Intelligence Architecture Diagram */}
            <div className="services-schematic-wrapper">
              <svg
                viewBox="0 0 340 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="services-schematic-svg"
                aria-label="Firm intelligence workspace visualization showing knowledge synthesis and verified delivery pipeline"
              >
                <defs>
                  {/* Subtle technical coordinate grid */}
                  <pattern id="servicesCoordGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(11, 12, 11, 0.04)" strokeWidth="0.8" />
                  </pattern>

                  {/* Knowledge synthesizer orange glow */}
                  <radialGradient id="firmKnowledgeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff5a36" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#ff5a36" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ff5a36" stopOpacity="0" />
                  </radialGradient>

                  {/* Document corpus blue glow */}
                  <radialGradient id="corpusBlueGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </radialGradient>

                  {/* Delivery emerald glow */}
                  <radialGradient id="deliveryEmeraldGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Base Card Background Matching Section Background */}
                <rect width="340" height="220" fill="var(--paper-bright)" rx="12" stroke="rgba(11, 12, 11, 0.12)" strokeWidth="1" />
                <rect width="340" height="220" fill="url(#servicesCoordGrid)" rx="12" />

                {/* Top Status HUD Header Bar */}
                <g transform="translate(16, 14)">
                  {/* Left: Governed Access Status */}
                  <rect x="0" y="0" width="146" height="24" rx="12" fill="var(--paper-bright)" stroke="rgba(11, 12, 11, 0.12)" strokeWidth="1" />
                  <circle cx="12" cy="12" r="3.5" fill="#3b82f6" />
                  <circle cx="12" cy="12" r="6" fill="#3b82f6" fillOpacity="0.25" />
                  <text x="24" y="15" fill="#475569" fontSize="7.5" fontWeight="700" fontFamily="var(--font-sans)" letterSpacing="0.04em">
                    KNOWLEDGE CORPUS
                  </text>
                  <text x="115" y="15" fill="#3b82f6" fontSize="7.5" fontWeight="800" fontFamily="var(--font-sans)">
                    RAG
                  </text>

                  {/* Right: Synthesis Mode */}
                  <rect x="206" y="0" width="102" height="24" rx="12" fill="var(--paper-bright)" stroke="rgba(11, 12, 11, 0.12)" strokeWidth="1" />
                  <text x="257" y="15" textAnchor="middle" fill="#ff5a36" fontSize="7.5" fontWeight="750" fontFamily="var(--font-sans)" letterSpacing="0.04em">
                    GOVERNED PIPELINE
                  </text>
                </g>

                {/* Secondary Citation Line (Dashed guide stream) */}
                <path
                  d="M 30 70 Q 100 58, 170 68 Q 230 62, 310 50"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Primary Knowledge Pipeline Arc */}
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

                {/* Verified Synthesis Active Marker */}
                <g transform="translate(108, 92)">
                  <circle cx="0" cy="0" r="9" fill="rgba(255, 90, 54, 0.2)" />
                  <circle cx="0" cy="0" r="3.5" fill="#ff5a36" />
                  <rect x="-26" y="-20" width="52" height="14" rx="3" fill="#0f172a" />
                  <text x="0" y="-10" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="750" fontFamily="var(--font-sans)">
                    SYNTHESIZE
                  </text>
                </g>

                {/* Node 1: Firm Knowledge Vault (Precedents & Documents) - Southwest, x=50 */}
                <g transform="translate(50, 142)">
                  <circle cx="0" cy="0" r="14" fill="url(#corpusBlueGlow)" />
                  <circle cx="0" cy="0" r="8" fill="var(--paper-bright)" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="0" cy="0" r="3.5" fill="#3b82f6" />

                  <text x="0" y="24" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="750" fontFamily="var(--font-sans)">
                    Knowledge Vault
                  </text>
                  <text x="0" y="36" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="500" fontFamily="var(--font-sans)">
                    Precedents &amp; Briefs
                  </text>
                  <rect x="-27" y="42" width="54" height="13" rx="3" fill="rgba(59, 130, 246, 0.1)" />
                  <text x="0" y="51.5" textAnchor="middle" fill="#2563eb" fontSize="6.5" fontWeight="700" fontFamily="var(--font-sans)">
                    100% GOVERNED
                  </text>
                </g>

                {/* Node 2: Copilot Intelligence Engine - North Center, x=170 */}
                <g transform="translate(170, 68)">
                  <circle cx="0" cy="0" r="24" fill="url(#firmKnowledgeGlow)" />
                  <circle cx="0" cy="0" r="14" fill="none" stroke="#ff5a36" strokeWidth="1" strokeDasharray="3 2" />
                  <circle cx="0" cy="0" r="7" fill="#ff5a36" />
                  <circle cx="0" cy="0" r="2.5" fill="#ffffff" />

                  <text x="0" y="26" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="800" fontFamily="var(--font-sans)">
                    Firm Copilot Engine
                  </text>
                  <text x="0" y="38" textAnchor="middle" fill="#ea580c" fontSize="7.5" fontWeight="650" fontFamily="var(--font-sans)">
                    Draft &amp; Citations
                  </text>
                  <rect x="-35" y="44" width="70" height="13" rx="3" fill="rgba(255, 90, 54, 0.1)" />
                  <text x="0" y="53.5" textAnchor="middle" fill="#ea580c" fontSize="6.5" fontWeight="750" fontFamily="var(--font-sans)">
                    CITATION LINKED
                  </text>
                </g>

                {/* Node 3: Client Delivery Workspace - Southeast, x=290 */}
                <g transform="translate(290, 142)">
                  <circle cx="0" cy="0" r="14" fill="url(#deliveryEmeraldGlow)" />
                  <circle cx="0" cy="0" r="8" fill="var(--paper-bright)" stroke="#10b981" strokeWidth="2" />
                  <circle cx="0" cy="0" r="3.5" fill="#10b981" />

                  <text x="0" y="24" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="750" fontFamily="var(--font-sans)">
                    Client Delivery
                  </text>
                  <text x="0" y="36" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="500" fontFamily="var(--font-sans)">
                    Proposal &amp; Insights
                  </text>
                  <rect x="-26" y="42" width="52" height="13" rx="3" fill="rgba(16, 185, 129, 0.1)" />
                  <text x="0" y="51.5" textAnchor="middle" fill="#059669" fontSize="6.5" fontWeight="700" fontFamily="var(--font-sans)">
                    ZERO ADMIN LAG
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
