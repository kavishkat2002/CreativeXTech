export type EmployeeRole = "admin" | "supervisor" | "employee";

export type EmployeeStatus = "active" | "on_leave" | "probation" | "suspended";

export interface EmployeeKPI {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  period: string;
  weight: number; // e.g. 30 (%)
  status: "exceeding" | "on_track" | "at_risk" | "needs_attention";
  notes?: string;
}

export interface SupervisorReview {
  id: string;
  date: string;
  supervisorName: string;
  rating: number; // 1-5
  strengths: string;
  improvements: string;
  goalsNextWeek: string;
}

export interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "late" | "leave" | "holiday";
  workMode: "Remote" | "Office (Rajagiriya)" | "Client Visit";
}

export interface LeadPipelineItem {
  id: string;
  clientName: string;
  contactPerson: string;
  channel: "WhatsApp" | "Email" | "LinkedIn" | "Phone" | "Referral";
  corridor: "Sri Lanka SME" | "Australia" | "United Kingdom" | "Global";
  dealValue: string;
  stage: "New Lead" | "Contacted" | "Demo Booked" | "Proposal Sent" | "Closed Won";
  nextFollowUp: string;
  notes: string;
  assignedBy?: string;
  assignedTo?: string;
  approvalStatus?: "none" | "pending" | "approved" | "rejected";
  approvalRequestedAt?: string;
  approvalRequestedBy?: string;
  approvedBy?: string;
  approvedAt?: string;
  commissionLKR?: number;
  pendingRequestType?: "none" | "won" | "edit" | "delete";
  pendingEditData?: Partial<LeadPipelineItem>;
  pendingReason?: string;
}

export interface DailyChecklistItem {
  id: string;
  task: string;
  timeSlot: string;
  completed: boolean;
  category: "Outreach" | "Follow-up" | "Demo" | "Admin" | "Research" | "Client Call" | "Client Meeting";
  priority?: "urgent" | "high" | "normal";
  shiftBlock?: "morning" | "afternoon" | "eod";
  notes?: string;
  completedAt?: string;
  assignedBy?: string;
  assignedTo?: string;
  date?: string; // YYYY-MM-DD
}

export interface SalesScriptItem {
  id: string;
  title: string;
  targetAudience: string;
  keyHook: string;
  pitchBody: string;
  objectionHandling: string;
}

export interface EodReportItem {
  id: string;
  date: string; // YYYY-MM-DD
  submittedAt: string;
  deliverablesCount: string;
  accomplishments: string;
  blockers?: string;
  status: "pending_review" | "signed_off";
  signedOffBy?: string;
  signedOffAt?: string;
  supervisorNotes?: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  password?: string;
  role: EmployeeRole;
  designation: string;
  department: string;
  supervisorId: string;
  supervisorName: string;
  joiningDate: string;
  contractType: string;
  workLocation: string;
  phone: string;
  allocatedTerritory?: string;
  status: EmployeeStatus;
  avatar?: string;
  bio?: string;
  kpis: EmployeeKPI[];
  weeklyReviews: SupervisorReview[];
  attendance: AttendanceRecord[];
  leads?: LeadPipelineItem[];
  checklist?: DailyChecklistItem[];
  eodReports?: EodReportItem[];
}

export interface EMSUserSession {
  employee: Employee;
  token: string;
  role: EmployeeRole;
  loginTime: string;
}

