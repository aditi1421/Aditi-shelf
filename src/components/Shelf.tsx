"use client";

import { useMemo, useState } from "react";
import type { Article } from "../lib/articles";
import { tagColor } from "../lib/colors";
import ArticleCard from "./ArticleCard";

export default function Shelf({ articles }: { articles: Article[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [order, setOrder] = useState<number[]>(() => articles.map((_, i) => i));

  const tags = useMemo(
    () => [...new Set(articles.flatMap((a) => a.tags))].sort(),
    [articles]
  );

  const visible = order
    .map((i) => articles[i])
    .filter((a) => activeTag === null || a.tags.includes(activeTag));

  function shuffle() {
    setOrder((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  }

  return (
    <main className="shelf">
      <header className="hero">
        <h1>aditi&apos;s shelf</h1>
        <p>articles i loved, on one colorful shelf. tap a card to read.</p>
      </header>

      <nav className="pills" aria-label="filter by topic">
        <button
          className={activeTag === null ? "pill active" : "pill"}
          onClick={() => setActiveTag(null)}
        >
          all
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={activeTag === tag ? "pill active" : "pill"}
            style={{ "--pill-color": tagColor(tag) } as React.CSSProperties}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
        <button className="pill shuffle" onClick={shuffle}>
          ✦ surprise me
        </button>
      </nav>

      {visible.length === 0 ? (
        <p className="empty">nothing here yet — try another topic.</p>
      ) : (
        <section className="grid">
          {visible.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </section>
      )}

      <footer className="foot">made with ♥ by aditi</footer>
    </main>
  );
}
