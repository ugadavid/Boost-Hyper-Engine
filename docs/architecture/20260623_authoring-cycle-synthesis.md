# Authoring Cycle Synthesis

Date: 2026-06-23

Status: synthesis

Scope: authoring documentation only. This document does not introduce a new core concept, a new runtime architecture, or a new implementation plan.

## Central question

```txt
What did the Author Discovery Playground become?
```

The short answer is:

```txt
The playground is no longer a menu.

It has become an author-facing routing surface.
```

It started as a way to browse:

```txt
Intent
↓
Pedagogical Use
↓
RepresentationPath
↓
BHE Representation
↓
Real Example
```

After the recent authoring cycle, it now also exposes:

```txt
routing behavior
clarification questions
realization status
missing bridges
```

This matters because BHE can contain a representational structure without that structure being discoverable by an author.

The playground now makes that difference visible.

## 1. From menu to routing surface

A menu assumes that entries are roughly equivalent.

The current playground shows the opposite:

```txt
Author intents are not equal routing units.
```

Some intents point fairly directly toward a BHE structure. Some are broad pedagogical wishes. Some are incomplete until the author answers a clarification question. Some look direct at first, then branch depending on purpose.

The current routing map identifies three behaviors:

| Routing behavior | Current intents | Reading |
| --- | --- | --- |
| Self-routing | Recall | The intent already points toward a fairly clear BHE direction. |
| Clarification-routing | Compare, Reflect, Produce | The intent is too broad to route honestly without a question. |
| Hybrid | Notice, Apply, Classify | The intent has an apparent direct path, but changes route depending on pedagogical purpose, context, or evidence. |

So the playground is not simply asking:

```txt
What do you want learners to do?
```

It is also asking:

```txt
What kind of author intent is this?
```

and:

```txt
Does this intent already know where it is going?
```

## 2. Levels now visible

The current playground makes several layers visible at once.

| Level | Role | Examples |
| --- | --- | --- |
| Author Intent | Natural author-facing starting point. | Compare, Reflect, Produce, Apply, Notice, Classify, Recall |
| Routing Behavior | Whether the intent is direct, ambiguous, or hybrid. | Self-routing, clarification-routing, hybrid |
| Clarification | A question that disambiguates broad intents. | What are learners comparing? What are learners reflecting on? What kind of production is expected? |
| Pedagogical Use | The authoring-level pedagogical move. | Reflect Through Selection, Recall Through Typing, Apply Through Situated Task |
| RepresentationPath | The explicit bridge from pedagogical use to BHE structures. | recall-through-typing, reflect-through-selection, practice-through-controlled-classification |
| AuthorOrchestrationPath | A visible multi-step authoring path when a single representation is not enough. | Explore Before The Rule |
| BHE structure | Existing representation carrier and interaction data. | ClassificationSet, TransformationSet, MemorizationSet, IdentificationSet |
| UserInput / Result policy | What the learner produces and how the system treats it. | ClassificationDragDropUserInput, TransformationTypingUserInput, IdentificationSelectionUserInput, BHEResult.completed |
| Renderer / evaluator / feedback | Whether the route reaches a real interaction loop. | classification renderer + evaluator, transformation renderer + evaluator, reflective selection renderer + completed feedback |
| Route Realization | Whether the path is real, partial, or missing. | exists completely, partially exists, missing pieces |
| Corpus validation | Whether the path is grounded in Boost'English examples. | Countable / Uncountable, Passive Voice, Memorising Vocabulary, Thinking in English, Wayfinding |

The important change is that the playground no longer stops at:

```txt
This seems representable.
```

It now asks:

```txt
Which pieces of the chain actually exist?
```

## 3. The emergent authoring cycle

The cycle that emerged can be described as:

```txt
Author Intent
↓
Routing behavior
↓
Clarification when needed
↓
Pedagogical Use
↓
RepresentationPath or AuthorOrchestrationPath
↓
BHE carrier and UserInput
↓
Result policy
↓
Renderer / evaluator / feedback
↓
Route Realization
↓
Real corpus validation
```

This is not a proposed new core architecture.

It is an observed authoring workflow.

