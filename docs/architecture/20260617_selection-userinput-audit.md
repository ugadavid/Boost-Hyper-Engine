# Selection UserInput Audit

## 1. Context

This audit follows:

```txt
20260617_non-evaluative-interaction-stress-test.md
```

That stress-test asked whether the current BHE core can represent a reflective, non-evaluative selection activity such as:

```txt
How do you usually learn vocabulary?

A. I write lists
B. I use flashcards
C. I repeat words aloud
D. I make associations
```

The activity has:

- no correct answer;
- no wrong answer;
- no score;
- no grade.

Its pedagogical function is closer to:

```txt
strategy awareness
self-observation
reflective positioning
```

The conclusion of the stress-test was:

```txt
Yes, with minor tension.
```

The friction was not `BHEResult`. `BHEResult` already supports `status: "completed"`, optional score, optional details, and optional signals.

The friction appeared upstream, around selection vocabulary:

```txt
selection exists,
but neutral non-evaluative selection
does not yet have a clean UserInput name.
```

This document audits the existing code around selection-related `UserInput` types.

No code change is proposed as part of this document.

## 2. Existing Selection-Related UserInput Types

Current `UserInput` types are defined in:

```txt
packages/core/types/input/UserInput.ts
```

The core also already includes a neutral interaction mode:

```ts
export type InteractionMode =
  | "drag-drop"
  | "memory"
  | "flashcards"
  | "typing"
  | "qcm"
  | "reorder"
  | "selection";
```

So the interaction vocabulary contains `"selection"`, but the concrete `UserInput` vocabulary is more specialized.

| Type | Shape | Current use | Coupling | Selection neutrality |
| ---- | ----- | ----------- | -------- | -------------------- |
| `QcmUserInput` | `{ interactionMode: "qcm"; selectedChoiceId: string }` | Classification QCM | Strongly tied to `ClassificationSet -> QcmData -> evaluateClassificationQcm` | Low. The evaluator expects `correctChoiceId`. |
| `InferenceJustifiedChoiceUserInput` | `{ kind: "inference-justified-choice"; selectedChoiceId: string; justification?: string }` | Inference justified choice | Tied to `InferenceChoiceData` and expected inference choice | Low. Selection is part of inferential correctness plus justification. |
| `IdentificationSelectionUserInput` | `{ kind: "identification-selection"; selectedTargetIds: string[] }` | Identification multi-select | Tied to `IdentificationSelectionData` and `evaluateIdentificationSelection` | Medium structurally, low semantically. It can carry selected ids, but implies target identification. |
| `AssociationDragDropUserInput` | `{ interactionMode: "drag-drop"; placements: { entryId; zoneId }[] }` | Association drag/drop | Tied to grouping/association placement | Not a selection input. Adjacent gesture, different semantics. |
| `ClassificationDragDropUserInput` | `{ interactionMode: "drag-drop"; placements: { itemId; categoryId }[] }` | Classification drag/drop | Tied to category placement | Not a selection input. Adjacent gesture, different semantics. |

### QCM

`QcmUserInput` is the most compact single-choice selection shape:

```ts
{
  interactionMode: "qcm",
  selectedChoiceId: "use-flashcards"
}
```

But the current evaluator confirms that this path is evaluative:

```txt
selectedChoiceId
vs
correctChoiceId
```

It produces:

- `isCorrect`;
- `score`;
- `maxScore`;
- `status: "success" | "failed"`.

So `QcmUserInput` is not neutral in the current engine. It carries the UI gesture, but its current ecosystem strongly suggests a scored choice.

### Inference Justified Choice

`InferenceJustifiedChoiceUserInput` also uses `selectedChoiceId`, but it belongs to a different cognitive operation:

```txt
select an inference
optionally justify it
```

Its evaluator checks:

- whether the selected choice is expected;
- whether justification is present when required.

This is not a neutral questionnaire. It is a structured inference attempt.

### Identification Selection

`IdentificationSelectionUserInput` is structurally closest to the non-evaluative stress-test:

```ts
{
  kind: "identification-selection",
  selectedTargetIds: ["write-lists", "make-associations"]
}
```

It supports multiple selected ids, which fits reflective questionnaires better than `selectedChoiceId`.

However, it is semantically tied to:

```txt
identify expected targets
```

The associated `IdentificationSelectionData` contains:

```ts
targets: {
  targetId: string;
  label: string;
  expected?: boolean;
  feedback?: string;
}[]
```

And the evaluator computes:

- `expectedTargetIds`;
- `correctTargetIds`;
- `missingTargetIds`;
- `extraTargetIds`;
- score based on expected targets.

For a non-evaluative questionnaire where no target is expected, this evaluator should not be reused.

The shape can carry the selected ids.

The meaning is too specialized.

## 3. Current Limitations

### What Works Naturally

The current engine already has several helpful pieces:

- `InteractionMode` includes `"selection"`;
- `BHEResult` is broader than scoring;
- `BHEResult.status` includes `"completed"`;
- `score` and `maxScore` are optional;
- `details` can carry selected strategy ids;
- `signals` can describe non-evaluative outcomes such as `strategy-awareness`.

This means the core can already represent:

```txt
interaction
-> observation
-> result
```

or:

```txt
interaction
-> reflection
-> result
```

### What Feels Forced

The available selection-like `UserInput` types currently suggest a specific pedagogical reading:

