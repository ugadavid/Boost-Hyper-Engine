# Compare Investigation

## 1. Objet de l'enquête

Cette enquête appartient à la branche expérimentale `experiment/bhe-be`.

Elle cherche à comprendre si le phénomène auteur :

```txt
Compare
```

doit être lu comme :

- un `PedagogicalUse` unique ;
- une famille de `PedagogicalUses` spécialisés ;
- une intention auteur capable d'emprunter plusieurs `RepresentationPaths` existants ;
- ou une lacune réelle du modèle BHE.

Le document ne crée aucun nouveau concept, aucun nouveau `RepresentationPath` et aucune implémentation. Il observe seulement les documents existants.

## 2. Documents pertinents

### Boost'English Corpus Cartography

Localisation : `docs/architecture/20260605_boost-english-corpus-cartography.md`

Résumé pertinent :

La cartographie du corpus montre plusieurs briques où la comparaison est centrale, mais pas toujours sous la même forme :

- `Comparatives and Superlatives` : comparer des personnes, lieux ou objets, puis distinguer comparatif et superlatif ;
- `Countable & Uncountable Nouns` : observer des exemples concrets, tester une idée, conceptualiser une distinction ;
- `Present simple and Present continuous` : distinguer habitudes/faits et actions en cours ;
- `Present perfect simple and continuous` : distinguer résultat, accomplissement, durée et continuité ;
- `Adjectives + -ed vs -ing endings` : distinguer sentiment vécu et cause du sentiment ;
- `Negative Adjectives and Prefixes` : contraster les opposés avec préfixe et les opposés non préfixés ;
- `Thinking in English` : questionnaire réflexif qui aide l'apprenant à situer ses habitudes ;
- `Memorising Vocabulary` : réflexion sur les stratégies d'apprentissage.

Rôle joué par la comparaison :

La comparaison n'est pas seulement une activité grammaticale. Elle sert à distinguer des formes, des catégories, des états personnels, des stratégies, des exemples, ou des usages situés.

### Countable / Uncountable Nouns — I Learn — Moment POC

Localisation : `docs/architecture/20260604_countable-uncountable_i-learn_moment-poc.md`

Résumé pertinent :

Le document décrit la séquence non comme :

```txt
rule
↓
exercise
```

mais comme :

```txt
observe
↓
compare
↓
reason
↓
infer
↓
conceptualize
```

Il explicite aussi la combinaison :

```txt
notice + compare + infer + classify
```

Rôle joué par la comparaison :

La comparaison est une opération intermédiaire dans une orchestration de découverte guidée. Elle ne suffit pas à définir l'activité entière : elle prépare l'inférence et la classification.

### Explore Before The Rule Investigation

Localisation : `docs/architecture/20260622_explore-before-the-rule-investigation.md`

Résumé pertinent :

L'enquête précédente a identifié un motif récurrent :

```txt
observe -> compare -> infer -> stabilize
```

Elle conclut que `Explore Before The Rule` ressemble davantage à une orchestration auteur-visible qu'à un nouveau concept core.

Rôle joué par la comparaison :

`compare` apparaît comme un pont entre exposition aux exemples et formulation d'hypothèse. Le rôle est important, mais dépend fortement de la séquence qui l'entoure.

### Explore Before The Rule Orchestration Path Report

Localisation : `docs/architecture/20260622_explore-before-the-rule-orchestration-path-report.md`

Résumé pertinent :

Le rapport matérialise `Explore Before The Rule` comme un chemin d'orchestration expérimental situé dans `packages/authoring`, sans stabiliser un nouveau concept core. Il mentionne `notice`, `compare`, `infer`, `classify` et `reflect` comme opérations mobilisées.

Rôle joué par la comparaison :

La comparaison y est une étape d'une orchestration, pas un `RepresentationPath` isolé.

### Pedagogical Layers Stress Test

Localisation : `docs/architecture/20260618_pedagogical-layers-stress-test.md`

Résumé pertinent :

Le stress-test distingue plusieurs questions :

- pourquoi l'auteur crée l'activité ;
- ce que l'apprenant fait mentalement ;
- quel type de réponse est demandé ;
- comment l'activité est située socialement ou affectivement ;
- ce qui compte comme preuve ou résultat.

Dans le tableau d'exemples :

