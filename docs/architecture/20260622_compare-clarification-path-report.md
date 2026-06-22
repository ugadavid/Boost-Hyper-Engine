# Compare Clarification Path Report

## 1. Contexte

L'enquête documentaire `20260622_compare-investigation.md` a conclu :

```txt
Compare is representable,
but not self-routing.
```

Elle a aussi identifié `Compare` comme une intention auteur transversale pouvant emprunter plusieurs chemins BHE existants.

Le problème n'est donc pas :

```txt
BHE ne peut pas représenter Compare.
```

Le problème est :

```txt
Comment l'auteur découvre-t-il
quel chemin prendre ?
```

Cette mission ajoute une étape de clarification au `Author Discovery Playground`, sans modifier le core, le runtime, les renderers ou les evaluators.

## 2. Ce qui a été ajouté

Le playground contient maintenant un cas spécial pour l'intention :

```txt
Help learners compare
```

Au lieu d'afficher immédiatement une liste de `PedagogicalUse`, il affiche une question intermédiaire :

```txt
What are learners comparing?
```

Cette étape propose six options issues de l'enquête documentaire :

- `Categories` ;
- `Relations` ;
- `Before / After Forms` ;
- `Hypotheses` ;
- `Order` ;
- `Strategies / Habits`.

Chaque option affiche :

- des exemples auteur ;
- un ou plusieurs `PedagogicalUse` existants suggérés ;
- un `RepresentationPath` ou `AuthorOrchestrationPath` suggéré quand il existe ;
- un mapping BHE plausible ;
- les limites visibles.

## 3. Pourquoi Compare n'est plus traité comme une destination

`Compare` peut désigner plusieurs choses différentes :

- comparer des catégories ;
- comparer des relations ;
- comparer une forme avant/après transformation ;
- comparer des hypothèses ;
- comparer des positions dans un ordre ;
- comparer ses propres stratégies ou habitudes.

Ces cas ne produisent pas le même type de représentation :

- pas le même objet BHE ;
- pas le même `UserInput` ;
- pas la même politique d'évaluation ;
- pas le même `BHEResult`.

Le playground évite donc de faire comme si `Compare` était un chemin unique.

Il le traite comme une intention incomplète :

```txt
Compare
↓
What are learners comparing?
```

## 4. Fonctionnement de la clarification

Le parcours affiché est :

```txt
Compare
↓
What are learners comparing?
↓
chosen category
↓
suggested Pedagogical Use
↓
suggested RepresentationPath
↓
BHE mapping
```

L'interface reste statique et locale. Elle ne génère aucun `PedagogicalObject`, ne sauvegarde rien, et ne crée aucun nouveau type.

Le but est seulement de rendre visible le raisonnement d'orientation.

## 5. Chemins proposés

### Categories

Exemples :

```txt
countable vs uncountable
comparative vs superlative
-ed vs -ing
```

Mapping suggéré :

```txt
ClassificationSet
```

Usages suggérés :

- `Practice through controlled interaction` ;
- `Explore before the rule`.

Lecture :

Quand les catégories sont déjà stables, `ClassificationSet` paraît naturel. Quand elles sont encore en construction, le chemin se rapproche plutôt de `Explore Before The Rule`.

### Relations

Exemples :

```txt
positive vs negative adjective
word ↔ image
concept ↔ example
```

Mapping suggéré :

```txt
AssociationSet
```

Usage suggéré :

- `Practice through controlled interaction`.

Lecture :

Quand la comparaison sert à voir ce qui va ensemble, ce qui s'oppose ou ce qui correspond, `AssociationSet` est le porteur BHE le plus clair.

### Before / After Forms

Exemples :

```txt
active ↔ passive
present ↔ past
source ↔ transformed form
```

Mapping suggéré :

```txt
TransformationSet
```

Usage suggéré :

- `Practice through controlled interaction`.

Lecture :

Quand une forme source devient une forme cible, la comparaison porte surtout sur une transformation.

### Hypotheses

Exemples :

```txt
possible rule
possible interpretation
possible explanation
```

Mapping suggéré :

```txt
InferenceSet
```

Usage suggéré :

- `Explore before the rule`.

Lecture :

Quand l'apprenant compare des hypothèses ou explications possibles, la représentation se rapproche de l'inférence. Le chemin peut aussi appartenir à une orchestration plus large de découverte avant règle.

### Order

Exemples :

```txt
process
workflow
timeline
dialogue reconstruction
```

Mapping suggéré :

```txt
SequenceSet
```

