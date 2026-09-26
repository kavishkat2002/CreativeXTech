"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

// World map continent SVG paths (Miller projection)
const continentPaths = [
  // Africa
  "M 156.0 173.9 L 170.6 175.0 L 196.3 170.2 L 222.0 168.7 L 227.6 170.6 L 226.7 181.2 L 236.6 184.9 L 250.7 191.2 L 266.1 187.9 L 274.3 185.3 L 287.1 190.1 L 309.0 190.8 L 315.0 189.7 L 318.4 191.2 L 319.3 196.0 L 327.0 203.7 L 324.9 205.9 L 338.1 225.0 L 339.9 233.9 L 349.3 248.6 L 363.0 258.2 L 364.7 263.3 L 399.4 262.6 L 399.9 267.7 L 394.3 276.6 L 387.9 286.5 L 374.1 298.6 L 359.6 310.4 L 348.4 323.3 L 349.7 331.8 L 353.6 344.6 L 354.0 361.9 L 342.9 368.6 L 330.0 379.6 L 331.3 396.2 L 321.0 401.7 L 318.9 410.9 L 309.4 420.1 L 290.1 431.1 L 265.7 434.1 L 259.3 430.8 L 256.3 421.9 L 250.7 411.2 L 245.1 403.9 L 241.3 387.0 L 230.6 372.2 L 231.9 361.2 L 238.3 351.3 L 235.7 339.1 L 232.7 328.1 L 230.6 322.6 L 220.3 309.7 L 222.0 298.6 L 216.4 289.4 L 205.7 290.2 L 180.0 285.8 L 167.1 287.6 L 147.9 290.2 L 132.9 282.1 L 123.4 272.9 L 112.3 263.7 L 105.0 251.9 L 109.3 247.1 L 107.1 229.5 L 111.4 219.5 L 126.4 203.0 L 138.0 193.8 L 147.9 182.7 L 156.0 173.9 Z",
  // Madagascar
  "M 391.3 350.2 L 395.1 357.5 L 393.4 364.9 L 390.4 375.9 L 385.7 387.0 L 381.4 398.0 L 373.7 400.2 L 367.3 392.5 L 368.6 381.4 L 370.3 364.9 L 386.6 354.9 L 391.3 350.2 Z",
  // Europe
  "M 156.0 173.5 L 171.0 170.9 L 177.0 166.9 L 184.3 155.1 L 193.7 150.0 L 200.6 146.3 L 211.3 145.2 L 222.9 144.1 L 232.3 152.2 L 240.9 155.9 L 246.9 165.4 L 248.6 166.2 L 255.0 157.0 L 248.6 154.0 L 238.3 145.9 L 232.7 138.6 L 238.3 137.8 L 243.4 141.1 L 258.4 149.6 L 263.6 155.1 L 265.7 160.6 L 273.0 166.2 L 276.4 171.7 L 282.9 168.0 L 280.7 162.5 L 282.9 157.0 L 291.4 155.9 L 303.9 154.4 L 297.9 149.6 L 303.0 143.3 L 307.3 139.3 L 315.0 134.9 L 332.1 139.3 L 342.9 134.9 L 351.4 133.0 L 368.6 127.5 L 381.4 118.3 L 402.9 107.3 L 428.6 99.9 L 432.9 85.2 L 432.9 70.5 L 437.1 57.6 L 394.3 53.9 L 368.6 59.4 L 351.4 63.1 L 342.9 55.8 L 321.4 50.2 L 297.9 44.7 L 282.9 46.6 L 248.6 55.8 L 218.6 74.2 L 201.4 88.9 L 210.0 92.6 L 216.4 101.8 L 218.6 107.3 L 210.0 109.1 L 195.0 116.5 L 186.4 122.0 L 160.7 127.5 L 169.3 133.0 L 172.3 145.9 L 154.3 144.8 L 141.9 151.4 L 141.4 169.8 L 156.0 173.5 Z",
  // British Isles
  "M 157.7 122.0 L 169.3 120.2 L 185.6 118.3 L 187.3 112.8 L 180.9 109.1 L 173.6 103.6 L 171.4 96.2 L 167.1 90.7 L 158.6 90.7 L 155.1 96.2 L 159.4 101.8 L 167.1 105.4 L 160.7 111.0 L 158.6 116.5 L 160.7 121.3 L 157.7 122.0 Z",
  // Ireland
  "M 139.3 116.5 L 152.1 114.6 L 154.3 109.1 L 150.0 102.9 L 141.4 105.4 L 137.1 112.8 L 139.3 116.5 Z",
  // Scandinavia
  "M 233.6 99.9 L 240.0 101.8 L 248.6 99.9 L 259.3 88.9 L 265.7 72.3 L 285.0 65.0 L 289.3 66.8 L 291.4 85.2 L 304.3 85.2 L 308.6 66.8 L 304.3 55.8 L 300.0 48.4 L 282.9 46.6 L 248.6 55.8 L 231.4 70.5 L 225.0 85.2 L 227.1 88.9 L 233.6 99.9 Z",
  // Arabian Peninsula (Saudi Arabia, UAE, Oman, Yemen)
  "M 319.3 195.6 L 327.9 190.1 L 330.0 197.4 L 327.9 203.0 L 336.4 210.3 L 347.1 223.2 L 351.4 232.4 L 362.1 243.4 L 364.3 252.6 L 366.4 259.6 L 372.9 258.9 L 387.9 254.5 L 402.9 249.0 L 415.7 243.4 L 432.0 230.6 L 436.3 223.2 L 426.4 217.7 L 421.3 212.2 L 421.3 209.6 L 415.7 214.0 L 413.1 216.6 L 405.0 217.7 L 400.7 212.2 L 396.4 210.3 L 392.1 204.8 L 387.9 199.3 L 385.7 195.6 L 319.3 195.6 Z",
  // India & Subcontinent
  "M 469.3 214.0 L 474.9 217.7 L 480.0 221.4 L 480.0 228.7 L 490.7 228.7 L 492.0 236.1 L 495.0 247.1 L 500.6 258.2 L 505.7 269.2 L 512.1 276.2 L 515.1 274.7 L 519.4 271.8 L 522.0 267.4 L 524.1 258.2 L 529.3 247.1 L 536.6 241.6 L 544.3 234.2 L 552.9 226.9 L 561.4 225.0 L 567.4 218.4 L 573.4 225.0 L 575.1 228.7 L 580.7 221.4 L 578.6 210.3 L 561.4 204.8 L 544.3 203.0 L 525.0 195.6 L 505.7 188.2 L 499.3 179.0 L 486.4 186.4 L 480.0 195.6 L 471.4 206.6 L 469.3 214.0 Z",
  // Sri Lanka
  "M 523.7 269.9 L 526.3 272.9 L 528.4 274.7 L 530.6 278.4 L 530.6 281.0 L 527.1 283.9 L 525.0 284.3 L 522.4 283.2 L 522.0 280.2 L 522.0 276.6 L 522.9 272.9 L 523.7 269.9 Z",
  // East Asia & China Main
  "M 685.7 158.8 L 683.6 164.3 L 692.1 169.8 L 696.4 173.5 L 693.4 179.0 L 698.6 188.2 L 702.0 195.6 L 698.6 203.0 L 690.0 214.0 L 681.4 219.5 L 670.7 223.2 L 655.7 226.9 L 645.0 228.7 L 634.3 232.4 L 634.3 239.8 L 642.9 247.1 L 647.1 258.2 L 645.0 265.5 L 638.6 267.4 L 625.7 269.2 L 615.0 261.8 L 610.7 256.3 L 606.4 265.5 L 602.1 276.6 L 608.6 283.9 L 612.9 291.3 L 619.3 298.6 L 624.9 301.2 L 626.6 296.8 L 623.6 287.6 L 612.9 280.2 L 604.3 269.2 L 600.0 258.2 L 597.9 247.1 L 582.9 239.8 L 574.3 228.7 L 600.0 210.3 L 608.6 188.2 L 617.1 173.5 L 651.4 158.8 L 685.7 158.8 Z",
  // Korean Peninsula
  "M 715.7 166.2 L 722.1 168.0 L 722.1 173.5 L 720.0 179.0 L 732.9 177.2 L 735.0 169.8 L 728.6 162.5 L 730.7 158.8 L 715.7 166.2 Z",
  // Japan
  "M 784.3 153.3 L 788.6 162.5 L 782.1 173.5 L 777.9 177.2 L 767.1 179.0 L 760.7 182.7 L 745.7 184.6 L 739.3 190.1 L 737.1 182.7 L 750.0 175.4 L 767.1 169.8 L 777.9 164.3 L 780.0 157.0 L 784.3 153.3 Z",
  // Russia / Northern Asia
  "M 428.6 99.9 L 480.0 85.2 L 488.6 66.8 L 497.1 48.4 L 522.9 37.4 L 587.1 26.3 L 630.0 20.8 L 715.7 33.7 L 780.0 41.0 L 865.7 48.4 L 908.6 63.1 L 887.1 85.2 L 865.7 103.6 L 848.6 118.3 L 788.6 107.3 L 762.9 136.7 L 745.7 147.8 L 737.1 151.4 L 715.7 140.4 L 694.3 129.4 L 672.9 122.0 L 587.1 114.6 L 522.9 114.6 L 458.6 107.3 L 428.6 99.9 Z",
  // Borneo
  "M 681.4 280.2 L 687.9 285.8 L 685.7 291.3 L 683.6 298.6 L 653.6 302.3 L 649.3 300.5 L 668.6 291.3 L 675.0 287.6 L 681.4 280.2 Z",
  // Sumatra
  "M 588.4 285.8 L 602.1 295.0 L 617.1 306.0 L 627.9 317.0 L 634.3 327.3 L 621.4 322.6 L 610.7 313.4 L 602.1 304.2 L 595.7 295.0 L 588.4 285.8 Z",
  // Java
  "M 634.3 328.1 L 651.4 329.9 L 666.4 333.6 L 668.6 337.3 L 649.3 333.6 L 632.1 329.9 L 634.3 328.1 Z",
  // Philippines
  "M 700.7 237.9 L 705.0 245.3 L 711.4 254.5 L 715.7 260.0 L 720.0 276.6 L 715.7 283.9 L 707.1 274.7 L 700.7 261.8 L 694.3 247.1 L 700.7 237.9 Z",
  // Australia
  "M 790.7 346.5 L 799.3 357.5 L 810.0 375.9 L 827.1 392.5 L 837.9 407.2 L 833.6 423.8 L 826.3 434.8 L 822.9 444.0 L 807.9 448.8 L 784.3 446.6 L 767.1 438.5 L 754.3 427.4 L 747.9 423.8 L 707.1 431.1 L 685.7 434.8 L 672.9 431.1 L 675.0 421.9 L 665.1 401.7 L 668.6 387.0 L 694.3 377.8 L 709.3 364.9 L 720.0 357.5 L 741.4 352.0 L 762.9 350.2 L 765.0 363.0 L 775.7 366.7 L 786.4 353.8 L 790.7 346.5 Z",
  // Tasmania
  "M 801.4 456.9 L 814.3 456.9 L 810.0 466.1 L 801.4 464.2 L 801.4 456.9 Z",
  // New Zealand
  "M 923.6 434.8 L 942.9 444.0 L 932.1 456.9 L 919.3 466.1 L 900.0 477.1 L 902.1 467.9 L 917.1 458.7 L 925.7 449.5 L 923.6 434.8 Z",
];