- `Thinking in English - I start` mobilise `notice`, `reflect`, `compare`, `self-adjust` ;
- `Memorising Vocabulary questionnaire` mobilise `notice`, `reflect`, `compare` ;
- `Memorising Vocabulary strategy work` mobilise `recall`, `compare`, `self-adjust`, `transfer` ;
- `Countable / Uncountable - I learn` mobilise `notice`, `compare`, `infer`, `classify` ;
- `Passive Voice learner-facing core` mobilise `identify`, `compare`, `transform`, `produce`.

Rôle joué par la comparaison :

Le document montre que `compare` est robuste comme opération cognitive, mais qu'elle ne suffit pas à déterminer l'intention, l'interaction, l'évaluation ou le résultat.

### Cognitive Operations Vocabulary

Localisation : `docs/architecture/cognitive-operations-vocabulary.md`

Résumé pertinent :

Le document définit `CognitiveOperation` comme un vocabulaire léger pour décrire ce que l'apprenant fait mentalement. Il inclut explicitement :

```txt
compare
```

Il précise aussi qu'un même objet peut combiner plusieurs opérations, par exemple :

```txt
TransformationSet
-> notice + compare + transform + produce
```

Rôle joué par la comparaison :

`compare` existe déjà comme opération cognitive descriptive. Ce n'est donc pas, à première vue, un manque du core.

### BHE-BE Lab

Localisation : `docs/architecture/20260604_bhe-be-lab.md`

Résumé pertinent :

Le laboratoire BHE-BE pose l'hypothèse que les briques Boost'English mobilisent des opérations cognitives composables, dont `notice` et `compare`. Cette hypothèse est ensuite partiellement stabilisée par le vocabulaire `CognitiveOperation`.

Rôle joué par la comparaison :

`compare` est déjà reconnu comme signal transversal dans le corpus, mais au niveau cognitif plutôt qu'au niveau interactionnel.

### Core Vocabulary Audit

Localisation : `docs/architecture/20260617_core-vocabulary-audit.md`

Résumé pertinent :

L'audit rappelle que `CognitiveOperation` décrit la cognition apprenant et inclut des valeurs comme `reflect`, `notice`, `compare`, `produce`, `selfAdjust`.

Rôle joué par la comparaison :

Le core possède déjà un emplacement léger pour nommer la comparaison. Ce qui manque n'est pas le mot, mais la traduction auteur vers des structures représentables.

### BHE Author Discoverability Catalog

Localisation : `docs/architecture/20260618_author-discoverability-catalog.md`

Résumé pertinent :

Le catalogue affirme :

```txt
interaction shape
!=
pedagogical function
```

Il montre que plusieurs formes d'interaction peuvent porter un travail comparatif :

- sélection : self-positioning, préférence, stratégie à explorer ;
- QCM : prédiction avant explication, diagnostic, positionnement ;
- typing : comparer avant/après compréhension, expliquer, justifier ;
- drag and drop : comparer des hypothèses, placer des exemples sous des règles émergentes ;
- reorder : comparer des modèles de processus ;
- flashcards : comparer une réponse initiale avec un modèle.

Rôle joué par la comparaison :

Le catalogue montre déjà que `Compare` traverse plusieurs formes visibles. Il ne se laisse pas réduire à un seul geste.

### Author Entry Point Stress Test

Localisation : `docs/architecture/20260618_author-entry-point-stress-test.md`

Résumé pertinent :

Le document reconstruit les points de départ probables d'auteurs. Pour `Countable / Uncountable - I learn`, le point de départ plausible est un problème de contenu plus un chemin cognitif guidé :

```txt
Compare, infer, classify, visual examples
```

Pour `Thinking in English`, les opérations viennent après un problème apprenant : réduire la traduction interne et préparer la parole.

Rôle joué par la comparaison :

`Compare` peut être une opération choisie au service d'une intention plus large, mais rarement le point de départ complet.

### Representation Recipes Exploration

Localisation : `docs/architecture/20260618_representation-recipes-exploration.md`

Résumé pertinent :

L'exploration montre que des gestes visibles similaires, notamment sélection et typing, peuvent produire des chemins très différents selon l'usage pédagogique, l'évaluation et le résultat attendu.

Elle note par exemple que le rappel nécessite une comparaison avec des réponses attendues et du feedback correctif, tandis que la réflexion demande plutôt une continuation ou un accusé de réception.

