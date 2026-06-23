# Produce Investigation

Date: 2026-06-23

Status: Documentary investigation

Scope: authoring, BHE representation vocabulary, Boost'English corpus signals

## Context

Previous investigations showed that broad author intents often do not route directly to BHE:

```txt
Compare
↓
What are learners comparing?
```

```txt
Reflect
↓
What are learners reflecting on?
```

The author intent routing survey then classified:

```txt
Produce
↓
Clarification-routing
```

but no clarification path exists yet.

This investigation checks whether Produce is already doing several different things across the project.

The candidate clarification question is:

```txt
What kind of production is expected?
```

## Documents and signals examined

### Productive Objects Emergence Pattern

Location:

```txt
docs/architecture/20260521_productive_objects_emergence_pattern.md
```

Relevant signal:

The report explicitly warns that several objects may use typing while asking the learner to perform different cognitive operations.

It distinguishes:

```txt
GapFillSet
↓
contextual absence
↓
constrained production
```

```txt
TransformationSet
↓
explicit source
↓
deliberate change
↓
target
```

```txt
InferenceSet
↓
clues
↓
interpretation
↓
justification
```

The central principle is:

```txt
Typing gesture
!=
Typing cognition
```

This is directly relevant to Produce. The visible act of producing text does not determine the BHE route.

### Transformation V0 Emergence

Location:

```txt
docs/architecture/20260522_transformation_v0_emergence.md
```

Relevant signal:

Transformation is described as:

```txt
source
-> deliberate operation
-> target
```

The report states:

```txt
transformation != simple production
```

and:

```txt
transformation != GapFill with typing
```

So one family of Produce is clearly:

```txt
produce a transformed form
```

This routes toward `TransformationSet`, not toward a generic Produce path.

### GapFillSet Methodological Rereading

Location:

```txt
docs/reports/gap-fill-set-methodological-rereading.md
```

Relevant signal:

GapFill asks the learner to produce missing content inside a context.

The production is constrained by:

* surrounding text;
* blank identity;
* expected answers;
* accepted variants;
* local feedback.

This is another distinct family:

```txt
produce a context-fitting answer
```

It is productive, but not the same as recall, transformation, explanation, or situated communication.

### MemorizationSet Interaction Exploration

Location:

```txt
docs/reports/memorization-set-interaction-exploration.md
```

Relevant signal:

Memorization includes exposure, rehearsal, recall, checking, and consolidation.

Typing recall is described as stronger than flashcards because it requires production:

```txt
cue
-> retrieval attempt
-> target
```

This supports a family:

```txt
produce a recalled target
```

The route is not generic production. It is active recall.

### Memorization Typing Recall Evaluator Report

Location:

```txt
docs/reports/memorization-typing-recall-evaluator-report.md
```

Relevant signal:

The real pipeline is:

```txt
MemorizationSet
-> MemorizationTypingRecallData
-> MemorizationTypingRecallUserInput
-> evaluateMemorizationTypingRecall
-> BHEResult
```

The report distinguishes typing recall from GapFill and Transformation:

```txt
Typing recall
=
cue -> retrieval attempt -> target
```

This confirms that at least one kind of Produce is already represented through a real BHE path.

### InferenceSet Interaction Exploration

Location:

```txt
docs/reports/inference-set-interaction-exploration.md
```

Relevant signal:

Inference means producing a hypothesis from clues.

The report warns that a text field may express interpretation rather than classic productive typing.

Possible outputs include:

* inferred meaning;
* inferred intention;
* grammar rule;
* cause or consequence;
* implicit information;
* multimodal hypothesis.

This supports a family:

```txt
produce an interpretation, hypothesis, or explanation
```

The route is toward `InferenceSet`, not toward generic production.

### Inference Justified Choice POC Report

Location:

```txt
docs/reports/inference-justified-choice-poc-report.md
```

Relevant signal:

The first inference V0 uses structured choice and optional justification.

The justification is currently checked only for presence, not quality.

