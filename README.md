# gtmstack.ai

> Unfiltered AI marketing. Built live.

A learning-in-public skills platform for B2B marketing leaders.
Every skill, every agent, every workflow is built live — using Claude — and documented here.

No theory. No waiting for IT. Just my 20+ years of marketing experience codified.

---

## What this is

Most AI marketing content tells you what's possible.
GTM Stack shows you how to build it.

This repository is the source of truth for [gtmstack.ai](https://gtmstack.ai) — a growing library
of reusable marketing skills and agents, built by a senior B2B marketing leader learning in public.

Every skill is:
- **Real** — built and run, not theorised
- **Documented** — full prompts, inputs, outputs, and experience notes
- **Reusable** — structured so any marketing leader can deploy it themselves
- **Tracked** — every build is timed, graded, and debriefed
- **Connected** — part of a broader AI-native GTM engine

---

## The skills marketplace

Skills are organised by marketing function.
Each skill card follows a consistent template: context, process, prompts, real outputs,
and the judgment that only comes from 20+ years of B2B marketing experience.

| Function | Focus areas |
|---|---|
| [Demand Gen](./skills/demand-gen/) | Audience segmentation, campaign briefs, lead scoring |
| [Content](./skills/content/) | Use case documentation, messaging frameworks, distribution |
| [Revenue Ops](./skills/revenue-ops/) | Pipeline analysis, attribution, reporting |
| [Product Marketing](./skills/product-marketing/) | Positioning, ICP definition, competitive intelligence |
| [ABM](./skills/abm/) | Account selection, personalisation, signal detection |
| [Brand](./skills/brand/) | Visual identity, brand voice, design system management |
| [Digital Marketing](./skills/digital-marketing/) | Paid media, web optimisation, SEO, conversion |
| [Marketing Ops](./skills/marketing-ops/) | Stack management, data hygiene, workflow automation |

> Skills are added as they're built. Each one is timed, graded, and logged.
> Follow the [build log](./content/build-log/) for new releases.

---

## Skill quality framework

Every skill is assessed against a consistent rubric — an honest, comparable record
of what AI can and can't do in B2B marketing.

**Difficulty** — how much expertise is needed to run this skill effectively:

| Grade | Meaning |
|---|---|
| ⭐ 1 | Any marketer can run this in under 30 mins |
| ⭐⭐ 2 | Needs basic familiarity with the tool or tactic |
| ⭐⭐⭐ 3 | Requires strategic or technical context to set up |
| ⭐⭐⭐⭐ 4 | Needs senior judgment to configure and interpret |
| ⭐⭐⭐⭐⭐ 5 | Requires deep GTM expertise — wrong inputs break the output |

**Effectiveness** — what AI actually delivers vs doing it manually:

| Grade | Meaning |
|---|---|
| ⭐ 1 | Marginal improvement on manual |
| ⭐⭐ 2 | Useful time saving, quality roughly comparable |
| ⭐⭐⭐ 3 | Significant saving, output quality matches experienced marketer |
| ⭐⭐⭐⭐ 4 | Strong output quality, meaningful strategic value added |
| ⭐⭐⭐⭐⭐ 5 | Transforms what's possible — output exceeds manual capability |

Full tracking data: [content/build-log/tracker.md](./content/build-log/tracker.md)

---

## The GTM engine

The skills marketplace sits on top of a five-layer GTM engine architecture.

```
Data → Intelligence → Orchestration → Activation → Feedback
  ↑___________________________________________________|
```

| Layer | What it does | Ownership | Key risk |
|---|---|---|---|
| **Data** | CRM, web analytics, subscribers, external signals | Shared | Poor schema |
| **Intelligence** | LLM processing, enrichment, classification, scoring | Shared | Weak context |
| **Orchestration** | Workflow automation, triggers, content pipelines | Marketing | Centralised bottleneck |
| **Activation** | Website, newsletter, LinkedIn, operator playbooks | Marketing | — |
| **Feedback** | Performance signals, experiments, iteration decisions | Marketing | No learning loop |

**Infrastructure:** Framer · Claude Design · Canva · Beehiiv · ElevenLabs · Airtable · Claude · GitHub · Namecheap

Individual skills map to specific layers.
Agents combine multiple skills into end-to-end workflows.

**Current architecture:** [System Map v0.4](./engine/architecture/gtmstack-system-map-v0.4.png)
**Architecture notes:** [v0.2 notes](./engine/architecture/gtmstack.ai-engine-system-map-v0.2-notes.md)

---

## Repository structure

```
gtmstack/
├── README.md                      ← you are here
│
├── brand/                         ← visual identity & voice
│   ├── style-guide.md
│   ├── voice.md
│   ├── tokens.json
│   └── assets/
│
├── skills/                        ← the marketplace
│   ├── _template.md               ← skill card standard
│   ├── demand-gen/
│   ├── content/
│   ├── revenue-ops/
│   ├── product-marketing/
│   ├── abm/
│   ├── brand/
│   ├── digital-marketing/
│   └── marketing-ops/
│
├── agents/                        ← skills working together
│
├── content/                       ← site content & frameworks
│   ├── frameworks/
│   ├── stack/
│   ├── build-log/                 ← learning-in-public thread + tracker
│   └── about/
│
├── engine/                        ← GTM engine architecture
│   ├── architecture/
│   ├── strategy/
│   ├── workflows/
│   ├── experiments/
│   └── decisions/
│
├── data/                          ← data model & audience design
│   ├── model.md
│   ├── audiences/
│   └── signals/
│
└── commercial/                    ← positioning & monetisation thinking
    ├── model.md
    └── positioning.md
```

---

## Build log

Every skill is logged here — timing, grades, and key learnings.
The honest record of what it takes to build an AI-native marketing capability from scratch.

| # | Skill | Function | Human time | AI time | Saving | Difficulty | Effectiveness |
|---|---|---|---|---|---|---|---|
| — | _first skill coming soon_ | | | | | | |

Full tracker: [content/build-log/tracker.md](./content/build-log/tracker.md)

---

## Roadmap

**v0.1 — Foundation** ✅
- Define GTM engine architecture
- Establish repository structure
- Build brand identity system

**v0.2 — Skills marketplace** 🟡 in progress
- Publish `_template.md` skill card standard
- Build and document first 5 skills
- Launch [gtmstack.ai](https://gtmstack.ai)

**v0.3 — Agents**
- Combine skills into end-to-end agents
- Document first full GTM workflow
- Publish demand gen agent

**v0.4 — Data layer**
- Build audience data model in Airtable
- Implement subscriber intake workflow
- Connect ElevenLabs to content pipeline

**v0.5 — Community**
- Open skill contributions
- Launch build-in-public newsletter via Beehiiv
- Establish community around shared learning

**v1.0 — AI-Native GTM Engine**
- Full skills library across all eight functions
- Complete agent suite
- Integrated data model and feedback loop
- Open platform for marketing leaders

---

## Built with

| Tool | Role |
|---|---|
| [Claude](https://claude.ai) | Primary AI — skills built and documented using Claude |
| [Claude Design](https://claude.ai) | Visual design system, prototypes, diagrams, and design outputs |
| [GitHub](https://github.com) | Source of truth for all content, code and brand |
| [Framer](https://framer.com) | gtmstack.ai website |
| [Canva](https://canva.com) | Social assets and newsletter publishing — fed by Claude Design |
| [Beehiiv](https://beehiiv.com) | Newsletter and audience capture |
| [ElevenLabs](https://elevenlabs.io) | Voice and audio content generation |
| [Airtable](https://airtable.com) | CRM and audience data |

---

## About

Built by [Matt Browning](./content/about/) — a B2B marketing leader with 20+ years across
demand gen, revenue ops, product marketing, and GTM strategy.

This is a learning exercise, a portfolio, and eventually a platform.
Everything is built in public. Nothing is polished before it's real.

→ [gtmstack.ai](https://gtmstack.ai)

---

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*
