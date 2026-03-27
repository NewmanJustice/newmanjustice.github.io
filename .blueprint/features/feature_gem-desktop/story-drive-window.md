# Story: Drive Window

## User story

As a reader, I want to open a Drive window by double-clicking the Hard Disk icon so that I can see all available series as folder icons.

---

## Context / scope

- Public reader on the homepage (`/`).
- Entry condition: the desktop scaffold is rendered and the HDD icon is present.
- The Drive window appears inside the `#modal-layer` DOM element.
- One folder icon is rendered per published series (i.e. each `index.md` with no `series` frontmatter, where `draft` is not `true`).

---

## Acceptance criteria

**AC-1 — Double-click opens the Drive window**
- Given the homepage is loaded and no Drive window is open,
- When the reader double-clicks the Hard Disk icon,
- Then a window element with the title "HARD DISK" becomes visible in the modal layer.

**AC-2 — Keyboard open (Enter/Space)**
- Given the Hard Disk icon has keyboard focus,
- When the reader presses Enter or Space,
- Then the Drive window opens (same outcome as AC-1).

**AC-3 — Folder icons match published series**
- Given the Drive window is open,
- When the reader views its contents,
- Then exactly one folder icon is displayed per published series, each labelled with the series title.

**AC-4 — Window has a working close button**
- Given the Drive window is open,
- When the reader clicks the window's close button,
- Then the Drive window is removed from the DOM.

**AC-5 — Escape key closes the Drive window**
- Given the Drive window is open and has focus,
- When the reader presses Escape,
- Then the Drive window is removed from the DOM.

**AC-6 — Re-opening creates a fresh window**
- Given the Drive window was previously closed,
- When the reader double-clicks (or activates) the HDD icon again,
- Then a new Drive window opens with no carry-over from the previous instance.

**AC-7 — Window has an accessible role and label**
- Given the Drive window is in the DOM,
- Then it has `role="dialog"` and an `aria-label` of "HARD DISK" (or equivalent accessible label).

---

## Out of scope

- Functional window resize — the resize handle is decorative in this iteration.
- Draft series — these must not appear as folder icons.
- Alphabetical vs date ordering of folder icons — ordering is deferred (open question from Alex).
- Mobile/touch interaction.
