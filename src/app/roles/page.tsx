import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { roles } from '@/content/matcher';
import { PageIntro, FinalCta } from '@/components/sections/Redesign';
import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({ title: 'Virtual professional roles for small businesses', description: 'Explore twelve practical areas of virtual support, from admin and customer service to bookkeeping and technical work.', path: '/roles' });
export default function Roles() { return <><PageIntro eyebrow="The work behind your business" title="A role for the work you need done." description="Start with responsibilities, not a job title. These role guides explain useful tasks, relevant educational backgrounds, and where your team's supervision matters."/><section className="lg-section"><div className="lg-container role-directory">{roles.map((r, i) => <Link href={`/roles/${r.slug}`} key={r.slug}><span>{String(i + 1).padStart(2, '0')}</span><h3>{r.name}</h3><ArrowRight size={20}/></Link>)}</div></section><FinalCta /></>; }
