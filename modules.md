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




🧱 Voici les grandes parties du projet (avec une proposition de séparation nette)
| Module         | Rôle                             | Spécificité   | Techno recommandée |
|-------------|-----------------------------------------|------------------------------|--------|
| 🧠 1. Protocole | Définition du format .bhe.json / .style.json        | Pure donnée (JSON) | Aucun framework — c’est un standard |
| 📘 2. Objets didactiques | Représentation logique d’une activité | Validation, feedback, scoring, etc. | Vanilla JS ou lib utilitaire type zod / ajv pour validation |
| 🎨 3. Objets d’affichage | Style, layout, position, animations | Design visuel, transitions | JSON + moteur CSS (custom ou Tailwind) |
| 🖥️ 4. Moteur de rendu | Affiche une activité (lecture seule) | Dynamique, léger, rapide | Vanilla JS pour les démos simples / Svelte pour la suite |
| ✍️ 5. Éditeur visuel | Créer/modifier des activités via une UI | Complexité, drag & drop, multi-étapes | Svelte ou React (selon appétence) |
| 🔄 6. Générateur dynamique | Fabriquer des .bhe.json depuis une base de données | Accès distant, templates, CSV, etc. | Node.js / Express / Supabase / Google Sheets API… |
| 📦 7. Packager / Viewer public | Lire un .bhe.json statique (GitHub Pages, LMS, etc.) | Ultra léger, sans interactivité complexe | Web Component ou mini Vanilla JS |
| 📁 8. Gestion des fichiers / import/export | Charger, sauvegarder, partager | Fichiers, localStorage, backend optionnel | Vanilla JS ou IndexedDB (ou Capacitor si mobile) |

🧠 Interprétation
Tu peux coder les objets métier (ActivityModel, etc.) en Vanilla JS, et ils seront réutilisables dans n’importe quel framework.

Tu peux avoir un éditeur en Svelte, qui charge une activité depuis .bhe.json, modifie les données, et les passe à un composant ActivityRenderer.

Le moteur de rendu pourrait exister en 2 versions :

un rendu simple Vanilla JS pour l’export dans une page statique (HTML pur)

un rendu complet avec transitions + preview en direct pour l’éditeur

Le protocole, lui, reste techno-agnostique : c’est notre standard JSON.

🧪 À court terme (ta roadmap sur 1 à 2 semaines) :
| Étape         | Action                             | Techno      |
|-------------|-----------------------------------------|-------------|
| ✅ 1. Spécifier les modèles .bhe.json et .style.json | Markdown / JSON   | Aucun |
| ✅ 2. Prototyper 3 activités simples avec rendu JS | Vanilla JS | Aucun |
| 🔜 3. Séparer ActivityModel / ActivityRenderer | Vanilla JS modulaire | Aucun |
| 🔜 4. Créer une base éditeur (SvelteKit ?) | Svelte | Oui |
| 🔜 5. Créer un viewer simple (export HTML static) | Web component ou JS simple | Aucun |
| 🔜 6. Gérer des templates dynamiques | Node + JSON templates | Optionnel |
