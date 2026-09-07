import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Search, ShieldAlert } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "404 - Page Not Found | CreativeX Technology AI",
  description: "The requested page could not be found on CreativeX Technology AI.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="site-shell flex flex-col min-h-screen">
      <SiteHeader activeSection="top" />

      <section className="flex-1 flex items-center justify-center py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-2xl w-full mx-auto text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono tracking-widest text-[#ff5a36] uppercase">
            <ShieldAlert className="w-3.5 h-3.5" /> 404 — Page Not Found
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white/95 leading-tight">
            Lost in the architecture.
          </h1>

          <p className="text-base md:text-lg text-white/60 max-w-lg mx-auto leading-relaxed">
            The page you are looking for does not exist, has been moved, or is no longer available.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#ff5a36] hover:bg-[#ff451d] text-white font-medium text-sm transition-all shadow-lg shadow-[#ff5a36]/20"
            >
              <Home className="w-4 h-4" /> Return to Home
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white/90 font-medium text-sm transition-all"
            >
              <Search className="w-4 h-4" /> Explore Services
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
