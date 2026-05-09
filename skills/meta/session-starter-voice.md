# Skill: Session Starter — Voice

> Runs the Tuesday 8:15–8:45 (Europe/London) voice 1-2-1 between Matt
> and Claude. Triggered by the codeword `stack`. Claude leads with
> spoken prompters, one at a time. Matt speaks freely. Claude cleans
> the transcript, captures structured output, commits the session file.

---

## Metadata

| Field | Value |
|---|---|
| **Category** | Meta — operating cadence |
| **Role** | Founder / solo operator |
| **Difficulty** | ⭐⭐⭐⭐ 4 (voice cleanup adds complexity) |
| **Effectiveness** | ⭐⭐⭐⭐⭐ 5 |
| **Time (manual)** | 60 mins (rambling, no structure, lost decisions) |
| **Time (with AI)** | 30 mins (timeboxed, structured, committed) |
| **Time saving** | 50% — and the output ships |
| **Built with** | Claude Projects · GitHub MCP · Gmail MCP |
| **Status** | 🟡 In progress — v1.1 |
| **Version** | v1.1 |
| **Build log** | [Entry 001](../../content/build-log/001-session-system-may-2026.md) |

---

## When this skill runs

- **Cadence:** every Tuesday 8:15–8:45 Europe/London
- **Trigger:** Matt says or types the codeword `stack`
- **Mode:** voice. Matt speaks. Claude transcribes, structures, commits.
- **Output:** a cleaned transcript, categorised decision blocks, a
  commit-ready session file in `engine/sessions/`, and an email to
  matt@gtmstack.ai.

If Matt cannot attend, he declines the calendar invite. No prompt is
needed. Airtable logs the gap. Auto-nudge fires after a 7-day silence.

---

## Why this skill matters

> Voice is faster than typing for senior thinking. The cost is
> structure — voice notes rot in audio files no one revisits. This
> skill turns 30 minutes of speaking into committed, categorised,
> shippable repo artefacts. It's the only way solo voice thinking
> ever reaches production.

**What breaks without this skill:**
- Voice notes pile up unprocessed.
- Decisions live in audio. Repo doesn't see them.
- Spoken parking-lot items are forgotten by Friday.
- Tone of voice notes (long, exploratory) bleeds into shipped copy.

---

## The session flow (seven phases)

```
1. Trigger detection    (codeword: "stack")
2. Pre-session fetch    (silent)
3. Agenda presentation  (visible — Matt confirms)
4. Spoken prompter loop (one prompter at a time)
5. Transcript cleanup   (after Matt signals end)
6. Persona close        (asset recommendations)
7. Commit + email       (delivery)
```

Phases 2, 3, 6, 7 are identical to the written skill. Phases 1, 4, 5
are voice-specific.

---

## Phase 1 — Trigger detection

The skill activates when Matt says or types `stack`. Treat it as
case-insensitive. Treat any of the following as the trigger:

- `stack`
- `stack.`
- `>_ stack`
- `start stack` / `begin stack`

On trigger:
1. Acknowledge once, briefly. Example: *"Stack. Fetching state, one moment."*
2. Move silently into Phase 2.

Do not ask Matt anything between trigger and agenda. He has already
chosen to start.

---

## Phase 2 — Pre-session fetch (silent)

Identical to the written skill. Fetch and read these six sources
**in this order**, silently:

1. `https://gtmstack.ai`
2. `https://github.com/Marketing-Matt/gtmstack/blob/main/README.md`
3. `https://github.com/Marketing-Matt/gtmstack/blob/main/engine/decisions/0001-architecture-before-automation.md`
4. `https://github.com/Marketing-Matt/gtmstack/blob/main/content/build-log/000-planning-session-may-2026.md`
5. `https://github.com/Marketing-Matt/gtmstack/blob/main/brand/voice.md`
6. `engine/sessions/` directory — most recent file

Identify (silently):
- Open / incomplete items from the last session
- Parked items whose triggers are now likely met
- ADR decisions still unresolved
- What the last session decided

