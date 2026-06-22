import type { CognitiveOperation } from "../../core/types/index.js";

export type AuthorOrchestrationConfidence = "plausible" | "ready-experimental";

export type AuthorOrchestrationEvaluationPolicy =
  | "non-evaluative"
  | "possibly non-evaluative or lightly evaluated"
  | "qualitative or non-final evaluation"
  | "evaluative";

export interface AuthorOrchestrationStep {
  label: string;
  authorPurpose: string;
  cognitiveOperation: CognitiveOperation | "conceptualize" | "apply";
  suggestedPedagogicalUse: string;
  representationPathId?: string;
  bheMapping: {
    possibleRepresentation: string;
    interactionData?: string;
    userInput?: string;
  };
  evaluationPolicy: AuthorOrchestrationEvaluationPolicy;
  resultSemantics: string;
  notes: readonly string[];
}

export interface AuthorOrchestrationPath {
  id: string;
  title: string;
  description: string;
  pedagogicalUseId: string;
  steps: readonly AuthorOrchestrationStep[];
  relatedCorpusExample: {
    title: string;
    source: string;
    whyThisExample: string;
  };
  confidence: AuthorOrchestrationConfidence;
  limitations: readonly string[];
}
