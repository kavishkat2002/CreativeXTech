"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  Calculator,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Clock,
  Cloud,
  CloudCog,
  Code2,
  Coins,
  Cpu,
  Database,
  FileCheck2,
  Globe,
  Globe2,
  HardDrive,
  Headphones,
  HelpCircle,
  Layers,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Minus,
  Network,
  PhoneCall,
  Plus,
  RefreshCw,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Terminal,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";

import { SiteFooter } from "@/components/site-header";

// ─── Capability Domain Data ──────────────────────────────────────────────────

interface CapabilityDomain {
  id: string;
  number: string;
  name: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  metricLabel: string;
  metricValue: string;
  metricBadge: string;
  icon: React.ElementType;
  keyFeatures: string[];
  techStack: string[];
  sriLankaContext: string;
  mockScreenTitle: string;
  mockScreenRows: Array<{
    label: string;
    detail: string;
    status: string;
    statusType: "success" | "orange" | "blue";
  }>;
}

const itDomains: CapabilityDomain[] = [
  {
    id: "cloud",
    number: "01",
    name: "Enterprise Cloud & Hybrid Multi-Cloud Infrastructure",
    shortTitle: "Cloud & Hybrid",
    tagline: "Resilient, low-latency cloud architecture on AWS, Google Cloud, Azure, and Cloudflare.",
    summary:
      "We design, migrate, and manage modern cloud environments tailored for performance and cost efficiency. Whether containerizing monolithic systems with Docker and Kubernetes, migrating legacy on-premise servers, or building multi-region failovers, we eliminate single points of failure.",
    metricLabel: "Cloud Availability Target",
    metricValue: "99.98%",
    metricBadge: "Sub-20ms Edge Routing",
    icon: CloudCog,
    keyFeatures: [
      "Zero-downtime lift-and-shift & cloud-native migration to AWS, GCP, or Microsoft Azure",
      "Multi-zone and multi-region automated database replication with sub-second failover",
      "Cost optimization audits reducing unmanaged cloud compute and egress bills by 25–40%",
      "Cloudflare Enterprise edge caching and WAF protection shielding origin servers",
      "Automated Terraform Infrastructure-as-Code (IaC) with reproducible staging environments",
    ],
    techStack: ["AWS", "Google Cloud", "Microsoft Azure", "Cloudflare", "Docker", "Kubernetes", "Terraform"],
    sriLankaContext:
      "Mitigates domestic broadband and server room power unpredictability by hosting workloads in low-latency Singapore and Mumbai cloud availability zones with local Edge caching.",
    mockScreenTitle: "MULTI-CLOUD CLUSTER TELEMETRY / LIVE HEALTH",
    mockScreenRows: [
      { label: "AWS ap-southeast-1 (Singapore)", detail: "Compute Cluster: 8 Pods · Latency: 18ms", status: "Optimal / Healthy", statusType: "success" },
      { label: "Cloudflare Edge Routing (Colombo PoP)", detail: "SSL/TLS 1.3 · Cache Hit Ratio: 92.4%", status: "Accelerated", statusType: "success" },
      { label: "PostgreSQL Primary-Replica Sync", detail: "WAL Replication Lag: 0.04s · 0 Data Loss", status: "Synchronized", statusType: "blue" },
      { label: "Automated Snapshot Frequency", detail: "Differential Hourly Snapshots · Retention 90d", status: "Protected", statusType: "success" },
    ],
  },
  {
    id: "security",
    number: "02",
    name: "Cybersecurity, Zero-Trust & Access Governance",
    shortTitle: "Cybersecurity",
    tagline: "Proactive threat intelligence, endpoint hardening, and zero-trust identity control.",
    summary:
      "In an era of rampant ransomware and phishing attacks, perimeter defense is not enough. We implement strict Zero-Trust Network Architecture (ZTNA), least-privilege role-based access controls, cryptographic database encryption, and automated vulnerability management.",
    metricLabel: "Threat Mitigation Score",
    metricValue: "100%",
    metricBadge: "Zero-Trust Enforcement",
    icon: Lock,
    keyFeatures: [
      "Zero-Trust Network Access (ZTNA) replacing vulnerable legacy PPTP/IPsec VPN tunnels",
      "Multi-Factor Authentication (MFA/2FA) enforcement across all enterprise SaaS and internal logins",
      "Comprehensive endpoint detection and response (EDR) safeguarding staff laptops and workstations",
      "Quarterly penetration testing, vulnerability scanning, and security patch auditing",
      "Full compliance alignment with Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022)",
    ],
    techStack: ["Zero-Trust ZTNA", "WAF", "MFA/FIDO2", "TLS 1.3", "EDR Sentinel", "OWASP Top 10", "ISO 27001"],
    sriLankaContext:
      "Protects corporate treasuries, proprietary customer lists, and financial records from prevalent spear-phishing and ransomware syndicates targeting Sri Lankan enterprises.",
    mockScreenTitle: "SECURITY OPERATIONS CENTER / THREAT FEED",
    mockScreenRows: [
      { label: "Zero-Trust Identity Gateway", detail: "248 Verified Sessions · Zero Anonymous Entrants", status: "Enforced", statusType: "success" },
      { label: "Automated EDR Endpoint Status", detail: "100% Workstations Patched · Antivirus Active", status: "Hardened", statusType: "success" },
      { label: "Brute Force & Credential Stuffing", detail: "1,420 Malicious IPs Blocked in 24h", status: "Mitigated", statusType: "success" },
      { label: "Data-at-Rest Encryption", detail: "AES-256 Bit Encrypted Storage Volumes", status: "Compliant", statusType: "blue" },
    ],
  },
  {
    id: "networking",
    number: "03",
    name: "Multi-Branch Network Engineering & SD-WAN",
    shortTitle: "Branch Networking",
    tagline: "Seamless branch connectivity with automated dual-ISP failover and QoS traffic prioritization.",
    summary:
      "Keep head offices, regional warehouses, and retail branches permanently connected. We engineer resilient Software-Defined Wide Area Networks (SD-WAN) with automated failover between Dialog, SLT Mobitel, and backup cellular 4G/5G lines, ensuring zero transaction drops.",
    metricLabel: "Branch Network Uptime",
    metricValue: "99.95%",
    metricBadge: "Sub-Second Failover",
    icon: Network,
    keyFeatures: [
      "Automated dual-ISP WAN load-balancing & seamless failover (e.g. SLT Fibre + Dialog 4G backup)",
      "Encrypted Site-to-Site wireguard mesh tunnels connecting Colombo head office to outstation depots",
      "Quality of Service (QoS) bandwidth shaping prioritizing POS billing and VoIP over general web traffic",
      "Centralized cloud controller management for switches, firewalls, and enterprise Wi-Fi 6 access points",
      "Guest Wi-Fi network isolation with captive portal authentication and bandwidth throttling",
    ],
    techStack: ["SD-WAN", "Ubiquiti UniFi", "Fortinet", "MikroTik", "WireGuard", "Wi-Fi 6", "QoS Shaping"],
    sriLankaContext:
      "Built for retail and distribution networks in Sri Lanka where individual telecom provider outages frequently paralyze billing unless automated dual-carrier failover is active.",
    mockScreenTitle: "SD-WAN MESH TOPOLOGY / LINK STATUS",
    mockScreenRows: [
      { label: "Colombo Head Office (Rajagiriya)", detail: "Primary: SLT Fibre (100Mbps) · Active", status: "Online / 100%", statusType: "success" },
      { label: "Pettah Wholesale Depot", detail: "Primary: Dialog Fibre · Secondary: 4G Standby", status: "Online / Low Ping", statusType: "success" },
      { label: "Kandy Regional Distribution Hub", detail: "WireGuard Tunnel: 14ms · Zero Packet Loss", status: "Encrypted", statusType: "blue" },
      { label: "Galle Southern Branch Office", detail: "Failover Trigger: Automatic · Health Check Passed", status: "Standby Ready", statusType: "success" },
    ],
  },
  {
    id: "modernization",
    number: "04",
    name: "Digital Transformation & Business Process Modernization",
    shortTitle: "Digital Workflows",
    tagline: "Replace fragmented spreadsheets and manual paperwork with unified digital workflows.",
    summary:
      "Transform cumbersome, paper-heavy operations into streamlined digital powerhouses. We connect legacy database backends with modern web portals, automated approval pipelines, customer self-service interfaces, and enterprise ERP systems.",
    metricLabel: "Operational Efficiency Gain",
    metricValue: "+45%",
    metricBadge: "Zero Duplicate Entry",
    icon: Terminal,
    keyFeatures: [
      "End-to-end workflow digitization replacing manual signatures and paper requisitions",
      "Seamless API integrations with local banks, PayHere, WEBXPAY, and LankaPay gateways",
      "Automated WhatsApp Meta API notifications for customer order updates, dispatch, and billing",
      "Centralized real-time executive analytics dashboards providing instantaneous financial KPIs",
      "Strangler-fig legacy migration allowing gradual modernization without operational downtime",
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "REST/GraphQL", "LankaPay", "Meta WhatsApp API"],
    sriLankaContext:
      "Designed specifically for Sri Lankan business cultures, bridging traditional paper customs, VAT compliance schedules, and fast-paced commercial trading.",
    mockScreenTitle: "DIGITAL WORKFLOW ENGINE / DISPATCH QUEUE",
    mockScreenRows: [
      { label: "Automated Invoice Processing", detail: "RAMIS VAT/SVAT compliant generation", status: "Processed (0 errors)", statusType: "success" },
      { label: "Payment Gateway Reconciliation", detail: "PayHere & Direct Bank Wire IPN matched", status: "Reconciled", statusType: "success" },
      { label: "WhatsApp Order Status Bot", detail: "Trilingual dispatch notifications sent", status: "Active / Delivered", statusType: "blue" },
      { label: "Legacy SQL Data Sync", detail: "Bi-directional ledger synchronization", status: "Real-time Sync", statusType: "success" },
    ],
  },
  {
    id: "managed-it",
    number: "05",
    name: "24/7 Managed IT Services & Helpdesk NOC Support",
    shortTitle: "24/7 Managed IT",
    tagline: "Enterprise-grade remote sysadmin, proactive monitoring, and instant incident resolution.",
    summary:
      "Gain the velocity and expertise of a complete IT department at a fraction of the cost of hiring in-house sysadmins. Our Colombo-based Network Operations Center (NOC) monitors your servers, network links, and cloud instances 24 hours a day, 365 days a year.",
    metricLabel: "Average SLA Response Time",
    metricValue: "< 14 Mins",
    metricBadge: "24/7 Colombo NOC",
    icon: Headphones,
    keyFeatures: [
      "24/7/365 proactive telemetry monitoring detecting server spikes and drive failures before outages occur",
      "Guaranteed Service Level Agreements (SLAs) with rapid 15-minute priority incident response",
      "Automated OS and software patch management for Windows Server, Linux, and macOS endpoints",
      "Dedicated helpdesk ticketing portal for staff technical support, onboarding, and access provisioning",
      "Monthly technology reviews and proactive IT roadmap planning with senior software architects",
    ],
    techStack: ["Prometheus", "Grafana", "Zabbix", "Jira Service Desk", "AnyDesk Enterprise", "Linux/Windows"],
    sriLankaContext:
      "Eliminates the risk of single-person dependency when an in-house IT technician resigns, providing an institutional, SLA-backed technology team based right here in Colombo.",
    mockScreenTitle: "COLOMBO NOC DASHBOARD / INCIDENT TELEMETRY",
    mockScreenRows: [
      { label: "Core Service Health Monitor", detail: "38 Servers & Services Monitored Nationwide", status: "All Systems Normal", statusType: "success" },
      { label: "Mean Time to Response (MTTR)", detail: "Priority 1 Tickets: 11m · Priority 2: 24m", status: "Within SLA", statusType: "success" },
      { label: "Automated Vulnerability Patching", detail: "Latest Security Patches Deployed Off-Peak", status: "Complete", statusType: "success" },
      { label: "Dedicated Escalation Engineer", detail: "Senior Solutions Architect on Primary On-Call", status: "Active Standby", statusType: "blue" },
    ],
  },
  {
    id: "disaster-recovery",
    number: "06",
    name: "Disaster Recovery, Business Continuity & Ransomware Defense",
    shortTitle: "Disaster Recovery",
    tagline: "Immutable off-site cloud backups, zero-data-loss RPO, and rapid disaster recovery.",
    summary:
      "A flood, prolonged grid failure, corrupted disk, or ransomware strike can paralyze an unprepared business for weeks. We architect air-gapped, immutable cloud backups with documented Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO).",
    metricLabel: "Recovery Point Objective (RPO)",
    metricValue: "< 5 Mins",
    metricBadge: "Air-Gapped Cloud Storage",
    icon: HardDrive,
    keyFeatures: [
      "Immutable, air-gapped off-site cloud storage immune to ransomware encryption attacks",
      "Automated daily, hourly, and real-time transaction log backups with continuous integrity testing",
      "Tested disaster recovery playbooks enabling complete server reconstruction within 60 minutes",
      "Dual-datacenter geographic redundancy safeguarding against localized environmental disasters",
      "One-click point-in-time database restoration to reverse accidental deletion or malicious modifications",
    ],
    techStack: ["AWS S3 Glacier", "Veeam", "Borg Backup", "ZFS Snapshots", "PostgreSQL PITR", "Cloudflare R2"],
    sriLankaContext:
      "Essential for Sri Lankan businesses vulnerable to extreme weather, flash flooding, power grid fluctuations, or physical equipment theft in outstation branches.",
    mockScreenTitle: "DISASTER RECOVERY ARCHIVE / BACKUP VAULT",
    mockScreenRows: [
      { label: "Air-Gapped Immutable Vault", detail: "AWS S3 Object Lock (WORM) Enabled", status: "Write Once Read Many", statusType: "success" },
      { label: "Last Verified Recovery Drill", detail: "Test database restored successfully in 14m", status: "Drill Passed", statusType: "success" },
      { label: "Off-Site Geographic Replicate", detail: "Primary: Singapore · Secondary: Frankfurt", status: "Synchronized", statusType: "blue" },
      { label: "Data Integrity Checksum", detail: "SHA-256 Bit verification completed", status: "100% Intact", statusType: "success" },
    ],
  },
];

