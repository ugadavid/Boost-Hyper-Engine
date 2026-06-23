import { identificationToSelectionData } from "../../core/adapters/index.js";
import { createCompletedResultFromUserInput } from "../../core/results/index.js";
import { renderClassificationDragDropDom } from "../../renderer/renderers/classificationDragDropDomRenderer.js";
import { renderTransformationTypingDom } from "../../renderer/renderers/transformationTypingDomRenderer.js";
import { mountFeedbackFromResult } from "../../renderer/feedback/feedbackMounting.js";
import { authorOrchestrationPaths } from "./AuthorOrchestrationPaths.js";
import { pedagogicalUseCatalog } from "./PedagogicalUseCatalog.js";
import { representationPaths } from "./RepresentationPaths.js";
import type { AuthorOrchestrationPath } from "./AuthorOrchestrationPath.js";
import type {
  ClassificationSet,
  IdentificationSelectionUserInput,
  IdentificationSet,
  TransformationSet
} from "../../core/types/index.js";
import type { PedagogicalUse } from "./PedagogicalUse.js";
import type { RepresentationPath } from "./RepresentationPath.js";

export interface AuthorDiscoveryIntent {
  id: string;
  label: string;
  description: string;
  pedagogicalUseIds: readonly string[];
}

export type AuthorIntentRoutingType =
  | "self-routing"
  | "clarification-routing"
  | "hybrid";

export interface AuthorIntentRoutingMapEntry {
  intentId: string;
  shortLabel: string;
  routingType: AuthorIntentRoutingType;
  routingLabel: "Self-routing" | "Clarification-routing" | "Hybrid";
  implicitQuestion: string;
  bheDirection: string;
  confidence: "direct" | "ambiguous" | "very broad";
}

export interface CompareClarificationOption {
  id: string;
  label: string;
  examples: readonly string[];
  suggestedPedagogicalUseIds: readonly string[];
  suggestedRepresentationPathIds: readonly string[];
  bheMapping: string;
  explanation: string;
  limits: readonly string[];
}

export interface ReflectClarificationOption {
  id: string;
  label: string;
  examples: readonly string[];
  suggestedPedagogicalUseIds: readonly string[];
  suggestedRepresentationPathIds: readonly string[];
  bheMapping: string;
  explanation: string;
  limits: readonly string[];
}

export interface ProduceClarificationOption {
  id: string;
  label: string;
  examples: readonly string[];
  suggestedPedagogicalUseIds: readonly string[];
  suggestedRepresentationPathIds: readonly string[];
  bheMapping: string;
  status: string;
  explanation: string;
  limits: readonly string[];
}

export interface CompareValidationExample {
  id: string;
  brick: string;
  bhePathStatus: BHEPathConnectionStatus;
  bhePathStatusReason: string;
  clarificationOptionId: string;
  clarificationChoice: string;
  alternativeChoices: readonly string[];
  suggestedPedagogicalUseIds: readonly string[];
  suggestedRepresentationPathIds: readonly string[];
  bheMapping: string;
  argument: string;
}

export interface ReflectValidationExample {
  id: string;
  brick: string;
  clarificationChoices: readonly string[];
  suggestedPedagogicalUseIds: readonly string[];
  suggestedRepresentationPathIds: readonly string[];
  bheMapping: string;
  argument: string;
}

export interface ProduceValidationExample {
  id: string;
  brick: string;
  clarificationChoice: string;
  suggestedPedagogicalUseIds: readonly string[];
  suggestedRepresentationPathIds: readonly string[];
  bheMapping: string;
  argument: string;
}

export type BHEPathConnectionStatus =
  | "real-bhe-path"
  | "partial-bhe-path"
  | "demo-only";

export interface AuthorDiscoveryExample {
  id: string;
  title: string;
  source: string;
  intentId: string;
  pedagogicalUseId: string;
  summary: string;
  representationReading: string;
}

export interface AuthorDiscoveryUseView {
  use: PedagogicalUse;
  path?: RepresentationPath;
  orchestrationPath?: AuthorOrchestrationPath;
  examples: readonly AuthorDiscoveryExample[];
  confidence: RepresentationConfidence;
}

export type RepresentationConfidenceLevel =
  | "ready"
  | "plausible"
  | "missing-bridge";

export interface RepresentationConfidence {
  level: RepresentationConfidenceLevel;
  label: "READY" | "PLAUSIBLE" | "MISSING BRIDGE";
  badge: string;
  reasons: readonly string[];
}

export interface AuthorCoverageStats {
  ready: number;
  plausible: number;
  missingBridge: number;
}

export const authorDiscoveryIntents = [
  {
    id: "notice",
    label: "Help learners notice something",
    description:
      "Start here when learners need to observe, recognize, or become aware of something before being corrected.",
    pedagogicalUseIds: [
      "reflect-through-selection",
      "diagnose-through-selection",
      "reflect-through-typing"
    ]
  },
  {
    id: "reflect",
    label: "Help learners reflect",
    description:
      "Start here when the response is meaningful because it reveals a learner's thinking, habit, strategy, or position.",
    pedagogicalUseIds: ["reflect-through-selection", "reflect-through-typing"]
  },
  {
    id: "recall",
    label: "Help learners recall",
    description:
      "Start here when learners should retrieve something before seeing the answer or choosing from options.",
    pedagogicalUseIds: ["recall-through-typing"]
  },
  {
    id: "apply",
    label: "Help learners apply",
    description:
      "Start here when learners should use knowledge in a situation where the response has to work in context.",
    pedagogicalUseIds: ["apply-through-situated-task"]
  },
  {
    id: "classify",
    label: "Help learners classify",
    description:
      "Start here when learners need to sort, group, or distinguish examples. V0 points to nearby uses, but a dedicated path is still missing.",
    pedagogicalUseIds: [
      "diagnose-through-selection",
      "practice-through-controlled-interaction",
      "explore-before-rule"
    ]
  },
  {
    id: "produce",
    label: "Help learners produce",
    description:
      "Start here when learners need to generate language, recall a target, or express a response.",
    pedagogicalUseIds: [
      "recall-through-typing",
      "reflect-through-typing",
      "apply-through-situated-task"
    ]
  },
  {
    id: "compare",
    label: "Help learners compare",
    description:
      "Start here when learners need to select, contrast, or explain differences between examples or habits.",
    pedagogicalUseIds: [
      "reflect-through-selection",
      "diagnose-through-selection",
      "explore-before-rule"
    ]
  }
] as const satisfies readonly AuthorDiscoveryIntent[];

export const authorIntentRoutingMap = [
  {
    intentId: "notice",
    shortLabel: "Notice",
    routingType: "hybrid",
    routingLabel: "Hybrid",
    implicitQuestion: "What should noticing lead to?",
    bheDirection: "Reflect / Diagnose / Explore / Infer",
    confidence: "ambiguous"
  },
  {
    intentId: "reflect",
    shortLabel: "Reflect",
    routingType: "clarification-routing",
    routingLabel: "Clarification-routing",
    implicitQuestion: "What are learners reflecting on?",
    bheDirection: "Multiple reflective / inferential / situated routes",
    confidence: "very broad"
  },
  {
    intentId: "recall",
    shortLabel: "Recall",
    routingType: "self-routing",
    routingLabel: "Self-routing",
    implicitQuestion: "Do learners need to retrieve a target before seeing it?",
    bheDirection: "Recall Through Typing -> MemorizationTypingRecall",
    confidence: "direct"
  },
  {
    intentId: "apply",
    shortLabel: "Apply",
    routingType: "hybrid",
    routingLabel: "Hybrid",
    implicitQuestion: "What situation should the learner act in?",
    bheDirection: "Apply Through Situated Task + context-specific shape",
    confidence: "ambiguous"
  },
  {
    intentId: "classify",
    shortLabel: "Classify",
    routingType: "hybrid",
    routingLabel: "Hybrid",
    implicitQuestion: "Are the categories already stable?",
    bheDirection: "ClassificationSet / Practice / Explore / Diagnose",
    confidence: "ambiguous"
  },
  {
    intentId: "produce",
    shortLabel: "Produce",
    routingType: "clarification-routing",
    routingLabel: "Clarification-routing",
    implicitQuestion: "What kind of production is expected?",
    bheDirection: "Recall / Reflect / Apply / Transform / Infer",
    confidence: "very broad"
  },
  {
    intentId: "compare",
    shortLabel: "Compare",
    routingType: "clarification-routing",
    routingLabel: "Clarification-routing",
    implicitQuestion: "What are learners comparing?",
    bheDirection: "Multiple BHE structures",
    confidence: "very broad"
  }
] as const satisfies readonly AuthorIntentRoutingMapEntry[];

