import Link from 'next/link';
import Image from 'next/image';
export function Logo({ dark = false, className = '', size = 'md' }: {
    dark?: boolean;
    className?: string;
    size?: 'md' | 'lg';
}) { return <Link href="/" aria-label="Lantern Global home" className={`lg-logo ${dark ? 'lg-logo-dark' : ''} ${className}`}><span className="logo-crop"><Image src="/brand/lantern-supplied.png" alt="" width={138} height={138} priority/></span><span><strong>Lantern Global</strong><small>VIRTUAL PROFESSIONALS</small></span></Link>; }
