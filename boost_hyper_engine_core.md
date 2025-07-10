# 📦 Module `boost-hyper-engine-core`

## 🎯 Objectif

Ce module constitue le noyau logique du Boost Hyper Engine. Il contient les **modèles TypeScript** permettant de décrire et manipuler les activités pédagogiques de façon abstraite, cohérente et réutilisable. Il n'est pas responsable du rendu graphique ou de l'édition, mais de la **représentation et validation des activités**.

---

## 💡 Pourquoi TypeScript ?

Nous avons fait le choix de TypeScript pour plusieurs raisons essentielles :

- **Typage fort** : réduction drastique des erreurs bêtes (typos, objets mal formés...).
- **Interfaces explicites** : facilitent la communication entre modules, la documentation et la maintenabilité.
- **Classes abstraites & génériques** : permettent de factoriser un maximum de logique tout en garantissant la cohérence.
- **Contrôle strict en amont** : détection de problèmes au moment du build, plutôt que dans le navigateur.
- **Modernité** : la plupart des grands frameworks frontend (React, Vue, Angular...) sont 100% compatibles avec TS.

---

## 🧱 Structure actuelle du module

```
boost-hyper-engine-core/
├── models/                # Modèles abstraits et spécifiques
│   ├── AbstractActivityModel.ts
│   └── DragDropActivityModel.ts
├── types/                 # Types et interfaces partagés
│   └── ActivityModel.ts
├── utils/                 # (futur dossier pour validation, génération, etc.)
└── index.ts               # Point d'entrée du module
```

---

## 🧩 Principes de conception

- Chaque activité repose sur un modèle qui **implémente une interface commune** (`ActivityModel<T>`) et hérite d'une classe abstraite `AbstractActivityModel<T>`.
- La méthode `validate()` garantit que l'activité est bien formée (types, clés présentes, etc.)
- Le champ `metadata` permet de gérer les métadonnées communes à toutes les activités.

---

## 📌 Prochaines étapes

- Ajouter les modèles pour d'autres types d'activités : `FillInTheBlanksActivityModel`, `MemoryPairsActivityModel`...
- Ajouter un système de **validation centralisée**.
- Intégrer des helpers pour l'import/export `.bhe.json`

---

**Boost Hyper Engine Core** : pensé pour l'évolutivité, la rigueur, et la simplicité d'utilisation.

