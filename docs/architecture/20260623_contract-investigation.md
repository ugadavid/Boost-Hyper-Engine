# Contract Investigation

Date: 2026-06-23

Status: documentary investigation

Scope: no implementation, no package change, no new stabilized concept.

## Context

Recent work on authoring and real BHE paths has repeatedly surfaced the same signal:

```txt
same interaction mechanics
different pedagogical meaning
```

The clearest example is selection.

The learner may perform a similar visible action:

```txt
select one or more options
```

but the pedagogical meaning may be:

```txt
identify the correct targets
```

or:

```txt
reflect on personal habits
```

or:

```txt
surface a diagnostic starting point
```

or:

```txt
notice patterns before a rule is explained
```

This investigation asks whether BHE is already showing something like a:

```txt
Pedagogical Contract
```

or:

```txt
Interaction Contract
```

without deciding that either term should become a stabilized concept.

The guiding question is:

```txt
What is BHE already telling us?
```

## Signaux observés

### 1. Interaction shape is not pedagogical function

This signal appears repeatedly in the documentation.

Relevant documents:

```txt
docs/architecture/20260604_thinking-in-english_i-start_moment-poc.md
docs/architecture/20260604_countable-uncountable_i-learn_moment-poc.md
docs/architecture/20260604_moment-emergence-synthesis.md
docs/architecture/20260522_transformation_v0_emergence.md
docs/architecture/20260521_productive_objects_emergence_pattern.md
docs/architecture/20260623_reflective-selection-ui-investigation.md
```

The repeated lesson is:

```txt
renderer shape != cognitive operation
```

and:

```txt
gesture != pedagogy
```

A text field can mean recall, completion, transformation, explanation, justification, or reflection.

A checkbox list can mean identification, diagnosis, self-positioning, or noticing.

A drag-drop surface can mean association, classification, or ordering, depending on what relationship is being enacted.

### 2. Selection is the strongest signal

Relevant objects and documents:

```txt
IdentificationSelection
Reflect Through Selection
Thinking in English
Non-Evaluative Interaction documents
Completed Path Spike
Reflective Selection UI Investigation
```

Corrective identification:

```txt
IdentificationSet
↓
IdentificationSelectionData
↓
IdentificationSelectionUserInput
↓
evaluateIdentificationSelection
↓
BHEResult.success | partial | failed
```

Reflective self-positioning:

```txt
Reflect Through Selection
↓
IdentificationSelectionData as structural carrier
↓
IdentificationSelectionUserInput
↓
createCompletedResultFromUserInput
↓
BHEResult.completed
```

The mechanics are close:

```txt
select target ids
```

but the learner contract is different:

```txt
find the correct targets
```

versus:

```txt
select what describes your thinking, habit, or position
```

This is not merely a different feedback message. It changes the meaning of the learner action.

### 3. Classification is not always simply corrective

The real BHE path validation showed:

```txt
Countable / Uncountable
↓
Categories
↓
ClassificationSet
↓
Real BHE Path
```

This path can be corrective when learners classify examples into already-stabilized categories.

But the Explore Before The Rule work shows another use:

```txt
observe
↓
compare
↓
infer
↓
stabilize
↓
practice
```

In that sequence, category work may begin as exploratory or provisional before it becomes corrective practice.

So classification can carry at least two contracts:

```txt
classify known categories correctly
```

and:

```txt
use categories to discover or test a distinction
```

The underlying `ClassificationSet` remains useful, but the surrounding contract changes.

### 4. Transformation tends to be corrective/productive, but not only mechanical

The Transformation V0 emergence document defines the central operation as:

```txt
source
↓
deliberate operation
↓
target
```

Passive Voice validates a real path:

```txt
TransformationSet
↓
TransformationInteractionData
↓
TransformationTypingUserInput
↓
evaluateTransformationTyping
↓
BHEResult.success | partial | failed
```

Transformation therefore currently assumes a fairly strong contract:

```txt
produce a target form from a source according to an operation
```

This is usually practice or corrective production.

However, documentation also mentions possible future recognition, rehearsal, intercomprehension, register shift, or process-aware feedback. These do not erase the source-to-target contract, but they may change whether the activity feels like:

```txt
practice
```

or:

```txt
assessment
```

or:

```txt
guided transformation rehearsal
```

The key distinction remains:

```txt
typing gesture != typing cognition
```

### 5. Inference is often exploratory, but not always open

`InferenceSet` is described as:

```txt
clues
↓
hypothesis
↓
justification / interpretation
```

This makes inference naturally close to exploration.

But the interaction exploration report shows several possible contracts:

