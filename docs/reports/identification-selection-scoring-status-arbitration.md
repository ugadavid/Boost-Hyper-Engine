# Identification selection scoring/status arbitration

## Purpose

The `IdentificationSelectionData -> IdentificationSelectionUserInput -> BHEResult` POC revealed a scoring/status tension:

`extraTargetIds` are observed but do not currently subtract points.

This report arbitrates how V0 should treat extra selections, especially the extra-only case.

## 1. Current rule

Current V0 evaluator behavior:

- score = number of expected targets correctly selected;
- maxScore = number of expected targets;
- `extraTargetIds` are reported in `details`;
- extras do not subtract points;
- success only if all expected targets are selected and there are no extras;
- partial if at least one expected target is selected or if there are extras;
- failed if no expected target is selected and there are no extras.

This means:

```txt
correct targets selected + no extras => success
some correct targets => partial
all correct targets + extras => partial
only extras => partial
nothing selected => failed
```

## 2. The extra-only problem

Extra-only case:

```txt
selectedTargetIds = [nonExpectedA, nonExpectedB]
correctTargetIds = []
extraTargetIds = [nonExpectedA, nonExpectedB]
```

The question:

Should this be:

- `partial`, because the learner attempted a selection?
- `failed`, because no expected target was identified?
- another status or signal?

The current implementation leans toward `partial` because extras are treated as meaningful learner activity.

But pedagogically, this can be misleading.

## 3. Option A: extra-only = partial

### Advantages

- Distinguishes a wrong attempt from no answer.
- Keeps "failed" for blank/no-action cases.
- Allows feedback to say: "You selected something, but not the expected targets."
- Treats learner activity as meaningful.

### Risks

- A learner who selected only wrong targets may see `partial`, which can sound too positive.
- AdaptiveRouting may interpret `partial` as some real success.
- It blurs the difference between "some correct" and "only incorrect".
- The score is still `0`, but the status suggests partial achievement.

### Fit for BHE

This option is learner-friendly, but semantically weak unless `details` are always inspected.

## 4. Option B: extra-only = failed

### Advantages

- Status aligns with correctness: no expected target was identified.
- Keeps `partial` for real partial correctness.
- Makes AdaptiveRouting simpler.
- Avoids over-rewarding incorrect selections.
- Score `0` and status `failed` tell the same story.

### Risks

- Does not distinguish "wrong attempt" from "no attempt" at status level.
- Feedback must use `extraTargetIds` to explain that the learner selected wrong targets.
- Could feel harsher if feedback is not specific.

### Fit for BHE

This option better preserves the meaning of `partial` as partial success.

The learner's attempt remains visible through `details.extraTargetIds`.

## 5. Option C: penalize extras in the score

Possible formulas:

- score = correct - extras;
- score = correct / (expected + extras);
- cap score at zero;
- weighted extra penalty.

### Advantages

- More nuanced scoring.
- Extra selections affect score directly.
- Can discourage over-selection.

### Risks

- Introduces scoring policy too early.
- Penalization may vary by pedagogy.
- Harder to explain.
- Could punish exploratory identification tasks unfairly.
- Requires decisions about weighting and caps.

### Fit for BHE

Not for V0.

Extras should remain visible in `details`, but not penalized in the score yet.

## 6. Recommendation V0

Recommendation: **Option B. extra-only = failed**.

V0 rule should be:

- success if all expected targets are selected and no extras;
- partial if at least one expected target is selected but result is not perfect;
- failed if no expected target is selected, even if extras exist.

This means:

```txt
all expected + no extra => success
some expected => partial
all expected + extra => partial
only extras => failed
nothing selected => failed
```

Reason:

- `partial` should mean partial correctness;
- extras are still captured in `details`;
- feedback can explain wrong selections;
- AdaptiveRouting receives cleaner status signals;
- no score penalty is introduced yet.

Next controlled step:

Update `evaluateIdentificationSelection` to make extra-only selections `failed`, then update the console example/report accordingly.

Do not create a renderer before this V0 status rule is stabilized.
