import { Bot, Building2, Rocket, Ship, Store, HelpCircle, Car } from "lucide-react";
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
  hasCaseStudy?: boolean;
  has_case_study?: boolean;
  caseStudyHref?: string | null;
  case_study_href?: string | null;
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
  published?: boolean;
  is_published?: boolean;
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
    hasCaseStudy: true,
    caseStudyHref: "/projects/alexa-business-agent",
    system: "Omnichannel agent workspace",
    capabilities: ["Lead capture and qualification", "Automated follow-ups and reminders", "Order status and customer support"],
    integrations: ["WhatsApp, Facebook, Instagram, and TikTok", "Business websites and commerce platforms", "CRM, order, and team workspaces"],
    outcomes: ["Fewer missed enquiries", "Consistent customer follow-through", "Clear human oversight and handoffs"],
    cta: "Try the Alexa demo",
    href: "/#studio",
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
    hasCaseStudy: false,
    caseStudyHref: null,
    system: "Operations intelligence platform",
    capabilities: ["Shipment milestone visibility", "Document and compliance workflows", "Predictive exception alerts"],
    integrations: ["Carrier and freight systems", "ERP and document repositories", "Customer communication channels"],
    outcomes: ["Earlier exception response", "Less repetitive coordination", "Clearer customer communication"],
    cta: "Discuss a logistics project",
    href: "/#contact",
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
    hasCaseStudy: false,
    caseStudyHref: null,
    system: "Smart facility command center",
    capabilities: ["IoT monitoring and alerting", "Preventive maintenance workflows", "Guest and staff service automation"],
    integrations: ["Sensors and building systems", "Property and maintenance platforms", "Mobile tools for field teams"],
    outcomes: ["Earlier maintenance action", "Better service coordination", "More efficient facility operations"],
    cta: "Discuss a smart facility project",
    href: "/#contact",
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
    hasCaseStudy: false,
    caseStudyHref: null,
    system: "Distribution decision platform",
    capabilities: ["Demand and inventory forecasting", "Order exception orchestration", "Warehouse and field mobile workflows"],
    integrations: ["POS and commerce platforms", "ERP and warehouse systems", "Delivery and customer service tools"],
    outcomes: ["Better replenishment decisions", "Faster order resolution", "Fewer operational surprises"],
    cta: "Discuss a retail project",
    href: "/#contact",
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
    hasCaseStudy: false,
    caseStudyHref: null,
    system: "AI-native cloud product",
    capabilities: ["AI product discovery and prototyping", "Secure web and API engineering", "Evaluation, analytics, and observability"],
    integrations: ["Model and retrieval platforms", "Identity, billing, and CRM systems", "Cloud infrastructure and delivery tooling"],
    outcomes: ["Faster product learning", "A credible production foundation", "Clearer roadmap decisions"],
    cta: "Discuss a SaaS product",
    href: "/#contact",
  },
  {
    slug: "luxury-car-sales-experience",
    number: "06",
    category: "Automotive & UI/UX",
    title: "Black Badge Luxury Car Sales Experience",
    headline: "Reimagining the Digital Car Showroom",
    summary: "Luxury automotive buyers expect more than a standard product catalogue. The goal was to create a web experience that communicates performance, exclusivity, and craftsmanship from the first interaction while still making vehicle discovery, configuration, and customer enquiries simple and intuitive.",
    stage: "UI/UX · Motion Direction",
    filter: "Product",
    tags: ["Automotive", "Web Design", "UI/UX", "Luxury"],
    hasCaseStudy: true,
    caseStudyHref: "/projects/luxury-car-sales-experience",
    system: "Luxury Vehicle Experience System",
    capabilities: ["UI & UX Design Strategy", "Responsive Web Design", "Lead Generation UX"],
    integrations: ["Vehicle Inventory / CMS", "Dealer CRM", "Contact & Enquiry Forms"],
    outcomes: ["Premium digital brand presence", "More engaging vehicle discovery", "Clear Model Navigation"],
    cta: "Create Your Digital Showroom",
    href: "/contact?project=automotive-web-experience",
    opportunityTitle: "Reimagining the Digital Car Showroom",
    opportunityCopy: "Luxury automotive buyers expect more than a standard product catalogue. The goal was to create a web experience that communicates performance, exclusivity, and craftsmanship from the first interaction while still making vehicle discovery, configuration, and customer enquiries simple and intuitive.\n\nThe design uses high-impact vehicle photography, generous whitespace, dark editorial panels, subtle typography, and motion-led transitions to create a premium showroom experience across desktop and responsive screens.",
    conceptStatus: "UI/UX · Motion Direction",
    workflow: [
      { number: "01", title: "Discover Models", copy: "Browse available vehicles and collections through an immersive model-first interface." },
      { number: "02", title: "Explore Vehicle", copy: "View key specifications, design details, performance highlights, and media." },
      { number: "03", title: "Configure Your Car", copy: "Personalize colours, trims, wheels, interior options, and selected packages." },
      { number: "04", title: "Request Enquiry", copy: "Connect product interest directly with a sales or dealership enquiry." },
      { number: "05", title: "Dealer Follow-Up", copy: "Route qualified customer enquiries to the relevant sales team for follow-up." },
    ],
    systemDirectionTitle: "Designed Like a Digital Showroom",
    systemDirectionCopy: "The visual system balances minimal luxury with interactive storytelling. Large-format vehicle imagery remains the focal point while restrained typography, monochrome surfaces, motion transitions, and structured calls to action guide users through the experience without overwhelming the product.\n\nThe interface was designed around reusable automotive components, allowing the same system to support multiple models, vehicle categories, campaigns, specifications, and dealership actions.",
    systemConsole: {
      status: "DIGITAL SHOWROOM / ONLINE",
      title: "Luxury Vehicle Experience System",
      bullets: [
        "Interactive vehicle discovery",
        "Motion-driven model presentations",
        "Vehicle specification modules",
        "Model and category filtering",
        "Custom configuration journey",
        "Dealer enquiry integration",
        "Responsive showroom experience",
        "Conversion-focused CTA system",
      ],
      action: "Explore the Experience",
    },
    buildVersionTitle: "Build Your Automotive Sales Experience",
  },
];

