# Investigate Real Paths To `BHEResult.completed`

Date: 2026-06-23

Status: documentary and technical investigation

Scope: no code change, no implementation, no new renderer, no new evaluator, no new core concept.

## Context

Recent authoring validation showed that some authoring paths now connect clearly to the real BHE engine:

```txt
Countable / Uncountable
↓
Real BHE Path
```

```txt
Passive Voice
↓
Real BHE Path
```

But the reflective path used for Thinking in English remains only partially connected:

```txt
Thinking in English
↓
Partial BHE Path
```

The identified rupture is not selection itself. It is:

```txt
meaningful completion
without correctness
```

In other words, BHE already knows how to produce evaluative results such as:

```txt
success
partial
failed
```

The open question is whether a real implemented path already exists toward:

```txt
BHEResult.completed
```

without corrective evaluation.

## Où `completed` apparaît déjà

### Core type: `BHEResult`

Location:

```txt
packages/core/types/BHEResult.ts
```

`BHEResultStatus` already includes:

```txt
success
partial
failed
skipped
completed
```

This is the strongest signal: `completed` is not an authoring invention and does not require a new core status.

The same type also makes `score`, `maxScore`, `completion`, `signals`, and `details` optional. This means the result model is broad enough to carry meaningful completion without requiring a score.

Observed convention:

```txt
BHEResult.completed
```

can mean:

```txt
the learner meaningfully performed the interaction,
but the interaction is not judged as correct or incorrect.
```

### Feedback boundary

Locations:

```txt
packages/core/types/feedback/FeedbackData.ts
packages/core/feedback/mapBHEResultToFeedback.ts
packages/renderer/feedback/feedbackMounting.ts
```

`FeedbackData.status` currently accepts only:

```txt
success
partial
failed
```

`FeedbackMessage.severity` is broader and includes:

```txt
info
```

So the message layer can express informational feedback, but the top-level feedback status cannot express `completed`.

The mapper is the important rupture:

```txt
BHEResult.completed
↓
mapBHEResultToFeedback
↓
FeedbackData.failed
```

Because `mapBHEResultToFeedback` only treats `success` and `partial` positively or partially, every other status falls back to `failed`.

This means `completed` is supported by the result type but not correctly supported by the default feedback tail.

### Evaluation and return-loop documents

Relevant documents:

```txt
docs/architecture/evaluation-pipeline.md
docs/architecture/return-loop-orchestration-note.md
docs/reports/return-loop-architecture-synthesis.md
```

These documents describe the current validated loop mostly as:

```txt
UserInput
↓
Evaluator
↓
BHEResult
↓
FeedbackData
↓
DOM
```

This loop does not forbid `completed`, but the real validated examples are evaluator-driven. The currently documented return loop therefore assumes an evaluator in practice.

This matters because a non-evaluative activity does not need an evaluator that checks correctness. It needs a way to record meaningful completion.

### Non-evaluative interaction documents

Relevant documents:

```txt
docs/architecture/20260617_non-evaluative-interaction-representation-poc.md
docs/architecture/20260617_non-evaluative-interaction-stress-test.md
docs/architecture/20260617_selection-userinput-audit.md
docs/architecture/20260617_feedbackdata-audit.md
docs/architecture/20260617_core-vocabulary-audit.md
```

These documents converge strongly:

- `BHEResult.completed` already exists.
- Non-evaluative selection can be represented structurally.
- `IdentificationSelectionData` can omit expected targets.
- `IdentificationSelectionUserInput` can carry selected target ids.
- The existing identification evaluator should not be reused for reflection.
- The feedback mapper is too corrective for `completed`.
- A small result-producing bridge may be missing.

The most precise prior formulation appears in the non-evaluative stress test: the activity probably does not need a correctness evaluator; it needs a small way to record completion.

### Authoring documents and prototypes

Relevant files:

```txt
packages/authoring/src/RepresentationPath.ts
packages/authoring/src/RepresentationPaths.ts
packages/authoring/src/AuthorOrchestrationPaths.ts
packages/authoring/src/AuthorDiscoveryPlayground.ts
```

Relevant documents:

```txt
docs/architecture/20260618_representation-recipes-exploration.md
docs/architecture/20260618_representation-path-implementation-report.md
docs/architecture/20260622_real-bhe-path-validation-report.md
```

The authoring layer already names the intended path:

```txt
Reflect Through Selection
↓
Selection Interaction
↓
IdentificationSelectionData
↓
IdentificationSelectionUserInput
↓
Non-evaluative
↓
BHEResult.completed
```

