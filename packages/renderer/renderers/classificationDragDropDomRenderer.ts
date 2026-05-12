import { evaluateClassificationDragDrop } from "../../core/evaluators/index.js";
import type { ClassificationDragDropUserInput, ClassificationSet } from "../../core/types/index.js";
import { classificationToDragDropData } from "../adapters/classificationToDragDropAdapter.js";
import { mountFeedbackFromResult } from "../feedback/feedbackMounting.js";
import type { ClassificationDragDropData } from "../interaction-data/index.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

type DomRendererDefinition = RendererDefinition & {
  renderDom: (object: ClassificationSet) => HTMLElement;
};

function isClassificationSet(
  object: Parameters<RendererDefinition["render"]>[0]
): object is ClassificationSet {
  return object.pedagogicalType === "classification";
}

function createMessage(message: string): HTMLElement {
  const section = document.createElement("section");
  section.className = "bhe-classification-drag-drop bhe-classification-drag-drop--unavailable";

  const text = document.createElement("p");
  text.textContent = message;
  section.append(text);

  return section;
}

function createDraggableItem(
  item: ClassificationDragDropData["draggableItems"][number],
  onSelect: (item: HTMLElement) => void
): HTMLElement {
  const element = document.createElement("button");
  element.type = "button";
  element.className = "bhe-classification-drag-drop__item";
  element.draggable = true;
  element.textContent = item.label;
  element.dataset.itemId = item.itemId;
  element.setAttribute("aria-label", item.label);
  element.setAttribute("aria-pressed", "false");

  element.addEventListener("dragstart", (event) => {
    event.dataTransfer?.setData("text/plain", item.itemId);
  });

  element.addEventListener("click", () => {
    onSelect(element);
  });

  element.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onSelect(element);
  });

  return element;
}

function enableDrop(container: HTMLElement, onDropItem: (itemId: string) => void): void {
  container.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  container.addEventListener("drop", (event) => {
    event.preventDefault();
    const itemId = event.dataTransfer?.getData("text/plain");
    if (!itemId) return;
    onDropItem(itemId);
  });
}

function placementsFromCategoryZones(
  zones: NodeListOf<HTMLElement>
): ClassificationDragDropUserInput["placements"] {
  return Array.from(zones).flatMap((zone) => {
    const categoryId = zone.dataset.categoryId;
    if (!categoryId) return [];

    return Array.from(zone.querySelectorAll<HTMLElement>("[data-item-id]")).flatMap((item) => {
      const itemId = item.dataset.itemId;
      return itemId ? [{ itemId, categoryId }] : [];
    });
  });
}

