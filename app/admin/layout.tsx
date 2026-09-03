"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabase-client";
import { LayoutDashboard, FileText, Briefcase, Lightbulb, FolderKanban, LogOut, Mail } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    supabaseBrowserClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabaseBrowserClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    const { error } = await supabaseBrowserClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabaseBrowserClient.auth.signOut();
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "100px" }}>
        Loading Admin...
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ maxWidth: "400px", margin: "100px auto", padding: "40px", background: "#fff", color: "#111", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "24px", fontWeight: "600", textAlign: "center" }}>Admin Login</h1>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", color: "#111", background: "#fff" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", color: "#111", background: "#fff" }}
            />
          </div>
          {authError && <div style={{ color: "red", fontSize: "14px" }}>{authError}</div>}
          <button 
            type="submit" 
            style={{ padding: "12px", background: "#0b0c0b", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "600", cursor: "pointer", marginTop: "8px" }}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/blog", label: "Blog Articles", icon: FileText },
    { href: "/admin/services", label: "Services", icon: Briefcase },
    { href: "/admin/solutions", label: "Solutions", icon: Lightbulb },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/subscribers", label: "Subscribers", icon: Mail },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa", color: "#111" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", background: "#fff", borderRight: "1px solid #eaeaea", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #eaeaea" }}>
          <strong style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>CreativeX Admin</strong>
        </div>
        <nav style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px", 
                  padding: "10px 14px", 
                  borderRadius: "6px",
                  background: isActive ? "#f0f0f0" : "transparent",
                  color: isActive ? "#000" : "#555",
                  fontWeight: isActive ? "600" : "500",
                  textDecoration: "none",
                  fontSize: "14px"
                }}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: "16px", borderTop: "1px solid #eaeaea" }}>
          <button 
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 14px", background: "transparent", border: "none", color: "#666", cursor: "pointer", fontWeight: "500", textAlign: "left" }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
