import type { NextConfig } from "next";
const securityHeaders = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];
const nextConfig: NextConfig = {
    poweredByHeader: false,
    async redirects() {
        return [
            { source: '/services/:path*', destination: '/roles', permanent: true },
            { source: '/industries/:slug', destination: '/industries', permanent: true },
            { source: '/specialty-finder', destination: '/#business-matcher', permanent: true },
            { source: '/team-builder', destination: '/#business-matcher', permanent: true },
            { source: '/hire-a-professional', destination: '/book-a-call', permanent: true },
            { source: '/contact', destination: '/book-a-call', permanent: true },
            { source: '/why-choose-us/:path*', destination: '/about', permanent: true },
            { source: '/resources/:path*', destination: '/faq', permanent: true },
        ];
    },
    agentRules: false,
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    },
    async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
    },
};
export default nextConfig;