// ─── Industry Solutions Data ──────────────────────────────────────────────────

interface IndustrySolution {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  challenges: string[];
  solution: string;
  deliverables: string[];
  badge: string;
}

const industrySolutions: IndustrySolution[] = [
  {
    id: "logistics",
    name: "Export Logistics & Freight",
    icon: Truck,
    tagline: "24/7 port terminal data feeds, customs EDI clearance, and depot connectivity.",
    challenges: [
      "Port of Colombo terminal delays caused by dropped WAN links",
      "Manual customs ASYCUDA World data re-entry causing processing errors",
      "Unsynchronized warehouse inventory between bonded zones and export yards",
    ],
    solution:
      "We install dedicated low-latency SD-WAN tunnels with 4G redundant links, automated EDI pipelines connecting freight systems, and cloud-hosted logistics ledgers.",
    deliverables: [
      "Zero-downtime port terminal connectivity with dual ISP auto-failover",
      "Automated container tracking and customs document archival",
      "Mobile barcode scanning for yard operations with offline buffering",
    ],
    badge: "Port of Colombo Ready",
  },
  {
    id: "retail",
    name: "Multi-Branch Retail & Wholesale",
    icon: Building2,
    tagline: "Offline-resilient POS, Pettah wholesale synchronization, and central inventory.",
    challenges: [
      "Network drops freezing POS checkouts and causing long customer queues",
      "Stock leakage between Pettah wholesale stores and outstation retail outlets",
      "Manual price updates taking days to propagate across regional branches",
    ],
    solution:
      "We deploy offline-first POS systems that scan and bill even during total internet cuts, syncing seamlessly with central cloud servers the second connection restores.",
    deliverables: [
      "Offline-first POS terminal architecture with instant receipt printing",
      "Real-time multi-depot stock ledger synchronized under 10ms",
      "Centralized promotional pricing pushes to all branch terminals",
    ],
    badge: "Pettah & Nationwide Scale",
  },
  {
    id: "healthcare",
    name: "Healthcare & Diagnostics",
    icon: ShieldCheck,
    tagline: "PACS medical imaging storage, patient data privacy, and hospital network isolation.",
    challenges: [
      "Large MRI and CT scan files exhausting local hospital hard drives",
      "Strict data privacy requirements to protect sensitive patient diagnoses",
      "Equipment telemetry downtime interrupting urgent laboratory reporting",
    ],
    solution:
      "We engineer encrypted, scalable cloud PACS storage archives with dedicated fast local caching, medical device VLAN segmentation, and HIPAA/PDPA compliant access audit trails.",
    deliverables: [
      "Encrypted DICOM / PACS medical image cloud archival with rapid retrieval",
      "Network isolation separating patient Wi-Fi from critical diagnostic machines",
      "Strict role-based doctor and technician electronic health record (EHR) logins",
    ],
    badge: "PDPA & HIPAA Compliant",
  },
  {
    id: "manufacturing",
    name: "Apparel & BOI Manufacturing",
    icon: Cpu,
    tagline: "Factory floor IoT, Katunayake/Biyagama connectivity, and ERP supply chain links.",
    challenges: [
      "Harsh industrial environments causing network switch and Wi-Fi failures",
      "Disconnection between factory production lines and head-office ERP ledgers",
      "Power brownouts disrupting automated assembly and barcode tracking lines",
    ],
    solution:
      "We install ruggedized industrial-grade networking switches, UPS power conditioning, and real-time MQTT data collectors linking factory machinery to cloud ERP platforms.",
    deliverables: [
      "Industrial ruggedized IP67 switches and high-density warehouse Wi-Fi",
      "Factory-to-cloud automated production telemetry and reject logging",
      "Seamless ERP connectivity for raw material procurement and dispatch",
    ],
    badge: "BOI Export Zone Certified",
  },
  {
    id: "finance",
    name: "FinTech & Financial Services",
    icon: Coins,
    tagline: "CBSL regulatory security compliance, encrypted payment pipelines, and audit trails.",
    challenges: [
      "Strict Central Bank of Sri Lanka (CBSL) cybersecurity guidelines",
      "Threat of financial fraud, insider tampering, and credential theft",
      "High latency on transactional databases degrading loan and microfinance apps",
    ],
    solution:
      "We design hardened banking-grade cloud environments featuring hardware security module (HSM) key storage, immutable database audit logs, and continuous SOC2 compliance auditing.",
    deliverables: [
      "CBSL cyber-resilience guideline gap analysis and security hardening",
      "End-to-end encrypted API gateways for payment and credit scoring",
      "Immutable tamper-evident transaction logging with forensic auditability",
    ],
    badge: "Banking-Grade Security",
  },
  {
    id: "hospitality",
    name: "Hotels & Tourism Resorts",
    icon: Globe,
    tagline: "High-density guest Wi-Fi, PMS cloud sync, and villa property interconnectivity.",
    challenges: [
      "Guest complaints regarding weak Wi-Fi coverage across sprawling resorts",
      "Property Management Systems (PMS) dropping out during peak check-in hours",
      "Vulnerable guest networks exposing administrative hotel financial systems",
    ],
    solution:
      "We engineer enterprise-grade outdoor and indoor Wi-Fi 6 mesh coverage, segmented guest portals with social/room login, and resilient cloud-synced PMS infrastructure.",
    deliverables: [
      "Enterprise Wi-Fi 6 mesh covering villas, beaches, pools, and banquet halls",
      "Complete VLAN isolation ensuring guest traffic never touches billing systems",
      "Low-latency cloud backup for Opera, Cloudbeds, or custom hotel PMS",
    ],
    badge: "Resort-Wide Wi-Fi 6",
  },
];

