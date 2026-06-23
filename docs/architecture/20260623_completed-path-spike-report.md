# Completed Path Spike Report

Date: 2026-06-23

Status: spike implementation report

Goal: test the smallest possible path from reflective `UserInput` to `BHEResult.completed` and non-corrective feedback.

Principle:

```txt
Do not design.
Test.
```

## Context

The investigation document:

```txt
docs/architecture/20260623_completed-path-investigation.md
```

concluded:

```txt
BHEResult.completed exists at about 80%.
```

The identified rupture was:

```txt
UserInput
↓
non-corrective completion
↓
BHEResult.completed
↓
non-corrective feedback
```

The spike tested whether Thinking in English could move from:

```txt
🟡 Partial BHE Path
```

to:

```txt
🟢 Real BHE Path
```

without creating a new renderer, evaluator, runtime pathway, or new pedagogical concept.

## Files touched

### Created

```txt
packages/core/results/createCompletedResultFromUserInput.ts
packages/core/results/index.ts
docs/architecture/20260623_completed-path-spike-report.md
```

### Modified

```txt
packages/core/types/feedback/FeedbackData.ts
packages/core/feedback/mapBHEResultToFeedback.ts
packages/authoring/src/AuthorDiscoveryPlayground.ts
```

No specialized renderer or evaluator was modified.

## Lines modified

Measured from the spike diff:

```txt
packages/core/types/feedback/FeedbackData.ts
  1 line changed

packages/core/feedback/mapBHEResultToFeedback.ts
  20 lines added

packages/authoring/src/AuthorDiscoveryPlayground.ts
  27 changed lines

packages/core/results/createCompletedResultFromUserInput.ts
  new helper file

packages/core/results/index.ts
  new barrel export
```

The code diff, excluding the new helper file and this report, is approximately:

```txt
35 insertions
14 deletions
```

## Change 1 — Produce `BHEResult.completed` from `UserInput`

File:

```txt
packages/core/results/createCompletedResultFromUserInput.ts
```

The spike adds a small helper:

```txt
createCompletedResultFromUserInput
```

It accepts:

```txt
objectId
input
optional details
optional durationMs
optional signals
optional completion
```

and produces:

```txt
BHEResult.completed
```

with:

```txt
completion: 1
```

by default.

Impact:

```txt
UserInput
↓
createCompletedResultFromUserInput
↓
BHEResult.completed
```

is now a real callable path.

This is not an evaluator. It does not check correctness. It records meaningful completion.

## Change 2 — Prevent `completed` from becoming `failed`

Files:

```txt
packages/core/types/feedback/FeedbackData.ts
packages/core/feedback/mapBHEResultToFeedback.ts
```

Before the spike:

```txt
BHEResult.completed
↓
mapBHEResultToFeedback
↓
FeedbackData.failed
```

After the spike:

```txt
BHEResult.completed
↓
mapBHEResultToFeedback
↓
FeedbackData.completed
↓
Completed. / info
```

`FeedbackData.status` was extended from:

```txt
success | partial | failed
```

to:

```txt
success | partial | failed | completed | skipped
```

`skipped` was included because `BHEResultStatus` already includes it and it had the same fallback problem as `completed`.

Impact:

- evaluative results keep their previous mapping;
- `completed` now produces informational feedback;
- `skipped` now produces informational feedback;
- no renderer-specific logic was added.

## Change 3 — Connect Thinking in English in the playground

File:

```txt
packages/authoring/src/AuthorDiscoveryPlayground.ts
```

The Thinking in English validation example was changed from:

```txt
🟡 Partial BHE Path
```

to:

```txt
🟢 Real BHE Path
```

The interactive example now follows:

```txt
Compare
↓
Strategies / Habits
↓
Reflect Through Selection
↓
IdentificationSet
↓
identificationToSelectionData
↓
IdentificationSelectionData
↓
IdentificationSelectionUserInput
↓
createCompletedResultFromUserInput
↓
BHEResult.completed
↓
mountFeedbackFromResult
↓
FeedbackData.completed
```