The cycle has also become iterative:

```txt
investigation
↓
clarification path
↓
real-brick validation
↓
route realization
↓
missing bridge identification
↓
smallest possible materialization
↓
updated realization status
```

This explains why the playground has been useful: it does not merely show finished paths. It reveals where authoring knowledge is mature, where it is implicit, and where the BHE engine or UI still needs a bridge.

## 4. Durable discoveries

### Author intents are not all the same kind of thing

Recall is close to a direct route:

```txt
Recall
↓
Recall Through Typing
↓
MemorizationTypingRecall
```

Compare, Reflect, and Produce are different. They are not destinations. They are incomplete author signals.

They require questions:

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

```txt
Produce
↓
What kind of production is expected?
```

This discovery appears durable because it was validated across multiple documents, multiple corpus examples, and multiple real BHE routes.

### Clarification is not decoration

Clarification is not an extra UI flourish.

It is the mechanism that prevents broad author language from being mapped too quickly to the wrong BHE structure.

For example:

```txt
Compare
```

can route toward:

```txt
ClassificationSet
TransformationSet
AssociationSet
InferenceSet
SequenceSet
Reflective selection or typing
```

depending on what is being compared.

The authoring problem is therefore not only:

```txt
Can BHE represent comparison?
```

It is:

```txt
Can the author discover which kind of comparison they mean?
```

### RepresentationPath became the explicit authoring bridge

The first route realization work showed that real engine support is not enough.

Classification and transformation were already strong at the engine level:

```txt
core
renderer
evaluator
```

But they did not count as complete authoring routes until the author-facing RepresentationPath was explicit.

This made the role of RepresentationPath clearer:

```txt
Pedagogical Use
↓
author-visible translation
↓
BHE structure
```

RepresentationPath is not the core representation itself. It is the authoring bridge that makes the translation discoverable.

### AuthorOrchestrationPath covers paths that are not one representation

Explore Before The Rule did not appear to require a new core concept.

The investigation suggested it was better understood as:

```txt
author-visible orchestration path
```

It combines existing moves:

```txt
observe
compare
hypothesize
stabilize
practice
```

This remains important because some author intents do not map cleanly to one BHE object. They may describe a sequence of representational moves.

### completed is now a real non-corrective result path

The completed-path work changed the status of reflective activities.

Before the spike, BHE clearly supported:

```txt
success
partial
failed
```

but the non-corrective path toward:

```txt
BHEResult.completed
```

was only partially visible.

The spike and later reflective selection renderer showed that this route can be real:

```txt
IdentificationSelectionUserInput
↓
createCompletedResultFromUserInput
↓
BHEResult.completed
↓
FeedbackData.completed
```

This matters for Thinking in English and other reflective activities because they are meaningful without being right/wrong exercises.

### Realization level became necessary

The Route Realization view added a stricter question:

```txt
Is this route understandable,
or does it actually reach the real BHE system?
```

The current realization status is:

```txt
exists completely: 4
partially exists: 0
missing pieces: 1
```

The four complete routes are:

```txt
Compare
↓
Categories
↓
ClassificationSet
```

```txt
Compare
↓
Before / After Forms
↓
TransformationSet
```

```txt
Produce
↓
Recalled Target
↓
MemorizationTypingRecall
```

```txt
Reflect
↓
Strategies
↓
Reflect Through Selection
↓
completed
```

The remaining missing route is:

```txt
Apply
↓
Language in Context
↓
Apply Through Situated Task
```

The lesson is not that every route should be forced to completion quickly.

The lesson is that route completion is now observable.

## 5. What remains open

### Apply still needs honest situated evidence

Apply is the clearest remaining open problem.

The question is not only:

```txt
Can a learner submit a situated response?
```

It is:

```txt
What counts as successful situated use?
```

The recent investigation concluded that the missing piece is not merely a renderer or an evaluator. The missing bridge is closer to:

```txt
situated response
↓
evidence of use
↓
BHEResult
```

A typed response can honestly produce:

```txt
completed attempt
```

but that does not prove that the response worked in context.

So Apply should remain `missing pieces` until BHE can express the evidence behind situated success without pretending that submission equals successful use.

