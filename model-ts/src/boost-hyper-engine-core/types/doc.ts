/**
 * # 🔤 Dossier types
 * 
 * Contient tous les **types utilitaires**, **alias** et **types en union/disjonction**, souvent partagés entre plusieurs modules.
 * 
 * ## Règles
 * 
 * - Pas d’objets complexes ici (utiliser `models` pour ça)
 * - Chaque type doit être exporté séparément
 * - Grouper les types par fonction (`DamageType`, `BlockType`, etc.)
 * 
 * ## Exemple
 * 
 * ```ts
 * export type BlockType = "stone" | "dirt" | "diamond" | "obsidian";
 * 
 * 💡 Ces types sont utilisés comme contraintes dans d’autres modules.
 * 
 * 
 * ---
 * 
 * ### 📄 `src/core/README.md`
 * 
 * 
 * # 🧠 Dossier core
 * 
 * Le cœur du moteur Boost Hyper Engine.  
 * Contient la logique centrale, les fonctions d’initialisation, les outils globaux.
 * 
 * ## Contenu typique
 * 
 * - Initialisation (`initEngine`)
 * - Boucle principale (`runEngineLoop`)
 * - Outils transversaux (`logSystemInfo`, `registerModule`)
 * 
 * 
 */
export const __modelsDoc__ = true;