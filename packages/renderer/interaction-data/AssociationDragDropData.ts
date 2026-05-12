import type { ContentUnit } from "../../core/types/index.js";

export interface AssociationDragDropItem {
  entryId: string;
  label: string;
  unit?: ContentUnit;
  kind?: string;
  metadata?: Record<string, unknown>;
}

export interface AssociationDropZone {
  id: string;
  label: string;
  expectedEntryIds: string[];
  metadata?: Record<string, unknown>;
}

export interface AssociationDragDropData {
  draggableItems: AssociationDragDropItem[];
  dropZones: AssociationDropZone[];
}