### Hybrid intents still need care

Notice, Apply, and Classify remain hybrid.

They are not as broad as Compare or Reflect, but they are not fully self-routing either.

Their provisional questions are useful but still less mature:

```txt
Notice
↓
What should noticing lead to?
```

```txt
Classify
↓
Are the categories already stable?
```

```txt
Apply
↓
What is being applied?
or
What situation should the learner act in?
```

These questions are promising, but they do not yet have the same practical maturity as Compare, Reflect, and Produce.

### The contract lens is useful, but not stabilized

The recent investigations repeatedly surfaced:

```txt
same interaction mechanics
different pedagogical meaning
```

Selection can be corrective, reflective, diagnostic, or exploratory.

Classification can support practice, diagnosis, or discovery.

Typing can be recall, transformation, reflection, explanation, or situated production.

This suggests that a contract lens is useful for analysis. But it should remain a lens for now, not a stabilized architecture.

### UI placement remains open

Reflective selection became complete through a specialized renderer.

That does not yet answer the broader question:

```txt
Should neutral reflective selection live in a dedicated renderer,
in a configurable selection renderer,
or in a clearer renderer/evaluator contract?
```

The current solution is intentionally small and specialized. It completes a route without settling the larger design.

### Route realization maintenance remains manual

The Route Realization view is currently a curated authoring map.

That is acceptable for the current stage, but it means:

```txt
realization status
```

depends on human documentation and careful updates.

Later, the project may need a more reliable way to keep authoring claims aligned with real engine capabilities.

That is not necessary yet, but the need is visible.

## 6. “Can BHE represent this?” vs “Can an author discover that BHE can represent this?”

The earlier question was:

```txt
Can BHE represent this?
```

That is an engine question.

It asks whether the core, interaction data, user input, renderer, evaluator, result, or feedback machinery can carry a learning activity.

The current question is:

```txt
Can an author discover that BHE can represent this?
```

That is an authoring question.

It asks whether an author can start from ordinary pedagogical language and find the correct representational route without already knowing the internal model.

The difference is now concrete:

| Case | Engine capability | Author discoverability |
| --- | --- | --- |
| Classification | Core, renderer, and evaluator already existed. | Became complete when Compare/Categories gained an explicit author-facing route. |
| Transformation | Core, adapter, renderer, and evaluator already existed. | Became complete when Before / After Forms gained an explicit RepresentationPath. |
| Memorization typing recall | RepresentationPath and evaluator existed. | Became complete only after the missing renderer was built. |
| Reflective selection | UserInput and completed result path existed. | Became complete only after neutral reflective selection had a real UI. |
| Apply situated task | The authoring route is understandable. | It remains incomplete because situated success needs evidence, not just submission. |

So the playground became a tool for distinguishing:

```txt
representable
```

from:

```txt
discoverable
```

from:

```txt
fully realized
```

That distinction is probably one of the most important outcomes of the cycle.

## 7. Current state of the playground

The Author Discovery Playground now functions as:

```txt
an author-facing route laboratory
```

It does four things at once:

1. It helps the author start from intent.
2. It asks clarification questions when the intent is too broad.
3. It shows the bridge from pedagogical language to BHE structures.
4. It measures whether the route actually reaches a real BHE loop.

It is still not:

- a full editor;
- a persistence layer;
- a PedagogicalObject generator;
- a new core architecture;
- a complete authoring product.

Its value is sharper than that:

```txt
It exposes the route.
```

## Conclusion

Question:

```txt
What is the emerging architecture
of the Author Discovery Playground?
```

Answer:

```txt
Author Intent
↓
Routing behavior
↓
Clarification when needed
↓
Pedagogical Use
↓
RepresentationPath / AuthorOrchestrationPath
↓
BHE carrier + UserInput + result policy
↓
Renderer / evaluator / completion helper / feedback
↓
Route Realization
↓
Corpus validation
```

This is not a new BHE core architecture.

It is the emerging structure of the authoring surface.

The playground became a way to make author discoverability inspectable:

```txt
not only what BHE can represent,
but how an author can find the path
from intention to representation.
```

That is the central shift of the authoring cycle.

