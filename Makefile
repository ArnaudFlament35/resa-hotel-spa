## ============================================================
## Makefile — Resa Hotel & Spa
## Commandes raccourcies pour le développement quotidien
##
## Usage : make <commande>
## ============================================================

.PHONY: help up down restart shell db-shell logs \
        cc composer npm-install npm-dev npm-build \
        migration migrate fixtures

# Commande par défaut : afficher l'aide
help:
	@echo ""
	@echo "  Commandes disponibles :"
	@echo ""
	@echo "  Docker"
	@echo "    make up          — Démarrer tous les containers"
	@echo "    make down        — Arrêter et supprimer les containers"
	@echo "    make restart     — Redémarrer les containers"
	@echo "    make logs        — Voir les logs en temps réel"
	@echo "    make shell       — Ouvrir un shell dans le container PHP"
	@echo "    make db-shell    — Ouvrir un shell MySQL"
	@echo ""
	@echo "  Symfony"
	@echo "    make cc          — Vider le cache Symfony"
	@echo "    make migration   — Créer une nouvelle migration Doctrine"
	@echo "    make migrate     — Exécuter les migrations"
	@echo "    make fixtures    — Charger les données de test"
	@echo ""
	@echo "  Assets (React / Webpack)"
	@echo "    make npm-install — Installer les dépendances Node"
	@echo "    make npm-dev     — Compiler les assets (dev)"
	@echo "    make npm-build   — Compiler les assets (production)"
	@echo ""

# ---- Docker ----
up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

shell:
	docker compose exec php bash

db-shell:
	docker compose exec db mysql -u resa_user -presa_password resa_hotel

# ---- Symfony ----
cc:
	docker compose exec php php bin/console cache:clear

migration:
	docker compose exec php php bin/console make:migration

migrate:
	docker compose exec php php bin/console doctrine:migrations:migrate --no-interaction

fixtures:
	docker compose exec php php bin/console doctrine:fixtures:load --no-interaction

# ---- Assets Node ----
npm-install:
	docker compose run --rm node npm install

npm-dev:
	docker compose run --rm node npm run dev

npm-build:
	docker compose run --rm node npm run build

npm-watch:
	docker compose run --rm node npm run watch
