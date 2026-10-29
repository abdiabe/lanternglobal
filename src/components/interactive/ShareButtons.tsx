"use client";

import { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";

/** Plain share links. No third-party scripts or tracking pixels are loaded. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const base = "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink ring-1 ring-line transition-colors hover:bg-surface";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-muted">Share</span>
      <a className={base} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a className={base} href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer">
        X
      </a>
      <a className={base} href={`mailto:?subject=${t}&body=${u}`}>
        <Mail aria-hidden="true" className="h-4 w-4" /> Email
      </a>
      <button
        type="button"
        className={base}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable */
          }
        }}
      >
        {copied ? <Check aria-hidden="true" className="h-4 w-4 text-success" /> : <Link2 aria-hidden="true" className="h-4 w-4" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
