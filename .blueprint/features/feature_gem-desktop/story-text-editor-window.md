# Story: Text Editor Window

## User story

As a reader, I want to open a Text Editor window by double-clicking a file icon so that I can read the full post content without navigating away from the desktop.

---

## Context / scope

- Public reader on the homepage (`/`), with a Folder window open and at least one file icon visible.
- Entry condition: a file icon is present in a Folder window (or the Drive window fallback case).
- The Text Editor window appears inside the `#modal-layer` DOM element.
- Post HTML is pre-rendered at build time by Astro (`post.render()`) and embedded in a hidden `#post-store` element in the DOM. The window reads from `#post-html-{slug}` within that store — no runtime network request is made.
- The content area is read-only and scrollable.

---

## Acceptance criteria

**AC-1 — Double-click opens the Text Editor window**
- Given a Folder window is open and a file icon is visible,
- When the reader double-clicks a file icon,
- Then a Text Editor window titled `<FILENAME>.TXT` (derived from the post slug) becomes visible in the modal layer.

**AC-2 — Keyboard open (Enter/Space)**
- Given a file icon has keyboard focus,
- When the reader presses Enter or Space,
- Then the Text Editor window opens for that post (same outcome as AC-1).

**AC-3 — Post content is displayed from the post store**
- Given the Text Editor window is open,
- When the reader views the content area,
- Then the rendered HTML of the corresponding post is displayed, sourced from `#post-html-{slug}` in the `#post-store` element.

**AC-4 — Content area is scrollable and read-only**
- Given the Text Editor window is open,
- When the content overflows the visible area,
- Then the content area is scrollable; no editable input fields are present.

**AC-5 — Window has a working close button**
- Given the Text Editor window is open,
- When the reader clicks the window's close button,
- Then the Text Editor window is removed from the DOM.

**AC-6 — Escape key closes the Text Editor window**
- Given the Text Editor window is open and has focus,
- When the reader presses Escape,
- Then the Text Editor window is removed from the DOM.

**AC-7 — Slug lookup failure shows a fallback message**
- Given a file icon's `data-slug` value does not match any element in `#post-store`,
- When the reader opens the Text Editor window,
- Then the content area displays a fallback message instead of being empty or throwing a JS error.

---

## Out of scope

- Runtime network fetching for post content — all HTML is embedded at build time.
- Re-parsing Markdown client-side — only pre-rendered HTML is injected.
- Editing post content — the window is read-only.
- Functional window resize — decorative in this iteration.
- Mobile/touch interaction.
