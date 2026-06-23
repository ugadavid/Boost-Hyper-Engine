# Produce Clarification Path Report

Date: 2026-06-23

Status: Experimental authoring path

Scope: `packages/authoring`

## Context

The investigation:

```txt
docs/architecture/20260623_produce-investigation.md
```

concluded:

```txt
Produce is not a BHE path.
Produce is an author signal
that the playground must disambiguate.
```

The validated clarification question was:

```txt
What kind of production is expected?
```

This report documents the playground change that turns that investigation into an author-facing clarification path.

## What was added

When the author selects:

```txt
Help learners produce
```

the playground no longer shows Pedagogical Uses directly.

It first asks:

```txt
What kind of production is expected?
```

This mirrors the existing clarification behavior for:

```txt
Compare
↓
What are learners comparing?
```

and:

```txt
Reflect
↓
What are learners reflecting on?
```

## Produce clarification options

### Recalled Target

Examples:

```txt
remember a word
remember an expression
remember a definition
```

Route:

```txt
Recall Through Typing
↓
MemorizationTypingRecall
```

Status:

```txt
Strong / real path
```

### Context-Fitting Answer

Examples:

```txt
fill a blank
complete a sentence
complete a dialogue
```

Route:

```txt
GapFillSet
↓
ContextualTyping
```

Status:

```txt
real engine path
authoring bridge still incomplete
```

### Transformed Form

Examples:

```txt
active -> passive
singular -> plural
formal -> informal
```

Route:

```txt
TransformationSet
↓
TransformationTyping
```

Status:

```txt
Strong / real path
```

### Hypothesis / Interpretation

Examples:

```txt
what do you think this means?
what rule explains this?
```

Route:

```txt
InferenceSet
```

or:

```txt
Explore Before The Rule
```

Status:

```txt
Conceptually covered; partially implemented
```

### Reflection / Explanation

Examples:

```txt
explain your strategy
justify your choice
describe your experience
```

Route:

```txt
Reflect Through Typing
↓
BHEResult.completed
```

Status:

```txt
Viable non-evaluative path
```

### Situated Response

Examples:

```txt
give directions
answer a customer
write an email
solve a task in context
```

Route:

```txt
Apply Through Situated Task
```

Status:

```txt
Plausible context-dependent path
```

### Communicative Clue

Examples:

```txt
describe an object
leave clues
help another learner infer
```

Route:

```txt
Apply Through Situated Task
```

with social or interpretive validation.

Status:

```txt
Conceptually visible; validation still open
```

## Real corpus validation

### Passive Voice

Clarification:

```txt
Transformed Form
```

Suggested route:

```txt
TransformationSet
↓
TransformationTyping
```

Argument:

The dominant productive task is transforming active forms into passive forms. The author intent Produce becomes routeable once the author specifies that the production is source-to-target transformation.

### Memorising Vocabulary

Clarification:

```txt
Recalled Target
```

Suggested route:

```txt
Recall Through Typing
↓
MemorizationTypingRecall
```

Argument:

The learner is not producing freely. They retrieve a word or expression from a cue. This is active recall, and BHE already has a real path for it.

### Thinking in English

Clarification:

```txt
Reflection / Explanation
```

Suggested route:

```txt
Reflect Through Typing
↓
BHEResult.completed
```

Argument:

When the learner explains a strategy, habit, or experience, the production is reflective and non-corrective. The important result is meaningful completion, not right/wrong scoring.

## Does the clarification help?

Yes.

Without clarification:

```txt
Produce
```

could mean too many different things:

* recall a memorized target;
* complete a blank;
* transform a source;
* propose a hypothesis;
* justify a choice;
* explain a strategy;
* respond in a situation;
* create clues for someone else.

The clarification makes the next route visible without creating a generic `ProduceSet`.

## Do some families route toward very different paths?

Yes.

The differences are large:

```txt
Recalled Target
↓
MemorizationTypingRecall
↓
deterministic recall evaluation
```

```txt
Transformed Form
↓
TransformationSet
↓
source -> operation -> target
```

```txt
Reflection / Explanation
↓
Reflect Through Typing
↓
BHEResult.completed
```

```txt
Situated Response
↓
Apply Through Situated Task
↓
context-dependent success
```

This confirms that Produce is not merely a typing interaction.

## Is Produce as non-self-routing as Compare and Reflect?

Yes, and perhaps even more visibly.

Compare and Reflect are broad pedagogical intentions.

Produce is broad in a slightly different way: it often names the visible output mode rather than the pedagogical operation.

The same surface gesture can hide several distinct BHE routes:

```txt
typing recall
typing gap-fill
typing transformation
typing reflection
typing explanation
typing situated response
```

So Produce is not self-routing.

## Do the real examples confirm the clarification?

Yes.

The three validation examples land in three different routes:

| Brick | Clarification | Route |
| --- | --- | --- |
| Passive Voice | Transformed Form | `TransformationSet` |
| Memorising Vocabulary | Recalled Target | `MemorizationTypingRecall` |
| Thinking in English | Reflection / Explanation | `Reflect Through Typing -> completed` |

This is exactly the behavior expected from a useful clarification question.

## Limits

The change is authoring-only.

It does not create:

* `ProduceSet`;
* a new core object;
* a new renderer;
* a new evaluator;
* a new runtime pathway.

Some routes are more mature than others.

`Recalled Target` and `Transformed Form` have strong real paths.

`Context-Fitting Answer` has a real engine path, but the authoring bridge remains incomplete.

`Hypothesis / Interpretation`, `Situated Response`, and `Communicative Clue` are visible and plausible but still need clearer authoring documentation or validation before they become as straightforward as Recall or Transformation.

## How to access the path

Open:

```txt
packages/authoring/author-discovery-playground.html
```

Then select:

```txt
Help learners produce
```

The middle column now displays:

```txt
What kind of production is expected?
```

Choosing an option updates the right-hand clarification path with:

```txt
Produce
↓
What kind of production is expected?
↓
chosen category
↓
suggested Pedagogical Use
↓
suggested RepresentationPath
↓
BHE mapping
```

## Files changed

```txt
packages/authoring/src/AuthorDiscoveryPlayground.ts
packages/authoring/src/index.ts
packages/authoring/author-discovery-playground.html
docs/architecture/20260623_produce-clarification-path-report.md
```

## Conclusion

The Produce clarification path validates the same authoring pattern seen with Compare and Reflect:

```txt
Author Intent
↓
Clarification Question
↓
Pedagogical Use
↓
RepresentationPath / BHE Mapping
```

The main discovery is:

```txt
Produce is not a destination.
It is a request for disambiguation.
```

The playground now makes that visible.
