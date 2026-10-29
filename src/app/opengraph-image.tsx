import { ImageResponse } from 'next/og';
export const alt = 'Lantern Global: Virtual support for U.S. small businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpengraphImage() { return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 75, background: '#082c3c', color: '#fffaf0' }}><div style={{ fontSize: 32, color: '#dfbd78' }}>LANTERN GLOBAL</div><div style={{ fontSize: 80, lineHeight: 1.1, display: 'flex', flexDirection: 'column' }}><span>Your business.</span><span>With room to grow.</span></div><div style={{ fontSize: 26, color: '#cedbd8' }}>Global talent. Small business focus.</div></div>, size); }
