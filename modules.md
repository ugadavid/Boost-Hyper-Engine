# 🧩 Modules de Boost Hyper Engine

Ce document présente les modules clés du projet **Boost Hyper Engine**, leur rôle, leur logique, et les technologies envisagées pour chacun. Il s'agit d'une vue d'ensemble de l'architecture modulaire et évolutive du système.

---

## 1. 📦 Protocole (`.bhe.json`, `.style.json`)

**Rôle** : Définir un format ouvert, humainement lisible, pour décrire les activités pédagogiques et leurs styles.

- Format : JSON
- Statique, portable, interopérable
- **Technos** : aucune dépendance, standard JSON pur

---

## 2. 📘 Modèle pédagogique (`ActivityModel`)

**Rôle** : Représenter les objets didactiques (ex. : questions, réponses, cibles, relations, règles de validation, feedbacks, etc.)

- Logique métier
- Contrôle de validité des données
- Transformations éventuelles
- **Technos** : JavaScript pur (ou `zod` / `ajv` pour validation JSON)

---

## 3. 🎨 Modèle visuel (`StyleModel`)

**Rôle** : Représenter les aspects visuels de l’activité (polices, couleurs, positionnement, layout…)

- Séparé du pédagogique pour une meilleure clarté
- Permet l’édition indépendante du style
- **Technos** : JSON + CSS / Tailwind / inline styles selon cible

---

## 4. 🖼️ Moteur de rendu (`ActivityRenderer`)

**Rôle** : Prendre un fichier `.bhe.json` (et son `.style.json`) et produire un affichage interactif dans le navigateur.

- Lecture seule
- UX fluide, rapide, intuitive
- **Technos** : Vanilla JS, ou Svelte/React pour version avancée

---

## 5. ✍️ Éditeur visuel (`ActivityEditor`)

**Rôle** : Permettre la création/modification d’activités via une interface visuelle.

- Gestion des objets pédagogiques et de style
- Drag & Drop, inline editing, templates, preview
- **Technos** : SvelteKit (proposé), ou React selon les cas

---

## 6. 🧠 Générateur dynamique (`ActivityFactory`)

**Rôle** : Générer automatiquement des activités à partir de données externes (CSV, base de données, Google Sheets…)

- Utilisé pour industrialiser la création de briques
- Peut combiner plusieurs modèles JSON pour créer un `.bhe.json`
- **Technos** : Node.js / Express / Supabase / Sheets API…

---

## 7. 🧪 Viewer statique (`ActivityViewer`)

**Rôle** : Permettre de visualiser une activité dans une page HTML autonome (par ex. dans GitHub Pages)

- Ultra léger, zéro dépendance
- Ne nécessite pas l’éditeur
- **Technos** : Web component, Vanilla JS

---

## 8. 📁 Gestion des fichiers

**Rôle** : Charger, sauvegarder, importer/exporter des activités et leurs styles.

- LocalStorage, fichier `.zip`, backend optionnel
- Intégré à l’éditeur mais peut être séparé
- **Technos** : Vanilla JS / IndexedDB / Capacitor (mobile)

---

## 💡 Notes transversales

- Tous les modules doivent rester **indépendants et réutilisables**.
- Chaque module peut évoluer séparément et être testé isolément.
- Le protocole `.bhe.json` reste le **pivot** autour duquel tout s’articule.

> "On ne construit pas une cathédrale d’un seul bloc. On assemble des pierres parfaites."

---

**Boost Hyper Engine** — Modularité, Liberté, Beauté ✨

