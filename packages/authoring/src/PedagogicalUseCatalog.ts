import type { PedagogicalUse } from "./PedagogicalUse.js";

/**
 * Small experimental catalog connecting author needs to possible interaction
 * shapes. Entries guide discovery; they do not select runtime components.
 */
export const pedagogicalUseCatalog: readonly PedagogicalUse[] = [
  {
    id: "reflect-through-selection",
    label: "Reflect through selection",
    authorQuestion: "Do you want learners to notice or describe something about themselves?",
    description:
      "Use selectable statements to support reflection or self-observation without treating the response as correct or incorrect.",
    pedagogicalIntentions: ["reflect", "self-position", "survey"],
    suggestedInteractionShapes: ["selection", "qcm"],
    cognitiveOperations: ["notice", "reflect", "compare"],
    nonEvaluative: true,
    examples: [
      "Thinking in English: report whether mental translation happens before speaking.",
      "Memorising Vocabulary: select current vocabulary-learning habits."
    ],
    notes:
      "The selection structure is neutral even when nearby QCM and Identification examples use corrective evaluation."
  },
  {
    id: "diagnose-through-selection",
    label: "Diagnose through selection",
    authorQuestion: "Do you need a lightweight picture of the learner's starting point?",
    description:
      "Use selected options to surface prior knowledge, habits, confidence, or support needs before choosing what follows.",
    pedagogicalIntentions: ["diagnose", "position", "prepare"],
    suggestedInteractionShapes: ["selection", "qcm"],
    cognitiveOperations: ["identify", "notice", "reflect"],
    nonEvaluative: true,
    examples: [
      "Wayfinding: use an initial check to choose a more or less supported pathway.",
      "Thinking in English: surface speaking habits before guided oral practice."
    ],
    notes:
      "Diagnosis describes how evidence is used. It does not require a grade and should not automatically imply success or failure."
  },
  {
    id: "recall-through-typing",
    label: "Recall through typing",
    authorQuestion: "Do you want learners to retrieve an answer before seeing it?",
    description:
      "Present a cue and ask for a short typed response so retrieval, rather than recognition or reveal alone, becomes visible.",
    pedagogicalIntentions: ["recall", "practice", "consolidate"],
    suggestedInteractionShapes: ["typing"],
    cognitiveOperations: ["produce"],
    examples: [
      "Memorization typing recall: retrieve a vocabulary target from a cue.",
      "Vocabulary practice: recall a word before comparing it with the expected target."
    ],
    notes:
      "Keep recall distinct from GapFill completion and Transformation, even though all three use typing."
  },
  {
    id: "reflect-through-typing",
    label: "Reflect through typing",
    authorQuestion: "Do you want learners to put a strategy, opinion, or realization into words?",
    description:
      "Use open text to capture a personal explanation or reflection when deterministic answer matching would be inappropriate.",
    pedagogicalIntentions: ["reflect", "explain", "self-position"],
    suggestedInteractionShapes: ["typing"],
    cognitiveOperations: ["reflect", "produce", "selfAdjust"],
    nonEvaluative: true,
    examples: [
      "Thinking in English: describe when translation happens and how it affects speaking.",
      "Memorising Vocabulary: explain which learning strategy felt useful and why."
    ],
    notes:
      "A text field does not imply exact matching. Reflective typing may produce completion and informational continuation rather than correction."
  },
  {
    id: "apply-through-situated-task",
    label: "Apply through a situated task",
    authorQuestion: "Do you want learners to use knowledge so that an action succeeds in context?",
    description:
      "Frame an interaction around a credible situation and judge meaning through functional use, not only isolated answer correctness.",
    pedagogicalIntentions: ["apply", "communicate", "transfer"],
    suggestedInteractionShapes: ["typing", "selection", "drag-drop", "reorder"],
    cognitiveOperations: ["identify", "produce", "transfer"],
    examples: [
      "Wayfinding: give directions that another learner can follow on a map.",
      "Passive Voice: explain how a device works so that the description is understandable."
    ],
    notes:
      "A situated task is pedagogical framing, not an interaction shape. Choose the concrete shape from the response the situation requires."
  },
  {
    id: "practice-through-controlled-interaction",
    label: "Practice through controlled interaction",
    authorQuestion: "Do learners need structured repetition with clear boundaries?",
    description:
      "Use a constrained interaction to rehearse a form, relation, category, order, or response with feedback appropriate to the practice goal.",
    pedagogicalIntentions: ["practice", "reinforce", "consolidate"],
    suggestedInteractionShapes: ["qcm", "typing", "drag-drop", "reorder", "flashcards"],
    cognitiveOperations: ["identify", "classify", "transform", "produce"],
    examples: [
      "Question Forms: practise grammatical variation through structured exercises.",
      "Passive Voice: identify and transform active and passive forms."
    ],
    notes:
      "Controlled practice may be scored, lightly checked, or simply completed. The interaction shape does not decide the evaluation policy."
  },
  {
    id: "explore-before-rule",
    label: "Explore before the rule",
    authorQuestion: "Could learners observe and test a distinction before receiving its explicit rule?",
    description:
      "Present examples and lightweight prompts that support noticing, comparison, and inference before conceptual stabilization.",
    pedagogicalIntentions: ["explore", "discover", "understand"],
    suggestedInteractionShapes: ["selection", "drag-drop", "qcm", "typing"],
    cognitiveOperations: ["notice", "compare", "infer", "classify"],
    nonEvaluative: true,
    examples: [
      "Countable and Uncountable Nouns: compare concrete examples before naming the distinction.",
      "Grammar discovery: place examples under provisional categories before reading the summary."
    ],
    notes:
      "Exploration depends on sequencing and feedback. A familiar interaction becomes exploratory only when learners can form or revise a hypothesis."
  }
];
