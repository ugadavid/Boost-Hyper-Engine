import type { ClassificationItem, ClassificationSet } from "../../core/types/index.js";
import type {
  ClassificationDragDropData,
  ClassificationDragDropItem,
  ClassificationDropZone
} from "../interaction-data/index.js";

function classificationItemToDragDropItem(
  item: ClassificationItem
): ClassificationDragDropItem {
  const draggableItem: ClassificationDragDropItem = {
    itemId: item.id,
    label: item.label,
    expectedCategoryId: item.categoryId
  };

  if (item.kind !== undefined) {
    draggableItem.kind = item.kind;
  }

  return draggableItem;
}

export function classificationToDragDropData(
  object: ClassificationSet
): ClassificationDragDropData {
  const draggableItems = object.content.core.items.map(classificationItemToDragDropItem);
  const dropZones: ClassificationDropZone[] = object.content.core.categories.map((category) => {
    const zone: ClassificationDropZone = {
      categoryId: category.id,
      label: category.label
    };

    return zone;
  });

  return {
    draggableItems,
    dropZones
  };
}