// ─── Comparison Data ─────────────────────────────────────────────────────────

const comparisonPoints = [
  {
    aspect: "Network & Internet Continuity",
    fragile: "Single ISP connection. When SLT or Dialog drops, the entire office or retail billing halts completely.",
    creativeX: "Automated Dual-WAN SD-WAN. Seamless sub-second failover between fiber and secondary cellular with zero transaction drops.",
  },
  {
    aspect: "Data Backup & Ransomware Defense",
    fragile: "Ad-hoc manual copies to external USB drives, rarely tested, susceptible to ransomware encryption.",
    creativeX: "Automated, air-gapped immutable cloud snapshots (WORM). Point-in-time restoration drill tested monthly.",
  },
  {
    aspect: "Support & Incident Response",
    fragile: "Dependent on a single freelancer or junior technician. When they take leave or resign, systems are unmaintained.",
    creativeX: "Institutional SLA with 24/7/365 Colombo Network Operations Center. Guaranteed sub-15 minute priority incident response.",
  },
  {
    aspect: "Cybersecurity & Access Control",
    fragile: "Shared admin passwords, default router logins, open ports, and no multi-factor authentication (MFA).",
    creativeX: "Zero-Trust Network Access (ZTNA), mandatory MFA/2FA, endpoint EDR protection, and least-privilege role governance.",
  },
  {
    aspect: "Cost & Vendor Accountability",
    fragile: "Fragmented vendors pointing fingers at each other; hidden recurring fees with zero transparent accountability.",
    creativeX: "Single accountable technology partner. Fixed, predictable monthly budgets with 100% intellectual property ownership.",
  },
  {
    aspect: "Regulatory & Legal Compliance",
    fragile: "Unaware of Sri Lanka PDPA regulations; customer data stored unencrypted in non-compliant locations.",
    creativeX: "Fully compliant with Sri Lanka Personal Data Protection Act (PDPA No. 9 of 2022) and international security standards.",
  },
];

// ─── Self-Audit Questions ───────────────────────────────────────────────────

interface AuditQuestion {
  question: string;
  options: { label: string; score: number }[];
}

const auditQuestions: AuditQuestion[] = [
  {
    question: "1. What happens if your main ISP connection (SLT or Dialog) goes down right now?",
    options: [
      { label: "Our entire office or retail billing stops completely until line is restored", score: 0 },
      { label: "Staff manually switch to phone hotspots or USB dongles with delays", score: 1 },
      { label: "We have an automated dual-WAN router that switches to secondary line in seconds", score: 3 },
    ],
  },
  {
    question: "2. How are your critical business databases and files currently backed up?",
    options: [
      { label: "To a local USB hard drive or PC in the same office room", score: 0 },
      { label: "To Google Drive / OneDrive manually once a week or month", score: 1 },
      { label: "Automated daily/hourly immutable off-site cloud snapshots with point-in-time recovery", score: 3 },
    ],
  },
  {
    question: "3. If your primary in-house IT person or freelancer resigns tomorrow:",
    options: [
      { label: "We lose access passwords and institutional knowledge; operations would be in trouble", score: 0 },
      { label: "We have partial written notes, but finding a replacement would take weeks", score: 1 },
      { label: "We have documented SOPs and an institutional SLA partner supporting our infrastructure", score: 3 },
    ],
  },
  {
    question: "4. How is staff login security handled across your internal software?",
    options: [
      { label: "Simple passwords without Two-Factor Authentication (2FA/MFA)", score: 0 },
      { label: "2FA is optional and only used for email accounts", score: 1 },
      { label: "Strict Zero-Trust, mandatory MFA, and role-based access control (RBAC)", score: 3 },
    ],
  },
];

// ─── FAQs ────────────────────────────────────────────────────────────────────

const itFaqs = [
  {
    category: "General",
    q: "Why is Creativex Technology recognized as a premier IT solutions provider in Sri Lanka?",
    a: "Creativex Technology (Pvt) Ltd is an accountable, engineering-led technology partner headquartered in Rajagiriya, Colombo. Unlike traditional hardware vendors or low-tier support shops, we bring senior software engineering rigor to enterprise IT: architecting resilient cloud systems, implementing Zero-Trust security, designing multi-branch SD-WAN, and managing 24/7 systems under defined Service Level Agreements (SLAs).",
  },
  {
    category: "Cloud & Infrastructure",
    q: "How does Creativex Technology handle Sri Lanka's broadband and power grid instability?",
    a: "We architect every system with local infrastructural realities in mind: deploying automated dual-ISP failover (e.g. SLT Fibre paired with Dialog 4G/5G backup), configuring offline-first local transactional caches for POS and factory floors, and hosting primary cloud computing in low-latency Singapore and Mumbai regions protected by Cloudflare global CDN edge nodes.",
  },
  {
    category: "Pricing & SLAs",
    q: "How much does managed IT support and infrastructure management cost in Sri Lanka?",
    a: "Our managed IT support packages are tailored to your scale: entry-level SME infrastructure monitoring and remote helpdesk typically starts from LKR 65,000 to LKR 140,000 per month. Mid-sized enterprises with multi-branch networks and 24/7 mission-critical NOC coverage range from LKR 220,000 to LKR 480,000 per month. This provides a full squad of senior cloud architects, security engineers, and sysadmins at less than the cost of hiring two full-time in-house employees.",
  },
  {
    category: "Security & Data",
    q: "How do you ensure compliance with the Sri Lanka Personal Data Protection Act (PDPA)?",
    a: "We enforce strict end-to-end data encryption (AES-256 for data-at-rest, TLS 1.3 for data-in-transit), role-based access governance with audit trails, localized sovereign storage options where required, and automated data retention/purging policies that ensure complete legal compliance with Sri Lanka PDPA No. 9 of 2022.",
  },
  {
    category: "Cloud & Infrastructure",
    q: "Can you modernize our existing on-premise legacy servers without interrupting business?",
    a: "Yes. We specialize in the strangler-fig modernization methodology. We incrementally migrate isolated workloads (such as billing archives, public APIs, and secondary databases) into cloud environments, verifying data integrity in staging environments before making atomic DNS cutovers during off-peak hours to guarantee zero disruption to trading.",
  },
  {
    category: "Support",
    q: "What is your guaranteed response time during a critical server or network outage?",
    a: "Under our Enterprise SLA tier, critical Priority 1 outages (e.g. core payment gateway down, warehouse system offline, or database corruption) trigger an immediate alert in our Colombo NOC with a guaranteed engineer response time of under 15 minutes, with live executive updates provided via dedicated Slack or WhatsApp escalation channels.",
  },
];

