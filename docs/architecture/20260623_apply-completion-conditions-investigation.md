# Apply Completion Conditions Investigation

Date: 2026-06-23

Status: investigation only.

Scope: no code, no playground change, no new concept.

## Context

The Author Discovery Playground currently shows:

```txt
exists completely: 4
partially exists: 0
missing pieces: 1
```

The only remaining incomplete route is:

```txt
Apply
↓
Language in Context
↓
Apply Through Situated Task
```

Previous work indicates that the missing piece is not merely a renderer or evaluator. The hard question is:

```txt
What counts as successful situated use?
```

This investigation asks what would be needed for `Apply Through Situated Task` to become a complete BHE route without pretending that a submitted response is automatically a successful situated action.

## Types de réussite située observés

### 1. Another learner can act from the response

Strongest source:

```txt
docs/architecture/20260606_wayfinding_poc.md
```

Wayfinding shows the clearest situated success condition:

```txt
Can another person use what I said?
```

The practical test is:

```txt
learner gives directions
↓
another learner follows them on a map
↓
the destination is or is not reached
```

This is not the same as linguistic correctness. Directions may be grammatical but unusable, incomplete, badly sequenced, or ambiguous.

Observed success type:

```txt
action reliability
```

### 2. The message is understandable

Sources:

- Wayfinding POC;
- Passive Voice POC;
- PedagogicalUseCatalog entry for `apply-through-situated-task`.

The catalog gives:

```txt
Passive Voice: explain how a device works so that the description is understandable.
```

This is not always mechanically checkable. It may require a reader/listener to indicate whether they understood the explanation.

Observed success type:

```txt
communicative understandability
```

### 3. The route reaches the right destination

Source:

```txt
Wayfinding
```

This is more concrete than general understandability. It can be checked against a map and a destination.

Observed success type:

```txt
observable task outcome
```

Possible evidence:

- peer marks destination reached;
- learner selects final destination;
- teacher observes route following;
- map interaction records endpoint.

### 4. The clue allows inference

Sources:

- Produce Clarification Path;
- Passive Voice guessing-game extension;
- broader corpus notes on communicative clue tasks.

The Produce clarification identifies:

```txt
Communicative Clue
↓
Apply Through Situated Task
with social or interpretive validation
```

Here success means:

```txt
another learner can infer the intended object / meaning from the clue
```

Observed success type:

```txt
interpretive success by another participant
```

### 5. The response fits a role or context

Sources:

- Apply investigation;
- Produce clarification;
- Passive Voice functional explanation;
- Wayfinding politeness and direction-giving.

Some situated responses are successful because they fit:

- speaker role;
- listener need;
- social situation;
- register;
- task goal.

Observed success type:

```txt
context fit
```

This is harder to automate unless the context has explicit criteria.

### 6. The learner completes a meaningful action

Sources:

- RepresentationPath `apply-through-situated-task`;
- `BHEResult.completed`;
- completed-path work.

The current RepresentationPath already allows:

```txt
BHEResult.completed
```

when only submission or participation is observed.

But it warns:

```txt
The submitted response may not be sufficient evidence of situated success.
```

Observed success type:

```txt
meaningful completion without validated success
```

This is valid, but it must not be confused with functional success.

## Sources corpus / documentation

### PedagogicalUseCatalog

Location:

```txt
packages/authoring/src/PedagogicalUseCatalog.ts
```

Key signal:

```txt
Frame an interaction around a credible situation and judge meaning through functional use, not only isolated answer correctness.
```

The entry already states that situated task is not an interaction shape:

```txt
A situated task is pedagogical framing, not an interaction shape.
Choose the concrete shape from the response the situation requires.
```

### RepresentationPaths

Location:

```txt
packages/authoring/src/RepresentationPaths.ts
```

The current path uses:

```txt
ContextualTypingUserInput
```

as a plausible carrier for a situated response.

Evaluation is:

```txt
context-dependent
```

and expected statuses are:

```txt
completed
success
partial
failed
```

The key warning is:

```txt
Define what observable outcome makes the action functionally successful.
The submitted response may not be sufficient evidence of situated success.
```

### Wayfinding POC

Location:

```txt
docs/architecture/20260606_wayfinding_poc.md
```

