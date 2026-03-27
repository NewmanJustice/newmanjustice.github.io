# Test Spec: gem-desktop

## Brief Understanding

The gem-desktop feature replaces the current homepage with a simulated Atari ST GEM desktop. All content
is statically built into `dist/index.html`. Windows open via JavaScript without network requests;
post HTML is pre-rendered inside a hidden `#post-store` element at build time. Tests verify the built
HTML structure and the vanilla JS logic by parsing `dist/index.html` with JSDOM.

## Key Assumptions

1. `dist/index.html` exists after `npm run build` — tests are skipped if the file is absent.
2. The GEM desktop replaces `<body>` content; `BaseLayout.astro` / standard header+footer are gone.
3. `#modal-layer` is always present in the DOM; windows are injected into it by JavaScript at runtime.
4. `data-slug` is the canonical attribute linking file icons to `#post-html-{slug}` in `#post-store`.
5. Keyboard handling (Enter/Space/Escape) and drag-and-drop are inline JS — tested via JSDOM event dispatch.
6. `role="dialog"` + `aria-label` must be on window elements; we confirm they are set by the JS that creates windows.
7. Window z-index management uses a `windowStack[]` array and `bringToFront()` function embedded in the page script.
8. jsdom is installed as a dev dependency (`npm install --save-dev jsdom`).

## AC → Test ID Mapping

### Story: Desktop Scaffold

| AC | Test ID | Scenario |
|----|---------|----------|
| AC-1 | T-S1 | `#desktop` element with green background class/attribute present |
| AC-2 | T-S2 | Menu bar contains DESK, DATEI, INDEX, EXTRAS labels |
| AC-3 | T-S3 | HDD icon element present with a visible label |
| AC-4 | T-S4 | No `<header>` or `<footer>` element from BaseLayout present |
| AC-5 | T-S5 | GEM CSS custom properties present in global.css (static check) |
| AC-6 | T-S6 | Desktop background, menu bar, HDD icon all in static HTML (no JS required) |

### Story: Drive Window

| AC | Test ID | Scenario |
|----|---------|----------|
| AC-1 | T-D1 | dblclick on HDD icon injects a window titled "HARD DISK" into #modal-layer |
| AC-2 | T-D2 | Enter keypress on HDD icon opens Drive window |
| AC-3 | T-D3 | Drive window contains one folder icon per published series |
| AC-4 | T-D4 | Close button click removes Drive window from DOM |
| AC-5 | T-D5 | Escape keypress removes Drive window from DOM |
| AC-6 | T-D6 | Re-opening after close creates a fresh window (no stale state) |
| AC-7 | T-D7 | Drive window has role="dialog" and aria-label="HARD DISK" |

### Story: Folder Window

| AC | Test ID | Scenario |
|----|---------|----------|
| AC-1 | T-F1 | dblclick on folder icon injects window labelled with series title |
| AC-2 | T-F2 | Enter keypress on folder icon opens Folder window |
| AC-3 | T-F3 | Folder window shows one file icon per published child entry |
| AC-4 | T-F4 | Series with no children shows parent as single file icon (fallback) |
| AC-5 | T-F5 | Close button removes Folder window from DOM |
| AC-6 | T-F6 | Escape removes Folder window from DOM |
| AC-7 | T-F7 | Folder window has role="dialog" and aria-label matching series title |

### Story: Text Editor Window

| AC | Test ID | Scenario |
|----|---------|----------|
| AC-1 | T-E1 | dblclick on file icon injects Text Editor window titled "<SLUG>.TXT" |
| AC-2 | T-E2 | Enter keypress on file icon opens Text Editor window |
| AC-3 | T-E3 | Content area shows HTML from matching #post-html-{slug} element |
| AC-4 | T-E4 | Content area has overflow-y scroll; no <input> or contenteditable present |
| AC-5 | T-E5 | Close button removes Text Editor window from DOM |
| AC-6 | T-E6 | Escape removes Text Editor window from DOM |
| AC-7 | T-E7 | Missing slug shows fallback message (not empty, not a JS error) |

### Story: Window Management

| AC | Test ID | Scenario |
|----|---------|----------|
| AC-2 | T-W1 | Clicking a window gives it the highest z-index among all open windows |
| AC-3 | T-W2 | Each new window opens 24px further right and down than the previous |
| AC-4 | T-W3 | Closing one window leaves sibling windows untouched in the DOM |
| AC-5 | T-W4 | No window elements present before any JS interaction (fresh DOM) |

> AC-1 (drag) and AC-6 (Tab focus cycling) are covered by structure-only smoke tests; full pointer/focus
> simulation is marked `.todo` as it requires pointer-event support beyond JSDOM's default capability.
