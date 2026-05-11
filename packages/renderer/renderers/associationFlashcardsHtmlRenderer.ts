import type { AssociationSet } from "../../core/types/index.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isAssociationSet(object: Parameters<RendererDefinition["render"]>[0]): object is AssociationSet {
  return object.pedagogicalType === "association";
}

function entryLabel(entry: AssociationSet["content"]["core"]["entries"][number]): string {
  return entry.label ?? entry.id;
}

export const associationFlashcardsHtmlRenderer: RendererDefinition = {
  id: "association-flashcards-html-renderer",
  supportedPedagogicalTypes: ["association"],
  supportedInteractionModes: ["flashcards"],
  render(object) {
    if (!isAssociationSet(object)) {
      return `<section class="bhe-flashcards"><p>This object cannot be rendered as association flashcards.</p></section>`;
    }

    const entriesById = new Map(
      object.content.core.entries.map((entry) => [entry.id, entry])
    );

    const cards = object.content.core.associations.map((association) => {
      if (association.entryIds.length !== 2) {
        return `
          <article class="bhe-flashcard bhe-flashcard--unavailable" data-association-id="${escapeHtml(association.id)}">
            <p>This association cannot be displayed as a binary flashcard.</p>
          </article>
        `.trim();
      }

      const [frontId, backId] = association.entryIds;
      const front = frontId ? entriesById.get(frontId) : undefined;
      const back = backId ? entriesById.get(backId) : undefined;

      if (!front || !back) {
        return `
          <article class="bhe-flashcard bhe-flashcard--unavailable" data-association-id="${escapeHtml(association.id)}">
            <p>This association references missing entries.</p>
          </article>
        `.trim();
      }

      const feedback = association.feedback
        ? `<p class="bhe-flashcard__feedback">${escapeHtml(association.feedback)}</p>`
        : "";

      return `
        <article class="bhe-flashcard" data-association-id="${escapeHtml(association.id)}">
          <div class="bhe-flashcard__front">${escapeHtml(entryLabel(front))}</div>
          <div class="bhe-flashcard__back">${escapeHtml(entryLabel(back))}</div>
          ${feedback}
        </article>
      `.trim();
    });

    return `
      <section class="bhe-flashcards" data-object-id="${escapeHtml(object.metadata.id)}">
        <h2>${escapeHtml(object.metadata.title ?? object.metadata.id)}</h2>
        <div class="bhe-flashcards__list">
          ${cards.join("\n          ")}
        </div>
      </section>
    `.trim();
  }
};
