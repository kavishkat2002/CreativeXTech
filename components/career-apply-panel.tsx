"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Check,
  CheckCircle2,
  FileText,
  Filter,
  Loader2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Upload,
  XCircle,
} from "lucide-react";

import type { ATSResult, JobApplication, JobPost } from "@/lib/careers";
import { analyzeApplicationATS, extractTextFromResumeFile } from "@/lib/ats";
import { getSupabaseClient, isLocalAdminMode } from "@/lib/supabase-client";

type JDFilterTab = "all" | "matched" | "gaps";

export function CareerApplyPanel({
  slug,
  initialJob,
}: {
  slug: string;
  initialJob: JobPost | null;
}) {
  const [job, setJob] = useState<JobPost | null>(initialJob);
  const [loadingJob, setLoadingJob] = useState<boolean>(!initialJob);
  const [jdFilter, setJdFilter] = useState<JDFilterTab>("all");

  // Application form fields
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [extractWarning, setExtractWarning] = useState("");
  const [parsingFile, setParsingFile] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedApp, setSubmittedApp] = useState<{
    application: JobApplication;
    ats: ATSResult;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function hydrateJob() {
      try {
        const client = await getSupabaseClient();
        const { data } = await client
          .from("jobs")
          .select("*")
          .eq("slug", slug)
          .single();
        if (data) {
          setJob(data as JobPost);
        }
      } catch {
        // ignore
      } finally {
        setLoadingJob(false);
      }
    }
    hydrateJob();
  }, [slug]);

  const liveATS = useMemo<ATSResult | null>(() => {
    if (!job) return null;
    if (resumeText.trim().length < 15 && coverLetter.trim().length < 20) {
      return null;
    }
    const yearsNum = yearsExperience ? Number(yearsExperience) : undefined;
    return analyzeApplicationATS(job, resumeText, {
      coverLetter,
      yearsExperience: Number.isFinite(yearsNum) ? yearsNum : undefined,
    });
  }, [job, resumeText, coverLetter, yearsExperience]);

  const handleResumeUpload = async (file: File) => {
    setParsingFile(true);
    setExtractWarning("");
    setResumeFileName(file.name);

    try {
      // 1. Extract text for automatic ATS detection & JD filtering
      const extracted = await extractTextFromResumeFile(file);
      if (extracted.text) {
        setResumeText(extracted.text);
      }
      if (extracted.warning) {
        setExtractWarning(extracted.warning);
      }

      // 2. Upload resume file to Supabase storage (or local mock storage)
      try {
        const client = await getSupabaseClient();
        const ext = file.name.split(".").pop() || "pdf";
        const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-");
        const path = `resumes/${safeSlug}-${Date.now()}.${ext}`;
        const { error: uploadErr } = await client.storage
          .from("project_media")
          .upload(path, file);
        if (!uploadErr) {
          const { data: urlData } = client.storage
            .from("project_media")
            .getPublicUrl(path);
          if (urlData?.publicUrl) {
            setResumeUrl(urlData.publicUrl);
          }
        }
      } catch {
        // Non-fatal if storage upload fails while text extraction succeeded
      }
    } catch {
      setExtractWarning(
        "Unable to read file automatically. Include your key skills and experience in your cover letter for ATS analysis."
      );
    } finally {
      setParsingFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    setSubmitError("");

    if (!applicantName.trim() || !applicantEmail.trim()) {
      setSubmitError("Please enter your full name and email address.");
      return;
    }
    if (coverLetter.trim().length < 100) {
      setSubmitError(
        `Cover letter is mandatory and must be at least 100 characters (currently ${coverLetter.trim().length} characters).`
      );
      return;
    }

    const effectiveResumeText = resumeText.trim() || coverLetter.trim();

    setSubmitting(true);
    try {
      const yearsNum = yearsExperience ? Number(yearsExperience) : undefined;
      const atsResult = analyzeApplicationATS(job, effectiveResumeText, {
        coverLetter,
        yearsExperience: Number.isFinite(yearsNum) ? yearsNum : undefined,
      });

      const payload: JobApplication = {
        job_id: job.id,
        job_slug: job.slug,
        job_title: job.title,
        applicant_name: applicantName.trim(),
        applicant_email: applicantEmail.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        linkedin_url: linkedinUrl.trim() || undefined,
        portfolio_url: portfolioUrl.trim() || undefined,
        years_experience: Number.isFinite(yearsNum) ? yearsNum : undefined,
        resume_filename: resumeFileName || undefined,
        resume_url: resumeUrl || undefined,
        resume_text: effectiveResumeText,
        cover_letter: coverLetter.trim(),
        ats_score: atsResult.score,
        ats_status: atsResult.verdict,
        ats_matched_skills: atsResult.matchedSkills,
        ats_missing_skills: atsResult.missingSkills,
        ats_bonus_skills: atsResult.bonusSkills,
        ats_jd_matches: atsResult.jdRequirementMatches,
        ats_signals: atsResult.detectedSignals,
        ats_summary: atsResult.summary,
        status: atsResult.verdict === "shortlisted" ? "shortlisted" : "new",
        created_at: new Date().toISOString(),
      };

      const client = await getSupabaseClient();
      const localMode = isLocalAdminMode();

      if (!localMode) {
        const res = await fetch("/api/careers/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            job_snapshot: job,
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Failed to submit application.");
        }
        setSubmittedApp({
          application: json.application ?? payload,
          ats: json.ats ?? atsResult,
        });
      } else {
        const { error } = await client
          .from("job_applications")
          .insert([payload]);
        if (error) throw error;
        setSubmittedApp({ application: payload, ats: atsResult });
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit application.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingJob) {
    return (
      <div className="site-width career-loading-state">
        <Loader2 className="animate-spin" size={24} />
        <span>Loading role &amp; ATS configuration...</span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="site-width career-not-found">
        <p className="section-index">Role unavailable</p>
        <h1>This position was closed or not found.</h1>
        <Link href="/careers" className="career-back-btn">
          <ArrowLeft size={16} /> Back to open roles
        </Link>
      </div>
    );
  }

  const filteredRequirements = (() => {
    if (!liveATS) {
      return (job.requirements ?? []).map((text) => ({
        text,
        type: "requirement" as const,
        matched: false,
        matchRatio: 0,
        matchedTerms: [] as string[],
        missingTerms: [] as string[],
      }));
    }
    const reqs = liveATS.jdRequirementMatches.filter(
      (item) => item.type === "requirement"
    );
    if (jdFilter === "matched") return reqs.filter((r) => r.matched);
    if (jdFilter === "gaps") return reqs.filter((r) => !r.matched);
    return reqs;
  })();

  const filteredResponsibilities = (() => {
    if (!liveATS) {
      return (job.responsibilities ?? []).map((text) => ({
        text,
        type: "responsibility" as const,
        matched: false,
        matchRatio: 0,
        matchedTerms: [] as string[],
        missingTerms: [] as string[],
      }));
    }
    const resps = liveATS.jdRequirementMatches.filter(
      (item) => item.type === "responsibility"
    );
    if (jdFilter === "matched") return resps.filter((r) => r.matched);
    if (jdFilter === "gaps") return resps.filter((r) => !r.matched);
    return resps;
  })();

  return (
    <>
      {/* Hero */}
      <header className="career-detail-hero">
        <div className="careers-hero-grid" aria-hidden="true" />
        <div className="site-width">
          <Link className="career-back-link" href="/careers">
            <ArrowLeft size={15} /> All open positions
          </Link>

          <div className="career-detail-hero-grid">
            <div>
              <div className="career-detail-badges">
                <span>{job.number}</span>
                <span>{job.department}</span>
                <span>ATS Threshold: {job.ats_threshold}%</span>
              </div>
              <h1>{job.title}</h1>
              <p className="career-detail-summary">{job.summary}</p>

              <div className="career-detail-meta">
                <span>
                  <MapPin size={14} /> {job.location}
                </span>
                <span>
                  <Briefcase size={14} /> {job.type} · {job.level}
                </span>
                {job.salary_range && (
                  <span>
                    <Sparkles size={14} /> {job.salary_range}
                  </span>
                )}
              </div>
            </div>

            {job.media_url && (
              <div className="career-detail-hero-media">
                <img src={job.media_url} alt={job.title} />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main 2-column Job Description + Live ATS & Application Form */}
      <section className="career-detail-body">
        <div className="site-width career-detail-layout">
          {/* Left Column: Job Description + ATS-Filtered Breakdown */}
          <div className="career-jd-column">
            {/* Live ATS JD Filter Bar */}
            <div className="career-jd-filter-bar">
              <div className="career-jd-filter-title">
                <Filter size={15} />
                <span>
                  {liveATS
                    ? `Job Description Filtered by Your Resume (${liveATS.jdMatchPercentage}% JD Coverage)`
                    : "Job Description & Requirements (Upload CV on the right to auto-filter)"}
                </span>
              </div>

              {liveATS && (
                <div className="career-jd-filter-tabs" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={jdFilter === "all"}
                    className={jdFilter === "all" ? "active" : ""}
                    onClick={() => setJdFilter("all")}
                  >
                    All ({liveATS.jdRequirementMatches.length})
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={jdFilter === "matched"}
                    className={jdFilter === "matched" ? "active" : ""}
                    onClick={() => setJdFilter("matched")}
                  >
                    Matched (
                    {liveATS.jdRequirementMatches.filter((m) => m.matched).length}
                    )
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={jdFilter === "gaps"}
                    className={jdFilter === "gaps" ? "active" : ""}
                    onClick={() => setJdFilter("gaps")}
                  >
                    Gaps (
                    {liveATS.jdRequirementMatches.filter((m) => !m.matched).length}
                    )
                  </button>
                </div>
              )}
            </div>

            <div className="career-jd-block">
              <p className="career-jd-eyebrow">01 / Role Overview</p>
              <h2>About the role</h2>
              <p className="career-jd-prose">{job.description}</p>
            </div>

            <div className="career-jd-block">
              <p className="career-jd-eyebrow">02 / Core Stack &amp; ATS Skills</p>
              <h2>Required skills</h2>
              <div className="career-jd-skill-chips">
                {(job.required_skills ?? []).map((skill) => {
                  const matched = liveATS?.matchedSkills.includes(skill);
                  const missing = liveATS?.missingSkills.includes(skill);
                  return (
                    <span
                      key={skill}
                      className={
                        matched ? "matched" : missing ? "missing" : ""
                      }
                    >
                      {matched && <Check size={12} />}
                      {missing && <XCircle size={12} />}
                      {skill}
                    </span>
                  );
                })}
              </div>

              {(job.nice_to_have ?? []).length > 0 && (
                <>
                  <h3 className="career-jd-subheading">Nice to have</h3>
                  <div className="career-jd-skill-chips secondary">
                    {job.nice_to_have.map((skill) => {
                      const matched = liveATS?.bonusSkills.includes(skill);
                      return (
                        <span
                          key={skill}
                          className={matched ? "matched" : ""}
                        >
                          {matched && <Check size={12} />}
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="career-jd-block">
              <p className="career-jd-eyebrow">03 / Requirements</p>
              <h2>What we look for</h2>
              {filteredRequirements.length === 0 ? (
                <p className="career-jd-empty-filter">
                  No requirement lines in this filter view.
                </p>
              ) : (
                <ul className="career-jd-checklist">
                  {filteredRequirements.map((item, idx) => (
                    <li
                      key={idx}
                      className={
                        liveATS
                          ? item.matched
                            ? "jd-matched"
                            : "jd-gap"
                          : ""
                      }
                    >
                      <span className="jd-icon">
                        {liveATS ? (
                          item.matched ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <AlertCircle size={16} />
                          )
                        ) : (
                          <Check size={15} />
                        )}
                      </span>
                      <div>
                        <p>{item.text}</p>
                        {liveATS && (
                          <small>
                            {item.matched
                              ? `ATS Matched (${item.matchRatio}%): ${item.matchedTerms.join(", ")}`
                              : `Gap detected — consider highlighting: ${item.missingTerms.slice(0, 4).join(", ") || "relevant keywords"}`}
                          </small>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="career-jd-block">
              <p className="career-jd-eyebrow">04 / Responsibilities</p>
              <h2>What you will do</h2>
              {filteredResponsibilities.length === 0 ? (
                <p className="career-jd-empty-filter">
                  No responsibility lines in this filter view.
                </p>
              ) : (
                <ul className="career-jd-checklist">
                  {filteredResponsibilities.map((item, idx) => (
                    <li
                      key={idx}
                      className={
                        liveATS
                          ? item.matched
                            ? "jd-matched"
                            : "jd-gap"
                          : ""
                      }
                    >
                      <span className="jd-icon">
                        {liveATS ? (
                          item.matched ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <AlertCircle size={16} />
                          )
                        ) : (
                          <Check size={15} />
                        )}
                      </span>
                      <div>
                        <p>{item.text}</p>
                        {liveATS && (
                          <small>
                            {item.matched
                              ? `ATS Aligned (${item.matchRatio}%): ${item.matchedTerms.join(", ")}`
                              : `Unmatched terms: ${item.missingTerms.slice(0, 4).join(", ") || "experience context"}`}
                          </small>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {(job.benefits ?? []).length > 0 && (
              <div className="career-jd-block">
                <p className="career-jd-eyebrow">05 / Benefits</p>
                <h2>Why CreativeX</h2>
                <ul className="career-jd-checklist">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx}>
                      <span className="jd-icon">
                        <Check size={15} />
                      </span>
                      <div>
                        <p>{benefit}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Application Form + Automatic ATS Detection Console */}
          <aside className="career-apply-column">
            <div className="career-apply-card">
              <div className="career-apply-card-head">
                <span>APPLICATION &amp; ATS ENGINE</span>
                <strong>Apply for {job.title}</strong>
              </div>

              {submittedApp ? (
                <div className="career-apply-success">
                  <div className="career-success-badge">
                    <ShieldCheck size={22} />
                    <span>Application Recorded &amp; ATS Scored</span>
                  </div>
                  <h3>Thank you, {submittedApp.application.applicant_name}.</h3>
                  <p>
                    Your application has been processed through the CreativeX ATS engine and routed to our engineering hiring team.
                  </p>

                  <div className="career-ats-result-box">
                    <div className="career-ats-score-row">
                      <div>
                        <small>ATS MATCH SCORE</small>
                        <strong>{submittedApp.ats.score}%</strong>
                      </div>
                      <span
                        className={`career-verdict-badge ${submittedApp.ats.verdict}`}
                      >
                        {submittedApp.ats.verdict === "shortlisted"
                          ? "Auto-Shortlisted"
                          : submittedApp.ats.verdict === "review"
                          ? "Under Review"
                          : "Recorded (Below Threshold)"}
                      </span>
                    </div>
                    <p className="career-ats-result-summary">
                      {submittedApp.ats.summary}
                    </p>
                  </div>

                  <div className="career-success-actions">
                    <Link href="/careers">
                      Explore other roles <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="career-apply-form">
                  {/* Resume File Upload */}
                  <div className="career-form-group">
                    <label>Resume / CV (Auto-parses for ATS)</label>
                    <label className="career-file-drop">
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
                      {parsingFile ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Upload size={18} />
                      )}
                      <div>
                        <strong>
                          {resumeFileName || "Click to upload CV / Resume"}
                        </strong>
                        <span>PDF, DOCX, TXT, or MD</span>
                      </div>
                    </label>
                    {extractWarning && (
                      <p className="career-form-warning">{extractWarning}</p>
                    )}
                  </div>

                  {/* Mandatory Cover Letter (min 100 chars) */}
                  <div className="career-form-group">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <label htmlFor="apply-cover-letter">
                        <FileText size={13} /> Cover Letter * (min 100 chars)
                      </label>
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          color:
                            coverLetter.trim().length >= 100
                              ? "var(--lime)"
                              : "rgba(255,255,255,0.55)",
                        }}
                      >
                        {coverLetter.trim().length} / 100 min
                      </span>
                    </div>
                    <textarea
                      id="apply-cover-letter"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={5}
                      minLength={100}
                      required
                      placeholder="Write your cover letter introducing your relevant experience, key skills, and why you want to join CreativeX (minimum 100 characters)..."
                    />
                  </div>

                  <div className="career-form-row">
                    <div className="career-form-group">
                      <label htmlFor="apply-name">Full Name *</label>
                      <input
                        id="apply-name"
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Kavishka Perera"
                      />
                    </div>
                    <div className="career-form-group">
                      <label htmlFor="apply-email">Email Address *</label>
                      <input
                        id="apply-email"
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="you@domain.com"
                      />
                    </div>
                  </div>

                  <div className="career-form-row">
                    <div className="career-form-group">
                      <label htmlFor="apply-phone">Phone / WhatsApp</label>
                      <input
                        id="apply-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                    <div className="career-form-group">
                      <label htmlFor="apply-years">Years Experience</label>
                      <input
                        id="apply-years"
                        type="number"
                        min={0}
                        max={40}
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        placeholder="3"
                      />
                    </div>
                  </div>

                  <div className="career-form-row">
                    <div className="career-form-group">
                      <label htmlFor="apply-linkedin">LinkedIn URL</label>
                      <input
                        id="apply-linkedin"
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    <div className="career-form-group">
                      <label htmlFor="apply-portfolio">GitHub / Portfolio</label>
                      <input
                        id="apply-portfolio"
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="career-form-error" role="alert">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="career-submit-btn"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Running ATS &amp; Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

