# Typing Gesture Cognitive Operations Comparison

This report compares three BHE pipelines that use text input while representing distinct cognitive operations:

- `GapFillTyping`;
- `TransformationTyping`;
- `MemorizationTypingRecall`.

The point is to preserve the principle:

```txt
typing gesture
        !=
typing cognition
```

## 1. Common Gesture

All three pipelines share a visible interaction gesture:

- the learner types a textual answer;
- a `UserInput` contains text responses;
- an evaluator produces a `BHEResult`;
- feedback can pass through the shared feedback tail.

At the UI surface, these can look similar.

At the architecture level, they must remain distinct because each typed answer means something different.

## 2. Central Cognitive Difference

### GapFillTyping

```txt
contextual absence
-> constrained production
```

The learner completes missing content inside a context. The surrounding text constrains the answer.

### TransformationTyping

```txt
explicit source
-> deliberate operation
-> target
```

The learner modifies a visible source according to an operation. The typed response is meaningful because it is a transformation attempt.

### MemorizationTypingRecall

```txt
cue
-> retrieval attempt
-> target
```

The learner retrieves retained content from a cue. The typed response is meaningful because it tests active recall.

## 3. Input Data Differences

### GapFillSet / ContextualTypingData

GapFill starts from:

- `context`;
- blanks;
- expected answers;
- optional hints and feedback;
- sensitivity options.

`ContextualTypingData` becomes a sequence of text segments and blanks.

The data is contextual and positional.

### TransformationSet / TransformationInteractionData

Transformation starts from:

- explicit source;
- transformation type;
- instruction;
- expected target;
- accepted variants;
- hints and feedback.

`TransformationInteractionData` preserves:

```txt
source -> operation -> target
```

The data is directional and operation-aware.

### MemorizationSet / MemorizationTypingRecallData

Memorization starts from:

- recall goal;
- cue;
- target;
- accepted variants;
- hints;
- optional `ContentUnit` cue.

`MemorizationTypingRecallData` preserves:

```txt
cue -> target retrieval
```

The data is recall-oriented.

## 4. UserInput Differences

### ContextualTypingUserInput

```ts
{
  interactionMode: "typing";
  typedAnswers: {
    blankId: string;
    value: string;
  }[];
}
```

The input answers blanks.

### TransformationTypingUserInput

```ts
{
  kind: "transformation-typing";
  attempts: {
    itemId: string;
    value: string;
  }[];
}
```

The input records transformation attempts keyed by item.

### MemorizationTypingRecallUserInput

```ts
{
  kind: "memorization-typing-recall";
  attempts: {
    itemId: string;
    value: string;
  }[];
}
```

The input records recall attempts keyed by memorization item.

Transformation and Memorization share an `attempts` shape, but the semantics differ. One is operation application; the other is retrieval.

## 5. Evaluator Differences

### GapFillTyping

The evaluator produces `blankResults`:

- `blankId`;
- `value`;
- `expected`;
- `isCorrect`.

Scoring is per blank.

It supports `expected: string | string[]`.

It handles trim, case sensitivity, and accent sensitivity.

### TransformationTyping

The evaluator produces `itemResults`:

- `itemId`;
- `source`;
- `transformationType`;
- `instruction`;
- `actual`;
- `expected`;
- `accepted`;
- `isCorrect`.

Scoring is per transformation item.

It supports accepted variants and case-insensitive deterministic matching.

It keeps source -> operation -> target visible in details.

### MemorizationTypingRecall

The evaluator produces `itemResults`:

- `itemId`;
- `cueLabel`;
- `expectedTarget`;
- `acceptedTargets`;
- `actualAnswer`;
- `isCorrect`.

Scoring is per recall item.

It supports accepted variants and case-insensitive deterministic matching.

It keeps cue -> target retrieval visible in details.

### Shared Status Model

All three use:

- `success` when all are correct;
- `partial` when at least one is correct but not all;
- `failed` when none are correct.

This shared status model is useful, but it does not mean the evaluators should be collapsed.

## 6. What Could Be Mutualized Later

Several small helpers may become justified later:

- string normalization;
- deterministic exact matching;
- case-insensitive matching;
- accepted-answer matching;
- simple score / maxScore / completion calculation.

The feedback tail is already mutualized:

```txt
BHEResult
-> FeedbackData
-> DOM replacement
```

That remains the right level of shared behavior for now.

## 7. What Should Not Be Mutualized Now

Do not mutualize `InteractionData`.

Do not mutualize semantic `UserInput`.

Do not create a generic typing evaluator.

Do not create a generic typing renderer.

Do not create a registry.

Do not create a global typing abstraction.

The shared text gesture is not enough evidence for a shared pedagogical abstraction.

## 8. Final Recommendation

Recommendation: **A — create a tiny text normalization helper later, but not yet in this pass**.

The comparison shows one real repeated mechanic:

```txt
trim
-> case-insensitive comparison
-> accepted variants
```

However, this should be extracted only as a small utility, not as a generic typing engine.

The next healthy implementation step would be:

```txt
textMatching helper
```

with no knowledge of GapFill, Transformation, Memorization, UserInput, renderer, or pedagogy.

For now, no code should change from this report alone. The important architectural conclusion is:

> BHE can share low-level mechanics without erasing cognitive specificity.
