"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Settings } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase-client";
import type { Solution } from "@/lib/solutions";

export default function SolutionsAdminPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSolutions() {
      try {
        const { data, error } = await supabaseBrowserClient
          .from("solutions")
          .select("*")
          .order("number", { ascending: true });

        if (error) throw error;
        setSolutions(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSolutions();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "600", letterSpacing: "-0.5px" }}>Solutions</h1>
          <p style={{ margin: "0", color: "#666" }}>Manage industry solutions shown on the website.</p>
        </div>
        <Link 
          href="/admin/solutions/new"
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
          <Plus size={16} /> New Solution
        </Link>
      </div>

      {isLoading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>Loading solutions...</div>
      ) : error ? (
        <div style={{ padding: "20px", background: "#fee", color: "#c00", borderRadius: "8px" }}>
          Error loading solutions: {error}
        </div>
      ) : solutions.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", background: "#f9f9f9", borderRadius: "8px", border: "1px dashed #ccc" }}>
          <p style={{ margin: "0 0 16px", color: "#666" }}>No solutions found.</p>
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eaeaea", background: "#fafafa" }}>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>No.</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Label</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Headline</th>
                <th style={{ padding: "16px", textAlign: "right", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {solutions.map((sol) => (
                <tr key={sol.id} style={{ borderBottom: "1px solid #eaeaea" }}>
                  <td style={{ padding: "16px", color: "#666", fontSize: "14px" }}>{sol.number}</td>
                  <td style={{ padding: "16px", fontWeight: "500" }}>{sol.label}</td>
                  <td style={{ padding: "16px", color: "#666", fontSize: "14px" }}>
                    {sol.headline.substring(0, 60)}...
                  </td>
                  <td style={{ padding: "16px", textAlign: "right" }}>
                    <Link 
                      href={`/admin/solutions/${sol.slug}`}
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
