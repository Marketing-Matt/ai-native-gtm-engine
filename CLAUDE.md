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

## `CONTEXT.md` maintenance — mandatory on every commit

`CONTEXT.md` is the single source of truth for this project.
Claude Code owns it. Update it on every commit — not at the end of the session.
Never let `CONTEXT.md` fall behind the actual repo state.

### What to update and when

**After every commit:**
- Set `last_commit` to the commit message just made
- Set `last_updated` to today's date

**When a backlog item is completed:**
- Change `⬜ Open` to `✅ Done` on that row
- Do this in the same commit that completes the work — not after
- Never leave a completed item marked Open

**When a backlog item is blocked:**
- Change to `🔴 Blocked` and add the ISS ref that caused it
- Create the corresponding ISS entry in Issues + Experiments table

**When a new skill is committed to `skills/`:**
- Add a row to the Skills library table
- Set status to `✅ Live`
- Update `skills_committed` count in Current state block
- Update `skills/manifest.json` in the same commit
- Add a note if the skill should be uploaded to Claude Settings → Customize → Skills

**When a new ADR is opened:**
- Add a row to the Open decisions table
- Assign the next ADR number in sequence

**When an ADR is resolved:**
- Change status to `✅ Resolved` and note the decision in one line

**When an ADR is reopened:**
- Change status to `🔴 Reopened`
- Add the ISS ref that caused the reopen in the final column
- Do not delete the previous resolution — history must be preserved

**When a parking lot item is activated:**
- Move it from Parking lot to Prioritised backlog
- Add at the correct dependency position
- Remove from Parking lot table

---

### Backlog status rules

Five states only — no others:

| Symbol | Meaning |
|---|---|
| ⬜ Open | Not started |
| 🔄 In progress | Started this session, not yet committed |
| ✅ Done | Committed to main |
| 🔴 Blocked | Cannot proceed — broken dependency, bug, or rework required |
| 🧪 Experiment | Deliberately paused — A/B test or outcome pending |

Mark an item 🔄 In progress when you begin work on it.
Mark it ✅ Done in the same commit that completes it.
Never mark Done before the commit exists.
When blocking an item — always create an ISS entry first.

---

### Dependency enforcement — mandatory before starting any backlog item

Before beginning any backlog item, Claude Code must:

1. Read the current backlog in `CONTEXT.md`
2. Find the lowest-numbered ⬜ Open item
3. Verify its dependency is met (check the Dependency column)
4. Confirm the dependency file or commit actually exists in the repo
5. Only then begin work — on that item, not any other

If the dependency is not met, stop and report why.
If a higher-numbered item is attempted before lower ones are complete,
that is a critical error. Stop, report it, and correct the backlog.

Never begin a task because it seems ready or interesting.
Always begin the lowest-numbered Open item whose dependency is confirmed.

This rule applies to backlog items only. Issues (ISS / ENH / EXP / RWK / FEA)
are a separate workstream — they may be addressed when raised by the user
without going through the backlog sequence.

---

### Issues, experiments and rework

When a bug, enhancement, experiment, or rework is identified:

1. Add a row to the Issues, experiments + rework table in `CONTEXT.md`
2. Assign the next ref in sequence per type:
   - ISS-001 — bug or breakage
   - ENH-001 — enhancement to existing skill or workflow
   - EXP-001 — deliberate experiment or A/B test
   - RWK-001 — rework triggered by changed decision or new information
   - FEA-001 — feature request (new capability not yet scoped)
3. If it blocks a backlog item — mark that item 🔴 Blocked and add the ISS ref
4. If it reopens an ADR — update the ADR status to 🔴 Reopened and add the ISS ref
5. When resolved — mark ✅ Resolved with a one-line outcome note
   and unblock any dependent backlog items

Experiment lifecycle:
  🧪 Running → ✅ Concluded [winner noted] or ❌ Inconclusive [next step noted]

---

### `CONTEXT.md` update commit convention

When the only change in a commit is a `CONTEXT.md` status update:

```
update CONTEXT.md — [item completed or state change]
```

When `CONTEXT.md` is updated alongside real work, fold it into
the same commit — do not create a separate commit just for `CONTEXT.md`.

---

## Claude Skills sync — manual step after meta-skill commits

Skills committed to the repo are gtmstack skills — they live in GitHub
and render on the site. They are not automatically available in Claude.

When a meta-skill is committed and validated after its first real run,
manually upload the .md file to Claude Settings → Customize → Skills.
This makes Claude follow the skill structure in project chat sessions
without prompting.

Priority skills to sync to Claude Settings:
- `content/write-build-log.md`          ← sync after Build Log 001 is run
- `content/extract-linkedin-posts.md`   ← sync after first LinkedIn run
- `content/write-beehiiv-issue.md`      ← sync after Issue 001 is drafted

Claude Code adds a note to `CONTEXT.md` when a skill is ready to sync.
Format: `⚡ Ready to sync to Claude Settings — [skill filename]`

---

## Session handoff — print at end of every session

After the final commit of a session, print this block to the terminal.

```
>_ gtmstack — SESSION HANDOFF
────────────────────────────────────────
Commits this session:
  - [list each commit message with short hash]

Backlog changes:
  - [list items marked Done, Blocked, or moved to Experiment]
  - [list any new items added]

Issues + experiments:
  - [list any new ISS / ENH / EXP / RWK / FEA entries opened]
  - [list any resolved this session]

CONTEXT.md: updated
skills/manifest.json: [updated | no changes]
Claude Settings sync needed: [skill filename | none]

Next priority (from backlog):
  #[N] — [next Open item and its dependency status]
────────────────────────────────────────
PASTE INTO GTMSTACK PROJECT CHAT:

[paste full contents of CONTEXT.md here]
────────────────────────────────────────
```

---

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*
