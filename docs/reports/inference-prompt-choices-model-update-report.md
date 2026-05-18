# InferencePrompt choices model update report

## What was added to the model

`InferencePrompt` now supports explicit structured choices through:

```ts
export interface InferenceChoice {
  id: string;
  label: string;
  isExpected?: boolean;
  feedback?: string;
}
```

and:

```ts
choices?: InferenceChoice[]
```

This is optional and does not remove existing open-answer fields.

## Why distractors belong to the pedagogical model

Distractors are not technical filler.

They can represent:

- common misunderstandings;
- unsupported inferences;
- false cognates;
- overgeneralizations;
- confusion between cause and consequence;
- tempting but wrong interpretations.

Therefore they belong to the authored pedagogical intent, not to the adapter.

The adapter should translate choices, not invent them.

## Adapter behavior

`inferenceToChoiceAdapter` now follows this rule:

1. If `prompt.choices` exists and contains choices:
   - use those choices;
   - preserve `id`, `label`, `isExpected`, and `feedback`;
   - map `id` to `choiceId` in `InferenceChoiceData`.

2. Otherwise:
   - keep the previous fallback;
   - build expected choices from `expectedInference` and `acceptedInferences`.

This keeps old inference prompts compatible.

## Compatibility

Still compatible:

- `expectedInference`;
- `acceptedInferences`;
- `acceptedJustifications`;
- `evidenceIds`;
- `requireJustification`;
- the existing justified-choice evaluator;
- the existing console POC shape.

No renderer, agent, NLP, registry, or evidence-selection feature was added.

## What remains deferred

Deferred:

- renderer for justified choice;
- evidence selection;
- qualitative justification evaluation;
- LLM integration;
- conversational agent;
- NLP or semantic matching;
- registry;
- feedback based on choice-specific feedback.

## Files created / modified

Modified:

- `packages/core/types/InferenceSet.ts`
- `packages/core/types/index.ts`
- `packages/core/adapters/inferenceToChoiceAdapter.ts`
- `examples/inference-justified-choice-evaluator-example.ts`

Created:

- `docs/reports/inference-prompt-choices-model-update-report.md`

## Recommendation

Keep this as the V0 model baseline for structured inference choices.

The next controlled step should be either:

- update reports/docs to reflect explicit `InferencePrompt.choices`;
- or create a minimal renderer only after confirming how choice-specific feedback should appear.
