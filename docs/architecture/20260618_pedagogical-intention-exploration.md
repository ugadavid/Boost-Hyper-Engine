# Pedagogical Intention Exploration

## 1. Context

This document belongs to the `experiment/bhe-be` branch.

It follows the BHE-BE stress tests and audits produced on 17 June, especially:

- the non-evaluative interaction stress test;
- the selection `UserInput` audit;
- the non-evaluative representation POC;
- the core vocabulary audit;
- the `FeedbackData` audit.

Those documents reached a useful stabilization point:

```txt
BHE can represent more
than we initially thought.
```

The current pipeline can already carry a reflective selection with no correct answer, no score, and a `BHEResult` whose status is `completed`. The main frictions found so far concern specialized vocabulary and the corrective assumptions of some existing mappings, not a fundamental inability of the core.

This exploration therefore asks a different question:

```txt
What does BHE encourage authors to think about?

What does BHE make visible?
```

The distinction matters. A system may be structurally capable of representing a pedagogical intention without making that intention easy to name, author, inspect, or preserve.

No new concept or implementation is proposed here.

## 2. What The Current Architecture Naturally Exposes

### Explicitly visible in the core

`PedagogicalObject` already exposes several dimensions that are pedagogically meaningful:

| Current field or concept | What it makes visible |
| ------------------------ | --------------------- |
| `pedagogicalType` | The main cognitive object family: association, classification, sequence, transformation, gap-fill, identification, inference, or memorization. |
| `pedagogicalFamily` | A broad structural, productive, interpretive, or retentive orientation. |
| `learningGoal` | A domain, skill, topic, and optional CEFR level. |
| `cognitiveOperations` | What the learner may do mentally: notice, compare, reflect, produce, transfer, and so on. |
| `interactionModes` | Available interaction shapes such as QCM, typing, drag/drop, selection, reorder, or flashcards. |
| `PedagogicalContent` | Core content plus supporting hints, explanations, examples, feedback, and resources. |
| `BHEResult` | The outcome of a meaningful process, including completion without score. |

This means the current architecture does not expose interaction shape alone.

It already asks authors to consider:

```txt
what kind of pedagogical object is this?
what should the learner learn?
what mental operations may be involved?
how may the learner interact?
what meaningful result may be produced?
```

`CognitiveOperation` is especially important. It gives BHE a lightweight cognition-first vocabulary without requiring a new object for every pedagogical purpose.

### Naturally visible in implemented paths

The implemented examples and pipelines make some intentions especially easy to see because they align closely with existing Sets and evaluators:

- associate or group;
- classify;
- identify expected targets;
- order a sequence;
- transform a source;
- complete missing content;
- infer an expected interpretation;
- recall a memorized target;
- practise and receive corrective feedback.

These intentions have concrete, specialized paths:

```txt
PedagogicalObject
-> InteractionData
-> UserInput
-> Evaluator
-> BHEResult
```

They are therefore visible not only in vocabulary, but also in examples, adapters, inputs, details, scoring, and renderers.

### Present but less directly exposed

Other pedagogical intentions can be described with the current core, but they are less obvious to an author:

- reflection;
- diagnosis without grading;
- survey;
- self-positioning;
- strategy awareness;
- confidence preparation;
- communicative activation;
- guided discovery;
- action-oriented validation;
- transition toward a later activity.

For example, strategy awareness can be reconstructed through:

```txt
learningGoal:
  vocabulary learning awareness

cognitiveOperations:
  reflect
  notice
  compare
  selfAdjust

interactionModes:
  selection

BHEResult:
  status completed
  no score
```

The representation is possible. However, `strategy awareness` is not exposed as one explicit author-facing dimension. Its meaning is distributed across several fields and depends on careful interpretation.

### A practical asymmetry

There is therefore an asymmetry between capability and visibility:

```txt
structural capability: relatively broad
author-facing pedagogical legibility: uneven
```

The core has places where intention can live, but the most concrete paths still foreground Sets, interaction modes, renderers, and evaluators. An author encountering the system through examples may first think:

```txt
Which activity shape should I use?
```

rather than:

```txt
What change, awareness, practice, or positioning
am I trying to create for the learner?
```

## 3. Interaction Shapes And Pedagogical Intentions

An interaction shape does not determine its pedagogical function.

The same visible interaction may serve several intentions:

