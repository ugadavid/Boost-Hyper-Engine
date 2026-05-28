# Memorization Flashcards Adapter Report

## Files Created / Modified

Created:

- `packages/core/types/MemorizationSet.ts`;
- `packages/renderer/adapters/memorizationToFlashcardsAdapter.ts`;
- `examples/memorization-flashcards-adapter-example.ts`.

Modified:

- `packages/core/types/PedagogicalType.ts`;
- `packages/core/types/PedagogicalFamily.ts`;
- `packages/core/types/index.ts`.

## 1. Why FlashcardsData Is A Good First Stress Test

Flashcards are the smallest useful interaction shape for testing memorization.

They can represent:

```txt
cue
-> recall target
```

without requiring an evaluator, renderer, spaced repetition scheduler, or self-evaluation system.

This makes them a good controlled stress test for the question:

> Is MemorizationSet more than AssociationSet in disguise?

## 2. How MemorizationSet Differs From AssociationSet

`AssociationSet` models relations between entries.

`MemorizationSet` models retention and retrieval intent.

The V0 shape includes:

- `recallGoal`;
- `items`;
- `cue`;
- `target`;
- optional `unit`;
- optional `hint`.

The key difference is cognitive:

```txt
AssociationSet = what belongs with what?
MemorizationSet = can the learner retain and retrieve this?
```

Even if both can become flashcards, they do not represent the same pedagogy.

## 3. V0 Limits Accepted

This V0 is intentionally small.

It does not evaluate recall.

It does not capture self-assessment.

It does not implement spaced repetition.

It does not create a renderer.

It does not schedule reviews.

It does not model memory strength, history, or forgetting.

It uses text-only `FlashcardsData`, with `ContentUnit` converted to a fallback text representation when present.

## 4. Why Evaluation And Spaced Repetition Are Deferred

Evaluation would introduce questions about exact recall, accepted variants, hints, failed recall, and self-reported confidence.

Spaced repetition would introduce runtime concerns:

- review history;
- intervals;
- scheduling;
- ease;
- forgetting;
- next review selection.

Those are important, but they are not needed to test whether `MemorizationSet` is a distinct primitive.

## 5. Example Output

The console example produces `FlashcardsData` with three cards:

- `someone who likes giving and helping` -> `generous`;
- `someone you can trust` -> `reliable`;
- `wants to learn and know more` -> `curious`.

The third item demonstrates `unit?: ContentUnit` as a cue source converted to text by the adapter.

## 6. Next Recommendation

Next step: create a short arbitration report before adding any evaluator.

Question:

> Should Memorization V0 continue with passive flashcards, or should the next greffe test active recall through TypingRecallData?

The safest likely path is:

```txt
MemorizationSet
-> TypingRecallData
-> MemorizationTypingUserInput
-> evaluator console-only
```

But that should be decided after observing this adapter-level POC.
