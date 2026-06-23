# Classify Investigation

Date: 2026-06-23

Status: Documentary investigation

Scope: authoring, ClassificationSet, Explore Before The Rule, Countable / Uncountable, related BHE paths

## Context

The author intent routing survey currently classifies:

```txt
Classify
↓
Hybrid
```

This differs from:

```txt
Recall
↓
Self-routing
```

and:

```txt
Compare / Reflect / Produce
↓
Clarification-routing
```

The central signal is:

```txt
stable categories
↓
ClassificationSet
```

but also:

```txt
emerging categories
↓
Explore Before The Rule
↓
ClassificationSet / InferenceSet
```

This investigation checks why Classify behaves differently from the other author intents.

Candidate clarification question:

```txt
Are the categories already stable?
```

## Documents and signals examined

### ClassificationSet core type

Location:

```txt
packages/core/types/ClassificationSet.ts
```

Relevant signal:

`ClassificationSet` is a specialized pedagogical object for classification-based activities.

Its core structure contains:

* available categories;
* items to classify;
* an expected `categoryId` per item.

This strongly supports the direct reading:

```txt
known categories
↓
items assigned to categories
↓
ClassificationSet
```

### Classification drag-drop adapter, evaluator, and renderer reports

Locations:

```txt
docs/reports/classification-drag-drop-data-adapter-report.md
docs/reports/classification-drag-drop-evaluator-poc-report.md
docs/reports/classification-drag-drop-dom-renderer-poc-report.md
```

Relevant signal:

These reports validate a real engine path:

```txt
ClassificationSet
↓
classificationToDragDropData
↓
ClassificationDragDropUserInput
↓
evaluateClassificationDragDrop
↓
BHEResult
↓
classificationDragDropDomRenderer
```

They also clarify that classification is item-based:

```txt
item
↓
expected category
```

This means that when the author’s need is stable category assignment, Classify is close to self-routing.

### Countable / Uncountable — I Learn — Moment POC

Location:

```txt
docs/architecture/20260604_countable-uncountable_i-learn_moment-poc.md
```

Relevant signal:

The Countable / Uncountable moment is not simply:

```txt
rule
↓
exercise
```

It is closer to:

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

The learner eventually classifies nouns, but classification is embedded in a guided discovery path. The categories are not merely known labels to apply; they are part of what the learner is being led to understand.

This is the strongest reason Classify is not purely self-routing.

### Explore Before The Rule Investigation

Location:

```txt
docs/architecture/20260622_explore-before-the-rule-investigation.md
```

Relevant signal:

The investigation identifies the pattern:

```txt
observe
↓
compare
↓
infer
↓
stabilize
```

and concludes:

```txt
Explore Before The Rule is not missing from BHE thinking.
It is missing as an author-visible orchestration path.
```

Classification appears inside this pattern, but it does not define the whole path.

### Explore Before The Rule Orchestration Path Report

Location:

```txt
docs/architecture/20260622_explore-before-the-rule-orchestration-path-report.md
```

Relevant signal:

The authoring path for Countable / Uncountable is:

