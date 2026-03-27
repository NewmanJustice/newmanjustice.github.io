# Feature Specification — gem-desktop

## 1. Feature Intent
**Why this feature exists.**

- **Problem being addressed:** The current homepage presents content as character-card links that navigate away to `/posts/` routes. This is functional but generic, and it does not express the author's technical identity or make the reading experience memorable.
- **User need:** A reader landing on the homepage should immediately understand the blog's voice and feel — and be able to explore and read content without leaving the page.
- **System support:** This feature delivers the GEM desktop concept described in `.business_context/Claude_plan.md` — the primary, long-term UI direction for the homepage.

> Alignment to system spec: the feature directly serves the "memorable, consistent with authorial identity" success criterion, and it preserves content readability by surfacing post content inside purpose-built text editor windows.

---

## 2. Scope
### In Scope
- Full replacement of the current homepage (`/`) with an Atari ST GEM desktop interface.
- New `src/layouts/DesktopLayout.astro` — stripped layout (no site header/footer) used by the desktop page only.
- Atari ST GEM colour palette applied via `src/styles/global.css` design tokens (already partially done).
- Hard Disk icon on a green dotted desktop background.
- Drive window: opens on HDD double-click; displays one folder icon per series.
- Folder window: opens on folder double-click; displays one file icon per child entry (or the series parent if no children).
- Text Editor window: opens on file double-click; displays pre-rendered post HTML in a read-only, monospaced editor-style panel.
- Window chrome: title bar, close button, optional toolbar/path display, status bar, bottom-right resize handle (decorative or functional).
- Draggable windows via title bar (vanilla JS, no framework).
- Window stacking (bring-to-front on click).
- Cascaded window positioning (each new window offset +24px).
- Decorative menu bar: DESK / DATEI / INDEX / EXTRAS — no functional dropdowns.
- SVG icons (inline, pixel-art style): HDD, Folder, File.
- Build-time post HTML pre-rendering stored in a hidden `#post-store` element.
- Vanilla JS window management: `windowStack[]`, `openDriveWindow`, `openFolderWindow`, `openFileWindow`, `bringToFront`, `closeWindow`, `makeDraggable`.

### Out of Scope
- Changes to `/posts/[series]/` or `/posts/[series]/[entry]/` routes — these remain unchanged.
- Functional menu bar dropdowns.
- Persistent window state (no localStorage or URL state).
- Mobile/touch optimisation (deferred — flagged as a known gap in the system spec).
- Window resize as a fully functional drag interaction (the handle may be decorative initially).
- Icon selection state beyond visual highlight (no multi-select, no drag-to-move icons).
- Any new content schema changes.

---

## 3. Actors Involved
**Who interacts with this feature.**

### Reader (public)
- Can double-click the HDD icon to open the drive window.
- Can double-click folder icons to open folder windows.
- Can double-click file icons to open text editor windows and read posts.
- Can drag windows by their title bar.
- Can close any window via the close button.
- Can click any window to bring it to front.
- Cannot edit content, resize windows beyond the handle interaction, or access any backend.

### Author (owner)
- No direct interaction with this feature at runtime.
- Controls which series and posts appear by managing content files as per the existing content collection model.

---

## 4. Behaviour Overview
**What the feature does, conceptually.**

### Happy path
1. Reader loads `/`. They see a green desktop with a dot pattern, a top menu bar, and a single Hard Disk icon in the desktop area.
2. Reader double-clicks the Hard Disk icon. A GEM-style Drive window appears, titled "HARD DISK", showing one folder icon per series.
3. Reader double-clicks a folder icon. A Folder window appears, titled with the series name, showing one file icon per child entry.
4. Reader double-clicks a file icon. A Text Editor window appears, titled `<FILENAME>.TXT`, containing the post's formatted content in a read-only, monospaced scroll area.
5. Reader can drag any window, open multiple windows simultaneously, and close any window independently.

