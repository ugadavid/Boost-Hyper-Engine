# Reflective Selection Renderer Report

Date: 2026-06-23

Status: V0 specialized DOM renderer.

This report documents the renderer built for:

```txt
Reflect Through Selection
```

The goal was to complete the route:

```txt
Reflect
↓
Strategies
↓
Reflect Through Selection
↓
completed
```

without creating a new Set, core concept, evaluator, runtime path, or architecture.

## What was missing

Previous work had already validated the result path:

```txt
IdentificationSelectionUserInput
↓
createCompletedResultFromUserInput
↓
BHEResult.completed
↓
FeedbackData.completed
```

The missing piece was:

```txt
neutral reflective selection renderer
```

The existing `identificationSelectionDomRenderer` is corrective. It says:

```txt
Select the correct target
Check
Correct / extra / missing
success | partial | failed
```

That is appropriate for identification, but wrong for reflective self-positioning.

## What was created

A new specialized DOM renderer was added:

```txt
packages/renderer/renderers/reflectiveSelectionDomRenderer.ts
```

It renders an existing `IdentificationSet` as a neutral reflective selection surface.

It uses:

- `identificationToSelectionData`;
- `IdentificationSelectionUserInput`;
- `createCompletedResultFromUserInput`;
- `mountFeedbackFromResult`.

It does not use:

- `evaluateIdentificationSelection`;
- expected target checking;
- score;
- correct/incorrect item states.

## Behavior

The renderer displays:

```txt
Select the statements that describe you
```

or, for single selection:

```txt
Select the statement that best describes you
```

On `Complete`, it:

1. reads selected target ids;
2. constructs a real `IdentificationSelectionUserInput`;
3. calls `createCompletedResultFromUserInput`;
4. receives a real `BHEResult.completed`;
5. mounts feedback through the existing feedback helper.

On `Reset`, it:

1. clears selected options;
2. clears feedback.

## Why this renderer is specialized

This renderer is not a generic selection framework.

It exists because the same selection mechanics can carry a different pedagogical contract:

```txt
corrective identification
```

versus:

```txt
reflective self-positioning
```

The renderer deliberately keeps the non-corrective contract visible:

- button label: `Complete`, not `Check`;
- no correct answer language;
- no wrong answer language;
- no score;
- no evaluator call;
- feedback status: `completed`.

## Why the existing IdentificationSelection renderer was not changed

The existing renderer remains valuable as a corrective renderer.

Changing it to support both corrective and reflective contracts would have risked mixing two different meanings behind one renderer:

```txt
select correct targets
```

and:

```txt
select statements that describe you
```

The safer V0 is therefore a small separate renderer that shares the existing data carrier but not the corrective evaluator.

## Playground integration

The Author Discovery Playground now uses the renderer in the Thinking in English real example:

```txt
Thinking in English
↓
Strategies
↓
Reflect Through Selection
↓
completed
```

The previous authoring-only checkbox UI was removed from that example and replaced with:

```txt
renderReflectiveSelectionDom(thinkingInEnglishIdentificationSet)
```

## Route Realization update

Route D now has every required link:

```txt
Reflect
↓
Strategies
↓
Reflect Through Selection
↓
RepresentationPath: reflect-through-selection
↓
IdentificationSet
↓
IdentificationSelectionData
↓
IdentificationSelectionUserInput
↓
reflectiveSelectionDomRenderer
↓
createCompletedResultFromUserInput
↓
BHEResult.completed
↓
FeedbackData.completed
```

Verdict:

```txt
exists completely
```

New strict Route Realization count:

```txt
exists completely: 4
partially exists: 0
missing pieces: 1
```

## Remaining limits

This does not create a broad reflective framework.

It only completes the specific route:

```txt
selection
↓
completed
↓
feedback
```

for reflective selection over selectable statements.

It also does not solve:

- reflective typing UI;
- diagnostic selection policies;
- a future shared neutral selection surface;
- runtime-level result policy orchestration.

## Files changed

Created:

- `packages/renderer/renderers/reflectiveSelectionDomRenderer.ts`
- `docs/architecture/20260623_reflective-selection-renderer-report.md`

Modified:

- `packages/authoring/src/AuthorDiscoveryPlayground.ts`
- `packages/authoring/author-discovery-playground.html`

No core concept, Set, evaluator, runtime path, or architecture was created.

## Verdict

The route becomes genuinely complete.

The fourth complete route is:

```txt
Reflect
↓
Strategies
↓
Reflect Through Selection
↓
completed
```

The key lesson is that this route did not need a new evaluator. It needed a renderer whose learner-facing contract matched the already-existing non-corrective result path.
