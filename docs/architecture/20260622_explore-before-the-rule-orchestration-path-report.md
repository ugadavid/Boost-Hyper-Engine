# Explore Before The Rule Orchestration Path Report

Date : 2026-06-22  
Branche observée : `experiment/bhe-be`

## 1. Contexte

L’enquête documentaire `20260622_explore-before-the-rule-investigation.md` a conclu :

```txt
Explore Before The Rule is not missing from BHE thinking.
It is missing as an author-visible orchestration path.
```

Cette mission matérialise ce pont sous forme expérimentale, isolée et rollbackable dans `packages/authoring`.

## 2. Ce qui a été représenté

Un premier `AuthorOrchestrationPath` expérimental a été créé pour :

```txt
Explore Before The Rule
```

Cas corpus unique :

```txt
Countable / Uncountable — I Learn
```

Le chemin représenté est :

```txt
Observe
↓
Compare
↓
Infer
↓
Stabilize
↓
Practice
```

Il ne s’agit pas d’un `RepresentationPath` unique. C’est une orchestration auteur composée de plusieurs étapes, chacune rapprochée autant que possible de concepts BHE existants.

## 3. Fichiers créés

- `packages/authoring/src/AuthorOrchestrationPath.ts`
- `packages/authoring/src/AuthorOrchestrationPaths.ts`
- `docs/architecture/20260622_explore-before-the-rule-orchestration-path-report.md`

## 4. Fichiers modifiés

- `packages/authoring/src/AuthorDiscoveryPlayground.ts`
- `packages/authoring/src/index.ts`
- `packages/authoring/author-discovery-playground.html`
- `packages/authoring/README.md`

## 5. Pourquoi cela reste dans authoring

Le phénomène observé n’est pas un nouvel objet core.

La documentation montre qu’il combine :

- des opérations cognitives existantes ;
- des usages pédagogiques déjà nommés ;
- des formes d’interaction déjà plausibles ;
- une progression entre étapes ;
- une stabilisation conceptuelle qui ressemble davantage à du guidage auteur qu’à un objet runtime.

Le bon geste est donc de rendre cette orchestration visible côté auteur sans l’imposer au core.

## 6. Pourquoi le core n’a pas été modifié

Le core possède déjà plusieurs briques utiles :

- `CognitiveOperation` pour `notice`, `compare`, `infer`, `classify`, `reflect` ;
- `IdentificationSelectionData` et `IdentificationSelectionUserInput` pour certains usages de sélection ;
- `InferenceSet` comme modèle conceptuel proche de la formulation d’hypothèse ;
- les familles évaluatives existantes pour la pratique finale ;
- `BHEResult.completed`, `success`, `partial`, `failed`.

Ce qui manquait était un assemblage authoring lisible, pas une nouvelle structure core.

## 7. Étapes bien reliées à BHE

### Observe

Statut : assez bien relié.

Mapping proposé :

```txt
Identification / Selection
IdentificationSelectionData
IdentificationSelectionUserInput
non-evaluative
BHEResult.completed
```

Cette étape s’appuie sur le `RepresentationPath` existant :

```txt
reflect-through-selection
```

### Infer

Statut : conceptuellement bien relié, techniquement encore partiel.

Mapping proposé :

```txt
InferenceSet
qualitative or non-final evaluation
BHEResult.completed or partial
```

`InferenceSet` couvre bien la production d’hypothèse depuis des indices, mais aucun chemin authoring détaillé n’est encore stabilisé pour cette étape.

### Practice

Statut : bien relié mais branchant.

Mapping proposé :

```txt
ClassificationSet / GapFillSet / TransformationSet
evaluative
BHEResult.success / partial / failed
```

La pratique après stabilisation est compatible avec plusieurs pipelines existants. Le choix dépend de ce que l’auteur demande réellement : classer, compléter ou transformer.

## 8. Étapes fragiles

### Compare

