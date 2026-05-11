import type { AssociationEntry, AssociationSet, ContentUnit } from "../../core/types/index.js";

export interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardsData {
  cards: FlashcardData[];
}

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
        front: associationEntryToText(front),
        back: associationEntryToText(back)
      }
    ];
  });

  return { cards };
}
