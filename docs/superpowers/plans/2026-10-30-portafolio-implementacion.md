# Portafolio QA — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar HTML mejorado, validado y listo para GitHub Pages.

**Architecture:** Una página estática con CSS y JavaScript incrustados, imágenes locales y verificación Node de contenido e interacciones. No hay servidor ni dependencias de ejecución.

**Tech Stack:** HTML5, CSS3, JavaScript ES2020, Node.js (verificación), GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-30-portafolio-diseno.md`.

## Global Constraints
- Mantener paleta morada y nombre Johanna Vásquez.
- Seis proyectos y cinco repositorios QA públicos verificados; no inventar resultados.
- Entregar archivos locales; no publicar ni modificar GitHub remoto.
- Mantener el contenido accesible sin JavaScript.

## Review Focus
- Filtrar API y volver a «Todos» debe preservar enlaces y estado accesible.
- El menú móvil debe actualizar aria-expanded y cerrar tras navegar.
- Las métricas deben ser históricas, no parecer un indicador en vivo.
- Carga sin JS o con movimiento reducido no debe ocultar contenido.
- Los enlaces deben apuntar a recursos existentes y las imágenes locales deben encontrarse.

### Task 1: Pruebas de aceptación

**Files:**
- Create: `checks/portfolio.test.mjs`

**Interfaces:**
- Consumes: `index.html`, `assets/img/`.
- Produces: verificaciones `node checks/portfolio.test.mjs` para estructura, vínculos, JS y filtros.

- [x] Escribir prueba de seis proyectos, repositorios, métricas, enlaces e imágenes.
- [x] Ejecutarla y comprobar el fallo esperado del estado anterior (`5 !== 6`).

### Task 2: Diseño y contenidos

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: diseño aprobado, estructura existente y criterios del test.
- Produces: navegación, hero, panel de evidencia, filtros y tarjetas con `data-category`.

- [x] Desarrollar HTML/CSS y enlace específico a la ejecución de DummyJSON.
- [x] Ejecutar las comprobaciones estáticas y validar los recursos y las reglas responsive.

### Task 3: Interacciones y entrega

**Files:**
- Modify: `index.html`, `README.md`

**Interfaces:**
- Consumes: selectores de `checks/portfolio.test.mjs`.
- Produces: filtrado accesible y guía para publicar.

- [x] Añadir JS de filtros, navegación y efectos progresivos.
- [x] Ejecutar comprobaciones Node y verificar sintaxis.
- [x] Preparar ZIP y verificar integridad antes de entregar.

## Estado
En el workspace de ChatGPT no hay repositorio Git local para realizar commits; los archivos se empaquetarán para que la autora haga un único commit revisado en GitHub Pages.

La comprobación visual en navegador real no pudo ejecutarse en el entorno de preparación por una restricción de acceso; queda como paso manual tras descomprimir o publicar el sitio. Esto no afecta a los resultados de las pruebas estáticas, pero impide afirmar que el renderizado final se verificó en Chrome u otros navegadores.
