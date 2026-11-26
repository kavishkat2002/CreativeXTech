"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BellRing,
  Bot,
  CheckCircle2,
  Cpu,
  Eye,
  Factory,
  Gauge,
  HardDriveDownload,
  HeartPulse,
  LayoutDashboard,
  Lock,
  Network,
  Pause,
  Play,
  Radio,
  Router,
  Server,
  SlidersHorizontal,
  Thermometer,
  Truck,
  UserCheck,
  Wifi,
  WifiOff,
  Workflow,
  Zap,
} from "lucide-react";

import { SiteFooter } from "@/components/site-header";
import { iotFaqs } from "@/lib/services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ── Section 02: Operational Value ─────────────────────────────────────────────
const valuePillars = [
  {
    number: "01",
    title: "Real-Time Visibility",
    description:
      "See live equipment states, room temperatures, energy draw, and workcell output across every site from one interface.",
    icon: Eye,
  },
  {
    number: "02",
    title: "Faster Response",
    description:
      "Route threshold breaches and fault conditions immediately to on-duty technicians before drift causes costly downtime.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Connected Assets",
    description:
      "Unify sensors, PLCs, cold rooms, robotic cells, and yard vehicles into a single normalized operational data model.",
    icon: Network,
  },
  {
    number: "04",
    title: "Operational Control",
    description:
      "Pair clear shift ownership with role-scoped oversight, incident trails, and dependable remote monitoring workflows.",
    icon: SlidersHorizontal,
  },
];

// ── Section 03: End-to-End Operating Flow ─────────────────────────────────────
interface ArchitectureStep {
  step: string;
  title: string;
  summary: string;
  icon: React.ElementType;
  protocols: string[];
  exampleSignal: string;
  exampleOutcome: string;
}

const architectureSteps: ArchitectureStep[] = [
  {
    step: "STEP 01",
    title: "Sensors & Devices",
    summary:
      "Capture real-world information such as temperature, usage, equipment status and environmental conditions.",
    icon: Radio,
    protocols: ["Vibration & Temp", "PLC / Modbus", "BLE / LoRaWAN", "Robotics I/O"],
    exampleSignal: "Cold Room Probe B4 detects +4.2°C rise above setpoint at 02:14.",
    exampleOutcome: "Physical condition converted into timestamped telemetry frame.",
  },
  {
    step: "STEP 02",
    title: "Edge Gateway",
    summary:
      "Collect and securely transmit device data to the connected platform.",
    icon: Router,
    protocols: ["Local Buffering", "Mutual TLS", "MQTT / HTTPS", "Cellular / LAN"],
    exampleSignal: "Gateway GW-02 verifies payload integrity and queues locally if WAN drops.",
    exampleOutcome: "Encrypted stream delivered without data loss during network blips.",
  },
  {
    step: "STEP 03",
    title: "IoT Platform",
    summary:
      "Process and organize operational information into dashboards, telemetry and insights.",
    icon: Server,
    protocols: ["Stream Rules", "Time-Series DB", "State Modeling", "Audit Store"],
    exampleSignal: "Platform correlates probe trend with compressor power and door-open contact.",
    exampleOutcome: "Noise suppressed; verified door-seal excursion incident created.",
  },
  {
    step: "STEP 04",
    title: "Alerts & Actions",
    summary:
      "Notify the relevant teams and support appropriate operational decisions.",
    icon: BellRing,
    protocols: ["Escalation Rules", "Field App", "CMMS / ERP Sync", "Sign-Off Logs"],
    exampleSignal: "On-shift facility engineer receives alert with location, curve, and SOP checklist.",
    exampleOutcome: "Issue acknowledged and resolved with traceable shift sign-off.",
  },
];

// ── Section 04: Engineering Capabilities ──────────────────────────────────────
const capabilities = [
  {
    code: "CAP-01",
    title: "Device, Sensor & Gateway Architecture",
    description:
      "Design resilient acquisition across industrial sensors, PLC registers, robotic workcell controllers, and cellular or Ethernet edge gateways.",
    outcome: "Dependable field signal capture without proprietary lock-in.",
    icon: Cpu,
  },
  {
    code: "CAP-02",
    title: "Real-Time Telemetry & Event Processing",
    description:
      "Ingest, normalize, and store continuous time-series streams alongside discrete machine states and production cycle events.",
    outcome: "Clean operational truth ready for live monitoring and trend review.",
    icon: Activity,
  },
  {
    code: "CAP-03",
    title: "Rules, Anomaly Detection & Alert Orchestration",
    description:
      "Evaluate multi-signal thresholds, rate-of-change drift, and offline heartbeats to trigger timely escalation without alert fatigue.",
    outcome: "Teams act on real operational exceptions rather than false noise.",
    icon: Bell,
  },
  {
    code: "CAP-04",
    title: "Operations Dashboards & Mobile Field Tools",
    description:
      "Build role-specific control room screens and shift-ready mobile interfaces tailored to plant managers, dispatchers, and technicians.",
    outcome: "Faster on-site triage with clear context in hand.",
    icon: LayoutDashboard,
  },
  {
    code: "CAP-05",
    title: "Maintenance & Business System Integration",
    description:
      "Connect automated machinery, robotics integration lines, and field telemetry directly into CMMS work orders, ERP inventory, and dispatch tools.",
    outcome: "Hardware signals trigger downstream maintenance and business workflows.",
    icon: Workflow,
  },
  {
    code: "CAP-06",
    title: "Asset & Environmental Monitoring",
    description:
      "Track cold storage temperatures, indoor air quality, power distribution loads, fluid levels, and equipment runtime across dispersed facilities.",
    outcome: "Continuous protection for sensitive inventory and critical machinery.",
    icon: Thermometer,
  },
];

// ── Section 05: Real-World Industry Applications ──────────────────────────────
interface IndustryApplication {
  id: string;
  tag: string;
  title: string;
  image: string;
  imageAlt: string;
  problem: string;
  solution: string;
  value: string;
  href?: string;
  hrefLabel?: string;
}