The existing `IdentificationSelection` evaluator is still deliberately not used, because it is corrective.

The existing specialized `IdentificationSelection` renderer is also not used for this path, because its visible framing is still:

```txt
select the correct target
```

The playground keeps a lightweight local checkbox rendering for the reflective gesture, but the result and feedback tail are now real BHE structures.

## Answers to the spike questions

### 1. Can we produce a real `BHEResult.completed` from a `UserInput` without a corrective evaluator?

Yes.

The helper proves that the missing step can be very small:

```txt
IdentificationSelectionUserInput
↓
createCompletedResultFromUserInput
↓
BHEResult.completed
```

This confirms that `completed` does not require a correctness evaluator.

### 2. Can we display coherent feedback without making `completed` fall into `failed`?

Yes.

The feedback mapper now preserves `completed`:

```txt
BHEResult.completed
↓
FeedbackData.completed
↓
Completed.
```

The rendered feedback uses informational severity rather than success/error language.

### 3. What is the smallest change enabling this?

The smallest viable change appears to be:

```txt
1 small completion helper
+ feedback status widening
+ mapper handling for completed/skipped
+ playground wiring
```

No new evaluator was needed.

No new specialized renderer was needed.

No new pedagogical concept was needed.

No runtime architecture change was needed.

## Verification

### Build

Command used:

```txt
npm.cmd run build
```

Result:

```txt
success
```

Note:

```txt
npm run build
```

was blocked by the local PowerShell execution policy for `npm.ps1`, so the Windows executable form was used.

### Authoring import

Command used:

```txt
node -e "import('./dist/packages/authoring/src/index.js')..."
```

Result:

```txt
authoring import ok
```

### Completed-to-feedback check

Observed result:

```json
{
  "result": "completed",
  "feedback": "completed",
  "message": "Completed.",
  "severity": "info"
}
```

This confirms that the spike no longer maps `completed` to `failed`.

## Impact

### Positive impact

The Thinking in English chain can now be described as a real BHE path for the tested slice:

```txt
UserInput
↓
BHEResult.completed
↓
FeedbackData.completed
```

The cost is small and localized.

The change also clarifies that non-evaluative completion is not a new type of assessment.

### Remaining limitation

The path is real from `UserInput` to `BHEResult.completed` to feedback.

However, the visual selection UI in the playground is still lightweight authoring UI, not the existing `IdentificationSelection` renderer.

This is intentional for the spike:

- the existing IdentificationSelection renderer is corrective;
- the existing IdentificationSelection evaluator is corrective;
- reusing them would make Thinking in English pedagogically wrong.

So the status is:

```txt
real result path
real feedback path
local reflective selection UI
```

This is enough to validate the missing completed bridge, but not enough to claim that all reflective selection rendering is solved.

## Rollback

Rollback is simple.

Remove:

```txt
packages/core/results/createCompletedResultFromUserInput.ts
packages/core/results/index.ts
```

Revert:

```txt
packages/core/types/feedback/FeedbackData.ts
packages/core/feedback/mapBHEResultToFeedback.ts
packages/authoring/src/AuthorDiscoveryPlayground.ts
```

In the playground, restore Thinking in English to:

```txt
🟡 Partial BHE Path
```

and restore the local manual result construction if needed.

## Cost measured

The practical cost is low:

- one helper;
- one feedback type widening;
- one mapper branch;
- one playground wiring update.

The conceptual cost is moderate but acceptable:

- `FeedbackData.status` is no longer purely corrective;
- it now mirrors the broader result vocabulary more faithfully.

This is consistent with the earlier audits, which had already identified the feedback boundary as too narrow for non-evaluative activity.

## Verdict

```txt
🟢 viable
```

The spike demonstrates that the missing bridge is small.

Thinking in English can become a real BHE path for the completed-result slice without inventing a new core pedagogical concept, a new evaluator, or a new runtime architecture.

The next question is no longer:

```txt
Can BHE produce completed?
```

It is:

```txt
Where should neutral reflective selection UI live?
```

That question should remain separate from the completed-result bridge.
