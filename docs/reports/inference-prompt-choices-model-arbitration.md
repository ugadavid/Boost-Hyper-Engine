# InferencePrompt choices model arbitration

## Purpose

The `InferenceChoiceData + InferenceJustifiedChoiceUserInput -> BHEResult` POC revealed a structural limitation:

`InferencePrompt` does not currently carry explicit choices or distractors.

This report decides whether choices should belong to the pedagogical model.

## 1. Current situation

`InferencePrompt` currently supports:

- `expectedInference`;
- `acceptedInferences`;
- `acceptedJustifications`;
- `evidenceIds`;
- `hint`;
- `feedback`;
- `metadata`.

At `InferenceSetCore` level, the model also supports:

- `requireJustification`;
- `allowMultipleInferences`;
- `confidenceScale`.

This is strong for short-answer or open inference tasks.

But it does not explicitly model:

- answer choices;
- distractors;
- choice-specific feedback;
- multiple-choice inference options.

## 2. Problem revealed by the POC

The current adapter can create choices from:

- `expectedInference`;
- `acceptedInferences`.

But these are all expected or accepted answers.

The adapter cannot responsibly invent wrong choices.

Pedagogical distractors are not arbitrary. A good distractor can encode:

- common misunderstanding;
- false cognate;
- overgeneralization;
- unsupported inference;
- confusion between cause and consequence;
- clue misreading.

If the adapter invents distractors, it starts creating pedagogy instead of adapting pedagogy.

That breaks the BHE principle:

> adapters translate intent; they should not invent intent.

## 3. Option A: add choices to InferencePrompt

Possible shape:

```ts
choices?: {
  id: string;
  label: string;
  isExpected?: boolean;
  feedback?: string;
}[]
```

### Advantages

- Choices become part of the pedagogical model.
- Distractors can be authored intentionally.
- Adapter becomes clean and non-inventive.
- Choice-specific feedback becomes possible.
- Justified choice V0 becomes structurally supported.
- QCM inference and justified choice can share the same source data.
- Future evidence-linked distractors can be added later if needed.

### Risks

- `InferencePrompt` becomes slightly more complex.
- It introduces overlap with `expectedInference` and `acceptedInferences`.
- Authors may define both choices and accepted answers inconsistently.
- The model will need conventions:
  - if `choices` exists, should `expectedInference` still matter?
  - can several choices be expected?
  - should accepted free answers and structured choices coexist?

### Mitigation

Keep `choices` optional.

Do not remove existing fields.

Treat `choices` as the source for structured-choice interactions only.

Keep `expectedInference` / `acceptedInferences` useful for short-answer interactions.

## 4. Option B: keep choices only in InteractionData

In this option, `InferencePrompt` remains unchanged. `InferenceChoiceData` carries all choices.

### Advantages

- Core pedagogical model stays simpler.
- Different adapters or activities could generate different choice sets.
- The same prompt could be presented with different interaction choices.

### Risks

- Choices lose their pedagogical source.
- Distractors may be invented by adapters or examples.
- Authorial intent becomes fragmented.
- Reports and docs must explain where choices come from.
- It becomes harder to reuse or inspect an `InferenceSet` as a complete pedagogical object.

This option makes sense only if choices are generated dynamically by a future authoring layer. That is not the current architecture.

## 5. Option C: do not support justified choice yet

This option defers structured choice interactions and keeps inference as short answer or typing only.

### Advantages

- No model change now.
- Avoids overlap between choices and accepted answers.
- Keeps `InferenceSet` open-ended.

### Risks

- Blocks the most promising V0 interaction identified by the comparison report.
- Leaves the current typing renderer with brittle local matching.
- Avoids the modeling question rather than resolving it.
- Delays a useful non-LLM inference path.

This is cautious, but probably too conservative now that the POC has clarified the need.

## 6. Recommendation

Recommendation: **Option A. add optional `choices` to `InferencePrompt`**.

This is the healthiest next step for BHE.

Reasons:

- distractors are pedagogical content;
- adapters should not invent distractors;
- justified choice needs structured choices;
- QCM inference can reuse the same model;
- existing open-answer fields can remain untouched;
- the change is local and compatible.

Suggested next controlled step:

1. Add an optional `InferenceChoice` type.
2. Add `choices?: InferenceChoice[]` to `InferencePrompt`.
3. Update `inferenceToChoiceAdapter` to prefer `prompt.choices` when available.
4. Keep fallback behavior from `expectedInference` / `acceptedInferences`.
5. Update only examples and reports needed for this path.

Do not create a renderer yet.

Do not add NLP, LLM integration, agent behavior, or registry.
