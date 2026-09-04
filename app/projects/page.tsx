import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProjectGallery } from "@/components/project-gallery";
import { SiteFooter, SiteHeader } from "@/components/site-header";

const baseUrl = "https://creativex-ai.kavishkathilakarathn.chatgpt.site";

export const metadata: Metadata = {
  title: "AI Agents & Software Engineering Projects | CreativeX Technology AI",
  description: "Discover CreativeX Technology AI projects—from enterprise AI business agents and export logistics control towers to smart facility hubs and AI-native SaaS platforms.",
  alternates: {
    canonical: "/projects",
    languages: { "en-US": `${baseUrl}/projects`, "x-default": `${baseUrl}/projects` },
  },
  openGraph: {
    title: "AI & Software Engineering Projects | CreativeX Technology AI",
    description: "Explore operational AI agents, smart facility platforms, logistics control towers, and SaaS product engineering by CreativeX.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  const projectsBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${baseUrl}/projects` },
    ],
  };

  return (
    <main id="top" className="site-shell projects-page">
      <a className="skip-link" href="#projects-content">Skip to projects</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsBreadcrumbJsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader activeSection="projects" />
      <div id="projects-content">
        <section className="projects-page-hero">
          <div className="projects-page-grid" aria-hidden="true" />
          <div className="site-width projects-page-hero-inner">
            <p className="section-index">CreativeX projects / 2026</p>
            <div>
              <p className="projects-hero-kicker">AI systems · Software products · Connected operations</p>
              <h1>Work designed to operate.</h1>
              <p>Explore representative systems across AI, logistics, connected facilities, retail, and SaaS. Open an available case study for the full product story.</p>
              <a href="#project-gallery">Browse projects <ArrowDownRight /></a>
            </div>
          </div>
          <div className="projects-page-word" aria-hidden="true">WORK</div>
        </section>

        <div id="project-gallery"><ProjectGallery /></div>

        <section className="projects-page-cta">
          <div className="site-width projects-page-cta-grid">
            <p className="section-index">Have a workflow in mind?</p>
            <div><h2>Let’s design the system behind it.</h2><Link href="/#contact">Start a project conversation <ArrowUpRight /></Link></div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
