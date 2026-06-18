# RepresentationPath Implementation Report

## 1. Contexte

Le `PedagogicalUseCatalog` expérimental aide l'auteur à identifier ce qu'il cherche à faire pédagogiquement. Son application à *Thinking in English* a toutefois montré que le passage vers les structures BHE concrètes restait implicite.

L'exploration des Representation Recipes a ensuite identifié les décisions qui composent ce passage :

```txt
Pedagogical Use
↓
Interaction Shape
↓
UserInput
↓
Evaluation Policy
↓
BHEResult
```

Un premier artefact code a donc été créé dans `packages/authoring` pour rendre ce chemin visible.

Le nom retenu est `RepresentationPath`. Le mot *Path* indique qu'il s'agit d'un chemin plausible et documenté, et non d'une correspondance automatique ou d'une représentation générée.

`RepresentationPath` est strictement expérimental. Il appartient à la couche d'aide auteur située dans `packages/authoring`. Il ne stabilise aucune nouvelle architecture core et ne modifie aucun comportement d'exécution.

## 2. Fichiers créés

### `packages/authoring/src/RepresentationPath.ts`

Ce fichier définit la structure descriptive du prototype :

- les types BHE existants pouvant être référencés comme porteurs ;
- le degré d'adéquation sémantique ou structurelle ;
- les politiques d'évaluation ;
- la forme attendue du résultat ;
- l'interface `RepresentationPath`.

### `packages/authoring/src/RepresentationPaths.ts`

Ce fichier contient cinq premiers chemins expérimentaux :

1. `reflect-through-selection` ;
2. `diagnose-through-selection` ;
3. `recall-through-typing` ;
4. `reflect-through-typing` ;
5. `apply-through-situated-task`.

Ces chemins sont des données documentaires importables. Ils ne créent pas d'activité, ne construisent pas de `UserInput`, n'appellent aucun évaluateur et ne produisent aucun `BHEResult`.

## 3. Fichiers modifiés

### `packages/authoring/src/index.ts`

Les types du prototype et la collection `representationPaths` ont été ajoutés aux exports publics du package expérimental.

### `packages/authoring/README.md`

La documentation du package a été complétée avec :

- le rôle de `RepresentationPath` ;
- un exemple d'import ;
- les décisions rendues visibles par chaque chemin ;
- les limites expérimentales du prototype.

Aucun fichier de `packages/core`, du runtime, des renderers ou des evaluators n'a été modifié.

## 4. Structure retenue pour `RepresentationPath`

La structure retenue est :

```txt
RepresentationPath

pedagogicalUseId

interaction:
  suggestedShape
  interactionDataType éventuel
  fit: semantic | structural
  meaning

input:
  type
  fit: semantic | structural
  meaning

evaluation:
  kind:
    non-evaluative
    | existing-evaluator
    | context-dependent
  correctness
  evaluator éventuel

result:
  statuses
  score policy
  meaning

authorNotes
```

Cette structure rend explicites cinq décisions qui étaient auparavant dispersées :

1. la forme d'interaction suggérée ;
2. le porteur BHE concret le plus proche ;
3. le type et le sens de l'input attendu ;
4. l'existence ou non d'une évaluation ;
5. la sémantique attendue du `BHEResult`.

Le champ `fit` distingue un porteur qui correspond réellement au sens pédagogique d'un porteur seulement réutilisable pour sa structure.

Les références à `InteractionMode` et `BHEResultStatus` sont des imports de types. Le prototype ne dépend d'aucune logique d'exécution du core.

## 5. Exemple complet : `reflect-through-selection`

Le chemin complet représenté par le prototype est :

```txt
Pedagogical Use:
  reflect-through-selection

Interaction:
  suggestedShape: selection
  interactionDataType: IdentificationSelectionData
  fit: structural
  meaning:
    Selectable statements let the learner
    report a personal observation.

UserInput:
  type: IdentificationSelectionUserInput
  fit: structural
  meaning:
    selectedTargetIds records the statements
    selected by the learner.

Evaluation:
  kind: non-evaluative
  correctness: not-applicable

Expected BHEResult:
  statuses:
    - completed
  score: omitted
  meaning:
    The result records meaningful participation,
    not correctness.

Author notes:
  - Omit expected targets.
  - Do not call the Identification evaluator.
  - Use informational continuation rather than corrective feedback.
  - IdentificationSelectionUserInput is the nearest current carrier,
    not a perfect semantic name.
```

