# BHE Documentation Index

Date de cartographie : 2026-06-23  
Branche observée : `experiment/bhe-be`

Ce document recense l’état documentaire apparent de Boost Hyper Engine en juin 2026. Il vise à permettre à un humain, un développeur, un GPT ou un futur Codex de reprendre rapidement le projet sans relire tout l’historique.

Les statuts sont prudents :

- **Référence** : document encore utile comme point d’appui stable ou quasi stable.
- **Historique** : trace importante de l’émergence du projet, mais à lire comme contexte.
- **Expérimental** : exploration, POC, stress-test ou hypothèse non stabilisée.
- **Obsolète possible** : document potentiellement dépassé par des explorations ou implémentations ultérieures.
- **À relire** : document utile mais dont le statut devrait être revalidé avant d’en faire une base de décision.

L’index ne modifie pas le statut réel du projet. Il cartographie ce que les documents semblent dire.

## Architecture générale

| Document | Emplacement | Thème principal | Statut | Résumé |
|---|---|---|---|---|
| Manifeste pour un nouveau moteur pédagogique libre | `docs/api/media/manifeste.md` | Vision fondatrice | Historique | Manifeste initial : moteur pédagogique libre, modulaire, personnalisable, accessible, pensé pour l’intelligence augmentée. Très utile pour comprendre l’esprit du projet, mais pas une spécification actuelle. |
| BHE Architecture Emergence | `docs/architecture/20260513_gpt_bhe_architecture_emergence_may_2026.md` | Émergence architecturale | Historique | Première formulation du découplage pédagogie/rendu, des adapters, d’InteractionData et du pipeline retour. Point de départ conceptuel majeur. |
| Interaction patterns emergence - Week 3 | `docs/architecture/20260518_interaction_patterns_emergence_week3.md` | Émergence des patterns d’interaction | Historique | Compare AssociationSet, ClassificationSet et SequenceSet ; pose tôt l’idée que le même geste apparent ne signifie pas la même pédagogie. |
| BHE Object Emergence Patterns Comparison | `docs/architecture/20260521_object_emergence_patterns_comparison.md` | Méthode d’émergence des objets | Historique | Compare les premiers objets pédagogiques et tire des signaux méthodologiques : pédagogie d’abord, interaction ensuite. |
| Productive Objects Emergence Pattern | `docs/architecture/20260521_productive_objects_emergence_pattern.md` | Objets productifs | Historique | Analyse GapFill, Transformation et Inference comme opérations productives. Prépare la distinction entre geste de saisie et opération cognitive. |
| BHE-BE Laboratory | `docs/architecture/20260604_bhe-be-lab.md` | Cadre expérimental BHE × Boost’English | Référence | Définit la branche/laboratoire BHE-BE : tester les briques réelles sans confondre expérimentation auteur, orchestration et core. |
| BHE-BE Weekly Synthesis | `docs/architecture/20260606_bhe-be-weekly-synthesis.md` | Synthèse hebdomadaire BHE-BE | Référence | Synthèse importante : le core couvre plus que prévu, l’interaction n’est pas la fonction pédagogique, et tous les signaux pédagogiques ne doivent pas devenir des objets core. |
| BHE Architectural Lenses | `docs/architecture/20260618_architectural-lenses.md` | Lentilles d’analyse | Référence | Clarifie plusieurs angles de lecture : opération cognitive, intention pédagogique, représentation, expérience auteur. Sert de carte conceptuelle récente. |
| Author Discoverability Principle | `docs/architecture/20260618_principe_architectural.md` | Principe de découvrabilité auteur | Référence | Formule le principe selon lequel BHE doit être découvrable par l’auteur, pas seulement cohérent dans le core. |
| BHE Complete Pipeline And ContentUnit | `docs/architecture/bhe-complete-pipeline-and-content-unit.md` | Pipeline complet | Référence | Résume le pipeline avant/arrière : PedagogicalObject, Adapter, InteractionData, Renderer, UserInput, Evaluator, BHEResult, Feedback/AdaptiveRouting. |
| BHE Pedagogical Object Taxonomy | `docs/architecture/pedagogical-object-taxonomy.md` | Taxonomie pédagogique | Référence | Décrit PedagogicalObject, PedagogicalType, PedagogicalFamily, PedagogicalContent et les sets existants. Point d’entrée utile sur le core pédagogique. |
| BHE Architecture Progress Report | `docs/reports/architecture-progress-report.md` | État d’avancement architecture | Historique | Rapport d’étape sur l’architecture. Utile pour dater les décisions, mais à croiser avec les documents plus récents. |
| API générée TypeDoc | `docs/api/index.html` et `docs/api/` | Référence API | Référence | Documentation générée des types et modules publics. Les nombreux fichiers HTML internes sont un artefact généré ; l’entrée utile est principalement `docs/api/index.html`. |

## Core pédagogique

| Document | Emplacement | Thème principal | Statut | Résumé |
|---|---|---|---|---|
| Cognitive Operations Vocabulary | `docs/architecture/cognitive-operations-vocabulary.md` | Vocabulaire des opérations cognitives | Référence | Définit un vocabulaire pour nommer les opérations cognitives sans les confondre avec les sets ou les rendus. |
| Cognitive Operation Vocabulary Update Report | `docs/reports/cognitive-operation-vocabulary-update-report.md` | Mise à jour du vocabulaire cognitif | Référence | Rapport d’implémentation/documentation autour du vocabulaire d’opérations cognitives. |
| Core Vocabulary Audit | `docs/architecture/20260617_core-vocabulary-audit.md` | Audit du vocabulaire core | À relire | Audite les noms de types existants et leurs frictions. Utile, mais à revalider face au prototype authoring récent. |
| Identification V0 emergence | `docs/architecture/20260521_identification_v0_emergence.md` | IdentificationSet | Historique | Émergence d’IdentificationSet, comparaison avec Association, Classification, Sequence et Inference. |
| Transformation V0 Emergence | `docs/architecture/20260522_transformation_v0_emergence.md` | TransformationSet | Historique | Émergence de TransformationSet, accepted variants, UserInput sémantique et renderer V0. |
| Learning Sequence Signal | `docs/architecture/20260527_learning_sequence_signal.md` | LearningSequence | Expérimental | Première tension autour d’un niveau d’orchestration au-dessus des objets. Décision volontairement non prise. |
| Cognitive Primitives Expansion And IC Signals | `docs/architecture/20260528_cognitive_primitives_expansion_and_ic_signals.md` | Primitives cognitives et IC | Expérimental | Explore la séparation entre primitives, opérations situées et signaux d’interaction. |
| Moment Emergence Synthesis | `docs/architecture/20260604_moment-emergence-synthesis.md` | Concept de Moment | À relire | Synthèse des POCs Moment ; utile pour comprendre pourquoi Moment a été testé, mais son statut semble fragile. |
| Moment Responsibility Dissection | `docs/architecture/20260605_moment-responsibility-dissection.md` | Responsabilités projetées dans Moment | À relire | Décompose ce que Moment risquait d’absorber : intention, transition, progression, posture, orchestration. Important pour éviter la sur-généralisation. |
| PedagogicalTransition Stress Test | `docs/architecture/20260605_pedagogical-transition-stress-test.md` | Transitions pédagogiques | Expérimental | Teste la notion de transition pédagogique entre moments/bricks. Semble rester descriptive plutôt que core. |
| MemorizationSet Interaction Exploration | `docs/reports/memorization-set-interaction-exploration.md` | MemorizationSet | Référence | Analyse la nature cognitive de MemorizationSet et ses modes d’interaction possibles, notamment flashcards et rappel actif. |
| IdentificationSet Interaction Exploration | `docs/reports/identification-set-interaction-exploration.md` | IdentificationSet | Référence | Explore les cas pédagogiques d’identification et ses différences avec Association, Classification, Sequence et Inference. |
| InferenceSet Interaction Exploration | `docs/reports/inference-set-interaction-exploration.md` | InferenceSet | Référence | Analyse la nature de l’inférence et ses cas possibles : sens inconnu, intention, règle, cause/conséquence. |
| SequenceSet Interaction Exploration | `docs/reports/sequence-set-interaction-exploration.md` | SequenceSet | Référence | Explore les usages de SequenceSet : ordre simple, phrase, texte, timeline, workflow. |
| TransformationSet Interaction Exploration | `docs/reports/transformation-set-interaction-exploration.md` | TransformationSet | Référence | Décrit la nature pédagogique de TransformationSet et distingue transformation de GapFill, Inference ou Identification. |
| LearningSequence Stress Test — Nissen Vocabulary Scenario | `docs/reports/learning-sequence-stress-test-nissen.md` | LearningSequence | Expérimental | Stress-test d’une séquence vocabulaire complète, de la mémorisation à la personnalisation. |
| Nissen Intelligentization BHE Scenario | `docs/reports/nissen-intelligentization-bhe-scenario.md` | Scénario pédagogique complet | Expérimental | Transforme un contenu brut en chaîne BHE : Memorization, Active Recall, Association, Identification, Transformation, Reflection. |

