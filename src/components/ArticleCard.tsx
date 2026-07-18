import type { Article } from "../lib/articles";
import { cardGradient, tagColor } from "../lib/colors";

export default function ArticleCard({
  article,
  favorite,
  onToggleFavorite,
}: {
  article: Article;
  favorite: boolean;
  onToggleFavorite: () => void;
}) {
  const accent = tagColor(article.tags[0] ?? article.title);
  const byline = [...new Set([article.author, article.publication].filter(Boolean))].join(" · ");

  return (
    <div className="cardWrap">
      <button
        type="button"
        className={favorite ? "star faved" : "star"}
        aria-pressed={favorite}
        title={favorite ? "remove from favorites" : "add to favorites"}
        onClick={onToggleFavorite}
      >
        ★
      </button>
      <a
        className="card"
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ "--accent": accent } as React.CSSProperties}
      >
        {article.image ? (
          <img className="cover" src={article.image} alt="" loading="lazy" />
        ) : (
          <div className="cover" style={{ background: cardGradient(article.title) }} />
        )}
        <div className="body">
          <h2>{article.title}</h2>
          {byline && <p className="byline">{byline}</p>}
          {article.take && <p className="take">“{article.take}”</p>}
          <div className="chips">
            {article.tags.map((tag) => (
              <span key={tag} className="chip" style={{ background: tagColor(tag) }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
}
