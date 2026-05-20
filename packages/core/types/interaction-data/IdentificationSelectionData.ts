export interface IdentificationSelectionTarget {
  targetId: string;
  label: string;
  expected?: boolean;
  feedback?: string;
}

export interface IdentificationSelectionData {
  context: string;
  selectionMode: "single" | "multiple";
  targets: IdentificationSelectionTarget[];
}
