# SmartBank — Application FinTech (SPA)

SmartBank est un prototype d'application web FinTech développé en architecture SPA (Single Page Application). L'objectif est d'offrir une interface bancaire moderne et réactive permettant de centraliser la gestion de comptes, la simulation de crédit et l'accès à des offres exclusives.

---

## Fonctionnalités Principales

- **Tableau de Bord Financier** : Consultation des soldes (Compte Courant, Livret Épargne) et aperçu des transactions récentes.
- **Historique des Transactions** : Vue détaillée de l'historique bancaire avec filtrage et pagination.
- **Simulateur de Crédit** : Calcul interactif des mensualités et du coût global d'un prêt avec ajustement par curseurs.
- **Offres Flash** : Présentation d'opportunités financières promotionnelles avec compte à rebours.
- **Roue des Récompenses** : Module de fidélité interactif à 8 secteurs.
- **Gestion de Profil & Authentification** : Formulaires de connexion, d'inscription et d'édition des informations personnelles.

---

## Choix Techniques & Architecture

- **Langages Natifs** : HTML5, CSS3 natif et JavaScript (Vanilla JS). Aucun framework ni bibliothèque externe.
- **Architecture SPA** : Navigation fluide gérée par un routeur JS natif basé sur l'événement `hashchange`.
- **Structure HTML Minimale** : Fichier `index.html` léger contenant le conteneur principal `<div id="root"></div>`.
- **Organisation Modulaire** :
  - `src/components/` : Templates HTML statiques des vues.
  - `src/router/` : Gestion du routage et des routes 404.
  - `src/styles/` : Fichiers CSS découpés par composant avec variables globales.
  - `src/assets/` : Ressources graphiques et favicons.

---

## Arborescence du Projet

```text
smart-bank/
├── index.html
├── README.md
└── src/
    ├── app.js
    ├── assets/
    │   ├── favicon.png
    │   └── logo.jpg
    ├── components/
    │   ├── AuthView.js
    │   ├── DashboardView.js
    │   ├── Navbar.js
    │   ├── OffersView.js
    │   ├── ProfileView.js
    │   ├── RewardsView.js
    │   ├── SimulatorView.js
    │   └── TransactionsView.js
    ├── router/
    │   └── router.js
    └── styles/
        ├── auth.css
        ├── dashboard.css
        ├── main.css
        ├── navbar.css
        ├── offers.css
        ├── profile.css
        ├── rewards.css
        ├── simulator.css
        └── variables.css
```

---

## Installation & Lancement

1. Cloner ou télécharger le dépôt sur votre machine.
2. Ouvrir le fichier `index.html` dans n'importe quel navigateur web.
3. Pour un rechargement en direct lors du développement, ouvrir le dossier dans VS Code et utiliser l'extension **Live Server** ou exécuter `npx serve`.

---

## Suivi du Projet

La gestion et le suivi des tâches du projet ont été modélisés sur Jira (Epics, User Stories, Sub-tasks).
