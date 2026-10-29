"use client";

import { useEffect, useState } from "react";

function fmt(tz: string, d: Date) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz }).format(d);
}

/** Current time in a U.S. city and Manila. Renders placeholders on the server to avoid hydration mismatches. */
export function LiveClocks() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const rows = [
    { city: "New York", tz: "America/New_York", flag: "U.S." },
    { city: "Manila", tz: "Asia/Manila", flag: "PH" },
  ];

  return (
    <div className="flex items-center gap-3">
      {rows.map((r, i) => (
        <div key={r.city} className="flex items-center gap-3">
          {i > 0 && (
            <svg aria-hidden="true" width="34" height="10" viewBox="0 0 34 10" className="text-brand">
              <path d="M1 5h32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="animate-dash" />
              <circle cx="33" cy="5" r="2" fill="currentColor" />
              <circle cx="1" cy="5" r="2" fill="currentColor" />
            </svg>
          )}
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
              {r.flag} · {r.city}
            </p>
            <p className="font-display text-sm font-bold tabular-nums text-ink" suppressHydrationWarning>
              {now ? fmt(r.tz, now) : "--:--"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
