# Guide de déploiement - SpaceX Launches Viewer

## Prérequis
- Node.js 16+ installé
- NPM ou Yarn comme gestionnaire de paquets
- Git installé (pour le clonage du dépôt)

## Installation et configuration locale

1. Cloner le dépôt
   ```bash
   git clone https://github.com/GouirahFarid/spacex-launches.git
   cd spacex-launches
   ```

2. Installer les dépendances
   ```bash
   npm install
   # ou avec Yarn
   yarn install
   ```

3. Configurer les variables d'environnement (si nécessaire)
    - Créer un fichier `.env` à la racine du projet si nécessaire
    - Pour l'instant, aucune variable d'environnement n'est requise car l'API SpaceX est publique

4. Lancer l'application en mode développement
   ```bash
   npm run dev
   # ou avec Yarn
   yarn dev
   ```

## Construction pour la production

1. Créer une version de production
   ```bash
   npm run build
   # ou avec Yarn
   yarn build
   ```

2. Tester la version de production localement
   ```bash
   npm run preview
   # ou avec Yarn
   yarn preview
   ```

## Déploiement

###  Hébergement statique (Recommandé)

Le projet étant une application Vue.js statique, il peut être déployé sur n'importe quel hébergeur de sites statiques :

#### Netlify
1. Créer un compte sur Netlify
2. Connecter votre dépôt GitHub
3. Configurer les paramètres de build :
    - Build command: `npm run build`
    - Publish directory: `dist`

#### Vercel
1. Créer un compte sur Vercel
2. Importer le projet depuis GitHub
3. Les paramètres de build seront automatiquement détectés

#### GitHub Pages
1. Dans votre `vite.config.ts`, ajouter la base URL :
   ```typescript
   export default defineConfig({
     base: '/nom-du-repo/',
     // ... reste de la configuration
   })
   ```
2. Configurer GitHub Actions pour le déploiement automatique


## Notes importantes

- L'application utilise l'API publique de SpaceX qui ne nécessite pas d'authentification
- Les requêtes à l'API sont limitées, pensez à mettre en place un système de cache si nécessaire
- L'application est responsive et optimisée pour mobile
- Les animations et transitions sont gérées par CSS
- Tailwind CSS est utilisé pour le style

## Support

Pour toute question ou problème :
- Ouvrir une issue sur le dépôt GitHub

## Mises à jour

Pour mettre à jour l'application :
1. Tirer les dernières modifications
   ```bash
   git pull origin main
   ```
2. Installer les nouvelles dépendances
   ```bash
   npm install
   ```
3. Reconstruire l'application
   ```bash
   npm run build
   ```
4. Redéployer selon la méthode choisie ci-dessus
