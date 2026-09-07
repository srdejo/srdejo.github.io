# CLAUDE.md

Reglas de trabajo para este repo (`srdejo.github.io`, portafolio personal de Daniel Jiménez, servido por GitHub Pages). Léelo antes de tocar nada.

## Qué es este repo

**Este repo es un artefacto de build, no se edita a mano.** Su código fuente real vive en otro repo: `srdejo-web/projects/portfolio/` (proyecto Angular `portfolio` dentro del workspace `srdejo-web`). Lo que ves acá es el resultado de `ng build portfolio --configuration production` copiado por `srdejo-web/scripts/publish-portfolio.mjs`.

Cualquier cambio de contenido, estilo o funcionalidad va en `srdejo-web/projects/portfolio/`, nunca directo en los archivos de este repo — se pierde en la próxima publicación.

Para más detalle ver, en este orden:
1. `docs/ARCHITECTURE.md` — cómo se genera y publica este repo.
2. `docs/DECISIONS.md` — por qué el portfolio se migró a Angular y se separó así.
3. `docs/ROADMAP.md` — qué falta.
4. `docs/PROGRESS.md` — estado actual.

## Excepción: emergencia en producción

Si hay que arreglar algo urgente y no hay acceso al repo `srdejo-web` a mano, se puede editar directo acá y hacer commit/push — pero hay que replicar el cambio en `srdejo-web/projects/portfolio/` apenas sea posible, o la próxima publicación lo revierte.

## Proceso de trabajo normal

1. Editar en `srdejo-web/projects/portfolio/`.
2. `npm run build:portfolio` (desde `srdejo-web/`).
3. `npm run publish:portfolio` — copia el build hacia esta carpeta.
4. Revisar `git status`/`git diff` acá, confirmar que el diff tiene sentido.
5. Commit + push desde este repo, con confirmación explícita del usuario.
