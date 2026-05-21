# Transformation Typing Evaluator POC Report

## 1. TransformationTypingUserInput

The POC adds a semantic input shape:

```ts
export interface TransformationTypingUserInput {
  kind: "transformation-typing";
  attempts: {
    itemId: string;
    value: string;
  }[];
}
```

The key decision is that learner answers are transformation attempts keyed by `itemId`. They are not anonymous typed answers.

## 2. Scoring Strategy

The V0 evaluator is deterministic.

For each `TransformationInteractionItem`, it compares the learner value with:

- `expected`;
- future `accepted` variants if present in `TransformationInteractionData`.

The comparison trims whitespace and is case-insensitive by default.

Scoring:

- `score` = number of correct items;
- `maxScore` = number of transformation items;
- `success` if all items are correct;
- `partial` if at least one item is correct but not all;
- `failed` if no item is correct.

## 3. Source -> Operation -> Target In Details

`BHEResult.details.itemResults` preserves:

- `itemId`;
- `source`;
- `transformationType`;
- `instruction`;
- `actual`;
- `expected`;
- `accepted`;
- `isCorrect`.

This keeps the transformation relation visible after evaluation. Future feedback can therefore refer to the source and expected operation instead of only saying "correct" or "incorrect".

## 4. Status Of accepted

`TransformationInteractionData` supports `accepted?: string[]`.

The current `TransformationSet` model does not yet provide accepted variants per item, so the adapter cannot populate them from the source object.

The example includes an `accepted-ready` scenario by manually adding an accepted variant to the interaction data. This confirms that the evaluator is ready to consume accepted variants later without requiring a renderer or model refactor now.

## 5. Deferred Work

No renderer was created.

No generic typing engine was created.

No GapFill behavior was modified.

No registry was introduced.

No NLP, LLM, fuzzy matching, morphology engine, or process-based scoring was added.

No accepted variants were added to `TransformationSet` yet.

## 6. Next Recommended Step

The next healthy step is an arbitration report before modifying `TransformationSet`.

Question:

> Should `TransformationItem` gain explicit `accepted?: string[]`, or should accepted variants remain InteractionData-only for now?

That decision should come before a renderer. If accepted variants belong to the pedagogical model, they should be added deliberately and documented.
