# Build Log 000 — Content Workflow Planning Session

**Date:** May 2026  
**Session type:** Planning — not a skill build  
**Total time:** Multi-turn Claude Projects session  
**Output:** Content workflow system, prioritised backlog, parking lot, GitHub additions map

-----

## What this session was

The first structured planning session for the gtmstack.ai content engine. No marketing skill was built — this session designed the system that will build, document, and distribute every skill going forward.

Topics covered across the full project chat history:

- Content workflow architecture (build session → 7 artefacts)
- GitHub additions and corrections required
- Skills needed to run the content engine itself (meta-skills)
- Extended build log template (pains, insights, tools)
- Prioritised JTBD backlog with reasoning
- Parking lot — valid items saved with activation triggers
- Research threads requiring dedicated investigation
- Claude Cowork use cases
- 90-day content calendar
- Items flagged from chat that are easy to overlook

-----

## What the content engine produces

Every build session generates one skill card and six derivative content artefacts:

|Artefact                |Tool                    |Cadence       |Skill required                     |
|------------------------|------------------------|--------------|-----------------------------------|
|skill-card.md           |Claude Projects → GitHub|Per session   |(is the skill)                     |
|Build log entry         |Claude Projects → GitHub|Per skill     |content/write-build-log.md         |
|Beehiiv newsletter issue|Claude → Beehiiv MCP    |Bi-weekly     |content/write-beehiiv-issue.md     |
|ElevenLabs audio        |Claude → ElevenLabs API |Per skill     |content/narrate-skill-elevenlabs.md|
|LinkedIn posts (3–5)    |Claude → manual schedule|Per skill     |content/extract-linkedin-posts.md  |
|Site skill card (live)  |Vercel deploy           |Auto on commit|content/publish-skill-to-site.md   |
|Reddit post             |Claude → manual post    |Per skill     |content/write-reddit-post.md       |

-----

## GitHub additions identified

### Structural files

|File                                              |Action           |Why                                                                     |
|--------------------------------------------------|-----------------|------------------------------------------------------------------------|
|CONTEXT.md (root)                                 |Create + commit  |Living state doc for Claude Projects handoff                            |
|CLAUDE.md (root)                                  |Update existing  |Repo structure reference maps old Framer/n8n stack — must reflect Vercel|
|skills/manifest.json                              |Create if missing|Index of all skills — maintained by Claude Code                         |
|.github/workflows/                                |Create directory |Home for GitHub Actions (publish pipeline)                              |
|content/build-log/000-planning-session-may-2026.md|This file        |First build log entry                                                   |

### Meta-skills to build and commit (in order)

|Skill file                         |Purpose                                      |Priority  |
|-----------------------------------|---------------------------------------------|----------|
|content/write-build-log.md         |Structured build log from session notes      |P1 — first|
|content/extract-linkedin-posts.md  |3–5 LinkedIn posts from any build log        |P1        |
|content/write-beehiiv-issue.md     |Newsletter draft from skill card + build log |P1        |
|content/publish-skill-to-site.md   |GitHub commit → Vercel → live skill card     |P1        |
|content/codify-insight-to-skill.md |Insight from build log → new skill card draft|P2        |
|content/narrate-skill-elevenlabs.md|ElevenLabs script from skill card            |P2        |
|content/write-reddit-post.md       |Community post from build                    |P3        |
|content/generate-lead-magnet.md    |PDF/resource from skill cluster              |P3        |

-----

## Extended build log template

Every build log from session 001 onwards uses this template:

```markdown
# Build Log: [Skill name] — [date]
**Session:** [number]
**Total time:** [first prompt → commit]

## What I was trying to build
## Tools used
| Tool | How used | Notes |
## First prompt (verbatim)
## What didn't work + why
## Final prompt that worked (verbatim)
## Output quality grade [/10]
## Time breakdown
- Scoping: Xm | Prompting: Xm | Iteration: Xm | Validation: Xm | Docs: Xm | Total: Xm
## Pains + friction
## Surprises + unexpected wins
## Insights worth codifying
## What I'd do differently
## Enhancements flagged for v2
## Future skill ideas triggered
## Honest rating: Was it worth it?
```

-----

## Prioritised backlog

