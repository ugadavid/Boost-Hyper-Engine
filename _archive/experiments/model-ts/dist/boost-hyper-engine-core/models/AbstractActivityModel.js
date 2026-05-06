"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractActivityModel = void 0;
class AbstractActivityModel {
    constructor(type, metadata, data) {
        this.type = type;
        this.metadata = metadata;
        this.data = data;
    }
    getTitle() {
        return this.metadata.title;
    }
    getTags() {
        return this.metadata.tags ?? [];
    }
}
exports.AbstractActivityModel = AbstractActivityModel;
