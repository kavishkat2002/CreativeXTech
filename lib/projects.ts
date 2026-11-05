import { Bot, Building2, Rocket, Ship, Store, HelpCircle, Car, User } from "lucide-react";
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
  {
    slug: "swiftdrive-car-rentals",
    number: "07",
    category: "Mobility & Car Rentals",
    title: "SwiftDrive Self-Drive Car Rentals",
    headline: "Self-Drive Car Rentals in Negombo, Sri Lanka",
    summary: "A modern fleet reservation platform for tourist and local vehicle rentals in Sri Lanka—featuring real-time vehicle availability check, curbside airport handover, transparent LKR tariffs, verified deposits, and 24/7 delivery.",
    stage: "Live Platform · Web & Booking Engine",
    filter: "Product",
    tags: ["Car Rental", "Booking System", "Fleet Management", "Sri Lanka", "Negombo"],
    hasCaseStudy: true,
    caseStudyHref: "/projects/swiftdrive-car-rentals",
    system: "Fleet Booking & Curbside Dispatch System",
    capabilities: [
      "Real-time fleet availability & rate check",
      "24/7 Bandaranaike Airport (CMB) curbside handover",
      "Zero hidden fees with verified deposit calculation",
      "Mobile-first responsive fleet catalogue",
    ],
    integrations: [
      "Fleet & vehicle inventory database",
      "Curbside airport handover logistics",
      "Direct WhatsApp & reservation concierge",
    ],
    outcomes: [
      "100% verified roadworthy fleet assurance",
      "Transparent LKR tariffs with zero hidden booking fees",
      "Frictionless airport arrival and return handover",
    ],
    cta: "Explore SwiftDrive Platform",
    href: "/contact?project=swiftdrive-rentals",
    media_url: "/images/swiftdrive-rentals.jpg",
    opportunityTitle: "Modernising Car Rental & Airport Handover in Sri Lanka",
    opportunityCopy: "Travelers visiting Sri Lanka often struggle with opaque car rental pricing, uncertain vehicle condition, and cumbersome airport handovers.\n\nSwiftDrive Rentals addresses this by offering a transparent, digital-first self-drive platform tailored for Sri Lanka. With real-time database availability check for Bandaranaike Airport (CMB) curbside handover, clear LKR tariffs, zero hidden booking fees, and 24/7 delivery, international and local travelers can reserve reliable vehicles with complete confidence.",
    conceptStatus: "Live Platform · Web & Reservation System",
    workflow: [
      { number: "01", title: "Select Location & Dates", copy: "Choose pickup and return dates with convenient handover at Bandaranaike Airport (CMB) curbside or Negombo." },
      { number: "02", title: "Check Real-Time Availability", copy: "Filter across economy hatchbacks, SUVs, passenger vans, and luxury vehicles with live fleet status." },
      { number: "03", title: "Transparent Pricing & Terms", copy: "Review upfront LKR tariffs, verified security deposits, and standard rental terms without hidden extras." },
      { number: "04", title: "Curbside Airport Handover", copy: "Meet the SwiftDrive handover team directly at the terminal with rapid document verification." },
      { number: "05", title: "Total Freedom on the Road", copy: "Drive across Sri Lanka's coastal highways, cultural triangle, and hill country with 24/7 roadside assistance." },
    ],
    systemDirectionTitle: "Engineered for Tourism & Fleet Reliability",
    systemDirectionCopy: "The user experience centers around transparency and speed. A prominent reservation widget lets visitors instantly check vehicle availability and rates based on their arrival dates and preferred vehicle category.\n\nThe UI combines clear typography, trust signals (100% verified fleet, 24/7 handover, zero hidden fees), and a responsive layout that works flawlessly for travelers on mobile devices planning their journey on the go.",
    systemConsole: {
      status: "RESERVATION SYSTEM / ONLINE",
      title: "SwiftDrive Fleet & Booking Console",
      bullets: [
        "Real-time vehicle availability query",
        "CMB airport curbside handover coordination",
        "Transparent LKR tariff calculator",
        "Tiered fleet categories (Economy, SUV, Van, Luxury)",
        "Mobile-first booking and enquiry journey",
        "WhatsApp direct concierge integration",
        "Verified deposit and documentation check",
        "24/7 roadside assistance coordination",
      ],
      action: "Visit SwiftDrive Platform",
    },
    buildVersionTitle: "Build Your Mobility & Fleet Platform",
  },
  {
    slug: "thimathi-dissanayake-portfolio",
    number: "08",
    category: "Web Design / Personal Branding",
    title: "Thimathi Dissanayake Portfolio",
    headline: "Software Engineer & Product Designer Portfolio",
    summary: "A high-impact personal portfolio designed to showcase software engineering, UI/UX product design, academic research, and technical work in one polished digital experience. The website combines a strong personal brand with interactive project storytelling and conversion-focused contact pathways.",
    stage: "Live Portfolio · Web Design & Product Engineering",
    filter: "Product",
    tags: ["Personal Branding", "Web Design", "UI/UX", "Product Design", "Software Engineering"],
    hasCaseStudy: true,
    caseStudyHref: "/projects/thimathi-dissanayake-portfolio",
    system: "Personal Branding & Portfolio System",
    capabilities: [
      "Interactive personal branding & portfolio showcase",
      "Curated services, engineering projects & research repository",
      "Integrated CV download & direct contact concierge",
      "Responsive desktop & mobile editorial design",
    ],
    integrations: [
      "ResearchGate & academic publications",
      "GitHub, LinkedIn, Instagram, and social channels",
      "Direct booking & enquiry contact system",
    ],
    outcomes: [
      "High-impact digital presence for software engineering and product design",
      "Clear navigation across Services, Portfolio, About, and Research",
      "Direct client & collaborator engagement pathways",
    ],
    cta: "Explore Thimathi's Portfolio",
    href: "/contact?project=thimathi-dissanayake-portfolio",
    media_url: "/images/thimathi-dissanayake-portfolio.jpg",
    opportunityTitle: "Elevating the Software Engineer & Product Designer Presence",
    opportunityCopy: "Engineers and product designers often struggle to present their full range of technical depth, product vision, academic research, and client services in a unified digital space.\n\nThimathi Dissanayake's portfolio solves this by creating a balanced, minimalist personal brand identity. It provides clear pathways to explore specialized software engineering services, featured case studies, published research, and direct contact options, establishing credibility and professional authority from the first view.",
    conceptStatus: "Live Platform · Personal Branding & Web Design",
    workflow: [
      { number: "01", title: "Brand Identity & Hero Direction", copy: "Introduce the professional persona with bold typography, custom TD monogram, and an inviting call to action." },
      { number: "02", title: "Services & Capabilities", copy: "Outline core disciplines spanning software development, product design, and architectural engineering." },
      { number: "03", title: "Project Case Studies", copy: "Showcase completed client engagements, design prototypes, and engineering solutions with rich media." },
      { number: "04", title: "Research & Publications", copy: "Connect academic work, research papers, and technical contributions with verified external links." },
      { number: "05", title: "Direct Contact & Collaboration", copy: "Facilitate direct enquiries, CV downloads, and networking via structured communication channels." },
    ],
    systemDirectionTitle: "Minimalist Editorial Design for Digital Creators",
    systemDirectionCopy: "The visual direction pairs clean typography with subtle arched geometric elements and soft ambient lighting. High-contrast portraiture and restrained layout accents highlight technical expertise without clutter, ensuring smooth navigation across both desktop and mobile devices.",
    systemConsole: {
      status: "PORTFOLIO / ONLINE",
      title: "Thimathi Dissanayake Digital Presence",
      bullets: [
        "Custom monogram & personal identity system",
        "Services directory and offering modules",
        "Project showcase and case study gallery",
        "Research papers and technical publications",
        "Direct CV download and social links",
        "Dark/light mode support and accessible contrast",
        "Responsive multi-device layout",
        "Conversion-focused 'Come on let's talk' CTA",
      ],
      action: "View Portfolio Experience",
    },
    buildVersionTitle: "Build Your Personal Brand & Portfolio",
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
  "swiftdrive-car-rentals": Car,
  "thimathi-dissanayake-portfolio": User,
  "ai-engineer-personal-portfolio": User,
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

    const dbSlugs = new Set(data.map((proj: any) => proj.slug?.toLowerCase().trim()));
    const missingStatic = staticProjects.filter(
      (sp) => !dbSlugs.has(sp.slug?.toLowerCase().trim())
    );
    const allProjects = [...dbProjects, ...missingStatic];

    return filterHidden(allProjects as Project[]);
  } catch (err: any) {
    console.error("Error fetching projects:", err?.message);
    return filterHidden(staticProjects as Project[]);
  }
}




