## Étape 1 : Préparer l'environnement

Vérification des versions Docker et Docker Compose :

Pour Docker :

```bash
docker --version
```
Pour Docker Compose :

```bash
docker-compose --version
```
![--version](/Job07/UNIT_SYMFONY/image/--version.png)

Et Composer :
```bash
composer --version
```
![--version](/Job07/UNIT_SYMFONY/image/composer.png)

Si Docker, Docker Compose et Composer sont correctement installés, tu pourras passer à la suite.

Installer Composer dans ton conteneur Docker

Accède à ton conteneur PHP via Docker :

Assure-toi d'être dans le répertoire où se trouve ton fichier docker-compose.yml, puis lance cette commande :

```bash
docker-compose up -d
```

```bash
cd UNIT_SYMFONY
docker-compose up -d
docker ps
```
![docker-compose up -d](/Job07/UNIT_SYMFONY/image/docker-compose.png)

```bash
docker exec -it symfony_app bash
```

![docker exec](/Job07/UNIT_SYMFONY/image/image3.png)

### Étape 1 : Installer Composer dans le conteneur

Mettre à jour les paquets du conteneur : Dans le conteneur symfony_app, commence par mettre à jour les paquets disponibles et installer les dépendances nécessaires :

```bash
apt-get update && apt-get install -y curl unzip git
```
![apt-get update && apt-get install](/Job07/UNIT_SYMFONY/image/image4.png)

Télécharger et installer Composer : Ensuite, utilise la commande suivante pour télécharger Composer et l'installer dans le conteneur :

```bash
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```
![curl -sS](/Job07/UNIT_SYMFONY/image/image5.png)

Ces commandes téléchargent l'installateur de Composer et le déplacent dans un répertoire où il sera accessible en tant que commande composer.

### Étape 2 : Installer Symfony dans le conteneur

Une fois Composer installé, tu peux maintenant installer Symfony. Utilise la commande suivante pour créer un projet Symfony dans le conteneur :

```bash
composer create-project symfony/website-skeleton app
```
![composer create-project](/Job07/UNIT_SYMFONY/image/image6.png)

Cela va installer Symfony dans le dossier app à l'intérieur du conteneur.

### Étape 3 : Accéder à l'application Symfony

Une fois l'installation de Symfony terminée, tu peux vérifier si ton application fonctionne en accédant à http://localhost:8080 dans ton navigateur.







# Projet Symfony avec Docker

Ce projet est une application Symfony configurée pour tourner dans un environnement Docker. Ce guide documente les étapes nécessaires pour faire tourner l'application sur un serveur local avec Docker.

### Prérequis

- Docker et Docker Compose doivent être installés sur votre machine.
- Composer doit être installé dans le conteneur Symfony.

### Installation

1. Cloner ce projet

```bash
git clone <URL du dépôt Git>
cd <nom du dossier du projet>
```

2. Construire et démarrer les conteneurs Docker
```bash
docker-compose up -d --build
```
Cette commande va reconstruire les conteneurs si nécessaire et les démarrer en arrière-plan.

3. Accéder à l'application Symfony

Une fois les conteneurs démarrés, tu peux accéder à l'application Symfony via ton navigateur à l'adresse suivante :

http://localhost:8080

4. Accéder à PhpMyAdmin et Adminer (facultatif)

PhpMyAdmin : http://localhost:8082
Adminer : http://localhost:8081
Cela te permet de gérer ta base de données MySQL directement via l'interface.

### Configuration

1. Nginx
Le fichier de configuration Nginx est situé dans le dossier nginx/default.conf. Il a été configuré pour utiliser le dossier public/ de Symfony comme racine du site et rediriger les requêtes PHP vers le conteneur symfony_app via FastCGI.

2. Base de données
Le projet utilise MySQL comme base de données, et les informations de connexion sont stockées dans le fichier .env de Symfony.

Commandes utiles

Vider le cache Symfony :

```bash
docker exec -it symfony_app php bin/console cache:clear
```

Démarrer le serveur Symfony localement :

Si tu veux tester l'application sans Nginx, tu peux démarrer le serveur Symfony localement :

```bash
docker exec -it symfony_app php bin/console server:start 0.0.0.0:8000
```
Accède à l'application à http://localhost:8000.

## Problèmes courants

Problème 504 Gateway Timeout : Si tu obtiens un message "504 Gateway Timeout", cela signifie généralement que Nginx ne parvient pas à communiquer avec le serveur PHP. Vérifie que le conteneur symfony_app fonctionne correctement et que les ports sont correctement mappés.