## Représentation

| Document | Emplacement | Thème principal | Statut | Résumé |
|---|---|---|---|---|
| Evaluation Pipeline | `docs/architecture/evaluation-pipeline.md` | Pipeline d’évaluation | Référence | Pose la sortie de l’évaluation hors renderer : UserInput, Evaluator, BHEResult, Feedback, AdaptiveRouting. |
| Adaptive Routing v0.1 | `docs/adaptive-routing.md` | Routage adaptatif | Référence | Décrit AdaptiveRouting v0.1, son principe, un cas Boost’English/Beci, ses limites et pistes v0.2. |
| Return Loop Orchestration Note | `docs/architecture/return-loop-orchestration-note.md` | Orchestration du retour | Référence | Compare câblage direct, helper léger et futur orchestrateur. Conclut qu’un registre global serait prématuré. |
| Return Loop Architecture Synthesis | `docs/reports/return-loop-architecture-synthesis.md` | Synthèse du pipeline retour | Référence | Synthétise le pipeline validé : ContentUnit, UserInput, Evaluator, BHEResult, FeedbackData, render/mount feedback. |
| FeedbackData Audit | `docs/architecture/20260617_feedbackdata-audit.md` | FeedbackData | À relire | Vérifie si FeedbackData peut représenter des interactions non évaluatives. À relire avec RepresentationPath. |
| Selection UserInput Audit | `docs/architecture/20260617_selection-userinput-audit.md` | UserInput de sélection | À relire | Compare QCM, InferenceJustifiedChoice et IdentificationSelection ; met en lumière les frictions de sélection non évaluative. |
| Non-Evaluative Interaction Stress Test | `docs/architecture/20260617_non-evaluative-interaction-stress-test.md` | Interaction non évaluative | Expérimental | Stress-test de représentation d’une interaction sans correction. Montre les frictions entre vocabulaire core et usage pédagogique. |
| Non-Evaluative Interaction Representation POC | `docs/architecture/20260617_non-evaluative-interaction-representation-poc.md` | Représentation non évaluative | Expérimental | POC concret pour représenter une activité non évaluative avec PedagogicalObject, InteractionData, UserInput et BHEResult. |
| Completed Path Investigation | `docs/architecture/20260623_completed-path-investigation.md` | Chemin vers `BHEResult.completed` | Expérimental | Enquête documentaire et technique sur la possibilité d’atteindre un vrai `BHEResult.completed` sans évaluation corrective. Conclut que le chemin existe à environ 80%. |
| Completed Path Spike Report | `docs/architecture/20260623_completed-path-spike-report.md` | Spike `completed` non correctif | Référence | Valide le pont minimal `IdentificationSelectionUserInput -> createCompletedResultFromUserInput -> BHEResult.completed -> FeedbackData.completed`. Verdict : viable. |
| Reflective Selection UI Investigation | `docs/architecture/20260623_reflective-selection-ui-investigation.md` | UI de sélection réflexive | Expérimental | Analyse où devrait vivre l’interface de sélection réflexive non évaluative : renderer, contrat renderer/evaluator, authoring ou autre niveau. |
| Contract Investigation | `docs/architecture/20260623_contract-investigation.md` | Lentille de contrat pédagogique | Expérimental | Observe le signal “same interaction mechanics, different pedagogical meaning” et teste l’utilité d’une lentille de contrat correctif, réflexif, diagnostic, exploratoire, etc. |
| InteractionData Emergence Report | `docs/reports/interaction-data-emergence-report.md` | InteractionData | Référence | Clarifie la séparation PedagogicalObject / InteractionData / Renderer et la nature d’InteractionData. |
| Adapter POC Report | `docs/reports/adapter-poc-report.md` | Adapter | Référence | Premier rapport sur l’adaptation d’un objet pédagogique vers une donnée d’interaction. |
| Evaluator POC Report | `docs/reports/evaluator-poc-report.md` | Evaluator | Référence | Valide la séparation renderer/évaluateur et explique pourquoi il n’y a pas encore de registry d’évaluateurs. |
| Evaluators Comparative Analysis | `docs/reports/evaluators-comparative-analysis.md` | Comparaison d’évaluateurs | Référence | Compare Classification QCM et Gap-Fill ; dégage des conventions de status, score, details et UserInput. |
| Partial Status Update Report | `docs/reports/partial-status-update-report.md` | BHEResult.partial | Référence | Explique l’introduction/usage du statut `partial` et ses effets sur FeedbackData et AdaptiveRouting. |
| Feedback Mapping POC Report | `docs/reports/feedback-mapping-poc-report.md` | Mapping BHEResult → FeedbackData | Référence | Montre comment le retour d’évaluation devient feedback affichable, sans encore porter un feedback pédagogique riche. |
| Feedback Display POC Report | `docs/reports/feedback-display-poc-report.md` | Affichage feedback | Référence | Valide l’affichage de FeedbackData et prépare l’intégration avec les renderers. |
| Feedback Tail Helper Report | `docs/reports/feedback-tail-helper-report.md` | Helper de feedback | Référence | Mutualise une partie de la fin de pipeline sans créer d’orchestrateur global. |
| Full Loop First Integration Analysis | `docs/reports/full-loop-first-integration-analysis.md` | Boucle complète | Référence | Analyse la première intégration complète renderer → input → evaluator → result → feedback. |
| Runtime Pathway Launcher POC Report | `docs/reports/runtime-pathway-launcher-poc-report.md` | Runtime / lancement de parcours | Expérimental | Ajoute une couche console-only après AdaptiveRouting ; distingue routing et lancement. |
| Beci Full Adaptive Pathway Report | `docs/reports/beci-full-adaptive-pathway-report.md` | Parcours adaptatif complet | Expérimental | Rapport sur un parcours adaptatif Beci complet. À lire comme validation exploratoire plutôt que design final. |
| DOM Renderer POC Report | `docs/reports/dom-renderer-poc-report.md` | Renderer DOM | Référence | Premier POC renderer DOM et limites volontairement absentes. |
| DOM Renderers Comparative Analysis | `docs/reports/dom-renderers-comparative-analysis.md` | Comparaison renderers DOM | Référence | Compare structure DOM, état local, événements, feedback, accessibilité et validation entre renderers. |
| ContentUnit Impact Analysis | `docs/reports/content-unit-impact-analysis.md` | ContentUnit | Référence | Analyse l’impact de ContentUnit sur Flashcards, associations multiples et rendu multimodal. |
| ContentUnit Implementation Report | `docs/reports/content-unit-implementation-report.md` | Implémentation ContentUnit | Référence | Documente l’ajout de ContentUnit, les choix de périmètre et les limites. |
| ContentUnit DOM Rendering Exploration | `docs/reports/content-unit-dom-rendering-exploration.md` | Rendu DOM ContentUnit | Expérimental | Explore comment rendre ContentUnit dans le DOM sans généraliser trop tôt. |
| ContentUnit DOM Renderer Report | `docs/reports/content-unit-dom-renderer-report.md` | Renderer ContentUnit | Référence | Rapport sur le rendu DOM de ContentUnit. |
| ContentUnit Draggable Media Interaction Report | `docs/reports/content-unit-draggable-media-interaction-report.md` | Médias dans drag-drop | Expérimental | Analyse l’usage de ContentUnit média dans des interactions glissables. |
| Drag-drop accessibility design note | `docs/architecture/drag-drop-accessibility-design-note.md` | Accessibilité drag-drop | Référence | Note de design pour fallback accessible, en particulier classification drag-drop. |
| Drag-drop accessibility fallback comparison | `docs/reports/drag-drop-accessibility-fallback-comparison.md` | Fallbacks drag-drop | Référence | Compare les mécaniques communes de fallback : sélection, clavier, move here, return here, aria-live. |
| Tuesday drag-drop multimodal accessibility synthesis | `docs/reports/tuesday-drag-drop-multimodal-accessibility-synthesis.md` | Synthèse drag-drop multimodal | Historique | Synthèse d’une journée de travail sur renderers drag-drop, fallback clavier et ContentUnit multimédia. |
| Drag-Drop Generalization Arbitration | `docs/reports/drag-drop-generalization-arbitration.md` | Généralisation drag-drop | Référence | Arbitre contre une généralisation trop rapide de DragDropData ; distingue commun mécanique et différences pédagogiques. |
| Drag-drop DOM renderers comparison | `docs/reports/drag-drop-dom-renderers-comparison.md` | Comparaison DOM drag-drop | Référence | Compare mécaniques DOM communes et différences pédagogiques entre drag-drops. |
| Drag-drop specialized POCs comparison | `docs/reports/drag-drop-specialized-pocs-comparison.md` | POCs drag-drop spécialisés | Référence | Compare AssociationDragDrop et ClassificationDragDrop côté InteractionData, UserInput et Evaluators. |
| Association Drag-Drop Data Adapter Report | `docs/reports/association-drag-drop-data-adapter-report.md` | Adapter association drag-drop | Référence | Documente l’adaptation d’AssociationSet vers drag-drop. |
| Association Drag-Drop DOM Renderer POC Report | `docs/reports/association-drag-drop-dom-renderer-poc-report.md` | Renderer association drag-drop | Référence | POC renderer DOM pour association drag-drop. |
| Association Drag-Drop Evaluator POC Report | `docs/reports/association-drag-drop-evaluator-poc-report.md` | Evaluator association drag-drop | Référence | POC d’évaluation association drag-drop. |
| Association Drag-Drop Stress Test Synthesis | `docs/reports/association-drag-drop-stress-test-synthesis.md` | Stress-test association drag-drop | Expérimental | Synthèse des contraintes et validations autour d’association drag-drop. |
| Association drag-drop accessibility fallback report | `docs/reports/association-drag-drop-accessibility-fallback-report.md` | Accessibilité association drag-drop | Référence | Rapport sur le fallback accessible d’association drag-drop. |
| Association Drag-Drop ContentUnit Exploration | `docs/reports/association-drag-drop-content-unit-exploration.md` | Association + ContentUnit | Expérimental | Explore l’intégration de ContentUnit dans association drag-drop. |
| Association drag-drop ContentUnit rendering report | `docs/reports/association-drag-drop-content-unit-rendering-report.md` | Rendu association + ContentUnit | Référence | Rapport sur le rendu ContentUnit dans association drag-drop. |
| Classification Drag-Drop Data Adapter Report | `docs/reports/classification-drag-drop-data-adapter-report.md` | Adapter classification drag-drop | Référence | Documente l’adaptation de ClassificationSet vers drag-drop. |
| Classification drag-drop DOM renderer POC report | `docs/reports/classification-drag-drop-dom-renderer-poc-report.md` | Renderer classification drag-drop | Référence | POC renderer DOM pour classification drag-drop. |
| Classification Drag-Drop Evaluator POC Report | `docs/reports/classification-drag-drop-evaluator-poc-report.md` | Evaluator classification drag-drop | Référence | POC d’évaluation classification drag-drop. |
| Classification drag-drop accessibility fallback report | `docs/reports/classification-drag-drop-accessibility-fallback-report.md` | Accessibilité classification drag-drop | Référence | Rapport sur le fallback accessible de classification drag-drop. |
| Classification QCM Renderer Integration Report | `docs/reports/classification-qcm-renderer-integration-report.md` | Renderer QCM classification | Référence | Rapport d’intégration du renderer QCM pour ClassificationSet. |
| Gap-Fill Evaluator POC Report | `docs/reports/gap-fill-evaluator-poc-report.md` | Evaluator GapFill | Référence | Deuxième évaluateur utile, confirme les conventions de pipeline retour. |
| Gap-Fill Renderer Integration Report | `docs/reports/gap-fill-renderer-integration-report.md` | Renderer GapFill | Référence | Intègre GapFill dans le pipeline de rendu/évaluation et compare avec QCM. |
| GapFillSet Methodological Rereading | `docs/reports/gap-fill-set-methodological-rereading.md` | Relecture GapFillSet | À relire | Relecture méthodologique de GapFillSet, de son état et de ses tensions. |
| Identification selection POC report | `docs/reports/identification-selection-poc-report.md` | IdentificationSelection | Référence | Documente InteractionData, scoring, extraTargetIds et scénarios de POC. |
| Identification selection DOM renderer POC report | `docs/reports/identification-selection-dom-renderer-poc-report.md` | Renderer IdentificationSelection | Référence | POC renderer DOM avec accessibilité V0, UserInput et feedback local. |
| Identification selection renderer design note | `docs/reports/identification-selection-renderer-design-note.md` | Design renderer IdentificationSelection | Référence | Note de design pour la forme V0, accessibilité et connexion pipeline. |
| Identification selection scoring/status arbitration | `docs/reports/identification-selection-scoring-status-arbitration.md` | Scoring IdentificationSelection | Référence | Arbitre le cas extra-only et la signification de partial/failed. |
| Identification selection V0 status update report | `docs/reports/identification-selection-v0-status-update-report.md` | Mise à jour statut IdentificationSelection | Référence | Fixe la règle V0 : partial signifie correction partielle. |
| Selection move helper report | `docs/reports/selection-move-helper-report.md` | Helper DOM de sélection | Référence | Documente la mutualisation d’un helper de mouvement/sélection tout en gardant la pédagogie locale. |
| Sequence reorder data adapter report | `docs/reports/sequence-reorder-data-adapter-report.md` | Adapter SequenceReorder | Référence | Retient une forme minimale pour SequenceReorderData. |
| Sequence reorder DOM renderer POC report | `docs/reports/sequence-reorder-dom-renderer-poc-report.md` | Renderer SequenceReorder | Référence | POC renderer DOM, accessibilité V0 et UserInput. |
| Sequence reorder evaluator POC report | `docs/reports/sequence-reorder-evaluator-poc-report.md` | Evaluator SequenceReorder | Référence | Décrit la stratégie de scoring et le rôle non scoré de l’adjacence. |
| Sequence reorder accessibility interaction note | `docs/reports/sequence-reorder-accessibility-interaction-note.md` | Accessibilité SequenceReorder | Référence | Compare les stratégies accessibles pour réordonner. |
| Sequence scoring strategies comparison | `docs/reports/sequence-scoring-strategies-comparison.md` | Scoring de séquence | Référence | Compare scoring position exacte et scoring par adjacence. |
| Transformation InteractionData Exploration | `docs/reports/transformation-interaction-data-exploration.md` | InteractionData Transformation | Référence | Explore pourquoi un typing générique est insuffisant pour TransformationSet. |
| Transformation InteractionData Adapter Report | `docs/reports/transformation-interaction-data-adapter-report.md` | Adapter Transformation | Référence | Documente la forme retenue, source → operation → target. |
| Transformation Typing Evaluator POC Report | `docs/reports/transformation-typing-evaluator-poc-report.md` | Evaluator TransformationTyping | Référence | Décrit UserInput, scoring, details et accepted variants. |
| Transformation Typing DOM Renderer POC Report | `docs/reports/transformation-typing-dom-renderer-poc-report.md` | Renderer TransformationTyping | Référence | POC renderer DOM préservant source → operation → target. |
| Transformation Accepted Variants Model Arbitration | `docs/reports/transformation-accepted-variants-model-arbitration.md` | Variantes acceptées | Référence | Arbitre où placer `accepted` pour TransformationItem. |
| Transformation Accepted Variants Model Update Report | `docs/reports/transformation-accepted-variants-model-update-report.md` | Mise à jour accepted variants | Référence | Documente l’ajout au modèle, le comportement adapter/evaluator et les limites. |
| Inference V0 interaction strategies comparison | `docs/reports/inference-v0-interaction-strategies-comparison.md` | Stratégies d’interaction Inference | Référence | Compare QCM inference, evidence selection et autres stratégies possibles. |
| Inference justified choice POC report | `docs/reports/inference-justified-choice-poc-report.md` | InferenceJustifiedChoice | Référence | POC choix justifié : data shape, scoring et limites de l’évaluation qualitative. |
| InferencePrompt choices model arbitration | `docs/reports/inference-prompt-choices-model-arbitration.md` | Modèle InferencePrompt choices | Référence | Arbitre le placement des choices entre modèle pédagogique et InteractionData. |
| InferencePrompt choices model update report | `docs/reports/inference-prompt-choices-model-update-report.md` | Mise à jour InferencePrompt | Référence | Documente l’ajout des distractors/choices au modèle. |
| Memorization Flashcards Adapter Report | `docs/reports/memorization-flashcards-adapter-report.md` | Adapter flashcards | Référence | Documente pourquoi FlashcardsData est un bon premier test pour MemorizationSet. |
| Memorization Active Recall Arbitration | `docs/reports/memorization-active-recall-arbitration.md` | Rappel actif | Référence | Arbitre entre flashcards, typing recall et self-evaluation. |
| Memorization Typing Recall Evaluator Report | `docs/reports/memorization-typing-recall-evaluator-report.md` | Evaluator typing recall | Référence | Documente le pipeline de rappel actif, ses scénarios et sa différence avec GapFill/Transformation. |
| Typing Gesture Cognitive Operations Comparison | `docs/reports/typing-gesture-cognitive-operations-comparison.md` | Geste typing vs cognition | Référence | Compare GapFillTyping, TransformationTyping et MemorizationTypingRecall. Important pour éviter de confondre geste et pédagogie. |
| Text Matching Helper Report | `docs/reports/text-matching-helper-report.md` | Helper de matching texte | Référence | Décrit un helper de comparaison textuelle et ce qu’il ne doit pas savoir. |

