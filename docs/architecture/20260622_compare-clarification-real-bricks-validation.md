# Compare Clarification — Real Bricks Validation

## 1. Contexte

Le `Author Discovery Playground` contient maintenant le chemin :

```txt
Help learners compare
↓
What are learners comparing?
```

Cette validation teste ce chemin sur trois briques Boost'English réelles :

- `Countable / Uncountable — I Learn` ;
- `Passive Voice` ;
- `Thinking in English`.

Le but n'est pas de créer un nouveau concept, un nouveau `Set`, ou un nouveau `RepresentationPath`.

Le but est seulement de vérifier :

```txt
Does the clarification help route the author?
```

## 2. Countable / Uncountable

### Clarification retenue

```txt
Categories
↓
ClassificationSet
```

Le choix dominant est `Categories`.

L'apprenant compare des exemples pour comprendre une distinction :

```txt
countable
vs
uncountable
```

La représentation BHE qui apparaît ensuite le plus naturellement est :

```txt
ClassificationSet
```

car l'activité finit par demander :

```txt
Which category does this noun belong to?
```

### Alternatives

Alternative importante :

```txt
Hypotheses
↓
InferenceSet
```

Cette alternative n'est pas secondaire au sens pédagogique. Elle décrit bien la phase de découverte :

```txt
observe
↓
compare
↓
infer
↓
stabilize
```

Dans `Countable / Uncountable — I Learn`, les catégories ne sont pas seulement appliquées. Elles sont progressivement construites par observation et hypothèse.

### Arguments

La clarification aide parce qu'elle force une distinction utile :

- si les catégories sont déjà données, l'auteur va vers `ClassificationSet` ;
- si les catégories sont encore en émergence, l'auteur voit que `Explore Before The Rule` et `InferenceSet` jouent un rôle.

Le chemin n'est donc pas simplement :

```txt
Compare
↓
ClassificationSet
```

mais plutôt :

```txt
Compare categories
↓
ClassificationSet
```

avec une possible orchestration :

```txt
Compare hypotheses
↓
InferenceSet / Explore Before The Rule
```

## 3. Passive Voice

### Clarification retenue

```txt
Before / After Forms
↓
TransformationSet
```

Le choix dominant est `Before / After Forms`.

L'apprenant compare une forme source et une forme transformée :

```txt
active
↔
passive
```

La représentation BHE la plus naturelle est :

```txt
TransformationSet
```

car la structure centrale est :

```txt
source form
↓
operation
↓
target form
```

### Alternatives

Alternatives défendables :

```txt
Categories
```

pour les moments où l'apprenant doit reconnaître si une phrase est active ou passive.

```txt
Hypotheses
```

pour les extensions de lecture critique où l'apprenant compare des interprétations, des effets de focus, ou des responsabilités rendues visibles/invisibles.

### Arguments

La clarification aide fortement ici.

Sans clarification, `Compare` pourrait rester vague :

```txt
learners compare active and passive
```

Avec la question :

```txt
What are learners comparing?
```

la réponse devient immédiatement plus opérationnelle :

```txt
Before / After Forms
```

Le chemin `TransformationSet` paraît alors naturel pour un auteur, parce qu'il correspond au geste pédagogique visible :

```txt
change this form into that form
```

La clarification révèle aussi que la brique Passive Voice contient plus d'un type de comparaison. Le coeur learner-facing est transformationnel, mais certaines extensions peuvent devenir interprétatives.

## 4. Thinking in English

### Clarification retenue

```txt
Strategies / Habits
↓
Reflect Through Selection
```

Le choix dominant est `Strategies / Habits`.

L'apprenant compare :

- ses habitudes de traduction mentale ;
- sa manière de préparer la parole ;
- sa confiance ;
- ses stratégies implicites.

Le premier chemin authoring le plus clair est :

```txt
Reflect Through Selection
```

car la brique commence par un questionnaire de self-positioning : l'apprenant sélectionne des statements qui le décrivent.

### Alternatives

Alternative importante :

```txt
Reflect Through Typing
```

Cette alternative devient naturelle si l'activité demande ensuite :

```txt
Explain when you translate mentally.
Describe what helps you think directly in English.
Write what you want to try next.
```