Rôle joué par la comparaison :

La comparaison peut être :

- l'opération mentale de l'apprenant ;
- le mécanisme d'évaluation ;
- une étape de feedback ;
- ou une décision auteur sur ce qui doit être distingué.

Ces niveaux doivent rester séparés.

### Interaction Patterns Emergence — Week 3

Localisation : `docs/architecture/20260518_interaction_patterns_emergence_week3.md`

Résumé pertinent :

Le document distingue `AssociationSet`, `ClassificationSet` et `SequenceSet` malgré des gestes parfois proches :

- association : regrouper ce qui va ensemble ;
- classification : assigner à une catégorie ;
- sequence : ordonner.

Rôle joué par la comparaison :

Ce document est important parce qu'il évite une erreur possible : croire que toute comparaison doit devenir une même interaction. Les objets existants représentent déjà plusieurs manières de distinguer ou mettre en relation.

### BHE Object Emergence Patterns Comparison

Localisation : `docs/architecture/20260521_object_emergence_patterns_comparison.md`

Résumé pertinent :

Le document compare les objets BHE émergents et leurs identités pédagogiques :

- `AssociationSet` : relate / group ;
- `ClassificationSet` : categorize ;
- `SequenceSet` : order ;
- `IdentificationSet` : identify / detect ;
- `InferenceSet` : interpret / infer ;
- `TransformationSet` : transform existing content.

Rôle joué par la comparaison :

Le document montre que plusieurs objets BHE peuvent servir une intention comparative, mais chacun selon une structure différente.

### Identification V0 Emergence

Localisation : `docs/architecture/20260521_identification_v0_emergence.md`

Résumé pertinent :

`IdentificationSet` demande à l'apprenant de détecter des éléments pertinents dans un contexte. Le document le distingue de l'association, de la classification, de la séquence et de l'inférence.

Rôle joué par la comparaison :

Un auteur peut demander à l'apprenant de comparer des exemples pour sélectionner ceux qui partagent une propriété. Mais le chemin BHE porte alors surtout l'identification de cibles pertinentes.

### InferenceSet Interaction Exploration

Localisation : `docs/reports/inference-set-interaction-exploration.md`

Résumé pertinent :

L'inférence est définie comme production d'une hypothèse à partir d'indices. Elle n'est ni classification, ni association, ni séquence. Elle implique indices, preuves, hypothèses, incertitude, justification, interprétation et confiance.

Rôle joué par la comparaison :

Comparer des indices ou des hypothèses peut soutenir une inférence. Mais le résultat attendu n'est pas la comparaison elle-même : c'est une conclusion, une hypothèse ou une justification.

### SequenceSet Interaction Exploration

Localisation : `docs/reports/sequence-set-interaction-exploration.md`

Résumé pertinent :

`SequenceSet` demande :

```txt
What comes before and after?
```

Il introduit ordre temporel, progression logique, adjacence, proximité et dépendance entre éléments voisins.

Rôle joué par la comparaison :

Quand l'auteur veut faire comparer des positions, des étapes, des modèles de processus ou des ordres possibles, `SequenceSet` peut porter cette comparaison.

### TransformationSet Interaction Exploration

Localisation : `docs/reports/transformation-set-interaction-exploration.md`

Résumé pertinent :

`TransformationSet` part d'une source explicite, applique une opération, et produit une cible :

```txt
source -> operation -> target
```

Le document mentionne aussi le cas `Before/After Pairing`, utile pour reconnaître des relations de transformation.

Rôle joué par la comparaison :

Comparer une forme avant/après, actif/passif, présent/passé, registre familier/soutenu, ou source/cible relève souvent de la transformation plutôt que d'un usage générique `Compare`.

### Typing Gesture Cognitive Operations Comparison

Localisation : `docs/reports/typing-gesture-cognitive-operations-comparison.md`

Résumé pertinent :

Le rapport compare plusieurs pipelines de typing :

- `GapFillTyping` ;
- `TransformationTyping` ;
- `MemorizationTypingRecall`.

Il rappelle :

```txt
typing gesture
!=
typing cognition
```

Rôle joué par la comparaison :

Ce document fournit une analogie directe : comme `Typing`, `Compare` peut être visible à la surface mais cacher des opérations et résultats différents.

