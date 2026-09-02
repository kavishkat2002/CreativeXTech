"use client";

import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";

import { solutions } from "@/lib/solutions";
import { services } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { label: "Home", section: "home" },
  { label: "Services", section: "services" },
  { label: "Solutions", section: "solutions" },
  { label: "Projects", section: "projects" },
  { label: "Blog", section: "blog" },
  { label: "About", section: "about" },
  { label: "Contact", section: "contact" },
];

function sectionHref(section: string, homePage: boolean) {
  if (section === "home") return "/";
  if (section === "solutions") return "/solutions";
  if (section === "projects") return "/projects";
  if (section === "blog") return "/blog";
  if (section === "about") return "/about";
  if (section === "contact") return "/contact";
  return `${homePage ? "" : "/"}#${section}`;
}

export function Brand() {
  return (
    <span className="brand-lockup" aria-label="CreativeX">
      <span className="brand-logo-frame" aria-hidden="true">
        <img src="/brand/creativex-wordmark.webp" alt="" />
      </span>
    </span>
  );
}

export function SiteHeader({
  activeSection = "top",
  scrollProgress = 0,
  homePage = false,
}: {
  activeSection?: string;
  scrollProgress?: number;
  homePage?: boolean;
}) {
  return (
    <header className="site-header">
      <span className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <div className="site-width header-inner">
        <Link href={homePage ? "#top" : "/"} className="brand-link"><Brand /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => item.section === "services" ? (
            <div className="nav-pulldown" key={item.section}>
              <Link
                className={activeSection === item.section ? "active" : ""}
                aria-current={activeSection === item.section ? "page" : undefined}
                href="/services"
              >
                Services <ChevronDown />
              </Link>
              <div className="nav-pulldown-menu nav-services-menu" aria-label="Service pages">
                <div className="nav-pulldown-head">
                  <span>AI & software services</span>
                  <strong>Choose a capability</strong>
                </div>
                {services.map((service) => (
                  <Link href={`/services/${service.slug}`} key={service.slug}>
                    <span>{service.number}</span>
                    <strong>{service.title}</strong>
                    <ArrowUpRight />
                  </Link>
                ))}
                <Link className="nav-pulldown-all" href="/services">View all services <ArrowUpRight /></Link>
              </div>
            </div>
          ) : item.section === "solutions" ? (
            <div className="nav-pulldown" key={item.section}>
              <Link
                className={activeSection === item.section ? "active" : ""}
                aria-current={activeSection === item.section ? "page" : undefined}
                href="/solutions"
              >
                Solutions <ChevronDown />
              </Link>
              <div className="nav-pulldown-menu" aria-label="Solution pages">
                <div className="nav-pulldown-head">
                  <span>Industry solutions</span>
                  <strong>Choose an operating context</strong>
                </div>
                {solutions.map((solution) => (
                  <Link href={`/solutions#${solution.slug}`} key={solution.slug}>
                    <span>{solution.number}</span>
                    <strong>{solution.label}</strong>
                    <ArrowUpRight />
                  </Link>
                ))}
                <Link className="nav-pulldown-all" href="/solutions">View all solutions <ArrowUpRight /></Link>
              </div>
            </div>
          ) : (
            <Link
              className={activeSection === item.section ? "active" : ""}
              aria-current={activeSection === item.section ? "location" : undefined}
              key={item.section}
              href={sectionHref(item.section, homePage)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="header-cta hidden md:inline-flex">
          <Link href="/contact">Book a Free Call <ArrowUpRight /></Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mobile-menu md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="mobile-sheet">
            <SheetHeader>
              <SheetTitle><Brand /></SheetTitle>
              <SheetDescription>Think Creative. Build Smart.</SheetDescription>
            </SheetHeader>
            <Accordion type="multiple" className="sheet-nav w-full" aria-label="Mobile navigation">
              {navigation.map((item, index) => item.section === "services" ? (
                <AccordionItem value={item.section} key={item.section} className="border-b border-white/10">
                  <AccordionTrigger className="hover:no-underline py-5 text-[19px] font-normal data-[state=open]:text-[#ff5a36]">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[9px] font-semibold text-[#ff5a36]">0{index + 1}</span>
                      Services
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col pl-8">
                      {services.map((service) => (
                        <SheetClose asChild key={service.slug}>
                          <Link href={`/services/${service.slug}`} className="py-4 border-t border-white/10 flex items-center gap-4 text-white/80">
                            <span className="font-mono text-[9px] font-semibold text-[#ff5a36]">{service.number}</span>
                            <span className="text-[15px]">{service.title}</span>
                          </Link>
                        </SheetClose>
                      ))}
                      <SheetClose asChild>
                        <Link href="/services" className="py-4 border-t border-white/10 flex items-center text-[15px] text-white/50">
                          View all services
                        </Link>
                      </SheetClose>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : item.section === "solutions" ? (
                <AccordionItem value={item.section} key={item.section} className="border-b border-white/10">
                  <AccordionTrigger className="hover:no-underline py-5 text-[19px] font-normal data-[state=open]:text-[#ff5a36]">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[9px] font-semibold text-[#ff5a36]">0{index + 1}</span>
                      Solutions
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col pl-8">
                      {solutions.map((solution) => (
                        <SheetClose asChild key={solution.slug}>
                          <Link href={`/solutions#${solution.slug}`} className="py-4 border-t border-white/10 flex items-center gap-4 text-white/80">
                            <span className="font-mono text-[9px] font-semibold text-[#ff5a36]">{solution.number}</span>
                            <span className="text-[15px]">{solution.label}</span>
                          </Link>
                        </SheetClose>
                      ))}
                      <SheetClose asChild>
                        <Link href="/solutions" className="py-4 border-t border-white/10 flex items-center text-[15px] text-white/50">
                          View all solutions
                        </Link>
                      </SheetClose>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div key={item.section} className="border-b border-white/10">
                  <SheetClose asChild>
                    <Link href={sectionHref(item.section, homePage)} className="flex items-center justify-between py-5 text-[19px] hover:text-[#ff5a36] transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[9px] font-semibold text-[#ff5a36]">0{index + 1}</span>
                        {item.label}
                      </div>
                      <ArrowUpRight className="w-[17px] text-white/45" />
                    </Link>
                  </SheetClose>
                </div>
              ))}
            </Accordion>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function SiteFooter({ homePage = false }: { homePage?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="site-width footer-grid">
        <Brand />
        <p>A premium tech consultancy delivering innovative and strategic solutions to help businesses scale and thrive.</p>
        <div>
          {navigation.map((item) => (
            <Link key={item.section} href={sectionHref(item.section, homePage)}>{item.label}</Link>
          ))}
        </div>
        <div className="footer-social-links">
          <a href="https://www.facebook.com/CreativeTechlk" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/creativex_tech/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" aria-label="X (Twitter)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@creativex_techno" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
          </a>
        </div>
        <span>© {new Date().getFullYear()} CreativeX Technology PVT LTD</span>
      </div>
    </footer>
  );
}
