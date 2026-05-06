# Skill: Write Build Log
> Turns raw session notes from a skill build into a structured, gradeable build log entry — the foundation of the gtmstack.ai content engine.

---

## Metadata

| Field | Value |
|---|---|
| **Category** | Content engine — meta-skill |
| **Role** | Anyone running a gtmstack build session (currently: Matt) |
| **Difficulty** | ⭐⭐ 2 |
| **Effectiveness** | ⭐⭐⭐⭐ 4 |
| **Time (manual)** | 45–90 mins to write a clean build log from memory after a session |
| **Time (with AI)** | 8–12 mins, with the original session notes pasted in |
| **Time saving** | ~85% |
| **Built with** | Claude (Projects or API) |
| **Status** | 🟡 In progress — first version, not yet run end-to-end |
| **Version** | v1.0 |
| **Build log** | [Entry #001 — pending first run](./build-log/tracker.md) |

---

## Why this skill matters

> Build logs are the only honest record of what AI marketing actually feels like to do.
> They're also the upstream input to four other content artefacts (newsletter, LinkedIn,
> Reddit, lead magnets). If the build log is vague, every downstream artefact is vague.
> If the build log is sharp, the whole content engine produces sharp content.

The temptation after a build session is to write a clean retrospective — sanded down, tidy, "look how well that went." That kind of build log is worthless. It strips out the friction, the dead ends, the bad first prompts, and the actual moments of judgment that make a senior marketer different from a junior one.

