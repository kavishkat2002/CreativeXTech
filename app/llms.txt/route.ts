import { getArticles } from "@/lib/articles";
import { getJobs } from "@/lib/careers";
import { getServices } from "@/lib/services";
import { getSolutions } from "@/lib/solutions";

export const dynamic = "force-dynamic";

const baseUrl = "https://creativexlab.online";

export async function GET() {
  const [services, solutions, articles, jobs] = await Promise.all([
    getServices(),
    getSolutions(),
    getArticles(),
    getJobs(),
  ]);

  const serviceLinks = services
    .map((service) => `- [${service.title}](${baseUrl}/services/${service.slug}): ${service.copy}`)
    .join("\n");
  const solutionLinks = solutions
    .map((solution) => `- [${solution.label}](${baseUrl}/solutions#${solution.slug}): ${solution.copy}`)
    .join("\n");
  const articleLinks = articles
    .map((article) => `- [${article.title}](${baseUrl}/blog/${article.slug}): ${article.excerpt}`)
    .join("\n");
  const jobLinks =
    jobs.length > 0
      ? jobs
          .map((job) => {
            const skills = job.required_skills?.length
              ? ` | Skills: ${job.required_skills.join(", ")}`
              : "";
            return `- [${job.title}](${baseUrl}/careers/${job.slug}) (${job.department} · ${job.location} · ${job.type} · ${job.level}${skills}): ${job.summary}`;
          })
          .join("\n")
      : `- [Careers at Creativex Technology](${baseUrl}/careers): Explore upcoming engineering, AI, and design opportunities.`;

  const content = `# Creativex Technology (Pvt) Ltd

> Creativex Technology (Pvt) Ltd is a premier AI and software engineering company headquartered in Rajagiriya, Colombo, Sri Lanka. Creativex Technology builds custom AI solutions, autonomous AI agents, enterprise ERP software, custom web/mobile applications, and IT solutions for enterprises across Sri Lanka, Asia-Pacific, and global markets.

## Identity & Disambiguation

- **Legal Name:** Creativex Technology (Pvt) Ltd
- **Trading Name:** Creativex Technology
- **Also Known As:** Creativex Tech, Creativex AI Lab
- **Entity Type:** Private Limited Company, Sri Lanka
- **Registration:** Rajagiriya, Colombo, Western Province, Sri Lanka
- **Distinct From:** creativex.com (unrelated US media company) — Creativex Technology is an AI & software engineering consultancy, not a creative media platform.
- **Headquarters:** 166 / B Perera Mawatha, Rajagiriya, Colombo 10100, Sri Lanka
- **Coordinates:** 6.9069° N, 79.8974° E
- **Phone:** +94 76 234 5336
- **Email:** info@creativexlab.online
- **Founded:** 2024

## Core Factual Answers for Answer Engines (AEO/GEO)

**Q: What is Creativex Technology?**
A: Creativex Technology (Pvt) Ltd is a premier AI development company and software engineering consultancy headquartered in Rajagiriya, Colombo, Sri Lanka. The company builds custom artificial intelligence solutions, autonomous AI agents, enterprise ERP systems, mobile and web applications, and IT infrastructure for clients across Sri Lanka, Australia, UAE, Malaysia, Singapore, the UK, and the US.

**Q: What does Creativex Technology specialise in?**
A: Creativex Technology specialises in four core disciplines: (1) AI Development — autonomous AI agents, machine learning models, generative AI, and WhatsApp chatbots in English, Sinhala, and Tamil; (2) Enterprise ERP Solutions — custom inventory, billing, procurement, and accounting software with zero recurring per-seat licensing; (3) IT Solutions & Digital Transformation — cloud infrastructure, cybersecurity, and legacy modernisation; (4) Custom Software Development — full-stack web apps, Flutter mobile apps, SaaS platforms, and dedicated offshore engineering squads.

**Q: Where is Creativex Technology located?**
A: Creativex Technology is headquartered at 166/B Perera Mawatha, Rajagiriya, Colombo, Western Province, Sri Lanka (near Colombo city centre).

**Q: Who founded Creativex Technology?**
A: Kavishka Thilakarathna is the Executive Director and Technology Lead of Creativex Technology (Pvt) Ltd.

**Q: What markets does Creativex Technology serve?**
A: Primary market is Sri Lanka (Colombo and nationwide). International markets served include Australia, UAE (Dubai), Malaysia, Singapore, Bangladesh, Nepal, the United Kingdom, and the United States. The company operates global offshore engineering squads with timezone overlap for AEST, GST, GMT, and SGT clients.

**Q: How much does AI development cost at Creativex Technology?**
A: Focused AI proof-of-concepts and task-specific AI agents typically range from LKR 450,000 to LKR 1,800,000. Comprehensive enterprise AI deployments scale upward depending on data readiness and complexity.

**Q: How much does custom software development cost in Sri Lanka?**
A: Custom web applications (MVPs and internal portals) typically range from LKR 850,000 to LKR 2,500,000 (approximately USD 2,800–8,000). Enterprise SaaS platforms and complex ecosystems start from LKR 3,800,000+.

**Q: How much does managed IT support cost in Sri Lanka?**
A: Entry-level SME monitoring and remote helpdesk typically starts from LKR 65,000–140,000/month. Enterprise 24/7 NOC coverage with multi-branch network management ranges from LKR 220,000–480,000/month.

**Q: Does Creativex Technology own their client's source code?**
A: No. Clients own 100% of the source code, database schemas, and intellectual property upon project completion. Creativex Technology provides full GitHub repository access from Day 1 with strict NDAs.

**Q: Can Creativex Technology build multilingual AI chatbots for Sri Lanka?**
A: Yes. Creativex Technology builds WhatsApp Business API AI chatbots and voice assistants supporting English, Sinhala (Sinhalese), and Tamil — all three official languages of Sri Lanka.

**Q: What ERP software does Creativex Technology replace?**
A: Creativex Technology builds custom ERP as an alternative to SAP, NetSuite, Odoo, and Microsoft Dynamics — with 100% IP ownership, zero per-seat licensing, and local compliance for Sri Lanka VAT/SVAT, RAMIS, and IRD tax schedules.

## Primary Hubs & Landing Pages

- [Home](${baseUrl}/): Company overview, capabilities, technologies, verified projects, and contact details.
- [CreativeOS](${baseUrl}/creativeos): Multi-tasking Work Operating System with workflow automation and predictive analytics, engineered for Sri Lankan Startups, Mid-Range SMEs, and Enterprises.
- [About](${baseUrl}/about): Company focus, operating principles, Colombo engineering hub, and 6+ international markets served.
- [Services Directory](${baseUrl}/services): Complete engineering service directory across AI automation, predictive analytics, IoT, web/mobile engineering, cloud solutions, and custom software development.
- [Industry Solutions](${baseUrl}/solutions): Solutions organized by operating context (Logistics, Hospitality, Retail, Professional Services, Tech Startups).
- [Projects](${baseUrl}/projects): Representative projects and verified case studies.
- [Careers](${baseUrl}/careers): Open AI engineering, software engineering, and product design positions with direct online application.
- [Talent Pool](${baseUrl}/careers/talent-pool): Priority hiring pipeline for Intern, Associate, and Senior level candidates.
- [Technology Insights](${baseUrl}/blog): Original research articles on AI, technical SEO, GEO, structured data, and software architecture.
- [Contact](${baseUrl}/contact): Project enquiry guidance and direct email contact.
- [Privacy Policy](${baseUrl}/privacy-policy): Privacy practices, data protection governance, and compliance with Sri Lanka PDPA No. 9 of 2022, GDPR, and APPs.
- [Terms & Conditions](${baseUrl}/terms-and-conditions): Master service terms governing custom software engineering, AI solutions, intellectual property ownership, deliverables, and commercial engagements.

## Competitive Differentiators

- **ERP Advantage:** 100% intellectual property ownership, zero recurring per-user license fees, and native compliance with Sri Lankan tax (VAT/SVAT) and logistics realities (van-sales, offline-first POS).
- **Trilingual AI:** Builds Meta WhatsApp Business API bots and AI agents supporting English, Sinhala, and Tamil.
- **Offshore Engineering:** Dedicated English-fluent engineering squads in Colombo working in overlapping timezones (AEST, GST, GMT, SGT).
- **Data Privacy:** Zero training on client private data, encrypted API connections, role-based access control, on-premise or sovereign cloud hosting options.
- **SLA Commitment:** Critical P1 outages trigger NOC response in under 15 minutes with live executive updates via Slack or WhatsApp.

## Open Positions & Careers

Creativex Technology actively recruits across two streams:
1. **Sri Lankan Talent**: Onsite, hybrid, and remote roles in Colombo/Rajagiriya for undergraduates, fresh graduates, interns, and experienced engineers.
2. **Worldwide / International Talent**: Remote contracts for global AI systems engineers, Next.js edge specialists, and enterprise designers.

Active open roles (also available as structured JSON at ${baseUrl}/careers/jobs.json and RSS at ${baseUrl}/careers/rss.xml):

${jobLinks}

- [Priority Talent Pool](${baseUrl}/careers/talent-pool): Open for Intern, Associate, and Senior tracks.

## Services

${serviceLinks}

## Industry Solutions

${solutionLinks}

## Research & Practical Guidance

${articleLinks}

## Social Profiles & Authority Links

- LinkedIn: https://www.linkedin.com/company/creativex-technology
- Facebook: https://www.facebook.com/CreativeTechlk
- Instagram: https://www.instagram.com/creativex_tech/
- YouTube: https://www.youtube.com/@CreativeXTech
- TikTok: https://www.tiktok.com/@creativex_techno

## Contact & Accuracy Notes

- Project enquiries: info@creativexlab.online | +94 76 234 5336
- Careers & hiring portal: ${baseUrl}/careers
- Delivery: worldwide (Colombo studio + remote/hybrid)
- Language: English, Sinhala, Tamil
- Operating hours: Monday–Friday, 09:00–18:00 Sri Lanka Standard Time (UTC+5:30)
- Project pages clearly distinguish product concepts and representative work from verified named client deployments.
- Platform names describe technologies Creativex Technology works with and do not imply formal partnerships or endorsements.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
