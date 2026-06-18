# Non-Evaluative Interaction Stress Test

## 1. Context

This document belongs to the `experiment/bhe-be` branch.

It marks a small but important shift:

```txt
from BHE-BE observation
to confrontation with the existing BHE core
```

The question is not pedagogical in the abstract.

The question is:

```txt
Can the current BHE core
represent a real pedagogical activity
without introducing new concepts?
```

The activity is inspired by:

```txt
REVAMP - Memorising vocabulary - Beci_VFv2.pdf
```

Simplified activity:

```txt
Question:
How do you usually learn vocabulary?

Choices:
A. I write lists
B. I use flashcards
C. I repeat words aloud
D. I make associations
```

There is no correct answer, no wrong answer, no score, and no grade.

The pedagogical function seems to be:

```txt
strategy awareness
```

or:

```txt
self-observation
```

This stress-test deliberately uses only existing BHE concepts:

- `PedagogicalObject`;
- `CognitiveOperation`;
- `InteractionData`;
- `UserInput`;
- `BHEResult`.

No new concept is introduced.

## 2. Current Representation Attempt

### PedagogicalObject

At the broad object level, the activity can be represented as a `PedagogicalObject`.

The useful existing fields are:

```ts
learningGoal
cognitiveOperations
interactionModes
content
```

A plausible representation would describe the activity as a learning-focus object whose goal is not vocabulary recall itself, but awareness of learning strategies.

Example description, not implementation:

```txt
PedagogicalObject

learningGoal:
  domain: learning strategies
  skill: vocabulary learning awareness
  topic: memorising vocabulary

cognitiveOperations:
  - reflect
  - notice
  - compare
  - selfAdjust

interactionModes:
  - selection
```

This works reasonably well.

The existing `CognitiveOperation` vocabulary is especially helpful. It avoids creating a new concept such as `StrategyAwarenessMoment`. The learner is mentally reflecting, noticing habits, comparing strategies, and possibly preparing self-adjustment.

The first tension appears at `pedagogicalType`.

The closest existing type is probably:

```txt
memorization
```

but the activity itself is not asking the learner to memorize or recall vocabulary. It belongs to a memorization brick, but it is a reflective preparation activity about memorization strategies.

This is acceptable as a stress-test, but slightly uncomfortable.

### InteractionData

The interaction shape is simple:

```txt
question
choices
single or multiple selection
no expected answer
```

The existing core has `IdentificationSelectionData`:

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

This can technically represent the activity:

```txt
context:
  How do you usually learn vocabulary?

selectionMode:
  multiple

targets:
  write-lists
  use-flashcards
  repeat-aloud
  make-associations

expected:
  omitted for every target
```

The shape fits.

The name does not.

`IdentificationSelectionData` suggests that the learner is identifying expected targets. Here, the learner is reporting their own habit. There are candidates, but no target to identify.

So the current core can express the interaction structure, but only by borrowing a semantically nearby shape.

A renderer-level `QcmData` shape would be even less comfortable if it requires a `correctChoiceId`, because this activity has no correct choice.

### UserInput

The learner action can be represented as selected ids.

The closest existing `UserInput` is:

```ts
IdentificationSelectionUserInput
```

Example:

```ts
{
  kind: "identification-selection",
  selectedTargetIds: [
    "write-lists",
    "make-associations"
  ]
}
```

Again, the structure works.

But the semantic label is uncomfortable:

```txt
identification-selection
```

The learner is not identifying a correct target. They are declaring or observing their own strategy.

`QcmUserInput` is also possible for a single-choice version:

```ts
{
  interactionMode: "qcm",
  selectedChoiceId: "use-flashcards"
}
```

But `qcm` is even more assessment-colored in the current BHE implementation, especially because existing QCM evaluators expect a correct answer.

For this activity, `selectedTargetIds` is structurally better than `selectedChoiceId`, because the real Boost'English questionnaire may allow multiple answers.

### BHEResult

`BHEResult` is surprisingly flexible here.

It already says that result status is broader than correct/incorrect, and that score is optional.

The activity could produce:

```ts
{
  objectId: "memorising-vocabulary-i-start",
  status: "completed",
  completion: 1,
  details: {
    selectedStrategyIds: [
      "write-lists",
      "make-associations"
    ],
    hasCorrectAnswer: false,
    purpose: "self-observation"
  },
  signals: [
    "strategy-awareness",
    "non-evaluative-selection"
  ]
}
```

