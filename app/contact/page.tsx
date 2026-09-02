import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, Check, Mail, MapPin, Network } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact CreativeX Technology AI | Start an AI or Software Project",
  description: "Contact CreativeX Technology AI about AI automation, analytics, IoT, cloud, web and mobile engineering, or an AI business consultation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a project with CreativeX Technology AI",
    description: "Bring one business workflow, product idea, or operating challenge. We’ll help define the smallest credible first move.",
    url: "/contact",
    type: "website",
  },
};

const mailto = "mailto:hello@creativex.ai?subject=CreativeX%20project%20conversation&body=Hello%20CreativeX%2C%0A%0ACompany%20and%20role%3A%0AThe%20workflow%20or%20product%20I%20want%20to%20improve%3A%0AWho%20uses%20it%20today%3A%0AWhat%20a%20better%20outcome%20looks%20like%3A%0ASystems%20or%20data%20involved%3A%0ATimeline%20or%20important%20constraints%3A%0A%0A";

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact CreativeX Technology AI",
    url: "https://creativex-ai.kavishkathilakarathn.chatgpt.site/contact",
    about: { "@type": "Organization", name: "CreativeX Technology AI", email: "hello@creativex.ai" },
  };

  return (
    <main id="top" className="site-shell contact-page">
      <a className="skip-link" href="#contact-content">Skip to contact details</a>
      <SiteHeader activeSection="contact" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd).replace(/</g, "\\u003c") }} />

      <section className="contact-page-hero">
        <div className="contact-page-grid" aria-hidden="true" />
        <div className="site-width contact-page-hero-layout">
          <p className="section-index">Start a conversation / 2026</p>
          <div>
            <p className="contact-page-kicker">AI · Data · IoT · Cloud · Product engineering</p>
            <h1>Tell us where the work gets stuck.</h1>
            <p>Bring one workflow, product idea, or operating challenge. We’ll help you decide whether AI belongs in the answer—and define the smallest credible first move.</p>
            <a href="#contact-content">Prepare your brief <ArrowDownRight /></a>
          </div>
        </div>
        <span className="contact-page-word" aria-hidden="true">TALK</span>
      </section>

      <section id="contact-content" className="contact-page-main">
        <div className="site-width contact-page-layout">
          <aside className="contact-page-details">
            <p className="section-index">Direct contact / 01</p>
            <div><Mail /><span>Email</span><a href="mailto:hello@creativex.ai">hello@creativex.ai</a></div>
            <div><MapPin /><span>Delivery</span><p>Working globally</p></div>
            <div><Network /><span>Focus</span><p>AI agents · analytics · IoT · software products · cloud</p></div>
          </aside>

          <div className="contact-brief">
            <p className="section-index">A useful first note / 02</p>
            <h2>You do not need a finished specification.</h2>
            <p>Enough context to understand the work is the best place to begin. Include what you know, leave the rest for the conversation.</p>
            <ul>
              {["The workflow or product you want to improve", "The people who use or manage it today", "The outcome that would make the project worthwhile", "The systems, data, and integrations already involved", "Any timing, security, regulatory, or budget constraints"].map((item) => <li key={item}><Check /><span>{item}</span></li>)}
            </ul>
            <a className="contact-email-action" href={mailto}>Compose project email <ArrowUpRight /></a>
            <small>Your email application will open with a structured project brief. CreativeX will only receive it after you choose to send.</small>
          </div>
        </div>
      </section>

      <section className="contact-next-steps">
        <div className="site-width contact-next-head"><p className="section-index">What happens next / 03</p><h2>A clear first conversation. No theatre.</h2></div>
        <div className="site-width contact-next-grid">
          {[
            ["01", "Context", "We understand the workflow, the people involved, the operating environment, and the decision you need to make."],
            ["02", "Fit", "We identify where AI or software can create useful leverage—and say clearly when it is not the right answer."],
            ["03", "First move", "We propose a focused discovery, prototype, or delivery path with visible assumptions, controls, and outcomes."],
          ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="contact-page-final">
        <div className="site-width contact-page-final-layout"><p className="section-index">Ready when you are</p><div><h2>Start with the problem—not the technology.</h2><a href={mailto}>Email CreativeX <ArrowUpRight /></a></div></div>
      </section>
      <SiteFooter />
    </main>
  );
}
