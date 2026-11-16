import { AppWindow, Bot, BriefcaseBusiness, ChartNoAxesCombined, CloudCog, Code2, RadioTower, HelpCircle } from "lucide-react";
import { supabaseSelect } from "./supabase";

export interface Service {
  id: string;
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  headline: string;
  copy: string;
  overview: string;
  details: string[];
  features: string[];
  useCases: string[];
  process: string[];
  controls: string[];
  outcomes: string[];
  media_url?: string | null;
  created_at?: string;
  icon?: any; // the resolved React component
}

export const services = [
  {
    slug: "ai-automation-agents",
    number: "01",
    eyebrow: "Intelligent workflows",
    title: "AI Automation & Agents",
    headline: "Give repetitive work a dependable operating system.",
    copy: "We design task-specific AI agents that understand context, use approved business knowledge, coordinate work across systems, and involve people at the right decision points.",
    overview: "CreativeX builds governed AI agents for customer operations, knowledge work, document workflows, and internal coordination. The goal is not autonomous behavior for its own sake. It is a reliable improvement to a real workflow, with visible evidence and a clear path to human review.",
    details: ["Workflow orchestration", "Agent systems", "Human-in-the-loop controls"],
    features: ["Business process and decision mapping", "Retrieval from approved knowledge sources", "Tool use across CRM, messaging, orders, and internal systems", "Evaluation, confidence, escalation, and audit trails", "Omnichannel customer and employee experiences"],
    useCases: ["Lead capture, qualification, and follow-up", "Customer support and order coordination", "Document review and operational triage", "Internal knowledge and research assistance"],
    process: ["Frame the workflow and decision rights", "Prototype with representative scenarios", "Connect approved systems and data", "Evaluate, pilot, and improve in production"],
    controls: ["Permissions and least-privilege access", "Source visibility and traceable actions", "Human approval for consequential decisions", "Fallback behavior and continuous evaluation"],
    outcomes: ["Fewer missed or delayed tasks", "More consistent customer follow-through", "Clearer oversight of automated work"],
    icon: Bot,
  },
  {
    slug: "data-predictive-analytics",
    number: "02",
    eyebrow: "Decision intelligence",
    title: "Data & Predictive Analytics",
    headline: "Turn fragmented data into decisions people can use.",
    copy: "We turn fragmented operational data into reliable foundations, forecasting models, and decision tools that make patterns, risks, and opportunities easier to act on.",
    overview: "CreativeX connects operational data, improves its reliability, and translates analysis into practical decision experiences. We design the data foundation, model, interface, and operating loop together so predictions reach the people who can act on them.",
    details: ["Data platforms", "Predictive models", "Decision dashboards"],
    features: ["Data architecture and source integration", "Cleaning, transformation, and quality controls", "Forecasting, classification, and anomaly detection", "Operational dashboards and decision workspaces", "Model monitoring and explanation"],
    useCases: ["Demand and inventory forecasting", "Shipment and delivery exception prediction", "Customer and revenue intelligence", "Equipment, facility, and service analytics"],
    process: ["Define the decision and measurable baseline", "Assess data quality and availability", "Build and validate the analytical approach", "Deliver insights inside the operating workflow"],
    controls: ["Data lineage and access governance", "Performance tested against a baseline", "Clear confidence and limitation reporting", "Drift and data-quality monitoring"],
    outcomes: ["Earlier awareness of operational risk", "Faster, more consistent decisions", "A trusted data foundation for future products"],
    icon: ChartNoAxesCombined,
  },
  {
    slug: "iot-smart-operations",
    number: "03",
    eyebrow: "Connected operations",
    title: "IoT & Smart Operations",
    headline: "Connect physical signals to coordinated action.",
    copy: "We connect assets, environments, and teams through real-time telemetry, operational control tools, alerting, and intelligence that supports faster field decisions.",
    overview: "CreativeX develops connected-operation platforms that bring device data, business context, alerts, and field workflows into one usable environment. Systems are designed for resilience, clear ownership, and the realities of people working across facilities and the field.",
    details: ["IoT architecture", "Telemetry & alerts", "Operations control rooms"],
    features: ["Telemetry pipelines and device communication", "State modeling, anomaly alerts, and incident workflows", "Integration with physical assets, sensors, and legacy systems", "Field and dispatch interfaces designed for shift work", "Audit logs and operational history"],
    useCases: ["Cold-chain and perishable cargo monitoring", "Production line and facility condition visibility", "Distributed fleet and remote equipment oversight", "Environmental, security, and access alerting"],
    process: ["Survey physical assets and operational points of failure", "Design telemetry pipelines and control schemas", "Build the alerting and operational interface", "Field test, train operators, and harden the system"],
    controls: ["Role-scoped device commands and safety interlocks", "Device identity, encryption, and firmware safeguards", "Graceful operation during network dropouts", "Incident logs with traceable field resolutions"],
    outcomes: ["Earlier intervention before asset loss", "Less manual monitoring and verification overhead", "A single operational view of physical assets"],
    icon: RadioTower,
  },
  {
    slug: "web-mobile-product-engineering",
    number: "04",
    eyebrow: "Product engineering",
    title: "Web & Mobile Product Engineering",
    headline: "Build products that feel simple and hold up under scale.",
    copy: "We take digital products from initial definition through production release, combining fast interfaces, modern architectures, and maintainable engineering practices.",
    overview: "CreativeX engineers web and mobile applications that balance fast-loading, expressive interfaces with clean, dependable engineering underneath. We work as the primary product team or alongside internal staff, helping teams ship products that serve users reliably from day one.",
    details: ["Product design", "Web & mobile apps", "Design systems & APIs"],
    features: ["Product strategy, scoping, and interface design", "Next.js, React, React Native, and mobile engineering", "Component libraries and shared design systems", "API design, database modeling, and state management", "End-to-end testing, observability, and release delivery"],
    useCases: ["Customer-facing portals and SaaS products", "Field, service, and mobile operations tools", "Internal workflow applications and dashboards", "Design-system and frontend platform modernization"],
    process: ["Shape scope, key journeys, and architecture", "Prototype interactions and validate technical choices", "Build incrementally with automated test suites", "Launch with monitoring and a support roadmap"],
    controls: ["Accessibility, performance, and cross-device testing", "Code reviews, linting, and type safety", "Security reviews across auth, data, and APIs", "Observability for errors, latency, and core flows"],
    outcomes: ["Faster path from concept to reliable release", "Products that customers find clear and intuitive", "A codebase internal teams can easily maintain"],
    icon: AppWindow,
  },
  {
    slug: "cloud-solutions",
    number: "05",
    eyebrow: "Resilient systems",
    title: "Cloud Solutions & Infrastructure",
    headline: "Build cloud infrastructure that is secure, fast, and maintainable.",
    copy: "We architect, optimize, and manage cloud systems designed for performance, strict compliance, disaster resilience, and predictable operating costs.",
    overview: "CreativeX designs cloud environments that treat security, observability, and delivery automation as fundamental requirements. We help organizations modernize legacy infrastructure, scale new applications, and operate in production without unnecessary complexity.",
    details: ["Cloud architecture", "DevOps & CI/CD", "Site reliability & security"],
    features: ["Cloud architecture, migration, and cost optimization", "Infrastructure automation and delivery pipelines", "Identity, security, backup, and recovery design", "Monitoring, observability, and cost visibility"],
    useCases: ["New SaaS and AI product foundations", "Legacy application modernization", "Secure data and integration platforms", "Reliable multi-environment delivery"],
    process: ["Assess workloads, risks, and constraints", "Design the target platform and migration path", "Automate infrastructure and delivery", "Migrate safely and establish operating practices"],
    controls: ["Least-privilege identity and access", "Encrypted data and managed secrets", "Backup, recovery, and incident readiness", "Cost, performance, and reliability monitoring"],
    outcomes: ["More dependable product delivery", "Clearer security and operating visibility", "Infrastructure that can evolve with demand"],
    icon: CloudCog,
  },
  {
    slug: "ai-business-consultation",
    number: "06",
    eyebrow: "Direction before delivery",
    title: "AI Business Consultation",
    headline: "Turn AI ambition into a decision-ready roadmap.",
    copy: "We help leadership teams assess readiness, prioritize high-value use cases, define governance, and turn AI ambition into a sequenced roadmap the organization can execute.",
    overview: "CreativeX works with business and technology leaders to identify where AI can create credible value, what must be true for delivery, and which risks require explicit control. The result is a practical sequence of decisions and experiments—not a generic innovation presentation.",
    details: ["AI readiness", "Use-case portfolio", "Governance roadmap"],
    features: ["Workflow and opportunity discovery", "Data, technology, and operating-readiness assessment", "Use-case value, feasibility, and risk prioritization", "Responsible-AI and governance design", "Prototype and implementation roadmap"],
    useCases: ["Enterprise AI strategy and portfolio planning", "Agent and automation opportunity assessment", "AI product and platform direction", "Governance, policy, and adoption planning"],
    process: ["Interview stakeholders and map priority work", "Assess data, systems, teams, and constraints", "Prioritize opportunities with visible criteria", "Define experiments, governance, and delivery sequence"],
    controls: ["Explicit decision ownership", "Use-case risk classification", "Data and model governance requirements", "Measurable pilot success and stop criteria"],
    outcomes: ["A focused portfolio of credible opportunities", "Shared leadership understanding of risk", "A roadmap teams can fund and execute"],
    icon: BriefcaseBusiness,
  },
  {
    slug: "custom-software-development",
    number: "07",
    eyebrow: "Production engineering",
    title: "Custom Software Development",
    headline: "Engineer bespoke software built to survive real production scale.",
    copy: "We design and build bespoke web portals, mobile apps, SaaS platforms, and dedicated offshore squads for growing enterprises in Sri Lanka and worldwide.",
    overview: "CreativeX Technology delivers end-to-end custom software development from architectural design and database modeling to agile sprint delivery and CI/CD automation. We provide 100% intellectual property ownership, zero per-seat licensing fees, and senior engineering squads aligned to your operational reality.",
    details: ["Enterprise web platforms", "Mobile applications", "Dedicated offshore squads"],
    features: [
      "Full-lifecycle software architecture and systems design",
      "Modern web applications with Next.js, React, and TypeScript",
      "Cross-platform mobile applications with Flutter and native bridges",
      "High-concurrency microservices, REST APIs, and event pipelines",
      "Automated CI/CD pipelines, containerization, and cloud deployment",
      "Dedicated Agile squads with timezone overlap for Australia, UAE, and UK",
    ],
    useCases: [
      "B2B and multi-tenant SaaS product development",
      "Enterprise internal operations and self-service portals",
      "Legacy system modernization and monolithic decomposition",
      "Offshore software engineering squad augmentation",
    ],
    process: [
      "Architecture discovery and schema design",
      "Interactive UI/UX prototyping and user validation",
      "Agile sprint delivery with two-week milestones",
      "Automated testing, security scans, and production cutover",
    ],
    controls: [
      "100% source code, repository, and IP ownership",
      "Automated unit, integration, and security test coverage",
      "Strict NDAs, data privacy, and role-based access control",
      "Direct engineer communication in your Slack and Jira",
    ],
    outcomes: [
      "Zero technical debt and scalable cloud architecture",
      "60%+ operational cost savings compared to Western tech hubs",
      "Reliable, on-time milestone delivery with visible sprint velocity",
    ],
    icon: Code2,
  },
] as any[];

