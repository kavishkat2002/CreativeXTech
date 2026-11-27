"use client";

import React, { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BarChart3,
  Cloud,
  Code2,
  Play,
  RadioTower,
  Smartphone,
  Sparkles,
} from "lucide-react";

interface EcosystemCard {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  video?: string;
  icon: React.ElementType;
  visual: "ai" | "data" | "iot" | "cloud" | "software" | "product";
  desktopPos: string;
  tiltSide: "left" | "right";
  floatClass: string;
}

const ecosystemCards: EcosystemCard[] = [
  {
    id: "ai",
    title: "AI Automation & Agents",
    subtitle: "Automate. Assist. Scale.",
    href: "/services/ai-automation-agents",
    image: "/images/hero-3d/ai-studio.jpg",
    icon: Sparkles,
    visual: "ai",
    desktopPos: "top-[1%] left-[6%] xl:left-[10%] w-[198px] xl:w-[244px]",
    tiltSide: "left",
    floatClass: "cx-float-a",
  },
  {
    id: "data",
    title: "Data & Analytics",
    subtitle: "Turn data into decisions.",
    href: "/services/data-predictive-analytics",
    image: "/images/hero-3d/data-branded.svg",
    icon: BarChart3,
    visual: "data",
    desktopPos: "top-[0%] right-[5%] xl:right-[8%] w-[198px] xl:w-[244px]",
    tiltSide: "right",
    floatClass: "cx-float-b",
  },
  {
    id: "iot",
    title: "IoT & Smart Operations",
    subtitle: "Connect. Monitor. Control.",
    href: "/services/iot-smart-operations",
    image: "/images/hero-3d/iot.png",
    video: "/images/hero-3d/iot-animation.mp4",
    icon: RadioTower,
    visual: "iot",
    desktopPos: "top-[31%] left-[0%] w-[196px] xl:w-[242px]",
    tiltSide: "left",
    floatClass: "cx-float-b",
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    subtitle: "Secure. Reliable. Scalable.",
    href: "/services/cloud-solutions",
    image: "/images/hero-3d/cloud-branded.svg",
    icon: Cloud,
    visual: "cloud",
    desktopPos: "top-[29%] right-[0%] w-[196px] xl:w-[242px]",
    tiltSide: "right",
    floatClass: "cx-float-a",
  },
  {
    id: "software",
    title: "Custom Software Development",
    subtitle: "Build for your business.",
    href: "/services/custom-software-development",
    image: "/images/hero-3d/software-branded.svg",
    icon: Code2,
    visual: "software",
    desktopPos: "bottom-[4%] left-[4%] xl:left-[7%] w-[202px] xl:w-[246px]",
    tiltSide: "left",
    floatClass: "cx-float-a",
  },
  {
    id: "product",
    title: "Web & Mobile Product Engineering",
    subtitle: "Design. Develop. Deploy.",
    href: "/services/web-mobile-product-engineering",
    image: "/images/hero-3d/product-branded.svg",
    icon: Smartphone,
    visual: "product",
    desktopPos: "bottom-[3%] right-[4%] xl:right-[7%] w-[204px] xl:w-[248px]",
    tiltSide: "right",
    floatClass: "cx-float-b",
  },
];

// Continuous glowing isometric optical traces linking Core pins -> Card perimeter
const busTraces = [
  { id: "ai", d: "M356 226 L356 174 L245 106" },
  { id: "data", d: "M404 226 L404 174 L515 104" },
  { id: "iot", d: "M304 294 L250 302 L176 266" },
  { id: "cloud", d: "M456 294 L510 302 L584 262" },
  { id: "software", d: "M336 328 L336 374 L254 442" },
  { id: "product", d: "M424 328 L424 374 L506 442" },
];

const credibilityStats = [
  { target: 20, suffix: "+", label: "Projects Delivered" },
  { target: 50, suffix: "+", label: "Businesses Supported" },
  { target: 6, suffix: "+", label: "Markets Reached" },
];

