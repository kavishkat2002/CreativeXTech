import { articles } from "@/lib/articles";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";

const baseUrl = "https://creativex-ai.kavishkathilakarathn.chatgpt.site";

export function GET() {
  const serviceLinks = services.map((service) => `- [${service.title}](${baseUrl}/services/${service.slug}): ${service.copy}`).join("\n");
  const solutionLinks = solutions.map((solution) => `- [${solution.label}](${baseUrl}/solutions#${solution.slug}): ${solution.copy}`).join("\n");
  const articleLinks = articles.map((article) => `- [${article.title}](${baseUrl}/blog/${article.slug}): ${article.excerpt}`).join("\n");

  const content = `# CreativeX Technology AI

> CreativeX Technology AI is an AI and software engineering company that designs dependable AI agents, predictive analytics, IoT systems, cloud platforms, and web and mobile products around real business operations.

CreativeX works globally with organizations in export and logistics, hospitality and smart facilities, retail and distribution, professional services, and startups building SaaS products. Engagements connect strategy, product design, engineering, system integration, human oversight, and measurable delivery.

## Primary pages

- [Home](${baseUrl}/): Company overview, capabilities, technologies, projects, delivery method, and contact details.
- [About](${baseUrl}/about): Company focus, operating principles, capabilities, and industries.
- [Services](${baseUrl}/services): Complete AI and software engineering service directory.
- [Industry solutions](${baseUrl}/solutions): Solutions organized by operating context.
- [Projects](${baseUrl}/projects): Representative projects and product concepts.
- [Technology insights](${baseUrl}/blog): Original articles on AI, SEO, GEO, structured data, performance, and dependable software.
- [Contact](${baseUrl}/contact): Project enquiry guidance and direct email contact.

## Services

${serviceLinks}

## Industry solutions

${solutionLinks}

## Research and practical guidance

${articleLinks}

## Contact and accuracy notes

- Project enquiries: info@creativexlab.online
- Delivery: worldwide
- Language: English
- Project pages clearly distinguish product concepts and representative work from verified named client deployments.
- Platform names describe technologies CreativeX works with and do not imply formal partnerships or endorsements.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
