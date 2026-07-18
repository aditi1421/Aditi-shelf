"use client";

import { useEffect, useMemo, useState } from "react";
import type { Article } from "../lib/articles";
import { tagColor } from "../lib/colors";
import ArticleCard from "./ArticleCard";

const FAVORITES_KEY = "shelf-favorites";

export default function Shelf({ articles }: { articles: Article[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [order, setOrder] = useState<number[]>(() => articles.map((_, i) => i));
  const [favOverrides, setFavOverrides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) setFavOverrides(JSON.parse(stored));
    } catch {
      // corrupted storage — fall back to defaults
    }
  }, []);

  const tags = useMemo(
    () => [...new Set(articles.flatMap((a) => a.tags))].sort(),
    [articles]
  );

  const isFavorite = (article: Article) => favOverrides[article.url] ?? article.favorite;

  function toggleFavorite(article: Article) {
    setFavOverrides((prev) => {
      const next = { ...prev, [article.url]: !(prev[article.url] ?? article.favorite) };
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable — toggle still works for this visit
      }
      return next;
    });
  }

  const filtered = order
    .map((i) => articles[i])
    .filter((a) => activeTag === null || a.tags.includes(activeTag));
  const visible = [...filtered.filter(isFavorite), ...filtered.filter((a) => !isFavorite(a))];

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
        <p>articles i loved, on one colorful shelf. tap a card to read, tap ★ to favorite.</p>
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
            <ArticleCard
              key={article.url}
              article={article}
              favorite={isFavorite(article)}
              onToggleFavorite={() => toggleFavorite(article)}
            />
          ))}
        </section>
      )}

      <footer className="foot">made with ♥ by aditi</footer>
    </main>
  );
}
