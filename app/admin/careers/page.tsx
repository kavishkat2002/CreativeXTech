"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Edit,
  ExternalLink,
  FileText,
  Filter,
  Image as ImageIcon,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";

import type { JobApplication, JobPost } from "@/lib/careers";
import { getSupabaseClient } from "@/lib/supabase-client";

type AdminTab = "jobs" | "applications";
type ATSFilterVerdict = "all" | "shortlisted" | "review" | "filtered_out";

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("jobs");
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // ATS Filter states for applications
  const [selectedJobSlug, setSelectedJobSlug] = useState<string>("all");
  const [atsVerdictFilter, setAtsVerdictFilter] =
    useState<ATSFilterVerdict>("all");
  const [minAtsScore, setMinAtsScore] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [jdInspectorFilter, setJdInspectorFilter] = useState<
    "all" | "matched" | "gaps"
  >("all");

  const refreshData = async () => {
    try {
      const client = await getSupabaseClient();
      const [jobsRes, appsRes] = await Promise.all([
        client.from("jobs").select("*").order("number", { ascending: true }),
        client
          .from("job_applications")
          .select("*")
          .order("ats_score", { ascending: false }),
      ]);

      if (Array.isArray(jobsRes.data)) {
        setJobs(jobsRes.data as JobPost[]);
      }
      if (Array.isArray(appsRes.data)) {
        const apps = appsRes.data as JobApplication[];
        setApplications(apps);
        setSelectedApp((prev) => prev ?? apps[0] ?? null);
      }
    } catch (err) {
      console.error("Failed to fetch careers admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    async function loadInitial() {
      try {
        const client = await getSupabaseClient();
        const [jobsRes, appsRes] = await Promise.all([
          client.from("jobs").select("*").order("number", { ascending: true }),
          client
            .from("job_applications")
            .select("*")
            .order("ats_score", { ascending: false }),
        ]);

        if (!active) return;
        if (Array.isArray(jobsRes.data)) {
          setJobs(jobsRes.data as JobPost[]);
        }
        if (Array.isArray(appsRes.data)) {
          const apps = appsRes.data as JobApplication[];
          setApplications(apps);
          setSelectedApp((prev) => prev ?? apps[0] ?? null);
        }
      } catch (err) {
        console.error("Failed to fetch careers admin data:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadInitial();
    return () => {
      active = false;
    };
  }, []);

  const handleDeleteJob = async (job: JobPost) => {
    if (!window.confirm(`Delete job posting "${job.title}"?`)) return;
    const client = await getSupabaseClient();
    if (job.id) {
      await client.from("jobs").delete().eq("id", job.id);
    } else {
      await client.from("jobs").delete().eq("slug", job.slug);
    }
    refreshData();
  };

  const handleUpdateAppStatus = async (
    app: JobApplication,
    newStatus: JobApplication["status"]
  ) => {
    const client = await getSupabaseClient();
    if (app.id) {
      await client
        .from("job_applications")
        .update({ status: newStatus })
        .eq("id", app.id);
    }
    setApplications((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, status: newStatus } : a))
    );
    setSelectedApp((prev) =>
      prev && prev.id === app.id ? { ...prev, status: newStatus } : prev
    );
  };

  const handleDeleteApp = async (app: JobApplication) => {
    if (
      !window.confirm(
        `Remove application from ${app.applicant_name} (${app.job_title})?`
      )
    )
      return;
    const client = await getSupabaseClient();
    if (app.id) {
      await client.from("job_applications").delete().eq("id", app.id);
    }
    const next = applications.filter((a) => a.id !== app.id);
    setApplications(next);
    if (selectedApp?.id === app.id) {
      setSelectedApp(next[0] ?? null);
    }
  };

  const filteredApplications = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return applications.filter((app) => {
      if (selectedJobSlug !== "all" && app.job_slug !== selectedJobSlug) {
        return false;
      }
      if (atsVerdictFilter !== "all" && app.ats_status !== atsVerdictFilter) {
        return false;
      }
      if ((app.ats_score ?? 0) < minAtsScore) {
        return false;
      }
      if (q) {
        const hay = [
          app.applicant_name,
          app.applicant_email,
          app.job_title,
          ...(app.ats_matched_skills ?? []),
          app.resume_text,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [
    applications,
    selectedJobSlug,
    atsVerdictFilter,
    minAtsScore,
    searchQuery,
  ]);

  const shortlistedCount = applications.filter(
    (a) => a.ats_status === "shortlisted"
  ).length;

  const verdictBadgeStyle = (verdict: string): React.CSSProperties => {
    if (verdict === "shortlisted") {
      return {
        background: "#dcfce7",
        color: "#166534",
        padding: "4px 9px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
      };
    }
    if (verdict === "review") {
      return {
        background: "#fef3c7",
        color: "#92400e",
        padding: "4px 9px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
      };
    }
    return {
      background: "#fee2e2",
      color: "#991b1b",
      padding: "4px 9px",
      borderRadius: "999px",
      fontSize: "11px",
      fontWeight: 600,
    };
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 600,
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            Careers &amp; ATS Pipeline
          </h1>
          <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
            Post open roles with images and review candidates automatically filtered by ATS Job Description scoring.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/careers"
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 14px",
              background: "#fff",
              border: "1px solid #d4d4d8",
              borderRadius: "6px",
              color: "#111",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            <ExternalLink size={15} /> View Public Page
          </Link>
          <Link
            href="/admin/careers/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              background: "#0b0c0b",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            <Plus size={16} /> Post New Job
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          borderBottom: "1px solid #e4e4e7",
          paddingBottom: "12px",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab("jobs")}
          style={{
            padding: "9px 16px",
            borderRadius: "6px",
            border: "none",
            background: activeTab === "jobs" ? "#0b0c0b" : "#fff",
            color: activeTab === "jobs" ? "#fff" : "#555",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FileText size={15} />
          Job Postings ({jobs.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("applications")}
          style={{
            padding: "9px 16px",
            borderRadius: "6px",
            border: "none",
            background: activeTab === "applications" ? "#0b0c0b" : "#fff",
            color: activeTab === "applications" ? "#fff" : "#555",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Users size={15} />
          Applications &amp; ATS Filter ({applications.length})
          {shortlistedCount > 0 && (
            <span
              style={{
                background: "#ff5a36",
                color: "#fff",
                borderRadius: "999px",
                padding: "2px 7px",
                fontSize: "11px",
              }}
            >
              {shortlistedCount} Shortlisted
            </span>
          )}
        </button>
      </div>

      {loading ? (
        <div style={{ padding: "48px", color: "#666" }}>
          Loading careers data...
        </div>
      ) : activeTab === "jobs" ? (
        /* TAB 1: JOB POSTINGS */
        <div
          style={{
            background: "#fff",
            border: "1px solid #eaeaea",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#fafafa",
                  borderBottom: "1px solid #eaeaea",
                }}
              >
                <th style={{ padding: "14px 16px", fontSize: "12px", color: "#666" }}>
                  Role &amp; Image
                </th>
                <th style={{ padding: "14px 16px", fontSize: "12px", color: "#666" }}>
                  Department
                </th>
                <th style={{ padding: "14px 16px", fontSize: "12px", color: "#666" }}>
                  ATS Threshold
                </th>
                <th style={{ padding: "14px 16px", fontSize: "12px", color: "#666" }}>
                  Applicants
                </th>
                <th style={{ padding: "14px 16px", fontSize: "12px", color: "#666" }}>
                  Status
                </th>
                <th
                  style={{
                    padding: "14px 16px",
                    fontSize: "12px",
                    color: "#666",
                    textAlign: "right",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#888",
                    }}
                  >
                    No job posts yet. Click &ldquo;Post New Job&rdquo; to publish one.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => {
                  const jobApps = applications.filter(
                    (a) => a.job_slug === job.slug
                  );
                  const jobShortlisted = jobApps.filter(
                    (a) => a.ats_status === "shortlisted"
                  ).length;

                  return (
                    <tr
                      key={job.slug}
                      style={{ borderBottom: "1px solid #f0f0f0" }}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          {job.media_url ? (
                            <img
                              src={job.media_url}
                              alt={job.title}
                              style={{
                                width: "54px",
                                height: "40px",
                                objectFit: "cover",
                                borderRadius: "6px",
                                border: "1px solid #e4e4e7",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "54px",
                                height: "40px",
                                borderRadius: "6px",
                                background: "#f4f4f5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#a1a1aa",
                              }}
                            >
                              <ImageIcon size={16} />
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: 600, fontSize: "14px" }}>
                              {job.number} · {job.title}
                            </div>
                            <div style={{ fontSize: "12px", color: "#666" }}>
                              {job.location} · {job.type}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: "14px 16px", fontSize: "13px" }}>
                        <span
                          style={{
                            background: "#f4f4f5",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                          }}
                        >
                          {job.department}
                        </span>
                      </td>

                      <td style={{ padding: "14px 16px", fontSize: "13px" }}>
                        <strong>{job.ats_threshold ?? 60}%</strong>{" "}
                        <span style={{ color: "#666", fontSize: "12px" }}>
                          ({job.required_skills?.length ?? 0} skills)
                        </span>
                      </td>

                      <td style={{ padding: "14px 16px", fontSize: "13px" }}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedJobSlug(job.slug);
                            setActiveTab("applications");
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            color: "#0066cc",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          {jobApps.length} total ({jobShortlisted} ATS pass)
                        </button>
                      </td>

                      <td style={{ padding: "14px 16px", fontSize: "13px" }}>
                        {job.published !== false ? (
                          <span
                            style={{
                              color: "#166534",
                              background: "#dcfce7",
                              padding: "4px 8px",
                              borderRadius: "999px",
                              fontSize: "11px",
                              fontWeight: 600,
                            }}
                          >
                            Published
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "#666",
                              background: "#f4f4f5",
                              padding: "4px 8px",
                              borderRadius: "999px",
                              fontSize: "11px",
                              fontWeight: 600,
                            }}
                          >
                            Draft
                          </span>
                        )}
                      </td>

                      <td
                        style={{
                          padding: "14px 16px",
                          textAlign: "right",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          <Link
                            href={`/careers/${job.slug}`}
                            target="_blank"
                            style={{
                              padding: "6px",
                              color: "#555",
                              background: "#f4f4f5",
                              borderRadius: "4px",
                              display: "inline-flex",
                            }}
                            title="View Live Job"
                          >
                            <ExternalLink size={15} />
                          </Link>
                          <Link
                            href={`/admin/careers/${job.id || job.slug}`}
                            style={{
                              padding: "6px",
                              color: "#555",
                              background: "#f4f4f5",
                              borderRadius: "4px",
                              display: "inline-flex",
                            }}
                            title="Edit Job"
                          >
                            <Edit size={15} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteJob(job)}
                            style={{
                              padding: "6px",
                              color: "#d32f2f",
                              background: "#feebeb",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              display: "inline-flex",
                            }}
                            title="Delete Job"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* TAB 2: APPLICATIONS & ATS FILTER */
        <div>
          {/* ATS Filter Toolbar */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eaeaea",
              borderRadius: "10px",
              padding: "16px 20px",
              marginBottom: "20px",
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
              gap: "14px",
              alignItems: "end",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                }}
              >
                Search Candidate or Skill
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid #d4d4d8",
                  borderRadius: "6px",
                  padding: "8px 10px",
                  marginTop: "4px",
                }}
              >
                <Search size={14} color="#888" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Name, email, TypeScript..."
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    fontSize: "13px",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                }}
              >
                Job Role
              </label>
              <select
                value={selectedJobSlug}
                onChange={(e) => setSelectedJobSlug(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 10px",
                  border: "1px solid #d4d4d8",
                  borderRadius: "6px",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                <option value="all">All Roles</option>
                {jobs.map((j) => (
                  <option key={j.slug} value={j.slug}>
                    {j.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                }}
              >
                ATS Verdict Filter
              </label>
              <select
                value={atsVerdictFilter}
                onChange={(e) =>
                  setAtsVerdictFilter(e.target.value as ATSFilterVerdict)
                }
                style={{
                  width: "100%",
                  padding: "9px 10px",
                  border: "1px solid #d4d4d8",
                  borderRadius: "6px",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                <option value="all">All ATS Verdicts</option>
                <option value="shortlisted">Shortlisted (ATS Passed)</option>
                <option value="review">Needs Review</option>
                <option value="filtered_out">Filtered Out</option>
              </select>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                }}
              >
                <span>Min ATS Score</span>
                <strong style={{ color: "#111" }}>{minAtsScore}%</strong>
              </div>
              <input
                type="range"
                min={0}
                max={90}
                step={5}
                value={minAtsScore}
                onChange={(e) => setMinAtsScore(Number(e.target.value))}
                style={{ width: "100%", marginTop: "12px" }}
              />
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: "1px solid #eaeaea",
                borderRadius: "10px",
                padding: "56px 24px",
                textAlign: "center",
                color: "#666",
              }}
            >
              <Sparkles size={28} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
              <div style={{ fontWeight: 600, fontSize: "16px", color: "#111" }}>
                No matching applications found
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "13px" }}>
                When candidates apply on `/careers`, the ATS engine automatically scores their CV, filters Job Description criteria, and surfaces them here.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.25fr",
                gap: "20px",
                alignItems: "start",
              }}
            >
              {/* Applicant List */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #eaeaea",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {filteredApplications.map((app) => {
                  const active = selectedApp?.id === app.id;
                  return (
                    <div
                      key={app.id || `${app.applicant_email}-${app.created_at}`}
                      onClick={() => setSelectedApp(app)}
                      style={{
                        padding: "16px 18px",
                        borderBottom: "1px solid #f0f0f0",
                        cursor: "pointer",
                        background: active ? "#f8fafc" : "#fff",
                        borderLeft: active
                          ? "3px solid #ff5a36"
                          : "3px solid transparent",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "6px",
                        }}
                      >
                        <strong style={{ fontSize: "15px" }}>
                          {app.applicant_name}
                        </strong>
                        <span style={verdictBadgeStyle(app.ats_status)}>
                          {app.ats_score}% ATS · {app.ats_status.replace("_", " ")}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#555" }}>
                        {app.job_title} · {app.applicant_email}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginTop: "8px",
                          fontSize: "11px",
                          color: "#666",
                        }}
                      >
                        <span>
                          Matched: {app.ats_matched_skills?.length ?? 0} skills
                        </span>
                        <span>
                          Missing: {app.ats_missing_skills?.length ?? 0} skills
                        </span>
                        <span>Stage: {app.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ATS & Filtered JD Inspector */}
              {selectedApp && (
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #eaeaea",
                    borderRadius: "10px",
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                      borderBottom: "1px solid #f0f0f0",
                      paddingBottom: "16px",
                      marginBottom: "18px",
                    }}
                  >
                    <div>
                      <h2 style={{ margin: "0 0 4px", fontSize: "20px" }}>
                        {selectedApp.applicant_name}
                      </h2>
                      <div style={{ fontSize: "13px", color: "#555" }}>
                        {selectedApp.job_title} ·{" "}
                        <a href={`mailto:${selectedApp.applicant_email}`}>
                          {selectedApp.applicant_email}
                        </a>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginTop: "8px",
                          fontSize: "12px",
                        }}
                      >
                        {selectedApp.linkedin_url && (
                          <a
                            href={selectedApp.linkedin_url}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#0066cc" }}
                          >
                            LinkedIn ↗
                          </a>
                        )}
                        {selectedApp.portfolio_url && (
                          <a
                            href={selectedApp.portfolio_url}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#0066cc" }}
                          >
                            Portfolio ↗
                          </a>
                        )}
                        {selectedApp.resume_filename && (
                          <span style={{ color: "#666" }}>
                            CV: {selectedApp.resume_filename}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <select
                        value={selectedApp.status}
                        onChange={(e) =>
                          handleUpdateAppStatus(
                            selectedApp,
                            e.target.value as JobApplication["status"]
                          )
                        }
                        style={{
                          padding: "7px 10px",
                          border: "1px solid #d4d4d8",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <option value="new">New</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleDeleteApp(selectedApp)}
                        style={{
                          padding: "7px",
                          background: "#feebeb",
                          color: "#d32f2f",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        title="Delete Application"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* ATS Summary Box */}
                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "14px 16px",
                      marginBottom: "18px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <strong style={{ fontSize: "13px" }}>
                        ATS Automated Assessment
                      </strong>
                      <span style={verdictBadgeStyle(selectedApp.ats_status)}>
                        Score: {selectedApp.ats_score}%
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: "13px", color: "#475569" }}>
                      {selectedApp.ats_summary}
                    </p>
                  </div>

                  {/* Matched & Missing Skills */}
                  <div style={{ marginBottom: "18px" }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        marginBottom: "8px",
                        color: "#333",
                      }}
                    >
                      ATS Skill Detection
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {(selectedApp.ats_matched_skills ?? []).map((skill) => (
                        <span
                          key={skill}
                          style={{
                            background: "#dcfce7",
                            color: "#166534",
                            padding: "4px 9px",
                            borderRadius: "999px",
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        >
                          ✓ {skill}
                        </span>
                      ))}
                      {(selectedApp.ats_missing_skills ?? []).map((skill) => (
                        <span
                          key={skill}
                          style={{
                            background: "#fee2e2",
                            color: "#991b1b",
                            padding: "4px 9px",
                            borderRadius: "999px",
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        >
                          ✕ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Filtered Job Description Breakdown */}
                  <div style={{ marginBottom: "18px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Filter size={13} /> Filtered Job Description Criteria
                      </div>
                      <div style={{ display: "flex", gap: "4px" }}>
                        {(["all", "matched", "gaps"] as const).map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setJdInspectorFilter(tab)}
                            style={{
                              padding: "4px 8px",
                              fontSize: "11px",
                              borderRadius: "4px",
                              border: "1px solid #d4d4d8",
                              background:
                                jdInspectorFilter === tab ? "#0b0c0b" : "#fff",
                              color:
                                jdInspectorFilter === tab ? "#fff" : "#555",
                              cursor: "pointer",
                              textTransform: "capitalize",
                            }}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {(selectedApp.ats_jd_matches ?? [])
                        .filter((item) => {
                          if (jdInspectorFilter === "matched") return item.matched;
                          if (jdInspectorFilter === "gaps") return !item.matched;
                          return true;
                        })
                        .map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: "10px 12px",
                              borderRadius: "6px",
                              border: "1px solid #eaeaea",
                              background: item.matched ? "#f0fdf4" : "#fef2f2",
                              display: "flex",
                              gap: "10px",
                              alignItems: "flex-start",
                            }}
                          >
                            {item.matched ? (
                              <CheckCircle2
                                size={15}
                                color="#16a34a"
                                style={{ flexShrink: 0, marginTop: "2px" }}
                              />
                            ) : (
                              <AlertCircle
                                size={15}
                                color="#dc2626"
                                style={{ flexShrink: 0, marginTop: "2px" }}
                              />
                            )}
                            <div style={{ fontSize: "12px" }}>
                              <div style={{ fontWeight: 500, color: "#111" }}>
                                {item.text}
                              </div>
                              <div style={{ color: "#666", marginTop: "2px" }}>
                                {item.type.toUpperCase()} · {item.matchRatio}% match
                                {item.matchedTerms.length > 0 &&
                                  ` · Detected: ${item.matchedTerms.join(", ")}`}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Extracted Resume Text */}
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        marginBottom: "6px",
                      }}
                    >
                      Extracted Resume Text
                    </div>
                    <pre
                      style={{
                        background: "#fafafa",
                        border: "1px solid #eaeaea",
                        borderRadius: "6px",
                        padding: "12px",
                        fontSize: "12px",
                        whiteSpace: "pre-wrap",
                        maxHeight: "220px",
                        overflowY: "auto",
                        margin: 0,
                        fontFamily: "inherit",
                      }}
                    >
                      {selectedApp.resume_text}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
