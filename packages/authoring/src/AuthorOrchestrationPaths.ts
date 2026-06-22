import type { AuthorOrchestrationPath } from "./AuthorOrchestrationPath.js";

export const authorOrchestrationPaths = [
  {
    id: "explore-before-rule-countable-uncountable",
    title: "Explore Before The Rule",
    description:
      "A composed authoring path for guiding learners from examples toward an explicit rule without making this a new BHE core object.",
    pedagogicalUseId: "explore-before-rule",
    steps: [
      {
        label: "Observe",
        authorPurpose:
          "Help learners notice examples before the rule is explained.",
        cognitiveOperation: "notice",
        suggestedPedagogicalUse: "Reflect Through Selection",
        representationPathId: "reflect-through-selection",
        bheMapping: {
          possibleRepresentation: "Identification / Selection",
          interactionData: "IdentificationSelectionData",
          userInput: "IdentificationSelectionUserInput"
        },
        evaluationPolicy: "non-evaluative",
        resultSemantics: "BHEResult.completed",
        notes: [
          "The learner is not being tested yet.",
          "Selection works as a carrier for noticing, not as corrective identification."
        ]
      },
      {
        label: "Compare",
        authorPurpose:
          "Help learners compare examples and notice contrasts.",
        cognitiveOperation: "compare",
        suggestedPedagogicalUse: "Explore Before The Rule",
        bheMapping: {
          possibleRepresentation: "Classification or Selection"
        },
        evaluationPolicy: "possibly non-evaluative or lightly evaluated",
        resultSemantics:
          "BHEResult.completed, or success / partial if a classification check is used",
        notes: [
          "ClassificationSet and selection can both support comparison, but the exact authoring path is not documented yet.",
          "This step is plausible, not fully mapped."
        ]
      },
      {
        label: "Infer",
        authorPurpose:
          "Help learners formulate a hypothesis from evidence.",
        cognitiveOperation: "infer",
        suggestedPedagogicalUse: "Explore Before The Rule",
        bheMapping: {
          possibleRepresentation: "InferenceSet"
        },
        evaluationPolicy: "qualitative or non-final evaluation",
        resultSemantics: "BHEResult.completed or BHEResult.partial",
        notes: [
          "InferenceSet already describes hypothesis production from clues.",
          "The hypothesis may be meaningful even when it is not finally correct."
        ]
      },
      {
        label: "Stabilize",
        authorPurpose:
          "Make the emerging rule explicit and conceptually stable.",
        cognitiveOperation: "conceptualize",
        suggestedPedagogicalUse: "Explore Before The Rule",
        bheMapping: {
          possibleRepresentation:
            "Explanation / Learning Experience Layer / authoring-only step"
        },
        evaluationPolicy: "non-evaluative",
        resultSemantics: "BHEResult.completed",
        notes: [
          "This is the most fragile step because BHE has no dedicated explanation or stabilization object.",
          "For now, stabilization remains authoring-only documentation around existing content."
        ]
      },
      {
        label: "Practice",
        authorPurpose:
          "Let learners apply the stabilized rule.",
        cognitiveOperation: "classify",
        suggestedPedagogicalUse: "Practice Through Controlled Interaction",
        bheMapping: {
          possibleRepresentation:
            "ClassificationSet / GapFillSet / TransformationSet"
        },
        evaluationPolicy: "evaluative",
        resultSemantics: "BHEResult.success / partial / failed",
        notes: [
          "This step is well aligned with existing evaluative BHE patterns.",
          "The exact representation depends on whether practice asks learners to classify, complete, or transform."
        ]
      }
    ],
    relatedCorpusExample: {
      title: "Countable / Uncountable — I Learn",
      source: "Boost'English corpus",
      whyThisExample:
        "The documented POC describes a guided path from concrete examples to comparison, inference, conceptualization, and later practice."
    },
    confidence: "plausible",
    limitations: [
      "This is not a single RepresentationPath.",
      "Compare and Infer are plausible but not yet documented as author-facing paths.",
      "Stabilize remains authoring-only because the core has no dedicated explanation or rule-stabilization object.",
      "Practice branches into several possible BHE structures depending on the final task."
    ]
  }
] as const satisfies readonly AuthorOrchestrationPath[];