- QCM inference: choose the best inference;
- evidence selection: select clues that support an inference;
- justified choice: choose and explain;
- short answer: produce an inferred answer;
- free explanation: reason qualitatively;
- guided dialogue: build interpretation step by step.

Some of these are corrective enough for a classic evaluator.

Others are exploratory, qualitative, or plausibility-based.

Therefore inference is not simply:

```txt
exploratory by nature
```

It is better read as:

```txt
interpretive by nature,
with contracts ranging from guided exploration to evaluated inference.
```

### 6. Memorization is not always corrective

Memorization documents distinguish:

```txt
exposure
recognition
recall
self-evaluation
consolidation
```

Flashcards validate a low-pressure contract:

```txt
review / reveal / self-check
```

Typing recall validates a stronger contract:

```txt
cue
↓
active recall
↓
typed attempt
↓
deterministic check
```

Self-evaluation would validate a different contract:

```txt
learner judges known / unsure / unknown
```

So not all memorization activities are corrective.

They can be:

- exposure-oriented;
- self-checking;
- active recall practice;
- corrective recall;
- future scheduling/review signals.

The same flashcard-like mechanics may support both recognition and self-checking, but active recall introduces a stricter evidence contract.

## Contrats candidats

The following families emerge naturally from the documentation.

They should be read as analytical labels, not as proposed stable model objects.

### Corrective contract

Learner action is compared against expected data.

Typical result:

```txt
BHEResult.success | partial | failed
```

Appears in:

- `IdentificationSelection`;
- `ClassificationSet` practice;
- `TransformationSet` typing;
- `MemorizationTypingRecall`;
- QCM-like inference.

Learner experience:

```txt
There is a better or expected answer.
```

### Reflective contract

Learner action expresses self-position, habit, strategy, preference, or realization.

Typical result:

```txt
BHEResult.completed
```

Appears in:

- Thinking in English;
- Reflect Through Selection;
- Reflect Through Typing;
- non-evaluative interaction documents;
- Memorising Vocabulary strategy reflection.

Learner experience:

```txt
My response is meaningful, but not correct or incorrect.
```

### Diagnostic contract

Learner action provides evidence for what should happen next.

Typical result:

```txt
BHEResult.completed
```

or:

```txt
BHEResult.success | partial | failed
```

depending on whether the diagnostic evidence is self-report or knowledge performance.

Appears in:

- Diagnose Through Selection;
- Wayfinding starting-point checks;
- Thinking in English habit surfacing;
- authoring catalog notes.

Learner experience:

```txt
This tells the system or teacher where I am starting from.
```

### Exploratory contract

Learner action supports noticing, comparison, hypothesis, or rule discovery before stabilization.

Typical result:

```txt
completed
```

or:

```txt
lightly evaluated / partial
```

depending on phase.

Appears in:

- Explore Before The Rule;
- Countable / Uncountable;
- Compare Clarification;
- InferenceSet hypothesis work;
- provisional classification.

Learner experience:

```txt
I am trying to see or test a pattern.
```

### Practice contract

Learner action rehearses a known or recently stabilized form, relation, category, order, or response.

Typical result:

```txt
success | partial | failed
```

or sometimes:

```txt
completed
```

when practice is low-stakes or self-paced.

Appears in:

- Practice Through Controlled Interaction;
- Passive Voice transformation;
- Question Forms;
- Memorization active recall;
- Classification practice.

Learner experience:

```txt
I am rehearsing and improving a target skill.
```

### Assessment contract

Learner action is used to judge performance.

Typical result:

```txt
success | partial | failed
score
```

Appears less as a stabilized BHE layer and more as a possible use of evaluative paths.

Examples:

- quiz-like grammar practice;
- identification checks;
- transformation checks;
- classification checks.

Learner experience:

```txt
My answer is being judged.
```

Important distinction:

```txt
corrective
```

does not always mean:

```txt
assessment
```

Practice can be corrective without being summative assessment.

### Self-check contract

Learner action or reveal supports learner judgment rather than external correction.

Appears in:

- flashcards;
- memorization self-evaluation;
- potential known / unsure / unknown pathways.

Typical result:

```txt
completed
```

or future diagnostic/review signals.

Learner experience:

```txt
I check myself and decide what I know.
```

This contract overlaps with reflective and diagnostic contracts, but memorization gives it a distinct flavor.

## Compatibilité avec BHE

### Corrective

Where it appears:

- Identification;
- Classification;
- Transformation;
- Memorization typing recall;
- QCM-style inference.

Objects that use it:

