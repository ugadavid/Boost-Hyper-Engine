export interface DragDropTarget {
  id: string;
  label: string;
  position?: {
    x: number;
    y: number;
    unit?: string;
    align?: string;
  };
}

export interface DragDropItem {
  id: string;
  label: string;
  target: string;
  position?: {
    x: number;
    y: number;
    unit?: string;
    align?: string;
  };
}

export interface DragDropData {
  targets: DragDropTarget[];
  items: DragDropItem[];
  shuffle: boolean;
  layout?: "horizontal" | "vertical" | "manual";
}
