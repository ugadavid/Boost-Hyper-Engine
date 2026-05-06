import type { ActivityModel } from "../types/ActivityModel.js";
import type { ActivityMetadata } from "../types/ActivityMetadata.js";

/**
 * Classe abstraite générique pour représenter un modèle d’activité.
 * Fournit une base commune avec gestion des métadonnées et des données,
 * et impose l’implémentation d’une méthode de validation.
 *
 * @typeParam T - Le type de données spécifique à l’activité
 * (par ex. DragDropData, QuizData, etc.).
 */
export abstract class AbstractActivityModel<T> implements ActivityModel<T> {
  /**
   * Métadonnées associées à l’activité
   * (id, titre, langue, niveau, etc.).
   */
  public readonly metadata: ActivityMetadata;

  /**
   * Données spécifiques de l’activité (contenu).
   * Type générique T pour s’adapter à différents modèles.
   */
  protected readonly data: T;

  /**
   * Initialise un modèle d’activité avec ses métadonnées et ses données.
   *
   * @param metadata - Métadonnées de l’activité
   * @param data - Données spécifiques de l’activité
   */
  constructor(metadata: ActivityMetadata, data: T) {
    this.metadata = metadata;
    this.data = data;
  }

  /**
   * Vérifie si le modèle est valide.
   * Doit être implémenté par chaque activité concrète.
   *
   * @returns true si valide, false sinon.
   */
  abstract validate(): boolean;
}
