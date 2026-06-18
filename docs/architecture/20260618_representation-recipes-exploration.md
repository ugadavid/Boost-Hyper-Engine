# Representation Recipes Exploration

## 1. Context and Scope

The experimental `PedagogicalUseCatalog` improves the first authoring decision:

```txt
What is this interaction for?
```

The first application to *Thinking in English* showed that it does not yet make the next decisions equally discoverable:

```txt
Which existing interaction carrier fits?
Which UserInput records the learner action?
Is an evaluator appropriate?
What should BHEResult mean here?
```

This document explores whether a provisional descriptive layer, called **Representation Recipes**, could bridge that gap.

The name is not stabilized. No runtime abstraction, type, package, catalog entry, or core change is proposed. The examples below reconstruct paths using current BHE concepts only.

## 2. What Is a Representation Recipe?

A representation recipe could be a documented, reusable path from an author-facing pedagogical use to a plausible current BHE representation.

It would not define what the learner should learn. The catalog already helps with that orientation. It would not define a new BHE object either. Instead, it would expose the decisions that are currently hidden between a catalog entry and concrete engine vocabulary:

```txt
Pedagogical Use
-> concrete Interaction Shape
-> closest current interaction carrier
-> semantic UserInput
-> evaluation or non-evaluation policy
-> BHEResult semantics
```

The shortened path requested for this exploration is:

```txt
Pedagogical Use
↓
Interaction Shape
↓
UserInput
↓
BHEResult
```

In practice, the difficult step is not merely choosing `selection` or `typing`. It is deciding which specialized current type carries that shape and whether its usual evaluator still matches the pedagogical use.

A recipe would therefore be closer to an annotated precedent than to a template:

- it starts from one pedagogical use;
- it names one plausible concrete path, not the only valid path;
- it distinguishes structural reuse from semantic fit;
- it states whether correctness exists;
- it identifies where current names are awkward;
- it stops where the activity requires contextual judgment.

Its value would be discoverability. Its danger would be prescription: an author could mistake a common path for a rule, or assume that the same interaction shape always carries the same pedagogical meaning.

## 3. Recipe Reconstruction

### 3.1 Reflect Through Selection

Plausible activity: the learner answers *Do you translate in your head?* with Yes, Sometimes, or No.

```txt
Pedagogical Use
  Reflect Through Selection
  cognitiveOperations: notice + reflect + compare
  non-evaluative
↓
Interaction Shape
  InteractionMode: selection
  closest current carrier: IdentificationSelectionData
  selectionMode: single
  targets: yes / sometimes / no
  expected: omitted
↓
UserInput
  IdentificationSelectionUserInput
  kind: identification-selection
  selectedTargetIds: [sometimes]
↓
BHEResult
  status: completed
  completion: 1
  score and maxScore: omitted
  details: selected response and reflective context
  signals: reflection / self-observation
```

The Identification evaluator is not used. It would introduce expected, missing, extra, and correct targets that do not exist in the activity.

This recipe is structurally plausible and was already demonstrated descriptively in the *Thinking in English* work. Its friction is semantic naming: `IdentificationSelectionData` and `IdentificationSelectionUserInput` are the nearest carriers, but the learner is reporting rather than identifying an expected target.

### 3.2 Diagnose Through Selection

Plausible activity: an initial Wayfinding check asks learners which direction-giving situations they can currently handle, then uses the response to choose the amount of support that follows.

```txt
Pedagogical Use
  Diagnose Through Selection
  cognitiveOperations: identify + notice + reflect
  non-evaluative when based on self-report
↓
Interaction Shape
  InteractionMode: selection
  closest current carrier: IdentificationSelectionData
  selectionMode: single or multiple
  expected: omitted for self-positioning
↓
UserInput
  IdentificationSelectionUserInput
  selectedTargetIds: selected starting-point statements
↓
BHEResult
  status: completed
  completion: 1
  score and maxScore: omitted
  details: selected starting-point evidence
  signals: learner positioning / support need
```

Here the selected answer is evidence for what happens next, not evidence of success. `AdaptiveRouting` may consume fields from a `BHEResult`, but the recipe does not by itself determine a route or stabilize diagnostic signal names.

This path can also become evaluative if the diagnosis is a knowledge check with expected answers. In that case, an existing evaluator and `success`, `partial`, or `failed` result may be appropriate. The pedagogical-use label alone does not decide between self-report diagnosis and performance diagnosis.

### 3.3 Recall Through Typing

Plausible activity: a learner sees a vocabulary cue and types the target before seeing it.

```txt
Pedagogical Use
  Recall Through Typing
  cognitiveOperation: produce
  evaluative retrieval practice
↓
Interaction Shape
  InteractionMode: typing
  MemorizationTypingRecallData
  recallGoal + cue/expected-target items
↓
UserInput
  MemorizationTypingRecallUserInput
  kind: memorization-typing-recall
  attempts: itemId + typed value
↓
BHEResult
  evaluateMemorizationTypingRecall
  status: success / partial / failed
  score + maxScore + completion
  details: actual answer, accepted targets, correctness by item
```

