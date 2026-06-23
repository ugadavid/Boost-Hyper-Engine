# Playground Routing Visualization Report

Date: 2026-06-23

Status: Experimental authoring visualization

Scope: `packages/authoring`

## Context

The survey documented in:

```txt
docs/architecture/20260623_author-intent-routing-survey.md
```

showed that the Author Discovery Playground should not behave like a flat menu.

The key finding was:

```txt
Author intents are not equal routing units.
```

Some intents are close to an existing BHE representation. Others are broad author intentions that need a clarification question before they can be routed toward BHE.

## What was added

A new visible section was added to the playground:

```txt
Author Intent Routing Map
```

It lists the seven current author intents:

* Notice
* Reflect
* Recall
* Apply
* Classify
* Produce
* Compare

For each intent, the map displays:

* routing type;
* first implicit author question;
* main BHE direction;
* confidence level.

The map is clickable: selecting an intent in the routing map selects the same intent in the existing playground flow.

## Routing types shown

### Self-routing

The intent naturally points toward a clear BHE route.

Current case:

```txt
Recall
↓
Recall Through Typing
↓
MemorizationTypingRecall
```

### Clarification-routing

The intent is too broad to route directly. It needs a question before BHE structures become visible.

Current cases:

```txt
Compare
↓
What are learners comparing?
```

```txt
Reflect
↓
What are learners reflecting on?
```

```txt
Produce
↓
What kind of production is expected?
```

### Hybrid

The intent sometimes points toward a direct route, but often depends on pedagogical context.

Current cases:

```txt
Notice
↓
What should noticing lead to?
```

```txt
Apply
↓
What situation should the learner act in?
```

```txt
Classify
↓
Are the categories already stable?
```

## Why all intents are not treated the same

The playground now distinguishes between:

* an author intent that is already close to an interaction and data structure;
* an author intent that is an incomplete pedagogical question;
* an author intent that can be direct or indirect depending on the learning situation.

This matters because a flat intent menu hides the main authoring problem:

```txt
The author may know what they want learners to do,
but not yet know what kind of BHE route that implies.
```

The routing map makes that uncertainty visible instead of pretending that every intent immediately maps to a Pedagogical Use.

## How the map helps the author

The visualization gives the author a quick answer to:

```txt
Am I choosing a direct path,
or am I choosing an intention that needs clarification?
```

It also helps explain why Compare and Reflect open clarification panels while Recall goes directly to a Pedagogical Use.

In other words, the playground now communicates its own routing behavior.

## Limits

The map is still authoring-only.

It does not create:

* a new core concept;
* a new runtime structure;
* a new renderer;
* a new evaluator;
* a persisted routing model.

The confidence levels are documentary signals, not runtime guarantees.

`Produce` is marked as clarification-routing, but no dedicated clarification panel has been implemented yet. The map therefore exposes a likely next authoring gap without solving it.

## How to access the visualization

Open:

```txt
packages/authoring/author-discovery-playground.html
```

The new section appears near the top of the page, after Author Coverage and before the main three-column playground flow.

Clicking an intent card in the map selects that intent in the playground.

## Files changed

```txt
packages/authoring/src/AuthorDiscoveryPlayground.ts
packages/authoring/src/index.ts
packages/authoring/author-discovery-playground.html
docs/architecture/20260623_playground-routing-visualization-report.md
```

## Architectural note

This visualization does not stabilize a new BHE architecture.

It materializes an authoring observation:

```txt
Author Intent
↓
routing behavior
↓
clarification or direct path
↓
BHE
```

The playground is becoming less a menu and more an author-facing routing surface.
