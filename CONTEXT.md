# CONTEXT.md — gtmstack.ai

> Maintained by Claude Code. Updated on every commit.  
> Paste this file into the gtmstack Claude Project chat at the start of every planning session to restore full context instantly.

-----

## Current state

```
last_updated:     2026-05-07
last_commit:      update CONTEXT.md — correct backlog sequence, #3 is next not #5
build_phase:      v0.4
site_status:      live at gtmstack.ai (Next.js 15 + Vercel)
newsletter:       active via newsletter.gtmstack.ai (Beehiiv)
skills_committed: 0 marketing skills (template + 3 meta-skills committed: CON-001, CON-002, CON-003)
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
- First meta-skill committed: `content/write-build-log.md` v1.0 (CON-001)
- Second meta-skill committed: `content/extract-linkedin-posts.md` v1.0 (CON-002)
- Third meta-skill committed: `content/write-beehiiv-issue.md` v1.0 (CON-003)

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
│   ├── write-build-log.md       ← CON-001 — first meta-skill (v1.0)
│   ├── extract-linkedin-posts.md ← CON-002 — second meta-skill (v1.0)
│   ├── write-beehiiv-issue.md   ← CON-003 — third meta-skill (v1.0)
│   └── lead-magnets/            ← create when first lead magnet is ready
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

|# |Job                                                                              |Dependency                   |Status|
|--|---------------------------------------------------------------------------------|-----------------------------|------|
|1 |Fix CLAUDE.md repo structure reference + verify .gitignore covers commercial/    |None                         |✅ Done|
|2 |Build P1 meta-skill suite (CON-001 → CON-004)                                    |CLAUDE.md fixed              |🔄 In progress (3 of 4 — CON-004 still open)|
|3 |Resolve GitHub → Vercel publish pipeline (GitHub Action or document manual steps)|P1 meta-skill suite committed|⬜ Open|
|4 |Build Skill 001 — Audience Segmentation                                          |Pipeline resolved            |⬜ Open|
|5 |Publish Beehiiv newsletter Issue 001                                             |Skill 001 built              |⬜ Open|
|6 |Connect ElevenLabs to skill cards                                                |2–3 skills live              |⬜ Open|
|7 |Publish “First 5 Skills” lead magnet                                             |5 skills committed           |⬜ Open|

-----

## Immediate fixes (not backlog — action in next session)

- [x] Beehiiv: turn off “Approval required” — DONE
- [ ] Site page title: change to “gtmstack.ai — Unfiltered AI marketing. Built live.”
- [ ] Meta description: update from Beehiiv CDN default to brand voice
- [x] commercial/: confirmed in .gitignore + files removed from public index (ede1732)
- [x] Skill numbering convention: function prefix established — CON-NNN (content engine meta-skills) live; DG-NNN, PMM-NNN, ABM-NNN, etc. to follow as marketing skills land

-----

## Meta-skills to build (content engine layer)

These power the content workflow. Build before any marketing skills.

|ID    |Skill                               |Purpose                                         |Status               |
|------|------------------------------------|------------------------------------------------|---------------------|
|CON-001|content/write-build-log.md          |Structured build log from session notes         |P1 — ✅ committed v1.0|
|CON-002|content/extract-linkedin-posts.md   |3–5 LinkedIn posts from any build log           |P1 — ✅ committed v1.0|
|CON-003|content/write-beehiiv-issue.md      |Newsletter draft from skill card + build log    |P1 — ✅ committed v1.0|
|CON-004|content/publish-skill-to-site.md    |GitHub commit → Vercel → live skill card        |P1 — ⬜ Open          |
|CON-005|content/codify-insight-to-skill.md  |Insight → new skill card draft                  |P2 — ⬜ Open          |
|CON-006|content/narrate-skill-elevenlabs.md |ElevenLabs script from skill card               |P2 — ⬜ Open          |
|CON-007|content/write-reddit-post.md        |Community post from build                       |P3 — ⬜ Open          |
|CON-008|content/generate-lead-magnet.md     |PDF/resource from skill cluster                 |P3 — ⬜ Open          |
|CON-009|content/write-claude-journal-post.md|Thought leadership from build log pains/insights|P2 — ⬜ Open          |

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
| ISS-001 | Bug | Site / Vercel deploy | Site classified as "parked" by corporate SWG vendors (reported via Okta-gated network). Root causes: (1) Vercel Deployment Protection toggled on → 403 to all anon fetches; (2) no robots.txt / sitemap; (3) no OG image, JSON-LD, canonical URL; (4) "Launching soon" copy on holding page; (5) apex+www serve duplicate content; (6) fresh `.ai` domain with no inbound authority signals. Fixes shipped this session: (1) Vercel toggle off ✅, (2) robots.txt added ✅ (branch), (3) sitemap.ts added ✅ (branch), (4) OG image + JSON-LD + canonical added ✅ (branch), (5) holding-page copy rewritten present-tense ✅ (branch), (6) www → apex 308 redirect flipped ✅ (Vercel domain config, live). **Still pending:** merge `claude/planning-session-commit-VDGen` to `main` to deploy fixes (2)–(5) to production. **Decision:** vendor re-categorisation request dropped — rely on organic re-crawl after structural fixes; revisit only if still blocked at 4–6 weeks. | 🔄 In progress |
| ENH-001 | Enhancement | Site / OG image | Initial OG image (`site/app/opengraph-image.tsx`) renders functional but visually underwhelming — flagged "ok, not great" on first inspection. Currently: black bg + lime brand mark + white headline + grey subline, all in IBM Plex Mono. Likely needs: (a) more visual texture (terminal chrome with 6px corners per brand?); (b) better hierarchy / proportion; (c) a markdown-native motif (`#`, `>`, code-block accents). Out of scope for ISS-001 — does not affect SWG classification, only social share preview crispness. Pick up when brand-design time is available. | ⬜ Open |

-----

## Skills library

|Skill               |Status|File|
|--------------------|------|----|
|[none committed yet]|—     |—   |

See `skills/manifest.json` for full index.

-----

## Next actions for Claude Code

- ISS-001 final step: verify preview deploy of `claude/planning-session-commit-VDGen` renders correctly (terminal copy, /robots.txt, /sitemap.xml, /opengraph-image, view-source for JSON-LD + canonical), then merge branch to `main`. Once production deploy lands, mark ISS-001 ✅ Resolved
- Complete Backlog #2 by building CON-004 (`content/publish-skill-to-site.md`) — last of the P1 meta-skill suite. Once committed, #2 flips to ✅ Done and Backlog #3 (Resolve pipeline) unlocks.
- After first end-to-end run of `write-build-log.md` on Build Log 001: add `⚡ Ready to sync to Claude Settings — content/write-build-log.md`
- After first end-to-end run of `extract-linkedin-posts.md`: add `⚡ Ready to sync to Claude Settings — content/extract-linkedin-posts.md`
- After first end-to-end run of `write-beehiiv-issue.md` (Issue 001): add `⚡ Ready to sync to Claude Settings — content/write-beehiiv-issue.md`
- Fix site page title and meta description (partly addressed by metadata work in 36f92b9 — verify on preview)

-----

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*