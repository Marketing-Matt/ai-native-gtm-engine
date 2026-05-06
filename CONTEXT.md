# CONTEXT.md — gtmstack.ai

> Maintained by Claude Code. Updated on every commit.  
> Paste this file into the gtmstack Claude Project chat at the start of every planning session to restore full context instantly.

-----

## Current state

```
last_updated:     2026-05-06
last_commit:      reconcile CONTEXT.md with actual repo state
build_phase:      v0.4
site_status:      live at gtmstack.ai (Next.js 15 + Vercel)
newsletter:       active via newsletter.gtmstack.ai (Beehiiv)
skills_committed: 0 marketing skills (template + 1 meta-skill committed)
```

-----

## What is live

- Site deployed on Vercel at `gtmstack.ai` (Next.js 15 + React 19 + TypeScript)
- Beehiiv newsletter at `newsletter.gtmstack.ai`
- Email sending from `matt.browning@gtmstack.ai` via Gmail + Namecheap
- GitHub repo: `github.com/Marketing-Matt/gtmstack` (public)
- Brand system committed: `brand/tokens.json` + `brand/style-guide.md` + `brand/voice.md`
- Engine architecture committed: `engine/architecture/`
- Skill template committed: `skills/_template.md`
- Build log tracker committed: `content/build-log/tracker.md`
- Skills manifest: `skills/manifest.json` (committed — empty index, v1.0.0)
- First meta-skill committed: `content/write-build-log.md` v1.0

-----

## Repo structure

```
gtmstack/
├── CLAUDE.md              ← instructions for Claude Code
├── CONTEXT.md             ← this file — update on every commit
├── README.md
├── holding-page.tsx       ← Vercel site entry point
├── .gitignore
├── .vercelignore
├── agents/
├── brand/
│   ├── tokens.json
│   ├── style-guide.md
│   └── voice.md
├── commercial/            ← gitignored (local only) — files removed from public index in commit ede1732
├── content/
│   ├── build-log/
│   │   ├── tracker.md
│   │   └── 000-planning-session-may-2026.md
│   ├── write-build-log.md  ← first meta-skill (v1.0)
│   └── lead-magnets/      ← create when first lead magnet is ready
├── data/
├── engine/
│   └── architecture/
├── site/
└── skills/
    ├── manifest.json
    └── _template.md
```

-----

## Brand quick reference

```
Primary colour:   #A6FF00 (lime)
Background:       #0A0A0A (near black)
Font (display):   IBM Plex Mono
Font (body):      Inter
Voice:            Direct. No filler. Built-in-public.
Strapline:        Unfiltered AI marketing. Built live.
Logo mark:        >_
```

-----

## Active stack

|Tool                            |Role                       |Status                      |
|--------------------------------|---------------------------|----------------------------|
|Claude                          |Primary AI                 |Active                      |
|GitHub (Marketing-Matt/gtmstack)|Source of truth            |Active                      |
|Vercel                          |Site hosting               |Active                      |
|Beehiiv                         |Newsletter                 |Active                      |
|ElevenLabs                      |Audio narration            |In stack — not yet connected|
|Airtable                        |CRM + audience data        |v0 — schema redesign needed |
|Claude Code                     |Repo commits + handoff loop|Active                      |
|Claude Cowork                   |Content workflow automation|Beta — content ops only     |
|Namecheap                       |DNS                        |Active                      |

-----

## Prioritised backlog

Work through these in order. Do not skip ahead.

|# |Job                                                                              |Dependency                |Status|
|--|---------------------------------------------------------------------------------|--------------------------|------|
|1 |Fix CLAUDE.md repo structure reference + verify .gitignore covers commercial/    |None                      |✅ Done|
|2 |Build meta-skill: content/write-build-log.md                                     |CLAUDE.md fixed           |✅ Done|
|3 |Build meta-skill: content/extract-linkedin-posts.md                              |write-build-log committed |⬜ Open|
|4 |Build meta-skill: content/write-beehiiv-issue.md                                 |extract-linkedin committed|⬜ Open|
|5 |Build meta-skill: content/publish-skill-to-site.md                               |write-beehiiv committed   |⬜ Open|
|6 |Resolve GitHub → Vercel publish pipeline (GitHub Action or document manual steps)|publish-skill skill built |⬜ Open|
|7 |Build Skill 001 — Audience Segmentation                                          |Pipeline resolved         |⬜ Open|
|8 |Publish Beehiiv newsletter Issue 001                                             |Skill 001 built           |⬜ Open|
|9 |Connect ElevenLabs to skill cards                                                |2–3 skills live           |⬜ Open|
|10|Publish “First 5 Skills” lead magnet                                             |5 skills committed        |⬜ Open|

