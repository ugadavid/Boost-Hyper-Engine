import type { ClassificationSet } from "../packages/core/types/index.js";
import { classificationToDragDropData } from "../packages/renderer/adapters/classificationToDragDropAdapter.js";

const frenchGenderClassification: ClassificationSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "structural",
  pedagogicalType: "classification",
  interactionModes: ["drag-drop", "qcm"],
  metadata: {
    id: "french-gender-drag-drop",
    title: "French Gender Drag-Drop",
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
        {
          id: "masculine",
          label: "Masculin"
        },
        {
          id: "feminine",
          label: "Feminin"
        }
      ],
      items: [
        {
          id: "item-livre",
          label: "livre",
          categoryId: "masculine",
          kind: "word"
        },
        {
          id: "item-table",
          label: "table",
          categoryId: "feminine",
          kind: "word"
        },
        {
          id: "item-cahier",
          label: "cahier",
          categoryId: "masculine",
          kind: "word"
        },
        {
          id: "item-maison",
          label: "maison",
          categoryId: "feminine",
          kind: "word"
        }
      ]
    }
  },
  validate() {
    return true;
  }
};

const dragDropData = classificationToDragDropData(frenchGenderClassification);

console.log(JSON.stringify(dragDropData, null, 2));