// Market nodes with metadata
interface Market {
  id: string;
  name: string;
  flag: string;
  code: string;
  role: "home" | "client";
  roleLabel: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  labelAnchor: "start" | "middle" | "end";
  timezone: string;
  focus: string;
  details: string;
  // Arc path from Sri Lanka (526.2, 277.0)
  arcPath?: string;
  echoArcs?: string[];
}

const SRI_LANKA_COORDS = { x: 526.2, y: 277.0 };

const markets: Market[] = [
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    flag: "🇱🇰",
    code: "LK",
    role: "home",
    roleLabel: "Global Engineering HQ",
    x: 526.2,
    y: 277.0,
    labelX: 526.2,
    labelY: 308,
    labelAnchor: "middle",
    timezone: "UTC+5:30 (Colombo)",
    focus: "Autonomous AI Agents · Core Architecture · IoT Systems",
    details:
      "Global headquarters and central engineering labs. Designing high-throughput AI orchestration, cloud platforms, and mission-critical production systems.",
  },
  {
    id: "uae",
    name: "UAE",
    flag: "🇦🇪",
    code: "AE",
    role: "client",
    roleLabel: "Middle East Operations",
    x: 413.0,
    y: 216.0,
    labelX: 400.0,
    labelY: 211.0,
    labelAnchor: "end",
    timezone: "UTC+4:00 (Dubai / Abu Dhabi)",
    focus: "Enterprise AI Automation · Cloud Solutions · Customer Portals",
    details:
      "Enterprise systems and AI workflow modernization for regional leaders across logistics, real estate, and digital commerce.",
    arcPath: "M 526.2 277.0 Q 455 228 413.0 216.0",
    echoArcs: [
      "M 526.2 277.0 Q 448 235 413.0 216.0",
      "M 526.2 277.0 Q 462 222 413.0 216.0",
    ],
  },
  {
    id: "nepal",
    name: "Nepal",
    flag: "🇳🇵",
    code: "NP",
    role: "client",
    roleLabel: "Regional Partner",
    x: 540.5,
    y: 201.5,
    labelX: 554.0,
    labelY: 198.0,
    labelAnchor: "start",
    timezone: "UTC+5:45 (Kathmandu)",
    focus: "Digital Operations · Modernization · Data Platforms",
    details:
      "Transforming business workflows with reliable data engineering, operational dashboards, and responsive web products.",
    arcPath: "M 526.2 277.0 Q 528 232 540.5 201.5",
    echoArcs: [
      "M 526.2 277.0 Q 522 236 540.5 201.5",
      "M 526.2 277.0 Q 534 228 540.5 201.5",
    ],
  },
  {
    id: "bangladesh",
    name: "Bangladesh",
    flag: "🇧🇩",
    code: "BD",
    role: "client",
    roleLabel: "South Asia Market",
    x: 567.2,
    y: 218.9,
    labelX: 580.0,
    labelY: 224.0,
    labelAnchor: "start",
    timezone: "UTC+6:00 (Dhaka)",
    focus: "Supply Chain Workflows · ERP Integrations · Enterprise Software",
    details:
      "High-scale operating software connecting manufacturers, exporters, and distribution networks with transparent digital telemetry.",
    arcPath: "M 526.2 277.0 Q 556 242 567.2 218.9",
    echoArcs: [
      "M 526.2 277.0 Q 550 246 567.2 218.9",
      "M 526.2 277.0 Q 562 238 567.2 218.9",
    ],
  },
  {
    id: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    code: "MY",
    role: "client",
    roleLabel: "Southeast Asia Hub",
    x: 617.0,
    y: 290.5,
    labelX: 630.0,
    labelY: 294.0,
    labelAnchor: "start",
    timezone: "UTC+8:00 (Kuala Lumpur)",
    focus: "Smart Operations · Industrial IoT · Fleet Telemetry",
    details:
      "Connected IoT telemetry and field operations automation that convert real-time hardware signals into immediate business action.",
    arcPath: "M 526.2 277.0 Q 575 294 617.0 290.5",
    echoArcs: [
      "M 526.2 277.0 Q 572 299 617.0 290.5",
      "M 526.2 277.0 Q 578 288 617.0 290.5",
    ],
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    code: "AU",
    role: "client",
    roleLabel: "Asia-Pacific Market",
    x: 780.0,
    y: 409.0,
    labelX: 796.0,
    labelY: 414.0,
    labelAnchor: "start",
    timezone: "UTC+10:00 / UTC+11:00 (Sydney / Melbourne)",
    focus: "Fintech Systems · Full-Stack Web & Mobile · Cloud Infrastructure",
    details:
      "Mission-critical fintech applications, compliant cloud platforms, and consumer digital interfaces engineered for scale and speed.",
    arcPath: "M 526.2 277.0 Q 665 375 780.0 409.0",
    echoArcs: [
      "M 526.2 277.0 Q 655 382 780.0 409.0",
      "M 526.2 277.0 Q 675 368 780.0 409.0",
    ],
  },
];

