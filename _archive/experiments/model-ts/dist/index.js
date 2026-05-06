"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DragDropActivityModel_1 = require("./boost-hyper-engine-core/models/DragDropActivityModel");
const metadata = {
    id: "001",
    title: "Drag the Words",
    language: "en",
    createdAt: new Date().toISOString()
};
const data = {
    targets: [
        { id: "t1", label: "1" },
        { id: "t2", label: "2" }
    ],
    items: [
        { id: "i1", label: "cat", target: "t1" },
        { id: "i2", label: "dog", target: "t2" }
    ],
    shuffle: true
};
const activity = new DragDropActivityModel_1.DragDropActivityModel(metadata, data);
console.log(activity.getTargetIds()); // ["t1", "t2"]
console.log(activity.getItemTargetMap()); // { i1: "t1", i2: "t2" }
