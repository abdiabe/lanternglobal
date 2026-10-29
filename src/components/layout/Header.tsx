"use client";
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import type { NavGroup } from '@/content/navigation';
const links = [['Roles', '/roles'], ['Industries', '/industries'], ['Pricing', '/pricing'], ['How it works', '/how-it-works'], ['About', '/about']];
export function Header(_props: {
    nav: NavGroup[];
    specialtyCount: number;
}) { const [open, setOpen] = useState(false); const path = usePathname(); return <header className="lg-header"><div className="lg-container"><Logo /><nav className="desktop-links" aria-label="Main navigation">{links.map(([name, href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>{name}</Link>)}</nav><div className="header-actions"><Link className="lg-button" href="/book-a-call" onClick={() => setOpen(false)}>Let’s talk <ArrowRight size={16}/></Link><button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div>{open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-links">{links.map(([name, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{name}<ArrowRight size={16}/></Link>)}</nav>}</header>; }
