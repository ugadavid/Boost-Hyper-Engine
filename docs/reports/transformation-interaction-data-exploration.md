# Transformation InteractionData Exploration

This report explores a minimal `TransformationInteractionData` shape before any code is added. The goal is to protect the cognitive operation:

```txt
source
-> deliberate transformation
-> target
```

The central question is what data shape preserves the transformation relation without over-designing the model too early.

## 1. Why Generic Typing Is Insufficient

A generic typing shape such as:

```ts
{
  prompt: string;
  expectedAnswer: string;
}
```

or:

```ts
typedAnswers[]
```

would be too poor for Transformation.

It would hide the source relation. The learner is not only answering a prompt; they are transforming a visible source into a target.

It would hide the transformation intention. `Write the answer` is not the same as `Change this verb to the past tense`, `Make this adjective feminine`, or `Reformulate in formal register`.

It would hide the transformation type. Without a transformation type or instruction, BHE cannot later explain what operation was expected.

It would weaken process feedback. The evaluator might say "incorrect", but not whether the learner preserved meaning, changed the right feature, or applied the wrong transformation.

It would make accepted variants harder to understand. Variants are not merely alternate answers; they are alternate valid targets for a given source and operation.

Generic typing captures the gesture, but not the pedagogy.

## 2. Minimal Data Candidates

### Option A — Very Simple

Possible shape:

```ts
{
  itemId: string;
  source: string;
  instruction: string;
  expected: string | string[];
}
```

Advantages:

- easy to understand;
- preserves the source;
- preserves a human-readable instruction;
- supports one or several expected outputs;
- enough for a deterministic V0 evaluator.

Limits:

- no explicit transformation type;
- hints and feedback are not preserved;
- accepted variants are mixed into `expected`;
- harder to analyze or route by transformation category later.

This option is usable, but it may be slightly too thin for BHE because the transformation operation remains only textual.

### Option B — Transformation-Aware

Possible shape:

```ts
{
  itemId: string;
  source: string;
  transformationType?: string;
  instruction?: string;
  expected: string | string[];
  accepted?: string[];
  hint?: string;
  feedback?: string;
}
```

Advantages:

- preserves the explicit source;
- makes the operation visible through `transformationType`;
- keeps the instruction as learner-facing guidance;
- keeps expected target data deterministic;
- allows accepted variants without losing the main expected target;
- carries hint and feedback forward from the pedagogical object;
- gives a future evaluator enough context to produce better details.

Limits:

- still checks final output more than transformation process;
- `transformationType` may start as a loose string;
- `expected` and `accepted` need a clear convention to avoid duplication;
- no step-by-step process tracking.

This option is the best V0 candidate because it is still small, but it protects the source -> operation -> target relation.

### Option C — Over-Designed

A more ambitious shape could include:

- transformation graph;
- intermediate steps;
- reasoning chain;
- morphology metadata;
- syntax tree references;
- rule ids;
- process tracking;
- per-feature scoring;
- generated feedback templates.

Advantages:

- richer future feedback;
- more precise analysis;
- possible process-based evaluation;
- stronger support for grammar and intercomprehension research.

Limits:

- far too early;
- hard to design without real examples;
- risks creating a general transformation engine before one is earned;
- would slow the current BHE methodology;
- may collapse many different transformation families into a premature abstraction.

This option should be explicitly deferred.

## 3. Relationship With UserInput

A future `TransformationUserInput` should express a transformation attempt, not just a typed answer.

The minimal input could look conceptually like:

```ts
{
  kind: "transformation-typing";
  attempts: {
    itemId: string;
    value: string;
  }[];
}
```

The important part is the `itemId`. It links the learner's answer back to a source and expected transformation.

`typedAnswer` alone is not sufficient if there are multiple items or if feedback needs to refer to the source. A value becomes pedagogically meaningful only when attached to the transformation item it answers.

So the future input should represent:

```txt
transformationAttempt keyed by itemId
```

not anonymous typing.

## 4. Relationship With Evaluator

A V0 evaluator should probably verify:

- deterministic matching;
- accepted answers;
- normalization policy if present;
- item-by-item correctness;
- simple score / maxScore / completion;
- `success` / `partial` / `failed`;
- details linking source, selected value, expected target, accepted variants, and correctness.

It should not attempt NLP.

It should not score reasoning.

It should not infer whether the transformation process was cognitively correct beyond the output match.

However, preserving source and transformation type in InteractionData means future feedback can later say more than "correct" or "incorrect".

## 5. Architectural Signals

Several signals are clear:

- Transformation wants explicit source.
- Transformation wants operation visibility.
- Semantic input matters.
- Transformation is not GapFill without context.
- Typing is only the surface gesture.
- The first evaluator can be deterministic without pretending to evaluate the full process.

The data shape should therefore keep the transformation relation visible even if V0 evaluation remains simple.

## 6. Recommendation

Recommendation: **B — transformation-aware data**.

The healthiest future POC should use a small transformation-aware shape:

```ts
{
  itemId: string;
  source: string;
  transformationType?: string;
  instruction?: string;
  expected: string | string[];
  accepted?: string[];
  hint?: string;
  feedback?: string;
}
```

For a first POC, this can become:

```txt
TransformationSet
-> TransformationInteractionData
-> TransformationUserInput
-> deterministic evaluator
```

No renderer is needed yet. No generic typing abstraction should be introduced. The next controlled step should be to create this InteractionData and adapter console-only, then observe whether it preserves the cognitive operation cleanly.
