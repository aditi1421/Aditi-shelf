function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function metaPattern(name) {
  return [
    new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]*\\scontent=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*\\s(?:property|name)=["']${name}["']`, "i"),
  ];
}

function pick(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeEntities(match[1].trim());
  }
  return undefined;
}

export function extractMetadata(html) {
  const author = pick(html, [...metaPattern("author"), ...metaPattern("article:author")]);
  const result = {
    title: pick(html, [...metaPattern("og:title"), /<title[^>]*>([^<]+)<\/title>/i]),
    image: pick(html, metaPattern("og:image")),
    publication: pick(html, metaPattern("og:site_name")),
    author: author && !/^https?:\/\//.test(author) ? author : undefined,
  };
  for (const key of Object.keys(result)) {
    if (result[key] === undefined) delete result[key];
  }
  return result;
}