This means that producing a justification is partially represented, but qualitative evaluation remains a known limit.

### PedagogicalUseCatalog

Location:

```txt
packages/authoring/src/PedagogicalUseCatalog.ts
```

Relevant signal:

The catalog already attaches `produce` to several different Pedagogical Uses:

```txt
Recall Through Typing
Reflect Through Typing
Apply Through Situated Task
Practice Through Controlled Interaction
```

This is important: the catalog itself does not treat Produce as one pedagogical use. It appears as a cognitive operation that can serve different author purposes.

### RepresentationPaths

Location:

```txt
packages/authoring/src/RepresentationPaths.ts
```

Relevant signal:

Existing RepresentationPaths already split productive typing into different meanings:

```txt
Recall Through Typing
↓
MemorizationTypingRecallUserInput
↓
existing evaluator
↓
success / partial / failed
```

```txt
Reflect Through Typing
↓
ContextualTypingUserInput
↓
non-evaluative
↓
BHEResult.completed
```

```txt
Apply Through Situated Task
↓
ContextualTypingUserInput
↓
context-dependent evaluation
↓
completed / success / partial / failed
```

The same broad surface, typing or text production, is already routed by pedagogical meaning and result policy.

### Passive Voice POC

Location:

```txt
docs/architecture/20260606_passive-voice_poc.md
```

Relevant signal:

Passive Voice includes several productive possibilities:

* transform active sentences into passive forms;
* explain how devices work;
* write passive descriptions that others can guess from;
* discuss why passive voice affects focus or responsibility.

This one brick alone shows that Produce can mean:

```txt
form transformation
functional explanation
social clue production
critical interpretation
```

The dominant real BHE route validated later is:

```txt
Before / After Forms
↓
TransformationSet
```

but the teacher-facing extensions point toward situated task and inference routes.

### Real BHE Path Validation

Location:

```txt
docs/architecture/20260622_real-bhe-path-validation-report.md
```

Relevant signal:

Two controlled routes reached the real engine:

```txt
Countable / Uncountable
↓
ClassificationSet
```

```txt
Passive Voice
↓
TransformationSet
```

Thinking in English became viable later for non-evaluative completion, but originally exposed the gap between meaningful response and corrective evaluation.

This matters for Produce because some production is evaluable, while other production is meaningful without being correct/incorrect.

### Reflect Investigation

Location:

```txt
docs/architecture/20260623_reflect-investigation.md
```

Relevant signal:

Reflection can be selection or typing. Reflective typing may capture:

* a strategy;
* an opinion;
* a realization;
* an experience;
* a choice explanation.

This is a productive act, but its result is often:

```txt
BHEResult.completed
```

not:

```txt
success / partial / failed
```

So Produce includes at least one non-corrective family.

## Types de production observés

### 1. Produce a recalled target

The learner produces something retained in memory from a cue.

Typical question:

```txt
Can the learner retrieve the target before seeing it?
```

Observed in:

* Memorising Vocabulary;
* MemorizationSet interaction exploration;
* Memorization Typing Recall evaluator;
* Recall Through Typing.

### 2. Produce a context-fitting answer

The learner produces a missing word, form, or phrase inside an existing context.

Typical question:

```txt
What belongs in this blank?
```

Observed in:

* GapFillSet rereading;
* older contextual typing paths.

### 3. Produce a transformed form

The learner starts from a source and produces a target by applying an operation.

Typical question:

```txt
How should this source change?
```

Observed in:

* TransformationSet;
* Passive Voice;
* before/after form comparison.

### 4. Produce an inference or hypothesis

The learner produces an interpretation from clues.

Typical question:

```txt
What can be concluded from this evidence?
```

Observed in:

* InferenceSet;
* Explore Before The Rule;
* Countable / Uncountable discovery;
* grammar rule induction.

### 5. Produce a justification or explanation

The learner explains why an answer, choice, interpretation, or form makes sense.

Typical question:

