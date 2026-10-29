import { BadgeCheck, Building2, GraduationCap, Handshake, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { LiveClocks } from "./LiveClocks";

const standards = [
  { icon: GraduationCap, label: "Bachelor's Degree Minimum", pos: "left-0 top-[10%] lg:-left-6", delay: "0s" },
  { icon: Sparkles, label: "Specialized Talent", pos: "right-0 top-[32%] lg:-right-4", delay: "1.2s" },
  { icon: Handshake, label: "Dedicated Support", pos: "left-0 bottom-[24%] lg:-left-8", delay: "2.1s" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-10 h-[36rem] w-[36rem] rounded-full bg-brand-tint/70 blur-3xl" />
      <div className="container-page relative grid items-center gap-14 pb-16 pt-12 sm:pb-24 sm:pt-16 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <div>
          <p className="eyebrow">
            <span aria-hidden="true" className="h-px w-6 bg-brand" />
            U.S.-Based Professional Outsourcing
          </p>
          <h1 className="text-display mt-5">
            Exceptional Professionals.{" "}
            <span className="bg-gradient-to-r from-brand-strong to-brand bg-clip-text text-transparent">Dedicated to Your Success.</span>
          </h1>
          <p className="text-lead mt-6 max-w-xl text-ink/80">
            Build your business with skilled, university-educated professionals from the Philippines, carefully selected for their
            expertise and dedicated to helping your organization thrive.
          </p>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed">
            From executive assistance and financial operations to software development, legal support, marketing, and engineering, we
            connect U.S. businesses with specialized remote talent.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/hire-a-professional" size="lg" arrow>
              Find Your Professional
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="secondary">
              Explore Our Specialties
            </ButtonLink>
          </div>
          <ul className="mt-9 grid max-w-xl gap-3 text-[0.9375rem] text-ink sm:grid-cols-2">
            {[
              "Bachelor's degree or higher, every professional",
              "Assessed for role-specific skills",
              "One professional dedicated to your business",
              "Contract with a U.S. company",
            ].map((v) => (
              <li key={v} className="flex items-start gap-2.5">
                <BadgeCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                {v}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-[86%] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-black/5">
            <Photo id="hero-professional-video-call" priority sizes="(min-width: 1024px) 38vw, 86vw" position="50% 30%" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/35 via-transparent to-transparent" />
          </div>

          {standards.map(({ icon: I, label, pos, delay }) => (
            <div
              key={label}
              className={`animate-float-soft absolute ${pos} flex items-center gap-2.5 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-lift ring-1 ring-line backdrop-blur`}
              style={{ animationDelay: delay }}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                <I aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold text-ink sm:text-sm">{label}</span>
            </div>
          ))}

          <div className="absolute -bottom-6 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl bg-white p-4 shadow-lift ring-1 ring-line sm:w-[80%]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-glow">
                  <Building2 aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">U.S. Business Partner</p>
                  <p className="text-xs text-muted">Philippines-based talent</p>
                </div>
              </div>
              <LiveClocks />
            </div>
          </div>
          <p className="sr-only">These are our service standards, not third-party certifications.</p>
        </div>
      </div>
    </section>
  );
}
