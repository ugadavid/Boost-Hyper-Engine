# Beci Full Adaptive Pathway Report

## Why This Example Exists

This example validates the complete BHE loop with adaptive routing using the
pieces that already exist.

It stays console-only to focus on architecture rather than UI.

## Connected Pipeline

The example demonstrates:

```txt
PedagogicalObject
-> Adapter
-> InteractionData
-> simulated UserInput
-> Evaluator
-> BHEResult
-> FeedbackData
-> AdaptiveRouting
-> targetObjectId
```

The pedagogical object is a Beci-inspired `GapFillSet` about personality
adjectives.

The adapter creates `ContextualTypingData`.

The simulated learner input is `ContextualTypingUserInput`.

The evaluator produces `BHEResult`.

The feedback mapper produces `FeedbackData`.

Adaptive routing selects the next target object.

## BHEResult Feeds Two Consumers

The same `BHEResult` feeds:

```txt
BHEResult -> FeedbackData
BHEResult -> AdaptiveRouting
```

This is important because it confirms that `BHEResult` is the shared return
point of the system.

Feedback and routing do not need to talk to each other.

## Why AdaptiveRouting Uses BHEResult, Not FeedbackData

`FeedbackData` is display-oriented.

It contains messages, severity, and targets for presentation.

`AdaptiveRouting` should use `BHEResult` because routing depends on evaluation
signals:

- status;
- score;
- maxScore;
- completion;
- signals;
- details.

Routing from feedback messages would mix display concerns with learning-path
logic.

## Why Console-Only

The goal is not to test DOM rendering.

The goal is to prove that the architecture works from content to routing:

```txt
content -> input -> result -> feedback + next target
```

Keeping it console-only avoids adding renderer complexity.

## What It Validates For Beci

The example validates a Beci-style adaptive pathway:

- no correct answers -> remediation;
- partial result -> practice;
- success -> advanced activity.

This matches the original pedagogical idea: route learners to different next
steps depending on their performance.

The current example now runs all three simulated outcomes:

```txt
failed  -> beci-personality-option-1-remediation
partial -> beci-personality-option-2-practice
success -> beci-personality-option-3-advanced
```

## Current Limits

- User input is simulated.
- No DOM renderer is involved.
- Adaptive routing is not yet connected to a runtime object launcher.
- The routes are simple and status/score based.
- No analytics are produced.
- Feedback remains generic.

## Possible Next Steps

- Later, connect adaptive routing after a real renderer interaction.
- Create a runtime pathway launcher that can activate the selected target object.
- Add richer feedback for each route.
- Keep routing attached to `BHEResult`, not `FeedbackData`.
