import { DragDropActivityModel } from "./boost-hyper-engine-core/models/DragDropActivityModel";
import { ActivityMetadata } from "./boost-hyper-engine-core/types/ActivityMetadata";
import { DragDropData } from "./boost-hyper-engine-core/types/DragDropData";

const metadata: ActivityMetadata = {
  id: "001",
  title: "Drag the Words",
  language: "en",
  createdAt: new Date().toISOString()
};

const data: DragDropData = {
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

const activity = new DragDropActivityModel(metadata, data);
console.log(activity.getTargetIds()); // ["t1", "t2"]
console.log(activity.getItemTargetMap()); // { i1: "t1", i2: "t2" }