## Corpus Boost'English

| Document | Emplacement | Thème principal | Statut | Résumé |
|---|---|---|---|---|
| BHE × Boost’English — Architectural Signals from a Real Brick | `docs/architecture/20260601_bhe_boost_english_real_brick_signals.md` | Signaux depuis une brique réelle | Historique | Premier contact structuré entre BHE et une brique Boost’English réelle ; confirme la force des primitives existantes. |
| Boost'English Corpus Cartography | `docs/architecture/20260605_boost-english-corpus-cartography.md` | Cartographie du corpus | Référence | Vue synthétique du corpus Boost’English et premiers patterns descriptifs. Point d’entrée corpus. |
| Memorising Vocabulary POC | `docs/architecture/20260606_memorising-vocabulary_poc.md` | Analyse brique vocabulaire | Expérimental | Analyse ce que la brique enseigne réellement : vocabulaire, stratégie, métacognition, autonomie, confiance. |
| Passive Voice POC | `docs/architecture/20260606_passive-voice_poc.md` | Analyse brique passive voice | Expérimental | Analyse la brique passive voice comme grammaire, focus awareness, discours et collaboration. |
| Way-finding POC | `docs/architecture/20260606_wayfinding_poc.md` | Analyse brique wayfinding | Expérimental | Analyse la brique comme vocabulaire directionnel, communication située et fiabilité d’action. |
| Countable / Uncountable Nouns — I Learn — Moment POC | `docs/architecture/20260604_countable-uncountable_i-learn_moment-poc.md` | POC Moment corpus | Expérimental | Teste Moment sur une étape I Learn ; révèle autant de clarifications que de risques de sur-description. |
| Thinking In English — I Start — Moment POC | `docs/architecture/20260604_thinking-in-english_i-start_moment-poc.md` | POC Moment corpus | Expérimental | Première tentative de représenter un moment “I Start” pour Thinking in English. |
| Thinking In English — I Say — Moment Boundary POC | `docs/architecture/20260604_thinking-in-english_i-say_moment-boundary-poc.md` | Frontière Moment | Expérimental | Teste les limites de Moment sur une étape expressive, avec plusieurs micro-objets possibles. |
| Question Forms — Negative Moment POC | `docs/architecture/20260604_question-forms_negative-moment-poc.md` | Contre-exemple Moment | Expérimental | Cas négatif servant à tester si Moment clarifie ou complique inutilement. |
| Boost English brick POC adjectives cognitive mapping | `docs/reports/20260601_boost_english_brick_poc_adjectives_cognitive_mapping.md` | Mapping cognitif corpus | Historique | Rapport de mapping d’une brique adjectives/adverbs vers les primitives cognitives. |
| Day Week5 BHE Real Bricks Signals | `docs/reports/20260602_day_week5_bhe_real_bricks_signals.md` | Signaux briques réelles | Historique | Synthèse de signaux issus des briques réelles au début de l’exploration corpus. |
| Corpus PDF — Adjectives and adverbs | `docs/bhe-be-corpus/1. Adjectives and adverbs - Final - Carole.pdf` | Source corpus | Référence | Support original Boost’English utilisé comme matière de stress-test. |
| Corpus PDF — Conditionals | `docs/bhe-be-corpus/1. Conditionals - Final - Carole.pdf` | Source corpus | Référence | Support original Boost’English pour analyses futures ou comparatives. |
| Corpus PDF — Negative Adjectives and Prefixes | `docs/bhe-be-corpus/2. Negative Adjectives and Prefixes - V finale.pdf` | Source corpus | Référence | Support original Boost’English. |
| Corpus PDF — Passive voice | `docs/bhe-be-corpus/2. Passive voice - Final - Carole.pdf` | Source corpus | Référence | Source de la POC Passive Voice. |
| Corpus PDF — Adjectives and suffixes | `docs/bhe-be-corpus/3. Adjectives and suffixes - Vfinale Carole.pdf` | Source corpus | Référence | Support original Boost’English. |
| Corpus PDF — Comparatives and Superlatives | `docs/bhe-be-corpus/3. Comparatives and Superlatives - Final - Carole.pdf` | Source corpus | Référence | Support original Boost’English. |
| Corpus PDF — Countable Uncountable nouns | `docs/bhe-be-corpus/6. Countable Uncountable nouns - Final - Carole.pdf` | Source corpus | Référence | Source de la POC Countable/Uncountable. |
| Corpus PDF — Past simple vs Present perfect | `docs/bhe-be-corpus/BBE - Past simple vs Present perfect - Carole Vfinale.pdf` | Source corpus | Référence | Support original Boost’English. |
| Corpus PDF — Present perfect simple and continuous | `docs/bhe-be-corpus/Present perfect simple and present perfect continuous - Carole Vfinale.pdf` | Source corpus | Référence | Support original Boost’English. |
| Corpus PDF — Present simple and Present continuous | `docs/bhe-be-corpus/Present simple and Present continuous - Vfinale.pdf` | Source corpus | Référence | Support original Boost’English. |
| Corpus PDF — Memorising vocabulary | `docs/bhe-be-corpus/REVAMP - Memorising vocabulary - Beci_VFv2.pdf` | Source corpus | Référence | Source de la POC Memorising Vocabulary. |
| Corpus PDF — Thinking in English | `docs/bhe-be-corpus/REVAMP - thinking in English - Rebecca.pdf` | Source corpus | Référence | Source centrale des explorations authoring récentes. |
| Corpus PDF — Wayfinding | `docs/bhe-be-corpus/Wayfinding 1 revamp - V2.pdf` | Source corpus | Référence | Source de la POC Wayfinding. |
| Brick spreadsheet | `docs/Word/brick_1.xlsx` | Artefact corpus / travail | À relire | Fichier tableur conservé dans docs. Son rôle exact devrait être confirmé avant usage comme référence. |
| Steps document | `docs/Word/Steps.docx` | Artefact corpus / travail | À relire | Document Word conservé dans docs. Son rôle exact devrait être confirmé avant usage comme référence. |

