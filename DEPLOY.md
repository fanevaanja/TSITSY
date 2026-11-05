# Déployer Tsihoharana hors Manus

Le dépôt peut être transféré vers GitHub puis importé dans Render comme Web Service. Le fichier `render.yaml` configure déjà le Dockerfile, le port, la route de santé et les variables du modèle open source.

Dans Render, connecter le dépôt GitHub, créer le service depuis le Blueprint, puis ajouter la clé du fournisseur open source dans `OPEN_SOURCE_AI_API_KEY` depuis le tableau de bord Render. Le modèle par défaut est `Qwen/Qwen2.5-7B-Instruct` via une API compatible OpenAI ; l’URL et le modèle peuvent être changés sans modifier le code.

Pour un domaine personnalisé, ajouter le domaine dans Render, puis créer l’enregistrement DNS demandé chez le registrar. Render fournit et renouvelle automatiquement le certificat TLS.

Ne jamais ajouter une clé API à GitHub, à `render.yaml` ou au code navigateur.
