# Explore Before The Rule Investigation

Date : 2026-06-22  
Branche observée : `experiment/bhe-be`

## 1. Objet de l’enquête

Le `Author Discovery Playground V0.1` classe actuellement :

```txt
Explore Before The Rule
```

comme :

```txt
MISSING BRIDGE
```

Cette enquête cherche à vérifier si le phénomène est réellement absent de la documentation BHE, ou s’il existe déjà sous un autre nom, dans une autre couche, ou comme pattern dispersé.

Phénomène recherché :

```txt
Observation
↓
Comparaison
↓
Formulation d'hypothèse
↓
Stabilisation d'une règle
```

Formulation plus générale :

```txt
Learner discovers before teacher explains
```

Cette enquête ne crée aucun nouveau concept, aucun `RepresentationPath` et aucune implémentation.

## 2. Documents pertinents identifiés

### Countable / Uncountable Nouns — Step 3: I Learn — Moment POC

Localisation : `docs/architecture/20260604_countable-uncountable_i-learn_moment-poc.md`

Résumé pertinent :

Ce document est le signal le plus direct. Il décrit explicitement une activité qui ne suit pas le schéma :

```txt
rule
↓
exercise
```

mais plutôt :

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

Le document nomme provisoirement ce phénomène :

```txt
Moment: GuidedRuleDiscovery
```

Il précise que le learner n’est pas seulement en train de compléter une tâche, mais d’être guidé vers une appropriation conceptuelle d’une distinction grammaticale.

Raison du rapprochement :

C’est quasiment la formulation exacte de `Explore Before The Rule`. Les lignes documentent :

- observation avant règle ;
- comparaison avant nomination ;
- inférence avant stabilisation ;
- exemples et prompts comme progression organisée ;
- possibilité que `Moment` soit une lentille descriptive plutôt qu’un objet core.

Point important :

Le document conclut prudemment que `Moment` semble utile comme lentille descriptive d’orchestration pédagogique, mais ne justifie pas un objet core.

### BHE-BE — Moment Emergence Synthesis

Localisation : `docs/architecture/20260604_moment-emergence-synthesis.md`

Résumé pertinent :

La synthèse reprend le signal Countable / Uncountable et le généralise :

```txt
pedagogical value
may emerge from progression
```

Elle reformule le pattern :

```txt
observe
↓
compare
↓
infer
↓
conceptualize
```

et propose une lecture possible de `Moment` comme :

```txt
unit of pedagogical orchestration
```

Raison du rapprochement :

`Explore Before The Rule` semble précisément être un cas où la valeur pédagogique ne réside pas dans un seul objet, mais dans la progression coordonnée entre micro-actions.

Point important :

La synthèse insiste sur le fait que `Moment` reste une lentille analytique, pas une décision d’architecture core.

### Question Forms — Negative Moment POC

Localisation : `docs/architecture/20260604_question-forms_negative-moment-poc.md`

Résumé pertinent :

Ce document est important parce qu’il donne un contre-exemple. Il reconnaît que `I Learn` organisait bien une découverte guidée :

```txt
observe
-> compare
-> infer
-> conceptualize
```

mais il montre que `Question Forms` est plutôt :

```txt
rule
-> exercise
-> more rule
```

Dans ce cas, `Moment` devient moins convaincant.

Raison du rapprochement :

Le document aide à tracer une frontière : `Explore Before The Rule` n’est pas “toute leçon de grammaire”. Il apparaît surtout quand il existe une orchestration réelle de découverte, pas seulement de la couverture de règles.

Point important :

La conclusion suggère que la lentille `Moment` est utile quand il y a transition, coordination, transformation guidée, bridging, progression conceptuelle ou micro-actions au service d’une intention.

### BHE × Boost’English — Architectural Signals from a Real Brick

Localisation : `docs/architecture/20260601_bhe_boost_english_real_brick_signals.md`

Résumé pertinent :

Le document signale déjà des moments de `Pattern noticing` :

```txt
observe
↓
compare
↓
notice contrast
↓
form hypothesis
```

Il distingue aussi l’explication conceptuelle explicite :

```txt
observe examples
↓
understand distinction
↓
stabilize concept
```

Le document formule l’hypothèse :

```txt
Some pedagogical moments may exist primarily to guide cognition.
```

et relie cela à l’idée que les briques pédagogiques peuvent être des orchestrations de moments cognitifs.

Raison du rapprochement :

Le phénomène `Explore Before The Rule` apparaît ici avant même les POCs Moment détaillés. Il est visible comme signal architectural issu du corpus réel.

### Boost'English Corpus Cartography

Localisation : `docs/architecture/20260605_boost-english-corpus-cartography.md`

Résumé pertinent :