- `IdentificationSet`;
- `ClassificationSet`;
- `TransformationSet`;
- `MemorizationSet`;
- `InferenceSet` in constrained forms.

Supported structures:

- `UserInput`;
- existing evaluators;
- `BHEResult.success | partial | failed`;
- `FeedbackData.success | partial | failed`;
- renderer-local feedback classes.

Compatibility:

```txt
high
```

This is BHE's strongest current implemented path.

### Reflective

Where it appears:

- Thinking in English;
- Reflect Through Selection;
- Reflect Through Typing;
- non-evaluative interaction POCs.

Objects that use it:

- currently often `IdentificationSet` or selection data as structural carrier;
- possibly typing carriers for reflective writing.

Supported structures:

- `RepresentationPath`;
- `BHEResult.completed`;
- `FeedbackData.completed`;
- `createCompletedResultFromUserInput`;
- selection or typing `UserInput` as structural carriers.

Compatibility:

```txt
medium / improving
```

The result path now works after the completed-path spike. The remaining weakness is neutral UI and clearer vocabulary.

### Diagnostic

Where it appears:

- Diagnose Through Selection;
- initial checks;
- routing/support decisions;
- authoring catalog examples.

Objects that use it:

- selection-like paths;
- possibly QCM, typing, drag-drop depending on evidence needed.

Supported structures:

- `BHEResult.details`;
- `signals`;
- `AdaptiveRouting`;
- `completed` for self-report;
- evaluated statuses when evidence is performance-based.

Compatibility:

```txt
medium
```

BHE can carry diagnostic evidence, but the authoring/runtime convention for using that evidence is not fully stabilized.

### Exploratory

Where it appears:

- Explore Before The Rule;
- Countable / Uncountable discovery;
- Compare Clarification;
- Inference hypothesis steps.

Objects that use it:

- `ClassificationSet`;
- `InferenceSet`;
- `IdentificationSelectionData`;
- possibly `TransformationSet` in before/after discovery.

Supported structures:

- `AuthorOrchestrationPath`;
- `RepresentationPath` fragments;
- `BHEResult.completed`;
- existing structural sets used in sequence.

Compatibility:

```txt
medium
```

BHE can represent many individual steps, but exploration often lives in orchestration rather than a single object.

### Practice

Where it appears:

- Practice Through Controlled Interaction;
- Passive Voice;
- Question Forms;
- Memorization recall;
- classification practice.

Objects that use it:

- `TransformationSet`;
- `ClassificationSet`;
- `GapFillSet`;
- `MemorizationSet`;
- `SequenceSet`;
- `AssociationSet`.

Supported structures:

- existing evaluators;
- feedback;
- `BHEResult`;
- renderers for several interaction types.

Compatibility:

```txt
high
```

Practice is well supported when the expected response is explicit.

### Assessment

Where it appears:

- mostly as a possible use of evaluative interactions;
- less as a dedicated BHE layer.

Objects that use it:

- any object with deterministic evaluation can be used assessively.

Supported structures:

- scores;
- max scores;
- success / partial / failed;
- result details.

Compatibility:

```txt
technically high,
pedagogically not separately modeled
```

BHE can produce assessment-like results, but does not yet strongly distinguish assessment from corrective practice.

### Self-check

Where it appears:

- flashcards;
- memorization self-evaluation;
- active recall discussions.

Objects that use it:

- `MemorizationSet`;
- possibly reflective authoring paths.

Supported structures:

- flashcard adapters;
- `completed`;
- future details/signals could carry self-evaluation.

Compatibility:

```txt
low / partial
```

The documents identify it clearly, but BHE has not stabilized a self-evaluation path.

## Object-by-object reading

### Selection

Question:

```txt
What changes when selection remains the same?
```

Answer:

The visible action stays similar, but the learner contract changes sharply.

Corrective selection:

```txt
Select the correct target.
```

Reflective selection:

```txt
Select what describes you.
```

Diagnostic selection:

```txt
Select what helps us decide what support you need.
```

Exploratory selection:

```txt
Select what you notice or think may matter.
```

The same selected ids can therefore mean:

- answer evidence;
- self-position evidence;
- diagnostic evidence;
- noticing evidence.

This is the strongest support for the contract lens.

### Classification

Question:

```txt
Is classification always corrective?
```

Answer:

No.

Classification is corrective when categories are stable and the learner is expected to place items correctly.

But in Explore Before The Rule, classification-like activity can support noticing and hypothesis formation before the categories are stabilized.

Classification therefore spans:

- exploratory categorization;
- practice categorization;
- assessment categorization.

The object may be the same or nearby, but the contract changes with the phase.

