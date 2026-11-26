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
  const exampleData = document.querySelector('#ie-example-data');
  const exampleSelect = document.querySelector('#ie-example');
  if (exampleData && exampleSelect) {
    const examples = JSON.parse(exampleData.textContent);
    let view = 'prediction';
    exampleSelect.replaceChildren(...examples.map(example => {
      const option = document.createElement('option');
      option.value = example.id;
      option.textContent = example.title;
      return option;
    }));
    function renderExtraction() {
      const example = examples.find(item => item.id === exampleSelect.value) || examples[0];
      const result = example[view];
      const sentence = document.querySelector('#ie-sentence');
      sentence.replaceChildren();
      let cursor = 0;
      for (const entity of [...result.entities].sort((a, b) => a.start - b.start)) {
        sentence.append(document.createTextNode(example.text.slice(cursor, entity.start)));
        const mark = document.createElement('mark');
        mark.className = `entity-${entity.label.toLowerCase()}`;
        mark.textContent = example.text.slice(entity.start, entity.end);
        mark.title = `${entity.label} [${entity.start}, ${entity.end})`;
        const label = document.createElement('small');
        label.textContent = entity.label;
        mark.append(label);
        sentence.append(mark);
        cursor = entity.end;
      }
      sentence.append(document.createTextNode(example.text.slice(cursor)));
      document.querySelector('#ie-counts').textContent = `${result.entities.length} entity mentions · ${result.relations.length} ${result.relations.length === 1 ? 'relation' : 'relations'}`;
      const relations = document.querySelector('#ie-relations');
      relations.replaceChildren();
      for (const relation of result.relations) {
        const row = document.createElement('div');
        row.className = 'ie-triple';
        for (const [role, text] of [
          ['head', example.text.slice(...relation.head)],
          ['type', relation.type],
          ['tail', example.text.slice(...relation.tail)],
        ]) {
          const cell = document.createElement(role === 'type' ? 'code' : 'span');
          cell.className = `triple-${role}`;
          cell.textContent = text;
          row.append(cell);
        }
        relations.append(row);
      }
      if (!result.relations.length) {
        const empty = document.createElement('p');
        empty.className = 'ie-empty';
        empty.textContent = view === 'prediction' ? 'No supported relation extracted.' : 'No relation is annotated in this example.';
        relations.append(empty);
      }
      document.querySelectorAll('[data-ie-view]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.ieView === view));
      });
    }
    exampleSelect.addEventListener('change', renderExtraction);
    document.querySelectorAll('[data-ie-view]').forEach(button => {
      button.addEventListener('click', () => { view = button.dataset.ieView; renderExtraction(); });
    });
    renderExtraction();
  }
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('nav a')];
  if (sections.length && navLinks.length) {
    function updateActiveNav() {
      let currentId = sections[0].id;
      if (window.scrollY >= 40) {
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= 120) {
            currentId = section.id;
          }
        }
      }
      navLinks.forEach(link => {
        const selected = link.hash === `#${currentId}`;
        link.classList.toggle('active', selected);
        if (selected) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('hashchange', updateActiveNav);
    updateActiveNav();
  }
})();
