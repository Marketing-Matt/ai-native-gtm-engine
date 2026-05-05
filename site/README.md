# gtmstack.ai — site

The Next.js 15 app deployed to Vercel at [gtmstack.ai](https://gtmstack.ai).

100% code-deployed. Every change ships through `git push` → Vercel auto-deploy.

---

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Vercel** — hosting + CI/CD
- **Beehiiv** — subscribe form embed
- **next/font (Google)** — IBM Plex Mono + Inter, self-hosted

---

## Local development

```bash
cd site
npm install
npm run dev
```

Open http://localhost:3000.

---

## Deploying

Pushes to `main` deploy to production at gtmstack.ai.
Pushes to any other branch deploy to a preview URL automatically.

Vercel project root is set to `site/`.

---

## Structure

```
site/
├── app/
│   ├── layout.tsx       ← root layout, fonts, metadata, favicon
│   ├── page.tsx         ← renders HoldingPage
│   └── globals.css      ← reset + base styles
├── components/
│   └── holding-page.tsx ← the holding page component (client)
├── public/
│   └── favicon.svg      ← terminal-prompt mark, lime on black
├── package.json
├── tsconfig.json
└── next.config.mjs
```

---

## Why Next.js + Vercel (not Framer)

Decision logged in [`engine/decisions/`](../engine/decisions/) at the time of the migration.

Short version: the site is code-first, the holding page is a single self-contained
React component, and the only friction in the previous Framer setup was the manual
paste step on every change. Moving to Vercel makes the page deploy automatically
on every push, opens up branch previews for experiments, and keeps the entire
surface under version control alongside the rest of the repo.