|#|Job to be done                                                                    |Dependency          |Status|
|-|----------------------------------------------------------------------------------|--------------------|------|
|1|Fix CLAUDE.md + commit CONTEXT.md                                                 |None — do first     |⬜ Open|
|2|Build 3 meta-skills (write-build-log, extract-linkedin-posts, write-beehiiv-issue)|CONTEXT.md committed|⬜ Open|
|3|Resolve publish-to-site pipeline (GitHub Action + Vercel webhook)                 |Meta-skills built   |⬜ Open|
|4|Build Skill 001 — Audience Segmentation                                           |Pipeline resolved   |⬜ Open|
|5|Publish Beehiiv newsletter Issue 001                                              |Skill 001 built     |⬜ Open|
|6|Connect ElevenLabs to skill cards                                                 |2–3 skills live     |⬜ Open|
|7|Publish “First 5 Skills” lead magnet                                              |5 skills committed  |⬜ Open|

-----

## Parking lot

Items saved with activation triggers — do not pull forward until trigger is met.

|Item                                   |Trigger                                         |
|---------------------------------------|------------------------------------------------|
|Skills Generator (interactive, on-site)|5+ skills publicly live                         |
|Beta programme for generator           |Generator prototype built + 10 skills in library|
|Airtable CRM schema                    |100+ Beehiiv subscribers                        |
|Agents layer                           |5+ skills committed                             |
|LinkedIn content calendar (formal)     |After first 3 skills distributed                |
|Reddit strategy                        |After 3 skills live                             |
|Commercialisation model decision       |100+ subscribers + 5 skills live                |
|Privacy Policy + Terms of Service pages|Before any paid tier                            |
|Figma design system                    |When homepage development resumes               |
|Showcase page                          |After 3 skills with measurable outputs          |
|Skills marketplace UX scope            |After 5 skills committed                        |

-----

## Research threads

Requiring dedicated investigation — not ready to action yet.

|Ref|Thread                           |Notes                                                                     |
|---|---------------------------------|--------------------------------------------------------------------------|
|R1 |GitHub → Vercel publish pipeline |How does a committed .md become a live skill card? Technical spike needed.|
|R2 |ElevenLabs API integration       |Full audio pipeline from skill card to site embed to newsletter embed.    |
|R3 |Beehiiv × Claude MCP capabilities|What can Claude actually do via the Beehiiv connector? Map the gap.       |
|R4 |Skills generator architecture    |Technical scope before any design work begins.                            |
|R5 |Content performance measurement  |Define success metrics per channel before first distribution.             |
|R6 |Audience definition + ICP        |Precisely define who gtmstack.ai speaks to before content scales.         |

-----

## Claude Cowork opportunities

|Workflow                     |Trigger                |Replaces               |
|-----------------------------|-----------------------|-----------------------|
|Build log → LinkedIn pipeline|New build log committed|Manual copy-paste      |
|Build log → Newsletter draft |Build log committed    |Manual drafting session|
|Skill commit → Site verify   |Push to skills/        |Manual site check      |
|Weekly content digest        |Weekly schedule        |Manual content review  |
|Subscriber welcome sequence  |New Beehiiv subscriber |Generic automation     |
|Skills inventory report      |Monthly schedule       |Manual library audit   |

Note: Cowork is beta (ADR-001 open). Content ops only — not subscriber data or financial processes.

-----

## Immediate fixes required (not backlog — do these now)

- [ ] **Beehiiv approval queue** — turn off “Approval required” in Beehiiv → Settings → Publication → Subscription. Currently blocking auto-confirm for new signups.
- [ ] **Page title** — change from “Home | gtmstack.ai” to “gtmstack.ai — Unfiltered AI marketing. Built live.”
- [ ] **Meta description** — update from Beehiiv CDN default to brand voice copy.
- [ ] **commercial/ directory** — add to .gitignore. Positioning and monetisation thinking should not be publicly indexed.
- [ ] **Skill numbering convention** — establish before library grows. Recommendation: function prefix (DG-001, PMM-001).

-----

## What’s not yet designed

- `content/write-claude-journal-post.md` — skill to extract journal-style thought leadership from build log pains/insights sections. The most distinctive content format in the plan. No structure yet.

-----

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*