"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Plus, Trash2, Upload, X, ImageIcon, Video } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase-client";

export default function ProjectEditorPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const isNew = slug === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    number: "",
    slug: "",
    category: "",
    title: "",
    headline: "",
    summary: "",
    stage: "",
    filter: "",
    caseStudyHref: "",
    system: "",
    cta: "",
    href: "",
    tags: [] as string[],
    capabilities: [] as string[],
    integrations: [] as string[],
    outcomes: [] as string[],
    opportunityTitle: "",
    opportunityCopy: "",
    conceptStatus: "",
    workflow: [] as { number: string; title: string; copy: string }[],
    systemDirectionTitle: "",
    systemDirectionCopy: "",
    systemConsole: { status: "", title: "", bullets: [] as string[], action: "" },
    buildVersionTitle: "",
    media_url: "",
  });

  useEffect(() => {
    if (isNew) return;

    async function fetchProject() {
      try {
        const { data, error } = await supabaseBrowserClient
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        if (data) {
          setFormData({
            number: data.number || "",
            slug: data.slug || "",
            category: data.category || "",
            title: data.title || "",
            headline: data.headline || "",
            summary: data.summary || "",
            stage: data.stage || "",
            filter: data.filter || "",
            caseStudyHref: data.caseStudyHref || "",
            system: data.system || "",
            cta: data.cta || "",
            href: data.href || "",
            tags: data.tags || [],
            capabilities: data.capabilities || [],
            integrations: data.integrations || [],
            outcomes: data.outcomes || [],
            opportunityTitle: data.opportunity_title || "",
            opportunityCopy: data.opportunity_copy || "",
            conceptStatus: data.concept_status || "",
            workflow: data.workflow || [],
            systemDirectionTitle: data.system_direction_title || "",
            systemDirectionCopy: data.system_direction_copy || "",
            systemConsole: data.system_console || { status: "", title: "", bullets: [], action: "" },
            buildVersionTitle: data.build_version_title || "",
            media_url: data.media_url || "",
          });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [slug, isNew]);

  const handleMediaUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop();
      const path = `projects/${formData.slug || "draft"}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabaseBrowserClient.storage
        .from("project-media")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabaseBrowserClient.storage
        .from("project-media")
        .getPublicUrl(path);
      setFormData(prev => ({ ...prev, media_url: urlData.publicUrl }));
    } catch (err: any) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const dataToSave = {
        number: formData.number,
        slug: formData.slug,
        category: formData.category,
        title: formData.title,
        headline: formData.headline,
        summary: formData.summary,
        stage: formData.stage,
        filter: formData.filter,
        caseStudyHref: formData.caseStudyHref || null,
        system: formData.system,
        cta: formData.cta,
        href: formData.href,
        tags: formData.tags,
        capabilities: formData.capabilities,
        integrations: formData.integrations,
        outcomes: formData.outcomes,
        opportunity_title: formData.opportunityTitle,
        opportunity_copy: formData.opportunityCopy,
        concept_status: formData.conceptStatus,
        workflow: formData.workflow,
        system_direction_title: formData.systemDirectionTitle,
        system_direction_copy: formData.systemDirectionCopy,
        system_console: formData.systemConsole,
        build_version_title: formData.buildVersionTitle,
        media_url: formData.media_url || null,
      };

      if (isNew) {
        const { error } = await supabaseBrowserClient.from("projects").insert([dataToSave]);
        if (error) throw error;
        router.push("/admin/projects");
      } else {
        const { error } = await supabaseBrowserClient
          .from("projects")
          .update(dataToSave)
          .eq("slug", slug);
        if (error) throw error;
        router.push("/admin/projects");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateArray = (field: "tags" | "capabilities" | "integrations" | "outcomes", index: number, value: string) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayItem = (field: "tags" | "capabilities" | "integrations" | "outcomes") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field: "tags" | "capabilities" | "integrations" | "outcomes", index: number) => {
    const newArr = [...formData[field]];
    newArr.splice(index, 1);
    setFormData({ ...formData, [field]: newArr });
  };

  const renderArrayEditor = (title: string, field: "tags" | "capabilities" | "integrations" | "outcomes") => (
    <div style={{ marginBottom: "24px" }}>
      <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>{title}</label>
      {formData[field].map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <input
            type="text"
            value={item}
            onChange={(e) => updateArray(field, i, e.target.value)}
            style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
          />
          <button
            onClick={() => removeArrayItem(field, i)}
            style={{ padding: "10px", background: "#fee", color: "#c00", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayItem(field)}
        style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: "#f4f4f5", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}
      >
        <Plus size={14} /> Add Item
      </button>
    </div>
  );

  if (isLoading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading project...</div>;

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/admin/projects" style={{ color: "#666", textDecoration: "none" }}><ArrowLeft size={20} /></Link>
          <h1 style={{ margin: "0", fontSize: "24px", fontWeight: "600", letterSpacing: "-0.5px" }}>
            {isNew ? "Create Project" : "Edit Project"}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "white", padding: "10px 20px", borderRadius: "6px", fontSize: "14px", fontWeight: "500", border: "none", cursor: isSaving ? "not-allowed" : "pointer", opacity: isSaving ? 0.7 : 1
          }}
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {error && (
        <div style={{ padding: "16px", background: "#fee", color: "#c00", borderRadius: "8px", marginBottom: "24px" }}>
          Error saving project: {error}
        </div>
      )}

      {/* GENERAL INFO */}
      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>General Information</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Number</label>
            <input type="text" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="01" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Slug (URL ID)</label>
            <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="alexa-business-agent" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Category</label>
            <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="AI automation & agents" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Filter Tag</label>
            <input type="text" value={formData.filter} onChange={e => setFormData({ ...formData, filter: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="AI agents" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Title (Project Name)</label>
            <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px", fontWeight: "500" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Stage</label>
            <input type="text" value={formData.stage} onChange={e => setFormData({ ...formData, stage: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="CreativeX product concept" />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Headline (H2)</label>
          <input type="text" value={formData.headline} onChange={e => setFormData({ ...formData, headline: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Summary / Copy</label>
          <textarea value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", minHeight: "100px", resize: "vertical" }} />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>System Shape (Footer label)</label>
          <input type="text" value={formData.system} onChange={e => setFormData({ ...formData, system: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="Omnichannel agent workspace" />
        </div>
      </div>
      {/* COVER MEDIA */}
      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px", marginBottom: "20px" }}>Cover Media</h2>
        <p style={{ fontSize: "13px", color: "#666", marginBottom: "20px", marginTop: 0 }}>Upload an image (JPG, PNG, WebP, GIF) or a short looping video (MP4, WebM) — max 50 MB. This will appear on the project card on the homepage and projects page.</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
          style={{ display: "none" }}
          onChange={e => { const f = e.target.files?.[0]; if (f) handleMediaUpload(f); }}
        />

        {formData.media_url ? (
          <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", border: "1px solid #eaeaea", marginBottom: "16px" }}>
            {/\.(mp4|webm)/i.test(formData.media_url) ? (
              <video src={formData.media_url} autoPlay muted loop playsInline style={{ width: "100%", maxHeight: "260px", objectFit: "cover", display: "block" }} />
            ) : (
              <img src={formData.media_url} alt="Project cover" style={{ width: "100%", maxHeight: "260px", objectFit: "cover", display: "block" }} />
            )}
            <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "8px" }}>
              <button onClick={() => fileInputRef.current?.click()} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: "rgba(0,0,0,0.65)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", backdropFilter: "blur(4px)" }}>
                <Upload size={14} /> Change
              </button>
              <button onClick={() => setFormData(prev => ({ ...prev, media_url: "" }))} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: "rgba(180,0,0,0.75)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", backdropFilter: "blur(4px)" }}>
                <X size={14} /> Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            style={{ width: "100%", padding: "40px 24px", border: "2px dashed #d1d5db", borderRadius: "10px", background: isUploading ? "#f9fafb" : "#fff", cursor: isUploading ? "not-allowed" : "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", transition: "border-color 0.2s" }}
          >
            {isUploading ? (
              <><Loader2 size={32} style={{ color: "#6b7280", animation: "spin 1s linear infinite" }} /><span style={{ fontSize: "14px", color: "#6b7280" }}>Uploading...</span></>
            ) : (
              <>
                <div style={{ display: "flex", gap: "12px" }}><ImageIcon size={28} style={{ color: "#9ca3af" }} /><Video size={28} style={{ color: "#9ca3af" }} /></div>
                <div><p style={{ margin: "0", fontSize: "14px", fontWeight: "500", color: "#374151" }}>Click to upload cover image or video</p><p style={{ margin: "4px 0 0", fontSize: "12px", color: "#9ca3af" }}>JPG, PNG, WebP, GIF, MP4, WebM · Max 50MB</p></div>
              </>
            )}
          </button>
        )}

        <div style={{ marginTop: "16px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "6px", color: "#666" }}>Or paste a direct media URL</label>
          <input type="text" value={formData.media_url} onChange={e => setFormData({ ...formData, media_url: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "13px" }} placeholder="https://..." />
        </div>
      </div>

      {/* CASE STUDY FIELDS */}
      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Case Study Content</h2>

        
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "16px", color: "#333" }}>01. The Opportunity</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "8px", color: "#666" }}>Title</label>
            <input type="text" value={formData.opportunityTitle} onChange={e => setFormData({ ...formData, opportunityTitle: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "8px", color: "#666" }}>Copy</label>
            <textarea value={formData.opportunityCopy} onChange={e => setFormData({ ...formData, opportunityCopy: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", minHeight: "80px", resize: "vertical" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "8px", color: "#666" }}>Concept Status (Optional Side Note)</label>
            <textarea value={formData.conceptStatus} onChange={e => setFormData({ ...formData, conceptStatus: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", minHeight: "60px", resize: "vertical" }} />
          </div>
        </div>

        <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid #eaeaea" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "16px", color: "#333" }}>02. Connected Workflow</h3>
          {formData.workflow.map((step, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr 2fr 40px", gap: "8px", marginBottom: "8px", alignItems: "start" }}>
              <input type="text" value={step.number} onChange={e => { const w = [...formData.workflow]; w[i].number = e.target.value; setFormData({ ...formData, workflow: w }) }} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="01" />
              <input type="text" value={step.title} onChange={e => { const w = [...formData.workflow]; w[i].title = e.target.value; setFormData({ ...formData, workflow: w }) }} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="Connect" />
              <input type="text" value={step.copy} onChange={e => { const w = [...formData.workflow]; w[i].copy = e.target.value; setFormData({ ...formData, workflow: w }) }} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="Description" />
              <button onClick={() => { const w = [...formData.workflow]; w.splice(i, 1); setFormData({ ...formData, workflow: w }) }} style={{ padding: "10px", background: "#fee", color: "#c00", border: "none", borderRadius: "6px", cursor: "pointer", height: "40px" }}><Trash2 size={16} /></button>
            </div>
          ))}
          <button onClick={() => setFormData({ ...formData, workflow: [...formData.workflow, { number: "", title: "", copy: "" }] })} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: "#f4f4f5", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "500", marginTop: "8px" }}>
            <Plus size={14} /> Add Step
          </button>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "16px", color: "#333" }}>03. System Direction</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "8px", color: "#666" }}>Title</label>
            <input type="text" value={formData.systemDirectionTitle} onChange={e => setFormData({ ...formData, systemDirectionTitle: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "8px", color: "#666" }}>Copy</label>
            <textarea value={formData.systemDirectionCopy} onChange={e => setFormData({ ...formData, systemDirectionCopy: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", minHeight: "80px", resize: "vertical" }} />
          </div>
        </div>

        <div style={{ marginBottom: "24px", padding: "20px", background: "#f8f9fa", borderRadius: "8px", border: "1px solid #eaeaea" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "16px", color: "#333" }}>System Console (Terminal Mockup)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "500", marginBottom: "4px", color: "#666" }}>Status Bar Text</label>
              <input type="text" value={formData.systemConsole?.status || ""} onChange={e => setFormData({ ...formData, systemConsole: { ...formData.systemConsole, status: e.target.value } })} style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} placeholder="Human review on" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "500", marginBottom: "4px", color: "#666" }}>Main Title</label>
              <input type="text" value={formData.systemConsole?.title || ""} onChange={e => setFormData({ ...formData, systemConsole: { ...formData.systemConsole, title: e.target.value } })} style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} placeholder="New wholesale enquiry" />
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "500", marginBottom: "4px", color: "#666" }}>Bullets</label>
            {(formData.systemConsole?.bullets || []).map((b, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
                <input type="text" value={b} onChange={e => { const bullets = [...formData.systemConsole.bullets]; bullets[i] = e.target.value; setFormData({ ...formData, systemConsole: { ...formData.systemConsole, bullets } }) }} style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "13px" }} />
                <button onClick={() => { const bullets = [...formData.systemConsole.bullets]; bullets.splice(i, 1); setFormData({ ...formData, systemConsole: { ...formData.systemConsole, bullets } }) }} style={{ padding: "8px", background: "#fee", color: "#c00", border: "none", borderRadius: "4px", cursor: "pointer" }}><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => setFormData({ ...formData, systemConsole: { ...formData.systemConsole, bullets: [...(formData.systemConsole?.bullets || []), ""] } })} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 10px", background: "#fff", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "500", marginTop: "4px" }}>
              <Plus size={12} /> Add Bullet
            </button>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "500", marginBottom: "4px", color: "#666" }}>Action Button Text</label>
            <input type="text" value={formData.systemConsole?.action || ""} onChange={e => setFormData({ ...formData, systemConsole: { ...formData.systemConsole, action: e.target.value } })} style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} placeholder="Review suggested action" />
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "16px", color: "#333" }}>04. Build Your Version</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "8px", color: "#666" }}>Title</label>
            <input type="text" value={formData.buildVersionTitle} onChange={e => setFormData({ ...formData, buildVersionTitle: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="Connect the channels. Keep the judgment." />
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Call to Action (CTA) & Links</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>CTA Text (Card & Build Version)</label>
            <input type="text" value={formData.cta} onChange={e => setFormData({ ...formData, cta: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="Try the Alexa demo" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>CTA Href</label>
            <input type="text" value={formData.href} onChange={e => setFormData({ ...formData, href: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="/#studio" />
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Case Study URL (Optional)</label>
          <input type="text" value={formData.caseStudyHref} onChange={e => setFormData({ ...formData, caseStudyHref: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="/projects/alexa-business-agent" />
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Lists & Details</h2>
        {renderArrayEditor("Tags", "tags")}
        {renderArrayEditor("Capabilities", "capabilities")}
        {renderArrayEditor("Integrations", "integrations")}
        {renderArrayEditor("Outcomes", "outcomes")}
      </div>
    </div>
  );
}