```txt
Why do you think this?
```

Observed in:

* Inference justified choice;
* Reflect Through Typing;
* Passive Voice teacher extensions;
* reflective choice explanation.

This family overlaps with inference and reflection.

### 6. Produce a reflection

The learner puts a personal strategy, habit, feeling, or realization into words.

Typical question:

```txt
What do you notice about your own thinking or action?
```

Observed in:

* Thinking in English;
* Memorising Vocabulary;
* Reflect Through Typing;
* Reflect investigation.

This is often non-evaluative.

### 7. Produce a situated response

The learner produces language or action that should work in a credible situation.

Typical question:

```txt
Does this response function in context?
```

Observed in:

* Apply Through Situated Task;
* Wayfinding;
* Passive Voice device explanation or guessing game.

Evaluation may be context-dependent rather than deterministic.

### 8. Produce a social or communicative clue

The learner produces language for another learner to interpret.

Typical question:

```txt
Can another person understand or act from what was produced?
```

Observed in:

* Wayfinding;
* Passive Voice guessing game;
* situated communicative extensions.

This is close to situated response, but the success condition is social interpretation.

## Mapping BHE possible

| Production family | BHE structures | Pedagogical Uses | RepresentationPaths | Apparent status |
| --- | --- | --- | --- | --- |
| Recalled target | `MemorizationSet`, `MemorizationTypingRecallData`, `MemorizationTypingRecallUserInput`, `evaluateMemorizationTypingRecall` | Recall Through Typing | `recall-through-typing` | Strong / real path |
| Context-fitting answer | `GapFillSet`, `ContextualTypingData`, `ContextualTypingUserInput`, `evaluateGapFillTyping` | Practice Through Controlled Interaction | No authoring RepresentationPath yet | Real legacy path, authoring bridge incomplete |
| Transformed form | `TransformationSet`, `TransformationInteractionData`, `TransformationTypingUserInput`, `evaluateTransformationTyping` | Practice Through Controlled Interaction; Apply when situated | No dedicated authoring RepresentationPath yet | Strong real path, authoring bridge still partial |
| Inference / hypothesis | `InferenceSet`, `InferenceChoiceData`, justified choice input/evaluator | Explore Before The Rule; possible inference-oriented use | `explore-before-rule` as orchestration path, not single RepresentationPath | Conceptually covered, partially implemented |
| Justification / explanation | `InferenceSet`, justification fields, reflective typing carrier | Reflect Through Typing; inference-oriented tasks | `reflect-through-typing` partially; inference path less visible | Partially covered; qualitative evaluation deferred |
| Reflection | `ContextualTypingUserInput`, `BHEResult.completed`, `FeedbackData.completed` | Reflect Through Typing | `reflect-through-typing` | Viable but semantically imperfect carrier |
| Situated response | `ContextualTypingUserInput`, context-dependent result policy, task-specific evidence | Apply Through Situated Task | `apply-through-situated-task` | Plausible; depends on observable success criteria |
| Social / communicative clue | Situated task structures, peer interpretation, possible inference by recipient | Apply Through Situated Task with social validation | No dedicated path | Conceptually visible, runtime/evaluation open |

## What already exists

Several productive paths already exist in BHE.

### Real or strong paths

```txt
Recall Through Typing
↓
MemorizationTypingRecall
```

```txt
TransformationSet
↓
TransformationTyping
```

```txt
GapFillSet
↓
ContextualTyping
```

### Authoring-visible paths

```txt
Reflect Through Typing
↓
non-evaluative completion
```

```txt
Apply Through Situated Task
↓
context-dependent result
```

```txt
Explore Before The Rule
↓
inference / classification / stabilization orchestration
```

### Conceptual or partial paths

```txt
InferenceSet
↓
justified choice / hypothesis production
```

```txt
Produce explanation
↓
Reflect Through Typing or InferenceSet
```

```txt
Produce communicative clue
↓
Apply Through Situated Task
```

## What seems missing

