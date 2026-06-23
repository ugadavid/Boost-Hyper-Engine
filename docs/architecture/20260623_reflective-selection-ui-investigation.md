# Reflective Selection UI Investigation

Date: 2026-06-23

Status: architectural investigation

Scope: no implementation, no code change, no new renderer, no new evaluator.

## Context

The completed-path spike validated the bridge:

```txt
IdentificationSelectionUserInput
↓
createCompletedResultFromUserInput
↓
BHEResult.completed
↓
FeedbackData.completed
```

This means the core result path is no longer the main unknown for Thinking in English.

The remaining question is:

```txt
Where should neutral reflective selection UI live?
```

The studied path is:

```txt
Reflect Through Selection
↓
IdentificationSet as structural carrier
↓
IdentificationSelectionData
↓
IdentificationSelectionUserInput
↓
createCompletedResultFromUserInput
↓
BHEResult.completed
↓
FeedbackData.completed
```

The result path works. The open question is the selection interface.

## Ce qui existe aujourd'hui

### Current IdentificationSelection path

The existing real path is:

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
↓
mountFeedbackFromResult
↓
FeedbackData
```

This is coherent for corrective identification.

The renderer is not only a visual checkbox list. It also includes:

- corrective wording;
- a `Check` button;
- the call to `evaluateIdentificationSelection`;
- inline correctness classes;
- target-level messages such as correct, extra, and missing;
- feedback mounted from an evaluative `BHEResult`.

### Renderer behavior

Location:

```txt
packages/renderer/renderers/identificationSelectionDomRenderer.ts
```

The renderer presents the task as:

```txt
Select the correct target
```

or:

```txt
Select all correct targets
```

Then it captures:

```txt
IdentificationSelectionUserInput
```

and immediately calls:

```txt
evaluateIdentificationSelection
```

The visible UI therefore carries a corrective pedagogical meaning.

### Evaluator behavior

Location:

```txt
packages/core/evaluators/evaluateIdentificationSelection.ts
```

The evaluator compares:

```txt
selectedTargetIds
```

against:

```txt
expectedTargetIds
```

and returns:

```txt
success
partial
failed
```

It does not produce:

```txt
completed
```

This is correct for identification, but wrong for reflective self-positioning.

### InteractionData and UserInput

Locations:

```txt
packages/core/types/interaction-data/IdentificationSelectionData.ts
packages/core/types/input/UserInput.ts
```

`IdentificationSelectionData` can structurally carry selectable statements. Its targets have:

```txt
expected?: boolean
```

so expected targets can be omitted.

`IdentificationSelectionUserInput` can structurally carry:

```txt
selectedTargetIds
```

This is why the authoring path can currently reuse the carrier.

But the names still imply identification, not reflection.

### Authoring path

Location:

```txt
packages/authoring/src/RepresentationPaths.ts
```

`Reflect Through Selection` already says:

```txt
Omit expected targets.
Do not call the Identification evaluator.
Use informational continuation rather than corrective feedback.
```

This is an important clue. The authoring layer is not asking for a new pedagogical core object. It is asking for a selection surface with a different result policy.

### Completed-path spike

Location:

```txt
docs/architecture/20260623_completed-path-spike-report.md
```

The spike validated:

```txt
UserInput
↓
BHEResult.completed
↓
FeedbackData.completed
```

but explicitly left unresolved:

```txt
local reflective selection UI
```

The spike therefore moved the uncertainty from result semantics to UI responsibility.

## Analyse des quatre hypothèses

## A. The IdentificationSelection renderer should become more general

Hypothesis:

```txt
identificationSelectionDomRenderer
```

could support both:

```txt
corrective selection
```

and:

```txt
reflective selection
```

through configuration.

### Advantages

- Reuses an existing checkbox-style surface.
- Avoids creating another renderer too early.
- Makes sense mechanically: both paths collect selected target ids.
- Keeps selection UI in the renderer package rather than authoring-only demos.
- Could reduce duplication if the visual interaction is nearly identical.

### Risks

The main risk is semantic dilution.

The current renderer is not neutral. It is already bound to:

```txt
correct target
Check
expected target
extra target
missing target
```

Making it configurable could create a renderer with two pedagogical identities:

```txt
identify the correct targets
```

and:

```txt
select what describes you
```

Those may look similar but they are not the same learning contract.

There is also a maintainability risk. Configuration may start with one flag:

```txt
evaluative: true | false
```

but quickly grow into:

- different legends;
- different button labels;
- different submission behavior;
- different feedback behavior;
- different target annotations;
- different accessibility copy;
- different result policy.

At that point, the renderer would become a small orchestration layer rather than a simple renderer.

### Coherence with BHE principles

Partially coherent, but risky.

BHE repeatedly separates:

```txt
interaction shape
```

from:

```txt
pedagogical function
```

A configurable renderer could respect that separation if it only changes surface language and result policy injection.

But it could also violate the principle by hiding two pedagogical functions behind one technical renderer name.

### Reading

This hypothesis is plausible only if the renderer is first decomposed conceptually into:

```txt
selection surface
```

and:

```txt
identification correction wiring
```

Without that distinction, generalizing the current renderer would be dangerous.

## B. The IdentificationSelection renderer should stay corrective

Hypothesis:

```txt
identificationSelectionDomRenderer
```

should remain dedicated to corrective identification, and reflective selection UI should live elsewhere.

### Advantages

- Preserves the clarity of the existing renderer.
- Avoids weakening `IdentificationSet` semantics.
- Keeps corrective feedback behavior explicit.
- Matches current implementation reality.
- Avoids making a single renderer responsible for incompatible pedagogical contracts.

This is the conservative reading:

```txt
IdentificationSelection renderer = identify expected targets.
Reflective selection UI = collect personal/reflective selection.
```

### Risks

The risk is duplication.

Reflective selection and corrective identification both need:

- selectable items;
- single or multiple selection;
- target ids;
- selected ids;
- accessible checkbox or button behavior.

If reflective selection lives elsewhere without sharing any low-level selection surface, BHE may duplicate UI mechanics.

There is also a naming risk. If reflective selection lives in authoring only, it may never become a proper runtime/renderer capability.

### Coherence with BHE principles

Strongly coherent with the current documentation.

Prior documents repeatedly warn that:

```txt
a renderer gesture alone is misleading
```

and that the same visible shape can serve different pedagogical functions.

Keeping the corrective renderer corrective respects this.

### Where could reflective UI live?

Possible locations, without choosing an implementation:

```txt
renderer package
```

as a separate neutral selection renderer or surface;

```txt
authoring package
```

as a discovery/playground-only UI while the concept remains experimental;

```txt
shared renderer helper
```

as lower-level checkbox/list mechanics used by both corrective and reflective renderers.

The strongest version of Hypothesis B is not:

```txt
never share code
```

It is:

```txt
do not make the corrective IdentificationSelection renderer carry reflection directly.
```

## C. The problem is the renderer/evaluator contract

Hypothesis:

The renderer may be too coupled to evaluation. The real problem is not selection UI, but the way the renderer directly calls the evaluator.

### Advantages

This hypothesis explains the exact break.

In the current path, the renderer:

```txt
captures UserInput
↓
calls evaluateIdentificationSelection
↓
applies correctness classes
↓
mounts feedback
```

So even if the checkbox surface were reusable, the renderer's event flow is not neutral.

This also aligns with older architecture notes:

```txt
renderer captures interaction
evaluator judges
feedback displays
```

The renderer should not be the place where pedagogical policy becomes hard-coded beyond necessity.

### Risks

This hypothesis can tempt a premature runtime abstraction.

For example:

```txt
renderer emits input
runtime chooses result producer
runtime mounts feedback
```

That may be the eventual direction, but it is larger than the current evidence requires.

The return-loop notes previously warned against moving input capture out of renderers too early and against creating evaluator lookup too soon.

### Coherence with BHE principles

Highly coherent.

BHE wants:

```txt
UserInput
↓
BHEResult
```

to be reusable beyond renderer-local state.

The completed-path spike reinforced this: the missing piece was not a new evaluator, but a non-corrective result producer.

### Reading

This is probably the deepest architectural signal.

The current IdentificationSelection renderer is not wrong. It is simply a full corrective loop renderer. Reflective selection needs either:

```txt
a neutral selection surface
```

or:

```txt
a way to inject a different result policy
```

without pretending the identification evaluator applies.

## D. Reflective selection is not a different interaction

Hypothesis:

Reflective selection is simply:

```txt
selection
+
different result policy
```

### Advantages

This fits the evidence well.

Thinking in English does not require a new gesture:

```txt
select one or more statements
```

The difference is not mechanical. It is pedagogical:

```txt
selection as answer checking
```

versus:

```txt
selection as self-positioning / reflection
```

The existing structures already support much of this:

- `IdentificationSelectionData` can carry options;
- `IdentificationSelectionUserInput` can carry selected ids;
- `createCompletedResultFromUserInput` can produce `completed`;
- `FeedbackData.completed` can display non-corrective feedback.

### Risks

This reading can go too far.

If BHE says:

```txt
it's only selection + result policy
```

it may underplay visible learner experience.

The learner-facing copy matters:

- "Select all correct targets" is assessment.
- "Select the statements that describe you" is reflection.

The submit button matters:

- "Check" implies correctness.
- "Continue", "Submit reflection", or "See next step" implies completion.

Feedback matters:

- "Correct" validates performance.
- "Completed" acknowledges participation.

So reflective selection is not a new core interaction, but it is also not merely a result-policy toggle. It needs a neutral UI contract.

### Coherence with BHE principles

Very coherent if stated carefully:

```txt
same selection mechanics
different pedagogical contract
different result policy
different learner-facing copy
```

This preserves the principle that renderer shape does not equal pedagogical function.

### Reading

This is the best conceptual reading of Thinking in English.

Reflective selection does not require a new core object. It likely requires a clearer place for neutral selection UI and result-policy wiring.

## Quel niveau semble concerné ?

The issue is not located in one level only.

### Core

Core is mostly sufficient.

Already available:

- `BHEResult.completed`;
- `FeedbackData.completed` after the spike;
- `IdentificationSelectionUserInput` as a structural carrier;
- `IdentificationSelectionData` as a structural carrier;
- `createCompletedResultFromUserInput`.

Core concern:

```txt
low
```

No new core concept is indicated by this investigation.

### Renderer

Renderer is the main visible concern.

The current renderer is corrective. Reflective selection needs neutral learner-facing UI.

Renderer concern:

```txt
high
```

But the question is not necessarily "create a new renderer tomorrow". It is first:

```txt
can BHE separate neutral selection surface from corrective identification wiring?
```

### Evaluator

The existing evaluator should remain corrective.

Reflective selection should not call it.

Evaluator concern:

```txt
medium
```

The concern is not to change `evaluateIdentificationSelection`, but to make sure non-evaluative paths can bypass it cleanly.

### Feedback

The completed-path spike already addressed the main feedback break.

Feedback concern:

```txt
low / recently improved
```

Remaining feedback questions are mostly copy and presentation quality, not core feasibility.

### Runtime

Runtime is an emerging concern, but not the first place to act.

The broader question is:

```txt
who chooses the result policy?
```

For now, the playground demonstrates the path manually. A future runtime may eventually coordinate:

```txt
renderer emits UserInput
↓
selected result policy produces BHEResult
↓
feedback mounts
```

Runtime concern:

```txt
medium / later
```

Premature runtime abstraction remains a risk.

### Authoring

Authoring is where the distinction is currently clearest.

`RepresentationPath` already says:

```txt
Reflect Through Selection
↓
non-evaluative
↓
completed
```

Authoring concern:

```txt
high as discovery layer
```

Authoring should probably remain the place where the author sees the difference between:

```txt
selection to identify
```

and:

```txt
selection to reflect
```

## Synthesis

The strongest combined reading is:

```txt
Reflective selection is not a new core interaction.
It is selection mechanics with a reflective pedagogical contract
and a non-corrective result policy.
```

However:

```txt
the current IdentificationSelection renderer is not neutral enough
to carry that contract safely.
```

Therefore:

- do not change the identification evaluator;
- do not treat Thinking in English as corrective identification;
- do not prematurely create a universal selection architecture;
- do investigate a neutral selection surface or renderer boundary next.

## Recommendation

If we continue tomorrow, look first at:

```txt
renderer
```

specifically the boundary between:

```txt
selection UI mechanics
```

and:

```txt
corrective identification wiring
```

The most useful next investigation is not:

```txt
Should IdentificationSelection become reflective?
```

but:

```txt
Can BHE isolate a neutral selection surface
without weakening the corrective IdentificationSelection renderer?
```

This keeps the next step small and faithful to the project principles.

The likely direction to explore is:

```txt
shared selection mechanics
separate pedagogical/result policies
```

But this report does not propose an implementation.

## Current best answer

Where should neutral reflective selection UI live?

Current best answer:

```txt
Not inside the current IdentificationSelection renderer as-is.
```

It belongs near the renderer layer, because it is learner-facing UI, but it should be guided by authoring because authoring knows whether selection means:

```txt
identify correct targets
```

or:

```txt
reflect on personal strategies / habits
```

The first place to look is therefore:

```txt
renderer boundary,
with authoring-provided result policy.
```

No new core concept appears necessary at this stage.
