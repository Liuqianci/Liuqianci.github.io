'use strict';

(() => {
  const root = document.documentElement;
  const storageKey = 'blog-color-mode';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  let button;

  function readPreference() {
    try {
      const value = localStorage.getItem(storageKey);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (_) {
      // 禁用存储时仍可切换，当前页面内有效。
      return null;
    }
  }

  function applyMode() {
    const mode = preference || (system.matches ? 'dark' : 'light');
    root.dataset.colorMode = mode;
    if (button) {
      button.setAttribute('aria-checked', String(mode === 'dark'));
      button.title = mode === 'dark' ? '切换到日间模式' : '切换到夜间模式';
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = mode === 'dark' ? '#151c25' : '#f2f5f7';
  }

  preference = readPreference();
  applyMode();

  document.addEventListener('DOMContentLoaded', () => {
    const brand = document.querySelector('.site-meta .brand');
    if (!brand) return;

    const row = document.createElement('div');
    row.className = 'site-brand-row';
    brand.before(row);
    row.append(brand);

    button = document.createElement('button');
    button.type = 'button';
    button.className = 'color-mode-toggle';
    button.setAttribute('role', 'switch');
    button.setAttribute('aria-label', '夜间模式');
    button.innerHTML = '<span class="color-mode-thumb" aria-hidden="true">' +
      '<svg class="color-mode-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/>' +
      '<path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>' +
      '<svg class="color-mode-moon" viewBox="0 0 24 24"><path d="M20 14A9 9 0 0 1 10 4a9 9 0 1 0 10 10Z"/></svg>' +
      '</span>';
    button.addEventListener('click', () => {
      preference = root.dataset.colorMode === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(storageKey, preference);
      } catch (_) {
        // 存储不可用不影响当前页的按钮和配色。
      }
      applyMode();
    });
    row.append(button);
    applyMode();
  });

  system.addEventListener('change', () => {
    if (!preference) applyMode();
  });
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      preference = readPreference();
      applyMode();
    }
  });
})();