| Interaction shape | Possible pedagogical intentions |
| ----------------- | -------------------------------- |
| QCM / choice | Evaluation, diagnosis, reflection, survey, self-positioning, strategy awareness, guided noticing |
| Selection / checkboxes | Identification, preference expression, self-observation, evidence selection, learner positioning |
| Drag & drop | Association, classification, ordering support, practice, exploratory comparison |
| Typing | Gap completion, transformation, recall, production, reflection, justification |
| Flashcards | Exposure, recognition, recall preparation, memorization, self-check |
| Reorder | Sequence reconstruction, process understanding, narrative organization, syntax awareness |
| Speaking prompt | Production, rehearsal, confidence building, transfer, situated communication |
| Guided examples and questions | Discovery, noticing, comparison, inference, conceptual stabilization |

This table is deliberately exploratory. It does not define a taxonomy and does not imply that every combination is pedagogically sound.

Its purpose is to preserve a strong BHE-BE finding:

```txt
interaction shape
!=
pedagogical intention
```

The current BHE architecture partly protects this distinction:

- `interactionModes` is separate from `cognitiveOperations`;
- renderers are separate from evaluators;
- `BHEResult` is broader than score;
- specialized Sets protect different cognitive operations even when gestures look similar.

But the distinction is clearer in the architecture than in the current authoring vocabulary and examples.

## 4. Evidence From BHE-BE

### Thinking In English

`Thinking in English - I start` looks like a questionnaire or quiz.

Its important pedagogical gestures are closer to:

- reflection;
- self-observation;
- learner positioning;
- anxiety reduction;
- preparation for speaking.

The quiz-like renderer does not reveal those functions by itself. `CognitiveOperation` can express `reflect`, `notice`, and `compare`, while `learningGoal` can describe speaking awareness. Yet the intended posture shift remains mostly implicit in how those fields are combined.

The important invisible element is not another interaction. It is why the interaction occurs before later practice.

### Memorising Vocabulary

The vocabulary strategy questionnaire also resembles a knowledge check, but it does not primarily test vocabulary knowledge.

It asks the learner to notice how they learn:

```txt
implicit habit
-> strategy awareness
```

The existing core can represent this with `reflect`, `notice`, `compare`, and `selfAdjust`, a selection interaction, and a non-scored completed result.

What remains weakly exposed is the authorial intention:

```txt
make the learner aware of their current strategy
before comparing or changing it
```

This POC is the clearest evidence that representability and author guidance are different questions.

### Wayfinding

Wayfinding makes another intention visible:

```txt
language for successful situated action
```

The pedagogical aim is not exhausted by vocabulary correctness or grammar correctness. The learner must use language so that another person can navigate successfully.

Current BHE concepts can carry:

- learning goals;
- production and transfer operations;
- specialized inputs;
- result details and signals;
- adaptive routing.

But an author may still need to infer that the meaningful success condition is practical action reliability, not merely a correct linguistic answer.

### Countable / Uncountable

The guided rule-discovery POC showed a progression such as:

```txt
observe
-> compare
-> reason
-> infer
-> conceptualize
```

The individual cognitive operations are mostly expressible. The pedagogical intention of withholding the rule and scaffolding discovery is less directly visible.

The core can describe the pieces more easily than the reason for their coordination.

### Question Forms

The negative POC remains an important counterexample.

Some content is primarily:

```txt
rule
-> exercise
-> more rules
```

In such a case, adding richer intention language may not clarify much. Practice and reinforcement may already be adequately represented by the existing object, interaction, evaluator, and result.

This prevents the exploration from assuming that every activity hides an elaborate intention requiring explicit modeling.

### Passive Voice

The passive-voice POC resisted reduction to one intention. It combined grammatical practice, discourse awareness, functional explanation, and communicative play.

This is a warning against replacing interaction-centered simplification with intention-centered simplification.

An activity may have several important pedagogical intentions, just as it may involve several cognitive operations.

## 5. What The Current Vocabulary Makes Less Visible

Across the POCs, several pedagogical gestures mattered but were not immediately legible from interaction shape:

| Gesture observed | Why it matters | Current BHE coverage |
| ---------------- | -------------- | -------------------- |
| Reflective positioning | Helps the learner notice their current habits or posture. | Partly expressible through `learningGoal`, `reflect`, `notice`, and result details. Not directly named as a purpose. |
| Strategy awareness | Makes learning methods themselves the focus. | Expressible through goals and cognitive operations. Weakly visible in existing Set paths. |
| Guided discovery | Coordinates observation and inference before explicit conceptualization. | Operations are expressible; their pedagogical coordination remains implicit. |
| Confidence preparation | Prepares participation without necessarily teaching or scoring content. | Can be described in a free-form goal, but has no obvious concrete path. |
| Situated activation | Moves knowledge toward credible use in action. | `produce` and `transfer` help; practical success conditions depend on result details. |
| Diagnostic use without judgment | Collects information to adapt what follows. | `BHEResult` and routing can support it; QCM/evaluator examples still suggest correctness. |
| Reflective continuation | Responds to a learner choice with information or a next step rather than correction. | `FeedbackMessage` can carry it; current feedback status/mapping remains corrective. |

