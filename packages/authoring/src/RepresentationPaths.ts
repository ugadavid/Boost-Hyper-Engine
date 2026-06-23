import type { RepresentationPath } from "./RepresentationPath.js";

/**
 * First experimental paths connecting author-facing pedagogical uses to
 * existing BHE representation vocabulary.
 */
export const representationPaths = [
  {
    pedagogicalUseId: "reflect-through-selection",
    interaction: {
      suggestedShape: "selection",
      interactionDataType: "IdentificationSelectionData",
      fit: "structural",
      meaning: "Selectable statements let the learner report a personal observation."
    },
    input: {
      type: "IdentificationSelectionUserInput",
      fit: "structural",
      meaning: "selectedTargetIds records the statements selected by the learner."
    },
    evaluation: {
      kind: "non-evaluative",
      correctness: "not-applicable"
    },
    result: {
      statuses: ["completed"],
      score: "omitted",
      meaning: "The result records meaningful participation, not correctness."
    },
    authorNotes: [
      "Omit expected targets.",
      "Do not call the Identification evaluator.",
      "Use informational continuation rather than corrective feedback.",
      "IdentificationSelectionUserInput is the nearest current carrier, not a perfect semantic name."
    ]
  },
  {
    pedagogicalUseId: "diagnose-through-selection",
    interaction: {
      suggestedShape: "selection",
      interactionDataType: "IdentificationSelectionData",
      fit: "structural",
      meaning: "Selected options expose starting-point evidence or support needs."
    },
    input: {
      type: "IdentificationSelectionUserInput",
      fit: "structural",
      meaning: "selectedTargetIds records the learner's starting-point evidence."
    },
    evaluation: {
      kind: "context-dependent",
      correctness: "activity-defined"
    },
    result: {
      statuses: ["completed", "success", "partial", "failed"],
      score: "context-dependent",
      meaning: "Self-report produces completion; a knowledge check may produce evaluated performance."
    },
    authorNotes: [
      "Diagnosis describes how evidence is used, not whether it is scored.",
      "Omit expected targets when the activity is self-positioning.",
      "Define the downstream support or routing decision separately."
    ]
  },
  {
    pedagogicalUseId: "recall-through-typing",
    interaction: {
      suggestedShape: "typing",
      interactionDataType: "MemorizationTypingRecallData",
      fit: "semantic",
      meaning: "A cue asks the learner to retrieve a target before seeing it."
    },
    input: {
      type: "MemorizationTypingRecallUserInput",
      fit: "semantic",
      meaning: "attempts records one typed retrieval attempt for each recall item."
    },
    evaluation: {
      kind: "existing-evaluator",
      correctness: "deterministic",
      evaluator: "evaluateMemorizationTypingRecall"
    },
    result: {
      statuses: ["success", "partial", "failed"],
      score: "included",
      meaning: "The result reports retrieval performance and item-level correctness."
    },
    authorNotes: [
      "Keep recall distinct from GapFill completion and Transformation typing.",
      "Accepted targets may complement the expected target."
    ]
  },
  {
    pedagogicalUseId: "practice-through-controlled-interaction",
    interaction: {
      suggestedShape: "drag-drop",
      interactionDataType: "ClassificationDragDropData",
      fit: "semantic",
      meaning:
        "Stable categories and classifiable items are presented through a controlled drag/drop classification interaction."
    },
    input: {
      type: "ClassificationDragDropUserInput",
      fit: "semantic",
      meaning:
        "placements records which category each item was placed into by the learner."
    },
    evaluation: {
      kind: "existing-evaluator",
      correctness: "deterministic",
      evaluator: "evaluateClassificationDragDrop"
    },
    result: {
      statuses: ["success", "partial", "failed"],
      score: "included",
      meaning:
        "The result reports classification performance by comparing each placement with the expected category."
    },
    authorNotes: [
      "Use this path when categories are stable and item-category membership is known.",
      "This materializes the Compare -> Categories -> ClassificationSet route without creating a Compare-specific core concept.",
      "Use Explore Before The Rule instead when categories are still emerging or hypothesis formation is the main activity."
    ]
  },
  {
    pedagogicalUseId: "reflect-through-typing",
    interaction: {
      suggestedShape: "typing",
      fit: "structural",
      meaning: "Open text lets the learner put a strategy, opinion, or realization into words."
    },
    input: {
      type: "ContextualTypingUserInput",
      fit: "structural",
      meaning: "A prompt-associated typed value carries the reflection."
    },
    evaluation: {
      kind: "non-evaluative",
      correctness: "not-applicable"
    },
    result: {
      statuses: ["completed"],
      score: "omitted",
      meaning: "The result acknowledges submission of the reflection without answer matching."
    },
    authorNotes: [
      "Do not apply deterministic text matching.",
      "ContextualTypingUserInput is only the closest structural carrier; blankId vocabulary remains awkward.",
      "No neutral open-text InteractionData is currently identified by this path."
    ]
  },
  {
    pedagogicalUseId: "apply-through-situated-task",
    interaction: {
      suggestedShape: "typing",
      fit: "structural",
      meaning: "In this plausible path, the learner writes a response intended to work in a concrete situation."
    },
    input: {
      type: "ContextualTypingUserInput",
      fit: "structural",
      meaning: "A prompt-associated typed value carries the situated response."
    },
    evaluation: {
      kind: "context-dependent",
      correctness: "activity-defined"
    },
    result: {
      statuses: ["completed", "success", "partial", "failed"],
      score: "context-dependent",
      meaning: "Completion records submission; evaluated statuses require observable functional criteria."
    },
    authorNotes: [
      "A situated task is pedagogical framing, not an interaction shape.",
      "Typing is one plausible path; another task may require selection, drag-drop, or reorder.",
      "Define what observable outcome makes the action functionally successful.",
      "The submitted response may not be sufficient evidence of situated success."
    ]
  }
] as const satisfies readonly RepresentationPath[];
