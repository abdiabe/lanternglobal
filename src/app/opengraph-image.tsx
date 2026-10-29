import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "Lantern Global: dedicated, university-educated professionals from the Philippines";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const mark = fs.readFileSync(path.join(process.cwd(), "public/brand/lantern-mark-256.png")).toString("base64");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #071126 0%, #0b1730 55%, #12234a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={`data:image/png;base64,${mark}`} width={88} height={88} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: -1 }}>Lantern</span>
            <span style={{ fontSize: 18, letterSpacing: 10, color: "#38bdf8" }}>GLOBAL</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, maxWidth: 980 }}>
            Exceptional Professionals. Dedicated to Your Success.
          </span>
          <span style={{ fontSize: 28, color: "#cbd5e1" }}>U.S.-based staffing partner · University-educated talent in the Philippines</span>
        </div>
      </div>
    ),
    size,
  );
}