export const classificationDragDropDomRenderer: DomRendererDefinition = {
  id: "classification-drag-drop-dom-renderer",
  supportedPedagogicalTypes: ["classification"],
  supportedInteractionModes: ["drag-drop"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const dragDropData = classificationToDragDropData(object);

    if (dragDropData.draggableItems.length === 0 || dragDropData.dropZones.length === 0) {
      return createMessage("This classification set needs items and categories.");
    }

    const section = document.createElement("section");
    section.className = "bhe-classification-drag-drop";
    section.dataset.objectId = object.metadata.id;

    let selectedItem: HTMLElement | undefined;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const announcements = document.createElement("p");
    announcements.className = "bhe-classification-drag-drop__announcements";
    announcements.setAttribute("aria-live", "polite");

    function announce(message: string): void {
      announcements.textContent = message;
    }

    function clearSelection(): void {
      selectedItem?.classList.remove("is-selected");
      selectedItem?.setAttribute("aria-pressed", "false");
      selectedItem = undefined;
    }

    function selectItem(item: HTMLElement): void {
      clearSelection();
      selectedItem = item;
      item.classList.add("is-selected");
      item.setAttribute("aria-pressed", "true");
      announce(`Selected "${item.textContent ?? "item"}".`);
    }

    function moveSelectedItemTo(destination: HTMLElement, destinationLabel: string): void {
      if (!selectedItem) {
        announce("No item selected.");
        return;
      }

      const item = selectedItem;
      const itemLabel = item.textContent ?? "item";
      destination.append(item);
      clearSelection();
      announce(`Moved "${itemLabel}" to "${destinationLabel}".`);
    }

    function returnSelectedItemToTray(destination: HTMLElement): void {
      if (!selectedItem) {
        announce("No item selected.");
        return;
      }

      const item = selectedItem;
      const itemLabel = item.textContent ?? "item";
      destination.append(item);
      clearSelection();
      announce(`Returned "${itemLabel}" to tray.`);
    }

    const workspace = document.createElement("div");
    workspace.className = "bhe-classification-drag-drop__workspace";

    const tray = document.createElement("div");
    tray.className = "bhe-classification-drag-drop__tray";
    tray.setAttribute("aria-label", "Items to classify");

    enableDrop(tray, (itemId) => {
      const item = section.querySelector<HTMLElement>(`[data-item-id="${itemId}"]`);
      if (item) {
        tray.append(item);
        if (selectedItem === item) clearSelection();
      }
    });

    const returnButton = document.createElement("button");
    returnButton.type = "button";
    returnButton.className = "bhe-classification-drag-drop__move";
    returnButton.textContent = "Return here";
    returnButton.addEventListener("click", () => {
      returnSelectedItemToTray(tray);
    });

    for (const item of dragDropData.draggableItems) {
      tray.append(createDraggableItem(item, selectItem));
    }

    const zones = document.createElement("div");
    zones.className = "bhe-classification-drag-drop__zones";

    for (const zoneData of dragDropData.dropZones) {
      const zone = document.createElement("article");
      zone.className = "bhe-classification-drag-drop__zone";
      zone.dataset.categoryId = zoneData.categoryId;

      const zoneTitle = document.createElement("h3");
      zoneTitle.textContent = zoneData.label;

      const moveButton = document.createElement("button");
      moveButton.type = "button";
      moveButton.className = "bhe-classification-drag-drop__move";
      moveButton.textContent = "Move here";
      moveButton.addEventListener("click", () => {
        moveSelectedItemTo(zoneItems, zoneData.label);
      });

      const zoneItems = document.createElement("div");
      zoneItems.className = "bhe-classification-drag-drop__zone-items";
      zoneItems.setAttribute("aria-label", `Category: ${zoneData.label}`);

      enableDrop(zoneItems, (itemId) => {
        const item = section.querySelector<HTMLElement>(`[data-item-id="${itemId}"]`);
        if (item) {
          zoneItems.append(item);
          if (selectedItem === item) clearSelection();
        }
      });

      const zoneDetails = document.createElement("p");
      zoneDetails.className = "bhe-classification-drag-drop__zone-details";
      zoneDetails.setAttribute("aria-live", "polite");

      zone.append(zoneTitle, moveButton, zoneItems, zoneDetails);
      zones.append(zone);
    }

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "bhe-classification-drag-drop__check";
    checkButton.textContent = "Check";

    const itemSummary = document.createElement("div");
    itemSummary.className = "bhe-classification-drag-drop__summary";
    itemSummary.setAttribute("aria-live", "polite");

    const feedbackContainer = document.createElement("div");
    feedbackContainer.className = "bhe-classification-drag-drop__feedback";
    feedbackContainer.setAttribute("aria-live", "polite");

    checkButton.addEventListener("click", () => {
      const zoneElements = section.querySelectorAll<HTMLElement>("[data-category-id]");
      const input: ClassificationDragDropUserInput = {
        interactionMode: "drag-drop",
        timestamp: new Date().toISOString(),
        placements: placementsFromCategoryZones(zoneElements)
      };
      const result = evaluateClassificationDragDrop(dragDropData, input);
      const itemResults = result.details?.itemResults ?? [];

      section
        .querySelectorAll<HTMLElement>("[data-item-id]")
        .forEach((item) => item.classList.remove("is-correct", "is-incorrect", "is-missing"));

      for (const itemResult of itemResults) {
        const item = section.querySelector<HTMLElement>(`[data-item-id="${itemResult.itemId}"]`);
        if (!item) continue;

        item.classList.toggle("is-correct", itemResult.isCorrect);
        item.classList.toggle("is-incorrect", !itemResult.isCorrect && itemResult.actualCategoryId !== undefined);
        item.classList.toggle("is-missing", itemResult.actualCategoryId === undefined);
      }

      for (const zone of Array.from(zoneElements)) {
        const categoryId = zone.dataset.categoryId;
        const zoneResults = itemResults.filter((itemResult) => itemResult.actualCategoryId === categoryId);
        const hasErrors = zoneResults.some((itemResult) => !itemResult.isCorrect);
        const hasCorrect = zoneResults.some((itemResult) => itemResult.isCorrect);
        const details = zone.querySelector<HTMLElement>(".bhe-classification-drag-drop__zone-details");

        zone.classList.toggle("contains-correct", hasCorrect);
        zone.classList.toggle("contains-errors", hasErrors);

        if (details) {
          const correctCount = zoneResults.filter((itemResult) => itemResult.isCorrect).length;
          details.textContent =
            zoneResults.length === 0
              ? "No item placed."
              : `${correctCount}/${zoneResults.length} item(s) correct in this category.`;
        }
      }

      const summaryItems = itemResults.map((itemResult) => {
        const line = document.createElement("p");
        line.className = "bhe-classification-drag-drop__summary-line";
        line.textContent = itemResult.isCorrect
          ? `${itemResult.itemId}: correct.`
          : `${itemResult.itemId}: expected ${itemResult.expectedCategoryId}, got ${itemResult.actualCategoryId ?? "nothing"}.`;
        return line;
      });
      itemSummary.replaceChildren(...summaryItems);

      mountFeedbackFromResult({ result, container: feedbackContainer });
    });

    workspace.append(returnButton, tray, zones);
    section.append(title, announcements, workspace, checkButton, itemSummary, feedbackContainer);
    return section;
  }
};

export function renderClassificationDragDropDom(
  object: Parameters<RendererDefinition["render"]>[0]
): HTMLElement {
  if (!isClassificationSet(object)) {
    return createMessage("This object cannot be rendered as classification drag-drop.");
  }

  return classificationDragDropDomRenderer.renderDom(object);
}
