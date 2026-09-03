"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase-client";

export default function SolutionEditorPage() {
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
    label: "",
    headline: "",
    copy: "",
    system: "",
    capabilities: [] as string[],
    outcomes: [] as string[],
  });

  useEffect(() => {
    if (isNew) return;

    async function fetchSolution() {
      try {
        const { data, error } = await supabaseBrowserClient
          .from("solutions")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        if (data) {
          setFormData({
            number: data.number || "",
            slug: data.slug || "",
            label: data.label || "",
            headline: data.headline || "",
            copy: data.copy || "",
            system: data.system || "",
            capabilities: data.capabilities || [],
            outcomes: data.outcomes || [],
          });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSolution();
  }, [slug, isNew]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      if (isNew) {
        const { error } = await supabaseBrowserClient.from("solutions").insert([formData]);
        if (error) throw error;
        router.push("/admin/solutions");
      } else {
        const { error } = await supabaseBrowserClient
          .from("solutions")
          .update(formData)
          .eq("slug", slug);
        if (error) throw error;
        router.push("/admin/solutions");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateArray = (field: "capabilities" | "outcomes", index: number, value: string) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayItem = (field: "capabilities" | "outcomes") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field: "capabilities" | "outcomes", index: number) => {
    const newArr = [...formData[field]];
    newArr.splice(index, 1);
    setFormData({ ...formData, [field]: newArr });
  };

  const renderArrayEditor = (title: string, field: "capabilities" | "outcomes") => (
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

  if (isLoading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading solution...</div>;

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/admin/solutions" style={{ color: "#666", textDecoration: "none" }}><ArrowLeft size={20} /></Link>
          <h1 style={{ margin: "0", fontSize: "24px", fontWeight: "600", letterSpacing: "-0.5px" }}>
            {isNew ? "Create Solution" : "Edit Solution"}
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
          Error saving solution: {error}
        </div>
      )}

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Hero Section & Identifiers</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Number</label>
            <input type="text" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="01" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Slug (URL)</label>
            <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="export-logistics" />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Label (Industry Name)</label>
          <input type="text" value={formData.label} onChange={e => setFormData({ ...formData, label: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px", fontWeight: "500" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Headline (H2)</label>
          <input type="text" value={formData.headline} onChange={e => setFormData({ ...formData, headline: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Copy (Lead Paragraph)</label>
          <textarea value={formData.copy} onChange={e => setFormData({ ...formData, copy: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", minHeight: "100px", resize: "vertical" }} />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>System Shape (Footer label)</label>
          <input type="text" value={formData.system} onChange={e => setFormData({ ...formData, system: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} placeholder="Operations intelligence platform" />
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>What we build</h2>
        {renderArrayEditor("Capabilities List", "capabilities")}
      </div>
      
      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>Designed outcomes</h2>
        {renderArrayEditor("Outcomes List", "outcomes")}
      </div>
    </div>
  );
}
