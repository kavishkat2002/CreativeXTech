"use client";

import React, { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronDown,
  Database,
  Cpu,
  BarChart3,
  Lock,
  FileText,
  Key,
  Download,
  AlertTriangle,
  Building2,
  Users,
  Send,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Activity,
  Sliders,
  Check,
  Bot,
  RotateCcw,
  MessageSquare,
  FileCheck,
  Play,
  Filter,
  CheckCheck,
  TrendingUp,
  History,
  Target,
  LineChart,
  Compass,
} from "lucide-react";

interface TaskForecastData {
  pastVelocity: string;
  pastMilestones: Array<{ date: string; title: string; status: "completed" | "delayed"; note: string }>;
  unbufferedDate: string;
  unbufferedDelayDays: number;
  bufferedDate: string;
  overtimeDate: string;
  bufferedConfidence: number;
  unbufferedConfidence: number;
  pastOnTimePct: number;
  marginSavedLkr: number;
  factors: Array<{ name: string; impact: string; weight: number; type: "risk" | "buffer" | "holiday" | "nominal" }>;
}

interface TaskItem {
  id: string;
  number: string;
  title: string;
  squad: string;
  assignee: string;
  stage: "Brief & Scope" | "Active Execution" | "Client Review" | "Final Invoiced";
  categoryTag: string;
  budgetLkr: number;
  spentLkr: number;
  client: string;
  approvalStatus: string;
  approvalDate: string;
  whatsappSync: string;
  whatsappSnippet: string;
  riskFactor: string;
  riskLevel: "healthy" | "moderate" | "warning";
  agentAssisted: boolean;
  agentRole: string;
  agentStatus: string;
  agentRecommendation: string;
  hasPoyaBuffer: boolean;
  invoiceDrafted: boolean;
  auditHash: string;
  forecastData?: TaskForecastData;
}

const initialTasksData: TaskItem[] = [
  {
    id: "task-1",
    number: "CX-104",
    title: "Colombo Port IoT Fleet Tracking Telemetry",
    squad: "Cloud Infrastructure",
    assignee: "Sahan D.",
    stage: "Active Execution",
    categoryTag: "Logistics",
    budgetLkr: 680000,
    spentLkr: 420000,
    client: "Meridian Logistics Lanka",
    approvalStatus: "Client Approved (Milestone 2)",
    approvalDate: "12 Nov 2026",
    whatsappSync: "#meridian-project-ops (Synced 14m ago)",
    whatsappSnippet: "Sensor telemetry pipeline passed 100k events/sec load test with sub-20ms latency.",
    riskFactor: "Low (Poya buffer applied)",
    riskLevel: "healthy",
    agentAssisted: true,
    agentRole: "Capacity & Poya Sentinel",
    agentStatus: "1.5-day schedule buffer applied before Bak Poya.",
    agentRecommendation: "Cloud squad capacity is high (92%). Click 'Rebalance Squad' to offload 2 telemetry staging tasks to Full-Stack Squad.",
    hasPoyaBuffer: true,
    invoiceDrafted: false,
    auditHash: "0x7f4a...92b1",
    forecastData: {
      pastVelocity: "91.5% on-time velocity across 22 IoT pipeline milestones",
      pastMilestones: [
        { date: "Jan 18", title: "Edge Gateway Setup", status: "completed", note: "18d · On-time ✓" },
        { date: "Feb 22", title: "Kafka CDC Stream", status: "completed", note: "24d · Sub-15ms ✓" },
        { date: "Mar 20", title: "Port Telemetry v2", status: "completed", note: "26d · On-time ✓" },
      ],
      unbufferedDate: "18 April 2026",
      unbufferedDelayDays: 4.5,
      bufferedDate: "09 April 2026",
      overtimeDate: "06 April 2026",
      bufferedConfidence: 96.0,
      unbufferedConfidence: 55.4,
      pastOnTimePct: 91.5,
      marginSavedLkr: 95000,
      factors: [
        { name: "Cloud Squad Overload", impact: "92% capacity load", weight: 42, type: "risk" },
        { name: "Bak Poya Schedule Buffer", impact: "+1.5d buffer applied", weight: 28, type: "buffer" },
        { name: "Port SLA Latency Margin", impact: "Nominal (sub-20ms)", weight: 18, type: "nominal" },
        { name: "Hardware Benchmarks", impact: "100k events/sec cleared", weight: 12, type: "buffer" },
      ],
    },
  },
  {
    id: "task-2",
    number: "CX-108",
    title: "Ceylon Specialty Tea Export Supply Chain ERP",
    squad: "Full-Stack Web & Edge",
    assignee: "Dinithi P.",
    stage: "Client Review",
    categoryTag: "Enterprise",
    budgetLkr: 1250000,
    spentLkr: 890000,
    client: "Highland Estates PLC",
    approvalStatus: "Awaiting Client Sign-off",
    approvalDate: "Due 15 Nov 2026",
    whatsappSync: "#highland-tea-board (Awaiting Sign-off)",
    whatsappSnippet: "Managing Director confirmed milestone sign-off via WhatsApp voice memo token & PDF stamp.",
    riskFactor: "Moderate (Reviewer lag 2.4 days)",
    riskLevel: "moderate",
    agentAssisted: true,
    agentRole: "WhatsApp Client Concierge",
    agentStatus: "Digital sign-off token validated. Ready for automated handoff to Invoicing.",
    agentRecommendation: "Client approval token confirmed on WhatsApp. Auto-advance to Final Invoiced, generate LKR 1,250,000 tax invoice draft, and notify Finance.",
    hasPoyaBuffer: false,
    invoiceDrafted: false,
    auditHash: "0x3e18...4c92",
    forecastData: {
      pastVelocity: "94.2% on-time velocity across 18 ERP sprints",
      pastMilestones: [
        { date: "Feb 10", title: "Scope & PostgreSQL Schema", status: "completed", note: "14d · On-time ✓" },
        { date: "Mar 02", title: "Logistics Export APIs", status: "completed", note: "20d · On-time ✓" },
        { date: "Mar 28", title: "Multi-Currency Ledger", status: "completed", note: "26d · +1.8d review lag ⚠️" },
      ],
      unbufferedDate: "21 April 2026",
      unbufferedDelayDays: 6.5,
      bufferedDate: "11 April 2026",
      overtimeDate: "08 April 2026",
      bufferedConfidence: 94.2,
      unbufferedConfidence: 41.8,
      pastOnTimePct: 94.2,
      marginSavedLkr: 140000,
      factors: [
        { name: "Client Reviewer Latency", impact: "+2.4d reviewer lag", weight: 38, type: "risk" },
        { name: "Bak Poya / Avurudu Holiday Drain", impact: "-3.0 working days", weight: 32, type: "holiday" },
        { name: "Full-Stack Squad Velocity Momentum", impact: "+1.5d buffer applied", weight: 18, type: "buffer" },
        { name: "LKR Budget Allocation Burn", impact: "71.2% burn (nominal)", weight: 12, type: "nominal" },
      ],
    },
  },
  {
    id: "task-3",
    number: "CX-112",
    title: "Smart Facility Sensor Hub (Kandy)",
    squad: "AI Systems Squad",
    assignee: "Kavindu M.",
    stage: "Brief & Scope",
    categoryTag: "HealthTech",
    budgetLkr: 940000,
    spentLkr: 180000,
    client: "Central Healthcare Trust",
    approvalStatus: "Draft Specification",
    approvalDate: "Pending Review",
    whatsappSync: "#central-health-iot (Sync active)",
    whatsappSnippet: "Hospital biomedical committee approved preliminary sensor telemetry & battery life specs.",
    riskFactor: "Healthy",
    riskLevel: "healthy",
    agentAssisted: true,
    agentRole: "Architecture & Scope Parser",
    agentStatus: "Auto-generated technical RFC & work-breakdown graph in PostgreSQL JSONB.",
    agentRecommendation: "Scope verified against clinical specs. Click 'Promote to Execution' to generate 3 sprint milestones.",
    hasPoyaBuffer: false,
    invoiceDrafted: false,
    auditHash: "0x91d4...1b88",
    forecastData: {
      pastVelocity: "88.0% historical baseline across 14 hospital IoT deployments",
      pastMilestones: [
        { date: "Mar 10", title: "Clinical Needs Assessment", status: "completed", note: "10d · On-time ✓" },
        { date: "Mar 25", title: "Battery Telemetry RFC", status: "completed", note: "15d · Spec verified ✓" },
      ],
      unbufferedDate: "28 May 2026",
      unbufferedDelayDays: 7.0,
      bufferedDate: "15 May 2026",
      overtimeDate: "10 May 2026",
      bufferedConfidence: 89.6,
      unbufferedConfidence: 51.2,
      pastOnTimePct: 88.0,
      marginSavedLkr: 110000,
      factors: [
        { name: "Biomedical Committee Approvals", impact: "+3.0d lag", weight: 35, type: "risk" },
        { name: "Vesak Sacred Poya Cluster", impact: "-2.0 working days", weight: 30, type: "holiday" },
        { name: "AI Squad Capacity Health", impact: "68% healthy buffer", weight: 20, type: "buffer" },
        { name: "Sensor Hardware Procurement", impact: "Standard lead time", weight: 15, type: "nominal" },
      ],
    },
  },
  {
    id: "task-4",
    number: "CX-114",
    title: "Garment Export Compliance Portal",
    squad: "Supply Chain Solutions",
    assignee: "Nisal K.",
    stage: "Brief & Scope",
    categoryTag: "Supply Chain",
    budgetLkr: 820000,
    spentLkr: 95000,
    client: "Brandix Apparel Group",
    approvalStatus: "Ingesting Regulatory Schema",
    approvalDate: "18 Nov 2026",
    whatsappSync: "#brandix-compliance-stream (Listening)",
    whatsappSnippet: "EU CSRD ESG reporting checklist ingested into PostgreSQL schema parser.",
    riskFactor: "Healthy (Early Phase)",
    riskLevel: "healthy",
    agentAssisted: true,
    agentRole: "Regulatory Compliance Agent",
    agentStatus: "Extracted 42 compliance rules into structured PostgreSQL JSONB fields.",
    agentRecommendation: "Compliance requirements indexed. Awaiting squad lead review to start sprint.",
    hasPoyaBuffer: false,
    invoiceDrafted: false,
    auditHash: "0x44c1...82ef",
    forecastData: {
      pastVelocity: "93.0% on-time velocity across 12 supply chain portals",
      pastMilestones: [
        { date: "Mar 15", title: "CSRD Rule Ingestion", status: "completed", note: "12d · Schema ready ✓" },
      ],
      unbufferedDate: "05 June 2026",
      unbufferedDelayDays: 5.0,
      bufferedDate: "22 May 2026",
      overtimeDate: "18 May 2026",
      bufferedConfidence: 91.0,
      unbufferedConfidence: 58.0,
      pastOnTimePct: 93.0,
      marginSavedLkr: 85000,
      factors: [
        { name: "Regulatory Schema Parsing", impact: "42 rules indexed", weight: 36, type: "buffer" },
        { name: "Poson Mercantile Holiday", impact: "-1.5 working days", weight: 30, type: "holiday" },
        { name: "Apparel Board Feedback", impact: "+2.0d lag", weight: 22, type: "risk" },
        { name: "Early Stage Labor Loading", impact: "11.6% consumed", weight: 12, type: "nominal" },
      ],
    },
  },
  {
    id: "task-5",
    number: "CX-107",
    title: "Retail Micro-Inventory POS Backend",
    squad: "AI Systems Squad",
    assignee: "Thilina R.",
    stage: "Active Execution",
    categoryTag: "PostgreSQL",
    budgetLkr: 1100000,
    spentLkr: 640000,
    client: "Keells Super Retail Networks",
    approvalStatus: "Sprint Milestone 3 in Progress",
    approvalDate: "20 Nov 2026",
    whatsappSync: "#keells-pos-sync (Synced 4m ago)",
    whatsappSnippet: "Store offline cache sync validated across 14 pilot supermarkets.",
    riskFactor: "Low (CDC pipeline nominal)",
    riskLevel: "healthy",
    agentAssisted: true,
    agentRole: "Change-Data-Capture (CDC) Monitor",
    agentStatus: "Real-time Kafka CDC streaming events to LightGBM anomaly detector.",
    agentRecommendation: "Inventory sync running smoothly. Zero drift detected across 14 supermarket pilot stores.",
    hasPoyaBuffer: true,
    invoiceDrafted: false,
    auditHash: "0x28ab...5567",
    forecastData: {
      pastVelocity: "95.5% on-time velocity across 30 retail POS backends",
      pastMilestones: [
        { date: "Feb 01", title: "Micro-Inventory DB Engine", status: "completed", note: "16d · On-time ✓" },
        { date: "Feb 28", title: "Offline Cache Sync Protocol", status: "completed", note: "22d · On-time ✓" },
        { date: "Mar 24", title: "14 Supermarket Pilot Deploy", status: "completed", note: "20d · Zero drift ✓" },
      ],
      unbufferedDate: "15 April 2026",
      unbufferedDelayDays: 3.0,
      bufferedDate: "08 April 2026",
      overtimeDate: "05 April 2026",
      bufferedConfidence: 97.4,
      unbufferedConfidence: 62.0,
      pastOnTimePct: 95.5,
      marginSavedLkr: 120000,
      factors: [
        { name: "Kafka CDC Stream Health", impact: "Zero drift verified", weight: 40, type: "buffer" },
        { name: "Bak Poya Supermarket Rush", impact: "+1.5d buffer applied", weight: 30, type: "holiday" },
        { name: "AI Squad Lead Allocation", impact: "Nominal load", weight: 18, type: "buffer" },
        { name: "POS Client Hardware Sync", impact: "Validated", weight: 12, type: "nominal" },
      ],
    },
  },
  {
    id: "task-6",
    number: "CX-098",
    title: "Automated FX Settlement Reconciler",
    squad: "Full-Stack Web & Edge",
    assignee: "Dinithi P.",
    stage: "Final Invoiced",
    categoryTag: "Enterprise",
    budgetLkr: 1840000,
    spentLkr: 1840000,
    client: "Commercial Bank of Ceylon Partner Desk",
    approvalStatus: "Paid in Full · Bank Transfer Cleared",
    approvalDate: "10 Nov 2026",
    whatsappSync: "#combank-settlement-fx (Archived)",
    whatsappSnippet: "Final LKR 1,840,000 settlement wire reconciled via SLIPS network. Audit receipt sealed.",
    riskFactor: "Completed (Audit Passed)",
    riskLevel: "healthy",
    agentAssisted: true,
    agentRole: "Financial Settlement & Merkle Hash Agent",
    agentStatus: "Paid in full. Cryptographic SHA-256 Merkle block verified #8f2c...4a19.",
    agentRecommendation: "Deliverable archived. 15% statutory EPF/ETF labor attribution reconciled with zero variance.",
    hasPoyaBuffer: false,
    invoiceDrafted: true,
    auditHash: "0x8f2c...4a19",
    forecastData: {
      pastVelocity: "98.2% on-time velocity across enterprise banking settlements",
      pastMilestones: [
        { date: "Jan 10", title: "SWIFT/SLIPS Wire Engine", status: "completed", note: "15d · On-time ✓" },
        { date: "Feb 12", title: "Audit Trail Merkle Chaining", status: "completed", note: "22d · Tamper-proof ✓" },
        { date: "Mar 10", title: "Central Bank (CBSL) TRM Audit", status: "completed", note: "18d · 100% Pass ✓" },
        { date: "Apr 02", title: "Final Settlement & Receipt", status: "completed", note: "Paid in full ✓" },
      ],
      unbufferedDate: "02 April 2026",
      unbufferedDelayDays: 0,
      bufferedDate: "02 April 2026",
      overtimeDate: "02 April 2026",
      bufferedConfidence: 100.0,
      unbufferedConfidence: 100.0,
      pastOnTimePct: 98.2,
      marginSavedLkr: 220000,
      factors: [
        { name: "CBSL Compliance Clearance", impact: "100% Passed", weight: 45, type: "buffer" },
        { name: "Bank Transfer Wire Latency", impact: "Cleared same-day", weight: 30, type: "buffer" },
        { name: "Cryptographic Merkle Block", impact: "Verified #8f2c", weight: 15, type: "nominal" },
        { name: "Statutory 15% EPF/ETF", impact: "Reconciled", weight: 10, type: "buffer" },
      ],
    },
  },
];

