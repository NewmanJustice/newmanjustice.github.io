## Handoff Summary
**For:** Cass
**Feature:** gem-desktop

### Key Decisions
- The homepage (`/`) is fully replaced by an Atari ST GEM desktop; existing `/posts/` routes are untouched.
- All interaction is modal — no page navigation occurs; post HTML is pre-rendered at build time into a hidden `#post-store`.
- Three window types: Drive (HDD → series folders), Folder (series → file icons), Text Editor (file → read-only post content).
- A new `DesktopLayout.astro` is required — stripped of site header/footer; used only by `index.astro`.
- Window resize handle is decorative in this iteration; mobile/touch is explicitly out of scope.

### Files Created
- `.blueprint/system_specification/SYSTEM_SPEC.md`
- `.blueprint/features/feature_gem-desktop/FEATURE_SPEC.md`

### Open Questions
- Should the window resize handle be functionally draggable or decorative only in v1?
- What is the minimum keyboard accessibility requirement before launch?
- Should folder icons in the drive window be ordered by `pubDate` or alphabetically?
- Is a mobile fallback (e.g. a simple list view) required before launch, or accepted as a known gap?

### Critical Context
The blog is an Astro 5 static site (GitHub Pages). All content is pre-rendered at build time — no runtime API calls. The GEM desktop is a single-page, vanilla-JS interaction layer sitting on top of `index.astro`. Story 1 (desktop scaffold + DesktopLayout) is a hard dependency for all other stories. The `#post-store` pattern (hidden pre-rendered HTML read by JS modals) is the key architectural constraint Codey needs to understand — make sure stories describe this clearly. Accessibility is the main risk: double-click is not keyboard-native, so Enter/Space/Escape handling needs to be specified as acceptance criteria in each window story.
