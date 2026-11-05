# Tsihoharana — plan produit

## Objectif
Créer un site web indépendant de Facebook pour Tsihoharana, une assistante conversationnelle qui répond comme une amie, avec une vraie architecture de chat reliée à un modèle d’IA open source via une API compatible OpenAI. GitHub servira à conserver et publier le code ; l’API de chat restera côté serveur afin de ne jamais exposer une clé au navigateur.

## Architecture
- `client/src/pages/Home.tsx` : interface de conversation responsive, suggestions et états de chargement/erreur.
- `client/src/index.css` : direction artistique, responsive et identité visuelle inspirée de Madagascar.
- `server/_core/index.ts` : route `POST /api/chat`, validation basique et appel sécurisé vers un fournisseur open source (Hugging Face Router par défaut, modèle Qwen configurable), avec repli de développement vers le service LLM géré si disponible.
- `client/public/manus-routes.json` : déclaration de la route publique.
- `client/public/favicon.svg` : icône de chat avec le drapeau malgache.
- `app.config.ts` : logo du projet pour l’interface de gestion.

## Design choisi — atelier conversationnel malagasy
- **Mouvance** : éditorial numérique chaleureux, inspiré des carnets de conversation et des couleurs textiles malgaches.
- **Principes** : proximité humaine, clarté, calme, confiance.
- **Couleurs** : ivoire doux comme fond de papier, vert profond et rouge terre cuite issus du drapeau malgache, avec un jaune discret pour les accents.
- **Mise en page** : une colonne latérale de repères et une grande surface de chat, plutôt qu’une grille de cartes générique.
- **Signatures** : médaillon drapeau Madagascar + bulle, ligne verticale rouge/verte, micro-libellés éditoriaux.
- **Interaction** : une réponse courte et accueillante, suggestions cliquables, champ de message toujours visible, état « réfléchit » lisible.
- **Animation** : transitions courtes et douces ; aucun mouvement décoratif continu qui distrait la lecture.
- **Typographie** : système sans-serif avec titres très contrastés, texte aéré et chiffres tabulaires pour les métadonnées.
- **Essence** : une présence numérique malgache, rassurante et utile — chaleureuse, intelligente, respectueuse.
- **Voix** : simple, directe, encourageante. Exemples : « On peut regarder ça ensemble. » / « Je ne suis pas certaine, mais voici ce que je peux vérifier avec toi. »
- **Logo** : une bulle de dialogue dont le point est formé par les trois zones du drapeau malgache.
- **Couleur propriétaire** : vert ravinala profond `#17624f`.

## Fonctionnalités requises
- Nom et présentation de Tsihoharana visibles.
- Chat réellement branché à un modèle via le serveur, pas de réponses automatiques figées.
- Support français par défaut, avec adaptation au malgache et à l’anglais.
- Protection des clés API et limites simples sur les messages.
- Icône de chat inspirée du drapeau malgache.
- Site prêt pour checkpoint et transfert du dépôt vers GitHub.
