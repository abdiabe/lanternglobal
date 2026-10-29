import Link from 'next/link';
import { PageIntro, FinalCta } from '@/components/sections/Redesign';
import { getAllPosts } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({ title: 'Small business insights', description: 'Practical notes on defining the work, preparing a brief, and working with virtual support.', path: '/blog' });
export default function Blog() { return <><PageIntro eyebrow="Notes for small business owners" title="A little clarity goes a long way." description="Practical starting points for the work you want to hand over and the working relationship you want to build."/><section className="lg-section"><div className="lg-container industry-directory">{getAllPosts().map(p => <Link key={p.slug} href={`/blog/${p.slug}`}><p className="lg-eyebrow">{p.readingMinutes} min read</p><h2>{p.title}</h2><p>{p.description}</p><span>Read the article →</span></Link>)}</div></section><FinalCta /></>; }
