"use client";

import { useEffect, useState } from "react";
import { supabaseBrowserClient } from "@/lib/supabase-client";
import { format } from "date-fns";
import { Mail, Trash2 } from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  created_at: string;
};

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabaseBrowserClient
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch subscribers:", error.message);
    } else {
      setSubscribers(data || []);
    }
    setLoading(false);
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;
    
    const { error } = await supabaseBrowserClient
      .from("subscribers")
      .delete()
      .eq("id", id);
      
    if (error) {
      alert("Failed to delete subscriber");
    } else {
      fetchSubscribers();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "600", letterSpacing: "-0.03em", color: "#111" }}>Newsletter Subscribers</h1>
          <p style={{ margin: 0, fontSize: "15px", color: "#666" }}>Manage your email list ({subscribers.length} total)</p>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #eaeaea", borderRadius: "12px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#666" }}>Loading subscribers...</div>
        ) : subscribers.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#666" }}>
            <Mail size={32} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
            No subscribers yet
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eaeaea", background: "#fafafa" }}>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "500", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Address</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "500", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em" }}>Subscribed On</th>
                <th style={{ padding: "16px 24px", width: "80px" }}></th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id} style={{ borderBottom: "1px solid #eaeaea" }}>
                  <td style={{ padding: "16px 24px", fontWeight: "500", color: "#111" }}>
                    <a href={`mailto:${sub.email}`} style={{ textDecoration: "none", color: "inherit" }}>
                      {sub.email}
                    </a>
                  </td>
                  <td style={{ padding: "16px 24px", color: "#666", fontSize: "14px" }}>
                    {format(new Date(sub.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right" }}>
                    <button 
                      onClick={() => deleteSubscriber(sub.id)}
                      style={{ background: "transparent", border: "none", color: "#ff4d4d", cursor: "pointer", display: "flex", alignItems: "center", padding: "8px", borderRadius: "6px" }}
                      title="Delete subscriber"
                    >
                      <Trash2 size={16} />
                    </button>
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
