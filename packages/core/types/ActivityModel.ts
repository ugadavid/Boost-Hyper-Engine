import type { ActivityMetadata } from "./ActivityMetadata.js";
import type { BHEObject } from "./BHEObject.js";

/**
 * Modèle générique représentant une activité pédagogique.
 * Associe les métadonnées à une structure ou un contenu de type T,
 * et propose une méthode de validation.
 */
export interface ActivityModel<TData> extends BHEObject<TData, ActivityMetadata> {
  /**
   * Métadonnées de l’activité (identifiant, titre, langue, etc.).
   */
  metadata: ActivityMetadata;

  /**
   * Vérifie si l’activité est valide.
   * Retourne true si toutes les conditions sont respectées,
   * false sinon.
   */
  validate(): boolean;
}