export const compareClarificationOptions = [
  {
    id: "categories",
    label: "Categories",
    examples: [
      "countable vs uncountable",
      "comparative vs superlative",
      "-ed vs -ing"
    ],
    suggestedPedagogicalUseIds: [
      "practice-through-controlled-interaction",
      "explore-before-rule"
    ],
    suggestedRepresentationPathIds: ["explore-before-rule"],
    bheMapping: "ClassificationSet",
    explanation:
      "Choose this when comparison helps learners decide which category an example belongs to.",
    limits: [
      "Use ClassificationSet when categories are stable.",
      "Use Explore Before The Rule when categories are still emerging."
    ]
  },
  {
    id: "relations",
    label: "Relations",
    examples: [
      "positive vs negative adjective",
      "word ↔ image",
      "concept ↔ example"
    ],
    suggestedPedagogicalUseIds: ["practice-through-controlled-interaction"],
    suggestedRepresentationPathIds: [],
    bheMapping: "AssociationSet",
    explanation:
      "Choose this when comparison helps learners see what belongs together or contrasts meaningfully.",
    limits: [
      "The BHE object is clear when the relation is explicit.",
      "No dedicated authoring RepresentationPath is documented yet."
    ]
  },
  {
    id: "before-after-forms",
    label: "Before / After Forms",
    examples: [
      "active ↔ passive",
      "present ↔ past",
      "source ↔ transformed form"
    ],
    suggestedPedagogicalUseIds: ["practice-through-controlled-interaction"],
    suggestedRepresentationPathIds: [],
    bheMapping: "TransformationSet",
    explanation:
      "Choose this when comparison is about a source form becoming a target form through a rule or operation.",
    limits: [
      "TransformationSet is the likely BHE carrier.",
      "The authoring path is still less visible than the core representation."
    ]
  },
  {
    id: "hypotheses",
    label: "Hypotheses",
    examples: [
      "possible rule",
      "possible interpretation",
      "possible explanation"
    ],
    suggestedPedagogicalUseIds: ["explore-before-rule"],
    suggestedRepresentationPathIds: ["explore-before-rule"],
    bheMapping: "InferenceSet",
    explanation:
      "Choose this when learners compare possible explanations before stabilizing an interpretation or rule.",
    limits: [
      "InferenceSet can carry hypothesis work.",
      "Explore Before The Rule is an orchestration path, not a single RepresentationPath."
    ]
  },
  {
    id: "order",
    label: "Order",
    examples: [
      "process",
      "workflow",
      "timeline",
      "dialogue reconstruction"
    ],
    suggestedPedagogicalUseIds: ["practice-through-controlled-interaction"],
    suggestedRepresentationPathIds: [],
    bheMapping: "SequenceSet",
    explanation:
      "Choose this when comparison is about before, after, adjacency, progression, or ordering.",
    limits: [
      "SequenceSet is clear when order itself is meaningful.",
      "Do not use order merely to make a static list interactive."
    ]
  },
  {
    id: "strategies-habits",
    label: "Strategies / Habits",
    examples: [
      "learning strategies",
      "translation habits",
      "self-reflection"
    ],
    suggestedPedagogicalUseIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    suggestedRepresentationPathIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    bheMapping: "Reflective authoring path using selection or typing",
    explanation:
      "Choose this when learners compare their own habits, strategies, confidence, or self-position.",
    limits: [
      "The result is usually completion, not correctness.",
      "The author must choose whether selection or typing best captures the reflection."
    ]
  }
] as const satisfies readonly CompareClarificationOption[];

export const compareValidationExamples = [
  {
    id: "countable-uncountable-compare-validation",
    brick: "Countable / Uncountable — I Learn",
    bhePathStatus: "real-bhe-path",
    bhePathStatusReason:
      "ClassificationSet, drag-drop InteractionData, DOM renderer, and evaluator are all available.",
    clarificationOptionId: "categories",
    clarificationChoice: "Categories",
    alternativeChoices: ["Hypotheses"],
    suggestedPedagogicalUseIds: [
      "practice-through-controlled-interaction",
      "explore-before-rule"
    ],
    suggestedRepresentationPathIds: ["explore-before-rule"],
    bheMapping: "ClassificationSet, with InferenceSet visible during discovery",
    argument:
      "The dominant comparison is countable vs uncountable category membership. Hypotheses remains important because learners first test the distinction before it is stabilized."
  },
  {
    id: "passive-voice-compare-validation",
    brick: "Passive Voice",
    bhePathStatus: "real-bhe-path",
    bhePathStatusReason:
      "TransformationSet, adapter, TransformationInteractionData, DOM renderer, and evaluator are all available.",
    clarificationOptionId: "before-after-forms",
    clarificationChoice: "Before / After Forms",
    alternativeChoices: ["Categories", "Hypotheses"],
    suggestedPedagogicalUseIds: ["practice-through-controlled-interaction"],
    suggestedRepresentationPathIds: [],
    bheMapping: "TransformationSet",
    argument:
      "The most natural route is active form to passive form, with a visible source-to-target relation. Categories can support recognition, and hypotheses may appear in critical-reading extensions."
  },
  {
    id: "thinking-in-english-compare-validation",
    brick: "Thinking in English",
    bhePathStatus: "real-bhe-path",
    bhePathStatusReason:
      "IdentificationSelectionData, UserInput, a non-corrective completed result helper, and the shared feedback tail are connected.",
    clarificationOptionId: "strategies-habits",
    clarificationChoice: "Strategies / Habits",
    alternativeChoices: ["Categories"],
    suggestedPedagogicalUseIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    suggestedRepresentationPathIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    bheMapping: "Reflective authoring path using selection or typing",
    argument:
      "Learners compare habits, confidence, and translation strategies rather than correct answers. Reflect Through Selection is the clearest first path; Reflect Through Typing can extend it."
  }
] as const satisfies readonly CompareValidationExample[];

export const reflectClarificationOptions = [
  {
    id: "habits",
    label: "Habits",
    examples: ["translation habits", "speaking habits", "study habits"],
    suggestedPedagogicalUseIds: [
      "reflect-through-selection",
      "diagnose-through-selection"
    ],
    suggestedRepresentationPathIds: ["reflect-through-selection"],
    bheMapping: "Reflective or diagnostic selection -> BHEResult.completed",
    explanation:
      "Choose this when learners are noticing what they usually do before learning or acting.",
    limits: [
      "Reflect Through Selection fits self-observation.",
      "Diagnose Through Selection fits starting-point evidence or support decisions."
    ]
  },
  {
    id: "strategies",
    label: "Strategies",
    examples: [
      "vocabulary strategies",
      "speaking strategies",
      "learning methods"
    ],
    suggestedPedagogicalUseIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    suggestedRepresentationPathIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    bheMapping: "Reflective selection or typing -> BHEResult.completed",
    explanation:
      "Choose this when learners compare, name, or explain learning strategies they use or may try.",
    limits: [
      "Selection works when strategies are offered as options.",
      "Typing works when learners must explain why a strategy fits them."
    ]
  },
  {
    id: "confidence-feelings",
    label: "Confidence / Feelings",
    examples: ["speaking anxiety", "confidence", "comfort level"],
    suggestedPedagogicalUseIds: ["reflect-through-selection"],
    suggestedRepresentationPathIds: ["reflect-through-selection"],
    bheMapping: "Reflective selection -> BHEResult.completed",
    explanation:
      "Choose this when reflection surfaces affect, comfort, anxiety, or readiness without judging correctness.",
    limits: [
      "The result is completion, not assessment.",
      "Feedback should acknowledge participation rather than validate a right answer."
    ]
  },
  {
    id: "understanding",
    label: "Understanding",
    examples: [
      "what do I understand now?",
      "what distinction is becoming clear?"
    ],
    suggestedPedagogicalUseIds: ["explore-before-rule"],
    suggestedRepresentationPathIds: ["explore-before-rule"],
    bheMapping: "Explore Before The Rule, InferenceSet, or ClassificationSet",
    explanation:
      "Choose this when learners are reflecting on a concept or distinction becoming clear.",
    limits: [
      "Reflect may not be the best route here.",
      "Understanding often routes toward exploration, inference, or classification."
    ]
  },
  {
    id: "choices",
    label: "Choices",
    examples: ["why did I choose this?"],
    suggestedPedagogicalUseIds: ["reflect-through-typing"],
    suggestedRepresentationPathIds: ["reflect-through-typing"],
    bheMapping: "Reflective typing or InferenceSet",
    explanation:
      "Choose this when the learner should explain a choice, preference, interpretation, or route taken.",
    limits: [
      "Reflect Through Typing fits personal explanation.",
      "InferenceSet may fit better when the choice is evidence-based."
    ]
  },
  {
    id: "hypotheses",
    label: "Hypotheses",
    examples: ["what rule do I think explains this?"],
    suggestedPedagogicalUseIds: ["explore-before-rule"],
    suggestedRepresentationPathIds: ["explore-before-rule"],
    bheMapping: "InferenceSet or Explore Before The Rule",
    explanation:
      "Choose this when reflection is really about forming, revising, or justifying a possible explanation.",
    limits: [
      "Reflection can slide toward inference here.",
      "The author may need an exploration path rather than a pure Reflect path."
    ]
  },
  {
    id: "experience",
    label: "Experience",
    examples: ["what happened when I tried this?"],
    suggestedPedagogicalUseIds: [
      "reflect-through-typing",
      "apply-through-situated-task"
    ],
    suggestedRepresentationPathIds: [
      "reflect-through-typing",
      "apply-through-situated-task"
    ],
    bheMapping: "Reflective typing or situated task result details",
    explanation:
      "Choose this when learners review what happened after trying a strategy, speaking, or acting in context.",
    limits: [
      "Typing can capture the reflection.",
      "Apply Through Situated Task may be the better route when the experience has a functional success condition."
    ]
  },
  {
    id: "progress",
    label: "Progress",
    examples: ["what changed for me?"],
    suggestedPedagogicalUseIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    suggestedRepresentationPathIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    bheMapping: "Reflective selection or typing -> BHEResult.completed",
    explanation:
      "Choose this when learners compare a current state with a previous state or name what has changed.",
    limits: [
      "BHE can record the reflection now.",
      "Longitudinal progress tracking is not modeled by this playground."
    ]
  },
  {
    id: "action-reliability",
    label: "Action Reliability",
    examples: ["did my language work for another learner?"],
    suggestedPedagogicalUseIds: ["apply-through-situated-task"],
    suggestedRepresentationPathIds: ["apply-through-situated-task"],
    bheMapping: "Apply Through Situated Task with reflective review",
    explanation:
      "Choose this when reflection depends on whether language or action worked for someone else.",
    limits: [
      "This is not a pure Reflect route.",
      "The central BHE question may be functional success in a situated task."
    ]
  }
] as const satisfies readonly ReflectClarificationOption[];

