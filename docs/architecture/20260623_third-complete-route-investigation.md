# Third Complete Route Investigation

Date: 2026-06-23

Status: investigation only.

Candidate route:

```txt
Produce
↓
Recalled Target
↓
Recall Through Typing
↓
MemorizationTypingRecall
```

This investigation checks whether the route can become the third fully realized route in the Author Discovery Playground without creating a new renderer, evaluator, Set, core concept, runtime path, or architecture.

## Current route

The intended complete chain would be:

```txt
Produce
↓
Recalled Target
↓
Recall Through Typing
↓
MemorizationSet
↓
MemorizationTypingRecallData
↓
MemorizationTypingRecallUserInput
↓
Renderer
↓
evaluateMemorizationTypingRecall
↓
BHEResult.success | partial | failed
```

## What already exists

### Authoring

The authoring bridge already exists.

The Produce clarification path contains:

```txt
Recalled Target
↓
Recall Through Typing
↓
MemorizationTypingRecall
```

The `recall-through-typing` RepresentationPath already documents:

```txt
MemorizationTypingRecallData
MemorizationTypingRecallUserInput
evaluateMemorizationTypingRecall
BHEResult.success | partial | failed
```

Unlike the first two complete routes, the missing piece is not the RepresentationPath.

### Core

`MemorizationSet` exists in core.

It carries:

- a `recallGoal`;
- cue/target items;
- optional accepted variants;
- optional hints;
- optional structured cue content.

### Adapter

The core adapter exists:

```txt
memorizationToTypingRecallData
```

It maps:

```txt
MemorizationSet
↓
MemorizationTypingRecallData
```

and preserves the cue-to-target retrieval relation.

### InteractionData

`MemorizationTypingRecallData` exists.

It contains:

```txt
recallGoal
items:
  itemId
  cueLabel
  expectedTarget
  acceptedTargets
  hint
```

This is the right data shape for active recall: the learner sees a cue and must retrieve a target.

### UserInput

`MemorizationTypingRecallUserInput` exists.

It carries:

```txt
kind: memorization-typing-recall
attempts:
  itemId
  value
```

This is the right input shape for typed retrieval attempts.

### Evaluator

The evaluator exists:

```txt
evaluateMemorizationTypingRecall
```

It compares typed attempts against expected or accepted targets and returns:

```txt
BHEResult.success | partial | failed
```

with score, maxScore, completion, and item-level details.

## Renderer search

Existing renderer evidence shows flashcard renderers, but not a typing recall renderer.

Available flashcard-related pieces include:

```txt
memorizationToFlashcardsData
associationFlashcardsDomRenderer
associationFlashcardsHtmlRenderer
```

The memorization flashcard adapter can map:

```txt
MemorizationSet
↓
FlashcardsData
```

But the DOM flashcard renderer found in the current renderer package is association-specific:

```txt
AssociationSet
↓
associationToFlashcardsData
↓
associationFlashcardsDomRenderer
```

Even if a memorization flashcard surface were used, it would not be equivalent to `MemorizationTypingRecall`.

## Question 1 — Is an existing renderer sufficient?

Answer:

```txt
No.
```

Flashcards are not sufficient for this route.

They support:

```txt
cue
↓
reveal target
```

or possibly:

```txt
prediction before reveal
↓
self-check
```

But the current `MemorizationTypingRecall` path requires:

```txt
cue
↓
typed attempt captured as UserInput
↓
evaluateMemorizationTypingRecall
↓
BHEResult
```

The available flashcard renderer does not capture `MemorizationTypingRecallUserInput`, does not call `evaluateMemorizationTypingRecall`, and does not produce the typed recall loop.

Treating flashcards as sufficient would collapse a useful distinction already made in the documentation:

```txt
review / reveal / self-check
```

versus:

```txt
active typed recall with evaluator evidence
```

## Question 2 — Is the missing piece really a renderer?

Answer:

```txt
Mostly yes.
```

The core path is present.

The data path is present.

The UserInput path is present.

The evaluator path is present.

The authoring path is present.

The missing piece is the interactive surface that:

1. renders a cue;
2. lets the learner type a retrieval attempt;
3. creates `MemorizationTypingRecallUserInput`;
4. calls `evaluateMemorizationTypingRecall`;
5. mounts feedback from the resulting `BHEResult`.

That is a renderer-level gap.

There is a secondary naming/design caution: the renderer should probably not be a generic typing renderer. Existing reports on typing gestures warn that GapFill, Transformation, Reflection, and Memorization typing preserve different cognitive relations. A future renderer should keep the recall relation visible.

## Question 3 — Can the route be completed without a new renderer?

Answer:

```txt
No, not honestly.
```

Without a renderer, the chain cannot be completed as an interactive BHE route.

The route can already be completed up to:

```txt
RepresentationPath
↓
MemorizationTypingRecallData
↓
MemorizationTypingRecallUserInput
↓
evaluateMemorizationTypingRecall
↓
BHEResult.success | partial | failed
```

But it cannot yet be completed as:

```txt
Author opens activity
↓
renderer presents cue
↓
learner types recall attempt
↓
renderer produces UserInput
↓
evaluator produces BHEResult
```

using only existing renderer code.

## Comparison with the first two complete routes

The first two complete routes were completed by materializing an authoring bridge:

```txt
Compare / Categories
↓
ClassificationSet
```

and:

```txt
Compare / Before-After Forms
↓
TransformationSet
```

In both cases, the renderer and evaluator already existed.

For `MemorizationTypingRecall`, the situation is inverted:

```txt
authoring bridge exists
evaluator exists
renderer missing
```

So the same strategy cannot produce the third complete route.

## Verdict

Verdict:

```txt
still partial
```

Reason:

The route is not merely hidden. It is genuinely incomplete at the renderer level.

The closest existing UI family, flashcards, does not satisfy the typed recall contract because it does not capture a typed attempt as `MemorizationTypingRecallUserInput` and does not call the memorization typing evaluator.

## Recommendation

Do not mark this route as complete yet.

If implementation is attempted later, the smallest honest missing piece would be a specialized renderer for:

```txt
MemorizationTypingRecall
```

It should likely follow the proven pattern of existing specialized renderers:

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

But that would be a new renderer, so it is outside the scope of this investigation.

## Route Realization impact

No Route Realization status should change as a result of this investigation.

The current status should remain:

```txt
Produce
↓
Recalled Target
↓
Recall Through Typing
↓
MemorizationTypingRecall
↓
partially exists
```

The overall strict count remains:

```txt
exists completely: 2
partially exists: 2
missing pieces: 1
```
