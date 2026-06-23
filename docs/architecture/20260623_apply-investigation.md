# Apply Investigation

Date: 2026-06-23  
Branch: `experiment/bhe-be`  
Status: exploratory investigation

## Context

After the investigations on:

- Compare;
- Reflect;
- Produce;
- Classify;
- Notice;

the last major author intent still insufficiently understood is:

```txt
Help learners apply
```

The current author intent routing survey classifies it as:

```txt
Apply
↓
Hybrid
```

with the provisional clarification question:

```txt
What situation should the learner act in?
```

This document investigates whether that reading is supported by the existing BHE documentation and Boost'English analyses.

No code, package, core object, renderer, evaluator, or playground behavior is changed by this document.

## Documents and signals examined

### PedagogicalUseCatalog

Location: `packages/authoring/src/PedagogicalUseCatalog.ts`

Relevant signal:

The catalog already contains:

```txt
Apply Through Situated Task
```

Its author question is:

```txt
Do you want learners to use knowledge so that an action succeeds in context?
```

Its description states:

```txt
Frame an interaction around a credible situation and judge meaning through functional use, not only isolated answer correctness.
```

The notes are especially important:

```txt
A situated task is pedagogical framing, not an interaction shape.
Choose the concrete shape from the response the situation requires.
```

Interpretation:

`Apply` already has a clear authoring neighbor: `Apply Through Situated Task`.

However, this does not make `Apply` fully self-routing. The catalog explicitly says that the situation determines the concrete interaction shape.

### RepresentationPaths

Location: `packages/authoring/src/RepresentationPaths.ts`

Relevant signal:

The `apply-through-situated-task` path is documented as:

```txt
learner writes a response intended to work in a concrete situation
```

with:

```txt
ContextualTypingUserInput
```

as the closest structural carrier.

Evaluation is:

```txt
context-dependent
```

and the result may be:

```txt
completed
success
partial
failed
```

depending on the functional criteria.

The author notes are cautious:

- a situated task is pedagogical framing, not an interaction shape;
- typing is one plausible path;
- another task may require selection, drag-drop, or reorder;
- the author must define what observable outcome makes the action functionally successful;
- the submitted response may not be sufficient evidence of situated success.

Interpretation:

The existing `RepresentationPath` supports `Apply`, but only as a plausible authoring bridge. It does not solve the whole problem because situated success may require evidence beyond a typed submission.

### Author Discovery Playground

Location: `packages/authoring/src/AuthorDiscoveryPlayground.ts`

Relevant signal:

The current intent is:

```txt
Help learners apply
```

with the description:

```txt
Start here when learners should use knowledge in a situation where the response has to work in context.
```

The routing map classifies it as:

```txt
Hybrid
```

with the implicit question:

```txt
What situation should the learner act in?
```

and the main direction:

```txt
Apply Through Situated Task + context-specific shape
```

Interpretation:

The playground already encodes the strongest provisional reading: Apply has one obvious Pedagogical Use, but the situation determines representation and evaluation.

### Author Intent Routing Survey

Location: `docs/architecture/20260623_author-intent-routing-survey.md`

Relevant signal:

The survey describes:

```txt
apply
↓
Apply Through Situated Task
↓
context-dependent representation
```

It classifies Apply as:

```txt
C — Hybrid
```

and lists secondary questions:

```txt
What counts as successful use?
What observable response captures the action?
Which interaction shape does the situation require?
```

The survey explanation is:

```txt
Apply has one obvious Pedagogical Use in the catalog,
but not one obvious representation.
The concrete situation determines the interaction shape and evaluation.
```

Interpretation:

The survey gives the most concise current formulation. This investigation tests and refines it against the corpus.

### Wayfinding POC

Location: `docs/architecture/20260606_wayfinding_poc.md`

Relevant signal:

Wayfinding is the strongest Apply case in the corpus.

The POC summarizes the brick as:

```txt
situated communication
+
map-based action
+
real-world success condition
```

The learner-facing sequence includes:

```txt
complete a directions dialogue
-> follow a conditional learning path
-> review key language
-> watch/listen with a map
-> practise polite question forms
-> complete a final test
-> prepare directions on a real map
-> share and test with classmates
```

The later stages move toward map use and oral exchange. The document states:

```txt
Can another person use what I said?
```

and:

```txt
person A needs to reach a place
person B gives directions
the map constrains the possible answer
success can be checked by action
```

