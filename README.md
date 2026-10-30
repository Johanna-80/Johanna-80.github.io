# Portafolio QA Engineer Jr. — Johanna Vásquez

Sitio estático para presentar experiencia, metodología y evidencias públicas de QA.

**Sitio a actualizar:** https://johanna-80.github.io/  
**Repositorio de publicación:** https://github.com/Johanna-80/Johanna-80.github.io  
**Idioma:** español

## Contenido

- Presentación profesional, experiencia y formación.
- Panel de resultados de DummyJSON con enlace directo a su ejecución de GitHub Actions.
- Seis tarjetas de proyectos (cinco repositorios de QA), con evidencias y enlaces particulares.
- Filtros por pruebas manuales, API y automatización de interfaz.
- Flujo de trabajo QA: entender, diseñar, ejecutar, documentar y dar seguimiento.
- Menú adaptable, teclado, textos alternativos, animaciones discretas y compatibilidad con movimiento reducido.

## Tecnologías utilizadas en este portafolio

- **HTML5:** estructura semántica, navegación, etiquetas y estados accesibles.
- **CSS3:** Grid, Flexbox, variables, responsive y transiciones.
- **JavaScript:** filtros de proyectos, menú móvil y efectos progresivos.
- **Node.js:** comprobaciones automáticas de estructura e interacciones, sin paquetes externos.

La página **no requiere npm, framework ni servidor** para funcionar: abre `index.html` en el navegador o publícala en GitHub Pages.

## Estructura

```text
index.html                     # HTML + CSS + JS integrados
assets/img/
  johanna-profesional.png      # Nueva fotografía principal seleccionada
  johanna.jpg                  # Fotografía anterior conservada
  johanna-about.jpg            # Fotografía de presentación
  proyecto-regresion.jpg       # Captura de matriz
  proyecto-tecnicas.jpg        # Captura de diagrama
  proyecto-api.jpg             # Archivo anterior, conservado; no utilizado en la página
checks/portfolio.test.mjs     # Comprobación automatizada local
checks/check_markup.py       # Comprobación de etiquetas semánticas
docs/                         # Decisiones de diseño y plan de implementación
README.md
```

En el HTML se encuentran comentarios `📸` y `🖼️` cerca de las imágenes propias para facilitar su sustitución. Las tarjetas sin captura real usan una **representación técnica explícitamente señalada**.

## Comprobar antes de presentar

Con Node.js instalado, abre una terminal en la carpeta del proyecto:

```bash
node checks/portfolio.test.mjs
python3 checks/check_markup.py
```

La prueba verifica las seis tarjetas, destinos de GitHub, elementos accesibles, las rutas locales y el comportamiento de filtros y menú. No sustituye una prueba visual con navegador real.

## Publicación en GitHub Pages

1. Abre el repositorio `Johanna-80/Johanna-80.github.io` en GitHub.
2. Descarga una copia de respaldo del contenido anterior si deseas conservar esa versión.
3. Sustituye `index.html`, actualiza `assets/img/` y añade `checks/`, `docs/` y este `README.md`.
4. Crea un commit, por ejemplo: `feat: renovar portafolio QA con evidencias y filtros`.
5. Espera el despliegue de GitHub Pages y visita https://johanna-80.github.io/.
6. Comprueba filtros, contacto, navegación móvil, fotografías y todos los enlaces externos desde el sitio publicado.

No se ha realizado ninguna publicación remota desde este entregable.

## Evidencias y límites

- Los resultados **19/19** de DummyJSON corresponden a la ejecución documentada del **30/10/2026**, no a una consulta automática en tiempo real. [Consultar ejecución](https://github.com/Johanna-80/dummyjson-api-qa/actions/runs/41006876260).
- La colección Postman tiene 19 solicitudes con aserciones; su ejecución desde la aplicación Postman no está certificada en este portafolio.
- DummyJSON simula altas, cambios y eliminaciones; no se promete persistencia.
- Urban Scooter contiene 88 resultados con estado registrado en cuatro áreas (39 aprobados y 49 no aprobados); no deben interpretarse como defectos únicos.
- Algunas pruebas académicas requieren un entorno temporal no disponible públicamente. En esos casos la evidencia es el código o la documentación, no una demostración operativa en línea.

## Repositorios enlazados

1. [DummyJSON API QA](https://github.com/Johanna-80/dummyjson-api-qa)
2. [Urban Scooter QA](https://github.com/Johanna-80/urban-scooter-qa)
3. [Automatización UI Urban Routes](https://github.com/Johanna-80/qa-project-Urban-Routes-es)
4. [Urban Grocers API](https://github.com/Johanna-80/qa-project-Urban-Grocers-app-es)
5. [Portafolio QA — documentación manual](https://github.com/Johanna-80/Portafolio-QA)

**Autora:** Johanna Vásquez · Quito, Ecuador.
