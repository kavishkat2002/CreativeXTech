"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Settings } from "lucide-react";
import { supabaseBrowserClient } from "@/lib/supabase-client";
import type { Service } from "@/lib/services";

export default function ServicesAdminPage() {
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabaseBrowserClient
      .from("services")
      .select("*")
      .order("number", { ascending: true });

    if (error) {
      console.error("Error fetching services:", error);
    } else {
      setServicesList(data || []);
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "600", letterSpacing: "-0.03em", color: "#111" }}>Services</h1>
          <p style={{ margin: 0, fontSize: "15px", color: "#666" }}>Manage your AI and software engineering services</p>
        </div>
        <Link 
          href="/admin/services/new" 
          style={{ display: "flex", alignItems: "center", gap: "8px", background: "#0b0c0b", color: "#fff", textDecoration: "none", padding: "10px 16px", borderRadius: "6px", fontWeight: "500" }}
        >
          <Plus size={16} /> New Service
        </Link>
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#666" }}>Loading services...</div>
        ) : servicesList.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#666" }}>
            <Settings size={32} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
            No services found. Add one in the database or seed it.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eaeaea", background: "#fafafa" }}>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "500", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>No.</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "500", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>Service Title</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "500", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>Eyebrow</th>
                <th style={{ padding: "16px 24px", width: "120px" }}></th>
              </tr>
            </thead>
            <tbody>
              {servicesList.map((service) => (
                <tr key={service.id} style={{ borderBottom: "1px solid #eaeaea" }}>
                  <td style={{ padding: "16px 24px", color: "#666" }}>{service.number}</td>
                  <td style={{ padding: "16px 24px", fontWeight: "500", color: "#111" }}>{service.title}</td>
                  <td style={{ padding: "16px 24px", color: "#666", fontSize: "14px" }}>{service.eyebrow}</td>
                  <td style={{ padding: "16px 24px", textAlign: "right" }}>
                    <Link 
                      href={`/admin/services/${service.slug}`}
                      style={{ fontSize: "14px", fontWeight: "500", color: "#111", textDecoration: "none", padding: "6px 12px", background: "#f4f4f5", borderRadius: "6px" }}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
