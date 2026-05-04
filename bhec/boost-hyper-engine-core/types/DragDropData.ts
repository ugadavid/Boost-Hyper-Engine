/**
 * Représente une cible (zone de dépôt) dans un exercice de type Drag & Drop.
 */
export interface DragDropTarget {
  /**
   * Identifiant unique de la cible.
   */
  id: string;

  /**
   * Libellé ou texte affiché de la cible.
   */
  label: string;

  /**
   * Position optionnelle de la cible dans le layout.
   * Permet un placement précis en coordonnées 2D.
   */
  position?: {
    /** Coordonnée horizontale. */
    x: number;

    /** Coordonnée verticale. */
    y: number;

    /**
     * Unité de mesure (par défaut : "px").
     * Exemple : "%", "em", "rem".
     */
    unit?: string;

    /**
     * Alignement optionnel pour ajuster le rendu
     * (ex. : "left", "center", "right").
     */
    align?: string;
  };
}

/**
 * Représente un élément déplaçable à associer à une cible.
 */
export interface DragDropItem {
  /**
   * Identifiant unique de l’item.
   */
  id: string;

  /**
   * Libellé ou texte affiché de l’item.
   */
  label: string;

  /**
   * Identifiant de la cible associée.
   * Sert à valider si l’item est déposé au bon endroit.
   */
  target: string;

  /**
   * Position optionnelle de l’item dans le layout initial.
   */
  position?: {
    /** Coordonnée horizontale. */
    x: number;

    /** Coordonnée verticale. */
    y: number;

    /** Unité de mesure (par défaut : "px"). */
    unit?: string;

    /** Alignement optionnel. */
    align?: string;
  };
}

/**
 * Structure complète d’un exercice de type Drag & Drop.
 */
export interface DragDropData {
  /**
   * Liste des zones de dépôt (cibles).
   */
  targets: DragDropTarget[];

  /**
   * Liste des éléments à placer.
   */
  items: DragDropItem[];

  /**
   * Indique si l’ordre des items doit être mélangé à l’affichage.
   */
  shuffle: boolean;

  /**
   * Type de mise en page pour disposer cibles et items.
   * - "horizontal" : disposition en ligne
   * - "vertical" : disposition en colonne
   * - "manual" : positions définies par les coordonnées
   */
  layout?: "horizontal" | "vertical" | "manual";
}
