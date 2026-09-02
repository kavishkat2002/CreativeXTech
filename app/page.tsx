"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";

const partnerLogos = [
  { name: "Partner 1", src: "/partners/partner-1.png" },
  { name: "Partner 2", src: "/partners/partner-2.png" },
  { name: "Partner 4", src: "/partners/partner-4.png" },
  { name: "Partner 6", src: "/partners/partner-6.png" },
  { name: "Partner 9", src: "/partners/partner-9.png" },
  { name: "Partner 8", src: "/partners/partner-8.png" },
];

const faqs = [
  [
    "What kinds of AI products do you build?",
    "We build systems that help people complete real work: AI agents, predictive analytics, connected operations tools, customer and internal platforms, mobile applications, and AI-native SaaS products.",
  ],
  [
    "Can you work with our existing software and data?",
    "Yes. We design around the tools your team already uses, then connect the smallest useful set of systems and sources needed for a reliable first release.",
  ],
  [
    "Can we start with a smaller engagement?",
    "Yes. A focused framing or prototype engagement is often the right first move. It lets us test value, usability, and risk before anyone commits to a larger build.",
  ],
  [
    "How do you approach security and responsible AI?",
    "We treat permissions, data handling, evaluation, traceability, human review, and fallback behavior as product requirements from the beginning—not a checklist added at launch.",
  ],
  [
    "What should we bring to the first conversation?",
    "Bring one workflow that feels slow, inconsistent, or difficult to scale. A rough view of the people, systems, data, and desired outcome is enough to begin.",
  ],
];

const technologies = [
  { name: "React", mark: "R", style: "react" },
  { name: "Next.js", mark: "N", style: "next" },
  { name: "TypeScript", mark: "TS", style: "typescript" },
  { name: "Node.js", mark: "JS", style: "node" },
  { name: "Python", mark: "Py", style: "python" },
  { name: "AWS", mark: "aws", style: "aws" },
  { name: "Microsoft Azure", mark: "A", style: "azure" },
  { name: "Google Cloud", mark: "G", style: "google" },
  { name: "Docker", mark: "D", style: "docker" },
  { name: "Kubernetes", mark: "K8s", style: "kubernetes" },
  { name: "PostgreSQL", mark: "PG", style: "postgres" },
  { name: "MongoDB", mark: "M", style: "mongo" },
  { name: "TensorFlow", mark: "TF", style: "tensorflow" },
  { name: "Tailwind CSS", mark: "TW", style: "tailwind" },
  { name: "GitHub", mark: "GH", style: "github" },
  { name: "OpenAI", mark: "AI", style: "openai" },
];

