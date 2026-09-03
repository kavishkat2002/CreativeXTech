import { Bot, Building2, Rocket, Ship, Store, HelpCircle } from "lucide-react";
import { supabaseSelect } from "./supabase";

export interface ProjectWorkflowStep {
  number: string;
  title: string;
  copy: string;
}

export interface ProjectSystemConsole {
  status: string;
  title: string;
  bullets: string[];
  action: string;
}

export interface Project {
  id?: string;
  slug: string;
  number: string;
  category: string;
  title: string;
  headline: string;
  summary: string;
  stage: string;
  filter: string;
  tags: string[];
  caseStudyHref: string | null;
  system: string;
  capabilities: string[];
  integrations: string[];
  outcomes: string[];
  cta: string;
  href: string;
  media_url?: string | null;
  opportunityTitle?: string;
  opportunityCopy?: string;
  conceptStatus?: string;
  workflow?: ProjectWorkflowStep[];
  systemDirectionTitle?: string;
  systemDirectionCopy?: string;
  systemConsole?: ProjectSystemConsole;
  buildVersionTitle?: string;
  icon?: any;
}

export const staticProjects = [
  {
    slug: "alexa-business-agent",
    number: "01",
    category: "AI automation & agents",
    title: "Alexa AI Business Agent",
    headline: "One agent for every customer conversation.",
    summary: "A connected business agent that brings enquiries from social, messaging, and web channels into one operating flow—then captures leads, schedules follow-ups, tracks orders, and escalates the decisions that need a person.",
    stage: "CreativeX product concept",
    filter: "AI agents",
    tags: ["Omnichannel AI", "Lead operations", "Human handoff"],
    caseStudyHref: "/projects/alexa-business-agent",
    system: "Omnichannel agent workspace",
    capabilities: ["Lead capture and qualification", "Automated follow-ups and reminders", "Order status and customer support"],
    integrations: ["WhatsApp, Facebook, Instagram, and TikTok", "Business websites and commerce platforms", "CRM, order, and team workspaces"],
    outcomes: ["Fewer missed enquiries", "Consistent customer follow-through", "Clear human oversight and handoffs"],
    cta: "Try the Alexa demo",
    href: "/#studio",
    icon: Bot,
  },
  {
    slug: "export-control-tower",
    number: "02",
    category: "Export & logistics",
    title: "Export Operations Control Tower",
    headline: "See the shipment, document, and exception in one place.",
    summary: "A shared operational layer for teams managing bookings, documents, milestones, customer updates, and delivery exceptions across fragmented carrier and internal systems.",
    stage: "Representative engagement",
    filter: "Operations",
    tags: ["Logistics", "Predictive alerts", "Workflow"],
    caseStudyHref: null,
    system: "Operations intelligence platform",
    capabilities: ["Shipment milestone visibility", "Document and compliance workflows", "Predictive exception alerts"],
    integrations: ["Carrier and freight systems", "ERP and document repositories", "Customer communication channels"],
    outcomes: ["Earlier exception response", "Less repetitive coordination", "Clearer customer communication"],
    cta: "Discuss a logistics project",
    href: "/#contact",
    icon: Ship,
  },
  {
    slug: "smart-facility-hub",
    number: "03",
    category: "Hospitality & smart facilities",
    title: "Smart Facility Operations Hub",
    headline: "Turn building signals into coordinated action.",
    summary: "A connected workspace that combines occupancy, energy, equipment health, guest requests, and staff workflows so facility teams can spot problems early and respond with context.",
    stage: "Representative engagement",
    filter: "IoT",
    tags: ["Connected facilities", "IoT", "Field operations"],
    caseStudyHref: null,
    system: "Smart facility command center",
    capabilities: ["IoT monitoring and alerting", "Preventive maintenance workflows", "Guest and staff service automation"],
    integrations: ["Sensors and building systems", "Property and maintenance platforms", "Mobile tools for field teams"],
    outcomes: ["Earlier maintenance action", "Better service coordination", "More efficient facility operations"],
    cta: "Discuss a smart facility project",
    href: "/#contact",
    icon: Building2,
  },
  {
    slug: "retail-intelligence",
    number: "04",
    category: "Retail & distribution",
    title: "Retail Demand & Fulfilment Intelligence",
    headline: "Connect demand, stock, orders, and frontline decisions.",
    summary: "A practical decision platform for teams balancing inventory, warehouse capacity, fulfilment exceptions, and changing customer demand across stores and distribution channels.",
    stage: "Representative engagement",
    filter: "Operations",
    tags: ["Retail", "Forecasting", "Fulfilment"],
    caseStudyHref: null,
    system: "Distribution decision platform",
    capabilities: ["Demand and inventory forecasting", "Order exception orchestration", "Warehouse and field mobile workflows"],
    integrations: ["POS and commerce platforms", "ERP and warehouse systems", "Delivery and customer service tools"],
    outcomes: ["Better replenishment decisions", "Faster order resolution", "Fewer operational surprises"],
    cta: "Discuss a retail project",
    href: "/#contact",
    icon: Store,
  },
  {
    slug: "ai-saas-platform",
    number: "05",
    category: "Startups & SaaS products",
    title: "AI-Native SaaS Launch Platform",
    headline: "Move from product idea to dependable software.",
    summary: "A production-ready foundation for an AI-native software product, covering the core user experience, governed model behavior, cloud delivery, product analytics, and the operating tools needed to learn from real customers.",
    stage: "Representative engagement",
    filter: "Product",
    tags: ["AI product", "Cloud", "SaaS engineering"],
    caseStudyHref: null,
    system: "AI-native cloud product",
    capabilities: ["AI product discovery and prototyping", "Secure web and API engineering", "Evaluation, analytics, and observability"],
    integrations: ["Model and retrieval platforms", "Identity, billing, and CRM systems", "Cloud infrastructure and delivery tooling"],
    outcomes: ["Faster product learning", "A credible production foundation", "Clearer roadmap decisions"],
    cta: "Discuss a SaaS product",
    href: "/#contact",
    icon: Rocket,
  },
];

const iconMap: Record<string, any> = {
  "alexa-business-agent": Bot,
  "export-control-tower": Ship,
  "smart-facility-hub": Building2,
  "retail-intelligence": Store,
  "ai-saas-platform": Rocket,
};

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await supabaseSelect<any>("projects", { order: "number.asc" });
    if (!data || data.length === 0) return staticProjects;
    return data.map((proj: any) => ({
      ...proj,
      tags: proj.tags || [],
      capabilities: proj.capabilities || [],
      integrations: proj.integrations || [],
      outcomes: proj.outcomes || [],
      opportunityTitle: proj.opportunity_title,
      opportunityCopy: proj.opportunity_copy,
      conceptStatus: proj.concept_status,
      workflow: proj.workflow,
      systemDirectionTitle: proj.system_direction_title,
      systemDirectionCopy: proj.system_direction_copy,
      systemConsole: proj.system_console,
      buildVersionTitle: proj.build_version_title,
      icon: iconMap[proj.slug] || HelpCircle
    }));
  } catch (err: any) {
    console.error("Error fetching projects:", err?.message);
    return staticProjects;
  }
}