### Memorising Vocabulary POC

Localisation : `docs/architecture/20260606_memorising-vocabulary_poc.md`

Résumé pertinent :

Le document décrit un parcours où l'apprenant découvre une stratégie, l'essaie, puis la compare avec d'autres stratégies. Il précise que l'apprenant est invité à comparer des méthodes, les tester et décider lesquelles lui conviennent.

Rôle joué par la comparaison :

Ici, la comparaison est métacognitive et stratégique. Elle ne porte pas sur une bonne réponse unique, mais sur l'adéquation entre stratégie et apprenant.

### Thinking in English — I Start — Moment POC

Localisation : `docs/architecture/20260604_thinking-in-english_i-start_moment-poc.md`

Résumé pertinent :

Le POC montre un questionnaire qui ressemble à un quiz mais fonctionne comme activité réflexive et non évaluative.

Rôle joué par la comparaison :

L'apprenant compare implicitement ses habitudes, sa confiance et ses manières de penser/parler. Le chemin le plus proche est réflexif, pas évaluatif.

### Passive Voice POC

Localisation : `docs/architecture/20260606_passive-voice_poc.md`

Résumé pertinent :

Le passive voice combine reconnaissance de forme, transformation actif/passif, changement de focus, puis extensions de lecture critique autour de l'agence et de la responsabilité.

Rôle joué par la comparaison :

La comparaison peut porter sur :

- forme active vs passive ;
- focus avant/après transformation ;
- interprétations possibles d'un texte ;
- effets discursifs.

Ces cas ne demandent pas tous le même porteur BHE.

### Adjectives Cognitive Mapping

Localisation : `docs/reports/20260601_boost_english_brick_poc_adjectives_cognitive_mapping.md`

Résumé pertinent :

Le rapport sur les adjectifs `-ed / -ing` identifie un travail de contraste : distinguer un sentiment vécu d'une cause du sentiment. Il mentionne `observe`, `compare`, `hypothesize`, ainsi qu'un moment de comparaison avec un modèle.

Rôle joué par la comparaison :

La comparaison peut être une détection de contraste sémantique, une classification implicite, ou une auto-comparaison avec un modèle.

## 3. Types de comparaison observés

### Comparer des exemples

L'apprenant observe plusieurs cas et cherche ce qui change ou se répète.

Exemples :

- countable / uncountable ;
- adjectifs `-ed / -ing` ;
- préfixes négatifs ;
- temps verbaux en contexte.

La comparaison prépare souvent une distinction ou une règle.

### Comparer des catégories

L'apprenant décide à quelle catégorie appartient un item, ou teste une frontière entre catégories.

Exemples :

- countable vs uncountable ;
- comparative vs superlative ;
- feeling vs cause ;
- active vs passive.

La comparaison est alors proche de `ClassificationSet`, parfois de `IdentificationSet`.

### Comparer des relations

L'apprenant relie des éléments qui vont ensemble ou contrastent.

Exemples :

- adjectif positif / adjectif opposé ;
- mot / préfixe négatif ;
- image / expression ;
- source / reformulation.

La comparaison peut être portée par `AssociationSet` si la relation est le centre de l'activité.

### Comparer des formes avant/après

L'apprenant observe ou produit un changement entre une source et une cible.

Exemples :

- actif -> passif ;
- présent -> passé ;
- forme simple -> forme transformée ;
- registre source -> registre cible.

La comparaison relève souvent de `TransformationSet`.

### Comparer des positions ou des ordres

L'apprenant compare des éléments selon leur place, leur voisinage, leur progression ou leur priorité.

Exemples :

- ordre d'étapes ;
- dialogue à reconstruire ;
- modèle de processus ;
- chronologie.

La comparaison relève alors de `SequenceSet`.

### Comparer des hypothèses

L'apprenant met en balance plusieurs interprétations possibles.

Exemples :

- hypothèse grammaticale avant règle ;
- intention d'un locuteur ;
- interprétation d'un texte ;
- choix justifié.

La comparaison est ici au service de `InferenceSet` ou d'une réponse réflexive.

### Comparer des stratégies

L'apprenant compare plusieurs manières d'apprendre ou d'agir.

Exemples :

- stratégies de mémorisation ;
- habitudes de traduction mentale ;
- manières de préparer la parole ;
- méthodes personnelles efficaces ou non.