export const reflectValidationExamples = [
  {
    id: "thinking-in-english-reflect-validation",
    brick: "Thinking in English",
    clarificationChoices: ["Habits", "Strategies", "Confidence / Feelings"],
    suggestedPedagogicalUseIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    suggestedRepresentationPathIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    bheMapping:
      "Reflective selection or typing -> non-evaluative completion -> BHEResult.completed",
    argument:
      "The learner reflects on translation habits, speaking strategies, and confidence before oral activation. The clarification prevents Reflect from being treated as one generic selection path."
  },
  {
    id: "memorising-vocabulary-reflect-validation",
    brick: "Memorising Vocabulary",
    clarificationChoices: ["Strategies"],
    suggestedPedagogicalUseIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    suggestedRepresentationPathIds: [
      "reflect-through-selection",
      "reflect-through-typing"
    ],
    bheMapping:
      "Reflective strategy awareness using selection or typing, usually completed rather than scored",
    argument:
      "The learner reflects on vocabulary-learning methods, tries a strategy, and decides what may fit them. Strategies is the clearest route."
  },
  {
    id: "wayfinding-reflect-validation",
    brick: "Wayfinding",
    clarificationChoices: ["Action Reliability", "Experience"],
    suggestedPedagogicalUseIds: [
      "apply-through-situated-task",
      "reflect-through-typing"
    ],
    suggestedRepresentationPathIds: [
      "apply-through-situated-task",
      "reflect-through-typing"
    ],
    bheMapping:
      "Apply Through Situated Task with reflective review of whether directions worked",
    argument:
      "The strongest reflective question is not self-positioning, but whether the learner's language worked for another learner in a map-based task."
  }
] as const satisfies readonly ReflectValidationExample[];

export const produceClarificationOptions = [
  {
    id: "recalled-target",
    label: "Recalled Target",
    examples: [
      "remember a word",
      "remember an expression",
      "remember a definition"
    ],
    suggestedPedagogicalUseIds: ["recall-through-typing"],
    suggestedRepresentationPathIds: ["recall-through-typing"],
    bheMapping: "Recall Through Typing -> MemorizationTypingRecall",
    status: "Strong / real path",
    explanation:
      "Choose this when production means retrieving a known target from a cue before seeing the answer.",
    limits: [
      "This is active recall, not open production.",
      "Evaluation is deterministic when expected targets and accepted variants are known."
    ]
  },
  {
    id: "context-fitting-answer",
    label: "Context-Fitting Answer",
    examples: [
      "fill a blank",
      "complete a sentence",
      "complete a dialogue"
    ],
    suggestedPedagogicalUseIds: ["practice-through-controlled-interaction"],
    suggestedRepresentationPathIds: [],
    bheMapping: "GapFillSet -> ContextualTyping",
    status: "Real engine path; authoring bridge still incomplete",
    explanation:
      "Choose this when learners produce the missing piece that fits an existing local context.",
    limits: [
      "GapFill has a real engine path.",
      "No dedicated authoring RepresentationPath is documented yet."
    ]
  },
  {
    id: "transformed-form",
    label: "Transformed Form",
    examples: [
      "active -> passive",
      "singular -> plural",
      "formal -> informal"
    ],
    suggestedPedagogicalUseIds: ["practice-through-controlled-interaction"],
    suggestedRepresentationPathIds: [],
    bheMapping: "TransformationSet -> TransformationTyping",
    status: "Strong / real path",
    explanation:
      "Choose this when learners start from a visible source and produce a changed target form.",
    limits: [
      "TransformationSet preserves the source -> operation -> target relation.",
      "The core path is strong; the authoring bridge is still less visible than Recall."
    ]
  },
  {
    id: "hypothesis-interpretation",
    label: "Hypothesis / Interpretation",
    examples: [
      "what do you think this means?",
      "what rule explains this?"
    ],
    suggestedPedagogicalUseIds: ["explore-before-rule"],
    suggestedRepresentationPathIds: ["explore-before-rule"],
    bheMapping: "InferenceSet or Explore Before The Rule",
    status: "Conceptually covered; partially implemented",
    explanation:
      "Choose this when learners produce a possible meaning, rule, or explanation from clues.",
    limits: [
      "Inference can carry hypothesis work.",
      "Open interpretation remains harder to evaluate qualitatively."
    ]
  },
  {
    id: "reflection-explanation",
    label: "Reflection / Explanation",
    examples: [
      "explain your strategy",
      "justify your choice",
      "describe your experience"
    ],
    suggestedPedagogicalUseIds: ["reflect-through-typing"],
    suggestedRepresentationPathIds: ["reflect-through-typing"],
    bheMapping: "Reflect Through Typing -> BHEResult.completed",
    status: "Viable non-evaluative path",
    explanation:
      "Choose this when the production is meaningful because it expresses reflection, strategy, or experience.",
    limits: [
      "The result is usually completed, not success or failed.",
      "ContextualTypingUserInput is a structural carrier, not a perfect semantic name."
    ]
  },
  {
    id: "situated-response",
    label: "Situated Response",
    examples: [
      "give directions",
      "answer a customer",
      "write an email",
      "solve a task in context"
    ],
    suggestedPedagogicalUseIds: ["apply-through-situated-task"],
    suggestedRepresentationPathIds: ["apply-through-situated-task"],
    bheMapping: "Apply Through Situated Task",
    status: "Plausible context-dependent path",
    explanation:
      "Choose this when learners produce language or action that should work in a credible situation.",
    limits: [
      "The interaction shape depends on the task.",
      "The author must define what observable success means in context."
    ]
  },
  {
    id: "communicative-clue",
    label: "Communicative Clue",
    examples: [
      "describe an object",
      "leave clues",
      "help another learner infer"
    ],
    suggestedPedagogicalUseIds: ["apply-through-situated-task"],
    suggestedRepresentationPathIds: ["apply-through-situated-task"],
    bheMapping: "Apply Through Situated Task with social or interpretive validation",
    status: "Conceptually visible; validation still open",
    explanation:
      "Choose this when production is successful if another learner can interpret or act from it.",
    limits: [
      "This may require social validation or peer interpretation.",
      "The current playground can route the author, but does not model the full social loop."
    ]
  }
] as const satisfies readonly ProduceClarificationOption[];

export const produceValidationExamples = [
  {
    id: "passive-voice-produce-validation",
    brick: "Passive Voice",
    clarificationChoice: "Transformed Form",
    suggestedPedagogicalUseIds: ["practice-through-controlled-interaction"],
    suggestedRepresentationPathIds: [],
    bheMapping: "TransformationSet -> TransformationTyping",
    argument:
      "The dominant productive task is transforming active forms into passive forms. Produce becomes clear only after the author specifies source-to-target production."
  },
  {
    id: "memorising-vocabulary-produce-validation",
    brick: "Memorising Vocabulary",
    clarificationChoice: "Recalled Target",
    suggestedPedagogicalUseIds: ["recall-through-typing"],
    suggestedRepresentationPathIds: ["recall-through-typing"],
    bheMapping: "Recall Through Typing -> MemorizationTypingRecall",
    argument:
      "The learner is not producing freely; they retrieve a target word or expression from a cue. This routes naturally to the existing active recall path."
  },
  {
    id: "thinking-in-english-produce-validation",
    brick: "Thinking in English",
    clarificationChoice: "Reflection / Explanation",
    suggestedPedagogicalUseIds: ["reflect-through-typing"],
    suggestedRepresentationPathIds: ["reflect-through-typing"],
    bheMapping: "Reflect Through Typing -> BHEResult.completed",
    argument:
      "When Thinking in English asks learners to put a strategy or experience into words, production is reflective and non-corrective. Completion is more appropriate than scoring."
  }
] as const satisfies readonly ProduceValidationExample[];

export const authorDiscoveryExamples = [
  {
    id: "thinking-in-english-reflect-selection",
    title: "Thinking in English",
    source: "Boost'English corpus",
    intentId: "reflect",
    pedagogicalUseId: "reflect-through-selection",
    summary:
      "Learners select statements about whether they translate mentally before speaking.",
    representationReading:
      "Intent: help learners reflect. Pedagogical Use: Reflect Through Selection. RepresentationPath: selection -> non-evaluative -> completed."
  },
  {
    id: "memorising-vocabulary-recall-typing",
    title: "Memorising Vocabulary",
    source: "Boost'English corpus",
    intentId: "recall",
    pedagogicalUseId: "recall-through-typing",
    summary:
      "Learners retrieve a vocabulary item from a cue before comparing with an expected target.",
    representationReading:
      "Intent: help learners recall. Pedagogical Use: Recall Through Typing. RepresentationPath: typing -> existing evaluator -> success / partial / failed."
  },
  {
    id: "wayfinding-apply-situated-task",
    title: "Wayfinding",
    source: "Boost'English corpus",
    intentId: "apply",
    pedagogicalUseId: "apply-through-situated-task",
    summary:
      "Learners use language to give directions that should function in a concrete navigation situation.",
    representationReading:
      "Intent: help learners apply. Pedagogical Use: Apply Through Situated Task. RepresentationPath: situated response -> context-dependent evaluation."
  },
  {
    id: "countable-uncountable-explore-before-rule",
    title: "Countable / Uncountable — I Learn",
    source: "Boost'English corpus",
    intentId: "notice",
    pedagogicalUseId: "explore-before-rule",
    summary:
      "Learners observe concrete noun examples, compare them, infer a distinction, then stabilize the countable / uncountable rule before practice.",
    representationReading:
      "Intent: help learners discover before explanation. Pedagogical Use: Explore Before The Rule. Author Orchestration Path: observe -> compare -> infer -> stabilize -> practice."
  }
] as const satisfies readonly AuthorDiscoveryExample[];

const pathByUseId = new Map<string, RepresentationPath>(
  representationPaths.map((path) => [path.pedagogicalUseId, path])
);

const orchestrationPathByUseId = new Map<string, AuthorOrchestrationPath>(
  authorOrchestrationPaths.map((path) => [path.pedagogicalUseId, path])
);

const useById = new Map<string, PedagogicalUse>(
  pedagogicalUseCatalog.map((use) => [use.id, use])
);

