import { AbstractActivityModel } from "./AbstractActivityModel.js";
import type { ActivityMetadata } from "../types/ActivityMetadata.js";
import type { DragDropData } from "../types/DragDropData.js";

/**
 * Modèle d’activité de type Drag & Drop.
 * Implémente la logique spécifique aux exercices
 * de glisser-déposer à partir du modèle abstrait.
 */
export class DragDropActivityModel extends AbstractActivityModel<DragDropData> {
  /**
   * Initialise un modèle Drag & Drop avec métadonnées et données.
   *
   * @param metadata - Métadonnées de l’activité
   * @param data - Données Drag & Drop (cibles, items, options)
   */
  constructor(metadata: ActivityMetadata, data: DragDropData) {
    super(metadata, data);
  }

  /**
   * Retourne la liste des cibles (zones de dépôt).
   */
  getTargets() {
    return this.data.targets;
  }

  /**
   * Retourne la liste des items déplaçables.
   */
  getItems() {
    return this.data.items;
  }

  /**
   * Retourne la liste des identifiants de cibles.
   */
  getTargetIds(): string[] {
    return this.data.targets.map((target) => target.id);
  }

  /**
   * Crée une table de correspondance { idItem → idTarget }.
   * Utile pour valider les associations.
   */
  getItemTargetMap(): Record<string, string> {
    const map: Record<string, string> = {};
    for (const item of this.data.items) {
      map[item.id] = item.target;
    }
    return map;
  }

  /**
   * Indique si le mélange aléatoire des items est activé.
   */
  isShuffleEnabled(): boolean {
    return !!this.data.shuffle;
  }

  /**
   * Vérifie la validité de l’activité.
   * Une activité est valide si chaque item référence une cible existante.
   *
   * @returns true si valide, false sinon
   */
  validate(): boolean {
    const ids = this.getTargetIds();
    return this.data.items.every((i) => ids.includes(i.target));
  }
}
