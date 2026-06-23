# Notice Investigation

Date: 2026-06-23  
Branch: `experiment/bhe-be`  
Status: exploratory investigation

## Context

The `Author Discovery Playground` currently classifies:

```txt
Notice
↓
Hybrid
```

Among the current author intents, `Notice` is the least explicit.

Unlike:

```txt
Compare
↓
What are learners comparing?
```

or:

```txt
Reflect
↓
What are learners reflecting on?
```

or:

```txt
Produce
↓
What kind of production is expected?
```

there is no stable clarification path yet for:

```txt
Help learners notice something
```

This document investigates what `Notice` already seems to mean across BHE documentation and Boost'English analyses.

No code, package, core object, renderer, evaluator, or playground behavior is changed by this document.

## Documents and signals examined

### Cognitive Operations Vocabulary

Location: `docs/architecture/cognitive-operations-vocabulary.md`

Relevant signal:

`notice` is already listed as a `CognitiveOperation`, alongside `identify`, `classify`, `transform`, `infer`, `compare`, `reflect`, `produce`, `imitate`, and `selfAdjust`.

The document also gives examples where `notice` appears inside composed cognitive sequences:

```txt
notice + compare + produce
```

and:

```txt
TransformationSet
-> notice + compare + transform + produce
```

Interpretation:

`notice` already exists as a light cognitive descriptor, but not as an autonomous representation route. It describes part of what the learner does mentally.

### PedagogicalUseCatalog

Location: `packages/authoring/src/PedagogicalUseCatalog.ts`

Relevant signals:

`notice` appears in several Pedagogical Uses:

```txt
Reflect Through Selection
```

where the author question is:

```txt
Do you want learners to notice or describe something about themselves?
```

and:

```txt
Diagnose Through Selection
```

where selected options surface prior knowledge, habits, confidence, or support needs.

It also appears in:

```txt
Explore Before The Rule
```

where the description is:

```txt
Present examples and lightweight prompts that support noticing, comparison, and inference before conceptual stabilization.
```

Interpretation:

The catalog does not treat `Notice` as one Pedagogical Use. It appears as a cognitive component inside reflective, diagnostic, and exploratory uses.

### Author Intent Routing Survey

Location: `docs/architecture/20260623_author-intent-routing-survey.md`

Relevant signal:

The survey already classifies `Notice` as:

```txt
Hybrid
```

with the implicit question:

```txt
What should noticing lead to?
```

Possible variants listed there include:

- notice something about myself;
- notice a starting-point need;
- notice a pattern;
- notice before forming a rule;
- notice before reflecting or explaining.

The survey identifies possible BHE destinations:

- `Reflect Through Selection`;
- `Diagnose Through Selection`;
- `Reflect Through Typing`;
- `Explore Before The Rule`;
- possibly `IdentificationSet`, `ClassificationSet`, or `InferenceSet` depending on what is noticed.

Interpretation:

The existing survey already gives the strongest candidate framing: `Notice` is not self-routing because the object of attention does not determine the next pedagogical move by itself.

### Thinking in English — I Start

Location: `docs/architecture/20260604_thinking-in-english_i-start_moment-poc.md`

Relevant signal:

This POC describes a reflective questionnaire about the learner's relationship to English.

The learner becomes aware of:

- existing habits;
- anxiety around speaking;
- translation reflexes;
- practice strategies;
- their current posture toward thinking in English.

The document states the central pedagogical goal as:

```txt
notice how I currently relate to English
```

The cognitive operations are:

```txt
reflect
notice
compare
self-position
```

Evaluation is explicitly non-corrective:

```txt
no real score
no right/wrong answer
reflective completion only
```

Interpretation:

Here, `Notice` means becoming aware of a personal habit or self-position. The best route is not a generic Notice path. It is closer to:

```txt
Reflect Through Selection
```

or, if the result is used to choose support:

```txt
Diagnose Through Selection
```

### Memorising Vocabulary

Location: `docs/architecture/20260606_memorising-vocabulary_poc.md`

Relevant signal:

The brick begins with a non-scored, quiz-like questionnaire whose purpose is to help learners notice their current vocabulary-learning habits:

- Do I have a method?
- Which methods have I tried?
- Do I translate, connect, ignore?
- How often do I revise?

The POC identifies a strong learner-state transition:

```txt
Implicit Habits -> Strategy Awareness
```

It also names:

```txt
metacognitive activation: noticing current learning habits
learning strategy awareness: discovering and comparing possible techniques
```

Interpretation:

Here, `Notice` again means making an implicit behavior explicit. But the downstream direction is not only reflection; it prepares strategy activation and later application.

The likely path is:

```txt
Notice habit
↓
Reflect Through Selection / Typing
↓
try or apply a strategy
```

