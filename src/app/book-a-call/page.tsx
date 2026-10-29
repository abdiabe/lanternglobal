import { PageIntro } from '@/components/sections/Redesign';
import { BriefForm } from '@/components/forms/BriefForm';
import { site } from '@/lib/site';
import { deliveryConfigured } from '@/lib/forms/server';
import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({ title: 'Let’s talk about your business', description: 'Bring your workload, budget, and questions. Prepare an inquiry about virtual support for your small business.', path: '/book-a-call' });
export const dynamic = 'force-dynamic';
export default async function Book({ searchParams }: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) { const q = await searchParams; const one = (k: string, max = 500) => { const v = q[k]; return (Array.isArray(v) ? v[0] : v || '').slice(0, max); }; return <><PageIntro eyebrow="Let’s find your next step" title="A little context. A useful conversation." description="Tell us about your business and the work you would like to hand over. Your matcher selections are carried into the brief below."/><section className="lg-section"><div className="lg-container inquiry-layout"><BriefForm configured={deliveryConfigured('contact')} initial={{ industry: one('industry', 80), roles: one('roles'), hours: one('hours', 40), note: one('note', 2600) }}/><aside className="inquiry-aside"><h2>Start with what you know.</h2><p>The tasks that repeat. The hours you need covered. The tools you use. The budget you have in mind.</p><p>You do not need all the answers to start defining a useful role.</p><p>Client identities are kept confidential.</p>{site.schedulingUrl && <a className="lg-button" href={site.schedulingUrl} target="_blank" rel="noopener noreferrer">Choose a time to talk ↗</a>}{site.contact.email && <p><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>}</aside></div></section></>; }
