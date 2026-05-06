# Skill: Extract LinkedIn Posts
> Turns a completed gtmstack build log into 3–5 LinkedIn posts written in brand voice — specific, friction-included, and stripped of LinkedIn-default hedging.

---

## Metadata

| Field | Value |
|---|---|
| **Skill ID** | CON-002 |
| **Category** | Content engine — meta-skill |
| **Role** | Anyone distributing gtmstack build logs (currently: Matt) |
| **Difficulty** | ⭐⭐ 2 |
| **Effectiveness** | ⭐⭐⭐⭐ 4 |
| **Time (manual)** | 60–90 mins to write 3–5 decent posts from a build log |
| **Time (with AI)** | 10–15 mins, with the build log already committed |
| **Time saving** | ~85% |
| **Built with** | Claude (Projects or API) |
| **Status** | 🟡 In progress — first version, not yet run end-to-end |
| **Version** | v1.0 |
| **Build log** | [Entry #002 — pending first run](./build-log/tracker.md) |

---

## Why this skill matters

> LinkedIn is the primary distribution channel for B2B build-in-public.
> The audience there is senior, sceptical, and saturated with AI-hype posts.
> Generic "I used Claude to do X" posts get scrolled past in 1.2 seconds.
> Specific, friction-included posts written in a real voice get saved and shared.
> The difference between the two is almost entirely a voice and prompting problem.

Every gtmstack build log already contains 3–5 posts' worth of raw material:
verbatim prompts, time deltas, dead ends, surprises, codifiable insights. The job
of this skill is to extract that material *without* sanding it into the standard
LinkedIn shape — which Claude defaults to, hard, unless you stop it.

The standard shape is: punchy emoji-led hook, three short lines, listicle of
3–5 lessons, soft CTA at the bottom, two hashtags. It's the AI-LinkedIn tell. If
gtmstack posts read like that, the brand promise ("unfiltered AI marketing,
built live") collapses on contact. This skill exists to enforce that they don't.

**What breaks without this skill:**
- Build logs get committed but never distributed — the content engine starves
- Posts get drafted manually a week later, with the friction and specificity edited out
- Claude's first-pass LinkedIn voice (corporate, listicle-led, hashtag-soup) becomes the gtmstack voice by default
- Time-saving and effectiveness numbers from the build log get rounded into hype — losing the credibility they bought
- The same angle gets posted twice in different wording (no de-duplication step)

---

## Where it fits in the content engine

```
content/write-build-log.md → build-log/NNN-skill.md → extract-linkedin-posts → 3–5 LinkedIn drafts
                                                                                       ↓
                                                                                Manual schedule + post
```

**Feeds from:** A committed build log produced by [`content/write-build-log.md`](./write-build-log.md). Will not work well on a half-finished log — generic input, generic output.
**Feeds into:** A `posts/linkedin/` directory of dated drafts (or directly into a scheduling tool). Also contributes raw material to [`content/write-claude-journal-post.md`](./write-claude-journal-post.md) when an angle is too long-form for LinkedIn.
**Connected agent:** Distribution agent (not yet built — depends on this skill plus `write-beehiiv-issue.md` and `write-reddit-post.md`).

---

## Prerequisites

- [ ] A committed build log at `content/build-log/NNN-skill-name.md` — the more honest, the better the posts
- [ ] The skill the log refers to is committed (or explicitly marked failed) — posts need a real artefact to point at
- [ ] At least one specific number in the source log: time saved, prompt iteration count, time breakdown, output grade
- [ ] Decision on whether to share the verbatim winning prompt (default: yes — that's the gtmstack promise)
- [ ] LinkedIn post counter known (next sequential `posts/linkedin/NNNN-`) — so de-duplication against past posts is possible

---

## The process

### Without AI — the baseline

> Before this skill: open the build log a week after the build, skim it, write
> three posts in a doc, lose two of them to over-editing, post the third on a
> Tuesday afternoon when the engagement window has already closed.

**Steps:**
1. Re-read the build log and pick a "main angle"
2. Open a doc and start drafting — usually overshoots length
3. Cut it back, lose specificity in the cuts
4. Try a second angle, realise it overlaps with the first
5. Schedule one post, drop the others
6. Forget which numbers came from the build log vs. half-remembered

**Typical time cost:** 60–90 mins for one usable post, longer for three
**Where it usually breaks down:** voice drift toward LinkedIn-default, lost specificity in editing, unintended overlap between posts, late posting outside the engagement window.

---

### With Claude — the augmented version

> Three steps. Total time target: 10–15 mins from build log to a copy-paste-ready
> markdown block of 3–5 posts. The whole point of the skill is to refuse the
> default LinkedIn shape — most of the prompt design is in the negative space
> (what Claude must not do).

#### Step 1: Identify candidate angles

**What you're doing and why:** Before any drafting, get Claude to read the build log and propose 5 candidate post angles, ranked by signal strength. This separates "what could go in a post" from "what should." The senior judgment is in the rank order — a strong angle on a thin section of the log loses to a medium angle on a fat section.

**Prompt:**
```
You're going to extract LinkedIn posts from a gtmstack build log.

Audience: B2B marketing leaders — CMOs, Heads of Demand Gen, senior content
leaders. They are senior, sceptical of AI hype, and bored of generic
"I used ChatGPT" posts. They want specific, friction-included examples
of AI changing the work — not abstractions.

Brand voice: unfiltered, precise, builder-coded, generous. See brand/voice.md.

I'll paste the build log next. Don't draft posts yet. Read it carefully and
propose 5 candidate post angles, ranked by signal strength.

For each angle output:
  Angle name:    [3–5 words]
  Source section: [which build log section it draws from]
  Angle:         [one sentence — the take or the specific story]
  Why it lands:  [one sentence — why this works for the audience above]
  Risk:          [one sentence — what makes it weak, or where it could go wrong]
  Hook fragment: [a 5–10 word draft of the opening line, in brand voice]

Rank order: strongest signal at the top. Do not pad to 5 if only 3 are strong —
say "only 3 strong angles in this log" and stop.

Reply: "Ready. Paste the build log."
```

**Expected output:**
> A ranked list of 3–5 angle proposals. Each one tight enough that you can
> say yes/no without reading it twice. The "Risk" line is the most useful —
> Claude sometimes flags risks it then ignores in the draft, so step 2's
> prompt explicitly has you re-feed the risks back.

**Human judgment required:**
> Pick the 3–5 angles to develop. The defaults are wrong here:
> - Skip "lessons learned" angles unless the lesson is genuinely contrarian
> - Pick the angle with the highest specificity per character, not the most universal-sounding one
> - If two angles overlap (same friction, different framing), pick one and kill the other now — don't try to differentiate them in step 2
> - At least one angle should be a failure or dead end. If none is, you're either lying or you didn't push hard enough on the build.

**Prompt quality grade:** 🟢 Strong

---

#### Step 2: Draft the posts in brand voice

**What you're doing and why:** This is where the voice rules earn their keep. Claude's default LinkedIn voice is the AI-LinkedIn tell. The prompt below is mostly a list of what *not* to do, because that's what stops the default.

**Prompt:**
```
Now draft posts for the angles I selected: [paste angle names from step 1].

Apply these voice rules without exception. A single rule violation kills the post.

BANNED OPENERS — never start a post with any of these:
- "Here are 5 lessons..."
- "I just learned..."
- "Most marketers don't realise..."
- "POV:" / "Hot take:" / "Unpopular opinion:"
- "Let me tell you a story"
- A single decorative emoji
- "🚀" / "🔥" / any rocket/fire combination
- Any sentence starting with the word "Imagine"

OPENING RULE — every post opens with a specific concrete fact or moment, not a
generalisation. Test: could this exact opener have appeared in any other AI
marketing post? If yes, rewrite.

  Bad:  "AI is changing how marketers work."
  Good: "Spent 12 minutes today turning a build log into 4 LinkedIn posts.
         Manually it would have taken 75. Here's the prompt that did it."

VOICE RULES:
- Match brand/voice.md: unfiltered, precise, builder-coded, generous
- Show numbers — time, iteration count, grade, character count, anything specific
- First person, past tense — "I did X, it broke, I changed Y"
- No corporate softening of friction. If the source says "wasted 20 minutes",
  say that. Never "encountered some initial challenges."
- No CTA fluff. "What do you think? Comment below" is banned.
  If a CTA exists, ask one specific question OR point at one URL. Not both.

STRUCTURE RULES:
- No hashtags except where genuinely useful — max 2, lower-cased
  (e.g. #marketingops). Default to zero.
- No em-dash → explainer pattern more than once per post (the AI tell).
- Length: 200–800 characters. Aim short. Cut hard. LinkedIn rewards 250–500.
- Every post must include something the reader could not have written
  themselves without doing this work: a verbatim prompt fragment, a specific
  time, a specific dead end, a specific number, a specific surprise.

DE-DUPLICATION:
- Each post must have a distinct angle AND a distinct artefact in the body
  (different prompt, different number, different surprise). If two drafts
  share the same artefact, kill one.

Format each post as:

### Post [N] — [angle name]

  Length:           [character count, including spaces, excluding this metadata]
  Best timing:      [Tue–Thu morning / Fri afternoon / context-dependent — and why]
  Hook strength:    🔴 Weak / 🟡 OK / 🟢 Strong / ⚡ Excellent
  Risk re-checked:  [the risk line from step 1 — one sentence on whether the
                     draft addresses or worsens it]

[the post body, exactly as it would appear on LinkedIn — line breaks where you
want them in the post, no markdown formatting inside the body]

---

Draft now. If you cannot write a draft that obeys every rule, output:
"Cannot draft post N — rule [X] makes this angle impossible. Suggest dropping or
re-angling." Do not soften the rule.
```

**Expected output:**
> 3–5 drafts, each clearly labelled, each with hook strength self-graded and
> risk re-checked against step 1. Some posts will come back with the
> "Cannot draft" output — that's a feature, not a failure. It means the angle
> was thinner than it looked.

**Human judgment required:**
> Read every draft once aloud. Three checks:
> 1. Does the opener pass the "could be any AI post" test? If you can swap "gtmstack" for any other product and the post still works, it's too generic — reject it.
> 2. Is the specific artefact (prompt / number / dead end) actually defensible? Not just real, but representative. A one-off lucky time saving makes a misleading post.
> 3. Would a senior peer roll their eyes at any line? If yes, find the line and cut it. Senior eye-roll is the brand killer.

**Prompt quality grade:** 🟡 Developing — the banned-opener list will need to expand as Claude finds new defaults to fall into. Expect to update after the first 3 runs.

---

#### Step 3: Voice-check, hidden-claim audit, and final markdown

**What you're doing and why:** Last pass. Catches voice drift Claude missed, surfaces overstated claims, and packages the output as a single block ready to paste into `posts/linkedin/`. The "hidden-claim audit" is the most valuable part — it's where Matt's experience earns the senior shortcut.

**Prompt:**
```
Final pass. For each post you drafted, do four things:

1. VOICE CHECK
   Re-read against the voice and structure rules from step 2.
   Output: "Voice check: pass" OR "Voice check: flagged: rule [X] — [specific
   line at fault] — suggested fix: [one-line fix]"

2. HIDDEN-CLAIM AUDIT
   Find anything the post is hiding by overstating. Specifically:
   - Universal lessons drawn from one data point ("AI saves 85% of time" from
     one build) — flag these
   - Numbers presented without their denominator (e.g. "12 min" without
     "vs 75 manual")
   - Specifics that are actually generic (e.g. "I used Claude" — which model,
     which mode?)
   - Claims of effectiveness that the build log graded as "first run pending"
   Output: "Hidden claim: [one sentence] — Suggest: [one sentence]"
   If none, say: "Hidden claim: none."

3. ONE QUESTION TO ASK BEFORE POSTING
   Surface anything else that gives you pause. One sentence per post.

4. FINAL MARKDOWN BLOCK
   After all per-post analysis, output a single fenced markdown block
   containing all posts in copy-paste-ready format. Each post separated by
   "---" on its own line. No metadata in this final block — just the post
   bodies as they would appear on LinkedIn. This is the deliverable that
   goes into posts/linkedin/.

That's everything. After the markdown block, stop.
```

**Expected output:**
> Per-post: voice check + hidden claim + question. Then one fenced block of
> 3–5 ready-to-post bodies. The hidden-claim audit is the part you actually
> read carefully.

**Human judgment required:**
> Take every "hidden claim" finding seriously. Claude is good at this audit
> precisely because it's adversarial — it's reading its own draft as a
> sceptic. If you find yourself dismissing a hidden-claim flag with "well,
> that's true *enough*", pause. That's the corporate softening reflex. Either
> fix it or kill the post.

**Prompt quality grade:** 🟢 Strong

---

## Inputs

| Input | Format | Source | Required? |
|---|---|---|---|
| Completed build log | Markdown | `content/build-log/NNN-skill.md` | ✅ |
| Skill artefact (the skill itself) | Markdown | `skills/<function>/<skill>.md` or `content/<meta-skill>.md` | ⚠️ Optional but recommended (lets Claude reference the actual output) |
| Past LinkedIn posts | Markdown | `posts/linkedin/` directory (when established) | ⚠️ Optional — used for de-duplication when ≥3 posts exist |
| Audience refinement | Plain text | Last paragraph of any updated audience definition | ⚠️ Optional — sharpens "Why it lands" output in step 1 |

---

## Outputs

| Output | Format | Goes to |
|---|---|---|
| 3–5 LinkedIn post drafts | Markdown block | `posts/linkedin/NNNN-source-skill-N.md` (one file per post, sequential) |
| Per-post voice + hidden-claim audit | Markdown notes | Pasted as comments inline OR appended to the build log under "Distribution notes" |
| Updated `posts/linkedin/index.md` | Markdown table | Tracks what was extracted from which build log, when posted, what engagement |

> Note: `posts/linkedin/` does not yet exist. First run of this skill should also create it.

---

## Real results

> First run pending. The first end-to-end run will be on Build Log 001 (the
> first build log produced by CON-001 / `write-build-log.md`). This skill
> cannot run usefully until that exists.

**Run date:** Pending — gated on Build Log 001
**Context:** Will be filled in after the first end-to-end extraction.

**Output:**
> [Pending first run]

**What I'd do differently next time:**
> [Pending first run]

---

## Measurable outcomes

| Metric | Baseline (manual) | With this skill | Delta |
|---|---|---|---|
| Time from build log to 3 ready posts | 60–90 min | 10–15 min (target) | ~85% faster (target) |
| Posts per build log | 1 (sometimes 2) | 3–5 (target) | 3–5x distribution |
| Voice-rule violations on first draft | High (LinkedIn-default voice creeps in) | 0 (rule violations rejected at draft step) | Voice consistency enforced |
| Hidden claims caught before posting | ~0 (no audit step) | 1–2 per run (target) | Adversarial review built in |

> All "with this skill" numbers are targets pending the first end-to-end run. Replace with measured values after the first run completes.

---

## Experience notes

> The stuff that only comes from doing this many times. All of it argues for
> the negative-space prompt design — telling Claude what NOT to do.

**What junior marketers get wrong:**
> They write the post first and then look for a number to back it up. The post comes out generic because the structure was generic. The build log already contains the post — your job is to extract it, not invent it. If the post needs a number you don't have, that post doesn't exist yet.

**What Claude gets wrong:**
> Three failure modes, in order of frequency: (1) defaults to listicle structure even when explicitly told not to — the banned-opener list catches most cases. (2) softens friction language ("encountered challenges" instead of "wasted 20 minutes"). (3) introduces a fake universal lesson at the bottom of an otherwise-specific post — the hidden-claim audit catches this. The prompts in step 2 and step 3 are designed around these three failure modes specifically.

**The senior shortcut:**
> The strongest LinkedIn posts from a gtmstack build log are almost always built around either (a) a verbatim prompt that worked, or (b) a verbatim prompt that *didn't* work and why. Both are concrete artefacts the audience can't write without doing the work. Skip the "lessons" framing. Lead with the prompt.

**Watch out for:**
> The same angle posted as two different posts. Claude will dress up overlap with different opening words but the body artefact (the specific number, the specific prompt) is the same. The de-duplication rule in step 2 catches most cases, but read all 3–5 drafts side-by-side before approving.

---

## Failure modes

| Failure | Why it happens | Fix |
|---|---|---|
| All posts default to listicle structure | Banned-opener list missed a new variant | Add the new opener to the banned list before next run |
| Posts read as generic AI-marketing content | Source build log was thin / sanitised | The skill cannot fix a weak build log — go back to CON-001 and re-run on better source material |
| Specific numbers without denominators ("12 min!") | Step 3 hidden-claim audit skipped or ignored | Always run step 3, always action its findings |
| Two posts share the same prompt fragment | De-duplication rule missed an overlap | Reject one and re-prompt step 2 for a different angle |
| Hook strength self-graded ⚡ Excellent on every post | Claude is being generous with itself | Ignore self-grades; rely on the senior eye-roll test |
| Posts published without the build log being committed first | Distribution ran ahead of source | Hard rule: never schedule a post until its build log is on `main` |

---

## Connected skills

> This is the second meta-skill in the content engine. It only works because
> CON-001 produced something to extract from.

**Run before this:**
- [`content/write-build-log.md`](./write-build-log.md) (CON-001) — must complete first
- The actual skill build that the build log refers to

**Run after this:**
- [`content/write-beehiiv-issue.md`](./write-beehiiv-issue.md) (CON-003, pending) — newsletter from the same source material
- [`content/write-reddit-post.md`](./write-reddit-post.md) (CON-007, pending) — community post from the same source
- [`content/write-claude-journal-post.md`](./write-claude-journal-post.md) (CON-009, pending) — long-form thought-leadership from angles too thick for LinkedIn

**Part of agent:**
- Distribution agent (not yet built — depends on this skill + write-beehiiv-issue + write-reddit-post)

---

## Version history

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-05-06 | Initial build. Second meta-skill committed. Pending first end-to-end run on Build Log 002. |

---

*Built live at [gtmstack.ai](https://gtmstack.ai) using Claude.
Unfiltered AI marketing. No theory.*