const applications: IndustryApplication[] = [
  {
    id: "smart-facilities",
    tag: "BUILDINGS & ENERGY",
    title: "Smart Facilities & Energy Monitoring",
    image: "/images/smart-facility-hospitality.jpg",
    imageAlt: "Modern commercial facility interior with integrated lighting and climate control",
    problem:
      "HVAC units, chillers, and floor power loads run on fixed schedules without zone-level visibility, masking energy waste and early equipment strain.",
    solution:
      "Sub-metering, environmental sensors, and central equipment telemetry bring occupancy, climate, and load behavior into one facility control view.",
    value:
      "Clear visibility into facility energy usage and earlier intervention before occupant comfort or utilities degrade.",
    href: "/solutions#hospitality-smart-facilities",
    hrefLabel: "View Hospitality & Smart Facilities",
  },
  {
    id: "predictive-maintenance",
    tag: "MANUFACTURING & PLANT",
    title: "Equipment Health & Predictive Maintenance",
    image: "/images/iot-predictive-maintenance.jpg",
    imageAlt: "Industrial motor and bearing assembly fitted with wired IoT vibration and thermal sensors",
    problem:
      "Motors, compressors, conveyors, and workcells often suffer unexpected breakdowns between scheduled calendar inspections.",
    solution:
      "Vibration, bearing temperature, and current-draw sensors establish normal running baselines and raise alerts when mechanical signatures drift.",
    value:
      "Shift maintenance teams toward planned service windows and steadier production continuity.",
  },
  {
    id: "cold-chain",
    tag: "PHARMA & PERISHABLES",
    title: "Cold-Chain & Environmental Monitoring",
    image: "/images/iot-cold-chain.jpg",
    imageAlt: "Temperature-controlled warehouse racking equipped with wireless environmental IoT probe and orange status indicator",
    problem:
      "Manual clipboard checks leave long overnight blind spots across cold rooms and refrigerated loads, risking product loss and audit gaps.",
    solution:
      "Continuous digital temperature and door-status logging alerts shift supervisors immediately on excursions while retaining searchable compliance logs.",
    value:
      "Consistent protection for temperature-sensitive goods and audit-ready environmental history.",
  },
  {
    id: "connected-logistics",
    tag: "WAREHOUSE & FLEET",
    title: "Connected Logistics & Asset Tracking",
    image: "/images/retail-distribution-warehouse.jpg",
    imageAlt: "Automated distribution warehouse aisle with racking, mobile floor units, and material handling vehicles",
    problem:
      "Containers, yard vehicles, pallets, and automated handling gear lose traceability across dock transfers and multi-site yards.",
    solution:
      "GPS, gateway checkpoints, and yard telemetry keep dispatchers, warehouse leads, and operations portals synchronized in real time.",
    value:
      "Fewer asset hand-off blind spots, faster dock coordination, and clearer chain-of-custody records.",
    href: "/solutions#export-logistics",
    hrefLabel: "View Export & Logistics Solutions",
  },
];

// ── Section 06: Illustrative Control Room Data ────────────────────────────────
type SiteKey = "all" | "plant" | "cold" | "yard";
type ChartMetricKey = "temp" | "load" | "cycles";

interface SiteSnapshot {
  label: string;
  subtitle: string;
  onlineCount: number;
  offlineCount: number;
  healthStatus: string;
  envReading: string;
  envNote: string;
  openAlerts: number;
  devices: Array<{
    id: string;
    name: string;
    zone: string;
    reading: string;
    status: "Online" | "Warning" | "Offline";
    health: string;
  }>;
  alerts: Array<{
    time: string;
    source: string;
    message: string;
    owner: string;
    state: "Active" | "Acknowledged" | "Resolved";
  }>;
  series: Record<ChartMetricKey, number[]>;
}

