"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragDropActivityModel = void 0;
const AbstractActivityModel_1 = require("./AbstractActivityModel");
class DragDropActivityModel extends AbstractActivityModel_1.AbstractActivityModel {
    constructor(metadata, data) {
        super("drag-drop", metadata, data);
    }
    getTargetIds() {
        return this.data.targets.map(target => target.id);
    }
    getItemTargetMap() {
        const map = {};
        for (const item of this.data.items) {
            map[item.id] = item.target;
        }
        return map;
    }
    isItemShuffled() {
        return this.data.shuffle;
    }
    // Obligatoire car abstrait dans AbstractActivityModel
    validate() {
        // Implémentation simple : vérifier que tous les items pointent vers un target existant
        const targetIds = this.getTargetIds();
        const invalidItems = this.data.items.filter(item => !targetIds.includes(item.target));
        return invalidItems.length === 0;
    }
}
exports.DragDropActivityModel = DragDropActivityModel;