But `RepresentationPath` is explicitly descriptive. It does not create `InteractionData`, call a renderer, call an evaluator, or emit a `BHEResult`.

The playground can manually display a `completed` result for Thinking in English, but that is an authoring-only demonstration. It proves that the shape is understandable, not that the engine currently produces it end-to-end.

## Chemins réels identifiés

### 1. Core result path

```txt
Meaningful process
↓
BHEResult.completed
```

Status:

```txt
type-level complete
runtime path not demonstrated
```

What exists:

- `completed` is a real `BHEResultStatus`.
- A result can omit scoring fields.
- `details` and `signals` can carry non-corrective information.

What is missing:

- No observed real interaction path produces `completed`.
- The default feedback mapper treats `completed` as `failed`.

Conclusion:

The result type is ready. The production and feedback path are not fully wired.

### 2. Reflective selection authoring path

```txt
Reflect Through Selection
↓
IdentificationSelectionData
↓
IdentificationSelectionUserInput
↓
non-evaluative policy
↓
BHEResult.completed
```

Status:

```txt
documented path
not executable as a real engine path
```

What exists:

- `RepresentationPath` documents the translation.
- `IdentificationSelectionData` is structurally usable.
- `IdentificationSelectionUserInput` is structurally usable.
- The expected result is explicitly `completed`.

What is missing:

- No neutral result producer exists in the real path.
- The existing identification renderer and evaluator remain corrective.
- The authoring path is descriptive only.

Conclusion:

This is the clearest conceptual path, but it is not yet a real BHE execution path.

### 3. Existing identification selection path

```txt
IdentificationSet
↓
identificationToSelectionData
↓
IdentificationSelectionData
↓
identificationSelectionDomRenderer
↓
IdentificationSelectionUserInput
↓
evaluateIdentificationSelection
↓
BHEResult.success | partial | failed
```

Status:

```txt
real BHE path
but not a completed path
```

What exists:

- A real adapter exists.
- A real renderer exists.
- A real evaluator exists.
- A real `BHEResult` is produced.

What breaks for non-evaluative completion:

- The renderer asks the learner to select correct targets.
- The evaluator compares selected targets against expected targets.
- The evaluator returns only `success`, `partial`, or `failed`.
- If no target is expected and the learner selects something, the current evaluator treats that selection as extra and therefore failed.

Conclusion:

Selection can exist, but the existing identification path cannot express reflective completion without changing its semantics.

### 4. Selection without correctness

```txt
IdentificationSet or reflective selection object
↓
IdentificationSelectionData with no expected targets
↓
IdentificationSelectionUserInput
↓
?
↓
BHEResult.completed
```

Status:

```txt
structurally possible
missing the real middle step
```

What exists:

- `IdentificationSelectionData.targets[].expected` is optional.
- The adapter only copies `expected` when it exists.
- `IdentificationSelectionUserInput.selectedTargetIds` can carry a learner selection.

What is missing:

- A non-corrective step between `UserInput` and `BHEResult.completed`.
- A neutral rendering convention for selection as reflection rather than identification.
- Feedback mapping that does not convert `completed` into `failed`.

Conclusion:

This is the smallest visible gap:

```txt
real selection
↓
meaningful completion
```

### 5. Adaptive routing consumption path

```txt
BHEResult.completed
↓
AdaptiveRouting
```

Status:

```txt
downstream-compatible
not production-complete
```

What exists:

- `BHEResultStatus` includes `completed`.
- Routing examples can work with simulated `BHEResult` values.

What is missing:

- The routing layer consumes results; it does not produce them.
- This does not solve the interaction-to-completed bridge.

Conclusion:

Once a `completed` result exists, downstream logic can plausibly consume it. The open question remains upstream.

### 6. Feedback tail path

```txt
BHEResult.completed
↓
mapBHEResultToFeedback
↓
FeedbackData.failed
↓
DOM feedback
```

Status:

```txt
real path
but semantically wrong for completed
```

What exists:

- Shared feedback mounting exists.
- Feedback rendering exists.
- Informational messages are possible at message level.

What breaks:

- `FeedbackData.status` has no `completed` or `info` status.
- The mapper falls back to `failed`.
- A completed reflective interaction would likely display as failure.

Conclusion:

The default feedback tail currently blocks a clean user-facing `completed` path.

## Ce qui casse

### Renderer

The existing `IdentificationSelection` renderer is not neutral.

It presents selection as a correctness task:

```txt
Select the correct target
Select all correct targets
```

It also triggers the identification evaluator. This is appropriate for identification, but not for reflective selection such as Thinking in English.

