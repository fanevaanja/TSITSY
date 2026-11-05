# Tsihoharana — livrables

## Interface publique de conversation
- [ ] Le site affiche le nom Tsihoharana et la présente comme une assistante amicale, intelligente et respectueuse.
- [ ] Le visiteur dispose d’une zone de conversation lisible, d’un champ de saisie, d’un bouton d’envoi et de suggestions de questions.
- [ ] L’interface est utilisable sur mobile et ordinateur, avec un état de réflexion et un message d’erreur récupérable.

## Identité malgache
- [ ] Une icône de chat inspirée du drapeau malgache est visible dans l’en-tête et le favicon.
- [ ] L’identité visuelle utilise une palette ivoire, vert profond et rouge terre cuite sans afficher de données privées inutiles.

## Vraie connexion IA
- [ ] `POST /api/chat` transmet les messages à un fournisseur de modèle open source via une clé serveur non exposée au navigateur.
- [ ] Le fournisseur, l’URL et le modèle sont configurables par variables d’environnement ; Qwen via Hugging Face Router est la valeur par défaut documentée.
- [ ] L’assistante répond en français par défaut et peut s’adapter au malgache ou à l’anglais.
- [ ] Les entrées sont limitées et les erreurs du fournisseur sont renvoyées sans divulguer de secret.

## Publication et transfert
- [ ] La route `/` est déclarée dans `manus-routes.json`.
- [ ] Le projet possède une configuration de build serveur compatible avec une publication.
- [ ] Le dépôt peut être transféré vers GitHub après confirmation du propriétaire ; aucune clé secrète n’est committée.
