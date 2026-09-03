"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase-client";

export default function ProjectEditorPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const isNew = slug === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const dataToSave = {
        ...formData,
        caseStudyHref: formData.caseStudyHref || null,
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

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Call to Action (CTA) & Links</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>CTA Text</label>
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