### Countable / Uncountable — I Learn

Location: `docs/architecture/20260604_countable-uncountable_i-learn_moment-poc.md`

Relevant signal:

The POC does not describe a rule-first activity:

```txt
rule
↓
exercise
```

Instead, it describes:

```txt
observe
↓
compare
↓
reason
↓
infer
↓
conceptualize
```

The learner is guided toward noticing and understanding a grammatical distinction:

```txt
countable nouns
vs
uncountable nouns
```

Cognitive operations:

```txt
notice
compare
infer
classify
```

The document also states:

```txt
noticing before naming
comparison before rule
inference before stabilization
```

Interpretation:

Here, `Notice` means noticing examples, contrasts, and an emerging distinction. It is not reflective self-positioning. It belongs inside:

```txt
Explore Before The Rule
```

and routes toward:

```txt
Compare
↓
Infer
↓
Classify
```

### Explore Before The Rule Investigation

Location: `docs/architecture/20260622_explore-before-the-rule-investigation.md`

Relevant signal:

The investigation identifies a recurring phenomenon:

```txt
Observation
↓
Comparaison
↓
Formulation d'hypothèse
↓
Stabilisation d'une règle
```

It also observes variants such as:

```txt
observe
↓
compare
↓
notice contrast
↓
form hypothesis
```

and:

```txt
observe examples
↓
understand distinction
↓
stabilize concept
```

Interpretation:

This is the clearest case where `Notice` is an early phase of an orchestration. The learner notices before the rule is explained. The important unit is not the noticing alone, but the movement from noticing to comparison, hypothesis, and stabilization.

### Explore Before The Rule Orchestration Path Report

Location: `docs/architecture/20260622_explore-before-the-rule-orchestration-path-report.md`

Relevant signal:

The authoring prototype materialized:

```txt
Explore Before The Rule
↓
Observe
↓
Compare
↓
Infer
↓
Stabilize
↓
Practice
```

The `Observe` step is described as helping learners notice examples before the rule is explained.

The report explicitly states that `Explore Before The Rule` is not a new core object. It is an authoring orchestration path.

Interpretation:

This supports the reading that `Notice` can be a first step inside authoring orchestration, not necessarily a single `RepresentationPath`.

### Compare Investigation

Location: `docs/architecture/20260622_compare-investigation.md`

Relevant signal:

The Compare investigation repeatedly shows `notice` paired with `compare`, especially in grammar discovery:

```txt
notice + compare + infer + classify
```

The report concludes that `compare` is robust as a cognitive operation but not enough to determine interaction, evaluation, or result.

Interpretation:

`Notice` behaves similarly, but even earlier. It often prepares comparison. If the learner notices a distinction, the next routing question may be a Compare or Classify question.

### Reflect Investigation

Location: `docs/architecture/20260623_reflect-investigation.md`

Relevant signal:

The Reflect investigation shows that reflection may involve becoming aware of:

- habits;
- strategies;
- confidence;
- understanding;
- choices;
- hypotheses;
- experience;
- progress.

For understanding and hypotheses, the report warns that Reflect may slide toward `Explore Before The Rule` or `InferenceSet`.

Interpretation:

This helps separate two cases:

```txt
notice myself
↓
reflect
```

versus:

```txt
notice a conceptual pattern
↓
explore / infer / classify
```

### Contract Investigation

Location: `docs/architecture/20260623_contract-investigation.md`

Relevant signal:

The report identifies a recurring theme:

```txt
same mechanics
different pedagogical meaning
```

It includes selection as the clearest example and mentions that learner action may:

```txt
surface a diagnostic starting point
```

or:

```txt
notice patterns before a rule is explained
```

It identifies an exploratory contract:

```txt
Learner action supports noticing, comparison, hypothesis, or rule discovery before stabilization.
```

Interpretation:

This confirms that `Notice` cannot be routed only by mechanics. Selection, classification, typing, and examples can all support noticing depending on the pedagogical contract.

## Types of noticing observed

### 1. Notice a personal habit or self-position

Observed in:

- Thinking in English;
- Memorising Vocabulary;
- Reflect Through Selection;
- Reflect Through Typing.

Typical learner movement:

```txt
implicit habit
↓
visible self-position
↓
reflection or later action
```

Possible BHE route:

```txt
Reflect Through Selection
↓
IdentificationSelectionData
↓
IdentificationSelectionUserInput
↓
BHEResult.completed
```

or:

```txt
Reflect Through Typing
↓
free typed response
↓
BHEResult.completed
```

Status:

Strong authoring path, with UI neutrality still under investigation for selection.

### 2. Notice a starting-point need or misconception

Observed in:

- Diagnose Through Selection;
- Wayfinding-style initial checks;
- Thinking in English as habit surfacing;
- authoring catalog examples.