const siteSnapshots: Record<SiteKey, SiteSnapshot> = {
  all: {
    label: "All Sites (Overview)",
    subtitle: "3 connected zones · Gateway cluster nominal",
    onlineCount: 42,
    offlineCount: 2,
    healthStatus: "Nominal (95%)",
    envReading: "2.4°C / 21.8°C",
    envNote: "Cold Bay / Assembly",
    openAlerts: 2,
    devices: [
      { id: "ROB-CELL-02", name: "6-Axis Pick & Place Arm", zone: "Assembly Bay A", reading: "44.2°C · 18 cycles/m", status: "Online", health: "Healthy" },
      { id: "COMP-MTR-04", name: "Main Chiller Drive Motor", zone: "Utility Plant", reading: "2.8 mm/s RMS · 38 A", status: "Warning", health: "Inspect Bearing" },
      { id: "ENV-CLD-B4", name: "Cold Storage Probe B4", zone: "Hub West Room 2", reading: "2.4°C · 61% RH", status: "Online", health: "In Range" },
      { id: "GW-YARD-07", name: "Loading Gate Edge Gateway", zone: "Dock Gate 04", reading: "Buffer: 14 frames", status: "Offline", health: "Queued (WAN Drop)" },
    ],
    alerts: [
      { time: "14:22", source: "COMP-MTR-04", message: "Vibration RMS crossed 2.5 mm/s threshold (Utility Plant)", owner: "Shift Eng. — K. Perera", state: "Acknowledged" },
      { time: "13:48", source: "GW-YARD-07", message: "Cellular backhaul offline — edge buffer storing locally", owner: "Ops Dispatch — S. Silva", state: "Active" },
      { time: "11:05", source: "ENV-CLD-B4", message: "Door contact open > 4 min resolved after unloading", owner: "Cold Room Lead", state: "Resolved" },
    ],
    series: {
      temp: [2.2, 2.3, 2.4, 2.5, 3.1, 2.8, 2.4, 2.3, 2.4, 2.4, 2.3, 2.4],
      load: [62, 68, 74, 81, 79, 85, 82, 76, 74, 78, 75, 72],
      cycles: [14, 16, 18, 18, 17, 19, 18, 16, 17, 18, 19, 18],
    },
  },
  plant: {
    label: "Plant A — Robotics & Line 02",
    subtitle: "Robotic cell & CNC motors · Edge GW-01",
    onlineCount: 18,
    offlineCount: 0,
    healthStatus: "Attention Needed (1)",
    envReading: "22.1°C · 48% RH",
    envNote: "Shop Floor Ambient",
    openAlerts: 1,
    devices: [
      { id: "ROB-CELL-02", name: "6-Axis Pick & Place Arm", zone: "Assembly Bay A", reading: "44.2°C · 18 cycles/m", status: "Online", health: "Healthy" },
      { id: "CONV-BELT-01", name: "Optical Conveyor Rail", zone: "Line 02 Intake", reading: "0.42 m/s · 0 jams", status: "Online", health: "Healthy" },
      { id: "COMP-MTR-04", name: "Main Chiller Drive Motor", zone: "Utility Plant", reading: "2.8 mm/s RMS · 38 A", status: "Warning", health: "Inspect Bearing" },
      { id: "PLC-BRIDGE-01", name: "Modbus TCP Edge Bridge", zone: "Control Cabinet", reading: "12ms poll · 99.9%", status: "Online", health: "Healthy" },
    ],
    alerts: [
      { time: "14:22", source: "COMP-MTR-04", message: "Vibration RMS crossed 2.5 mm/s threshold (Utility Plant)", owner: "Shift Eng. — K. Perera", state: "Acknowledged" },
      { time: "09:15", source: "ROB-CELL-02", message: "Tooling calibration verification completed", owner: "Line Lead — N. Fernando", state: "Resolved" },
    ],
    series: {
      temp: [21.0, 21.3, 21.6, 22.0, 22.4, 22.6, 22.3, 22.1, 22.0, 22.1, 22.2, 22.1],
      load: [70, 74, 82, 88, 86, 91, 89, 84, 85, 87, 83, 81],
      cycles: [16, 17, 18, 19, 19, 20, 18, 18, 19, 18, 19, 18],
    },
  },
  cold: {
    label: "Cold Storage — Hub West",
    subtitle: "3 freezer bays · LoRaWAN Probe Mesh",
    onlineCount: 16,
    offlineCount: 0,
    healthStatus: "Optimal (100%)",
    envReading: "2.4°C · 61% RH",
    envNote: "Target: 1.5°C – 4.0°C",
    openAlerts: 0,
    devices: [
      { id: "ENV-CLD-B1", name: "Cold Room Probe B1", zone: "Chiller Bay 01", reading: "2.1°C · 59% RH", status: "Online", health: "In Range" },
      { id: "ENV-CLD-B4", name: "Cold Room Probe B4", zone: "Chiller Bay 02", reading: "2.4°C · 61% RH", status: "Online", health: "In Range" },
      { id: "DOOR-SNS-02", name: "Bay 02 Seal Sensor", zone: "Airlock Entry", reading: "Closed · Sealed", status: "Online", health: "Healthy" },
      { id: "DEFROST-EV-03", name: "Evaporator Coil Monitor", zone: "Overhead Unit 3", reading: "4.8 A · Cycle Idle", status: "Online", health: "Healthy" },
    ],
    alerts: [
      { time: "11:05", source: "ENV-CLD-B4", message: "Door contact open > 4 min resolved after unloading", owner: "Cold Room Lead", state: "Resolved" },
      { time: "06:30", source: "DEFROST-EV-03", message: "Scheduled defrost window completed within thermal limit", owner: "Automated Policy", state: "Resolved" },
    ],
    series: {
      temp: [2.1, 2.2, 2.1, 2.3, 3.2, 2.7, 2.3, 2.2, 2.3, 2.4, 2.3, 2.4],
      load: [48, 49, 52, 54, 65, 61, 51, 49, 48, 50, 49, 48],
      cycles: [8, 8, 9, 9, 12, 11, 9, 8, 8, 9, 8, 8],
    },
  },
  yard: {
    label: "Fleet Yard — Gate 04",
    subtitle: "Dock beacons & yard gateways · Cellular + BLE",
    onlineCount: 8,
    offlineCount: 2,
    healthStatus: "Degraded Link (1)",
    envReading: "29.4°C · Ambient",
    envNote: "Exterior Yard Bays",
    openAlerts: 1,
    devices: [
      { id: "DOCK-BCN-01", name: "Container Bay 01 Reader", zone: "North Apron", reading: "14 Tags · Active", status: "Online", health: "Healthy" },
      { id: "REEF-TRK-12", name: "Reefer Trailer Unit 12", zone: "Gate Queue", reading: "3.1°C · Battery 94%", status: "Online", health: "In Range" },
      { id: "GW-YARD-07", name: "Loading Gate Edge Gateway", zone: "Dock Gate 04", reading: "Buffer: 14 frames", status: "Offline", health: "Queued (WAN Drop)" },
      { id: "FORK-TRK-04", name: "Electric Reach Forklift 04", zone: "Aisle 06 Staging", reading: "78% SoC · Moving", status: "Online", health: "Healthy" },
    ],
    alerts: [
      { time: "13:48", source: "GW-YARD-07", message: "Cellular backhaul offline — edge buffer storing locally", owner: "Ops Dispatch — S. Silva", state: "Active" },
      { time: "10:12", source: "REEF-TRK-12", message: "Trailer arrived at geofenced Dock 04 staging bay", owner: "Gate Dispatch", state: "Resolved" },
    ],
    series: {
      temp: [27.5, 28.0, 28.4, 29.1, 29.8, 30.2, 30.0, 29.7, 29.5, 29.4, 29.4, 29.4],
      load: [42, 55, 64, 71, 69, 60, 58, 66, 73, 68, 61, 59],
      cycles: [10, 12, 15, 16, 14, 11, 12, 14, 17, 15, 13, 12],
    },
  },
};

const chartMeta: Record<ChartMetricKey, { label: string; unit: string; min: number; max: number }> = {
  temp: { label: "Temperature Trend", unit: "°C", min: 0, max: 35 },
  load: { label: "Equipment Load", unit: "%", min: 30, max: 100 },
  cycles: { label: "Robot / Line Cycle Rate", unit: "/m", min: 5, max: 24 },
};

// ── Section 07: Implementation Process ────────────────────────────────────────
const implementationStages = [
  {
    number: "01",
    title: "Map Assets & Decisions",
    description:
      "Understand assets, operations and business requirements—identifying which failure points, delays, or blind spots actually justify telemetry.",
    deliverable: "Asset inventory & alert decision map",
  },
  {
    number: "02",
    title: "Validate Connectivity & Data Quality",
    description:
      "Evaluate device connections, communication protocols, power constraints, and signal reliability on site before scaling interfaces.",
    deliverable: "Verified edge feed & schema baseline",
  },
  {
    number: "03",
    title: "Build Dashboards, Alerts & Workflows",
    description:
      "Develop the operational interface, role-scoped alert routing, mobile field tools, and integrations into existing business systems.",
    deliverable: "Live control room & incident workflow",
  },
  {
    number: "04",
    title: "Pilot, Measure & Expand",
    description:
      "Validate the connected system under real shift conditions with operators, refine thresholds, and expand cleanly across assets and facilities.",
    deliverable: "Production rollout & site expansion playbook",
  },
];

// ── Section 08: Reliability & Security ────────────────────────────────────────
const reliabilityPillars = [
  {
    title: "Secure Device Identity & Communication",
    description:
      "Each gateway and connected endpoint authenticates with unique credentials or certificates over encrypted channels, with role-scoped permissions for operational actions.",
    icon: Lock,
  },
  {
    title: "Offline & Degraded-Mode Behaviour",
    description:
      "Field networks drop out. Gateways cache readings locally with timestamps and flush cleanly in sequence once connectivity resumes—preventing silent blind spots.",
    icon: HardDriveDownload,
  },
  {
    title: "Clear Alert Ownership & Escalation",
    description:
      "Every alert carries explicit severity, named shift ownership, timed escalation fallback, and auditable resolution notes so nothing stalls in an inbox.",
    icon: UserCheck,
  },
  {
    title: "Telemetry Health & Observability",
    description:
      "The platform monitors the monitoring layer itself—tracking gateway heartbeats, battery levels, sensor dropouts, and ingestion latency continuously.",
    icon: HeartPulse,
  },
];

