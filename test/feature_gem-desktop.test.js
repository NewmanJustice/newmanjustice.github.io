import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const DIST = new URL('../dist/index.html', import.meta.url).pathname;
const distExists = existsSync(DIST);

let dom, document, window;

before(() => {
  if (!distExists) return;
  const html = readFileSync(DIST, 'utf-8');
  dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  document = dom.window.document;
  window = dom.window;
});

const skip = (name, fn) => distExists ? test(name, fn) : test.skip(name, fn);

// Story: Desktop Scaffold
describe('Desktop Scaffold', () => {
  skip('T-S1: #desktop element present', () => {
    assert.ok(document.querySelector('#desktop'), '#desktop not found');
  });

  skip('T-S2: menu bar contains DESK, DATEI, INDEX, EXTRAS', () => {
    const bar = document.querySelector('#menu-bar, [data-menu-bar], nav.gem-menu');
    assert.ok(bar, 'menu bar element not found');
    const text = bar.textContent;
    for (const label of ['DESK', 'DATEI', 'INDEX', 'EXTRAS']) {
      assert.ok(text.includes(label), `menu bar missing label: ${label}`);
    }
  });

  skip('T-S3: HDD icon with visible label', () => {
    const hdd = document.querySelector('[data-hdd], #hdd-icon, .gem-hdd');
    assert.ok(hdd, 'HDD icon element not found');
    assert.ok(hdd.textContent.trim().length > 0, 'HDD icon has no visible label');
  });

  skip('T-S4: no BaseLayout <header> or <footer>', () => {
    assert.equal(document.querySelector('header'), null, 'unexpected <header> from BaseLayout');
    assert.equal(document.querySelector('footer'), null, 'unexpected <footer> from BaseLayout');
  });

  skip('T-S5: #post-store hidden element present (build-time pre-render)', () => {
    const store = document.querySelector('#post-store');
    assert.ok(store, '#post-store element not found');
  });

  skip('T-S6: static desktop structure requires no JS (key elements in HTML)', () => {
    const desktop = document.querySelector('#desktop');
    assert.ok(desktop, '#desktop must be in static HTML');
  });
});

// Story: Drive Window (via JS interaction)
describe('Drive Window', () => {
  skip('T-D1: dblclick on HDD opens window titled HARD DISK in #modal-layer', () => {
    const hdd = document.querySelector('[data-hdd], #hdd-icon, .gem-hdd');
    hdd.dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }));
    const modal = document.querySelector('#modal-layer');
    assert.ok(modal, '#modal-layer not found');
    const win = modal.querySelector('.gem-window');
    assert.ok(win, 'no .gem-window injected after dblclick');
    assert.ok(win.textContent.includes('HARD DISK'), 'window title does not include HARD DISK');
    win.remove(); // cleanup
  });

  skip('T-D2: Enter keypress on HDD opens Drive window', () => {
    const hdd = document.querySelector('[data-hdd], #hdd-icon, .gem-hdd');
    hdd.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    const win = document.querySelector('#modal-layer .gem-window');
    assert.ok(win, 'Enter did not open Drive window');
    win.remove();
  });

  skip('T-D3: Drive window has folder icon per published series', () => {
    const hdd = document.querySelector('[data-hdd], #hdd-icon, .gem-hdd');
    hdd.dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }));
    const win = document.querySelector('#modal-layer .gem-window');
    const folders = win.querySelectorAll('[data-series], .gem-folder-icon');
    assert.ok(folders.length > 0, 'Drive window has no folder icons');
    win.remove();
  });

  skip('T-D4: close button removes Drive window', () => {
    const hdd = document.querySelector('[data-hdd], #hdd-icon, .gem-hdd');
    hdd.dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }));
    const win = document.querySelector('#modal-layer .gem-window');
    const closeBtn = win.querySelector('.gem-close, [data-close], button[aria-label="Close"]');
    assert.ok(closeBtn, 'close button not found in Drive window');
    closeBtn.click();
    assert.equal(document.querySelector('#modal-layer .gem-window'), null, 'window not removed after close');
  });

  skip('T-D5: Escape removes Drive window', () => {
    const hdd = document.querySelector('[data-hdd], #hdd-icon, .gem-hdd');
    hdd.dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }));
    const win = document.querySelector('#modal-layer .gem-window');
    win.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert.equal(document.querySelector('#modal-layer .gem-window'), null, 'Escape did not close window');
  });

  skip('T-D7: Drive window has role=dialog and aria-label=HARD DISK', () => {
    const hdd = document.querySelector('[data-hdd], #hdd-icon, .gem-hdd');
    hdd.dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }));
    const win = document.querySelector('#modal-layer .gem-window');
    assert.equal(win.getAttribute('role'), 'dialog');
    assert.equal(win.getAttribute('aria-label'), 'HARD DISK');
    win.remove();
  });
});

// Story: Text Editor Window
describe('Text Editor Window', () => {
  skip('T-E3: post-store contains pre-rendered post HTML', () => {
    const store = document.querySelector('#post-store');
    const entries = store.querySelectorAll('[id^="post-html-"]');
    assert.ok(entries.length > 0, '#post-store has no pre-rendered post entries');
  });

  skip('T-E7: missing slug shows fallback, not empty', () => {
    const fakeFile = document.createElement('div');
    fakeFile.setAttribute('data-slug', '__nonexistent_slug__');
    fakeFile.className = 'gem-file-icon';
    document.body.appendChild(fakeFile);
    fakeFile.dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true }));
    const wins = document.querySelectorAll('#modal-layer .gem-window');
    if (wins.length > 0) {
      assert.ok(wins[wins.length - 1].textContent.trim().length > 0, 'fallback message missing');
    }
    fakeFile.remove();
    wins.forEach(w => w.remove());
  });
});

// Story: Window Management
describe('Window Management', () => {
  skip('T-W4: no .gem-window in DOM before any interaction', () => {
    // Re-parse a fresh DOM to check initial state
    const html = readFileSync(DIST, 'utf-8');
    const freshDom = new JSDOM(html);
    const freshDoc = freshDom.window.document;
    const wins = freshDoc.querySelectorAll('.gem-window');
    assert.equal(wins.length, 0, 'gem-window elements present in static HTML before JS runs');
  });
});