## Authoring

| Document | Emplacement | Thème principal | Statut | Résumé |
|---|---|---|---|---|
| Pedagogical Intention Exploration | `docs/architecture/20260618_pedagogical-intention-exploration.md` | Intention pédagogique | Expérimental | Explore ce que l’architecture expose naturellement et ce qui reste implicite côté auteur. |
| Pedagogical Intentions Stress Test | `docs/architecture/20260618_pedagogical-intentions-stress-test.md` | Stress-test intentions | Expérimental | Montre les ambiguïtés : une brique peut avoir plusieurs intentions légitimes, l’action apprenant et le but auteur divergent parfois. |
| Pedagogical Layers Stress Test | `docs/architecture/20260618_pedagogical-layers-stress-test.md` | Couches pédagogiques | Expérimental | Teste la séparation intention pédagogique, opération cognitive, interaction purpose. |
| BHE Author Discoverability Catalog | `docs/architecture/20260618_author-discoverability-catalog.md` | Catalogue de découvrabilité | Référence | Catalogue auteur des formes d’interaction et de leurs usages évidents ou moins évidents. Base directe du package authoring. |
| Author Entry Point Stress Test | `docs/architecture/20260618_author-entry-point-stress-test.md` | Entrées auteur | Expérimental | Reconstruit les points d’entrée possibles pour l’auteur sur plusieurs briques. |
| Author Journeys Stress Test | `docs/architecture/20260618_author-journeys-stress-test.md` | Parcours auteur | Expérimental | Reconstruit des parcours auteur et met en évidence les frictions de découvrabilité. |
| Authoring Thinking In English | `docs/architecture/20260618_authoring-thinking-in-english.md` | Expérience auteur Thinking in English | Expérimental | Suit le chemin d’un auteur pour représenter Thinking in English ; montre la difficulté à passer de l’intention à BHE. |
| Catalog Application - Thinking In English | `docs/architecture/20260618_catalog-application_thinking-in-english.md` | Application du catalogue | Expérimental | Applique le catalogue à Thinking in English ; verdict implicite : le catalogue aide l’identification, mais pas encore la représentation. |
| Representation Recipes Exploration | `docs/architecture/20260618_representation-recipes-exploration.md` | Couche intermédiaire provisoire | Expérimental | Explore l’idée de recettes entre Pedagogical Use et BHE Representation. Conclusion : partiellement utile. |
| RepresentationPath Implementation Report | `docs/architecture/20260618_representation-path-implementation-report.md` | Prototype authoring | Expérimental | Rapport du prototype `RepresentationPath` dans `packages/authoring`. Indique explicitement qu’il ne stabilise aucune architecture core. |
| Author Discovery Playground V0 Report | `docs/architecture/20260622_author-discovery-playground-v0-report.md` | Playground auteur | Expérimental | Premier prototype manipulable reliant intention auteur, PedagogicalUse, RepresentationPath, BHE Representation et exemple corpus. |
| Author Discovery Playground V0.1 Report | `docs/architecture/20260622_author-discovery-playground-v0-1-report.md` | Couverture authoring | Expérimental | Ajoute les niveaux READY / PLAUSIBLE / MISSING BRIDGE pour rendre visible où l’authoring est mature ou encore incomplet. |
| Explore Before The Rule Investigation | `docs/architecture/20260622_explore-before-the-rule-investigation.md` | Enquête orchestration auteur | Expérimental | Vérifie si `Explore Before The Rule` existe déjà dans la documentation. Conclusion : plutôt une orchestration auteur-visible qu’un nouveau concept core. |
| Explore Before The Rule Orchestration Path Report | `docs/architecture/20260622_explore-before-the-rule-orchestration-path-report.md` | AuthorOrchestrationPath | Expérimental | Matérialise `Explore Before The Rule` comme chemin d’orchestration authoring-only, sans le réduire à un `RepresentationPath` unique. |
| Compare Investigation | `docs/architecture/20260622_compare-investigation.md` | Enquête Compare | Expérimental | Montre que `Compare` est une intention auteur transversale pouvant emprunter plusieurs chemins BHE existants, pas un `PedagogicalUse` unique. |
| Compare Clarification Path Report | `docs/architecture/20260622_compare-clarification-path-report.md` | Clarification auteur Compare | Expérimental | Ajoute la question `What are learners comparing?` et route Compare vers Categories, Relations, Forms, Hypotheses, Order ou Strategies/Habits. |
| Compare Clarification Real Bricks Validation | `docs/architecture/20260622_compare-clarification-real-bricks-validation.md` | Validation corpus Compare | Expérimental | Teste la clarification sur Countable/Uncountable, Passive Voice et Thinking in English. Verdict : utile mais incomplet. |
| Authoring To Interactive Examples Report | `docs/architecture/20260622_authoring-to-interactive-examples-report.md` | Exemples interactifs authoring | Expérimental | Ajoute des mini-interactions locales aux validations pour rendre visible la chaîne jusqu’au geste apprenant, sans stabiliser de runtime. |
| Real BHE Path Validation Report | `docs/architecture/20260622_real-bhe-path-validation-report.md` | Validation branchement moteur | Référence | Mesure honnêtement où la chaîne authoring atteint le moteur réel : Classification et Transformation sont connectés ; la sélection réflexive reste partielle. |
| Reflect Investigation | `docs/architecture/20260623_reflect-investigation.md` | Enquête Reflect | Expérimental | Montre que `Reflect` est une intention auteur nécessitant clarification, notamment autour de ce sur quoi l’apprenant réfléchit : habitudes, stratégies, confiance, compréhension, expérience, progrès, etc. |
| Reflect Clarification Path Report | `docs/architecture/20260623_reflect-clarification-path-report.md` | Clarification auteur Reflect | Expérimental | Ajoute la question `What are learners reflecting on?` et route Reflect vers des chemins réflexifs, inférentiels ou situés selon la famille choisie. |
| Author Intent Routing Survey | `docs/architecture/20260623_author-intent-routing-survey.md` | Routage des intentions auteur | Référence | Inventorie les intentions du playground et distingue trois comportements : Self-routing, Clarification-routing et Hybrid. Pose la structure émergente du playground. |
| Playground Routing Visualization Report | `docs/architecture/20260623_playground-routing-visualization-report.md` | Visualisation du routage auteur | Expérimental | Matérialise dans le playground la carte des intentions : chaque intention affiche type de routage, question implicite, direction BHE et confiance. |
| Produce Investigation | `docs/architecture/20260623_produce-investigation.md` | Enquête Produce | Expérimental | Montre que `Produce` n’est pas un chemin BHE mais un signal auteur à désambiguïser : rappel, gap-fill, transformation, inférence, réflexion, réponse située, etc. |
| Produce Clarification Path Report | `docs/architecture/20260623_produce-clarification-path-report.md` | Clarification auteur Produce | Expérimental | Ajoute la question `What kind of production is expected?` et route Produce vers Recalled Target, Context-Fitting Answer, Transformed Form, Hypothesis, Reflection, Situated Response ou Communicative Clue. |
| Classify Investigation | `docs/architecture/20260623_classify-investigation.md` | Enquête Classify | Expérimental | Analyse pourquoi `Classify` est hybride : classification de catégories stables, exploration de catégories émergentes, diagnostic ou inférence. |
| Notice Investigation | `docs/architecture/20260623_notice-investigation.md` | Enquête Notice | Expérimental | Étudie ce que signifie `Help learners notice something` dans BHE : pattern, distinction, indice, habitude, stratégie, misconception ou relation. |
| Apply Investigation | `docs/architecture/20260623_apply-investigation.md` | Enquête Apply | Expérimental | Montre que `Apply` reste hybride et dépend de ce qui est appliqué et de la situation dans laquelle l’apprenant agit. |
| Authoring Route Realization Report | `docs/architecture/20260623_authoring-route-realization-report.md` | Réalisation des routes authoring | Référence | Introduit la mesure `exists completely / partially exists / missing pieces` pour distinguer route comprise, route partielle et route réellement branchée au système BHE. |
| First Complete Route Realization Report | `docs/architecture/20260623_first-complete-route-realization-report.md` | Première route complète | Référence | Matérialise la route `Compare -> Categories -> ClassificationSet` comme première route authoring complète grâce à un `RepresentationPath` explicite. |
| Second Complete Route Realization Report | `docs/architecture/20260623_second-complete-route-realization-report.md` | Deuxième route complète | Référence | Matérialise la route `Compare -> Before / After Forms -> TransformationSet` comme deuxième route complète, sans nouveau concept core. |
| Memorization Typing Recall Renderer Report | `docs/architecture/20260623_memorization-typing-recall-renderer-report.md` | Renderer recall typing | Référence | Documente le renderer spécialisé `MemorizationTypingRecall`, qui complète la route `Produce -> Recalled Target -> Recall Through Typing`. |
| Reflective Selection Renderer Report | `docs/architecture/20260623_reflective-selection-renderer-report.md` | Renderer sélection réflexive | Référence | Documente le renderer spécialisé de sélection réflexive non corrective, permettant `Reflect -> Strategies -> Reflect Through Selection -> completed`. |
| Apply Completion Conditions Investigation | `docs/architecture/20260623_apply-completion-conditions-investigation.md` | Conditions de réussite située | Référence | Identifie la frontière restante pour `Apply Through Situated Task` : `situated response -> evidence of use -> BHEResult`. Conclut qu’Apply exige un modèle minimal d’évidence située. |
| Authoring Cycle Synthesis | `docs/architecture/20260623_authoring-cycle-synthesis.md` | Synthèse du cycle authoring | Référence | Synthèse structurante de fin de cycle : le playground est devenu une surface de routage auteur, avec clarification, réalisation et validation corpus. |

