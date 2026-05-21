# Resa Hotel & Spa — Plateforme de réservation

Application Symfony 7.4 avec Docker, React (Webpack Encore), et API REST.

## Architecture

```
/                   → Frontend public (Twig + React)
  /reservation      → Tunnel de réservation
/admin              → Backend de gestion (Twig)
  /admin/devis      → Gestion des devis
/api                → API REST (sites partenaires)
  /api/prices       → Tarifs disponibles
  /api/hotels       → Liste des hôtels
  /api/soins        → Soins spa/thalasso
```

## Démarrage rapide

### 1. Prérequis
- Docker Desktop
- Node.js 20+ (pour les assets en local)

### 2. Lancer l'environnement Docker

```bash
make up
```

Accès :
| Service       | URL                          |
|---------------|------------------------------|
| Application   | http://localhost:8080        |
| phpMyAdmin    | http://localhost:8081        |
| MailHog       | http://localhost:8025        |

### 3. Créer la base de données

```bash
make migrate
```

### 4. Compiler les assets (React + CSS)

```bash
# En local (sans Docker)
npm run dev        # compilation unique
npm run watch      # recompilation automatique

# Via Docker
make npm-dev       # compilation unique
make npm-watch     # recompilation automatique
```

## Commandes utiles

```bash
make shell         # Shell dans le container PHP
make cc            # Vider le cache Symfony
make migration     # Créer une migration Doctrine
make migrate       # Appliquer les migrations
make fixtures      # Charger les données de test
make logs          # Voir les logs Docker
```

## Structure du projet

```
assets/
  app.js              → Point d'entrée frontend (React)
  backend.js          → Point d'entrée backend admin
  styles/
    app.css           → CSS frontend
    backend.css       → CSS admin
  react/
    mount.js          → Monte automatiquement les composants React
    components/
      SearchWidget.jsx    → Widget recherche (page d'accueil)
      BookingSearch.jsx   → Formulaire recherche complet
      BookingCart.jsx     → Tunnel de commande (panier → confirmation)

src/
  Controller/
    Frontend/         → Routes publiques (/)
    Backend/          → Routes admin (/admin)
    Api/              → Routes API (/api)
  Entity/             → Entités Doctrine (à créer)
  Repository/         → Repositories Doctrine (à créer)
  Form/               → Formulaires Symfony (à créer)
  Service/            → Services métier (à créer)

templates/
  frontend/layout/    → Layout Twig frontend
  frontend/pages/     → Pages publiques (accueil, login)
  frontend/booking/   → Tunnel de réservation
  backend/layout/     → Layout Twig admin (sidebar)
  backend/pages/      → Pages admin (dashboard, devis...)

docker/
  nginx/default.conf  → Config Nginx
  php/Dockerfile      → Image PHP 8.3 FPM
  php/php.ini         → Config PHP

config/
  packages/           → Configuration des bundles Symfony
  routes.yaml         → Routes chargées depuis src/Controller/
```

## Comment ajouter un composant React

1. Créer un fichier dans `assets/react/components/MonComposant.jsx`
2. L'enregistrer dans `assets/react/mount.js`
3. Dans le template Twig, ajouter :
   ```twig
   <div data-component="MonComposant" data-ma-prop="valeur"></div>
   ```
4. Recompiler : `npm run watch`

## Entités à créer (prochaines étapes)

Utiliser `make shell` puis `php bin/console make:entity` pour créer :
- `Hotel` — établissement (nom, classement, adresse, contraintes)
- `Room` — chambre (type, capacité, stock)
- `SpaTreatment` — soin spa/thalasso (nom, durée, prix)
- `Stay` — séjour packagé (hôtel + soins)
- `Quote` — devis client
- `Contract` — contrat (issu d'un devis validé)
- `User` — utilisateur (admin ou client)