const iconMap: Record<string, any> = {
  "alexa-business-agent": Bot,
  "export-control-tower": Ship,
  "smart-facility-hub": Building2,
  "retail-intelligence": Store,
  "ai-saas-platform": Rocket,
  "luxury-car-sales-experience": Car,
  "black-badge-luxury-car-sales": Car,
};

const HIDDEN_PROJECTS_KEY = "creativex_hidden_project_slugs";

export function getHiddenProjectSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HIDDEN_PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setProjectHiddenInStorage(slug: string, hidden: boolean): string[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getHiddenProjectSlugs();
    const normalized = slug.toLowerCase().trim();
    let updated: string[];
    if (hidden) {
      updated = Array.from(new Set([...current, normalized]));
    } else {
      updated = current.filter((s) => s.toLowerCase().trim() !== normalized);
    }
    localStorage.setItem(HIDDEN_PROJECTS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function isProjectPublished(project: Project): boolean {
  if (!project.slug) return true;
  const normalized = project.slug.toLowerCase().trim();
  const hiddenSlugs = getHiddenProjectSlugs();
  if (hiddenSlugs.includes(normalized)) return false;
  if (project.published === false || project.is_published === false) return false;
  return true;
}

export function getProjectIcon(slug?: string) {
  if (!slug) return HelpCircle;
  const normalized = slug.toLowerCase().trim();
  return iconMap[normalized] || iconMap[slug] || HelpCircle;
}

export async function getProjects(includeHidden: boolean = false): Promise<Project[]> {
  const hiddenSlugs = getHiddenProjectSlugs();

  const filterHidden = (list: Project[]) => {
    if (includeHidden) return list;
    return list.filter((p) => {
      const slugNorm = p.slug?.toLowerCase().trim();
      if (slugNorm && hiddenSlugs.includes(slugNorm)) return false;
      return p.published !== false && p.is_published !== false;
    });
  };

  try {
    const data = await supabaseSelect<any>("projects", { order: "number.asc" });
    if (!data || data.length === 0) {
      return filterHidden(staticProjects as Project[]);
    }
    
    const dbProjects = data.map((proj: any) => {
      const staticMatch = staticProjects.find((sp) => sp.slug.toLowerCase().trim() === proj.slug?.toLowerCase().trim());
      const hasCS = proj.has_case_study ?? proj.hasCaseStudy ?? staticMatch?.hasCaseStudy ?? (proj.case_study_href !== null && proj.case_study_href !== "" && proj.caseStudyHref !== null && proj.caseStudyHref !== "");
      const csHref = hasCS ? (proj.case_study_href ?? proj.caseStudyHref ?? staticMatch?.caseStudyHref ?? `/projects/${proj.slug}`) : null;
      
      const slugNorm = proj.slug?.toLowerCase().trim();
      const isHiddenInStorage = slugNorm ? hiddenSlugs.includes(slugNorm) : false;
      const isPub = isHiddenInStorage ? false : (proj.published ?? proj.is_published ?? true);
      
      const { icon: _icon, ...restProj } = proj;
      return {
        ...staticMatch,
        ...restProj,
        published: isPub,
        is_published: isPub,
        tags: proj.tags || staticMatch?.tags || [],
        capabilities: proj.capabilities || staticMatch?.capabilities || [],
        integrations: proj.integrations || staticMatch?.integrations || [],
        outcomes: proj.outcomes || staticMatch?.outcomes || [],
        hasCaseStudy: hasCS,
        caseStudyHref: csHref,
        opportunityTitle: proj.opportunity_title || proj.opportunityTitle || staticMatch?.opportunityTitle,
        opportunityCopy: proj.opportunity_copy || proj.opportunityCopy || staticMatch?.opportunityCopy,
        conceptStatus: proj.concept_status || proj.conceptStatus || staticMatch?.conceptStatus,
        workflow: proj.workflow || staticMatch?.workflow,
        systemDirectionTitle: proj.system_direction_title || proj.systemDirectionTitle || staticMatch?.systemDirectionTitle,
        systemDirectionCopy: proj.system_direction_copy || proj.systemDirectionCopy || staticMatch?.systemDirectionCopy,
        systemConsole: proj.system_console || proj.systemConsole || staticMatch?.systemConsole,
        buildVersionTitle: proj.build_version_title || proj.buildVersionTitle || staticMatch?.buildVersionTitle,
      };
    });

    return filterHidden(dbProjects);
  } catch (err: any) {
    console.error("Error fetching projects:", err?.message);
    return filterHidden(staticProjects as Project[]);
  }
}




