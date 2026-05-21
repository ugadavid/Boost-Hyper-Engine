# Productive Objects Emergence Pattern

This note clarifies the emerging pattern of productive BHE objects before opening `TransformationSet` seriously. The central warning is simple: several objects may use typing, but they do not ask the learner to perform the same cognitive operation.

## 1. Productive Cognitive Operations

### GapFillSet

`GapFillSet` is based on contextual absence.

The learner sees a context with missing zones and must produce content that fits locally. The answer is constrained by the words, structures, or clues before and after the blank.

Its cognitive nature includes:

- contextual absence;
- constrained production;
- local context clues;
- deterministic checking;
- expected answer policy.

The learner does not produce a free statement. They produce the missing piece that completes a local structure.

Question:

> What does the learner really produce?

In GapFill, the learner produces a context-fitting answer. The answer is meaningful because it fills a specific absence inside an existing frame.

### TransformationSet

`TransformationSet` is based on explicit source material.

The learner starts from a visible source form and deliberately modifies it into a target form. The key relation is not absence -> completion, but source -> target.

Its cognitive nature includes:

- explicit source form;
- deliberate modification;
- transformation process;
- relation source -> target;
- possible multiple valid outputs.

The learner produces a transformed version of something already given.

Question:

> What distinguishes transforming from completing?

Completing depends on a gap inside a context. Transforming depends on an operation applied to a source. A learner can transform tense, number, gender, register, language, morphology, syntax, or meaning without any missing blank being present.

### InferenceSet (Typing Frontier)

`InferenceSet` sits at the frontier between productive form and interpretive reasoning.

The learner may type an answer, but the act is not classic productive typing. They are not merely supplying a form. They are interpreting clues, proposing a hypothesis, or justifying a plausible meaning.

Its cognitive nature includes:

- interpretation;
- justification;
- plausibility;
- non-deterministic reasoning;
- explanation.

Question:

> Why is a text field here not classic productive typing?

Because the typed answer is not the target operation. The real operation is interpretive reasoning. The text field is only the surface through which the learner expresses an inference.

## 2. Same Typing Gesture != Same Pedagogy

Typing a word in GapFill, typing a transformation, and typing a justification are three different pedagogical operations.

In GapFill, the learner asks: "What belongs in this missing place?"

In Transformation, the learner asks: "How must this source change to become the expected target?"

In Inference, the learner asks: "What can I reasonably understand or justify from these clues?"

The differences are structural:

| Dimension | GapFillSet | TransformationSet | InferenceSet |
| --- | --- | --- | --- |
| Cognitive load | Local completion | Rule/process application | Interpretation and justification |
| Evaluation model | Expected answer matching | Source-target transformation checking | Plausibility / choice / justification |
| Determinism | Often high | Medium to high, depending on task | Often low unless structured |
| Acceptable variation | Listed accepted answers | Multiple valid transformed outputs possible | Paraphrases and reasoning variants |
| Feedback nature | Blank-level correction | Process/form correction | Reasoning and evidence feedback |

This matters because a renderer gesture alone is misleading. A text input does not define the pedagogical object.

## 3. Emergence Path Comparison

GapFill seems to follow a mixed path.

The interaction is obvious early: contextual typing. But the important tensions come from evaluation: accepted answers, normalization, case sensitivity, accent sensitivity, partial correctness, and per-blank feedback.

Inference seems evaluation-first.

Before renderer design, the key question was how to evaluate interpretation without pretending to solve natural language understanding. That led to justified choice and explicit choices in the model.

Transformation probably leans mixed or evaluation-first.

It may have a simple typing renderer, but the real architectural question is the transformation relation. BHE needs to know whether the learner changed the correct feature, whether several targets are acceptable, whether the source-target relation should be visible in feedback, and whether recognition should sometimes precede production.

## 4. Architectural Signals

Several signals are now clear:

- Typing is not an architecture.
- InteractionData should remain object-specific.
- Evaluator complexity differs dramatically across objects that all use text input.
- Renderer gesture alone is misleading.
- Semantic UserInput matters more than DOM event shape.

For example:

- `typedAnswers` for GapFill expresses blank completion.
- A future Transformation input should probably express source-target attempts.
- Inference input expresses selected choice and justification, not ordinary answer filling.

## 5. Consequences For TransformationSet

The central question is how Transformation should be treated.

Option A: simple productive typing.

This would be fast, but likely too shallow. It risks making Transformation look like GapFill without context blanks.

Option B: transformation-specific productive object.

This seems healthiest. Transformation should preserve the source -> target relation and allow feedback on the transformation process, not just final text equality.

Option C: recognition + production hybrid.

This is plausible. Some transformation activities may ask the learner to recognize the correct transformed form before producing one. QCM, flashcards, and typing may all be valid views over the same transformation core.

Option D: another path.

Some transformation tasks may become intercomprehension-specific: source language form -> inferred target language form. In that case, Transformation may touch both productive and interpretive reasoning.

For now, Transformation should not be reduced to a generic typing task.

## 6. Emerging Principle

The emerging principle is:

```txt
Typing gesture
        !=
Typing cognition
```

Typing can express completion, transformation, interpretation, justification, naming, correction, or explanation. BHE should model the cognitive operation first, then choose the interaction shape.

## 7. Final Recommendation

Before implementing `TransformationSet`, the next healthy step is a focused exploration report on Transformation itself.

That report should answer:

- what counts as a transformation;
- what source -> target relation must be preserved;
- whether V0 should be typing, QCM, or hybrid;
- what `TransformationInteractionData` might need;
- what `TransformationUserInput` should express semantically;
- what a deterministic V0 evaluator can safely check.

The recommended direction is **B: transformation-specific productive object**, with openness to **C: recognition + production hybrid** later.

Do not create a generic typing abstraction before this exploration is complete.
