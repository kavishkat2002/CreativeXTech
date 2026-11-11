"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";

import type { JobPost } from "@/lib/careers";
import { staticJobs } from "@/lib/careers";
import { extractJobKeywords } from "@/lib/ats";
import { getSupabaseClient } from "@/lib/supabase-client";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const generateFileId = () => Math.random().toString(36).substring(2, 9);

export function AdminJobEditor({ jobIdOrSlug }: { jobIdOrSlug: string }) {
  const router = useRouter();
  const isNew = jobIdOrSlug === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [matchedRecordKey, setMatchedRecordKey] = useState<{
    column: "id" | "slug";
    value: string;
  } | null>(null);

  const [formData, setFormData] = useState<JobPost>({
    slug: "",
    number: "04",
    title: "",
    department: "AI & Agents",
    location: "Colombo / Remote",
    type: "Full-time",
    level: "Mid-Senior",
    salary_range: "",
    summary: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    required_skills: [],
    nice_to_have: [],
    benefits: [
      "Remote-first flexibility & collaborative studio access",
      "Direct ownership on production AI & software systems",
    ],
    media_url: "",
    ats_threshold: 60,
    published: true,
  });

  useEffect(() => {
    if (isNew) return;

    async function fetchJob() {
      try {
        const client = await getSupabaseClient();
        // Try matching by id first, then by slug
        let { data } = await client
          .from("jobs")
          .select("*")
          .eq("id", jobIdOrSlug)
          .single();

        let matchCol: "id" | "slug" = "id";
        if (!data) {
          const slugRes = await client
            .from("jobs")
            .select("*")
            .eq("slug", jobIdOrSlug)
            .single();
          data = slugRes.data;
          matchCol = "slug";
        }

        if (data) {
          setMatchedRecordKey({
            column: matchCol,
            value: String(data[matchCol] || jobIdOrSlug),
          });
        } else {
          const staticMatch = staticJobs.find(
            (j) => j.id === jobIdOrSlug || j.slug === jobIdOrSlug
          );
          if (staticMatch) {
            data = staticMatch;
          }
        }

        if (data) {
          setFormData({
            id: data.id,
            slug: data.slug || "",
            number: data.number || "01",
            title: data.title || "",
            department: data.department || "Engineering",
            location: data.location || "Remote",
            type: data.type || "Full-time",
            level: data.level || "Mid-Senior",
            salary_range: data.salary_range || "",
            summary: data.summary || "",
            description: data.description || "",
            responsibilities:
              Array.isArray(data.responsibilities) && data.responsibilities.length > 0
                ? data.responsibilities
                : [""],
            requirements:
              Array.isArray(data.requirements) && data.requirements.length > 0
                ? data.requirements
                : [""],
            required_skills: Array.isArray(data.required_skills)
              ? data.required_skills
              : [],
            nice_to_have: Array.isArray(data.nice_to_have)
              ? data.nice_to_have
              : [],
            benefits: Array.isArray(data.benefits) ? data.benefits : [],
            media_url: data.media_url || "",
            ats_threshold:
              typeof data.ats_threshold === "number" ? data.ats_threshold : 60,
            published: data.published ?? true,
          });
        } else {
          setError("Job posting not found.");
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load job.");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [isNew, jobIdOrSlug]);

  const handleFieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const nextValue =
        type === "checkbox"
          ? checked
          : name === "ats_threshold"
          ? Number(value)
          : value;
      const updated = { ...prev, [name]: nextValue };
      if (name === "title" && isNew && !slugTouched) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const client = await getSupabaseClient();
      const ext = file.name.split(".").pop() || "png";
      const filePath = `careers/${formData.slug || generateFileId()}-${Date.now()}.${ext}`;

      const { error: uploadErr } = await client.storage
        .from("project_media")
        .upload(filePath, file);
      if (uploadErr) throw uploadErr;

      const { data: urlData } = client.storage
        .from("project_media")
        .getPublicUrl(filePath);

      setFormData((prev) => ({
        ...prev,
        media_url: urlData.publicUrl,
      }));
    } catch (err: unknown) {
      setError(
        `Image upload failed: ${
          err instanceof Error ? err.message : "Check Supabase storage bucket"
        }`
      );
    } finally {
      setUploading(false);
    }
  };

  const handleAutoExtractSkills = () => {
    const extracted = extractJobKeywords(formData);
    setFormData((prev) => ({
      ...prev,
      required_skills: Array.from(
        new Set([...prev.required_skills.filter(Boolean), ...extracted])
      ),
    }));
  };

  const handleListChange = (
    field:
      | "responsibilities"
      | "requirements"
      | "required_skills"
      | "nice_to_have"
      | "benefits",
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const copy = [...prev[field]];
      copy[index] = value;
      return { ...prev, [field]: copy };
    });
  };

  const addListItem = (
    field:
      | "responsibilities"
      | "requirements"
      | "required_skills"
      | "nice_to_have"
      | "benefits"
  ) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeListItem = (
    field:
      | "responsibilities"
      | "requirements"
      | "required_skills"
      | "nice_to_have"
      | "benefits",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.slug.trim()) {
      setError("Job title and URL slug are required.");
      return;
    }

    setSaving(true);
    try {
      const client = await getSupabaseClient();
      const cleanPayload = {
        slug: slugify(formData.slug),
        number: formData.number.trim() || "01",
        title: formData.title.trim(),
        department: formData.department.trim() || "Engineering",
        location: formData.location.trim() || "Remote",
        type: formData.type.trim() || "Full-time",
        level: formData.level.trim() || "Mid-Senior",
        salary_range: formData.salary_range?.trim() || "",
        summary: formData.summary.trim(),
        description: formData.description.trim(),
        responsibilities: formData.responsibilities
          .map((s) => s.trim())
          .filter(Boolean),
        requirements: formData.requirements
          .map((s) => s.trim())
          .filter(Boolean),
        required_skills: formData.required_skills
          .map((s) => s.trim())
          .filter(Boolean),
        nice_to_have: formData.nice_to_have
          .map((s) => s.trim())
          .filter(Boolean),
        benefits: formData.benefits.map((s) => s.trim()).filter(Boolean),
        media_url: formData.media_url?.trim() || null,
        ats_threshold: formData.ats_threshold,
        published: formData.published,
        updated_at: new Date().toISOString(),
      };

      if (isNew || !matchedRecordKey) {
        const { error: insertErr } = await client
          .from("jobs")
          .insert([{ ...cleanPayload, created_at: new Date().toISOString() }]);
        if (insertErr) throw insertErr;
        router.push("/admin/careers");
      } else {
        const keyCol = matchedRecordKey.column;
        const keyVal = matchedRecordKey.value;
        const { error: updateErr } = await client
          .from("jobs")
          .update(cleanPayload)
          .eq(keyCol, keyVal);
        if (updateErr) throw updateErr;
        router.push("/admin/careers");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save job post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "48px", color: "#666" }}>
        Loading job editor...
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d4d4d8",
    borderRadius: "6px",
    fontSize: "14px",
    marginTop: "6px",
    background: "#fff",
    color: "#111",
  };

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    padding: "24px",
    borderRadius: "10px",
    border: "1px solid #eaeaea",
    marginBottom: "24px",
  };

  return (
    <form onSubmit={handleSave} style={{ paddingBottom: "80px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          position: "sticky",
          top: 0,
          background: "#f8f9fa",
          padding: "16px 0",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Link href="/admin/careers" style={{ color: "#555" }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 600,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {isNew ? "Post New Job" : `Edit: ${formData.title}`}
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#666" }}>
              Includes cover image upload &amp; automatic ATS keyword rules.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 22px",
            background: "#0b0c0b",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            fontSize: "14px",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {isNew ? "Publish Job Post" : "Save Changes"}
        </button>
      </div>

      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "28px",
          alignItems: "start",
        }}
      >
        {/* Main Left Column */}
        <div>
          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 16px", fontSize: "17px", fontWeight: 600 }}>
              Role Details
            </h3>
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500 }}>
                  Job Title *
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleFieldChange}
                  placeholder="e.g. Senior AI Systems Engineer"
                  style={inputStyle}
                  required
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px",
                  gap: "12px",
                }}
              >
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 500 }}>
                    URL Slug *
                  </label>
                  <input
                    name="slug"
                    value={formData.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      handleFieldChange(e);
                    }}
                    placeholder="senior-ai-systems-engineer"
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 500 }}>
                    Index #
                  </label>
                  <input
                    name="number"
                    value={formData.number}
                    onChange={handleFieldChange}
                    placeholder="04"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 500 }}>
                  Short Card Summary *
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleFieldChange}
                  rows={2}
                  placeholder="Concise 1–2 sentence overview shown on the Careers board..."
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 500 }}>
                  Full Job Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFieldChange}
                  rows={5}
                  placeholder="Detailed role context, team impact, and technical environment..."
                  style={inputStyle}
                  required
                />
              </div>
            </div>
          </div>

          {/* Requirements & Responsibilities (used by ATS JD Filter!) */}
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600 }}>
                  Job Requirements (ATS Filtered)
                </h3>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#666" }}>
                  Each bullet is automatically evaluated &amp; filtered by the ATS when candidates apply.
                </p>
              </div>
              <button
                type="button"
                onClick={() => addListItem("requirements")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  background: "#f4f4f5",
                  border: "1px solid #d4d4d8",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <Plus size={14} /> Add Requirement
              </button>
            </div>

            {formData.requirements.map((req, idx) => (
              <div
                key={idx}
                style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
              >
                <input
                  value={req}
                  onChange={(e) =>
                    handleListChange("requirements", idx, e.target.value)
                  }
                  placeholder="e.g. 3+ years of TypeScript, Next.js, and PostgreSQL experience"
                  style={{ ...inputStyle, marginTop: 0 }}
                />
                <button
                  type="button"
                  onClick={() => removeListItem("requirements", idx)}
                  style={{
                    background: "#fef2f2",
                    color: "#dc2626",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0 10px",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600 }}>
                Key Responsibilities
              </h3>
              <button
                type="button"
                onClick={() => addListItem("responsibilities")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  background: "#f4f4f5",
                  border: "1px solid #d4d4d8",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <Plus size={14} /> Add Responsibility
              </button>
            </div>

            {formData.responsibilities.map((resp, idx) => (
              <div
                key={idx}
                style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
              >
                <input
                  value={resp}
                  onChange={(e) =>
                    handleListChange("responsibilities", idx, e.target.value)
                  }
                  placeholder="e.g. Build multi-agent orchestration pipelines with tool calling"
                  style={{ ...inputStyle, marginTop: 0 }}
                />
                <button
                  type="button"
                  onClick={() => removeListItem("responsibilities", idx)}
                  style={{
                    background: "#fef2f2",
                    color: "#dc2626",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0 10px",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600 }}>
                Benefits &amp; Perks
              </h3>
              <button
                type="button"
                onClick={() => addListItem("benefits")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  background: "#f4f4f5",
                  border: "1px solid #d4d4d8",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <Plus size={14} /> Add Benefit
              </button>
            </div>

            {formData.benefits.map((b, idx) => (
              <div
                key={idx}
                style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
              >
                <input
                  value={b}
                  onChange={(e) =>
                    handleListChange("benefits", idx, e.target.value)
                  }
                  style={{ ...inputStyle, marginTop: 0 }}
                />
                <button
                  type="button"
                  onClick={() => removeListItem("benefits", idx)}
                  style={{
                    background: "#fef2f2",
                    color: "#dc2626",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0 10px",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Image Upload, Metadata & ATS Rules */}
        <div>
          {/* Job Image Upload */}
          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: 600 }}>
              Job Post Image
            </h3>
            {formData.media_url ? (
              <div
                style={{
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #e4e4e7",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={formData.media_url}
                  alt="Job banner preview"
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, media_url: "" }))
                  }
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "rgba(11,12,11,0.85)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                style={{
                  padding: "28px 16px",
                  border: "2px dashed #d4d4d8",
                  borderRadius: "8px",
                  textAlign: "center",
                  position: "relative",
                  marginBottom: "12px",
                }}
              >
                {uploading ? (
                  <div style={{ fontSize: "13px", color: "#666" }}>
                    Uploading image...
                  </div>
                ) : (
                  <>
                    <ImageIcon
                      size={28}
                      color="#9ca3af"
                      style={{ margin: "0 auto 8px" }}
                    />
                    <div style={{ fontSize: "13px", fontWeight: 500 }}>
                      Upload Job Cover Image
                    </div>
                    <div style={{ fontSize: "11px", color: "#71717a" }}>
                      PNG, JPG, WebP (recommended 1200×630)
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0,
                        cursor: "pointer",
                      }}
                    />
                  </>
                )}
              </div>
            )}

            <div>
              <label style={{ fontSize: "12px", color: "#666" }}>
                Or paste image URL
              </label>
              <input
                name="media_url"
                value={formData.media_url || ""}
                onChange={handleFieldChange}
                placeholder="https://... or /brand/..."
                style={inputStyle}
              />
            </div>
          </div>

          {/* Role Metadata */}
          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 14px", fontSize: "16px", fontWeight: 600 }}>
              Position Settings
            </h3>
            <div style={{ display: "grid", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500 }}>
                  Department
                </label>
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleFieldChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500 }}>
                  Location
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleFieldChange}
                  style={inputStyle}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 500 }}>
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFieldChange}
                    style={inputStyle}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 500 }}>
                    Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleFieldChange}
                    style={inputStyle}
                  >
                    <option value="Junior">Junior</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Mid-Senior">Mid-Senior</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500 }}>
                  Compensation / Range
                </label>
                <input
                  name="salary_range"
                  value={formData.salary_range || ""}
                  onChange={handleFieldChange}
                  placeholder="e.g. Competitive + Equity"
                  style={inputStyle}
                />
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleFieldChange}
                />
                Published on /careers
              </label>
            </div>
          </div>

          {/* ATS Configuration & Required Skills */}
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
                ATS Auto-Filter Rules
              </h3>
              <button
                type="button"
                onClick={handleAutoExtractSkills}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "#fff7ed",
                  color: "#c2410c",
                  border: "1px solid #fed7aa",
                  borderRadius: "6px",
                  padding: "5px 9px",
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Sparkles size={12} /> Auto-Extract from JD
              </button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                <span>ATS Shortlist Threshold</span>
                <strong>{formData.ats_threshold}%</strong>
              </div>
              <input
                type="range"
                name="ats_threshold"
                min={30}
                max={90}
                step={5}
                value={formData.ats_threshold}
                onChange={handleFieldChange}
                style={{ width: "100%", marginTop: "6px" }}
              />
              <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#666" }}>
                Applicants scoring ≥ {formData.ats_threshold}% are auto-shortlisted; lower scores are flagged for review or filtered.
              </p>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <label style={{ fontSize: "13px", fontWeight: 500 }}>
                  Required ATS Skills
                </label>
                <button
                  type="button"
                  onClick={() => addListItem("required_skills")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0066cc",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  + Add Skill
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {formData.required_skills.map((skill, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      background: "#f4f4f5",
                      padding: "4px 8px",
                      borderRadius: "16px",
                    }}
                  >
                    <input
                      value={skill}
                      onChange={(e) =>
                        handleListChange("required_skills", idx, e.target.value)
                      }
                      placeholder="Skill..."
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        width: "96px",
                        fontSize: "12px",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem("required_skills", idx)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#71717a",
                        display: "flex",
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <label style={{ fontSize: "13px", fontWeight: 500 }}>
                  Nice-to-Have Bonus Skills
                </label>
                <button
                  type="button"
                  onClick={() => addListItem("nice_to_have")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0066cc",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  + Add Bonus
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {formData.nice_to_have.map((skill, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      background: "#f4f4f5",
                      padding: "4px 8px",
                      borderRadius: "16px",
                    }}
                  >
                    <input
                      value={skill}
                      onChange={(e) =>
                        handleListChange("nice_to_have", idx, e.target.value)
                      }
                      placeholder="Bonus..."
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        width: "96px",
                        fontSize: "12px",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem("nice_to_have", idx)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#71717a",
                        display: "flex",
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: 600 }}>
              SEO, AEO &amp; GEO Auto-Indexing
            </h3>
            <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#555", lineHeight: 1.5 }}>
              When published, this role is automatically indexed for Google Jobs, ChatGPT, Perplexity, and AI search tools:
            </p>
            <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "#333", lineHeight: 1.7 }}>
              <li>Canonical: <code>/careers/{formData.slug || "role-slug"}</code></li>
              <li>Schema.org <code>JobPosting</code> + <code>FAQPage</code></li>
              <li>Live in <code>/sitemap.xml</code>, <code>/llms.txt</code> &amp; <code>/careers/jobs.json</code></li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}