The strongest signal is:

```txt
Can the language support a successful action?
```

The final conclusion preserves:

```txt
some pedagogical bricks validate action reliability,
not only answer correctness
```

Interpretation:

Wayfinding confirms `Apply Through Situated Task` strongly.

Here, Apply means:

```txt
use language so another person can act successfully in a concrete context
```

The candidate question:

```txt
What situation should the learner act in?
```

works very well here because the map, route, listener, destination, and social politeness define the task.

### Passive Voice POC

Location: `docs/architecture/20260606_passive-voice_poc.md`

Relevant signal:

The dominant learner-facing layer is:

```txt
grammar recognition and transformation
```

The practice section asks learners to:

- identify passive sentences;
- decide whether the focus is on the agent or object;
- transform active sentences into passive forms.

But teacher-facing extensions broaden the use:

- reading a newspaper article and discussing why passive voice was used;
- considering passive voice as a tool that can distort historical narratives;
- writing explanations of how devices work;
- playing a guessing game based on passive descriptions of objects.

The POC identifies a transition:

```txt
Correct Structure -> Purposeful Language Use
```

and notes:

```txt
The learner may move from choosing correct forms to using passive voice when the affected object, device, or result is more important than the agent.
```

The device explanation case is summarized as:

```txt
grammar
-> explaining systems
```

Interpretation:

Passive Voice shows two Apply-like layers:

1. Apply a grammar rule to transform forms.
2. Apply passive voice for a communicative or explanatory purpose.

The first routes better to:

```txt
TransformationSet
```

The second routes better to:

```txt
Apply Through Situated Task
```

This is a key reason `Apply` is hybrid: applying a rule and applying language in a situation are not the same route.

### Memorising Vocabulary POC

Location: `docs/architecture/20260606_memorising-vocabulary_poc.md`

Relevant signal:

The brick is not mainly a vocabulary list. It organizes a sequence around how learners approach vocabulary learning:

```txt
reflect on current habits
-> discover one strategy
-> try the strategy
-> compare with other strategies
-> apply again in context
-> reflect on personal usefulness
-> discuss with others
```

The POC states:

```txt
strategy is the content
```

and identifies:

```txt
implicit or fragile vocabulary habits
-> more explicit, intentional strategy awareness
```

Interpretation:

Here, Apply means:

```txt
try or reuse a learning strategy
```

This is not the same as applying a grammar rule. The learner applies a method to vocabulary learning, then reflects on whether it worked.

The candidate question:

```txt
What is being applied?
```

works better here than:

```txt
What situation should the learner act in?
```

because the important object is the strategy, not only the external situation.

### Countable / Uncountable — I Learn

Location: `docs/architecture/20260604_countable-uncountable_i-learn_moment-poc.md`

Relevant signal:

The POC explicitly says the learner is not immediately given a rule and asked to apply it.

Instead, the path is:

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

The moment prepares later practice with countable and uncountable nouns.

Later classification practice becomes possible only after the learner has moved through noticing, comparison, inference, and conceptual stabilization.

Interpretation:

Countable / Uncountable distinguishes:

```txt
discover a distinction
```

from:

```txt
apply the distinction in practice
```

If categories are stable, Apply may route to:

```txt
ClassificationSet
```

If categories are still emerging, it routes first to:

```txt
Explore Before The Rule
```

This overlaps with the Classify investigation and shows that applying a concept is often downstream of exploration.

### Explore Before The Rule Investigation and Orchestration Path

Locations:

- `docs/architecture/20260622_explore-before-the-rule-investigation.md`
- `docs/architecture/20260622_explore-before-the-rule-orchestration-path-report.md`

Relevant signal:

The orchestration path ends with:

```txt
Practice
```

after:

```txt
Observe
↓
Compare
↓
Infer
↓
Stabilize
```

The `Practice` step may route toward:

```txt
ClassificationSet / GapFillSet / TransformationSet
```

Interpretation:

In discovery sequences, Apply often appears after stabilization.

Therefore, when an author says "apply", the playground may need to know whether the knowledge is already stabilized.

This connects Apply to the Classify question:

```txt
Are the categories already stable?
```

and to Explore Before The Rule:

```txt
Is the learner applying a known rule,
or still discovering the rule?
```

### Produce Investigation and Clarification

Locations:

- `docs/architecture/20260623_produce-investigation.md`
- `docs/architecture/20260623_produce-clarification-path-report.md`

