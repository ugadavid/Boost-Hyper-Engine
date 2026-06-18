/**
 * Experimental author-facing description of a pedagogical use.
 *
 * This type belongs to the authoring aid layer, not to the BHE core model.
 */
export type PedagogicalUse = {
  id: string;
  label: string;
  authorQuestion: string;
  description: string;
  pedagogicalIntentions: string[];
  suggestedInteractionShapes: string[];
  cognitiveOperations?: string[];
  nonEvaluative?: boolean;
  examples?: string[];
  notes?: string;
};