### Transformation

Question:

```txt
What contract does transformation assume?
```

Answer:

Transformation assumes a strong source-to-target contract:

```txt
given this source,
perform this operation,
produce an acceptable target.
```

That makes it naturally compatible with corrective practice.

But the same mechanics may support:

- guided rehearsal;
- practice;
- assessment;
- before/after comparison;
- process-aware feedback later.

The transformation contract is more constrained than reflective selection. It is less fluid, because the source-target relation defines the activity.

### Inference

Question:

```txt
Is inference exploratory by nature?
```

Answer:

Inference is interpretive by nature, but not always exploratory in runtime form.

It can become:

- exploratory hypothesis generation;
- corrective QCM inference;
- evidence selection;
- justified choice;
- qualitative explanation;
- guided dialogue.

The core contract is:

```txt
derive a plausible conclusion from evidence.
```

How tightly that is evaluated depends on the interaction design.

### Memorization

Question:

```txt
Are all memorization activities corrective?
```

Answer:

No.

Memorization spans:

- exposure;
- reveal;
- self-check;
- active recall;
- deterministic recall evaluation;
- self-evaluation;
- future review scheduling.

Flashcards may be non-corrective or self-checking.

Typing recall is more corrective because the typed attempt can be compared with a target.

Self-evaluation is diagnostic or reflective rather than corrective.

So memorization strongly supports the contract lens: the same content and similar review mechanics can operate under several learner contracts.

## Contrat ou autre chose ?

### A. Illusion documentaire

This is not the best reading.

The signal appears across multiple independent areas:

- selection;
- typing;
- classification;
- memorization;
- inference;
- transformation;
- authoring discovery.

Verdict:

```txt
unlikely
```

### B. Simple variation de feedback

Feedback is part of the signal, but not the whole signal.

Changing:

```txt
Correct.
```

to:

```txt
Completed.
```

is necessary but not sufficient.

The learner-facing task, result policy, evaluator use, and author expectation also change.

Verdict:

```txt
too narrow
```

### C. Lentille utile d'analyse

This is strongly supported.

The contract lens helps explain why:

- `IdentificationSelectionData` can structurally support reflective selection;
- the existing IdentificationSelection renderer still feels wrong for Thinking in English;
- Classification can be both practice and discovery;
- Memorization can be flashcards, self-check, or active recall;
- Inference can be exploratory or evaluated.

Verdict:

```txt
yes
```

### D. Futur concept authoring

This is plausible, but should remain future-facing.

Authoring is where the question naturally appears:

```txt
What do you want this interaction to mean?
```

The Author Discovery Playground is already moving in this direction through:

- Pedagogical Use;
- RepresentationPath;
- AuthorOrchestrationPath;
- Representation Confidence;
- Compare Clarification.

A future authoring concept might help authors distinguish:

```txt
selection for correction
selection for reflection
selection for diagnosis
selection for exploration
```

without changing the visible mechanics too early.

Verdict:

```txt
plausible later
```

### E. Futur concept architectural

This is possible, but not yet justified.

The risk is creating a heavy layer before BHE has enough examples.

The current evidence shows a need to reason about contracts. It does not yet prove that `Contract` should become a core runtime object.

Verdict:

```txt
premature
```

## Conclusion

Question:

```txt
Does the contract lens
explain more than it complicates?
```

Answer:

```txt
Yes, as an analytical and authoring lens.
```

The contract lens explains a recurring BHE pattern better than interaction shape alone:

```txt
same mechanics
different pedagogical meaning
```

It clarifies why the same UI gesture cannot determine:

- whether an answer is correct;
- whether a response is reflective;
- whether evidence is diagnostic;
- whether a classification is exploratory;
- whether recall is self-check or assessment.

However, the lens should not yet become a stabilized core concept.

The best current classification is:

```txt
C. useful analytical lens
```

with a possible future:

```txt
D. authoring concept
```

The weakest current move would be:

```txt
E. architectural concept
```

because BHE still needs more concrete cases before deciding whether contract belongs in runtime, renderer configuration, authoring metadata, or documentation only.

## Current best reading

BHE is already telling us:

```txt
Interaction mechanics are not enough.
```

The missing author-facing question may be:

```txt
What is the learner being asked to believe about this action?
```

Are they being asked to:

- be correct;
- practise;
- explore;
- reflect;
- diagnose their starting point;
- check themselves;
- be assessed?

That question is not yet a core object.

But it is becoming a powerful way to read the project.

For now:

```txt
Contract = useful lens.
Authoring may need it later.
Core does not need it yet.
```