Relevant signal:

Produce identified several families that can look like application:

- context-fitting answer;
- transformed form;
- hypothesis / interpretation;
- reflection / explanation;
- situated response;
- communicative clue.

The mapping table includes:

```txt
Situated response
↓
Apply Through Situated Task
↓
context-dependent result
```

and:

```txt
Communicative clue
↓
Apply Through Situated Task
with social / interpretive validation
```

Interpretation:

Apply overlaps Produce when the learner must produce language that works in a situation.

But Produce asks:

```txt
What kind of production is expected?
```

Apply asks a different question:

```txt
What makes this use successful?
```

### Reflect Investigation

Location: `docs/architecture/20260623_reflect-investigation.md`

Relevant signal:

The Reflect investigation identifies:

```txt
Action Reliability
```

as one reflective family, observed in:

- Wayfinding;
- Passive Voice guessing game or technical explanation extensions.

It says this overlaps with:

```txt
Apply Through Situated Task
```

Interpretation:

Apply may be followed by reflection:

```txt
Did my action work?
```

But the Apply route itself concerns the action and its functional success condition.

Reflection becomes a review layer, not the primary route.

### Productive Objects and Transformation Reports

Locations:

- `docs/architecture/20260521_productive_objects_emergence_pattern.md`
- `docs/reports/transformation-set-interaction-exploration.md`

Relevant signal:

Transformation is defined as:

```txt
take an explicit source and apply a deliberate change to produce a target
```

The reports insist that the source-target relation matters:

```txt
source
↓
operation
↓
target
```

and that typing a transformation is not the same as filling a blank or writing a justification.

Interpretation:

These reports show that "apply" can mean applying an operation to a source, which is better modeled by:

```txt
TransformationSet
```

than by `Apply Through Situated Task`.

This is another reason the Apply intent is hybrid.

## Types of application observed

### 1. Apply language in a situated communicative task

Observed in:

- Wayfinding;
- Passive Voice teacher-facing device explanation;
- Passive Voice guessing game;
- Produce clarification: Situated Response and Communicative Clue.

Typical learner movement:

```txt
known language resources
↓
credible situation
↓
response or action
↓
functional success condition
```

Possible route:

```txt
Apply Through Situated Task
↓
ContextualTypingUserInput or task-specific interaction
↓
context-dependent result
```

Status:

Strong authoring path; runtime/evaluation depends on observable success criteria.

### 2. Apply a grammar rule or operation

Observed in:

- Passive Voice transformation;
- TransformationSet reports;
- grammar practice after stabilization.

Typical learner movement:

```txt
source
↓
rule / operation
↓
target
```

Possible route:

```txt
TransformationSet
↓
TransformationTyping
```

or, when the task is categorization:

```txt
ClassificationSet
```

Status:

Strong real paths exist for transformation/classification, but Apply should not hide the more specific object.

### 3. Apply a concept or category distinction

Observed in:

- Countable / Uncountable after conceptual stabilization;
- Classify investigation;
- Explore Before The Rule practice step.

Typical learner movement:

```txt
stabilized distinction
↓
new examples
↓
classification or controlled practice
```

Possible route:

```txt
ClassificationSet
```

or:

```txt
Practice Through Controlled Interaction
```

Status:

The engine can represent stable practice. The authoring bridge is less direct if the category is still emerging.

### 4. Apply a strategy

Observed in:

- Memorising Vocabulary;
- Thinking in English strategy activation;
- Reflect on Strategies / Experience.

Typical learner movement:

```txt
strategy awareness
↓
try a method
↓
compare usefulness
↓
reflect / adjust
```

Possible route:

```txt
Reflect Through Selection / Typing
↓
Apply Through Situated Task or activity-specific practice
↓
Reflect on experience
```

Status:

Conceptually strong, but not a single BHE object. It is closer to orchestration.

### 5. Apply a procedure

Observed in:

- Wayfinding route guidance;
- possible sequence/order tasks;
- classroom map tasks.

Typical learner movement:

```txt
ordered steps
↓
action in context
↓
success checked by outcome
```

Possible route:

```txt
SequenceSet
```

when the task is ordering steps, or:

```txt
Apply Through Situated Task
```

when the sequence must function in a situation.

Status:

Partially covered. The right route depends on whether the learner is arranging a procedure or using it.

### 6. Apply a skill

Observed in:

