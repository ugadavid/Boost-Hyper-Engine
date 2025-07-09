# 🩸 Liste des douleurs H5P

## ⚡ Objectif

Identifier les limites, irritants et verrous de H5P pour éviter de les reproduire dans Boost Hyper Engine. Cette liste sert de **checklist négative** à chaque choix technique ou fonctionnel.

---

## 🔧 1. Interface auteur frustrante
- Trop de clics pour éditer un élément.
- Zones d'édition parfois invisibles ou mal signalées.
- Composants difficiles à déplacer ou réorganiser.
- Aucune personnalisation de l'interface.

## 🎨 2. Esthétique figée / datée
- Design uniforme, peu engageant.
- Peu ou pas de personnalisation sans CSS.
- Esthétique scolaire / fade par défaut.
- Problèmes de responsivité sur certaines activités.

## 🧰 3. Modularité absente
- Modules non combinables entre eux.
- Aucun composant réutilisable ou enchâssable.
- Activités monolithiques, figées.

## 🧠 4. Aide à la création inexistante
- Aucun assistant à la conception ou à la formulation des consignes.
- Pas de suggestion de feedback ou d'adaptation.
- Zéro accompagnement pédagogique.

## ⛔️ 5. Verrouillages arbitraires
- Une seule interaction possible par module.
- Impossible de construire des triades ou associations multiples.
- Logiques conditionnelles lourdes voire absentes.

## ❌ 6. Limites absurdes
- Exemples :
  - Jeux par paires → pas de triades.
  - Drag & drop → pas de texte + image + son simultané.
- Structure trop rigide pour les usages créatifs.

## 🔀 7. Faible portabilité
- Export HTML encapsulé en iframe.
- Pas de format ouvert modifiable facilement.
- Intégration SCORM/LTI complexe et peu accessible.

## 📊 8. Pas de suivi d'usage local
- Aucune collecte native des réponses sans LMS.
- Aucune intégration simple dans un tableau de bord.
- Pas de traçabilité utilisable pour une amélioration adaptative.

## ⏳ 9. Productivité freinée
- Dupliquer un composant = re-remplir tout.
- Copier-coller entre activités impossible.
- Pas de vue JSON claire pour modifier rapidement les données.

> 📅  **Exception :** le bouton "Réutiliser" permet de télécharger l'activité H5P au format .h5p, ce qui permet une réutilisation globale. Cependant, cela reste éloigné d'une logique de réutilisation fine ou de duplication de composants internes.

## 🔒 10. Écosystème fermé
- Modules personnalisés difficiles à créer (PHP/JS entremêlé).
- H5P.com payant pour de vraies fonctionnalités avancées.
- Communauté peu active, très technique, peu pédagogique.

---

## 🔢 Utilisation de cette liste

> Avant d'ajouter une fonctionnalité à Boost Hyper Engine, vérifier si elle **répond à une douleur** ci-dessus.  
> Si oui, on peut ajouter une note : “Résolution de douleur H5P #n” dans la doc technique.

---

## ✨ En construction permanente

Ce document évoluera avec les tests, les retours d'utilisateur… et les coups de gueule constructifs.

