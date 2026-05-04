/**
 * Métadonnées décrivant une activité pédagogique.
 * Sert de contrat pour l’identification, la classification
 * et le suivi des activités dans le système.
 */
export interface ActivityMetadata {
  /**
   * Identifiant unique de l’activité.
   * Généralement un UUID ou un slug.
   */
  id: string;

  /**
   * Titre lisible de l’activité (ex. : "Conversations au restaurant").
   */
  title: string;

  /**
   * Langue principale de l’activité (code ISO : "en", "fr", "es"...).
   */
  language: string;

  /**
   * Niveau CECRL ciblé (ex. : "A1", "B2", "C1").
   * Optionnel si l’activité n’est pas encore classée.
   */
  level?: string;

  /**
   * Liste de mots-clés facilitant la recherche
   * et la catégorisation (ex. : ["restaurant", "conversation"]).
   */
  tags?: string[];

  /**
   * Date de création de l’activité, format ISO 8601.
   */
  createdAt: string;

  /**
   * Date de dernière mise à jour, format ISO 8601.
   * Optionnelle si l’activité n’a jamais été modifiée.
   */
  updatedAt?: string;

  /**
   * Auteur de l’activité (nom ou identifiant).
   * Optionnel, utile dans un contexte collaboratif.
   */
  author?: string;
}
