/**
 * # 🛠️ Comment créer un nouveau module Boost Hyper Engine
 * 
 * Créer un module, c’est simple mais il y a quelques conventions à suivre.
 * 
 * ## Étapes
 * 
 * 1. Créer un fichier dans le dossier adéquat (`models`, `core`, `types`, etc.)
 * 2. Nommer le fichier avec un nom clair, en camelCase si besoin (`playerInventory.ts`)
 * 3. Ajouter des commentaires JSDoc à toutes les entités exportées
 * 4. Exporter ce module dans `index.ts` si nécessaire
 * 5. Compiler + lancer `npm run doc` pour voir l’effet dans la doc
 * 
 * ## Exemple
 * 
 * ```ts
 * // models/mob.ts
 * 
 * Représente un mob hostile dans le monde
 *
 * export interface Mob {
 *   name: string;
 *   damage: number;
 *   attack(): void;
 * }
 * 
 * 
 */
export const __modelsDoc__ = true;