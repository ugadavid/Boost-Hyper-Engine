# BHE Authoring - Experimental

`packages/authoring` is an experimental author-facing aid. It is not part of
the BHE core model or runtime.

Its purpose is to improve discoverability by connecting:

- what an author wants learners to do;
- possible interaction shapes;
- cognitive operations that may be involved;
- situated examples observed in the BHE-BE laboratory.

The package starts with a small static `pedagogicalUseCatalog` and an
experimental set of `representationPaths`. A path documents one plausible
translation into existing BHE vocabulary. It does not select renderers, create
pedagogical objects, evaluate input, or guarantee that every suggested use has
a complete runtime path.

The guiding observation is:

```txt
The engine may already represent more than authors naturally discover.
```

## Usage

```ts
import {
  pedagogicalUseCatalog,
  representationPaths,
  type PedagogicalUse,
  type RepresentationPath
} from "./src/index.js";

const reflectiveUses: PedagogicalUse[] = pedagogicalUseCatalog.filter(
  (use) => use.pedagogicalIntentions.includes("reflect")
);

const reflectiveSelectionPath: RepresentationPath | undefined =
  representationPaths.find(
    (path) => path.pedagogicalUseId === "reflect-through-selection"
  );
```

## Experimental Representation Paths

`RepresentationPath` was chosen because the prototype records a plausible
decision trail. It is not an automatic mapping and does not generate a BHE
representation.

Each path makes these authoring decisions visible:

- suggested interaction shape and closest existing interaction-data carrier;
- expected existing `UserInput` interface and response meaning;
- evaluation policy and evaluator, when one already fits;
- expected `BHEResult` statuses and score policy;
- author notes, including semantic mismatches and unresolved choices.

The initial paths cover reflection and diagnosis through selection, recall and
reflection through typing, and application through a situated task.

## Author Discovery Playground V0.2

The package also contains a small local playground:

```txt
packages/authoring/author-discovery-playground.html
```

After running the project build, open the HTML file in a browser. It lets an
author move through:

```txt
Intent
↓
Pedagogical Use
↓
RepresentationPath
↓
BHE Representation
↓
Real Example
```

This is not an editor. It does not save, create activities, choose renderers,
or call evaluators. It is a visual discovery aid for the experimental authoring
layer.

V0.1 adds a small coverage view and a `Representation Confidence` badge for
each displayed pedagogical use:

- `READY`: documented path, identified BHE concepts, and a real corpus example.
- `PLAUSIBLE`: the path seems representable, but some formalization or corpus
  validation is still missing.
- `MISSING BRIDGE`: the author need is visible, but no explicit bridge to BHE
  is documented yet.

V0.2 adds one isolated `AuthorOrchestrationPath` for `Explore Before The Rule`,
using the Countable / Uncountable `I Learn` corpus signal. It is a composed
authoring path:

```txt
Observe
↓
Compare
↓
Infer
↓
Stabilize
↓
Practice
```

This path is not a new core object. Some steps map to existing BHE vocabulary;
others remain explicitly authoring-only.

## Initial Catalog

The first entries cover:

1. reflection through selection;
2. diagnosis through selection;
3. recall through typing;
4. reflection through typing;
5. application through a situated task;
6. practice through controlled interaction;
7. exploration before an explicit rule.

These entries are documentary guidance expressed as importable data. Their
strings are intentionally not tied to core unions or registries.

## Boundaries

- Experimental and reversible.
- Type-only references to current core result and interaction vocabulary.
- No runtime orchestration.
- No renderer or evaluator lookup.
- A minimal static UI only for discovery.
- No claim that this catalog is a stable taxonomy.
- No claim that every suggestion is already implemented end to end.

The catalog should make hidden possibilities visible while preserving the
specialized BHE pipelines that already exist.
