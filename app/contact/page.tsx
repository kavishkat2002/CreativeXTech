import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, Check, Mail, MapPin, Network, Phone } from "lucide-react";

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

const mailto = "mailto:info@creativexlab.online?subject=CreativeX%20project%20conversation&body=Hello%20CreativeX%2C%0A%0ACompany%20and%20role%3A%0AThe%20workflow%20or%20product%20I%20want%20to%20improve%3A%0AWho%20uses%20it%20today%3A%0AWhat%20a%20better%20outcome%20looks%20like%3A%0ASystems%20or%20data%20involved%3A%0ATimeline%20or%20important%20constraints%3A%0A%0A";

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact CreativeX Technology AI",
    url: "https://creativex-ai.kavishkathilakarathn.chatgpt.site/contact",
    about: { "@type": "Organization", name: "CreativeX Technology AI", email: "info@creativexlab.online" },
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
            <div><Mail /><span>Email</span><a href="mailto:info@creativexlab.online">info@creativexlab.online</a></div>
            <div><MapPin /><span>Address</span><p>16/B Perera Mawatha Rajagiriya Sri Lanka</p></div>
            <div><Phone /><span>Hotline</span><a href="tel:0762345336">076 2345 336</a></div>
          </aside>

          <div className="contact-brief">
            <p className="section-index">Send a message / 02</p>
            <h2>Let's talk about your project.</h2>
            <form action="https://formsubmit.co/tkavishka101@gmail.com" method="POST" className="contact-form">
              <input type="hidden" name="_next" value="https://creativexlab.online/contact" />
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="form-group">
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="What's this about?" required />
              </div>

              <div className="form-group">
                <label htmlFor="date">Preferred Meeting Date</label>
                <input type="date" id="date" name="date" required />
              </div>

              <div className="form-group">
                <label htmlFor="time">Preferred Meeting Time (7 PM - 11 PM)</label>
                <select id="time" name="time" required defaultValue="">
                  <option value="" disabled>Select a time</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                  <option value="9:30 PM">9:30 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                  <option value="10:30 PM">10:30 PM</option>
                  <option value="11:00 PM">11:00 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your message</label>
                <textarea id="message" name="message" rows={5} placeholder="Include what you know, leave the rest for the conversation." required></textarea>
              </div>

              <button type="submit" className="contact-email-action" style={{ alignSelf: "flex-start", border: "none", cursor: "pointer", fontFamily: "inherit", borderRadius: "4px" }}>
                Send message <ArrowUpRight />
              </button>
            </form>
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