Renderer status:

```txt
partially blocking
```

It can display selectable items, but its pedagogical framing and behavior are corrective.

### Evaluator

The existing identification evaluator is corrective by design.

It expects a comparison between:

```txt
selected target ids
```

and:

```txt
expected target ids
```

It produces:

```txt
success
partial
failed
```

It does not produce:

```txt
completed
```

Evaluator status:

```txt
blocking for non-evaluative completion
```

### Runtime / return loop

The documented validated loop assumes:

```txt
UserInput
↓
Evaluator
↓
BHEResult
```

This is not necessarily a deep architectural requirement, but it is the real implemented convention visible today.

Runtime status:

```txt
implicit evaluator assumption
```

There is no documented real neutral alternative such as:

```txt
UserInput
↓
completion result producer
↓
BHEResult.completed
```

### Feedback

The feedback boundary is a concrete break.

`BHEResult.completed` is valid, but:

```txt
completed
↓
shared feedback mapper
↓
failed
```

Feedback status:

```txt
blocking for a clean completed return loop
```

This does not invalidate `completed` in the core. It shows that the shared user-facing feedback tail has not yet been adapted to it.

### Authoring

Authoring can describe the intended route:

```txt
Reflect Through Selection
↓
Non-evaluative
↓
BHEResult.completed
```

But authoring does not execute it.

Authoring status:

```txt
clear as documentation
not a runtime bridge
```

The authoring layer has made the missing bridge visible.

## Hypothèses

### A. `completed` existe déjà mais n'est pas utilisé

This is partly true but incomplete.

`completed` does exist in the core result type, and authoring documents refer to it. But the issue is not merely lack of use. The existing feedback mapper actively mishandles it by converting it to `failed`.

Verdict:

```txt
insufficient
```

### B. `completed` existe à 80% et il manque un helper léger

This appears to be the most credible hypothesis.

Why:

- `BHEResult.completed` already exists.
- Non-scored results are structurally possible.
- Selection data can omit expected targets.
- User input can carry selected ids.
- Authoring has documented the intended path.
- Adaptive routing can plausibly consume a `completed` status once produced.

What is missing:

- a real non-corrective step between `UserInput` and `BHEResult.completed`;
- clean feedback mapping for `completed`;
- possibly a clearer neutral selection vocabulary later, but not necessarily a new core concept.

Verdict:

```txt
most credible
```

### C. `completed` exige une nouvelle convention runtime

This may become true if BHE chooses to distinguish evaluators from non-evaluative result producers at runtime level.

However, the current evidence does not show that a large runtime convention is required. The gap appears smaller:

```txt
UserInput
↓
record meaningful completion
↓
BHEResult.completed
```

Verdict:

```txt
possible later,
not proven necessary
```

### D. `completed` révèle une lacune plus profonde

The evidence does not support this.

The core already contains the main semantic hook. The problem is located at the execution and feedback boundary, not in the conceptual ability of BHE to represent completion.

Verdict:

```txt
not the strongest reading
```

## Conclusion

The answer to the central question is:

```txt
Can BHE already reach BHEResult.completed
through a real path?
```

Current answer:

```txt
Not fully.
```

BHE can already express `BHEResult.completed` at the core type level. The authoring layer can already describe a plausible path toward it. Selection data and selection input can already carry much of what Thinking in English needs.

But no fully real path was found that goes from:

```txt
PedagogicalObject
↓
InteractionData
↓
UserInput
↓
real non-corrective processing
↓
BHEResult.completed
↓
correct user-facing feedback
```

The smallest missing piece appears to be:

```txt
a non-corrective completion-producing step
```

plus a feedback mapping that does not reinterpret `completed` as `failed`.

## Can Thinking in English become a real BHE path without inventing a new core concept?

Yes, probably.

The investigation does not show a need for a new core pedagogical concept. Thinking in English already fits the existing direction:

```txt
Reflect Through Selection
↓
Selection-shaped interaction
↓
Selection user input
↓
Meaningful completion
↓
BHEResult.completed
```

What prevents it from becoming fully real today is not the absence of `completed` in the core. It is the absence of a clean real bridge from non-evaluative selection input to a completed result, and the current corrective assumptions in the renderer/evaluator/feedback tail.

Therefore the best current reading is:

```txt
B. completed exists at about 80%,
and the missing piece is likely small,
but it is not merely documentary.
```

The next useful investigation should focus narrowly on the boundary:

```txt
UserInput
↓
non-corrective result production
↓
BHEResult.completed
↓
non-corrective feedback
```

without introducing a new core concept prematurely.
