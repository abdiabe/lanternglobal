import Link from 'next/link';
import { businesses } from '@/content/matcher';
import { PageIntro, FinalCta } from '@/components/sections/Redesign';
import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({ title: 'Virtual support by industry', description: 'Find virtual professional roles and everyday tasks for your small business, from home care to construction and online stores.', path: '/industries' });
export default function Industries() { return <><PageIntro eyebrow="Built around your business" title="Your industry. Your everyday work." description="A dental office does not run like a roofing business. Explore the practical support that could make a difference in yours."/><section className="lg-section"><div className="lg-container industry-directory">{businesses.map(b => <Link key={b.slug} href={`/for/${b.slug}`}><h2>{b.name}</h2><p>{b.pain}</p><span>Explore your support →</span></Link>)}</div><div className="lg-container"><Link className="lg-button" href="/#business-matcher">Find my business fit</Link></div></section><FinalCta /></>; }
