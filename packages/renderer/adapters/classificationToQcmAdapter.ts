import type { ClassificationSet } from "../../core/types/index.js";

export interface QcmChoiceData {
  id: string;
  label: string;
}

export interface QcmQuestionData {
  id: string;
  prompt: string;
  choices: QcmChoiceData[];
  correctChoiceId: string;
}

export interface QcmData {
  questions: QcmQuestionData[];
}

export function classificationToQcmData(object: ClassificationSet): QcmData {
  const categoriesById = new Map(
    object.content.core.categories.map((category) => [category.id, category])
  );

  const choices = object.content.core.categories.map((category) => ({
    id: category.id,
    label: category.label
  }));

  const questions = object.content.core.items.flatMap((item) => {
    if (!categoriesById.has(item.categoryId)) {
      return [];
    }

    return [
      {
        id: item.id,
        prompt: `Choose the right category for: ${item.label}`,
        choices,
        correctChoiceId: item.categoryId
      }
    ];
  });

  return { questions };
}