// ── Section 09: Business Outcomes ─────────────────────────────────────────────
const businessOutcomes = [
  {
    index: "OUTCOME 01",
    title: "Earlier Response to Issues",
    description:
      "Surface temperature drift, abnormal machine vibration, utility spikes, or stopped equipment as soon as thresholds shift—not after stock spoils or a line halts.",
    icon: AlertTriangle,
  },
  {
    index: "OUTCOME 02",
    title: "Less Manual Monitoring & Coordination",
    description:
      "Eliminate repetitive walk-around logging sheets, overnight guesswork, and manual phone follow-ups between operators, maintenance staff, and supervisors.",
    icon: Gauge,
  },
  {
    index: "OUTCOME 03",
    title: "Better Visibility Across Facilities & Assets",
    description:
      "Bring dispersed rooms, machines, warehouses, and field teams onto one consistent operational picture so leadership and shift teams share the same facts.",
    icon: Factory,
  },
];

// ── Section 10: FAQs (imported from server-safe @/lib/services) ───────────────

// ── Helper: Responsive SVG Trend Path ─────────────────────────────────────────
function buildSparklinePoints(values: number[], minVal?: number, maxVal?: number) {
  const width = 520;
  const height = 148;
  const padX = 10;
  const padY = 14;
  const min = minVal ?? Math.min(...values);
  const max = maxVal ?? Math.max(...values);
  const span = Math.max(max - min, 0.1);

  const coords = values.map((v, i) => {
    const x = padX + (i / (values.length - 1)) * (width - padX * 2);
    const y = padY + (1 - (v - min) / span) * (height - padY * 2);
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  });

  const linePath = coords.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  return { coords, linePath, areaPath, width, height };
}

