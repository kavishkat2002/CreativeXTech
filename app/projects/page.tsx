import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProjectGallery } from "@/components/project-gallery";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { staticProjects } from "@/lib/projects";

const baseUrl = "https://creativexlab.online";

export const metadata: Metadata = {
  title: "AI Agents & Software Engineering Projects | CreativeX Technology AI",
  description: "Discover CreativeX Technology AI projects—from enterprise AI business agents and export logistics control towers to smart facility hubs and AI-native SaaS platforms.",
  alternates: {
    canonical: `${baseUrl}/projects`,
    languages: { "en-US": `${baseUrl}/projects`, "x-default": `${baseUrl}/projects` },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "AI & Software Engineering Projects | CreativeX Technology AI",
    description: "Explore operational AI agents, smart facility platforms, logistics control towers, and SaaS product engineering by CreativeX.",
    url: `${baseUrl}/projects`,
    type: "website",
    siteName: "CreativeX Technology AI",
    images: [{ url: `${baseUrl}/brand/creativex-robot-lockup.webp`, width: 1200, height: 630, alt: "CreativeX Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Software Engineering Projects | CreativeX Technology AI",
    description: "Explore operational AI agents, smart facility platforms, logistics control towers, and SaaS product engineering by CreativeX.",
    images: [`${baseUrl}/brand/creativex-robot-lockup.webp`],
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

  const projectsCatalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CreativeX AI & Software Engineering Projects",
    description: "Enterprise project portfolio covering AI agents, smart facilities, logistics control towers, and SaaS platforms.",
    itemListElement: staticProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      description: project.summary,
      url: `${baseUrl}/projects/${project.slug}`,
    })),
  };

  return (
    <main id="top" className="site-shell projects-page">
      <a className="skip-link" href="#projects-content">Skip to projects</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsBreadcrumbJsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsCatalogJsonLd).replace(/</g, "\\u003c") }} />
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
              <a className="contact-action" href="#project-gallery">Browse projects <ArrowDownRight /></a>
            </div>
          </div>
          <div className="projects-page-word" aria-hidden="true">WORK</div>
        </section>

        <div id="project-gallery"><ProjectGallery /></div>

        <section className="projects-page-cta">
          <div className="site-width projects-page-cta-grid">
            <p className="section-index">Have a workflow in mind?</p>
            <div><h2>Let’s design the system behind it.</h2><Link className="contact-action" href="/#contact">Start a project conversation <ArrowUpRight /></Link></div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
