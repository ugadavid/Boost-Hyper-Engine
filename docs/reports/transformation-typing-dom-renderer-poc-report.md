# Transformation Typing DOM Renderer POC Report

## 1. Renderer Shape

`transformationTypingDomRenderer` is a specialized DOM renderer for:

```txt
TransformationSet + typing
```

It consumes a `TransformationSet`, passes it through `transformationToInteractionData`, renders one transformation item per card, captures learner attempts, calls `evaluateTransformationTyping`, and mounts global feedback through `mountFeedbackFromResult`.

It is not a generic typing renderer.

## 2. Preserving Source -> Operation -> Target

The renderer keeps the core transformation relation visible:

```txt
source
-> operation / instruction
-> learner transformation
```

Each item displays:

- the source form;
- the instruction;
- the transformation type when present;
- a text input labeled as the learner transformation.

The input is therefore contextualized by the source and operation. It does not appear as an isolated answer field.

## 3. Accessibility V0

The renderer uses native text inputs and explicit `<label>` elements.

Each input is tied to a visible label through `htmlFor`.

Feedback areas use `aria-live="polite"`:

- item-level feedback announces correct / incorrect status;
- global feedback is mounted in a polite live region.

The current V0 relies on native keyboard behavior for text inputs and the Check button.

## 4. Semantic UserInput

On Check, the renderer creates:

```ts
{
  kind: "transformation-typing",
  attempts: {
    itemId: string;
    value: string;
  }[]
}
```

This preserves the semantic link between each typed value and the transformation item. The renderer does not send anonymous text answers.

## 5. Local Feedback

The renderer uses `BHEResult.details.itemResults` to apply local classes:

- `is-correct`;
- `is-incorrect`.

It also writes minimal item-level text feedback:

- `Correct transformation.`
- `Try again.`

Scoring and correctness remain outside the renderer.

## 6. Deferred Work

No generic typing renderer was created.

No evaluator change was made.

No NLP, fuzzy matching, or process scoring was added.

No drag-transform interaction was introduced.

No GapFill code was modified.

No registry was created.

No multimodal Transformation behavior was added.

Future work may improve hints, item-level feedback richness, process-aware feedback, and accepted-variant explanations.

## 7. Next Recommendation

The next healthy step is to compare `GapFillTypingDomRenderer` and `TransformationTypingDomRenderer` at the DOM level.

The goal should not be to extract a generic typing renderer yet. The useful question is narrower:

> What DOM mechanics are shared, and what must remain pedagogically specific?

That comparison can decide whether a tiny helper is earned for feedback classes, input collection, or accessible field layout.