If a fetch fails, note it once at the top of the agenda. Continue.

---

## Phase 3 — Agenda presentation

Same format as the written skill. Mode marker is `voice`.

```
---
>_ Session [NNN] — [YYYY-MM-DD] — voice

## Open items from last session
- [bullet pulled from prior session file]
- if none found: "No prior session found"

## Parked items — triggers met?
- [item] — trigger: [condition] — likely met because [evidence from repo]

## Suggested topics based on repo state
- [3–5 Claude-generated suggestions tied to what was found]

## Your agenda
What would you like to add, change, or prioritise today?
---
```

Read it aloud if voice is the channel. Otherwise display it.
Wait for Matt to confirm or revise. Do not move on until he has.

---

## Phase 4 — Spoken prompter loop

Once the agenda is agreed, Claude leads the conversation with
**spoken prompters, one at a time**. Tone is conversational — not
interview, not interrogation.

**Order is fixed:**

1. *"Anything to share before we start? Links, context, last week's
   carry-over?"*
2. *[First agenda item — phrased as a question, natural language]*
3. *…wait for Matt to finish. Then the next item.*
4. *"Any blockers or hard decisions you want to flag?"*
5. *"Anything for Production Chat?"*

**Spoken prompter rules:**

- One prompter at a time. Never stack two questions in one breath.
- Use natural language. *"Talk me through the audience model"* not
  *"Question 2: please describe the audience model."*
- Wait until Matt finishes. Silence is fine.
- If Matt rambles past the agenda item, do not interrupt mid-thought.
  Capture it. Re-anchor at the next pause: *"Got that. Back on the
  agenda — [next item]?"*
- If a response is unclear, ask **one** clarifying prompter. Not three.
- If Matt says "next" or "move on", proceed immediately.
- Do not paraphrase Matt's answer back at him unless he asks.

**Live capture during voice:**

While Matt speaks, Claude internally structures decisions into the
block format below. Do **not** read these blocks aloud during the
session — they distract. Show them after Matt signals end of session.

---

## Phase 5 — Transcript cleanup

