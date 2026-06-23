# Author Intent Routing Survey

Date: 2026-06-23

Status: documentary survey

Scope: no implementation, no playground change, no package modification.

## Context

Recent Author Discovery Playground work showed that two author intents are not self-routing:

```txt
Compare
↓
What are learners comparing?
↓
multiple BHE structures
```

and:

```txt
Reflect
↓
What are learners reflecting on?
↓
multiple BHE structures
```

This survey asks whether that phenomenon is exceptional or whether it reveals something more general about the structure of the playground.

The question is no longer:

```txt
How does Compare work?
```

or:

```txt
How does Reflect work?
```

The question is:

```txt
How does the playground itself route author intent?
```

## Intent Inventory

The current playground defines seven author intents:

```txt
Help learners notice something
Help learners reflect
Help learners recall
Help learners apply
Help learners classify
Help learners produce
Help learners compare
```

Source:

```txt
packages/authoring/src/AuthorDiscoveryPlayground.ts
```

Current intent ids:

```txt
notice
reflect
recall
apply
classify
produce
compare
```

## Routing Analysis

### 1. Help learners notice something

Current playground route:

```txt
notice
↓
Reflect Through Selection
Diagnose Through Selection
Reflect Through Typing
```

Type:

```txt
C — Hybrid
```

Implicit author question:

```txt
What should noticing lead to?
```

Possible variants:

- notice something about myself;
- notice a starting-point need;
- notice a pattern;
- notice before forming a rule;
- notice before reflecting or explaining.

Structures BHE reached:

- `Reflect Through Selection`;
- `Diagnose Through Selection`;
- `Reflect Through Typing`;
- possibly `Explore Before The Rule`;
- possibly `IdentificationSet`, `ClassificationSet`, or `InferenceSet` depending on what is noticed.

Distance to BHE:

```txt
Intent
↓
Pedagogical Use
↓
RepresentationPath
↓
BHE
```

or, when noticing is conceptual:

```txt
Intent
↓
Clarification
↓
Explore / Infer / Classify
↓
BHE
```

Confidence:

```txt
ambiguous
```

Reason:

`Notice` is close to both reflection and exploration. If the learner notices a personal habit, reflective paths work. If the learner notices a pattern in examples, Explore Before The Rule or Inference may fit better.

Survey reading:

`Notice` is not as explicitly clarified as Compare or Reflect yet, but it likely benefits from clarification.

### 2. Help learners reflect

Current playground route:

```txt
reflect
↓
What are learners reflecting on?
↓
Habits / Strategies / Confidence / Understanding / Choices / Hypotheses / Experience / Progress / Action Reliability
↓
multiple routes
```

Type:

```txt
B — Clarification-routing
```

Implicit author question:

```txt
What are learners reflecting on?
```

Structures BHE reached:

- `Reflect Through Selection`;
- `Reflect Through Typing`;
- `Diagnose Through Selection`;
- `Explore Before The Rule`;
- `InferenceSet`;
- `ClassificationSet`;
- `Apply Through Situated Task`;
- `BHEResult.completed`.

Distance to BHE:

```txt
Intent
↓
Clarification
↓
Pedagogical Use
↓
RepresentationPath / AuthorOrchestrationPath
↓
BHE
```

Confidence:

```txt
very broad
```

Reason:

Reflect can mean self-positioning, strategy awareness, confidence surfacing, hypothesis review, experience review, or action reliability. Some of these routes are not best handled by a pure Reflect path.

Survey reading:

Reflect confirms that author intent may need a clarification layer before Pedagogical Use selection.

### 3. Help learners recall

Current playground route:

```txt
recall
↓
Recall Through Typing
↓
MemorizationTypingRecallData
↓
MemorizationTypingRecallUserInput
↓
evaluateMemorizationTypingRecall
↓
BHEResult.success / partial / failed
```

Type:

```txt
A — Self-routing
```

Implicit author question:

```txt
Do learners need to retrieve a target before seeing it?
```

Possible secondary question:

```txt
How should recall be captured?
```

For V0, the answer is typing.

Structures BHE reached:

- `Recall Through Typing`;
- `MemorizationTypingRecallData`;
- `MemorizationTypingRecallUserInput`;
- `evaluateMemorizationTypingRecall`;
- `BHEResult.success | partial | failed`.

Distance to BHE:

```txt
Intent
↓
Pedagogical Use
↓
RepresentationPath
↓
BHE
```

Confidence:

```txt
direct
```

Reason:

Recall is currently narrow in the playground. It maps to one documented RepresentationPath with an existing evaluator.

Survey reading:

Recall is the clearest self-routing intent today, with the caveat that future flashcard/self-check variants could make it more hybrid.

### 4. Help learners apply

Current playground route:

```txt
apply
↓
Apply Through Situated Task
↓
context-dependent representation
```

Type:

```txt
C — Hybrid
```

