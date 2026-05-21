# Transformation V0 Emergence

This document records the architectural emergence of `TransformationSet` up to its V0 baseline.

## 1. Cognitive Nature Of TransformationSet

Transformation means:

```txt
source
-> deliberate operation
-> target
```

The learner starts from something explicit and applies a change. The source matters because the expected target is defined by its relation to that source.

Transformation can cover:

- grammatical transformation;
- tense change;
- gender / number change;
- reformulation;
- register shift;
- syntactic structure change;
- intercomprehension / transfer between related forms or languages.

Central points:

> transformation != simple production

and:

> transformation != GapFill with typing

Compared with `GapFillSet`, Transformation does not start from an absence inside a context. It starts from an explicit source.

Compared with `InferenceSet`, Transformation is not primarily about interpretation or justification. It can involve interpretation, especially in intercomprehension, but the V0 operation remains source-to-target change.

Compared with `IdentificationSet`, Transformation is not detection. The learner produces a changed form rather than selecting an existing target.

## 2. Productive Cognition

The emerging productive-object principle is:

```txt
typing gesture
        !=
typing cognition
```

### GapFill

```txt
contextual absence
-> constrained production
```

The learner completes something missing. The surrounding context constrains the answer.

### Transformation

```txt
explicit source
-> deliberate change
-> target
```

The learner modifies a source according to an operation.

### Inference

```txt
clues
-> interpretation
-> justification
```

The learner reasons from evidence and expresses a plausible interpretation.

A text field does not define a pedagogical object. The same DOM input can represent completion, transformation, explanation, justification, naming, or correction. BHE therefore models the cognitive operation before abstracting the interaction.

## 3. V0 Pipeline Emergence

The V0 pipeline is:

```txt
TransformationSet
-> transformationToInteractionData
-> TransformationInteractionData
-> TransformationTypingUserInput
-> evaluateTransformationTyping
-> BHEResult
-> transformationTypingDomRenderer
```

`TransformationSet` carries the pedagogical source items, expected targets, accepted variants, transformation type, instructions, hints, and feedback.

`transformationToInteractionData` translates the pedagogical object into interaction data without inventing correctness rules.

`TransformationInteractionData` preserves the transformation relation through item-level `source`, `transformationType`, `instruction`, `expected`, and `accepted`.

`TransformationTypingUserInput` captures learner attempts semantically by item id.

`evaluateTransformationTyping` checks typed attempts deterministically and produces `BHEResult`.

`BHEResult` carries score, status, completion, and item-level details.

`transformationTypingDomRenderer` displays the source, operation, and learner transformation input while keeping evaluation outside the renderer.

## 4. Accepted Variants

The accepted-variants arbitration settled this convention:

```txt
expected = canonical target
accepted = additional valid variants
```

Accepted variants belong to `TransformationItem` because they are pedagogical correctness data.

> pedagogy belongs to model

The adapter should preserve accepted variants, not invent them. The evaluator should consume them, not decide what variants are pedagogically valid.

This is why `accepted?: string[]` belongs to the pedagogical model.

## 5. Semantic UserInput

The V0 input shape is:

```ts
{
  kind: "transformation-typing",
  attempts: [
    { itemId, value }
  ]
}
```

The central point is:

> transformationAttempt keyed by itemId

The learner's text is meaningful because it answers a specific transformation item. Anonymous typed answers would lose the source -> operation -> target relation.

## 6. Renderer V0

The renderer preserves:

```txt
source
-> operation / instruction
-> learner transformation
```

It uses contextualized typing: each input sits inside a visible transformation card with the source and operation.

It uses native text inputs and explicit labels.

It provides an accessibility baseline through native controls, visible labels, and polite feedback regions.

It provides both global feedback through `mountFeedbackFromResult` and local item classes:

- `is-correct`;
- `is-incorrect`.

The evaluator remains outside the renderer. The renderer captures input and displays state; it does not decide correctness.

## 7. Deferred Work

Deferred work includes:

- process-aware feedback;
- explanations for accepted variants;
- richer scoring;
- hybrid recognition pathway;
- multimodality;
- transformation process evaluation;
- comparison with GapFill for possible tiny helpers, without creating a generic typing renderer.

The next comparison should observe shared DOM mechanics between GapFill and Transformation while keeping their pedagogy separate.

## 8. What Transformation Reveals About BHE

Transformation confirms:

> same gesture != same pedagogy

and reinforces:

> typing gesture != typing cognition

The V0 baseline shows that BHE should not start by abstracting the UI gesture. It should first protect the cognitive operation, then decide which interaction shape is useful.

Final principle:

> BHE protects cognition before interaction abstraction.
