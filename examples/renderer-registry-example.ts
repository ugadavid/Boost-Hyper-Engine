import { registerRenderer, findRenderer } from "../packages/renderer/registry/rendererRegistry.js";
import { associationDragDropTextRenderer } from "../packages/renderer/renderers/associationDragDropTextRenderer.js";
import { classificationQcmTextRenderer } from "../packages/renderer/renderers/classificationQcmTextRenderer.js";
import type { AssociationSet, ClassificationSet } from "../packages/core/types/index.js";

registerRenderer(associationDragDropTextRenderer);
registerRenderer(classificationQcmTextRenderer);

const personalityAdjectivesAssociations: AssociationSet = {
  kind: "pedagogical-object",
  type: "association-set",
  pedagogicalFamily: "structural",
  pedagogicalType: "association",
  metadata: {
    id: "personality-adjectives-associations",
    title: "Personality Adjectives",
    language: "en",
    level: "A2"
  },
  learningGoal: {
    domain: "English",
    skill: "vocabulary",
    topic: "personality adjectives",
    cefr: "A2"
  },
  content: {
    core: {
      entries: [
        { id: "word-kind", label: "kind", kind: "word" },
        { id: "definition-kind", label: "friendly and helpful", kind: "definition" }
      ],
      associations: [
        {
          id: "kind-definition",
          entryIds: ["word-kind", "definition-kind"]
        }
      ]
    }
  },
  interactionModes: ["drag-drop", "memory", "flashcards"],
  validate() {
    return true;
  }
};

const frenchGenderClassification: ClassificationSet = {
  kind: "pedagogical-object",
  type: "classification-set",
  pedagogicalFamily: "structural",
  pedagogicalType: "classification",
  metadata: {
    id: "french-gender-classification",
    title: "Masculin / Feminin",
    language: "fr",
    level: "A1"
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
        { id: "item-table", label: "table", categoryId: "feminine", kind: "word" }
      ]
    }
  },
  interactionModes: ["drag-drop", "qcm"],
  validate() {
    const categoryIds = this.content.core.categories.map((category) => category.id);
    return this.content.core.items.every((item) => categoryIds.includes(item.categoryId));
  }
};

const associationRenderer = findRenderer(personalityAdjectivesAssociations, "drag-drop");
const classificationRenderer = findRenderer(frenchGenderClassification, "qcm");

console.log(
  associationRenderer?.render(personalityAdjectivesAssociations, "drag-drop") ??
    "No association renderer found."
);

console.log(
  classificationRenderer?.render(frenchGenderClassification, "qcm") ??
    "No classification renderer found."
);
