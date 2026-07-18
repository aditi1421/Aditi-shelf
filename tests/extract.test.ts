import { describe, expect, it } from "vitest";
import { extractMetadata } from "../scripts/extract.mjs";

const html = `<!doctype html><html><head>
<title>Fallback Title</title>
<meta property="og:title" content="OG Title &amp; More" />
<meta property="og:site_name" content="Cool Mag" />
<meta content="https://img.example/cover.png" property="og:image" />
<meta name="author" content="Jane Writer" />
</head><body></body></html>`;

describe("extractMetadata", () => {
  it("extracts og fields in either attribute order", () => {
    const m = extractMetadata(html);
    expect(m.title).toBe("OG Title & More");
    expect(m.publication).toBe("Cool Mag");
    expect(m.image).toBe("https://img.example/cover.png");
    expect(m.author).toBe("Jane Writer");
  });

  it("falls back to <title> when no og:title", () => {
    expect(extractMetadata("<title>Just A Title</title>").title).toBe("Just A Title");
  });

  it("returns empty object for garbage input", () => {
    expect(extractMetadata("not html")).toEqual({});
  });

  it("discards URL-shaped author values", () => {
    const m = extractMetadata(
      `<meta property="article:author" content="https://example.com/by/jane" />`
    );
    expect(m.author).toBeUndefined();
  });
});