Typical learner movement:

```txt
initial state
↓
visible evidence
↓
support or route decision
```

Possible BHE route:

```txt
Diagnose Through Selection
↓
IdentificationSelectionData
↓
IdentificationSelectionUserInput
↓
context-dependent result or support decision
```

Status:

Plausible and documented at authoring level, but less stabilized than reflective completion because the diagnostic consequence depends on what follows.

### 3. Notice a pattern or distinction

Observed in:

- Countable / Uncountable;
- Explore Before The Rule;
- grammar discovery examples;
- Compare Investigation.

Typical learner movement:

```txt
examples
↓
noticed contrast
↓
comparison
↓
hypothesis
↓
rule stabilization
```

Possible BHE route:

```txt
Explore Before The Rule
↓
AuthorOrchestrationPath
↓
Identification / Classification / Inference structures
```

Status:

Representable as an authoring orchestration, not as one single stable `RepresentationPath`.

### 4. Notice a clue or evidence

Observed in:

- InferenceSet investigations;
- Explore Before The Rule;
- hypothesis-oriented reflection;
- Compare through hypotheses.

Typical learner movement:

```txt
clue
↓
possible explanation
↓
justification
```

Possible BHE route:

```txt
InferenceSet
```

or:

```txt
Explore Before The Rule
↓
Infer
```

Status:

Conceptually covered, but still less visible as an author-facing route. This is more inference than pure noticing.

### 5. Notice a relationship or contrast

Observed in:

- Compare Investigation;
- grammar contrasts;
- vocabulary strategy comparisons;
- relation-based activities.

Typical learner movement:

```txt
two or more items
↓
salient relation
↓
compare / associate / classify / transform
```

Possible BHE routes:

- `ClassificationSet` when the relation is category membership;
- `AssociationSet` when the relation is pairing or correspondence;
- `TransformationSet` when the relation is before/after form change;
- `Compare` clarification path when the author intent is still broad.

Status:

Mostly covered by existing structures, but not through `Notice` directly.

### 6. Notice a strategy

Observed in:

- Memorising Vocabulary;
- Thinking in English;
- Reflect Investigation;
- Compare Investigation.

Typical learner movement:

```txt
unexamined method
↓
named strategy
↓
try / compare / personalize
```

Possible BHE routes:

```txt
Reflect Through Selection / Typing
```

then possibly:

```txt
Apply Through Situated Task
```

Status:

Representable at authoring level. It may require orchestration if the learner must try the strategy, not just report it.

## Mapping BHE possible

| What becomes noticeable? | Likely next move | Possible BHE / authoring route | Apparent status |
| --- | --- | --- | --- |
| Personal habit | Reflect | `Reflect Through Selection`, `Reflect Through Typing`, `BHEResult.completed` | Strong authoring path |
| Starting-point need | Diagnose | `Diagnose Through Selection`, selection input as evidence | Plausible; consequence depends on follow-up |
| Pattern or distinction | Explore / Compare / Infer / Classify | `Explore Before The Rule`, `ClassificationSet`, `InferenceSet` | Strong as orchestration, not single path |
| Clue or evidence | Infer | `InferenceSet`, justified choice, hypothesis path | Conceptually covered; authoring still partial |
| Relationship or contrast | Compare / Associate / Transform | Compare clarification routes to `ClassificationSet`, `AssociationSet`, `TransformationSet` | Covered through other clarification paths |
| Learning strategy | Reflect / Apply | `Reflect Through Selection`, `Reflect Through Typing`, possibly situated application | Representable, sometimes orchestration |
| Misconception | Diagnose / Practice / Explain | diagnostic selection, corrective interaction, feedback | Partially documented; depends on contract |

## What already exists

### `notice` as cognitive vocabulary

BHE already has a place to name `notice` as something the learner may do cognitively.

That role is useful and should not be confused with a full representation path.

### Reflective noticing

Personal habits, strategies, confidence, and self-positioning can already route through reflective authoring paths.

The completed-result work makes this much more credible:

```txt
UserInput
↓
BHEResult.completed
↓
non-corrective feedback
```

### Diagnostic noticing

Starting-point needs can be surfaced through `Diagnose Through Selection`.

The authoring route exists, but what happens after diagnosis still depends on sequencing or support logic.

### Exploratory noticing

Patterns, distinctions, and rule-discovery signals are already covered by `Explore Before The Rule` as an `AuthorOrchestrationPath`.

This is the most important non-reflective use of `Notice`.

### Compare-related noticing

When noticing produces a contrast, the better next question may be the Compare clarification:

```txt
What are learners comparing?
```

### Reflect-related noticing

When noticing concerns the learner's own state, habit, strategy, or experience, the better next question may be the Reflect clarification:

```txt
What are learners reflecting on?
```

