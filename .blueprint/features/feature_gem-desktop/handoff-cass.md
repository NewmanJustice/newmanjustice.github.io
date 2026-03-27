## Handoff Summary
**For:** Nigel
**Feature:** gem-desktop

### Key Decisions
- Keyboard accessibility (Enter/Space to open, Escape to close, Tab focus) is embedded as ACs in every window story — not a separate story.
- The `#post-store` pattern is called out explicitly in the Text Editor story: content comes from `#post-html-{slug}` at DOM-read time, never from a network fetch.
- The resize handle is marked out of scope in all relevant stories to prevent scope creep.
- The folder fallback rule (series with no children shows parent as a file icon) is an explicit AC in the Folder Window story.
- Story 1 (desktop-scaffold) is a hard build dependency; all other stories assume it is complete.

### Files Created
- story-desktop-scaffold.md
- story-drive-window.md
- story-folder-window.md
- story-text-editor-window.md
- story-window-management.md

### Open Questions
- Folder icon ordering in the Drive window: `pubDate` descending or alphabetical? (inherited from Alex; no AC written for ordering until resolved)
- Minimum keyboard accessibility depth before launch: best-effort or WCAG 2.1 AA? (ACs cover Enter/Space/Escape/Tab; full WCAG audit is out of scope until clarified)

### Critical Context
All post HTML is embedded in the DOM at build time inside `#post-store`; there are no runtime fetches. Tests for the Text Editor window should verify DOM injection from `#post-html-{slug}`, not network calls. The slug mismatch fallback (AC-7 in text-editor story) is a testable error-tolerance path. Window management tests should confirm z-index increments on click/open and that closing one window leaves siblings untouched in the DOM.