const representationConfidenceByUseId: Record<string, RepresentationConfidence> = {
  "reflect-through-selection": {
    level: "ready",
    label: "READY",
    badge: "READY",
    reasons: [
      "RepresentationPath documented",
      "Real corpus example available",
      "BHE concepts identified"
    ]
  },
  "diagnose-through-selection": {
    level: "plausible",
    label: "PLAUSIBLE",
    badge: "PLAUSIBLE",
    reasons: [
      "RepresentationPath documented",
      "Evaluation depends on activity use",
      "No dedicated playground example yet"
    ]
  },
  "recall-through-typing": {
    level: "ready",
    label: "READY",
    badge: "READY",
    reasons: [
      "RepresentationPath documented",
      "Existing evaluator identified",
      "Real corpus example available"
    ]
  },
  "reflect-through-typing": {
    level: "plausible",
    label: "PLAUSIBLE",
    badge: "PLAUSIBLE",
    reasons: [
      "RepresentationPath documented",
      "Non-evaluative result identified",
      "Carrier vocabulary remains imperfect"
    ]
  },
  "apply-through-situated-task": {
    level: "ready",
    label: "READY",
    badge: "READY",
    reasons: [
      "RepresentationPath documented",
      "Real corpus example available",
      "Context-dependent evaluation made explicit"
    ]
  },
  "practice-through-controlled-interaction": {
    level: "plausible",
    label: "PLAUSIBLE",
    badge: "PLAUSIBLE",
    reasons: [
      "Interaction shapes exist",
      "Several BHE pipelines already cover practice cases",
      "No single documented RepresentationPath yet"
    ]
  },
  "explore-before-rule": {
    level: "plausible",
    label: "PLAUSIBLE",
    badge: "PLAUSIBLE",
    reasons: [
      "AuthorOrchestrationPath documented",
      "Several steps map to existing BHE concepts",
      "Stabilize remains authoring-only"
    ]
  }
};

export function getRepresentationConfidenceForUse(
  pedagogicalUseId: string
): RepresentationConfidence {
  return (
    representationConfidenceByUseId[pedagogicalUseId] ?? {
      level: "missing-bridge",
      label: "MISSING BRIDGE",
      badge: "MISSING BRIDGE",
      reasons: ["Author need identified", "No documented path found"]
    }
  );
}

export function getAuthorCoverageStats(): AuthorCoverageStats {
  return pedagogicalUseCatalog.reduce<AuthorCoverageStats>(
    (stats, use) => {
      const confidence = getRepresentationConfidenceForUse(use.id);

      if (confidence.level === "ready") {
        return { ...stats, ready: stats.ready + 1 };
      }

      if (confidence.level === "plausible") {
        return { ...stats, plausible: stats.plausible + 1 };
      }

      return { ...stats, missingBridge: stats.missingBridge + 1 };
    },
    { ready: 0, plausible: 0, missingBridge: 0 }
  );
}

export function getAuthorDiscoveryUsesForIntent(
  intentId: string
): readonly AuthorDiscoveryUseView[] {
  const intent = authorDiscoveryIntents.find((item) => item.id === intentId);

  if (!intent) {
    return [];
  }

  return intent.pedagogicalUseIds.flatMap((pedagogicalUseId) => {
    const use = useById.get(pedagogicalUseId);

    if (!use) {
      return [];
    }

    const path = pathByUseId.get(pedagogicalUseId);
    const orchestrationPath = orchestrationPathByUseId.get(pedagogicalUseId);
    const view = {
      use,
      examples: authorDiscoveryExamples.filter(
        (example) => example.pedagogicalUseId === pedagogicalUseId
      ),
      confidence: getRepresentationConfidenceForUse(pedagogicalUseId),
      ...(orchestrationPath ? { orchestrationPath } : {}),
      ...(path ? { path } : {})
    };

    return [view];
  });
}

export function renderAuthorDiscoveryPlayground(root: HTMLElement): void {
  let selectedIntentId: string = authorDiscoveryIntents[0]?.id ?? "";
  let selectedUseId =
    getAuthorDiscoveryUsesForIntent(selectedIntentId)[0]?.use.id ?? "";
  let selectedCompareOptionId: string = compareClarificationOptions[0]?.id ?? "";
  let selectedReflectOptionId: string = reflectClarificationOptions[0]?.id ?? "";
  let selectedProduceOptionId: string = produceClarificationOptions[0]?.id ?? "";

  const render = (): void => {
    const selectedIntent = authorDiscoveryIntents.find(
      (intent) => intent.id === selectedIntentId
    );
    const isCompareIntent = selectedIntentId === "compare";
    const isReflectIntent = selectedIntentId === "reflect";
    const isProduceIntent = selectedIntentId === "produce";
    const useViews = getAuthorDiscoveryUsesForIntent(selectedIntentId);
    const selectedUseView =
      useViews.find((view) => view.use.id === selectedUseId) ?? useViews[0];
    const selectedCompareOption =
      compareClarificationOptions.find(
        (option) => option.id === selectedCompareOptionId
      ) ?? compareClarificationOptions[0];
    const selectedReflectOption =
      reflectClarificationOptions.find(
        (option) => option.id === selectedReflectOptionId
      ) ?? reflectClarificationOptions[0];
    const selectedProduceOption =
      produceClarificationOptions.find(
        (option) => option.id === selectedProduceOptionId
      ) ?? produceClarificationOptions[0];

    root.replaceChildren();
    root.className = "author-discovery-playground";

    const title = document.createElement("h1");
    title.textContent = "Author Discovery Playground V0.6";

    const subtitle = document.createElement("p");
    subtitle.className = "adp-subtitle";
    subtitle.textContent =
      "Start from what learners should do, then discover how BHE can represent it.";

    const coverage = renderCoverage(getAuthorCoverageStats());
    const routingMap = renderAuthorIntentRoutingMap(selectedIntentId);

    const layout = document.createElement("div");
    layout.className = "adp-layout";

    const intentPanel = renderIntentPanel(selectedIntentId);
    const usePanel = isCompareIntent
      ? renderCompareClarificationPanel(
          compareClarificationOptions,
          selectedCompareOption?.id
        )
      : isReflectIntent
        ? renderReflectClarificationPanel(
            reflectClarificationOptions,
            selectedReflectOption?.id
          )
        : isProduceIntent
          ? renderProduceClarificationPanel(
              produceClarificationOptions,
              selectedProduceOption?.id
            )
        : renderUsePanel(useViews, selectedUseView?.use.id);
    const detailPanel =
      isCompareIntent && selectedCompareOption
        ? renderCompareDetailPanel(selectedIntent, selectedCompareOption)
        : isReflectIntent && selectedReflectOption
          ? renderReflectDetailPanel(selectedIntent, selectedReflectOption)
          : isProduceIntent && selectedProduceOption
            ? renderProduceDetailPanel(selectedIntent, selectedProduceOption)
        : renderDetailPanel(selectedIntent, selectedUseView);

    layout.append(intentPanel, usePanel, detailPanel);
    root.append(title, subtitle, coverage, routingMap, layout);

    const selectIntentFromButton = (button: HTMLButtonElement): void => {
      selectedIntentId = button.dataset.intentId ?? selectedIntentId;
      selectedUseId =
        getAuthorDiscoveryUsesForIntent(selectedIntentId)[0]?.use.id ?? "";
      selectedCompareOptionId = compareClarificationOptions[0]?.id ?? "";
      selectedReflectOptionId = reflectClarificationOptions[0]?.id ?? "";
      selectedProduceOptionId = produceClarificationOptions[0]?.id ?? "";
      render();
    };

    const handleIntentClick = (event: MouseEvent): void => {
      const button = (event.target as Element).closest<HTMLButtonElement>(
        "button[data-intent-id]"
      );

      if (!button) {
        return;
      }

      selectIntentFromButton(button);
    };

    intentPanel.addEventListener("click", handleIntentClick);
    routingMap.addEventListener("click", handleIntentClick);

    usePanel.addEventListener("click", (event) => {
      const compareButton = (event.target as Element).closest<HTMLButtonElement>(
        "button[data-compare-option-id]"
      );

      if (compareButton) {
        selectedCompareOptionId =
          compareButton.dataset.compareOptionId ?? selectedCompareOptionId;
        render();
        return;
      }

      const reflectButton = (event.target as Element).closest<HTMLButtonElement>(
        "button[data-reflect-option-id]"
      );

      if (reflectButton) {
        selectedReflectOptionId =
          reflectButton.dataset.reflectOptionId ?? selectedReflectOptionId;
        render();
        return;
      }

      const produceButton = (event.target as Element).closest<HTMLButtonElement>(
        "button[data-produce-option-id]"
      );

      if (produceButton) {
        selectedProduceOptionId =
          produceButton.dataset.produceOptionId ?? selectedProduceOptionId;
        render();
        return;
      }

      const button = (event.target as Element).closest<HTMLButtonElement>(
        "button[data-use-id]"
      );

      if (!button) {
        return;
      }

      selectedUseId = button.dataset.useId ?? selectedUseId;
      render();
    });
  };

  render();
}

function renderAuthorIntentRoutingMap(selectedIntentId: string): HTMLElement {
  const section = document.createElement("section");
  section.className = "adp-routing-map";

  const heading = document.createElement("h2");
  heading.textContent = "Author Intent Routing Map";

  const intro = document.createElement("p");
  intro.className = "adp-panel-note";
  intro.textContent =
    "Intentions do not all behave the same way: some are direct, some need clarification, and some are hybrid.";

  const cards = document.createElement("div");
  cards.className = "adp-routing-grid";

  for (const entry of authorIntentRoutingMap) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.intentId = entry.intentId;
    button.className =
      entry.intentId === selectedIntentId
        ? "adp-routing-card is-selected"
        : "adp-routing-card";

    const title = document.createElement("span");
    title.className = "adp-routing-title";
    title.textContent = entry.shortLabel;

    const type = document.createElement("span");
    type.className = `adp-routing-type ${getRoutingTypeClass(entry.routingType)}`;
    type.textContent = entry.routingLabel;

    const question = document.createElement("span");
    question.className = "adp-routing-question";
    question.textContent = entry.implicitQuestion;

    const direction = document.createElement("span");
    direction.className = "adp-routing-direction";
    direction.textContent = entry.bheDirection;

    const confidence = document.createElement("span");
    confidence.className = "adp-routing-confidence";
    confidence.textContent = `Confidence: ${entry.confidence}`;

    button.append(title, type, question, direction, confidence);
    cards.append(button);
  }

  section.append(heading, intro, cards);
  return section;
}

