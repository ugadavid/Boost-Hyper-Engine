# TransformationSet Interaction Exploration

This report opens a cognitive and interactional exploration of `TransformationSet` before any implementation work. The goal is to understand what "transforming" means in BHE, rather than treating it as generic typing.

## 1. Pedagogical Nature Of TransformationSet

To transform means to take an explicit source and apply a deliberate change to produce a target.

Possible transformation cases include:

- transforming a grammatical form;
- transforming a verb tense;
- transforming gender or number;
- reformulating a sentence;
- transforming register;
- transforming affirmative into negative;
- transforming a language form in intercomprehension or partial translation;
- transforming syntactic structure;
- transforming point of view.

The central question is:

> What distinguishes transformation from simple production?

Simple production can start from a prompt or a blank. Transformation starts from a source. The learner must preserve a relation between source and target while applying a specific operation.

For example:

- `actif -> active` changes gender or agreement;
- `I eat -> I ate` changes tense;
- `Tu viens ? -> Est-ce que tu viens ?` changes syntactic form;
- `Ce texte est familier -> Ce texte est soutenu` changes register;
- `ital. importante -> fr. important/importante` can involve intercomprehension and morphological transfer.

In all cases, the source matters. The target is not just an answer; it is the result of a transformation process.

## 2. Cognitive Nature

Transformation implies:

- explicit source;
- operation applied;
- source -> target relation;
- rule or strategy;
- observable change.

Compared with other BHE objects:

### GapFill

GapFill follows:

```txt
absence -> completion
```

The learner fills a missing part inside a context. The source is the surrounding context, not a single form to modify.

### Inference

Inference follows:

```txt
clues -> interpretation
```

The learner proposes or justifies meaning. A typed answer may appear, but the central operation is reasoning.

### Identification

Identification is target detection. The learner recognizes or selects something already present.

### Sequence

Sequence is ordering. The learner arranges elements according to position, adjacency, chronology, logic, or narrative.

### Classification

Classification is categorization. The learner assigns items to categories.

### Association

Association is relation building. The learner groups or relates elements that belong together.

The working hypothesis is:

> transformation = deliberate change applied to something explicit

This hypothesis is useful because it keeps Transformation from collapsing into GapFill or generic typing.

## 3. Natural Interaction Modes

### Typing Production

The learner sees a source and types the transformed target.

Accessibility is strong because native inputs are easy to use. Pedagogically, this is direct and productive. The risk is reducing Transformation to final-answer matching unless the source -> target relation remains explicit in the data and feedback.

### QCM Transformation Recognition

The learner chooses the correct transformed form among options.

This is easier to evaluate and useful for recognition, but less productive. It can be a good V0 if the goal is to validate the transformation relation before asking the learner to produce.

### Drag-And-Transform Patterns

The learner manipulates parts of a source to create a target.

This could fit syntax transformation or word-order changes, but it risks becoming a complex interaction engine. It is not a good first step.

### Flashcards

The learner sees source on one side and target on the other.

This supports rehearsal but does not test transformation unless paired with recall or production.

### Before/After Pairing

The learner matches source forms with transformed forms.

This is useful for recognizing transformation relationships. It may overlap with AssociationSet, but the cognitive operation differs because the relation is directional and rule-based.

### Guided Transformation

The learner receives a source, a transformation instruction, and possibly scaffolds.

This is pedagogically rich. It can expose the transformation operation clearly, but should probably come after a simpler V0.

### Scaffolded Transformation

The learner performs the transformation in stages.

This could support complex grammar, syntax, register, or intercomprehension tasks. It is valuable but too large for the first pass.

## 4. Evaluation Tensions

Transformation evaluation raises several questions.

Exact transformation:
Some tasks have one expected answer. Exact matching can work for V0.

Multiple valid outputs:
Many transformations allow variants. `expected` already supports one string, but future V0 may need accepted answers, comparable to GapFill.

Acceptable variants:
Variants may differ by register, punctuation, agreement, optional pronouns, or language variety.

Source-target relation:
The evaluator should not only know whether the final answer matches. It may need to know which source was transformed and what operation was expected.

Deterministic V0:
A deterministic V0 is possible if it uses explicit expected answers or accepted answers. That is the safest first evaluator.

Feedback on process vs result:
The central question is:

> Do we evaluate the result or the transformation itself?

For V0, evaluating the result is acceptable. But the model should preserve enough source / instruction / transformation type data to later explain the process.

Partial correctness:
Partial correctness could matter if a learner changes the correct tense but misses agreement, or preserves meaning but uses the wrong register. This is important, but probably not V0.

## 5. Architectural Tensions

Transformation likely needs transformation-specific InteractionData.

A generic typing data shape would hide the source -> target relation. A healthier shape would probably preserve:

- source;
- instruction;
- transformationType;
- expected output;
- accepted outputs;
- hint / feedback;
- item id.

Semantic UserInput matters.

A future input should not merely be "typedAnswers". It should express transformation attempts, probably keyed by transformation item id.

Hybrid recognition / production is plausible.

Transformation may need both:

- recognition mode: choose or match the correct transformed form;
- production mode: type the transformed form.

Productive + interpretive overlap is possible.

Intercomprehension transformation can involve form transformation and interpretive transfer at the same time. This means Transformation can border Inference, but should not become Inference unless justification or plausibility becomes central.

Weak signals:

- transformation wants directional data;
- transformation wants operation labels;
- transformation feedback may need process vocabulary;
- transformation may need both recognition and production pathways;
- transformation is likely not just GapFill without context.

## 6. What Not To Do Now

Do not create a renderer now.

Do not create an evaluator now.

Do not create a generic typing engine.

Do not introduce NLP or LLM scoring.

Do not create a registry.

Do not add multimodal Transformation yet.

Do not refactor GapFill to make room for Transformation.

Do not collapse Transformation into GapFill just because both may use typing.

## 7. Recommendation

Recommendation: **B, with a later hybrid path**.

The next healthy step is a transformation-specific InteractionData exploration.

Before coding a renderer or evaluator, BHE should define the minimal data shape needed to preserve the transformation relation:

```txt
source
-> instruction / transformationType
-> expected target
-> accepted variants
```

After that, a console-only evaluator POC can test deterministic result checking. Recognition-first QCM can also be explored later, but starting with the data shape is safer because it protects the cognitive operation from being flattened into generic typing.

In short:

```txt
TransformationSet
-> transformation-specific InteractionData
-> semantic UserInput
-> deterministic V0 evaluator
-> renderer later
```

The key architectural decision is to treat Transformation as a transformation-specific productive object, not as ordinary text input.
