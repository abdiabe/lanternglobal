import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import { businesses, businessRoles, inquiryHref } from '@/content/matcher';
import { PageIntro, FinalCta } from '@/components/sections/Redesign';
import { buildMetadata } from '@/lib/seo';
export function generateStaticParams() { return businesses.map(b => ({ slug: b.slug })); }
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const b = businesses.find(b => b.slug === slug); return b ? buildMetadata({ title: `Virtual support for ${b.audience}`, description: b.pain, path: `/for/${slug}` }) : {}; }
export default async function BusinessPage({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;
    const b = businesses.find(b => b.slug === slug);
    if (!b)
        notFound();
    return <><PageIntro eyebrow={`For ${b.audience}`} title="Keep your business moving. Give the details a home." description={b.pain}/><section className="lg-section"><div className="lg-container"><div className="section-intro"><div><p className="lg-eyebrow">Your working day, with support</p><h2>Start with the work<br />on your plate.</h2></div><Link href={inquiryHref(b)} className="lg-button">Build my team <ArrowRight size={17}/></Link></div><ul className="lg-checklist task-choices">{b.tasks.map(t => <li key={t}><Check size={17}/>{t}</li>)}</ul><div className="match-roles">{businessRoles(b).map(r => <article key={r.slug}><h4>{r.name}</h4><p className="degree-label">Relevant studies</p><p className="degree-fields">{r.degree}</p><ul className="lg-checklist">{r.tasks.map(t => <li key={t}><Check size={15}/>{t}</li>)}</ul><p className="form-note">{r.boundary}</p><Link className="lg-text-link" href={`/roles/${r.slug}`}>Explore this role <ArrowRight size={16}/></Link></article>)}</div><p className="form-note">Illustrative tasks and role suggestions. Scope, availability, qualifications, data access, and pricing need to be agreed for your business.</p></div></section><FinalCta /></>;
}