- Wayfinding;
- oral activation in Thinking in English;
- pronunciation / voicework sequences;
- teacher-facing classroom extensions.

Typical learner movement:

```txt
prepared resources
↓
performance
↓
functional or social feedback
```

Possible route:

```txt
Apply Through Situated Task
```

or, if the skill is still controlled:

```txt
Practice Through Controlled Interaction
```

Status:

Documented as a corpus signal, not yet fully modeled as runtime validation.

## Candidate questions compared

### Candidate 1: What is being applied?

Strengths:

This question separates several real families:

| What is being applied? | Likely route |
| --- | --- |
| a grammar rule or operation | `TransformationSet`, `GapFillSet`, `ClassificationSet` |
| a category distinction | `ClassificationSet` or `Explore Before The Rule` if unstable |
| a strategy | reflective / situated orchestration |
| a skill | `Apply Through Situated Task` or controlled practice |
| language in context | `Apply Through Situated Task` |
| a procedure | `SequenceSet` or situated task |

It explains why Apply overlaps with Produce, Classify, Transform, Reflect, and Explore.

Weakness:

It does not always identify the success condition. Knowing that learners apply "directions vocabulary" is not enough; Wayfinding still needs the map, listener, destination, and action test.

### Candidate 2: What situation should the learner act in?

Strengths:

This question is excellent for the strongest current Apply route:

```txt
Apply Through Situated Task
```

It works especially well for:

- Wayfinding;
- situated response;
- communicative clue;
- device explanation;
- map-based route guidance;
- classroom speaking/writing tasks.

It forces the author to specify context and functional success.

Weakness:

It is less effective for:

- applying a grammar rule in controlled practice;
- applying a category distinction;
- applying a transformation operation;
- applying a learning strategy.

In those cases, the first routing question may be more about the object or operation than the situation.

### Best current reading

The two questions are complementary:

```txt
What is being applied?
↓
What situation should the learner act in?
```

But if only one question is allowed, the better first clarification is:

```txt
What is being applied?
```

Reason:

It separates rule, strategy, concept, procedure, skill, and situated language. Once the applied object is clear, the playground can ask whether the use is situated or controlled.

The current survey question:

```txt
What situation should the learner act in?
```

remains excellent for the `Apply Through Situated Task` branch, but it is too narrow for all Apply cases.

## Mapping BHE possible

| Application family | BHE structures | Pedagogical Uses | RepresentationPaths | Apparent status |
| --- | --- | --- | --- | --- |
| Situated language use | `ContextualTypingUserInput`, task-specific interaction, `BHEResult.completed/success/partial/failed` | Apply Through Situated Task | `apply-through-situated-task` | Strong authoring path; evaluation context-dependent |
| Grammar rule / operation | `TransformationSet`, `TransformationTyping`, possibly `GapFillSet` | Practice Through Controlled Interaction; sometimes Apply when contextualized | no dedicated Apply-to-Transformation path | Strong real path, but not specifically Apply |
| Category distinction | `ClassificationSet`, classification renderer/evaluator | Practice Through Controlled Interaction; Explore Before The Rule if emerging | no dedicated classification RepresentationPath yet | Real engine path, authoring bridge incomplete |
| Strategy | reflective carriers, possible situated task or sequence | Reflect Through Selection/Typing, Apply Through Situated Task | reflective paths; apply path when tried in context | Conceptually strong, composite |
| Procedure | `SequenceSet` or situated task structures | Practice / Apply depending purpose | no specific Apply procedure path | Partially covered |
| Skill / performance | situated task, result details, possibly feedback/social validation | Apply Through Situated Task | `apply-through-situated-task` | Plausible; validation not fully modeled |
| Communicative clue | situated task plus interpretation by another learner | Apply Through Situated Task | `apply-through-situated-task` adjacent | Conceptually visible, social loop open |

## What already exists

### A clear authoring Pedagogical Use

`Apply Through Situated Task` is the clearest existing authoring entry for Apply.

It gives a useful author-facing reading:

```txt
use knowledge so that an action succeeds in context
```

### A documented RepresentationPath

The `apply-through-situated-task` `RepresentationPath` already documents:

```txt
situated response
↓
ContextualTypingUserInput
↓
context-dependent evaluation
↓
completed / success / partial / failed
```

This is enough to make Apply more mature than Notice.

### A strong corpus validation case

Wayfinding strongly validates the path:

```txt
directions language
↓
map-based task
↓
another learner can or cannot reach the destination
```

