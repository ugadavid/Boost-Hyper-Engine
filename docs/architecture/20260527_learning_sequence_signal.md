## 1. Pourquoi ce signal est apparu

Contexte :

- stabilisation des Sets V0 ;
- intuition persistante après la pause de 4 jours ;
- malaise autour de :

```txt
exercise != unité finale
```

Question émergente :

comment représenter des moments pédagogiques plus larges sans casser le core cognitif ?

## 2. Tension observée

Problème :

```txt
cours ≠ suite d’exercices
```

mais aussi :

```txt
cours ≠ slideshow + quiz
```

Signal :

certains moments pédagogiques :

- contextualisent ;
- orientent l’attention ;
- déclenchent une activité cognitive ;
- articulent plusieurs opérations ;
- peuvent parfois vivre seuls.

## 3. Première hypothèse insuffisante

“Tout mettre dans un nouveau Set”

Pourquoi c’est risqué :

- explosion taxonomique ;
- perte de lisibilité cognitive ;
- confusion entre opération mentale et orchestration.

## 4. Hypothèse émergente — deux niveaux

### Niveau 1 — cognition apprenant

Sets comme primitives cognitives :

- AssociationSet
- ClassificationSet
- SequenceSet
- IdentificationSet
- InferenceSet
- TransformationSet
- MemorizationSet (signal émergent)

Question centrale :

que doit faire mentalement l’apprenant ?

### Niveau 2 — orchestration cognitive-pédagogique

Signal possible :

```txt
LearningSequence
```

Rôle :

- préparer
- orienter
- contextualiser
- relier
- rythmer
- déclencher
- réfléchir

Question centrale :

que fait le dispositif pour provoquer la cognition ?

##  5. Exemple concret (celui qu’on adore 😄)

```txt
LearningSequence
│
├── GuidedMoment
│    └── "Observe les cognats"
│
├── MemorizationSet
│
├── GuidedMoment
│    └── "Essaie maintenant sans regarder"
│
├── IdentificationSet
│
└── ReflectionMoment
```

## 6. Récursivité contrôlée

Signal fort reconnecté au manifeste :

```txt
tout peut contenir tout
```

mais :

pas à tous les niveaux

Exemple :

```txt
LearningSequence
│
├── LearningSequence
├── LearningSequence
└── LearningSequence
```

Récursivité envisagée :

- séquence
- sous-séquence
- module
- parcours

Sans transformer les Sets eux-mêmes en objets récursifs.

## 7. Média-agnostique à préserver absolument

Invariant à protéger :

```txt
ContentUnit
```

reste universel.

Tout moment pédagogique ou Set doit pouvoir contenir :

- texte
- image
- audio
- vidéo
- multimodalité future

Principe :

    la cognition ne dépend pas du média
    mais le média peut servir la cognition.

## 8. StupidMemorizationSet 😂

Signal important malgré le nom absurde.

Intuition :

certaines tâches peu médiées pédagogiquement restent cognitives.

Exemple :

apprendre une liste par cœur.

Tension observée :

```txt
cognition réelle
≠
orchestration pédagogique forte
```

Nom de travail sérieux proposé :

```txt
MemorizationSet
```

(mais le surnom secret doit survivre dans l’histoire du projet XD)

## 9. Questions ouvertes

- GuidedMoment : objet autonome ou node léger ?
- quelle granularité ?
- différence entre contenu et guidage ?
- comment articuler autonomie et rôle de liant ?
- faut-il un LearningContentObject séparé ?
- où placer exactement la récursivité ?

## 10. Décision volontairement NON prise

Ne pas :

- refactorer ;
- créer nouvelle abstraction ;
- modifier le core ;
- coder.

Objectif :

laisser mariner et observer.