const iconMap: Record<string, any> = {
  "ai-automation-agents": Bot,
  "data-predictive-analytics": ChartNoAxesCombined,
  "iot-smart-operations": RadioTower,
  "custom-software-development": Code2,
  "web-mobile-product-engineering": AppWindow,
  "cloud-solutions": CloudCog,
  "ai-business-consultation": BriefcaseBusiness,
};

export function getServiceIcon(slug?: string) {
  if (!slug) return HelpCircle;
  const normalized = slug.toLowerCase().trim();
  return iconMap[normalized] || iconMap[slug] || HelpCircle;
}

export async function getServices(): Promise<Service[]> {
  try {
    const data = await supabaseSelect<any>("services", { order: "number.asc" });
    if (data && data.length > 0) {
      const dbServices = data.map((service: any) => {
        const { icon: _icon, ...rest } = service;
        return {
          ...rest,
          details: service.details || [],
          features: service.features || [],
          useCases: service.useCases || service.use_cases || [],
          process: service.process || [],
          controls: service.controls || [],
          outcomes: service.outcomes || [],
        };
      });
      // Merge static services that aren't in Supabase
      const dbSlugs = new Set(dbServices.map((s: any) => s.slug));
      const missingStatic = services.filter((s) => !dbSlugs.has(s.slug)).map((s) => {
        const { icon: _icon, ...rest } = s;
        return rest as Service;
      });
      const combined = [...dbServices, ...missingStatic];
      return combined.map((s, idx) => ({
        ...s,
        number: String(idx + 1).padStart(2, "0"),
      }));
    }
  } catch (err: any) {
    console.error("Error fetching services:", err?.message);
  }
  return services.map((s, idx) => {
    const { icon: _icon, ...rest } = s;
    return {
      ...(rest as Service),
      number: String(idx + 1).padStart(2, "0"),
    };
  });
}

export async function getService(slug: string): Promise<Service | undefined> {
  try {
    const data = await supabaseSelect<any>("services", { slug: `eq.${slug}` });
    if (data && data.length > 0) {
      const serviceData = data[0];
      const { icon: _icon, ...rest } = serviceData;
      return {
        ...rest,
        details: serviceData.details || [],
        features: serviceData.features || [],
        useCases: serviceData.useCases || serviceData.use_cases || [],
        process: serviceData.process || [],
        controls: serviceData.controls || [],
        outcomes: serviceData.outcomes || [],
      };
    }
  } catch (err: any) {
    // fall through to static
  }
  const staticMatch = services.find((s) => s.slug === slug);
  if (staticMatch) {
    const { icon: _icon, ...rest } = staticMatch;
    return rest as Service;
  }
  return undefined;
}
