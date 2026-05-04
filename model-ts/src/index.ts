/**
 * Représente un jeu avec l'existant
 */

import { DragDropActivityModel } from "./boost-hyper-engine-core/models/DragDropActivityModel";
import { ActivityMetadata } from "./boost-hyper-engine-core/types/ActivityMetadata";
import { DragDropData } from "./boost-hyper-engine-core/types/DragDropData";

/**
 * Point d'entrée principal de Boost Hyper Engine
 * (ne contient que des réexportations)
 */
export const __entryPoint__ = true;


/** ActivityMetadata représente les metadata de l'activité */
const metadata: ActivityMetadata = {
  id: "001",
  title: "Drag the Words",
  language: "en",
  createdAt: new Date().toISOString()
};

/** DragDropData représente les data de l'activité */
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
