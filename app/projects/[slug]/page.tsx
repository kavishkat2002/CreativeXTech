"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, CircleDot, HelpCircle, MessageCircleMore, Network, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getSupabaseClient } from "@/lib/supabase-client";
import { staticProjects, type Project } from "@/lib/projects";

function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function load() {
      setLoading(true);

      // 1. Try Supabase first
      try {
        const client = await getSupabaseClient();
        const { data, error } = await client
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .single();

        if (!error && data) {
          setProject({
            ...data,
            tags: data.tags || [],
            capabilities: data.capabilities || [],
            integrations: data.integrations || [],
            outcomes: data.outcomes || [],
            opportunityTitle: data.opportunity_title,
            opportunityCopy: data.opportunity_copy,
            conceptStatus: data.concept_status,
            workflow: data.workflow,
            systemDirectionTitle: data.system_direction_title,
            systemDirectionCopy: data.system_direction_copy,
            systemConsole: data.system_console,
            buildVersionTitle: data.build_version_title,
            icon: HelpCircle,
          });
          setLoading(false);
          return;
        }
      } catch {
        // fall through to static
      }

      // 2. Fall back to static data
      const staticMatch = staticProjects.find((p) => p.slug === slug);
      if (staticMatch) {
        setProject(staticMatch as Project);
        setLoading(false);
        return;
      }

      // 3. Not found
      setNotFoundState(true);
      setLoading(false);
    }

    load();
  }, [slug]);

  if (loading) {
    return (
      <main className="site-shell">
        <SiteHeader activeSection="projects" />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #eee", borderTopColor: "#111", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        </div>
        <SiteFooter />
      </main>
    );
  }

  if (notFoundState || !project) {
    return (
      <main className="site-shell">
        <SiteHeader activeSection="projects" />
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, textAlign: "center", padding: "0 24px" }}>
          <p style={{ font: "700 10px/1 var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(11,12,11,.4)" }}>404</p>
          <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 590, letterSpacing: "-.06em", lineHeight: .9, margin: 0 }}>Project not found.</h1>
          <p style={{ maxWidth: 420, color: "rgba(11,12,11,.55)", fontSize: 16, lineHeight: 1.7, margin: 0 }}>This project may have been removed or the URL may be incorrect.</p>
          <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 14, borderBottom: "2px solid currentColor", paddingBottom: 2 }}>
            <ArrowLeft size={16} /> Back to all projects
          </Link>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const workflow = Array.isArray(project.workflow) ? project.workflow : [];
  const capabilities = project.capabilities || [];
  const outcomes = project.outcomes || [];
  const tags = project.tags || [];

  return (
    <main id="top" className="site-shell case-study-page">
      <a className="skip-link" href="#case-study-content">Skip to case study</a>
      <SiteHeader activeSection="projects" />

      <div id="case-study-content">
        {/* HERO */}
        <section className="case-study-hero">
          <div className="case-study-grid" aria-hidden="true" />
          <div className="site-width">
            <Link className="case-study-back" href="/projects"><ArrowLeft /> All projects</Link>
            <div className="case-study-hero-layout">
              <div className="case-study-mark" aria-hidden="true">
                {project.media_url && /\.(mp4|webm)/i.test(project.media_url) ? (
                  <video src={project.media_url} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                ) : project.media_url ? (
                  <img src={project.media_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                ) : (
                  <span style={{ fontSize: 32, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{project.number}</span>
                )}
                <span>{project.number} / CX</span>
              </div>
              <div>
                <p className="section-index">{project.stage} · {project.category}</p>
                <h1>{project.title}</h1>
                <p>{project.headline}</p>
                {tags.length > 0 && (
                  <div className="case-study-pills">
                    {tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* OPPORTUNITY */}
        {(project.opportunityTitle || project.opportunityCopy) && (
          <section className="case-study-intro">
            <div className="site-width case-study-two-col">
              <p className="section-index">The opportunity / 01</p>
              <div>
                {project.opportunityTitle && <h2>{project.opportunityTitle}</h2>}
                {project.opportunityCopy && <p>{project.opportunityCopy}</p>}
                {project.conceptStatus && (
                  <aside>
                    <strong>Concept status</strong>
                    <span>{project.conceptStatus}</span>
                  </aside>
                )}
              </div>
            </div>
          </section>
        )}

        {/* WORKFLOW */}
        {workflow.length > 0 && (
          <section className="case-study-workflow">
            <div className="site-width">
              <div className="case-study-section-head">
                <p className="section-index">Connected workflow / 02</p>
                <h2>From first message to accountable next step.</h2>
              </div>
              <div className="case-study-workflow-grid">
                {workflow.map((step: any) => (
                  <article key={step.number}>
                    <span>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SYSTEM DIRECTION */}
        {(project.systemDirectionTitle || project.systemDirectionCopy) && (
          <section className="case-study-system">
            <div className="site-width case-study-system-grid">
              <div>
                <p className="section-index">System direction / 03</p>
                {project.systemDirectionTitle && <h2>{project.systemDirectionTitle}</h2>}
                {project.systemDirectionCopy && <p>{project.systemDirectionCopy}</p>}
              </div>
              {project.systemConsole && (
                <div className="case-study-console" aria-label="Illustrative agent workspace">
                  {/* Top bar */}
                  <div className="case-study-console-top">
                    <span>
                      <i />
                      {project.systemConsole.status
                        ? project.systemConsole.status.toUpperCase()
                        : `${(project.system || "AGENT").toUpperCase()} / LIVE WORKSPACE`}
                    </span>
                    <strong>{project.systemConsole.title || "Human review on"}</strong>
                  </div>

                  {/* Body */}
                  <div className="case-study-console-body">
                    {/* Sidebar nav icons */}
                    <div className="case-study-console-nav">
                      <MessageCircleMore />
                      <Network />
                      <ShieldCheck />
                    </div>

                    {/* Content */}
                    <div>
                      <p>{project.category || "System review queue"}</p>
                      <h3>{project.headline || project.title}</h3>

                      {/* Bullets as styled list items */}
                      {project.systemConsole.bullets && project.systemConsole.bullets.length > 0 && (
                        <ul>
                          {project.systemConsole.bullets.map((bullet: string, i: number) => (
                            <li key={i}>
                              <CircleDot />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Action button */}
                      {project.systemConsole.action && (
                        <button type="button">
                          {project.systemConsole.action} <ArrowUpRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Fallback: no systemConsole but has system direction — show a clean placeholder */}
              {!project.systemConsole && (project.systemDirectionTitle || project.systemDirectionCopy) && (
                <div className="case-study-console" aria-label="System overview">
                  <div className="case-study-console-top">
                    <span><i /> {(project.system || "SYSTEM").toUpperCase()} / OVERVIEW</span>
                    <strong>In development</strong>
                  </div>
                  <div className="case-study-console-body">
                    <div className="case-study-console-nav">
                      <MessageCircleMore />
                      <Network />
                      <ShieldCheck />
                    </div>
                    <div>
                      <p>{project.category}</p>
                      <h3>{project.headline || project.title}</h3>
                      {project.capabilities?.slice(0, 3).map((cap: string, i: number) => (
                        <ul key={i}><li><CircleDot />{cap}</li></ul>
                      ))}
                      <button type="button">Request a demo <ArrowUpRight size={14} /></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CAPABILITIES */}
        {(capabilities.length > 0 || outcomes.length > 0) && (
          <section className="case-study-capabilities">
            <div className="site-width case-study-capabilities-grid">
              <p className="section-index">Designed capabilities / 04</p>
              <div>
                {capabilities.concat(outcomes).map((item: string, index: number) => (
                  <div key={item}>
                    <span>0{index + 1}</span>
                    <Check />
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SUMMARY / FALLBACK */}
        {!project.opportunityTitle && !workflow.length && !project.systemDirectionTitle && (
          <section className="case-study-intro">
            <div className="site-width case-study-two-col">
              <p className="section-index">About this project / 01</p>
              <div>
                <h2>{project.headline}</h2>
                <p>{project.summary}</p>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="case-study-next">
          <div className="site-width">
            <p className="section-index">{project.buildVersionTitle || "Start your project"}</p>
            <h2>Build your version.</h2>
            <Link href="/#contact">
              {project.cta || "Discuss this project"} <ArrowUpRight />
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}

export default ProjectDetailPage;
