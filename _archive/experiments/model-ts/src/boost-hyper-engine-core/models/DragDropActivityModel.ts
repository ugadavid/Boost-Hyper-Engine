import { AbstractActivityModel } from "./AbstractActivityModel";
import { ActivityMetadata } from "../types/ActivityMetadata";
import { DragDropData } from "../types/DragDropData";

export class DragDropActivityModel extends AbstractActivityModel<DragDropData> {
  constructor(metadata: ActivityMetadata, data: DragDropData) {
    super("drag-drop", metadata, data);
  }

  getTargetIds(): string[] {
    return this.data.targets.map(target => target.id);
  }

  getItemTargetMap(): Record<string, string> {
    const map: Record<string, string> = {};
    for (const item of this.data.items) {
      map[item.id] = item.target;
    }
    return map;
  }

  isItemShuffled(): boolean {
    return this.data.shuffle;
  }

  // Obligatoire car abstrait dans AbstractActivityModel
  validate(): boolean {
    // Implémentation simple : vérifier que tous les items pointent vers un target existant
    const targetIds = this.getTargetIds();
    const invalidItems = this.data.items.filter(item => !targetIds.includes(item.target));
    return invalidItems.length === 0;
  }
}
