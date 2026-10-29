import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { commonFaqs } from '@/content/matcher';
export function PageIntro({ eyebrow, title, description }: {
    eyebrow: string;
    title: string;
    description: string;
}) { return <section className="page-intro"><div className="lg-container"><p className="lg-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></section>; }
export function FinalCta() { return <section className="final-cta"><div className="lg-container"><div><p className="lg-eyebrow">A little support. A lot more room.</p><h2>Tell us about your business.<br />Let’s find where help fits.</h2></div><Link href="/book-a-call" className="lg-button">Let’s talk <ArrowRight size={18}/></Link></div></section>; }
export function FaqList() { return <div className="lg-faq">{commonFaqs.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>; }
export function Journey() { return <div className="journey">{[['Talk about your business', 'Start with the work that takes your time, your budget, and the hours you need.'], ['Define the right role', 'Outline responsibilities, relevant experience, and the skills the work calls for.'], ['Discuss the fit', 'Review the selection process and agree what a good working relationship looks like.'], ['Set up the working day', 'Confirm scope, communication, access, and terms before work begins.']].map(([title, body], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>; }
