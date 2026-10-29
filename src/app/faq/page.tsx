import { PageIntro, FinalCta, FaqList } from '@/components/sections/Redesign';
import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({ title: 'Frequently asked questions', description: 'Clear answers about virtual support, sourcing markets, responsibilities, budget, and confidentiality.', path: '/faq' });
export default function FAQ() { return <><PageIntro eyebrow="Before you take the next step" title="Good questions. Clear answers." description="A useful working relationship starts with knowing what to ask. Here are the essentials for a small business considering virtual support."/><section className="lg-section"><div className="lg-container editorial-copy"><FaqList /></div></section><FinalCta /></>; }
