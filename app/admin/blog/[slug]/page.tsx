"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Loader2, Image as ImageIcon, Plus, Trash2, GripVertical } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase-client";

// A small utility for creating a random string for file uploads
const generateFileId = () => Math.random().toString(36).substring(2, 9);

interface Section {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  media_url?: string;
}

interface Reference {
  href: string;
  label: string;
}

interface ArticleForm {
  slug: string;
  number: string;
  category: string;
  title: string;
  excerpt: string;
  published_date: string;
  updated_date: string;
  read_time: string;
  featured: boolean;
  media_url: string;
  tags: string[];
  takeaways: string[];
  references: Reference[];
  sections: Section[];
}

export default function AdminBlogEditor() {
  const router = useRouter();
  const params = useParams();
  
  const slug = params?.slug as string | undefined;
  const isNew = slug === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<ArticleForm>({
    slug: "",
    number: "",
    category: "",
    title: "",
    excerpt: "",
    published_date: new Date().toISOString().split('T')[0],
    updated_date: new Date().toISOString().split('T')[0],
    read_time: "5 min read",
    featured: false,
    media_url: "",
    tags: [],
    takeaways: [],
    references: [],
    sections: [],
  });

  useEffect(() => {
    if (!isNew) {
      fetchArticle();
    }
  }, [isNew]);

  const fetchArticle = async () => {
    const { data, error } = await supabaseBrowserClient
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();
    
    if (data) {
      setFormData({
        slug: data.slug || "",
        number: data.number || "",
        category: data.category || "",
        title: data.title || "",
        excerpt: data.excerpt || "",
        published_date: data.published_date || "",
        updated_date: data.updated_date || "",
        read_time: data.read_time || "",
        featured: data.featured || false,
        media_url: data.media_url || "",
        tags: data.tags || [],
        takeaways: data.takeaways || [],
        references: data.references || [],
        sections: data.sections || [],
      });
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${generateFileId()}-${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { data, error } = await supabaseBrowserClient.storage
        .from('project_media')
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabaseBrowserClient.storage
        .from('project_media')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        media_url: publicUrlData.publicUrl
      }));
      
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
      alert('Error uploading file. Check if your bucket exists and is public.');
    } finally {
      setUploading(false);
    }
  };

  const handleSectionFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, secIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${generateFileId()}-${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { data, error } = await supabaseBrowserClient.storage
        .from('project_media')
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabaseBrowserClient.storage
        .from('project_media')
        .getPublicUrl(filePath);

      updateSection(secIndex, "media_url", publicUrlData.publicUrl);
    } catch (error: any) {
      console.error('Error uploading section file:', error.message);
      alert('Error uploading file.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const payload = { ...formData };

      if (isNew) {
        const { error } = await supabaseBrowserClient
          .from("articles")
          .insert([payload])
          .select();
        if (error) throw error;
        router.push("/admin/blog");
      } else {
        const { error } = await supabaseBrowserClient
          .from("articles")
          .update(payload)
          .eq("slug", slug)
          .select();
        if (error) throw error;
        alert("Article updated successfully!");
      }
    } catch (error: any) {
      console.error("Save error:", error);
      alert(`Error saving: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // --- Array State Updaters ---

  const addTag = () => {
    setFormData(prev => ({ ...prev, tags: [...prev.tags, ""] }));
  };
  const updateTag = (index: number, val: string) => {
    const newTags = [...formData.tags];
    newTags[index] = val;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };
  const removeTag = (index: number) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
  };

  const addTakeaway = () => {
    setFormData(prev => ({ ...prev, takeaways: [...prev.takeaways, ""] }));
  };
  const updateTakeaway = (index: number, val: string) => {
    const newTakeaways = [...formData.takeaways];
    newTakeaways[index] = val;
    setFormData(prev => ({ ...prev, takeaways: newTakeaways }));
  };
  const removeTakeaway = (index: number) => {
    setFormData(prev => ({ ...prev, takeaways: prev.takeaways.filter((_, i) => i !== index) }));
  };

  const addReference = () => {
    setFormData(prev => ({ ...prev, references: [...prev.references, { label: "", href: "" }] }));
  };
  const updateReference = (index: number, field: keyof Reference, val: string) => {
    const newRefs = [...formData.references];
    newRefs[index] = { ...newRefs[index], [field]: val };
    setFormData(prev => ({ ...prev, references: newRefs }));
  };
  const removeReference = (index: number) => {
    setFormData(prev => ({ ...prev, references: prev.references.filter((_, i) => i !== index) }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { id: `section-${Date.now()}`, heading: "", paragraphs: [""], bullets: [] }]
    }));
  };
  const updateSection = (index: number, field: keyof Section, val: any) => {
    const newSecs = [...formData.sections];
    newSecs[index] = { ...newSecs[index], [field]: val };
    setFormData(prev => ({ ...prev, sections: newSecs }));
  };
  const removeSection = (index: number) => {
    setFormData(prev => ({ ...prev, sections: prev.sections.filter((_, i) => i !== index) }));
  };

  const addParagraph = (secIndex: number) => {
    const newSecs = [...formData.sections];
    newSecs[secIndex].paragraphs.push("");
    setFormData(prev => ({ ...prev, sections: newSecs }));
  };
  const updateParagraph = (secIndex: number, pIndex: number, val: string) => {
    const newSecs = [...formData.sections];
    newSecs[secIndex].paragraphs[pIndex] = val;
    setFormData(prev => ({ ...prev, sections: newSecs }));
  };
  const removeParagraph = (secIndex: number, pIndex: number) => {
    const newSecs = [...formData.sections];
    newSecs[secIndex].paragraphs = newSecs[secIndex].paragraphs.filter((_, i) => i !== pIndex);
    setFormData(prev => ({ ...prev, sections: newSecs }));
  };

  const addBullet = (secIndex: number) => {
    const newSecs = [...formData.sections];
    if (!newSecs[secIndex].bullets) newSecs[secIndex].bullets = [];
    newSecs[secIndex].bullets!.push("");
    setFormData(prev => ({ ...prev, sections: newSecs }));
  };
  const updateBullet = (secIndex: number, bIndex: number, val: string) => {
    const newSecs = [...formData.sections];
    newSecs[secIndex].bullets![bIndex] = val;
    setFormData(prev => ({ ...prev, sections: newSecs }));
  };
  const removeBullet = (secIndex: number, bIndex: number) => {
    const newSecs = [...formData.sections];
    newSecs[secIndex].bullets = newSecs[secIndex].bullets!.filter((_, i) => i !== bIndex);
    setFormData(prev => ({ ...prev, sections: newSecs }));
  };

  if (loading) {
    return <div>Loading editor...</div>;
  }

  const inputStyle = {
    width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", marginTop: "4px"
  };

  const sectionStyle = {
    background: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #eaeaea", marginBottom: "24px"
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", position: "sticky", top: 0, background: "#f8f9fa", padding: "20px 0", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/admin/blog" style={{ color: "#666" }}>
            <ArrowLeft size={20} />
          </Link>
          <h1 style={{ fontSize: "28px", fontWeight: "600", margin: 0, letterSpacing: "-0.02em" }}>
            {isNew ? "Create Article" : "Edit Article"}
          </h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            padding: "12px 24px", 
            background: "#0b0c0b", 
            color: "#fff", 
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      <form style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px", alignItems: "start" }}>
        
        {/* Main Content Area */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          
          <div style={sectionStyle}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", marginTop: 0 }}>Basic Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontWeight: "500", fontSize: "14px" }}>Title</label>
                <input name="title" value={formData.title} onChange={handleInputChange} style={inputStyle} required />
              </div>
              <div>
                <label style={{ fontWeight: "500", fontSize: "14px" }}>Slug (URL path)</label>
                <input name="slug" value={formData.slug} onChange={handleInputChange} disabled={!isNew} style={{...inputStyle, background: !isNew ? "#f5f5f5" : "#fff"}} required />
              </div>
              <div>
                <label style={{ fontWeight: "500", fontSize: "14px" }}>Excerpt</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} style={{...inputStyle, minHeight: "80px", resize: "vertical"}} required />
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>Content Sections</h3>
              <button type="button" onClick={addSection} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
                <Plus size={14} /> Add Section
              </button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {formData.sections.map((section, sIndex) => (
                <div key={sIndex} style={{ borderLeft: "4px solid #eaeaea", paddingLeft: "16px" }}>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: "500", fontSize: "13px", color: "#666" }}>Heading</label>
                      <input value={section.heading} onChange={(e) => updateSection(sIndex, "heading", e.target.value)} style={inputStyle} placeholder="Section heading" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: "500", fontSize: "13px", color: "#666" }}>Section ID (for anchor links)</label>
                      <input value={section.id} onChange={(e) => updateSection(sIndex, "id", e.target.value)} style={inputStyle} placeholder="e.g. what-geo-is" />
                    </div>
                    <button type="button" onClick={() => removeSection(sIndex)} style={{ marginTop: "24px", padding: "10px", background: "#feebeb", color: "#d32f2f", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Paragraphs */}
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontWeight: "500", fontSize: "13px", color: "#666", display: "block", marginBottom: "8px" }}>Paragraphs</label>
                    {section.paragraphs.map((p, pIndex) => (
                      <div key={pIndex} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <textarea value={p} onChange={(e) => updateParagraph(sIndex, pIndex, e.target.value)} style={{...inputStyle, minHeight: "80px"}} />
                        <button type="button" onClick={() => removeParagraph(sIndex, pIndex)} style={{ background: "transparent", color: "#999", border: "none", cursor: "pointer" }}><Trash2 size={16}/></button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addParagraph(sIndex)} style={{ fontSize: "12px", color: "#555", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Plus size={12}/> Add Paragraph
                    </button>
                  </div>

                  {/* Section Image */}
                  <div style={{ marginBottom: "16px", padding: "16px", border: "1px solid #eaeaea", borderRadius: "8px", background: "#f9f9f9" }}>
                    <label style={{ fontWeight: "500", fontSize: "13px", color: "#666", display: "block", marginBottom: "8px" }}>Section Image (Optional)</label>
                    {section.media_url ? (
                      <div style={{ position: "relative", borderRadius: "6px", overflow: "hidden", border: "1px solid #ddd", width: "fit-content", maxWidth: "100%" }}>
                        <img src={section.media_url} alt="Section Cover" style={{ maxHeight: "200px", display: "block" }} />
                        <button 
                          type="button"
                          onClick={() => updateSection(sIndex, "media_url", "")}
                          style={{ position: "absolute", top: "8px", right: "8px", background: "red", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 8px", cursor: "pointer", fontSize: "12px" }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div style={{ padding: "16px", border: "1px dashed #ccc", borderRadius: "6px", textAlign: "center", position: "relative", maxWidth: "300px" }}>
                        <ImageIcon size={24} color="#aaa" style={{ margin: "0 auto 8px" }} />
                        <div style={{ fontSize: "12px", color: "#666" }}>Upload Section Image</div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleSectionFileUpload(e, sIndex)}
                          style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Bullets */}
                  <div>
                    <label style={{ fontWeight: "500", fontSize: "13px", color: "#666", display: "block", marginBottom: "8px" }}>Bullets (Optional)</label>
                    {section.bullets?.map((b, bIndex) => (
                      <div key={bIndex} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <input value={b} onChange={(e) => updateBullet(sIndex, bIndex, e.target.value)} style={inputStyle} />
                        <button type="button" onClick={() => removeBullet(sIndex, bIndex)} style={{ background: "transparent", color: "#999", border: "none", cursor: "pointer" }}><Trash2 size={16}/></button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addBullet(sIndex)} style={{ fontSize: "12px", color: "#555", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Plus size={12}/> Add Bullet
                    </button>
                  </div>
                </div>
              ))}
              {formData.sections.length === 0 && <p style={{ color: "#888", fontSize: "14px" }}>No sections added yet.</p>}
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>Takeaways</h3>
              <button type="button" onClick={addTakeaway} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
                <Plus size={14} /> Add Takeaway
              </button>
            </div>
            {formData.takeaways.map((t, index) => (
              <div key={index} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input value={t} onChange={(e) => updateTakeaway(index, e.target.value)} style={inputStyle} placeholder="Actionable takeaway..." />
                <button type="button" onClick={() => removeTakeaway(index)} style={{ background: "transparent", color: "#999", border: "none", cursor: "pointer", marginTop: "4px" }}><Trash2 size={16}/></button>
              </div>
            ))}
          </div>

          <div style={sectionStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>Primary Reading (References)</h3>
              <button type="button" onClick={addReference} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
                <Plus size={14} /> Add Reference
              </button>
            </div>
            {formData.references.map((ref, index) => (
              <div key={index} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <input value={ref.label} onChange={(e) => updateReference(index, "label", e.target.value)} style={inputStyle} placeholder="Label (e.g. Google Search Docs)" />
                </div>
                <div style={{ flex: 1 }}>
                  <input value={ref.href} onChange={(e) => updateReference(index, "href", e.target.value)} style={inputStyle} placeholder="URL (e.g. https://...)" />
                </div>
                <button type="button" onClick={() => removeReference(index)} style={{ background: "transparent", color: "#999", border: "none", cursor: "pointer", padding: "12px 0 0 0" }}><Trash2 size={16}/></button>
              </div>
            ))}
          </div>

        </div>

        {/* Sidebar Settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div style={{ background: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #eaeaea", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>Media</h3>
            
            {formData.media_url ? (
              <div style={{ position: "relative", borderRadius: "6px", overflow: "hidden", border: "1px solid #ddd" }}>
                <img src={formData.media_url} alt="Cover" style={{ width: "100%", display: "block" }} />
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({...prev, media_url: ""}))}
                  style={{ position: "absolute", top: "8px", right: "8px", background: "red", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 8px", cursor: "pointer", fontSize: "12px" }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div style={{ padding: "32px", border: "2px dashed #ccc", borderRadius: "6px", textAlign: "center", position: "relative" }}>
                {uploading ? (
                  <div style={{ color: "#666", fontSize: "14px" }}>Uploading...</div>
                ) : (
                  <>
                    <ImageIcon size={32} color="#aaa" style={{ margin: "0 auto 8px" }} />
                    <div style={{ fontSize: "13px", color: "#666" }}>Upload Image or Video</div>
                    <input 
                      type="file" 
                      accept="image/*,video/*" 
                      onChange={handleFileUpload}
                      style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
                    />
                  </>
                )}
              </div>
            )}
          </div>

          <div style={{ background: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #eaeaea", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>Settings</h3>
            
            <div>
              <label style={{ fontWeight: "500", fontSize: "14px" }}>Number (e.g. "01")</label>
              <input name="number" value={formData.number} onChange={handleInputChange} style={inputStyle} required />
            </div>
            
            <div>
              <label style={{ fontWeight: "500", fontSize: "14px" }}>Category</label>
              <input name="category" value={formData.category} onChange={handleInputChange} style={inputStyle} required />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
              <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleInputChange} style={{ width: "16px", height: "16px" }} />
              <label htmlFor="featured" style={{ fontWeight: "500", fontSize: "14px", cursor: "pointer" }}>Feature this article</label>
            </div>
          </div>

          <div style={{ background: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #eaeaea" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>Topics (Tags)</h3>
              <button type="button" onClick={addTag} style={{ background: "none", border: "none", color: "#0066cc", cursor: "pointer", fontSize: "13px" }}>+ Add</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {formData.tags.map((tag, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "4px", background: "#f0f0f0", padding: "4px 8px", borderRadius: "16px" }}>
                  <input value={tag} onChange={(e) => updateTag(index, e.target.value)} style={{ background: "transparent", border: "none", outline: "none", width: "80px", fontSize: "12px" }} placeholder="Tag..." />
                  <button type="button" onClick={() => removeTag(index)} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", display: "flex" }}><Trash2 size={12}/></button>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </form>
    </div>
  );
}
