# System Specification — NewmanJustice Blog

## 1. Purpose & Intent
**Why this system exists.**

- **Problem:** A principal developer at HMCTS needs a personal publishing platform that reflects both technical credibility and a distinct authorial voice — one that goes beyond generic blog templates.
- **Who it is for:** Primarily a public readership of software engineers, technologists, and justice-sector colleagues. Secondary audience: the author as publisher and curator.
- **Success in business terms:** Readers can discover, navigate, and read long-form technical writing with minimal friction. The experience is memorable and consistent with the author's identity as someone who thinks carefully about technology and craft.
- **Must not be compromised:** Content readability is paramount. Any presentational or UX choices must serve the ability to read and understand posts, not obstruct it.

> This section anchors all future decisions.
> If a feature contradicts the readability-first principle, it must be flagged.

---

## 2. Business & Domain Context
**Grounded in `.business_context`.**

- The blog belongs to a principal developer at HM Courts and Tribunals Service (HMCTS). Posts concern technology in context — its impact on software engineering practice within large public-sector delivery environments.
- No regulatory or legal obligations apply to the blog itself; however, the author's professional context means care should be taken that nothing in the UI or content misrepresents HMCTS or the justice sector.
- The site is statically built and hosted on GitHub Pages — this is a deliberate low-cost, low-maintenance posture.

**Assumptions**
- Content will continue to grow as a series-based model (parent series + ordered child entries).
- The author is the sole publisher; no multi-author workflow is needed now.
- Traffic volume is modest; no CDN or edge caching is required beyond GitHub Pages defaults.
- The Atari ST GEM desktop aesthetic is the intended long-term UI direction, not a temporary experiment.

---

## 3. System Boundaries
**What is in scope vs out of scope.**

### In Scope
- Authoring and publishing blog posts via Astro content collections (Markdown files in `src/content/posts/`).
- Serving a public-facing site via GitHub Pages, deployed automatically on push to `main`.
- Presenting the homepage (`/`) as an interactive Atari ST GEM desktop: series as folder icons, posts as file icons, content readable in modal text-editor windows — all on a single page.
- Routing `/posts/[series]/` and `/posts/[series]/[entry]/` for direct URL access (deep links, sharing).
- Design tokens and visual identity in `src/styles/global.css`.

### Out of Scope
- User accounts, authentication, or personalisation.
- Comments, social features, or third-party integrations (analytics, etc.) — unless explicitly introduced.
- Server-side rendering or dynamic back-end; the system is fully static.
- Content management UI — all authoring is file-based.
- Search functionality (not currently planned).

---

## 4. Actors & Roles
**Who interacts with the system and how.**

### Reader (public)
- Arrives at the homepage and navigates content via the GEM desktop interface.
- Can also deep-link directly to a series or post via `/posts/` URL routes.
- Can read posts; cannot modify or submit anything.
- No authentication required or available.

### Author (owner)
- Creates and edits Markdown files in `src/content/posts/`.
- Controls design tokens, layout, and components by editing source files.
- Publishes by pushing commits to `main`; GitHub Actions handles build and deploy.
- Full authority over all system content and configuration.

---

## 5. Core Domain Concepts
**Shared language and meanings.**

### Series
- A logical grouping of related posts, represented as a directory in `src/content/posts/`.
- Identified by an `index.md` file with no `series` frontmatter field.
- Key attributes: `title`, `description`, `pubDate`, optional `tags`, optional `pose`.
- On the GEM desktop: rendered as a **folder icon**.

### Entry (Post)
- An individual piece of writing belonging to a series.
- Markdown file with `series: "<parent-slug>"` and `seriesOrder: <n>` in frontmatter.
- Key attributes: `title`, `description`, `pubDate`, `series`, `seriesOrder`, optional `tags`, `draft`.
- On the GEM desktop: rendered as a **file icon** inside its parent folder window.

### Draft
- A post with `draft: true` in frontmatter. Excluded from all public collections at build time.

### Slug
- The filesystem directory/file name, used as the URL segment and as the identifier for series-to-entry relationships.

### Desktop (GEM Desktop)
- The visual metaphor for the homepage (`/`). Presents the full content hierarchy as an Atari ST TOS/GEM-style interactive desktop.
- All interaction is modal — no page navigation occurs within the desktop experience.

### Window (GEM Window)
- A draggable, closable overlay panel that represents a navigational or reading context.
- Three types: **Drive Window** (top-level), **Folder Window** (series contents), **Text Editor Window** (post reading).

### Modal Layer
- The DOM layer (`#modal-layer`) in which all GEM windows are rendered and stacked.

