# Implementation Plan — gem-desktop

## Summary

Replace `src/pages/index.astro` with a full Atari ST GEM desktop UI. All content is statically
pre-rendered at build time into a hidden `#post-store` element; vanilla JS creates modal windows
on interaction. `DesktopLayout.astro` already exists and is ready to use.

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `src/styles/global.css` | Modify | Add any missing GEM tokens (currently has palette; verify completeness) |
| `src/layouts/DesktopLayout.astro` | Already exists — no change needed | Stripped layout; BaseHead + slot only |
| `src/pages/index.astro` | Full rewrite | GEM desktop page: static scaffold + post-store + inline JS |

No new files are required. `src/content/config.ts` and all `/posts/` routes are untouched.

## Implementation Steps

1. **Verify/extend CSS tokens in `global.css`** — confirm all GEM tokens referenced by the desktop
   HTML exist (`--color-desktop`, `--color-desktop-dot`, `--color-window-bg`, `--color-titlebar`,
   `--color-titlebar-text`, `--color-menubar`, `--color-border`, `--color-ink`, `--color-selected-bg`,
   `--color-selected-text`). All are present; no changes expected.
   _Addresses: T-S5_

2. **Rewrite `index.astro` frontmatter** — switch layout to `DesktopLayout`, fetch all posts via
   `getCollection`, partition into series parents and children, call `post.render()` on each post,
   group children by series slug (applying R2/R3 fallback logic).
   _Addresses: T-S4, T-E3_

3. **Build static desktop scaffold HTML** — emit `#desktop` containing `#menu-bar` (DESK / DATEI /
   INDEX / EXTRAS), `#desktop-area` with the HDD icon (`[data-hdd]` / visible label), and an empty
   `#modal-layer`. Keep `.gem-window` out of static HTML entirely.
   _Addresses: T-S1, T-S2, T-S3, T-S4, T-S6, T-W4_

4. **Build `#post-store` hidden element** — render one `<div id="post-html-{slug}" hidden>` per
   post using the `Content` component from `post.render()`, all inside `<div id="post-store" hidden>`.
   _Addresses: T-S5 (secondary), T-E3, T-E7_

5. **Write `openDriveWindow()`** — JS function that creates a `.gem-window` with `role="dialog"`,
   `aria-label="HARD DISK"`, title bar, close button (`.gem-close`), and one `[data-series]` icon per
   series. Append to `#modal-layer`. Apply initial cascade offset.
   _Addresses: T-D1, T-D3, T-D7, T-W4_

6. **Write `openFolderWindow(seriesSlug)`** — creates folder window titled with series title,
   `role="dialog"`, `aria-label` set to series title. Renders `[data-slug]` file icons for each child
   entry; falls back to parent if no children (R3).
   _Addresses: T-F1, T-F3, T-F4, T-F7_

7. **Write `openFileWindow(slug)`** — copies HTML from `#post-html-{slug}` into a text editor window
   titled `<SLUG>.TXT`. Shows fallback message when slug is not found. Content area is a non-editable
   `div` with `overflow-y: scroll`; no `<input>` or `contenteditable`.
   _Addresses: T-E1, T-E3, T-E4, T-E7_

8. **Write window management helpers** — `bringToFront(el)` (z-index counter), `closeWindow(el)`
   (remove from DOM), `makeDraggable(el, handle)` (mousedown/mousemove on title bar), cascade offset
   (+24px per new window). Wire `mousedown` on `.gem-window` → `bringToFront`.
   _Addresses: T-W1, T-W2, T-W3_

9. **Wire keyboard events** — `keydown Enter/Space` on HDD icon → `openDriveWindow`; same on folder
   icons → `openFolderWindow`; same on file icons → `openFileWindow`. `keydown Escape` on
   `.gem-window` → `closeWindow`. Use event delegation from `#desktop` and `#modal-layer`.
   _Addresses: T-D2, T-D5, T-F2, T-F6, T-E2, T-E6_

10. **Run `npm run build` and execute test suite** — confirm `dist/index.html` is produced, run
    `node --test test/feature_gem-desktop.test.js`, iterate on failures. Verify no `<header>`/`<footer>`
    leaks from BaseLayout.
    _Addresses: all T-* tests_

## Risks / Questions

- **T-D6 (re-open fresh window)** — not explicitly tested by the current test file, but the JS must
  not deduplicate or reuse existing windows; creating a new element each time satisfies this.
- **JSDOM `runScripts: 'dangerously'`** — the inline `<script>` must be plain ES2020 with no import
  statements and no `document.currentScript` assumptions; module scripts are not executed by JSDOM.
- **Series child availability for T-F3/T-W1/T-W2** — Nigel noted that `ai-in-justice-administration`
  must have at least one child entry for folder-window tests to be meaningful. Verify before running
  the suite; create a draft child entry if needed.
- **`post.render()` in Astro 5** — returns `{ Content, headings, remarkPluginFrontmatter }`;
  render HTML via the `Content` component in a template literal is not straightforward. Use
  `<Content />` in the Astro template inside `#post-store`, not in a JS string.