Alternative plus faible :

```txt
Categories
```

Elle peut apparaître si l'on classe des types d'habitudes, mais elle est moins fidèle au coeur réflexif de la brique.

### Arguments

La clarification aide vraiment ici parce qu'elle empêche une mauvaise route.

Sans clarification, un auteur pourrait voir :

```txt
Compare
```

et chercher une structure évaluative ou classificatoire.

Mais la question :

```txt
What are learners comparing?
```

fait apparaître que les apprenants ne comparent pas des réponses correctes.

Ils comparent des états personnels, habitudes et stratégies.

Le chemin devient donc :

```txt
Strategies / Habits
↓
Reflect Through Selection
↓
Selection
↓
non-evaluative completion
↓
BHEResult.completed
```

Cette brique confirme que `Compare` peut être réflexif et non évaluatif.

## 5. Intégration dans le playground

Une zone a été ajoutée au panneau de détail Compare :

```txt
Real Validation Examples
```

Elle affiche les trois cas :

```txt
Brick
↓
Clarification choice
↓
Suggested Pedagogical Use
↓
Suggested RepresentationPath
↓
BHE mapping
```

Les validations visibles sont :

```txt
Countable / Uncountable — I Learn
↓
Categories
↓
Practice through controlled interaction / Explore before the rule
↓
AuthorOrchestrationPath: Explore Before The Rule
↓
ClassificationSet, with InferenceSet visible during discovery
```

```txt
Passive Voice
↓
Before / After Forms
↓
Practice through controlled interaction
↓
No documented RepresentationPath yet
↓
TransformationSet
```

```txt
Thinking in English
↓
Strategies / Habits
↓
Reflect through selection / Reflect through typing
↓
RepresentationPath: reflect-through-selection / RepresentationPath: reflect-through-typing
↓
Reflective authoring path using selection or typing
```

## 6. Ce que la validation révèle

### La clarification aide le routage

Dans les trois cas, la question :

```txt
What are learners comparing?
```

rend le chemin suivant plus visible.

Elle évite de traiter `Compare` comme une interaction ou comme un `PedagogicalUse` unique.

### Les cas ne sont pas également simples

`Passive Voice` est le cas le plus direct :

```txt
Before / After Forms
↓
TransformationSet
```

`Thinking in English` est très clair aussi, mais seulement si l'on accepte que la comparaison puisse être réflexive et non évaluative.

`Countable / Uncountable` est le plus riche : `Categories` est dominant, mais `Hypotheses` joue un vrai rôle dans la phase de découverte.

### Certaines routes restent incomplètes côté authoring

La clarification montre des mappings BHE existants, mais pas toujours des `RepresentationPath` complets.

Par exemple :

- `TransformationSet` est clair pour Passive Voice, mais le chemin authoring n'est pas encore aussi documenté que `Reflect Through Selection` ;
- `ClassificationSet` est clair pour Countable / Uncountable, mais la phase de découverte nécessite une orchestration ;
- `InferenceSet` apparaît comme soutien d'hypothèse, mais son chemin authoring reste moins visible.

## 7. Conclusion

Réponse à la question :

```txt
Did the clarification help?
```

Verdict :

```txt
Useful but incomplete
```

La clarification aide réellement l'auteur à router son intention.

Elle transforme :

```txt
I want learners to compare.
```

en questions plus représentables :

```txt
Are they comparing categories?
Are they comparing before/after forms?
Are they comparing strategies or habits?
Are they comparing hypotheses?
```

Cela rend les structures BHE existantes plus découvrables.

Mais elle reste incomplète parce que certains chemins ne possèdent pas encore de `RepresentationPath` authoring pleinement documenté.

La prochaine étape saine serait donc :

```txt
documenter les chemins les plus fréquents révélés par la validation,
sans créer de nouveau concept core.
```

Priorités possibles :

1. `Before / After Forms -> TransformationSet` pour Passive Voice ;
2. `Categories -> ClassificationSet` avec phase `Hypotheses` pour Countable / Uncountable ;
3. consolidation du chemin réflexif `Strategies / Habits -> Reflect Through Selection / Typing`.
