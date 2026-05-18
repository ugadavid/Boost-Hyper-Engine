# Inference justified choice POC report

## 1. InferenceChoiceData shape

The first inference V0 interaction data is:

```ts
export interface InferenceChoiceData {
  promptId: string;
  question: string;
  choices: {
    choiceId: string;
    label: string;
    isExpected?: boolean;
    feedback?: string;
  }[];
  requireJustification?: boolean;
}
```

This represents one prompt as a structured inference choice activity.

The adapter returns one `InferenceChoiceData` per `InferencePrompt`.

## 2. Limits of the current InferenceSet model

The current `InferenceSet` model includes:

- `expectedInference`;
- `acceptedInferences`;
- `acceptedJustifications`;
- `evidenceIds`;
- `requireJustification`.

It does not yet include explicit distractors or predefined choice options.

Therefore the adapter can create expected choices from `expectedInference` and `acceptedInferences`, but it cannot create meaningful wrong choices without extra data.

The console example adds a local distractor after adaptation to test wrong-choice scenarios. This keeps the limitation visible instead of hiding it in the adapter.

## 3. Scoring strategy

V0 scoring is intentionally simple:

- correct choice = 1 point;
- justification present = 1 point if justification is required;
- `maxScore = 1` if justification is not required;
- `maxScore = 2` if justification is required.

Status:

- `success` if `score === maxScore`;
- `partial` if `score > 0 && score < maxScore`;
- `failed` if `score === 0`.

## 4. Why justification is not evaluated qualitatively

The evaluator only checks whether justification is present and non-empty.

It does not evaluate:

- relevance;
- correctness;
- evidence quality;
- language quality;
- paraphrase;
- reasoning strength.

This avoids pretending that BHE currently understands natural language.

The result explicitly includes:

```ts
justificationEvaluated: false
```

This keeps the limitation visible in `BHEResult.details`.

## 5. What remains deferred

Deferred:

- renderer;
- LLM integration;
- conversational agent;
- NLP;
- qualitative scoring;
- evidence selection;
- distractor modeling in `InferenceSet`;
- registry;
- feedback DOM integration.

## 6. Next recommended step

Recommendation: update the conceptual model before creating a renderer.

The next healthy step is to decide whether `InferencePrompt` should support explicit choices/distractors, for example:

```ts
choices?: {
  id: string;
  label: string;
  isExpected?: boolean;
  feedback?: string;
}[]
```

Without this, a justified-choice renderer would need to invent distractors outside the pedagogical model, which is not ideal.

## Files created / modified

Created:

- `packages/core/types/interaction-data/InferenceChoiceData.ts`
- `packages/core/adapters/inferenceToChoiceAdapter.ts`
- `packages/core/evaluators/evaluateInferenceJustifiedChoice.ts`
- `examples/inference-justified-choice-evaluator-example.ts`
- `docs/reports/inference-justified-choice-poc-report.md`

Modified:

- `packages/core/types/interaction-data/index.ts`
- `packages/core/adapters/index.ts`
- `packages/core/types/input/UserInput.ts`
- `packages/core/types/input/index.ts`
- `packages/core/types/index.ts`
- `packages/core/evaluators/index.ts`