No `score` is necessary.

No `maxScore` is necessary.

The result can be a record of participation, self-observation, or completion.

This is already compatible with the current `BHEResult` shape.

## 3. Point Of Friction

The representation becomes uncomfortable in three places.

### 1. Pedagogical Type

The activity belongs to a memorization-oriented brick, but it is not itself a recall task.

Calling the whole thing `memorization` is acceptable at brick level, but this specific activity is more about:

```txt
reflecting on memorization strategies
```

The core can express this with:

```txt
cognitiveOperations:
  reflect
  notice
  compare
  selfAdjust
```

So this is a mild tension, not a gap.

### 2. InteractionData Naming

Existing selection data is semantically attached to identification.

For a non-evaluative questionnaire, the same data shape works:

```txt
context + choices + selected ids
```

but the name `IdentificationSelectionData` carries the wrong pedagogical implication.

This does not require a new type now.

It simply reveals that selection is currently available through a specialized object, not as a neutral interaction shape.

### 3. UserInput Naming

`IdentificationSelectionUserInput` can carry the selected ids, but it also suggests:

```txt
the learner selected targets to be checked
```

That is not what happens here.

The learner selected statements that describe them.

This is the sharpest friction.

The input structure is right.

The semantic name is not neutral enough.

## 4. Evaluation

This activity does not need evaluation in the corrective sense.

There is no correct answer.

There is no wrong answer.

There is no score.

What it may need is a minimal interpretation step.

Possible non-corrective interpretation:

```txt
Did the learner answer?
Which strategies did they select?
Should the next content acknowledge these choices?
Should the learner see a reflective summary?
```

This is not evaluation as correction.

It is closer to:

```txt
observation
```

or:

```txt
reflective completion
```

The current engine can still use the return pipeline if the evaluator is understood broadly:

```txt
UserInput
-> interpret / record
-> BHEResult
```

But the word `Evaluator` becomes slightly uncomfortable if it implies scoring.

The activity probably does not need an evaluator that checks correctness.

It may need a tiny result producer that records completion and selected strategy ids.

That can still produce `BHEResult`.

## 5. BHEResult And The Return Pipeline

The current engine does not strictly require:

```txt
interaction
-> evaluation
-> scored result
```

`BHEResult` already supports:

- `status: "completed"`;
- optional `score`;
- optional `maxScore`;
- optional `completion`;
- `signals`;
- arbitrary `details`.

So it can already represent:

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

The important point is that `BHEResult` should not be treated as synonymous with grade.

For this activity, the result is not:

```txt
correct / incorrect
```

It is:

```txt
learner completed a reflective selection
and exposed strategy-awareness data
```

The current shape can carry that.

The friction is not `BHEResult`.

The friction is upstream, around the available names for non-evaluative selection input.

## 6. Temporary Representation

Without adding any new concept, the best current representation is:

```txt
PedagogicalObject
  pedagogicalType: memorization
  pedagogicalFamily: retentive
  learningGoal:
    domain: learning strategies
    skill: vocabulary learning awareness
    topic: memorising vocabulary
  cognitiveOperations:
    reflect
    notice
    compare
    selfAdjust
  interactionModes:
    selection

InteractionData
  selection-like data
  question/context
  candidate strategy options
  no expected target

UserInput
  selected option ids

BHEResult
  status: completed
  completion: 1
  no score
  details:
    selected strategies
    no correct answer
    reflective purpose
  signals:
    strategy-awareness
```

This stays inside the existing core vocabulary.

It does not require `Moment`.

It does not require `ReflectionMoment`.

It does not require a new runtime layer.

## 7. Conclusion

Answer:

```txt
Yes, with minor tension
```

The current BHE core can represent this activity.

It works naturally at the level of:

- `PedagogicalObject`;
- `CognitiveOperation`;
- `BHEResult`;
- optional score;
- result details and signals.

The main tension is not conceptual collapse.

The main tension is naming:

```txt
selection exists,
but non-evaluative reflective selection
does not yet have a neutral InteractionData/UserInput name.
```

That is not yet a significant gap.

It is a useful stress signal.

For now, BHE should not create a new concept. The existing engine is flexible enough to represent:

```txt
interaction
-> observation
-> result
```

The core lesson is:

```txt
BHEResult can describe meaningful completion,
not only correctness.
```

This is enough for the current activity.
