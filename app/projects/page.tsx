import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProjectGallery } from "@/components/project-gallery";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Projects | CreativeX Technology AI",
  description: "Explore CreativeX AI agents, intelligent operations, IoT, data, and software product work.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "CreativeX AI & Software Projects", description: "Representative AI agents, intelligent operations, IoT, data, and software product work.", url: "/projects", type: "website" },
};

export default function ProjectsPage() {
  return (
    <main id="top" className="site-shell projects-page">
      <a className="skip-link" href="#projects-content">Skip to projects</a>
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