---

## 6. High-Level Lifecycle & State Model
**How the system behaves over time.**

### Content Lifecycle
1. **Draft** — file exists, `draft: true`; invisible to readers.
2. **Published** — `draft: false` (or omitted); included in all collections and rendered at build time.
3. *(No unpublish or archive state currently — deletion from filesystem removes content.)*

### Desktop Interaction State (client-side, not persisted)
- **Closed desktop** — page loaded, only the HDD icon visible on the desktop area.
- **Drive window open** — HDD double-clicked; drive window showing series folder icons is in the modal layer.
- **Folder window open** — a folder icon double-clicked; folder window showing file icons is stacked in the modal layer.
- **Text editor open** — a file icon double-clicked; text editor window with post content is in the modal layer.
- Windows are independently closable; multiple windows can coexist.
- State is not persisted — a page refresh resets to closed desktop.

**Notes:**
- Z-order (window stacking) is managed client-side via a JS counter.
- The system does not currently support mobile-optimised GEM interaction; responsive behaviour is a known gap.

---

## 7. Governing Rules & Invariants
**What must always be true.**

1. Every entry must have exactly one parent series (identified by matching `series` slug to a parent `index.md` slug).
2. Draft posts must never appear in the public site — the `getCollection` filter enforces this at build time.
3. Post HTML for the text editor is pre-rendered at build time and embedded in a hidden `#post-store`; the modal reads from this store — no runtime fetches for post content.
4. All internal links must use the `url()` helper from `src/lib/url.ts` to ensure correct BASE_URL handling.
5. The GEM desktop experience exists only on the homepage (`/`); deep-link routes (`/posts/[series]/[entry]/`) continue to use the standard blog layout.
6. Closing a window removes it from the DOM entirely; window state is not retained between open/close cycles.

---

## 8. Cross-Cutting Concerns
**Concerns that affect multiple features.**

### Accessibility
- The GEM desktop is a visually rich interaction layer. Keyboard accessibility (tab focus, Enter to open, Escape to close) must be considered for all interactive elements.
- Post content in the text editor window must remain readable by screen readers.
- Icon labels must have appropriate `aria-label` or visible text.

### Performance
- All post HTML is pre-rendered at build time. The JavaScript bundle must remain small (vanilla JS, no framework).
- Icon SVGs are inline and lightweight.

### URL Integrity
- Deep links to posts and series must remain stable. The GEM desktop is an enhancement layer over existing routing, not a replacement.

### Resilience
- If JavaScript is disabled, the GEM desktop degrades: the desktop area is visible but non-interactive. Deep links (`/posts/`) continue to function as plain HTML pages.

### Consistency
- The Atari ST GEM visual language (colour palette, border weight, typography scale, window chrome) must be applied consistently across all window types.

---

## 9. Non-Functional Expectations (System-Level)
**Not exhaustive NFRs, but system intent.**

- **Performance:** Pages should load fast on a standard connection. No third-party JS or runtime framework; build output is static HTML/CSS/JS only.
- **Reliability:** GitHub Pages provides the hosting SLA. Build failures should be visible via GitHub Actions; a failed build should not deploy.
- **Security posture:** No user input, no server-side processing, no credentials. Attack surface is minimal. Dependencies should be kept current.
- **Scalability:** Content volume is expected to remain modest (tens of posts, not thousands). No pagination or indexing strategy is needed in the near term.
- **Maintainability:** Design tokens are CSS-first in `global.css`. Component and layout boundaries should be respected so that visual changes remain localised.

---

## 10. Known Gaps, Risks & Open Questions
**Explicit uncertainty.**

- **Mobile/touch interaction:** The GEM desktop uses double-click and drag — interactions that do not map naturally to touch. A mobile fallback strategy is undefined.
- **Window resize:** The plan mentions a resize handle; behaviour on resize (especially for the text editor with long content) is unspecified.
- **Deep-link vs desktop parity:** A reader arriving via a direct post URL gets a different (non-GEM) experience. This is intentional but may feel inconsistent over time.
- **Accessibility completeness:** The full WCAG compliance level for the GEM desktop has not been defined.
- **Series without children:** If a series has no child entries (only the `index.md` itself), the folder window shows the parent as a file icon. This edge case should be confirmed as the intended behaviour.
- **Build-time post rendering:** Using `post.render()` for all posts increases build time as content grows. This is acceptable now but may need revisiting.

---

## 11. Change Log (System-Level)
| Date | Change | Reason | Approved By |
|------|--------|--------|-------------|
| 2026-03-27 | Initial system specification created | New project; no prior spec existed | Alex |
