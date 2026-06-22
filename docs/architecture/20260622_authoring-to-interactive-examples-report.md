# Authoring Paths To Interactive Examples Report

## 1. Contexte

Le `Author Discovery Playground` permet désormais de parcourir :

```txt
Author Intent
↓
Clarification Question
↓
Pedagogical Use
↓
RepresentationPath / AuthorOrchestrationPath
↓
BHE Mapping
```

La validation sur trois briques Boost'English a confirmé que la clarification :

```txt
Compare
↓
What are learners comparing?
```

aide réellement à router l'auteur.

Cette mission ajoute un dernier maillon démonstratif :

```txt
Interactive Example
```

Le but est de rendre visible non seulement le chemin authoring, mais aussi une forme concrète très simple de l'activité proposée.

## 2. Ce qui a été ajouté

Dans la zone :

```txt
Real Validation Examples
```

chaque brique réelle affiche maintenant une section :

```txt
Interactive Example
```

Les trois mini-interactions sont :

- `Countable / Uncountable` : classification click-to-classify ;
- `Passive Voice` : transformation active → passive avec champ texte ;
- `Thinking in English` : sélection réflexive par checkboxes.

Ces interactions sont implémentées localement dans le playground, en DOM simple, dans `packages/authoring`.

Elles ne réutilisent pas les renderers, evaluators ou runtime BHE.

## 3. Pourquoi ces interactions restent authoring-only

Ces mini-activités ne sont pas des activités BHE complètes.

Elles ne créent pas :

- `PedagogicalObject` ;
- `InteractionData` runtime ;
- `UserInput` BHE réel ;
- evaluator core ;
- renderer core ;
- routing runtime ;
- nouveau `Set`.

Elles servent uniquement à montrer à l'auteur :

```txt
If you choose this route,
the activity could look roughly like this.
```

Leur rôle est démonstratif, pas architectural.

## 4. Comment elles ferment la chaîne démonstrative

Avant cette mission, le playground pouvait montrer :

```txt
Author Intent
↓
Clarification
↓
Pedagogical Use
↓
RepresentationPath / AuthorOrchestrationPath
↓
BHE Mapping
```

Il peut maintenant montrer :

```txt
Author Intent
↓
Clarification
↓
Pedagogical Use
↓
RepresentationPath / AuthorOrchestrationPath
↓
BHE Mapping
↓
Interactive Example
```

Cela rend le pont auteur plus tangible.

L'auteur ne voit plus seulement :

```txt
Categories -> ClassificationSet
```

Il voit aussi une petite activité qui classe des items dans deux catégories.

## 5. Exemple 1 — Countable / Uncountable

Route affichée :

```txt
Compare
↓
Categories
↓
ClassificationSet
```

Mini-interaction :

- mots affichés :
  - `apple`
  - `water`
  - `banana`
  - `milk`
  - `information`
  - `chair`
- deux boutons par mot :
  - `Countable`
  - `Uncountable`

Feedback local :

```txt
Demo completed for X/6 items.
```

Ce que l'exemple montre :

L'activité rend tangible l'idée de classification. Elle montre pourquoi `Categories` mène naturellement vers `ClassificationSet`.

Limite assumée :

Le feedback ne cherche pas à être un evaluator complet. Il compte seulement les items traités.

## 6. Exemple 2 — Passive Voice

Route affichée :

```txt
Compare
↓
Before / After Forms
↓
TransformationSet
```

Mini-interaction :

Phrase source :

```txt
The technician repaired the machine.
```

Consigne :

```txt
Transform into passive voice.
```

Réponse modèle :

```txt
The machine was repaired by the technician.
```

Feedback local :

- signal positif si la réponse contient :
  - `machine`
  - `was repaired`
  - `technician`
- sinon :

```txt
Compare your answer with the model.
This demo is not a full evaluator.
```

Ce que l'exemple montre :

L'activité rend tangible la logique :

```txt
source
↓
operation
↓
target
```

C'est précisément la zone de `TransformationSet`.

Limite assumée :

