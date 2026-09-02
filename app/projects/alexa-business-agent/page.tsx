import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Bot, Check, CircleDot, MessageCircleMore, Network, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/projects";

const project = projects[0];

export const metadata: Metadata = {
  title: "Alexa AI Business Agent — Case Study | CreativeX",
  description: "A CreativeX product concept for an omnichannel AI agent that captures leads, follows up, tracks orders, and keeps people in control.",
  alternates: { canonical: "/projects/alexa-business-agent" },
  openGraph: { title: "Alexa AI Business Agent — CreativeX Product Concept", description: "An omnichannel AI agent concept for leads, follow-ups, orders, and human-controlled decisions.", url: "/projects/alexa-business-agent", type: "article" },
};

const workflow = [
  ["01", "Connect", "Bring WhatsApp, Facebook, Instagram, TikTok, and website enquiries into one operating queue."],
  ["02", "Understand", "Identify intent, customer context, lead quality, and the next useful action."],
  ["03", "Act", "Answer, qualify, schedule a follow-up, update an order, or create a task within defined permissions."],
  ["04", "Escalate", "Route exceptions, sensitive requests, and low-confidence decisions to the right person."],
];

export default function AlexaCaseStudyPage() {
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.headline,
    description: "A CreativeX product concept for an omnichannel AI business agent that captures enquiries, qualifies leads, schedules follow-ups, tracks orders, and escalates important decisions to people.",
    url: "https://creativex-ai.kavishkathilakarathn.chatgpt.site/projects/alexa-business-agent",
    creator: { "@id": "https://creativex-ai.kavishkathilakarathn.chatgpt.site/#organization" },
    about: ["AI agents", "omnichannel customer operations", "lead management", "human-in-the-loop automation"],
    genre: "Product concept case study",
    inLanguage: "en",
  };
  return (
    <main id="top" className="site-shell case-study-page">
      <a className="skip-link" href="#case-study-content">Skip to case study</a>
      <SiteHeader activeSection="projects" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c") }} />
      <div id="case-study-content">
        <section className="case-study-hero">
          <div className="case-study-grid" aria-hidden="true" />
          <div className="site-width">
            <Link className="case-study-back" href="/projects"><ArrowLeft /> All projects</Link>
            <div className="case-study-hero-layout">
              <div className="case-study-mark" aria-hidden="true"><Bot /><span>01 / CX</span></div>
              <div><p className="section-index">CreativeX product concept · AI automation & agents</p><h1>{project.title}</h1><p>{project.headline} A practical omnichannel agent designed to turn customer conversations into traceable business action—with people kept in control.</p><div className="case-study-pills">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </div>
          </div>
        </section>

        <section className="case-study-intro"><div className="site-width case-study-two-col"><p className="section-index">The opportunity / 01</p><div><h2>Customer demand arrives everywhere. The operating view should not.</h2><p>Business teams often manage enquiries, follow-ups, and orders across disconnected inboxes. Alexa is a product direction for giving that work one controlled flow: persistent context, clear ownership, and a reliable path from conversation to action.</p><aside><strong>Concept status</strong><span>This case study describes CreativeX’s product direction and interaction model. It does not claim a named client deployment or fabricated performance results.</span></aside></div></div></section>

        <section className="case-study-workflow"><div className="site-width"><div className="case-study-section-head"><p className="section-index">Connected workflow / 02</p><h2>From first message to accountable next step.</h2></div><div className="case-study-workflow-grid">{workflow.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

        <section className="case-study-system"><div className="site-width case-study-system-grid"><div><p className="section-index">System direction / 03</p><h2>One workspace. Clear evidence. Human authority.</h2><p>The interface is designed around the work people need to review—not around an abstract chat window.</p></div><div className="case-study-console" aria-label="Illustrative Alexa agent workspace"><div className="case-study-console-top"><span><i /> ALEXA / LIVE WORKSPACE</span><strong>Human review on</strong></div><div className="case-study-console-body"><div className="case-study-console-nav"><MessageCircleMore /><Network /><ShieldCheck /></div><div><p>Lead review queue</p><h3>New wholesale enquiry</h3><ul><li><CircleDot /> Intent identified: product availability</li><li><CircleDot /> Customer context linked from CRM</li><li><CircleDot /> Follow-up draft ready for approval</li></ul><button type="button">Review suggested action <ArrowUpRight /></button></div></div></div></div></section>

        <section className="case-study-capabilities"><div className="site-width case-study-capabilities-grid"><p className="section-index">Designed capabilities / 04</p><div>{project.capabilities.concat(project.outcomes).map((item, index) => <div key={item}><span>0{index + 1}</span><Check /><strong>{item}</strong></div>)}</div></div></section>

        <section className="case-study-next"><div className="site-width"><p className="section-index">Build your version</p><h2>Connect the channels. Keep the judgment.</h2><Link href="/#contact">Discuss an AI agent project <ArrowUpRight /></Link></div></section>
      </div>
      <SiteFooter />
    </main>
  );
}
