# Projet Web – Gestion des Associations et Utilisateurs

## Introduction

Ce projet vise à développer une application web pour la gestion des associations et des utilisateurs. Il se compose de deux parties principales :

- **Backend** : Développé avec NestJS et SQLite, il fournit des services robustes et des APIs pour la gestion des entités.
- **Frontend** : Construit avec Angular, il propose une interface utilisateur intuitive pour interagir avec le backend.

---

## 🧩 Partie Backend

### Objectifs

- CRUD pour les entités : Create, Read, Update, Delete
- Gestion des relations : Clés composites et relations complexes
- APIs spécifiques : Endpoints adaptés à des cas particuliers
- Résolution des dépendances cycliques : Utilisation de `forwardRef()`

### Technologies utilisées

- **Framework** : NestJS
- **Base de données** : SQLite
- **Langage** : TypeScript
- **Documentation API** : Swagger

### Lancement du backend

```bash
npm install
npm run start
###Accéder à la documentation : http://localhost:3000/api

Entités et Relations
Users : Utilisateurs avec id, nom

Associations : Groupes d'utilisateurs

Rôles : Rôle d’un utilisateur dans une association (clés composites)

Procès-verbaux (Minutes) : Comptes rendus d’AG, liés à des utilisateurs et associations

Exemple d’API CRUD
Users
GET /users

POST /users

PUT /users/:id

DELETE /users/:id

###Associations
Même logique que les utilisateurs

Rôles & Minutes
Endpoints personnalisés

Résolution des dépendances cycliques
Utilisation de forwardRef() entre UsersModule, RolesModule, etc.

Tests et Validation
Tests API via des scripts (dev_specific_apis.sh)

### Partie Frontend
Outils utilisés
Node.js

Angular CLI (npm install -g @angular/cli)

Visual Studio Code

###Lancement du frontend
bash
Copier
Modifier
npm install
ng serve
### Accéder à l’application : http://localhost:4200

Fonctionnalités principales
Authentification
Page de connexion (JWT stocké dans localStorage)

Déconnexion (suppression du JWT, redirection)

###Gestion des utilisateurs
Affichage, ajout, modification, suppression

###Gestion des associations
Création, édition, suppression

Architecture & Technologies
Angular Material : UI moderne

HTTP Client : Communication avec le backend

Guards : Protection des routes (AuthGuard)

🗂️ Rest API Diagram & Architecture
Cette architecture permet de lier :

Plusieurs utilisateurs ↔ plusieurs associations

Plusieurs utilisateurs ↔ plusieurs minutes (votes)

Minutes, rôles, événements → liés à une association

📘 API & Swagger
L’API REST est conçue pour refléter la structure de la base de données. La documentation Swagger permet de tester et comprendre facilement les endpoints.

🔁 Workflow
Diagramme visuel du fonctionnement entre les entités, utilisateurs, rôles, et API. (Peut être inséré sous forme d’image ![alt text](lien_image))

📌 Exemple de code
Routes Angular
ts
Copier
Modifier
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] }
];
Requêtes HTTP
ts
Copier
Modifier
this.http.get('http://localhost:3000/users').subscribe(
  data => this.dataSource = data,
  error => console.error('Erreur:', error)
);
### Tests
Tests automatiques : Angular CLI

###Tests manuels : Authentification, requêtes CRUD, navigation

###Conclusion
Ce projet propose une solution complète pour gérer les associations et les utilisateurs :

Backend robuste avec NestJS & SQLite

Frontend moderne avec Angular & Material

🧪 Commandes utiles
bash
Copier
Modifier
# Ajouter un utilisateur
curl -X POST -d 'firstname=Jane&lastname=Doe' http://localhost:3000/users/

# Voir tous les utilisateurs
curl http://localhost:3000/users

# Modifier un utilisateur
curl -X PUT -d 'firstname=Jane' http://localhost:3000/users/0

# Supprimer un utilisateur
curl -X DELETE http://localhost:3000/users/0
