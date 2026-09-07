# ARCHITECTURE.md

Cómo se genera y publica este repo. No es el lugar para describir la arquitectura del sitio en sí — eso vive en `srdejo-web/docs/ARCHITECTURE.md`, junto al código fuente real.

## Origen del contenido

Todo el contenido de este repo (salvo `CLAUDE.md`/`docs/`) es la salida de `ng build portfolio --configuration production` en el workspace `srdejo-web`, copiada acá por `srdejo-web/scripts/publish-portfolio.mjs`. Ese script:

1. Borra todo el contenido actual de este repo, excepto `.git`, `.kiro`, `CLAUDE.md` y `docs/`.
2. Copia `srdejo-web/dist/portfolio/browser/` completo hacia acá.

No hay build step en este repo — GitHub Pages sirve los archivos tal cual están, como sitio estático.

## Rutas publicadas

- `/` — home del portfolio.
- `/preguntas-frecuentes` — FAQ técnica.
- `/steward-privacy` — política de privacidad de la app Steward.

Cada una prerenderizada como HTML estático (Angular `RenderMode.Prerender`), sin servidor Node en producción.

## Historial

Antes de 2026-08-24 este repo era HTML/CSS/JS escrito a mano, sin build. Se migró a ser el destino de publicación del proyecto Angular `portfolio`. Ver `srdejo-web/docs/DECISIONS.md` para el detalle de esa migración.