function getRoutingTypeClass(type: AuthorIntentRoutingType): string {
  if (type === "self-routing") {
    return "is-self-routing";
  }

  if (type === "clarification-routing") {
    return "is-clarification-routing";
  }

  return "is-hybrid-routing";
}

function renderIntentPanel(selectedIntentId: string): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel";

  const heading = document.createElement("h2");
  heading.textContent = "1. I want to...";
  panel.append(heading);

  for (const intent of authorDiscoveryIntents) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.intentId = intent.id;
    button.className =
      intent.id === selectedIntentId ? "adp-card is-selected" : "adp-card";
    button.textContent = intent.label;
    panel.append(button);
  }

  return panel;
}

function renderCoverage(stats: AuthorCoverageStats): HTMLElement {
  const section = document.createElement("section");
  section.className = "adp-coverage";

  const heading = document.createElement("h2");
  heading.textContent = "Author Coverage";

  const ready = document.createElement("span");
  ready.className = "adp-coverage-item is-ready";
  ready.textContent = `READY: ${stats.ready}`;

  const plausible = document.createElement("span");
  plausible.className = "adp-coverage-item is-plausible";
  plausible.textContent = `PLAUSIBLE: ${stats.plausible}`;

  const missing = document.createElement("span");
  missing.className = "adp-coverage-item is-missing";
  missing.textContent = `MISSING BRIDGE: ${stats.missingBridge}`;

  section.append(heading, ready, plausible, missing);
  return section;
}

function renderUsePanel(
  useViews: readonly AuthorDiscoveryUseView[],
  selectedUseId?: string
): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel";

  const heading = document.createElement("h2");
  heading.textContent = "2. Pedagogical Uses";
  panel.append(heading);

  for (const view of useViews) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.useId = view.use.id;
    button.className =
      view.use.id === selectedUseId ? "adp-card is-selected" : "adp-card";

    const label = document.createElement("span");
    label.className = "adp-card-title";
    label.textContent = view.use.label;

    const description = document.createElement("span");
    description.textContent = view.use.description;

    const pathStatus = document.createElement("span");
    pathStatus.className = `adp-pill ${getConfidenceClass(view.confidence)}`;
    pathStatus.textContent = view.confidence.badge;

    button.append(label, description, pathStatus);
    panel.append(button);
  }

  return panel;
}

function renderCompareClarificationPanel(
  options: readonly CompareClarificationOption[],
  selectedOptionId?: string
): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel";

  const heading = document.createElement("h2");
  heading.textContent = "2. What are learners comparing?";

  const intro = document.createElement("p");
  intro.className = "adp-panel-note";
  intro.textContent =
    "Compare is not a path yet. Choose the thing being compared first.";

  panel.append(heading, intro);

  for (const option of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.compareOptionId = option.id;
    button.className =
      option.id === selectedOptionId ? "adp-card is-selected" : "adp-card";

    const label = document.createElement("span");
    label.className = "adp-card-title";
    label.textContent = option.label;

    const examples = document.createElement("span");
    examples.textContent = option.examples.join(" · ");

    const mapping = document.createElement("span");
    mapping.className = "adp-pill is-muted";
    mapping.textContent = option.bheMapping;

    button.append(label, examples, mapping);
    panel.append(button);
  }

  return panel;
}

function renderReflectClarificationPanel(
  options: readonly ReflectClarificationOption[],
  selectedOptionId?: string
): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel";

  const heading = document.createElement("h2");
  heading.textContent = "2. What are learners reflecting on?";

  const intro = document.createElement("p");
  intro.className = "adp-panel-note";
  intro.textContent =
    "Reflect is not a path yet. Choose the object of reflection first.";

  panel.append(heading, intro);

  for (const option of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.reflectOptionId = option.id;
    button.className =
      option.id === selectedOptionId ? "adp-card is-selected" : "adp-card";

    const label = document.createElement("span");
    label.className = "adp-card-title";
    label.textContent = option.label;

    const examples = document.createElement("span");
    examples.textContent = option.examples.join(" · ");

    const mapping = document.createElement("span");
    mapping.className = "adp-pill is-muted";
    mapping.textContent = option.bheMapping;

    button.append(label, examples, mapping);
    panel.append(button);
  }

  return panel;
}

function renderProduceClarificationPanel(
  options: readonly ProduceClarificationOption[],
  selectedOptionId?: string
): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel";

  const heading = document.createElement("h2");
  heading.textContent = "2. What kind of production is expected?";

  const intro = document.createElement("p");
  intro.className = "adp-panel-note";
  intro.textContent =
    "Produce is not a path yet. Choose what the learner is producing before routing toward BHE.";

  panel.append(heading, intro);

  for (const option of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.produceOptionId = option.id;
    button.className =
      option.id === selectedOptionId ? "adp-card is-selected" : "adp-card";

    const label = document.createElement("span");
    label.className = "adp-card-title";
    label.textContent = option.label;

    const examples = document.createElement("span");
    examples.textContent = option.examples.join(" · ");

    const mapping = document.createElement("span");
    mapping.className = "adp-pill is-muted";
    mapping.textContent = option.bheMapping;

    const status = document.createElement("span");
    status.className = "adp-panel-note";
    status.textContent = option.status;

    button.append(label, examples, mapping, status);
    panel.append(button);
  }

  return panel;
}

function renderDetailPanel(
  selectedIntent: AuthorDiscoveryIntent | undefined,
  selectedUseView: AuthorDiscoveryUseView | undefined
): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel adp-detail";

  const heading = document.createElement("h2");
  heading.textContent = "3. Representation discovery";
  panel.append(heading);

  if (!selectedIntent || !selectedUseView) {
    const empty = document.createElement("p");
    empty.textContent = "Choose an intent to begin.";
    panel.append(empty);
    return panel;
  }

  panel.append(
    renderBlock("Intent", selectedIntent.label, selectedIntent.description),
    renderBlock(
      "Pedagogical Use",
      selectedUseView.use.label,
      selectedUseView.use.description
    ),
    renderConfidence(selectedUseView.confidence)
  );

  if (selectedUseView.path) {
    panel.append(renderPath(selectedUseView.path, selectedUseView.use.label));
  } else if (selectedUseView.orchestrationPath) {
    panel.append(renderOrchestrationPath(selectedUseView.orchestrationPath));
  } else {
    const missing = document.createElement("div");
    missing.className = "adp-warning";
    missing.textContent =
      "This use is discoverable in the catalog, but V0 has no RepresentationPath for it yet. That gap is intentional: the playground should reveal missing bridges instead of hiding them.";
    panel.append(missing);
  }

  panel.append(renderExamples(selectedUseView.examples));

  return panel;
}

function renderReflectDetailPanel(
  selectedIntent: AuthorDiscoveryIntent | undefined,
  selectedOption: ReflectClarificationOption
): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel adp-detail";

  const heading = document.createElement("h2");
  heading.textContent = "3. Clarification path";
  panel.append(heading);

  if (!selectedIntent) {
    const empty = document.createElement("p");
    empty.textContent = "Choose an intent to begin.";
    panel.append(empty);
    return panel;
  }

  panel.append(
    renderBlock(
      "Intent",
      "Reflect",
      "Reflect is an incomplete author intention. The playground asks what learners are reflecting on before suggesting a BHE path."
    ),
    renderReflectExamples(selectedOption),
    renderBlock(
      "Clarification",
      selectedOption.label,
      selectedOption.explanation
    ),
    renderReflectSuggestedUses(selectedOption),
    renderReflectMapping(selectedOption),
    renderReflectValidationExamples()
  );

  return panel;
}

function renderProduceDetailPanel(
  selectedIntent: AuthorDiscoveryIntent | undefined,
  selectedOption: ProduceClarificationOption
): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel adp-detail";

  const heading = document.createElement("h2");
  heading.textContent = "3. Clarification path";
  panel.append(heading);

  if (!selectedIntent) {
    const empty = document.createElement("p");
    empty.textContent = "Choose an intent to begin.";
    panel.append(empty);
    return panel;
  }

  panel.append(
    renderBlock(
      "Intent",
      "Produce",
      "Produce is an incomplete author intention. The playground asks what kind of production is expected before suggesting a BHE path."
    ),
    renderProduceExamples(selectedOption),
    renderBlock(
      "Clarification",
      selectedOption.label,
      selectedOption.explanation
    ),
    renderProduceSuggestedUses(selectedOption),
    renderProduceMapping(selectedOption),
    renderProduceValidationExamples()
  );

  return panel;
}

function renderCompareDetailPanel(
  selectedIntent: AuthorDiscoveryIntent | undefined,
  selectedOption: CompareClarificationOption
): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel adp-detail";

  const heading = document.createElement("h2");
  heading.textContent = "3. Clarification path";
  panel.append(heading);

  if (!selectedIntent) {
    const empty = document.createElement("p");
    empty.textContent = "Choose an intent to begin.";
    panel.append(empty);
    return panel;
  }

  panel.append(
    renderBlock(
      "Intent",
      "Compare",
      "Compare is an incomplete author intention. The playground asks what learners are comparing before suggesting a BHE path."
    ),
    renderBlock(
      "Clarification",
      selectedOption.label,
      selectedOption.explanation
    ),
    renderCompareExamples(selectedOption),
    renderCompareSuggestedUses(selectedOption),
    renderCompareMapping(selectedOption),
    renderCompareValidationExamples()
  );

  return panel;
}

