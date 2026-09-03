import Link from "next/link";
import { FileText, Briefcase, Lightbulb, FolderKanban } from "lucide-react";

export default function AdminDashboardPage() {
  const sections = [
    { title: "Blog Articles", desc: "Manage your published blog posts.", href: "/admin/blog", icon: FileText },
    { title: "Services", desc: "Update your service offerings and details.", href: "/admin/services", icon: Briefcase },
    { title: "Solutions", desc: "Manage industry solutions and capabilities.", href: "/admin/solutions", icon: Lightbulb },
    { title: "Projects", desc: "Update case studies and project portfolio.", href: "/admin/projects", icon: FolderKanban },
  ];

  return (
    <div>
      <h1 style={{ fontSize: "32px", fontWeight: "600", marginBottom: "8px", letterSpacing: "-0.03em" }}>Dashboard</h1>
      <p style={{ color: "#666", marginBottom: "40px" }}>Welcome to the CreativeX Content Management System.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
        {sections.map((sec) => (
          <Link 
            key={sec.href} 
            href={sec.href}
            style={{ 
              display: "flex", 
              flexDirection: "column",
              padding: "24px", 
              background: "#fff", 
              border: "1px solid #eaeaea", 
              borderRadius: "12px",
              textDecoration: "none",
              color: "inherit",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ padding: "10px", background: "#f5f5f5", borderRadius: "8px", color: "#333" }}>
                <sec.icon size={24} />
              </div>
              <h2 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>{sec.title}</h2>
            </div>
            <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>
              {sec.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
