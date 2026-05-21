# Transformation Accepted Variants Model Update Report

## 1. What Was Added To The Model

`TransformationItem` now supports:

```ts
accepted?: string[];
```

The convention is:

```txt
expected = canonical or preferred target
accepted = additional accepted variants
```

This keeps a preferred answer visible while allowing realistic transformation tasks to accept more than one valid output.

## 2. Adapter Behavior

`transformationToInteractionData` now copies `accepted` when it exists.

It still does not invent variants. If the pedagogical model does not provide accepted variants, the adapter leaves `accepted` absent.

This preserves the boundary between pedagogical content and interaction data.

## 3. Evaluator Behavior

`evaluateTransformationTyping` already consumed `accepted` from `TransformationInteractionData`.

No evaluator change was needed. The evaluator now receives accepted variants naturally through the model -> adapter -> interaction data path.

## 4. Why accepted Belongs To The Pedagogical Model

Accepted variants express what the teacher or activity author considers valid.

That is pedagogical correctness data, not renderer behavior and not adapter enrichment.

For example:

```txt
source: Can you send me the file?
expected: Could you please send me the file?
accepted: Would you please send me the file?
```

Both transformed outputs are pedagogically valid, but one remains the canonical target.

## 5. Deferred Work

No renderer was created.

No generic typing engine was introduced.

No GapFill behavior was modified.

No registry was created.

No NLP, LLM, fuzzy matching, or process-based scoring was added.

Future work may explore whether accepted variants need item-level feedback, preferred-answer explanations, or richer variant categories.
