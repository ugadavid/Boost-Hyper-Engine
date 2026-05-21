# Transformation InteractionData Adapter Report

## 1. Shape Retained

The new interaction data shape is:

```ts
export interface TransformationInteractionItem {
  itemId: string;
  source: string;
  transformationType?: string;
  instruction?: string;
  expected: string | string[];
  accepted?: string[];
  hint?: string;
  feedback?: string;
}

export interface TransformationInteractionData {
  items: TransformationInteractionItem[];
}
```

This is intentionally transformation-aware without becoming a transformation engine.

## 2. Preserving Source -> Operation -> Target

The adapter keeps the three important parts visible:

```txt
source
-> transformationType / instruction
-> expected
```

`source` preserves what the learner transforms.

`transformationType` and `instruction` preserve the intended operation.

`expected` preserves the target form used by a future deterministic evaluator.

Hints and feedback are copied forward so a future renderer or feedback layer can explain the task without reading the full pedagogical object.

## 3. Current TransformationSet Limits

The current `TransformationItem` model has `expected: string`, not `expected: string | string[]`.

It also does not yet carry explicit accepted variants per item. The interaction data supports `accepted?: string[]`, but the adapter does not invent accepted variants because they are not present in the source model.

`allowMultipleAnswers` exists at `TransformationSetCore` level, but without item-level accepted answers there is no precise variant list to preserve.

This is a useful signal: Transformation probably needs accepted variants later, but not in this greffe.

## 4. Voluntarily Deferred

No evaluator was created.

No `TransformationUserInput` was created.

No renderer was created.

No generic typing abstraction was introduced.

No registry was introduced.

No GapFill refactor was made.

No process-based scoring or NLP behavior was added.

## 5. Next Recommended Step

The next healthy step is a console-only evaluator exploration:

```txt
TransformationInteractionData
-> TransformationUserInput
-> evaluateTransformationTyping
-> BHEResult
```

That evaluator should remain deterministic in V0. It can check typed transformation attempts against `expected`, and later against `accepted` if the model gains explicit accepted variants.

Before any renderer, the key question is how to shape `TransformationUserInput` semantically so that it captures transformation attempts by `itemId`, not anonymous typed answers.
