# Non-Evaluative Interaction Representation POC

## 1. Activity

This document belongs to the `experiment/bhe-be` branch.

It is a first mini POC of BHE-BE representation using the current BHE core only.

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

This activity has:

- no correct answer;
- no wrong answer;
- no score;
- no grade;
- no corrective evaluation.

The observed pedagogical objective is closer to:

```txt
strategy awareness
self-observation
learner positioning
```

The learner is not being tested.

The learner is being invited to notice and name their own vocabulary-learning habits.

## 2. Possible Representation

The goal is to represent the activity with existing BHE concepts only:

- `PedagogicalObject`;
- `CognitiveOperation`;
- `InteractionData`;
- `UserInput`;
- `BHEResult`.

No new concept is introduced.

No new type is proposed.

### PedagogicalObject

A possible high-level representation:

```txt
PedagogicalObject

id:
  memorising-vocabulary-strategy-awareness

pedagogicalType:
  memorization

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

content:
  question:
    How do you usually learn vocabulary?

  options:
    - write-lists
    - use-flashcards
    - repeat-aloud
    - make-associations
```

This representation is not perfect, but it is readable.

The activity belongs to a memorization-oriented brick, but the learner is not directly memorizing here. The object is about awareness of memorization strategies.

The useful part is that `CognitiveOperation` can describe the mental action without creating a new object:

```txt
reflect
notice
compare
selfAdjust
```

### InteractionData

The interaction data can be described as a selection-shaped interaction:

```txt
Selection-like InteractionData

context:
  How do you usually learn vocabulary?

selectionMode:
  multiple

options:
  - optionId: write-lists
    label: I write lists

  - optionId: use-flashcards
    label: I use flashcards

  - optionId: repeat-aloud
    label: I repeat words aloud

  - optionId: make-associations
    label: I make associations

expected:
  none
```

Using only the current core vocabulary, the closest existing shape is `IdentificationSelectionData`:

```txt
IdentificationSelectionData

context:
  How do you usually learn vocabulary?

selectionMode:
  multiple

targets:
  - targetId: write-lists
    label: I write lists

  - targetId: use-flashcards
    label: I use flashcards

  - targetId: repeat-aloud
    label: I repeat words aloud

  - targetId: make-associations
    label: I make associations
```

No `expected` flag is needed.

The shape works.

The name is not ideal.

The learner is not identifying expected targets. They are selecting statements that describe them.

## 3. User Input

The user input is simply:

```txt
the learner selected one or more options
```

A possible selected response:

```txt
I write lists
I make associations
```

Using existing BHE types, the closest current representation is:

```txt
IdentificationSelectionUserInput

kind:
  identification-selection

selectedTargetIds:
  - write-lists
  - make-associations
```

This works structurally because it records selected ids.

The vocabulary is awkward because:

```txt
identification-selection
```

suggests a different pedagogical function:

```txt
find the expected targets
```

Here, the learner is doing:

```txt
report my habits
observe my strategies
position myself before learning
```

`QcmUserInput` would be less appropriate because it assumes a single `selectedChoiceId`, while this activity may naturally allow multiple choices.

`InferenceJustifiedChoiceUserInput` is also not appropriate because the learner is not selecting an inference or justifying an interpretation.

So the best current representation is:

```txt
selected ids carried by an existing selection-like UserInput
```

with a clear note:

```txt
do not reuse the Identification evaluator
```

The selection should be recorded or interpreted, not corrected.

## 4. BHEResult

This activity should not produce:

- `score`;
- `maxScore`;
- `isCorrect`;
- `correctTargetIds`;
- `missingTargetIds`;
- `extraTargetIds`;
- `success`;
- `failed`.

A plausible BHE result is:

```txt
BHEResult

objectId:
  memorising-vocabulary-strategy-awareness

status:
  completed

completion:
  1

details:
  selectedStrategyIds:
    - write-lists
    - make-associations

  selectedStrategies:
    - I write lists
    - I make associations

  hasCorrectAnswer:
    false

  purpose:
    self-observation

  pedagogicalFunction:
    strategy-awareness

signals:
  - non-evaluative-selection
  - strategy-awareness
  - learner-positioning
```

This uses `BHEResult` as a record of meaningful completion.

It does not treat the interaction as assessment.

It also leaves room for a future adaptive pathway without turning the selection into a score.

For example:

```txt
if learner selects only passive strategies:
  suggest active recall later

if learner selects flashcards:
  connect to memorization strategy content

if learner selects associations:
  connect to association-based vocabulary work
```

That routing would still consume `BHEResult`.

It would not require correctness.

## 5. Friction Analysis

Question:

```txt
Did anything actually break?
```

Answer:

```txt
No.
```

The current core can represent the activity.

The following parts work naturally:

- `PedagogicalObject` can carry the activity;
- `CognitiveOperation` can describe the mental action;
- `InteractionMode: "selection"` already exists;
- selected ids can be represented;
- `BHEResult` can express completion without score;
- result `details` and `signals` can preserve pedagogical meaning.

Question:

```txt
Did anything merely feel awkward?
```

Answer:

```txt
Yes.
```

The awkwardness is mostly vocabulary.

The closest existing data/input names are:

```txt
IdentificationSelectionData
IdentificationSelectionUserInput
```

They are structurally usable, but pedagogically colored.

They imply:

```txt
selection of expected targets
```

where this activity needs:

```txt
selection of self-descriptive options
```

The evaluator attached to Identification should not be used here, because it would introduce:

- expected targets;
- correct targets;
- missing targets;
- extra targets;
- score;
- success / partial / failed.

None of those are appropriate for this activity.

So the POC reveals a naming tension, not a pipeline gap.

## 6. Conclusion

Conclusion:

```txt
Representation works with minor naming issues.
```

The current BHE core can represent this activity without new concepts and without modifying the engine.

The strongest fit is:

```txt
PedagogicalObject
  +
CognitiveOperation:
  reflect / notice / compare / selfAdjust
  +
selection-shaped InteractionData
  +
selected ids as UserInput
  +
BHEResult:
  status completed
  no score
  reflective details
  pedagogical signals
```

Nothing in the pipeline breaks.

The main friction remains the one already identified by the audit:

```txt
the engine has selection as an interaction mode,
but not yet a neutral SelectionUserInput name.
```

This is not a major gap.

It is a useful naming signal for a future implementation.

For now, the best decision is:

```txt
do not modify the core
do not create a new type
do not create a new evaluator
preserve the observation
```

If a real non-evaluative selection renderer or runtime flow is implemented later, the smallest likely addition would be a neutral `SelectionUserInput`.

But this POC does not require it yet.
