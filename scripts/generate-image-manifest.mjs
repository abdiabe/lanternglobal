#!/usr/bin/env node
// Regenerates docs/IMAGE-LICENSES.md from src/content/photos.json (the source of truth).
import fs from "node:fs";
const photos = JSON.parse(fs.readFileSync("src/content/photos.json", "utf8"));
const rows = photos
  .map((p) => `| \`${p.src.split("/").pop()}\` | [${p.title}](${p.sourceUrl}) | ${p.creator} | [${p.license}](${p.licenseUrl}) | ${p.verified} | ${p.attributionRequired ? "Yes" : "Not required (credited here voluntarily)"} | ${p.restrictions} |`)
  .join("\n");
const md = `# Image License Manifest

Generated from \`src/content/photos.json\` by \`node scripts/generate-image-manifest.mjs\`. Do not edit by hand.

All photographs were downloaded from Pexels after confirming on each photo's own page that it is offered under the
[Pexels License](https://www.pexels.com/license/), which permits free commercial use without attribution, subject to the
restrictions listed. Images were resized and converted to WebP and are served locally through \`next/image\`.

**Usage rules followed on this site**
- No photo is presented as an actual Lantern Global employee, client, or leader.
- No photo is used in a logo, trademark, or as a standalone item for sale.
- Alt text describes what is visible without labeling people's identity or nationality.
- People shown do not endorse Lantern Global, and the site does not imply that they do.

| File | Source | Creator | License | Verified | Attribution | Restrictions |
| --- | --- | --- | --- | --- | --- | --- |
${rows}

## Other visual assets

| Asset | Source |
| --- | --- |
| \`public/brand/*\` | Lantern Global logo supplied by the business owner; background removed and resized |
| Icons | [Lucide](https://lucide.dev), ISC License |
| Fonts | Inter and Plus Jakarta Sans via Fontsource, SIL Open Font License 1.1, self-hosted |
| Diagrams, grids, and illustrations | Original CSS/SVG created for this site |

## Adding a new photo

1. Confirm the license on the photo's own page (not a search result).
2. Save an optimized WebP to \`public/images/photos/<key>.webp\` (max 1800px on the long edge).
3. Add an entry to \`src/content/photos.json\` with every field filled in.
4. Run \`node scripts/generate-image-manifest.mjs\` and \`npm test\`.
`;
fs.writeFileSync("docs/IMAGE-LICENSES.md", md);
console.log(`Wrote docs/IMAGE-LICENSES.md (${photos.length} photos)`);
