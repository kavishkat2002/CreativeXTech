"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

import { staticProjects, getProjects, getProjectIcon, Project } from "@/lib/projects";

const filters = ["All", "AI agents", "Operations", "IoT", "Product"] as const;

export function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [projects, setProjects] = useState<Project[]>(staticProjects as Project[]);

  useEffect(() => {
    getProjects().then(data => {
      if (data.length > 0) setProjects(data);
    });
  }, []);

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
            const Icon = getProjectIcon(project.slug);
            const isCaseStudyAvailable = project.hasCaseStudy === true && Boolean(project.caseStudyHref && project.caseStudyHref !== "/contact" && project.caseStudyHref !== "/#contact");
            const targetHref = isCaseStudyAvailable ? project.caseStudyHref! : "/contact";
            const actionText = isCaseStudyAvailable ? "View case study" : (project.cta || "Discuss a similar project");

            return (
              <a
                className={`project-card ${index === 0 && activeFilter === "All" ? "project-card-featured" : ""}`}
                href={targetHref}
                key={project.slug}
                aria-label={`View project: ${project.title}`}
              >
                <div className="project-card-visual" aria-hidden="true">
                  {project.media_url ? (
                    /\.(mp4|webm)/i.test(project.media_url) ? (
                      <video
                        src={project.media_url}
                        autoPlay muted loop playsInline
                        className="project-card-cover-video"
                      />
                    ) : (
                      <img
                        src={project.media_url}
                        alt=""
                        className="project-card-cover-img"
                      />
                    )
                  ) : (
                    <>
                      <span className="project-card-number">{project.number}</span>
                      <Icon />
                      <span className="project-card-orbit" />
                      <span className="project-card-signal">CX / SYSTEM</span>
                    </>
                  )}
                </div>
                <div className="project-card-body">
                  <div className="project-card-status">
                    <span>{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-card-tags">
                    {(project.tags || []).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-card-action">
                    <span>{actionText}</span>
                    <ArrowUpRight />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
