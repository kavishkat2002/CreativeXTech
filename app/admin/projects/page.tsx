"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Plus, Settings } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase-client";
import type { Project } from "@/lib/projects";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabaseBrowserClient
          .from("projects")
          .select("*")
          .order("number", { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === projects.length - 1) return;
    
    setIsMoving(true);
    const newProjects = [...projects];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    
    const currentItem = { ...newProjects[index] };
    const swapItem = { ...newProjects[swapIndex] };
    
    const currentNum = currentItem.number;
    currentItem.number = swapItem.number;
    swapItem.number = currentNum;
    
    newProjects[index] = swapItem;
    newProjects[swapIndex] = currentItem;
    
    try {
      const { error } = await supabaseBrowserClient
        .from("projects")
        .upsert([currentItem, swapItem]);
        
      if (error) throw error;
      setProjects(newProjects);
    } catch (err: any) {
      setError("Failed to reorder: " + err.message);
    } finally {
      setIsMoving(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "600", letterSpacing: "-0.5px" }}>Projects</h1>
          <p style={{ margin: "0", color: "#666" }}>Manage portfolio projects and case studies shown on the website.</p>
        </div>
        <Link 
          href="/admin/projects/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#111",
            color: "white",
            padding: "10px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            textDecoration: "none"
          }}
        >
          <Plus size={16} /> New Project
        </Link>
      </div>

      {isLoading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>Loading projects...</div>
      ) : error ? (
        <div style={{ padding: "20px", background: "#fee", color: "#c00", borderRadius: "8px" }}>
          Error loading projects: {error}
        </div>
      ) : projects.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", background: "#f9f9f9", borderRadius: "8px", border: "1px dashed #ccc" }}>
          <p style={{ margin: "0 0 16px", color: "#666" }}>No projects found.</p>
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eaeaea", background: "#fafafa" }}>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600", width: "80px" }}>No.</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Title</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Category</th>
                <th style={{ padding: "16px", textAlign: "right", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ opacity: isMoving ? 0.6 : 1, transition: "opacity 0.2s" }}>
              {projects.map((proj, index) => (
                <tr key={proj.id || proj.slug} style={{ borderBottom: "1px solid #eaeaea" }}>
                  <td style={{ padding: "16px", color: "#666", fontSize: "14px" }}>{proj.number}</td>
                  <td style={{ padding: "16px", fontWeight: "500" }}>{proj.title}</td>
                  <td style={{ padding: "16px", color: "#666", fontSize: "14px" }}>
                    <span style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
                      {proj.category}
                    </span>
                  </td>
                  <td style={{ padding: "16px", textAlign: "right", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <div style={{ display: "flex", gap: "4px", marginRight: "8px" }}>
                      <button 
                        onClick={() => handleMove(index, "up")}
                        disabled={index === 0 || isMoving}
                        style={{ padding: "6px", background: "transparent", border: "1px solid #ddd", borderRadius: "4px", cursor: index === 0 || isMoving ? "not-allowed" : "pointer", opacity: index === 0 ? 0.3 : 1 }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        onClick={() => handleMove(index, "down")}
                        disabled={index === projects.length - 1 || isMoving}
                        style={{ padding: "6px", background: "transparent", border: "1px solid #ddd", borderRadius: "4px", cursor: index === projects.length - 1 || isMoving ? "not-allowed" : "pointer", opacity: index === projects.length - 1 ? 0.3 : 1 }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                    <Link 
                      href={`/admin/projects/${proj.slug}`}
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        gap: "6px", 
                        padding: "6px 12px", 
                        background: "#f4f4f5", 
                        color: "#18181b", 
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: "500",
                        textDecoration: "none"
                      }}
                    >
                      <Settings size={14} /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