function CardCgiVisual({ card }: { card: EcosystemCard }) {
  return (
    <div
      className={`relative mt-2 w-full aspect-[2.05/1] overflow-hidden rounded-xl ${
        card.visual === "software" ||
        card.visual === "data" ||
        card.visual === "cloud" ||
        card.visual === "product"
          ? "bg-[#F7F6F3]"
          : ""
      }`}
    >
      {card.video ? (
        <video
          src={card.video}
          poster={card.image}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={
            card.visual === "iot"
              ? { filter: "hue-rotate(175deg) saturate(1.25) contrast(1.06) brightness(1.08)" }
              : undefined
          }
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <Image
          src={card.image}
          alt=""
          width={480}
          height={228}
          unoptimized
          className={
            card.visual === "ai"
              ? "h-full w-full object-cover object-center"
              : "h-full w-full object-contain object-center"
          }
        />
      )}

      {/* Subtle real-time live animation accents */}
      {card.visual === "ai" && (
        <span
          aria-hidden="true"
          className="cx-anim-sheen pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      )}

      {card.visual === "data" && (
        <span
          aria-hidden="true"
          className="cx-anim-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FF7A2F]/15 to-transparent"
        />
      )}

      {(card.visual === "software" || card.visual === "product") && (
        <span
          aria-hidden="true"
          className="cx-anim-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      )}
    </div>
  );
}

export function HomeHeroEcosystem() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mobileSelectedId, setMobileSelectedId] = useState<string>("ai");
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [statCounts, setStatCounts] = useState<number[]>(() =>
    credibilityStats.map(() => 0)
  );
  const statsRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedStats = useRef(false);

  useEffect(() => {
    const container = statsRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const id = window.requestAnimationFrame(() => {
        setStatCounts(credibilityStats.map((s) => s.target));
      });
      return () => window.cancelAnimationFrame(id);
    }

    let rafId = 0;

    const startCountAnimation = () => {
      if (hasAnimatedStats.current) return;
      hasAnimatedStats.current = true;

      const durationMs = 1200;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setStatCounts(
          credibilityStats.map((s) =>
            progress >= 1 ? s.target : Math.round(eased * s.target)
          )
        );

        if (progress < 1) {
          rafId = window.requestAnimationFrame(step);
        }
      };

      rafId = window.requestAnimationFrame(step);
    };

    if (typeof IntersectionObserver === "undefined") {
      rafId = window.requestAnimationFrame(startCountAnimation);
      return () => window.cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startCountAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const mobileActiveCard =
    ecosystemCards.find((c) => c.id === mobileSelectedId) ?? ecosystemCards[0];

  function handleStagePointerMove(event: MouseEvent<HTMLDivElement>) {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-ny * 5.5).toFixed(2)),
      ry: Number((nx * 7).toFixed(2)),
    });
  }

  function resetStageTilt() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <section
      aria-label="Creativex Technology intelligent systems overview"
      className="relative overflow-hidden border-b border-[#151515]/12 bg-gradient-to-br from-[#F7F6F3] via-[#F2EFEA] to-[#EAE6DD] text-[#151515]"
    >
      {/* Subtle architectural engineering grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(21,21,21,0.032) 1px, transparent 1px), linear-gradient(to bottom, rgba(21,21,21,0.032) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 55% 45%, black 35%, transparent 85%)",
        }}
      />

      {/* Ambient warm orange studio lighting glow behind the right ecosystem */}
      <div
        className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] lg:w-[680px] lg:h-[680px] rounded-full opacity-65 blur-3xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(255,95,40,0.18) 0%, rgba(255,75,35,0.04) 50%, transparent 74%)",
        }}
      />

      <div className="site-width relative z-10 py-7 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-4 items-center">
          {/* ── LEFT COLUMN: Headline, Supporting Copy, CTAs & Animated Credibility Strip ── */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <span className="w-7 sm:w-9 h-[2px] bg-[#FF4B23] shrink-0" aria-hidden="true" />
              <p className="text-[10.5px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#151515]/75">
                THINK CREATIVE. BUILD SMART.
              </p>
            </div>

            <h1 className="text-[clamp(1.75rem,8.1vw,2.7rem)] sm:text-[2.95rem] lg:text-[2.6rem] xl:text-[3.45rem] font-extrabold tracking-[-0.038em] leading-[1.03] text-[#151515] mb-4 sm:mb-6">
              We turn complex
              <br />
              operations into
              <br />
              <span className="text-[#FF4B23]">intelligent systems</span>
              <br />
              that{" "}
              <span className="relative inline-block text-[#FF4B23]">
                move.
                <svg
                  viewBox="0 0 180 14"
                  className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-3 overflow-visible"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 C52 2, 124 2, 178 9"
                    stroke="#FF4B23"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-[15px] sm:text-[17px] text-[#151515]/75 leading-relaxed max-w-md mb-6 sm:mb-8">
              AI, data, cloud, and product engineering grounded in real business operations.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-5 mb-7 sm:mb-10">
              <a
                href="#contact"
                style={{ color: "#FFFFFF" }}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] bg-[#FF4B23] hover:bg-[#e53e19] !text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(255,75,35,0.55)] transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#151515]"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href="#services"
                style={{ color: "#151515" }}
                className="group inline-flex items-center justify-center sm:justify-start gap-3 min-h-[46px] text-sm font-semibold !text-[#151515] hover:!text-[#FF4B23] py-2.5 sm:py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4B23] rounded-full sm:pr-2"
              >
                <span className="w-9 h-9 rounded-full border border-[#FF4B23]/45 bg-white flex items-center justify-center text-[#FF4B23] group-hover:bg-[#FF4B23] group-hover:text-white group-hover:border-[#FF4B23] transition-colors shadow-xs shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" aria-hidden="true" />
                </span>
                <span>Explore Our Capabilities</span>
              </a>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-5 sm:pt-6 border-t border-[#151515]/12 max-w-md"
              role="region"
              aria-label="Creativex Technology impact metrics"
            >
              {credibilityStats.map((stat, idx) => (
                <div key={stat.label}>
                  <span className="sr-only">
                    {stat.target}
                    {stat.suffix} {stat.label}
                  </span>
                  <strong
                    aria-hidden="true"
                    className="block text-xl sm:text-2xl font-extrabold tracking-tight tabular-nums text-[#151515]"
                  >
                    {statCounts[idx]}
                    {stat.suffix}
                  </strong>
                  <span
                    aria-hidden="true"
                    className="block text-[10.5px] sm:text-[11px] font-medium text-[#151515]/65 leading-snug mt-0.5"
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Studio CGI 3D Core + Glowing Optical Channels + Live Animated 3D Cards ── */}
          <div className="lg:col-span-7">
            {/* Desktop 3D Perspective Stage */}
            <div
              onMouseMove={handleStagePointerMove}
              onMouseLeave={resetStageTilt}
              className="hidden lg:block relative w-full h-[575px] xl:h-[620px] select-none"
              style={{ perspective: "1400px" }}
            >
              <div
                className="relative w-full h-full transition-transform duration-300 ease-out"
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                }}
              >
                {/* LAYER 1: Shaded Ceramic Isometric Plinth & Continuous Luminous Optical Channels */}
                <svg
                  className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-visible"
                  viewBox="0 0 760 580"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="pedTop" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="55%" stopColor="#F2F0EB" />
                      <stop offset="100%" stopColor="#E4E0D8" />
                    </linearGradient>
                    <linearGradient id="pedLeftWall" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#DFDBD2" />
                      <stop offset="100%" stopColor="#CCC7BD" />
                    </linearGradient>
                    <linearGradient id="pedRightWall" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#D1CDC3" />
                      <stop offset="100%" stopColor="#BAB5AA" />
                    </linearGradient>
                    <radialGradient id="coreFloorBloom" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FF6B2B" stopOpacity="0.6" />
                      <stop offset="55%" stopColor="#FF4B23" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#FF4B23" stopOpacity="0" />
                    </radialGradient>
                    <filter id="traceBloom" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="softFloorShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="18" />
                    </filter>
                  </defs>

                  {/* Ambient architectural side block */}
                  <g opacity="0.72">
                    <path d="M625 90 L705 50 L785 90 L705 130 Z" fill="#FAF9F6" />
                    <path d="M625 90 L705 130 L705 230 L625 190 Z" fill="#EAE7E0" />
                    <path d="M705 130 L785 90 L785 190 L705 230 Z" fill="#DCD8CF" />
                  </g>

                  {/* Soft drop shadow underneath diamond ceramic pedestal */}
                  <path
                    d="M380 124 L695 284 L380 456 L65 284 Z"
                    fill="rgba(21,21,21,0.18)"
                    filter="url(#softFloorShadow)"
                    transform="translate(0, 26)"
                  />

                  {/* Extruded Ceramic Pedestal Platform */}
                  <path d="M65 278 L380 448 L380 472 L65 302 Z" fill="url(#pedLeftWall)" />
                  <path d="M695 278 L380 448 L380 472 L695 302 Z" fill="url(#pedRightWall)" />
                  <path
                    d="M380 116 L695 278 L380 448 L65 278 Z"
                    fill="url(#pedTop)"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* Continuous Luminous Optical Bus Channels (Outer Amber Bloom + Warm White Core + Flowing Pulse) */}
                  {busTraces.map((trace) => {
                    const active = hoveredCard === trace.id;
                    return (
                      <g key={trace.id}>
                        {/* Continuous Soft Orange Floor Bloom */}
                        <path
                          d={trace.d}
                          stroke="#FF632B"
                          strokeOpacity={active ? "0.95" : "0.52"}
                          strokeWidth={active ? "7.5" : "5"}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#traceBloom)"
                        />
                        {/* Continuous Crisp Cream-Amber Luminous Optical Core */}
                        <path
                          d={trace.d}
                          stroke="#FFE8BC"
                          strokeOpacity={active ? "1" : "0.92"}
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Traveling Luminous Energy Packet */}
                        <path
                          d={trace.d}
                          stroke="#FFFFFF"
                          strokeOpacity="0.95"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="16 80"
                          className="cx-signal-pulse"
                        />
                      </g>
                    );
                  })}

                  {/* Bottom Extension Fiber Traces Running Forward Below Core */}
                  <path
                    d="M372 344 L372 444 L318 485"
                    stroke="#FF7033"
                    strokeOpacity="0.5"
                    strokeWidth="3.2"
                    filter="url(#traceBloom)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M388 344 L388 444 L442 485"
                    stroke="#FF7033"
                    strokeOpacity="0.5"
                    strokeWidth="3.2"
                    filter="url(#traceBloom)"
                    strokeLinecap="round"
                  />

                  {/* Radiant Warm Amber-Orange Floor Bloom Directly Under Center Hub */}
                  <ellipse cx="380" cy="298" rx="165" ry="86" fill="url(#coreFloorBloom)" />
                </svg>

                {/* LAYER 2: Real 3D CGI Obsidian CreativeX X Core Chip */}
                <div className="cx-core-float pointer-events-none absolute left-1/2 top-[48%] z-20 w-[215px] xl:w-[264px]">
                  {/* Dynamic Pulsing Luminous Halo Behind Seam */}
                  <div
                    className="cx-core-seam absolute inset-x-4 top-[22%] bottom-[26%] rounded-full bg-[#FF6624]/45 blur-2xl"
                    aria-hidden="true"
                  />
                  <Image
                    src="/images/hero-3d/core.png"
                    alt="CreativeX 3D Core Engineering Platform"
                    width={328}
                    height={206}
                    priority
                    unoptimized
                    className="relative z-10 w-full h-auto drop-shadow-[0_20px_28px_rgba(21,21,21,0.34)]"
                  />
                </div>

                {/* LAYER 3: Six Wide Landscape 3D Floating Animated Capability Cards */}
                {ecosystemCards.map((card, index) => {
                  const Icon = card.icon;
                  const tiltClass =
                    card.tiltSide === "left" ? "cx-iso-tilt-left" : "cx-iso-tilt-right";
                  return (
                    <div
                      key={card.id}
                      style={{ animationDelay: `${index * 0.45}s` }}
                      className={`${card.floatClass} absolute z-30 ${card.desktopPos}`}
                    >
                      <Link
                        href={card.href}
                        onMouseEnter={() => setHoveredCard(card.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onFocus={() => setHoveredCard(card.id)}
                        onBlur={() => setHoveredCard(null)}
                        style={{ color: "#151515" }}
                        className={`cx-iso-card ${tiltClass} group block rounded-2xl border border-white px-3 pt-2.5 pb-2 xl:px-3.5 xl:pt-3 xl:pb-2.5 hover:border-[#FF4B23]/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4B23]`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-white border border-[#151515]/[0.06] shadow-[0_2px_8px_rgba(21,21,21,0.08)] text-[#FF4B23] flex items-center justify-center shrink-0 group-hover:bg-[#FF4B23] group-hover:text-white transition-colors">
                            <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" aria-hidden="true" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="block text-[11.5px] xl:text-[13.5px] font-bold tracking-tight !text-[#151515] leading-tight">
                              {card.title}
                            </span>
                            <p className="text-[9.5px] xl:text-[10.5px] font-medium text-[#151515]/60 leading-snug mt-0.5">
                              {card.subtitle}
                            </p>
                          </div>
                        </div>

                        <CardCgiVisual card={card} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RESPONSIVE TABLET & MOBILE ECOSYSTEM (< lg) ── */}
            <div className="lg:hidden space-y-3.5 sm:space-y-4">
              {/* Real 3D CGI Core Showcase Header */}
              <div className="relative rounded-2xl bg-gradient-to-br from-white/95 via-[#F3F1EC] to-[#E6E2D9] border border-white px-3.5 sm:px-4 pt-3 pb-3.5 sm:pb-4 shadow-[0_14px_34px_-16px_rgba(21,21,21,0.16)] overflow-hidden">
                <div className="flex items-center justify-between gap-2.5 sm:gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="relative w-16 sm:w-24 shrink-0">
                      <div
                        className="cx-core-seam absolute inset-1 rounded-full bg-[#FF5A26]/35 blur-md"
                        aria-hidden="true"
                      />
                      <Image
                        src="/images/hero-3d/core.png"
                        alt="CreativeX Core Platform"
                        width={328}
                        height={206}
                        unoptimized
                        className="relative z-10 w-full h-auto"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#FF4B23] block">
                        INTELLIGENT SYSTEMS CORE
                      </span>
                      <strong className="text-[13.5px] sm:text-base font-bold text-[#151515] block leading-snug">
                        Connected Engineering Ecosystem
                      </strong>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-[#151515]/60 bg-white/85 border border-[#151515]/10 px-3 py-1 rounded-full shrink-0">
                    6 Core Capabilities
                  </span>
                </div>

                {/* Continuous Luminous Signal Rail */}
                <div
                  className="mt-2.5 h-[3px] w-full rounded-full bg-[#151515]/8 overflow-hidden relative"
                  aria-hidden="true"
                >
                  <div className="cx-anim-sheen h-full w-1/2 rounded-full bg-gradient-to-r from-[#FF4B23] via-[#FFD29D] to-[#FF4B23]" />
                </div>
              </div>

              {/* MOBILE (< 640px): Compact 2x3 Touch Switcher + Active CGI 3D Animated Card */}
              <div className="sm:hidden space-y-3">
                <div
                  className="grid grid-cols-2 gap-2"
                  role="group"
                  aria-label="Choose a CreativeX capability to inspect"
                >
                  {ecosystemCards.map((card) => {
                    const Icon = card.icon;
                    const active = card.id === mobileActiveCard.id;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setMobileSelectedId(card.id)}
                        className={`min-h-[48px] px-2.5 py-2 rounded-xl text-left flex items-center gap-2 border transition-all text-[11.5px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4B23] ${
                          active
                            ? "bg-[#171717] text-white border-[#171717] shadow-md"
                            : "bg-white text-[#151515] border-[#151515]/12 hover:border-[#FF4B23]/60"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0 text-[#FF4B23]" aria-hidden="true" />
                        <span className="leading-snug line-clamp-2">{card.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Live-Animated 3D Card Display on Mobile */}
                {(() => {
                  const ActiveIcon = mobileActiveCard.icon;
                  return (
                    <div className="cx-iso-card rounded-2xl border border-white p-3.5 sm:p-4">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="w-8 h-8 rounded-full bg-white border border-[#151515]/[0.06] shadow-xs text-[#FF4B23] flex items-center justify-center shrink-0">
                          <ActiveIcon className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-[#151515] leading-tight">
                            {mobileActiveCard.title}
                          </span>
                          <p className="text-xs text-[#151515]/60 mt-0.5">
                            {mobileActiveCard.subtitle}
                          </p>
                        </div>
                      </div>

                      <CardCgiVisual card={mobileActiveCard} />

                      <Link
                        href={mobileActiveCard.href}
                        style={{ color: "#151515" }}
                        className="group mt-3 w-full min-h-[44px] py-2.5 px-3.5 rounded-xl bg-[#F4F3EE] hover:bg-[#FF4B23] hover:!text-white border border-[#151515]/10 text-xs font-semibold !text-[#151515] flex items-center justify-between gap-2 transition-colors"
                      >
                        <span className="truncate">Explore {mobileActiveCard.title}</span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5 shrink-0 text-[#FF4B23] group-hover:text-white transition-colors"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  );
                })()}
              </div>

              {/* TABLET (640px–1023px): Full 2x3 / 3x2 Interactive CGI Card Grid */}
              <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {ecosystemCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      style={{ color: "#151515" }}
                      className="cx-iso-card group block rounded-2xl border border-white p-3.5 hover:border-[#FF4B23]/75"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-white border border-[#151515]/[0.06] shadow-xs text-[#FF4B23] flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="block text-[13px] font-bold !text-[#151515] leading-snug">
                            {card.title}
                          </span>
                          <p className="text-[11px] text-[#151515]/60 mt-0.5">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                      <CardCgiVisual card={card} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
