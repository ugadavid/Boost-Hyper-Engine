import type { BHEResult, QcmUserInput } from "../types/index.js";

export interface ClassificationQcmQuestion {
  id: string;
  correctChoiceId: string;
}

export interface ClassificationQcmData {
  questions: ClassificationQcmQuestion[];
}

export interface ClassificationQcmResultDetails {
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
}

export function evaluateClassificationQcm(
  qcmData: ClassificationQcmData | ClassificationQcmQuestion,
  input: QcmUserInput
): BHEResult<ClassificationQcmResultDetails> {
  const question = "questions" in qcmData ? qcmData.questions[0] : qcmData;

  if (!question) {
    return {
      objectId: "classification-qcm",
      status: "failed",
      score: 0,
      maxScore: 1,
      completion: 1,
      details: {
        selectedChoiceId: input.selectedChoiceId,
        correctChoiceId: "",
        isCorrect: false
      }
    };
  }

  const isCorrect = input.selectedChoiceId === question.correctChoiceId;

  return {
    objectId: question.id,
    status: isCorrect ? "success" : "failed",
    score: isCorrect ? 1 : 0,
    maxScore: 1,
    completion: 1,
    details: {
      selectedChoiceId: input.selectedChoiceId,
      correctChoiceId: question.correctChoiceId,
      isCorrect
    }
  };
}