// ── Initial Seed Data ──
export const INITIAL_EMPLOYEES: Employee[] = [
  // 1. Super Admin Account
  {
    id: "emp-admin-001",
    employeeId: "CX-EMP-001",
    name: "Kavishka Thilakarathna",
    email: "tkavishka101@gmail.com",
    password: "@Kavishka2002",
    role: "admin",
    designation: "Executive Director & System Administrator",
    department: "Executive Leadership & Solutions Architecture",
    supervisorId: "none",
    supervisorName: "Board of Directors",
    joiningDate: "2024-01-01",
    contractType: "Permanent / Founder",
    workLocation: "Colombo HQ / Global",
    phone: "+94 76 234 5336",
    status: "active",
    bio: "Head of Creativex Technology AI ecosystem, executive oversight of all engineering squads, client growth, and employee performance.",
    kpis: [
      {
        id: "kpi-adm-1",
        title: "Total Company Revenue Growth",
        target: 100,
        current: 114,
        unit: "% of Annual Target",
        period: "Q4 2026",
        weight: 40,
        status: "exceeding",
        notes: "Scaling enterprise contracts across Australia, UK, and Sri Lanka.",
      },
      {
        id: "kpi-adm-2",
        title: "Organizational Delivery SLA Compliance",
        target: 99.5,
        current: 99.9,
        unit: "% Uptime / On-Time",
        period: "Annual",
        weight: 30,
        status: "exceeding",
        notes: "Zero critical production downtime across all client workloads.",
      },
      {
        id: "kpi-adm-3",
        title: "Talent Development & Mentorship",
        target: 100,
        current: 100,
        unit: "% Supervised Reviews",
        period: "Monthly",
        weight: 30,
        status: "on_track",
        notes: "Active weekly review cadences across intern and associate tracks.",
      },
    ],
    weeklyReviews: [],
    attendance: [
      { date: "2026-11-18", checkIn: "08:30 AM", checkOut: "07:30 PM", status: "present", workMode: "Office (Rajagiriya)" },
      { date: "2026-11-17", checkIn: "08:45 AM", checkOut: "07:15 PM", status: "present", workMode: "Office (Rajagiriya)" },
      { date: "2026-11-16", checkIn: "09:00 AM", checkOut: "07:00 PM", status: "present", workMode: "Remote" },
    ],
  },

  // 2. Supervisor Account
  {
    id: "emp-sup-001",
    employeeId: "CX-MGR-012",
    name: "Thimathi Dissanayaka",
    email: "thimathi@creativexlab.online",
    password: "thimathi@2001",
    role: "supervisor",
    designation: "Head Of Engineering and Business Development",
    department: "Engineering & Business Development",
    supervisorId: "emp-admin-001",
    supervisorName: "",
    joiningDate: "2025-06-01",
    contractType: "Permanent",
    workLocation: "Remote · Colombo HQ",
    phone: "+94 77 123 4567",
    status: "active",
    bio: "Supervising B2B outbound tech sales, agency partnerships, and intern mentorship across Sri Lankan and foreign markets.",
    kpis: [
      {
        id: "kpi-sup-1",
        title: "Team Outbound Pipeline Volume",
        target: 15000000,
        current: 16200000,
        unit: "LKR Pipeline Value",
        period: "Monthly (November 2026)",
        weight: 40,
        status: "exceeding",
        notes: "Strong pipeline buildup for CreativeOS and custom web app solutions.",
      },
      {
        id: "kpi-sup-2",
        title: "Intern Mentorship & KPI Coaching",
        target: 4,
        current: 4,
        unit: "Bi-Weekly Coaching Sessions",
        period: "Monthly",
        weight: 30,
        status: "on_track",
        notes: "Weekly 1-on-1 reviews conducted on time.",
      },
      {
        id: "kpi-sup-3",
        title: "Enterprise Pitch Conversion Rate",
        target: 25,
        current: 28.5,
        unit: "% Closing Rate",
        period: "Quarterly",
        weight: 30,
        status: "exceeding",
        notes: "Exceeded closing benchmark by 3.5%.",
      },
    ],
    weeklyReviews: [],
    attendance: [
      { date: "2026-11-18", checkIn: "08:50 AM", checkOut: "06:10 PM", status: "present", workMode: "Remote" },
      { date: "2026-11-17", checkIn: "08:55 AM", checkOut: "06:05 PM", status: "present", workMode: "Office (Rajagiriya)" },
      { date: "2026-11-16", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", workMode: "Remote" },
    ],
  },

  // 3. Business Development Intern Profile (First Employee Profile)
  {
    id: "emp-bdi-001",
    employeeId: "CX-EMP-041",
    name: "Ikram Lantra",
    email: "ikram@creativex.online",
    password: "CreativexIkram041",
    role: "employee",
    designation: "Business Development Intern (Probation) in 20 Days",
    department: "Business Development & Sales",
    supervisorId: "emp-sup-001",
    supervisorName: "Thimathi Dissanayaka (Head Of Engineering and Business Development)",
    joiningDate: "2026-10-15",
    contractType: "Full-Time Remote Internship (6 Months)",
    workLocation: "Remote · Rajagiriya / Colombo, Sri Lanka (9:00 AM – 6:00 PM)",
    phone: "+94 77 690 2960",
    allocatedTerritory: "Sri Lanka SMEs, Australia & UK Outbound Tech Sales",
    status: "active",
    bio: "",
    kpis: [
      {
        id: "kpi-bdi-1",
        title: "B2B Outbound SME Lead Generation",
        target: 45,
        current: 42,
        unit: "Qualified Leads",
        period: "Monthly (November 2026)",
        weight: 30,
        status: "exceeding",
        notes: "Target: 45 leads/mo. Current: 42 verified leads with decision-maker contact details (93.3% achieved on day 15).",
      },
      {
        id: "kpi-bdi-2",
        title: "Client Discovery & Demo Calls Scheduled",
        target: 16,
        current: 15,
        unit: "Confirmed Demos",
        period: "Monthly (November 2026)",
        weight: 25,
        status: "on_track",
        notes: "15 qualified product walkthroughs booked with CTOs and operations directors across Colombo and Sydney.",
      },
      {
        id: "kpi-bdi-3",
        title: "Proposal & Scope Brief Turnaround Time",
        target: 24,
        current: 17.5,
        unit: "Hours (Lower is better)",
        period: "Rolling 30-Day Avg",
        weight: 20,
        status: "exceeding",
        notes: "Average SLA turnaround is 17.5 hours against the 24-hour company threshold. Exceptional speed.",
      },
      {
        id: "kpi-bdi-4",
        title: "Target Market Research Dossiers (AU/UK/SL)",
        target: 4,
        current: 4,
        unit: "Deep-Dive Dossiers",
        period: "Monthly (November 2026)",
        weight: 15,
        status: "on_track",
        notes: "Completed 4 comprehensive competitor & market pricing analyses for logistics, healthcare, and export firms.",
      },
      {
        id: "kpi-bdi-5",
        title: "CRM Hygiene & WhatsApp Client Sync Compliance",
        target: 98,
        current: 96.5,
        unit: "% Accuracy",
        period: "Weekly Audit",
        weight: 10,
        status: "on_track",
        notes: "Accurate logging of all client conversation tokens, contact notes, and follow-up deadlines.",
      },
    ],
    weeklyReviews: [
      {
        id: "rev-1",
        date: "2026-11-12",
        supervisorName: "Thimathi Dissanayaka",
        rating: 5,
        strengths: "Outstanding outreach pace on Sri Lankan SME manufacturing & logistics accounts. Created 14 verified decision-maker opportunities in a single week.",
        improvements: "Spend 5 minutes more on pre-call qualification notes to arm the solutions architect with deeper client pain points.",
        goalsNextWeek: "Schedule 5 new enterprise walkthroughs for CreativeOS across Australian software agency prospects.",
      },
      {
        id: "rev-2",
        date: "2026-11-05",
        supervisorName: "Thimathi Dissanayaka",
        rating: 4.8,
        strengths: "Sharp understanding of CreativeOS technical architecture (PostgreSQL JSONB, Meta Prophet) when answering first-round client questions.",
        improvements: "Ensure client follow-ups via WhatsApp are timestamped within 2 hours of demo completion.",
        goalsNextWeek: "Finalize the UK Agency Outreach dossier focusing on London & Manchester scaleups.",
      },
    ],
    attendance: [
      { date: "2026-11-18", checkIn: "08:50 AM", checkOut: "06:10 PM", status: "present", workMode: "Office (Rajagiriya)" },
      { date: "2026-11-17", checkIn: "08:55 AM", checkOut: "06:00 PM", status: "present", workMode: "Remote" },
      { date: "2026-11-16", checkIn: "08:58 AM", checkOut: "06:05 PM", status: "present", workMode: "Remote" },
      { date: "2026-11-14", checkIn: "08:58 AM", checkOut: "06:02 PM", status: "present", workMode: "Remote" },
      { date: "2026-11-13", checkIn: "08:55 AM", checkOut: "06:00 PM", status: "present", workMode: "Remote" },
      { date: "2026-11-12", checkIn: "08:50 AM", checkOut: "06:15 PM", status: "present", workMode: "Office (Rajagiriya)" },
      { date: "2026-11-11", checkIn: "08:59 AM", checkOut: "06:05 PM", status: "present", workMode: "Remote" },
      { date: "2026-11-10", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", workMode: "Remote" },
    ],
    leads: [],
    checklist: [
      {
        id: "chk-1",
        task: "Colombo HQ Digital Clock-in & Review morning slack alerts from solutions engineering",
        timeSlot: "09:00 AM",
        completed: true,
        category: "Admin",
        priority: "high",
        shiftBlock: "morning",
        notes: "Shift initiated at 08:58 AM on time.",
      },
      {
        id: "chk-2",
        task: "Send WhatsApp follow-up to Meridian Logistics COO with revised milestone quote",
        timeSlot: "09:30 AM",
        completed: true,
        category: "Follow-up",
        priority: "urgent",
        shiftBlock: "morning",
        notes: "Milestone quotation sent via direct channel. Awaiting approval.",
      },
      {
        id: "chk-3",
        task: "Prospect 15 Australian tech agencies on LinkedIn (Sydney / Melbourne corridor)",
        timeSlot: "10:45 AM",
        completed: true,
        category: "Outreach",
        priority: "high",
        shiftBlock: "morning",
        notes: "15 personalized messages sent targeting Managing Partners & CTOs.",
      },
      {
        id: "chk-4",
        task: "Dispatch custom Next.js 15 pitch emails to 10 London tech scaleups & venture studios",
        timeSlot: "11:45 AM",
        completed: false,
        category: "Outreach",
        priority: "normal",
        shiftBlock: "morning",
        notes: "Targeting seed-stage companies needing edge web capabilities.",
      },
      {
        id: "chk-5",
        task: "Prep discovery agenda with Solutions Architect for Highland Teas",
        timeSlot: "01:30 PM",
        completed: false,
        category: "Client Meeting",
        priority: "high",
        shiftBlock: "afternoon",
        notes: "Review export supply chain architecture slides and live sandbox URL.",
      },
      {
        id: "chk-6",
        task: "Join live CreativeOS client discovery walkthrough with Highland Specialty Teas",
        timeSlot: "02:30 PM",
        completed: false,
        category: "Client Call",
        priority: "urgent",
        shiftBlock: "afternoon",
        notes: "Co-host with lead supervisor. Document questions and feature requests.",
      },
      {
        id: "chk-7",
        task: "Log 6 new outbound qualified contacts into CRM with phone and verified emails",
        timeSlot: "04:15 PM",
        completed: false,
        category: "Admin",
        priority: "normal",
        shiftBlock: "afternoon",
        notes: "Ensure all company domains and LinkedIn URLs are validated.",
      },
      {
        id: "chk-8",
        task: "Audit 3 regional tech agency pricing rate cards and document in weekly market report",
        timeSlot: "05:00 PM",
        completed: false,
        category: "Research",
        priority: "normal",
        shiftBlock: "eod",
        notes: "Benchmark hourly developer rates in AU/UK vs Creativex Technology edge delivery.",
      },
      {
        id: "chk-9",
        task: "Submit End-of-Day (EOD) daily activity report & daily attendance sign-off to Thimathi D.",
        timeSlot: "05:50 PM",
        completed: false,
        category: "Admin",
        priority: "high",
        shiftBlock: "eod",
        notes: "Daily wrap summary automatically dispatched to supervisor scoreboard.",
      },
    ],
    eodReports: [],
  },
];

// ── Master B2B Outreach & Sales Playbook ──
export const DEFAULT_SALES_SCRIPTS: SalesScriptItem[] = [
  {
    id: "script-1",
    title: "CreativeOS Pitch for Sri Lankan SMEs & Manufacturers",
    targetAudience: "COOs, MDs, Operations Heads in Sri Lanka (Logistics, Tea, Apparel, Retail)",
    keyHook: "Stops project delays caused by Poya mercantile holidays and fragmented WhatsApp threads.",
    pitchBody:
      "Hi [Name], I noticed [Company Name] is managing expanding client delivery. Most Sri Lankan teams lose 6-8 hours weekly chasing informal WhatsApp sign-offs and face surprise delays during Poya clusters. CreativeOS by Creativex Technology is Sri Lanka's first Work Operating System that natively buffers your 2026 Poya calendar and calculates 15% EPF/ETF statutory labor costs. Can I show you a 15-minute live preview with our solutions architect this Thursday?",
    objectionHandling:
      "If they say 'We already use Excel / WhatsApp': Excel cannot automatically predict holiday delays or enforce client approval gates. CreativeOS actually integrates with WhatsApp so your executives can approve deliverables right from chat without logging into another complex tool.",
  },
  {
    id: "script-2",
    title: "Australia & UK Nearshore Engineering Pitch",
    targetAudience: "CTOs, Founders, Engineering Leads in Sydney, Melbourne, London",
    keyHook: "High-velocity full-stack engineering squads with native timezone alignment and 60% cost efficiency.",
    pitchBody:
      "Hi [Name], reaching out from Creativex Technology Colombo. We build scalable edge architectures (Next.js 15, FastAPI, Supabase, PostgreSQL) for Australian and UK scaleups. Our squads work in direct AEST / GMT overlapping sprint windows with ISO 27001-ready controls at a 60% operational efficiency compared to local hiring. Are you exploring expanding your engineering capacity this quarter?",
    objectionHandling:
      "If they ask about quality / IP: All code is written to strict UK GDPR and Australian Privacy Principles with kernel-enforced Row-Level Security, full IP assignment upon milestone delivery, and direct daily standups with senior engineers.",
  },
  {
    id: "script-3",
    title: "Custom AI & Workflow Automation Solutions",
    targetAudience: "Enterprises seeking process automation, document AI, or ERP modernization",
    keyHook: "Turns unstructured documents and manual workflows into real-time microsecond event systems.",
    pitchBody:
      "Hi [Name], companies in your sector spend up to 22% of payroll on manual invoice reconciliations and spreadsheet handoffs. At Creativex Technology, we engineer custom AI workflow agents that parse documents, sync bank ledgers, and automate client approvals in sub-25ms. Would you be open to seeing a 2-minute video case study of how we automated FX settlement for a Colombo trading house?",
    objectionHandling:
      "If they worry about high upfront cost: We offer staged pilot sprints with clear milestone deliverables so you only invest as ROI is mathematically demonstrated.",
  },
];

// ── Storage Keys ──
const STORAGE_KEY_EMPLOYEES = "creativex_ems_employees_v4";
const STORAGE_KEY_SESSION = "creativex_ems_session_v4";

export function getStoredEmployees(): Employee[] {
  if (typeof window === "undefined") {
    return INITIAL_EMPLOYEES;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMPLOYEES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
      return INITIAL_EMPLOYEES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure admin and initial intern are always present and valid
      parsed.forEach((p) => {
        if (p.id === "emp-bdi-001" || p.name === "Kavindu Senanayake" || p.email === "intern.bd@creativexlab.online") {
          p.name = "Ikram Lantra";
          p.email = "ikram@creativex.online";
          p.password = "CreativexIkram041";
          p.phone = "+94 77 690 2960";
        }
        if (
          p.id === "emp-sup-001" ||
          p.name === "Dinithi Perera" ||
          p.name === "Thimathi Dissanayaka" ||
          p.email === "supervisor.bd@creativexlab.online" ||
          p.email === "thimathi@creativexlab.online"
        ) {
          p.name = "Thimathi Dissanayaka";
          p.email = "thimathi@creativexlab.online";
          p.password = "thimathi@2001";
          p.designation = "Head Of Engineering and Business Development";
          p.department = "Engineering & Business Development";
          p.supervisorName = "";
        }
        if (p.supervisorName) {
          p.supervisorName = p.supervisorName
            .replace(/Dinithi\s*Perera(\s*\(Lead\s*BD\s*Manager\))?/gi, "Thimathi Dissanayaka (Head Of Engineering and Business Development)")
            .replace(/Dinithi/gi, "Thimathi Dissanayaka")
            .replace(/Lead\s*BD\s*Manager/gi, "Head Of Engineering and Business Development")
            .replace(/\s*&\s*Kavishka\s*(T\.|Thilakarathna)?/gi, "")
            .replace(/^Kavishka\s*(T\.|Thilakarathna)?$/gi, "")
            .trim();
        }
        if (p.id === "emp-bdi-001" && (!p.supervisorName || p.supervisorName.toLowerCase().includes("dinithi"))) {
          p.supervisorName = "Thimathi Dissanayaka (Head Of Engineering and Business Development)";
        }
        const seed = INITIAL_EMPLOYEES.find((m) => m.id === p.id);
        if (!p.kpis || p.kpis.length === 0) {
          if (seed?.kpis) p.kpis = seed.kpis;
        }
        // Ensure attendance has this week's seeded days if missing
        if (seed?.attendance) {
          if (!p.attendance || p.attendance.length === 0) {
            p.attendance = [...seed.attendance];
          } else {
            seed.attendance.forEach((sa) => {
              if (!p.attendance.some((pa: AttendanceRecord) => pa.date === sa.date)) {
                p.attendance.push(sa);
              }
            });
            p.attendance.sort((a: AttendanceRecord, b: AttendanceRecord) => b.date.localeCompare(a.date));
          }
        }
        p.eodReports = p.eodReports || [];
      });
      const hasAdmin = parsed.some((e) => e.email === "tkavishka101@gmail.com");
      const hasIntern = parsed.some((e) => e.id === "emp-bdi-001");
      if (!hasAdmin || !hasIntern) {
        const merged = [...INITIAL_EMPLOYEES];
        parsed.forEach((p) => {
          if (!merged.some((m) => m.id === p.id || m.email === p.email)) {
            merged.push(p);
          }
        });
        localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
  } catch (err) {
    console.warn("Failed to read stored employees, falling back to initial seed", err);
  }
  return INITIAL_EMPLOYEES;
}

export function saveStoredEmployees(employees: Employee[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
    window.dispatchEvent(new CustomEvent("ems_local_sync", { detail: employees }));
  } catch (err) {
    console.error("Failed to persist employees to storage", err);
  }

  // Asynchronously sync with Supabase database
  if (typeof window !== "undefined" && typeof fetch === "function") {
    fetch("/api/employee/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employees }),
    }).catch((err) => {
      console.warn("[ems] Supabase background sync notice:", err);
    });
  }
}

export async function fetchEmployeesFromSupabase(): Promise<Employee[] | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch("/api/employee/sync", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.success && Array.isArray(data.employees) && data.employees.length > 0) {
      // Do not overwrite user-added KPIs or leads with uninitialized fallback seed
      if (data.source === "fallback") {
        return null;
      }
      return (data.employees as Employee[]).map((e) => {
        if (e.id === "emp-bdi-001" || e.name === "Kavindu Senanayake" || e.email === "intern.bd@creativexlab.online") {
          return {
            ...e,
            name: "Ikram Lantra",
            email: "ikram@creativex.online",
            password: "CreativexIkram041",
            phone: "+94 77 690 2960",
          };
        }
        return e;
      });
    }
  } catch (err) {
    console.warn("[ems] Supabase pull notice:", err);
  }
  return null;
}

