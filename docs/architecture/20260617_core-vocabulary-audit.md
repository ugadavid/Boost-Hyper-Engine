# Core Vocabulary Audit

## 1. Context

This document belongs to the `experiment/bhe-be` branch.

It follows three recent BHE-BE stress documents:

- `20260617_non-evaluative-interaction-stress-test.md`;
- `20260617_selection-userinput-audit.md`;
- `20260617_non-evaluative-interaction-representation-poc.md`.

Those documents tested whether the current BHE core can represent a non-evaluative reflective selection activity such as:

```txt
How do you usually learn vocabulary?
```

with choices like:

```txt
I write lists
I use flashcards
I repeat words aloud
I make associations
```

The conclusion was:

```txt
the engine can represent the activity,
but some names make the representation feel more evaluative
or more specialized than it structurally needs to be.
```

The clearest case was:

```txt
IdentificationSelectionUserInput
```

Its structure can carry selected ids, but its name tells a more specific story:

```txt
the learner identified expected targets
```

This audit asks whether the same pattern appears elsewhere:

```txt
specialized name
!=
actual structural role
```

It also checks the inverse risk:

```txt
generic name
!=
actual specialized assumptions
```

No code is modified.

No refactor is proposed.

This is a vocabulary audit only.

## 2. Vocabulary That Already Feels Generic

Several existing concepts are already well aligned with their actual role.

| Concept | Why the name fits | Notes |
| ------- | ----------------- | ----- |
| `PedagogicalObject` | Broad enough to represent cognitive sets without pretending they are only exercises. | It can carry learning goal, content, interaction modes, and cognitive operations. The name is general, but not empty. |
| `CognitiveOperation` | Describes what the learner does mentally. | The vocabulary is intentionally light: `reflect`, `notice`, `compare`, `produce`, `selfAdjust`, etc. It has absorbed several BHE-BE observations without creating new objects. |
| `UserInput` | Correctly names learner action entering the return loop. | The umbrella name is good. Tensions appear inside specific variants, not at the umbrella level. |
| `BHEResult` | Correctly broader than score or grade. | Its statuses include `completed` and `skipped`; score and maxScore are optional. This is why non-evaluative completion can already fit. |
| `InteractionMode` | Names interaction shape rather than cognitive function. | Includes `selection`, `typing`, `drag-drop`, `reorder`, etc. This supports the principle `interaction shape != pedagogical function`. |
| `AdaptiveRouting` | Correctly describes routing based on result signals. | It reads from `BHEResult`, not only from score. This keeps it compatible with non-scored results. |
| `ContentUnit` | Correctly names a minimal manipulable content grain. | It does not pretend to be pedagogy, feedback, or rendering. |
| `PedagogicalContent` | Broad enough for core content plus support blocks. | The distinction between `core` and `support` remains useful. |

The strongest positive signal is:

```txt
BHE already has good umbrella vocabulary
for the main pipeline.
```

The recent BHE-BE stress tests did not reveal a need to replace:

- `PedagogicalObject`;
- `CognitiveOperation`;
- `UserInput`;
- `BHEResult`.

## 3. Vocabulary That May Be Too Specialized

These are names whose structure may be more reusable than the name suggests.

### IdentificationSelectionUserInput

Defined in:

```txt
packages/core/types/input/UserInput.ts
```

Shape:

```ts
{
  kind: "identification-selection";
  selectedTargetIds: string[];
}
```

Actual structural role:

```txt
selected ids
```

Specialized story told by the name:

```txt
the learner selected targets for an identification task
```

This is accurate for `IdentificationSet`, but too specialized for neutral reflective selection.

For example:

```txt
selectedTargetIds:
  - write-lists
  - make-associations
```

can structurally represent a learner's strategy choices, but `identification-selection` makes it sound like the learner found correct targets.

This is the clearest current mismatch.

### IdentificationSelectionData

Defined in:

```txt
packages/core/types/interaction-data/IdentificationSelectionData.ts
```

Shape:

```ts
{
  context: string;
  selectionMode: "single" | "multiple";
  targets: {
    targetId: string;
    label: string;
    expected?: boolean;
    feedback?: string;
  }[];
}
```

Actual structural role:

```txt
context + selectable candidates
```

Specialized story told by the name:

```txt
targets to identify
```

This is correct for Identification V0, but it becomes awkward for survey-like or reflective choices.

The `expected` field also gives the shape a correctness smell, even though it is optional.

### QcmUserInput

Defined in:

```txt
packages/core/types/input/UserInput.ts
```

Shape:

```ts
{
  interactionMode: "qcm";
  selectedChoiceId: string;
}
```

Actual structural role:

```txt
single selected choice
```

Specialized story told by the current usage:

```txt
selected answer to be checked against a correct choice
```

The name `QcmUserInput` is not wrong. It is aligned with QCM.

But in the current implementation, the associated evaluator expects:

```txt
correctChoiceId
```

So the practical meaning is closer to:

```txt
scored single-choice input
```

This makes it unsuitable for reflective questionnaires, even when the UI looks QCM-like.

### InferenceChoiceData / InferenceJustifiedChoiceUserInput