La cartographie du corpus mentionne explicitement plusieurs patterns proches :

- `Negative Adjectives and Prefixes` : l’explication arrive après un exercice, ce qui crée un petit mouvement de découverte ;
- `Countable & Uncountable Nouns` : “Guided rule discovery from concrete examples” ;
- `Comparatives and Superlatives` : “Guided comparison and form reinforcement” ;
- `Present simple and Present continuous` : dialogue avant explication de règle ;
- certains bricks suivent un rythme où l’apprenant observe ou remarque une forme, puis reçoit ou reconstruit une règle.

Le cas Countable & Uncountable est identifié comme :

```txt
observe -> test the idea -> conceptualize
```

Raison du rapprochement :

Le phénomène n’est pas isolé. Il apparaît dans plusieurs briques, mais avec des degrés différents. Countable & Uncountable reste le cas fort ; d’autres briques contiennent seulement des fragments.

### Pedagogical Layers Stress Test

Localisation : `docs/architecture/20260618_pedagogical-layers-stress-test.md`

Résumé pertinent :

Le tableau des activités décrit `Countable / Uncountable - I learn` ainsi :

- intention : guided discovery and conceptual stabilization ;
- opérations : notice, compare, infer, classify ;
- interaction purpose : elicit observations and hypotheses ;
- autre dimension : guided progression and scaffolding.

Le document note aussi que cette activité est définie en partie par son chemin guidé :

```txt
examples -> comparison -> inference -> explicit stabilization
```

Raison du rapprochement :

Ce document confirme que le phénomène traverse plusieurs couches : intention, cognition, interaction purpose, scaffolding et sequence role. Cela explique pourquoi un simple `RepresentationPath` isolé est difficile.

Point important :

Le document avertit qu’un modèle complet peut devenir un inventaire de tout ce qui est pédagogiquement pertinent. Il recommande de traiter ces couches comme discipline de questionnement plutôt que comme architecture proposée.

### InferenceSet Interaction Exploration

Localisation : `docs/reports/inference-set-interaction-exploration.md`

Résumé pertinent :

Le document définit l’inférence comme production d’une hypothèse à partir d’indices. Il inclut explicitement un cas :

```txt
Infer a grammar rule
```

où l’apprenant observe des exemples et infère une règle de pluralisation ou d’accord.

Les composants cognitifs incluent :

- clues ;
- evidence ;
- hypotheses ;
- uncertainty ;
- justification.

Il propose aussi une forme de dialogue guidé :

- What do you notice?
- Which word helps?
- What do you think it means?
- Why?

Raison du rapprochement :

`InferenceSet` couvre une partie du phénomène : la formulation d’hypothèse à partir d’indices. Mais il ne couvre pas nécessairement toute l’orchestration observation → comparaison → stabilisation.

Point important :

La recommandation du document était de continuer l’exploration conceptuelle avant de créer une nouvelle InteractionData. Cela résonne fortement avec la présente enquête.

### Learning Sequence Signal

Localisation : `docs/architecture/20260527_learning_sequence_signal.md`

Résumé pertinent :

Le document distingue deux niveaux :

```txt
learner cognition
```

et :

```txt
cognitive-pedagogical orchestration
```

`LearningSequence` est décrit comme pouvant préparer, orienter, contextualiser, relier, rythmer, déclencher ou réfléchir.

Un exemple inclut :

```txt
GuidedMoment
└── "Observe les cognats"
```

Raison du rapprochement :

`Explore Before The Rule` semble dépendre d’un ordre et d’un rôle de progression. Cette dimension est précisément ce que `LearningSequence` avait commencé à nommer, sans l’implémenter.

Point important :

Le document refuse explicitement de créer une abstraction, de modifier le core ou de coder. Objectif : laisser mariner et observer.

### Learning Experience Layer Signal

Localisation : `docs/meta/learning-experience-layer-signal.md`

Résumé pertinent :

Ce document dit qu’un exercice peut demander une opération cognitive, mais qu’une expérience d’apprentissage peut aussi guider l’apprenant avant, pendant et après cette opération.

Il évoque une couche possible incluant :

- introduction ;
- objectives ;
- explanations ;
- examples ;
- hints ;
- summaries ;
- reflection ;
- consolidation.

Il conclut que BHE doit peut-être distinguer les objets d’opération cognitive de la composition de l’expérience d’apprentissage.

Raison du rapprochement :

`Explore Before The Rule` semble être moins un exercice qu’une composition d’expérience : exposition, guidage, hypothèse, stabilisation.

Point important :

Le document demande explicitement de ne pas créer un nouveau type immédiatement.

### Memorising Vocabulary POC

Localisation : `docs/architecture/20260606_memorising-vocabulary_poc.md`

Résumé pertinent :