function renderCompareExamples(
  option: CompareClarificationOption
): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Examples";

  const list = document.createElement("ul");
  list.className = "adp-notes";

  for (const example of option.examples) {
    const item = document.createElement("li");
    item.textContent = example;
    list.append(item);
  }

  block.append(label, list);
  return block;
}

function renderReflectExamples(
  option: ReflectClarificationOption
): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Examples";

  const list = document.createElement("ul");
  list.className = "adp-notes";

  for (const example of option.examples) {
    const item = document.createElement("li");
    item.textContent = example;
    list.append(item);
  }

  block.append(label, list);
  return block;
}

function renderProduceExamples(
  option: ProduceClarificationOption
): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Examples";

  const list = document.createElement("ul");
  list.className = "adp-notes";

  for (const example of option.examples) {
    const item = document.createElement("li");
    item.textContent = example;
    list.append(item);
  }

  block.append(label, list);
  return block;
}

function renderCompareSuggestedUses(
  option: CompareClarificationOption
): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Suggested Pedagogical Use";

  const list = document.createElement("div");
  list.className = "adp-suggested-list";

  for (const useId of option.suggestedPedagogicalUseIds) {
    const use = useById.get(useId);

    if (!use) {
      continue;
    }

    const item = document.createElement("div");
    item.className = "adp-suggested-card";

    const heading = document.createElement("h3");
    heading.textContent = use.label;

    const description = document.createElement("p");
    description.textContent = use.description;

    const confidence = getRepresentationConfidenceForUse(use.id);
    const badge = document.createElement("span");
    badge.className = `adp-pill ${getConfidenceClass(confidence)}`;
    badge.textContent = confidence.badge;

    item.append(heading, description, badge);
    list.append(item);
  }

  block.append(label, list);
  return block;
}

function renderReflectSuggestedUses(
  option: ReflectClarificationOption
): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Suggested Pedagogical Use";

  const list = document.createElement("div");
  list.className = "adp-suggested-list";

  for (const useId of option.suggestedPedagogicalUseIds) {
    const use = useById.get(useId);

    if (!use) {
      continue;
    }

    const item = document.createElement("div");
    item.className = "adp-suggested-card";

    const heading = document.createElement("h3");
    heading.textContent = use.label;

    const description = document.createElement("p");
    description.textContent = use.description;

    const confidence = getRepresentationConfidenceForUse(use.id);
    const badge = document.createElement("span");
    badge.className = `adp-pill ${getConfidenceClass(confidence)}`;
    badge.textContent = confidence.badge;

    item.append(heading, description, badge);
    list.append(item);
  }

  block.append(label, list);
  return block;
}

function renderProduceSuggestedUses(
  option: ProduceClarificationOption
): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Suggested Pedagogical Use";

  const list = document.createElement("div");
  list.className = "adp-suggested-list";

  for (const useId of option.suggestedPedagogicalUseIds) {
    const use = useById.get(useId);

    if (!use) {
      continue;
    }

    const item = document.createElement("div");
    item.className = "adp-suggested-card";

    const heading = document.createElement("h3");
    heading.textContent = use.label;

    const description = document.createElement("p");
    description.textContent = use.description;

    const confidence = getRepresentationConfidenceForUse(use.id);
    const badge = document.createElement("span");
    badge.className = `adp-pill ${getConfidenceClass(confidence)}`;
    badge.textContent = confidence.badge;

    item.append(heading, description, badge);
    list.append(item);
  }

  block.append(label, list);
  return block;
}

function renderCompareMapping(option: CompareClarificationOption): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Suggested RepresentationPath and BHE mapping";

  const steps = document.createElement("ol");
  steps.className = "adp-path";

  const suggestedUseLabels = option.suggestedPedagogicalUseIds
    .map((useId) => useById.get(useId)?.label)
    .filter((label): label is string => Boolean(label));

  const pathLabels = option.suggestedRepresentationPathIds.map((pathId) => {
    const path = pathByUseId.get(pathId);
    const orchestrationPath = orchestrationPathByUseId.get(pathId);

    if (path) {
      return `RepresentationPath: ${pathId}`;
    }

    if (orchestrationPath) {
      return `AuthorOrchestrationPath: ${orchestrationPath.title}`;
    }

    return pathId;
  });

  const values: readonly (readonly [string, string])[] = [
    ["Author Intent", "Compare"],
    ["Clarification Question", "What are learners comparing?"],
    ["Chosen Category", option.label],
    [
      "Suggested Pedagogical Use",
      suggestedUseLabels.join(" / ") || "No existing Pedagogical Use identified"
    ],
    [
      "Suggested RepresentationPath",
      pathLabels.join(" / ") || "No documented RepresentationPath yet"
    ],
    ["BHE Mapping", option.bheMapping]
  ];

  for (const [stepLabel, value] of values) {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = stepLabel;
    const span = document.createElement("span");
    span.textContent = value;
    item.append(strong, span);
    steps.append(item);
  }

  const limitsTitle = document.createElement("h3");
  limitsTitle.textContent = "Visible limits";

  const limits = document.createElement("ul");
  limits.className = "adp-notes";

  for (const limit of option.limits) {
    const item = document.createElement("li");
    item.textContent = limit;
    limits.append(item);
  }

  block.append(label, steps, limitsTitle, limits);
  return block;
}

function renderProduceMapping(option: ProduceClarificationOption): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Suggested RepresentationPath and BHE mapping";

  const steps = document.createElement("ol");
  steps.className = "adp-path";

  const suggestedUseLabels = option.suggestedPedagogicalUseIds
    .map((useId) => useById.get(useId)?.label)
    .filter((useLabel): useLabel is string => Boolean(useLabel));

  const pathLabels = option.suggestedRepresentationPathIds.map((pathId) => {
    const path = pathByUseId.get(pathId);
    const orchestrationPath = orchestrationPathByUseId.get(pathId);

    if (path) {
      return `RepresentationPath: ${pathId}`;
    }

    if (orchestrationPath) {
      return `AuthorOrchestrationPath: ${orchestrationPath.title}`;
    }

    return pathId;
  });

  const values: readonly (readonly [string, string])[] = [
    ["Author Intent", "Produce"],
    ["Clarification Question", "What kind of production is expected?"],
    ["Chosen Category", option.label],
    [
      "Suggested Pedagogical Use",
      suggestedUseLabels.join(" / ") || "No existing Pedagogical Use identified"
    ],
    [
      "Suggested RepresentationPath",
      pathLabels.join(" / ") || "No documented RepresentationPath yet"
    ],
    ["BHE Mapping", option.bheMapping],
    ["Path Status", option.status]
  ];

  for (const [stepLabel, value] of values) {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = stepLabel;
    const span = document.createElement("span");
    span.textContent = value;
    item.append(strong, span);
    steps.append(item);
  }

  const limitsTitle = document.createElement("h3");
  limitsTitle.textContent = "Visible limits";

  const limits = document.createElement("ul");
  limits.className = "adp-notes";

  for (const limit of option.limits) {
    const item = document.createElement("li");
    item.textContent = limit;
    limits.append(item);
  }

  block.append(label, steps, limitsTitle, limits);
  return block;
}

function renderReflectMapping(option: ReflectClarificationOption): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Suggested RepresentationPath and BHE mapping";

  const steps = document.createElement("ol");
  steps.className = "adp-path";

  const suggestedUseLabels = option.suggestedPedagogicalUseIds
    .map((useId) => useById.get(useId)?.label)
    .filter((useLabel): useLabel is string => Boolean(useLabel));

  const pathLabels = option.suggestedRepresentationPathIds.map((pathId) => {
    const path = pathByUseId.get(pathId);
    const orchestrationPath = orchestrationPathByUseId.get(pathId);

    if (path) {
      return `RepresentationPath: ${pathId}`;
    }

    if (orchestrationPath) {
      return `AuthorOrchestrationPath: ${orchestrationPath.title}`;
    }

    return pathId;
  });

  const values: readonly (readonly [string, string])[] = [
    ["Author Intent", "Reflect"],
    ["Clarification Question", "What are learners reflecting on?"],
    ["Chosen Category", option.label],
    [
      "Suggested Pedagogical Use",
      suggestedUseLabels.join(" / ") || "No existing Pedagogical Use identified"
    ],
    [
      "Suggested RepresentationPath",
      pathLabels.join(" / ") || "No documented RepresentationPath yet"
    ],
    ["BHE Mapping", option.bheMapping]
  ];

  for (const [stepLabel, value] of values) {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = stepLabel;
    const span = document.createElement("span");
    span.textContent = value;
    item.append(strong, span);
    steps.append(item);
  }

  const limitsTitle = document.createElement("h3");
  limitsTitle.textContent = "Visible limits";

  const limits = document.createElement("ul");
  limits.className = "adp-notes";

  for (const limit of option.limits) {
    const item = document.createElement("li");
    item.textContent = limit;
    limits.append(item);
  }

  block.append(label, steps, limitsTitle, limits);
  return block;
}

