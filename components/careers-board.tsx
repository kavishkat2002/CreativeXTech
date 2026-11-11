"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Briefcase,
  CheckCircle2,
  Cpu,
  FileSearch,
  Layers,
  MapPin,
  Search,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import type { ATSResult, JobPost } from "@/lib/careers";
import { staticJobs } from "@/lib/careers";
import {
  analyzeApplicationATS,
  detectATSSignals,
  extractTextFromResumeFile,
} from "@/lib/ats";
import { getSupabaseClient } from "@/lib/supabase-client";

const DEPARTMENT_ICONS: Record<string, typeof Cpu> = {
  "AI & Agents": Bot,
  "Product Engineering": Cpu,
  "Design & UX": Layers,
};

export function CareersBoard({ initialJobs }: { initialJobs: JobPost[] }) {
  const [jobs, setJobs] = useState<JobPost[]>(
    initialJobs.length > 0 ? initialJobs : staticJobs
  );
  const [activeDepartment, setActiveDepartment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Optional candidate ATS resume matcher state
  const [matcherOpen, setMatcherOpen] = useState<boolean>(false);
  const [resumeText, setResumeText] = useState<string>("");
  const [resumeFileName, setResumeFileName] = useState<string>("");
  const [extractWarning, setExtractWarning] = useState<string>("");
  const [onlyMatchedRoles, setOnlyMatchedRoles] = useState<boolean>(false);
  const [parsingFile, setParsingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadLiveJobs() {
      try {
        const client = await getSupabaseClient();
        const { data, error } = await client
          .from("jobs")
          .select("*")
          .order("number", { ascending: true });
        if (!error && Array.isArray(data) && data.length > 0) {
          const published = data.filter((j: JobPost) => j.published !== false);
          if (published.length > 0) {
            setJobs(published);
          }
        }
      } catch {
        // Keep initialJobs fallback
      }
    }
    loadLiveJobs();
  }, []);

  const departments = useMemo(() => {
    const unique = Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)));
    return ["All", ...unique];
  }, [jobs]);

  const atsSignals = useMemo(() => {
    if (!resumeText.trim()) return null;
    return detectATSSignals(resumeText);
  }, [resumeText]);

  const handleResumeUpload = async (file: File) => {
    setParsingFile(true);
    setExtractWarning("");
    setResumeFileName(file.name);
    try {
      const result = await extractTextFromResumeFile(file);
      if (result.text) {
        setResumeText(result.text);
      }
      if (result.warning) {
        setExtractWarning(result.warning);
      }
    } catch {
      setExtractWarning(
        "Unable to read file automatically. Please paste your resume text below."
      );
    } finally {
      setParsingFile(false);
    }
  };

  const enrichedJobs = useMemo(() => {
    const hasResume = resumeText.trim().length >= 15;
    const query = searchQuery.trim().toLowerCase();

    const list = jobs
      .filter((job) => {
        if (activeDepartment !== "All" && job.department !== activeDepartment) {
          return false;
        }
        if (query) {
          const haystack = [
            job.title,
            job.department,
            job.location,
            job.summary,
            job.description,
            ...(job.required_skills ?? []),
          ]
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(query)) return false;
        }
        return true;
      })
      .map((job) => {
        const ats: ATSResult | null = hasResume
          ? analyzeApplicationATS(job, resumeText)
          : null;
        return { job, ats };
      })
      .filter((item) => {
        if (onlyMatchedRoles && item.ats) {
          return item.ats.score >= item.ats.threshold;
        }
        return true;
      });

    if (hasResume) {
      list.sort((a, b) => (b.ats?.score ?? 0) - (a.ats?.score ?? 0));
    }

    return list;
  }, [jobs, activeDepartment, searchQuery, resumeText, onlyMatchedRoles]);

  return (
    <section
      id="open-roles"
      className="careers-board-section"
      aria-labelledby="careers-board-title"
    >
      <div className="site-width">
        <div className="careers-board-head">
          <div>
            <p className="section-index">
              Open positions / {String(enrichedJobs.length).padStart(2, "0")}
            </p>
            <h2 id="careers-board-title">Build systems that ship.</h2>
          </div>

          <div className="careers-controls">
            <div className="careers-search-box">
              <Search size={15} aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles, skills, or stack..."
                aria-label="Search open positions"
              />
            </div>

            <button
              type="button"
              onClick={() => setMatcherOpen((prev) => !prev)}
              className={`careers-ats-toggle ${matcherOpen || resumeText.trim() ? "active" : ""}`}
            >
              <Sparkles size={14} aria-hidden="true" />
              <span>
                {resumeText.trim()
                  ? "ATS Matcher Active"
                  : "Match Resume with ATS"}
              </span>
            </button>
          </div>
        </div>

        {/* Department filter pills */}
        <div className="careers-filters" role="group" aria-label="Filter by department">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              aria-pressed={activeDepartment === dept}
              className={activeDepartment === dept ? "active" : ""}
              onClick={() => setActiveDepartment(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Smart ATS Job Matcher Drawer */}
        {matcherOpen && (
          <div className="careers-ats-matcher" role="region" aria-label="ATS Resume Matcher">
            <div className="careers-ats-matcher-top">
              <div>
                <span>AUTOMATIC ATS DETECTION &amp; JD FILTER</span>
                <h3>Drop your CV to rank &amp; filter matching job descriptions.</h3>
              </div>
              <button
                type="button"
                className="careers-ats-close"
                onClick={() => setMatcherOpen(false)}
                aria-label="Close ATS matcher"
              >
                <X size={16} />
              </button>
            </div>

            <div className="careers-ats-matcher-grid">
              <div className="careers-ats-upload-col">
                <label className="careers-dropzone">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt,.md"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleResumeUpload(f);
                    }}
                    className="sr-only"
                  />
                  <Upload size={20} />
                  <strong>
                    {parsingFile
                      ? "Extracting text & detecting ATS signals..."
                      : resumeFileName || "Upload CV / Resume (PDF, DOCX, TXT)"}
                  </strong>
                  <span>
                    Instant client-side parsing — your data stays private until you apply.
                  </span>
                </label>

                {extractWarning && (
                  <p className="careers-ats-warning">{extractWarning}</p>
                )}

                {atsSignals && (
                  <div className="careers-ats-signals">
                    <div className="careers-ats-signals-head">
                      <FileSearch size={14} />
                      <span>ATS Structure Detected · {atsSignals.atsFormatScore}%</span>
                    </div>
                    <div className="careers-ats-signal-pills">
                      <span className={atsSignals.hasEmail ? "ok" : ""}>
                        Email {atsSignals.hasEmail ? "✓" : "—"}
                      </span>
                      <span className={atsSignals.hasExperienceSection ? "ok" : ""}>
                        Experience {atsSignals.hasExperienceSection ? "✓" : "—"}
                      </span>
                      <span className={atsSignals.hasSkillsSection ? "ok" : ""}>
                        Skills {atsSignals.hasSkillsSection ? "✓" : "—"}
                      </span>
                      <span className="ok">{atsSignals.wordCount} words</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="careers-ats-text-col">
                <label htmlFor="careers-matcher-textarea">
                  Extracted or Pasted Resume / Skills Text
                </label>
                <textarea
                  id="careers-matcher-textarea"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume summary, experience, or core skills (e.g., Next.js, TypeScript, LLM, AI Agents, RAG, Supabase, Figma)..."
                  rows={5}
                />
                <div className="careers-ats-matcher-actions">
                  <label className="careers-ats-checkbox">
                    <input
                      type="checkbox"
                      checked={onlyMatchedRoles}
                      onChange={(e) => setOnlyMatchedRoles(e.target.checked)}
                    />
                    <span>Filter out roles below ATS threshold</span>
                  </label>
                  {resumeText && (
                    <button
                      type="button"
                      className="careers-ats-clear"
                      onClick={() => {
                        setResumeText("");
                        setResumeFileName("");
                        setExtractWarning("");
                        setOnlyMatchedRoles(false);
                      }}
                    >
                      Clear resume
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Grid */}
        {enrichedJobs.length === 0 ? (
          <div className="careers-empty">
            <Briefcase size={28} />
            <h3>No matching roles found.</h3>
            <p>
              Try clearing your search or department filter, or reach out via our contact page for speculative AI &amp; engineering introductions.
            </p>
            <div className="careers-empty-actions">
              <button
                type="button"
                onClick={() => {
                  setActiveDepartment("All");
                  setSearchQuery("");
                  setOnlyMatchedRoles(false);
                }}
              >
                Reset filters
              </button>
              <Link href="/contact">
                Send open application <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="careers-card-grid">
            {enrichedJobs.map(({ job, ats }, index) => {
              const Icon = DEPARTMENT_ICONS[job.department] ?? Briefcase;
              const isFeatured = index === 0 && activeDepartment === "All" && !searchQuery;

              return (
                <Link
                  key={job.slug}
                  href={`/careers/${job.slug}`}
                  className={`career-card ${isFeatured ? "career-card-featured" : ""}`}
                >
                  <div className="career-card-visual" aria-hidden="true">
                    {job.media_url ? (
                      <>
                        <img
                          src={job.media_url}
                          alt={job.title}
                          className="career-card-cover-img"
                        />
                        <div className="career-card-img-scrim" />
                      </>
                    ) : (
                      <>
                        <Icon />
                        <span className="career-card-orbit" />
                      </>
                    )}
                    <span className="career-card-number">{job.number}</span>
                    <span className="career-card-dept-tag">{job.department}</span>
                  </div>

                  <div className="career-card-body">
                    <div className="career-card-meta-row">
                      <span className="career-card-location">
                        <MapPin size={12} /> {job.location}
                      </span>
                      <span className="career-card-type">
                        {job.type} · {job.level}
                      </span>
                    </div>

                    {ats && (
                      <div
                        className={`career-ats-pill ${
                          ats.verdict === "shortlisted"
                            ? "pass"
                            : ats.verdict === "review"
                            ? "review"
                            : "low"
                        }`}
                      >
                        <CheckCircle2 size={12} />
                        <span>
                          {ats.score}% ATS Match ·{" "}
                          {ats.verdict === "shortlisted"
                            ? "Strong Fit"
                            : ats.verdict === "review"
                            ? "Partial Match"
                            : "Low JD Match"}
                        </span>
                      </div>
                    )}

                    <h3>{job.title}</h3>
                    <p>{job.summary}</p>

                    <div className="career-card-skills">
                      {(job.required_skills ?? []).slice(0, 6).map((skill) => {
                        const isMatched = ats?.matchedSkills.includes(skill);
                        return (
                          <span
                            key={skill}
                            className={isMatched ? "skill-matched" : ""}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>

                    <div className="career-card-footer">
                      <span>
                        {job.salary_range ? job.salary_range : `ATS Threshold: ${job.ats_threshold}%`}
                      </span>
                      <strong>
                        View JD &amp; Apply <ArrowUpRight size={15} />
                      </strong>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

