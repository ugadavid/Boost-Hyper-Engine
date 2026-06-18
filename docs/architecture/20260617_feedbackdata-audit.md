# FeedbackData Audit

## 1. Context

This document belongs to the `experiment/bhe-be` branch.

It follows:

- `20260617_core-vocabulary-audit.md`;
- `20260617_non-evaluative-interaction-stress-test.md`;
- `20260617_non-evaluative-interaction-representation-poc.md`.

The recent BHE-BE stress tests showed that the current core can represent a non-evaluative reflective selection activity without changing the main pipeline.

The strongest example was:

```txt
How do you usually learn vocabulary?
```

with a response such as:

```txt
I use flashcards.
```

The activity has no correct answer, no wrong answer, and no score.

The previous audit identified one possible vocabulary tension:

```txt
FeedbackData
```

has a broad name, but its current statuses are:

```txt
success
partial
failed
```

This document audits whether `FeedbackData` can represent a pedagogical system reaction beyond corrective success/failure feedback.

No code is modified.

## 2. Current Structure

`FeedbackData` is defined in:

```txt
packages/core/types/feedback/FeedbackData.ts
```

Current shape:

```ts
export type FeedbackSeverity =
  | "success"
  | "info"
  | "warning"
  | "error";

export interface FeedbackMessage {
  id: string;
  severity: FeedbackSeverity;
  title?: string;
  message: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
}

export interface FeedbackData {
  status: "success" | "partial" | "failed";
  summary: FeedbackMessage;
  messages?: FeedbackMessage[];
  metadata?: Record<string, unknown>;
}
```

The structure has two levels:

1. A global `FeedbackData.status`.
2. One summary message plus optional detailed messages.

The message-level severity is already broader than correction:

```txt
success
info
warning
error
```

This means an informative message is structurally possible:

```txt
severity: info
message: Flashcards can be useful because they support active recall.
```

The global status is narrower:

```txt
success | partial | failed
```

This is the main tension.

## 3. Current Usages

The feedback pipeline currently centers on:

```txt
BHEResult -> mapBHEResultToFeedback -> FeedbackData -> renderFeedbackData
```

The mapper is defined in:

```txt
packages/core/feedback/mapBHEResultToFeedback.ts
```

The DOM renderer is defined in:

```txt
packages/renderer/feedback/feedbackDataDomRenderer.ts
```

The helper is defined in:

```txt
packages/renderer/feedback/feedbackMounting.ts
```

Current renderer integrations use:

```txt
mountFeedbackFromResult
```

for evaluator-based activities such as:

- QCM;
- gap-fill;
- identification;
- transformation;
- sequence reorder;
- drag/drop;
- memorization recall.

Those activities all currently produce evaluator results with:

```txt
success
partial
failed
```

So the existing feedback tail is well aligned with corrective or score-bearing POCs.

## 4. Implicit Reading

The `FeedbackData` type itself is mixed.

### What Is Already Broad

The following fields are broad enough:

- `summary`;
- `messages`;
- `metadata`;
- `FeedbackMessage.severity`;
- `targetId`.

`severity: "info"` is especially important.

It means `FeedbackMessage` can already carry:

- an explanation;
- a hint;
- a reflective prompt;
- a next-step note;
- a neutral observation.

So the message layer is not strictly evaluative.

### What Is Evaluative

The global status is evaluative:

```txt
success
partial
failed
```

This status vocabulary strongly suggests:

- correctness;
- error;
- partial correctness;
- scoring;
- evaluator output.

The mapper reinforces that reading.

Current `feedbackStatus(result)` does:

```txt
if result.status is partial, return partial
if score is between 0 and maxScore, return partial
if result.status is success, return success
otherwise return failed
```

That means:

```txt
BHEResult.status = completed
```

would currently become:

```txt
FeedbackData.status = failed
```

This is correct for some unknown or unsupported evaluator cases, but wrong for a non-evaluative reflective activity.

So the strongest issue is not `FeedbackMessage`.

The strongest issue is:

```txt
FeedbackData.status
and
mapBHEResultToFeedback
currently assume a corrective result space.
```

## 5. Non-Evaluative Case

Test case:

```txt
Question:
How do you usually learn vocabulary?

Learner answer:
I use flashcards.
```

Desired system reaction:

```txt
Flashcards can be useful because they support active recall.
In the next step, you will compare this with another strategy.
```

This reaction is not:

- correction;
- judgment;
- success;
- failure;
- score feedback.

It is closer to:

- informative feedback;
- continuation;
- reflective encouragement;
- pedagogical bridge;
- learner-facing acknowledgement.

### Can FeedbackData Represent It Today?

Partially, yes.

A direct `FeedbackData` object could be written as:

```txt
FeedbackData

status:
  success
  or partial
  or failed
  ?

summary:
  severity: info
  message:
    Flashcards can be useful because they support active recall.
    In the next step, you will compare this with another strategy.

metadata:
  purpose: strategy-awareness
  selectedStrategyIds:
    - use-flashcards
```

The summary message works well.

The metadata works.

The severity works.