function renderCompareValidationExamples(): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Real Validation Examples";

  const intro = document.createElement("p");
  intro.textContent =
    "Three Boost'English bricks used to test whether the clarification actually routes the author.";

  const list = document.createElement("div");
  list.className = "adp-validation-list";

  for (const example of compareValidationExamples) {
    const item = document.createElement("div");
    item.className = "adp-validation-card";

    const title = document.createElement("h3");
    title.textContent = example.brick;

    const status = document.createElement("p");
    status.className = `adp-real-path-status ${getBHEPathStatusClass(
      example.bhePathStatus
    )}`;
    status.textContent = `${getBHEPathStatusBadge(example.bhePathStatus)} — ${
      example.bhePathStatusReason
    }`;

    const rows = document.createElement("dl");
    rows.className = "adp-step-mapping";

    const suggestedUseLabels = example.suggestedPedagogicalUseIds
      .map((useId) => useById.get(useId)?.label)
      .filter((useLabel): useLabel is string => Boolean(useLabel));

    const pathLabels = example.suggestedRepresentationPathIds.map((pathId) => {
      const path = pathByUseId.get(pathId);
      const orchestrationPath = orchestrationPathByUseId.get(pathId);

      if (path) {
        return `RepresentationPath: ${pathId}`;
      }

      if (orchestrationPath) {
        return `AuthorOrchestrationPath: ${orchestrationPath.title}`;
      }

      return pathId;
    });

    const values: readonly (readonly [string, string])[] = [
      ["Clarification choice", example.clarificationChoice],
      [
        "Alternatives",
        example.alternativeChoices.join(" / ") || "No strong alternative"
      ],
      [
        "Suggested Pedagogical Use",
        suggestedUseLabels.join(" / ") || "No existing Pedagogical Use identified"
      ],
      [
        "Suggested RepresentationPath",
        pathLabels.join(" / ") || "No documented RepresentationPath yet"
      ],
      ["BHE mapping", example.bheMapping]
    ];

    for (const [term, detail] of values) {
      const dt = document.createElement("dt");
      dt.textContent = term;
      const dd = document.createElement("dd");
      dd.textContent = detail;
      rows.append(dt, dd);
    }

    const argument = document.createElement("p");
    argument.className = "adp-example-reading";
    argument.textContent = example.argument;

    item.append(title, status, rows, argument, renderInteractiveExample(example));
    list.append(item);
  }

  block.append(label, intro, list);
  return block;
}

function renderReflectValidationExamples(): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Real Validation Examples";

  const intro = document.createElement("p");
  intro.textContent =
    "Three Boost'English bricks used to test whether Reflect clarification actually routes the author.";

  const list = document.createElement("div");
  list.className = "adp-validation-list";

  for (const example of reflectValidationExamples) {
    const item = document.createElement("div");
    item.className = "adp-validation-card";

    const title = document.createElement("h3");
    title.textContent = example.brick;

    const rows = document.createElement("dl");
    rows.className = "adp-step-mapping";

    const suggestedUseLabels = example.suggestedPedagogicalUseIds
      .map((useId) => useById.get(useId)?.label)
      .filter((useLabel): useLabel is string => Boolean(useLabel));

    const pathLabels = example.suggestedRepresentationPathIds.map((pathId) => {
      const path = pathByUseId.get(pathId);
      const orchestrationPath = orchestrationPathByUseId.get(pathId);

      if (path) {
        return `RepresentationPath: ${pathId}`;
      }

      if (orchestrationPath) {
        return `AuthorOrchestrationPath: ${orchestrationPath.title}`;
      }

      return pathId;
    });

    const values: readonly (readonly [string, string])[] = [
      ["Clarification choice", example.clarificationChoices.join(" / ")],
      [
        "Suggested Pedagogical Use",
        suggestedUseLabels.join(" / ") || "No existing Pedagogical Use identified"
      ],
      [
        "Suggested RepresentationPath",
        pathLabels.join(" / ") || "No documented RepresentationPath yet"
      ],
      ["BHE mapping", example.bheMapping]
    ];

    for (const [term, detail] of values) {
      const dt = document.createElement("dt");
      dt.textContent = term;
      const dd = document.createElement("dd");
      dd.textContent = detail;
      rows.append(dt, dd);
    }

    const argument = document.createElement("p");
    argument.className = "adp-example-reading";
    argument.textContent = example.argument;

    item.append(title, rows, argument);
    list.append(item);
  }

  block.append(label, intro, list);
  return block;
}

function renderProduceValidationExamples(): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Real Validation Examples";

  const intro = document.createElement("p");
  intro.textContent =
    "Three Boost'English bricks used to test whether Produce clarification actually routes the author.";

  const list = document.createElement("div");
  list.className = "adp-validation-list";

  for (const example of produceValidationExamples) {
    const item = document.createElement("div");
    item.className = "adp-validation-card";

    const title = document.createElement("h3");
    title.textContent = example.brick;

    const rows = document.createElement("dl");
    rows.className = "adp-step-mapping";

    const suggestedUseLabels = example.suggestedPedagogicalUseIds
      .map((useId) => useById.get(useId)?.label)
      .filter((useLabel): useLabel is string => Boolean(useLabel));

    const pathLabels = example.suggestedRepresentationPathIds.map((pathId) => {
      const path = pathByUseId.get(pathId);
      const orchestrationPath = orchestrationPathByUseId.get(pathId);

      if (path) {
        return `RepresentationPath: ${pathId}`;
      }

      if (orchestrationPath) {
        return `AuthorOrchestrationPath: ${orchestrationPath.title}`;
      }

      return pathId;
    });

    const values: readonly (readonly [string, string])[] = [
      ["Clarification choice", example.clarificationChoice],
      [
        "Suggested Pedagogical Use",
        suggestedUseLabels.join(" / ") || "No existing Pedagogical Use identified"
      ],
      [
        "Suggested RepresentationPath",
        pathLabels.join(" / ") || "No documented RepresentationPath yet"
      ],
      ["BHE mapping", example.bheMapping]
    ];

    for (const [term, detail] of values) {
      const dt = document.createElement("dt");
      dt.textContent = term;
      const dd = document.createElement("dd");
      dd.textContent = detail;
      rows.append(dt, dd);
    }

    const argument = document.createElement("p");
    argument.className = "adp-example-reading";
    argument.textContent = example.argument;

    item.append(title, rows, argument);
    list.append(item);
  }

  block.append(label, intro, list);
  return block;
}

function getBHEPathStatusBadge(status: BHEPathConnectionStatus): string {
  if (status === "real-bhe-path") {
    return "🟢 Real BHE Path";
  }

  if (status === "partial-bhe-path") {
    return "🟡 Partial BHE Path";
  }

  return "🔴 Demo Only";
}

function getBHEPathStatusClass(status: BHEPathConnectionStatus): string {
  if (status === "real-bhe-path") {
    return "is-real";
  }

  if (status === "partial-bhe-path") {
    return "is-partial";
  }

  return "is-demo";
}

function renderInteractiveExample(example: CompareValidationExample): HTMLElement {
  if (example.id === "countable-uncountable-compare-validation") {
    return renderCountableUncountableDemo();
  }

  if (example.id === "passive-voice-compare-validation") {
    return renderPassiveVoiceDemo();
  }

  if (example.id === "thinking-in-english-compare-validation") {
    return renderThinkingInEnglishDemo();
  }

  const empty = document.createElement("div");
  empty.className = "adp-demo";
  empty.textContent = "No demo interactive example is attached to this validation yet.";
  return empty;
}

function renderDemoShell(
  titleText: string,
  routeText: string
): {
  shell: HTMLElement;
  body: HTMLElement;
  feedback: HTMLElement;
} {
  const shell = document.createElement("div");
  shell.className = "adp-demo";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Interactive Example";

  const title = document.createElement("h4");
  title.textContent = titleText;

  const route = document.createElement("p");
  route.className = "adp-demo-route";
  route.textContent = routeText;

  const body = document.createElement("div");
  body.className = "adp-demo-body";

  const feedback = document.createElement("div");
  feedback.className = "adp-demo-feedback";
  feedback.textContent = "Demo ready.";

  shell.append(label, title, route, body, feedback);
  return { shell, body, feedback };
}

const countableUncountableClassificationSet: ClassificationSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "structural",
  pedagogicalType: "classification",
  interactionModes: ["drag-drop", "qcm"],
  metadata: {
    id: "countable-uncountable-real-bhe-demo",
    title: "Countable / Uncountable"
  },
  learningGoal: {
    domain: "english",
    skill: "grammar",
    topic: "countable and uncountable nouns"
  },
  content: {
    core: {
      categories: [
        { id: "countable", label: "Countable" },
        { id: "uncountable", label: "Uncountable" }
      ],
      items: [
        { id: "apple", label: "apple", categoryId: "countable", kind: "word" },
        { id: "water", label: "water", categoryId: "uncountable", kind: "word" },
        {
          id: "banana",
          label: "banana",
          categoryId: "countable",
          kind: "word"
        },
        { id: "milk", label: "milk", categoryId: "uncountable", kind: "word" },
        {
          id: "information",
          label: "information",
          categoryId: "uncountable",
          kind: "word"
        },
        { id: "chair", label: "chair", categoryId: "countable", kind: "word" }
      ]
    }
  },
  cognitiveOperations: ["compare", "classify"],
  validate() {
    return (
      this.content.core.categories.length > 0 &&
      this.content.core.items.every((item) =>
        this.content.core.categories.some((category) => category.id === item.categoryId)
      )
    );
  }
};

const passiveVoiceTransformationSet: TransformationSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "productive",
  pedagogicalType: "transformation",
  interactionModes: ["typing"],
  metadata: {
    id: "passive-voice-real-bhe-demo",
    title: "Passive Voice"
  },
  learningGoal: {
    domain: "english",
    skill: "grammar",
    topic: "passive voice"
  },
  content: {
    core: {
      items: [
        {
          id: "active-to-passive-1",
          source: "The technician repaired the machine.",
          expected: "The machine was repaired by the technician.",
          instruction: "Transform into passive voice.",
          transformationType: "active-to-passive"
        }
      ],
      caseSensitive: false
    }
  },
  cognitiveOperations: ["compare", "transform", "produce"],
  validate() {
    return this.content.core.items.length > 0;
  }
};