- `QcmUserInput` suggests selected answer in a QCM;
- `InferenceJustifiedChoiceUserInput` suggests inferential correctness;
- `IdentificationSelectionUserInput` suggests expected target detection.

For the Boost'English-style reflection question:

```txt
How do you usually learn vocabulary?
```

none of these names are quite right.

The learner is not:

- answering a scored QCM;
- identifying correct targets;
- selecting an expected inference.

The learner is simply selecting statements that describe their own habit.

### Where The Representation Becomes Uncomfortable

The discomfort is not structural.

Selected ids are easy to represent.

The discomfort is conceptual:

```txt
current names make neutral selection look like assessment
or like identification.
```

This matters because BHE has repeatedly observed:

```txt
interaction shape != pedagogical function
```

If all selection input is named through evaluative or object-specific pathways, the code vocabulary may quietly pull future modeling back toward:

```txt
selection = answer
answer = correctness
```

That is exactly what the BHE-BE stress-test warns against.

## 4. Minimal Change Proposal

There are several possible responses.

### Option A - Change Nothing

This is viable if non-evaluative selection remains documentary only.

The activity can be described as:

- `InteractionMode: "selection"`;
- selected ids in custom `details`;
- `BHEResult.status: "completed"`.

But if a real implementation appears, reusing `IdentificationSelectionUserInput` would make the model harder to read.

### Option B - Document Existing Types More Clearly

This helps, but it does not solve the naming gap.

Documentation could clarify:

```txt
IdentificationSelectionUserInput
= selection of expected targets for identification tasks
```

That would protect the specific type, but it would not provide a neutral one.

### Option C - Rename `IdentificationSelectionUserInput`

This is not recommended.

The current name is accurate for the existing Identification baseline.

Renaming it would:

- risk breaking existing examples/renderers/evaluators;
- blur the useful specificity of Identification;
- create churn without solving QCM or inference naming.

### Option D - Introduce A Neutral Sibling Later

The smallest reasonable future correction would be a new neutral input type, for example:

```ts
export interface SelectionUserInput {
  kind: "selection";
  selectedOptionIds: string[];
  timestamp?: string;
  metadata?: Record<string, unknown>;
}
```

This would mean only:

```txt
the user selected one or more options
```

It would not imply:

- identification;
- correctness;
- assessment;
- QCM scoring;
- expected targets.

If implemented later, this type should be a sibling, not a replacement.

Specialized inputs should remain specialized:

```txt
QcmUserInput
IdentificationSelectionUserInput
InferenceJustifiedChoiceUserInput
SelectionUserInput
```

The neutral type would be useful only for activities whose pedagogical function is non-evaluative or not yet evaluative:

- reflective questionnaires;
- preference selection;
- strategy self-observation;
- learner positioning;
- survey-like choices;
- diagnostic input that should not be scored directly.

### Option E - Introduce A Neutral Alias

An alias such as:

```ts
type SelectionUserInput = IdentificationSelectionUserInput;
```

is not recommended.

It would preserve the wrong semantic center while hiding it behind a neutral name.

If the engine needs neutral selection, it should get a genuinely neutral shape.

## 5. Risks

### Risk 1 - Breaking Existing Specialized Sets

`IdentificationSelectionUserInput` is currently coherent for `IdentificationSet`.

It should not be renamed or generalized away.

### Risk 2 - Multiplying Types Too Early

Adding `SelectionUserInput` before implementing any real neutral selection flow could be premature.

The stress-test is strong enough to identify a naming gap, but not necessarily enough to justify immediate code.

### Risk 3 - Losing Useful Specificity

Specialized `UserInput` types protect cognition:

```txt
same gesture != same pedagogy
```

The goal is not to flatten all choice-like interactions into one generic input.

### Risk 4 - Creating A Hidden Generic Selection Engine

A neutral input type should not imply:

- a generic selection evaluator;
- a generic selection renderer;
- a registry;
- a new runtime layer.

It should remain a small vocabulary correction if and when needed.

### Risk 5 - Confusing Neutral Selection With No Evaluation

Neutral input does not mean no result.

A non-evaluative activity can still produce:

- completion;
- selected options;
- learner signals;
- adaptive hints;
- reflective summaries.

The difference is that the selected option ids are not automatically interpreted as correct or incorrect.

## 6. Recommendation

Recommendation:

```txt
change recommended later,
not in this audit.
```

The current core can represent the non-evaluative selection activity, but with minor naming tension.

The most reasonable future change is:

```txt
add a neutral SelectionUserInput
when the first real non-evaluative selection implementation appears.
```

Do not rename existing types.

Do not generalize existing evaluators.

Do not create a selection registry.

Do not collapse QCM, Identification, and Inference into one selection model.

The clean distinction should be:

```txt
QcmUserInput
  selected answer in a QCM-style evaluative flow

IdentificationSelectionUserInput
  selected targets in an identification task

InferenceJustifiedChoiceUserInput
  selected inference plus optional justification

SelectionUserInput
  future neutral selected options, no correctness implied
```

This preserves the BHE principle:

```txt
same interaction shape
!=
same pedagogical function
```

and extends it into input naming:

```txt
same selection gesture
!=
same UserInput semantics
```

For now, no code should change. The signal is clear enough to preserve, but not yet urgent enough to implement outside a concrete non-evaluative selection POC.
