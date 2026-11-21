'use strict';
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const readTheme = () => { try { return localStorage.getItem('km-theme'); } catch { return null; } };
  function setTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }
  setTheme(readTheme() || 'light');
  toggle?.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('km-theme', theme); } catch { /* Storage may be disabled. */ }
  });
  const noise = document.querySelector('#noise');
  function updateCapacity() {
    const p = Number(noise.value);
    const h = p === 0 || p === 1 ? 0 : -p * Math.log2(p) - (1 - p) * Math.log2(1 - p);
    const capacity = Math.max(0, Math.min(1, 1 - h));
    document.querySelector('#noise-value').textContent = p.toFixed(2);
    document.querySelector('#capacity-value').textContent = capacity.toFixed(3);
    document.querySelector('#capacity-bar').style.width = `${capacity * 100}%`;
    noise.setAttribute('aria-valuetext', `Bit flip probability ${p.toFixed(2)}; capacity ${capacity.toFixed(3)} bits per channel use`);
  }
  if (noise) { noise.addEventListener('input', updateCapacity); updateCapacity(); }
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        document.querySelectorAll('nav a').forEach(link => {
          const selected = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', selected);
          if (selected) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-10% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();
