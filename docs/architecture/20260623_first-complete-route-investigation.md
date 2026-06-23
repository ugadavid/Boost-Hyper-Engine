# First Complete Route Investigation

Date: 2026-06-23

Status: investigation only.

Candidate route:

```txt
Compare
↓
Categories
↓
ClassificationSet
```

This investigation asks whether the route can already be considered the first fully realized authoring route in BHE.

The strict chain tested is:

```txt
Author Intent
↓
Clarification
↓
Pedagogical Use
↓
RepresentationPath
↓
BHE Structure
↓
Renderer / Evaluator
```

## Why this route is the best candidate

This route is currently the strongest candidate because most of the real BHE side already exists.

Existing pieces:

- `Compare` exists as an author intent in the playground.
- The Compare clarification question exists:

```txt
What are learners comparing?
```

- The `Categories` option exists in the playground.
- `Categories` explicitly maps to:

```txt
ClassificationSet
```

- `ClassificationSet` exists in core.
- Classification adapters exist.
- Classification DOM renderers exist.
- Classification evaluators exist.
- The Countable / Uncountable example already instantiates a real `ClassificationSet` and renders it through the existing classification drag/drop renderer.

So the engine-side route is not hypothetical.

## What exists today

### Author intent

The playground has:

```txt
Help learners compare
```

This intent is already classified as clarification-routing rather than self-routing.

### Clarification

The playground asks:

```txt
What are learners comparing?
```

For the `Categories` option, examples include:

```txt
countable vs uncountable
comparative vs superlative
-ed vs -ing
```

The option maps toward:

```txt
ClassificationSet
```

### Real BHE structure

The core contains `ClassificationSet`.

It has stable categories and items whose expected category is known. This is a strong match for the category-comparison use case when categories are already stable.

### Renderer

The renderer layer contains classification renderers, including:

```txt
classificationDragDropDomRenderer
classificationQcmDomRenderer
```

The playground already uses the drag/drop renderer for the Countable / Uncountable real example.

### Evaluator

The core evaluator layer contains classification evaluators, including:

```txt
evaluateClassificationDragDrop
evaluateClassificationQcm
```

The drag/drop renderer calls the existing evaluator when the learner checks the activity.

## What is still missing

The missing piece is not core capability.

It is the explicit author-facing bridge:

```txt
Compare
↓
Categories
↓
ClassificationSet
```

as a documented `RepresentationPath`.

Today, the playground makes the route understandable, but the current `RepresentationPath` vocabulary does not yet fully express classification routes.

The current experimental `RepresentationPath` type only lists these interaction data carriers:

```txt
IdentificationSelectionData
MemorizationTypingRecallData
```

It does not yet include:

```txt
ClassificationDragDropData
```

or the equivalent QCM classification data.

The current experimental `RepresentationPath` input vocabulary includes:

```txt
ContextualTypingUserInput
IdentificationSelectionUserInput
MemorizationTypingRecallUserInput
```

It does not yet include:

```txt
ClassificationDragDropUserInput
```

This means the bridge is not merely hidden in prose. It is also absent from the authoring `RepresentationPath` vocabulary.

## Is the missing element real or only implicit?

It is both:

```txt
implicit in the playground
real as a missing authoring artifact
```

The route is implicit because a human can already infer it:

```txt
Compare
↓
Categories
↓
ClassificationSet
↓
classification drag/drop renderer
↓
evaluateClassificationDragDrop
```

But it is still materially missing because the authoring layer does not yet contain a `RepresentationPath` entry that says this explicitly.

The playground currently points `Categories` toward `ClassificationSet`, but the `Suggested RepresentationPath` slot still falls back to `explore-before-rule` or no dedicated path depending on the context. That means the route is visible as a mapping, not yet as a complete authoring path.

## Can it become complete without a new concept?

Yes, probably.

The missing element does not require:

- a new core object;
- a new Set;
- a new renderer;
- a new evaluator;
- a new runtime pathway;
- a new architecture.

The smallest plausible materialization would be authoring-only:

```txt
Compare / Categories
↓
existing pedagogical framing
↓
RepresentationPath pointing to existing classification interaction data
↓
ClassificationSet
↓
existing classification renderer
↓
existing classification evaluator
```

However, that materialization does not exist yet in the repository at the time of this investigation.

## Strict verdict

Verdict:

```txt
still partial
```

Reason:

The real BHE engine route exists, and the playground already understands the route. But the strict chain requires an explicit `RepresentationPath`, and that bridge is not currently materialized.

The route cannot be marked:

```txt
exists completely
```

until the authoring layer can explicitly express something equivalent to:

```txt
Compare
↓
Categories
↓
Classification interaction
↓
ClassificationDragDropData or classification QCM data
↓
ClassificationDragDropUserInput or QcmUserInput
↓
evaluateClassification...
↓
BHEResult.success / partial / failed
```

using existing BHE structures.

## Main finding

The candidate is extremely close.

This is not a model gap. It is not an engine gap. It is not a renderer gap. It is not an evaluator gap.

The missing piece is:

```txt
an explicit authoring RepresentationPath
for stable category classification
```

The route is therefore the best candidate for BHE's first fully realized authoring route, but it is not complete yet under the strict definition.

## Recommendation

If the next step is implementation, look first at the authoring package only.

The likely minimal task would be to materialize the existing bridge rather than inventing anything new:

```txt
stable categories
↓
ClassificationSet
↓
classification renderer
↓
classification evaluator
```

The implementation question would be whether this should attach to an existing PedagogicalUse, such as controlled practice/classification, or whether the existing authoring vocabulary already has a better label.

That decision should be made carefully because naming the author-facing path is the only remaining fragile part.
