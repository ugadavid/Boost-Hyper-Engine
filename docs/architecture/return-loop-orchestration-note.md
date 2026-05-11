# Return Loop Orchestration Note

This note compares possible ways to wire the return loop:

```txt
UserInput -> Evaluator -> BHEResult -> FeedbackData -> DOM
```

It is written before connecting `gapFillTypingDomRenderer`.

No helper, registry, or orchestrator is introduced here.

## 1. Direct Wiring Inside Renderers

In this approach, each renderer directly:

1. captures learner action;
2. creates its own `UserInput`;
3. calls its evaluator;
4. maps `BHEResult` to `FeedbackData`;
5. calls `renderFeedbackData`;
6. replaces or mounts the feedback DOM.

This is what the classification QCM renderer currently does.

### Advantages

- Very explicit.
- Easy to follow in a POC.
- Keeps each interaction understandable.
- Avoids premature shared abstractions.
- Makes renderer-specific differences visible.

### Limits

- Wiring can be duplicated across renderers.
- Renderers may slowly become orchestration-heavy.
- Error handling may diverge.
- Feedback mounting conventions may become inconsistent.
- Later analytics or adaptive routing hooks would need to be repeated.

Direct wiring is good for learning. It is less good as the permanent shape if
many renderers repeat the same sequence.

## 2. Small Helper Function

A small helper could centralize only the repeated tail of the return loop.

Possible shape:

```ts
runEvaluationFeedbackLoop({
  input,
  evaluate,
  feedbackContainer
});
```

It could manage:

- evaluator call;
- `mapBHEResultToFeedback`;
- `renderFeedbackData`;
- replacing feedback DOM;
- possibly minimal error handling.

The renderer would still create the `UserInput` and manage its own visual state.

### Advantages

- Reduces duplicated wiring.
- Keeps feedback mounting consistent.
- Keeps renderers lighter.
- Avoids a full registry.
- Can remain small and easy to delete or change.

### Limits

- Can become too abstract if it tries to understand every interaction.
- May hide important differences between QCM and gap-fill.
- Could make POCs less readable if introduced too early.
- Needs careful typing, because evaluators have interaction-specific inputs and
  data.

The helper should not choose evaluators. It should only run the evaluator passed
to it.

## 3. Future Orchestrator / Registry

A future orchestration layer could eventually handle:

- evaluator lookup;
- feedback display lookup;
- lifecycle;
- error handling;
- async evaluation;
- analytics;
- adaptive routing;
- logging;
- retries;
- external services.

This is not needed yet.

### Why A Registry Is Premature

Only one renderer is currently connected to the full loop.

Only two evaluators exist.

The system does not yet have stable conventions for:

- evaluator ids;
- lookup keys;
- interaction data hierarchy;
- async behavior;
- error results;
- feedback display targets;
- adaptive routing lifecycle.

A registry now would freeze assumptions that are still actively emerging.

## 4. What Should Stay In The Renderer

Renderers should keep:

- DOM structure;
- local interaction layout;
- buttons, inputs, cards, drop zones;
- capture of learner actions;
- creation of concrete `UserInput`;
- local visual state;
- local accessibility behavior;
- focus and ARIA details.

The renderer is still the interaction surface.

## 5. What Can Be Shared Later

The following may be shared:

- `BHEResult -> FeedbackData`;
- rendering `FeedbackData`;
- replacing the feedback DOM;
- minimal error handling;
- later, optional analytics hooks;
- later, optional adaptive routing hooks.

The key is to share only the repeated tail of the loop, not the whole
interaction.

## 6. Risks

- Turning renderers into heavy orchestrators.
- Creating a helper that is too abstract too early.
- Hiding differences between QCM and gap-fill.
- Making POCs harder to read.
- Creating a registry before lookup rules are real.
- Moving input capture out of renderers too early.
- Treating all evaluators as if they had the same shape.

## 7. Recommendation

For the next `gapFillTypingDomRenderer` integration, use **direct wiring one
more time**.

Reason:

- QCM has one selected choice.
- Gap-fill has multiple typed answers.
- The differences are still important to observe directly.
- One more direct integration will show what is genuinely repeated.

Do not create a registry.

Do not create a helper yet.

After the gap-fill integration, compare the two full-loop renderers. If the same
tail is repeated clearly, then create a tiny helper with this narrow shape:

```ts
runFeedbackLoop({
  result,
  feedbackContainer
});
```

or:

```ts
runEvaluationFeedbackLoop({
  input,
  evaluate,
  feedbackContainer
});
```

The first shape may be safer because it keeps evaluator-specific input handling
inside the renderer while sharing only:

```txt
BHEResult -> FeedbackData -> DOM replacement
```

That is likely the smallest useful abstraction.