```txt
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

The Practice step can route toward:

```txt
ClassificationSet / GapFillSet / TransformationSet
```

But the earlier Compare and Infer steps may only be partially mapped.

This confirms that classification may be the final practice structure, while exploration and inference explain how the categories become meaningful.

### Compare Investigation and Compare Clarification

Locations:

```txt
docs/architecture/20260622_compare-investigation.md
docs/architecture/20260622_compare-clarification-path-report.md
```

Relevant signal:

Compare clarification includes:

```txt
Categories
↓
ClassificationSet
```

but explicitly distinguishes:

```txt
Use ClassificationSet when categories are stable.
Use Explore Before The Rule when categories are still emerging.
```

This is almost the Classify question in another form.

### Real BHE Path Validation

Location:

```txt
docs/architecture/20260622_real-bhe-path-validation-report.md
```

Relevant signal:

The Countable / Uncountable validation marks:

```txt
Categories
↓
ClassificationSet
↓
Real BHE Path
```

as connected.

But the report also states that this path covers:

```txt
classify examples into categories
```

not the full orchestration:

```txt
observe
↓
compare
↓
infer
↓
stabilize
```

So the classification engine path is real, but it does not cover the whole guided discovery activity.

### InferenceSet Interaction Exploration

Location:

```txt
docs/reports/inference-set-interaction-exploration.md
```

Relevant signal:

The report distinguishes:

```txt
Classification asks:
Which category does this item belong to?
```

from:

```txt
Inference asks:
What can be concluded from these clues?
```

It also names “infer a grammar rule” as a possible inference case.

This matters because emerging classification often starts as inference:

```txt
examples
↓
clues
↓
hypothesis about categories
```

At that stage, the learner may not yet be simply classifying; they may be inferring the rule that makes classification possible.

### PedagogicalUseCatalog

Location:

```txt
packages/authoring/src/PedagogicalUseCatalog.ts
```

Relevant signal:

The catalog does not include a dedicated `classify-through-drag-drop` or `classify-through-qcm` Pedagogical Use yet.

Instead, classification appears under:

```txt
Practice Through Controlled Interaction
```

and:

```txt
Explore Before The Rule
```

This supports the hybrid reading:

* stable classification belongs to practice;
* provisional classification belongs to exploration;
* starting-point classification may belong to diagnosis.

### RepresentationPaths

Location:

```txt
packages/authoring/src/RepresentationPaths.ts
```

Relevant signal:

There is no current authoring `RepresentationPath` dedicated to classification.

The existing authoring paths cover:

* Reflect Through Selection;
* Diagnose Through Selection;
* Recall Through Typing;
* Reflect Through Typing;
* Apply Through Situated Task.

This is not a core gap, because the real ClassificationSet pipeline exists. It is an authoring coverage gap: the playground can point to ClassificationSet, but does not yet have a minimal `RepresentationPath` entry for stable classification.

### AuthorOrchestrationPaths

Location:

```txt
packages/authoring/src/AuthorOrchestrationPaths.ts
```

Relevant signal:

`Explore Before The Rule` explicitly includes:

```txt
Compare
↓
Infer
↓
Stabilize
↓
Practice
```

and maps Practice to:

```txt
ClassificationSet / GapFillSet / TransformationSet
```

This means classification may appear at the end of a discovery route, while the earlier route is not reducible to classification alone.

### Author Intent Routing Survey

Location:

```txt
docs/architecture/20260623_author-intent-routing-survey.md
```

Relevant signal:

The survey already identified the implicit question:

```txt
Are the categories already stable?
```

and classified Classify as Hybrid because:

```txt
Classify is direct when categories are stable,
but exploratory when categories are emerging.
```

This investigation confirms and refines that reading.

## Types de classification observés

### 1. Stable classification

The categories are already known, named, and pedagogically stable.

The learner’s task is:

```txt
Which category does this item belong to?
```

Examples:

* sorting nouns into Countable / Uncountable after the distinction is introduced;
* sorting adjectives by `-ed` / `-ing` when the rule is known;
* classifying forms during controlled grammar practice.

This is the most direct Classify route.

### 2. Exploratory classification

The categories are not yet fully known or stable for the learner.

The learner’s task is closer to:

```txt
What grouping seems to emerge from these examples?
```

or:

```txt
What distinction could explain these examples?
```

Examples:

* Countable / Uncountable before rule explanation;
* guided grammar discovery;
* provisional grouping before naming the distinction.

This is not purely ClassificationSet. It belongs to an orchestration involving noticing, comparing, inference, stabilization, then practice.

### 3. Diagnostic classification

The categories may be known to the author, but the learner’s response is used to understand their starting point rather than to grade them.

The author’s question is:

```txt
What does this placement reveal about the learner’s current understanding?
```

Examples:

* pre-check before explanation;
* sorting examples to reveal misconceptions;
* choosing support level based on category placements.

This may use classification-like mechanics, but the pedagogical use is diagnostic.

### 4. Practice classification

The learner rehearses a known distinction with feedback.

The author’s question is:

```txt
Can the learner apply this category distinction reliably?
```

Examples:

* post-rule controlled practice;
* drag/drop category sorting;
* QCM category recognition.

This is stable and evaluative. It is the strongest current mapping to ClassificationSet.

### 5. Inference-supported classification

The learner classifies, but the meaningful act is explaining or discovering the rule that justifies the category.

The author’s question is:

```txt
What rule or clue makes this category plausible?
```

Examples:

* infer why a noun behaves as countable or uncountable;
* justify a category from context;
* classify a borderline example by explaining evidence.

Here classification may be the visible output, but inference may be the deeper pedagogical operation.

### 6. Classification as comparison

The learner compares items or categories in order to place them.

The author’s question is:

```txt
What distinction matters between these items?
```

This overlaps with Compare Clarification:

```txt
Categories
↓
ClassificationSet
```

Classify and Compare meet when the comparison is specifically category membership.

## Mapping BHE possible

| Classification family | BHE structures | Pedagogical Uses | RepresentationPaths | Apparent status |
| --- | --- | --- | --- | --- |
| Stable classification | `ClassificationSet`, `ClassificationDragDropData`, `ClassificationDragDropUserInput`, `evaluateClassificationDragDrop`, classification renderer | Practice Through Controlled Interaction | No dedicated authoring `RepresentationPath` yet | Real engine path, authoring bridge incomplete |
| Practice classification | `ClassificationSet`, QCM or drag/drop, item-based evaluation, `BHEResult.success/partial/failed` | Practice Through Controlled Interaction | No dedicated authoring `RepresentationPath` yet | Strong / real path |
| Exploratory classification | `ClassificationSet` plus `AuthorOrchestrationPath`, possible `IdentificationSet` and `InferenceSet` | Explore Before The Rule | `explore-before-rule` as `AuthorOrchestrationPath` | Plausible, composite |
| Diagnostic classification | Classification-like selection or placement, possibly `IdentificationSelectionData`, context-dependent result | Diagnose Through Selection or future diagnostic classification path | `diagnose-through-selection` is adjacent but imperfect | Conceptually plausible, not fully documented |
| Inference-supported classification | `InferenceSet`, evidence, justification, possible later `ClassificationSet` | Explore Before The Rule; possible inference-oriented use | `explore-before-rule` partially | Conceptually covered, implementation partial |
| Classification as comparison | `ClassificationSet` when categories are stable; orchestration when categories are emerging | Compare clarification: Categories; Practice or Explore depending on stability | Compare path documents the distinction | Already visible in authoring, not a standalone Classify path |

## What already exists

### ClassificationSet is strong

For stable categories, BHE already has the right kind of object:

```txt
ClassificationSet
```

and real pipelines:

```txt
ClassificationSet
↓
ClassificationDragDropData
↓
ClassificationDragDropUserInput
↓
evaluateClassificationDragDrop
↓
BHEResult
```

This is why Classify is not as broad as Compare, Reflect, or Produce.

### Explore Before The Rule explains the non-direct cases

When categories are emerging, the route is no longer a simple classification path.

It becomes:

```txt
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

