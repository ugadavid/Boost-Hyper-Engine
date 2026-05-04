# 🚀 Boost Hyper Engine — Guide Développeur

Ce document décrit comment installer, compiler et contribuer au moteur **BHE** côté développeur.  
Pour la vision globale et la philosophie, voir le [README principal](./README.md).

---

## 📂 Structure du projet

Boost Hyper Engine/
│
├── bhec/ # Code source TypeScript
│ ├── boost-hyper-engine-core/ # modèles abstraits & spécifiques
│ ├── renderer/ # moteur de rendu
│ └── demo/ # bac à sable pour tester les activités
│
├── protocole/ # Exemples d’activités (.bhe.json)
├── style/ # Exemples de styles (.style.json)
│
├── images/ # Images & assets
├── Word/ # Documents Word (ignorés dans Git)
├── hello-ts/ # Premiers tests TypeScript (ignorés dans Git)
├── model-ts/ # Autres essais TypeScript (ignorés dans Git)
│
├── dist/ # Fichiers JS compilés (auto-généré)
├── node_modules/ # Dépendances Node.js (auto-généré)
│
├── package.json # Définition du projet + scripts
├── tsconfig.json # Configuration TypeScript
├── .gitignore # Ignore dist, node_modules, tests…
└── README.md # README principal (vision, manifeste)


---

## 🛠️ Installation

1. Cloner le projet :  
   ```bash
   git clone https://github.com/ugadavid/Boost-Hyper-Engine.git
   cd Boost-Hyper-Engine

npm install

🔨 Compilation

Compiler tout le projet TypeScript → JavaScript :
npm run build

Les fichiers compilés sont générés dans /dist.

⚡ Exécution en mode dev

Lancer directement un fichier TypeScript (ex. la démo) sans compiler :

npm run start

👉 Par défaut, ça exécute bhec/demo/index.ts.

🧪 Tester le rendu

1. Compiler le projet (npm run build).
2. Ouvrir bhec/demo/index.html dans un navigateur (via un petit serveur statique comme npx serve bhec/demo).
3. Jouer avec les activités (drag & drop, etc.).

🧹 Nettoyer

Supprimer le dossier dist :

npm run clean

🤝 Contribution

Tout code doit être écrit en TypeScript (pas de JS brut dans bhec/).

Le contenu pédagogique (.bhe.json, .style.json) doit rester séparé du code.

Chaque nouvelle activité doit avoir son modèle TS et un exemple JSON.


✨ Bon dev avec Boost Hyper Engine ✨





