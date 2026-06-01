# 20260601_boost_english_brick_poc_adjectives_cognitive_mapping.md

# Boost’English Brick POC — Cognitive Mapping of a Real Brick

**Date:** 2026-06-01
**Context:** BHE – Week 5
**Brick analyzed:** *Adjectives + -ed vs -ing endings* (Boost’English / Carole)

---

# Objective of the session

After several weeks of architectural exploration around pedagogical primitives, memorization, cognitive operations, and LearningSequence signals, the objective of this session was to confront BHE with a **real pedagogical brick from Boost’English**.

Rather than continuing conceptual speculation, the goal was to answer a concrete question:

> **Can BHE already represent a real pedagogical brick?**

The chosen approach was intentionally conservative:

* no coding;
* no premature architectural decisions;
* no “everything must fit” mindset.

Instead, the brick was analyzed through a single lens:

> **What cognitive work is the learner actually doing?**

This led to a decomposition not by pages or screens, but by **pedagogical moments and dominant cognitive operations**.

---

# Methodological approach

The analysis followed three principles:

### 1. Ignore the platform layer

Chamilo, videos, UI widgets, timers, downloadable PDFs and platform details were intentionally ignored.

The question was not:

> *What does the interface look like?*

but rather:

> *What happens cognitively for the learner?*

---

### 2. Analyze moments, not pages

The brick was not interpreted as:

```txt
Page 1
Page 2
Page 3
```

but rather as:

```txt
Pedagogical moments
↓
Cognitive operations
↓
Potential BHE mapping
```

---

### 3. Stay architecturally humble

The objective was **not** to immediately invent new primitives.

Signals were documented using a cautious scale:

* ✅ Already supported
* ⚠️ Adaptable quickly
* 🟡 Emerging signal
* 🔴 Real gap / unknown territory

---

# Cognitive mapping of the brick

| #  | Pedagogical moment                                     | Dominant cognitive operation                          | Candidate BHE object              | Status | Notes                                                  |
| -- | ------------------------------------------------------ | ----------------------------------------------------- | --------------------------------- | ------ | ------------------------------------------------------ |
| 1  | Sentence ↔ image matching                              | Perceptual / semantic association                     | `AssociationSet`                  | ✅      | Strong multimodal fit (`TextUnit ↔ ImageUnit`)         |
| 2  | Spotting the `-ed / -ing` pattern                      | Guided noticing / contrast detection                  | `GuidedMoment (?)`                | 🟡     | Real cognitive work: observe, compare, hypothesize     |
| 3  | Explicit explanation (`-ed = feeling`, `-ing = cause`) | Guided conceptualization / rule stabilization         | `GuidedMoment (?)`                | 🟡     | Not passive content: scaffolding + examples            |
| 4  | Dialogue (`tired / tiring`)                            | Contextual recognition / interpretation               | `IdentificationSet (?)`           | ⚠️     | Learner interprets context before selecting            |
| 5  | Adjective ↔ definition matching                        | Semantic association                                  | `AssociationSet`                  | ✅      | Concept ↔ meaning relationship                         |
| 6  | Selecting `-ed` or `-ing` in new sentences             | Controlled rule application / implicit classification | `ClassificationSet (?)`           | ⚠️     | Mental classification: feeling vs cause                |
| 7a | Phonological explanation (`-ed`, `-ing`)               | Guided phonological conceptualization                 | `GuidedMoment (?)`                | 🟡     | Guided perception-production awareness                 |
| 7b | Listening and sound noticing                           | Auditory guided noticing                              | `GuidedMoment (?)`                | 🟡     | Pattern recognition applied to pronunciation           |
| 7c | Repetition after model                                 | Imitation / guided repetition                         | `Unknown signal`                  | 🔴     | Strong language-learning signal, currently unsupported |
| 7d | Compare with model                                     | Self-adjustment / self-evaluation                     | `Unknown signal`                  | 🔴     | Listen → produce → compare loop                        |
| 8  | Final quiz                                             | Assessment / consolidation                            | Orchestration of existing objects | ✅      | No need for dedicated `AssessmentSet`                  |
| 9  | Personal production                                    | Productive reuse / personalization                    | `TransformationSet (?)`           | ⚠️     | Personal reinvestment of the rule                      |

---

# First observations

## 1. BHE already covers more than expected

A significant portion of the brick appears already representable using existing primitives:

* `AssociationSet`
* `IdentificationSet`
* `ClassificationSet`
* `TransformationSet`
* evaluators
* feedback pipeline
* scoring

This was an unexpectedly strong signal.

The initial intuition that a full Boost’English brick might be far beyond the current state of BHE was weakened considerably.

---

## 2. Same interface ≠ same cognition

Several moments appeared visually similar while hiding different cognitive work.

Example:

### Dialogue choice

```txt
tired / tiring
```

requires:

```txt
interpret context
↓
identify meaning
↓
choose
```

This aligns more closely with **Identification**.

Meanwhile:

### Rule application

```txt
bored / boring
```

in controlled examples requires:

```txt
retrieve rule
↓
classify mentally
↓
choose
```

This aligns more closely with **Classification**.

This reinforces a previous BHE signal:

> **same UI ≠ same cognition**

Similarly to:

> **same typing ≠ same cognition**

observed during memorization work.

---

## 3. Voicework revealed unexpected complexity

The pronunciation phase initially looked like a single pedagogical step.

However, decomposition revealed several simultaneous cognitive processes:

```txt
guided explanation
+
noticing
+
listening
+
imitation
+
repetition
+
self-comparison
```

This suggests that:

> **a pedagogical moment may itself contain multiple internal cognitive moments**

A potentially important future signal for BHE.

---

# Open questions

Several questions emerged naturally from the analysis:

### Is GuidedMoment real?

Or is it simply orchestration of smaller existing components?

### Are pronunciation and imitation underrepresented in BHE?

Especially for language learning contexts.

### Should some moments be composite rather than atomic?

Example:

```txt
Voicework
=
mini internal sequence
```

rather than one pedagogical primitive.

---

# Key takeaway of the session

Perhaps the strongest signal of the day was methodological.

A real pedagogical brick does not appear to be:

```txt
Page 1
Page 2
Page 3
```

but rather:

```txt
Orchestrated cognitive moments
```

This observation may prove foundational for future BHE work.

---

# Temporary conclusion

The session strongly suggests that:

> **BHE may already be capable of representing meaningful parts of a real Boost’English brick**

while simultaneously revealing:

* emerging architectural signals;
* unclear areas;
* authentic gaps grounded in real pedagogy.

This makes real pedagogical bricks particularly valuable as a future stress-test methodology for BHE evolution.