export function GlobalReachSection() {
  const [activeMarketId, setActiveMarketId] = useState<string | null>(null);
  const [hoveredMarketId, setHoveredMarketId] = useState<string | null>(null);

  const currentMarket =
    markets.find((m) => m.id === (hoveredMarketId || activeMarketId)) || markets[0];

  return (
    <section id="global-reach" className="about-reach" aria-label="Global Reach">
      <div className="site-width about-reach-container">
        {/* Top/Left: Heading & Story Content */}
        <div className="about-reach-header-col">
          <div className="reach-kicker">
            <span className="reach-kicker-num">04</span>
            <span className="reach-kicker-sep">/</span>
            <span className="reach-kicker-title">GLOBAL REACH</span>
            <span className="reach-kicker-bar" aria-hidden="true" />
          </div>

          <h2 className="reach-headline">
            Built in Sri Lanka.<br />
            Connected <span className="reach-accent-text">globally.</span>
          </h2>

          <p className="reach-description">
            We work with businesses across multiple markets, bringing AI,
            software engineering and digital solutions to real-world operations.
          </p>

          {/* Interactive Market Filter Pills */}
          <div className="reach-market-tabs" role="tablist" aria-label="Select market">
            <button
              type="button"
              className={`reach-tab ${activeMarketId === null ? "is-active" : ""}`}
              onClick={() => setActiveMarketId(null)}
            >
              All Markets (6)
            </button>
            {markets.map((market) => (
              <button
                key={market.id}
                type="button"
                className={`reach-tab ${activeMarketId === market.id ? "is-active" : ""}`}
                onClick={() =>
                  setActiveMarketId(activeMarketId === market.id ? null : market.id)
                }
                onMouseEnter={() => setHoveredMarketId(market.id)}
                onMouseLeave={() => setHoveredMarketId(null)}
              >
                <span>{market.flag}</span>
                <span>{market.name}</span>
                {market.role === "home" && <span className="reach-tab-hub">HQ</span>}
              </button>
            ))}
          </div>

          {/* Active Market Detail Card (Fixed-height container to prevent layout jump) */}
          <div className="reach-card-wrapper">
            <div className="reach-market-card animate-fade-in" role="region" aria-live="polite">
              <div className="reach-card-header">
                <div className="reach-card-title-group">
                  <span className="reach-card-flag">{currentMarket.flag}</span>
                  <div>
                    <h3 className="reach-card-name">{currentMarket.name}</h3>
                    <span className="reach-card-role">{currentMarket.roleLabel}</span>
                  </div>
                </div>
                <span className="reach-card-tz">{currentMarket.timezone}</span>
              </div>
              <p className="reach-card-focus">
                <strong>Focus:</strong> {currentMarket.focus}
              </p>
              <p className="reach-card-details">{currentMarket.details}</p>
              <div className="reach-card-action">
                <a href="/contact" className="reach-card-link">
                  Discuss work in {currentMarket.name} <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Visual Legend (Matches the user's reference screenshot) */}
          <div className="reach-legend">
            <div
              className={`reach-legend-item ${activeMarketId &&
                  activeMarketId !== "sri-lanka"
                  ? "is-highlighted"
                  : ""
                }`}
              onClick={() =>
                setActiveMarketId(activeMarketId === "uae" ? null : "uae")
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveMarketId(activeMarketId === "uae" ? null : "uae");
                }
              }}
            >
              <span className="reach-legend-dot client" />
              <span>Client Market</span>
            </div>
            <div
              className={`reach-legend-item ${activeMarketId === "sri-lanka" ? "is-highlighted" : ""
                }`}
              onClick={() =>
                setActiveMarketId(activeMarketId === "sri-lanka" ? null : "sri-lanka")
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveMarketId(
                    activeMarketId === "sri-lanka" ? null : "sri-lanka"
                  );
                }
              }}
            >
              <span className="reach-legend-dot home" />
              <span>Home Market (Sri Lanka)</span>
            </div>
          </div>
        </div>

        {/* Right: Modern Halftone Map Graphic */}
        <div className="about-reach-map-col">
          <div className="reach-map-frame">
            <svg
              className="reach-map-svg"
              viewBox="0 0 960 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Interactive world map showing CreativeX global client markets connected to Sri Lanka headquarters"
            >
              <defs>
                {/* Clean dot matrix halftone pattern for landmasses */}
                <pattern
                  id="landGridDots"
                  width="7.5"
                  height="7.5"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="3.75"
                    cy="3.75"
                    r="1.25"
                    fill="rgba(11, 12, 11, 0.28)"
                  />
                </pattern>

                {/* Subtle technical background grid */}
                <pattern
                  id="techGridLines"
                  width="48"
                  height="48"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 48 0 L 0 0 0 48"
                    fill="none"
                    stroke="rgba(11, 12, 11, 0.035)"
                    strokeWidth="0.8"
                  />
                </pattern>

                {/* Radial glow for selected node */}
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff5a36" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ff5a36" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ff5a36" stopOpacity="0" />
                </radialGradient>

                {/* Beam glow gradient */}
                <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff5a36" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ff5a36" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Background ambient technical grid */}
              <rect width="960" height="520" fill="url(#techGridLines)" style={{ pointerEvents: "none" }} />

              {/* Subtle continent silhouette fills */}
              <g
                className="reach-continents-base"
                fill="rgba(11, 12, 11, 0.035)"
                stroke="rgba(11, 12, 11, 0.09)"
                strokeWidth="0.75"
                style={{ pointerEvents: "none" }}
              >
                {continentPaths.map((d, i) => (
                  <path key={`base-${i}`} d={d} />
                ))}
              </g>

              {/* Halftone dot matrix continents fill */}
              <g className="reach-continents-dots" fill="url(#landGridDots)" stroke="none" style={{ pointerEvents: "none" }}>
                {continentPaths.map((d, i) => (
                  <path key={`dots-${i}`} d={d} />
                ))}
              </g>

              {/* Radiating Curved Connection Trajectories */}
              <g className="reach-trajectories" style={{ pointerEvents: "none" }}>
                {markets
                  .filter((m) => m.role === "client" && m.arcPath)
                  .map((market) => {
                    const isTargetActive =
                      activeMarketId === market.id || hoveredMarketId === market.id;
                    const isDimmed =
                      (activeMarketId && !isTargetActive) ||
                      (hoveredMarketId && !isTargetActive);

                    return (
                      <g
                        key={`corridor-${market.id}`}
                        className={`reach-corridor-group ${isTargetActive ? "is-active" : ""
                          } ${isDimmed ? "is-dimmed" : ""}`}
                        style={{ pointerEvents: "none" }}
                      >
                        {/* Echo filaments for aerospace depth */}
                        {market.echoArcs?.map((echoPath, idx) => (
                          <path
                            key={`echo-${idx}`}
                            d={echoPath}
                            fill="none"
                            stroke={
                              isTargetActive
                                ? "rgba(255, 90, 54, 0.45)"
                                : "rgba(255, 90, 54, 0.18)"
                            }
                            strokeWidth={isTargetActive ? 1.2 : 0.8}
                            strokeDasharray={idx === 1 ? "4 3" : undefined}
                          />
                        ))}

                        {/* Main connecting trajectory line */}
                        <path
                          d={market.arcPath}
                          fill="none"
                          stroke={
                            isTargetActive
                              ? "#ff5a36"
                              : "rgba(255, 90, 54, 0.55)"
                          }
                          strokeWidth={isTargetActive ? 2.6 : 1.6}
                          className="reach-trajectory-main"
                        />

                        {/* Animated traveling data packet */}
                        <path
                          d={market.arcPath}
                          fill="none"
                          stroke="#ff5a36"
                          strokeWidth={isTargetActive ? 3.5 : 2.4}
                          strokeLinecap="round"
                          strokeDasharray="10 140"
                          className="reach-packet-beam"
                        />
                      </g>
                    );
                  })}
              </g>

              {/* Sri Lanka Home Hub (Center of Global Network) */}
              <g
                className={`reach-hub-node ${activeMarketId === "sri-lanka" || hoveredMarketId === "sri-lanka"
                    ? "is-active"
                    : ""
                  }`}
                onClick={() =>
                  setActiveMarketId(
                    activeMarketId === "sri-lanka" ? null : "sri-lanka"
                  )
                }
                onMouseEnter={() => setHoveredMarketId("sri-lanka")}
                onMouseLeave={() => setHoveredMarketId(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Dedicated stable transparent hit area */}
                <circle
                  cx={SRI_LANKA_COORDS.x}
                  cy={SRI_LANKA_COORDS.y}
                  r="28"
                  fill="#000000"
                  fillOpacity="0"
                  style={{ pointerEvents: "all" }}
                />

                {/* Radar ping concentric expanding rings */}
                <circle
                  cx={SRI_LANKA_COORDS.x}
                  cy={SRI_LANKA_COORDS.y}
                  r="34"
                  fill="none"
                  stroke="#ff5a36"
                  strokeWidth="1.2"
                  className="reach-radar-ring ring-1"
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={SRI_LANKA_COORDS.x}
                  cy={SRI_LANKA_COORDS.y}
                  r="22"
                  fill="none"
                  stroke="#ff5a36"
                  strokeWidth="1.4"
                  className="reach-radar-ring ring-2"
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={SRI_LANKA_COORDS.x}
                  cy={SRI_LANKA_COORDS.y}
                  r="14"
                  fill="rgba(255, 90, 54, 0.22)"
                  style={{ pointerEvents: "none" }}
                />

                {/* Core home pin (Large solid circle with concentric ring) */}
                <circle
                  cx={SRI_LANKA_COORDS.x}
                  cy={SRI_LANKA_COORDS.y}
                  r="8.5"
                  fill="#ff5a36"
                  filter="drop-shadow(0 2px 5px rgba(255,90,54,0.45))"
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={SRI_LANKA_COORDS.x}
                  cy={SRI_LANKA_COORDS.y}
                  r="4"
                  fill="#ffffff"
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={SRI_LANKA_COORDS.x}
                  cy={SRI_LANKA_COORDS.y}
                  r="1.5"
                  fill="#ff5a36"
                  style={{ pointerEvents: "none" }}
                />

                {/* Bold Primary Label: Sri Lanka */}
                <text
                  x={SRI_LANKA_COORDS.x}
                  y={308}
                  textAnchor="middle"
                  className="reach-label-srilanka"
                  style={{ pointerEvents: "none" }}
                >
                  Sri Lanka
                </text>
              </g>

              {/* Client Market Destination Nodes */}
              {markets
                .filter((m) => m.role === "client")
                .map((market) => {
                  const isActive =
                    activeMarketId === market.id || hoveredMarketId === market.id;
                  const isDimmed =
                    (activeMarketId && !isActive) ||
                    (hoveredMarketId && !isActive);

                  return (
                    <g
                      key={`node-${market.id}`}
                      className={`reach-client-node ${isActive ? "is-active" : ""
                        } ${isDimmed ? "is-dimmed" : ""}`}
                      onClick={() =>
                        setActiveMarketId(
                          activeMarketId === market.id ? null : market.id
                        )
                      }
                      onMouseEnter={() => setHoveredMarketId(market.id)}
                      onMouseLeave={() => setHoveredMarketId(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Stable transparent hit target circle (prevents jitter / mouse oscillations) */}
                      <circle
                        cx={market.x}
                        cy={market.y}
                        r="24"
                        fill="#000000"
                        fillOpacity="0"
                        style={{ pointerEvents: "all" }}
                      />

                      {/* Pulse aura when active (rendered with opacity transition, not unmounted) */}
                      <circle
                        cx={market.x}
                        cy={market.y}
                        r="18"
                        fill="url(#nodeGlow)"
                        opacity={isActive ? 1 : 0}
                        style={{
                          pointerEvents: "none",
                          transition: "opacity 0.25s ease",
                        }}
                      />

                      {/* Directional pointer / halo ring */}
                      <circle
                        cx={market.x}
                        cy={market.y}
                        r={isActive ? 8.5 : 6.5}
                        fill="none"
                        stroke="#ff5a36"
                        strokeWidth={isActive ? 2 : 1.4}
                        strokeOpacity={isActive ? 1 : 0.6}
                        style={{
                          pointerEvents: "none",
                          transition: "r 0.2s ease, stroke-width 0.2s ease",
                        }}
                      />

                      {/* Solid marker center dot */}
                      <circle
                        cx={market.x}
                        cy={market.y}
                        r={isActive ? 4.5 : 3.5}
                        fill="#ff5a36"
                        style={{
                          pointerEvents: "none",
                          transition: "r 0.2s ease",
                        }}
                      />

                      {/* Location text label */}
                      <text
                        x={market.labelX}
                        y={market.labelY}
                        textAnchor={market.labelAnchor}
                        className={`reach-node-label ${isActive ? "is-active" : ""
                          }`}
                        style={{ pointerEvents: "none" }}
                      >
                        {market.name}
                      </text>
                    </g>
                  );
                })}
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry & Capabilities Strip */}
      <div className="site-width reach-metrics-bar">
        <div className="reach-metric-item">
          <span className="reach-metric-value">6+</span>
          <span className="reach-metric-label">Global Markets Connected</span>
        </div>
        <div className="reach-metric-item">
          <span className="reach-metric-value">Colombo HQ</span>
          <span className="reach-metric-label">High-Overlap Timezone (UTC+5:30)</span>
        </div>
        <div className="reach-metric-item">
          <span className="reach-metric-value">100%</span>
          <span className="reach-metric-label">Production Grade Systems</span>
        </div>
        <div className="reach-metric-item">
          <span className="reach-metric-value">24/7</span>
          <span className="reach-metric-label">Telemetry & Observability</span>
        </div>
      </div>
    </section>
  );
}