export function getStoredEMSSession(): EMSUserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (
      session?.employee &&
      (session.employee.id === "emp-bdi-001" ||
        session.employee.name === "Kavindu Senanayake" ||
        session.employee.email === "intern.bd@creativexlab.online")
    ) {
      session.employee.name = "Ikram Lantra";
      session.employee.email = "ikram@creativex.online";
      session.employee.password = "CreativexIkram041";
      session.employee.phone = "+94 77 690 2960";
    }
    if (
      session?.employee &&
      (session.employee.id === "emp-sup-001" ||
        session.employee.name === "Dinithi Perera" ||
        session.employee.name === "Thimathi Dissanayaka" ||
        session.employee.email === "supervisor.bd@creativexlab.online")
    ) {
      session.employee.name = "Thimathi Dissanayaka";
      session.employee.email = "thimathi@creativexlab.online";
      session.employee.password = "thimathi@2001";
      session.employee.designation = "Head Of Engineering and Business Development";
    }
    return session;
  } catch {
    return null;
  }
}

export function saveStoredEMSSession(session: EMSUserSession | null): void {
  if (typeof window === "undefined") return;
  try {
    if (!session) {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    } else {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    }
  } catch (err) {
    console.error("Failed to persist EMS session", err);
  }
}

// ── Auth Verification Helper ──
export function authenticateEmployee(
  emailInput: string,
  passwordInput: string
): { success: boolean; session?: EMSUserSession; error?: string } {
  const cleanEmail = emailInput.trim().toLowerCase();
  const cleanPassword = passwordInput.trim();

  // 1. Direct Master Admin Check (tkavishka101@gmail.com / @Kavishka2002)
  if (cleanEmail === "tkavishka101@gmail.com") {
    if (cleanPassword === "@Kavishka2002") {
      const employees = getStoredEmployees();
      const adminEmp = employees.find((e) => e.email.toLowerCase() === "tkavishka101@gmail.com") || INITIAL_EMPLOYEES[0];
      const session: EMSUserSession = {
        employee: adminEmp,
        token: `cx_tok_admin_${Date.now()}`,
        role: "admin",
        loginTime: new Date().toISOString(),
      };
      saveStoredEMSSession(session);
      return { success: true, session };
    } else {
      return { success: false, error: "Invalid password for administrator account." };
    }
  }

  // 2. Direct Intern Account Check (ikram@creativex.online / CreativexIkram041)
  if (cleanEmail === "ikram@creativex.online" || cleanEmail === "intern.bd@creativexlab.online") {
    if (cleanPassword === "CreativexIkram041" || cleanPassword === "@Intern2026") {
      const employees = getStoredEmployees();
      const internEmp = employees.find((e) => e.id === "emp-bdi-001") || INITIAL_EMPLOYEES[2];
      const normalizedIntern = {
        ...internEmp,
        name: "Ikram Lantra",
        email: "ikram@creativex.online",
        password: "CreativexIkram041",
      };
      const session: EMSUserSession = {
        employee: normalizedIntern,
        token: `cx_tok_employee_${Date.now()}`,
        role: "employee",
        loginTime: new Date().toISOString(),
      };
      saveStoredEMSSession(session);
      return { success: true, session };
    } else {
      return { success: false, error: "Incorrect password for intern account." };
    }
  }

  // 3. Direct Supervisor Check (thimathi@creativexlab.online / thimathi@2001)
  if (cleanEmail === "thimathi@creativexlab.online" || cleanEmail === "supervisor.bd@creativexlab.online") {
    if (cleanPassword === "thimathi@2001" || cleanPassword === "@Supervisor2026") {
      const employees = getStoredEmployees();
      const supEmp = employees.find((e) => e.id === "emp-sup-001") || INITIAL_EMPLOYEES[1];
      const normalizedSup = {
        ...supEmp,
        name: "Thimathi Dissanayaka",
        email: "thimathi@creativexlab.online",
        password: "thimathi@2001",
        designation: "Head Of Engineering and Business Development",
        department: "Engineering & Business Development",
        supervisorName: "",
      };
      const session: EMSUserSession = {
        employee: normalizedSup,
        token: `cx_tok_sup_${Date.now()}`,
        role: "supervisor",
        loginTime: new Date().toISOString(),
      };
      saveStoredEMSSession(session);
      return { success: true, session };
    } else {
      return { success: false, error: "Incorrect password for supervisor account." };
    }
  }

  // 2. Standard Employee & Intern Check
  const employees = getStoredEmployees();
  const matched = employees.find((e) => e.email.toLowerCase() === cleanEmail);

  if (!matched) {
    return { success: false, error: "No employee account found with this work email." };
  }

  if (matched.status === "suspended") {
    return { success: false, error: "This employee account has been suspended by system administrator." };
  }

  if (matched.password && matched.password !== cleanPassword) {
    return { success: false, error: "Incorrect password. Contact your supervisor or administrator for password reset." };
  }

  const session: EMSUserSession = {
    employee: matched,
    token: `cx_tok_${matched.role}_${Date.now()}`,
    role: matched.role,
    loginTime: new Date().toISOString(),
  };

  saveStoredEMSSession(session);
  return { success: true, session };
}