The status does not.

None of the current statuses accurately means:

```txt
acknowledged
completed
informational
reflective
```

Choosing `success` would overstate correctness.

Choosing `partial` would suggest partial correctness.

Choosing `failed` would be plainly wrong.

So `FeedbackData` can carry the message, but not cleanly classify the global reaction.

### Can mapBHEResultToFeedback Represent It Today?

No, not cleanly.

A non-evaluative `BHEResult` would likely be:

```txt
status: completed
completion: 1
details:
  selectedStrategyIds:
    - use-flashcards
signals:
  - strategy-awareness
```

Passed through the current mapper, this would become:

```txt
status: failed
summary: Try again.
```

That would misrepresent the pedagogy.

So the display shape is partly flexible, but the default mapper is corrective.

## 6. Frictions

### What Works

`FeedbackMessage` works better than expected.

It already supports:

- `severity: "info"`;
- message text;
- optional title;
- optional target;
- metadata.

The DOM renderer also works broadly enough:

- it renders the summary;
- it renders detail messages;
- it applies severity classes;
- it does not know about evaluators or pedagogical objects.

So the feedback display layer is not the main problem.

### What Feels Forced

The global `FeedbackData.status` forces a correctness frame.

For non-evaluative feedback, none of the current statuses fit.

### What Is Missing

Potential missing status vocabulary:

```txt
info
completed
acknowledged
neutral
```

The exact word should not be decided too quickly.

But the missing semantic slot is clear:

```txt
non-corrective learner-facing reaction
```

### What Is Only Vocabulary

The phrase `FeedbackData` may still be acceptable.

The problem is not necessarily the name `FeedbackData`.

The problem is that its `status` is narrower than the name.

### What Is Mapper-Specific

`mapBHEResultToFeedback` is currently designed for evaluator-driven results.

That is not a flaw.

It was created in a context where all implemented results were corrective or score-bearing.

But it should not be treated as a universal result-to-feedback mapper for reflective activities.

## 7. Minimal Options

### Option A - Change Nothing

This is acceptable if non-evaluative reflective activities remain documentary.

But if they are implemented, the current mapper will produce misleading feedback for `status: "completed"`.

This option is safe now, but insufficient later.

### Option B - Documentation Only

Document:

```txt
FeedbackData currently represents displayable corrective feedback
for evaluator-driven flows.
```

And:

```txt
mapBHEResultToFeedback should not be used blindly
for non-evaluative BHEResult.status = completed.
```

This is the smallest immediate clarification.

### Option C - Add A Neutral FeedbackData Status Later

A small future change could extend:

```ts
status: "success" | "partial" | "failed";
```

to include something like:

```txt
info
```

or:

```txt
completed
```

This would let `FeedbackData` represent non-corrective reactions without inventing a new object.

Potential future shape:

```txt
status:
  success
  partial
  failed
  info
```

or:

```txt
status:
  success
  partial
  failed
  completed
```

`info` aligns with `FeedbackSeverity`.

`completed` aligns with `BHEResultStatus`.

This needs a concrete implementation pressure before choosing.

### Option D - Add A Separate SystemReaction Later

A more conceptual option would distinguish:

```txt
FeedbackData
```

from:

```txt
SystemReaction
```

or:

```txt
LearnerResponseData
```

But this is too heavy right now.

It risks creating a new layer before proving that `FeedbackData` cannot simply be widened.

### Option E - Add A Separate Mapper For Reflective Results

Another possible future path:

```txt
mapBHEResultToFeedback
```

could remain corrective, while a future reflective flow uses a smaller dedicated mapper.

For example:

```txt
mapReflectiveSelectionResultToFeedback
```

This preserves the current mapper's assumptions.

But it may also multiply mappers too early.

### Option F - Use Metadata Only

One could keep the status as `success` and place the real meaning in metadata:

```txt
status: success
metadata:
  nonEvaluative: true
```

This is not recommended.

It hides semantic mismatch instead of resolving it.

## 8. Recommendation

Recommendation:

```txt
documentation only now;
small change recommended later if a non-evaluative feedback flow is implemented.
```

`FeedbackData` is not broken.

Its message layer is already capable of informative, non-corrective feedback.

But its global status vocabulary and default mapper are currently correction-oriented.

The key distinction is:

```txt
FeedbackMessage can be non-evaluative.
FeedbackData.status currently cannot.
mapBHEResultToFeedback currently assumes corrective status mapping.
```

No immediate code change is recommended because no non-evaluative feedback renderer or mapper exists yet.

If the next implementation POC creates a reflective selection flow, the smallest likely change would be:

```txt
extend FeedbackData.status with one neutral status
```

probably either:

```txt
info
```

or:

```txt
completed
```

The choice should be made only when the implementation pressure is concrete.

Do not create `SystemReaction` yet.

Do not create a feedback registry.

Do not generalize feedback mapping into a large orchestration layer.

For now, BHE should remember:

```txt
BHEResult is already non-evaluative-capable.
FeedbackData is message-capable.
The mapper/status layer is the narrow point.
```