Key signal:

```txt
correct language
!=
successful communicative action
```

Wayfinding validates action reliability:

```txt
Can another learner follow the route and end up in the expected place?
```

### Pedagogical Layers Stress Test

Location:

```txt
docs/architecture/20260618_pedagogical-layers-stress-test.md
```

Key signals:

```txt
Wayfinding and the guessing game show that success can mean a correct answer, navigable route, understandable explanation, interpretable clue, or meaningful completion without correctness.
```

and:

```txt
What counts as evidence, and what is done with it?
```

This document makes clear that success criterion and evidence use are distinct from interaction shape.

### Produce Clarification

Location:

```txt
docs/architecture/20260623_produce-clarification-path-report.md
```

Relevant branches:

```txt
Situated Response
↓
Apply Through Situated Task
```

and:

```txt
Communicative Clue
↓
Apply Through Situated Task
with social or interpretive validation
```

This shows that Apply often appears when production must work for someone or something outside the answer field.

### Reflect / Action Reliability

Locations:

- `docs/architecture/20260623_reflect-investigation.md`
- `packages/authoring/src/AuthorDiscoveryPlayground.ts`

The Reflect clarification includes:

```txt
Action Reliability
```

with the example:

```txt
did my language work for another learner?
```

This is useful because it shows the review side of Apply: after a situated action, learners may reflect on whether it worked.

## Ce qui existe déjà

### Authoring route

The authoring route exists:

```txt
Apply Through Situated Task
```

It is meaningful and already documented.

### RepresentationPath

The path exists and correctly refuses premature certainty:

```txt
ContextualTypingUserInput
↓
context-dependent evaluation
↓
completed / success / partial / failed
```

### Result vocabulary

`BHEResult` can already represent:

```txt
completed
success
partial
failed
```

This is important because situated tasks may produce either:

- simple completion;
- partial functional success;
- full functional success;
- failed action.

### Feedback path

The completed-path work means `BHEResult.completed` can now map to non-corrective feedback.

So Apply can honestly record:

```txt
response submitted / action attempted
```

as `completed`.

### Existing specific complete routes

Some things that look like Apply are already better handled by more specific complete routes:

- applying stable categories -> `ClassificationSet`;
- applying source-to-target operations -> `TransformationSet`;
- recalling a target -> `MemorizationTypingRecall`;
- reflective self-positioning -> reflective selection completed.

This matters because `Apply Through Situated Task` should not absorb every case of “use knowledge”.

## Ce qui manque

### Not only a renderer

A renderer could capture a situated response:

```txt
prompt
↓
typed answer
↓
completed
```

But that would only prove:

```txt
the learner submitted something
```

It would not prove:

```txt
the response worked in the situation
```

Therefore a simple renderer is not enough.

### Not only an evaluator

A general evaluator would be too broad because situated success differs by task:

- map route reached;
- explanation understood;
- clue interpreted;
- response fits role/context;
- partner can act.

A single automatic evaluator would either be too weak or too dishonest.

### Result policy

BHE needs to distinguish:

```txt
completed attempt
```

from:

```txt
validated situated success
```

The current `RepresentationPath` already gestures toward this, but the authoring route does not yet make the distinction visible enough.

### Task evidence model

The strongest missing piece is an evidence model, not a new pedagogical concept.

The system needs a minimal way to say:

```txt
What evidence counts here?
Who or what provides it?
What result status may it produce?
```

Possible evidence sources:

- automatic check;
- peer validation;
- teacher validation;
- learner self-report;
- observable task outcome;
- simple submission only.

### Runtime / social loop

Some Apply tasks require another participant.

Wayfinding is the clearest case:

```txt
speaker gives directions
↓
peer follows route
↓
peer or system indicates destination reached
```

This is a social/runtime loop, not just a renderer.

However, not every Apply task requires full social runtime. A V0 could document or capture evidence manually.

## Options V0 possibles

### Option 1 — Submission-only completed

Path:

```txt
situated prompt
↓
learner response
↓
BHEResult.completed
```

Advantages:

- very small;
- uses existing completed path;
- honest if labelled as completion only.

Risks:

- does not validate situated success;
- can make Apply look complete while avoiding the real question.

Verdict:

Useful for “attempt recorded”, not sufficient for complete Apply.

### Option 2 — Renderer + completed policy

Path:

```txt
situated response renderer
↓
ContextualTypingUserInput
↓
createCompletedResultFromUserInput
```

Advantages:

- similar to reflective typing;
- easy to explain;
- enough when the task only asks for participation.

Risks:

- still does not answer “did it work?”;
- would conflict with the principle:

```txt
Ne pas faire semblant qu’une réponse située est validée simplement parce qu’elle a été tapée.
```

Verdict:

Not enough for situated success.

### Option 3 — Manual teacher validation

Path:

```txt
learner response
↓
teacher validates success / partial / failed
↓
BHEResult
```

Advantages:

- honest;
- works for open situated tasks;
- avoids premature automatic evaluation.

Risks:

- requires a validation UI or workflow;
- starts to imply runtime/teacher tooling;
- may be outside current playground scope.

Verdict:

Promising, but not just a renderer.

### Option 4 — Peer validation

Path:

```txt
learner response
↓
peer acts / interprets
↓
peer indicates outcome
↓
BHEResult
```

Advantages:

- fits Wayfinding and clue games;
- preserves the social nature of situated success.

Risks:

- requires participant roles;
- requires multi-user or simulated peer flow;
- likely runtime/social loop.

Verdict:

Pedagogically strong, architecturally larger.

### Option 5 — Minimal situated evidence record

Path:

```txt
situated response
↓
evidence record:
  source
  criterion
  observed outcome
↓
BHEResult.completed | success | partial | failed
```

Advantages:

- captures the missing distinction;
- does not require automatic evaluation;
- can support teacher, peer, learner, or system evidence;
- small enough to explore before architecture.

Risks:

- may become a new concept if stabilized too soon;
- needs careful naming;
- still requires UI to collect evidence.

Verdict:

Best candidate for an honest V0, but should be investigated before implementation.

## Risques

### False completion

The biggest risk is marking Apply complete because a learner typed something.

That would flatten:

```txt
attempted response
```

into:

```txt
successful situated use
```

### Overbuilding a social runtime

The opposite risk is building a peer/teacher validation architecture too early.

Wayfinding suggests a social loop, but BHE should not jump directly to multi-user runtime from one route.

### Generic evaluator illusion

A universal “situated task evaluator” would likely be dishonest.

Situated success depends on task-specific evidence.

### Renderer overreach

A renderer should not decide functional success unless the evidence is visible within the interaction.

For example, a map renderer might observe a destination. A text renderer alone usually cannot.

### Concept inflation

Names like:

```txt
SituatedEvidence
ActionReliability
PeerValidation
```

may be useful lenses, but should not be stabilized from this investigation alone.

## Recommandation

Verdict:

```txt
C. Apply exige un modèle d’évidence située minimal
```

Explanation:

Apply probably does not need a new core pedagogical concept, but it does need a minimal way to represent evidence of situated use.

The missing bridge is:

```txt
situated response
↓
evidence of use
↓
BHEResult
```

The current project already supports:

- authored intention;
- contextual response carrier;
- completed result;
- evaluated result statuses;
- feedback.

But it does not yet clearly represent:

```txt
what evidence proves that the situated action worked
```

This is why a renderer alone is insufficient.

## Practical next step

Do not mark Apply complete yet.

Do not build a full social/runtime loop yet.

The next healthy step should be a documentary or playground-only exploration of evidence conditions:

```txt
For this situated task,
what counts as evidence?
who provides it?
what result can it produce?
```

A possible V0 question for the author could be:

```txt
How will we know the action worked?
```

Possible answers:

- learner submitted a meaningful response -> `completed`;
- another learner could act from it -> peer-validated `success / partial / failed`;
- teacher judged it understandable -> teacher-validated result;
- system observed the right outcome -> automatic result;
- learner self-reported usefulness -> reflective completed result.

This would preserve honesty without forcing a premature architecture.

## Final conclusion

Apply should remain:

```txt
missing pieces
```

for now.

Not because BHE cannot carry a situated response, but because a complete Apply route requires more than input capture.

The missing piece is the smallest honest answer to:

```txt
What counts as successful situated use?
```

Until that evidence condition is explicit, completing the route would be premature.
