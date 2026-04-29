# System Map — Architecture Notes

**Current version:** v0.1.3
**Last updated:** April 2026
**Author:** Matt Browning
**Diagram:** [GTMStack System Map v0.1](./gtmstack.ai-system-map-v0.1.jpg)

---

## Overview

The AI-Native GTM Engine is structured around five layers, each representing
a capability that marketing must understand and partially own.

The feedback loop connecting Feedback back to Data is the most critical
architectural feature — without it, the engine runs open-loop and cannot improve.

Skills and agents are the intelligence layer made actionable. They sit between
raw LLM processing and orchestration — Claude doesn't just process, it processes
*through a skill*. This is why Skills/Agents appears explicitly in the
Intelligence layer rather than only in the repo structure.

---

## The five layers

### Layer 1 — Data
**Ownership:** Shared (Marketing + Ops)
**Current risk:** Poor schema

| Component | Tool | Notes |
|---|---|---|
| CRM / Audience Data | Airtable v0 | Schema redesign is priority #1 |
| Website Analytics | TBC | |
| Subscriber Data | Beehiiv | |
| Product / Market Data | — | |
| External Signals | — | |

**Priority action:** Airtable schema design should be the first Data layer skill built.
Downstream intelligence quality depends entirely on what feeds into it.

---

### Layer 2 — Intelligence
**Ownership:** Shared (Marketing + Engineering)
**Current risk:** Weak context

| Component | Tool | Notes |
|---|---|---|
| LLM Processing | Claude | Claude-only — primary and confirmed |
| Skills / Agents | gtmstack skills library | Intelligence layer made actionable |
| Enrichment | TBC | |
| Classification | TBC | |
| Scoring | TBC | |
| Insight Generation | TBC | |

**Notes:**
Skills and agents sit here because they are how Claude's intelligence is
structured and directed. A raw prompt is not a skill. A skill is a
constrained, repeatable, documented use of Claude against a specific
marketing problem. This is the core of what gtmstack.ai builds.

Context quality is the leverage point. Well-constrained, context-rich prompts
directly determine output quality — this is where the skills marketplace
has the highest impact per skill built.

---

### Layer 3 — Orchestration
**Ownership:** Marketing
**Current risk:** Centralised bottleneck

| Component | Tool | Notes |
|---|---|---|
| Workflow Automation | Claude Cowork | Beta — see open decisions |
| Triggers | TBC | |
| API Routing | TBC | |
| Content Pipelines | + ElevenLabs | Audio/voice content generated here |
| CRM Sync | Airtable | |

**Notes:**
ElevenLabs connects into Content Pipelines — voice and audio content
is generated at this layer and flows downstream to Newsletter and
LinkedIn Distribution in Activation.

Claude Cowork is the current workflow automation tool. It is a beta product
and may not scale to full API-level orchestration. This is logged as an
open architectural decision.

---

### Layer 4 — Activation
**Ownership:** Marketing

| Component | Tool | Notes |
|---|---|---|
| gtmstack.ai Website | Framer | Primary public surface |
| Skills Marketplace | Framer | The browsable library of skill cards |
| Newsletter | Beehiiv | |
| LinkedIn Distribution | — | |
| Operator Playbooks | Marketing-owned | Agent-level, end-to-end workflows |
| Audience Capture | Beehiiv + Framer | |

**Notes:**
The Skills Marketplace is the core product as it appears on the public site —
a live, browsable library of skill cards organised by marketing function.

Operator Playbooks are the agent-level outputs — documented workflows that
a marketing leader can run end-to-end without engineering support.

---

### Layer 5 — Feedback
**Ownership:** Marketing
**Current risk:** No learning loop

| Component | Notes |
|---|---|
| Workflow Results | |
| Content Performance | |
| Engagement Signals | Beehiiv metrics are the most accessible starting point |
| Subscriber Growth | |
| Experiments | |
| Iteration Decisions | |

**Notes:**
The feedback-to-data loop (dashed line returning to Layer 1) is the most
important architectural feature and the hardest to build. Without it, every
workflow is a one-shot execution rather than a compounding system.

Address the learning loop risk at v0.4 as part of the data layer build.

---

## Infrastructure

| Tool | Role | Status | Notes |
|---|---|---|---|
| Framer | Website + Skills Marketplace | ✅ Active | |
| Beehiiv | Newsletter + audience capture | ✅ Active | |
| ElevenLabs | Voice + audio content | ✅ Active | Needs connecting to Content Pipelines |
| Airtable | CRM + audience data | 🟡 v0 | Schema redesign needed |
| Claude | Primary LLM | ✅ Active | Claude-only confirmed |
| GitHub | Source of truth | ✅ Active | |
| Namecheap | DNS | ✅ Active | |

---

## Open architectural decisions

| # | Decision | Status | Priority |
|---|---|---|---|
| ADR-001 | Claude Cowork as workflow automation — scalability at v0.3+ | 🔴 Open | High |
| ADR-002 | ElevenLabs → Content Pipelines integration approach | 🟡 In progress | Medium |
| ADR-003 | Fix infrastructure label: OpenAI / Claude → Claude | ✅ Resolved | — |
| ADR-004 | Feedback loop implementation approach | 🔴 Open | High (v0.4) |
| ADR-005 | Airtable schema design — data model for audiences | 🔴 Open | High (v0.3) |

---

## Version history

| Version | Date | Changes |
|---|---|---|
| v0.1 | April 2026 | Initial system map published |
| v0.1.1 | April 2026 | ElevenLabs added to infrastructure; n8n flagged for removal |
| v0.1.2 | April 2026 | Skills/Agents added to Intelligence layer; LLM Processing confirmed Claude-only; Claude Cowork added to Orchestration; Open Lab renamed to Skills Marketplace in Activation |
| v0.1.3 | April 2026 | Infrastructure label updated: OpenAI / Claude → Claude. Diagram now fully consistent. ADR-003 closed. |

---

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*
