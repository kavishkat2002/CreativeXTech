"use client";

import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";

import { solutions } from "@/lib/solutions";
import { services } from "@/lib/services";
import { Button } from "@/components/ui/button";
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
  { label: "Services", section: "services" },
  { label: "Solutions", section: "solutions" },
  { label: "Projects", section: "projects" },
  { label: "Blog", section: "blog" },
  { label: "Technologies", section: "technologies" },
  { label: "About", section: "about" },
  { label: "Contact", section: "contact" },
];

function sectionHref(section: string, homePage: boolean) {
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
          <Link href="/contact">Start a conversation <ArrowUpRight /></Link>
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
              <SheetDescription>AI, data, cloud, and product engineering for real operations.</SheetDescription>
            </SheetHeader>
            <nav className="sheet-nav" aria-label="Mobile navigation">
              {navigation.map((item, index) => item.section === "services" ? (
                <div className="sheet-solution-group" key={item.section}>
                  <SheetClose asChild>
                    <Link href="/services"><span>0{index + 1}</span>Services<ArrowUpRight /></Link>
                  </SheetClose>
                  <div>
                    {services.map((service) => (
                      <SheetClose asChild key={service.slug}>
                        <Link href={`/services/${service.slug}`}><span>{service.number}</span>{service.title}</Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              ) : item.section === "solutions" ? (
                <div className="sheet-solution-group" key={item.section}>
                  <SheetClose asChild>
                    <Link href="/solutions"><span>0{index + 1}</span>Solutions<ArrowUpRight /></Link>
                  </SheetClose>
                  <div>
                    {solutions.map((solution) => (
                      <SheetClose asChild key={solution.slug}>
                        <Link href={`/solutions#${solution.slug}`}><span>{solution.number}</span>{solution.label}</Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              ) : (
                <SheetClose asChild key={item.section}>
                  <Link href={sectionHref(item.section, homePage)}><span>0{index + 1}</span>{item.label}<ArrowUpRight /></Link>
                </SheetClose>
              ))}
            </nav>
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
        <p>Useful intelligence, designed around people.</p>
        <div>
          {navigation.map((item) => (
            <Link key={item.section} href={sectionHref(item.section, homePage)}>{item.label}</Link>
          ))}
        </div>
        <span>© {new Date().getFullYear()} CreativeX Technology AI</span>
      </div>
    </footer>
  );
}