Usage suggéré :

- `Practice through controlled interaction`.

Lecture :

Quand la comparaison porte sur avant/après, adjacency, progression ou ordre logique, `SequenceSet` est le porteur naturel.

### Strategies / Habits

Exemples :

```txt
learning strategies
translation habits
self-reflection
```

Mapping suggéré :

```txt
Reflective authoring path using selection or typing
```

Usages suggérés :

- `Reflect through selection` ;
- `Reflect through typing`.

Lecture :

Quand l'apprenant compare ses habitudes, ses stratégies ou son état personnel, le chemin n'est généralement pas évaluatif. La représentation attendue est plutôt une participation significative, souvent terminée par `BHEResult.completed`.

## 6. Fichiers modifiés

### `packages/authoring/src/AuthorDiscoveryPlayground.ts`

Ajouts principaux :

- type expérimental local `CompareClarificationOption` ;
- données statiques `compareClarificationOptions` ;
- rendu spécifique pour l'intention `compare` ;
- panneau `What are learners comparing?` ;
- détail de clarification affichant le chemin :

```txt
Author Intent
Clarification Question
Chosen Category
Suggested Pedagogical Use
Suggested RepresentationPath
BHE Mapping
```

### `packages/authoring/src/index.ts`

Ajouts :

- export du type `CompareClarificationOption` ;
- export de `compareClarificationOptions`.

### `packages/authoring/author-discovery-playground.html`

Ajouts :

- titre mis à jour ;
- styles minimaux pour les notes de panneau et cartes de suggestions.

## 7. Ce qui n'a pas été modifié

Aucun changement dans :

- `packages/core` ;
- `runtime` ;
- `renderers` ;
- `evaluators`.

Aucun `CompareSet` n'a été créé.

Aucun `CompareThrough...` n'a été créé comme concept, type, interface, objet core ou structure runtime.

Les libellés restent des aides de découverte auteur dans le playground.

## 8. Vérifications

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
OK
```

Exports vérifiés :

```txt
authorDiscoveryExamples
authorDiscoveryIntents
compareClarificationOptions
```

Options Compare vérifiées :

```txt
Categories -> ClassificationSet
Relations -> AssociationSet
Before / After Forms -> TransformationSet
Hypotheses -> InferenceSet
Order -> SequenceSet
Strategies / Habits -> Reflective authoring path using selection or typing
```

Vérification navigateur :

Le navigateur intégré avait déjà la page locale ouverte, mais l'action de rechargement sur l'URL `file://` a été refusée par la politique de sécurité du navigateur intégré. Aucune tentative de contournement n'a été effectuée. Les vérifications retenues sont donc le build, l'import du module authoring et l'inspection des données exportées.

## 9. Comment accéder au chemin de clarification

Après build, ouvrir ou recharger :

```txt
packages/authoring/author-discovery-playground.html
```

Puis :

```txt
I want to...
↓
Help learners compare
```

Le deuxième panneau affiche alors :

```txt
What are learners comparing?
```

Choisir ensuite une option, par exemple :

```txt
Categories
```

Le panneau de détail affiche le chemin de clarification et le mapping BHE suggéré.

## 10. Limites visibles

La clarification est volontairement statique.

Elle ne sait pas encore :

- poser des questions supplémentaires ;
- choisir automatiquement entre plusieurs usages suggérés ;
- générer un `RepresentationPath` ;
- créer un `PedagogicalObject` ;
- valider une activité réelle ;
- distinguer finement pratique, exploration et diagnostic dans tous les cas.

Certaines options pointent vers un objet BHE clair mais pas encore vers un `RepresentationPath` authoring complet.

C'est intentionnel : le playground doit montrer les zones matures et les zones encore implicites.

## 11. Découverte principale

La clarification confirme l'hypothèse de l'enquête :

```txt
Compare n'est pas une destination.
Compare est une question incomplète.
```

La bonne première question auteur devient :

```txt
What are learners comparing?
```

Une fois cette question posée, les structures BHE existantes deviennent beaucoup plus visibles.

## 12. Prochaine étape recommandée

La prochaine étape saine serait de tester ce chemin sur trois briques Boost'English :

- `Countable / Uncountable` pour `Categories` ;
- `Passive Voice` pour `Before / After Forms` ;
- `Memorising Vocabulary` ou `Thinking in English` pour `Strategies / Habits`.

Le but serait de vérifier si la clarification aide réellement l'auteur à trouver un chemin, ou si elle doit être complétée par une deuxième question.