### Key alternatives
- **Series with no child entries:** The folder window displays the series parent post itself as a file icon. Double-clicking it opens the text editor with the parent post content.
- **Multiple windows open:** Windows stack by z-index; clicking a lower window brings it to front. Windows do not auto-close when a new one opens.
- **Close then re-open:** Opening the same drive or folder window again creates a fresh window instance; no state is carried over.
- **JavaScript disabled:** The desktop area renders (green background, HDD icon visible) but double-click interactions do nothing. No windows open. Deep links continue to function.

### User-visible outcomes
- The homepage looks and feels like an Atari ST GEM desktop.
- Post content is fully readable within the text editor window without navigating away.
- The experience is novel, memorable, and consistent with a developer authorial voice.

---

## 5. State & Lifecycle Interactions
**How this feature touches the system lifecycle.**

This feature is **state-creating** at the client-side interaction layer.

- Introduces client-side UI state: `windowStack[]`, z-index counter, window open/closed status.
- Does not interact with content lifecycle states (Draft / Published) — it only renders already-published content.
- The `#post-store` hidden DOM element is a build-time artefact, not a runtime state transition.
- States entered: all three window types (Drive, Folder, Text Editor) represent new UI states with no prior equivalent.
- States exited: the existing homepage character-card / navigation-link pattern is fully replaced.
- No system-wide state is modified; all state is local to the browser session and resets on page reload.

---

## 6. Rules & Decision Logic
**New or exercised rules.**

### R1 — Series identification
- **Description:** A content item is a series parent if it has no `series` field in frontmatter.
- **Inputs:** `getCollection('posts')` filtered to `!p.data.draft`.
- **Output:** Array of series parents for folder icon rendering.
- **Deterministic.**

### R2 — Entry-to-series mapping
- **Description:** Entries are grouped under their parent using the `series` slug field, which must match the parent's slug.
- **Inputs:** `post.data.series` value matched against parent `post.slug`.
- **Output:** Grouped entry lists per series folder.
- **Deterministic.** Orphaned entries (non-matching `series` field) would not appear in any folder window — treated as invisible.

### R3 — Folder fallback (series with no children)
- **Description:** If a series has zero child entries, the folder window displays the series parent itself as a file icon.
- **Inputs:** Child count for the series slug equals zero.
- **Output:** File icon representing the parent post in the folder window.
- **Deterministic.**

### R4 — Window z-order
- **Description:** Clicking or opening any window brings it to the top of the stack.
- **Inputs:** `mousedown` on a `.gem-window` element.
- **Output:** Window receives the current maximum z-index; counter increments.
- **Deterministic.**

### R5 — Post HTML source
- **Description:** Text editor windows must read post HTML from the `#post-store` hidden element, not via a runtime network fetch.
- **Inputs:** `data-slug` attribute on file icons, matched to `#post-html-{slug}` elements in `#post-store`.
- **Output:** Post HTML injected into the text editor window body.
- **Deterministic.**

---

## 7. Dependencies
**What this feature relies on.**

- **`src/content/config.ts`** — content schema (no changes required; existing fields are sufficient).
- **`src/lib/url.ts`** — `url()` helper; not used within the GEM desktop modals themselves (no internal navigation links in the modal layer), but required if any window content links out.
- **`src/styles/global.css`** — GEM colour palette tokens already partially defined; any missing tokens should be added here.
- **Astro `post.render()`** — used at build time to generate HTML for the `#post-store`.
- **Vanilla browser JS** — `dblclick`, `mousedown`, `mousemove` event APIs. No external JS dependencies.
- **`src/layouts/DesktopLayout.astro`** (new) — must be created as a stripped layout (BaseHead + global CSS + slot only).
- **DM Mono font** — already loaded; used for all GEM text.

---

## 8. Non-Functional Considerations
**Only where relevant.**

