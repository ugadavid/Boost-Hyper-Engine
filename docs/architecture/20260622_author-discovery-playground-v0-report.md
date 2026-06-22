# Author Discovery Playground V0 Report

## 1. Contexte

Le travail récent sur `packages/authoring` a introduit deux aides expérimentales :

- `PedagogicalUseCatalog`, pour aider un auteur à identifier ce qu’il veut faire faire aux apprenants ;
- `RepresentationPath`, pour rendre visible un chemin plausible entre un usage pédagogique et le vocabulaire de représentation BHE existant.

La question n’est donc plus seulement :

```txt
Can BHE represent this?
```

mais :

```txt
How can an author discover that BHE can represent this?
```

Le `Author Discovery Playground V0` matérialise cette question sous forme manipulable.

## 2. Ce qui a été créé

Un prototype local minimal a été ajouté dans `packages/authoring` :

- `packages/authoring/src/AuthorDiscoveryPlayground.ts`
- `packages/authoring/author-discovery-playground.html`

Le fichier TypeScript contient :

- une liste d’intentions auteur ;
- un lien entre intentions et Pedagogical Uses ;
- quelques exemples réels issus du corpus Boost’English ;
- une fonction de rendu DOM `renderAuthorDiscoveryPlayground`.

La page HTML locale monte cette fonction de rendu après build.

Le package authoring exporte aussi les éléments nécessaires depuis :

- `packages/authoring/src/index.ts`

Le README authoring a été mis à jour pour signaler l’existence du playground et préciser ses limites.

## 3. Ce que le prototype cherche à tester

Le prototype teste une hypothèse simple :

```txt
An author should be able to start from what they want learners to do,
then progressively discover how BHE represents it.
```

Le parcours affiché est volontairement linéaire :

```txt
Intent
↓
Pedagogical Use
↓
RepresentationPath
↓
BHE Representation
↓
Real Example
```

L’objectif n’est pas de générer une activité BHE, mais de rendre perceptible la traduction entre une formulation auteur et les concepts existants :

- interaction shape ;
- InteractionData ;
- UserInput ;
- evaluation policy ;
- BHEResult ;
- exemple corpus.

## 4. Pourquoi ce n’est pas encore un éditeur

Le prototype ne sauvegarde rien, ne crée pas d’activité et ne produit pas de `PedagogicalObject`.

Il n’y a pas :

- de formulaire d’édition ;
- de persistance ;
- de choix de renderer ;
- d’appel d’évaluateur ;
- de création de runtime pathway ;
- de validation complète d’une activité.

Ce choix est intentionnel. La V0 sert à observer la découvrabilité avant de concevoir un éditeur. Un éditeur prématuré risquerait de figer trop vite des concepts encore expérimentaux.

## 5. Pourquoi le core n’a pas été modifié

Le besoin testé appartient à l’expérience auteur, pas au modèle core.

Le core sait déjà représenter plusieurs chemins observés :

- sélection non évaluative ;
- rappel par saisie ;
- saisie réflexive ;
- tâche située avec évaluation contextuelle.

La difficulté actuelle est que ces possibilités ne sont pas évidentes depuis le point de vue auteur.

Le prototype reste donc dans `packages/authoring`. Il utilise les données existantes du catalogue et des `RepresentationPath`, mais ne modifie pas :

- `packages/core` ;
- le runtime ;
- les renderers ;
- les evaluators.

## 6. Limites assumées

La V0 est volontairement incomplète.

Limites connues :

- certaines intentions, comme classify ou compare, pointent vers des usages proches mais pas toujours vers un `RepresentationPath` complet ;
- les exemples réels sont peu nombreux ;
- le playground ne reconstruit pas un `PedagogicalObject` complet ;
- la notion de BHE Representation reste affichée comme chemin documentaire, pas comme objet instancié ;
- la page HTML dépend du build TypeScript local ;
- aucune ergonomie fine n’a été travaillée ;
- aucun état n’est persisté ;
- aucun choix auteur n’est exportable.

Ces limites sont acceptées parce que le but est de rendre les ponts visibles, y compris les ponts manquants.

## 7. Exemple principal validé

Le cas le plus clair reste :

```txt
Thinking in English
```

Lecture proposée :

```txt
Intent: help learners reflect
Pedagogical Use: Reflect Through Selection
RepresentationPath: selection -> non-evaluative -> completed
```

Le chemin affiché est :

```txt
Reflect Through Selection
↓
selection interaction
↓
IdentificationSelectionData
↓
IdentificationSelectionUserInput
↓
non-evaluative
↓
BHEResult.completed
```

Ce cas montre bien que BHE peut représenter une sélection qui n’est pas un test. L’auteur voit alors pourquoi une structure proche de l’identification peut être utilisée comme carrier, sans appeler l’évaluateur d’identification.

## 8. Vérifications

Build TypeScript :

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

La vérification confirme que les exports authoring restent importables côté Node malgré la présence d’un rendu DOM browser-only.

## 9. Comment consulter le playground

Depuis la racine du dépôt :

```txt
npm.cmd run build
```

Puis ouvrir dans un navigateur :

```txt
packages/authoring/author-discovery-playground.html
```

La page importe le JavaScript généré dans :

```txt
dist/packages/authoring/src/AuthorDiscoveryPlayground.js
```

## 10. Prochaines questions ouvertes

Le playground ouvre plusieurs questions sans y répondre encore :

- Quels Pedagogical Uses ont réellement besoin d’un `RepresentationPath` dédié ?
- Comment montrer les chemins incomplets sans donner l’impression que BHE échoue ?
- Faut-il distinguer les chemins “ready”, “plausible” et “missing bridge” ?
- Quelle quantité de vocabulaire core un auteur doit-il voir ?
- Comment passer d’un chemin documentaire à une proposition de structure BHE sans figer une architecture authoring trop tôt ?
- Les exemples corpus doivent-ils devenir le principal point d’entrée pour la découvrabilité ?

## 11. Conclusion

`Author Discovery Playground V0` rend visible une hypothèse importante :

```txt
BHE already contains several representational possibilities,
but authors need a guided surface to discover them.
```

Le prototype est utile parce qu’il ne prétend pas résoudre l’authoring complet. Il montre seulement le passage :

```txt
author intention -> pedagogical use -> representation path -> BHE vocabulary
```

Cette matérialisation suffit pour tester la découvrabilité, repérer les chemins clairs, et faire apparaître les ponts encore manquants.