// ── KPI Performance Calculation Helper ──
export function calculateOverallKPIScore(kpis: EmployeeKPI[]): number {
  if (!kpis || kpis.length === 0) return 0;
  let totalWeightedScore = 0;
  let totalWeight = 0;

  kpis.forEach((kpi) => {
    let rawScore = 0;
    if (kpi.unit.includes("Lower is better") || kpi.title.toLowerCase().includes("turnaround")) {
      // For turnaround time, lower than target is better
      rawScore = kpi.current <= kpi.target ? 100 : Math.max(0, (kpi.target / kpi.current) * 100);
    } else {
      rawScore = Math.min(130, (kpi.current / kpi.target) * 100);
    }
    const weight = kpi.weight || 1;
    totalWeightedScore += rawScore * weight;
    totalWeight += weight;
  });

  if (totalWeight === 0) return 0;
  return Math.round((totalWeightedScore / totalWeight) * 10) / 10;
}

// ── Deal Value Parsing & Currency Helpers ──
export function parseDealValueToLKR(valStr: string | undefined): number {
  if (!valStr) return 0;
  const str = valStr.trim();

  // Check for ~LKR X.XM or LKR X.XM
  const lkrMMatch = str.match(/~?\s*LKR\s*([\d.]+)\s*M/i);
  if (lkrMMatch) {
    const num = parseFloat(lkrMMatch[1]);
    if (!isNaN(num)) return Math.round(num * 1_000_000);
  }

  // Check for ~LKR X.XK or LKR X.XK
  const lkrKMatch = str.match(/~?\s*LKR\s*([\d.]+)\s*K/i);
  if (lkrKMatch) {
    const num = parseFloat(lkrKMatch[1]);
    if (!isNaN(num)) return Math.round(num * 1_000);
  }

  // Check for direct LKR amount: "LKR 1,250,000"
  const lkrDirectMatch = str.match(/LKR\s*([\d,]+)/i);
  if (lkrDirectMatch) {
    const num = parseInt(lkrDirectMatch[1].replace(/,/g, ""), 10);
    if (!isNaN(num)) return num;
  }

  // Check for AUD (approx. 200 LKR per 1 AUD)
  const audMatch = str.match(/AUD\s*([\d,]+)/i);
  if (audMatch) {
    const aud = parseInt(audMatch[1].replace(/,/g, ""), 10);
    if (!isNaN(aud)) return Math.round(aud * 200);
  }

  // Check for GBP (approx. 395 LKR per 1 GBP)
  const gbpMatch = str.match(/GBP\s*([\d,]+)/i);
  if (gbpMatch) {
    const gbp = parseInt(gbpMatch[1].replace(/,/g, ""), 10);
    if (!isNaN(gbp)) return Math.round(gbp * 395);
  }

  // Check for USD (approx. 305 LKR per 1 USD)
  const usdMatch = str.match(/USD\s*([\d,]+)/i);
  if (usdMatch) {
    const usd = parseInt(usdMatch[1].replace(/,/g, ""), 10);
    if (!isNaN(usd)) return Math.round(usd * 305);
  }

  // Fallback: extract any digits
  const anyDigits = str.replace(/[^\d]/g, "");
  if (anyDigits) {
    const parsed = parseInt(anyDigits, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }

  return 0;
}

export function formatLKR(amount: number): string {
  if (amount >= 1_000_000) {
    const inMillions = amount / 1_000_000;
    return `LKR ${inMillions.toFixed(2).replace(/\.00$/, "")}M`;
  }
  return `LKR ${amount.toLocaleString("en-US")}`;
}

