# DECISIONS.md

Decisiones tomadas sobre este repo específicamente (no sobre el contenido del portfolio — esas están en `srdejo-web/docs/DECISIONS.md`).

## Repo anidado con `.git` propio, no movido a `srdejo-web` ni convertido en submodule

**Decisión:** este repo se relocalizó físicamente dentro de `srdejo-web/` (antes vivía como sibling en `srdejo/`), pero conserva su propio `.git` y remote — `srdejo-web` lo ignora vía `.gitignore`.

**Por qué:** GitHub Pages exige que el contenido esté en `srdejo/srdejo.github.io`, por convención de nombre de repo. No se fusionó con `srdejo-web` porque son historiales git independientes y GitHub Pages no sabe servir un subdirectorio de otro repo bajo ese dominio sin configuración adicional. No se usó submodule porque nunca hace falta versionar "qué commit de este repo referencia srdejo-web" — solo se genera y publica, sin necesidad de ese nivel de trazabilidad.

## `CLAUDE.md`/`docs/` preservados por el script de publicación

**Decisión:** `scripts/publish-portfolio.mjs` (en `srdejo-web`) excluye `CLAUDE.md` y `docs/` de la limpieza que hace antes de copiar el build nuevo.

**Por qué:** sin esa excepción, cada publicación borraría esta misma documentación. Quedan expuestos públicamente vía GitHub Pages (ej. `srdejo.github.io/docs/ARCHITECTURE.md`), lo cual es aceptable — no contienen secretos, y el resto de repos del workspace también tienen su `CLAUDE.md` en repos públicos.
