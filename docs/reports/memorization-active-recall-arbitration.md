# Memorization Active Recall Arbitration

This report decides whether `MemorizationSet` should remain at the passive flashcards POC stage for now, or whether BHE should test a second controlled greffe around active recall.

## A. Stay On FlashcardsData Only

### Advantages

Flashcards are the smallest useful stress test for memorization.

They validate:

- `MemorizationSet` as a distinct pedagogical object;
- `recallGoal`;
- cue -> target structure;
- adapter-level transformation into existing `FlashcardsData`;
- reuse of a familiar interaction shape without creating an evaluator.

They also keep the greffe extremely controlled.

### Limits

Flashcards mostly test reveal and recognition. They do not prove that the learner can actively retrieve the target.

They do not capture:

- typed recall;
- correctness;
- hesitation;
- self-assessed confidence;
- memory strength;
- review history.

### What This Already Validates

The flashcards POC validates that `MemorizationSet` is not just `AssociationSet`.

Its core intention is:

```txt
retain / retrieve
```

not:

```txt
relate entries
```

### What This Does Not Validate

It does not validate active recall.

It does not validate evaluation.

It does not validate future spaced repetition signals.

It does not test whether memorization needs accepted variants or normalization.

## B. Create TypingRecallData + UserInput + Evaluator Console-only

### Advantages

Typing recall is cognitively stronger than reveal-based flashcards.

The learner must retrieve the answer before seeing it. This tests:

```txt
cue
-> active recall
-> typed attempt
-> deterministic check
```

It would clarify whether `MemorizationSet` needs its own return loop:

```txt
MemorizationSet
-> TypingRecallData
-> MemorizationTypingUserInput
-> evaluateMemorizationTypingRecall
-> BHEResult
```

### Limits

It introduces evaluator questions immediately:

- exact matching;
- normalization;
- case sensitivity;
- accent sensitivity;
- accepted variants;
- spelling tolerance;
- blank answers.

### Risks

The main risk is collapsing Memorization into another typing object.

Typing recall can look like `GapFillSet`, but GapFill is:

```txt
contextual absence -> constrained production
```

Typing recall can also look like `TransformationSet`, but Transformation is:

```txt
explicit source -> deliberate operation -> target
```

Memorization typing should remain:

```txt
cue -> retrieval attempt -> target
```

The evaluator should stay simple and deterministic. No NLP, no fuzzy memory scoring, no scheduling.

### Accepted Variants And Normalization

Typing recall probably needs accepted variants sooner than flashcards.

However, this should be item-level pedagogical data, not evaluator invention.

Normalization should likely mirror existing V0 patterns:

- trim;
- case-insensitive by default;
- accent-insensitive only if the model supports it.

## C. Create SelfEvaluationData Before TypingRecall

### Advantages

Self-evaluation matches real memorization practice.

The learner may mark:

- known;
- unsure;
- not known.

This is also close to future spaced repetition, because confidence and recall status often drive review scheduling.

### Limits

Self-evaluation is subjective.

It does not prove recall correctness.

It may introduce runtime memory-state concepts before BHE is ready:

- history;
- confidence;
- next review;
- scheduling;
- retention state.

### Link With Future Spaced Repetition

Self-evaluation is probably important later, but it risks pulling the project toward spaced repetition too early.

`MemorizationSet` should first prove its cognitive shape without becoming a review engine.

## D. Wait And Move To Another Chantier

### Advantages

Waiting avoids premature expansion.

The flashcards POC is already a useful minimal validation.

### Limits

The central memorization question remains half-tested.

Flashcards validate exposure and reveal, but not retrieval.

If BHE wants to treat memorization as a cognitive primitive, active recall is the next meaningful pressure test.

## Key Distinctions

Exposure:

```txt
learner sees content
```

Recognition:

```txt
learner recognizes the target when shown
```

Recall:

```txt
learner retrieves the target without seeing it
```

Self-evaluation:

```txt
learner judges whether retrieval was successful
```

Active recall is stronger than simple reveal because the learner must reconstruct the target before feedback.

## Avoiding A Spaced Repetition Engine

The next greffe must not include:

- scheduling;
- review intervals;
- memory strength;
- ease factors;
- long-term history;
- next-review calculation.

Those belong to a future runtime layer, not to the first active recall POC.

## Preserving Difference With AssociationSet

The key distinction remains:

```txt
AssociationSet = relation between entries
MemorizationSet = retention and retrieval of target content
```

Even if flashcards appear in both, `MemorizationSet` must keep recall intent visible through `recallGoal`, cue, target, and future recall attempts.

## Recommendation

Recommendation: **B — create TypingRecallData + UserInput + evaluator console-only**, but keep it extremely small.

The next controlled step should test active recall without renderer or scheduling:

```txt
MemorizationSet
-> TypingRecallData
-> MemorizationTypingRecallUserInput
-> evaluateMemorizationTypingRecall
-> BHEResult
```

Do not create a renderer.

Do not create spaced repetition.

Do not create self-evaluation yet.

Do not generalize typing.

The goal is only to answer:

> Can MemorizationSet support active retrieval as a distinct cognitive operation?
