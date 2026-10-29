import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function CtaBanner({
  title = "Your Next Great Team Member Could Be Across the World.",
  description = "Tell us what your business needs. We'll help you explore dedicated professional staffing solutions tailored to your goals.",
  primaryLabel = "Find Your Professional",
  primaryHref = "/hire-a-professional",
  showConsultation = true,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  showConsultation?: boolean;
}) {
  const consultHref = site.schedulingUrl ?? "/hire-a-professional?intent=consultation";
  const external = Boolean(site.schedulingUrl);
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="on-dark relative mx-auto max-w-[78rem] overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-14 text-center sm:px-12 sm:py-20">
        <div aria-hidden="true" className="bg-grid-dark pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
        <div aria-hidden="true" className="animate-pulse-glow pointer-events-none absolute left-1/2 top-10 h-24 w-24 -translate-x-1/2 rounded-full bg-glow/30 blur-2xl" />
        <div className="relative mx-auto max-w-2xl">
          <Image src="/brand/lantern-mark-256.png" alt="" width={56} height={56} className="mx-auto mb-6 h-auto w-14" />
          <h2 className="text-h2 text-white">{title}</h2>
          <p className="text-lead mx-auto mt-5 max-w-xl text-slate-300">{description}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primaryHref} size="lg" variant="light" arrow>
              {primaryLabel}
            </ButtonLink>
            {showConsultation &&
              (external ? (
                <a
                  href={consultHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 min-h-[3.25rem] items-center justify-center rounded-full px-7 text-base font-semibold text-white ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/10"
                >
                  Schedule a Consultation
                </a>
              ) : (
                <ButtonLink href={consultHref} size="lg" variant="outline-light">
                  Schedule a Consultation
                </ButtonLink>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
