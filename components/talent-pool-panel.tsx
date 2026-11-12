"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  FileText,
  Layers,
  Loader2,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  XCircle,
} from "lucide-react";

import type { ATSResult, JobApplication } from "@/lib/careers";
import { analyzeApplicationATS, extractTextFromResumeFile } from "@/lib/ats";
import { getSupabaseClient, isLocalAdminMode } from "@/lib/supabase-client";
import {
  TALENT_POOL_DISCIPLINES,
  TALENT_POOL_TRACKS,
  getTalentPoolJobPost,
  getTalentPoolTrack,
  type TalentPoolDiscipline,
  type TalentPoolLevel,
} from "@/lib/talent-pool";

export function TalentPoolPanel({
  initialLevel = "associate",
}: {
  initialLevel?: TalentPoolLevel;
}) {
  const [selectedLevel, setSelectedLevel] = useState<TalentPoolLevel>(initialLevel);
  const [selectedDiscipline, setSelectedDiscipline] =
    useState<TalentPoolDiscipline>("AI & Agents");

  // Candidate form fields
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

  const track = useMemo(
    () => getTalentPoolTrack(selectedLevel),
    [selectedLevel]
  );

  const virtualJob = useMemo(
    () => getTalentPoolJobPost(selectedLevel, selectedDiscipline),
    [selectedLevel, selectedDiscipline]
  );

  const liveATS = useMemo<ATSResult | null>(() => {
    if (resumeText.trim().length < 15 && coverLetter.trim().length < 20) {
      return null;
    }
    const yearsNum = yearsExperience ? Number(yearsExperience) : undefined;
    return analyzeApplicationATS(virtualJob, resumeText, {
      coverLetter,
      yearsExperience: Number.isFinite(yearsNum) ? yearsNum : undefined,
    });
  }, [virtualJob, resumeText, coverLetter, yearsExperience]);

  const handleResumeUpload = async (file: File) => {
    setParsingFile(true);
    setExtractWarning("");
    setResumeFileName(file.name);

    try {
      const extracted = await extractTextFromResumeFile(file);
      if (extracted.text) {
        setResumeText(extracted.text);
      }
      if (extracted.warning) {
        setExtractWarning(extracted.warning);
      }

      try {
        const client = await getSupabaseClient();
        const ext = file.name.split(".").pop() || "pdf";
        const path = `resumes/talent-pool-${selectedLevel}-${Date.now()}.${ext}`;
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
        "Unable to read file automatically. Include your key skills and experience in your introduction below for ATS matching."
      );
    } finally {
      setParsingFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!applicantName.trim() || !applicantEmail.trim()) {
      setSubmitError("Please enter your full name and email address.");
      return;
    }
    if (coverLetter.trim().length < 100) {
      setSubmitError(
        `Introduction / career note must be at least 100 characters (currently ${coverLetter.trim().length} characters).`
      );
      return;
    }

    const effectiveResumeText = resumeText.trim() || coverLetter.trim();

    setSubmitting(true);
    try {
      const yearsNum = yearsExperience ? Number(yearsExperience) : undefined;
      const atsResult = analyzeApplicationATS(virtualJob, effectiveResumeText, {
        coverLetter,
        yearsExperience: Number.isFinite(yearsNum) ? yearsNum : undefined,
      });

      const payload: JobApplication = {
        job_id: track.jobSlug,
        job_slug: track.jobSlug,
        job_title: `${track.title} — ${selectedDiscipline}`,
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
            job_snapshot: virtualJob,
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Failed to join Talent Pool.");
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
        err instanceof Error ? err.message : "Failed to join Talent Pool.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <header className="career-detail-hero">
        <div className="careers-hero-grid" aria-hidden="true" />
        <div className="site-width">
          <Link className="career-back-link" href="/careers">
            <ArrowLeft size={15} /> Back to open roles
          </Link>

          <div className="career-detail-hero-grid">
            <div>
              <div className="career-detail-badges">
                <span>TALENT POOL</span>
                <span>Intern · Associate · Senior</span>
                <span>Priority ATS Pipeline</span>
              </div>
              <h1>
                Join the Creative<span style={{ color: "var(--signal)" }}>x</span>{" "}
                Talent Pool.
              </h1>
              <p className="career-detail-summary">
                Submit your profile once for Intern, Associate, or Senior level roles across AI engineering, full-stack systems, product design, and B2B growth. Our hiring leads review pool candidates before new roles open publicly.
              </p>

              <div className="career-detail-meta">
                <span>
                  <Users size={14} /> 3 Level Tracks (Intern / Associate / Senior)
                </span>
                <span>
                  <Layers size={14} /> {selectedDiscipline}
                </span>
                <span>
                  <Sparkles size={14} /> Benchmark: {track.atsThreshold}% ATS
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main 2-column Track Explorer + Talent Pool Submission Form */}
      <section className="career-detail-body">
        <div className="site-width career-detail-layout">
          {/* Left Column: Select Level Track & Review Criteria */}
          <div className="career-jd-column">
            <div className="career-jd-block">
              <p className="career-jd-eyebrow">01 / Select Experience Level</p>
              <h2>Choose your Talent Pool track</h2>

              <div className="talent-pool-selector-grid" role="radiogroup" aria-label="Talent pool experience level">
                {TALENT_POOL_TRACKS.map((item) => {
                  const active = item.id === selectedLevel;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`talent-pool-track-btn ${active ? "active" : ""}`}
                      onClick={() => {
                        setSelectedLevel(item.id);
                        setSubmittedApp(null);
                      }}
                    >
                      <div className="talent-pool-track-btn-top">
                        <span>{item.number} / {item.levelLabel}</span>
                        <small>{item.atsThreshold}% ATS</small>
                      </div>
                      <strong>{item.title}</strong>
                      <p>{item.experienceHint}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="career-jd-block">
              <p className="career-jd-eyebrow">02 / Discipline Focus</p>
              <h2>Primary craft &amp; skill profile</h2>
              <div className="talent-pool-discipline-chips" role="group" aria-label="Select discipline focus">
                {TALENT_POOL_DISCIPLINES.map((disc) => {
                  const active = disc === selectedDiscipline;
                  return (
                    <button
                      key={disc}
                      type="button"
                      aria-pressed={active}
                      className={active ? "active" : ""}
                      onClick={() => {
                        setSelectedDiscipline(disc);
                        setSubmittedApp(null);
                      }}
                    >
                      {disc}
                    </button>
                  );
                })}
              </div>

              <p className="career-jd-prose" style={{ marginTop: "20px" }}>
                {track.description}
              </p>
            </div>

            <div className="career-jd-block">
              <p className="career-jd-eyebrow">03 / Evaluated Skills ({selectedDiscipline})</p>
              <h2>Core competencies for {track.levelLabel}</h2>
              <div className="career-jd-skill-chips">
                {(virtualJob.required_skills ?? []).map((skill) => {
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

              {(virtualJob.nice_to_have ?? []).length > 0 && (
                <>
                  <h3 className="career-jd-subheading">Bonus skills</h3>
                  <div className="career-jd-skill-chips secondary">
                    {virtualJob.nice_to_have.map((skill) => {
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
              <p className="career-jd-eyebrow">04 / Track Expectations</p>
              <h2>What we look for at {track.levelLabel} level</h2>
              <ul className="career-jd-checklist">
                {track.expectations.map((req, idx) => (
                  <li key={idx}>
                    <span className="jd-icon">
                      <CheckCircle2 size={15} />
                    </span>
                    <div>
                      <p>{req}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="career-jd-block">
              <p className="career-jd-eyebrow">05 / Pool Benefits</p>
              <h2>How the Talent Pool works</h2>
              <ul className="career-jd-checklist simple">
                {track.highlights.map((item, idx) => (
                  <li key={idx}>
                    <span className="jd-icon">
                      <Sparkles size={14} />
                    </span>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Talent Pool Submission Form + Live ATS */}
          <aside className="career-apply-column" id="join-talent-pool">
            <div className="career-apply-card">
              <div className="career-apply-card-head">
                <span>
                  <ShieldCheck size={14} /> {track.levelLabel} Pool · {selectedDiscipline}
                </span>
                <strong>Join {track.title}</strong>
              </div>

              {submittedApp ? (
                <div className="career-apply-success">
                  <div className="career-success-badge">
                    <CheckCircle2 size={22} />
                    <span>Added to {track.levelLabel} Talent Pool</span>
                  </div>
                  <h3>
                    Welcome to the pool, {submittedApp.application.applicant_name}.
                  </h3>
                  <p>
                    Your profile is indexed under{" "}
                    <strong>
                      {track.title} ({selectedDiscipline})
                    </strong>{" "}
                    and ready for CreativeX squad leads when matching{" "}
                    {track.levelLabel}-level opportunities open.
                  </p>

                  <div className="career-ats-result-box">
                    <div className="career-ats-score-row">
                      <div>
                        <small>Track ATS Readiness</small>
                        <strong>{submittedApp.ats.score}%</strong>
                      </div>
                      <span
                        className={`career-verdict-badge ${submittedApp.ats.verdict}`}
                      >
                        {submittedApp.ats.verdict === "shortlisted"
                          ? "Priority Pool Match"
                          : submittedApp.ats.verdict === "review"
                          ? "Active Pool Profile"
                          : "Profile Indexed"}
                      </span>
                    </div>
                    <p className="career-ats-result-summary">
                      {submittedApp.ats.summary}
                    </p>
                  </div>

                  <div className="career-success-actions">
                    <Link href="/careers">
                      Explore open roles <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="career-apply-form">
                  <div className="career-form-group">
                    <label>Target Pool Level</label>
                    <select
                      className="talent-pool-select"
                      value={selectedLevel}
                      onChange={(e) =>
                        setSelectedLevel(e.target.value as TalentPoolLevel)
                      }
                    >
                      <option value="intern">01 · Intern Level (0–1 yrs)</option>
                      <option value="associate">02 · Associate Level (1–3 yrs)</option>
                      <option value="senior">03 · Senior Level (3+ yrs)</option>
                    </select>
                  </div>

                  <div className="career-form-group">
                    <label>Resume / CV (PDF, DOCX, TXT, MD)</label>
                    <div
                      className="career-file-drop"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const f = e.dataTransfer.files?.[0];
                        if (f) handleResumeUpload(f);
                      }}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx,.txt,.md"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleResumeUpload(f);
                        }}
                      />
                      {parsingFile ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Upload size={18} />
                      )}
                      <div>
                        <strong>
                          {resumeFileName || "Upload CV for ATS indexing"}
                        </strong>
                        <span>
                          {resumeText
                            ? `Extracted ${resumeText.split(/\s+/).length} words`
                            : "Drag & drop or click to browse"}
                        </span>
                      </div>
                    </div>
                    {extractWarning && (
                      <p className="career-form-warning">
                        <AlertCircle size={13} /> {extractWarning}
                      </p>
                    )}
                  </div>

                  <div className="career-form-row">
                    <div className="career-form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Jane Perera"
                      />
                    </div>
                    <div className="career-form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="jane@domain.com"
                      />
                    </div>
                  </div>

                  <div className="career-form-row">
                    <div className="career-form-group">
                      <label>Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                    <div className="career-form-group">
                      <label>Years of Experience</label>
                      <input
                        type="number"
                        min={0}
                        max={40}
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        placeholder={
                          selectedLevel === "intern"
                            ? "0"
                            : selectedLevel === "associate"
                            ? "2"
                            : "5"
                        }
                      />
                    </div>
                  </div>

                  <div className="career-form-row">
                    <div className="career-form-group">
                      <label>LinkedIn URL</label>
                      <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    <div className="career-form-group">
                      <label>GitHub / Portfolio</label>
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div className="career-form-group">
                    <label>
                      What You Build Best / Career Note *{" "}
                      <span
                        style={{
                          fontWeight: 400,
                          textTransform: "none",
                          opacity: 0.7,
                        }}
                      >
                        (min 100 chars — {coverLetter.trim().length}/100)
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      minLength={100}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder={`Share your core stack, projects shipped, availability, and why you're targeting ${track.levelLabel} roles at CreativeX...`}
                    />
                  </div>

                  {submitError && (
                    <div className="career-form-error">
                      <AlertCircle size={15} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="career-submit-btn"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Indexing into {track.levelLabel} Talent Pool...
                      </>
                    ) : (
                      <>
                        <FileText size={16} />
                        Join {track.levelLabel} Talent Pool
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

