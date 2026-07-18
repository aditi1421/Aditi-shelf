# aditi's shelf

A one-page reading list — articles I loved, as a colorful card grid.
Built with Next.js, deployed on Vercel.

## Adding an article

Append an entry to `data/articles.json`:

```json
{
  "url": "https://example.com/great-read",
  "take": "why I loved it, in one line",
  "tags": ["ai"],
  "favorite": false
}
```

Push to `main` — the build fetches the article's title, author, and cover
image automatically. Override any of those by adding `title`, `author`,
`publication`, or `image` fields to the entry.

## Development

```bash
npm install
npm test        # unit tests
npm run dev     # local dev server
npm run build   # refreshes metadata cache, then builds
```
