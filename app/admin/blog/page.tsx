"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowserClient } from "@/lib/supabase-client";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabaseBrowserClient
      .from("articles")
      .select("*")
      .order("number", { ascending: true });
    
    if (data) {
      setArticles(data);
    }
    setLoading(false);
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`Are you sure you want to delete ${slug}?`)) return;
    
    await supabaseBrowserClient.from("articles").delete().eq("slug", slug);
    fetchArticles();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "8px", letterSpacing: "-0.02em" }}>Blog Articles</h1>
          <p style={{ color: "#666", margin: 0 }}>Manage your published posts and case studies.</p>
        </div>
        <Link 
          href="/admin/blog/new" 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            padding: "10px 16px", 
            background: "#0b0c0b", 
            color: "#fff", 
            textDecoration: "none", 
            borderRadius: "6px",
            fontWeight: "500",
            fontSize: "14px"
          }}
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      {loading ? (
        <div>Loading articles...</div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "8px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f9f9f9", borderBottom: "1px solid #eaeaea" }}>
                <th style={{ padding: "16px", fontWeight: "500", color: "#555", fontSize: "13px" }}>Number</th>
                <th style={{ padding: "16px", fontWeight: "500", color: "#555", fontSize: "13px" }}>Title</th>
                <th style={{ padding: "16px", fontWeight: "500", color: "#555", fontSize: "13px" }}>Category</th>
                <th style={{ padding: "16px", fontWeight: "500", color: "#555", fontSize: "13px" }}>Status</th>
                <th style={{ padding: "16px", fontWeight: "500", color: "#555", fontSize: "13px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "32px", textAlign: "center", color: "#888" }}>No articles found.</td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} style={{ borderBottom: "1px solid #eaeaea" }}>
                    <td style={{ padding: "16px", color: "#666", fontSize: "14px" }}>{article.number}</td>
                    <td style={{ padding: "16px", fontWeight: "500", fontSize: "14px" }}>{article.title}</td>
                    <td style={{ padding: "16px", color: "#666", fontSize: "14px" }}>
                      <span style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
                        {article.category}
                      </span>
                    </td>
                    <td style={{ padding: "16px", fontSize: "14px" }}>
                      {article.featured ? (
                        <span style={{ color: "#0066cc", fontWeight: "500" }}>Featured</span>
                      ) : (
                        <span style={{ color: "#666" }}>Standard</span>
                      )}
                    </td>
                    <td style={{ padding: "16px", textAlign: "right", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                      <Link 
                        href={`/admin/blog/${article.slug}`}
                        style={{ padding: "6px", color: "#555", background: "#f5f5f5", borderRadius: "4px", display: "inline-flex" }}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(article.slug)}
                        style={{ padding: "6px", color: "#d32f2f", background: "#feebeb", border: "none", borderRadius: "4px", cursor: "pointer", display: "inline-flex" }}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
