# Reflect Clarification Path Report

Date: 2026-06-23

Status: authoring playground extension report

Scope: `packages/authoring` only, plus this documentation report.

## Context

The investigation:

```txt
docs/architecture/20260623_reflect-investigation.md
```

concluded:

```txt
Reflect is an author intention
requiring clarification.
```

It also suggested the clarification question:

```txt
What are learners reflecting on?
```

This mission tested that hypothesis in the Author Discovery Playground, using the same pattern previously used for Compare.

## What was added

The playground now treats:

```txt
Help learners reflect
```

as a clarification path.

Instead of immediately showing:

```txt
Reflect Through Selection
Reflect Through Typing
```

it first asks:

```txt
What are learners reflecting on?
```

The added clarification families are:

- Habits;
- Strategies;
- Confidence / Feelings;
- Understanding;
- Choices;
- Hypotheses;
- Experience;
- Progress;
- Action Reliability.

Each family displays:

- examples;
- suggested Pedagogical Uses;
- suggested RepresentationPath or AuthorOrchestrationPath when available;
- BHE mapping;
- visible limits.

## Clarification route

The visual route mirrors Compare:

```txt
Reflect
↓
What are learners reflecting on?
↓
chosen category
↓
suggested Pedagogical Use
↓
suggested RepresentationPath
↓
BHE mapping
```

This keeps Reflect as an authoring discovery aid rather than a new core model.

## Families added

### Habits

Examples:

```txt
translation habits
speaking habits
study habits
```

Suggested routes:

```txt
Reflect Through Selection
Diagnose Through Selection
```

Reading:

This fits self-observation or starting-point evidence. It may be reflective when the learner is noticing themselves, and diagnostic when the response informs support or routing.

### Strategies

Examples:

```txt
vocabulary strategies
speaking strategies
learning methods
```

Suggested routes:

```txt
Reflect Through Selection
Reflect Through Typing
```

Reading:

This fits Memorising Vocabulary and Thinking in English. Selection works for offered strategies; typing works when learners explain why a strategy fits.

### Confidence / Feelings

Examples:

```txt
speaking anxiety
confidence
comfort level
```

Suggested route:

```txt
Reflect Through Selection
↓
BHEResult.completed
```

Reading:

This should not become assessment. The learner is surfacing affect or readiness, not answering correctly.

### Understanding

Examples:

```txt
what do I understand now?
what distinction is becoming clear?
```

Suggested routes:

```txt
Explore Before The Rule
InferenceSet
ClassificationSet
```

Reading:

This is a useful edge case. Reflect may not be the best route. When learners reflect on understanding, the path may actually be exploration, inference, or classification.

### Choices

Example:

```txt
why did I choose this?
```

Suggested routes:

```txt
Reflect Through Typing
InferenceSet
```

Reading:

If the learner explains a personal choice, Reflect Through Typing fits. If the learner justifies an evidence-based interpretation, InferenceSet may fit better.

### Hypotheses

Example:

```txt
what rule do I think explains this?
```

Suggested routes:

```txt
InferenceSet
Explore Before The Rule
```

Reading:

This explicitly shows that reflection can slide into inference. The author may need an exploration path rather than a pure Reflect path.

### Experience

Example:

```txt
what happened when I tried this?
```

Suggested routes:

```txt
Reflect Through Typing
Apply Through Situated Task
```

Reading:

Typing can capture the review. But if the experience has a functional success condition, Apply Through Situated Task may be the better carrier.

### Progress

Example:

```txt
what changed for me?
```

Suggested routes:

```txt
Reflect Through Selection
Reflect Through Typing
```

Reading:

BHE can record the reflection now, but longitudinal progress tracking is not modeled by the playground.

### Action Reliability

Example:

```txt
did my language work for another learner?
```

Suggested route:

```txt
Apply Through Situated Task
```

with a reflective review component.

Reading:

This is not a pure Reflect route. The central question may be whether language worked in a situation.

## Corpus validation examples

### Thinking in English

Clarification choices:

```txt
Habits
Strategies
Confidence / Feelings
```

Suggested routes:

```txt
Reflect Through Selection
Reflect Through Typing
```

Mapping:

```txt
Reflective selection or typing
↓
non-evaluative completion
↓
BHEResult.completed
```

Argument:

The learner reflects on translation habits, speaking strategies, and confidence before oral activation. The clarification prevents Reflect from being treated as one generic selection path.

### Memorising Vocabulary

Clarification choice:

```txt
Strategies
```

Suggested routes:

