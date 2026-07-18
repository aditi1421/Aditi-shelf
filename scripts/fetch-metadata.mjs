import { readFile, writeFile } from "node:fs/promises";
import { extractMetadata } from "./extract.mjs";

const ARTICLES = new URL("../data/articles.json", import.meta.url);
const CACHE = new URL("../data/metadata-cache.json", import.meta.url);

const articles = JSON.parse(await readFile(ARTICLES, "utf8"));
let cache = {};
try {
  cache = JSON.parse(await readFile(CACHE, "utf8"));
} catch {
  // no cache yet — start fresh
}

for (const { url } of articles) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "user-agent": "Mozilla/5.0 (compatible; aditis-shelf/1.0)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const meta = extractMetadata(await res.text());
    if (meta.title) cache[url] = meta;
    console.log(`ok    ${url}`);
  } catch (err) {
    console.warn(`skip  ${url} (${err.message}) — keeping cached data`);
  }
}

await writeFile(CACHE, JSON.stringify(cache, null, 2) + "\n");
console.log(`cache: ${Object.keys(cache).length} entries`);
