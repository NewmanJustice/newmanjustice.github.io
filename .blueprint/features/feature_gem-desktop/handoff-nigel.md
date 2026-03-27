## Handoff Summary
**For:** Codey
**Feature:** gem-desktop

### Key Decisions
- Tests parse `dist/index.html` with JSDOM (`runScripts: 'dangerously'`); all tests auto-skip if the dist file is absent, so the suite is safe to run before implementation.
- DOM contracts are discovered via three selector patterns per element (e.g. `[data-hdd], #hdd-icon, .gem-hdd`) to give Codey flexibility in naming, but the canonical identifiers are preferred.
- JS interaction tests (Drive/Folder/Text Editor windows) dispatch real `MouseEvent`/`KeyboardEvent` and assert on injected `.gem-window` elements in `#modal-layer`.
- ARIA contract (T-D7): windows must carry `role="dialog"` and `aria-label` set by the JS that creates them, not baked into static HTML.
- T-W4 re-parses a fresh JSDOM (no `runScripts`) to assert zero `.gem-window` in raw static HTML.

### Files Created
- `test/artifacts/feature_gem-desktop/test-spec.md`
- `test/feature_gem-desktop.test.js`

### Open Questions
- None — Folder window tests (T-F*) and multi-window z-index (T-W1/W2/W3) require a series with child entries to exist; currently only `ai-in-justice-administration` series is present. Codey should ensure at least one child entry so those scenarios are exercisable.

### Critical Context
Required DOM contracts (must implement to pass tests):
- `#desktop` — root desktop element in static HTML
- `#modal-layer` — always in static HTML; windows injected here by JS
- `#post-store[hidden]` — children `id="post-html-{slug}"` (one per post)
- HDD icon: `[data-hdd]`, `#hdd-icon`, or `.gem-hdd` with non-empty label
- `.gem-window` — injected by JS only; never present in raw static HTML
- Each window: `role="dialog"`, `aria-label="<TITLE>"`, close via `.gem-close` or `[data-close]`
- `keydown` Escape on `.gem-window` must remove it from DOM
- Drive window folder icons: `[data-series]` or `.gem-folder-icon`
- File icons: `[data-slug]` value matches `#post-html-{slug}` in `#post-store`
- Menu bar element containing `DESK`, `DATEI`, `INDEX`, `EXTRAS`
