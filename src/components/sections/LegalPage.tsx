import { PageIntro } from './Redesign';
export async function LegalPage({ slug }: {
    slug: string;
    path: string;
}) {
    const title = slug === 'privacy' ? 'Privacy notice' : slug === 'terms' ? 'Terms of use' : 'Cookie information';
    return <><PageIntro eyebrow="Legal information" title={title} description="The final version of this notice is not available yet."/><section className="lg-section"><div className="lg-container editorial-copy"><p>The policy details and registered business information need to be confirmed before this notice can be published. Please do not submit sensitive personal or client information.</p></div></section></>;
}
