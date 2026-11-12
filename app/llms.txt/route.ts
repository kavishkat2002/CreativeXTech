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
      : `- [Careers at CreativeX Technology AI](${baseUrl}/careers): Explore upcoming engineering, AI, and design opportunities.`;

  const content = `# CreativeX Technology AI

> CreativeX Technology AI is an AI and software engineering company that designs dependable AI agents, predictive analytics, IoT systems, cloud platforms, and web and mobile products around real business operations.

CreativeX works globally with organizations in export and logistics, hospitality and smart facilities, retail and distribution, professional services, and startups building SaaS products. Engagements connect strategy, product design, engineering, system integration, human oversight, and measurable delivery.

## Primary pages

- [Home](${baseUrl}/): Company overview, capabilities, technologies, projects, delivery method, and contact details.
- [About](${baseUrl}/about): Company focus, operating principles, capabilities, and industries.
- [Services](${baseUrl}/services): Complete AI and software engineering service directory.
- [Industry solutions](${baseUrl}/solutions): Solutions organized by operating context.
- [Projects](${baseUrl}/projects): Representative projects and product concepts.
- [Careers](${baseUrl}/careers): Open AI engineering, software engineering, and product design positions with direct online application.
- [Talent Pool](${baseUrl}/careers/talent-pool): Priority hiring pipeline for Intern, Associate, and Senior level candidates across AI, engineering, design, and B2B growth.
- [Technology insights](${baseUrl}/blog): Original articles on AI, SEO, GEO, structured data, performance, and dependable software.
- [Contact](${baseUrl}/contact): Project enquiry guidance and direct email contact.

## Open positions & careers

CreativeX Technology (Pvt) Ltd is an AI and software engineering consultancy headquartered in Rajagiriya, Colombo, Sri Lanka, operating global squads for clients in Australia, UAE, Malaysia, Singapore, and the US.

CreativeX actively recruits across two core streams:
1. **Sri Lankan Talent**: Onsite, hybrid, and remote roles in Colombo/Rajagiriya for undergraduates, fresh graduates, interns, and experienced engineers from leading institutions (University of Moratuwa, SLIIT, IIT, University of Colombo, etc.).
2. **Worldwide / International Talent**: Remote contracts for global AI systems engineers, Next.js edge specialists, and enterprise designers working asynchronously with overlap in South Asian / Gulf / APAC timezones.

All roles feature transparent compensation (LKR for local talent, USD/competitive global market rates for international specialists), direct online application, and automated ATS matching.

Active open roles (also available as structured JSON at ${baseUrl}/careers/jobs.json and RSS at ${baseUrl}/careers/rss.xml):

${jobLinks}

- [Priority Talent Pool](${baseUrl}/careers/talent-pool): Open for Intern, Associate, and Senior tracks. Candidates can submit their credentials directly to be routed to squad leads.

## Services

${serviceLinks}

## Industry solutions

${solutionLinks}

## Research and practical guidance

${articleLinks}

## Contact and accuracy notes

- Project enquiries: info@creativexlab.online
- Careers & hiring portal: ${baseUrl}/careers
- Delivery: worldwide (Colombo studio + remote/hybrid)
- Language: English
- Project pages clearly distinguish product concepts and representative work from verified named client deployments.
- Platform names describe technologies CreativeX works with and do not imply formal partnerships or endorsements.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