## What seems missing

### No direct Notice RepresentationPath

There is no evidence that BHE needs:

```txt
NoticeSet
```

or:

```txt
Notice Through ...
```

as a core or stabilized authoring concept.

The current documents point in the opposite direction: noticing is a cognitive operation or phase that must route toward something else.

### No mature Notice clarification

The playground currently routes `Notice` to nearby uses:

```txt
Reflect Through Selection
Diagnose Through Selection
Reflect Through Typing
```

This covers personal noticing, but not conceptual noticing.

It under-represents:

```txt
Notice a pattern
↓
Explore Before The Rule
```

and:

```txt
Notice a clue
↓
InferenceSet
```

### The object of noticing is insufficient

The question:

```txt
What are learners noticing?
```

is useful but not enough.

For example:

- noticing a habit may lead to reflection or diagnosis;
- noticing a pattern may lead to exploration, comparison, inference, or classification;
- noticing a clue may lead to inference;
- noticing a misconception may lead to diagnosis, feedback, or practice.

The same "thing noticed" may still support different pedagogical consequences.

### The missing bridge is authoring-level routing

The gap is not primarily core, renderer, or evaluator.

The gap is:

```txt
Author says: help learners notice something
↓
Playground asks what role noticing plays
↓
Author reaches Reflect / Diagnose / Explore / Infer / Compare / Classify
```

## Nature of the phenomenon

Options:

```txt
A. Notice est auto-routable

B. Notice nécessite clarification

C. Notice est réellement hybride

D. Notice n'est pas une intention utile
```

Most credible answer:

```txt
C. Notice est réellement hybride
```

Reason:

`Notice` has a visible direct neighborhood:

```txt
Reflect Through Selection
Diagnose Through Selection
Reflect Through Typing
```

That makes it less broad than `Compare`, `Reflect`, or `Produce`.

But it also has a strong conceptual/exploratory branch:

```txt
notice pattern
↓
Explore Before The Rule
↓
compare
↓
infer
↓
classify
```

That makes it not self-routing.

Therefore `Notice` is hybrid:

- direct-ish when the target is personal awareness;
- clarification-dependent when the target is conceptual, diagnostic, inferential, or comparative;
- often a first phase of another route rather than a destination.

## Candidate clarification question

The strongest candidate remains:

```txt
What should noticing lead to?
```

This is better than:

```txt
What are learners noticing?
```

because the pedagogical route depends less on the object itself than on the intended next move.

For authoring, the useful options may be:

| If noticing should lead to... | Route suggested |
| --- | --- |
| Self-awareness | `Reflect Through Selection` / `Reflect Through Typing` |
| Starting-point evidence | `Diagnose Through Selection` |
| Pattern discovery | `Explore Before The Rule` |
| Hypothesis formation | `InferenceSet` / `Explore Before The Rule` |
| Distinction or contrast | Compare clarification path |
| Stable category practice | `ClassificationSet` |
| Strategy change | Reflect path, then possible situated application |

This suggests a two-layer authoring prompt could eventually be useful:

```txt
What should become noticeable?
↓
What should noticing lead to?
```

But for a minimal playground clarification, the second question is more decisive.

## Conclusion

### What does Notice actually mean in BHE?

In the current BHE documentation, `Notice` means:

```txt
make a pedagogically relevant feature salient to the learner
before another operation happens.
```

The feature may be:

- a personal habit;
- a strategy;
- a confidence state;
- a misconception;
- a starting-point need;
- a pattern;
- a distinction;
- a clue;
- a relationship.

But the important discovery is that noticing is rarely the final pedagogical destination.

It usually prepares one of these next moves:

```txt
reflect
diagnose
compare
infer
classify
apply
```

### Does Notice need a clarification question?

Yes.

But not exactly in the same way as Compare, Reflect, or Produce.

For Compare, the clarifying question is object-centered:

```txt
What are learners comparing?
```

For Reflect, it is also object-centered:

```txt
What are learners reflecting on?
```

For Produce, it is output-centered:

```txt
What kind of production is expected?
```

For Notice, the best current question is consequence-centered:

```txt
What should noticing lead to?
```

That question best matches the documentation because `Notice` behaves like an enabling operation:

```txt
Notice
↓
Reflect / Diagnose / Explore / Infer / Compare / Classify
```

### Final reading

```txt
Notice is useful.
Notice is not self-routing.
Notice is not a new BHE object.
Notice is a hybrid author intent that exposes the next pedagogical move.
```

The next healthy step, if the playground is extended later, would be an authoring-only clarification path that makes this visible without creating any new core concept:

```txt
Help learners notice something
↓
What should noticing lead to?
↓
Reflect / Diagnose / Explore / Infer / Compare / Classify
↓
existing BHE or authoring paths
```
