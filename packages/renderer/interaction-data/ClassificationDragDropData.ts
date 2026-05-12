export interface ClassificationDragDropItem {
  itemId: string;
  label: string;
  expectedCategoryId: string;
  kind?: string;
  metadata?: Record<string, unknown>;
}

export interface ClassificationDropZone {
  categoryId: string;
  label: string;
  metadata?: Record<string, unknown>;
}

export interface ClassificationDragDropData {
  draggableItems: ClassificationDragDropItem[];
  dropZones: ClassificationDropZone[];
}
