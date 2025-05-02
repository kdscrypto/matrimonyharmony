
# Guide de déploiement sur Netlify

Ce guide vous accompagne pas à pas dans le déploiement de votre site de mariage sur Netlify.

## Étape 1: Connexion à Netlify

1. Créez un compte sur [Netlify](https://www.netlify.com/) si vous n'en avez pas déjà un.
2. Une fois connecté, cliquez sur "Add new site" puis "Import an existing project".

## Étape 2: Connexion à GitHub

1. Sélectionnez "Deploy with GitHub".
2. Autorisez Netlify à accéder à votre compte GitHub.
3. Sélectionnez le dépôt de votre site de mariage.

## Étape 3: Configuration du déploiement

1. Vérifiez que les paramètres suivants sont configurés (ils devraient être automatiquement détectés grâce au fichier netlify.toml):
   - **Base directory**: (laissez vide sauf si votre projet est dans un sous-dossier)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

2. **IMPORTANT**: Configurez les variables d'environnement Supabase dans les paramètres du site:
   - Allez dans "Site settings" > "Build & deploy" > "Environment"
   - Ajoutez les variables suivantes:
     - `VITE_SUPABASE_URL`: https://uuobemgckdcqponviyjk.supabase.co
     - `VITE_SUPABASE_ANON_KEY`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1b2JlbWdja2RjcXBvbnZpeWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MzgxNDYsImV4cCI6MjA1ODQxNDE0Nn0.gZxDM26HF-1AuXNTwSapo3U_bCndbJmMgmFtV8lmCUI

## Étape 4: Déploiement

1. Cliquez sur "Deploy site" pour lancer le déploiement initial.
2. Netlify va construire et déployer votre site. Cela peut prendre quelques minutes.

## Étape 5: Personnalisation du domaine

1. Une fois le déploiement réussi, allez dans "Domain settings".
2. Vous pouvez:
   - Personnaliser votre sous-domaine Netlify (par défaut: random-name.netlify.app)
   - Ou connecter votre propre domaine en cliquant sur "Add custom domain"

## Étape 6: Vérification

1. Visitez l'URL de votre site pour vérifier que tout fonctionne correctement.
2. Testez la navigation pour vous assurer que les routes React Router fonctionnent.
3. Vérifiez que les fonctionnalités Supabase (comme le RSVP) fonctionnent correctement.

## Déploiements futurs

- Chaque fois que vous poussez des modifications vers la branche principale de votre dépôt GitHub, Netlify déploiera automatiquement les changements.
- Vous pouvez suivre l'état des déploiements dans l'interface Netlify.