export function ItSolutionsClient() {
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const challengeId = useId();

  // State for Capability Explorer
  const [activeTab, setActiveTab] = useState<string>("cloud");
  // State for Industry Blueprint Selector
  const [activeIndustryId, setActiveIndustryId] = useState<string>("logistics");
  // State for Interactive Estimator
  const [endpoints, setEndpoints] = useState<number>(35);
  const [infraType, setInfraType] = useState<"cloud" | "hybrid" | "multibranch">("hybrid");
  const [supportTier, setSupportTier] = useState<"standard" | "critical">("critical");
  const [drTier, setDrTier] = useState<"daily" | "realtime">("realtime");
  const [currency, setCurrency] = useState<"LKR" | "USD">("LKR");

  // State for Interactive Self-Audit
  const [auditStep, setAuditStep] = useState<number>(0);
  const [auditAnswers, setAuditAnswers] = useState<number[]>([]);
  const [auditComplete, setAuditComplete] = useState<boolean>(false);

  // State for Live Edge Ping Test Simulation
  const [pingStatus, setPingStatus] = useState<"idle" | "testing" | "done">("idle");
  const [pingResults, setPingResults] = useState<{ colombo: number; singapore: number; mumbai: number }>({
    colombo: 12,
    singapore: 28,
    mumbai: 34,
  });

  // State for FAQ Accordion & Search
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>("");
  const [faqFilterCategory, setFaqFilterCategory] = useState<string>("All");

  // State for Telemetry HUD Refresh
  const [telemetryTime, setTelemetryTime] = useState<string>("Just now");
  const [isRefreshingTelemetry, setIsRefreshingTelemetry] = useState<boolean>(false);

  // State for Quick Consultation Form
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    company: "",
    primaryGoal: "Cloud Migration & Modernization",
  });

  const currentDomain = itDomains.find((d) => d.id === activeTab) || itDomains[0];
  const DomainIcon = currentDomain.icon;
  const currentIndustry = industrySolutions.find((i) => i.id === activeIndustryId) || industrySolutions[0];
  const IndustryIcon = currentIndustry.icon;

  // ── Cost Estimator Calculations ──
  const calculateEstimate = () => {
    let baseLkr = 85000;

    // Endpoints multiplier
    if (endpoints <= 25) baseLkr += endpoints * 1800;
    else if (endpoints <= 75) baseLkr += 25 * 1800 + (endpoints - 25) * 1500;
    else if (endpoints <= 150) baseLkr += 25 * 1800 + 50 * 1500 + (endpoints - 75) * 1200;
    else baseLkr += 25 * 1800 + 50 * 1500 + 75 * 1200 + (endpoints - 150) * 950;

    // Infrastructure complexity
    if (infraType === "cloud") baseLkr += 35000;
    if (infraType === "hybrid") baseLkr += 55000;
    if (infraType === "multibranch") baseLkr += 95000;

    // Support SLA Tier
    if (supportTier === "critical") baseLkr = Math.round(baseLkr * 1.35);

    // Disaster Recovery Tier
    if (drTier === "realtime") baseLkr += 45000;

    const inHouseCostLkr = Math.max(380000, Math.round(baseLkr * 2.15));
    const monthlySavingsLkr = inHouseCostLkr - baseLkr;
    const usdEquivalent = Math.round(baseLkr / 305);
    const inHouseUsd = Math.round(inHouseCostLkr / 305);
    const savingsUsd = Math.round(monthlySavingsLkr / 305);

    return {
      monthlyLkr: baseLkr,
      inHouseCostLkr,
      monthlySavingsLkr,
      usdEquivalent,
      inHouseUsd,
      savingsUsd,
      slaResponseTime: supportTier === "critical" ? "< 15 Mins Guaranteed" : "< 1 Hour Business SLA",
      backupInterval: drTier === "realtime" ? "Continuous WAL + Hourly Snapshots" : "Automated Nightly Snapshot",
    };
  };

  const estimate = calculateEstimate();

  const handleRefreshTelemetry = () => {
    setIsRefreshingTelemetry(true);
    setTimeout(() => {
      setTelemetryTime("Just now (Synced)");
      setIsRefreshingTelemetry(false);
    }, 600);
  };

  const runPingTest = () => {
    setPingStatus("testing");
    setTimeout(() => {
      // Simulate slight realistic jitter
      setPingResults({
        colombo: Math.floor(10 + Math.random() * 5),
        singapore: Math.floor(25 + Math.random() * 6),
        mumbai: Math.floor(32 + Math.random() * 7),
      });
      setPingStatus("done");
    }, 1200);
  };

  const handleAuditSelect = (score: number) => {
    const nextAnswers = [...auditAnswers, score];
    setAuditAnswers(nextAnswers);
    if (auditStep + 1 < auditQuestions.length) {
      setAuditStep(auditStep + 1);
    } else {
      setAuditComplete(true);
    }
  };

  const resetAudit = () => {
    setAuditStep(0);
    setAuditAnswers([]);
    setAuditComplete(false);
  };

  const totalAuditScore = auditAnswers.reduce((a, b) => a + b, 0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Filtered FAQs
  const filteredFaqs = itFaqs.filter((faq) => {
    const matchesCategory = faqFilterCategory === "All" || faq.category === faqFilterCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0b0c0b] text-[#e4e7e4] min-h-screen">
      {/* ── Sticky Quick Navigation Bar (Desktop & Mobile Optimized) ── */}
      <nav
        aria-label="In-page jump navigation"
        className="sticky top-[72px] z-40 bg-[#0d100d]/95 backdrop-blur-md border-b border-[#1e241e]"
      >
        <div className="site-width flex items-center justify-between py-2 text-xs text-[#a0a5a0] overflow-x-auto no-scrollbar gap-4">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ff5a36] shrink-0">
            <Server className="w-3.5 h-3.5" />
            <span className="font-bold">IT SOLUTIONS SRI LANKA</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-xs">
            <a href="#overview" className="hover:text-white transition-colors">
              Overview
            </a>
            <a href="#audit" className="text-[#ff5a36] hover:underline transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>30s Self-Audit</span>
            </a>
            <a href="#capabilities" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="#estimator" className="hover:text-white transition-colors">
              Cost Estimator
            </a>
            <a href="#comparison" className="hover:text-white transition-colors">
              Sri Lanka Context
            </a>
            <a href="#industries" className="hover:text-white transition-colors">
              Industry Blueprints
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQs
            </a>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/94762345336?text=Hi%20Creativex%20Technology,%20I%20would%20like%20to%20discuss%20our%20enterprise%20IT%20requirements"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#25d366]/15 border border-[#25d366]/40 text-[#25d366] text-xs font-medium hover:bg-[#25d366]/25 transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#ff5a36] text-white font-medium hover:bg-[#e04826] transition-colors"
            >
              <span>Consult Architect</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── 1. Hero Section ── */}
      <section id="overview" className="relative pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-[#1e241e]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,90,54,0.12),transparent)] pointer-events-none" />

        <div className="site-width relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#ff5a36]/10 border border-[#ff5a36]/25 mb-5 sm:mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff5a36]" />
                <span className="text-[11px] font-mono font-semibold tracking-wider text-[#ff5a36] uppercase">
                  Verified Enterprise IT Partner · Rajagiriya, Colombo
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-5 sm:mb-6">
                IT Solutions Provider in Sri Lanka <br className="hidden sm:inline" />
                <span className="text-[#a5aaa5] text-2xl sm:text-3xl lg:text-4xl font-normal block sm:inline mt-1 sm:mt-0">
                  Resilient Cloud. Zero-Trust Security. 24/7 Managed Systems.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#a5aaa5] leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                Creativex Technology (Pvt) Ltd engineers mission-critical IT infrastructure for businesses across Colombo, Kandy, Galle, and nationwide. We eliminate fragile servers, dropped broadband lines, and ransomware vulnerabilities with unified cloud architecture, multi-branch SD-WAN, and SLA-backed managed systems.
              </p>

              {/* Quick Intent Selectors: What is your primary objective today? */}
              <div className="p-4 rounded-xl bg-[#121612] border border-[#1e241e] mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#ff5a36] font-semibold block mb-2.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  What is your immediate IT objective?
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setActiveTab("networking");
                      const el = document.getElementById("capabilities");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="p-2.5 rounded-lg bg-[#0e110e] border border-[#222822] text-left hover:border-[#ff5a36] hover:bg-[#ff5a36]/5 transition-all text-[#d4d4d8]"
                  >
                    <strong className="block text-white mb-0.5">Dual-ISP Branch Network</strong>
                    <span className="text-[11px] text-[#8c928c]">Auto-failover for retail billing &amp; depots</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("cloud");
                      const el = document.getElementById("capabilities");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="p-2.5 rounded-lg bg-[#0e110e] border border-[#222822] text-left hover:border-[#ff5a36] hover:bg-[#ff5a36]/5 transition-all text-[#d4d4d8]"
                  >
                    <strong className="block text-white mb-0.5">Cloud Migration (AWS/GCP)</strong>
                    <span className="text-[11px] text-[#8c928c]">Move physical servers to low-latency cloud</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("managed-it");
                      const el = document.getElementById("capabilities");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="p-2.5 rounded-lg bg-[#0e110e] border border-[#222822] text-left hover:border-[#ff5a36] hover:bg-[#ff5a36]/5 transition-all text-[#d4d4d8]"
                  >
                    <strong className="block text-white mb-0.5">24/7 Managed NOC &amp; Helpdesk</strong>
                    <span className="text-[11px] text-[#8c928c]">Replace or augment in-house sysadmin</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("security");
                      const el = document.getElementById("capabilities");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="p-2.5 rounded-lg bg-[#0e110e] border border-[#222822] text-left hover:border-[#ff5a36] hover:bg-[#ff5a36]/5 transition-all text-[#d4d4d8]"
                  >
                    <strong className="block text-white mb-0.5">Cybersecurity &amp; PDPA Compliance</strong>
                    <span className="text-[11px] text-[#8c928c]">Zero-trust firewall &amp; immutable backup</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#ff5a36] text-white px-5 sm:px-6 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#e04826] transition-all shadow-lg shadow-[#ff5a36]/20 text-center"
                >
                  Schedule an Architecture Audit <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#estimator"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-lg border border-[#2a302a] bg-[#121512] text-sm font-medium text-white hover:border-[#ff5a36]/50 hover:bg-[#181c18] transition-all text-center"
                >
                  <Calculator className="w-4 h-4 text-[#ff5a36]" />
                  Estimate Monthly Cost
                </a>
                <a
                  href="https://wa.me/94762345336?text=Hi%20Creativex%20Technology,%20I%20would%20like%20to%20discuss%20our%20enterprise%20IT%20requirements"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border border-[#25d366]/40 bg-[#25d366]/10 text-sm font-medium text-[#25d366] hover:bg-[#25d366]/20 transition-all text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Direct
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[#1e241e] text-xs text-[#8c928c]">
                <div className="flex items-center gap-2.5">
                  <BadgeCheck className="w-4 h-4 text-[#ff5a36] shrink-0" />
                  <span>99.98% Cloud Uptime SLA</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <BadgeCheck className="w-4 h-4 text-[#ff5a36] shrink-0" />
                  <span>24/7 Colombo NOC Support</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <BadgeCheck className="w-4 h-4 text-[#ff5a36] shrink-0" />
                  <span>Zero Vendor Lock-In &amp; 100% IP</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Live IT Telemetry HUD */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#222822] bg-[#0d100d] p-5 sm:p-6 shadow-2xl relative">
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#1e241e] mb-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-[#ff5a36]" />
                    <span className="text-xs font-mono font-semibold text-white tracking-wider uppercase">
                      COLOMBO NOC / LIVE INFRASTRUCTURE
                    </span>
                  </div>
                  <button
                    onClick={handleRefreshTelemetry}
                    title="Refresh telemetry"
                    className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded border border-[#2a302a] bg-[#141814] text-[#a0a5a0] hover:text-white transition-colors"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRefreshingTelemetry ? "animate-spin text-[#ff5a36]" : ""}`} />
                    <span>{telemetryTime}</span>
                  </button>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-[#121612] border border-[#1e241e]">
                    <span className="text-[11px] text-[#8c928c] block mb-1">Fleet Uptime (Last 90d)</span>
                    <strong className="text-xl font-bold text-white font-mono">99.985%</strong>
                    <span className="text-[10px] text-[#22c55e] block mt-0.5">SLA Exceeded</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#121612] border border-[#1e241e]">
                    <span className="text-[11px] text-[#8c928c] block mb-1">Mean Response Time</span>
                    <strong className="text-xl font-bold text-white font-mono">11.4 Mins</strong>
                    <span className="text-[10px] text-[#ff5a36] block mt-0.5">Colombo NOC Live</span>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="space-y-2 mb-4 text-xs font-mono">
                  <div className="p-2.5 rounded-md bg-[#141814] border border-[#1e241e] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Cloud className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                      <span className="text-white truncate">AWS Singapore + Cloudflare CDN</span>
                    </div>
                    <span className="text-[#22c55e] text-[11px] shrink-0">16ms · Optimal</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-[#141814] border border-[#1e241e] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Lock className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                      <span className="text-white truncate">Zero-Trust Identity Gateway</span>
                    </div>
                    <span className="text-[#22c55e] text-[11px] shrink-0">0 Anomalies</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-[#141814] border border-[#1e241e] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Network className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                      <span className="text-white truncate">SD-WAN Dual Failover (SLT / Dialog)</span>
                    </div>
                    <span className="text-[#3b82f6] text-[11px] shrink-0">Auto-Synced</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-[#141814] border border-[#1e241e] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <HardDrive className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                      <span className="text-white truncate">Immutable Cloud Snapshot Vault</span>
                    </div>
                    <span className="text-[#22c55e] text-[11px] shrink-0">Verified 100%</span>
                  </div>
                </div>

                {/* Interactive Real-Time Latency Ping Test */}
                <div className="p-3 rounded-lg bg-[#121512] border border-[#1e241e] mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#a0a5a0] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#ff5a36]" />
                      <span>Live Edge Latency Benchmark</span>
                    </span>
                    <button
                      onClick={runPingTest}
                      disabled={pingStatus === "testing"}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff5a36]/15 text-[#ff5a36] hover:bg-[#ff5a36]/25 transition-colors disabled:opacity-50"
                    >
                      {pingStatus === "testing" ? "Testing..." : "Run Ping Test"}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                    <div className="p-1.5 rounded bg-[#0a0d0a] border border-[#1e241e]">
                      <span className="text-[10px] text-[#8c928c] block">Colombo Edge</span>
                      <strong className="text-[#22c55e]">{pingResults.colombo}ms</strong>
                    </div>
                    <div className="p-1.5 rounded bg-[#0a0d0a] border border-[#1e241e]">
                      <span className="text-[10px] text-[#8c928c] block">AWS Singapore</span>
                      <strong className="text-[#3b82f6]">{pingResults.singapore}ms</strong>
                    </div>
                    <div className="p-1.5 rounded bg-[#0a0d0a] border border-[#1e241e]">
                      <span className="text-[10px] text-[#8c928c] block">Azure Mumbai</span>
                      <strong className="text-white">{pingResults.mumbai}ms</strong>
                    </div>
                  </div>
                </div>

                {/* Location indicator */}
                <div className="pt-2 border-t border-[#1e241e] flex items-center justify-between text-[11px] text-[#8c928c]">
                  <div className="flex items-center gap-1.5">
                    <CircleDot className="w-3 h-3 text-[#22c55e] animate-pulse" />
                    <span>NOC Active: Rajagiriya, Colombo</span>
                  </div>
                  <span className="font-mono text-[#a0a5a0]">Sri Lanka &amp; APAC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Interactive 30-Second Self-Audit Widget ── */}
      <section id="audit" className="py-16 border-b border-[#1e241e] bg-[#0d0f0d]">
        <div className="site-width max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff5a36]/10 border border-[#ff5a36]/20 text-[#ff5a36] text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>30-SECOND INTERACTIVE HEALTH CHECK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Test Your Business IT Vulnerability Score
            </h2>
            <p className="text-xs sm:text-sm text-[#a5aaa5] max-w-lg mx-auto mt-2">
              Answer 4 fast questions to benchmark your setup against common Sri Lankan operational risks.
            </p>
          </div>

          <div className="rounded-xl border border-[#222822] bg-[#0e100e] p-6 sm:p-8 shadow-xl">
            {!auditComplete ? (
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#8c928c] mb-4 pb-3 border-b border-[#1e241e]">
                  <span>Question {auditStep + 1} of {auditQuestions.length}</span>
                  <div className="flex gap-1.5">
                    {auditQuestions.map((_, i) => (
                      <span
                        key={i}
                        className={`w-5 h-1.5 rounded-full ${
                          i <= auditStep ? "bg-[#ff5a36]" : "bg-[#1e241e]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-white mb-6">
                  {auditQuestions[auditStep].question}
                </h3>

                <div className="space-y-3">
                  {auditQuestions[auditStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAuditSelect(opt.score)}
                      className="w-full p-4 rounded-lg border border-[#1e241e] bg-[#121512] hover:border-[#ff5a36] hover:bg-[#ff5a36]/5 text-left text-xs sm:text-sm text-[#d4d4d8] hover:text-white transition-all flex items-center justify-between group"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 text-[#8c928c] group-hover:text-[#ff5a36] shrink-0 ml-3 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#ff5a36] font-bold block mb-2">
                    Audit Result Generated
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {totalAuditScore <= 3
                      ? "High Vulnerability Risk Detected"
                      : totalAuditScore <= 7
                      ? "Moderate Operational Exposure"
                      : "Resilient & Well-Guarded Infrastructure"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a5aaa5] max-w-md mx-auto mt-2">
                    {totalAuditScore <= 3
                      ? "Your business is at severe risk from telecom outages, hardware failure, and single-person dependency. Immediate dual-WAN failover and automated cloud backup are recommended."
                      : totalAuditScore <= 7
                      ? "You have basic protections, but vulnerabilities exist around ransomware isolation, SLA support guarantees, and branch synchronization."
                      : "Excellent foundation! Creativex Technology can help optimize cloud compute costs, enforce zero-trust identity, and provide 24/7 proactive NOC coverage."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto text-xs">
                  <div className="p-3 rounded-lg bg-[#141814] border border-[#1e241e]">
                    <strong className="text-white block mb-1">1. Dual-Carrier SD-WAN</strong>
                    <span className="text-[#8c928c]">Eliminates revenue disruption during SLT/Dialog fiber cuts.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141814] border border-[#1e241e]">
                    <strong className="text-white block mb-1">2. Air-Gapped Cloud Vault</strong>
                    <span className="text-[#8c928c]">Protects financial records from ransomware extortion.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141814] border border-[#1e241e]">
                    <strong className="text-white block mb-1">3. 24/7 SLA Team</strong>
                    <span className="text-[#8c928c]">Removes risk of single-person staff departure.</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#ff5a36] text-white px-6 py-3 rounded-lg text-xs font-semibold hover:bg-[#e04826] transition-all"
                  >
                    <span>Get a Free In-Depth Architecture Report</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={resetAudit}
                    className="text-xs text-[#8c928c] hover:text-white underline py-2"
                  >
                    Retake Self-Audit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. Interactive Capability Explorer ── */}
      <section id="capabilities" className="py-20 border-b border-[#1e241e]">
        <div className="site-width">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff5a36]/10 border border-[#ff5a36]/20 text-[#ff5a36] text-xs font-mono mb-3">
              <span>EXPLORE DISCIPLINES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              Full-Spectrum Information Technology Capabilities
            </h2>
            <p className="text-sm sm:text-base text-[#a5aaa5]">
              Select a core domain below to inspect architectural specifications, key deliverables, and live simulated telemetry.
            </p>
          </div>

          {/* Tab Navigation Buttons (Responsive Grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {itDomains.map((domain) => {
              const TabIcon = domain.icon;
              const isActive = activeTab === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveTab(domain.id)}
                  className={`flex flex-col items-start p-3.5 rounded-lg border text-left transition-all ${
                    isActive
                      ? "border-[#ff5a36] bg-[#ff5a36]/10 text-white shadow-md shadow-[#ff5a36]/10"
                      : "border-[#1e241e] bg-[#0e100e] text-[#8c928c] hover:border-[#2a302a] hover:text-[#e4e7e4]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-mono text-[10px] text-[#ff5a36]">{domain.number}</span>
                    <TabIcon className={`w-4 h-4 ${isActive ? "text-[#ff5a36]" : "text-[#8c928c]"}`} />
                  </div>
                  <span className="text-xs font-semibold leading-tight">{domain.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Detailed View */}
          <div className="rounded-xl border border-[#222822] bg-[#0e100e] p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Details */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#ff5a36]/10 border border-[#ff5a36]/30">
                    <DomainIcon className="w-5 h-5 text-[#ff5a36]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#ff5a36] uppercase tracking-wider block">
                      Capability {currentDomain.number} / 06
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {currentDomain.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm font-medium text-[#d4d4d8] mb-3 italic">
                  "{currentDomain.tagline}"
                </p>

                <p className="text-sm text-[#a5aaa5] leading-relaxed mb-6">
                  {currentDomain.summary}
                </p>

                {/* Sri Lanka Specific Context Alert */}
                <div className="p-4 rounded-lg bg-[#141814] border border-[#1e241e] mb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
                    <Globe2 className="w-3.5 h-3.5 text-[#ff5a36]" />
                    <span>Sri Lankan Operational Context</span>
                  </div>
                  <p className="text-xs text-[#a0a5a0] leading-relaxed">
                    {currentDomain.sriLankaContext}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5a36]" />
                    <span>Core Deliverables &amp; Architectural Features</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#c4c8c4]">
                    {currentDomain.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ff5a36] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <span className="text-[11px] font-mono text-[#8c928c] uppercase tracking-wider block mb-2">
                    Enforced Technologies &amp; Standards
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentDomain.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#161a16] border border-[#222822] text-[#d4d4d8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Simulated Architecture Console */}
              <div className="lg:col-span-5">
                <div className="rounded-lg border border-[#222822] bg-[#080908] p-5 shadow-xl">
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e241e] mb-4">
                    <span className="text-xs font-mono text-white flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#ff5a36]" />
                      {currentDomain.mockScreenTitle}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e]">
                      {currentDomain.metricBadge}
                    </span>
                  </div>

                  {/* Benchmark Stat */}
                  <div className="p-3.5 rounded bg-[#101310] border border-[#1e241e] mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#8c928c] block">{currentDomain.metricLabel}</span>
                      <strong className="text-2xl font-bold font-mono text-white">
                        {currentDomain.metricValue}
                      </strong>
                    </div>
                    <Award className="w-7 h-7 text-[#ff5a36]/60" />
                  </div>

                  {/* Telemetry Rows */}
                  <div className="space-y-2 mb-5">
                    {currentDomain.mockScreenRows.map((row, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded bg-[#0e110e] border border-[#1e241e] text-xs font-mono"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-white font-medium">{row.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded ${
                              row.statusType === "success"
                                ? "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30"
                                : row.statusType === "blue"
                                ? "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/30"
                                : "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30"
                            }`}
                          >
                            {row.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8c928c]">{row.detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quick Action Button */}
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded bg-[#1e241e] text-xs font-semibold text-white hover:bg-[#ff5a36] transition-colors"
                  >
                    <span>Request Technical Specification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Interactive IT Infrastructure & Managed Support Cost Estimator ── */}
      <section id="estimator" className="py-20 border-b border-[#1e241e] bg-[#0d0f0d]">
        <div className="site-width">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff5a36]/10 border border-[#ff5a36]/20 text-[#ff5a36] text-xs font-mono mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>INTERACTIVE COST ESTIMATOR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              Calculate Your Monthly IT &amp; Cloud Investment
            </h2>
            <p className="text-sm sm:text-base text-[#a5aaa5]">
              Adjust your organization's endpoints, infrastructure model, and required SLA tier to get an immediate realistic estimate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Sliders & Selectors */}
            <div className="lg:col-span-7 rounded-xl border border-[#222822] bg-[#0e100e] p-6 sm:p-8 space-y-6">
              {/* Currency Selector Toggle */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1e241e]">
                <span className="text-xs font-mono uppercase text-[#8c928c]">Display Currency:</span>
                <div className="inline-flex rounded-md border border-[#1e241e] p-0.5 bg-[#121612]">
                  <button
                    onClick={() => setCurrency("LKR")}
                    className={`px-3 py-1 rounded text-xs font-mono ${
                      currency === "LKR" ? "bg-[#ff5a36] text-white" : "text-[#8c928c] hover:text-white"
                    }`}
                  >
                    LKR (Rs)
                  </button>
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-3 py-1 rounded text-xs font-mono ${
                      currency === "USD" ? "bg-[#ff5a36] text-white" : "text-[#8c928c] hover:text-white"
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              {/* Slider & Counter: Number of Endpoints */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="endpoints-slider" className="text-xs font-mono uppercase text-white flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#ff5a36]" />
                    <span>Number of Active Users / Workstations</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Decrease users"
                      onClick={() => setEndpoints(Math.max(10, endpoints - 5))}
                      className="p-1 rounded bg-[#1a1f1a] border border-[#222822] text-[#8c928c] hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-sm font-bold text-[#ff5a36] px-2.5 py-0.5 rounded bg-[#ff5a36]/10 border border-[#ff5a36]/30 min-w-[70px] text-center">
                      {endpoints} Users
                    </span>
                    <button
                      type="button"
                      aria-label="Increase users"
                      onClick={() => setEndpoints(Math.min(250, endpoints + 5))}
                      className="p-1 rounded bg-[#1a1f1a] border border-[#222822] text-[#8c928c] hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <input
                  id="endpoints-slider"
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={endpoints}
                  onChange={(e) => setEndpoints(Number(e.target.value))}
                  className="w-full h-2 bg-[#1a1f1a] rounded-lg appearance-none cursor-pointer accent-[#ff5a36]"
                />
                <div className="flex justify-between text-[10px] text-[#8c928c] font-mono mt-1">
                  <span>10 (Growing SME)</span>
                  <span>75 (Mid-Size)</span>
                  <span>150 (Multi-Branch)</span>
                  <span>250+ (Enterprise)</span>
                </div>
              </div>

              {/* Selector: Infrastructure Model */}
              <div>
                <label className="text-xs font-mono uppercase text-white block mb-2 flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>Primary Infrastructure Architecture</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setInfraType("cloud")}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      infraType === "cloud"
                        ? "border-[#ff5a36] bg-[#ff5a36]/10 text-white"
                        : "border-[#1e241e] bg-[#121512] text-[#8c928c] hover:border-[#2a302a]"
                    }`}
                  >
                    <strong className="block text-white mb-0.5">Cloud-First</strong>
                    <span className="text-[11px] text-[#8c928c] block">AWS / Azure / GCP Only</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInfraType("hybrid")}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      infraType === "hybrid"
                        ? "border-[#ff5a36] bg-[#ff5a36]/10 text-white"
                        : "border-[#1e241e] bg-[#121512] text-[#8c928c] hover:border-[#2a302a]"
                    }`}
                  >
                    <strong className="block text-white mb-0.5">Hybrid Architecture</strong>
                    <span className="text-[11px] text-[#8c928c] block">Cloud + On-Prem Servers</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInfraType("multibranch")}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      infraType === "multibranch"
                        ? "border-[#ff5a36] bg-[#ff5a36]/10 text-white"
                        : "border-[#1e241e] bg-[#121512] text-[#8c928c] hover:border-[#2a302a]"
                    }`}
                  >
                    <strong className="block text-white mb-0.5">Multi-Branch Mesh</strong>
                    <span className="text-[11px] text-[#8c928c] block">Head Office + Depots</span>
                  </button>
                </div>
              </div>

              {/* Selector: Support SLA Tier */}
              <div>
                <label className="text-xs font-mono uppercase text-white block mb-2 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>Support Coverage &amp; Response SLA</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSupportTier("standard")}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      supportTier === "standard"
                        ? "border-[#ff5a36] bg-[#ff5a36]/10 text-white"
                        : "border-[#1e241e] bg-[#121512] text-[#8c928c] hover:border-[#2a302a]"
                    }`}
                  >
                    <strong className="block text-white mb-0.5">Business Hours (8x5)</strong>
                    <span className="text-[11px] text-[#8c928c] block">Mon–Fri standard support, &lt; 1hr response</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSupportTier("critical")}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      supportTier === "critical"
                        ? "border-[#ff5a36] bg-[#ff5a36]/10 text-white"
                        : "border-[#1e241e] bg-[#121512] text-[#8c928c] hover:border-[#2a302a]"
                    }`}
                  >
                    <strong className="block text-white mb-0.5">24/7/365 Critical Mission NOC</strong>
                    <span className="text-[11px] text-[#8c928c] block">Continuous surveillance, &lt; 15min SLA</span>
                  </button>
                </div>
              </div>

              {/* Selector: Disaster Recovery Tier */}
              <div>
                <label className="text-xs font-mono uppercase text-white block mb-2 flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>Disaster Recovery &amp; Backup Frequency</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDrTier("daily")}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      drTier === "daily"
                        ? "border-[#ff5a36] bg-[#ff5a36]/10 text-white"
                        : "border-[#1e241e] bg-[#121512] text-[#8c928c] hover:border-[#2a302a]"
                    }`}
                  >
                    <strong className="block text-white mb-0.5">Automated Daily Snapshot</strong>
                    <span className="text-[11px] text-[#8c928c] block">24h RPO, offsite cloud storage</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDrTier("realtime")}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      drTier === "realtime"
                        ? "border-[#ff5a36] bg-[#ff5a36]/10 text-white"
                        : "border-[#1e241e] bg-[#121512] text-[#8c928c] hover:border-[#2a302a]"
                    }`}
                  >
                    <strong className="block text-white mb-0.5">Zero-RPO Real-Time WAL Replication</strong>
                    <span className="text-[11px] text-[#8c928c] block">Sub-5min RPO, immutable ransomware vault</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated ROI & Investment Card */}
            <div className="lg:col-span-5 rounded-xl border border-[#ff5a36]/30 bg-[#0e110e] p-6 sm:p-7 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e241e] mb-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#ff5a36] font-semibold flex items-center gap-2">
                  <Coins className="w-3.5 h-3.5" />
                  Estimated Monthly Retainer
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff5a36]/10 text-[#ff5a36] border border-[#ff5a36]/30">
                  Fixed Pricing
                </span>
              </div>

              {/* Price Display in LKR or USD */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs text-[#8c928c] font-mono">{currency}</span>
                  <span className="text-3xl sm:text-4xl font-bold font-mono text-white">
                    {currency === "LKR"
                      ? estimate.monthlyLkr.toLocaleString()
                      : estimate.usdEquivalent.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#8c928c]">/ month</span>
                </div>
                <span className="text-xs text-[#8c928c] font-mono block">
                  {currency === "LKR"
                    ? `Approx. $${estimate.usdEquivalent.toLocaleString()} USD · Tailored to ${endpoints} endpoints`
                    : `Equivalent to approx. Rs. ${estimate.monthlyLkr.toLocaleString()} LKR`}
                </span>
              </div>

              {/* Comparison vs in-house hiring */}
              <div className="p-3.5 rounded-lg bg-[#141814] border border-[#1e241e] mb-6">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#8c928c]">In-House IT Team Cost in Colombo:</span>
                  <span className="font-mono text-[#f87171] line-through">
                    {currency === "LKR"
                      ? `LKR ${estimate.inHouseCostLkr.toLocaleString()}`
                      : `$${estimate.inHouseUsd.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#22c55e]">Projected Monthly Operational Savings:</span>
                  <span className="font-mono text-[#22c55e]">
                    +{currency === "LKR"
                      ? `LKR ${estimate.monthlySavingsLkr.toLocaleString()}`
                      : `$${estimate.savingsUsd.toLocaleString()}`}
                  </span>
                </div>
                <span className="text-[10px] text-[#8c928c] block mt-1.5 leading-snug">
                  *Based on salary, EPF/ETF, workstations, and training overhead for 2 full-time senior sysadmins in Colombo.
                </span>
              </div>

              {/* Key Features included in this tier */}
              <div className="space-y-2.5 mb-6 text-xs text-[#c4c8c4]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                  <span>Guaranteed SLA Response: <strong className="text-white">{estimate.slaResponseTime}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                  <span>Backup Architecture: <strong className="text-white">{estimate.backupInterval}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                  <span>Zero-Trust Endpoint Protection &amp; Patch Governance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ff5a36] shrink-0" />
                  <span>Direct Escalation to Senior Software Architects in Rajagiriya</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#ff5a36] text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-[#e04826] transition-all shadow-lg shadow-[#ff5a36]/20 text-center"
              >
                <span>Lock In This Architecture Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Sri Lanka Context: Fragile IT vs Creativex Enterprise Architecture ── */}
      <section id="comparison" className="py-20 border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff5a36]/10 border border-[#ff5a36]/20 text-[#ff5a36] text-xs font-mono mb-3">
              <span>SRI LANKAN BUSINESS REALITY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              The True Cost of Fragile IT vs. Creativex Enterprise Reliability
            </h2>
            <p className="text-sm sm:text-base text-[#a5aaa5]">
              Compare common technology vulnerabilities in Sri Lankan companies with our engineered safeguards.
            </p>
          </div>

          <div className="space-y-4">
            {comparisonPoints.map((pt, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-[#1e241e] bg-[#0e100e] p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-3">
                  <span className="text-xs font-mono text-[#ff5a36] block mb-1">0{idx + 1} / CHALLENGE</span>
                  <h3 className="text-sm font-semibold text-white">{pt.aspect}</h3>
                </div>

                {/* Fragile setup */}
                <div className="md:col-span-4 p-3.5 rounded bg-[#161212] border border-[#2a1e1e]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f87171] mb-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Traditional / Ad-Hoc Setup</span>
                  </div>
                  <p className="text-xs text-[#a59a9a] leading-relaxed">{pt.fragile}</p>
                </div>

                {/* Arrow indicator */}
                <div className="hidden md:flex md:col-span-1 justify-center text-[#ff5a36]">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* CreativeX modern solution */}
                <div className="md:col-span-4 p-3.5 rounded bg-[#101610] border border-[#1e2a1e]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#22c55e] mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Creativex Engineered IT</span>
                  </div>
                  <p className="text-xs text-[#9ab09a] leading-relaxed">{pt.creativeX}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Industry-Tailored IT Solutions ── */}
      <section id="industries" className="py-20 border-b border-[#1e241e] bg-[#0d0f0d]">
        <div className="site-width">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff5a36]/10 border border-[#ff5a36]/20 text-[#ff5a36] text-xs font-mono mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>INDUSTRY BLUEPRINTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              Sector-Specific IT Architecture for Sri Lanka
            </h2>
            <p className="text-sm sm:text-base text-[#a5aaa5]">
              Every industry in Sri Lanka operates under specific regulatory, physical, and transaction conditions. Select your sector below.
            </p>
          </div>

          {/* Sector Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {industrySolutions.map((ind) => {
              const IndBtnIcon = ind.icon;
              const isSelected = activeIndustryId === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustryId(ind.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                    isSelected
                      ? "border-[#ff5a36] bg-[#ff5a36]/10 text-white shadow-sm"
                      : "border-[#1e241e] bg-[#0e100e] text-[#8c928c] hover:border-[#2a302a] hover:text-white"
                  }`}
                >
                  <IndBtnIcon className={`w-3.5 h-3.5 ${isSelected ? "text-[#ff5a36]" : "text-[#8c928c]"}`} />
                  <span>{ind.name}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Industry Card */}
          <div className="rounded-xl border border-[#222822] bg-[#0e100e] p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff5a36]/10 text-[#ff5a36] border border-[#ff5a36]/30">
                    {currentIndustry.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2.5">
                  <IndustryIcon className="w-6 h-6 text-[#ff5a36]" />
                  {currentIndustry.name}
                </h3>
                <p className="text-sm text-[#d4d4d8] italic mb-5">"{currentIndustry.tagline}"</p>

                <p className="text-sm text-[#a5aaa5] leading-relaxed mb-6">
                  {currentIndustry.solution}
                </p>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-3">
                    Key Architectural Deliverables
                  </h4>
                  <ul className="space-y-2 text-xs text-[#c4c8c4]">
                    {currentIndustry.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ff5a36] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right column: Typical challenges solved */}
              <div className="lg:col-span-5 p-5 rounded-lg bg-[#121512] border border-[#1e241e]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#f87171] mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Critical Vulnerabilities Resolved</span>
                </h4>
                <ul className="space-y-3 text-xs text-[#a5aaa5]">
                  {currentIndustry.challenges.map((chal, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-[#f87171] font-bold">✕</span>
                      <span>{chal}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-[#1e241e]">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded bg-[#ff5a36] text-xs font-semibold text-white hover:bg-[#e04826] transition-colors"
                  >
                    <span>Request {currentIndustry.name} Proposal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. 4-Stage IT Implementation Methodology ── */}
      <section id="process" className="py-20 border-b border-[#1e241e]">
        <div className="site-width">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff5a36]/10 border border-[#ff5a36]/20 text-[#ff5a36] text-xs font-mono mb-3">
              <span>PROVEN METHODOLOGY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              Our 4-Stage Zero-Downtime Implementation Roadmap
            </h2>
            <p className="text-sm sm:text-base text-[#a5aaa5]">
              How we modernize complex business systems without causing operational hiccups or lost revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg border border-[#1e241e] bg-[#0e100e] relative">
              <span className="font-mono text-3xl font-bold text-[#ff5a36]/40 block mb-3">01</span>
              <h3 className="text-base font-semibold text-white mb-2">Technical Health Audit</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                48-hour discovery of your on-premise hardware, network switches, firewall rules, and active licenses to uncover single points of failure.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#1e241e] bg-[#0e100e] relative">
              <span className="font-mono text-3xl font-bold text-[#ff5a36]/40 block mb-3">02</span>
              <h3 className="text-base font-semibold text-white mb-2">Resilient Blueprinting</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                We design an Infrastructure-as-Code architecture featuring automated dual-ISP failover, Singapore cloud availability, and backup vaults.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#1e241e] bg-[#0e100e] relative">
              <span className="font-mono text-3xl font-bold text-[#ff5a36]/40 block mb-3">03</span>
              <h3 className="text-base font-semibold text-white mb-2">Strangler Migration</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                Phased migration in off-peak hours with automated verification tests ensuring zero lost transactions and complete rollback capability.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#1e241e] bg-[#0e100e] relative">
              <span className="font-mono text-3xl font-bold text-[#ff5a36]/40 block mb-3">04</span>
              <h3 className="text-base font-semibold text-white mb-2">24/7 SLA Governance</h3>
              <p className="text-xs text-[#8c928c] leading-relaxed">
                Continuous telemetry monitoring from our Colombo NOC with sub-15 minute response guarantees, monthly patch audits, and fractional CTO advisory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Interactive FAQ Accordion with Search & Filter ── */}
      <section id="faq" className="py-20 border-b border-[#1e241e] bg-[#0d0f0d]">
        <div className="site-width max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff5a36]/10 border border-[#ff5a36]/20 text-[#ff5a36] text-xs font-mono mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Everything You Need to Know About IT Solutions in Sri Lanka
            </h2>
            <p className="text-sm text-[#a5aaa5] max-w-xl mx-auto">
              Clear, transparent answers about our engineering capabilities, pricing models, security compliance, and support guarantees.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="space-y-3 mb-8">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8c928c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions (e.g. cloud, cost, SLA, backup, PDPA)..."
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                className="w-full bg-[#121612] border border-[#1e241e] rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#8c928c] focus:outline-none focus:border-[#ff5a36]"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 justify-center">
              {["All", "General", "Cloud & Infrastructure", "Pricing & SLAs", "Security & Data", "Support"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setFaqFilterCategory(cat)}
                    className={`text-[11px] font-mono px-3 py-1 rounded transition-colors ${
                      faqFilterCategory === cat
                        ? "bg-[#ff5a36] text-white"
                        : "bg-[#141814] text-[#8c928c] hover:text-white border border-[#1e241e]"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#8c928c]">
                No questions found matching your search. Try different keywords.
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-lg border border-[#1e241e] bg-[#0e100e] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#121512] transition-colors"
                    >
                      <span className="text-sm font-semibold text-white flex items-center gap-2.5">
                        <span className="text-[#ff5a36] font-mono text-xs">Q{idx + 1}.</span>
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#ff5a36] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8c928c] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-[#1a1f1a] text-xs text-[#a0a5a0] leading-relaxed">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ── 9. Interactive Quick Consultation Request Form ── */}
      <section id="consultation" className="py-20 border-b border-[#1e241e]">
        <div className="site-width max-w-4xl">
          <div className="rounded-2xl border border-[#2a302a] bg-[#0e110e] p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Direct Contact Info */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#ff5a36] font-semibold block mb-1">
                    Connect With Senior Architects
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Schedule a Free 45-Minute Architecture Review
                  </h3>
                </div>
                <p className="text-xs text-[#a5aaa5] leading-relaxed">
                  Discuss your infrastructure bottlenecks, cloud migration options, or managed support needs directly with engineering leads in Colombo.
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <a
                    href="tel:0762345336"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#141814] border border-[#1e241e] text-white hover:border-[#ff5a36]/50 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-[#ff5a36]" />
                    <div>
                      <span className="text-[10px] text-[#8c928c] block">Call Colombo Headquarters</span>
                      <strong className="font-mono">076 2345 336 / +94 76 234 5336</strong>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/94762345336?text=Hi%20Creativex%20Technology,%20I%20would%20like%20to%20discuss%20our%20enterprise%20IT%20requirements"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#141814] border border-[#1e241e] text-white hover:border-[#25d366]/50 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25d366]" />
                    <div>
                      <span className="text-[10px] text-[#8c928c] block">Instant Messaging</span>
                      <strong className="text-[#25d366]">Chat on WhatsApp (Live)</strong>
                    </div>
                  </a>

                  <a
                    href="mailto:contact@creativextechnology.com"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#141814] border border-[#1e241e] text-white hover:border-[#ff5a36]/50 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#ff5a36]" />
                    <div>
                      <span className="text-[10px] text-[#8c928c] block">Technical Inquiries</span>
                      <strong className="font-mono">contact@creativextechnology.com</strong>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#141814] border border-[#1e241e] text-[#a0a5a0]">
                    <MapPin className="w-4 h-4 text-[#ff5a36] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#8c928c] block">Registered Office</span>
                      <span className="text-xs text-white">166 / B Perera Mawatha, Rajagiriya, Colombo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Request Form */}
              <div className="lg:col-span-7 p-5 sm:p-6 rounded-xl bg-[#121612] border border-[#1e241e]">
                {formSubmitted ? (
                  <div className="text-center py-10 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-[#22c55e] mx-auto" />
                    <h4 className="text-lg font-bold text-white">Consultation Request Received</h4>
                    <p className="text-xs text-[#a5aaa5] max-w-sm mx-auto">
                      Thank you, {formData.name || "there"}. A senior technical architect from Creativex Technology will contact you within 2 business hours.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-[#ff5a36] underline pt-2 block mx-auto"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor={nameId} className="text-xs font-mono text-white block mb-1">
                        Full Name / Job Title *
                      </label>
                      <input
                        id={nameId}
                        type="text"
                        required
                        placeholder="e.g. Kasun Silva (Head of IT)"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#0a0d0a] border border-[#1e241e] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#8c928c] focus:outline-none focus:border-[#ff5a36]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={phoneId} className="text-xs font-mono text-white block mb-1">
                          Phone or WhatsApp *
                        </label>
                        <input
                          id={phoneId}
                          type="text"
                          required
                          placeholder="077 123 4567"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          className="w-full bg-[#0a0d0a] border border-[#1e241e] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#8c928c] focus:outline-none focus:border-[#ff5a36]"
                        />
                      </div>
                      <div>
                        <label htmlFor={emailId} className="text-xs font-mono text-white block mb-1">
                          Company / Organization
                        </label>
                        <input
                          id={emailId}
                          type="text"
                          placeholder="e.g. ABC Holdings"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-[#0a0d0a] border border-[#1e241e] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#8c928c] focus:outline-none focus:border-[#ff5a36]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={challengeId} className="text-xs font-mono text-white block mb-1">
                        Primary IT Challenge / Requirement
                      </label>
                      <select
                        id={challengeId}
                        value={formData.primaryGoal}
                        onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                        className="w-full bg-[#0a0d0a] border border-[#1e241e] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5a36]"
                      >
                        <option value="Cloud Migration & Modernization">Cloud Migration &amp; AWS/GCP Setup</option>
                        <option value="24/7 Managed IT Support & NOC">24/7 Managed IT Support &amp; Helpdesk NOC</option>
                        <option value="Cybersecurity & Zero-Trust Audit">Cybersecurity, Firewall &amp; Zero-Trust Audit</option>
                        <option value="Multi-Branch SD-WAN Networking">Multi-Branch SD-WAN &amp; Retail POS Network</option>
                        <option value="Disaster Recovery & Ransomware Defense">Disaster Recovery &amp; Immutable Backup Vault</option>
                        <option value="Custom Business Software / ERP">Custom Software &amp; Enterprise ERP Integration</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#ff5a36] text-white py-3 rounded-lg text-xs font-semibold hover:bg-[#e04826] transition-colors shadow-md shadow-[#ff5a36]/20"
                    >
                      <span>Request Architecture Discovery Call</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-[#8c928c] block text-center">
                      Strict NDA guaranteed. No sales spam—speak directly with engineering leads in Colombo.
                    </span>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Internal Linking & Knowledge Hub ── */}
      <section className="py-12 border-b border-[#1e241e] bg-[#090b09]">
        <div className="site-width">
          <p className="text-xs uppercase tracking-wider text-[#ff5a36] font-semibold mb-4">
            Explore Related Engineering Capabilities &amp; Case Studies
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-[#8c928c]">
            <Link href="/ai-development-sri-lanka" className="hover:text-white underline">
              AI Development Sri Lanka
            </Link>
            <span>·</span>
            <Link href="/erp-solutions-sri-lanka" className="hover:text-white underline">
              ERP Solutions Sri Lanka
            </Link>
            <span>·</span>
            <Link href="/custom-software-development" className="hover:text-white underline">
              Custom Software Development
            </Link>
            <span>·</span>
            <Link href="/services/cloud-solutions" className="hover:text-white underline">
              Cloud Solutions &amp; DevOps
            </Link>
            <span>·</span>
            <Link href="/creativeos" className="hover:text-white underline">
              CreativeOS Enterprise Work OS
            </Link>
            <span>·</span>
            <Link href="/blog" className="hover:text-white underline">
              Technical Insights &amp; IT Guides
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