This is the clearest recipe. The current core already contains the specialized interaction data, semantic input, adapter, evaluator, and result details. The use, response semantics, and evaluator agree.

The important recipe contribution is differentiation: it prevents an author from treating every typed response as `ContextualTypingUserInput`, GapFill, or Transformation merely because the visible gesture is typing.

### 3.4 Reflect Through Typing

Plausible activity: after noticing internal translation, the learner describes when it happens and how it affects speaking.

```txt
Pedagogical Use
  Reflect Through Typing
  cognitiveOperations: reflect + produce + selfAdjust
  non-evaluative
↓
Interaction Shape
  InteractionMode: typing
  no semantically neutral open-text InteractionData is currently evident
↓
UserInput
  closest structural carrier: ContextualTypingUserInput
  typedAnswers: one prompt-associated value
↓
BHEResult
  status: completed
  completion: 1
  score and maxScore: omitted
  details: submitted reflection
  signals: reflection / self-observation
```

No deterministic text evaluator is used. Exact matching, accepted variants, and corrective feedback would reinterpret a personal reflection as an answer key problem.

This reconstruction is possible at the generic `InteractionMode`, `UserInput`, and `BHEResult` levels, but the concrete carrier is awkward. `ContextualTypingUserInput` records values against `blankId`, which suggests completion rather than open reflection. Transformation and Memorization typing inputs are even more semantically specialized.

The recipe therefore reveals a discoverability gap and a naming tension; it does not establish that `ContextualTypingUserInput` is the canonical representation of reflective text.

### 3.5 Apply Through a Situated Task

Plausible activity: in Wayfinding, the learner writes directions that another learner can follow on a map.

```txt
Pedagogical Use
  Apply Through a Situated Task
  cognitiveOperations: produce + transfer
  success concerns functional use in context
↓
Interaction Shape
  InteractionMode: typing for this particular activity
  the situated task itself is framing, not an InteractionMode
↓
UserInput
  closest structural carrier: ContextualTypingUserInput
  typedAnswers: the submitted directions
↓
BHEResult
  status: completed when only submission is observed
  or success / partial / failed only when functional outcome is actually evaluated
  details may preserve the response and observed outcome
  score remains optional
```

The first three catalog examples do not identify one universal interaction path here. The same use could plausibly require selection, drag/drop, reorder, or typing depending on what the situation asks the learner to do.

The result is also conditional:

- if BHE only observes that directions were submitted, `completed` is supported;
- if an existing deterministic criterion evaluates required route elements, an evaluative result may be possible;
- if success means that another learner actually reaches the intended destination, the decisive evidence comes from the situated action and is not represented by the typed response alone.

This is not merely a missing type lookup. The recipe cannot infer the success criterion from the pedagogical-use label. The author must define what observable evidence makes the situated action successful.

## 4. Recurrent Patterns

### 4.1 Shape Does Not Determine Meaning

The five reconstructions use only two visible shapes, selection and typing, yet they produce very different semantics:

| Shape | Possible use | Meaning of response |
| --- | --- | --- |
| Selection | Reflection | A self-description |
| Selection | Diagnosis | Starting-point evidence for what follows |
| Typing | Recall | A retrievable target compared with expected answers |
| Typing | Reflection | A personal explanation without deterministic correctness |
| Typing | Situated application | A contextual action or artifact whose success criterion comes from the situation |

The recurring decision is therefore not only:

```txt
Which interaction shape?
```

It is:

```txt
What does the captured response mean?
```

### 4.2 Evaluation Policy Is a Branch Point

Each recipe needs an explicit answer to:

```txt
Does correctness exist here?
```

When correctness exists and the specialized semantics match, an existing evaluator can produce `success`, `partial`, or `failed` with score details. Recall Through Typing is the strongest example.

When correctness does not exist, the interaction can still produce a meaningful `BHEResult` with `completed`, optional `completion`, no score, and contextual `details` or `signals`. Reflect Through Selection is the strongest example.

Diagnosis and situated application show that the answer may depend on the concrete activity rather than on the pedagogical-use label.

### 4.3 The Closest Carrier Is Often Specialized

Current end-to-end paths are named after semantic families:

- Identification selection;
- Memorization typing recall;
- Transformation typing;
- Inference justified choice;
- Sequence reorder.

Reuse is natural when the use agrees with that family. It becomes awkward when an author needs only the structural action. The repeated friction is:

```txt
structural fit
!=
semantic fit
```

### 4.4 BHEResult Is the Convergence Point

Despite different paths, `BHEResult` can represent both:

- evaluated performance;
- meaningful non-scored completion.

It is the most stable common endpoint in these reconstructions. The unresolved part is how an author chooses the right status, fields, details, signals, and continuation without copying assumptions from an unrelated evaluator.

### 4.5 Continuation Is Part of the Meaning

