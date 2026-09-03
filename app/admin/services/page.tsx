"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Plus, Settings, Loader2 } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase-client";
import type { Service } from "@/lib/services";

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabaseBrowserClient
          .from("services")
          .select("*")
          .order("number", { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
  }, []);

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === services.length - 1) return;
    
    setIsMoving(true);
    const newServices = [...services];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    
    const currentItem = { ...newServices[index] };
    const swapItem = { ...newServices[swapIndex] };
    
    const currentNum = currentItem.number;
    currentItem.number = swapItem.number;
    swapItem.number = currentNum;
    
    newServices[index] = swapItem;
    newServices[swapIndex] = currentItem;
    
    try {
      const { error } = await supabaseBrowserClient
        .from("services")
        .upsert([currentItem, swapItem]);
        
      if (error) throw error;
      setServices(newServices);
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
          <h1 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "600", letterSpacing: "-0.5px" }}>Services</h1>
          <p style={{ margin: "0", color: "#666" }}>Manage services shown on the website.</p>
        </div>
        <Link 
          href="/admin/services/new"
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
          <Plus size={16} /> New Service
        </Link>
      </div>

      {isLoading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>Loading services...</div>
      ) : error ? (
        <div style={{ padding: "20px", background: "#fee", color: "#c00", borderRadius: "8px" }}>
          Error loading services: {error}
        </div>
      ) : services.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", background: "#f9f9f9", borderRadius: "8px", border: "1px dashed #ccc" }}>
          <p style={{ margin: "0 0 16px", color: "#666" }}>No services found.</p>
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eaeaea", background: "#fafafa" }}>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600", width: "80px" }}>No.</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Title</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Headline</th>
                <th style={{ padding: "16px", textAlign: "right", fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ opacity: isMoving ? 0.6 : 1, transition: "opacity 0.2s" }}>
              {services.map((srv, index) => (
                <tr key={srv.id} style={{ borderBottom: "1px solid #eaeaea" }}>
                  <td style={{ padding: "16px", color: "#666", fontSize: "14px" }}>{srv.number}</td>
                  <td style={{ padding: "16px", fontWeight: "500" }}>{srv.title}</td>
                  <td style={{ padding: "16px", color: "#666", fontSize: "14px" }}>
                    {srv.headline?.substring(0, 60)}...
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
                        disabled={index === services.length - 1 || isMoving}
                        style={{ padding: "6px", background: "transparent", border: "1px solid #ddd", borderRadius: "4px", cursor: index === services.length - 1 || isMoving ? "not-allowed" : "pointer", opacity: index === services.length - 1 ? 0.3 : 1 }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                    <Link 
                      href={`/admin/services/${srv.slug}`}
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
