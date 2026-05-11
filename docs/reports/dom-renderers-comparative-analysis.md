# DOM Renderers Comparative Analysis

This report observes the current DOM renderer proof-of-concepts:

- `associationFlashcardsDomRenderer`
- `classificationQcmDomRenderer`
- `gapFillTypingDomRenderer`
- `inferenceTypingDomRenderer`

No architecture is proposed as final here. The goal is to identify emerging
patterns.

## 1. Common Ground

### DOM Structure

All renderers create a root `section` with:

- a BHE-specific class;
- `dataset.objectId`;
- a title derived from `object.metadata.title ?? object.metadata.id`;
- child elements created with native DOM APIs.

Each renderer maps `content.core` into a concrete DOM structure:

- association -> flashcard buttons;
- classification -> QCM choices;
- gap-fill -> contextual text with inputs;
- inference -> context, evidence, prompts, inputs, textarea.

### Containers

Each renderer creates its own local container:

- `.bhe-flashcards`
- `.bhe-qcm`
- `.bhe-gap-fill`
- `.bhe-inference`

This confirms a useful convention: renderer roots are interaction-specific, not
global application shells.

### Local State

State stays inside DOM nodes and closures:

- flashcards use `aria-expanded`, `.is-flipped`, and `hidden`;
- QCM uses selected button classes and feedback text;
- gap-fill stores input and feedback elements in local `Map`s;
- inference stores local inputs and checks them on click.

No renderer uses global state.

### Events

All interaction is event-driven with native DOM:

- click on flashcard;
- click on QCM choice;
- click on `Check` for gap-fill;
- click on `Check` for inference.

### Feedback

Feedback is immediate and local:

- card answer appears/disappears;
- QCM shows correct/incorrect;
- gap-fill shows correct/incorrect per blank;
- inference shows accepted/not accepted plus justification presence.

### Accessibility Patterns

Current accessibility is basic but present:

- flashcards use buttons and `aria-expanded`;
- QCM uses buttons and `aria-pressed`;
- feedback uses `aria-live="polite"` in QCM, gap-fill, inference;
- inputs have labels or `aria-label`.

This is not complete accessibility yet, but the direction is right.

### Minimal Styles

Styles currently live in preview HTML files, not in renderer modules. This keeps
the renderers focused on DOM structure and behavior.

### Validation Logic

Validation is intentionally minimal:

- association checks binary association shape and entry existence;
- classification checks the selected category id;
- gap-fill compares normalized text with accepted answers;
- inference compares normalized text with expected/accepted inferences and only
  checks whether justification is present.

These are POC-level checks, not full scoring engines.

## 2. What Depends On What

### Depends On PedagogicalObject

The object determines:

- `pedagogicalType`;
- metadata title/id;
- `content.core` structure;
- domain-specific data shape.

Examples:

- `AssociationSetCore.entries` and `associations`;
- `ClassificationSetCore.categories` and `items`;
- `GapFillSetCore.context` and `blanks`;
- `InferenceSetCore.context`, `evidence`, and `prompts`.

### Depends On InteractionMode

The interaction mode determines the interaction shape:

- flashcards -> show/hide answer;
- qcm -> choose among options;
- typing -> input answers and check.

### Depends On Renderer

The renderer decides:

- DOM structure;
- event handling;
- local state representation;
- feedback phrasing;
- CSS class names;
- how much of `content.core` is used.

## 3. Emerging Patterns

### Interaction-Centered Renderers

Renderers are not generic object viewers. They are centered on a pair:

```txt
PedagogicalType + InteractionMode
```

This is visible in names like:

- `associationFlashcardsDomRenderer`
- `classificationQcmDomRenderer`
- `gapFillTypingDomRenderer`
- `inferenceTypingDomRenderer`

### Contextual Renderers

Gap-fill and inference are contextual: they render a context first, then embed or
attach learner actions.

Association and classification are more item-based.

### Local Feedback

Feedback appears near the learner action:

- card itself;
- QCM feedback below choices;
- per-blank feedback;
- per-prompt inference feedback.

### PedagogicalObject To DOM Mapping

The current mapping is direct:

```txt
object.content.core -> DOM nodes
```

There is no adapter layer yet.

### Minimal Validation

Validation is embedded in the renderer. This is acceptable for POCs, but it will
become a pressure point if scoring, analytics, or adaptive routing need the same
logic.

### Separation Of Core And UI

The core pedagogical types remain UI-free. DOM behavior lives only in
`packages/renderer`.

This separation is the strongest architectural win so far.

## 4. Potential Repetitions

Repeated helpers are emerging:

- create unavailable/message section;
- create root section with `dataset.objectId`;
- create title;
- set feedback status;
- normalize text answers;
- create buttons;
- create labels/inputs;
- toggle `is-correct` / `is-incorrect`;
- type guards by `pedagogicalType`.

These are real repetitions, but still small.

## 5. What Not To Abstract Too Early

Do not abstract yet:

- a generic component system;
- a generic form engine;
- a universal feedback engine;
- a universal validation system;
- a global state model;
- CSS architecture;
- renderer lifecycle;
- adapter layer.

The examples are still too few and too uneven. Premature abstraction would
freeze weak assumptions.

## 6. Architectural Reflection

### Possible Direction

The current shape suggests a possible future:

```txt
PedagogicalObject -> Adapter -> InteractionRenderer
```

An adapter could translate `AssociationSet`, `ClassificationSet`, `GapFillSet`,
or `InferenceSet` into an interaction-ready view model.

For example:

- association -> flashcard pairs;
- classification -> question + choices;
- gap-fill -> text segments + blanks;
- inference -> context + evidence + prompts.

### Evidence For This Direction

Current renderers already do adapter-like work internally:

- association builds `entriesById`;
- gap-fill slices context into text and inputs;
- inference prepares prompt forms and evidence lists;
- classification selects an item and maps categories to choices.

This adapter logic may eventually deserve its own layer.

### Risks Of Premature Abstraction

The risk is creating a generic adapter API before knowing enough about:

- multi-item rendering;
- scoring;
- feedback granularity;
- accessibility needs;
- adaptive routing integration;
- renderer lifecycle;
- authoring constraints.

For now, the renderer-specific logic is still valuable learning material.

## 7. Possible Next Steps

Without implementing them now:

- Add a small test suite for renderer selection and basic DOM output.
- Add one preview index page linking all DOM previews.
- Document CSS class naming conventions.
- Add a fifth DOM renderer only if it reveals a new interaction pattern.
- Extract only the smallest repeated helper if duplication becomes painful.
- Explore an adapter layer after one or two more renderer POCs.
- Decide later whether validation belongs in renderers, core evaluators, or both.
