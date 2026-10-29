import Link from 'next/link';
import { PageIntro } from '@/components/sections/Redesign';
import { sourcing } from '@/content/matcher';
import { jobs } from '@/content/jobs';
import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({ title: 'Careers and future opportunities', description: 'Learn about Lantern Global’s intended global sourcing markets and explore approved openings when available.', path: '/careers' });
export default function Careers() { return <><PageIntro eyebrow="For virtual professionals" title="Bring your skills. Support a small business." description="We value education, thoughtful communication, and the ability to follow through on real work."/><section className="lg-section"><div className="lg-container editorial-copy"><h2>Our recruiting direction.</h2><p>{sourcing}</p><p>Specific location eligibility, working hours, experience, pay, and application requirements belong in each approved job posting.</p><h2>Current opportunities.</h2>{jobs.length ? jobs.map(j => <p key={j.slug}><Link href={`/careers/${j.slug}`}>{j.title} →</Link></p>) : <p>There are no published openings at the moment. Check back here for approved roles and application details.</p>}<p>We do not list sample candidates or advertise unconfirmed pay ranges.</p></div></section></>; }
