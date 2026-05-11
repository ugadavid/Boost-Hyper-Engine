import type { AssociationEntry, AssociationSet, ContentUnit } from "../../core/types/index.js";
import type {
  AssociationDragDropData,
  AssociationDragDropItem,
  AssociationDropZone
} from "../interaction-data/index.js";

function contentUnitToText(unit: ContentUnit): string {
  switch (unit.kind) {
    case "text":
      return unit.text;
    case "image":
      return unit.alt ? `[image: ${unit.alt}]` : `[image: ${unit.src}]`;
    case "audio":
      return unit.transcript ? `[audio: ${unit.transcript}]` : `[audio: ${unit.src}]`;
    case "video":
      return unit.transcript ? `[video: ${unit.transcript}]` : `[video: ${unit.src}]`;
  }
}

function associationEntryToText(entry: AssociationEntry): string {
  if (entry.unit) {
    return contentUnitToText(entry.unit);
  }

  return entry.label ?? entry.id;
}

function associationEntryToDragDropItem(entry: AssociationEntry): AssociationDragDropItem {
  const item: AssociationDragDropItem = {
    entryId: entry.id,
    label: associationEntryToText(entry)
  };

  if (entry.kind !== undefined) {
    item.kind = entry.kind;
  }

  if (entry.metadata !== undefined) {
    item.metadata = entry.metadata;
  }

  return item;
}

export function associationToDragDropData(object: AssociationSet): AssociationDragDropData {
  const draggableItems = object.content.core.entries.map(associationEntryToDragDropItem);
  const dropZones: AssociationDropZone[] = object.content.core.associations.map((association) => {
    const zone: AssociationDropZone = {
      id: association.id,
      label: association.feedback ?? association.id,
      expectedEntryIds: association.entryIds
    };

    return zone;
  });

  return {
    draggableItems,
    dropZones
  };
}