These are not necessarily missing core concepts.

They are meanings that the current architecture can often encode, but does not consistently foreground.

## 6. Is There An Architectural Blind Spot?

### What is not a blind spot

BHE does not appear blind to cognition.

It already has:

- specialized pedagogical Sets;
- composable `CognitiveOperation` values;
- semantic `UserInput` types;
- specialized `InteractionData`;
- evaluators outside renderers;
- `BHEResult` with non-scored completion and arbitrary details;
- feedback messages that can be informational;
- adaptive routing based on results.

The recent audits showed that a reflective, non-evaluative selection can be represented without a new pipeline.

So the evidence does not support:

```txt
BHE cannot represent pedagogical intention.
```

### The possible blind spot

The weaker area is the explicit authoring and inspection of intention.

`learningGoal` describes what should be learned, and `cognitiveOperations` describes what the learner does mentally. Neither necessarily says why a particular interaction is used at this point.

For example:

```txt
learning goal:
  vocabulary learning awareness

cognitive operations:
  reflect, notice, compare

interaction:
  selection
```

This is enough to reconstruct the intention, but the intention remains inferred:

```txt
surface current habits
so that the learner can compare and adjust strategies later
```

The possible blind spot is therefore not an absent runtime layer. It is a weakly exposed relationship between:

```txt
learning goal
cognitive operations
interaction choice
evaluation policy
expected learner change
```

This relationship currently lives largely in author judgment, free text, examples, and documentation.

### Why this should remain an observation

The evidence does not yet show that this relationship needs a new object or field.

Several cautions remain:

- `learningGoal` may already be sufficient when used carefully;
- `cognitiveOperations` is present in the core but barely exercised in compiled examples;
- richer documentation may reveal enough without changing the model;
- some activities have several intentions;
- some activities do not benefit from elaborate intention descriptions;
- teacher orchestration and sequence transitions may sit outside an individual object;
- a new intention abstraction could become another architectural drawer.

Therefore:

```txt
possible authoring blind spot
!=
proven core model gap
```

## 7. Recommendation

Between the two proposed conclusions, the evidence is closer to:

```txt
BHE already has much of the necessary vocabulary,
but does not expose pedagogical intention clearly or consistently enough.
```

This needs one qualification.

BHE has concepts that describe important components of intention:

- `learningGoal`;
- `cognitiveOperations`;
- `pedagogicalType` and family;
- interaction modes;
- evaluation/result semantics;
- content support.

But it does not yet make their pedagogical relationship easy to read from the authoring surface. Existing implementations and examples naturally foreground activity types and interaction paths because those are the parts already exercised end to end.

The current evidence does **not** justify the stronger statement:

```txt
BHE lacks pedagogical concepts.
```

Nor does it justify a new `PedagogicalIntention` object, a `Moment`, or an orchestration layer.

The most prudent conclusion is:

```txt
representation capability is ahead of author-facing legibility.
```

The main intuition to preserve is:

```txt
BHE should help authors see why an interaction exists,
not only which interaction can be rendered.
```

For now, this remains a documentary signal. The next useful evidence would come from attempting to author several real activities with the current fields and observing whether intention remains readable without additional concepts.

## 8. Inspected Material

This exploration was grounded in:

### BHE-BE documents

- `20260604_bhe-be-lab.md`;
- `20260604_thinking-in-english_i-start_moment-poc.md`;
- `20260604_countable-uncountable_i-learn_moment-poc.md`;
- `20260604_thinking-in-english_i-say_moment-boundary-poc.md`;
- `20260604_question-forms_negative-moment-poc.md`;
- `20260606_memorising-vocabulary_poc.md`;
- `20260606_wayfinding_poc.md`;
- `20260606_passive-voice_poc.md`;
- `20260606_bhe-be-weekly-synthesis.md`;
- `20260617_non-evaluative-interaction-stress-test.md`;
- `20260617_selection-userinput-audit.md`;
- `20260617_non-evaluative-interaction-representation-poc.md`;
- `20260617_core-vocabulary-audit.md`;
- `20260617_feedbackdata-audit.md`.

### Core types and usages

- `PedagogicalObject`;
- `CognitiveOperation`;
- `PedagogicalType`;
- `PedagogicalFamily`;
- `InteractionMode`;
- `PedagogicalContent`;
- `BHEResult`;
- `FeedbackData`;
- representative examples using `learningGoal`, Sets, interaction modes, evaluators, and feedback.

No code or runtime behavior was changed.
