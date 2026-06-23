# Memorization Typing Recall Renderer Report

Date: 2026-06-23

Status: V0 specialized DOM renderer.

This report documents the missing renderer built for:

```txt
MemorizationTypingRecall
```

The goal was to complete the route:

```txt
Produce
↓
Recalled Target
↓
Recall Through Typing
↓
MemorizationTypingRecall
```

without creating a new Set, concept, evaluator, runtime path, or architecture.

## What was created

A new specialized DOM renderer was added:

```txt
packages/renderer/renderers/memorizationTypingRecallDomRenderer.ts
```

It renders a `MemorizationSet` through the existing adapter:

```txt
memorizationToTypingRecallData
```

and preserves the intended cognitive relation:

```txt
cue
↓
retrieval attempt
↓
target
```

## Behavior

For each recall item, the renderer displays:

- `cueLabel`;
- a typed input field;
- a lightweight hint when available.

On `Check`, it:

1. builds a real `MemorizationTypingRecallUserInput`;
2. calls the existing `evaluateMemorizationTypingRecall`;
3. applies item-level correct/incorrect classes;
4. mounts feedback using the existing `mountFeedbackFromResult` helper.

On `Reset`, it:

1. clears typed fields;
2. removes item-level classes;
3. clears item-level feedback;
4. clears global feedback.

## Conventions reused

The renderer follows the same local pattern as existing specialized DOM renderers:

```txt
PedagogicalObject
↓
adapter to InteractionData
↓
DOM interaction
↓
UserInput
↓
existing evaluator
↓
mounted feedback
```

Conventions reused:

- specialized DOM renderer shape;
- `RendererDefinition` with `render` and `renderDom`;
- adapter-first conversion from pedagogical object to interaction data;
- local DOM state;
- `aria-live` feedback areas;
- existing evaluator call;
- existing `mountFeedbackFromResult`.

## Why this renderer is specialized

This renderer is intentionally not a generic typing renderer.

BHE already distinguishes several typed interactions:

- GapFill typing;
- Transformation typing;
- Reflective typing;
- Memorization typing recall.

They share a physical gesture, but not the same cognitive relation.

This renderer is specific to:

```txt
cue
↓
typed retrieval attempt
↓
expected target
```

It does not model blanks, transformations, explanations, or free reflection.

## Why flashcards were not enough

Flashcards support:

```txt
cue
↓
reveal target
```

or possibly:

```txt
prediction
↓
self-check
```

But `MemorizationTypingRecall` requires:

```txt
cue
↓
typed attempt captured as UserInput
↓
evaluateMemorizationTypingRecall
↓
BHEResult
```

The renderer therefore does not reveal the answer before an attempt and does not treat reveal/self-check as equivalent to typed recall.

## Playground integration

The Author Discovery Playground now imports the renderer and uses it in the Produce validation example:

```txt
Memorising Vocabulary
↓
Recalled Target
↓
Recall Through Typing
↓
MemorizationTypingRecall
```

A local `MemorizationSet` demo was added to the playground, following the same pattern as the Countable / Uncountable and Passive Voice real examples.

## Route Realization update

Route C now has every required link:

```txt
Produce
↓
Recalled Target
↓
Recall Through Typing
↓
RepresentationPath: recall-through-typing
↓
MemorizationSet
↓
MemorizationTypingRecallData
↓
MemorizationTypingRecallUserInput
↓
memorizationTypingRecallDomRenderer
↓
evaluateMemorizationTypingRecall
↓
BHEResult.success | partial | failed
```

Verdict:

```txt
exists completely
```

New strict Route Realization count:

```txt
exists completely: 3
partially exists: 1
missing pieces: 1
```

## Files changed

Created:

- `packages/renderer/renderers/memorizationTypingRecallDomRenderer.ts`
- `docs/architecture/20260623_memorization-typing-recall-renderer-report.md`

Modified:

- `packages/authoring/src/AuthorDiscoveryPlayground.ts`
- `packages/authoring/author-discovery-playground.html`

No core concept, Set, evaluator, runtime path, or architecture was created.

## Verdict

The route becomes genuinely complete.

This is no longer only:

```txt
RepresentationPath
↓
Evaluator
```

It is now:

```txt
RepresentationPath
↓
Renderer
↓
UserInput
↓
Evaluator
↓
Feedback
```

The third complete route is therefore:

```txt
Produce
↓
Recalled Target
↓
Recall Through Typing
↓
MemorizationTypingRecall
```
