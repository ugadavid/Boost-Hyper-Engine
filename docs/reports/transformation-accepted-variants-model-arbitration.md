# Transformation Accepted Variants Model Arbitration

This report decides whether `TransformationItem` should explicitly carry accepted variants after the `evaluateTransformationTyping` POC.

## 1. Current Situation

`TransformationInteractionData` already supports:

```ts
accepted?: string[];
```

`evaluateTransformationTyping` already consumes accepted variants when they are present in the interaction data.

`TransformationItem` does not currently carry accepted variants.

`transformationToInteractionData` does not invent accepted variants. It only preserves what exists in the pedagogical model.

This creates a healthy tension: the evaluator is ready, but the pedagogical model does not yet express the data needed for that feature.

## 2. Problem Revealed By The POC

Accepted variants are not merely renderer data.

If the teacher decides that several transformed outputs are valid, that decision belongs to the pedagogical content. It is part of what the activity accepts as correct.

For example:

- source: `Can you send me the file?`
- expected: `Could you please send me the file?`
- accepted variant: `Would you please send me the file?`

The accepted variant is not a display concern. It encodes pedagogical tolerance.

The adapter should not invent these variants, because that would mean generating pedagogical correctness rules outside the pedagogical object.

The key question is therefore:

> Are accepted variants part of TransformationSet itself?

For BHE, the answer seems to be yes.

## 3. Option A: Add accepted?: string[] To TransformationItem

Possible shape:

```ts
export interface TransformationItem {
  id: string;
  source: string;
  expected: string;
  accepted?: string[];
  instruction?: string;
  transformationType?: string;
  hint?: string;
  feedback?: string;
}
```

Advantages:

- accepted variants become explicit pedagogical content;
- the adapter can preserve them without inventing anything;
- the evaluator can consume them naturally;
- teachers can encode tolerance per item;
- future feedback can explain variant acceptance;
- this aligns Transformation with GapFill, where accepted answers already exist through `expected: string | string[]`.

Risks:

- possible confusion between `expected` and `accepted`;
- some authors may duplicate the main expected answer inside `accepted`;
- future scoring may need to distinguish preferred target from acceptable variant;
- naming may need care: `accepted` could mean "additional accepted variants", not "all expected answers".

This option is small, local, and reversible. It also matches the behavior already tested by the POC.

## 4. Option B: Keep accepted Only In InteractionData

Advantages:

- no change to the pedagogical model;
- experiments can continue at adapter / evaluator level;
- accepted variants remain interaction-specific.

Risks:

- unclear source of accepted variants;
- adapters may be tempted to invent or enrich correctness rules;
- pedagogical authors cannot define variants directly in `TransformationSet`;
- the same TransformationSet could produce different correctness rules depending on adapter behavior;
- BHE would blur the boundary between pedagogy and interaction data.

This option is useful for experimentation but weak as a stable model.

## 5. Option C: Do Not Support Accepted Variants Yet

Advantages:

- simplest model;
- no ambiguity between expected and accepted;
- evaluator remains strict and deterministic.

Risks:

- too rigid for real transformation tasks;
- register reformulation, intercomprehension, syntax, and translation-like tasks often need valid variants;
- the evaluator POC has already shown a clean path for accepted variants;
- postponing the model change may block realistic examples.

This option is safe but pedagogically narrow.

## 6. Recommendation

Recommendation: **Option A — add `accepted?: string[]` to `TransformationItem`**.

Accepted variants are pedagogical correctness data. They should belong to the pedagogical model, not be invented by the adapter and not live only in InteractionData.

The change should be local:

```txt
TransformationItem.accepted?: string[]
-> transformationToInteractionData copies accepted
-> evaluateTransformationTyping already consumes accepted
```

No renderer, registry, NLP, LLM, or scoring refactor is needed.

The recommended interpretation is:

```txt
expected = preferred or canonical target
accepted = additional accepted variants
```

This keeps the source -> operation -> target relation clear while allowing realistic transformation tasks.
