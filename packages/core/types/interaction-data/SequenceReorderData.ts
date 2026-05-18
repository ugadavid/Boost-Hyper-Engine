export interface SequenceReorderItem {
  itemId: string;
  label: string;
  expectedPosition: number;
  initialPosition?: number;
}

export interface SequenceReorderData {
  items: SequenceReorderItem[];
}
