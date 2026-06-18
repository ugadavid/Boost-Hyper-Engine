# BHE-BE Weekly Synthesis

## 1. Context

This document closes a first week of BHE-BE observation inside the `experiment/bhe-be` branch.

The goal is not to open another exploration.

The goal is:

```txt
synthesize
stabilize
avoid drifting too far
```

The BHE-BE lab has produced a small set of documentary POCs from Boost'English bricks:

- `Thinking in English — I start`;
- `Countable / Uncountable — I learn`;
- `Thinking in English — I say`;
- `Question Forms` as a negative stress-test;
- `Memorising vocabulary`;
- `Way-finding`;
- `Passive voice`.

These POCs were useful precisely because they were uneven. Some clarified signals. Some resisted concepts. Some revealed teacher-facing richness. Some warned against over-description.

This synthesis compares those observations with the already stabilized BHE core:

- `PedagogicalObject`;
- `CognitiveOperation`;
- specialized `InteractionData`;
- semantic `UserInput`;
- evaluator outside renderer;
- `BHEResult`;
- feedback and adaptive routing based on `BHEResult`;
- existing cognitive sets and interaction-specific baselines.

The central question is:

```txt
What should BHE remember from this week,
without inventing a new architecture?
```

## 2. Robust Signals

| Signal | Evidence | Recurrence | Survived counterexamples? | Relation to existing BHE | Recommendation |
| ------ | -------- | ---------- | ------------------------- | ------------------------ | -------------- |
| Interaction shape != pedagogical function | `Thinking in English — I start` and `Memorising vocabulary` both use quiz-like forms for reflection rather than scoring. `Question Forms` shows the opposite: quiz/practice can also simply be assessment-oriented. | High | Yes. The negative case strengthens the distinction. | Partly covered by current separation between `InteractionMode`, renderer, evaluator, and `CognitiveOperation`. BHE already knows that renderer shape is not cognition. | Preserve as a strong design principle. No new model needed. |
| Renderer != cognition | Questionnaires, quizzes, drag/drop, typing, and speaking prompts can support different learner operations depending on context. | High | Yes. Multiple POCs repeat this distinction. | Already covered by `CognitiveOperation` and specialized `InteractionData`. | Keep using this as a reading discipline before implementation. |
| Cognitive operations are composable | `Thinking in English` mixes reflect, notice, compare, produce, self-adjust. `Countable / Uncountable` mixes notice, compare, infer, classify. `Passive voice` mixes identify, transform, produce, interpret. | High | Yes. Even conventional grammar bricks show several operations. | Already covered directly by optional `cognitiveOperations?: CognitiveOperation[]` on `PedagogicalObject`. | Consider this stabilized enough as vocabulary, not as orchestration architecture. |
| Some evaluations are not assessments | Reflective questionnaires in `Thinking in English` and `Memorising vocabulary` have no right answer. They support awareness and learner positioning. | Medium / high | Yes. `Question Forms` shows when corrective evaluation is genuinely present. | Partly covered by `BHEResult.status`, completion, and broader-than-score results, but not yet deeply modeled for reflective completion. | Preserve for future observation. Do not create a reflective evaluation model yet. |
| Pedagogical value may emerge from progression | `Countable / Uncountable` organizes observe -> compare -> infer -> conceptualize. `Memorising vocabulary` organizes reflect -> try strategy -> reflect again. | Medium / high | Partly. `Question Forms` shows that sequence order alone is not enough. | Existing BHE has object pipelines but not a formal orchestration model. This may be above current `PedagogicalObject`. | Preserve in memory; continue observing. Not ready for modeling. |
| Teacher-facing pedagogy matters | `Passive voice`, `Way-finding`, and `Thinking in English` have teacher sections that expand the learner-facing activity into richer classroom work. | High | Yes. It appears across different brick families. | Not strongly covered by current core. `PedagogicalObject` can carry content, but teacher orchestration is not a stabilized runtime concern. | Preserve as a strong corpus signal. Do not model now. |
| Some bricks are pedagogically hybrid | `Passive voice` is grammar, focus awareness, critical reading, functional explanation, and communicative play. | Medium | Yes, but strongest in `Passive voice`. | Partly covered by `cognitiveOperations`; not enough to describe teacher-side extensions. | Preserve as caution: avoid flattening bricks into one intent too early. |
| Action-oriented validation exists | `Way-finding` validates whether language enables someone to navigate, not only whether words are correct. | Medium | Not broadly tested yet, but clear in this case. | Partly covered by `BHEResult.details` and `AdaptiveRouting`; no new result type needed yet. | Worth future observation. Do not model now. |