-----

## Immediate fixes (not backlog — action in next session)

- [x] Beehiiv: turn off “Approval required” — DONE
- [ ] Site page title: change to “gtmstack.ai — Unfiltered AI marketing. Built live.”
- [ ] Meta description: update from Beehiiv CDN default to brand voice
- [x] commercial/: confirmed in .gitignore + files removed from public index (ede1732)
- [ ] Skill numbering convention: establish before library grows (recommendation: DG-001, PMM-001 function prefix)

-----

## Meta-skills to build (content engine layer)

These power the content workflow. Build before any marketing skills.

|Skill                               |Purpose                                         |Priority  |
|------------------------------------|------------------------------------------------|----------|
|content/write-build-log.md          |Structured build log from session notes         |P1 — ✅ committed v1.0|
|content/extract-linkedin-posts.md   |3–5 LinkedIn posts from any build log           |P1        |
|content/write-beehiiv-issue.md      |Newsletter draft from skill card + build log    |P1        |
|content/publish-skill-to-site.md    |GitHub commit → Vercel → live skill card        |P1        |
|content/codify-insight-to-skill.md  |Insight → new skill card draft                  |P2        |
|content/narrate-skill-elevenlabs.md |ElevenLabs script from skill card               |P2        |
|content/write-reddit-post.md        |Community post from build                       |P3        |
|content/generate-lead-magnet.md     |PDF/resource from skill cluster                 |P3        |
|content/write-claude-journal-post.md|Thought leadership from build log pains/insights|P2        |

-----

## Parking lot

Do not action until trigger is met.

|Item                                   |Trigger                               |
|---------------------------------------|--------------------------------------|
|Skills Generator (interactive, on-site)|5+ skills publicly live               |
|Beta programme                         |Generator built + 10 skills in library|
|Airtable CRM schema                    |100+ Beehiiv subscribers              |
|Agents layer                           |5+ skills committed                   |
|LinkedIn content calendar (formal)     |First 3 skills distributed            |
|Reddit strategy                        |3 skills live                         |
|Commercialisation model decision       |100+ subscribers + 5 skills live      |
|Privacy Policy + ToS pages             |Before any paid tier                  |
|Figma design system                    |When homepage development resumes     |
|Showcase page                          |3 skills with measurable outputs      |
|Skills marketplace UX scope            |5 skills committed                    |

-----

## Open decisions (ADRs)

|#      |Decision                                                   |Status|Priority   |
|-------|-----------------------------------------------------------|------|-----------|
|ADR-001|Claude Cowork as workflow automation — scalability at v0.3+|🔴 Open|High       |
|ADR-002|ElevenLabs → Content Pipelines integration approach        |🔴 Open|Medium     |
|ADR-005|Airtable schema design — audience data model               |🔴 Open|High (v0.4)|
|ADR-006|Data governance tooling                                    |🔴 Open|Medium     |
|ADR-009|System map PNG regeneration (v0.5 brief exists)            |🔴 Open|Low        |

-----

## Issues, experiments + rework

Refs assigned per type: ISS-NNN (bug), ENH-NNN (enhancement), EXP-NNN (experiment), RWK-NNN (rework), FEA-NNN (feature request). See `CLAUDE.md` for the full rule.

| Ref | Type | Related to | Description | Status |
|---|---|---|---|---|

-----

## Skills library

|Skill               |Status|File|
|--------------------|------|----|
|[none committed yet]|—     |—   |

See `skills/manifest.json` for full index.

-----

## Next actions for Claude Code

- Begin Backlog #3: `content/extract-linkedin-posts.md` (dependency #2 ✅ met — ready to start)
- After first end-to-end run of `write-build-log.md` on Build Log 001: add `⚡ Ready to sync to Claude Settings — content/write-build-log.md`
- Fix site page title and meta description (immediate fixes still open)

-----

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*