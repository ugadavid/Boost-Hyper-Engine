# 🎨 Guide des styles Boost Hyper Engine

## ✨ Objectif

Ce document présente la manière dont sont gérés les styles visuels dans Boost Hyper Engine. Il explique la structure attendue, les valeurs autorisées, les fichiers utilisés, et les conventions en vigueur.

---

## 📋 Structure dans `.bhe.json`

Chaque activité peut inclure une clé `"style"` dans son fichier `.bhe.json`, qui définit la **source de style à utiliser**.

### Exemples :
```json
"style": {
  "source": "boost-light"
}
```
```json
"style": {
  "source": "zenith-ice"
}
```
```json
"style": {
  "source": "manual"
}
```

---

## 🌐 Types de style supportés

### 1. Thèmes pré-définis

Des styles partagés, disponibles pour toutes les activités.

| Nom         | Description                             |
|-------------|-----------------------------------------|
| boost-light | Style clair, moderne, accessible        |
| boost-dark  | Version sombre pour le confort visuel   |
| zenith-ice  | Style glacial, épuré, "David-certified" |
| gpt-tastes  | Look inspiré par le minimalisme de GPT   |

Ces styles sont définis dans des fichiers comme :
```
/style/boost-light.style.json
/style/zenith-ice.style.json
```

### 2. Mode "manual"

Si `"source": "manual"`, alors le moteur cherche automatiquement un fichier portant le **même nom** que le fichier `.bhe.json`, mais avec l'extension `.style.json` dans le dossier `/style/`.

#### Exemple
- `drag-drop.bhe.json`
- → `/style/drag-drop.style.json`

> Ce mode permet une personnalisation poussée, sans alourdir le fichier pédagogique.

---

## 💡 Structure d’un fichier `.style.json`

```json
{
  "layout": "manual",
  "global": {
    "fontFamily": "Inter",
    "fontSize": "16px",
    "accentColor": "#4A90E2",
    "background": "#FFFFFF",
    "textColor": "#333333",
    "borderRadius": "8px"
  },
  "items": {
    "default": {
      "backgroundColor": "#F2F2F2",
      "hoverEffect": "lift",
      "shadow": "soft"
    },
    "i1": { "x": 50, "y": 300 },
    "i2": { "x": 140, "y": 300 }
  },
  "targets": {
    "default": {
      "border": "dashed",
      "highlightOnHover": true
    },
    "t1": { "x": 50, "y": 100 },
    "t2": { "x": 140, "y": 100 }
  }
}
```

---

## ✏️ Règles éditoriales et recommandations

- Toujours **séparer le fond et la forme** : `.bhe.json` pour le contenu, `.style.json` pour le visuel.
- Privilégier des noms de styles **cohérents et explicites**.
- Ne jamais mêler des valeurs CSS brutes à des champs pédagogiques.
- Penser à l'accessibilité (contrastes, tailles, etc.) dans chaque thème.
- Tous les fichiers `.style.json` doivent être placés dans `/style/`

---

## ✨ En construction

Ce système évoluera avec les retours utilisateurs.  
De nouveaux styles pré-définis seront ajoutés au fil du temps.

> Prochaines idées de styles : `pastel-dreams`, `classroom-classic`, `pixel-punk`, `dark-mint`

---

**Boost Hyper Engine. Créer. Styliser. Propulser.**