## 3. Fragile Signals

| Signal | Evidence | Recurrence | Survived counterexamples? | Relation to existing BHE | Recommendation |
| ------ | -------- | ---------- | ------------------------- | ------------------------ | -------------- |
| `Moment` as a stable object | It helped describe `Thinking in English — I start`, `Countable / Uncountable — I learn`, and `Thinking in English — I say`. | Medium | Weakly. `Question Forms` showed that `Moment` can become over-description. | Not covered by current core, but also not clearly needed. Existing `PedagogicalObject` plus docs may be enough for many cases. | Keep as an analytical lens only. Do not implement. |
| PedagogicalTransition | Strong in self-awareness, guided rule discovery, and oral activation. Weaker in content-heavy practice. | Medium | Partly. It survives positive cases, but the negative case limits it. | Not directly covered. Some transitions can be described by learning goals and cognitive operations. | Preserve in memory only. Use descriptively when it clarifies before/after learner state. |
| GuidedProgression | Strong in `Countable / Uncountable`, visible in `Memorising vocabulary`. | Medium | Partly. `Question Forms` shows not every ordered chain is guided progression. | Existing `PedagogicalObject` and `InteractionData` do not model multi-step guidance explicitly. | Worth future observation, especially in real sequences. Not ready for core. |
| Learning strategy activation | Clear in `Memorising vocabulary`: strategy is the content. | Low / medium | Not yet pressure-tested across many bricks. | Existing `CognitiveOperation` can describe reflect, compare, selfAdjust, transfer. MemorizationSet exists, but strategy activation is not a set. | Keep as a useful label in docs. Do not model separately now. |
| Action reliability | Clear in `Way-finding`: directions succeed if someone reaches the target. | Low / medium | Not yet tested elsewhere. | BHE can already represent success/partial/failed and details in `BHEResult`. | Future observation only. Possible future evaluator detail, not a new layer. |
| Grammar as discourse awareness | `Passive voice` teacher extension links passive grammar to critical reading and agency/framing. | Low / medium | Not tested across enough bricks. | `CognitiveOperation` can cover identify, interpret, infer, reflect. Inference/Identification/Transformation sets may cover parts. | Preserve as a strong local signal, not a general architecture concept. |
| Teacher orchestration as a formal concern | Teacher sections repeatedly contain rich activity variants and classroom moves. | Medium | Yes as observation, but implementation relevance is unclear. | Current BHE does not deeply model teacher-only orchestration. | Preserve in corpus memory. Avoid runtime modeling until concrete authoring need appears. |

## 4. Discarded / Deferred Ideas

| Idea | Evidence | Why Deferred | Relation to existing BHE | Recommendation |
| ---- | -------- | ------------ | ------------------------ | -------------- |
| Implement `Moment` now | The first POCs made it tempting, but the responsibility dissection showed it mixes intention, transition, progression, teacher orchestration, and analytical labeling. | Too broad and too likely to become an architectural drawer. | Many parts are already covered by `PedagogicalObject`, `CognitiveOperation`, renderer/evaluator separation, and documentation. | Do not implement. Keep as a temporary word in lab notes only. |
| Create an orchestration runtime | Some sequences show progression and phase bridging. | Too early. We do not yet know which responsibility deserves modeling, if any. | Existing BHE runtime already has object pipelines and adaptive routing; a new layer would risk duplication. | Postpone. |
| Create a `PedagogicalTransition` type | Transition is useful descriptively. | The signal is real but not yet operationally necessary. | Learning goals, cognitive operations, and docs can express many transitions for now. | Preserve as analytical vocabulary, not code. |
| Treat every `For teachers` section as model data | Teacher sections are rich. | Their form is inconsistent and often contextual, practical, or resource-oriented. | Current core does not need teacher orchestration to render/evaluate objects. | Preserve manually in corpus notes. Revisit only if authoring requirements demand it. |
| Add new BHE sets for every observed responsibility | Strategy activation, action reliability, posture shift, and critical reading are tempting labels. | Too many concepts would drift away from the current core and duplicate existing sets/operations. | `CognitiveOperation` already absorbs many mental actions lightly. | Do not create new sets from this week alone. |
| Make Boost'English a hidden specification for BHE | Corpus observations are useful. | Boost'English is situated, uneven, and local. It should pressure-test BHE, not define it. | BHE must remain general and carefully minimal. | Explicitly discard. |

