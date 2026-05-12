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

function createDraggableItem(item: AssociationDragDropData["draggableItems"][number]): HTMLElement {
  const element = document.createElement("button");
  element.type = "button";
  element.className = "bhe-association-drag-drop__item";
  element.draggable = true;
  element.dataset.entryId = item.entryId;
  element.setAttribute("aria-label", item.label);

  if (item.unit) {
    element.append(renderContentUnit(item.unit));
  } else {
    element.textContent = item.label;
  }

  element.addEventListener("dragstart", (event) => {
    event.dataTransfer?.setData("text/plain", item.entryId);
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

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const workspace = document.createElement("div");
    workspace.className = "bhe-association-drag-drop__workspace";

    const tray = document.createElement("div");
    tray.className = "bhe-association-drag-drop__tray";
    tray.setAttribute("aria-label", "Draggable items");

    enableDrop(tray, (entryId) => {
      const item = section.querySelector<HTMLElement>(`[data-entry-id="${entryId}"]`);
      if (item) tray.append(item);
    });

    for (const item of dragDropData.draggableItems) {
      tray.append(createDraggableItem(item));
    }

    const zones = document.createElement("div");
    zones.className = "bhe-association-drag-drop__zones";

    for (const zoneData of dragDropData.dropZones) {
      const zone = document.createElement("article");
      zone.className = "bhe-association-drag-drop__zone";
      zone.dataset.zoneId = zoneData.id;

      const zoneTitle = document.createElement("h3");
      zoneTitle.textContent = zoneData.label;

      const zoneItems = document.createElement("div");
      zoneItems.className = "bhe-association-drag-drop__zone-items";
      zoneItems.setAttribute("aria-label", `Drop zone: ${zoneData.label}`);

      enableDrop(zoneItems, (entryId) => {
        const item = section.querySelector<HTMLElement>(`[data-entry-id="${entryId}"]`);
        if (item) zoneItems.append(item);
      });

      const zoneDetails = document.createElement("p");
      zoneDetails.className = "bhe-association-drag-drop__zone-details";
      zoneDetails.setAttribute("aria-live", "polite");

      zone.append(zoneTitle, zoneItems, zoneDetails);
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

    workspace.append(tray, zones);
    section.append(title, workspace, checkButton, feedbackContainer);
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
