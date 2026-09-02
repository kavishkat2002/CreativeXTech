"use client";

import { useState } from "react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";

import { projects } from "@/lib/projects";

const filters = ["All", "AI agents", "Operations", "IoT", "Product"] as const;

export function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const visibleProjects = activeFilter === "All" ? projects : projects.filter((project) => project.filter === activeFilter);

  return (
    <section className="projects-gallery-section" aria-labelledby="projects-gallery-title">
      <div className="site-width">
        <div className="project-filter-bar">
          <div><p className="section-index">Selected systems / 01—05</p><h2 id="projects-gallery-title">Explore the work.</h2></div>
          <div className="project-filters" role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button type="button" aria-pressed={activeFilter === filter} className={activeFilter === filter ? "active" : ""} key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>
            ))}
          </div>
        </div>

        <div className="project-card-grid" aria-live="polite">
          {visibleProjects.map((project, index) => {
            const Icon = project.icon;
            const cardContent = <>
              <div className="project-card-visual" aria-hidden="true"><span className="project-card-number">{project.number}</span><Icon /><span className="project-card-orbit" /><span className="project-card-signal">CX / SYSTEM</span></div>
              <div className="project-card-body">
                <div className="project-card-status"><span>{project.category}</span>{project.caseStudyHref ? <strong><i /> Case study available</strong> : <strong className="pending"><LockKeyhole /> Concept overview</strong>}</div>
                <h3>{project.title}</h3><p>{project.summary}</p>
                <div className="project-card-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-card-action"><span>{project.caseStudyHref ? "View case study" : "Discuss a similar project"}</span><ArrowUpRight /></div>
              </div>
            </>;

            return <a className={`project-card ${index === 0 && activeFilter === "All" ? "project-card-featured" : ""}`} href={project.caseStudyHref ?? "/#contact"} key={project.slug} aria-label={`${project.caseStudyHref ? "View case study" : "Discuss a similar project"}: ${project.title}`}>{cardContent}</a>;
          })}
        </div>
      </div>
    </section>
  );
}
