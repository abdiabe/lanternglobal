import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { footerNav } from "@/content/navigation";
import { site } from "@/lib/site";

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.9375rem] text-slate-400 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { email, phone, address } = site.contact;
  const socials = Object.entries(site.social).filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 text-slate-400">
      <div aria-hidden="true" className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo dark size="lg" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed">
              A U.S.-based professional staffing and outsourcing company connecting American businesses with dedicated,
              university-educated professionals in the Philippines.
            </p>
            <div className="mt-6 space-y-2.5 text-[0.9375rem]">
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-2.5 hover:text-white">
                  <Mail aria-hidden="true" className="h-4 w-4 text-glow" /> {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2.5 hover:text-white">
                  <Phone aria-hidden="true" className="h-4 w-4 text-glow" /> {phone}
                </a>
              )}
              {address && (
                <p className="flex items-start gap-2.5">
                  <MapPin aria-hidden="true" className="mt-1 h-4 w-4 text-glow" />
                  <span>{address.join(", ")}</span>
                </p>
              )}
              {!email && !phone && (
                <Link href="/contact" className="inline-flex items-center gap-2.5 hover:text-white">
                  <Mail aria-hidden="true" className="h-4 w-4 text-glow" /> Send us a message
                </Link>
              )}
            </div>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {socials.map(([name, href]) => (
                  <li key={name}>
                    <a href={href} rel="noopener noreferrer" target="_blank" className="capitalize hover:text-white">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Column title="Services" links={[...footerNav.services, { label: "All services", href: "/services" }]} />
            <Column title="Company" links={footerNav.company} />
            <Column title="Resources" links={footerNav.resources} />
            <Column title="Legal" links={footerNav.legal} />
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName ?? site.name}. All rights reserved.
          </p>
          <p className="text-slate-500">
            U.S. commercial relationships. Professionals based in the Philippines.
          </p>
        </div>
      </div>
    </footer>
  );
}
