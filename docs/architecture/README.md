# Architecture

This folder contains the system maps and supporting notes that describe
the GTM Stack engine architecture.

The architecture defines how data, intelligence, orchestration, and activation
systems interact — and where marketing ownership sits within each layer.

---

## Current system map

**[gtmstack-system-map-v0.1.jpg](./gtmstack-system-map-v0.1.jpg)**

The primary architecture diagram. Illustrates the five-layer engine:

```
Data → Intelligence → Orchestration → Activation → Feedback
  ↑___________________________________________________|
```

Includes ownership labels, risk callouts, and the full infrastructure layer.

**[gtmstack.ai-engine-system-map-v0.1-notes.md](./gtmstack.ai-engine-system-map-v0.1-notes.md)**

Supporting notes for v0.1 — layer-by-layer breakdown, infrastructure
status, open architectural decisions, and full version history.

---

## Files

| File | Type | Version | Description |
|---|---|---|---|
| `gtmstack-system-map-v0.1.jpg` | Diagram | v0.1.3 | Primary system architecture |
| `gtmstack.ai-engine-system-map-v0.1-notes.md` | Notes | v0.1.3 | Layer breakdown + ADRs |

---

## Versioning

Diagrams are versioned as separate files so the evolution of the
architecture is visible over time.

```
gtmstack-system-map-v0.1.jpg   ← current
gtmstack-system-map-v0.2.jpg   ← next milestone
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

---

*>_ gtmstack.ai — Unfiltered AI marketing. Built live.*
