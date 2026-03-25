# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

There are no tests. There is no lint script.

## Architecture

This is an **Astro 5** blog deployed to GitHub Pages. Key points:

### Content Collections

All blog content lives in `src/content/posts/`. Posts use a **series model**:

- A directory (e.g. `mcp-learning-journey/`) holds one series.
- `index.md` in that directory is the **series parent** — no `series` frontmatter, defines the series title/description.
- Numbered child files (e.g. `01-what-is-mcp.md`) are **series entries** — they carry `series: "<parent-slug>"` and `seriesOrder: <n>` in their frontmatter.

The content schema (`src/content/config.ts`) requires `title`, `description`, `pubDate` and supports `series`, `seriesOrder`, `tags`, `draft`.

### Routing

| URL | Page |
|-----|------|
| `/posts/` | `src/pages/posts/index.astro` — lists all series |
| `/posts/[series]/` | `src/pages/posts/[series]/index.astro` — series overview + entry list |
| `/posts/[series]/[entry]/` | `src/pages/posts/[series]/[entry].astro` — individual post with prev/next nav |

The `[entry].astro` page resolves parents and siblings at build time and passes them to `PostLayout` for series navigation.

### URL handling

**Always use the `url()` helper from `src/lib/url.ts`** for internal links. It prepends `BASE_URL` so paths work correctly when the site is served from a GitHub Pages subdirectory (e.g. `/newman_justice_blog/`). Do not hardcode `/posts/...` paths directly.

### Styling

Tailwind v4 is configured CSS-first in `src/styles/global.css` via `@theme`. Design tokens (colors, fonts) are defined there as CSS custom properties — edit that file to change the design system. The palette is warm parchment tones with amber accent (`--color-accent: #92400E`). All fonts use DM Mono.

### Path alias

`@/` resolves to `src/` (configured in `tsconfig.json`).

### Deployment

Pushing to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`) which builds and deploys to GitHub Pages automatically.