Defined in:

```txt
packages/core/types/interaction-data/InferenceChoiceData.ts
packages/core/types/input/UserInput.ts
```

These names are actually fairly accurate for their current purpose:

```txt
select an inference
provide optional justification
```

However, they are useful as a warning:

```txt
selectedChoiceId
does not mean the same thing everywhere.
```

In QCM, it means selected category answer.

In inference, it means selected interpretation.

In a reflective questionnaire, it would mean selected self-description.

The field name is structurally similar, but the cognitive semantics are different.

### ContextualTypingData

Currently defined close to the renderer adapter:

```txt
packages/renderer/adapters/gapFillToContextualTypingAdapter.ts
```

Actual structural role:

```txt
a sequence of text and blanks for gap-fill typing
```

The name is broader than `GapFillTypingData`, but still meaningful because the interaction is genuinely contextual typing.

This is not an urgent mismatch.

It is a light reminder that generic-looking names should not later be treated as generic typing engines.

### MemorizationTypingRecallData

Defined in:

```txt
packages/core/types/interaction-data/MemorizationTypingRecallData.ts
```

This name is long but honest.

It avoids the trap of calling the shape simply `TypingData`.

It preserves:

```txt
cue -> retrieval attempt -> target
```

This is a positive counterexample: specificity is good when it protects cognition.

## 4. Vocabulary That May Be Too Generic

The audit also found the inverse problem: a name can be too generic for a structure that carries specific assumptions.

### DragDropData

Defined in:

```txt
packages/core/types/DragDropData.ts
```

Shape:

```txt
targets
items
item.target
shuffle
layout
```

The name suggests:

```txt
generic drag/drop data
```

But the structure assumes a classic item-to-target validation model:

```txt
each item has a target
```

This does not naturally cover:

- association groups with multiple expected entries;
- classification item-to-category scoring;
- sequence reorder;
- gap-fill drop zones;
- hotspot placement;
- non-evaluative drag/drop exploration.

The recent specialized POCs deliberately avoided this generic type and created:

- `AssociationDragDropData`;
- `ClassificationDragDropData`.

That was probably the right instinct.

Here, the issue is not:

```txt
specialized name hides generic structure
```

but:

```txt
generic name hides specialized assumptions
```

### FeedbackData

Defined in:

```txt
packages/core/types/feedback/FeedbackData.ts
```

Name:

```txt
FeedbackData
```

Status shape:

```ts
status: "success" | "partial" | "failed";
```

The name sounds broad, but the current status vocabulary is still mostly corrective/evaluative.

This is fine for existing evaluator-driven POCs:

- QCM;
- gap-fill;
- drag/drop;
- identification;
- transformation;
- memorization recall.

But for a non-evaluative reflective activity, `BHEResult.status: "completed"` may not map cleanly to `FeedbackData.status`.

This does not mean `FeedbackData` is wrong.

It means `FeedbackData` currently represents:

```txt
feedback after evaluative or correctness-oriented result
```

more than:

```txt
any possible learner-facing response
```

This is a vocabulary boundary to remember if reflective selection becomes implemented.

### ActivityModel

Defined in:

```txt
packages/core/types/ActivityModel.ts
```

This appears to be older generic vocabulary:

```txt
activity model
metadata
validate()
```

It is not central to the newer BHE pipeline:

```txt
PedagogicalObject
-> InteractionData
-> Renderer
-> UserInput
-> Evaluator
-> BHEResult
```

The risk is not immediate.

But if reused too broadly, `ActivityModel` could pull BHE back toward a generic "activity/exercise" vocabulary that the newer cognitive-set work has been moving beyond.

This should remain legacy-compatible vocabulary, not the conceptual center.

## 5. Concepts That Are Specialized And Should Stay Specialized

Not every specialized name is a problem.

Some specialized names protect meaning.

| Concept | Why specialization is useful |
| ------- | ---------------------------- |
| `TransformationInteractionData` | Preserves `source -> operation -> target`; prevents transformation from becoming generic typing. |
| `MemorizationTypingRecallData` | Preserves `cue -> retrieval -> target`; prevents recall from becoming generic typing. |
| `SequenceReorderData` | Preserves order and expected position; prevents sequence from becoming generic drag/drop. |
| `AssociationDragDropData` | Preserves group/zone expectations for association; avoids generic drag/drop flattening. |
| `ClassificationDragDropData` | Preserves item/category semantics and item-based scoring. |
| `InferenceJustifiedChoiceUserInput` | Preserves the fact that selection is paired with justification. |

This is important:

```txt
the goal is not neutral naming everywhere.
```

BHE has repeatedly confirmed:

```txt
same gesture != same pedagogy
```

So many specialized names are correct and desirable.

The audit only flags names where the structure is being pulled into a use case broader than the name.

## 6. False Architectural Pressure

Some recent conceptual pressure may be vocabulary pressure rather than a missing architecture layer.

### Non-Evaluative Selection

Question:

```txt
Do we need a new object?
```

Likely answer:

```txt
No.
```

The current core already has:

- `PedagogicalObject`;
- `CognitiveOperation`;
- `InteractionMode: "selection"`;
- `BHEResult.status: "completed"`;
- optional score;
- result details and signals.

The real discomfort is:

```txt
there is no neutral SelectionUserInput name.
```

This is vocabulary-level, not architecture-level.

### Moment

The BHE-BE documents already concluded that `Moment` is too mixed to become a core object now.

This audit reinforces that conclusion.

Several things that `Moment` was trying to capture can already be described with existing vocabulary:

- cognitive operations;
- learning goals;
- pedagogical content;
- interaction modes;
- BHEResult signals;
- documentation.

The remaining parts, such as pedagogical transition or teacher orchestration, are still observational.

So `Moment` pressure is not solved by a rename, but it also does not yet justify a new object.

### Reflective Evaluation

Non-evaluative activities may need:

```txt
recording
interpretation
completion
signals
```

But this does not necessarily require a new evaluator architecture.

It may only require keeping `BHEResult` broad and avoiding correctness-oriented names where they do not apply.

### Generic Drag/Drop

The older `DragDropData` type might tempt a generic drag/drop abstraction.

Recent POCs show the opposite:

```txt
drag/drop gesture is shared,
but association and classification semantics differ.
```

So here the false pressure goes the other way:

```txt
do not let a generic name create a generic architecture.
```

## 7. Minimal Clarification Opportunities

No code should change as part of this audit.

Still, several small future clarifications are visible.

### Documentation Clarification

Document that:

```txt
IdentificationSelectionUserInput
= selection of expected targets for IdentificationSet
```

and not:

```txt
all possible selection input
```

### Future Neutral SelectionUserInput

If a real non-evaluative selection implementation appears, the smallest future addition would likely be:

```ts
SelectionUserInput
```

meaning only:

```txt
the user selected one or more options
```

This should be added as a sibling, not as a replacement.

### Avoid Renaming Existing Types

Do not rename:

- `IdentificationSelectionUserInput`;
- `IdentificationSelectionData`;
- `QcmUserInput`;
- `InferenceJustifiedChoiceUserInput`.

They are meaningful in their current contexts.

### Treat DragDropData As Legacy / Narrow

Avoid treating current `DragDropData` as the generic future of all drag/drop.

The specialized drag/drop data shapes should remain the stronger pattern.

### Watch FeedbackData Boundary

If non-evaluative activities later need learner-facing feedback, check whether `FeedbackData.status` should remain correctness-oriented or whether a separate reflective response shape is needed.

Do not decide now.

## 8. Risks

### Over-Generalization

The biggest risk is flattening useful cognitive distinctions.

For example:

```txt
QCM selection
Identification selection
Inference choice
Reflective questionnaire
```

all involve selecting something, but they do not mean the same thing.

### Premature Renaming

Renaming specialized types would create churn and may weaken the successful POCs.

The issue is not that existing names are wrong.

The issue is that a new neutral sibling may eventually be needed.

### Unnecessary Abstraction

A neutral name can accidentally become a generic engine.

That should be avoided.

If `SelectionUserInput` ever appears, it should not imply:

- generic selection evaluator;
- generic selection renderer;
- registry;
- runtime layer.

### Loss Of Domain Meaning

Some long names are doing useful work.

`MemorizationTypingRecallUserInput` is verbose, but it protects the difference between:

```txt
typing recall
typing transformation
typing gap-fill
typing inference justification
```

The system should not simplify names at the cost of cognition.

### Legacy Vocabulary Pull

Older names such as `ActivityModel` and `DragDropData` may pull interpretation back toward generic exercise structures.

They should be handled carefully when writing future docs or examples.

## 9. Recommendation

Answer:

```txt
the engine seems to suffer mostly from a few vocabulary tensions,
not from a lack of concepts.
```

The current BHE core already has strong, useful generic concepts:

- `PedagogicalObject`;
- `CognitiveOperation`;
- `InteractionMode`;
- `UserInput`;
- `BHEResult`;
- `AdaptiveRouting`.

The most interesting vocabulary tensions are:

1. `IdentificationSelectionUserInput`
   - structurally reusable selected ids;
   - semantically tied to identification.

2. `IdentificationSelectionData`
   - structurally close to generic selectable options;
   - semantically tied to expected targets.

3. `QcmUserInput` / `QcmData`
   - structurally choice-based;
   - current usage is scored and correctness-oriented.

4. `DragDropData`
   - generic name;
   - specialized item-target validation assumptions.

5. `FeedbackData`
   - generic name;
   - current statuses are evaluative rather than reflective/completion-oriented.

No immediate code change is recommended.

The healthiest next move is:

```txt
preserve the vocabulary audit
avoid renaming
avoid new architecture
add neutral names only when a concrete implementation needs them
```

If a real non-evaluative selection flow becomes the next implementation POC, the smallest reasonable addition would be a neutral `SelectionUserInput`.

Until then, the current core is adequate.

The main architectural lesson is:

```txt
some pressure that looks like missing architecture
is actually naming pressure.
```

And the counter-lesson is equally important:

```txt
some generic names can hide specialized assumptions.
```

BHE should keep both warnings in memory before creating any new concept.