La vérification textuelle est volontairement naïve. Elle n'est pas un evaluator BHE.

## 7. Exemple 3 — Thinking in English

Route affichée :

```txt
Compare
↓
Strategies / Habits
↓
Reflect Through Selection
```

Mini-interaction :

Statements :

```txt
I translate every sentence in my head before speaking.
I can sometimes think directly in English.
I prepare useful chunks before speaking.
I feel blocked when I search for exact translations.
```

Interaction :

```txt
Select the statements that describe you.
```

Feedback local :

```txt
Reflection completed.
You selected X statements.
This is not evaluated.
```

Ce que l'exemple montre :

L'activité rend visible une sélection non évaluative. Elle ne produit pas `success` ou `failed`. Elle montre plutôt la logique :

```txt
Reflect Through Selection
↓
non-evaluative completion
↓
BHEResult.completed
```

Limite assumée :

La démo ne produit pas réellement un `BHEResult`. Elle illustre seulement la sémantique attendue.

## 8. Fichiers modifiés

### `packages/authoring/src/AuthorDiscoveryPlayground.ts`

Ajout de trois rendus authoring-only :

- `renderCountableUncountableDemo` ;
- `renderPassiveVoiceDemo` ;
- `renderThinkingInEnglishDemo`.

Ajout d'un shell commun :

- `renderDemoShell`.

Les démos sont attachées aux `compareValidationExamples` existants via `renderInteractiveExample`.

### `packages/authoring/author-discovery-playground.html`

Ajout de styles minimaux pour :

- `.adp-demo` ;
- `.adp-demo-classification` ;
- `.adp-demo-row` ;
- `.adp-demo-input` ;
- `.adp-demo-checkboxes`.

### `packages/authoring/src/index.ts`

Aucun changement fonctionnel supplémentaire pour cette mission. Le fichier était déjà modifié par l'export des validations Compare.

## 9. Ce qui n'a pas été modifié

Aucun changement dans :

- `packages/core` ;
- `runtime` ;
- `renderers` ;
- `evaluators`.

Aucun nouveau `Set`.

Aucun nouveau renderer core.

Aucun nouvel evaluator core.

Aucun runtime pathway.

## 10. Vérifications

Build :

```txt
npm.cmd run build
```

Résultat :

```txt
OK
```

Import authoring :

```txt
import('./dist/packages/authoring/src/index.js')
```

Résultat :

```txt
compare validation examples=3
compare options=6
```

## 11. Comment consulter les exemples

Après build, ouvrir :

```txt
packages/authoring/author-discovery-playground.html
```

Puis suivre :

```txt
I want to...
↓
Help learners compare
```

Dans le panneau de détail :

```txt
Real Validation Examples
```

Chaque brique contient maintenant :

```txt
Interactive Example
```

## 12. Rollback facile

Le rollback est simple parce que les démos sont isolées dans `packages/authoring`.

Pour retirer cette couche :

1. supprimer l'appel `renderInteractiveExample(example)` dans `renderCompareValidationExamples` ;
2. supprimer les fonctions de démo dans `AuthorDiscoveryPlayground.ts` ;
3. supprimer les styles `.adp-demo...` dans `author-discovery-playground.html`.

Aucune migration core ou runtime ne serait nécessaire.

## 13. Découverte principale

Les mini-interactions rendent le chemin authoring beaucoup plus lisible.

La chaîne devient visible de bout en bout :

```txt
I want learners to compare.
↓
What are learners comparing?
↓
Categories / Forms / Habits
↓
Pedagogical Use
↓
BHE Mapping
↓
Concrete learner-facing gesture
```

Le gain est surtout démonstratif.

Il aide un auteur à comprendre :

- pourquoi `Countable / Uncountable` ressemble à une classification ;
- pourquoi `Passive Voice` ressemble à une transformation ;
- pourquoi `Thinking in English` ressemble à une réflexion non évaluative.

La limite reste claire :

```txt
interactive demo
!=
BHE runtime activity
```

Cette couche est utile tant qu'elle reste explicitement authoring-only, rollbackable et demo-level.
