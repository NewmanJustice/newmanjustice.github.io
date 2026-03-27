# Story: Window Management

## User story

As a reader, I want to drag, stack, and independently close multiple windows so that I can organise my reading experience on the desktop.

---

## Context / scope

- Public reader on the homepage (`/`), with one or more GEM windows open in the modal layer.
- Entry condition: at least one window is present in `#modal-layer`.
- Covers: dragging via the title bar, z-order (bring-to-front), cascaded initial positioning, and independent close behaviour.
- All window management is handled by vanilla JS (`windowStack[]`, `bringToFront`, `makeDraggable`, `closeWindow`).

---

## Acceptance criteria

**AC-1 — Window is draggable via the title bar**
- Given a GEM window is open,
- When the reader clicks and drags the window's title bar,
- Then the window moves to follow the pointer and remains at the new position when the pointer is released.

**AC-2 — Clicking a window brings it to front**
- Given two or more windows are open and one is obscured by another,
- When the reader clicks on the obscured window,
- Then that window receives the highest z-index among all open windows and appears in front of the others.

**AC-3 — New windows open at a cascaded offset**
- Given one or more windows are already open,
- When a new window is opened,
- Then the new window's initial position is offset by +24px horizontally and +24px vertically relative to the previously opened window.

**AC-4 — Closing one window does not affect other open windows**
- Given two or more windows are open,
- When the reader closes one window via its close button,
- Then only that window is removed from the DOM; all other windows remain open and unchanged.

**AC-5 — Window state resets on page reload**
- Given one or more windows are open,
- When the reader reloads the page,
- Then all windows are gone and the desktop returns to its initial state (HDD icon only, no windows open).

**AC-6 — Tab key cycles focus through interactive elements within the front window**
- Given a GEM window is open and in focus,
- When the reader presses Tab,
- Then keyboard focus moves sequentially through the interactive elements within that window (close button, icons).

---

## Out of scope

- Functional window resize via drag — the resize handle element is present but decorative in this iteration.
- Persistent window state across page reloads — no localStorage or URL state is used.
- Icon dragging within windows — icons are not repositionable.
- Multi-window keyboard navigation between windows (i.e. switching between windows by keyboard) — not specified for this iteration.
- Mobile/touch drag interactions.