## POCs et expérimentations

| Document | Emplacement | Thème principal | Statut | Résumé |
|---|---|---|---|---|
| Cognitive Situations Hypothesis Analysis | `docs/reports/cognitive-situations-hypothesis-analysis.md` | Situations cognitives | Expérimental | Analyse l’hypothèse des situations cognitives et ses effets possibles sur l’architecture. |
| Memorization Active Recall Arbitration | `docs/reports/memorization-active-recall-arbitration.md` | Arbitrage active recall | Référence | Document également utile comme POC : explique pourquoi le rappel actif devient plus représentatif que de simples flashcards. |
| Inference justified choice POC report | `docs/reports/inference-justified-choice-poc-report.md` | POC inference | Référence | Valide un chemin interactionnel pour l’inférence à choix justifié, tout en gardant la justification non évaluée qualitativement. |
| Sequence reorder DOM renderer POC report | `docs/reports/sequence-reorder-dom-renderer-poc-report.md` | POC sequence renderer | Référence | POC représentatif de la méthode BHE : data dédiée, renderer spécialisé, accessibilité V0. |
| Runtime Pathway Launcher POC Report | `docs/reports/runtime-pathway-launcher-poc-report.md` | POC runtime | Expérimental | Explore un lancement de parcours après routing sans stabiliser un runtime complet. |
| Association Drag-Drop Stress Test Synthesis | `docs/reports/association-drag-drop-stress-test-synthesis.md` | Stress-test interaction | Expérimental | Synthèse utile pour comprendre pourquoi certains helpers sont gagnés progressivement. |
| ContentUnit DOM Rendering Exploration | `docs/reports/content-unit-dom-rendering-exploration.md` | Exploration rendu multimodal | Expérimental | Exploration de rendu multimodal avant stabilisation plus large. |
| GapFillSet Methodological Rereading | `docs/reports/gap-fill-set-methodological-rereading.md` | Relecture méthodologique | À relire | Document de relecture plutôt que décision finale. |
| Beci Full Adaptive Pathway Report | `docs/reports/beci-full-adaptive-pathway-report.md` | Parcours adaptatif | Expérimental | Expérimentation complète autour d’un parcours adaptatif. |
| Author Discovery Playground V0/V0.1 | `docs/architecture/20260622_author-discovery-playground-v0-report.md` et `docs/architecture/20260622_author-discovery-playground-v0-1-report.md` | POC expérience auteur | Expérimental | POC manipulable pour tester la découvrabilité auteur et la couverture READY / PLAUSIBLE / MISSING BRIDGE. |
| Compare Clarification Real Bricks Validation | `docs/architecture/20260622_compare-clarification-real-bricks-validation.md` | POC validation corpus | Expérimental | Valide la clarification Compare sur trois briques réelles et montre que la question de clarification route effectivement l’auteur. |
| Authoring To Interactive Examples Report | `docs/architecture/20260622_authoring-to-interactive-examples-report.md` | POC exemples interactifs | Expérimental | Ferme la chaîne démonstrative par des mini-interactions authoring-only, explicitement rollbackables. |
| Real BHE Path Validation Report | `docs/architecture/20260622_real-bhe-path-validation-report.md` | POC branchement réel | Référence | Teste le remplacement des démos par de vrais chemins BHE existants et identifie deux chemins connectés plus un chemin partiel. |
| Completed Path Spike Report | `docs/architecture/20260623_completed-path-spike-report.md` | Spike chemin completed | Référence | Spike minimal validant que Thinking in English peut produire un vrai `BHEResult.completed` et un feedback non correctif sans nouveau concept core. |
| Playground Routing Visualization Report | `docs/architecture/20260623_playground-routing-visualization-report.md` | POC carte de routage auteur | Expérimental | Ajoute au playground une carte cliquable des comportements de routage : Self-routing, Clarification-routing et Hybrid. |
| Produce Clarification Path Report | `docs/architecture/20260623_produce-clarification-path-report.md` | POC clarification Produce | Expérimental | Ajoute un chemin de clarification pour Produce et valide trois briques : Passive Voice, Memorising Vocabulary et Thinking in English. |
| Authoring Route Realization Report | `docs/architecture/20260623_authoring-route-realization-report.md` | POC mesure des routes | Référence | Ajoute une vue qui vérifie si les routes authoring atteignent réellement le core, les renderers, les evaluators, les helpers de completion et le feedback. |
| Memorization Typing Recall Renderer Report | `docs/architecture/20260623_memorization-typing-recall-renderer-report.md` | POC renderer recall | Référence | Crée la pièce manquante pour le rappel actif typé : cue, tentative saisie, evaluator existant et feedback. |
| Reflective Selection Renderer Report | `docs/architecture/20260623_reflective-selection-renderer-report.md` | POC renderer réflexif | Référence | Crée la pièce manquante pour une sélection non corrective menant à `BHEResult.completed`, sans score ni bonne réponse. |

