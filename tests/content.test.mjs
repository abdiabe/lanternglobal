/**
 * Static content checks that do not need a running server.
 * Verifies photo license records and blog frontmatter basics.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const photos = JSON.parse(fs.readFileSync(path.join(root, "src/content/photos.json"), "utf8"));

test("every photo has a local file and complete license record", () => {
  for (const p of photos) {
    assert.ok(fs.existsSync(path.join(root, "public", p.src)), `missing file ${p.src}`);
    for (const k of ["sourceUrl", "creator", "license", "verified", "alt"]) assert.ok(p[k], `${p.key} missing ${k}`);
  }
});

test("every photo file in public/images/photos is registered", () => {
  const files = fs.readdirSync(path.join(root, "public/images/photos"));
  const registered = new Set(photos.map((p) => path.basename(p.src)));
  for (const f of files) assert.ok(registered.has(f), `unregistered image ${f}`);
});

test("published blog posts are not backdated before launch and reference licensed images", () => {
  const dir = path.join(root, "content/blog");
  const keys = new Set(photos.map((p) => p.key));
  let published = 0;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const draft = /\ndraft:\s*true/.test(raw);
    const date = raw.match(/\ndate:\s*"([\d-]+)"/)?.[1];
    const image = raw.match(/\nimage:\s*"([^"]+)"/)?.[1];
    assert.ok(keys.has(image), `${f} uses unlicensed image ${image}`);
    if (!draft) {
      published++;
      assert.ok(date >= "2026-10-25", `${f} is dated before launch`);
    }
  }
  assert.ok(published >= 3 && published <= 5, `expected 3 to 5 focused published posts, found ${published}`);
});
