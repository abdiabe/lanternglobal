import photos from "@/content/photos.json";

export type Photo = (typeof photos)[number];
export type PhotoKey = Photo["key"];

const byKey = new Map(photos.map((p) => [p.key, p]));

/** Look up a licensed photo by key. Throws at build time if a key is missing so broken images never ship. */
export function photo(key: string): Photo {
  const p = byKey.get(key);
  if (!p) throw new Error(`Unknown photo key: ${key}. Add it to src/content/photos.json with license details.`);
  return p;
}

export const allPhotos = photos;