## Archives et documents historiques

| Document | Emplacement | Thème principal | Statut | Résumé |
|---|---|---|---|---|
| BHE Meta | `docs/meta/README.md` | Organisation meta | Historique | Présente les documents meta : mémoire, méthode, hypothèses. |
| Anti-Forgetting Memory System | `docs/meta/memory/20260513_anti_forgetting_memory_system_may_2026.md` | Mémoire anti-oubli | Historique | Décrit le système pour conserver idées faibles, tensions et pistes non priorisées. |
| GPT / Codex / Human Workflow | `docs/meta/methodology/20260513_gpt_codex_human_workflow_may_2026.md` | Workflow humain/GPT/Codex | Historique | Formalise la collaboration entre David, GPT et Codex dans l’architecture et le développement. |
| Cognitive Situations Hypothesis | `docs/meta/20260521-GPT-cognitive-situations-hypothesis.md` | Hypothèse cognitive | Historique | Note exploratoire sur la possibilité de reframer les objets via situations cognitives. |
| Learning Experience Layer — Emerging Signal | `docs/meta/20260521-GPT-learning-experience-layer-signal.md` | Couche expérience apprenant | À relire | Signal ancien sur une couche d’expérience d’apprentissage. À croiser avec authoring et RepresentationPath. |
| Learning Experience Layer Signal | `docs/meta/learning-experience-layer-signal.md` | Couche expérience apprenant | À relire | Variante ou reprise du signal précédent ; présence doublonnée probable, à consolider plus tard. |