Le chemin semble plutôt réflexif et non évaluatif.

### Comparer avant/après compréhension

L'apprenant compare une première réponse, une intuition ou un état initial avec un modèle, une explication ou un état ultérieur.

Exemples :

- flashcard : prédire avant révélation ;
- questionnaire : se situer avant apprentissage ;
- feedback : comparer tentative et modèle.

Cette comparaison peut être portée par plusieurs interactions selon ce qui est enregistré comme input.

### Comparer comme mécanisme d'évaluation

Le système compare une réponse attendue avec une réponse utilisateur.

Exemples :

- exact match ;
- placement attendu ;
- catégorie attendue ;
- ordre attendu.

Ce cas est important mais différent : ce n'est pas forcément ce que l'apprenant fait mentalement. C'est une politique d'évaluation.

## 4. Mapping BHE possible

Ces mappings sont des lectures documentaires, pas de nouveaux `RepresentationPaths`.

| Famille observée | Chemin BHE plausible | Statut apparent |
| ---------------- | -------------------- | --------------- |
| Comparer des exemples pour remarquer une distinction | `IdentificationSet`, `ClassificationSet`, ou orchestration `Explore Before The Rule` | Représentable partiellement ; manque surtout authoring |
| Comparer des catégories | `ClassificationSet` -> classification QCM ou drag/drop | Déjà représentable quand les catégories sont stables |
| Comparer des relations | `AssociationSet` -> flashcards ou drag/drop association | Déjà représentable quand la relation est explicite |
| Comparer des formes avant/après | `TransformationSet` -> typing, recognition, before/after pairing | Représentable, mais certains chemins restent moins documentés |
| Comparer des positions ou des ordres | `SequenceSet` -> reorder | Déjà représentable pour l'ordre et l'adjacence |
| Comparer des hypothèses | `InferenceSet` -> justified choice ou réponse interprétative | Conceptuellement couvert ; authoring encore peu visible |
| Comparer des stratégies ou habitudes | `Reflect Through Selection` ou `Reflect Through Typing` | Déjà plausible via `RepresentationPath` réflexif |
| Comparer une tentative avec un modèle | Flashcards, feedback, memorization recall, typing recall | Partiellement couvert ; semantics de self-check à documenter |
| Comparer pour diagnostiquer | `Diagnose Through Selection` ou collecte non corrective | Plausible ; dépend de l'usage des résultats |
| Comparer comme scoring | Evaluators + `BHEResult` | Déjà présent, mais ne doit pas être confondu avec l'intention auteur |

## 5. Ce qui existe déjà

### Le mot existe déjà au bon niveau cognitif

`compare` est déjà présent dans `CognitiveOperation`. Il décrit une activité mentale de l'apprenant.

Cela suggère qu'il n'est pas nécessaire de créer un nouveau concept core uniquement pour nommer la comparaison.

### Plusieurs objets BHE portent déjà des comparaisons spécialisées

Les objets existants couvrent plusieurs formes de comparaison :

- `ClassificationSet` : comparer pour catégoriser ;
- `AssociationSet` : comparer pour relier ;
- `SequenceSet` : comparer pour ordonner ;
- `TransformationSet` : comparer source et cible ;
- `InferenceSet` : comparer indices et hypothèses ;
- `IdentificationSet` : comparer des éléments pour sélectionner les cibles pertinentes ;
- `MemorizationSet` ou flashcards : comparer tentative, cue, target ou modèle ;
- chemins réflexifs authoring : comparer ses habitudes, stratégies ou états.

### Le corpus valide la transversalité

Boost'English montre `compare` dans :

- les contrastes grammaticaux ;
- les classements ;
- les stratégies ;
- les questionnaires réflexifs ;
- les transformations ;
- les tâches situées ;
- les activités de découverte guidée.

Cela rend improbable l'idée d'un seul `PedagogicalUse` universel nommé `Compare`.

### La documentation authoring a déjà préparé le terrain

Le `Author Discoverability Catalog`, les `Representation Recipes`, `RepresentationPath`, puis `AuthorOrchestrationPath` montrent déjà que l'enjeu n'est pas seulement :

```txt
BHE peut-il représenter cela ?
```

mais :

```txt
Comment l'auteur découvre-t-il
quel chemin de représentation utiliser ?
```