Le chemin rend donc visible la traduction suivante :

```txt
Reflect Through Selection
↓
Selection Interaction
↓
IdentificationSelectionUserInput
↓
Non-evaluative completion
↓
BHEResult.status: completed
```

Pour *Thinking in English*, cette représentation explique directement comment une réponse à « Do you translate in your head? » peut être enregistrée sans réponse attendue, sans score et sans correction.

## 6. Résultat des vérifications

### Build

La compilation TypeScript complète a réussi :

```txt
npm.cmd run build
> tsc
success
```

### Imports

Le module compilé de `packages/authoring` a été importé avec succès.

Le contrôle a confirmé :

- l'export de cinq `representationPaths` ;
- la présence de `reflect-through-selection` ;
- son résultat attendu `completed`.

### Documentation

Une génération TypeDoc isolée incluant le point d'entrée authoring et les types core référencés a réussi sans erreur.

### Périmètre

Les contrôles ont confirmé qu'aucun changement n'a été apporté :

- à `packages/core` ;
- au runtime ;
- aux Interaction Shapes ;
- aux renderers ;
- aux evaluators.

## 7. Limites connues

### Prototype descriptif uniquement

`RepresentationPath` n'exécute aucune traduction. Il ne sélectionne pas de renderer, ne crée pas de données d'interaction et ne lance pas d'évaluateur.

### Pas de correspondance unique

Un Pedagogical Use ne détermine pas toujours une seule représentation :

- une tâche située peut utiliser typing, selection, drag-drop ou reorder ;
- un diagnostic peut être évaluatif ou non évaluatif ;
- une même forme d'interaction peut servir plusieurs usages.

### Porteurs parfois seulement structurels

`IdentificationSelectionUserInput` peut enregistrer une sélection réflexive, mais son nom reste orienté vers l'identification. De même, `ContextualTypingUserInput` peut porter un texte réflexif, mais son vocabulaire de `blankId` n'est pas sémantiquement neutre.

### Critères contextuels non résolus

Pour `apply-through-situated-task`, le prototype ne peut pas déduire ce qui constitue une réussite fonctionnelle. Ce critère dépend de l'activité observée.

### Aucun statut architectural stabilisé

Le nom, la structure et les chemins restent réversibles. Le prototype ne constitue ni une nouvelle couche obligatoire ni une extension du modèle core.

## 8. Découverte principale

La traduction devient plus compréhensible lorsque quatre éléments sont réunis au même endroit :

```txt
response meaning
→ concrete carrier
→ evaluation policy
→ result semantics
```

Le choix de l'Interaction Shape ne suffit pas. L'information décisive est le sens de la réponse capturée : réponse correcte, auto-observation, point de départ diagnostique, réflexion ou action située.

Les informations systématiquement utiles sont donc :

- l'identifiant du Pedagogical Use ;
- la forme d'interaction et son porteur concret ;
- le degré d'adéquation du porteur ;
- le type et le sens du `UserInput` ;
- la politique d'évaluation ;
- la forme et le sens du `BHEResult` ;
- les précautions auteur.

À l'inverse, répéter dans cette couche les intentions pédagogiques, le contenu, le renderer ou toute la définition du catalogue ajouterait surtout du bruit.

Pour *Thinking in English*, le chemin devient nettement plus facile à expliquer : les décisions auparavant découvertes dans plusieurs types, évaluateurs et documents sont réunies dans un seul artefact auteur.

## 9. Prochaine étape recommandée

La prochaine étape recommandée est un test auteur ciblé sur *Thinking in English* :

```txt
PedagogicalUseCatalog
↓
RepresentationPath
↓
explication de la représentation BHE
```

Le test devrait observer si un auteur comprend plus rapidement :

- pourquoi la sélection est non évaluative ;
- pourquoi le porteur Identification n'est qu'un ajustement structurel ;
- pourquoi aucun évaluateur ne doit être appelé ;
- pourquoi le résultat est `completed` sans score.

Il ne paraît pas encore utile d'ajouter une génération automatique ou de faire de `RepresentationPath` une abstraction runtime. La priorité est de vérifier sa valeur de compréhension avant toute stabilisation supplémentaire.