Implicit author question:

```txt
What situation should the learner act in?
```

Secondary questions:

```txt
What counts as successful use?
What observable response captures the action?
Which interaction shape does the situation require?
```

Structures BHE reached:

- `Apply Through Situated Task`;
- possibly typing;
- possibly selection;
- possibly drag-drop;
- possibly reorder;
- `BHEResult.completed | success | partial | failed`;
- result details/signals depending on functional criteria.

Distance to BHE:

```txt
Intent
↓
Pedagogical Use
↓
context clarification
↓
RepresentationPath
↓
BHE
```

Confidence:

```txt
ambiguous but bounded
```

Reason:

Apply has one obvious Pedagogical Use in the catalog, but not one obvious representation. The concrete situation determines the interaction shape and evaluation.

Survey reading:

Apply is not as broad as Reflect, but it is not fully self-routing because situated use must be specified.

### 5. Help learners classify

Current playground route:

```txt
classify
↓
Diagnose Through Selection
Practice Through Controlled Interaction
Explore Before The Rule
```

Type:

```txt
C — Hybrid
```

Implicit author question:

```txt
Are the categories already stable?
```

Possible variants:

- classify stable categories for practice;
- classify provisionally to discover a rule;
- select evidence diagnostically;
- distinguish examples before concept stabilization.

Structures BHE reached:

- `ClassificationSet`;
- `Practice Through Controlled Interaction`;
- `Explore Before The Rule`;
- `Diagnose Through Selection`;
- possibly `InferenceSet` during discovery.

Distance to BHE:

For stable categories:

```txt
Intent
↓
ClassificationSet
↓
BHE
```

For discovery:

```txt
Intent
↓
Clarification
↓
Explore Before The Rule
↓
ClassificationSet / InferenceSet
↓
BHE
```

Confidence:

```txt
ambiguous
```

Reason:

Classify looks direct, but the playground already says V0 points to nearby uses and a dedicated path is still missing. The critical difference is whether classification is practice, diagnosis, or discovery.

Survey reading:

Classify is not as self-routing as it first appears. It likely needs a clarification question around category stability and pedagogical purpose.

### 6. Help learners produce

Current playground route:

```txt
produce
↓
Recall Through Typing
Reflect Through Typing
Apply Through Situated Task
```

Type:

```txt
B — Clarification-routing
```

Implicit author question:

```txt
What kind of production is expected?
```

Possible variants:

- produce a recalled target;
- produce a reflection;
- produce language that works in a situation;
- produce a transformed form;
- produce an explanation or justification.

Structures BHE reached:

- `Recall Through Typing`;
- `Reflect Through Typing`;
- `Apply Through Situated Task`;
- possibly `TransformationSet`;
- possibly `InferenceSet`;
- possibly `GapFillSet`.

Distance to BHE:

```txt
Intent
↓
Clarification
↓
Pedagogical Use
↓
RepresentationPath
↓
BHE
```

Confidence:

```txt
very broad
```

Reason:

Production is a visible response mode, not a pedagogical destination. Typing can mean recall, reflection, transformation, gap-fill, explanation, application, or inference.

Survey reading:

Produce is likely under-clarified today. It resembles Compare and Reflect as a broad author intent.

### 7. Help learners compare

Current playground route:

```txt
compare
↓
What are learners comparing?
↓
Categories / Relations / Before-After Forms / Hypotheses / Order / Strategies-Habits
↓
multiple routes
```

Type:

```txt
B — Clarification-routing
```

Implicit author question:

```txt
What are learners comparing?
```

Structures BHE reached:

- `ClassificationSet`;
- `AssociationSet`;
- `TransformationSet`;
- `InferenceSet`;
- `SequenceSet`;
- `Reflect Through Selection`;
- `Reflect Through Typing`;
- `Explore Before The Rule`.

Distance to BHE:

```txt
Intent
↓
Clarification
↓
Pedagogical Use
↓
RepresentationPath / AuthorOrchestrationPath
↓
BHE
```

Confidence:

```txt
very broad
```

Reason:

Compare is not an interaction and not a single Pedagogical Use. It routes by object of comparison.

Survey reading:

Compare is the canonical clarification-routing intent in the current playground.

## Summary Table

| Intent | Routing type | First implicit question | Main BHE direction | Confidence |
| --- | --- | --- | --- | --- |
| Notice | Hybrid | What should noticing lead to? | Reflect / Diagnose / Explore / Infer | Ambiguous |
| Reflect | Clarification-routing | What are learners reflecting on? | Reflect paths, Diagnose, Explore, Inference, Apply | Very broad |
| Recall | Self-routing | Do learners retrieve a target before seeing it? | Recall Through Typing / MemorizationTypingRecall | Direct |
| Apply | Hybrid | What situation should the learner act in? | Apply Through Situated Task + context-specific shape | Ambiguous but bounded |
| Classify | Hybrid | Are the categories already stable? | ClassificationSet / Practice / Explore / Diagnose | Ambiguous |
| Produce | Clarification-routing | What kind of production is expected? | Recall / Reflect / Apply / Transform / Infer | Very broad |
| Compare | Clarification-routing | What are learners comparing? | Classification / Association / Transformation / Inference / Sequence / Reflect | Very broad |

