# Build Log: Session skill system — 2026-05-09

**Session:** 001
**Total time:** ~75 mins (first prompt → commit)

---

## What I was trying to build

Two meta-skills that run the recurring 1-2-1 cadence between me and
Claude. One for the Friday written session. One for the Tuesday voice
session. Plus the scaffolding to commit every session as a real repo
artefact in `engine/sessions/`.

The problem this solves: solo founder thinking dies in chat. Without
a forcing function that pushes session output into the repo, every
decision is at risk of being lost by the next morning.

The brief was specific:
- 6-source pre-session fetch, silent, before any output
- Agenda presentation **before** any question
- One question at a time — never front-loaded
- Locked output format (`[CATEGORY] | [PERSONA] | [PRIORITY]`)
- Persona close with asset recommendations
- Commit block + email delivery

---

## Tools used

| Tool | How used | Notes |
|---|---|---|
| Claude Projects | Skill design + writing | One long context turn |
| Claude Code | Repo I/O, file creation, commits | Worktree-isolated |
| GitHub | Storage + public artefact | Branch: main |
| Vercel | Auto-deploy on push | Site untouched today |
| Gmail MCP | Planned delivery channel | Not exercised yet |

---

## First prompt (verbatim)

The brief was multi-section context (project overview → session system
→ output format → fetch sequence → agenda format → question protocol →
brand voice → close sequence → file deliverables → commit messages).

Key instruction: *"Read all context below before writing any file."*
That single line changed how I approached the work — no incremental
drafting, no asking questions back, just absorb-then-build.

---

## What didn't work + why

- **Initial instinct: ask clarifying questions first.** Wrong call.
  The brief had everything needed. Asking would have stalled the
  session and broken the "absorb then build" instruction.

- **Initial structure: one phase per heading.** Worked for the
  written skill. Broke down for voice — cleanup is a real distinct
  phase that doesn't exist on the written side. Voice ended up at
  seven phases vs. the written six. Resisted the urge to force
  symmetry.

- **Tried to share one fetch sequence across both skills via include.**
  No include mechanism in markdown skills. Duplicated the list. Worse
  for DRY, better for a self-contained skill file.

---

## Final prompt that worked (verbatim)

Same first prompt — no rewrite needed. The execution path that worked:

1. Read all six referenced files in repo before writing anything.
2. Map the brief's six requirements to phases for each skill.
3. Write written skill first (simpler), then voice (adds cleanup).
4. Write build log last so it could honestly grade the work.

---

## Output quality grade

**4/5.**

What earned 4:
- Both skill files self-contain enough that a fresh Claude session
  could run them without further context.
- Block format is locked. 30-word cap is hard.
- Voice cleanup rules preserve terseness — the most likely failure
  mode (corporate softening) is explicitly named.
- Failure modes section names every drift I expect to see.

What kept it from 5:
- Not yet exercised end-to-end. First real Tuesday session is the
  test — until then this is paper.
- Email delivery via Gmail MCP is specified but unproven.
- "Suggested topics" generation depends on Claude correctly reading
  parked-item triggers — an unvalidated assumption.

---

## Time breakdown

- Scoping: 5m (re-read brief, confirmed nothing missing)
- Repo recon: 10m (read voice.md, template, build log 000, ADR-0001)
- Prompting / writing: 30m (skill 1 + skill 2)
- Iteration: 10m (voice-specific phase split, format lock-in)
- Validation: 5m (cross-checked both skills against the 7 quality checks)
- Docs (this build log): 15m
- **Total: 75m**

---

## Pains + friction

- **Symmetry pull.** Strong instinct to make the two skills mirror
  each other 1:1. Voice genuinely needs an extra phase. Resisting
  that pull cost real time.
- **Format under-specification risk.** "30 words max" is easy to
  write. Holding the line in practice means cutting decisions, not
  softening them. Wrote that explicitly into both skills.
- **Brand-voice drift in the skill itself.** Caught myself drafting
  "leverage the agenda" in the first pass. Deleted. The skills that
  enforce voice must themselves match the voice — same standard.

---

## Surprises + unexpected wins

- The persona close maps cleanly to existing repo channels. 🟢 →
  LinkedIn / build log. 🔵 → architecture / ADR. ⚫ → founder log /
  decision log. The asset list practically writes itself.
- Specifying *exact* fetch URLs (not just "fetch the README") means
  any future Claude session inherits the discipline. No interpretation
  needed.
- The "fetch failed" graceful-fallback rule prevents a broken link
  from killing a session. Small detail, big resilience.

---

## Insights worth codifying

1. **Codeword triggers belong in the skill.** `stack` for voice is a
   one-syllable, hard-to-confuse trigger. Future skills should use
   the same convention — a single codeword, in the skill metadata.
2. **Skills that produce repo commits should specify the path.**
   `engine/sessions/NNN-YYYY-MM-DD-{voice|written}.md` is
   prescriptive on purpose. No filename ambiguity, ever.
3. **Phase counts should match reality, not symmetry.** 6 phases for
   written, 7 for voice. Forcing parity would have hidden the cleanup
   step that makes voice usable.

---

## What I'd do differently

- Build the first real session before iterating on the skill. v1.1
  is theoretical. v1.2 should come from a lived run.
- Add a worked example block to each skill — one full pass of agenda
  → questions → blocks → commit — so future Claude sessions have a
  concrete pattern to match, not just rules.
- Write the email body template as a separate fixture, not inline. A
  one-line description in the commit block is too thin for a real
  email Matt will actually want to read.

---

## Enhancements flagged for v2

- Worked-example block per skill (lived session, redacted if needed).
- Email body template as a structured fixture under `engine/sessions/`.
- Auto-numbering: read the highest existing `NNN` from
  `engine/sessions/` and increment. Currently described, not coded.
- Parking-lot trigger evaluator: a small structured check that
  cross-references repo state against parked-item triggers and
  surfaces the matches. Currently a Claude judgement call.
- Production Chat handoff format. "Anything for Production Chat?"
  is asked but the handoff payload isn't specified.

---

## Future skill ideas triggered

- **`session-recap.md`** — generates a 5-bullet recap from any
  session file, suitable for LinkedIn or the build log.
- **`parking-lot-watch.md`** — runs daily, surfaces parked items
  whose triggers may now be met, posts to Production Chat.
- **`adr-conflict-check.md`** — given a session's decision blocks,
  cross-references against `engine/decisions/` and flags conflicts.
- **`weekly-roll-up.md`** — combines the Tuesday voice + Friday
  written session into one weekly digest, ready for Beehiiv.

---

## Honest rating: was it worth it?

**Yes. Worth it now, not in three months.**

Reason: the cadence is the product. Without these skills, every
session is bespoke. With them, every session ends with a committed
artefact in the same place, in the same format. That's the only way
the build log stays alive past month two.

The 75-minute investment pays back the moment session 002 runs and
costs me 5 minutes of structure overhead instead of 30. By session
010 it's the difference between a public repo and a public claim.

---

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*
