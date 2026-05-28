# Memorization Typing Recall Evaluator Report

## Files Created / Modified

Created:

- `packages/core/types/interaction-data/MemorizationTypingRecallData.ts`;
- `packages/core/adapters/memorizationToTypingRecallAdapter.ts`;
- `packages/core/evaluators/evaluateMemorizationTypingRecall.ts`;
- `examples/memorization-typing-recall-evaluator-example.ts`.

Modified:

- `packages/core/types/MemorizationSet.ts`;
- `packages/core/types/interaction-data/index.ts`;
- `packages/core/adapters/index.ts`;
- `packages/core/types/input/UserInput.ts`;
- `packages/core/types/input/index.ts`;
- `packages/core/types/index.ts`;
- `packages/core/evaluators/index.ts`.

## Pipeline

The console-only active recall pipeline is:

```txt
MemorizationSet
-> MemorizationTypingRecallData
-> MemorizationTypingRecallUserInput
-> evaluateMemorizationTypingRecall
-> BHEResult
```

No renderer, registry, self-evaluation, or spaced repetition layer was created.

## Scenarios Tested

The example tests:

- success: all items recalled correctly;
- partial: one item recalled correctly;
- failed: no item recalled correctly;
- accepted variant: an accepted variant is treated as correct;
- blank answer: empty and whitespace answers remain visible in details and are incorrect.

## Difference With GapFill

GapFill is:

```txt
contextual absence
-> constrained production
```

Typing recall is:

```txt
cue
-> retrieval attempt
-> target
```

There is no blank embedded in a surrounding context. The learner is retrieving memorized content from a cue.

## Difference With Transformation

Transformation is:

```txt
explicit source
-> deliberate operation
-> target
```

Typing recall does not ask the learner to modify a source. It asks the learner to recover a retained target.

## Why Active Recall Validates Memorization Better Than Flashcards

Flashcards validate reveal and recognition.

Typing recall tests retrieval before reveal. This is a stronger pressure test for `MemorizationSet` because memorization is not only exposure to content. It is the ability to retrieve target content from a cue.

## V0 Limits

The evaluator is deterministic.

It uses trim and case-insensitive matching.

It supports item-level accepted variants through `accepted?: string[]`.

It does not perform fuzzy matching.

It does not perform NLP.

It does not remove accents.

It does not track confidence.

It does not schedule review.

It does not distinguish typo, synonym, near miss, or forgotten answer.

## Why Spaced Repetition And Self-Evaluation Remain Deferred

Spaced repetition requires runtime memory state:

- review history;
- intervals;
- ease;
- forgetting;
- next review scheduling.

Self-evaluation requires subjective learner judgement and probably a different data path.

Both are important future signals, but neither is needed to validate active recall as a distinct cognitive operation.

## Example Output Summary

The compiled example produces:

- `success all recalled`: `success`, 3/3;
- `partial one recalled`: `partial`, 1/3;
- `failed none recalled`: `failed`, 0/3;
- `accepted variant recalled`: `success`, 3/3;
- `blank answer visible`: `partial`, 1/3.

## Next Recommendation

The next healthy step is not a renderer yet.

Create a short comparison report between:

- `MemorizationTypingRecall`;
- `GapFillTyping`;
- `TransformationTyping`.

The goal should be to confirm that the same typing gesture now represents three distinct cognitive operations before any DOM renderer or helper extraction is considered.
