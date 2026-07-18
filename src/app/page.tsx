import articles from "../../data/articles.json";
import cache from "../../data/metadata-cache.json";
import { mergeArticles, type ArticleInput, type ArticleMetadata } from "../lib/articles";
import Shelf from "../components/Shelf";

export default function Home() {
  const merged = mergeArticles(
    articles as ArticleInput[],
    cache as Record<string, ArticleMetadata>
  );
  return <Shelf articles={merged} />;
}