const clientFeedback = [
  {
    number: "01",
    label: "Export & logistics",
    quote: "CreativeX gave our operations team one clear view of the workflow before discussing technology. The proposed AI controls were practical, understandable, and designed around how our people actually make decisions.",
    role: "Operations Director",
    company: "Sample logistics client",
    initials: "OD",
  },
  {
    number: "02",
    label: "Hospitality & facilities",
    quote: "The smart-operations prototype made complex building data feel useful. Our teams could immediately see how alerts, service requests, and maintenance decisions could work together in one experience.",
    role: "General Manager",
    company: "Sample hospitality group",
    initials: "GM",
  },
  {
    number: "03",
    label: "Retail & distribution",
    quote: "They translated our inventory and fulfilment challenges into a product direction everyone could understand. The design connected commercial goals with the daily decisions made by store and warehouse teams.",
    role: "Head of Commercial",
    company: "Sample retail business",
    initials: "HC",
  },
  {
    number: "04",
    label: "Professional services",
    quote: "The AI workflow was presented with clear evidence, approval steps, and escalation paths. That gave our leadership team confidence that automation would support professional judgment rather than bypass it.",
    role: "Managing Partner",
    company: "Sample advisory firm",
    initials: "MP",
  },
  {
    number: "05",
    label: "Startup & SaaS",
    quote: "The team challenged our assumptions early, then turned the strongest idea into a focused product plan. We left with a clearer release, a credible architecture, and fewer expensive unknowns.",
    role: "Product Founder",
    company: "Sample SaaS company",
    initials: "PF",
  },
  {
    number: "06",
    label: "AI transformation",
    quote: "What stood out was the transparency. Progress was visible, risks were discussed directly, and every model decision was tied back to the business outcome and the people responsible for it.",
    role: "Transformation Lead",
    company: "Sample enterprise client",
    initials: "TL",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sectionIds = ["services", "technologies", "projects", "method", "faq", "contact"];
    const handleHashNavigation = (event: globalThis.MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, "", href);
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    };
    const updatePagePosition = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);

      let current = "top";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.34) current = id;
      }
      setActiveSection(current);
    };

    updatePagePosition();
    document.addEventListener("click", handleHashNavigation);
    window.addEventListener("scroll", updatePagePosition, { passive: true });
    window.addEventListener("resize", updatePagePosition);
    return () => {
      document.removeEventListener("click", handleHashNavigation);
      window.removeEventListener("scroll", updatePagePosition);
      window.removeEventListener("resize", updatePagePosition);
    };
  }, []);

  function trackHero(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--hero-x", `${x * 15}px`);
    event.currentTarget.style.setProperty("--hero-y", `${y * 9}px`);
  }

  return (
    <main id="top" className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <SiteHeader activeSection={activeSection} scrollProgress={scrollProgress} homePage />

      <div id="main-content">
        <section className="reference-hero" onMouseMove={trackHero}>
          <div className="reference-grid" aria-hidden="true" />
          <div className="site-width reference-hero-inner">
            <div className="reference-copy">
              <p className="reference-kicker"><span /> Think Creative. Build Smart.</p>
              <h1>We turn complex operations into intelligent systems that <em>move.</em></h1>
              <p className="reference-note">
                — AI, data, cloud, and product engineering grounded in real
                business operations
              </p>
            </div>

            <div className="reference-figure" aria-hidden="true">
              <div className="reference-halo" />
              <img src="/creativex-android-v2.png" alt="" />
              <div className="reference-scan" />
            </div>

            <div className="reference-word" aria-hidden="true">CREATIVE<span>X</span></div>

            <div className="reference-bottom">
              <div className="reference-disciplines" aria-label="Our disciplines">
                <span>Strategy</span><span>Product</span><span>Engineering</span>
              </div>
              <div className="reference-actions">
                <a className="reference-secondary" href="#services">Explore our approach <ArrowUpRight /></a>
                <Button asChild className="reference-cta">
                  <a href="#contact">Start Creative Project <ArrowUpRight /></a>
                </Button>
              </div>
            </div>
          </div>
          <div className="reference-side-note" aria-hidden="true">© {new Date().getFullYear()} CreativeX Technology PVT LTD</div>
        </section>

        <section className="partner-band" aria-labelledby="partner-band-title">
          <div className="partner-band-label" id="partner-band-title">

            <strong>Partners we work with</strong>
          </div>
          <div className="partner-logo-marquee-container">
            <div className="partner-logo-marquee">
              {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((partner, index) => (
                <div className="partner-logo-item" key={index}>
                  <img src={partner.src} alt={partner.name} />
                </div>
              ))}
            </div>
          </div>

        </section>

        <section className="truth-section reveal">
          <div className="site-width truth-grid">
            <p className="section-index">The point / 01</p>
            <div>
              <h2>The hard part isn’t getting access to AI.</h2>
              <p>It’s turning capability into a product that fits the work, earns trust, and improves a result somebody cares about.</p>
            </div>
            <div className="truth-notes">
              <span><strong>Useful</strong> before impressive</span>
              <span><strong>Observable</strong> before autonomous</span>
              <span><strong>Specific</strong> before scalable</span>
            </div>
          </div>
        </section>

        <section id="services" className="services-section section-pad">
          <div className="site-width">
            <div className="section-intro reveal">
              <p className="section-index">Services / 02</p>
              <div>
                <h2>Technology services built around the operating result.</h2>
                <p>Strategy, product design, data, AI, cloud, and engineering work as one delivery system—from the first decision to dependable production software.</p>
              </div>
            </div>
            <div className="service-list">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <a href={`/services/${service.slug}`} key={service.number} className="service-row reveal" aria-label={`Explore ${service.title}`}>
                    <div className="service-number">{service.number}</div>
                    <div className="service-title">
                      <p>{service.eyebrow}</p>
                      <h3>{service.title}</h3>
                    </div>
                    <p className="service-copy">{service.copy}</p>
                    <div className="service-details">
                      {service.details.map((detail) => <span key={detail}>{detail}</span>)}
                    </div>
                    <div className="service-icon"><Icon /></div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="technologies" className="technology-marquee-section">
          <div className="technology-marquee-heading site-width reveal">
            <p className="section-index">Partners & technologies / 03</p>
            <h2>Technologies we work with</h2>
            <p>Modern AI, cloud, data, and product tools selected to fit your systems and operating needs.</p>
          </div>

          <div className="technology-marquee" aria-label="Technologies we work with">
            <div className="technology-marquee-track">
              {[0, 1].map((copyIndex) => (
                <div
                  key={copyIndex}
                  className="technology-marquee-set"
                  aria-hidden={copyIndex === 1 ? true : undefined}
                >
                  {technologies.map((technology) => (
                    <div
                      key={`${copyIndex}-${technology.name}`}
                      className={`technology-tile technology-${technology.style}`}
                      aria-label={technology.name}
                    >
                      <span className="technology-mark" aria-hidden="true">{technology.mark}</span>
                      <span className="technology-name">{technology.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>


        </section>

        <section id="projects" className="home-projects-section section-pad" aria-labelledby="home-projects-heading">
          <div className="site-width home-projects-heading reveal">
            <p className="section-index">Selected projects / 04</p>
            <div>
              <h2 id="home-projects-heading">Systems built around real work.</h2>
              <p>Explore AI agents, connected operations, data products, and cloud software designed for the workflows businesses depend on.</p>
            </div>
            <a href="/projects">View all projects <ArrowUpRight /></a>
          </div>

          <div className="home-project-marquee" aria-label="Selected CreativeX projects">
            <div className="home-project-track">
              {[0, 1].map((copyIndex) => (
                <div className="home-project-set" aria-hidden={copyIndex === 1} key={copyIndex}>
                  {projects.map((project) => {
                    const Icon = project.icon;
                    return (
                      <a
                        className="home-project-card"
                        href={project.caseStudyHref ?? "/#contact"}
                        key={`${copyIndex}-${project.slug}`}
                        tabIndex={copyIndex === 1 ? -1 : undefined}
                      >
                        <div className="home-project-thumbnail">
                          <span>{project.number} / 05</span>
                          <Icon />
                          <i />
                          <small>CX / PROJECT SYSTEM</small>
                        </div>
                        <div className="home-project-card-copy">
                          <p>{project.category}</p>
                          <h3>{project.title}</h3>
                          <div><span>{project.caseStudyHref ? "View case study" : "View project direction"}</span><ArrowUpRight /></div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

        </section>

        <section id="method" className="method-section section-pad">
          <div className="site-width method-grid">
            <div className="method-heading reveal">
              <p className="section-index">How we work / 05</p>
              <h2>One senior team.<br /><em>No hand-offs.</em></h2>
              <p>You work with the people doing the strategy, design, and build. We make decisions in the open and leave your team stronger than we found it.</p>
            </div>
            <ol className="method-list">
              {[
                ["01", "Frame the decision", "Understand the work, define the outcome, and decide what the system should—and should not—do."],
                ["02", "Prototype the behavior", "Test the riskiest interaction with real users and representative data before committing to a full build."],
                ["03", "Engineer the system", "Connect the tools, add evaluation and controls, then ship to a measured group in the real workflow."],
                ["04", "Improve the result", "Watch use and outcomes, learn where trust breaks, and expand only when the evidence supports it."],
              ].map(([number, title, copy]) => (
                <li key={number} className="reveal">
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="principles-section">
          <div className="site-width principles-grid">
            <div><span>01</span><strong>Show the evidence.</strong><p>Every important output should make its source and uncertainty legible.</p></div>
            <div><span>02</span><strong>Design the fallback.</strong><p>A trustworthy system knows when to pause, escalate, or let a person decide.</p></div>
            <div><span>03</span><strong>Measure the work.</strong><p>Success is a better operating result—not a prettier model demo.</p></div>
          </div>
        </section>

        <section id="client-experience" className="client-feedback-section section-pad" aria-labelledby="client-feedback-heading">
          <div className="site-width">
            <div className="client-feedback-heading reveal">
              <p className="section-index">Client feedback / 06</p>
              <div><span>AI & software delivery</span><h2 id="client-feedback-heading">What clients say about working with CreativeX.</h2></div>
            </div>

            <div className="client-feedback-grid">
              {clientFeedback.map((item) => (
                <article key={item.number} className="client-feedback-card reveal">
                  <header><span>{item.number}</span><small>Demo feedback</small></header>
                  <div className="client-feedback-quote-mark" aria-hidden="true">“</div>
                  <blockquote>{item.quote}</blockquote>
                  <footer><span className="client-feedback-avatar" aria-hidden="true">{item.initials}</span><div><strong>{item.role}</strong><small>{item.company} · {item.label}</small></div></footer>
                </article>
              ))}
            </div>

            <div className="client-feedback-proof reveal">
              <div><span>Ready for approved testimonials</span><strong>Real feedback, published with permission.</strong></div>
              <p>Send the client name, role, company, exact quotation, and written approval. The demo label can then be replaced with a verified-client state.</p>
              <a href="#contact">Request a relevant reference <ArrowUpRight /></a>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section section-pad">
          <div className="site-width faq-grid">
            <div className="faq-heading reveal">
              <p className="section-index">Questions / 07</p>
              <h2>Clear answers before we start.</h2>
              <p>AI projects carry enough uncertainty. The working relationship should not.</p>
              <a href="#contact">Ask something else <ArrowUpRight /></a>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <details key={question} className="reveal" open={openFaq === index}>
                  <summary onClick={(event) => { event.preventDefault(); setOpenFaq(openFaq === index ? -1 : index); }}>
                    <span>0{index + 1}</span>{question}<i aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="site-width contact-grid">
            <p className="section-index">Start somewhere useful / 08</p>
            <div>
              <h2>Bring us the problem you keep circling.</h2>
              <p>We’ll help you work out whether AI belongs in the answer—and what the smallest credible first move looks like.</p>
              <Button asChild className="contact-action">
                <a href="mailto:info@creativexlab.online?subject=CreativeX%20project%20conversation&body=Hello%20CreativeX%2C%0A%0AThe%20workflow%20I%20want%20to%20improve%3A%0AWho%20does%20this%20work%20today%3A%0AWhat%20a%20better%20outcome%20looks%20like%3A%0ASystems%20or%20data%20involved%3A%0A%0A">Start a conversation <ArrowUpRight /></a>
              </Button>
              <div className="brief-prompt">
                <span>A useful first note includes</span>
                <p>The workflow · who uses it · the result you want · any important constraints</p>
              </div>
            </div>
            <div className="contact-detail-card">
              <div className="contact-info-group">
                <div className="info-item">
                  <span>Email</span>
                  <a href="mailto:info@creativexlab.online" className="contact-link">info@creativexlab.online</a>
                </div>
                <div className="info-item">
                  <span>Focus</span>
                  <p>AI agents · analytics · IoT · software products · cloud</p>
                </div>
                <div className="info-item">
                  <span>Based</span>
                  <p>Working globally</p>
                </div>
              </div>
              <div className="contact-brand-card">
                <img src="/brand/creativex-robot-lockup.webp" alt="CreativeX Technology logo" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter homePage />
    </main>
  );
}
