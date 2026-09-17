# Phase 3 — Generate a PRD per Feature

Write one PRD markdown file **per feature** approved in Phase 2, plus **one overview file** that indexes every PRD so progress across the epic can be tracked from a single place. The PRD is the single source of truth for the engineering team and is what a technical specification will later be generated from.

## File path

Write the files flat into the **Doc Directory** (see `references/PROJECT_OVERVIEW.md`, defaults to `/docs`) — no sub-folders:

```
<Doc Directory>/yyyy-mm-dd-<summary>-prd.md
```

- `yyyy-mm-dd` = date the PRD is written (e.g. `2026-08-07`)
- `<summary>` = kebab-case slug of the feature name (max 6 words, lowercase, no special chars)

**Example:** `/docs/2026-08-07-self-serve-assessment-creation-prd.md`

## PRD template

```markdown
# <Feature Name>

## Epic

- **Epic PRD:** <link or path to the parent epic document, or the ticket ID/URL>
- **Epic Architecture:** <link or path if one exists, otherwise `N/A`>

## Goal

**Problem:** <3–5 sentences describing the user problem or business need this feature addresses>

**Solution:** <how this feature solves that problem>

**Impact:** <expected outcomes or metrics to be improved — e.g. user engagement, conversion rate, time-to-complete>

## User Personas

<the target user(s) for this feature, and what each one is trying to accomplish>

## User Stories

- As a `<user persona>`, I want to `<perform an action>` so that I can `<achieve a benefit>`.
- ...

<cover the primary paths and the edge cases>

## Requirements

### Functional Requirements

- <what the system must do — specific, unambiguous, observable behaviour>
- ...

### Non-Functional Requirements

- <constraints and quality attributes: performance, security, accessibility, data privacy>
- ...

## Acceptance Criteria

### <User story or requirement it covers>

- [ ] Given <context>, when <action>, then <observable outcome>
- [ ] ...

### <Next user story or requirement>

- [ ] ...

## Out of Scope

- <what is explicitly not included in this feature>
- ...
```

## Overview file

After the individual PRDs are written, write **one** overview file that links to all of them:

```
<Doc Directory>/yyyy-mm-dd-<epic-summary>-prd-overview.md
```

- `<epic-summary>` = kebab-case slug of the **epic** name (max 6 words)
- Same date as the PRDs, same flat Doc Directory — so links are plain sibling paths (`./<file>.md`)

**Example:** `/docs/2026-08-07-performance-review-cycle-prd-overview.md`

### Overview template

```markdown
# <Epic Name> — PRD Overview

- **Epic:** <ticket ID / URL, or `N/A`>
- **Created:** yyyy-mm-dd
- **Features:** <n> · **Done:** <n> · **In progress:** <n> · **Not started:** <n>

## Summary

<2–4 sentences: what this epic delivers and for whom>

## Feature PRDs

| #   | Feature                        | PRD                                                       | Personas            | Depends On | Ticket | Status         |
| --- | ------------------------------ | --------------------------------------------------------- | ------------------- | ---------- | ------ | -------------- |
| 1   | Self-serve assessment creation | [PRD](./2026-08-07-self-serve-assessment-creation-prd.md) | Team Manager        | —          | —      | ⬜ Not started |
| 2   | Assessment results dashboard   | [PRD](./2026-08-07-assessment-results-dashboard-prd.md)   | Team Manager, Admin | #1         | —      | ⬜ Not started |

**Status legend:** ⬜ Not started · 🚧 In progress · ✅ Done

## Delivery Order

<the order features should be picked up, derived from the Depends On column — call out anything that can run in parallel>

1. #1 Self-serve assessment creation
2. #2 Assessment results dashboard _(blocked by #1)_

## Deferred to a later epic

- <features raised in Phase 2 but explicitly out of this epic>

## Open Questions

- [ ] <ambiguity flagged in Phase 1 or 2 that is still unresolved, and who needs to answer it>
```

### Overview rules

- **Rows mirror Phase 2 exactly** — same numbering, same feature names, same dependencies. If a feature was split or merged after Phase 2, renumber both here and in the PRDs
- **Every feature has a row** — an unlinked PRD is a tracking hole
- **Ticket column starts as `—`** and is filled in by Phase 4 once tickets exist
- **Status starts as ⬜ Not started** for every feature; it is maintained by hand afterwards
- **Open Questions is never dropped** — if there are none, write `- None`

## Rules

- **One file per feature** — do not merge several features into a single PRD
- **One overview file per epic** — regenerate it whenever features are added, split, or removed
- **No implementation detail** — no schemas, endpoints, libraries, file names, or architecture. If a requirement can only be stated in technical terms, restate it as observable behaviour
- **Every user story gets acceptance criteria** — a story with no AC is unfinished
- **Out of Scope is never empty** — if nothing is excluded, say so explicitly and note the boundary with adjacent features
- Cross-reference sibling features by their PRD path when a dependency exists

## After writing

Present a summary of what was written:

```markdown
## 📄 PRDs Generated

| #   | Feature                        | Path                                                   |
| --- | ------------------------------ | ------------------------------------------------------ |
| 1   | Self-serve assessment creation | /docs/2026-08-07-self-serve-assessment-creation-prd.md |
| 2   | Assessment results dashboard   | /docs/2026-08-07-assessment-results-dashboard-prd.md   |

**Overview:** /docs/2026-08-07-performance-review-cycle-prd-overview.md
```

Then ask: _"PRDs saved ✅ — track them from the overview file. Shall I proceed to create the feature tickets in your ticket system?"_
