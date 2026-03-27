# Story: Desktop Scaffold

## User story

As a reader, I want to land on a homepage that looks and feels like an Atari ST GEM desktop so that I immediately understand the blog's voice and can begin exploring content.

---

## Context / scope

- Public reader, no authentication required.
- Applies only to the homepage (`/`).
- `src/layouts/DesktopLayout.astro` must exist and be used by `src/pages/index.astro`.
- This story is a hard dependency for all other gem-desktop stories.

---

## Acceptance criteria

**AC-1 — Desktop background renders**
- Given a reader navigates to `/`,
- When the page loads,
- Then the desktop area displays a green background with a visible dot pattern.

**AC-2 — Menu bar is present**
- Given a reader navigates to `/`,
- When the page loads,
- Then a menu bar is visible at the top of the page containing the labels DESK, DATEI, INDEX, and EXTRAS.

**AC-3 — HDD icon is visible**
- Given a reader navigates to `/`,
- When the page loads,
- Then a single Hard Disk icon with a visible label is present in the desktop area.

**AC-4 — No site header or footer**
- Given a reader navigates to `/`,
- When the page loads,
- Then the standard site header and footer are not present on the page.

**AC-5 — GEM colour tokens applied**
- Given the page loads,
- When any GEM-styled element is rendered,
- Then it uses only the GEM palette design tokens defined in `src/styles/global.css` (no ad-hoc colour overrides).

**AC-6 — JavaScript disabled: desktop still renders**
- Given JavaScript is disabled in the browser,
- When a reader navigates to `/`,
- Then the desktop background, menu bar, and HDD icon are all visible (static render is unaffected).

---

## Out of scope

- Functional menu bar dropdowns — menu bar labels are decorative in this iteration.
- Mobile or touch layout — desktop-only experience; mobile is a known gap.
- Any content from `/posts/` routes — existing routes are not modified by this story.
- Window behaviour — covered in subsequent stories.