### Existing more-specific routes

When Apply means controlled application of a known form, existing structures often fit better than the generic Apply path:

- `TransformationSet` for source-to-target rule application;
- `ClassificationSet` for applying category distinctions;
- `GapFillSet` for context-fitting answers;
- `SequenceSet` for ordering procedural steps.

## What seems missing

### A clearer authoring distinction between application types

The main missing bridge is not a core object.

It is an authoring distinction between:

```txt
apply in context
```

and:

```txt
apply a rule / concept / strategy / procedure
```

### Observable success criteria

For situated tasks, BHE needs the author to specify:

```txt
What counts as success?
```

Examples:

- another learner reaches the correct place;
- a device explanation is understandable;
- a clue allows someone to infer the object;
- a strategy helps the learner recall or use vocabulary;
- a grammar form changes the focus appropriately.

The current `RepresentationPath` notes this, but does not make it a full authoring clarification yet.

### Evidence of situated success

A typed response may not prove that the action worked.

Wayfinding shows this clearly:

```txt
The directions may be linguistically correct,
but did the classmate reach the right location?
```

That evidence may require peer validation, teacher observation, result details, or a later reflective step.

### Controlled practice versus applied use

Some activities look like Apply but are better read as practice:

```txt
apply the rule to this sentence
```

This may be:

```txt
TransformationSet
```

or:

```txt
GapFillSet
```

or:

```txt
ClassificationSet
```

The playground should not force all rule application into `Apply Through Situated Task`.

## Nature of the phenomenon

Options:

```txt
A. Apply est auto-routable

B. Apply nécessite clarification

C. Apply est réellement hybride

D. Apply révèle une lacune du modèle
```

Most credible answer:

```txt
C. Apply est réellement hybride
```

Why not A:

Apply has one obvious authoring destination, but not one obvious representation. The interaction shape, input, evaluator, and result policy depend on what is applied and where.

Why not only B:

Apply is not as broad as Compare, Reflect, or Produce. It already has a strong central branch:

```txt
Apply Through Situated Task
```

Why not D:

The documentation shows that BHE already has many of the relevant structures. The issue is authoring routing and success criteria, not a missing universal Apply model.

## Conclusion

### What does Apply mean in BHE?

In the current BHE documentation, `Apply` means:

```txt
use something learned, known, discovered, or prepared
in a task where its usefulness can be observed.
```

That "something" may be:

- a grammar rule;
- a transformation operation;
- a category distinction;
- a vocabulary or language resource;
- a communication skill;
- a learning strategy;
- a procedure;
- a conceptual understanding.

The task may be:

- controlled practice;
- source-to-target transformation;
- category classification;
- contextual completion;
- situated communication;
- social/peer validation;
- reflective strategy trial.

Therefore Apply is not one BHE path.

It is an author intent with one mature central branch:

```txt
Apply Through Situated Task
```

and several adjacent specific routes:

```txt
TransformationSet
ClassificationSet
GapFillSet
SequenceSet
Reflect / strategy paths
Explore Before The Rule -> Practice
```

### Does Apply need a clarification question?

Yes.

But the investigation suggests the current candidate should be refined.

The survey question:

```txt
What situation should the learner act in?
```

is excellent when the author already means:

```txt
Apply Through Situated Task
```

It explains Wayfinding and other situated responses very well.

However, it is too narrow for cases like:

- applying a grammar rule;
- applying a category distinction;
- applying a transformation operation;
- applying a learning strategy.

The better first question appears to be:

```txt
What is being applied?
```

Then, for the situated branch, the second question becomes:

```txt
What situation should the learner act in?
```

Recommended clarification shape:

```txt
Apply
↓
What is being applied?
↓
rule / concept / strategy / skill / procedure / language in context
↓
Is the use controlled practice or situated action?
↓
BHE route
```

### Final reading

```txt
Apply is useful.
Apply is not fully self-routing.
Apply is less broad than Compare, Reflect, or Produce.
Apply is genuinely hybrid because it has one clear central authoring route,
but several more-specific BHE routes depending on what is applied.
```

The next healthy step, if the playground is extended later, would be authoring-only:

```txt
Help learners apply
↓
What is being applied?
↓
What situation should the learner act in? // when relevant
↓
Apply Through Situated Task / TransformationSet / ClassificationSet / GapFillSet / SequenceSet / strategy route
```

No new core concept appears necessary from the current documentation.