## Documents essentiels pour reprendre BHE

Parcours de lecture recommandé, limité aux documents réellement utiles pour reprendre le projet :

1. `docs/architecture/20260618_principe_architectural.md`  
   Comprendre le principe récent : l’architecture doit être découvrable par l’auteur.

2. `docs/architecture/20260623_authoring-cycle-synthesis.md`  
   Comprendre l’état authoring actuel après le premier cycle : le playground est devenu une surface de routage auteur, pas un simple menu.

3. `docs/architecture/bhe-complete-pipeline-and-content-unit.md`  
   Comprendre le pipeline global, les responsabilités et la place de ContentUnit.

4. `docs/architecture/pedagogical-object-taxonomy.md`  
   Comprendre les objets pédagogiques, familles, types et contenus.

5. `docs/architecture/evaluation-pipeline.md`  
   Comprendre le pipeline retour : UserInput, Evaluator, BHEResult, Feedback, AdaptiveRouting.

6. `docs/architecture/cognitive-operations-vocabulary.md`  
   Comprendre le vocabulaire cognitif qui évite de confondre geste, objet et intention.

7. `docs/architecture/20260606_bhe-be-weekly-synthesis.md`  
   Lire la synthèse des leçons BHE-BE : ce qui semble robuste et ce qui doit rester descriptif.

8. `docs/architecture/20260618_author-discoverability-catalog.md`  
   Comprendre la tentative de rendre le système lisible depuis le point de vue auteur.

9. `docs/architecture/20260618_representation-path-implementation-report.md`  
   Comprendre le prototype expérimental `RepresentationPath`, son périmètre et ses limites.

10. `docs/architecture/20260622_author-discovery-playground-v0-report.md`  
   Comprendre la première matérialisation manipulable de l’expérience auteur.

11. `docs/architecture/20260623_author-intent-routing-survey.md`  
    Comprendre la structure émergente du playground : Self-routing, Clarification-routing et Hybrid.

12. `docs/architecture/20260622_compare-clarification-path-report.md`  
    Comprendre comment une intention auteur large comme `Compare` devient une question de clarification plutôt qu’un chemin unique.

13. `docs/architecture/20260623_reflect-clarification-path-report.md`  
    Comprendre comment `Reflect` suit le même modèle de clarification, mais peut router vers des chemins réflexifs, inférentiels ou situés.

14. `docs/architecture/20260623_produce-clarification-path-report.md`  
    Comprendre pourquoi `Produce` n’est pas une destination BHE et comment la question `What kind of production is expected?` route vers des chemins existants.

15. `docs/architecture/20260623_authoring-route-realization-report.md`  
    Comprendre le niveau `Route Realization` : une route doit être découvrable par l’auteur et réellement connectée au système BHE pour compter comme complète.

16. `docs/architecture/20260623_first-complete-route-realization-report.md`  
    Comprendre la première route complète : `Compare -> Categories -> ClassificationSet`.

17. `docs/architecture/20260623_second-complete-route-realization-report.md`  
    Comprendre la deuxième route complète : `Compare -> Before / After Forms -> TransformationSet`.

18. `docs/architecture/20260623_memorization-typing-recall-renderer-report.md`  
    Comprendre la troisième route complète : `Produce -> Recalled Target -> MemorizationTypingRecall`.

19. `docs/architecture/20260623_reflective-selection-renderer-report.md`  
    Comprendre la quatrième route complète : `Reflect -> Strategies -> Reflect Through Selection -> completed`.

20. `docs/architecture/20260623_apply-completion-conditions-investigation.md`  
    Comprendre la frontière actuelle : `Apply Through Situated Task` exige une évidence située, pas seulement une réponse soumise.

21. `docs/architecture/20260622_real-bhe-path-validation-report.md`  
    Comprendre jusqu’où les chemins authoring atteignent réellement le moteur BHE aujourd’hui.

22. `docs/architecture/20260623_completed-path-spike-report.md`  
    Comprendre le pont minimal vers `BHEResult.completed` pour les interactions non correctives.

23. `docs/architecture/20260618_representation-recipes-exploration.md`  
   Comprendre pourquoi une couche intermédiaire est utile mais encore partielle.

24. `docs/architecture/20260605_boost-english-corpus-cartography.md`  
    Voir le terrain réel : le corpus Boost’English qui force les questions d’architecture.

Lecture complémentaire utile selon chantier :

- Pour renderers/evaluators : `docs/reports/return-loop-architecture-synthesis.md`, `docs/reports/evaluators-comparative-analysis.md`, `docs/reports/dom-renderers-comparative-analysis.md`.
- Pour typing : `docs/reports/typing-gesture-cognitive-operations-comparison.md`.
- Pour drag-drop : `docs/reports/drag-drop-generalization-arbitration.md`.
- Pour authoring : `docs/architecture/20260618_authoring-thinking-in-english.md`, `docs/architecture/20260618_catalog-application_thinking-in-english.md`, `docs/architecture/20260622_explore-before-the-rule-orchestration-path-report.md`, `docs/architecture/20260623_playground-routing-visualization-report.md`, `docs/architecture/20260623_reflect-investigation.md`, `docs/architecture/20260623_produce-investigation.md`, `docs/architecture/20260623_classify-investigation.md`, `docs/architecture/20260623_notice-investigation.md` et `docs/architecture/20260623_apply-investigation.md`.

## Concepts aujourd’hui stabilisés

Les éléments suivants semblent relativement établis dans l’état documentaire actuel :

- Séparation entre **PedagogicalObject**, **InteractionData**, **Renderer**, **UserInput**, **Evaluator**, **BHEResult** et **FeedbackData**.
- Principe selon lequel le même geste d’interface ne suffit pas à identifier la même pédagogie.
- Existence de types d’interaction spécialisés plutôt qu’un modèle unique trop abstrait.
- Importance de `BHEResult`, notamment des statuts `success`, `partial`, `failed` et `completed`.
- Séparation entre pipeline forward et pipeline return.
- Rôle de `ContentUnit` comme support de contenu plus flexible, sans imposer immédiatement un rendu multimédia généralisé.
- Nécessité de préserver l’accessibilité dès les POCs d’interaction.
- Distinction entre **usage pédagogique** et **représentation BHE**.
- Existence d’une couche `packages/authoring` expérimentale distincte du core.
- `PedagogicalUse` comme vocabulaire auteur expérimental mais utile.
- `RepresentationPath` comme prototype expérimental de traduction auteur, situé dans `packages/authoring`, sans stabilisation d’une nouvelle architecture core.
- `Author Discovery Playground` comme outil expérimental de découvrabilité auteur, situé dans `packages/authoring`.
- `AuthorOrchestrationPath` comme piste authoring-only utile pour des phénomènes multi-étapes comme `Explore Before The Rule`, sans statut core.
- `Compare Clarification` comme pattern authoring prudent : `Compare` n’est pas un chemin mais une intention qui demande `What are learners comparing?`.
- `Reflect Clarification` comme extension du même pattern : `Reflect` demande `What are learners reflecting on?` avant de router vers sélection, typing, inférence ou tâche située.
- `Produce Clarification` comme troisième confirmation : `Produce` demande `What kind of production is expected?` et peut router vers rappel, GapFill, Transformation, Inference, Reflect ou Apply.
- `Author Intent Routing` comme structure émergente du playground : certaines intentions sont Self-routing, d’autres Clarification-routing, d’autres Hybrid.
- Le schéma authoring actuel se formule prudemment comme `Author Intent -> Routing behavior -> Clarification when needed -> PedagogicalUse -> RepresentationPath / AuthorOrchestrationPath -> BHE carrier + UserInput + result policy -> Renderer / evaluator / completion helper / feedback -> Route Realization -> Corpus validation`.
- `Route Realization` comme niveau authoring désormais utile pour distinguer une route conceptuellement comprise d’une route réellement connectée au système.
- Le chemin `completed` non correctif est désormais viable : `UserInput -> createCompletedResultFromUserInput -> BHEResult.completed -> FeedbackData.completed`.
- Quatre routes authoring atteignent désormais une chaîne complète :
  - `Compare -> Categories -> ClassificationSet`.
  - `Compare -> Before / After Forms -> TransformationSet`.
  - `Produce -> Recalled Target -> MemorizationTypingRecall`.
  - `Reflect -> Strategies -> Reflect Through Selection -> completed`.
