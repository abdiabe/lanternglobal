import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, CalendarClock, Mail, MapPin, Phone, UserRoundSearch } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: "Contact Lantern Global about dedicated professional staffing, pricing, or partnerships. Job seekers can apply through our careers portal.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone, address, responseTime } = site.contact;
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Let's Build Your Next Great Team."
        description="Questions about staffing, pricing, or how we work? Send us a message. If you already know the role you need, the hiring form is the fastest route."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <h2 className="text-h3">Send a message</h2>
            {responseTime && <p className="mt-2 text-sm">We typically respond {responseTime}.</p>}
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <aside className="space-y-5">
            <Link href="/hire-a-professional" className="card card-interactive group flex gap-4 p-6">
              <UserRoundSearch aria-hidden="true" className="h-6 w-6 shrink-0 text-brand" />
              <span>
                <span className="block font-bold text-ink">Ready to hire?</span>
                <span className="mt-1 block text-sm">Use the step-by-step form to describe the role, schedule, and skills you need.</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-strong">
                  Hire a Professional <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
            {site.schedulingUrl && (
              <a href={site.schedulingUrl} target="_blank" rel="noopener noreferrer" className="card card-interactive flex gap-4 p-6">
                <CalendarClock aria-hidden="true" className="h-6 w-6 shrink-0 text-brand" />
                <span>
                  <span className="block font-bold text-ink">Schedule a consultation</span>
                  <span className="mt-1 block text-sm">Pick a time that works for you.</span>
                </span>
              </a>
            )}
            <div className="rounded-2xl bg-navy-950 p-6 text-slate-300">
              <Briefcase aria-hidden="true" className="h-6 w-6 text-glow" />
              <p className="mt-3 font-bold text-white">Looking for a job?</p>
              <p className="mt-1 text-sm">Please don&apos;t use this form for applications. Apply through our careers portal so your details reach recruiting securely.</p>
              <Link href="/careers" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-glow hover:underline">
                Go to Careers <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            {(email || phone || address) && (
              <div className="card space-y-3 p-6 text-[0.9375rem]">
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-3 text-ink hover:text-brand-strong">
                    <Mail aria-hidden="true" className="h-5 w-5 text-brand" /> {email}
                  </a>
                )}
                {phone && (
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 text-ink hover:text-brand-strong">
                    <Phone aria-hidden="true" className="h-5 w-5 text-brand" /> {phone}
                  </a>
                )}
                {address && (
                  <p className="flex items-start gap-3 text-ink">
                    <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 text-brand" />
                    <span>
                      {address.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </span>
                  </p>
                )}
              </div>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
