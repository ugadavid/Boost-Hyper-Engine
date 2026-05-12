import type {
  ClassificationDragDropUserInput,
  ClassificationSet
} from "../packages/core/types/index.js";
import { evaluateClassificationDragDrop } from "../packages/core/evaluators/index.js";
import { classificationToDragDropData } from "../packages/renderer/adapters/classificationToDragDropAdapter.js";

const frenchGenderClassification: ClassificationSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "structural",
  pedagogicalType: "classification",
  interactionModes: ["drag-drop", "qcm"],
  metadata: {
    id: "french-gender-drag-drop-evaluator",
    title: "French Gender Drag-Drop Evaluator",
    language: "fr",
    createdAt: "2026-05-12T00:00:00.000Z"
  },
  learningGoal: {
    domain: "French",
    skill: "grammar",
    topic: "noun gender",
    cefr: "A1"
  },
  content: {
    core: {
      categories: [
        { id: "masculine", label: "Masculin" },
        { id: "feminine", label: "Feminin" }
      ],
      items: [
        { id: "item-livre", label: "livre", categoryId: "masculine", kind: "word" },
        { id: "item-table", label: "table", categoryId: "feminine", kind: "word" },
        { id: "item-cahier", label: "cahier", categoryId: "masculine", kind: "word" },
        { id: "item-maison", label: "maison", categoryId: "feminine", kind: "word" }
      ]
    }
  },
  validate() {
    return true;
  }
};

const dragDropData = classificationToDragDropData(frenchGenderClassification);

const scenarios: Array<{
  name: string;
  userInput: ClassificationDragDropUserInput;
}> = [
  {
    name: "success",
    userInput: {
      interactionMode: "drag-drop",
      placements: [
        { itemId: "item-livre", categoryId: "masculine" },
        { itemId: "item-table", categoryId: "feminine" },
        { itemId: "item-cahier", categoryId: "masculine" },
        { itemId: "item-maison", categoryId: "feminine" }
      ],
      timestamp: "2026-05-12T00:00:00.000Z"
    }
  },
  {
    name: "failed",
    userInput: {
      interactionMode: "drag-drop",
      placements: [
        { itemId: "item-livre", categoryId: "feminine" },
        { itemId: "item-table", categoryId: "masculine" },
        { itemId: "item-cahier", categoryId: "feminine" },
        { itemId: "item-maison", categoryId: "masculine" }
      ],
      timestamp: "2026-05-12T00:00:00.000Z"
    }
  },
  {
    name: "partial",
    userInput: {
      interactionMode: "drag-drop",
      placements: [
        { itemId: "item-livre", categoryId: "masculine" },
        { itemId: "item-table", categoryId: "masculine" },
        { itemId: "item-cahier", categoryId: "masculine" },
        { itemId: "item-maison", categoryId: "masculine" }
      ],
      timestamp: "2026-05-12T00:00:00.000Z"
    }
  },
  {
    name: "missing-item",
    userInput: {
      interactionMode: "drag-drop",
      placements: [
        { itemId: "item-livre", categoryId: "masculine" },
        { itemId: "item-table", categoryId: "feminine" },
        { itemId: "item-cahier", categoryId: "masculine" }
      ],
      timestamp: "2026-05-12T00:00:00.000Z"
    }
  }
];

const scenarioResults = scenarios.map((scenario) => {
  const result = evaluateClassificationDragDrop(dragDropData, scenario.userInput);

  return {
    scenario: scenario.name,
    status: result.status,
    score: result.score,
    maxScore: result.maxScore,
    itemResults: result.details?.itemResults,
    missingItemIds: result.details?.missingItemIds
  };
});

console.log(JSON.stringify({
  dragDropData,
  scenarios: scenarioResults
}, null, 2));
