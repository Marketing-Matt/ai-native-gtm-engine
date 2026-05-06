# CLAUDE.md

> Loaded automatically by Claude Code at the start of every session in this repo.
> Keep this short. Signposts > duplication. The depth lives in the docs this file points to.

---

## What this is, in one breath

**gtmstack.ai** — a learning-in-public skills platform for B2B marketing leaders. Codifying 20+ years of B2B marketing experience into reusable Claude-powered skills, agents, and workflows. The repo *is* the product. Every skill is real, timed, graded, and committed.

The marketing depth lives in `skills/<function>/` (per the `_template.md` standard), `content/`, and `engine/strategy/`. **CLAUDE.md is operating context, not strategy.** Don't put marketing thesis in here — point at the canonical doc instead.

Full pitch: see [`README.md`](./README.md). Brand: [`brand/style-guide.md`](./brand/style-guide.md). Architecture: [`engine/architecture/`](./engine/architecture/).

---

## Repo layout — where work happens

| Directory | What's there |
|---|---|
| [`site/`](./site/) | gtmstack.ai (Next.js 15 + React 19 + TS, deployed to Vercel). The live website. |
| [`skills/`](./skills/) | The marketplace. Skills organised by marketing function. Format defined in `skills/_template.md`. |
| [`agents/`](./agents/) | Skills working together as end-to-end agents. |
| [`brand/`](./brand/) | Visual identity. `style-guide.md` (rules), `voice.md` (tone), `tokens.json` (machine-readable). |
| [`engine/`](./engine/) | GTM engine architecture, strategy, workflows, experiments, ADRs. |
| [`content/`](./content/) | Frameworks, build log, about. |
| [`data/`](./data/) | Audience data model + signal definitions. |
| `commercial/` | Positioning + monetisation thinking. **Gitignored** — local only, not in the public repo. |

---

## Stack

- **Site:** Next.js 15 + React 19 + TypeScript, deployed to Vercel
- **Subscribe / newsletter:** Beehiiv (embed in the site)
- **CRM:** Airtable (synced from Beehiiv via n8n)
- **Voice/audio:** ElevenLabs
- **Design:** Claude Design (reads `brand/tokens.json` + repo on setup)
- **Distribution:** Canva (downstream of Claude Design)
- **DNS:** Namecheap → Vercel
- **Authoring:** Claude Code → GitHub → Vercel auto-deploy

The full system map lives in [`engine/architecture/`](./engine/architecture/).

---

## Deploy pipeline

```
Claude Code → git push origin main → GitHub → Vercel auto-deploy → gtmstack.ai
```

Any push to `main` deploys to production. Pushes to other branches get preview URLs.
**No build/test step before push** — Vercel runs `next build` on its own. If the build fails, Vercel tells you in the dashboard. Rollback is a one-click revert in Vercel.

Minor status updates (checkbox ticks, one-line fixes): 
edit GitHub directly.
Backlog state changes and multi-file updates: Claude Code.

---

## Public-repo discipline (important)

The repo is **public by intent** — build-in-public is the brand promise. That means I have to be deliberate about what gets committed.

**Never commit:**
- API keys, tokens, secrets, OAuth credentials, Vercel deploy hooks
- `.env`, `.env.local`, or any `.env*` file (already gitignored — keep it that way)
- Customer/subscriber data, email lists, PII of any kind
- Beehiiv/Airtable/n8n internal credentials
- Premium / unreleased skill content (use a private branch or keep it out of git)
- Internal customer references (logos, screenshots, names) without explicit permission

**Default to env vars:** anything that *could* be sensitive (analytics IDs, third-party endpoints, admin URLs) goes in Vercel **Project Settings → Environment Variables**, referenced via `process.env.X`. Don't hard-code.

**Before committing changes that touch the public surface** (site, README, public docs, anything outside `engine/strategy/` and similar), pause and ask: "Is this safe to be public, today?" If unsure, flag it.

**Git history is forever.** Removing a file in a later commit doesn't erase it from history. Anything sensitive that gets committed needs to be **revoked at the source** (rotate the key) — file deletion alone is not a fix.

---

## Brand discipline

Read [`brand/style-guide.md`](./brand/style-guide.md) before any visual change. Non-negotiables:

- **Lime `#A6FF00` is the only accent.** Never introduce a second.
- **The cursor blinks.** The `_` in the `>_` brand mark animates 1Hz, steps (hard snap, not fade). Mandatory on nav + footer brand marks. See `style-guide.md` → "The feedback cursor".
- **Two typefaces only:** IBM Plex Mono (brand) + Inter (reading). Nothing else.
- **Markdown-native visual language.** `#`, `>`, `_`, code blocks. The visual system mimics markdown syntax — preserve it.
- **Sharp corners.** No border-radius except 6px on terminal chrome.
- **Dark-first.** Light-mode is not in the brand system today.
- **No blue, no purple, no gradients, no rounded-everything, no stock illustrations.**

When in doubt, the token file ([`brand/tokens.json`](./brand/tokens.json)) wins.

---

## Code conventions

- **Commits:** short imperative, no conventional-commits prefix (matches existing log style). Co-author trailer (`Co-Authored-By: Claude Opus 4.7 ...`) when I commit.
- **No new dependencies without flagging.** Keep the deploy lean. Each new package is a future security/maintenance liability.
- **Watch peer-dep alignment.** We've been bitten by `next` + `react` peer mismatches. Verify after any version change.
- **Site changes are public the moment they hit `main`.** No staging environment. If a change is risky, push it to a feature branch and use the Vercel preview URL.
- **Don't edit at the repo root for site work.** The deployed site lives in [`site/`](./site/), not at the repo root.

---

## Known stale items / open work

- `engine/architecture/gtmstack-system-map-v0.4.png` — labels the website tile "Framer". The notes file is current; the PNG needs regeneration to v0.5. Brief: [`engine/architecture/v0.5-regen-brief.md`](./engine/architecture/v0.5-regen-brief.md). Tracked as ADR-009.
- The Vercel project is named `gtmstack`. Custom domain: `gtmstack.ai` (apex) + `www.gtmstack.ai` (308 redirect to apex).

---

## How to be useful here

1. **Read the README and the relevant section of `brand/style-guide.md`** before making non-trivial changes.
2. **Default to deliberate.** "Built in public" doesn't mean "ship anything fast" — it means "ship real things and document them honestly." A messy commit harms the brand.
3. **Match existing voice.** Read `brand/voice.md`. The tone is direct, technical, unfiltered, never corporate-polished.
4. **Flag, don't assume.** If a change might expose something, change a brand rule, or add a new dependency, surface it before doing it.
5. **Codify when relevant.** A reusable insight or workflow that emerges from the work belongs in `skills/<function>/` per the template. Don't let it live only in chat.

---

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*