- **Performance:** All post HTML is embedded at build time. The inline `<script>` block must be minimal and load without blocking render. Window creation is DOM manipulation only — no heavy computation.
- **Accessibility:** This is the primary risk area for this feature. Double-click is not accessible by default. Keyboard interaction (Enter/Space to open, Escape to close, Tab to focus icons) should be specified in stories. ARIA roles for the modal windows (`role="dialog"`, `aria-label`) should be included.
- **Error tolerance:** If a `data-slug` lookup in `#post-store` fails (e.g. slug mismatch), the text editor window should open but show a fallback message rather than silently failing or throwing an error.
- **CSS isolation:** GEM window styles should be scoped to avoid polluting existing routes. The `<style>` block in `index.astro` or a dedicated CSS module is appropriate.

---

## 9. Assumptions & Open Questions
**What must be true for this feature to work.**

### Assumptions
- The GEM desktop will only be applied to the homepage (`/`); existing post routes are unaffected.
- DM Mono is an acceptable substitute for the original Atari ST bitmap font (no new font imports needed).
- The author accepts that window state does not persist across page reloads.
- The dot-pattern desktop background can be achieved with CSS radial-gradient (no image assets required).
- The text editor window displays rendered HTML from `post.render()` — Markdown is not re-parsed client-side.

### Open Questions
- **Window resize:** Should the resize handle (`gem-resizer`) be functionally draggable, or purely decorative in the first iteration? (Recommend: decorative initially, deferring functional resize to a later feature.)
- **Mobile:** Is there a minimum viable touch interaction for mobile visitors, or is the desktop-only experience acceptable for the initial release?
- **Keyboard accessibility depth:** What is the minimum keyboard interaction required before launch — full WCAG 2.1 AA, or best-effort?
- **Series ordering:** Should folder icons in the drive window be ordered by `pubDate` descending (current homepage logic), or alphabetically?

---

## 10. Impact on System Specification
**Alex-owned reconciliation section.**

This feature **reinforces** the following system spec assumptions:
- Series-as-folder, entry-as-file is a natural extension of the existing content model.
- Static, build-time rendering remains the delivery model — no runtime data fetching is introduced.

This feature **stretches** one system assumption:
- **Tension:** The system spec states "content readability is paramount and must not be compromised." The GEM desktop's modal-based, JS-dependent reading experience adds friction compared to a plain HTML page. If JS fails, post content is only accessible via deep links — not from the homepage.
- **Proposed resolution:** Ensure deep-link routes (`/posts/[series]/[entry]/`) remain fully functional and discoverable (e.g. posts link to their canonical URL within the text editor window). Do not apply this as a breaking change; flag for author decision.

This feature does **not** contradict any system spec invariants.

---

## 11. Handover to BA (Cass)
**What Cass should derive from this spec.**

### Story themes
1. **Desktop scaffold** — set up the DesktopLayout, CSS tokens, green desktop background, menu bar, HDD icon.
2. **Drive window** — HDD double-click opens drive window; folder icons per series; window chrome (title bar, close, drag).
3. **Folder window** — folder double-click opens folder window; file icons per entry; folder fallback for empty series.
4. **Text editor window** — file double-click opens post content; `#post-store` pre-rendering; scrollable read-only content area.
5. **Window management** — z-order (bring to front), cascading position, close behaviour, multi-window coexistence.
6. **Keyboard accessibility** — Enter/Space to open, Escape to close, Tab focus order for icons and windows.

### Expected story boundaries
- Each window type (Drive, Folder, Text Editor) is likely one story each, with window chrome shared as a dependency.
- Desktop scaffold should be the first story (it is a dependency for all others).
- Window management behaviours (drag, z-order, cascade) could be a single story or split by complexity.
- Accessibility may be a separate story or acceptance criteria embedded in each window story — Cass should decide.

### Areas needing careful story framing
- The `#post-store` pre-rendering in `index.astro` is a build-time concern; the story should make clear this is Astro frontmatter logic, not runtime JS.
- The window resize handle: stories should mark this as decorative/out-of-scope to avoid scope creep.
- The mobile gap: stories should not assume mobile behaviour unless a separate decision is made.

---

## 12. Change Log (Feature-Level)
| Date | Change | Reason | Raised By |
|------|--------|--------|-----------|
| 2026-03-27 | Initial feature specification created | First pass from business context and design plan | Alex |