- Le statut de réalisation courant du playground est `exists completely: 4`, `partially exists: 0`, `missing pieces: 1`.

## Questions encore ouvertes

Les sujets suivants restent visiblement en exploration :

- Comment rendre l’expérience auteur réellement fluide sans masquer les distinctions structurantes du core.
- Jusqu’où formaliser les Pedagogical Uses sans créer une taxonomie trop rigide.
- Comment valider les `RepresentationPath` : simple documentation, tests de cohérence, ou futur assistant auteur.
- Comment valider les `AuthorOrchestrationPath` sans les transformer en nouvelle couche architecturale prématurée.
- Comment passer d’un usage pédagogique à une représentation BHE sans “recette” trop mécanique.
- Où placer les usages non évaluatifs : dans les types existants, via conventions, ou via nouveaux patterns.
- Comment exposer `completed` comme résultat légitime sans le confondre avec une réussite évaluative.
- Comment maintenir la sélection réflexive neutre après le renderer spécialisé : faut-il rester spécialisé, généraliser prudemment, ou clarifier davantage le contrat renderer/evaluator.
- Quelle interface d’édition permettrait de choisir entre interaction shape, intention, opération cognitive et résultat attendu.
- Comment représenter les intentions Hybrid sans forcer tous les intents à se comporter comme des chemins directs.
- Comment poursuivre la clarification auteur pour des intentions larges comme Compare, Reflect et Produce sans créer des `CompareThrough...`, `ReflectThrough...` ou `ProduceSet` stabilisés trop tôt.
- Comment traiter `Apply Through Situated Task` sans mentir sur la validation : la frontière actuelle est `situated response -> evidence of use -> BHEResult`.
- Quel modèle minimal d’évidence située permettrait de dire qu’une réponse située a réellement fonctionné : pair, enseignant, apprenant, système, action observée ou combinaison.
- Si la lentille de contrat pédagogique — correctif, réflexif, diagnostic, exploratoire, pratique, assessment — doit rester une aide d’analyse authoring ou devenir un jour une structure plus formelle.
- Quels concepts issus des explorations Moment / PedagogicalTransition / LearningSequence doivent rester descriptifs, et lesquels méritent un futur support structurel.
- Comment maintenir l’équilibre entre helpers communs et renderers pédagogiquement spécialisés.
- Comment articuler AdaptiveRouting et lancement de parcours sans créer trop tôt un runtime orchestrateur.

## État actuel du projet

En juin 2026, BHE semble avoir franchi une étape importante : le projet n’est plus seulement une collection de POCs d’interaction. Il possède maintenant une architecture relativement lisible autour d’un pipeline pédagogique complet. Les objets pédagogiques, les données d’interaction, les renderers, les entrées utilisateur, les évaluateurs, les résultats et le feedback ont des responsabilités de plus en plus distinctes.

Le core paraît relativement stabilisé sur ses grandes séparations, mais pas figé dans tous ses vocabulaires. Les audits récents montrent que certains noms restent trop liés à des cas historiques, notamment autour de la sélection, du typing et des interactions non évaluatives. La prudence dominante du projet est saine : ne pas généraliser trop tôt, ne pas créer de registry ou d’orchestrateur avant d’avoir observé suffisamment de répétitions.

Le corpus Boost’English joue un rôle décisif. Il révèle que les primitives BHE couvrent beaucoup de situations réelles, mais aussi que la lecture “développeur core” n’est pas suffisante pour un auteur. Les briques réelles ne demandent pas seulement “quel type d’exercice ?”, mais “que veut-on faire vivre ou comprendre à l’apprenant ?”.

La zone la plus active est désormais l’authoring. Le `PedagogicalUseCatalog` aide à identifier l’intention ou l’usage pédagogique, mais le passage vers les structures BHE reste encore partiellement implicite. L’exploration `Representation Recipes`, puis le prototype `RepresentationPath`, matérialisent ce pont sans modifier le core. Le `Author Discovery Playground` rend ce pont manipulable et commence à se stabiliser comme surface de routage auteur.

La structure émergente du playground peut maintenant se résumer ainsi :

```txt
Author Intent
↓
Routing behavior
↓
Clarification when needed
↓
PedagogicalUse
↓
RepresentationPath / AuthorOrchestrationPath
↓
BHE carrier + UserInput + result policy
↓
Renderer / evaluator / completion helper / feedback
↓
Route Realization
↓
Corpus validation
```

Les travaux du 22 et du 23 juin 2026 ont précisé cette direction. `Explore Before The Rule` semble être une orchestration auteur-visible plutôt qu’un nouveau concept core. `Compare`, `Reflect` et `Produce` sont désormais lus comme des intentions auteur non auto-routables qui demandent respectivement `What are learners comparing?`, `What are learners reflecting on?` et `What kind of production is expected?`. Le survey des intentions distingue trois familles visibles dans le playground : Self-routing, Clarification-routing et Hybrid.

La validation récente a aussi mesuré le lien réel avec le moteur. Le playground possède désormais un niveau `Route Realization` qui distingue `exists completely`, `partially exists` et `missing pieces`. À la fin du premier cycle authoring, l’état observé est :

```txt
exists completely: 4
partially exists: 0
missing pieces: 1
```

Les quatre routes complètes sont :

```txt
Compare -> Categories -> ClassificationSet
Compare -> Before / After Forms -> TransformationSet
Produce -> Recalled Target -> MemorizationTypingRecall
Reflect -> Strategies -> Reflect Through Selection -> completed
```

Ces routes ne prouvent pas seulement que le core peut représenter des activités. Elles montrent que l’auteur peut désormais suivre un chemin lisible depuis une intention, une clarification éventuelle, un PedagogicalUse, un RepresentationPath, une structure BHE, une entrée utilisateur, un renderer/evaluator ou helper de completion, puis un résultat et un feedback.

Le spike `completed`, puis le renderer de sélection réflexive, ont déplacé une ancienne incertitude : BHE peut produire un vrai `BHEResult.completed` et un `FeedbackData.completed` pour des réponses non correctives. Le point ouvert n’est donc plus “BHE peut-il produire completed ?”.

La frontière actuelle est plutôt :

```txt
situated response
↓
evidence of use
↓
BHEResult
```

Autrement dit, le problème principal restant concerne `Apply Through Situated Task`. BHE peut probablement porter une réponse située ou une tentative complétée, mais il ne faut pas faire semblant qu’une réponse située est réussie simplement parce qu’elle a été saisie. La question la plus importante devient : comment exprimer honnêtement l’évidence d’une réussite située ?

Les prochains grands chantiers visibles sont donc moins dans l’ajout de primitives core que dans la découvrabilité, l’expérience auteur, la clarification des intentions hybrides, la maintenance des routes réalisées et l’exploration prudente de l’évidence située. BHE semble entrer dans une phase où la question principale devient : comment permettre à un auteur de penser pédagogiquement tout en découvrant des structures BHE cohérentes, sans transformer l’authoring en surcouche opaque ou en nouvelle architecture prématurée. Le playground n’est plus seulement une démonstration : il est devenu une surface de routage entre langage auteur, structures BHE existantes et degré réel de réalisation.
