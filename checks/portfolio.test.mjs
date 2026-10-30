import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const html = readFileSync(join(root, 'index.html'), 'utf8');

// Prueba de estructura, evidencias reales, rutas y contenido honesto.
const cards = [...html.matchAll(/<article\b[^>]*class="[^"]*\bproject-card\b[^"]*"[^>]*>/g)];
assert.equal(cards.length, 6, 'Debe mostrar los seis casos seleccionados');
const projectUrls = [
  'dummyjson-api-qa', 'urban-scooter-qa', 'qa-project-Urban-Routes-es',
  'qa-project-Urban-Grocers-app-es', 'Portafolio-QA',
];
for (const repo of projectUrls) {
  assert.ok(html.includes(`https://github.com/Johanna-80/${repo}`), `Falta enlazar ${repo}`);
}
assert.ok(html.includes('19/19'), 'Debe incluir resultado verificable de DummyJSON');
assert.ok(html.includes('/actions/runs/41006876260'), 'Debe enlazar la ejecución real');
assert.ok(html.includes('Cómo trabajo'), 'Debe explicar el proceso de QA');
assert.ok(html.includes('prefers-reduced-motion'), 'Debe respetar el movimiento reducido');
assert.ok(html.includes('class="skip-link"'), 'Debe facilitar saltar al contenido');
assert.ok(html.includes('.project-card[hidden]'), 'Los proyectos filtrados deben ocultarse');

const categories = cards.map(tag => tag[0].match(/data-category="([^"]+)"/)?.[1]);
assert.equal(categories.filter(x => x === 'api').length, 2);
assert.equal(categories.filter(x => x === 'manual').length, 3);
assert.equal(categories.filter(x => x === 'automation').length, 1);

const buttonMatches = [...html.matchAll(/<button\b[^>]*class="[^"]*project-filter[^"]*"[^>]*>/g)];
assert.deepEqual(buttonMatches.map(b => b[0].match(/data-filter="([^"]+)"/)?.[1]), ['all', 'manual', 'api', 'automation']);
for (const match of html.matchAll(/src="(assets\/img\/[^"]+)"/g)) {
  assert.ok(existsSync(join(root, match[1])), `No existe la imagen ${match[1]}`);
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, 'No se deben repetir los identificadores HTML');
for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  assert.match(match[0], /rel="[^"]*noopener/, 'Enlace externo debe incluir noopener');
}

// Comportamiento real del script ejecutado en un DOM mínimo, sin dependencias.
class FakeClassList {
  values = new Set();
  add(value) { this.values.add(value); }
  remove(value) { this.values.delete(value); }
  toggle(value, forced) {
    const active = forced ?? !this.values.has(value);
    if (active) this.values.add(value); else this.values.delete(value);
    return active;
  }
  contains(value) { return this.values.has(value); }
}
class FakeElement {
  constructor(dataset = {}) { this.dataset = dataset; this.classList = new FakeClassList(); this.handlers = {}; this.attributes = {}; this.hidden = false; this.textContent = ''; }
  addEventListener(name, handler) { this.handlers[name] = handler; }
  click() { this.handlers.click?.(); }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  getAttribute(name) { return this.attributes[name]; }
  querySelectorAll() { return []; }
}
const filterButtons = ['all', 'manual', 'api', 'automation'].map(category => new FakeElement({ filter: category }));
const projectCards = categories.map(category => new FakeElement({ category }));
const menuToggle = new FakeElement();
const navLinks = new FakeElement();
const navItem = new FakeElement();
navLinks.querySelectorAll = () => [navItem];
const projectCount = new FakeElement();
const windowListeners = {};
const script = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].at(-1)?.[1];
assert.ok(script, 'Debe haber JavaScript integrado');
vm.runInNewContext(script, {
  window: { addEventListener(name, handler) { windowListeners[name] = handler; } },
  document: {
    getElementById(id) { return ({ menuToggle, navLinks, projectCount })[id] ?? null; },
    querySelectorAll(selector) {
      if (selector === '.project-filter') return filterButtons;
      if (selector === '.project-card') return projectCards;
      if (selector === '.fade-up') return [];
      return [];
    },
  },
  IntersectionObserver: class { observe() {} unobserve() {} },
  setTimeout(callback) { callback(); },
}, { filename: 'portfolio-inline.js' });

filterButtons[2].click();
assert.equal(projectCards.filter(c => !c.hidden).length, 2, 'Filtro API debe mostrar dos proyectos');
assert.equal(filterButtons[2].getAttribute('aria-pressed'), 'true');
assert.match(projectCount.textContent, /2/);
filterButtons[1].click();
assert.equal(projectCards.filter(c => !c.hidden).length, 3, 'Filtro manual debe mostrar tres proyectos');
filterButtons[0].click();
assert.equal(projectCards.filter(c => !c.hidden).length, 6, 'Todos debe restituir los proyectos');
menuToggle.click();
assert.equal(menuToggle.getAttribute('aria-expanded'), 'true');
navItem.click();
assert.equal(menuToggle.getAttribute('aria-expanded'), 'false');

console.log('✓ Estructura, seis proyectos, enlaces, accesibilidad y filtros verificados');