Le document n’est pas centré sur une règle grammaticale, mais il contient un pattern proche :

```txt
discover one strategy
-> try the strategy
-> compare with other strategies
```

Il montre que l’apprenant n’est pas simplement invité à obéir à une méthode, mais à comparer, tester et choisir des stratégies.

Raison du rapprochement :

Il s’agit d’un cousin pédagogique : découverte et stabilisation ne portent pas sur une règle linguistique mais sur une stratégie d’apprentissage. Cela confirme que le pattern dépasse la grammaire.

### Author Discoverability Catalog

Localisation : `docs/architecture/20260618_author-discoverability-catalog.md`

Résumé pertinent :

Le catalogue mentionne plusieurs usages proches :

- prediction before instruction ;
- prediction before explanation ;
- compare before and after understanding ;
- compare competing hypotheses ;
- explore possible groupings before validation ;
- place examples under emerging rules.

Raison du rapprochement :

Le phénomène est déjà présent côté découvrabilité auteur, mais comme usages dispersés entre QCM, flashcards, drag-drop/classification et autres formes d’interaction. Il n’est pas encore relié à un chemin de représentation unique.

### Pedagogical Intentions Stress Test

Localisation : `docs/architecture/20260618_pedagogical-intentions-stress-test.md`

Résumé pertinent :

Le document distingue `Explore` et `Analyze`, mais juge `Explore` fragile :

```txt
Explore suggests open or provisional engagement.
Analyze suggests structured examination of parts, relations, causes, or evidence.
```

Il note que, dans la découverte grammaticale guidée, l’activité peut sembler exploratoire pour l’apprenant mais analytiquement scénarisée par l’auteur.

Raison du rapprochement :

Ce document explique pourquoi `Explore Before The Rule` est difficile à stabiliser comme simple intention. Le mot `Explore` peut être trop flatteur ou trop vague si l’orchestration réelle n’est pas décrite.

### Architectural Lenses

Localisation : `docs/architecture/20260618_architectural-lenses.md`

Résumé pertinent :

Le document rappelle qu’un concept peut être utile comme lentille architecturale sans devenir un objet core. Il stabilise `CognitiveOperation` comme core, mais garde `Pedagogical Intention`, `PedagogicalTransition`, `Social Mode` et `Affective Orientation` comme lentilles.

Raison du rapprochement :

`Explore Before The Rule` pourrait être une lentille ou une configuration de lentilles plutôt qu’un concept core. Ce document fournit le garde-fou méthodologique.

## 3. Signaux convergents

### Découverte guidée

Le signal le plus fort est `GuidedRuleDiscovery`, surtout dans Countable / Uncountable. Il apparaît comme mouvement organisé vers une distinction grammaticale.

### Progression cognitive

Le pattern récurrent est :

```txt
notice / observe
↓
compare
↓
infer / hypothesize
↓
conceptualize / stabilize
```

La valeur pédagogique vient de l’ordre et de l’enchaînement, pas seulement des opérations prises isolément.

### Hypothèse et inférence

`InferenceSet` couvre une partie importante : produire une hypothèse à partir d’indices. Il couvre particulièrement la zone “formulation d’hypothèse”.

### Scaffolding

Les documents récents insistent sur l’accompagnement : prompts, exemples, feedback, résumé, stabilisation. Ce n’est pas seulement “laisser l’apprenant explorer”.

### Comparaison avant règle

La comparaison est récurrente : comparer exemples, hypothèses, stratégies, catégories ou états avant/après compréhension.

### Stabilisation conceptuelle

Plusieurs documents distinguent l’exploration elle-même de la stabilisation finale : résumé, règle, conceptualisation, explicitation.

### Orchestration plutôt qu’objet isolé

La plupart des signaux indiquent que le phénomène traverse plusieurs objets ou micro-actions. C’est pourquoi `Moment`, `LearningSequence` et `Learning Experience Layer` réapparaissent.

## 4. Ce qui semble déjà exister

### CognitiveOperation

Couverture partielle :

- notice ;
- compare ;
- infer ;
- classify ;
- reflect.

Limite :

Ces opérations nomment les actes cognitifs, mais pas leur séquence ni leur rôle de découverte progressive.

### InferenceSet

Couverture partielle :

- hypothèse ;
- indices ;
- justification ;
- inférence d’une règle.

Limite :

Il ne couvre pas forcément l’exposition d’exemples, la comparaison guidée, le feedback et la stabilisation conceptuelle.

### ClassificationSet / IdentificationSet

Couverture partielle :

- trier des exemples ;
- repérer une forme ;
- tester une distinction.

Limite :

Ils représentent des interactions locales, pas la découverte guidée complète.

### Moment

Couverture partielle :