export function IotSmartOperationsClient() {
  const [activeArchStep, setActiveArchStep] = useState<number>(0);
  const [selectedSite, setSelectedSite] = useState<SiteKey>("all");
  const [selectedMetric, setSelectedMetric] = useState<ChartMetricKey>("temp");
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = heroVideoRef.current;
    if (!videoEl) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      videoEl.pause();
    } else {
      videoEl.play().catch(() => {
        setIsVideoPlaying(false);
      });
    }
  }, []);

  function toggleHeroVideo() {
    const videoEl = heroVideoRef.current;
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play().catch(() => {});
      setIsVideoPlaying(true);
    } else {
      videoEl.pause();
      setIsVideoPlaying(false);
    }
  }

  const currentSite = siteSnapshots[selectedSite];
  const metricInfo = chartMeta[selectedMetric];
  const rawSeries = currentSite.series[selectedMetric];
  const { coords, linePath, areaPath, width, height } = buildSparklinePoints(rawSeries);
  const latestValue = rawSeries[rawSeries.length - 1];

  return (
    <div className="bg-[#F5F5F3] text-[#151515] min-h-screen selection:bg-[#FF4B23] selection:text-white">
      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 01 — PREMIUM INDUSTRIAL HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-24 overflow-hidden bg-[#F5F5F3] border-b border-[#151515]/12">
        {/* Subtle Technical Architectural Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(21,21,21,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(21,21,21,0.045) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="site-width relative z-10">
          {/* Top Service Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 sm:mb-12 border-b border-[#151515]/10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] !text-[#151515]/70 hover:!text-[#FF4B23] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4B23]"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              All Engineering Services
            </Link>
            <div className="inline-flex items-center text-[11px] font-mono uppercase tracking-[0.14em] text-[#151515]/60">
              <span>Service 03 / Physical-to-Digital Systems</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column — Editorial Copy & CTAs */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-[#FF4B23] shrink-0" aria-hidden="true" />
                <p className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.16em] text-[#151515]/80">
                  CONNECTED OPERATIONS / IoT, ROBOTICS &amp; AUTOMATION
                </p>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-[3.65rem] font-extrabold tracking-[-0.035em] leading-[1.03] text-[#151515] mb-6">
                Connect physical systems. Make every operation{" "}
                <span className="relative inline-block">
                  smarter.
                  <span
                    className="absolute left-0 right-0 -bottom-1 h-[4px] bg-[#FF4B23]"
                    aria-hidden="true"
                  />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#151515]/75 leading-relaxed max-w-xl mb-8">
                We connect devices, equipment and environments through IoT, real-time telemetry,
                operational dashboards, alerts and field workflows — turning operations into
                intelligent, efficient and reliable systems.
              </p>

              {/* CTA Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-10">
                <Link
                  href="/contact?service=iot-smart-operations"
                  style={{ color: "#FFFFFF" }}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#FF4B23] !text-white px-6 py-4 rounded-full text-sm font-semibold hover:bg-[#e53e19] transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#151515]"
                >
                  <span>Discuss an IoT Project</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Link>
                <a
                  href="#capabilities"
                  style={{ color: "#151515" }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#151515]/20 bg-white text-sm font-semibold !text-[#151515] hover:border-[#FF4B23] hover:!text-[#FF4B23] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4B23]"
                >
                  <span>Explore Capabilities</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>

              {/* Engineering Scope Strip */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#151515]/12 max-w-xl">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#151515]/55 block mb-1">
                    FIELD LAYER
                  </span>
                  <strong className="text-xs sm:text-sm font-semibold text-[#151515]">
                    Sensors &amp; Edge
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#151515]/55 block mb-1">
                    INTELLIGENCE
                  </span>
                  <strong className="text-xs sm:text-sm font-semibold text-[#151515]">
                    Telemetry &amp; Rules
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#151515]/55 block mb-1">
                    WORKFLOWS
                  </span>
                  <strong className="text-xs sm:text-sm font-semibold text-[#151515]">
                    Robotics &amp; Ops Sync
                  </strong>
                </div>
              </div>
            </div>

            {/* Right Column — Live Industrial Robotics & Connected IoT Video Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto lg:ml-auto max-w-[460px] rounded-2xl border border-[#151515]/14 bg-[#171717] p-2.5 sm:p-3 shadow-xl">
                {/* Main Live Robotics Automation Video Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#110907]">
                  <video
                    ref={heroVideoRef}
                    src="/videos/iot-hero-automation.mp4"
                    poster="/images/iot-hero-automation.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    aria-label="Orange industrial robotic arm sorting cartons along a smart factory conveyor line"
                    className="h-full w-full object-cover object-center"
                  />

                  {/* Subtle dark gradient at top/bottom for crisp badge legibility */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/35"
                    aria-hidden="true"
                  />

                  {/* Top Telemetry Status Header */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#171717]/90 text-white text-[10px] font-mono uppercase tracking-[0.12em] border border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B23] animate-pulse" />
                      ROBOTICS CELL · LIVE
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#171717]/85 text-white/85 text-[10px] font-mono uppercase tracking-[0.12em] border border-white/15">
                      CELL 02
                    </span>
                  </div>

                  {/* Accessible Play / Pause Toggle */}
                  <button
                    type="button"
                    onClick={toggleHeroVideo}
                    aria-label={
                      isVideoPlaying
                        ? "Pause robotics automation video"
                        : "Play robotics automation video"
                    }
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#171717]/90 hover:bg-[#FF4B23] text-white text-[10px] font-mono uppercase tracking-wider border border-white/15 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {isVideoPlaying ? (
                      <>
                        <Pause className="w-3 h-3" aria-hidden="true" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" aria-hidden="true" />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Clean Integrated Operational Telemetry Footer Bar (Physical -> Digital Bridge) */}
                <div className="mt-2.5 sm:mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="rounded-lg bg-[#20201E] border border-white/10 px-3 py-2.5 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-[#FF4B23]/15 text-[#FF4B23] flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/55 block">
                        WORKCELL
                      </span>
                      <strong className="text-[11px] font-semibold text-white block">
                        Arm &amp; Line I/O
                      </strong>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#20201E] border border-white/10 px-3 py-2.5 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-[#FF4B23]/15 text-[#FF4B23] flex items-center justify-center shrink-0">
                      <Wifi className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/55 block">
                        GATEWAY
                      </span>
                      <strong className="text-[11px] font-semibold text-white block">
                        Encrypted MQTT
                      </strong>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#20201E] border border-white/10 px-3 py-2.5 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-[#FF4B23]/15 text-[#FF4B23] flex items-center justify-center shrink-0">
                      <Activity className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/55 block">
                        PLATFORM
                      </span>
                      <strong className="text-[11px] font-semibold text-white block">
                        Alerts &amp; Sync
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Section Jump Navigation (Improves Scannability & UX) */}
      <nav
        aria-label="IoT page sections"
        className="bg-white border-b border-[#151515]/10 py-3"
      >
        <div className="site-width">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#151515]/45 shrink-0 pr-2">
              JUMP TO:
            </span>
            {[
              { label: "Operating Flow", href: "#how-it-works" },
              { label: "Capabilities", href: "#capabilities" },
              { label: "Industries", href: "#applications" },
              { label: "Control Room", href: "#control-room" },
              { label: "Process", href: "#process" },
              { label: "FAQ", href: "#faq" },
            ].map((navItem) => (
              <a
                key={navItem.href}
                href={navItem.href}
                style={{ color: "#151515" }}
                className="px-3.5 py-1.5 rounded-full bg-[#F5F5F3] hover:bg-[#FF4B23] hover:!text-white text-xs font-medium !text-[#151515] transition-colors shrink-0 whitespace-nowrap"
              >
                {navItem.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 02 — KEY OPERATIONAL VALUE
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#EAEAE8] border-b border-[#151515]/12">
        <div className="site-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#FF4B23] mb-2">
                OPERATIONAL VALUE / 01
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151515]">
                From blind spots to coordinated action.
              </h2>
            </div>
            <p className="text-sm text-[#151515]/70 max-w-md">
              Built for facility leaders, plant engineers, and operations teams who need clear, actionable signals instead of fragmented spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valuePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.number}
                  className="group rounded-xl bg-white border border-[#151515]/10 p-6 shadow-xs hover:shadow-md hover:border-[#FF4B23]/50 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-[#F5F5F3] border border-[#151515]/10 flex items-center justify-center text-[#FF4B23] group-hover:bg-[#FF4B23] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#151515]/45">
                        {pillar.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#151515] mb-2.5 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#151515]/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 03 — HOW A CONNECTED OPERATION WORKS
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="scroll-mt-24 py-16 sm:py-24 bg-[#F5F5F3] border-b border-[#151515]/12">
        <div className="site-width">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#FF4B23] mb-2.5">
              SYSTEM ARCHITECTURE / 02
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#151515] mb-4">
              A simple, end-to-end operating flow.
            </h2>
            <p className="text-base text-[#151515]/72 leading-relaxed">
              Connected operations work reliably when each layer has one clear responsibility. Select any stage below to trace how a physical signal becomes an operational decision.
            </p>
          </div>

          {/* Four-Step Interactive System Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
            {architectureSteps.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeArchStep === idx;
              return (
                <div key={item.step} className="relative flex flex-col">
                  <button
                    type="button"
                    onClick={() => setActiveArchStep(idx)}
                    aria-pressed={isSelected}
                    className={`w-full h-full text-left rounded-xl p-6 border transition-all duration-200 flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4B23] ${
                      isSelected
                        ? "bg-[#171717] text-white border-[#171717] shadow-lg"
                        : "bg-white text-[#151515] border-[#151515]/12 hover:border-[#FF4B23]/60 shadow-xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span
                          className={`text-[11px] font-mono font-bold tracking-[0.14em] px-2.5 py-1 rounded ${
                            isSelected
                              ? "bg-[#FF4B23] text-white"
                              : "bg-[#EAEAE8] text-[#151515]"
                          }`}
                        >
                          {item.step}
                        </span>
                        <Icon
                          className={`w-5 h-5 ${
                            isSelected ? "text-[#FF4B23]" : "text-[#151515]/55"
                          }`}
                          aria-hidden="true"
                        />
                      </div>

                      <h3 className="text-lg font-bold tracking-tight mb-2.5">
                        {item.title}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed mb-5 ${
                          isSelected ? "text-white/78" : "text-[#151515]/70"
                        }`}
                      >
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-current/10">
                      {item.protocols.map((proto) => (
                        <span
                          key={proto}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            isSelected
                              ? "bg-white/10 text-white/85"
                              : "bg-[#F5F5F3] text-[#151515]/70"
                          }`}
                        >
                          {proto}
                        </span>
                      ))}
                    </div>
                  </button>

                  {/* Connector arrow between steps (desktop horizontal, mobile vertical) */}
                  {idx < architectureSteps.length - 1 && (
                    <div
                      className="flex lg:hidden justify-center py-2 text-[#FF4B23]"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  )}
                  {idx < architectureSteps.length - 1 && (
                    <div
                      className="hidden lg:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#F5F5F3] border border-[#151515]/15 text-[#FF4B23]"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Plain-English Trace Bar for Selected Architecture Step */}
          <div className="mt-6 rounded-xl bg-white border border-[#151515]/12 p-5 sm:p-6 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#FF4B23] font-semibold block mb-1">
                  SIGNAL TRACE · {architectureSteps[activeArchStep].step}
                </span>
                <strong className="text-base font-bold text-[#151515]">
                  {architectureSteps[activeArchStep].title}
                </strong>
              </div>
              <div className="md:col-span-5 text-sm text-[#151515]/75">
                <span className="text-[11px] font-mono uppercase text-[#151515]/45 block mb-0.5">
                  Example Event
                </span>
                {architectureSteps[activeArchStep].exampleSignal}
              </div>
              <div className="md:col-span-4 text-sm text-[#151515] font-medium bg-[#F5F5F3] rounded-lg px-4 py-3 border border-[#151515]/8">
                <span className="text-[10px] font-mono uppercase text-[#FF4B23] block mb-0.5">
                  System Result
                </span>
                {architectureSteps[activeArchStep].exampleOutcome}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 04 — ENGINEERING CAPABILITIES
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="capabilities" className="scroll-mt-24 py-16 sm:py-24 bg-white border-b border-[#151515]/12">
        <div className="site-width">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#FF4B23] mb-2.5">
                ENGINEERING CAPABILITIES / 03
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#151515]">
                The building blocks for intelligent operations.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#151515]/70 max-w-md leading-relaxed">
              We engineer the software platform, telemetry pipelines, and industrial automation integrations that connect physical equipment with your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <article
                  key={cap.code}
                  className="group relative rounded-xl bg-[#F5F5F3] border border-[#151515]/10 p-6 sm:p-7 hover:bg-white hover:border-[#151515]/25 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-lg bg-white border border-[#151515]/10 flex items-center justify-center text-[#151515] group-hover:bg-[#FF4B23] group-hover:text-white group-hover:border-[#FF4B23] transition-colors">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-[#151515]/45">
                        {cap.code}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#151515] tracking-tight mb-3">
                      {cap.title}
                    </h3>

                    <p className="text-sm text-[#151515]/72 leading-relaxed mb-5">
                      {cap.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#151515]/10 flex items-center gap-2 text-xs font-medium text-[#151515]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B23] shrink-0" aria-hidden="true" />
                    <span>{cap.outcome}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 05 — REAL-WORLD INDUSTRY APPLICATIONS
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="applications" className="scroll-mt-24 py-16 sm:py-24 bg-[#EAEAE8] border-b border-[#151515]/12">
        <div className="site-width">
          <div className="max-w-3xl mb-12">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#FF4B23] mb-2.5">
              INDUSTRY APPLICATIONS / 04
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#151515] mb-4">
              Real-world applications across industries.
            </h2>
            <p className="text-base text-[#151515]/72 leading-relaxed">
              Practical connected workflows built around the physical constraints, environments, and daily decisions of each operating sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {applications.map((app) => (
              <article
                key={app.id}
                className="rounded-2xl overflow-hidden bg-white border border-[#151515]/10 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#171717]">
                    <Image
                      src={app.image}
                      alt={app.imageAlt}
                      fill
                      unoptimized
                      className="object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded bg-[#171717]/90 text-white text-[10px] font-mono font-semibold uppercase tracking-[0.14em] border border-white/15">
                      {app.tag}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#151515] tracking-tight mb-5">
                      {app.title}
                    </h3>

                    <dl className="space-y-4 text-sm">
                      <div className="pl-3.5 border-l-2 border-[#151515]/20">
                        <dt className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#151515]/55 mb-1">
                          OPERATIONAL PROBLEM
                        </dt>
                        <dd className="text-[#151515]/75 leading-relaxed">{app.problem}</dd>
                      </div>

                      <div className="pl-3.5 border-l-2 border-[#FF4B23]">
                        <dt className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#FF4B23] mb-1">
                          HOW CONNECTED TECH HELPS
                        </dt>
                        <dd className="text-[#151515]/80 leading-relaxed">{app.solution}</dd>
                      </div>

                      <div className="rounded-lg bg-[#F5F5F3] px-4 py-3 border border-[#151515]/8">
                        <dt className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#151515]/60 mb-1">
                          INTENDED BUSINESS VALUE
                        </dt>
                        <dd className="text-[#151515] font-medium leading-relaxed">{app.value}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {app.href && app.hrefLabel && (
                  <div className="px-6 sm:px-7 py-4 border-t border-[#151515]/10 bg-[#F5F5F3]/60">
                    <Link
                      href={app.href}
                      className="inline-flex items-center gap-2 text-xs font-semibold !text-[#151515] hover:!text-[#FF4B23] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4B23]"
                    >
                      <span>{app.hrefLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4B23]" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 06 — OPERATIONS CONTROL ROOM PREVIEW
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="control-room" className="scroll-mt-24 py-16 sm:py-24 bg-[#F5F5F3] border-b border-[#151515]/12">
        <div className="site-width">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#FF4B23] mb-2.5">
                CONTROL ROOM PREVIEW / 05
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#151515] mb-3">
                A clear, real-time view of your operation.
              </h2>
              <p className="text-sm sm:text-base text-[#151515]/72 leading-relaxed">
                Interact with this illustrative operational console to see how device connectivity, equipment health, environmental readings, and alert workflows come together in one workspace.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#EAEAE8] border border-[#151515]/12 text-[11px] font-mono uppercase tracking-[0.12em] text-[#151515]/80 self-start lg:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#FF4B23]" aria-hidden="true" />
              SAMPLE DATA · ILLUSTRATIVE INTERFACE
            </div>
          </div>

          {/* Enterprise Control Room Mockup Container */}
          <div className="rounded-2xl bg-[#171717] text-white border border-[#151515] shadow-2xl overflow-hidden">
            {/* Control Room Top Bar + Facility Switcher */}
            <div className="px-5 sm:px-7 py-4 border-b border-white/10 bg-[#121212] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF4B23] text-white flex items-center justify-center font-mono text-xs font-bold">
                  CX
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    CreativeX Operations Console
                  </div>
                  <div className="text-[11px] font-mono text-white/55">
                    {currentSite.subtitle} · Illustrative sample telemetry
                  </div>
                </div>
              </div>

              <div
                className="flex flex-wrap gap-1.5"
                role="group"
                aria-label="Filter control room view by facility zone"
              >
                {(Object.keys(siteSnapshots) as SiteKey[]).map((key) => {
                  const active = selectedSite === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSite(key)}
                      aria-pressed={active}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4B23] ${
                        active
                          ? "bg-[#FF4B23] text-white"
                          : "bg-white/8 text-white/75 hover:bg-white/14 hover:text-white"
                      }`}
                    >
                      {siteSnapshots[key].label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control Room Body */}
            <div className="p-5 sm:p-7 space-y-6">
              {/* Top 4 KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                <div className="rounded-xl bg-[#20201E] border border-white/10 p-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/55 mb-2">
                    <span>DEVICE STATUS</span>
                    <Wifi className="w-4 h-4 text-[#9be56a]" aria-hidden="true" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {currentSite.onlineCount} Online
                  </div>
                  <div className="text-xs text-white/60 mt-1">
                    {currentSite.offlineCount} Offline / Queued
                  </div>
                </div>

                <div className="rounded-xl bg-[#20201E] border border-white/10 p-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/55 mb-2">
                    <span>EQUIPMENT HEALTH</span>
                    <Activity className="w-4 h-4 text-[#FF4B23]" aria-hidden="true" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {currentSite.healthStatus}
                  </div>
                  <div className="text-xs text-white/60 mt-1">Vibration &amp; Thermal Index</div>
                </div>

                <div className="rounded-xl bg-[#20201E] border border-white/10 p-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/55 mb-2">
                    <span>ENVIRONMENT</span>
                    <Thermometer className="w-4 h-4 text-white/75" aria-hidden="true" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {currentSite.envReading}
                  </div>
                  <div className="text-xs text-white/60 mt-1">{currentSite.envNote}</div>
                </div>

                <div className="rounded-xl bg-[#20201E] border border-white/10 p-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/55 mb-2">
                    <span>ALERT QUEUE</span>
                    <Bell className="w-4 h-4 text-[#FF4B23]" aria-hidden="true" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {currentSite.openAlerts} Open
                  </div>
                  <div className="text-xs text-white/60 mt-1">Escalation &amp; owner assigned</div>
                </div>
              </div>

              {/* Main 12-Col Dashboard Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left 7 Cols: Performance Trends + Asset Visibility Table */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Trend Chart Panel */}
                  <div className="rounded-xl bg-[#20201E] border border-white/10 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/50 block">
                          12-HOUR TELEMETRY TREND (SAMPLE)
                        </span>
                        <h3 className="text-base font-semibold text-white">
                          {metricInfo.label}:{" "}
                          <span className="text-[#FF4B23] font-mono">
                            {latestValue} {metricInfo.unit}
                          </span>
                        </h3>
                      </div>

                      <div className="flex gap-1.5" role="group" aria-label="Select chart metric">
                        {(Object.keys(chartMeta) as ChartMetricKey[]).map((mKey) => (
                          <button
                            key={mKey}
                            type="button"
                            onClick={() => setSelectedMetric(mKey)}
                            aria-pressed={selectedMetric === mKey}
                            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                              selectedMetric === mKey
                                ? "bg-white text-[#151515] font-semibold"
                                : "bg-white/8 text-white/65 hover:text-white"
                            }`}
                          >
                            {mKey === "temp" ? "Temp" : mKey === "load" ? "Load" : "Cycles"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Crisp Responsive SVG Chart */}
                    <div className="w-full overflow-hidden">
                      <svg
                        viewBox={`0 0 ${width} ${height}`}
                        className="w-full h-36 sm:h-40 overflow-visible"
                        role="img"
                        aria-label={`Illustrative 12-interval ${metricInfo.label} telemetry trend`}
                      >
                        <defs>
                          <linearGradient id="iotChartFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF4B23" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="#FF4B23" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Horizontal reference lines */}
                        {[0.25, 0.5, 0.75].map((ratio) => (
                          <line
                            key={ratio}
                            x1="0"
                            y1={height * ratio}
                            x2={width}
                            y2={height * ratio}
                            stroke="rgba(255,255,255,0.08)"
                            strokeDasharray="4 4"
                          />
                        ))}
                        <path d={areaPath} fill="url(#iotChartFill)" />
                        <path
                          d={linePath}
                          fill="none"
                          stroke="#FF4B23"
                          strokeWidth="2.5"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                        {coords.map((pt, index) => (
                          <circle
                            key={index}
                            cx={pt.x}
                            cy={pt.y}
                            r={index === coords.length - 1 ? 4.5 : 2.8}
                            fill={index === coords.length - 1 ? "#FFFFFF" : "#FF4B23"}
                            stroke="#171717"
                            strokeWidth="1.5"
                          />
                        ))}
                      </svg>
                      <div className="flex justify-between text-[10px] font-mono text-white/40 mt-2 px-1">
                        <span>-12h</span>
                        <span>-9h</span>
                        <span>-6h</span>
                        <span>-3h</span>
                        <span className="text-[#FF4B23]">Now</span>
                      </div>
                    </div>
                  </div>

                  {/* Device & Asset Visibility Table */}
                  <div className="rounded-xl bg-[#20201E] border border-white/10 overflow-hidden">
                    <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-[0.12em] text-white/70 font-semibold">
                        CONNECTED ASSET VISIBILITY
                      </span>
                      <span className="text-[11px] font-mono text-white/45">
                        {currentSite.devices.length} monitored units
                      </span>
                    </div>
                    <div className="divide-y divide-white/8">
                      {currentSite.devices.map((dev) => (
                        <div
                          key={dev.id}
                          className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] text-[#FF4B23] font-semibold">
                                {dev.id}
                              </span>
                              <strong className="text-white font-medium">{dev.name}</strong>
                            </div>
                            <span className="text-white/50 text-[11px]">
                              {dev.zone} · {dev.reading}
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 self-start sm:self-center">
                            <span className="text-[11px] text-white/65">{dev.health}</span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] font-semibold ${
                                dev.status === "Online"
                                  ? "bg-[#9be56a]/15 text-[#9be56a]"
                                  : dev.status === "Warning"
                                  ? "bg-[#FF4B23]/20 text-[#FF4B23]"
                                  : "bg-white/10 text-white/70"
                              }`}
                            >
                              {dev.status === "Offline" ? (
                                <WifiOff className="w-3 h-3" aria-hidden="true" />
                              ) : (
                                <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                              )}
                              {dev.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 5 Cols: Alert History & Dispatch Stream */}
                <div className="lg:col-span-5 rounded-xl bg-[#20201E] border border-white/10 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/50 block">
                          INCIDENT TIMELINE
                        </span>
                        <h3 className="text-base font-semibold text-white">
                          Alert History &amp; Dispatch
                        </h3>
                      </div>
                      <Truck className="w-4 h-4 text-white/40" aria-hidden="true" />
                    </div>

                    <div className="space-y-3.5">
                      {currentSite.alerts.map((al, i) => (
                        <div
                          key={`${al.source}-${i}`}
                          className="rounded-lg bg-[#171717] border border-white/8 p-4"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-mono text-[11px] text-[#FF4B23] font-semibold">
                              {al.time} · {al.source}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                                al.state === "Active"
                                  ? "bg-[#FF4B23] text-white"
                                  : al.state === "Acknowledged"
                                  ? "bg-white/12 text-white"
                                  : "bg-[#9be56a]/15 text-[#9be56a]"
                              }`}
                            >
                              {al.state}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-white/85 leading-snug mb-2">
                            {al.message}
                          </p>
                          <span className="text-[11px] font-mono text-white/50 block">
                            Owner: {al.owner}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-white/55 leading-relaxed">
                    All console dashboards are engineered to match your facility layout, shift escalation policy, and maintenance workflows.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 07 — OUR IMPLEMENTATION PROCESS
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="process" className="scroll-mt-24 py-16 sm:py-24 bg-[#EAEAE8] border-b border-[#151515]/12">
        <div className="site-width">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#FF4B23] mb-2.5">
              IMPLEMENTATION PROCESS / 06
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#151515] mb-4">
              A practical, proven implementation approach.
            </h2>
            <p className="text-base text-[#151515]/72 leading-relaxed">
              We de-risk connected operations projects by proving signal quality and operator usefulness early before scaling hardware or dashboards across sites.
            </p>
          </div>

          {/* 4-Stage Timeline */}
          <div className="relative">
            {/* Desktop Horizontal Connector Rail */}
            <div
              className="hidden lg:block absolute top-6 left-10 right-10 h-[2px] bg-[#151515]/15"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {implementationStages.map((stage) => (
                <article
                  key={stage.number}
                  className="relative rounded-xl bg-white border border-[#151515]/10 p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="relative z-10 w-12 h-12 rounded-full bg-[#171717] text-white font-mono text-sm font-bold flex items-center justify-center border-4 border-[#EAEAE8]">
                        {stage.number}
                      </span>
                      <span className="h-[2px] flex-1 bg-[#FF4B23]/40 lg:hidden" aria-hidden="true" />
                    </div>

                    <h3 className="text-lg font-bold text-[#151515] tracking-tight mb-2.5">
                      {stage.title}
                    </h3>

                    <p className="text-sm text-[#151515]/72 leading-relaxed mb-5">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-[#151515]/10 text-[11px] font-mono text-[#151515]/65">
                    OUTPUT: <span className="text-[#151515] font-semibold">{stage.deliverable}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 08 — RELIABILITY & SECURITY (DARK CONTRASTING SECTION)
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#171717] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="site-width relative z-10">
          <div className="max-w-3xl mb-12">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#FF4B23] mb-2.5">
              RELIABILITY &amp; SECURITY / 07
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Built for reliability, control and continuity.
            </h2>
            <p className="text-base text-white/70 leading-relaxed">
              Industrial and field systems cannot fail silently. Resilience, encrypted communication, and accountable alerting are designed into the core architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reliabilityPillars.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-xl bg-[#20201E] border border-white/12 p-6 sm:p-8 flex items-start gap-5 hover:border-[#FF4B23]/55 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FF4B23]/15 border border-[#FF4B23]/30 flex items-center justify-center text-[#FF4B23] shrink-0">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/72 leading-relaxed">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 09 — BUSINESS OUTCOMES
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#F5F5F3] border-b border-[#151515]/12">
        <div className="site-width">
          <div className="max-w-3xl mb-12">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#FF4B23] mb-2.5">
              BUSINESS OUTCOMES / 08
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#151515]">
              Turn operations into measurable business value.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessOutcomes.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <article
                  key={outcome.index}
                  className="rounded-xl bg-white border border-[#151515]/10 p-7 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono font-bold tracking-[0.14em] text-[#FF4B23]">
                        {outcome.index}
                      </span>
                      <Icon className="w-5 h-5 text-[#151515]/60" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-[#151515] tracking-tight mb-3">
                      {outcome.title}
                    </h3>
                    <p className="text-sm text-[#151515]/72 leading-relaxed">
                      {outcome.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 10 — ACCESSIBLE FAQ ACCORDION
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="scroll-mt-24 py-16 sm:py-24 bg-white">
        <div className="site-width">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#FF4B23] mb-2.5">
                FAQ / 09
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#151515] mb-4">
                Questions operations teams ask first.
              </h2>
              <p className="text-sm sm:text-base text-[#151515]/70 leading-relaxed mb-6">
                Straightforward answers about hardware compatibility, legacy machinery, pilot phases, and daily system use.
              </p>
              <Link
                href="/contact?service=iot-smart-operations"
                className="inline-flex items-center gap-2 text-sm font-semibold !text-[#151515] hover:!text-[#FF4B23] transition-colors"
              >
                Ask our engineering team directly
                <ArrowRight className="w-4 h-4 text-[#FF4B23]" aria-hidden="true" />
              </Link>
            </div>

            <div className="lg:col-span-8">
              <Accordion
                type="single"
                collapsible
                defaultValue="faq-0"
                className="rounded-xl border border-[#151515]/12 bg-[#F5F5F3] px-5 sm:px-7 divide-y divide-[#151515]/10"
              >
                {iotFaqs.map((faq, idx) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${idx}`}
                    className="border-[#151515]/10"
                  >
                    <AccordionTrigger className="py-5 text-base font-semibold text-[#151515] hover:no-underline hover:text-[#FF4B23] text-left">
                      <span>{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[#151515]/75 leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 11 — FINAL CONVERSION CTA BANNER
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-[#F5F5F3] border-t border-[#151515]/10">
        <div className="site-width">
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-[20px] shadow-[0_20px_50px_-18px_rgba(255,75,35,0.45)]"
            style={{
              background:
                "linear-gradient(102deg, #FF3F12 0%, #FF4B23 55%, #FF641A 100%)",
            }}
          >
            {/* Dotted Wave Mesh Accent (matching clean horizontal banner style) */}
            <svg
              className="pointer-events-none select-none absolute inset-y-0 right-0 w-[520px] sm:w-[680px] h-full opacity-35"
              viewBox="0 0 680 180"
              fill="none"
              preserveAspectRatio="xMaxYMax slice"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="ctaWaveDotsMatrix"
                  x="0"
                  y="0"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1.5" cy="1.5" r="1.1" fill="#FFFFFF" />
                </pattern>
                <linearGradient id="ctaWaveFade" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </linearGradient>
                <mask id="ctaWaveMask">
                  <path
                    d="M 160 180 C 260 140, 340 45, 470 55 C 565 62, 625 120, 680 98 L 680 180 Z"
                    fill="url(#ctaWaveFade)"
                  />
                </mask>
              </defs>
              <rect
                x="0"
                y="0"
                width="680"
                height="180"
                fill="url(#ctaWaveDotsMatrix)"
                mask="url(#ctaWaveMask)"
              />
            </svg>

            <div className="relative z-10 px-7 py-8 sm:px-10 sm:py-9 lg:px-14 lg:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
              <h2
                className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold tracking-[-0.025em] leading-[1.08] shrink-0"
                style={{ color: "#FFFFFF" }}
              >
                Let&apos;s connect
                <br className="hidden sm:block" /> your operation.
              </h2>

              <div
                className="hidden lg:block w-px h-14 bg-white/30 shrink-0"
                aria-hidden="true"
              />

              <p
                className="text-sm sm:text-[15px] leading-relaxed max-w-md font-normal flex-1"
                style={{ color: "rgba(255,255,255,0.94)" }}
              >
                Explore how IoT, robotics and smart operations can create greater
                control, efficiency and reliability for your business.
              </p>

              <Link
                href="/contact?service=iot-smart-operations"
                style={{ color: "#151515", backgroundColor: "#FFFFFF" }}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#F5F5F3] !text-[#151515] px-7 py-4 rounded-full text-sm font-bold tracking-tight transition-colors shadow-sm shrink-0 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span>Discuss an IoT Project</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" style={{ color: "#151515" }} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
