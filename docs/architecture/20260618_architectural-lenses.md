# BHE Architectural Lenses

## Status

Exploratory architectural document.

This document does **not** define core objects.

It captures concepts that have proven useful for observing, analyzing, discussing and designing learning activities during the BHE-BE exploration.

A concept may be valuable as an architectural lens without necessarily becoming part of the core model.

---

# Principle

During the BHE-BE exploration, several concepts repeatedly appeared useful for describing pedagogical activities.

However, stress-tests showed that many of these concepts are better understood as **lenses** than as **objects**.

A useful concept is not automatically a useful core object.

Architectural lenses help us ask better questions.

They do not necessarily belong in the runtime model.

---

# Lens 1 — Cognitive Operation

## Status

Core concept.

## Guiding Question

What mental operation is the learner performing?

## Examples

* notice
* compare
* infer
* recall
* produce
* classify

## Notes

This lens proved consistently robust across all BHE-BE analyses.

Unlike most other lenses, CognitiveOperation is already stabilized in the core because it directly describes learner activity.

---

# Lens 2 — Pedagogical Intention

## Status

Architectural lens.

## Guiding Question

Why does the author want learners to do this activity?

## Examples

* practice
* reflect
* apply
* evaluate
* diagnose

## Notes

Stress-tests suggest that pedagogical intentions are useful for understanding author goals.

However, the vocabulary remains unstable and overlaps with other dimensions such as cognitive operations, assessment and activity design.

No stabilization recommended at this stage.

---

# Lens 3 — Pedagogical Transition

## Status

Architectural lens.

## Guiding Question

What change is expected in the learner's state?

## Examples

* unaware → aware
* hesitant → confident
* implicit → explicit
* isolated knowledge → transferable knowledge

## Notes

Several BHE-BE activities appeared to target learner transformations rather than simple content acquisition.

The concept remains useful as an analytical lens but has not justified a dedicated core object.

---

# Lens 4 — Social Mode

## Status

Architectural lens.

## Guiding Question

Who is involved in the activity?

## Examples

* individual
* pair
* group
* collaborative

## Notes

This dimension appears meaningful in many learning situations.

However, it remains largely orthogonal to the core learning model and should not currently drive architectural decisions.

---

# Lens 5 — Affective Orientation

## Status

Exploratory lens.

## Guiding Question

What emotional or motivational dimension is being supported?

## Examples

* confidence
* engagement
* empathy
* motivation
* anxiety reduction

## Notes

This lens appeared occasionally during the exploration but remains difficult to define consistently.

Further observation is required.

No stabilization recommended.

---

# Lessons Learned

The BHE-BE exploration repeatedly revealed a distinction between:

* concepts useful for representation;
* concepts useful for analysis;
* concepts useful for discussion.

Not all useful concepts belong in the core.

Many concepts help us understand learning activities without requiring dedicated runtime structures.

---

# Current Position

The exploration suggests that BHE may already possess much of the representational power it needs.

Several recent discoveries appear to improve:

* interpretation;
* documentation;
* author guidance;
* architectural discussion;

rather than revealing missing core objects.

The primary role of architectural lenses is therefore:

> To help observe, analyze, discuss and design learning activities without prematurely expanding the core model.

---

# Open Question

Can some of these lenses eventually justify core concepts?

Possibly.

However, a concept should enter the core only when repeated evidence demonstrates that representation itself requires it, not merely because the concept is useful for thinking about pedagogy.
