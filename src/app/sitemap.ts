import type { MetadataRoute } from 'next';
import { roles, businesses } from '@/content/matcher';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/utils';
export default function sitemap(): MetadataRoute.Sitemap { return [...['/', '/roles', '/industries', '/pricing', '/how-it-works', '/about', '/faq', '/book-a-call', '/careers', '/blog'], ...roles.map(r => `/roles/${r.slug}`), ...businesses.map(b => `/for/${b.slug}`), ...getAllPosts().map(p => `/blog/${p.slug}`)].map(path => ({ url: absoluteUrl(path), lastModified: '2026-10-29', priority: path === '/' ? 1 : 0.7 })); }
