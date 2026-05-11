# Runtime Pathway Launcher POC Report

## Why This POC Exists

Adaptive routing can now select a `targetObjectId`.

This POC tests the next small step:

```txt
targetObjectId -> local next step lookup
```

It does not render the next step. It only proves that a routed target can be
resolved to a pedagogical object from a local collection.

## What It Adds After AdaptiveRouting

Routing answers:

```txt
Where should the learner go next?
```

Launching answers:

```txt
Which object does that target id refer to?
```

The example defines three local next steps:

- `beci-personality-option-1-remediation`
- `beci-personality-option-2-practice`
- `beci-personality-option-3-advanced`

After routing, the example finds the selected step and prints its title, type,
and family.

The example also includes a deliberate missing-target simulation. In that case,
adaptive routing returns:

```txt
beci-personality-option-4-missing
```

The local lookup returns `undefined`, and the console output includes:

```txt
Missing target: beci-personality-option-4-missing
```

## Why Console-Only

The goal is to test pathway resolution, not rendering.

Keeping the example console-only avoids introducing DOM, frontend state, runtime
navigation, or object activation rules too early.

## Why There Is No Registry Yet

The step collection is local to the example.

A global registry would be premature because the project has not yet defined:

- object storage;
- lookup scope;
- loading strategy;
- lifecycle;
- missing-object behavior;
- async loading;
- analytics hooks.

The local array is enough to validate the idea.

The missing-target case also stays local. It proves the need for future runtime
error handling without forcing a global strategy now.

## Routing Versus Launching

Routing evaluates a `BHEResult` against declarative rules and returns a target
id.

Launching resolves that id into an actual next object or step.

These should remain separate concerns.

## Current Limits

- The next steps are simplified `PedagogicalObject` values.
- No DOM renderer is invoked.
- No runtime navigation occurs.
- No missing-target error strategy exists beyond returning `undefined` and a
  clear console message.
- The collection is local, not shared.

## Possible Next Steps

- Create a local pathway object that owns steps and routing.
- Define a missing-target policy only when runtime launching becomes real.
- Render the selected next step later, after lookup is stable.
- Keep global registries out until object lookup becomes a real cross-cutting
  need.
