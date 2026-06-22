# Author Discovery Playground V0.1 Report

## 1. Contexte

`Author Discovery Playground V0` rendait déjà visible le chemin :

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

La V0.1 ne cherche pas à transformer le playground en éditeur. Elle ajoute une couche de lecture de couverture :

```txt
How much of the author space is already understandable?
```

L’objectif est de montrer où l’authoring est mature, où il est plausible mais encore partiel, et où un pont explicite manque encore.

## 2. Ce qui a été ajouté

Dans `packages/authoring/src/AuthorDiscoveryPlayground.ts` :

- un type expérimental `RepresentationConfidenceLevel` ;
- une structure `RepresentationConfidence` ;
- une fonction `getRepresentationConfidenceForUse` ;
- une fonction `getAuthorCoverageStats` ;
- une table de confiance pour les Pedagogical Uses déjà présents dans le catalogue authoring ;
- l’affichage d’un badge de confiance sur chaque Pedagogical Use ;
- une section `Why?` expliquant brièvement la confiance attribuée ;
- une vue synthétique `Author Coverage`.

La page locale `packages/authoring/author-discovery-playground.html` a reçu uniquement le style minimal nécessaire pour afficher les badges et la couverture.

## 3. Niveaux de confiance

Trois niveaux seulement sont utilisés.

### READY

Le chemin est clairement documenté.

Critères utilisés :

- un `RepresentationPath` existe ;
- les concepts BHE sont identifiés ;
- un exemple réel du corpus est disponible dans le playground ;
- le chemin est lisible par un auteur.

Exemples en V0.1 :

- `Reflect Through Selection`
- `Recall Through Typing`
- `Apply Through Situated Task`

### PLAUSIBLE

Le chemin semble représentable, mais il manque encore une partie de la formalisation.

Critères utilisés :

- le besoin paraît compatible avec des structures BHE existantes ;
- ou un `RepresentationPath` existe mais reste partiel ;
- ou l’exemple corpus n’est pas encore attaché dans le playground ;
- ou la formulation du carrier reste imparfaite.

Exemples en V0.1 :

- `Diagnose Through Selection`
- `Reflect Through Typing`
- `Practice Through Controlled Interaction`

### MISSING BRIDGE

Le besoin auteur est identifié, mais aucun pont explicite vers BHE n’a encore été documenté.

Critères utilisés :

- le Pedagogical Use existe dans le catalogue ;
- il répond à une intention auteur réelle ;
- aucun `RepresentationPath` n’est documenté ;
- les conditions de représentation restent trop implicites.

Exemple en V0.1 :

- `Explore Before The Rule`

## 4. Statistiques observées

La couverture affichée par le playground est :

```txt
READY: 3
PLAUSIBLE: 3
MISSING BRIDGE: 1
```

Ces chiffres portent sur les sept Pedagogical Uses actuellement présents dans le catalogue authoring.

## 5. Ce que révèle la cartographie

La cartographie montre que l’authoring n’est pas vide : plusieurs usages importants sont déjà compréhensibles depuis le point de vue auteur.

Le cas le plus solide reste :

```txt
Reflect Through Selection
```

Il dispose :

- d’un `RepresentationPath` ;
- d’un carrier BHE identifié ;
- d’une politique non évaluative claire ;
- d’un résultat `BHEResult.completed` ;
- d’un exemple réel `Thinking in English`.

La V0.1 montre aussi que la présence d’un `RepresentationPath` ne suffit pas toujours à dire READY. `Reflect Through Typing`, par exemple, est représentable, mais son carrier reste sémantiquement imparfait. Le playground le classe donc comme PLAUSIBLE.

## 6. Principaux trous observés

Le trou le plus visible est autour de l’exploration avant la règle.

```txt
Explore Before The Rule
```

Le besoin auteur est clair : faire observer, comparer, tester une hypothèse avant stabilisation conceptuelle. Mais le pont vers BHE dépend encore de plusieurs choix non explicités :

- séquence ou interaction isolée ;
- rôle du feedback ;
- degré d’évaluation ;
- place de la découverte par rapport à la correction ;
- relation avec classification, selection ou typing.

Autre trou partiel : les usages liés à classify/compare sont présents comme intentions, mais pas encore comme chemins authoring dédiés. Ils semblent représentables via des pipelines existants, mais leur découvrabilité reste encore implicite.

## 7. Surprises

La première surprise est que la couverture READY est déjà réelle malgré le caractère jeune de `packages/authoring`.

La deuxième est que le niveau PLAUSIBLE est probablement le plus intéressant pour la suite. Il ne signale pas un manque du core ; il signale plutôt un manque de formulation auteur.

La troisième est que MISSING BRIDGE peut être affiché sans être vécu comme un échec. Dans le playground, il devient une information utile : voilà un endroit où l’authoring doit encore travailler.

## 8. Pourquoi le core n’a pas été modifié

`Representation Confidence` est une lecture de découvrabilité authoring. Ce n’est pas un concept core.

La V0.1 n’ajoute donc rien à :

- `packages/core` ;
- runtime ;
- evaluators ;
- renderers.

Elle ne crée pas de `PedagogicalObject`, ne choisit pas de renderer, ne déclenche pas d’évaluateur et ne sauvegarde rien.

## 9. Vérifications

Build :

```txt
npm.cmd run build
```

Résultat :

```txt
succès
```

Import check :

```txt
import('./dist/packages/authoring/src/index.js')
```

Résultat :

```txt
succès
```

Statistiques confirmées par l’import :

```txt
READY: 3
PLAUSIBLE: 3
MISSING BRIDGE: 1
```

## 10. Conclusion

`Author Discovery Playground V0.1` rend le prototype plus révélateur sans le rendre plus complexe.

Il transforme le playground en petite carte de couverture authoring :

```txt
covered
partly understandable
not bridged yet
```

La prochaine étape naturelle serait de travailler un seul usage PLAUSIBLE ou MISSING BRIDGE, sans généraliser trop tôt. Le meilleur candidat semble être un chemin autour de comparaison/classification, car il est fréquent dans le corpus et probablement représentable par des structures déjà existantes.
