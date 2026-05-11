import type {
  AssociationDragDropUserInput,
  AssociationSet
} from "../packages/core/types/index.js";
import { evaluateAssociationDragDrop } from "../packages/core/evaluators/index.js";
import { associationToDragDropData } from "../packages/renderer/adapters/associationToDragDropAdapter.js";

const associationSet: AssociationSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "structural",
  pedagogicalType: "association",
  interactionModes: ["drag-drop"],
  metadata: {
    id: "association-drag-drop-evaluator",
    title: "Association Drag-Drop Evaluator",
    language: "en",
    createdAt: "2026-05-11T00:00:00.000Z"
  },
  learningGoal: {
    domain: "languages",
    skill: "vocabulary",
    topic: "personality adjectives"
  },
  content: {
    core: {
      entries: [
        { id: "kind-text", label: "kind", unit: { id: "unit-kind", kind: "text", text: "kind" } },
        { id: "gentle-text", label: "gentle", unit: { id: "unit-gentle", kind: "text", text: "gentle" } },
        { id: "curious-text", label: "curious", unit: { id: "unit-curious", kind: "text", text: "curious" } },
        {
          id: "curious-image",
          kind: "image",
          unit: {
            id: "unit-curious-image",
            kind: "image",
            src: "assets/images/curious-student.png",
            alt: "a curious student"
          }
        },
        { id: "creative-text", label: "creative", unit: { id: "unit-creative", kind: "text", text: "creative" } },
        {
          id: "creative-image",
          kind: "image",
          unit: {
            id: "unit-creative-image",
            kind: "image",
            src: "assets/images/creative-person.png",
            alt: "a creative person"
          }
        },
        {
          id: "creative-audio",
          kind: "audio",
          unit: {
            id: "unit-creative-audio",
            kind: "audio",
            src: "assets/audio/creative.mp3",
            transcript: "creative"
          }
        }
      ],
      associations: [
        {
          id: "text-to-text-zone",
          entryIds: ["kind-text", "gentle-text"],
          feedback: "Group the two related text adjectives."
        },
        {
          id: "text-to-image-zone",
          entryIds: ["curious-text", "curious-image"],
          feedback: "Group the adjective with its image."
        },
        {
          id: "text-image-audio-zone",
          entryIds: ["creative-text", "creative-image", "creative-audio"],
          feedback: "Group the word, image, and audio."
        }
      ]
    }
  },
  validate() {
    return true;
  }
};

const dragDropData = associationToDragDropData(associationSet);

const scenarios: Array<{
  name: string;
  userInput: AssociationDragDropUserInput;
}> = [
  {
    name: "success",
    userInput: {
      interactionMode: "drag-drop",
      placements: [
        { entryId: "kind-text", zoneId: "text-to-text-zone" },
        { entryId: "gentle-text", zoneId: "text-to-text-zone" },
        { entryId: "curious-text", zoneId: "text-to-image-zone" },
        { entryId: "curious-image", zoneId: "text-to-image-zone" },
        { entryId: "creative-text", zoneId: "text-image-audio-zone" },
        { entryId: "creative-image", zoneId: "text-image-audio-zone" },
        { entryId: "creative-audio", zoneId: "text-image-audio-zone" }
      ],
      timestamp: "2026-05-11T00:00:00.000Z"
    }
  },
  {
    name: "failed",
    userInput: {
      interactionMode: "drag-drop",
      placements: [
        { entryId: "kind-text", zoneId: "text-to-image-zone" },
        { entryId: "gentle-text", zoneId: "text-image-audio-zone" },
        { entryId: "curious-text", zoneId: "text-to-text-zone" },
        { entryId: "curious-image", zoneId: "text-image-audio-zone" },
        { entryId: "creative-text", zoneId: "text-to-image-zone" },
        { entryId: "creative-image", zoneId: "text-to-text-zone" },
        { entryId: "creative-audio", zoneId: "text-to-text-zone" }
      ],
      timestamp: "2026-05-11T00:00:00.000Z"
    }
  },
  {
    name: "partial",
    userInput: {
      interactionMode: "drag-drop",
      placements: [
        { entryId: "kind-text", zoneId: "text-to-text-zone" },
        { entryId: "gentle-text", zoneId: "text-to-text-zone" },
        { entryId: "curious-text", zoneId: "text-to-image-zone" },
        { entryId: "creative-image", zoneId: "text-to-image-zone" },
        { entryId: "creative-text", zoneId: "text-image-audio-zone" },
        { entryId: "creative-audio", zoneId: "text-image-audio-zone" }
      ],
      timestamp: "2026-05-11T00:00:00.000Z"
    }
  },
  {
    name: "wrong-zone",
    userInput: {
      interactionMode: "drag-drop",
      placements: [
        { entryId: "kind-text", zoneId: "text-to-text-zone" },
        { entryId: "gentle-text", zoneId: "text-to-text-zone" },
        { entryId: "curious-text", zoneId: "text-to-image-zone" },
        { entryId: "curious-image", zoneId: "text-image-audio-zone" },
        { entryId: "creative-text", zoneId: "text-image-audio-zone" },
        { entryId: "creative-image", zoneId: "text-image-audio-zone" },
        { entryId: "creative-audio", zoneId: "text-image-audio-zone" }
      ],
      timestamp: "2026-05-11T00:00:00.000Z"
    }
  }
];

const scenarioResults = scenarios.map((scenario) => {
  const result = evaluateAssociationDragDrop(dragDropData, scenario.userInput);

  return {
    scenario: scenario.name,
    status: result.status,
    score: result.score,
    maxScore: result.maxScore,
    groupResults: result.details?.groupResults.map((groupResult) => ({
      zoneId: groupResult.zoneId,
      isCorrect: groupResult.isCorrect,
      missingEntryIds: groupResult.missingEntryIds,
      extraEntryIds: groupResult.extraEntryIds
    }))
  };
});

console.log(JSON.stringify({
  dragDropData,
  scenarios: scenarioResults
}, null, 2));
