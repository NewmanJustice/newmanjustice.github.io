# Story: Folder Window

## User story

As a reader, I want to open a Folder window by double-clicking a series folder icon so that I can see all posts in that series as file icons.

---

## Context / scope

- Public reader on the homepage (`/`), with the Drive window already open.
- Entry condition: at least one folder icon is visible in the Drive window.
- The Folder window appears inside the `#modal-layer` DOM element.
- File icons within the Folder window represent published, non-draft child entries belonging to the series (matched by `series` slug to the parent's slug).
- Rule R3 applies: if a series has zero child entries, the folder window displays the series parent post itself as a single file icon.

---

## Acceptance criteria

**AC-1 — Double-click opens the Folder window**
- Given the Drive window is open and a folder icon is visible,
- When the reader double-clicks a folder icon,
- Then a window labelled with the series title becomes visible in the modal layer.

**AC-2 — Keyboard open (Enter/Space)**
- Given a folder icon has keyboard focus,
- When the reader presses Enter or Space,
- Then the Folder window opens for that series (same outcome as AC-1).

**AC-3 — File icons match published child entries**
- Given the Folder window is open for a series that has one or more published child entries,
- When the reader views its contents,
- Then exactly one file icon is displayed per published child entry, each labelled with the entry title.

**AC-4 — Fallback: series with no children shows parent as file icon**
- Given the Folder window is open for a series that has zero child entries,
- When the reader views its contents,
- Then a single file icon representing the series parent post is displayed, labelled with the parent's title.

**AC-5 — Window has a working close button**
- Given the Folder window is open,
- When the reader clicks the window's close button,
- Then the Folder window is removed from the DOM.

**AC-6 — Escape key closes the Folder window**
- Given the Folder window is open and has focus,
- When the reader presses Escape,
- Then the Folder window is removed from the DOM.

**AC-7 — Window has an accessible role and label**
- Given the Folder window is in the DOM,
- Then it has `role="dialog"` and an `aria-label` matching the series title.

---

## Out of scope

- Orphaned entries (entries whose `series` slug does not match any parent) — these are invisible and no story covers them.
- Functional window resize — decorative in this iteration.
- Multiple Folder windows for the same series simultaneously — not a supported interaction.
- Mobile/touch interaction.
