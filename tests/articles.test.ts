import { describe, expect, it } from "vitest";
import { mergeArticles, type ArticleInput } from "../src/lib/articles";

const inputs: ArticleInput[] = [
  { url: "https://a.com/one", tags: ["ai"] },
  { url: "https://b.com/two", tags: ["writing"], favorite: true, title: "Manual Title" },
];

const cache = {
  "https://a.com/one": { title: "Cached A", author: "Ann", publication: "A Mag", image: "https://a.com/img.png" },
  "https://b.com/two": { title: "Cached B" },
};

describe("mergeArticles", () => {
  it("fills fields from cache", () => {
    const a = mergeArticles(inputs, cache).find((x) => x.url === "https://a.com/one")!;
    expect(a.title).toBe("Cached A");
    expect(a.author).toBe("Ann");
    expect(a.publication).toBe("A Mag");
    expect(a.image).toBe("https://a.com/img.png");
  });

  it("manual overrides beat cache", () => {
    const b = mergeArticles(inputs, cache).find((x) => x.url === "https://b.com/two")!;
    expect(b.title).toBe("Manual Title");
  });

  it("sorts favorites first", () => {
    expect(mergeArticles(inputs, cache)[0].url).toBe("https://b.com/two");
  });

  it("falls back to hostname when no title anywhere", () => {
    const [only] = mergeArticles([{ url: "https://example.com/x" }], {});
    expect(only.title).toBe("example.com");
    expect(only.tags).toEqual([]);
    expect(only.favorite).toBe(false);
  });
});
