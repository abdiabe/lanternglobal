import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import { roles, businesses } from '@/content/matcher';
import { PageIntro, FinalCta } from '@/components/sections/Redesign';
import { buildMetadata } from '@/lib/seo';
export function generateStaticParams() { return roles.map(r => ({ slug: r.slug })); }
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const r = roles.find(r => r.slug === slug); return r ? buildMetadata({ title: r.name, description: `Explore ${r.name.toLowerCase()} for your small business: tasks, useful backgrounds, and role boundaries.`, path: `/roles/${slug}` }) : {}; }
export default async function RolePage({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;
    const r = roles.find(r => r.slug === slug);
    if (!r)
        notFound();
    return <><PageIntro eyebrow="Virtual professional role guide" title={r.name} description="A focused set of responsibilities can make the working day more manageable. Use this guide to start a conversation about the support your small business needs."/><section className="lg-section"><div className="lg-container inquiry-layout"><div className="editorial-copy"><h2>Work you could hand over.</h2><ul className="lg-checklist">{r.tasks.map(t => <li key={t}><Check size={18}/>{t}</li>)}</ul><h2>A background that fits the work.</h2><p>{r.degree}</p><p>These are relevant fields of study, not claims about a specific person's credentials. Degree names vary by country. Discuss experience, practical skills, and any required checks when defining the role.</p><h2>Keep responsibilities clear.</h2><p>{r.boundary}</p><h2>Shape the brief together.</h2><p>Bring examples of your weekly workload, the software you use, your preferred working hours, and your budget. Agree on the scope and cost before moving forward.</p><Link className="lg-button" href={`/book-a-call?roles=${encodeURIComponent(r.name)}`}>Discuss this role <ArrowRight size={17}/></Link></div><aside className="inquiry-aside"><h2>Where this role can fit</h2>{businesses.filter(b => b.roles.includes(r.slug)).map(b => <p key={b.slug}><Link href={`/for/${b.slug}`} className="lg-text-link">{b.name}<ArrowRight size={16}/></Link></p>)}<p>Have another type of business? Tell us about the work. The right scope matters more than the category.</p><Link href="/#business-matcher" className="lg-text-link">Find your business fit <ArrowRight size={16}/></Link></aside></div></section><FinalCta /></>;
}