const thinkingInEnglishIdentificationSet: IdentificationSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "interpretive",
  pedagogicalType: "identification",
  interactionModes: ["selection"],
  metadata: {
    id: "thinking-in-english-partial-bhe-demo",
    title: "Thinking in English"
  },
  learningGoal: {
    domain: "english",
    skill: "speaking",
    topic: "thinking directly in English"
  },
  content: {
    core: {
      context: "Select the statements that describe you.",
      selectionMode: "multiple",
      targets: [
        {
          id: "translate-every-sentence",
          label: "I translate every sentence in my head before speaking."
        },
        {
          id: "sometimes-direct-english",
          label: "I can sometimes think directly in English."
        },
        {
          id: "prepare-chunks",
          label: "I prepare useful chunks before speaking."
        },
        {
          id: "blocked-by-translations",
          label: "I feel blocked when I search for exact translations."
        }
      ]
    }
  },
  cognitiveOperations: ["compare", "reflect", "selfAdjust"],
  validate() {
    return this.content.core.targets.length > 0;
  }
};

function renderCountableUncountableDemo(): HTMLElement {
  const { shell, body, feedback } = renderDemoShell(
    "Real ClassificationSet renderer",
    "Route: Compare -> Categories -> ClassificationSet -> classification drag/drop renderer -> evaluator"
  );

  const instruction = document.createElement("p");
  instruction.textContent =
    "This example instantiates a real ClassificationSet and renders it with the existing classification drag/drop DOM renderer. The renderer calls the existing evaluator when Check is pressed.";

  const rendered = renderClassificationDragDropDom(
    countableUncountableClassificationSet
  );
  feedback.textContent =
    "Connected: ClassificationSet, drag/drop InteractionData, renderer, evaluator.";

  body.append(instruction, rendered);
  return shell;
}

function renderPassiveVoiceDemo(): HTMLElement {
  const { shell, body, feedback } = renderDemoShell(
    "Real TransformationSet renderer",
    "Route: Compare -> Before / After Forms -> TransformationSet -> TransformationInteractionData -> renderer -> evaluator"
  );

  const instruction = document.createElement("p");
  instruction.textContent =
    "This example instantiates a real TransformationSet and renders it with the existing transformation typing DOM renderer. The renderer adapts to TransformationInteractionData and calls the existing evaluator when Check is pressed.";

  const rendered = renderTransformationTypingDom(passiveVoiceTransformationSet);
  feedback.textContent =
    "Connected: TransformationSet, adapter, InteractionData, renderer, evaluator.";

  body.append(instruction, rendered);
  return shell;
}

function renderThinkingInEnglishDemo(): HTMLElement {
  const { shell, body, feedback } = renderDemoShell(
    "Real completed selection path",
    "Route: Compare -> Strategies / Habits -> Reflect Through Selection -> IdentificationSelectionData + UserInput -> completed result helper -> BHEResult.completed -> shared feedback"
  );

  const selectionData = identificationToSelectionData(
    thinkingInEnglishIdentificationSet
  );

  const instruction = document.createElement("p");
  instruction.textContent =
    "This example uses a real IdentificationSet adapter to produce IdentificationSelectionData, records IdentificationSelectionUserInput, then emits BHEResult.completed through the non-corrective completion helper. It does not use the existing Identification evaluator because that evaluator is corrective.";

  const list = document.createElement("div");
  list.className = "adp-demo-checkboxes";

  const updateFeedback = (): void => {
    const selectedTargetIds = Array.from(
      list.querySelectorAll<HTMLInputElement>(
      "input[type='checkbox']:checked"
      )
    ).map((input) => input.value);
    const input: IdentificationSelectionUserInput = {
      kind: "identification-selection",
      timestamp: new Date().toISOString(),
      selectedTargetIds
    };
    const result = createCompletedResultFromUserInput({
      objectId: thinkingInEnglishIdentificationSet.metadata.id,
      input,
      details: {
        selectedTargetIds: input.selectedTargetIds
      },
      signals: ["non-evaluative", "reflective-selection"]
    });

    mountFeedbackFromResult({ result, container: feedback });
  };

  for (const target of selectionData.targets) {
    const label = document.createElement("label");
    label.className = "adp-demo-checkbox";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = target.targetId;
    checkbox.addEventListener("change", updateFeedback);

    const text = document.createElement("span");
    text.textContent = target.label;

    label.append(checkbox, text);
    list.append(label);
  }

  body.append(instruction, list);
  return shell;
}

function renderConfidence(confidence: RepresentationConfidence): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block adp-confidence";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Representation Confidence";

  const badge = document.createElement("p");
  badge.className = `adp-confidence-badge ${getConfidenceClass(confidence)}`;
  badge.textContent = confidence.badge;

  const why = document.createElement("h3");
  why.textContent = "Why?";

  const reasons = document.createElement("ul");
  reasons.className = "adp-notes";

  for (const reason of confidence.reasons) {
    const item = document.createElement("li");
    item.textContent = reason;
    reasons.append(item);
  }

  block.append(label, badge, why, reasons);
  return block;
}

function getConfidenceClass(confidence: RepresentationConfidence): string {
  if (confidence.level === "ready") {
    return "is-ready";
  }

  if (confidence.level === "plausible") {
    return "is-plausible";
  }

  return "is-missing";
}

function renderBlock(label: string, title: string, body: string): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const small = document.createElement("p");
  small.className = "adp-label";
  small.textContent = label;

  const heading = document.createElement("h3");
  heading.textContent = title;

  const text = document.createElement("p");
  text.textContent = body;

  block.append(small, heading, text);
  return block;
}

function renderPath(path: RepresentationPath, useLabel: string): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "RepresentationPath";

  const steps = document.createElement("ol");
  steps.className = "adp-path";

  const evaluation =
    path.evaluation.kind === "existing-evaluator"
      ? `Existing evaluator: ${path.evaluation.evaluator}`
      : path.evaluation.kind;

  const values: readonly (readonly [string, string])[] = [
    ["Pedagogical Use", useLabel],
    ["Interaction Shape", `${path.interaction.suggestedShape} interaction`],
    [
      "InteractionData",
      path.interaction.interactionDataType ??
        "No dedicated InteractionData identified"
    ],
    ["UserInput", path.input.type],
    ["Evaluation Policy", evaluation],
    [
      "BHEResult",
      path.result.statuses.map((status) => `BHEResult.${status}`).join(" / ")
    ]
  ];

  for (const [stepLabel, value] of values) {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = stepLabel;
    const span = document.createElement("span");
    span.textContent = value;
    item.append(strong, span);
    steps.append(item);
  }

  const notes = document.createElement("ul");
  notes.className = "adp-notes";

  for (const note of path.authorNotes) {
    const item = document.createElement("li");
    item.textContent = note;
    notes.append(item);
  }

  block.append(label, steps, notes);
  return block;
}

function renderOrchestrationPath(path: AuthorOrchestrationPath): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Author Orchestration Path";

  const heading = document.createElement("h3");
  heading.textContent = path.title;

  const description = document.createElement("p");
  description.textContent = path.description;

  const corpus = document.createElement("p");
  corpus.className = "adp-example-reading";
  corpus.textContent = `${path.relatedCorpusExample.title}: ${path.relatedCorpusExample.whyThisExample}`;

  const steps = document.createElement("ol");
  steps.className = "adp-orchestration";

  for (const step of path.steps) {
    const item = document.createElement("li");

    const stepTitle = document.createElement("h4");
    stepTitle.textContent = step.label;

    const purpose = document.createElement("p");
    purpose.textContent = step.authorPurpose;

    const mapping = document.createElement("dl");
    mapping.className = "adp-step-mapping";

    const rows: readonly (readonly [string, string])[] = [
      ["Cognitive operation", step.cognitiveOperation],
      ["Suggested Pedagogical Use", step.suggestedPedagogicalUse],
      [
        "RepresentationPath",
        step.representationPathId ?? "No single documented RepresentationPath"
      ],
      ["Possible BHE representation", step.bheMapping.possibleRepresentation],
      ["InteractionData", step.bheMapping.interactionData ?? "Not fixed yet"],
      ["UserInput", step.bheMapping.userInput ?? "Not fixed yet"],
      ["Evaluation policy", step.evaluationPolicy],
      ["Result semantics", step.resultSemantics]
    ];

    for (const [term, detail] of rows) {
      const dt = document.createElement("dt");
      dt.textContent = term;
      const dd = document.createElement("dd");
      dd.textContent = detail;
      mapping.append(dt, dd);
    }

    const notes = document.createElement("ul");
    notes.className = "adp-notes";

    for (const note of step.notes) {
      const noteItem = document.createElement("li");
      noteItem.textContent = note;
      notes.append(noteItem);
    }

    item.append(stepTitle, purpose, mapping, notes);
    steps.append(item);
  }

  const limitationsTitle = document.createElement("h4");
  limitationsTitle.textContent = "Limitations";

  const limitations = document.createElement("ul");
  limitations.className = "adp-notes";

  for (const limitation of path.limitations) {
    const item = document.createElement("li");
    item.textContent = limitation;
    limitations.append(item);
  }

  block.append(
    label,
    heading,
    description,
    corpus,
    steps,
    limitationsTitle,
    limitations
  );
  return block;
}

function renderExamples(
  examples: readonly AuthorDiscoveryExample[]
): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "4. Real Boost'English example";
  block.append(label);

  if (examples.length === 0) {
    const empty = document.createElement("p");
    empty.textContent =
      "No real corpus example is attached to this path in V0.";
    block.append(empty);
    return block;
  }

  for (const example of examples) {
    const heading = document.createElement("h3");
    heading.textContent = example.title;

    const summary = document.createElement("p");
    summary.textContent = example.summary;

    const reading = document.createElement("p");
    reading.className = "adp-example-reading";
    reading.textContent = example.representationReading;

    block.append(heading, summary, reading);
  }

  return block;
}

const defaultRoot =
  typeof document === "undefined"
    ? null
    : document.getElementById("author-discovery-playground");

if (defaultRoot) {
  renderAuthorDiscoveryPlayground(defaultRoot);
}
