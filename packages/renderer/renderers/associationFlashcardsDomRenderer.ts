import type { AssociationSet } from "../../core/types/index.js";
import { associationToFlashcardsData } from "../adapters/associationToFlashcardsAdapter.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

type DomRendererDefinition = RendererDefinition & {
  renderDom: (object: AssociationSet) => HTMLElement;
};

function isAssociationSet(object: Parameters<RendererDefinition["render"]>[0]): object is AssociationSet {
  return object.pedagogicalType === "association";
}

export const associationFlashcardsDomRenderer: DomRendererDefinition = {
  id: "association-flashcards-dom-renderer",
  supportedPedagogicalTypes: ["association"],
  supportedInteractionModes: ["flashcards"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const section = document.createElement("section");
    section.className = "bhe-flashcards";
    section.dataset.objectId = object.metadata.id;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;
    section.append(title);

    const list = document.createElement("div");
    list.className = "bhe-flashcards__list";

    const flashcardsData = associationToFlashcardsData(object);

    for (const flashcard of flashcardsData.cards) {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "bhe-flashcard";
      card.dataset.associationId = flashcard.id;
      card.setAttribute("aria-expanded", "false");

      const frontEl = document.createElement("span");
      frontEl.className = "bhe-flashcard-front";
      frontEl.textContent = flashcard.front;

      const backEl = document.createElement("span");
      backEl.className = "bhe-flashcard-back";
      backEl.textContent = flashcard.back;
      backEl.hidden = true;

      card.append(frontEl, backEl);

      card.addEventListener("click", () => {
        const isExpanded = card.getAttribute("aria-expanded") === "true";
        const nextExpanded = !isExpanded;

        card.setAttribute("aria-expanded", String(nextExpanded));
        card.classList.toggle("is-flipped", nextExpanded);
        frontEl.hidden = nextExpanded;
        backEl.hidden = isExpanded;
      });

      list.append(card);
    }

    section.append(list);
    return section;
  }
};

export function renderAssociationFlashcardsDom(object: Parameters<RendererDefinition["render"]>[0]): HTMLElement {
  if (!isAssociationSet(object)) {
    const message = document.createElement("section");
    message.className = "bhe-flashcards bhe-flashcards--unavailable";
    message.textContent = "This object cannot be rendered as association flashcards.";
    return message;
  }

  return associationFlashcardsDomRenderer.renderDom(object);
}
