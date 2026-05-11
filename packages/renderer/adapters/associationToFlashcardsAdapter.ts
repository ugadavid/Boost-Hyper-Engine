import type { AssociationSet } from "../../core/types/index.js";

export interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardsData {
  cards: FlashcardData[];
}

export function associationToFlashcardsData(object: AssociationSet): FlashcardsData {
  const entriesById = new Map(
    object.content.core.entries.map((entry) => [entry.id, entry])
  );

  const cards = object.content.core.associations.flatMap((association) => {
    if (association.entryIds.length !== 2) {
      return [];
    }

    const [frontId, backId] = association.entryIds;
    const front = frontId ? entriesById.get(frontId) : undefined;
    const back = backId ? entriesById.get(backId) : undefined;

    if (!front || !back) {
      return [];
    }

    return [
      {
        id: association.id,
        front: front.label,
        back: back.label
      }
    ];
  });

  return { cards };
}