## 5. Main Lessons For BHE

### 1. The Core Already Covers More Than It First Appears

Many BHE-BE signals do not require new architecture.

The current core already has important separations:

```txt
PedagogicalObject
-> Adapter
-> InteractionData
-> Renderer
```

and:

```txt
UserInput
-> Evaluator
-> BHEResult
-> Feedback / AdaptiveRouting
```

It also has `CognitiveOperation`, which is exactly the right level for many BHE-BE observations:

```txt
notice
compare
reflect
produce
selfAdjust
transfer
```

This means BHE should resist creating new objects when a stable vocabulary is enough.

### 2. Interaction Shape Is Not Pedagogical Function

This is the strongest lesson of the week.

A quiz can be:

- assessment;
- reflection;
- positioning;
- comprehension check;
- strategy awareness.

A grammar exercise can be:

- form recognition;
- transformation;
- critical reading preparation;
- communicative explanation.

BHE should keep renderer shape, cognitive operation, evaluation policy, and pedagogical intention separate.

### 3. Teacher-Facing Pedagogy Is Real, But Not Yet A Runtime Problem

The corpus repeatedly shows that important pedagogical intelligence lives in teacher notes:

- pair work;
- guessing games;
- classroom discussion;
- critical reading;
- maps and printouts;
- speaking variations;
- resource constraints.

This matters.

But it does not yet mean BHE needs a teacher orchestration model. For now, teacher-facing pedagogy should be preserved in corpus memory and future authoring notes.

### 4. Some Bricks Are Hybrid

`Passive voice` is the clearest warning.

It can be flattened as:

```txt
passive voice grammar
```

but that loses:

- focus awareness;
- agency/framing;
- critical reading;
- technical explanation;
- communicative guessing.

This does not create a new architecture requirement.

It creates a reading discipline:

```txt
do not flatten too early
```

### 5. Transitions Matter, But Should Remain Descriptive

Several POCs show learner-state movement:

- implicit habits -> self-awareness;
- examples -> conceptual clarity;
- reflection -> oral activation;
- random memorization -> intentional strategy;
- language items -> situated action.

This is pedagogically useful.

But transition should remain a descriptive lens for now. It is not yet a model.

### 6. Not All Pedagogy Deserves A Core Object

This is the most important anti-drift lesson.

Some signals are real and still should not become code:

- posture shift;
- strategy awareness;
- communicative realism;
- teacher orchestration;
- guided progression;
- action reliability.

BHE can remember them without implementing them.

## 6. Temporary Conclusion

The week produced useful signals, but no new architecture should be created from them now.

What survived most strongly:

```txt
interaction shape != pedagogical function
renderer != cognition
quiz != assessment
sequence order != orchestration
grammar != only form
teacher-facing pedagogy matters
```

What should be preserved carefully:

```txt
PedagogicalTransition
learning strategy activation
action-oriented validation
teacher orchestration
hybrid grammar bricks
```

What should not be done:

```txt
do not implement Moment
do not create an orchestration runtime
do not create new sets from every responsibility
do not make Boost'English the BHE specification
```

The healthiest conclusion is:

```txt
BHE-BE should remain a memory and pressure-test lab.
The BHE core should remain stable.
Only signals that reconnect cleanly to existing pipelines should move forward.
```

For now, this week should be remembered as evidence that the existing BHE separations are valuable, not as evidence that a new layer is needed.
