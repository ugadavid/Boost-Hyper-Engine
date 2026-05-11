# Return Loop Architecture Synthesis

This report summarizes the current BHE architecture after the latest sequence of
POCs.

No new architecture is introduced here.

## 1. Current Complete Pipeline

The current validated pipeline is:

```txt
PedagogicalObject
-> Adapter
-> InteractionData
-> Renderer
-> UserInput
-> Evaluator
-> BHEResult
-> FeedbackData
-> DOM
```

The forward path prepares an interaction from pedagogical content.

The return path captures learner action, evaluates it, creates a result, maps it
to feedback, and renders that feedback.

## 2. What Is Now Validated

### ContentUnit

`ContentUnit` exists as a minimal multimodal content grain inside
`AssociationSet`.

It validates that BHE can begin representing learner-manipulable content beyond
plain text without forcing multimedia renderers yet.

### UserInput

`UserInput` is interaction-specific.

Current examples:

- `QcmUserInput`;
- `ContextualTypingUserInput`.

This confirms that learner actions should stay close to interaction needs.

### Evaluator

Evaluators are independent from the DOM.

Current examples:

- `evaluateClassificationQcm`;
- `evaluateGapFillTyping`.

They consume structured input and interaction data, then produce `BHEResult`.

### BHEResult

`BHEResult` remains generic.

It carries shared fields:

- status;
- score;
- maxScore;
- completion;
- details.

Specific evaluators use `details` for interaction-specific evidence.

### FeedbackData

`FeedbackData` is now a displayable feedback contract.

It is not rich pedagogical feedback yet. It is a simple structured layer between
evaluation result and UI display.

### renderFeedbackData

`renderFeedbackData` proves that `FeedbackData` can be rendered independently
from pedagogical renderers.

It does not need a `PedagogicalObject`, evaluator, or adapter.

### mountFeedbackFromResult

`mountFeedbackFromResult` is the first helper that is truly earned.

It only mutualizes the repeated tail:

```txt
BHEResult -> FeedbackData -> DOM replacement
```

It does not become a full orchestrator.

## 3. What Remains Deliberately Ungeneralized

The following are still intentionally absent:

- evaluator registry;
- feedback registry;
- global `runEvaluationFeedbackLoop`;
- multimodal `InteractionData`;
- `CompositeUnit`;
- adaptive routing inside renderers;
- evaluator lookup;
- feedback display lookup;
- orchestration lifecycle.

These absences are healthy. The project is still learning from concrete cases.

## 4. Emerging Architectural Rules

- Renderers capture learner action, but should not own evaluation.
- Renderers keep DOM structure, local visual state, and accessibility behavior.
- Evaluators produce `BHEResult`.
- `BHEResult.details` is the extension point for interaction-specific evidence.
- `FeedbackData` is displayable feedback, not rich pedagogical feedback.
- `ContentUnit` is learner-manipulable content.
- `BHEContentBlock` is pedagogical support content.
- Helpers should be small and earned through repetition.
- Registries should wait until lookup becomes a real problem.
- Direct wiring is acceptable while the system is still revealing its shape.

## 5. Points Of Attention

- Do not turn renderers into heavy orchestrators.
- Do not abstract evaluators too early.
- Clarify `InteractionData` later, after more examples.
- Observe how `ContentUnit` affects drag-drop, memory, and association modes.
- Decide later how `AdaptiveRouting` enters the runtime loop.
- Keep feedback display separate from pedagogical feedback selection.
- Avoid making `ContentUnit` responsible for renderer behavior.
- Avoid making `FeedbackData` responsible for routing.

## 6. Possible Next Steps

Possible next moves:

1. Connect `AdaptiveRouting` after `BHEResult`.
2. Connect a third renderer to the return loop.
3. Create a complete Beci adaptive pathway example using routing.
4. Explore drag-drop association with `ContentUnit`.
5. Stabilize TypeDoc and README architecture documentation.

## 7. Final Recommendation

The healthiest next step is:

```txt
Create a complete Beci adaptive pathway example using the existing pieces.
```

Reason:

- the core pieces now exist;
- adaptive routing already exists but is not yet shown in the full loop;
- Beci is the motivating concrete case;
- an example can validate the architecture without creating registries;
- it can connect `BHEResult` to `AdaptiveRouting` without modifying renderers.

This keeps the next step concrete, pedagogically meaningful, and still
reversible.
