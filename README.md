# Mundos Virtuales — Sitio Web (Astro)

Proyecto base para la web de **Mundos Virtuales**, construido con **Astro** + Content Collections (Markdown) + un formulario simple con endpoint `/api/contact`.

## Requisitos
- Node.js 18+ (recomendado 20+)
- npm (incluido con Node)

## Instalación rápida

### Opción A: script (Linux/macOS/Git Bash en Windows)
```bash
bash scripts/install.sh
```

### Opción B: manual
```bash
npm install
npm run dev
```

Abrir: `http://localhost:4321`

## Estructura clave
- `src/pages/` rutas (Home, Áreas, Servicios, Proyectos, Contacto, etc.)
- `src/content/services/*.md` servicios (8)
- `src/content/projects/*.md` proyectos (3 de ejemplo)
- `src/pages/api/contact.ts` endpoint de contacto (honeypot + rate limit simple)

## Contenido (Content Collections)
- `src/content/config.ts` define schemas y valida frontmatter.
- Para agregar un **servicio**: crea un `.md` en `src/content/services/` con `area`, `slug`, `summary`, etc.
- Para agregar un **proyecto**: crea un `.md` en `src/content/projects/` con `slug`, `area`, `excerpt`, `coverImage`, `tags`, etc.

## Notas de producción
- El rate limit del endpoint es **en memoria** (OK en dev/server único). En serverless conviene moverlo a KV/Redis.
- Para combatir spam en producción puedes integrar **Cloudflare Turnstile** (front + verificación server-side).

## Subir a GitHub (rápido)
```bash
git init
git add .
git commit -m "Initial MV Astro site"
git branch -M main
git remote add origin <TU_REPO_GITHUB_URL>
git push -u origin main
```