Statut : plausible.

La comparaison peut probablement passer par :

- Classification ;
- Selection ;
- QCM léger ;
- interaction non évaluative ou légèrement évaluée.

Mais le chemin authoring n’est pas encore documenté comme un `RepresentationPath`.

### Stabilize

Statut : fragile / authoring-only.

Cette étape consiste à rendre la règle explicite et stable :

```txt
Make the emerging rule explicit and conceptually stable.
```

BHE peut afficher du contenu, mais il n’existe pas encore d’objet core dédié à :

- explanation ;
- rule stabilization ;
- conceptual summary ;
- before/after rule transition.

La V0 garde donc cette étape explicitement authoring-only.

## 9. Statut après matérialisation

Avant cette mission :

```txt
Explore Before The Rule = MISSING BRIDGE
```

Après cette mission :

```txt
Explore Before The Rule = PLAUSIBLE
```

Il ne devient pas `READY`, car :

- ce n’est pas un `RepresentationPath` unique ;
- certaines étapes n’ont pas de mapping BHE complet ;
- `Stabilize` reste authoring-only ;
- `Practice` dépend d’un choix de structure ultérieur.

Le passage à `PLAUSIBLE` est justifié parce que le pont est désormais visible et manipulable, même s’il reste composite.

## 10. Intégration dans le playground

Le `Author Discovery Playground` affiche désormais, pour `Explore Before The Rule` :

```txt
Author Orchestration Path
↓
Observe / Compare / Infer / Stabilize / Practice
↓
BHE mapping for each step
```

Il affiche aussi :

- le corpus example `Countable / Uncountable — I Learn` ;
- les opérations cognitives probables ;
- les usages pédagogiques suggérés ;
- les éventuels `RepresentationPath` existants ;
- les politiques d’évaluation ;
- les sémantiques de résultat ;
- les limitations.

## 11. Rollback

Le changement est volontairement facile à retirer.

Rollback minimal :

1. Supprimer :

```txt
packages/authoring/src/AuthorOrchestrationPath.ts
packages/authoring/src/AuthorOrchestrationPaths.ts
```

2. Retirer de `packages/authoring/src/index.ts` les exports liés à `AuthorOrchestrationPath`.

3. Retirer de `packages/authoring/src/AuthorDiscoveryPlayground.ts` :

- l’import des orchestration paths ;
- `orchestrationPath` dans `AuthorDiscoveryUseView` ;
- le mapping `orchestrationPathByUseId` ;
- le rendu `renderOrchestrationPath` ;
- l’exemple `countable-uncountable-explore-before-rule` ;
- le passage de `Explore Before The Rule` à `PLAUSIBLE`.

4. Retirer les styles `.adp-orchestration` et `.adp-step-mapping` de la page HTML.

5. Retirer la note V0.2 du README.

Le core n’est pas concerné par le rollback.

## 12. Vérifications

Build :

```txt
npm.cmd run build
```

Résultat :

```txt
succès
```

Import authoring :

```txt
import('./dist/packages/authoring/src/index.js')
```

Résultat :

```txt
succès
```

Valeurs observées :

```txt
authorOrchestrationPaths.length = 1
authorOrchestrationPaths[0].steps.length = 5
getAuthorCoverageStats() = READY 3 / PLAUSIBLE 4 / MISSING BRIDGE 0
getRepresentationConfidenceForUse('explore-before-rule') = PLAUSIBLE
```

## 13. Conclusion

La matérialisation confirme l’hypothèse documentaire :

```txt
Explore Before The Rule is not a new core object.
It is an authoring orchestration path.
```

Le pont manquant est maintenant visible :

```txt
author need
↓
composed authoring path
↓
step-by-step BHE mapping
```

La représentation reste imparfaite, mais cette imperfection est utile : elle montre exactement où BHE est déjà capable, où l’authoring peut guider, et où les futures décisions doivent rester prudentes.