Classification may appear at the Practice step, but the full author need is orchestration.

### InferenceSet explains the hypothesis layer

If the learner must explain why a category exists or what rule supports it, the route shifts toward:

```txt
InferenceSet
```

This is not a replacement for ClassificationSet. It explains the interpretive layer before or around classification.

## What seems missing

### A stable-classification authoring path

The core engine path exists, but the authoring package does not yet expose a simple `RepresentationPath` for:

```txt
Classify with stable categories
↓
ClassificationSet
↓
ClassificationDragDrop or QCM
↓
BHEResult.success / partial / failed
```

This is an authoring/documentation gap, not a core gap.

### A classification clarification step

Classify may need a small clarification question, but not as wide as Compare/Reflect/Produce.

The strongest candidate remains:

```txt
Are the categories already stable?
```

Possible answers:

```txt
Yes, learners apply known categories.
↓
ClassificationSet
```

```txt
No, learners discover or test emerging categories.
↓
Explore Before The Rule / InferenceSet / later ClassificationSet
```

```txt
Partly, I want to see what they currently understand.
↓
Diagnostic classification / Diagnose Through Selection
```

### A clearer diagnosis route

The documentation supports diagnostic use, but there is no clean path for:

```txt
classify to reveal starting point
```

This currently sits between ClassificationSet, Diagnose Through Selection, and authoring judgment.

## Nature du phénomène

Options:

```txt
A. Classify est auto-routable

B. Classify nécessite clarification

C. Classify est réellement hybride

D. Classify révèle une lacune du modèle
```

Most credible answer:

```txt
C. Classify est réellement hybride.
```

Why not A:

Classify is self-routing only when categories are already stable.

Why not only B:

Classify does not behave like Compare, Reflect, or Produce. It has a strong obvious BHE destination in many cases: `ClassificationSet`.

Why not D:

There is no obvious core model gap. BHE already represents classification well when the activity is stable category assignment.

The gap is mainly:

```txt
authoring coverage
```

and:

```txt
classification purpose clarification
```

## Why is Classify hybrid?

Classify is hybrid because it sits between two realities.

First reality:

```txt
known categories
↓
category assignment
↓
ClassificationSet
```

This is direct, stable, and already engine-connected.

Second reality:

```txt
not-yet-stable categories
↓
observe / compare / infer
↓
stabilize category distinction
↓
later classification practice
```

This is not one ClassificationSet activity. It is an authoring orchestration, often involving `Explore Before The Rule` and sometimes `InferenceSet`.

Classify therefore behaves differently from Recall, Compare, Reflect, and Produce:

* unlike Recall, it is not always direct;
* unlike Compare/Reflect/Produce, it is not always broad;
* it becomes direct or exploratory depending on category stability and pedagogical purpose.

## Does Classify need a clarification question?

Yes, but a lighter one than Compare, Reflect, or Produce.

The best current candidate is:

```txt
Are the categories already stable?
```

This question is useful because it separates:

```txt
stable classification
↓
ClassificationSet
```

from:

```txt
emerging classification
↓
Explore Before The Rule
↓
InferenceSet / ClassificationSet
```

and:

```txt
diagnostic classification
↓
Diagnose Through Selection or classification-like evidence collection
```

## Conclusion

Classify should remain classified as:

```txt
Hybrid
```

The investigation supports the survey’s intuition.

Classify is not a vague author intent in the same way as Compare, Reflect, or Produce. It has a strong real BHE route when the categories are stable.

But Classify is also not always self-routing, because real Boost'English bricks often use classification as part of discovery:

```txt
examples
↓
comparison
↓
hypothesis
↓
category stabilization
↓
classification practice
```

The next authoring move should not be a new core concept.

It should be a small authoring clarification:

```txt
Classify
↓
Are the categories already stable?
```

That question is enough to explain why Classify behaves differently from both Recall and the broader clarification intents.
