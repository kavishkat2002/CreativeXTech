"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase-client";

type ServiceForm = {
  id?: string;
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  headline: string;
  copy: string;
  overview: string;
  details: string[];
  features: string[];
  useCases: string[];
  process: string[];
  controls: string[];
  outcomes: string[];
};

export default function EditServicePage() {
  const { slug } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState<ServiceForm>({
    slug: "", number: "", eyebrow: "", title: "", headline: "", copy: "", overview: "",
    details: [], features: [], useCases: [], process: [], controls: [], outcomes: []
  });

  useEffect(() => {
    async function fetchService() {
      if (!slug || slug === "new") {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabaseBrowserClient
        .from("services")
        .select("*")
        .eq("slug", slug as string)
        .single();
        
      if (error) {
        console.error(error);
      } else if (data) {
        setFormData({
          id: data.id,
          slug: data.slug,
          number: data.number || "",
          eyebrow: data.eyebrow || "",
          title: data.title || "",
          headline: data.headline || "",
          copy: data.copy || "",
          overview: data.overview || "",
          details: data.details || [],
          features: data.features || [],
          useCases: data.useCases || data.use_cases || [], // handle camelCase vs snake_case based on DB
          process: data.process || [],
          controls: data.controls || [],
          outcomes: data.outcomes || [],
        });
      }
      setLoading(false);
    }
    fetchService();
  }, [slug]);

  const handleSave = async () => {
    setSaving(true);
    const dbPayload = {
      slug: formData.slug,
      number: formData.number,
      eyebrow: formData.eyebrow,
      title: formData.title,
      headline: formData.headline,
      copy: formData.copy,
      overview: formData.overview,
      details: formData.details,
      features: formData.features,
      useCases: formData.useCases,
      process: formData.process,
      controls: formData.controls,
      outcomes: formData.outcomes,
    };

    let error;
    if (formData.id) {
      const res = await supabaseBrowserClient.from("services").update(dbPayload).eq("id", formData.id);
      error = res.error;
    } else {
      const res = await supabaseBrowserClient.from("services").insert([dbPayload]);
      error = res.error;
    }

    if (error) {
      alert("Failed to save service: " + error.message);
    } else {
      alert("Service saved successfully!");
      if (slug === "new") {
        router.push("/admin/services");
      }
    }
    setSaving(false);
  };

  const updateArrayField = (field: keyof ServiceForm, index: number, value: string) => {
    setFormData(prev => {
      const arr = [...(prev[field] as string[])];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field: keyof ServiceForm) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""]
    }));
  };

  const removeArrayItem = (field: keyof ServiceForm, index: number) => {
    setFormData(prev => {
      const arr = [...(prev[field] as string[])];
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  const renderArrayEditor = (title: string, field: keyof ServiceForm) => {
    const items = formData[field] as string[];
    return (
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>{title}</label>
          <button onClick={() => addArrayItem(field)} style={{ background: "#eaeaea", border: "none", padding: "4px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
            <Plus size={14} /> Add Item
          </button>
        </div>
        {items.length === 0 && <div style={{ fontSize: "13px", color: "#666", fontStyle: "italic", marginBottom: "8px" }}>No items added yet.</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: "flex", gap: "8px" }}>
              <input 
                type="text" 
                value={item}
                onChange={e => updateArrayField(field, idx, e.target.value)}
                style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "14px" }}
              />
              <button onClick={() => removeArrayItem(field, idx)} style={{ background: "#fee", color: "#e60000", border: "1px solid #fcc", padding: "0 12px", borderRadius: "6px", cursor: "pointer" }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <div style={{ padding: "40px" }}>Loading...</div>;

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/admin/services" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "600", letterSpacing: "-0.02em" }}>
            {formData.id ? "Edit Service" : "New Service"}
          </h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ display: "flex", alignItems: "center", gap: "8px", background: "#0b0c0b", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "6px", fontWeight: "500", cursor: "pointer", opacity: saving ? 0.7 : 1 }}
        >
          {saving ? <Loader2 size={16} style={{ animation: "spin 2s linear infinite" }} /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Service"}
        </button>
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Hero Section & SEO</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Number</label>
            <input type="text" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="01" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Slug (URL)</label>
            <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="ai-automation-agents" />
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Eyebrow</label>
          <input type="text" value={formData.eyebrow} onChange={e => setFormData({ ...formData, eyebrow: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Title (H1)</label>
          <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px", fontWeight: "500" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Copy (SEO Description)</label>
          <textarea value={formData.copy} onChange={e => setFormData({ ...formData, copy: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", minHeight: "80px", resize: "vertical" }} />
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Service Overview / 01</h2>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Headline (H2)</label>
          <input type="text" value={formData.headline} onChange={e => setFormData({ ...formData, headline: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Overview Paragraph</label>
          <textarea value={formData.overview} onChange={e => setFormData({ ...formData, overview: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", minHeight: "120px", resize: "vertical" }} />
        </div>
        {renderArrayEditor("Tags (e.g. Workflow orchestration, Agent systems)", "details")}
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>What we deliver / 02</h2>
        {renderArrayEditor("Features", "features")}
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Where it creates value / 03</h2>
        {renderArrayEditor("Use Cases", "useCases")}
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>How we deliver / 04</h2>
        {renderArrayEditor("Process Steps", "process")}
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Built-in controls / 05</h2>
        {renderArrayEditor("Controls", "controls")}
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Designed outcomes / 06</h2>
        {renderArrayEditor("Outcomes", "outcomes")}
      </div>
    </div>
  );
}