When Matt signals end (e.g. *"that's it"*, *"we're done"*, *"close it
out"*), Claude does the cleanup pass:

**Cleanup steps (in order):**

1. **Strip filler** — remove "um", "ah", "you know", "sort of",
   "kind of", "right?", false starts, audible pauses.
2. **Repair sentences** — turn fragments into complete sentences
   without changing meaning. Do not invent content.
3. **Normalise terminology** — match repo language. (`skill`, `agent`,
   `ADR`, `parked`, `Production Chat`, etc.)
4. **De-duplicate** — collapse repeated points into a single
   well-formed statement.
5. **Tag speakers** if relevant. Default speaker: Matt.
6. **Preserve voice** — Matt's tone is direct, terse, opinionated.
   Do not soften. Do not corporate-ify. Match `brand/voice.md`.

The cleaned transcript is saved as a fenced block inside the session
file under `## Transcript (cleaned)`. The raw transcript is **not**
committed to the public repo — it lives only in the session chat.

---

### Categorised output blocks (post-cleanup)

After cleanup, present the categorised blocks Matt can review.

**Block format — exactly this:**

```
**[CATEGORY] | [PERSONA] | [PRIORITY]**
Plain English statement. Max 30 words.
→ repo impact: [path or none]
```

**Categories:** `Review` · `Create Task` · `FYI` · `Fix` · `Decision` · `Parked`
**Personas:** 🟢 Marketing · 🔵 Technical · ⚫ Business
**Priority:** `P1` (now) · `P2` (this week) · `P3` (backlog)

If a single answer produces multiple blocks, output them all, in order.
30-word limit is hard. Cut, don't soften.

---

## Phase 6 — Persona close (asset recommendations)

Same as the written skill.

```
## Asset recommendations

🟢 Marketing — [recommendation, 1 line, why now]
🔵 Technical — [recommendation, 1 line, why now]
⚫ Business  — [recommendation, 1 line, why now]

Generate which? (any / all / none)
```

Recommendations must tie to what the session actually produced. No
generic suggestions. Generate only what Matt approves. Do not
auto-generate.

---

## Phase 7 — Commit block + delivery

Produce the commit block:

```markdown
## Session: YYYY-MM-DD — NNN
**Mode:** voice
**Topics covered:** [list]
**Decisions made:** [list]
**Repo impacts:** [path → change]
**Tasks created:** [task | priority]
**Parked items:** [item | trigger]
**ADR conflicts flagged:** [list or none]
**Assets generated:** [list or none]
**Sent to Production Chat:** [list or none]
```

**File path:** `engine/sessions/NNN-YYYY-MM-DD-voice.md`

**File contents (sections, in order):**
1. Commit block (above)
2. `## Agenda` — what was confirmed in Phase 3
3. `## Categorised output` — all blocks from Phase 5
4. `## Transcript (cleaned)` — fenced block

**Then offer delivery — three options:**

```
How would you like this delivered?
  a) Download as .md
  b) Generate PDF
  c) Email to matt@gtmstack.ai via Gmail MCP
     Subject: >_ gtmstack.ai — Session [NNN]
     Body: decisions · actions · assets · GitHub link
```

Wait for Matt's choice. Execute. Confirm with the artefact link.

---

## Inputs

| Input | Format | Source | Required? |
|---|---|---|---|
| Codeword | `stack` (spoken or typed) | Matt | ✅ |
| Repo state | live fetch (6 sources) | GitHub + site | ✅ |
| Session content | spoken | Matt voice | ✅ |
| Calendar event | Tuesday 8:15 Europe/London | Google Calendar | ⚠️ Optional |

---

## Outputs

| Output | Format | Goes to |
|---|---|---|
| Cleaned transcript | fenced markdown | session file |
| Categorised blocks | inline markdown | session file |
| Session file | `NNN-YYYY-MM-DD-voice.md` | `engine/sessions/` |
| Commit block | markdown summary | session file + email |
| Email | Gmail via MCP | matt@gtmstack.ai |
| Optional assets | per persona recommendation | repo or external |

---

## Brand voice — non-negotiable rules

All output must match `brand/voice.md`. Specifically:

- Unfiltered. No hedging. No "it depends."
- Precise. Numbers, grades, versions — show them.
- Builder-coded. Terminal language where natural.
- **Never use:** leverage, empower, seamless, AI-powered,
  best practices, thought leadership, revolutionary, game-changing.
- Lead with the output, not the process.
- Short sentences. IBM Plex Mono aesthetic.

If a generated asset breaks any of these, regenerate it. Do not ship.

---

## Failure modes (voice-specific additions)

| Failure | Why it happens | Fix |
|---|---|---|
| Filler bleeds into commit | Cleanup skipped | Force Phase 5 before Phase 7. |
| Block longer than 30 words | Voice meandering preserved | Cut. Use the format. |
| Multiple prompters in one breath | Phase 4 collapsed | Reset. One prompter. Wait. |
| Tone softened in cleanup | Over-corrected raw voice | Re-read voice.md. Restore terseness. |
| Agenda skipped after trigger | Jumped to prompters | Restart from Phase 3. |
| Raw transcript committed | Forgot the cleanup boundary | Replace with cleaned version. |

---

## Connected skills

**Run before this:**
- (none — this is the entry point)

**Run after this (optional, persona-recommended):**
- [ ] [content/extract-linkedin-posts.md](../../content/extract-linkedin-posts.md)
- [ ] [content/write-build-log.md](../../content/write-build-log.md)
- [ ] [content/write-beehiiv-issue.md](../../content/write-beehiiv-issue.md)

**Companion:**
- [skills/meta/session-starter.md](./session-starter.md)
  — Friday 12:00 written session, same protocol.

---

## Version history

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-05-09 | Initial build — seven-phase flow |
| v1.1 | 2026-05-09 | Added cleanup rules, locked block format |

---

*Built live at [gtmstack.ai](https://gtmstack.ai) using Claude.
Unfiltered AI marketing. No theory.*
