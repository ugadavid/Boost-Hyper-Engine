# Authoring Route Realization Report

Date: 2026-06-23

Status: experimental authoring measurement.

This report documents a small extension of the Author Discovery Playground. The goal was not to create a new BHE concept, a new architecture, or a new routing layer. The goal was to measure how far already-understood authoring routes can reach into the real BHE system.

The tested chain was:

```txt
Author Intent
↓
Clarification
↓
Pedagogical Use
↓
RepresentationPath
↓
BHE Structure
↓
Renderer / Evaluator if available
```

## What was added

A new playground section was added:

```txt
Route Realization
```

It displays five routes discovered during recent authoring work and marks each route as:

```txt
exists completely
partially exists
missing pieces
```

The section is intentionally descriptive. It does not execute new activities, generate PedagogicalObjects, introduce a new Set, or modify core/runtime/renderer/evaluator code.

## Route A — Compare → Categories → ClassificationSet

```txt
Compare
↓
Categories
↓
ClassificationSet
↓
Classification drag/drop or QCM interaction
↓
Classification evaluator
```

Status:

```txt
partially exists
```

What exists:

- Compare clarification already routes Categories toward ClassificationSet.
- ClassificationSet exists in core.
- Classification interaction adapters exist.
- Classification DOM renderers exist.
- Classification evaluators exist.
- The Countable / Uncountable playground example already runs on a real BHE path.

What is missing:

- A visible authoring RepresentationPath for stable category comparison/classification.

Reading:

The BHE engine route is real. The authoring bridge is still incomplete because the path from Compare/Categories to ClassificationSet is visible in the playground but not yet documented as a dedicated RepresentationPath.

## Route B — Compare → Before / After Forms → TransformationSet

```txt
Compare
↓
Before / After Forms
↓
TransformationSet
↓
Transformation typing interaction
↓
Transformation evaluator
```

Status:

```txt
partially exists
```

What exists:

- Compare clarification already routes Before / After Forms toward TransformationSet.
- TransformationSet exists in core.
- A transformation typing adapter exists.
- A transformation typing DOM renderer exists.
- A transformation evaluator exists.
- The Passive Voice playground example already runs on a real BHE path.

What is missing:

- A visible authoring RepresentationPath connecting the Compare clarification to TransformationSet.

Reading:

The real BHE engine path is strong. As with ClassificationSet, the missing piece is not core capability but explicit author-facing routing.

## Route C — Produce → Recalled Target → MemorizationTypingRecall

```txt
Produce
↓
Recalled Target
↓
Recall Through Typing
↓
MemorizationTypingRecall
↓
Memorization evaluator
```

Status:

```txt
partially exists
```

What exists:

- Produce clarification already routes Recalled Target toward Recall Through Typing.
- Recall Through Typing exists as a RepresentationPath.
- MemorizationSet and MemorizationTypingRecallData exist.
- MemorizationTypingRecallUserInput exists.
- A memorization typing recall evaluator exists.

What is missing:

- A real DOM renderer for MemorizationTypingRecall.

Reading:

This route is more complete at the authoring and evaluation levels than the Compare routes, because the RepresentationPath is already present. The missing piece is the interactive rendering path.

## Route D — Reflect → Strategies → Reflect Through Selection → completed

```txt
Reflect
↓
Strategies
↓
Reflect Through Selection
↓
IdentificationSelectionData
↓
BHEResult.completed
```

Status:

```txt
partially exists
```

What exists:

- Reflect clarification already routes Strategies toward Reflect Through Selection.
- Reflect Through Selection exists as a RepresentationPath.
- IdentificationSet can act as a carrier for selectable reflective statements.
- IdentificationSelectionData and IdentificationSelectionUserInput exist.
- createCompletedResultFromUserInput reaches BHEResult.completed.
- FeedbackData.completed can be mounted.

What is missing:

- A real neutral reflective selection renderer.
- A stable convention for renderer behavior when selection is non-corrective.

Reading:

The result path is now real. The missing part is no longer `completed`; it is the UI/contract question around neutral reflective selection.

## Route E — Apply → Language in Context → Apply Through Situated Task

```txt
Apply
↓
Language in Context
↓
Apply Through Situated Task
↓
Contextual response
↓
Context-dependent result policy
```

Status:

```txt
missing pieces
```

What exists:

- Apply Through Situated Task exists as a RepresentationPath.
- The authoring route is understandable.
- ContextualTypingUserInput gives a possible carrier for submitted language.

What is missing:

- A concrete BHE structure for situated tasks.
- A renderer for situated contextual action.
- A general evaluation or completion convention for contextual success.

Reading:

This route is clear as an authoring intention but weak as a real engine route. It remains the least connected of the five routes tested here.

## Summary

Strict realization status:

```txt
exists completely: 0
partially exists: 4
missing pieces: 1
```

Engine-level reading:

```txt
ClassificationSet route: real engine path
TransformationSet route: real engine path
MemorizationTypingRecall route: real evaluator path, renderer missing
Reflective selection completed route: real result/feedback path, neutral renderer missing
Apply situated task route: mostly authoring-level
```

## Main discovery

The playground can already reach more of the real BHE system than it initially appeared to. Classification and transformation are especially strong at the core/renderer/evaluator level.

However, the complete authoring chain is stricter than engine availability. A route should not be considered fully realized merely because the core can represent it. It also needs an explicit author-facing path that makes the translation discoverable.

The recurring gap is therefore not always:

```txt
BHE cannot represent this.
```

It is often:

```txt
BHE can represent this,
but the authoring bridge is still implicit.
```

## Answer to the central question

Question:

```txt
How much of the playground
can already reach the real BHE system?
```

Answer:

Several routes can already touch real BHE structures, and two tested routes already reach mature renderer/evaluator pipelines. But none of the five tested routes is fully realized across the entire authoring chain when judged strictly from intent to explicit RepresentationPath to engine execution.

The current state is therefore:

```txt
understood
↓
partially real
```

with the strongest real paths around ClassificationSet and TransformationSet, and the weakest current path around Apply Through Situated Task.

## Files changed

Created:

- `docs/architecture/20260623_authoring-route-realization-report.md`

Modified:

- `packages/authoring/src/AuthorDiscoveryPlayground.ts`
- `packages/authoring/author-discovery-playground.html`

No core, runtime, renderer, or evaluator files were modified.

## Rollback

Rollback is simple:

1. Remove the `Route Realization` data and render function from `packages/authoring/src/AuthorDiscoveryPlayground.ts`.
2. Remove the associated CSS from `packages/authoring/author-discovery-playground.html`.
3. Delete this report if the experiment is abandoned.

No runtime or core migration is involved.
