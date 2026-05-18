# Sequence scoring strategies comparison

## Scope

The current `evaluateSequenceReorder` POC scores exact positions only, while observing adjacency in `details`.

The key signal is now clear:

> A sequence can have zero exact positions correct while still preserving meaningful adjacent pairs.

This report compares possible scoring strategies before any renderer is created.

## 1. Exact position scoring

### Principle

Each item receives a point if it appears in its expected absolute position.

Example:

```txt
expected: A B C D
actual:   A C B D
score:    1 0 0 1 = 2/4
```

### Advantages

- Simple to explain.
- Simple to implement.
- Produces clear `score` / `maxScore`.
- Works well for short, fixed sequences.
- Easy to map into `BHEResult`.
- Easy to debug in console POCs.

### Limits

- Can be harsh.
- Does not recognize correct local order if the whole block is shifted.
- Does not distinguish between "almost correct" and "structurally wrong" when exact positions fail.

Example:

```txt
expected: A B C D
actual:   D A B C
```

Exact score is `0/4`, but `A B` and `B C` remain correct adjacent pairs.

### Adapted pedagogical cases

- short procedures;
- fixed workflows;
- chronological tasks with strict positions;
- beginner activities where the expected order is unambiguous.

### Risks

- Learners may receive "failed" even when they preserve meaningful local structure.
- Feedback can feel unfair for narrative, dialogue, or text reconstruction tasks.

## 2. Adjacency scoring

### Principle

Score correct neighboring pairs rather than absolute positions.

Example:

```txt
expected pairs: A-B, B-C, C-D
actual: D A B C
correct pairs: A-B, B-C = 2/3
```

### Why it matters

Adjacency captures local order:

- question -> answer;
- cause -> consequence;
- setup -> continuation;
- process step -> next step.

This is especially valuable for:

- phrase reconstruction;
- narrative ordering;
- dialogue ordering;
- procedures;
- text reconstruction.

### Advantages

- More sensitive to local coherence.
- Recognizes meaningful partial structure.
- Useful when blocks are shifted but internally correct.
- Can produce richer feedback.

### Limits

- Can miss global errors.
- A sequence can preserve local pairs but start in the wrong place.
- It may over-reward shifted blocks if used alone.

### Risks if used alone

Adjacency-only scoring may treat an internally coherent but globally misplaced block as too correct.

For strict chronological or procedural tasks, this may be misleading.

## 3. Distance-based scoring

### Principle

Measure how far each item is from its expected position.

Example:

```txt
expected position of A: 1
actual position of A: 3
distance: 2
```

Scoring could reward smaller distances.

### Interest

Distance scoring captures "almost in the right place".

It may suit:

- approximate ordering;
- timelines;
- activities where near placement is meaningful;
- long sequences where exact position is too strict.

### Complexity

Distance scoring requires a chosen formula:

- subtract total distance from max score;
- normalize by sequence length;
- cap penalties;
- treat near moves differently from far moves.

The choice is not pedagogically neutral.

### Feedback readability

Distance can produce feedback like:

- "this item should be earlier";
- "this item is close";
- "this item is far from its expected position".

But the score itself may be harder to explain to learners.

## 4. Block / subsequence scoring

### Principle

Detect correct ordered blocks or subsequences, even if the full sequence is not correct.

Example:

```txt
expected: A B C D E
actual:   D A B C E
block:    A B C
```

### Interest

Block scoring is useful for:

- text reconstruction;
- narrative ordering;
- process/workflow reconstruction;
- dialogue turns;
- activities with meaningful chunks.

It can identify that a learner understands part of the structure.

### Complexity

Block scoring quickly becomes more complex:

- What is a block?
- Minimum block length?
- Are overlapping blocks allowed?
- Are blocks scored by length?
- Are shifted blocks acceptable?
- Should blocks be predefined or discovered?

This may become valuable later, but it is too rich for V0.

## 5. Mix scoring

A future evaluator could combine:

- exact position;
- adjacency;
- distance;
- block/subsequence.

Possible model:

```txt
score = exact position score
details = adjacency + distance + blocks
```

or later:

```txt
score = weighted exact + adjacency + distance
```

### Why this is tempting

Mixed scoring can be more pedagogically fair.

It can distinguish:

- fully correct;
- locally coherent;
- nearly correct;
- globally wrong.

### Why it should wait

Mixed scoring introduces policy decisions:

- weights;
- thresholds;
- status mapping;
- feedback priority;
- learner-facing explanations.

Those decisions should be driven by real Sequence activities, not invented in advance.

## 6. Impact on BHEResult.details

Even if not scored, several signals should remain in `details`.

For V0, useful details are:

- `expectedOrder`;
- `actualOrder`;
- `exactPositionResults`;
- `adjacentPairResults`.

Future possible details:

- distance per item;
- total distance;
- correct blocks;
- longest correct subsequence;
- missing item ids;
- extra item ids;
- duplicate item ids.

The important principle:

> `score` can stay simple while `details` preserve richer pedagogical signals.

This keeps AdaptiveRouting and Feedback future-ready without forcing complex scoring immediately.

## 7. Recommendation for V0

Recommendation: **B. exact position scored + adjacency observed**.

This should remain the strategy for the first Sequence renderer.

Reason:

- exact position gives a clear V0 score;
- adjacency captures the main signal discovered by the POC;
- `BHEResult.details` can preserve richer observations;
- feedback can later use adjacency without changing the score;
- the renderer can stay focused on interaction, not scoring policy.

Do not implement adjacency scoring yet.

Do not implement mixed scoring yet.

Do not create a generalized sequence scoring engine yet.

The next healthy step is a simple text-only Sequence reorder renderer or an accessibility-first interaction note, using the current evaluator unchanged.
