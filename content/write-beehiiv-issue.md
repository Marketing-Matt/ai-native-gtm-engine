# Skill: Write Beehiiv Newsletter Issue
> Turns a committed build log + skill card into a Beehiiv newsletter issue — subject line, preview text, body, and one clear CTA — written in brand voice and ready to paste.

---

## Metadata

| Field | Value |
|---|---|
| **Skill ID** | CON-003 |
| **Category** | Content engine — meta-skill |
| **Role** | Anyone shipping the gtmstack newsletter (currently: Matt) |
| **Difficulty** | ⭐⭐ 2 |
| **Effectiveness** | ⭐⭐⭐⭐ 4 |
| **Time (manual)** | 90–150 mins to write a publishable issue from scratch |
| **Time (with AI)** | 15–25 mins, with build log + skill card committed |
| **Time saving** | ~85% |
| **Built with** | Claude (Projects or API) — Beehiiv MCP integration pending (see ADR-002, R3) |
| **Status** | 🟡 In progress — first version, not yet run end-to-end |
| **Version** | v1.0 |
| **Build log** | [Entry #003 — pending first run](./build-log/tracker.md) |

---

## Why this skill matters

> The newsletter is the only owned channel where a senior B2B marketer reads
> something from gtmstack with intent. LinkedIn is interruption.
> Reddit is community. Beehiiv is a person who chose to give 4 minutes of
> their attention every other week. That's the most valuable inch of
> distribution in the stack.

Newsletter writing fails in two predictable ways. The first is the throat-clear
opening: "Hope this finds you well — in this issue we'll explore..." which
trains subscribers to skim. The second is the disguised pitch: a "thought
leadership" piece that's actually selling something and the reader smells it
within the first paragraph.

Both failures come from writing the body before the subject line is strong.
This skill enforces the opposite order: subject + preview text first, body
second, voice check third. If the subject line can't earn the open, the rest of
the issue is unread regardless of how good it is.

The other reason this skill matters: the source material is already written.
The build log and skill card together contain a publishable issue if you
extract from them honestly. The temptation is to write a *new* take alongside
the build log. The skill explicitly forbids that — the issue is the build log
in newsletter form, not a separate essay.

**What breaks without this skill:**
- Issues get drafted on a Sunday night, with the subject line written last and weak
- The body becomes a generic "what I learned about AI" essay instead of the specific build narrative
- Verbatim prompts don't make it into the issue (subscribers came for that — without it the issue is a substack post)
- Multiple links in the CTA block dilute the one click that matters
- "TL;DR" sections appear, which signal to the reader the body wasn't worth reading
- The newsletter cadence slips because the writing process is too heavy

---

## Where it fits in the content engine

```
Build log + skill card → write-beehiiv-issue → Beehiiv draft → manual paste → send
                                                     ↓
                                          (future) Beehiiv MCP push when R3 closes
```

**Feeds from:**
- A committed build log produced by [`content/write-build-log.md`](./write-build-log.md) (CON-001)
- The committed skill card the build log refers to
- Optional: the LinkedIn drafts produced by [`content/extract-linkedin-posts.md`](./extract-linkedin-posts.md) (CON-002) — used for de-overlap, so the newsletter and LinkedIn aren't saying the same thing

**Feeds into:** A draft issue saved under `content/newsletter/NNN-issue.md`, then manually pasted into Beehiiv. Once Research thread R3 closes, the same draft becomes the input to a Beehiiv MCP push.

**Connected agent:** Distribution agent (not yet built — depends on this skill plus CON-002 and CON-007).

---

## Prerequisites

- [ ] A committed build log at `content/build-log/NNN-skill-name.md` — same source-quality rule as CON-002: thin log → thin issue
- [ ] The skill the log refers to is committed and publicly viewable at a stable URL on `gtmstack.ai`
- [ ] Issue number assigned (next sequential — check `content/newsletter/index.md` if it exists, else start at 001)
- [ ] Beehiiv "Approval required" off (see immediate-fixes — already done)
- [ ] Decision on cadence: this skill assumes bi-weekly. If a build cycle slips, do not pad the gap with a non-build issue — skip the slot rather than dilute the format
- [ ] Subscriber count noted in issue header (honest "small list" framing while < 100; switch to round-number framing at milestones)

---

## The process

### Without AI — the baseline

> Before this skill: write the issue Sunday night, lose 30 minutes on the
> subject line at the very end, paste into Beehiiv, find a typo at 9pm,
> push send anyway.

**Steps:**
1. Open Beehiiv, hit "new issue", stare at blank
2. Skim the build log, write a 200-word intro that's mostly throat-clearing
3. Re-read the build log, paste in the verbatim prompt, lose the narrative thread
4. Write a "what I learned" closer
5. Subject line invented in the last 90 seconds — usually generic
6. Schedule and hope

**Typical time cost:** 90–150 mins
**Where it usually breaks down:** subject line written last; body becomes a parallel essay rather than a build narrative; verbatim artefacts get cut "for length"; CTA block has two or three links instead of one.

---

### With Claude — the augmented version

> Three steps. Total time target: 15–25 mins, build log → ready-to-paste
> Beehiiv draft. Subject line is generated *first*, body second. The body is
> written to the subject line, not the other way round.

#### Step 1: Subject line + preview text candidates

**What you're doing and why:** Subject + preview is the entire open-rate battle. Generate 5 candidate pairs against the source material, ranked. The body in step 2 will be written *to* the chosen subject — so a bad choice here cascades. Spend the senior judgment here, not in step 3.

**Prompt:**
```
You're going to draft a gtmstack newsletter issue from a committed build log
and skill card.

Audience: B2B marketing leaders — CMOs, Heads of Demand Gen, senior content
leaders. Opted-in subscribers, so we have permission, but they have full
inboxes. Subject + preview is the entire open-rate battle.

Brand voice: unfiltered, precise, builder-coded, generous. See brand/voice.md.

I'll paste the build log and skill card next. Don't draft the body yet.
First, generate 5 candidate subject + preview pairs.

SUBJECT LINE RULES:
- 30–60 characters (subject lines beyond 60 truncate on mobile)
- No emoji in subject. None.
- No question marks unless the question is genuinely unsettling
- Banned: "Newsletter #NNN", "My latest update", "Exciting news", "How to ...",
  "5 things ...", "The truth about ...", anything starting with "Why" + abstract noun
- Patterns that work: specific number + concrete claim; verbatim quote; counter-
  intuitive observation; skip-the-throat-clear opener ("Build log 002. Here's
  what broke.")
- Test: could this subject line have appeared in any other AI marketing
  newsletter? If yes, reject.

PREVIEW TEXT RULES:
- 80–120 characters
- Complements the subject — does NOT repeat or paraphrase it
- Adds the specificity the subject couldn't fit
- Ends mid-thought is fine — invites the open

For each candidate output:

  Subject:        [the subject line]
  Subject chars:  [character count]
  Preview:        [the preview text]
  Preview chars:  [character count]
  Pattern:        [which pattern from above it uses]
  Hypothesis:     [one sentence — why this earns the open with the audience above]
  Risk:           [one sentence — what makes it weak, or what it overpromises]

Rank by hypothesised open-rate impact. Strongest at the top.
If only 3 candidates are strong, output 3 and say "no further strong
candidates" — do not pad to 5.

Reply: "Ready. Paste the build log and skill card."
```

**Expected output:**
> 3–5 ranked subject + preview pairs. Each tight enough that you can pick or reject in one read. The "Risk" line is the most useful — Claude often spots an overpromise in the subject before you do.

**Human judgment required:**
> Pick one, not "the top two for A/B test" — that decision comes later in step 3 where Beehiiv's A/B field is filled. Right now: pick the single subject the body will be written to. Three filters:
> 1. Would you open this if it landed in your inbox today, mid-task? If you'd skim past, reject.
> 2. Is the implied promise something the build log can actually deliver? If the subject says "12 minutes" and the build log says "estimated", reject.
> 3. Avoid subject lines that are funnier than the body. Tonal mismatch costs more trust than a flat subject would.

**Prompt quality grade:** 🟢 Strong

---

#### Step 2: Draft the body to the chosen subject

**What you're doing and why:** Now write the body — but write it to the subject line. The subject set the implicit promise; the body must deliver it. This step is where most newsletter drafting goes wrong, because writers default to a generic essay structure. The prompt below forces a build-narrative structure instead.

**Prompt:**
```
The chosen subject + preview is:

  Subject: [paste]
  Preview: [paste]

Now draft the body. The body must deliver the implicit promise of the subject —
do not pivot to a different angle.

STRUCTURE (in this order, every issue):

1. HOOK — 1–2 sentences. A specific concrete moment from the build. No
   "hope this finds you well." No "in this issue we'll explore." No "I want
   to share something with you." Open with the moment.

2. CONTEXT — 2–3 sentences. What was being built and why it mattered. Skip
   the autobiography ("As you know I've been working on...") — assume the
   reader has read prior issues OR skip to the work.

3. THE WORK — 4–8 sentences. The actual build. Must include AT LEAST ONE of:
   - A verbatim prompt or prompt fragment (in a code block)
   - A specific dead end with the timestamp ("Lost 18 minutes on a prompt
     that didn't constrain output format")
   - A surprise moment that contradicts the going AI-marketing wisdom

4. THE RESULT — 2–3 sentences. The honest measurement, with denominators.
   "12 minutes vs the 75 it would have taken manually." NOT "huge time
   saving." Include the build log's grade if one exists.

5. THE LINK — 1 sentence. One link only. Format:
   "Live skill, prompts, real outputs: [URL]"
   No "follow me on", no "let me know what you think", no "share with a
   colleague." One link. The subscriber clicks or doesn't.

6. SIGN-OFF — 1–2 lines. Format:
   "matt
    gtmstack.ai — unfiltered AI marketing. built live."

VOICE RULES (same as CON-002, condensed):
- Unfiltered, precise, builder-coded, generous (brand/voice.md)
- First person, past tense for the build narrative
- No corporate softening of friction
- No bold or italics decoration in body — Beehiiv's editor is fragile and
  the markdown-native voice doesn't need them
- One H2 max in the body, only if there's a genuine break in the narrative
- Total body length: 350–600 words. Closer to 400 than 600.

BANNED PHRASES (auto-reject):
- "Hope this finds you well"
- "TL;DR"
- "In this issue"
- "Without further ado"
- "Game-changer", "needle-mover", "level up", "10x"
- "Let me tell you about..."
- "I'm excited to share..."

DE-OVERLAP WITH LINKEDIN:
- I'll paste the LinkedIn drafts (if produced by CON-002) so the newsletter
  doesn't use the same opening artefact. The newsletter takes the longer,
  more reflective angle; LinkedIn takes the punchier extracts.

Output the body as plain markdown. No HTML, no Beehiiv-specific syntax —
that's step 3's job.
```

**Expected output:**
> A 350–600-word body in clean markdown. Hook, context, work, result, link, sign-off — in that order. One verbatim artefact in the work section. One honest measurement in the result.

**Human judgment required:**
> Read the body once with the subject line above it. Three checks:
> 1. Does the hook deliver on the subject's implicit promise? If the subject says "Here's what broke" and the hook is about something that worked, the issue feels bait-and-switch.
> 2. Is the verbatim artefact the strongest one in the build log? Claude sometimes picks the *first* prompt rather than the most instructive one. Cross-check against the source.
> 3. Does the result section have denominators? If "12 minutes" appears without "vs 75 manually", the number is hype.

**Prompt quality grade:** 🟡 Developing — banned-phrase list will need expansion run-on-run, same as CON-002.

---

#### Step 3: Voice check, Beehiiv packaging, A/B subject

**What you're doing and why:** Last pass. Catches voice drift, formats for Beehiiv, generates one alternate subject for Beehiiv's A/B test field, and produces the per-issue index entry. After this step you should be one paste away from a scheduled issue.

**Prompt:**
```
Final pass. Do four things:

1. VOICE CHECK
   Re-read the body against the rules in step 2. Output:
   "Voice check: pass" OR
   "Voice check: flagged: rule [X] — [specific line at fault] —
    suggested fix: [one-line fix]"

2. HIDDEN-CLAIM AUDIT
   Same as CON-002 step 3:
   - Universal lessons drawn from one data point — flag
   - Numbers without denominators — flag
   - Generic specifics ("I used Claude" — which model?) — flag
   - Effectiveness claims when the build log marked the run "pending" — flag
   Output: "Hidden claim: [one sentence] — Suggest: [one sentence]"
   If none: "Hidden claim: none."

3. ALTERNATE SUBJECT FOR A/B TEST
   Generate ONE alternate subject line — same rules as step 1, same length
   range, same banned-pattern list. Must test a different pattern than the
   chosen subject (e.g. if chosen is verbatim-quote, alternate is specific-
   number). Output:
   "Alternate subject: [text]   ([N] chars)
    Tests against chosen by:    [one sentence — what variable this isolates]"

4. BEEHIIV-READY OUTPUT
   Produce a single fenced markdown block with the final issue, in this
   exact structure:

   ---
   subject:    [chosen]
   preview:    [chosen]
   alt_subject: [from step 3]
   issue:      NNN
   source_log: content/build-log/NNN-skill.md
   skill_url:  https://gtmstack.ai/skills/[slug]
   subscribers_at_send: [number — leave as <fill> if unknown]
   ---

   [body in clean markdown — paste-ready for Beehiiv]

5. INDEX ENTRY
   After the fenced block, output one markdown table row to append to
   content/newsletter/index.md:

   | NNN | YYYY-MM-DD | [subject] | [source build log path] | [subscribers
     at send] | [opens — fill after send] | [clicks — fill after send] |

That's the deliverable. After the index row, stop.
```

**Expected output:**
> Voice check + hidden claims + alternate subject + Beehiiv block + index row. Total output is one scrollable thing, not paginated. Designed to be the final read before paste.

**Human judgment required:**
> Same discipline as CON-002 step 3 — every "hidden claim" finding gets actioned, not dismissed. Plus one Beehiiv-specific check: the alternate subject must be genuinely different in pattern. Claude sometimes generates an "alternate" that's the same idea reworded by 3 words. If the alt and chosen are the same pattern, ask for another.

**Prompt quality grade:** 🟢 Strong

---

## Inputs

| Input | Format | Source | Required? |
|---|---|---|---|
| Completed build log | Markdown | `content/build-log/NNN-skill.md` | ✅ |
| Skill card | Markdown | `skills/<function>/<skill>.md` or `content/<meta-skill>.md` | ✅ |
| Live skill URL | URL | `gtmstack.ai/skills/[slug]` once published | ✅ |
| LinkedIn drafts (CON-002 output) | Markdown | `posts/linkedin/NNNN-*.md` | ⚠️ Optional but recommended (de-overlap) |
| Subscriber count at send | Integer | Beehiiv dashboard | ⚠️ Optional (for honest framing while < 100) |
| Issue number | Integer | `content/newsletter/index.md` next sequential | ✅ |

---

## Outputs

| Output | Format | Goes to |
|---|---|---|
| Beehiiv-ready issue | Markdown with frontmatter | `content/newsletter/NNN-issue.md` |
| Index row | Markdown table row | `content/newsletter/index.md` |
| Alternate subject line | Plain text in frontmatter | Beehiiv → A/B test field |
| Per-issue voice + hidden-claim audit | Markdown notes | Inline above the body OR appended to source build log under "Distribution notes" |

> Note: `content/newsletter/` does not yet exist. First run of this skill should also create it and seed `index.md`.

---

## Real results

> First run pending. Will run on Build Log 002 (the build log produced by
> the actual run of CON-001 / `write-build-log.md` on a real skill build).
> The newsletter cannot run usefully on Build Log 000 because that's a
> planning session, not a skill build, and there's no skill card to point at.

**Run date:** Pending — gated on Build Log 002
**Context:** Will be filled in after Issue 001 is sent.

**Output:**
> [Pending first run]

**What I'd do differently next time:**
> [Pending first run]

---

## Measurable outcomes

| Metric | Baseline (manual) | With this skill | Delta |
|---|---|---|---|
| Time from build log to scheduled issue | 90–150 min | 15–25 min (target) | ~85% faster (target) |
| Subject lines tested per issue | 1 | 2 (chosen + alternate, A/B) | 2x test surface |
| Verbatim artefacts retained in body | Often 0 (cut for length) | ≥1 (forced by step 2 structure) | Build promise kept |
| CTA links per issue | Usually 2–3 | Exactly 1 | Click signal preserved |
| Banned-phrase appearances | High (drafted late, voice drifts) | 0 (banned at draft step) | Voice consistency enforced |

> All "with this skill" numbers are targets pending the first end-to-end run.

---

## Experience notes

> The stuff that only comes from writing newsletters that nobody opens.
> All of it argues for subject-first, body-second.

**What junior marketers get wrong:**
> They write the body first because it feels like "the work", then bolt a subject line on at the end. The result is a body that's not written to any specific promise, and a subject line that's a summary of the body — which is the worst possible subject. Subject is the contract. Write it first; write the body to fulfil it.

**What Claude gets wrong:**
> Three failure modes: (1) defaults to question-marked subject lines because they test well in click-bait optimisation studies — but B2B senior audiences tune out the pattern. (2) writes a "TL;DR" or "in summary" closer despite being told not to — voice creep at the end of long generations. (3) generates an alternate subject in step 3 that's the same idea reworded — must explicitly ask for a different pattern. The prompts are designed around all three.

**The senior shortcut:**
> The strongest gtmstack newsletter issues will not feel like newsletters. They'll feel like a build log entry that happened to land in your inbox. Lean into that — a newsletter that mimics the format the reader already trusts (the build log) earns more attention than one that mimics the format the reader has been trained to skim (the newsletter).

**Watch out for:**
> The subject + body tonal mismatch. A funny subject demands a body that pays it off — and most build logs don't. Default to flat-and-specific over funny. Funny is high-variance; specific is high-floor.

---

## Failure modes

| Failure | Why it happens | Fix |
|---|---|---|
| Subject line undersells the body | Subject was chosen before the body's strongest moment was visible | Re-run step 1 once the body draft exists, with the strongest body fragment as input |
| Body has 3 link placements | Step 2's "one link only" rule was softened | Hard-fail any draft with > 1 link in the body — re-prompt |
| Alternate subject is the same idea reworded | Step 3 prompt didn't enforce "different pattern" hard enough | Ask explicitly: "the alternate must use [pattern X] not [pattern Y]" |
| Issue published with `<fill>` placeholders | Beehiiv frontmatter not checked before paste | Add a pre-paste grep for `<fill>` to the manual workflow until Beehiiv MCP closes |
| Body reads like a generic essay, not a build narrative | Source build log was thin / sanitised | Same as CON-002 — go back to CON-001, do not paper over upstream weakness |
| Subject CTR low across multiple issues | Banned-pattern list is missing the patterns that B2B seniors specifically tune out | Add the patterns to the banned list as data accumulates; the list is a living artefact |

---

## Connected skills

> Third meta-skill in the content engine. The publishing pipeline (CON-004)
> is what closes the loop from committed skill → live URL referenced in
> the body. Until CON-004 lands, the `skill_url` field is a manual paste.

**Run before this:**
- [`content/write-build-log.md`](./write-build-log.md) (CON-001) — must be committed
- The skill the build log refers to — must be committed and have a live URL on `gtmstack.ai`
- [`content/extract-linkedin-posts.md`](./extract-linkedin-posts.md) (CON-002) — recommended, for de-overlap

**Run after this:**
- [`content/publish-skill-to-site.md`](./publish-skill-to-site.md) (CON-004, pending) — confirms the live skill URL referenced in the issue actually resolves before send
- Manual paste into Beehiiv → schedule → send
- Once Research thread R3 closes: [`content/push-to-beehiiv-mcp.md`](./push-to-beehiiv-mcp.md) (not yet scoped) — replaces the manual paste step

**Part of agent:**
- Distribution agent (not yet built — depends on this skill + CON-002 + CON-007)

---

## Version history

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-05-06 | Initial build. Third meta-skill committed. Pending first end-to-end run on Build Log 002 → Issue 001. |

---

*Built live at [gtmstack.ai](https://gtmstack.ai) using Claude.
Unfiltered AI marketing. No theory.*