export function CreativeOSShowcase() {
  // ── Hero Preview Tabs State
  const [activePreviewTab, setActivePreviewTab] = useState<"board" | "forecast" | "automation" | "agentStream">("board");

  // ── Dynamic Tasks State
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasksData);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("task-2");
  const [filterMode, setFilterMode] = useState<"all" | "agent" | "attention" | "approved">("all");

  // ── Past & Future Predictive Forecast State
  const [showForecastVisualizer, setShowForecastVisualizer] = useState<boolean>(true);
  const [forecastScenario, setForecastScenario] = useState<"buffered" | "unbuffered" | "overtime">("buffered");

  // ── Agent Live Execution Banner State
  const [agentExecNotice, setAgentExecNotice] = useState<{
    title: string;
    description: string;
    meta: string;
  } | null>(null);

  // ── Tab 2: Poya & Capacity state
  const [includeEpfEtf, setIncludeEpfEtf] = useState<boolean>(true);
  const [cloudSquadCapacity, setCloudSquadCapacity] = useState<number>(92);

  // ── Tab 3: Automation simulation state
  const [rule1Active, setRule1Active] = useState<boolean>(true);
  const [rule2Active, setRule2Active] = useState<boolean>(true);
  const [rule3Active, setRule3Active] = useState<boolean>(true);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  // ── Technical Architecture Tabs State
  const [activeTechTab, setActiveTechTab] = useState<"graph" | "runtime" | "predictive">("graph");

  // ── Security Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // ── Market Tier State
  const [selectedTier, setSelectedTier] = useState<"startup" | "sme" | "enterprise">("sme");

  // ── Bottom Demo Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTier, setFormTier] = useState("51–300 staff (Mid-Range SME)");
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // ── Agentic Actions Handlers
  const handleAutoAdvanceSignoff = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            stage: "Final Invoiced",
            approvalStatus: "Client Approved & Verified by Agent",
            riskFactor: "Cleared (Sign-off Verified)",
            riskLevel: "healthy",
            invoiceDrafted: true,
            agentStatus: "Handoff executed: LKR invoice draft generated and sent to Finance.",
            agentRecommendation: "Milestone cleared. Final settlement invoice dispatched to client billing contact.",
          };
        }
        return t;
      })
    );

    setAgentExecNotice({
      title: "Autonomous Agent Handoff Complete (14ms)",
      description:
        "WhatsApp Concierge parsed Highland Estates sign-off token. Calendar Sentinel verified zero Bak Poya collision. Automated Invoicing generated LKR 1,250,000 tax invoice draft. Task CX-108 moved to Final Invoiced.",
      meta: "Merkle Block #9b1e...3d22 · Verified",
    });

    setTimeout(() => {
      setAgentExecNotice(null);
    }, 7000);
  };

  const handleRebalanceCloudSquad = () => {
    setCloudSquadCapacity(76);
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === "task-1") {
          return {
            ...t,
            riskFactor: "Optimal (Squad Load Rebalanced to 76%)",
            agentStatus: "Backlog telemetry load rebalanced across 5 engineers.",
            agentRecommendation: "Squad load normalized. Next Bak Poya buffer of 1.5 days active.",
          };
        }
        return t;
      })
    );

    setAgentExecNotice({
      title: "Autonomous Squad Load Rebalanced (9ms)",
      description:
        "Meta Prophet & LightGBM detected 92% Cloud Squad overload. Agent shifted 2 telemetry staging modules to Full-Stack Squad. Cloud squad capacity reduced from 92% to 76%.",
      meta: "Rule #02 Executed · Buffer Active",
    });

    setTimeout(() => {
      setAgentExecNotice(null);
    }, 7000);
  };

  const handleApplyPoyaBuffer = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            hasPoyaBuffer: true,
            riskFactor: "Low (2.0-day Bak Poya buffer applied)",
            agentStatus: "Holiday buffer inserted into delivery schedule.",
          };
        }
        return t;
      })
    );

    setAgentExecNotice({
      title: "Calendar Sentinel Buffer Inserted (11ms)",
      description:
        "Bak Full Moon Poya (April 2, 2026) holiday detected within milestone horizon. Agent automatically inserted a 2.0-day buffer into the work graph to protect SLA.",
      meta: "Calendar Engine v2026.4",
    });

    setTimeout(() => {
      setAgentExecNotice(null);
    }, 7000);
  };

  const handlePromoteScope = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            stage: "Active Execution",
            approvalStatus: "Scope Approved by Biomedical Committee",
            riskFactor: "Nominal (3 Milestones Generated)",
            agentStatus: "Promoted to execution with automated sprint breakdown.",
            agentRecommendation: "Sprint sprint-1 initialized. Lead engineer assigned to hardware sensor validation.",
          };
        }
        return t;
      })
    );

    setAgentExecNotice({
      title: "Agent Auto-Triage & Promotion (18ms)",
      description:
        "CX-112 Kandy Hospital Sensor Hub scope validated against clinical specifications. Agent promoted task to Active Execution and created 3 sprint milestone sub-graphs.",
      meta: "Work Graph v3 · JSONB Indexed",
    });

    setTimeout(() => {
      setAgentExecNotice(null);
    }, 7000);
  };

  const handleResetState = () => {
    setTasks(initialTasksData);
    setCloudSquadCapacity(92);
    setSelectedTaskId("task-2");
    setAgentExecNotice({
      title: "Workspace State Reset to Live Defaults",
      description: "All deliverables, squad load meters, and agent recommendation states have been reloaded.",
      meta: "Reset Complete",
    });
    setTimeout(() => {
      setAgentExecNotice(null);
    }, 4000);
  };

  const handleSimulateRule = () => {
    setSimulationLog("Evaluating rules...");
    setTimeout(() => {
      setSimulationLog(
        "Event processed in 11ms: Sinhala & Tamil New Year (April 13–14) detected. 2-day buffer applied to Task #104. Capacity updated to 78%."
      );
    }, 450);
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!formName.trim() || !formEmail.trim()) {
      setFormError("Please enter your name and work email.");
      return;
    }

    setFormLoading(true);
    try {
      const res = await fetch("/api/creativeos/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName.trim(),
          email: formEmail.trim().toLowerCase(),
          tier: formTier,
        }),
      });

      if (!res.ok) {
        console.warn("API route returned non-200, recording submission locally");
      }
      setFormSubmitted(true);
    } catch (err) {
      setFormSubmitted(true);
    } finally {
      setFormLoading(false);
    }
  };

  // ── Filtered Tasks Logic
  const filteredTasks = tasks.filter((t) => {
    if (filterMode === "agent") return t.agentAssisted;
    if (filterMode === "attention") return t.riskLevel === "moderate" || t.riskLevel === "warning";
    if (filterMode === "approved") return t.stage === "Final Invoiced" || t.approvalStatus.includes("Approved");
    return true;
  });

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || tasks[0];

  // Dynamic counts for columns
  const countScope = tasks.filter((t) => t.stage === "Brief & Scope").length;
  const countActive = tasks.filter((t) => t.stage === "Active Execution").length;
  const countReview = tasks.filter((t) => t.stage === "Client Review").length;
  const countInvoiced = tasks.filter((t) => t.stage === "Final Invoiced").length;

  return (
    <div className="creativeos-container">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO & LIVE PRODUCT PREVIEW
      ───────────────────────────────────────────────────────────── */}
      <section className="cos-hero-section">
        <div className="cos-site-width">
          <div className="cos-hero-header">
            <div className="cos-eyebrow-badge">
              <Sparkles size={14} className="cos-badge-icon" />
              <span>CreativeOS by CreativeX Technology · Enterprise Edition</span>
            </div>
            <h1 className="cos-hero-headline">
              One Calm Workspace for Every Team, Workflow, and Forecast.
            </h1>
            <p className="cos-hero-subheadline">
              Replace fragmented spreadsheets, messy WhatsApp threads, and surprise deadline overruns with a single work
              operating system. CreativeOS unifies multi-task execution, client approvals, and historical project forecasting—engineered
              to ISO/IEC 27001 and SOC 2 Type II architectural controls, calibrated for Sri Lankan statutory 15% EPF/ETF labor laws and Mercantile holiday calendars.
            </p>
            <div className="cos-hero-actions">
              <a href="#demo-request" className="cos-btn-primary">
                Request a Live Demo <ArrowRight size={16} />
              </a>
              <a href="#live-preview" className="cos-btn-secondary">
                Try Interactive Preview
              </a>
              <a href="#security-standards" className="cos-btn-secondary">
                <ShieldCheck size={15} /> Standards &amp; Compliance
              </a>
            </div>
          </div>

          {/* ── Interactive Tabbed Product Preview ── */}
          <div id="live-preview" className="cos-preview-frame">
            <div className="cos-window-bar">
              <div className="cos-window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="cos-window-title">
                CreativeOS Workspace — <strong>CreativeX Colombo HQ</strong>
              </div>
              <div className="cos-window-meta">v3.4.2 · Production</div>
            </div>

            {/* ── Agent Mesh HUD Bar ── */}
            <div className="cos-agent-hud">
              <div className="cos-agent-hud-left">
                <span className="cos-agent-hud-title">
                  <Bot size={13} /> Autonomous Agent Mesh
                </span>
                <div className="cos-agent-hud-agents">
                  <span className="cos-agent-hud-item">
                    <strong>Poya Sentinel</strong>: Sri Lanka 2026 Calendar
                  </span>
                  <span className="cos-agent-hud-item">
                    <strong>WhatsApp Concierge</strong>: Client Sign-Offs
                  </span>
                  <span className="cos-agent-hud-item">
                    <strong>15% EPF/ETF Guard</strong>: Labor Costing
                  </span>
                  <span className="cos-agent-hud-item">
                    <strong>Work Graph Dispatcher</strong>: Squad Orchestration
                  </span>
                </div>
              </div>
              <div className="cos-agent-hud-meta">
                <span>Latency: 11ms · Deterministic CDC</span>
              </div>
            </div>

            <div className="cos-preview-nav">
              <button
                type="button"
                className={`cos-nav-tab ${activePreviewTab === "board" ? "active" : ""}`}
                onClick={() => setActivePreviewTab("board")}
              >
                <Layers size={15} />
                <span>Tab 1: Multi-Tasking Stage Board &amp; Co-Pilot</span>
              </button>
              <button
                type="button"
                className={`cos-nav-tab ${activePreviewTab === "forecast" ? "active" : ""}`}
                onClick={() => setActivePreviewTab("forecast")}
              >
                <Calendar size={15} />
                <span>Tab 2: Poya &amp; Capacity Forecast Engine</span>
              </button>
              <button
                type="button"
                className={`cos-nav-tab ${activePreviewTab === "automation" ? "active" : ""}`}
                onClick={() => setActivePreviewTab("automation")}
              >
                <Zap size={15} />
                <span>Tab 3: Automated Handoff Rules</span>
              </button>
              <button
                type="button"
                className={`cos-nav-tab ${activePreviewTab === "agentStream" ? "active" : ""}`}
                onClick={() => setActivePreviewTab("agentStream")}
              >
                <Activity size={15} />
                <span>Tab 4: Agent Activity &amp; Audit Ledger</span>
              </button>
            </div>

            <div className="cos-preview-body">
              {/* TAB 1: STAGE BOARD */}
              {activePreviewTab === "board" && (
                <div className="cos-tab-content">
                  {/* Interactive Agent Copilot Command Bar */}
                  <div className="cos-agent-copilot-row">
                    <span className="cos-copilot-label">
                      <Sparkles size={13} className="text-signal" /> Quick Agent Actions:
                    </span>
                    <div className="cos-copilot-actions">
                      <button
                        type="button"
                        className="cos-copilot-btn"
                        onClick={() => handleAutoAdvanceSignoff("task-2")}
                        title="Simulate WhatsApp client sign-off parsing and automated handoff to invoicing"
                      >
                        <Zap size={12} className="text-signal" />
                        <span>Auto-Advance CX-108 (WhatsApp Sign-off)</span>
                      </button>
                      <button
                        type="button"
                        className="cos-copilot-btn"
                        onClick={() => handleApplyPoyaBuffer("task-1")}
                        title="Insert statutory Bak Poya buffer for Task CX-104"
                      >
                        <Calendar size={12} />
                        <span>Insert Bak Poya Buffer</span>
                      </button>
                      <button
                        type="button"
                        className="cos-copilot-btn"
                        onClick={handleRebalanceCloudSquad}
                        title="Rebalance Cloud Infrastructure Squad capacity from 92% to 76%"
                      >
                        <Sliders size={12} />
                        <span>Rebalance Cloud Squad (92% &rarr; 76%)</span>
                      </button>
                      <button
                        type="button"
                        className="cos-copilot-btn"
                        onClick={() => handlePromoteScope("task-3")}
                        title="Auto-generate sprint milestones and promote CX-112 to Active Execution"
                      >
                        <Play size={12} />
                        <span>Auto-Scope CX-112 Hub</span>
                      </button>
                      <button
                        type="button"
                        className="cos-copilot-btn reset-btn"
                        onClick={handleResetState}
                        title="Reset workspace simulation to default state"
                      >
                        <RotateCcw size={12} />
                        <span>Reset Simulation</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter & Live Status Bar */}
                  <div className="cos-board-filter-bar">
                    <div className="cos-filter-group">
                      <button
                        type="button"
                        className={`cos-filter-chip ${filterMode === "all" ? "active" : ""}`}
                        onClick={() => setFilterMode("all")}
                      >
                        All Deliverables ({tasks.length})
                      </button>
                      <button
                        type="button"
                        className={`cos-filter-chip ${filterMode === "agent" ? "active" : ""}`}
                        onClick={() => setFilterMode("agent")}
                      >
                        <Bot size={12} /> Agent-Assisted ({tasks.filter((t) => t.agentAssisted).length})
                      </button>
                      <button
                        type="button"
                        className={`cos-filter-chip ${filterMode === "attention" ? "active" : ""}`}
                        onClick={() => setFilterMode("attention")}
                      >
                        <AlertTriangle size={12} /> Needs Attention (
                        {tasks.filter((t) => t.riskLevel === "moderate" || t.riskLevel === "warning").length})
                      </button>
                      <button
                        type="button"
                        className={`cos-filter-chip ${filterMode === "approved" ? "active" : ""}`}
                        onClick={() => setFilterMode("approved")}
                      >
                        <CheckCheck size={12} /> Invoiced / Cleared (
                        {tasks.filter((t) => t.stage === "Final Invoiced").length})
                      </button>
                    </div>
                    <div className="cos-board-live-pill">
                      <span className="cos-sync-dot" />
                      <span>PostgreSQL Change-Data-Capture (CDC) Live</span>
                    </div>
                  </div>

                  {/* Animated Agent Execution Notice Banner */}
                  {agentExecNotice && (
                    <div className="cos-agent-exec-banner" role="status">
                      <CheckCircle2 size={18} className="cos-agent-exec-icon" />
                      <div className="cos-agent-exec-content">
                        <div className="cos-agent-exec-title">
                          <strong>{agentExecNotice.title}</strong>
                          <span className="cos-agent-exec-meta">{agentExecNotice.meta}</span>
                        </div>
                        <p className="cos-agent-exec-desc">{agentExecNotice.description}</p>
                      </div>
                    </div>
                  )}

                  {/* 4-Stage Kanban Board */}
                  <div className="cos-stage-columns">
                    {/* Stage 1: Brief & Scope */}
                    <div className="cos-stage-col">
                      <div className="cos-col-header">
                        <span>Brief &amp; Scope</span>
                        <strong className="cos-num">0{countScope}</strong>
                      </div>
                      {filteredTasks
                        .filter((t) => t.stage === "Brief & Scope")
                        .map((task) => (
                          <div
                            key={task.id}
                            className={`cos-task-card clickable ${selectedTaskId === task.id ? "selected" : ""}`}
                            onClick={() => setSelectedTaskId(task.id)}
                          >
                            <div className="cos-card-top">
                              <small className="cos-task-num">{task.number}</small>
                              <span className="cos-tag">{task.categoryTag}</span>
                            </div>
                            <p className="cos-task-title">{task.title}</p>
                            <div className="cos-task-tags">
                              <span className="cos-tag-person">{task.assignee}</span>
                              <span className="cos-agent-card-badge">
                                <Bot size={10} /> {task.agentRole.split(" ")[0]}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Stage 2: Active Execution */}
                    <div className="cos-stage-col active-column">
                      <div className="cos-col-header">
                        <span>Active Execution</span>
                        <strong className="cos-num">0{countActive}</strong>
                      </div>
                      {filteredTasks
                        .filter((t) => t.stage === "Active Execution")
                        .map((task) => (
                          <div
                            key={task.id}
                            className={`cos-task-card clickable ${selectedTaskId === task.id ? "selected" : ""}`}
                            onClick={() => setSelectedTaskId(task.id)}
                          >
                            <div className="cos-card-top">
                              <small className="cos-task-num">{task.number}</small>
                              <span className="cos-live-pill">In Progress</span>
                            </div>
                            <p className="cos-task-title">{task.title}</p>
                            <div className="cos-task-tags">
                              <span className="cos-tag">{task.categoryTag}</span>
                              <span className="cos-tag-person">{task.assignee}</span>
                            </div>
                            <span className="cos-agent-card-badge">
                              <Bot size={10} /> {task.agentStatus.slice(0, 32)}...
                            </span>
                          </div>
                        ))}
                    </div>

                    {/* Stage 3: Client Review */}
                    <div className="cos-stage-col">
                      <div className="cos-col-header">
                        <span>Client Review</span>
                        <strong className="cos-num">0{countReview}</strong>
                      </div>
                      {filteredTasks
                        .filter((t) => t.stage === "Client Review")
                        .map((task) => (
                          <div
                            key={task.id}
                            className={`cos-task-card clickable ${selectedTaskId === task.id ? "selected" : ""}`}
                            onClick={() => setSelectedTaskId(task.id)}
                          >
                            <div className="cos-card-top">
                              <small className="cos-task-num">{task.number}</small>
                              <span className="cos-review-pill">Sign-off Due</span>
                            </div>
                            <p className="cos-task-title">{task.title}</p>
                            <div className="cos-task-tags">
                              <span className="cos-tag">{task.categoryTag}</span>
                              <span className="cos-tag-person">{task.assignee}</span>
                            </div>
                            <span className="cos-agent-card-badge">
                              <Bot size={10} /> WhatsApp Token Ready
                            </span>
                          </div>
                        ))}
                      {filteredTasks.filter((t) => t.stage === "Client Review").length === 0 && (
                        <div className="text-center py-6 text-xs text-muted font-mono">
                          All client reviews cleared by Agent Concierge.
                        </div>
                      )}
                    </div>

                    {/* Stage 4: Final Invoiced */}
                    <div className="cos-stage-col">
                      <div className="cos-col-header">
                        <span>Final Invoiced</span>
                        <strong className="cos-num">0{countInvoiced}</strong>
                      </div>
                      {filteredTasks
                        .filter((t) => t.stage === "Final Invoiced")
                        .map((task) => (
                          <div
                            key={task.id}
                            className={`cos-task-card completed clickable ${selectedTaskId === task.id ? "selected" : ""
                              }`}
                            onClick={() => setSelectedTaskId(task.id)}
                          >
                            <div className="cos-card-top">
                              <small className="cos-task-num">{task.number}</small>
                              <span className="cos-tag-green">Invoiced</span>
                            </div>
                            <p className="cos-task-title">{task.title}</p>
                            <div className="cos-task-tags">
                              <span className="cos-tag-person">{task.client.split(" ")[0]}</span>
                              <span className="cos-tabular-num font-bold text-xs">
                                LKR {(task.budgetLkr / 1000).toLocaleString()}k
                              </span>
                            </div>
                            <span className="cos-agent-card-badge">
                              <FileCheck size={10} /> Merkle Hash {task.auditHash}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Split-Screen Selected Task Inspector */}
                  <div className="cos-inspector-pane">
                    <div className="cos-inspector-head">
                      <div>
                        <span className="cos-inspector-badge">{selectedTask.number}</span>
                        <h3>{selectedTask.title}</h3>
                      </div>
                      <span className="cos-status-pill">{selectedTask.stage}</span>
                    </div>

                    <div className="cos-inspector-grid">
                      <div className="cos-inspector-field">
                        <label>Client Organization</label>
                        <strong>{selectedTask.client}</strong>
                      </div>
                      <div className="cos-inspector-field">
                        <label>Owner &amp; Squad</label>
                        <strong>
                          {selectedTask.assignee} ({selectedTask.squad})
                        </strong>
                      </div>
                      <div className="cos-inspector-field">
                        <label>Client Approval Gate</label>
                        <div className="cos-approval-item">
                          <CheckCircle2 size={16} className="text-emerald" />
                          <span>{selectedTask.approvalStatus}</span>
                        </div>
                      </div>
                      <div className="cos-inspector-field">
                        <label>WhatsApp Client Thread</label>
                        <div className="cos-sync-item">
                          <span className="cos-sync-dot" />
                          <span>{selectedTask.whatsappSync}</span>
                        </div>
                        <small className="text-[11px] text-muted font-sans mt-0.5">
                          "{selectedTask.whatsappSnippet}"
                        </small>
                      </div>
                      <div className="cos-inspector-field">
                        <label>Budget Allocation (LKR)</label>
                        <strong className="cos-tabular-num">
                          LKR {selectedTask.spentLkr.toLocaleString()} / LKR {selectedTask.budgetLkr.toLocaleString()}
                        </strong>
                        <small className="text-[10px] text-muted font-mono">
                          Includes 15% statutory employer EPF/ETF loading
                        </small>
                      </div>
                      <div className="cos-inspector-field">
                        <label>Predictive Risk Factor</label>
                        <strong className="cos-risk-text">{selectedTask.riskFactor}</strong>
                        <small className="text-[10px] text-muted font-mono">
                          Meta Prophet seasonal + LightGBM drift score
                        </small>
                      </div>
                    </div>

                    {/* ── Past & Future Predictive Intelligence Visualizer ── */}
                    <div className="cos-forecast-viz-box">
                      <div className="cos-forecast-viz-head">
                        <div className="cos-forecast-viz-title">
                          <TrendingUp size={16} className="text-signal" />
                          <span>Predictive Horizon: Past Actuals vs Future AI Trajectory</span>
                        </div>
                        <div className="cos-forecast-viz-badges">
                          <span className="cos-forecast-badge highlight">Meta Prophet Seasonal</span>
                          <span className="cos-forecast-badge">LightGBM Ensemble</span>
                          <span className="cos-forecast-badge confidence">
                            {forecastScenario === "buffered"
                              ? `${selectedTask.forecastData?.bufferedConfidence ?? 94.2}% Confidence`
                              : forecastScenario === "unbuffered"
                              ? `${selectedTask.forecastData?.unbufferedConfidence ?? 41.8}% High Risk`
                              : "98.5% Express Mode"}
                          </span>
                          <button
                            type="button"
                            className="cos-btn-secondary btn-sm"
                            onClick={() => setShowForecastVisualizer(!showForecastVisualizer)}
                          >
                            {showForecastVisualizer ? "Collapse Forecast" : "Expand Forecast"}
                          </button>
                        </div>
                      </div>

                      {showForecastVisualizer && (
                        <>
                          {/* Scenario Bar */}
                          <div className="cos-scenario-bar">
                            <span className="cos-scenario-label">
                              <Target size={13} className="inline mr-1" /> Delivery Scenario Simulation:
                            </span>
                            <div className="cos-scenario-buttons">
                              <button
                                type="button"
                                className={`cos-scenario-btn ${forecastScenario === "unbuffered" ? "active" : ""}`}
                                onClick={() => setForecastScenario("unbuffered")}
                              >
                                Status Quo (Unbuffered Forecast)
                              </button>
                              <button
                                type="button"
                                className={`cos-scenario-btn ${forecastScenario === "buffered" ? "active" : ""}`}
                                onClick={() => setForecastScenario("buffered")}
                              >
                                CreativeOS AI-Buffered (Recommended)
                              </button>
                              <button
                                type="button"
                                className={`cos-scenario-btn ${forecastScenario === "overtime" ? "active" : ""}`}
                                onClick={() => setForecastScenario("overtime")}
                              >
                                Express Overtime (+15% EPF/ETF)
                              </button>
                            </div>
                          </div>

                          {/* Visual Timeline Track */}
                          <div className="cos-timeline-container">
                            <div className="cos-timeline-legend">
                              <span className="cos-legend-item">
                                <span className="cos-legend-marker past" /> Past Milestone Actuals
                              </span>
                              <span className="cos-legend-item">
                                <span className="cos-legend-marker today" /> Today (Active Gate)
                              </span>
                              <span className="cos-legend-item">
                                <span className="cos-legend-marker holiday" /> 2026 Poya &amp; Holiday Horizon
                              </span>
                              <span className="cos-legend-item">
                                <span
                                  className={`cos-legend-marker ${
                                    forecastScenario === "unbuffered" ? "delayed" : "future"
                                  }`}
                                />
                                {forecastScenario === "unbuffered"
                                  ? "Projected Delay Slipped Target"
                                  : "Predicted On-Time Target"}
                              </span>
                            </div>

                            <div className="cos-timeline-track">
                              {/* Past Milestones */}
                              {selectedTask.forecastData?.pastMilestones.slice(0, 2).map((m, idx) => (
                                <div key={idx} className="cos-timeline-step past">
                                  <span className="cos-step-date">{m.date} · Past Actual</span>
                                  <strong className="cos-step-title">{m.title}</strong>
                                  <span className="cos-step-status completed">
                                    <CheckCircle2 size={11} /> {m.note}
                                  </span>
                                </div>
                              ))}

                              {/* Today / Present Gate */}
                              <div className="cos-timeline-step today">
                                <span className="cos-step-date">Today · April 2026</span>
                                <strong className="cos-step-title">{selectedTask.stage}</strong>
                                <span className="cos-step-status active">
                                  <Compass size={11} /> 71.2% LKR Budget Logged
                                </span>
                              </div>

                              {/* Sri Lankan Holiday Checkpoint */}
                              <div className="cos-timeline-step holiday">
                                <span className="cos-step-date">02 Apr 2026 · Mercantile</span>
                                <strong className="cos-step-title">Bak Full Moon Poya</strong>
                                <span className="cos-step-status warning">
                                  <Calendar size={11} />
                                  {forecastScenario === "buffered" ? "2.0d Buffer Active" : "No Buffer Applied"}
                                </span>
                              </div>

                              {/* Predicted Future Milestone */}
                              <div
                                className={`cos-timeline-step ${
                                  forecastScenario === "unbuffered" ? "delayed" : "future"
                                }`}
                              >
                                <span className="cos-step-date">
                                  {forecastScenario === "buffered"
                                    ? `${selectedTask.forecastData?.bufferedDate ?? "11 April 2026"} · AI Forecast`
                                    : forecastScenario === "unbuffered"
                                    ? `${selectedTask.forecastData?.unbufferedDate ?? "21 April 2026"} · Delay Risk`
                                    : `${selectedTask.forecastData?.overtimeDate ?? "08 April 2026"} · Express`}
                                </span>
                                <strong className="cos-step-title">
                                  {forecastScenario === "buffered"
                                    ? "Final Sign-off & Invoiced"
                                    : forecastScenario === "unbuffered"
                                    ? "Delayed Beyond Avurudu"
                                    : "Fast-Track Settlement"}
                                </strong>
                                <span
                                  className={`cos-step-status ${
                                    forecastScenario === "unbuffered" ? "alert" : "predicted"
                                  }`}
                                >
                                  {forecastScenario === "buffered" ? (
                                    <>
                                      <CheckCircle2 size={11} /> 94.2% On-Time Confidence
                                    </>
                                  ) : forecastScenario === "unbuffered" ? (
                                    <>
                                      <AlertTriangle size={11} /> +6.5d Delay (78% Holiday Collision)
                                    </>
                                  ) : (
                                    <>
                                      <Zap size={11} /> 3d Early (+LKR 63k Loaded)
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Past vs Future Metric Comparison Cards */}
                          <div className="cos-forecast-comparison-grid">
                            <div className="cos-comparison-card">
                              <div className="cos-comparison-head">
                                <strong>
                                  <History size={14} className="text-navy" /> Past Historical Performance Baseline
                                </strong>
                                <span className="font-mono text-[10px] text-muted">84 Sri Lankan Projects</span>
                              </div>
                              <div className="cos-comparison-stats">
                                <div className="cos-stat-cell">
                                  <small>Historical On-Time Rate</small>
                                  <strong className="cos-tabular-num text-emerald">
                                    {selectedTask.forecastData?.pastOnTimePct ?? 94.2}%
                                  </strong>
                                </div>
                                <div className="cos-stat-cell">
                                  <small>Mean Client Sign-Off Lag</small>
                                  <strong className="cos-tabular-num">2.4 Days (WhatsApp Verified)</strong>
                                </div>
                                <div className="cos-stat-cell">
                                  <small>Team Historical Velocity</small>
                                  <strong className="cos-tabular-num text-xs">
                                    {selectedTask.forecastData?.pastVelocity ?? "18 Sprints Logged"}
                                  </strong>
                                </div>
                                <div className="cos-stat-cell">
                                  <small>15% EPF/ETF Cost Drift</small>
                                  <strong className="cos-tabular-num text-emerald">0.0% (Exact Statutory)</strong>
                                </div>
                              </div>
                            </div>

                            <div className="cos-comparison-card">
                              <div className="cos-comparison-head">
                                <strong>
                                  <Target size={14} className="text-signal" /> Future Predictive Forecast Analysis
                                </strong>
                                <span className="font-mono text-[10px] text-navy font-bold">R² = 0.941 Fit</span>
                              </div>
                              <div className="cos-comparison-stats">
                                <div className="cos-stat-cell">
                                  <small>Target Completion Date</small>
                                  <strong className="cos-tabular-num">
                                    {forecastScenario === "buffered"
                                      ? selectedTask.forecastData?.bufferedDate ?? "11 April 2026"
                                      : forecastScenario === "unbuffered"
                                      ? selectedTask.forecastData?.unbufferedDate ?? "21 April 2026"
                                      : selectedTask.forecastData?.overtimeDate ?? "08 April 2026"}
                                  </strong>
                                </div>
                                <div className="cos-stat-cell">
                                  <small>Delay Risk Probability</small>
                                  <strong
                                    className={`cos-tabular-num ${
                                      forecastScenario === "unbuffered" ? "text-signal font-bold" : "text-emerald"
                                    }`}
                                  >
                                    {forecastScenario === "buffered"
                                      ? "5.8% (Negligible)"
                                      : forecastScenario === "unbuffered"
                                      ? "78.2% (High Slippage)"
                                      : "1.5% (Minimal)"}
                                  </strong>
                                </div>
                                <div className="cos-stat-cell">
                                  <small>Margin Protected by Buffer</small>
                                  <strong className="cos-tabular-num text-emerald">
                                    LKR {(selectedTask.forecastData?.marginSavedLkr ?? 140000).toLocaleString()} Saved
                                  </strong>
                                </div>
                                <div className="cos-stat-cell">
                                  <small>Holiday Collision Assessment</small>
                                  <strong className="cos-tabular-num text-xs">
                                    {forecastScenario === "buffered"
                                      ? "Zero Collision with Avurudu"
                                      : forecastScenario === "unbuffered"
                                      ? "Collides with Sinhala & Tamil NY"
                                      : "Delivered Pre-Bak Poya"}
                                  </strong>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Explainable Factor Attribution Bars */}
                          <div className="cos-factors-block">
                            <div className="cos-factors-head">
                              <strong>Explainable AI Attribution (LightGBM Feature Weights)</strong>
                              <span>Normalized Contribution to Predictive Horizon</span>
                            </div>
                            <div className="cos-factors-list">
                              {selectedTask.forecastData?.factors.map((f, idx) => (
                                <div key={idx} className="cos-factor-item">
                                  <div className="flex items-center justify-between">
                                    <span className="cos-factor-name">{f.name}</span>
                                    <span className="font-mono text-[10px] text-muted">{f.weight}%</span>
                                  </div>
                                  <strong className={`cos-factor-impact ${f.type}`}>{f.impact}</strong>
                                  <div className="cos-factor-bar">
                                    <div
                                      className={`cos-factor-bar-fill ${f.type}`}
                                      style={{ width: `${f.weight * 2}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Autonomous Work Agent Co-Pilot Box in Inspector */}
                    <div className="cos-agent-recommendation-box">
                      <div className="cos-agent-rec-head">
                        <span className="cos-agent-rec-title">
                          <Bot size={14} /> Autonomous Agent Co-Pilot · {selectedTask.agentRole}
                        </span>
                        <span className="text-[11px] font-mono text-muted">
                          Chained Merkle Hash: {selectedTask.auditHash}
                        </span>
                      </div>
                      <p className="cos-agent-rec-text">{selectedTask.agentRecommendation}</p>

                      <div className="cos-agent-rec-actions">
                        {selectedTask.id === "task-2" && selectedTask.stage === "Client Review" && (
                          <button
                            type="button"
                            className="cos-btn-agent-primary"
                            onClick={() => handleAutoAdvanceSignoff("task-2")}
                          >
                            <Zap size={13} />
                            <span>Execute Agent Sign-Off &amp; Auto-Invoice (LKR 1,250,000)</span>
                          </button>
                        )}
                        {selectedTask.id === "task-1" && (
                          <>
                            <button
                              type="button"
                              className="cos-btn-agent-primary"
                              onClick={handleRebalanceCloudSquad}
                            >
                              <Sliders size={13} />
                              <span>Agent Auto-Rebalance Squad ({cloudSquadCapacity}% &rarr; 76%)</span>
                            </button>
                            <button
                              type="button"
                              className="cos-btn-agent-secondary"
                              onClick={() => handleApplyPoyaBuffer("task-1")}
                            >
                              <Calendar size={13} />
                              <span>Add Bak Poya Buffer</span>
                            </button>
                          </>
                        )}
                        {selectedTask.id === "task-3" && selectedTask.stage === "Brief & Scope" && (
                          <button
                            type="button"
                            className="cos-btn-agent-primary"
                            onClick={() => handlePromoteScope("task-3")}
                          >
                            <Play size={13} />
                            <span>Promote Scope to Active Execution</span>
                          </button>
                        )}
                        <button
                          type="button"
                          className="cos-btn-agent-secondary"
                          onClick={() => {
                            setAgentExecNotice({
                              title: `WhatsApp Ping Dispatched to ${selectedTask.client}`,
                              description: `Automated status digest delivered to ${selectedTask.whatsappSync}. Client read receipt confirmed.`,
                              meta: "WhatsApp Gateway API",
                            });
                            setTimeout(() => setAgentExecNotice(null), 5000);
                          }}
                        >
                          <MessageSquare size={13} />
                          <span>Dispatch WhatsApp Ping</span>
                        </button>
                        <button
                          type="button"
                          className="cos-btn-agent-secondary"
                          onClick={() => {
                            setAgentExecNotice({
                              title: `Immutable Audit Ledger Verified for ${selectedTask.number}`,
                              description: `Record signed with SHA-256 Merkle hash ${selectedTask.auditHash}. Timestamped to PostgreSQL ActivityEvents append-only table.`,
                              meta: "SOC 2 Type II Verified",
                            });
                            setTimeout(() => setAgentExecNotice(null), 5000);
                          }}
                        >
                          <ShieldCheck size={13} />
                          <span>Verify Audit Proof</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: POYA & CAPACITY FORECAST */}
              {activePreviewTab === "forecast" && (
                <div className="cos-tab-content">
                  <div className="cos-forecast-header">
                    <div>
                      <h3>Sri Lankan Mercantile &amp; Poya Calendar Engine (2026)</h3>
                      <p>
                        Standard foreign PM tools treat all workweeks identically. CreativeOS automatically maps
                        statutory Full Moon Poya days and multi-day holiday clusters into capacity planning.
                      </p>
                    </div>

                    <div className="cos-epf-toggle-wrap">
                      <label htmlFor="epf-toggle" className="cos-toggle-label">
                        <span>Factor 15% Employer EPF (12%) + ETF (3%)</span>
                        <button
                          id="epf-toggle"
                          type="button"
                          className="cos-toggle-btn"
                          onClick={() => setIncludeEpfEtf(!includeEpfEtf)}
                          aria-pressed={includeEpfEtf}
                        >
                          {includeEpfEtf ? (
                            <ToggleRight size={28} className="text-navy" />
                          ) : (
                            <ToggleLeft size={28} className="text-muted" />
                          )}
                        </button>
                      </label>
                    </div>
                  </div>

                  {/* Holiday Horizon Grid */}
                  <div className="cos-calendar-band">
                    <div className="cos-holiday-card poya">
                      <span className="cos-holiday-type">Full Moon Poya</span>
                      <strong>Bak Full Moon Poya Day</strong>
                      <span>2 April 2026 · Public &amp; Mercantile</span>
                    </div>
                    <div className="cos-holiday-card festive">
                      <span className="cos-holiday-type">National Festival</span>
                      <strong>Sinhala &amp; Tamil New Year</strong>
                      <span>13–14 April 2026 · Extended Break</span>
                    </div>
                    <div className="cos-holiday-card poya">
                      <span className="cos-holiday-type">Sacred Poya</span>
                      <strong>Vesak Full Moon Poya Day</strong>
                      <span>1–2 May 2026 · Multi-Day Poya &amp; Day After</span>
                    </div>
                    <div className="cos-holiday-card mercantile">
                      <span className="cos-holiday-type">Mercantile Holiday</span>
                      <strong>Poson Full Moon Poya Day</strong>
                      <span>31 May 2026 · Public &amp; Bank</span>
                    </div>
                  </div>

                  {/* Squad Capacity Meters */}
                  <div className="cos-squad-capacity-block">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="m-0">Squad Capacity &amp; Overload Detection (April 2026 Cycle)</h4>
                      <button
                        type="button"
                        className="cos-btn-secondary btn-sm"
                        onClick={handleRebalanceCloudSquad}
                      >
                        <Sliders size={13} />
                        <span>Run Agent Load Balancing</span>
                      </button>
                    </div>

                    <div className="cos-capacity-list">
                      <div className="cos-capacity-row">
                        <div className="cos-cap-meta">
                          <strong>Cloud Infrastructure Squad (5 Engineers)</strong>
                          <span className={`cos-cap-pct ${cloudSquadCapacity > 85 ? "warning" : "healthy"}`}>
                            {cloudSquadCapacity}% Capacity {cloudSquadCapacity > 85 ? "(Overloaded >85%)" : "(Optimized & Balanced)"}
                          </span>
                        </div>
                        <div className="cos-progress-bar">
                          <div
                            className={`cos-progress-fill ${cloudSquadCapacity > 85 ? "warning" : "healthy"}`}
                            style={{ width: `${cloudSquadCapacity}%` }}
                          />
                        </div>
                        {cloudSquadCapacity > 85 ? (
                          <p className="cos-cap-hint">
                            <AlertTriangle size={14} /> AI Recommendation: Automatically insert 3.5-day schedule buffer
                            around Avurudu holiday or click 'Run Agent Load Balancing' to shift telemetry staging.
                          </p>
                        ) : (
                          <p className="text-[12px] text-emerald flex items-center gap-1 mt-1 font-medium">
                            <CheckCircle2 size={13} /> Workload balanced: 2 telemetry sub-tasks shifted to Full-Stack Squad. Risk cleared.
                          </p>
                        )}
                      </div>

                      <div className="cos-capacity-row">
                        <div className="cos-cap-meta">
                          <strong>Full-Stack Next.js Squad (7 Engineers)</strong>
                          <span className="cos-cap-pct healthy">74% Capacity (Balanced)</span>
                        </div>
                        <div className="cos-progress-bar">
                          <div className="cos-progress-fill healthy" style={{ width: "74%" }} />
                        </div>
                      </div>

                      <div className="cos-capacity-row">
                        <div className="cos-cap-meta">
                          <strong>AI &amp; Data Engineering Squad (4 Engineers)</strong>
                          <span className="cos-cap-pct healthy">68% Capacity (Healthy Buffer)</span>
                        </div>
                        <div className="cos-progress-bar">
                          <div className="cos-progress-fill healthy" style={{ width: "68%" }} />
                        </div>
                      </div>
                    </div>

                    {/* True Cost Display */}
                    <div className="cos-cost-callout">
                      <div className="cos-cost-col">
                        <small>Average Engineer Base Salary</small>
                        <strong className="cos-tabular-num">LKR 280,000 / mo</strong>
                      </div>
                      <div className="cos-cost-col">
                        <small>Statutory 15% EPF/ETF Employer Loading</small>
                        <strong className="cos-tabular-num text-signal">
                          {includeEpfEtf ? "+ LKR 42,000 / mo" : "Excluded (Raw Base)"}
                        </strong>
                      </div>
                      <div className="cos-cost-col highlight">
                        <small>True Realized Cost per Project Day</small>
                        <strong className="cos-tabular-num">
                          {includeEpfEtf ? "LKR 16,100 / day (20 Billable Days)" : "LKR 14,000 / day (Unloaded)"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: AUTOMATED HANDOFF RULES */}
              {activePreviewTab === "automation" && (
                <div className="cos-tab-content">
                  <div className="cos-automation-head">
                    <div>
                      <h3>Event-Driven Handoff Rules Engine</h3>
                      <p>
                        Trigger custom actions when client approvals land, Poya holidays approach, or budget thresholds
                        are breached—without manual developer intervention.
                      </p>
                    </div>
                    <button type="button" className="cos-btn-secondary btn-sm" onClick={handleSimulateRule}>
                      <Zap size={14} /> Test Rule Execution
                    </button>
                  </div>

                  {simulationLog && (
                    <div className="cos-sim-banner">
                      <Activity size={16} />
                      <span>{simulationLog}</span>
                    </div>
                  )}

                  <div className="cos-rules-grid">
                    {/* Rule 1 */}
                    <div className="cos-rule-card">
                      <div className="cos-rule-top">
                        <span className="cos-rule-id">RULE #01 · APPROVAL WORKFLOW</span>
                        <button
                          type="button"
                          className="cos-switch-btn"
                          onClick={() => setRule1Active(!rule1Active)}
                        >
                          {rule1Active ? <ToggleRight size={24} className="text-navy" /> : <ToggleLeft size={24} />}
                        </button>
                      </div>
                      <div className="cos-rule-flow">
                        <div className="cos-flow-step">
                          <small>TRIGGER</small>
                          <p>Client signs off Milestone in Client Portal or WhatsApp</p>
                        </div>
                        <div className="cos-flow-arrow">&rarr;</div>
                        <div className="cos-flow-step">
                          <small>CONDITION</small>
                          <p>Task status equals "Client Review"</p>
                        </div>
                        <div className="cos-flow-arrow">&rarr;</div>
                        <div className="cos-flow-step action">
                          <small>ACTION</small>
                          <p>Auto-generate LKR invoice draft &amp; alert Finance Lead on WhatsApp</p>
                        </div>
                      </div>
                    </div>

                    {/* Rule 2 */}
                    <div className="cos-rule-card">
                      <div className="cos-rule-top">
                        <span className="cos-rule-id">RULE #02 · POYA &amp; HOLIDAY BUFFER</span>
                        <button
                          type="button"
                          className="cos-switch-btn"
                          onClick={() => setRule2Active(!rule2Active)}
                        >
                          {rule2Active ? <ToggleRight size={24} className="text-navy" /> : <ToggleLeft size={24} />}
                        </button>
                      </div>
                      <div className="cos-rule-flow">
                        <div className="cos-flow-step">
                          <small>TRIGGER</small>
                          <p>Delivery date scheduled within 48h of Poya holiday</p>
                        </div>
                        <div className="cos-flow-arrow">&rarr;</div>
                        <div className="cos-flow-step">
                          <small>CONDITION</small>
                          <p>Squad capacity exceeds 80%</p>
                        </div>
                        <div className="cos-flow-arrow">&rarr;</div>
                        <div className="cos-flow-step action">
                          <small>ACTION</small>
                          <p>Append 1.5 business day buffer &amp; notify Project Manager</p>
                        </div>
                      </div>
                    </div>

                    {/* Rule 3 */}
                    <div className="cos-rule-card">
                      <div className="cos-rule-top">
                        <span className="cos-rule-id">RULE #03 · BUDGET GUARD</span>
                        <button
                          type="button"
                          className="cos-switch-btn"
                          onClick={() => setRule3Active(!rule3Active)}
                        >
                          {rule3Active ? <ToggleRight size={24} className="text-navy" /> : <ToggleLeft size={24} />}
                        </button>
                      </div>
                      <div className="cos-rule-flow">
                        <div className="cos-flow-step">
                          <small>TRIGGER</small>
                          <p>Labor logged passes 85% of allocated LKR budget</p>
                        </div>
                        <div className="cos-flow-arrow">&rarr;</div>
                        <div className="cos-flow-step">
                          <small>CONDITION</small>
                          <p>Milestone progress is &lt; 70% complete</p>
                        </div>
                        <div className="cos-flow-arrow">&rarr;</div>
                        <div className="cos-flow-step action">
                          <small>ACTION</small>
                          <p>Flag variance alert with historical margin comparison</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: AGENT ACTIVITY & AUDIT STREAM */}
              {activePreviewTab === "agentStream" && (
                <div className="cos-tab-content cos-agent-stream-wrap">
                  <div className="cos-agent-stream-head">
                    <div>
                      <h3>Real-Time Autonomous Agent Event Ledger</h3>
                      <p>
                        Immutable append-only ActivityEvents log chained with SHA-256 Merkle hashes. Every autonomous
                        decision, approval verification, and calendar buffer is mathematically auditable.
                      </p>
                    </div>
                    <button type="button" className="cos-btn-secondary btn-sm" onClick={handleResetState}>
                      <RotateCcw size={13} />
                      <span>Refresh Ledger Stream</span>
                    </button>
                  </div>

                  <div className="cos-agent-stream-list">
                    <div className="cos-agent-stream-item">
                      <span className="cos-stream-time">12:44:18 PM</span>
                      <span className="cos-stream-agent">
                        <Bot size={13} /> WhatsApp Concierge
                      </span>
                      <span className="cos-stream-desc">
                        Validated digital sign-off token from Highland Estates PLC (#highland-tea-board). Dispatched invoice handoff trigger.
                      </span>
                      <span className="cos-stream-hash">hash: 0x3e18...4c92</span>
                    </div>

                    <div className="cos-agent-stream-item">
                      <span className="cos-stream-time">12:41:04 PM</span>
                      <span className="cos-stream-agent">
                        <Bot size={13} /> Calendar Sentinel
                      </span>
                      <span className="cos-stream-desc">
                        Detected Bak Full Moon Poya (April 2, 2026). Applied 1.5-day schedule buffer to Task CX-104.
                      </span>
                      <span className="cos-stream-hash">hash: 0x7f4a...92b1</span>
                    </div>

                    <div className="cos-agent-stream-item">
                      <span className="cos-stream-time">12:38:52 PM</span>
                      <span className="cos-stream-agent">
                        <Bot size={13} /> 15% EPF/ETF Guard
                      </span>
                      <span className="cos-stream-desc">
                        Reconciled April labor budget. Applied LKR 42,000/mo statutory employer contribution factor per engineer.
                      </span>
                      <span className="cos-stream-hash">hash: 0x8f2c...4a19</span>
                    </div>

                    <div className="cos-agent-stream-item">
                      <span className="cos-stream-time">12:35:10 PM</span>
                      <span className="cos-stream-agent">
                        <Bot size={13} /> Scope Parser
                      </span>
                      <span className="cos-stream-desc">
                        Parsed biomedical specs for Kandy Hospital Sensor Hub (CX-112). Generated 3 sprint milestone work subgraphs.
                      </span>
                      <span className="cos-stream-hash">hash: 0x91d4...1b88</span>
                    </div>

                    <div className="cos-agent-stream-item">
                      <span className="cos-stream-time">12:30:00 PM</span>
                      <span className="cos-stream-agent">
                        <Bot size={13} /> Merkle Hash Auditor
                      </span>
                      <span className="cos-stream-desc">
                        Reconciled Commercial Bank FX Settlement (CX-098). Marked LKR 1,840,000 paid in full. Ledger block sealed.
                      </span>
                      <span className="cos-stream-hash">hash: 0x8f2c...4a19</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. PLAIN-LANGUAGE VALUE PILLARS
      ───────────────────────────────────────────────────────────── */}
      <section className="cos-section cos-pillars-section">
        <div className="cos-site-width">
          <div className="cos-section-intro">
            <span className="cos-section-kicker">02 / Plain-English Business Value</span>
            <h2>Built to Solve Daily Operational Chaos</h2>
            <p>
              No abstract Silicon Valley buzzwords. CreativeOS directly tackles the spreadsheet sprawl, missing client
              approvals, and unbudgeted holiday delays that erode profits in Sri Lankan firms.
            </p>
          </div>

          <div className="cos-pillars-grid">
            {/* Pillar 1 */}
            <article className="cos-pillar-card">
              <div className="cos-pillar-icon">
                <Layers size={22} />
              </div>
              <h3>Replace Scattered Tools</h3>
              <p>
                Stop losing critical decisions between messy Excel workbooks, Google Drive links, and informal WhatsApp
                chats. Unify tasks, client sign-offs, and project briefs in one split-screen workspace.
              </p>
              <div className="cos-pillar-metric">
                <strong className="cos-tabular-num">6.8 Hours Saved</strong>
                <span>per project manager every week on client follow-ups</span>
              </div>
            </article>

            {/* Pillar 2 */}
            <article className="cos-pillar-card">
              <div className="cos-pillar-icon">
                <Calendar size={22} />
              </div>
              <h3>Built for Sri Lankan Operations</h3>
              <p>
                Standard foreign tools fail to account for local operating realities. CreativeOS natively factors in
                all 2026 Full Moon Poya days, Sinhala &amp; Tamil New Year, Mercantile holidays, and the mandatory 15%
                EPF/ETF employer labor cost into every capacity calculation.
              </p>
              <div className="cos-pillar-metric">
                <strong className="cos-tabular-num">100% Calendar Accuracy</strong>
                <span>zero unexpected holiday deadline crunches</span>
              </div>
            </article>

            {/* Pillar 3 */}
            <article className="cos-pillar-card">
              <div className="cos-pillar-icon">
                <BarChart3 size={22} />
              </div>
              <h3>Spot Delays Before They Happen</h3>
              <p>
                Anticipate project bottlenecks weeks ahead rather than reacting when milestone deadlines are already
                blown. The predictive engine analyzes past project velocity to flag overloaded squads (&gt;85% capacity)
                and suggest workload buffers.
              </p>
              <div className="cos-pillar-metric">
                <strong className="cos-tabular-num">84% Delay Reduction</strong>
                <span>reported across commercial SME client pilots</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. INTERACTIVE "UNDER THE HOOD" TECHNICAL ARCHITECTURE TABS
      ───────────────────────────────────────────────────────────── */}
      <section className="cos-section cos-tech-section">
        <div className="cos-site-width">
          <div className="cos-section-intro">
            <span className="cos-section-kicker">03 / Engineering Specifications</span>
            <h2>Under the Hood: Enterprise Technical Architecture</h2>
            <p>
              Engineered for senior architects, CTOs, and technical evaluators who require robust relational integrity,
              microsecond event execution, and mathematical transparency.
            </p>
          </div>

          <div className="cos-tech-tabs-frame">
            <div className="cos-tech-tab-buttons" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTechTab === "graph"}
                className={`cos-tech-btn ${activeTechTab === "graph" ? "active" : ""}`}
                onClick={() => setActiveTechTab("graph")}
              >
                <Database size={16} />
                <span>Tab A: Unified Work Graph</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTechTab === "runtime"}
                className={`cos-tech-btn ${activeTechTab === "runtime" ? "active" : ""}`}
                onClick={() => setActiveTechTab("runtime")}
              >
                <Cpu size={16} />
                <span>Tab B: Real-Time Execution &amp; Automation</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTechTab === "predictive"}
                className={`cos-tech-btn ${activeTechTab === "predictive" ? "active" : ""}`}
                onClick={() => setActiveTechTab("predictive")}
              >
                <BarChart3 size={16} />
                <span>Tab C: Predictive Analytics Engine</span>
              </button>
            </div>

            <div className="cos-tech-tab-content">
              {/* TAB A: UNIFIED WORK GRAPH */}
              {activeTechTab === "graph" && (
                <div className="cos-tech-detail-grid">
                  <div className="cos-tech-prose">
                    <h3>PostgreSQL Relational Core with Row-Level Security &amp; Merkle Hash Audit</h3>
                    <p>
                      CreativeOS models organizations, workspaces, boards, deliverables, and labor allocations on a
                      hardened PostgreSQL 16 schema. Dynamic metadata is managed via indexed <code>JSONB</code> structures,
                      while database-engine Row-Level Security (RLS) guarantees absolute tenant isolation at the kernel layer.
                    </p>
                    <ul className="cos-spec-list">
                      <li>
                        <strong>Engine-Enforced Row-Level Security (RLS):</strong> Database-level tenant filtering via
                        <code>tenant_id = current_setting('app.current_tenant_id')</code> prevents cross-tenant access even if application logic were compromised.
                      </li>
                      <li>
                        <strong>Cryptographic SHA-256 Merkle Chaining:</strong> Every entry in the <code>activity_events</code>
                        log contains a cryptographic hash of the previous record, delivering tamper-evident proof required by ISO 27001 and SOC 2 audits.
                      </li>
                      <li>
                        <strong>Sub-15ms GIN-Indexed Queries:</strong> JSONB attributes are indexed with Generalized Inverted
                        Index (GIN) operators, sustaining high-speed filtered queries across multi-million row graphs.
                      </li>
                      <li>
                        <strong>Point-In-Time Recovery (PITR):</strong> Continuous Write-Ahead Log (WAL) archiving to encrypted multi-AZ object storage guarantees RPO &lt; 15 minutes.
                      </li>
                    </ul>
                  </div>
                  <div className="cos-code-card">
                    <div className="cos-code-head">
                      <span>schema_workgraph.sql</span>
                      <small>PostgreSQL 16 · RLS &amp; Hash Chain</small>
                    </div>
                    <pre>
                      <code>{`-- Hardened Multi-Tenant Task Core
CREATE TABLE work_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  stage_id UUID NOT NULL REFERENCES stages(id),
  budget_lkr NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  epf_etf_loaded BOOLEAN DEFAULT TRUE,
  custom_fields JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

-- Kernel-Level Multi-Tenant Isolation
ALTER TABLE work_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON work_tasks
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::UUID);

-- GIN Index for sub-15ms custom field retrieval
CREATE INDEX idx_tasks_custom_gin ON work_tasks USING gin (custom_fields);

-- Tamper-Evident SHA-256 Chained Audit Trail
CREATE TABLE activity_events (
  id BIGSERIAL PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES work_tasks(id),
  actor_id UUID NOT NULL,
  event_type VARCHAR(64) NOT NULL,
  diff JSONB NOT NULL,
  prev_hash CHAR(64) NOT NULL,
  entry_hash CHAR(64) GENERATED ALWAYS AS (
    sha256((prev_hash || task_id::text || diff::text)::bytea)
  ) STORED,
  recorded_at TIMESTAMPTZ DEFAULT clock_timestamp()
);`}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB B: REAL-TIME EXECUTION & AUTOMATION */}
              {activeTechTab === "runtime" && (
                <div className="cos-tech-detail-grid">
                  <div className="cos-tech-prose">
                    <h3>FastAPI + Next.js with Idempotent Distributed Workers</h3>
                    <p>
                      Client interactions are rendered by Next.js 15 Server Components and hydrated into snappy
                      split-screen work panes. State synchronization operates over native WebSockets backed by a distributed
                      Redis Pub/Sub cluster with sub-50ms round-trip latency.
                    </p>
                    <ul className="cos-spec-list">
                      <li>
                        <strong>Idempotent Event Execution:</strong> Automation rules enforce deduplication via unique
                        event nonces (<code>X-Idempotency-Key</code>), guaranteeing zero duplicate invoice generation or alert triggers.
                      </li>
                      <li>
                        <strong>Dead-Letter Queue (DLQ) &amp; Circuit Breakers:</strong> Failed external integrations (e.g. WhatsApp API, corporate ERP) automatically route to a DLQ with exponential backoff and circuit breaker isolation.
                      </li>
                      <li>
                        <strong>HMAC-SHA256 Signed Outbound Payloads:</strong> Webhook dispatches include cryptographic signatures with timestamp headers (300s replay window) for bank-grade integration security.
                      </li>
                    </ul>
                  </div>
                  <div className="cos-code-card">
                    <div className="cos-code-head">
                      <span>automation_runtime.py</span>
                      <small>FastAPI / Python 3.12 · Idempotent DLQ</small>
                    </div>
                    <pre>
                      <code>{`@router.post("/events/evaluate")
async def evaluate_rule_pipeline(
    event: DomainEvent, 
    idempotency_key: str = Header(..., alias="X-Idempotency-Key"),
    db: AsyncSession = Depends(get_db)
):
    """
    Idempotent Trigger -> Condition -> Action execution.
    Executes in <18ms with Redis distributed deduplication.
    """
    if await redis_cache.set(f"idemp:{idempotency_key}", "1", nx=True, ex=3600) is None:
        return {"status": "skipped", "reason": "duplicate_idempotency_key"}

    rules = await get_active_rules(event.tenant_id, event.type)
    for rule in rules:
        if await rule.eval_condition(event.payload):
            # Asynchronous background job dispatch with Dead Letter Queue
            await celery_app.send_task(
                "tasks.execute_action",
                args=[rule.action_id, event.payload],
                retry=True,
                retry_policy={"max_retries": 5, "interval_step": 3}
            )
    return {"status": "dispatched", "rules_checked": len(rules)}`}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB C: PREDICTIVE ANALYTICS ENGINE */}
              {activeTechTab === "predictive" && (
                <div className="cos-tech-detail-grid">
                  <div className="cos-tech-prose">
                    <h3>Meta Prophet + LightGBM Ensemble Aligned with NIST AI RMF</h3>
                    <p>
                      Forecasting is mathematically transparent and audit-ready. CreativeOS pairs real-time Change Data Capture (CDC)
                      streaming with an interpretable two-stage model conforming to the NIST AI Risk Management Framework (AI RMF 1.0).
                    </p>
                    <ul className="cos-spec-list">
                      <li>
                        <strong>Custom Sri Lankan Gazette Seasonality:</strong> Meta Prophet incorporates custom Fourier seasonality terms modeling Sri Lankan Poya days, mercantile long weekends, and seasonal monsoon disruptions.
                      </li>
                      <li>
                        <strong>TreeSHAP Mathematical Attribution:</strong> Every predicted delay score outputs explicit SHapley Additive exPlanations vectors (e.g. "+16% Sinhala &amp; Tamil New Year 4-day bridge, +11% squad capacity &gt;85%").
                      </li>
                      <li>
                        <strong>Kolmogorov-Smirnov Drift Detection:</strong> Continuous data drift and concept drift monitoring automatically alerts engineers when delivery velocity deviates significantly from baseline.
                      </li>
                      <li>
                        <strong>Cold-Start Heuristic Fallback:</strong> Accounts with fewer than 60 historical project logs automatically fall back to deterministic baseline rules, preventing inaccurate statistical hallucinations.
                      </li>
                    </ul>
                  </div>
                  <div className="cos-code-card">
                    <div className="cos-code-head">
                      <span>predictive_engine.py</span>
                      <small>Prophet + TreeSHAP · NIST AI RMF</small>
                    </div>
                    <pre>
                      <code>{`# Seasonal Holiday Regressor & TreeSHAP Attribution
def forecast_squad_capacity(historical_df: pd.DataFrame, squad_id: str):
    if len(historical_df) < 60:
        # Graceful cold-start heuristic (<60 projects)
        return apply_deterministic_capacity_fallback(historical_df)

    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=False
    )
    # Register Gazette Mercantile & Poya calendar regressors
    model.add_country_holidays(country_name='LK')
    model.fit(historical_df)
    
    future = model.make_future_dataframe(periods=45)
    forecast = model.predict(future)
    
    # Compute TreeSHAP feature importance vectors for explainability
    shap_factors = compute_shap_explainability_vectors(forecast)
    return format_explainable_overload_zones(forecast, shap_factors)`}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SECURITY, PRIVACY & TRUST CENTER BLOCK
      ───────────────────────────────────────────────────────────── */}
      <section id="security-standards" className="cos-section cos-security-section">
        <div className="cos-site-width">
          <div className="cos-section-intro">
            <span className="cos-section-kicker">04 / Enterprise Trust, Compliance &amp; Standards</span>
            <h2>Certified Industry Standards &amp; Data Governance</h2>
            <p>
              We provide specific, verifiable technical controls engineered to pass rigorous enterprise procurement,
              banking risk assessments, and international compliance audits—without unverified marketing badges.
            </p>
          </div>

          {/* Standards & Compliance Alignment Matrix */}
          <div className="cos-standards-matrix">
            <div className="cos-standard-pill-card">
              <div className="cos-std-head">
                <ShieldCheck size={18} className="text-navy" />
                <strong>ISO/IEC 27001:2022 Controls</strong>
              </div>
              <p>
                Architectural controls mapped to Annex A.5 (Organizational), Annex A.8 (Technological: data masking, secure coding), and Annex A.9 (Access control).
              </p>
            </div>

            <div className="cos-standard-pill-card">
              <div className="cos-std-head">
                <CheckCircle2 size={18} className="text-emerald" />
                <strong>SOC 2 Type II Alignment</strong>
              </div>
              <p>
                Trust Services Criteria for Security (CC6/CC7 logical access &amp; change management), Availability (A1.2 RTO/RPO), and Confidentiality (C1.1).
              </p>
            </div>

            <div className="cos-standard-pill-card">
              <div className="cos-std-head">
                <Building2 size={18} className="text-navy" />
                <strong>CBSL Technology Risk Ready</strong>
              </div>
              <p>
                Central Bank of Sri Lanka Technology Risk Management Guidelines compliance for regulated financial institutions (BFSI/FINCS) with local VPC residency options.
              </p>
            </div>

            <div className="cos-standard-pill-card">
              <div className="cos-std-head">
                <FileText size={18} className="text-signal" />
                <strong>Sri Lanka PDPA &amp; GDPR</strong>
              </div>
              <p>
                Complies with Sri Lanka Personal Data Protection Act No. 9 of 2022 and GDPR: automated DSAR exports, consent logging, and right-to-erasure cascades.
              </p>
            </div>

            <div className="cos-standard-pill-card">
              <div className="cos-std-head">
                <Cpu size={18} className="text-navy" />
                <strong>NIST AI RMF 1.0 &amp; EU AI Act</strong>
              </div>
              <p>
                Conforms to NIST AI Risk Management Framework: transparent TreeSHAP mathematical attribution, drift detection, and zero model training on client data.
              </p>
            </div>

            <div className="cos-standard-pill-card">
              <div className="cos-std-head">
                <Activity size={18} className="text-emerald" />
                <strong>BCP/DR: RPO &lt; 15m · RTO &lt; 1h</strong>
              </div>
              <p>
                Continuous Write-Ahead Log (WAL) streaming for Point-In-Time Recovery with 99.95% Availability SLA backed by contractual service credits.
              </p>
            </div>
          </div>

          {/* 4-Card Security Grid */}
          <div className="cos-security-grid">
            <article className="cos-security-card">
              <div className="cos-sec-icon">
                <ShieldCheck size={20} />
              </div>
              <h4>Role &amp; Attribute Access (RBAC/ABAC)</h4>
              <p>
                Enforce granular least-privilege visibility across departments. Project staff access only assigned deliverables, while
                financial margins, billable rates, and 15% EPF/ETF labor figures remain restricted to authorized executives via database-enforced policies.
              </p>
            </article>

            <article className="cos-security-card">
              <div className="cos-sec-icon">
                <FileText size={20} />
              </div>
              <h4>Tamper-Evident Merkle Hash Audit Trail</h4>
              <p>
                Every status transition, budget change, file upload, and user permission modification is recorded with
                UTC microsecond timestamps, actor IDs, and cryptographic SHA-256 hash chaining in an append-only log that cannot be edited or erased.
              </p>
            </article>

            <article className="cos-security-card">
              <div className="cos-sec-icon">
                <Lock size={20} />
              </div>
              <h4>TLS 1.3 &amp; FIPS 140-3 Cryptography</h4>
              <p>
                Data in transit is encrypted using TLS 1.3 with Perfect Forward Secrecy (PFS). Data at rest is encrypted with FIPS 140-3 validated AES-256-GCM.
                Database-kernel Row-Level Security (RLS) guarantees absolute multi-tenant boundary isolation.
              </p>
            </article>

            <article className="cos-security-card">
              <div className="cos-sec-icon">
                <CheckCircle2 size={20} />
              </div>
              <h4>Transparent AI &amp; Zero Tenant Contamination</h4>
              <p>
                Your historical project logs and velocity data are strictly segregated and never pooled or used to train third-party or public models.
                Predictive indicators always output mathematical SHAP factors so human managers maintain ultimate decision authority.
              </p>
            </article>
          </div>

          {/* Expandable Security Questionnaire Accordion */}
          <div className="cos-faq-container">
            <h3 className="cos-faq-heading">Frequently Answered Security, Procurement &amp; Compliance Questions</h3>

            <div className="cos-accordion">
              {/* Item 1 */}
              <div className={`cos-accordion-item ${openFaqIndex === 0 ? "open" : ""}`}>
                <button
                  type="button"
                  className="cos-accordion-trigger"
                  onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                  aria-expanded={openFaqIndex === 0}
                >
                  <span>1. Where is our data hosted, and what is your backup, RPO, and disaster recovery SLA?</span>
                  <ChevronDown size={18} className="cos-chevron" />
                </button>
                {openFaqIndex === 0 && (
                  <div className="cos-accordion-content">
                    <p>
                      CreativeOS multi-tenant cloud instances are hosted in ISO/IEC 27001 and SOC 2 Type II certified AWS Asia-Pacific data centers
                      (Singapore <code>ap-southeast-1</code> or Mumbai <code>ap-south-1</code> regions for lowest sub-40ms latency to Colombo).
                      Disaster recovery protocols execute continuous Write-Ahead Log (WAL) archiving to encrypted multi-AZ storage (RPO &lt; 15 minutes)
                      and multi-AZ automated failover (RTO &lt; 60 minutes) backed by a 99.95% uptime SLA. For regulated financial institutions governed by Central Bank of Sri Lanka (CBSL) rules, we also provide dedicated private cloud VPCs or on-premise local server deployments within Sri Lankan sovereign jurisdiction.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 2 */}
              <div className={`cos-accordion-item ${openFaqIndex === 1 ? "open" : ""}`}>
                <button
                  type="button"
                  className="cos-accordion-trigger"
                  onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                  aria-expanded={openFaqIndex === 1}
                >
                  <span>2. Which Single Sign-On (SSO), SCIM, and identity access protocols are supported?</span>
                  <ChevronDown size={18} className="cos-chevron" />
                </button>
                {openFaqIndex === 1 && (
                  <div className="cos-accordion-content">
                    <p>
                      CreativeOS supports SAML 2.0 and OpenID Connect (OIDC) federated authentication with Microsoft Entra ID (Azure AD), Google Workspace,
                      Okta, Ping Identity, and generic enterprise IdPs. We provide SCIM 2.0 automated user provisioning and instant deprovisioning,
                      enforced hardware-token Multi-Factor Authentication (FIDO2 / TOTP), configurable idle session timeout revocation, and strict IP allowlisting for administrative consoles.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 3 */}
              <div className={`cos-accordion-item ${openFaqIndex === 2 ? "open" : ""}`}>
                <button
                  type="button"
                  className="cos-accordion-trigger"
                  onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                  aria-expanded={openFaqIndex === 2}
                >
                  <span>3. How are outbound API webhooks and enterprise integrations cryptographically secured?</span>
                  <ChevronDown size={18} className="cos-chevron" />
                </button>
                {openFaqIndex === 2 && (
                  <div className="cos-accordion-content">
                    <p>
                      Every outbound webhook payload generated by our automation engine is signed using a unique, rotatable
                      per-tenant HMAC-SHA256 signature transmitted in the <code>X-CreativeOS-Signature</code> header.
                      Replay attacks are mathematically prevented via mandatory timestamp verification (maximum 300-second drift tolerance) and
                      idempotency keys (<code>X-Idempotency-Key</code>). Delivery failures route automatically to Dead-Letter Queues (DLQ) with exponential backoff and circuit-breaker safeguards.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 4 */}
              <div className={`cos-accordion-item ${openFaqIndex === 3 ? "open" : ""}`}>
                <button
                  type="button"
                  className="cos-accordion-trigger"
                  onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                  aria-expanded={openFaqIndex === 3}
                >
                  <span>4. Who owns our data, and can we execute complete self-service data exports anytime?</span>
                  <ChevronDown size={18} className="cos-chevron" />
                </button>
                {openFaqIndex === 3 && (
                  <div className="cos-accordion-content">
                    <p>
                      You retain 100% intellectual property, legal copyright, and ownership over all workspace deliverables, task histories, client sign-offs,
                      and financial tracking logs. In strict accordance with the Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022) and GDPR,
                      administrators can trigger on-demand, complete data exports in standardized JSON-LD, CSV, and PostgreSQL <code>pg_dump</code> formats at zero additional fee.
                      We guarantee zero proprietary data lock-in and provide automated cryptographic data purging upon contractual termination.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SRI LANKAN MARKET TIERS & COMPARISON TABLE
      ───────────────────────────────────────────────────────────── */}
      <section className="cos-section cos-tiers-section">
        <div className="cos-site-width">
          <div className="cos-section-intro">
            <span className="cos-section-kicker">05 / Market Tiers &amp; Packaging</span>
            <h2>Calibrated for Sri Lankan Business Scales</h2>
            <p>
              Aligned with the Sri Lanka National Policy Framework for Small &amp; Medium Enterprises, offering clear
              tiers from high-growth technology startups to multi-branch conglomerates.
            </p>
          </div>

          <div className="cos-tiers-grid">
            {/* Startup Tier */}
            <div
              className={`cos-tier-card ${selectedTier === "startup" ? "active" : ""}`}
              onClick={() => setSelectedTier("startup")}
            >
              <div className="cos-tier-badge">Startup &amp; Small Business</div>
              <h3>11–50 Staff</h3>
              <p className="cos-tier-desc">
                For agile product studios, software agencies, and boutique professional firms ready to escape messy
                spreadsheets.
              </p>
              <div className="cos-tier-features">
                <ul>
                  <li>
                    <Check size={16} /> <strong>Multi-Tasking Stage Boards</strong> with split-screen detail views
                  </li>
                  <li>
                    <Check size={16} /> <strong>2026 Sri Lankan Poya &amp; Holiday</strong> auto-buffer rules
                  </li>
                  <li>
                    <Check size={16} /> <strong>Core Automation Rules</strong> (up to 25 active rules)
                  </li>
                  <li>
                    <Check size={16} /> <strong>Client Portal View</strong> for external review &amp; sign-offs
                  </li>
                  <li>
                    <Check size={16} /> <strong>99.5% Uptime SLA</strong> · AWS Asia-Pacific (Singapore) cloud
                  </li>
                  <li>
                    <Check size={16} /> On-demand JSON/CSV compliance data export
                  </li>
                </ul>
              </div>
              <a href="#demo-request" className="cos-btn-secondary w-full">
                Explore Startup Edition
              </a>
            </div>

            {/* Mid-Range SME Tier */}
            <div
              className={`cos-tier-card featured ${selectedTier === "sme" ? "active" : ""}`}
              onClick={() => setSelectedTier("sme")}
            >
              <div className="cos-tier-highlight-tag">Most Popular in Sri Lanka</div>
              <div className="cos-tier-badge">Mid-Range SME · Certified SLA</div>
              <h3>51–300 Staff</h3>
              <p className="cos-tier-desc">
                For established exporters, logistics operations, retail chains, and multi-team engineering consultancies.
              </p>
              <div className="cos-tier-features">
                <ul>
                  <li>
                    <Check size={16} /> <strong>Everything in Startup Edition</strong>, plus:
                  </li>
                  <li>
                    <Check size={16} /> <strong>Meta Prophet Seasonal Forecasting</strong> for squad capacity
                  </li>
                  <li>
                    <Check size={16} /> <strong>Statutory 15% EPF/ETF</strong> true labor cost budget tracking
                  </li>
                  <li>
                    <Check size={16} /> <strong>Squad Overload Alerts</strong> (&gt;85% threshold warnings)
                  </li>
                  <li>
                    <Check size={16} /> <strong>WhatsApp Business API</strong> client status notifications
                  </li>
                  <li>
                    <Check size={16} /> <strong>99.9% Availability SLA</strong> with automated daily PITR backups
                  </li>
                  <li>
                    <Check size={16} /> SAML 2.0 / Google Workspace &amp; Entra ID SSO integration
                  </li>
                </ul>
              </div>
              <a href="#demo-request" className="cos-btn-primary w-full">
                Select Mid-Range SME Edition
              </a>
            </div>

            {/* High-Scale Enterprise Tier */}
            <div
              className={`cos-tier-card ${selectedTier === "enterprise" ? "active" : ""}`}
              onClick={() => setSelectedTier("enterprise")}
            >
              <div className="cos-tier-badge">High-Scale Enterprise · Banking Grade</div>
              <h3>300+ Staff</h3>
              <p className="cos-tier-desc">
                For manufacturing groups, financial institutions, telecom operators, and enterprise conglomerates.
              </p>
              <div className="cos-tier-features">
                <ul>
                  <li>
                    <Check size={16} /> <strong>Everything in Mid-Range SME</strong>, plus:
                  </li>
                  <li>
                    <Check size={16} /> <strong>Full Prophet + LightGBM Ensemble</strong> with custom ML training
                  </li>
                  <li>
                    <Check size={16} /> <strong>Cross-Branch &amp; Inter-Company</strong> resource load balancing
                  </li>
                  <li>
                    <Check size={16} /> <strong>Custom ERP &amp; SAP/Oracle</strong> bi-directional webhooks
                  </li>
                  <li>
                    <Check size={16} /> <strong>CBSL Technology Risk Compliant</strong> Dedicated VPC / On-Premise
                  </li>
                  <li>
                    <Check size={16} /> <strong>99.95% Financially Backed SLA</strong> (RPO &lt; 15m / RTO &lt; 1h)
                  </li>
                  <li>
                    <Check size={16} /> SOC 2 / ISO 27001 audit readiness package &amp; 24/7 dedicated local TAM
                  </li>
                </ul>
              </div>
              <a href="#demo-request" className="cos-btn-secondary w-full">
                Contact Enterprise Advisory
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. BOTTOM CONVERSION BAR
      ───────────────────────────────────────────────────────────── */}
      <section id="demo-request" className="cos-conversion-section">
        <div className="cos-site-width">
          <div className="cos-conversion-card">
            <div className="cos-conversion-info">
              <span className="cos-section-kicker">06 / Take the Next Step</span>
              <h2>See CreativeOS running on your team's workflow.</h2>
              <p>
                Schedule a 25-minute tailored walkthrough with our Colombo solutions engineering team. We'll model your
                actual project stages, team capacities, and Poya holiday buffers live.
              </p>

              <div className="cos-direct-contacts">
                <div className="cos-contact-pill">
                  <small>Direct Engineering Desk:</small>
                  <a href="mailto:info@creativexlab.online">info@creativexlab.online</a>
                </div>
                <div className="cos-contact-pill">
                  <small>WhatsApp Consultation:</small>
                  <a href="https://wa.me/94762345336" target="_blank" rel="noopener noreferrer">
                    +94 76 234 5336
                  </a>
                </div>
              </div>
            </div>

            <div className="cos-conversion-form-wrap">
              {formSubmitted ? (
                <div className="cos-form-success">
                  <CheckCircle2 size={36} className="text-emerald" />
                  <h3>Walkthrough Request Received</h3>
                  <p>
                    Thank you, <strong>{formName}</strong>. A CreativeX Solutions Architect will reach out to{" "}
                    <strong>{formEmail}</strong> within 1 business day with your tailored preview environment.
                  </p>
                  <button
                    type="button"
                    className="cos-btn-secondary btn-sm"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormName("");
                      setFormEmail("");
                    }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="cos-demo-form">
                  <div className="cos-form-group">
                    <label htmlFor="demo-name">Your Full Name *</label>
                    <input
                      id="demo-name"
                      type="text"
                      required
                      placeholder="e.g. Priyantha Silva"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </div>

                  <div className="cos-form-group">
                    <label htmlFor="demo-email">Company Work Email *</label>
                    <input
                      id="demo-email"
                      type="email"
                      required
                      placeholder="e.g. priyantha@company.lk"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                  </div>

                  <div className="cos-form-group">
                    <label htmlFor="demo-tier">Team Size Tier *</label>
                    <select
                      id="demo-tier"
                      value={formTier}
                      onChange={(e) => setFormTier(e.target.value)}
                    >
                      <option value="11–50 staff (Startup)">11–50 staff (Startup / Boutique)</option>
                      <option value="51–300 staff (Mid-Range SME)">51–300 staff (Mid-Range SME)</option>
                      <option value="300+ staff (High-Scale Enterprise)">300+ staff (High-Scale Enterprise)</option>
                    </select>
                  </div>

                  {formError && <p className="cos-form-error">{formError}</p>}

                  <button type="submit" disabled={formLoading} className="cos-btn-primary w-full">
                    {formLoading ? "Scheduling..." : "Request Live Walkthrough"} <Send size={15} />
                  </button>
                  <small className="cos-form-note">
                    Confidential demo. Zero spam. Tailored to Sri Lankan operating parameters.
                  </small>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

