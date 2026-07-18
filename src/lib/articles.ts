export type ArticleMetadata = {
  title?: string;
  author?: string;
  publication?: string;
  image?: string;
};

export type ArticleInput = ArticleMetadata & {
  url: string;
  take?: string;
  tags?: string[];
  favorite?: boolean;
};

export type Article = {
  url: string;
  take?: string;
  tags: string[];
  favorite: boolean;
  title: string;
  author?: string;
  publication?: string;
  image?: string;
};

export function mergeArticles(
  inputs: ArticleInput[],
  cache: Record<string, ArticleMetadata>
): Article[] {
  const merged = inputs.map((input) => {
    const meta = cache[input.url] ?? {};
    return {
      url: input.url,
      take: input.take,
      tags: input.tags ?? [],
      favorite: input.favorite ?? false,
      title: input.title ?? meta.title ?? new URL(input.url).hostname,
      author: input.author ?? meta.author,
      publication: input.publication ?? meta.publication,
      image: input.image ?? meta.image,
    };
  });
  return [...merged.filter((a) => a.favorite), ...merged.filter((a) => !a.favorite)];
}
