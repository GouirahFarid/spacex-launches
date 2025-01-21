# SpaceX Launches Viewer

## Description
Une application Vue.js qui affiche les lancements SpaceX, permettant de visualiser les détails des lancements passés et à venir. L'application utilise l'API publique SpaceX.

## Technologies Utilisées
- Vue.js 3 (Composition API)
- TypeScript
- Tailwind CSS
- API SpaceX
- Vite
## Fonctionnalités
- Affichage du prochain lancement avec compte à rebours
- Liste des 10 derniers lancements
- Filtrage des lancements (tous/réussis/échoués)
- Modal détaillé pour chaque lancement
- Intégration vidéo YouTube
- Design responsive

## Configuration requise
- Node.js 16+
- NPM ou Yarn

## Installation et Développement Local

1. Cloner le projet
```bash
git clone https://github.com/GouirahFarid/spacex-launches.git
cd spacex-launches
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera disponible à l'adresse `http://localhost:5173`

4. Scripts disponibles
```bash
# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser la version de production
npm run preview

# Lancer les tests
npm run test

# Vérifier le formatage
npm run lint
```

## Structure du Projet
```
spacex-launches/
├── src/
│   ├── components/        # Composants Vue
│   ├── composables/       # Composables (hooks)
│   ├── types/            # Types TypeScript
│   ├── assets/           # Assets statiques
│   ├── App.vue           # Composant racine
│   └── main.ts           # Point d'entrée
├── public/               # Fichiers publics
├── index.html            # Template HTML
├── package.json          # Dépendances et scripts
├── tsconfig.json         # Configuration TypeScript
├── vite.config.ts        # Configuration Vite
└── tailwind.config.js    # Configuration Tailwind
```

## Notes
- L'API SpaceX a des limites de taux, surveiller la console pour les erreurs
- Les vidéos YouTube nécessitent une connexion Internet
- Le composant de compte à rebours se met à jour toutes les secondes
