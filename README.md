# Web Resume — Ssu-Yuan Lin (Blake)

Source for <https://blakelin-lsy.github.io/web-resume/>: a bilingual (English / 正體中文) static resume with project case pages, engineering notes, one-page CVs and an offline reading package.

## How it is built

Content lives in `content/*.json`; `scripts/` renders the homepage markup, case pages, engineering notes and the offline package from it, then Next.js (`app/`) exports a static site. Edit the JSON or the renderers, never the generated HTML in `app/public/`.

```bash
cd app
npm ci
npm run build      # validate assets, generate pages and package, next build -> app/out
npm run lint
npm run typecheck
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds `app/` and publishes `app/out` to GitHub Pages under the `/web-resume` base path.

