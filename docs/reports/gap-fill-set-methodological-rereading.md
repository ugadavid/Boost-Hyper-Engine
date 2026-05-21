# GapFillSet Methodological Rereading

This report rereads `GapFillSet` through the current BHE methodology, without changing the code. The goal is to decide whether the existing implementation can stand as a valid V0 or whether it should be reopened before exploring `TransformationSet`.

## 1. Cognitive Nature Of GapFillSet

`GapFillSet` asks the learner to complete missing content inside a context. The learner does not freely produce from nothing: the expected answer is constrained by what appears before and after the blank.

The cognitive operation is therefore:

- read the surrounding context;
- infer the missing local form or meaning from that context;
- produce a constrained answer;
- check whether the answer fits the blank.

This differs from `TransformationSet`. Transformation starts from an explicit source form and asks the learner to convert it into a target form. Gap-fill starts from a contextual absence: the source is the surrounding text, not a single item to transform.

It also differs from `InferenceSet`. Inference asks the learner to interpret or justify meaning. Gap-fill can require inferential reading, but the output is usually a concrete missing answer, not an interpretation.

It differs from `IdentificationSet` because identification asks the learner to select or detect existing targets. Gap-fill asks the learner to produce content that is absent from the rendered context.

## 2. Current Implementation State

The current implementation already includes a substantial V0 path:

- `GapFillSet` defines a productive pedagogical object with `context`, `blanks`, `expected`, hints, feedback, case sensitivity, and accent sensitivity.
- `gapFillToContextualTypingAdapter` transforms the context and blanks into a structured sequence of text segments and typing blanks.
- `ContextualTypingData` exists as the interaction-facing data shape in the adapter.
- `ContextualTypingUserInput` captures learner answers as `{ blankId, value }[]`.
- `evaluateGapFillTyping` compares typed answers against expected values.
- `gapFillTypingDomRenderer` renders native text inputs inside the context.
- Feedback is produced per blank through `BHEResult.details.blankResults`.
- Status now supports `success`, `partial`, and `failed`.
- The renderer uses `mountFeedbackFromResult` for global feedback.

One structural note: unlike the newer Sequence / Identification / Inference exploration, `ContextualTypingData` is not yet formalized in `packages/core/types/interaction-data`. It lives close to the renderer adapter, and the evaluator also defines a compatible local typing data shape. This is not a failure, but it marks GapFill as an older implementation that predates the latest convention.

## 3. What The Existing Implementation Validates

The existing implementation already respects several core BHE principles:

- It has specialized interaction data rather than sending the raw pedagogical object directly into the renderer.
- It uses semantic user input: typed answers are keyed by blank id, not by DOM position.
- Evaluation happens outside the renderer.
- The evaluator produces a generic `BHEResult`.
- The result includes specific details through `blankResults`.
- Feedback can be mapped globally through `FeedbackData` and mounted through the shared feedback tail helper.
- The renderer remains specialized: it owns context display, inputs, local classes, and inline per-blank feedback.
- Partial correctness is explicit and useful.

This means GapFill is not merely legacy. It is a working V0 that already fits much of the current BHE architecture.

## 4. Architectural Tensions

The main tensions are not about the pipeline. They are about the productive nature of the task.

Exact matching vs accepted answers:
`expected` already supports a string or string array. This is enough for V0, but it does not yet model richer answer policies.

Normalization:
The evaluator trims answers, handles case sensitivity, and optionally removes accents. This is a good V0 baseline, but future behavior may need clearer policy names or reusable normalization utilities.

Accents and case:
`caseSensitive` and `accentSensitive` are useful because gap-fill language tasks often need different tolerance levels. The defaults currently lean toward tolerant matching.

Orthography:
Spelling errors are currently incorrect. That is acceptable for V0, but future productive tasks may need edit-distance tolerance or teacher-defined approximate matching.

Synonyms:
Synonyms are only supported if listed in `expected`. This keeps evaluation deterministic, which is healthy for now.

Multi-answer blanks:
Multiple accepted answers exist, but feedback does not yet explain why one accepted answer is preferred over another.

Feedback local vs global:
The renderer provides inline blank feedback, while `mountFeedbackFromResult` provides global feedback. This duplication is acceptable because the inline feedback is interaction-local, while the global feedback is result-level.

Typing GapFill vs typing Inference:
Both can use text input, but they are not the same pedagogy. GapFill typing checks constrained missing content. Inference typing asks for interpretation or justification. The same gesture must not collapse these objects into one generic typing engine too early.

Hints:
Hints exist in the data and are exposed as input titles, but there is no deliberate hint interaction yet.

Richer scoring:
Scoring is per blank and binary. This is fine for V0, but future versions may score spelling, partial morphology, or semantic acceptability differently.

## 5. Accessibility Of The Current Renderer

The renderer has several good V0 accessibility properties:

- It uses native text inputs.
- Each input receives an `aria-label` from the blank label or id.
- Keyboard navigation follows native tab order.
- Global feedback is mounted in a container with `aria-live="polite"`.
- Inline blank feedback spans also use `aria-live="polite"`.

There are still possible improvements:

- The context is a paragraph containing inputs and inline feedback; this is simple, but complex contexts may become hard to read with assistive technology.
- Labels are `aria-label` attributes rather than visible `<label>` elements.
- Inline feedback is terse: `correct` / `incorrect`.
- Hints are currently exposed through `title`, which is not a robust accessible hint pattern.
- There is no explicit summary linking each blank result to its blank label.

These are not blockers for V0. They are the most obvious candidates for a small accessibility polish later.

## 6. What Not To Do Now

Do not refactor the whole GapFill path now.

Do not create a generic typing renderer.

Do not add NLP, LLM-based scoring, or fuzzy semantic scoring.

Do not create a registry to route GapFill evaluation.

Do not open `TransformationSet` implementation before this rereading is digested.

Do not add multimodal GapFill yet.

Do not collapse GapFill typing and Inference typing into a shared engine. They share an input gesture, but not the same cognitive operation.

## 7. Final Recommendation

Recommendation: **A + B**.

`GapFillSet` should be kept as a valid V0 implementation. It already demonstrates the current BHE return loop:

```txt
GapFillSet
-> gapFillToContextualTypingData
-> ContextualTypingUserInput
-> evaluateGapFillTyping
-> BHEResult
-> FeedbackData / DOM feedback
```

The only near-term adjustment worth considering is a light accessibility pass on the renderer, especially around visible labels, hint exposure, and clearer inline feedback. That should be treated as polish, not as a conceptual refactor.

Before opening `TransformationSet`, the healthiest next step is to document the productive-object pattern emerging from GapFill:

```txt
contextual absence
-> constrained production
-> deterministic answer policy
-> per-blank partial correctness
```

This gives `TransformationSet` a clearer comparison point instead of forcing it into a generic typing model too early.
