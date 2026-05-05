# GTM Stack — Brand Style Guide

**Version:** 1.0
**Last updated:** May 2026
**Author:** Matt Browning
**Source of truth:** [brand/tokens.json](./tokens.json)

> All values referenced in this document are defined in `tokens.json`.
> When in doubt, the token file wins.

---

## Brand identity

**Name:** gtmstack.ai
**Strapline:** `# Unfiltered AI marketing. Built live.`
**Positioning:** A learning-in-public skills platform for B2B marketing leaders. Every skill, every agent, every workflow is built live — using Claude — and documented here.

**The brand in one sentence:**
GTM Stack is what happens when a senior marketing leader stops waiting for IT and starts building.

---

## Logo system

### The prompt mark
The `>_` is the core brand mark. It references the terminal command prompt — the moment before execution. It signals technical capability without excluding marketers.

**Rules:**
- Always rendered in Electric Lime `#A6FF00`
- Never recoloured, outlined, or modified
- The cursor (`_`) is the underscore character — not a dash, not a rectangle
- **In digital surfaces the underscore blinks continuously.** This is mandatory, not optional. See [The feedback cursor](#the-feedback-cursor) for full spec.

### The wordmark
```
>_ gtmstack.ai
```

**Colour treatment:**
- `gtm` → Off-White `#F5F5F5`
- `stack` → Electric Lime `#A6FF00` — the product concept owns the accent
- `.ai` → Mid Grey `#555555` — de-emphasised, it's a domain not the brand

**Word spacing:** Tight — `word-spacing: -12px` at display size. The two words read as one unit.

### Lockup variants

**Primary lockup** — full wordmark with prompt mark:
```
>_ gtm stack.ai
```

**Pipe lockup** — alternate with vertical divider:
```
>_ | gtm stack.ai
```

**Monogram** — for favicon, app icon, social avatar:
```
Terminal chrome (window bar + traffic dots) containing >_
```
Never use a rounded rectangle container. Use terminal chrome or raw mark on black.

### What not to do
- Do not use blue or purple anywhere — ever
- Do not use the `.ai` suffix at large sizes without reducing its weight
- Do not use gradients
- Do not use rounded corners on the wordmark lockup
- Do not use Söhne, Space Grotesk, or any sans-serif for headlines

---

## Colour system

One accent rule: **Electric Lime owns all accent work.** Never introduce a second accent colour.

| Token | Hex | Usage |
|---|---|---|
| `--lime` | `#A6FF00` | Primary accent — prompt marks, active states, highlights, CTAs |
| `--lime-dk` | `#2D4A00` | Hover states and active backgrounds only |
| `--black` | `#0A0A0A` | Primary background |
| `--ink` | `#141414` | Secondary background — nav, elevated surfaces |
| `--zinc` | `#1E1E1E` | Component backgrounds — cards, modules |
| `--grey` | `#333333` | Borders and dividers |
| `--mid` | `#555555` | De-emphasised labels — `.ai` suffix, metadata |
| `--muted` | `#888888` | Supporting text, captions |
| `--white` | `#F5F5F5` | Primary text on dark backgrounds |

**Never use:** Pure white `#FFFFFF`, pure black `#000000`, any blue, any purple, any gradient.

---

## Typography

Two typefaces. Never three.

### IBM Plex Mono — brand typeface
**Usage:** Headlines, UI labels, navigation, code, the wordmark, any brand-critical text
**Weights:** Bold (700) and ExtraBold for headlines. Medium (500) for UI. Regular (400) for code.
**Why:** Carries the technical, terminal-native identity of the brand. Every headline is a statement of capability.

### Inter — reading typeface
**Usage:** Body copy, long-form content, captions
**Weights:** Regular (400) for body. Medium (500) for emphasis.
**Why:** Optimised for readability at small sizes. Gets out of the way.

### Type scale

| Size | Token | Usage |
|---|---|---|
| 8px | `size-xs` | Labels, metadata, badges |
| 10px | `size-sm` | Component text, file listings |
| 13px | `size-base` | UI text, nav items |
| 16px | `size-md` | Lockup text, subheadings |
| 22px | `size-lg` | Section headings |
| 32px | `size-xl` | Primary wordmark, hero headings |
| 44px | `size-display` | Display / maximum hero size |

---

## Visual language — markdown-native

GTM Stack's visual language is derived from markdown syntax. This is the most original design decision in the system — protect it.

| Element | Syntax | Rendering |
|---|---|---|
| Headings | `# H1` `## H2` `### H3` | `#` in lime, heading text in white |
| Lists | `- Item` | Dash marker in lime |
| Quotes | `> Quote text` | Left border in lime, text in muted |
| Code | `code block` | Text in lime, IBM Plex Mono |
| Tables | `\| Col \| Val \|` | Key values in lime |

**The `#` prefix** is used throughout the brand — in the strapline, in skill card headers, in content titles. It signals that everything is structured, documented, and real.

---

## Iconography

The icon system is built from functional metaphors — terminal operations translated into marketing concepts.

| Icon | Symbol | Meaning |
|---|---|---|
| Terminal / Prompt | `>_` | Initiation, execution, the start of a process |
| Input | Field with cursor | Data entry, ingestion |
| Process | Stacked bars | Transformation, the intelligence layer |
| Output | Arrow right | Result, activation |
| Execute | `>_ Run` | CTA — the moment of action |
| Check | Circle with tick | Success, verified output |
| Metric | Rising line | Signal, performance |
| Stack | Layered rectangles | The system, layers, architecture |

**Icon style:** Line icons, 1.5px stroke weight, no fills except on active/lime states.

---

## UI patterns

### CTA buttons
Always prefixed with `>_`. Primary CTA is always lime on black.

```
Background: #A6FF00
Text:       #0A0A0A
Label:      >_ [Action]
Example:    >_ Execute / >_ Explore the Stack / >_ Run
```

### Navigation
Underscored items — `_Use Cases` `_Stack` `_About`
The underscore prefix is the terminal filename convention. Every nav item is a file.

### Cards and components
- Sharp corners — no border-radius except terminal chrome (6px)
- 1px borders in `#333333` default, `#A6FF00` on active/selected
- Backgrounds layered: `#0A0A0A` → `#141414` → `#1E1E1E`

### Risk and status badges
- Risk: amber `#FFB020` on dark amber background — never alarming, always visible
- Marketing Owned: lime on dark lime
- Shared Ownership: blue on dark blue — the only context where blue appears

### The feedback cursor

The underscore (`_`) in the `>_` prompt mark blinks continuously in all digital surfaces. The cursor is the visual heartbeat of the brand — it signals that the system is live, running, waiting for input.

**Cadence:** 1-second cycle. 500ms visible, 500ms invisible. **Steps animation** — a hard on/off snap, never a smooth fade. This matches a real terminal cursor; CRT-style fade looks cheap.

**Where it applies:**
- Primary brand mark in navigation
- Footer sign-off mark
- Any standalone `>_` brand mark on a dark surface

**Where it does not apply:**
- The favicon (animated favicons are distracting and most platforms don't render them anyway)
- `>_` used as a prefix on CTA buttons (would compete with hover/focus states)
- Live terminal output sequences with their own typewriter animation

**CSS reference implementation:**
```css
@keyframes gtm-cursor-blink {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.gtm-cursor {
  animation: gtm-cursor-blink 1s steps(1) infinite;
}
```

Markup pattern — wrap only the underscore character in the cursor span:
```html
<span class="brand-mark">&gt;<span class="gtm-cursor">_</span></span>
```

The cursor never stops. No hover pause, no scroll trigger. A 1Hz blink is well below WCAG flash thresholds (≥3Hz) and is universally accessible — no `prefers-reduced-motion` exception is required, though implementations may freeze the cursor in the visible state if they choose to be conservative.

---

## Application rules

### Dark-first
All primary outputs are dark-themed. Light mode is not currently in the brand system. If a light context is required (e.g. a LinkedIn document), use `#F5F5F5` background with `#0A0A0A` text and lime accents.

### Watermark / brand sign-off
Every output — diagram, document, design, code — ends with:
```
>_ Matt Browning · gtmstack.ai · [year]
```

In markdown files, the footer is:
```markdown
*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*
```

### What 'built live' means visually
The brand should never look finished or polished in a corporate sense. It looks precise and intentional, but with the energy of something being actively built. Version numbers are shown. Risk callouts are visible. ADRs are public. This is not a weakness — it's the brand's core promise made visible.

---

## What this brand is not

- Not a generic SaaS dashboard — no purple gradients, no rounded-everything, no stock illustration
- Not a developer tool brand — it's for marketers, not engineers. The terminal aesthetic is a statement about capability, not audience exclusion
- Not polished marketing — it's unfiltered by design. Rough edges that are intentional are left rough.

---

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*