## Emerging Patterns

### 1. Direct intents

Current example:

```txt
Recall
```

Direct intents have a narrow learner action and an already documented RepresentationPath.

They look like:

```txt
Intent
↓
Pedagogical Use
↓
RepresentationPath
↓
BHE
```

They are not necessarily simple forever. Recall may later split into flashcards, self-check, typing recall, and spaced review. But in the current playground, it routes clearly.

### 2. Clarification intents

Current examples:

```txt
Compare
Reflect
Produce
```

These intents are meaningful to authors but too broad to route directly.

They look like:

```txt
Intent
↓
Clarification Question
↓
Pedagogical Use
↓
RepresentationPath
↓
BHE
```

The clarification question differs:

```txt
Compare -> What are learners comparing?
Reflect -> What are learners reflecting on?
Produce -> What kind of production is expected?
```

### 3. Hybrid intents

Current examples:

```txt
Notice
Apply
Classify
```

Hybrid intents have a visible direct path but become ambiguous when the pedagogical purpose changes.

They look like:

```txt
Intent
↓
maybe direct BHE route
```

or:

```txt
Intent
↓
Clarification
↓
different route
```

Examples:

- Classify is direct when categories are stable, but exploratory when categories are emerging.
- Apply has one clear Pedagogical Use, but the situation determines the representation.
- Notice may route toward reflection, diagnosis, or guided discovery.

### 4. Exploratory/discovery intents

Some intents become exploratory when the learner is not applying a stabilized rule yet.

Examples:

- Notice;
- Classify;
- Compare;
- Reflect on Understanding;
- Reflect on Hypotheses.

These often route toward:

```txt
Explore Before The Rule
InferenceSet
ClassificationSet
```

or authoring orchestration rather than a single RepresentationPath.

### 5. Response-shape intents

`Produce` reveals a special pattern.

It names a response shape more than a pedagogical route.

The author still needs to clarify whether production is:

- recall;
- transformation;
- reflection;
- situated communication;
- explanation;
- inference;
- completion.

This resembles the older principle:

```txt
typing gesture != typing cognition
```

In authoring terms:

```txt
produce != one BHE route
```

## Playground Implications

### Should every intent behave the same way?

No.

The survey suggests that a uniform UI pattern would hide important differences.

Some intents are already close to BHE structures:

```txt
Recall
```

Some need clarification before any Pedagogical Use list is useful:

```txt
Compare
Reflect
Produce
```

Some are hybrid:

```txt
Notice
Apply
Classify
```

The playground should therefore allow different intent behaviors:

```txt
self-routing
clarification-routing
hybrid-routing
```

### Do some intents naturally require clarification?

Yes.

Clarification is not a workaround. It appears to be a natural authoring step for broad intentions.

The key authoring question is often:

```txt
What exactly does the learner action mean here?
```

or:

```txt
What object is this intent acting on?
```

Compare and Reflect already validate this pattern.

Produce likely needs the same treatment later.

### Does clarification always mean a new concept?

No.

Compare and Reflect both demonstrate that clarification can route to existing BHE structures.

The purpose of clarification is not to create:

```txt
CompareSet
ReflectSet
ProduceSet
```

It is to help the author find:

```txt
the existing BHE path that already fits.
```

## Conclusion

Question:

```txt
What is the emerging structure
of the Author Discovery Playground?
```

Answer:

The playground is becoming a routing surface with at least three intent behaviors:

```txt
Self-routing intents
Clarification-routing intents
Hybrid intents
```

It is not simply:

```txt
Intent
↓
Pedagogical Use
↓
BHE
```

The more accurate emerging structure is:

```txt
Author Intent
↓
optional Clarification Question
↓
Pedagogical Use
↓
RepresentationPath / AuthorOrchestrationPath
↓
BHE structure
↓
Real or partial path evidence
```

The survey also suggests that authoring discovery is not only about listing possible uses. It is about determining when an author's first word is already precise enough and when it is not.

Current classification:

```txt
Recall -> Self-routing

Compare -> Clarification-routing
Reflect -> Clarification-routing
Produce -> Clarification-routing

Notice -> Hybrid
Apply -> Hybrid
Classify -> Hybrid
```

The main lesson is:

```txt
Author intents are not equal routing units.
```

Some are close to implementation. Some are broad cognitive wishes. Some are almost interaction gestures. Some are pedagogical purposes that need context.

The Author Discovery Playground should make those differences visible instead of forcing every intent into the same shape.
