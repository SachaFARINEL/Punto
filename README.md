# Punto

### Lancer le projet :

1. L'ensemble du projet est sur Docker et utilise **NodeJs**. Il faut donc télécharger DockerDesktop : https://www.docker.com/products/docker-desktop/
2. Lancer DockerDesktop
3. Dans un terminal, rendez-vous à la racine du dossier "**Punto**"
4. Entrer la commande : `npm install`
4. Entrer la commande : `docker compose up -d --build`
5. Quand la commande est finie, vous pouvez vous rendre sur : http://localhost:3000/
6. Si vous le souhaitez, un utilisateur est déjà créé : farinel.sacha@gmail.com // test

### Lancer les tests :

1. Il faut se rendre à la racine du dossier : **punto_back**
2. Pour lancer les tests unitaires, il suffit de faire la commande : `npm run test` *(les tests sont disponibles dans /tests)*
3. Quelques tests de montée en charge sont disponible dans **/scripts/loadTesting**. Pour les lancer : `artillery run scripts/loadTesting/$(nomDuScript)`
4. Un exemple de test de montée en charge sur la création d'utilisateurs : `artillery run scripts/loadTesting/createUser.yaml`

### Fonctionnalités et compétences attendues en NodeJS :

1. [x] Un plateau graphique et un ensemble de cartes
2. [ ] Un fonctionnement exact des règles du jeu avec des événements à gérer
3. [x] Un système d'inscription
4. [ ] Un système multijoueur
5. [x] Un packaging parfait et expliqué *(l'installation doit être détaillée dans le rapport)*
6. [x] Des commentaires
7. [x] Des tests documentés *(unitaires, montée en charge)*
8. [x] Gestion de l'historique des parties
9. [x] Mise en place d'une ou plusieurs API *(accès à la base, gestion d'une partie, distribution des cartes aléatoirement, ...)*
10. [x] Séparation back-end / front-end documentée
11. [x] Utilisation de REACT ou équivalent (justifier chaque techno)
12. [x] Documentation et description de fonctionnalités spécifiques à nodejs et react *(promise, routage)*
13. [ ] BONUS : mise en place de joueurs gérés par une IA basée sur node

### Fonctionnalités et compétences attendues en NoSQL :

1. [x] Description packaging et installation d'un serveur Mongodb
2. [x] Décrire la/les bases et la/les collections utililes *(gestion du jeu, gestion de l'historique)*
3. [x] Création et description des schémas *(les schémas doivent être riches)*
4. [x] Description des procédures de sauvegarde / transferts des données
5. [ ] Réalisation et description d'une 20ène de requêtes de sélection avec des niveaux de difficultés différents *(filtrage, projection, aggregate)*
6. [ ] Réalisation et description d'une 10ène de requêtes de modifications/suppressions avec des niveaux de difficultés différents
7. [ ] Réalisations et description d'une 10ène de scripts nodejs connectés à la base *(scripts d'administration, requêtes, tests)*
8. [ ] Réalisations, démonstrations et documentation du concept d'index
9. [ ] BONUS : comparaison avec une base SQL, à la fois en termes de structure *(normalisé/dénormalisé)* et en terme d'efficacité *(tests d'accès/modification sur des données générées en masse)*