```txt
Reflect Through Selection
Reflect Through Typing
```

Mapping:

```txt
Reflective strategy awareness
↓
completed rather than scored
```

Argument:

The learner reflects on vocabulary-learning methods, tries a strategy, and decides what may fit them. Strategies is the clearest route.

### Wayfinding

Clarification choices:

```txt
Action Reliability
Experience
```

Suggested routes:

```txt
Apply Through Situated Task
Reflect Through Typing
```

Mapping:

```txt
Apply Through Situated Task
with reflective review
```

Argument:

The strongest reflective question is not self-positioning. It is whether the learner's language worked for another learner in a map-based task.

## Files modified

```txt
packages/authoring/src/AuthorDiscoveryPlayground.ts
packages/authoring/src/index.ts
```

## File created

```txt
docs/architecture/20260623_reflect-clarification-path-report.md
```

## What was not changed

No changes were made to:

```txt
packages/core
runtime
renderers
evaluators
```

No new `ReflectSet` was created.

No new stabilized `ReflectThrough...` concept was created.

No new renderer or evaluator was created.

The new labels are authoring guidance only.

## Verification

### Build

Command:

```txt
npm.cmd run build
```

Result:

```txt
success
```

### Authoring import

The compiled authoring module exports:

```txt
reflectClarificationOptions
reflectValidationExamples
```

Observed Reflect options:

```txt
Habits
Strategies
Confidence / Feelings
Understanding
Choices
Hypotheses
Experience
Progress
Action Reliability
```

Observed corpus validation examples:

```txt
Thinking in English
Memorising Vocabulary
Wayfinding
```

## How to access the new Reflect path

Open:

```txt
packages/authoring/author-discovery-playground.html
```

Then choose:

```txt
I want to...
↓
Help learners reflect
```

The second panel now shows:

```txt
What are learners reflecting on?
```

Choose one family, for example:

```txt
Strategies
```

The detail panel shows:

```txt
Reflect
↓
What are learners reflecting on?
↓
Strategies
↓
Reflect Through Selection / Reflect Through Typing
↓
Reflective selection or typing -> BHEResult.completed
```

## Answers to the mission questions

### 1. Does the clarification actually help the author?

Yes.

Without clarification, Reflect immediately collapses into:

```txt
Reflect Through Selection
Reflect Through Typing
```

That is useful but too shallow. The clarification shows that the author first needs to decide whether reflection is about habits, strategies, confidence, understanding, choices, hypotheses, experience, progress, or action reliability.

### 2. Do some families lead somewhere other than Reflect?

Yes.

This is one of the main findings.

Several Reflect families route toward other structures:

- Understanding -> Explore Before The Rule, InferenceSet, ClassificationSet;
- Hypotheses -> InferenceSet or Explore Before The Rule;
- Action Reliability -> Apply Through Situated Task;
- Choices -> Reflect Through Typing or InferenceSet;
- Experience -> Reflect Through Typing or Apply Through Situated Task.

So Reflect is not only a pair of reflective RepresentationPaths.

### 3. Is Reflect as non-self-routing as Compare?

Yes, but differently.

Compare asks:

```txt
What are learners comparing?
```

Reflect asks:

```txt
What are learners reflecting on?
```

Compare usually routes by object of comparison: categories, relations, forms, order, hypotheses, strategies.

Reflect routes by object of reflection and pedagogical contract: habits, strategies, confidence, understanding, experience, progress, reliability.

Both are author intentions that become useful only after clarification.

### 4. Do real examples confirm the clarification?

Yes.

The three validation examples behave differently:

- Thinking in English spans Habits, Strategies, and Confidence;
- Memorising Vocabulary routes strongly to Strategies;
- Wayfinding routes to Action Reliability and Experience rather than pure reflection.

This confirms that Reflect is not one destination.

## Main discovery

Reflect behaves like Compare:

```txt
meaningful as author intention
not self-routing
```

But Reflect has a distinctive twist:

```txt
some reflective intentions are actually better routed
through Apply, Explore, or Inference.
```

That makes the clarification valuable. It prevents the authoring layer from overusing `Reflect Through Selection` and `Reflect Through Typing` for every reflective-looking activity.

## Conclusion

The hypothesis is validated enough for V0.4:

```txt
Reflect benefits from clarification
the same way Compare does.
```

The candidate question:

```txt
What are learners reflecting on?
```

is useful and should remain in the playground as an authoring discovery aid.

This does not stabilize a new core concept. It only makes the authoring space more legible.
