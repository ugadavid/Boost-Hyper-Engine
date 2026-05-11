import type { ClassificationSet, QcmUserInput } from "../packages/core/types/index.js";
import { evaluateClassificationQcm } from "../packages/core/evaluators/index.js";
import { classificationToQcmData } from "../packages/renderer/adapters/classificationToQcmAdapter.js";

const classificationSet: ClassificationSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "structural",
  pedagogicalType: "classification",
  interactionModes: ["qcm"],
  metadata: {
    id: "gender-classification-qcm",
    title: "Masculine Or Feminine",
    language: "fr",
    createdAt: "2026-05-11T00:00:00.000Z"
  },
  learningGoal: {
    domain: "languages",
    skill: "grammar",
    topic: "gender"
  },
  content: {
    core: {
      categories: [
        {
          id: "masculine",
          label: "Masculine"
        },
        {
          id: "feminine",
          label: "Feminine"
        }
      ],
      items: [
        {
          id: "la-maison",
          label: "la maison",
          categoryId: "feminine"
        }
      ]
    }
  },
  validate() {
    return true;
  }
};

const qcmData = classificationToQcmData(classificationSet);

const userInput: QcmUserInput = {
  interactionMode: "qcm",
  selectedChoiceId: "feminine",
  timestamp: "2026-05-11T00:00:00.000Z"
};

const result = evaluateClassificationQcm(qcmData, userInput);

console.log(JSON.stringify(result, null, 2));
