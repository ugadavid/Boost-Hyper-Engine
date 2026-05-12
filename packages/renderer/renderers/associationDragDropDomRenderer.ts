import { evaluateAssociationDragDrop } from "../../core/evaluators/index.js";
import type { AssociationDragDropUserInput, AssociationSet } from "../../core/types/index.js";
import { associationToDragDropData } from "../adapters/associationToDragDropAdapter.js";
import { renderContentUnit } from "../content/index.js";
import { mountFeedbackFromResult } from "../feedback/feedbackMounting.js";
import type { AssociationDragDropData } from "../interaction-data/index.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

type DomRendererDefinition = RendererDefinition & {
  renderDom: (object: AssociationSet) => HTMLElement;
};

function isAssociationSet(object: Parameters<RendererDefinition["render"]>[0]): object is AssociationSet {
  return object.pedagogicalType === "association";
}

function createMessage(message: string): HTMLElement {
  const section = document.createElement("section");
  section.className = "bhe-association-drag-drop bhe-association-drag-drop--unavailable";

  const text = document.createElement("p");
  text.textContent = message;
  section.append(text);

  return section;
}

function createDraggableItem(
  item: AssociationDragDropData["draggableItems"][number],
  onSelect: (item: HTMLElement) => void
): HTMLElement {
  const element = document.createElement("button");
  element.type = "button";
  element.className = "bhe-association-drag-drop__item";
  element.draggable = true;
  element.dataset.entryId = item.entryId;
  element.setAttribute("aria-label", item.label);
  element.setAttribute("aria-pressed", "false");

  if (item.unit) {
    element.append(renderContentUnit(item.unit));
  } else {
    element.textContent = item.label;
  }

  element.addEventListener("dragstart", (event) => {
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      (target.closest("audio") || target.closest("video"))
    ) {
      event.preventDefault();
      return;
    }

    event.dataTransfer?.setData("text/plain", item.entryId);
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

function enableDrop(container: HTMLElement, onDropEntry: (entryId: string) => void): void {
  container.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  container.addEventListener("drop", (event) => {
    event.preventDefault();
    const entryId = event.dataTransfer?.getData("text/plain");
    if (!entryId) return;
    onDropEntry(entryId);
  });
}

function placementsFromZones(zones: NodeListOf<HTMLElement>): AssociationDragDropUserInput["placements"] {
  return Array.from(zones).flatMap((zone) => {
    const zoneId = zone.dataset.zoneId;
    if (!zoneId) return [];

    return Array.from(zone.querySelectorAll<HTMLElement>("[data-entry-id]")).flatMap((item) => {
      const entryId = item.dataset.entryId;
      return entryId ? [{ entryId, zoneId }] : [];
    });
  });
}

export const associationDragDropDomRenderer: DomRendererDefinition = {
  id: "association-drag-drop-dom-renderer",
  supportedPedagogicalTypes: ["association"],
  supportedInteractionModes: ["drag-drop"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const dragDropData = associationToDragDropData(object);

    const section = document.createElement("section");
    section.className = "bhe-association-drag-drop";
    section.dataset.objectId = object.metadata.id;

    let selectedItem: HTMLElement | undefined;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const announcements = document.createElement("p");
    announcements.className = "bhe-association-drag-drop__announcements";
    announcements.setAttribute("aria-live", "polite");

    function selectedItemLabel(item: HTMLElement): string {
      return item.getAttribute("aria-label") ?? item.textContent ?? "item";
    }

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
      announce(`Selected "${selectedItemLabel(item)}".`);
    }

    function moveSelectedItemTo(destination: HTMLElement, destinationLabel: string): void {
      if (!selectedItem) {
        announce("No item selected.");
        return;
      }

      const item = selectedItem;
      const itemLabel = selectedItemLabel(item);
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
      const itemLabel = selectedItemLabel(item);
      destination.append(item);
      clearSelection();
      announce(`Returned "${itemLabel}" to tray.`);
    }

    const workspace = document.createElement("div");
    workspace.className = "bhe-association-drag-drop__workspace";

    const tray = document.createElement("div");
    tray.className = "bhe-association-drag-drop__tray";
    tray.setAttribute("aria-label", "Draggable items");

    enableDrop(tray, (entryId) => {
      const item = section.querySelector<HTMLElement>(`[data-entry-id="${entryId}"]`);
      if (item) {
        tray.append(item);
        if (selectedItem === item) clearSelection();
      }
    });

    const returnButton = document.createElement("button");
    returnButton.type = "button";
    returnButton.className = "bhe-association-drag-drop__move";
    returnButton.textContent = "Return here";
    returnButton.addEventListener("click", () => {
      returnSelectedItemToTray(tray);
    });

    for (const item of dragDropData.draggableItems) {
      tray.append(createDraggableItem(item, selectItem));
    }

    const zones = document.createElement("div");
    zones.className = "bhe-association-drag-drop__zones";

    for (const zoneData of dragDropData.dropZones) {
      const zone = document.createElement("article");
      zone.className = "bhe-association-drag-drop__zone";
      zone.dataset.zoneId = zoneData.id;

      const zoneTitle = document.createElement("h3");
      zoneTitle.textContent = zoneData.label;

      const moveButton = document.createElement("button");
      moveButton.type = "button";
      moveButton.className = "bhe-association-drag-drop__move";
      moveButton.textContent = "Move here";
      moveButton.addEventListener("click", () => {
        moveSelectedItemTo(zoneItems, zoneData.label);
      });

      const zoneItems = document.createElement("div");
      zoneItems.className = "bhe-association-drag-drop__zone-items";
      zoneItems.setAttribute("aria-label", `Drop zone: ${zoneData.label}`);

      enableDrop(zoneItems, (entryId) => {
        const item = section.querySelector<HTMLElement>(`[data-entry-id="${entryId}"]`);
        if (item) {
          zoneItems.append(item);
          if (selectedItem === item) clearSelection();
        }
      });

      const zoneDetails = document.createElement("p");
      zoneDetails.className = "bhe-association-drag-drop__zone-details";
      zoneDetails.setAttribute("aria-live", "polite");

      zone.append(zoneTitle, moveButton, zoneItems, zoneDetails);
      zones.append(zone);
    }

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "bhe-association-drag-drop__check";
    checkButton.textContent = "Check";

    const feedbackContainer = document.createElement("div");
    feedbackContainer.className = "bhe-association-drag-drop__feedback";
    feedbackContainer.setAttribute("aria-live", "polite");

    checkButton.addEventListener("click", () => {
      const zoneElements = section.querySelectorAll<HTMLElement>("[data-zone-id]");
      const input: AssociationDragDropUserInput = {
        interactionMode: "drag-drop",
        timestamp: new Date().toISOString(),
        placements: placementsFromZones(zoneElements)
      };
      const result = evaluateAssociationDragDrop(dragDropData, input);

      for (const groupResult of result.details?.groupResults ?? []) {
        const zone = section.querySelector<HTMLElement>(`[data-zone-id="${groupResult.zoneId}"]`);
        if (!zone) continue;

        const details = zone.querySelector<HTMLElement>(".bhe-association-drag-drop__zone-details");
        zone.classList.toggle("is-correct", groupResult.isCorrect);
        zone.classList.toggle("is-incorrect", !groupResult.isCorrect);

        if (details) {
          const missing = groupResult.missingEntryIds.join(", ") || "none";
          const extra = groupResult.extraEntryIds.join(", ") || "none";
          details.textContent = groupResult.isCorrect
            ? "Correct group."
            : `Missing: ${missing}. Extra: ${extra}.`;
        }
      }

      mountFeedbackFromResult({ result, container: feedbackContainer });
    });

    workspace.append(returnButton, tray, zones);
    section.append(title, announcements, workspace, checkButton, feedbackContainer);
    return section;
  }
};

export function renderAssociationDragDropDom(
  object: Parameters<RendererDefinition["render"]>[0]
): HTMLElement {
  if (!isAssociationSet(object)) {
    return createMessage("This object cannot be rendered as association drag-drop.");
  }

  return associationDragDropDomRenderer.renderDom(object);
}