### Authoring clarification

The largest missing piece is not core representation.

It is the authoring question:

```txt
What kind of production is expected?
```

Without this, the author intent `Produce` can point to too many different routes.

### RepresentationPath coverage

Some real engine paths are not yet represented as authoring `RepresentationPath`s:

* GapFill as contextual completion;
* Transformation as source-to-target production;
* Inference as hypothesis or justification production.

This is a documentation/authoring gap more than a model gap.

### Open-text semantics

`Reflect Through Typing` and `Apply Through Situated Task` currently use `ContextualTypingUserInput` as a structural carrier.

That works as a minimal path, but the vocabulary remains imperfect for:

* reflection;
* explanation;
* situated response;
* open production.

### Evaluation policy

Produce does not imply one result policy.

It can lead to:

```txt
success / partial / failed
```

when correctness can be checked, or:

```txt
completed
```

when the production is meaningful participation, self-expression, or reflection.

It can also require context-dependent judgement when the production must work for another learner or in a scenario.

## Nature du phénomène

Options:

```txt
A. Produce est un PedagogicalUse unique

B. Produce est une famille de PedagogicalUses

C. Produce est une intention auteur nécessitant clarification

D. Produce révèle une lacune du modèle
```

Most credible answer:

```txt
C. Produce est une intention auteur nécessitant clarification.
```

Why not A:

Produce is too broad. The same visible action, especially typing, can mean recall, gap-fill, transformation, inference, explanation, reflection, or situated response.

Why not only B:

There are indeed families of productive pedagogical uses, but Produce itself sits one level above them. It is what the author says before the actual route is known.

Why not D:

The investigation does not reveal a single missing `ProduceSet`. It reveals many existing routes and some authoring/documentation gaps.

## Candidate clarification path

The candidate question appears well supported:

```txt
What kind of production is expected?
```

Possible first options:

### Recalled target

```txt
cue
↓
retrieval attempt
↓
target
```

Suggested route:

```txt
Recall Through Typing
↓
MemorizationTypingRecall
```

### Context-fitting answer

```txt
contextual absence
↓
constrained answer
```

Suggested route:

```txt
GapFillSet
↓
ContextualTyping
```

### Transformed form

```txt
source
↓
operation
↓
target
```

Suggested route:

```txt
TransformationSet
↓
TransformationTyping
```

### Hypothesis / interpretation

```txt
clues
↓
inference
↓
justification
```

Suggested route:

```txt
InferenceSet
```

or, when sequenced before rule stabilization:

```txt
Explore Before The Rule
```

### Reflection / explanation

```txt
prompt
↓
personal explanation
↓
completed
```

Suggested route:

```txt
Reflect Through Typing
```

### Situated response

```txt
situation
↓
response
↓
functional success condition
```

Suggested route:

```txt
Apply Through Situated Task
```

### Communicative clue

```txt
produced language
↓
another learner interprets or acts
```

Suggested route:

```txt
Apply Through Situated Task
```

with social/action reliability as the validation concern.

## Conclusion

Question:

```txt
Does Produce need a clarification question?
```

Answer:

```txt
Yes.
```

Produce behaves like Compare and Reflect: it is meaningful to authors, but not self-routing.

It names a broad author intention or visible response expectation, not a single BHE destination.

The question:

```txt
What kind of production is expected?
```

is a good candidate because it routes naturally toward existing BHE structures:

```txt
recalled target -> MemorizationTypingRecall
context-fitting answer -> GapFillSet
transformed form -> TransformationSet
hypothesis / interpretation -> InferenceSet
reflection / explanation -> Reflect Through Typing
situated response -> Apply Through Situated Task
communicative clue -> situated / social validation path
```

The main lesson is:

```txt
Produce is not a BHE path.
Produce is an author signal that the playground must disambiguate.
```

The next healthy step, if implemented later, would be an authoring-only clarification panel for Produce. It should not create `ProduceSet`, and it should not stabilize a new core concept.
