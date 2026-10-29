import Link from "next/link";
import { Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="container-page relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand shadow-card ring-1 ring-line">
          <Compass aria-hidden="true" className="h-8 w-8" />
        </span>
        <p className="eyebrow mt-8">404 error</p>
        <h1 className="text-h2 mt-3">We couldn&apos;t find that page</h1>
        <p className="text-lead mt-4 max-w-xl">The page may have moved, or the link may be incorrect. These pages might help:</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" arrow>
            Go to the homepage
          </ButtonLink>
          <ButtonLink href="/services/directory" variant="secondary">
            Browse specialties
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm">
          Need help?{" "}
          <Link href="/contact" className="font-semibold text-brand-strong underline underline-offset-2">
            Contact us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