Reflection usually needs acknowledgement or informational continuation rather than correction. Diagnosis needs routing or adjusted support. Recall needs comparison and corrective feedback. Situated application may need peer, teacher, or action-based validation.

The requested four-step path ends at `BHEResult`, but the authoring decision often does not. What follows the result helps distinguish recipes that otherwise share the same input shape.

## 5. Missing Bridges

The exploration identifies several missing bridges in discoverability, without concluding that new core concepts are required.

### Concrete Carrier Lookup

The catalog suggests `selection` or `typing`, but does not show the closest current InteractionData and UserInput pair, or warn when that pair is only a structural fit.

### Response Semantics

The same selected id or typed string can mean a correct answer, self-report, diagnosis, reflection, or attempted action. The author needs to state that meaning before choosing an evaluator.

### Evaluator Boundary

Current examples make evaluator-driven paths highly visible. Authors need an explicit indication of when to use an existing evaluator, when not to use one, and when no existing evaluator matches the intended evidence.

### Result Policy

`BHEResult` is flexible, but the author still has to infer:

- `completed` versus `success`, `partial`, or `failed`;
- whether score and maxScore belong;
- what completion measures;
- which details and signals preserve useful meaning.

### Continuation Policy

The path from result to correction, information, support, or routing is not implied by the interaction shape. The default corrective feedback path is inappropriate for several of these uses.

### Situated Evidence

For a situated task, the submitted artifact may not be the decisive evidence. A route can be grammatically plausible yet unusable; another learner reaching the destination is a different observation from receiving typed directions. Existing generic result flexibility can record an outcome, but the recipe still needs activity-specific judgment about what was actually observed.

### High-Level Object Choice

The recipe path does not resolve every `PedagogicalObject` decision. Recent work already found tension around choosing a `pedagogicalType` for reflection or self-positioning. A recipe may document the nearest carrier, but should not disguise that ambiguity as a settled mapping.

## 6. Author Value

Representation recipes would help when they compress a difficult repository-reading journey into a visible precedent.

For *Thinking in English*, a recipe could make these discoveries immediate:

```txt
selection can be non-evaluative
IdentificationSelectionUserInput is only the closest current carrier
expected targets are omitted
the Identification evaluator is not used
BHEResult can be completed without a score
continuation should be informational rather than corrective
```

That is real author value. It addresses the exact gap left by the catalog.

The value is lower where the core already exposes a coherent specialized path. Recall Through Typing mostly needs a good example and differentiation from other typing uses.

The layer would add overhead if it became:

- a second catalog repeating labels and descriptions;
- a mandatory runtime abstraction;
- a one-to-one mapping from pedagogical use to interaction mode;
- a collection of recipes that hide ambiguity;
- a promise that every documented path is fully implemented.

Its useful form is therefore narrow: a small set of evidence-backed, non-normative representation precedents. Each precedent should expose decisions and boundaries rather than remove author judgment.

## 7. Recommendation

```txt
Representation recipes appear partially useful.
```

They appear useful because they bridge a demonstrated discoverability gap. The catalog identifies the pedagogical orientation, while a recipe can reveal the nearest concrete carrier, the evaluator boundary, and the intended `BHEResult` semantics.

They appear only partially useful because there is no stable one-to-one translation from pedagogical use to BHE representation:

- one use may support several interaction shapes;
- one shape may support several uses;
- diagnosis can be evaluative or non-evaluative;
- situated application cannot be represented faithfully until its observable success condition is known;
- some nearest current carriers fit structurally but not semantically.

The strongest evidence for the idea is not that every use can receive a fixed recipe. It is that showing one plausible path together with its assumptions makes existing BHE capability easier to discover.

The clearest recipe is:

```txt
Recall Through Typing
-> MemorizationTypingRecallData
-> MemorizationTypingRecallUserInput
-> evaluateMemorizationTypingRecall
-> scored BHEResult
```

The most ambiguous recipe is:

```txt
Apply Through a Situated Task
```

because the pedagogical use is contextual framing rather than an interaction shape, and because functional success may depend on evidence outside the submitted `UserInput`.

The main lesson for the authoring experiment is:

```txt
The missing bridge is not primarily another pedagogical label.
It is an explicit decision trail from response meaning
to concrete carrier, evaluation policy, and result semantics.
```

This exploration supports preserving Representation Recipes as a provisional documentation hypothesis. It does not yet support stabilizing them as a new concept or implementation layer.

## 8. Sources Observed

This reconstruction used only current repository material, especially:

- `PedagogicalUse` and `PedagogicalUseCatalog` in `packages/authoring`;
- current `InteractionMode`, specialized InteractionData, `UserInput`, and `BHEResult` types;
- the Memorization typing-recall adapter and evaluator;
- the non-evaluative interaction representation POC;
- the *Thinking in English* authoring and catalog-application explorations;
- the Wayfinding POC and recent author-entry-point work.

No code, package, TypeScript file, core concept, catalog entry, or runtime behavior was created or modified.
