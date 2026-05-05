# Architecture

This folder contains the system maps and supporting notes that describe
the GTM Stack engine architecture.

The architecture defines how data, intelligence, orchestration, and activation
systems interact — and where marketing ownership sits within each layer.

---

## Current system map

**[gtmstack-system-map-v0.4.png](./gtmstack-system-map-v0.4.png)** — current rendered diagram.

> ⚠️ The v0.4 PNG still labels the Activation layer as **Framer**. The v0.5
> notes (below) supersede this — the website is now Next.js + Vercel. A v0.5
> diagram regeneration is open work for Claude Design.

The primary architecture diagram. Illustrates the five-layer engine:

```
Data → Intelligence → Orchestration → Activation → Feedback
  ↑___________________________________________________|
```

Includes ownership labels, risk callouts, and the full infrastructure layer.

**[gtmstack.ai-engine-system-map-v0.2-notes.md](./gtmstack.ai-engine-system-map-v0.2-notes.md)**

Supporting notes — layer-by-layer breakdown, infrastructure status, open
architectural decisions, and full version history (currently up to v0.5
in the notes; diagram still at v0.4 pending regeneration).

---

## Files

| File | Type | Version | Description |
|---|---|---|---|
| `gtmstack-system-map-v0.4.png` | Diagram | v0.4 | Rendered system map (Framer reference is stale) |
| `gtmstack.ai-engine-system-map-v0.2-notes.md` | Notes | v0.5 | Layer breakdown + ADRs + migration history |

---

## Versioning

Diagrams are versioned as separate files so the evolution of the
architecture is visible over time.

```
gtmstack-system-map-v0.4.png  ← current rendered diagram
gtmstack-system-map-v0.5.png  ← TODO: regenerate to reflect Next.js + Vercel
```

Notes files follow the same convention and are overwritten in place —
version history is tracked inside each file.

---

## Open architectural decisions

See the notes file for the full ADR log. Current open decisions:

| # | Decision | Priority |
|---|---|---|
| ADR-001 | Claude Cowork as workflow automation — scalability at v0.3+ | High |
| ADR-002 | ElevenLabs → Content Pipelines integration approach | Medium |
| ADR-004 | Feedback loop implementation approach | High |
| ADR-005 | Airtable schema design for audience data model | High |
| ADR-009 | Regenerate system-map diagram to v0.5 reflecting Next.js + Vercel | Medium |

---

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*