`Moment` est le concept documentaire qui colle le mieux à la question. Les POCs disent qu’il peut décrire une unité d’orchestration pédagogique, surtout quand la valeur vient d’une progression.

Limite :

Il n’est pas stabilisé. Il reste une lentille descriptive, pas un core object.

### LearningSequence

Couverture partielle :

LearningSequence couvre l’ordre, le rythme, la préparation, le lien entre moments et la progression.

Limite :

Il n’est pas implémenté et ne dit pas comment représenter une micro-séquence “observe → compare → infer → stabilize” dans le authoring actuel.

### Learning Experience Layer

Couverture partielle :

La couche d’expérience d’apprentissage couvre les éléments autour de l’exercice : exemples, hints, summaries, reflection, consolidation.

Limite :

Elle est encore plus large que le problème. Elle pourrait englober `Explore Before The Rule`, mais risque d’être trop générale.

### PedagogicalUse / Author Discoverability

Couverture partielle :

Les documents authoring reconnaissent déjà les usages “prediction before explanation”, “compare competing hypotheses”, “place examples under emerging rules”.

Limite :

Ces usages ne sont pas encore reliés à un `RepresentationPath`.

## 5. Ce qui semble réellement manquer

### Un pont authoring explicite

Ce qui manque n’est pas l’idée pédagogique. Elle existe abondamment.

Ce qui manque est un chemin documentaire du type :

```txt
Explore Before The Rule
↓
which local interaction(s)?
↓
which UserInput(s)?
↓
which evidence policy?
↓
which BHEResult semantics?
↓
which stabilization step?
```

### Une distinction entre interaction locale et orchestration

Les documents montrent que la découverte guidée peut contenir :

- observation d’exemples ;
- sélection ;
- classification ;
- inférence ;
- discussion ;
- résumé explicite.

Mais il n’existe pas encore de manière authoring simple de dire :

```txt
This is not one interaction.
This is an orchestrated discovery path.
```

### Une politique d’évaluation claire

La découverte guidée peut être :

- non évaluative au début ;
- évaluée localement sur un classement ;
- qualitativement évaluée sur une hypothèse ;
- stabilisée par une règle explicite ;
- suivie d’un exercice correctif.

La politique d’évaluation varie selon la phase. Aucun document ne propose encore une convention simple pour l’ensemble.

### Une représentation du “before / after rule”

Le point le plus spécifique qui manque est le rôle temporel :

```txt
before rule
after rule
stabilization
practice after stabilization
```

BHE sait représenter plusieurs morceaux, mais pas encore la relation authoring entre ces morceaux.

### Une entrée auteur claire

Le mot `Explore` est fragile. Le stress-test des intentions montre qu’il peut masquer :

- exploration libre ;
- analyse guidée ;
- exposition progressive ;
- classification inductive ;
- inférence ;
- simple activité avant explication.

Il manque donc peut-être moins un concept qu’une meilleure question auteur.

## 6. Conclusion

Parmi les hypothèses proposées :

```txt
A. Nouveau concept nécessaire

B. Concept existant mais dispersé

C. Concept existant mais mal nommé

D. Pas un concept mais une orchestration
```

L’hypothèse la plus crédible est :

```txt
D. Pas un concept mais une orchestration
```

avec une nuance forte :

```txt
B. Concept existant mais dispersé
```

La documentation montre clairement que le phénomène existe déjà. Il apparaît sous les noms ou lentilles suivants :

- `GuidedRuleDiscovery`;
- `Moment`;
- `GuidedMoment`;
- `LearningSequence`;
- `Learning Experience Layer`;
- `InferenceSet`;
- `Pedagogical Layers`;
- authoring uses comme “prediction before explanation” ou “place examples under emerging rules”.

Mais aucun de ces éléments ne suffit seul à devenir immédiatement un `RepresentationPath`.

Le plus prudent est donc de ne pas créer un nouveau concept core. `Explore Before The Rule` devrait probablement être traité comme une orchestration authoring : un chemin composé de micro-actions existantes, avec un rôle de progression et de stabilisation.

Formulation provisoire :

```txt
Explore Before The Rule is not missing from BHE thinking.
It is missing as an author-visible orchestration path.
```

## 7. Recommandation documentaire

Avant toute implémentation, la prochaine étape raisonnable serait une reconstruction documentaire d’un seul cas fort :

```txt
Countable / Uncountable — I Learn
```

Objectif :

```txt
reconstruire la micro-orchestration
observe -> compare -> infer -> stabilize
avec uniquement les concepts BHE existants
```

Sans créer de nouveau core object.

Cette reconstruction permettrait de vérifier si un futur `RepresentationPath` peut rester local à `packages/authoring`, ou s’il révèle réellement une lacune de représentation.