`Compare` confirme exactement cette tension.

## 6. Ce qui manque

### Manque authoring

L'auteur peut dire :

```txt
I want learners to compare.
```

Mais BHE doit ensuite demander :

```txt
Compare what?
For what purpose?
With what kind of answer?
With what evidence policy?
```

Ce guidage n'est pas encore explicite.

### Manque documentaire

Plusieurs chemins comparatifs sont visibles dans les documents, mais ils ne sont pas regroupés comme carte auteur.

Il manque une documentation simple du type :

```txt
If the author says "compare",
look at what is being compared.
```

Puis :

```txt
examples -> classification / identification / inference
forms before-after -> transformation
relations -> association
order -> sequence
strategies or self-state -> reflection
hypotheses -> inference
```

### Manque de RepresentationPath

Certains chemins sont déjà clairs :

- comparer par classification ;
- comparer par transformation ;
- comparer par réordonnancement ;
- comparer par réflexion non évaluative.

D'autres restent implicites :

- comparer des hypothèses ;
- comparer une tentative avec un modèle sans scoring lourd ;
- comparer des stratégies ;
- comparer des exemples avant stabilisation de règle.

Le besoin semble donc être une meilleure couverture authoring, pas une nouvelle structure core immédiate.

### Manque de distinction entre cognition et évaluation

Le mot `compare` peut désigner :

- ce que l'apprenant fait mentalement ;
- ce que l'auteur veut provoquer ;
- ce que le système fait pour évaluer ;
- ce que le feedback aide à constater ;
- ce qu'une séquence orchestre.

Sans séparation, `Compare` risque de devenir un terme trop large.

### Pas de lacune réelle évidente du modèle

L'enquête ne révèle pas, à ce stade, un phénomène comparatif impossible à porter par BHE.

Elle révèle plutôt un problème de lisibilité :

```txt
Compare is representable,
but not self-routing.
```

## 7. Conclusion

Parmi les hypothèses proposées, la plus crédible est :

```txt
C. Compare est une intention auteur
   pouvant emprunter plusieurs
   RepresentationPaths existants
```

La documentation ne soutient pas l'hypothèse A.

`Compare` n'apparaît pas comme un `PedagogicalUse` unique. Les cas observés sont trop différents : comparer des catégories, des formes avant/après, des hypothèses, des stratégies, des positions, des relations ou des états personnels ne produit pas le même `UserInput`, la même évaluation ni le même `BHEResult`.

La documentation soutient partiellement l'hypothèse B, mais seulement comme conséquence authoring possible.

Il pourrait être utile, plus tard, de rendre visibles des chemins du type :

```txt
Compare Through Classification
Compare Through Transformation
Compare Through Inference
Compare Through Reflection
Compare Through Sequencing
Compare Through Association
```

Mais ces noms ne doivent pas être traités maintenant comme des concepts stabilisés. Ils seraient des aides de découverte, pas des objets core.

L'hypothèse D ne paraît pas confirmée.

BHE possède déjà :

- `CognitiveOperation.compare` ;
- plusieurs objets capables de porter des comparaisons spécialisées ;
- des `UserInput` sémantiques ;
- des politiques d'évaluation variées ;
- des chemins authoring expérimentaux.

Le trou principal est donc :

```txt
authoring / documentation / RepresentationPath coverage
```

et non :

```txt
core model gap
```

## 8. Formulation synthétique

`Compare` ressemble à une intention auteur transversale.

Elle demande une question de clarification plutôt qu'un nouveau modèle :

```txt
What are learners comparing?
```

Si l'apprenant compare des catégories, BHE regarde vers `ClassificationSet`.

S'il compare des relations, BHE regarde vers `AssociationSet`.

S'il compare un avant/après, BHE regarde vers `TransformationSet`.

S'il compare des positions, BHE regarde vers `SequenceSet`.

S'il compare des indices ou hypothèses, BHE regarde vers `InferenceSet`.

S'il compare ses propres habitudes, stratégies ou états, BHE regarde vers les chemins réflexifs authoring.

La prochaine étape saine serait donc documentaire ou authoring :

```txt
créer une carte de clarification auteur pour Compare
```

plutôt que créer immédiatement un `CompareSet`, un `CompareThrough...` stabilisé, ou un nouveau concept core.
