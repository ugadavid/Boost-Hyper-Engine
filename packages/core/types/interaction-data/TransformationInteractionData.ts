export interface TransformationInteractionItem {
  itemId: string;
  source: string;
  transformationType?: string;
  instruction?: string;
  expected: string | string[];
  accepted?: string[];
  hint?: string;
  feedback?: string;
}

export interface TransformationInteractionData {
  items: TransformationInteractionItem[];
}
