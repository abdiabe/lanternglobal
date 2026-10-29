"use client";
import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { Turnstile } from './Turnstile';
export function BriefForm({ initial, configured }: {
    initial: {
        industry: string;
        roles: string;
        hours: string;
        note: string;
    };
    configured: boolean;
}) {
    const started = useRef(0);
    const [token, setToken] = useState('');
    const onToken = useCallback((t: string) => setToken(t), []);
    const [pending, setPending] = useState(false), [status, setStatus] = useState(''), [done, setDone] = useState(false);
    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('');
        setPending(true);
        const f = new FormData(e.currentTarget);
        const message = `Business: ${f.get('industry')}\nRoles: ${f.get('roles')}\nHours: ${f.get('hours')}\n${f.get('message')}`;
        try {
            const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullName: f.get('fullName'), email: f.get('email'), phone: f.get('phone'), company: '', topic: 'Virtual support consultation', message, consent: f.get('consent') === 'on', company_url: f.get('company_url'), elapsed: Date.now() - started.current, turnstileToken: token || undefined }) });
            const data = await r.json();
            if (r.ok && data.ok) {
                setDone(true);
                setStatus('Your inquiry has been sent. Thank you for telling us about your business.');
            }
            else
                setStatus(data.message || 'Your inquiry could not be sent. Please try again.');
        }
        catch {
            setStatus('We could not connect. Your details are still here; please try again.');
        }
        finally {
            setPending(false);
        }
    }
    function download(form: HTMLFormElement) { const f = new FormData(form); const text = `LANTERN GLOBAL — MY SUPPORT BRIEF\n\nBusiness: ${f.get('industry')}\nRoles: ${f.get('roles')}\nHours: ${f.get('hours')}\nNotes: ${f.get('message')}\n\nThis brief is saved on your device. It has not been sent to Lantern Global.`; const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' })); const a = document.createElement('a'); a.href = url; a.download = 'my-lantern-support-brief.txt'; a.click(); URL.revokeObjectURL(url); }
    return <form onSubmit={submit} onFocus={() => {
            if (!started.current)
                started.current = Date.now();
        }}>
 {!configured && <p className="form-status">Online inquiries are not available yet. You can prepare and save your brief below; it will not be sent.</p>}
 {done ? <p role="status" className="form-status">{status}</p> : <><div className="form-grid"><label className="field-label">Your name<input name="fullName" required autoComplete="name" maxLength={120}/></label><label className="field-label">Email address<input name="email" type="email" required autoComplete="email" maxLength={254}/></label></div>
 <label className="field-label">Phone <span className="form-note">Optional</span><input name="phone" type="tel" autoComplete="tel" maxLength={40}/></label>
 <div className="form-grid"><label className="field-label">Your business type<input name="industry" defaultValue={initial.industry} maxLength={80} placeholder="For example, home care agency"/></label><label className="field-label">Hours needed<select name="hours" defaultValue={['Part time', 'Full time'].includes(initial.hours) ? initial.hours : 'Not sure yet'}><option>Not sure yet</option><option>Part time</option><option>Full time</option></select></label></div>
 <label className="field-label">Roles you are considering<input name="roles" defaultValue={initial.roles} maxLength={500} placeholder="We can help you work this out"/></label>
 <label className="field-label">What would you like help with?<textarea name="message" defaultValue={initial.note} maxLength={2600} placeholder="The tasks, hours, tools, or budget you would like to discuss."/></label>
 <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px' }}><label>Leave this blank<input name="company_url" tabIndex={-1} autoComplete="off"/></label></div>
 {configured && <><label className="form-note" style={{ display: 'flex', gap: 12, alignItems: 'start' }}><input name="consent" type="checkbox" required style={{ marginTop: 4 }}/><span>I have read the <Link href="/privacy" className="underline">privacy notice</Link> and agree to be contacted about this inquiry.</span></label><Turnstile onToken={onToken}/></>}
 {status && <p role="alert" className="form-status">{status}</p>}
 <div className="hero-actions">{configured && <button type="submit" className="lg-button" disabled={pending}>{pending ? 'Sending…' : 'Send my inquiry'}<ArrowRight size={16}/></button>}<button type="button" className={configured ? 'lg-text-link' : 'lg-button'} onClick={e => download(e.currentTarget.form!)}><Download size={16}/>Save my brief</button></div><p className="form-note">Please do not include patient, client, financial, or other sensitive information.</p></>}
 </form>;
}
