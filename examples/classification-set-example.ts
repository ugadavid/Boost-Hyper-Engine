import type { ClassificationSet } from "../packages/core/types/index.js";

const frenchGenderClassification: ClassificationSet = {
  kind: "pedagogical-object",
  type: "classification-set",
  pedagogicalFamily: "structural",
  pedagogicalType: "classification",
  metadata: {
    id: "french-gender-classification",
    title: "Masculin / Feminin",
    language: "fr",
    level: "A1",
    tags: ["grammar", "gender", "nouns"]
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
        {
          id: "item-livre",
          label: "livre",
          categoryId: "masculine",
          kind: "word",
          feedback: "On dit un livre."
        },
        {
          id: "item-table",
          label: "table",
          categoryId: "feminine",
          kind: "word",
          feedback: "On dit une table."
        },
        {
          id: "item-chien",
          label: "chien",
          categoryId: "masculine",
          kind: "word",
          feedback: "On dit un chien."
        },
        {
          id: "item-maison",
          label: "maison",
          categoryId: "feminine",
          kind: "word",
          feedback: "On dit une maison."
        }
      ]
    },
    support: {
      hints: [
        {
          id: "hint-article",
          type: "hint",
          value: "Observe the article: un often marks masculine, une often marks feminine."
        }
      ],
      examples: [
        {
          id: "example-gender",
          type: "example",
          value: "un livre / une table"
        }
      ]
    }
  },
  interactionModes: ["drag-drop", "qcm"],
  validate() {
    const categoryIds = this.content.core.categories.map((category) => category.id);
    return this.content.core.items.every((item) => categoryIds.includes(item.categoryId));
  }
};

const interactionModeExamples = frenchGenderClassification.interactionModes.map(
  (interactionMode) => ({
    interactionMode,
    classificationSetId: frenchGenderClassification.metadata.id
  })
);

console.log({
  classificationSet: frenchGenderClassification.metadata.title,
  valid: frenchGenderClassification.validate(),
  interactionModeExamples
});