This skill does the opposite: it forces the unfiltered version onto the page. Verbatim prompts (including the ones that didn't work). Time broken down honestly. Pains, surprises, insights worth codifying. The format is non-negotiable so that 50 build logs from now, the dataset is comparable.

**What breaks without this skill:**
- Build logs get written days late, from memory, with the friction edited out
- Prompt evolution is lost — only the "winning" prompt gets remembered, not why earlier ones failed
- Time estimates drift toward optimism ("about an hour") instead of measured reality
- Downstream content (newsletter, LinkedIn) loses its source material — the engine starves
- The grading rubric (difficulty / effectiveness / prompt quality) goes ungraded, breaking the dataset

---

## Where it fits in the content engine

```
Session notes → write-build-log → build-log/NNN-skill.md
                                      ↓
              extract-linkedin-posts / write-beehiiv-issue / write-reddit-post
                                      ↓
                          Distribution channels (LinkedIn, Beehiiv, Reddit)
```

**Feeds from:** Raw session notes (Claude Projects transcript, voice memo transcript, scratch notes)
**Feeds into:** [`content/extract-linkedin-posts.md`](./extract-linkedin-posts.md), [`content/write-beehiiv-issue.md`](./write-beehiiv-issue.md), [`content/write-reddit-post.md`](./write-reddit-post.md), [`content/write-claude-journal-post.md`](./write-claude-journal-post.md)
**Connected agent:** Build session debrief agent (not yet built)

---

## Prerequisites

- [ ] A completed (or terminated) skill build session — even a failed one is loggable
- [ ] Raw session material available in at least one of these forms:
  - Claude Projects chat transcript (copy-paste from the chat)
  - Voice memo transcript (Whisper or similar)
  - Scratch notes taken during the session
- [ ] Session number assigned (next sequential — check `content/build-log/tracker.md`)
- [ ] Total session time recorded (first prompt timestamp → commit timestamp)
- [ ] The skill being logged has a name and lives somewhere in the repo (or at minimum, was attempted)

---

## The process

### Without AI — the baseline

> Before this skill: write the build log by hand the next morning, working from
> memory and a few scribbled notes. Build log 000 was written this way.
> It took ~75 minutes and still missed three prompt iterations because they
> weren't in the scratch notes.

**Steps:**
1. Open a blank markdown file, paste in the section headers from memory
2. Try to remember the first prompt — usually approximate
3. Estimate time spent in each phase — usually optimistic
4. Write the "what didn't work" section — usually thin because the failures fade fast
5. Grade prompt quality — usually generous
6. Forget to flag at least two future skill ideas that came up

**Typical time cost:** 45–90 mins
**Where it usually breaks down:** memory loss on prompt iterations, optimistic time estimates, sanitised friction sections.

---

### With Claude — the augmented version

> Three steps. Claude does the structuring; the human does the honesty check.
> The whole process should take 8–12 minutes if you have the raw material ready.

#### Step 1: Dump the raw session material

**What you're doing and why:** Get every artefact from the session into one place before Claude sees any of it. The skill is only as honest as the input. If you skip this step, Claude fills gaps with generic content and the log loses its value.

**Prompt:**
```
I'm about to paste raw material from a skill build session.
Don't process it yet. Acknowledge receipt and wait for me to confirm
all material is in.

Material types I'll paste:
1. Claude Projects chat transcript (the build session itself)
2. Scratch notes taken during the session
3. Voice memo transcript (if recorded)
4. Final committed skill file (if completed) or partial draft

After I confirm everything is in, you'll structure it into a build log
following the extended template defined in build log 000.

Reply: "Ready. Paste material — I'll wait for the 'all in' signal."
```

**Expected output:**
> Claude acknowledges and waits. It does not start drafting. This matters — premature drafting on partial material is the most common failure mode.

**Human judgment required:**
> You decide what counts as session material. If a key prompt iteration only lives in your head, write it down before pasting. The skill cannot recover what wasn't captured.

**Prompt quality grade:** 🟢 Strong

---

#### Step 2: Generate the structured build log

**What you're doing and why:** Turn the raw material into the gtmstack build log format. The format is fixed (defined in build log 000) — Claude must follow it section by section, not paraphrase or skip sections.

**Prompt:**
```
All material is in. Now structure it into a build log entry using the
exact template below. Rules:

1. Follow every section heading verbatim — do not skip, rename, or combine.
2. Quote prompts EXACTLY as they appeared in the session. No paraphrasing.
   If a prompt is not in the source material, write "[not captured]".
3. Time breakdown: use the timestamps in the transcript. If a phase has
   no clear timestamp, mark it "[estimated]" so it's flagged for review.
4. "Pains + friction" must contain at least one entry. If the session
   had zero friction, that itself is a finding — say so explicitly.
5. "Honest rating" — pick a number 1–10 and defend it in one sentence.
   Do not hedge. "7/10, would run again but the iteration loop was sloppy."
6. Voice: match brand/voice.md. Direct, technical, unfiltered.
   No corporate softening. No "leveraging synergies."
7. Do not invent metrics, outputs, or quotes that aren't in the source.

TEMPLATE:

# Build Log: [Skill name] — [YYYY-MM-DD]
**Session:** [number]
**Total time:** [first prompt → commit, in minutes]

## What I was trying to build
[One paragraph. The skill, the user it serves, the outcome it produces.]

## Tools used
| Tool | How used | Notes |
|---|---|---|

## First prompt (verbatim)
```
[exact text]
```

## What didn't work + why
- [bullet]
- [bullet]

## Final prompt that worked (verbatim)
```
[exact text]
```

## Output quality grade [/10]
[number] — [one-sentence defence]

## Time breakdown
- Scoping: Xm | Prompting: Xm | Iteration: Xm | Validation: Xm | Docs: Xm | Total: Xm

## Pains + friction
- [bullet]

## Surprises + unexpected wins
- [bullet]

## Insights worth codifying
- [bullet]

## What I'd do differently
- [bullet]

## Enhancements flagged for v2
- [bullet]

## Future skill ideas triggered
- [bullet]

## Honest rating: Was it worth it?
[number]/10 — [one-sentence defence]

---

End of template. Generate the full build log now.
```

**Expected output:**
> A complete markdown document, ready to save as `content/build-log/NNN-skill-name.md`. Every section filled in or explicitly marked `[not captured]` / `[estimated]`. No invented content.

**Human judgment required:**
> Read the whole thing once. Three things to check:
> 1. Did Claude soften anything? Look for hedging language ("relatively smooth", "minor friction") and replace with the actual experience.
> 2. Are the time estimates honest? If they feel optimistic, they probably are — adjust up.
> 3. Is the "Honest rating" defensible? If not, you probably enjoyed the build more than the output deserved.

**Prompt quality grade:** 🟢 Strong

---

#### Step 3: Update the tracker and commit

**What you're doing and why:** A build log isn't logged until it's in `tracker.md` and on `main`. This step is mechanical but skipping it breaks the cumulative dataset.

**Prompt:**
```
Now produce two updates:

1. A new row for the skill tracker table in
   content/build-log/tracker.md, using the build log just generated.
   Columns: # | Skill | Function | Layer | Human time | Total time |
   Time saving | Difficulty | Effectiveness | Prompt grade | Build log

2. A debrief block to append to the same tracker.md, following the
   "Debrief #NNN" format already in the file.

3. A git commit message in the gtmstack style — short imperative,
   no conventional-commits prefix. Example:
   "add build log 001 — audience segmentation skill"

Output all three as separate fenced code blocks.
```

**Expected output:**
> Three fenced blocks: tracker row, debrief block, commit message. Ready to paste.

**Human judgment required:**
> Sanity-check the difficulty and effectiveness grades against the rubric in `tracker.md`. Claude tends toward the middle of the scale — if your honest grade is a 1 or a 5, push back.

**Prompt quality grade:** 🟡 Developing — first version, expect to sharpen after 3+ runs.

---

## Inputs

| Input | Format | Source | Required? |
|---|---|---|---|
| Session transcript | Plain text or markdown | Claude Projects chat export | ✅ |
| Scratch notes | Plain text | Notes app, paper-to-text | ⚠️ Optional but recommended |
| Voice memo transcript | Plain text | Whisper or similar | ⚠️ Optional |
| Total session time | mm or hh:mm | Manual timestamp diff | ✅ |
| Session number | Integer | `content/build-log/tracker.md` next sequential | ✅ |
| Final skill file | Markdown | The skill being logged | ⚠️ Optional (for failed sessions, omit) |

---

## Outputs

| Output | Format | Goes to |
|---|---|---|
| Build log entry | Markdown file | `content/build-log/NNN-skill-name.md` |
| Tracker row | Markdown table row | `content/build-log/tracker.md` (skill tracker section) |
| Debrief block | Markdown section | `content/build-log/tracker.md` (debriefs section) |
| Commit message | Plain text | `git commit -m` |

---

## Real results

> First run pending. Build log 000 was hand-written before this skill existed
> and is the closest reference for the format this skill produces.

**Run date:** Pending — first run will be Build Log 001
**Context:** Will be filled in after the first skill build that uses this meta-skill end-to-end.

**Output:**
> [Pending first run]

**What I'd do differently next time:**
> [Pending first run]

---

## Measurable outcomes

| Metric | Baseline (manual) | With this skill | Delta |
|---|---|---|---|
| Time to write build log | 45–90 min | 8–12 min (target) | ~85% faster (target) |
| Prompts captured verbatim | ~60% (memory loss) | 100% (if pasted in) | +40 pp |
| Sections completed | 9–12 of 14 | 14 of 14 (with `[not captured]` tags) | full coverage |
| Time-breakdown honesty | Optimistic by ~20% | Within 5% (uses transcript timestamps) | tighter |

> All "with this skill" numbers are targets pending the first end-to-end run. Will be replaced with measured values after Build Log 001.

---

## Experience notes

> Three things you learn after writing build logs by hand for a few weeks.
> All of them argue for this skill existing.

**What junior marketers get wrong:**
> They write the build log as a success story. The format is "what I built, what I learned, what's next." That's a LinkedIn post, not a build log. A real build log shows the dead ends, the bad prompts, the moments where Claude was wrong. If your build log reads like a case study, you wrote the wrong document.

**What Claude gets wrong:**
> Two failure modes: (1) it softens the language — "minor friction" instead of "wasted 20 minutes on a prompt that didn't constrain output format". (2) it invents plausible-sounding metrics ("response time improved 23%") when no measurement was taken. Step 2's prompt explicitly forbids both, and the human judgment check exists to catch any that slip through.

**The senior shortcut:**
> Write the "Honest rating" line first, before generating the rest. Picking a defensible 1–10 score forces you to confront whether the build was actually any good. Then the rest of the log either supports that score or contradicts it — and contradiction is itself a finding.

**Watch out for:**
> Build logs that all rate 7–8/10. That means you're not being honest, or you're not building hard enough things. The real distribution should be wider.

---

## Failure modes

| Failure | Why it happens | Fix |
|---|---|---|
| Build log reads as sanitised | Source material was already sanitised before paste | Paste raw transcript, not your retrospective summary |
| Prompts marked `[not captured]` everywhere | Session ran in voice / no transcript saved | Future sessions: always save the Claude Projects chat before closing |
| Time breakdown is `[estimated]` for every phase | No timestamps in source | Use Claude Projects message timestamps, or run the build session in a tool that records them |
| Claude invents an "Output quality grade" | Source had no graded output | Tell Claude explicitly: "no skill output was produced — mark grade N/A and explain why in the defence sentence" |
| Honest rating clusters at 7/10 | Rating written last, after rationalising | Write the rating first (see senior shortcut above) |

---

## Connected skills

> This skill is the keystone of the content engine. Most other meta-skills feed from its output.

**Run before this:**
- The skill build itself (whatever you were building when you generated the session material)

**Run after this:**
- [`content/extract-linkedin-posts.md`](./extract-linkedin-posts.md) — pull 3–5 LinkedIn posts from the build log
- [`content/write-beehiiv-issue.md`](./write-beehiiv-issue.md) — draft a newsletter issue from the build log + skill card
- [`content/write-reddit-post.md`](./write-reddit-post.md) — community post from the build log
- [`content/write-claude-journal-post.md`](./write-claude-journal-post.md) — thought-leadership piece from the pains/insights sections
- [`content/codify-insight-to-skill.md`](./codify-insight-to-skill.md) — pull a "future skill idea triggered" entry forward into a real skill draft

**Part of agent:**
- Build session debrief agent (not yet built — depends on this skill being live)

---

## Version history

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-05-06 | Initial build. First meta-skill committed. Pending first end-to-end run on Build Log 001. |

---

*Built live at [gtmstack.ai](https://gtmstack.ai) using Claude.
Unfiltered AI marketing. No theory.*
