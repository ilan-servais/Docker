# 🎼 Projet Symfony avec Docker

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

![homepage Symfony](/Job07/UNIT_SYMFONY/image/image7.png)

## Structure du Projet

Voici la structure de dossiers du projet :

![structure de dossiers Symfony](/Job07/UNIT_SYMFONY/image/image8.png)


#### Notes supplémentaires

Nginx : Si tu rencontres des problèmes d'accès ou des erreurs 504, vérifie la configuration de Nginx et assure-toi que le fichier default.conf dans le dossier nginx/ pointe bien vers le bon dossier public/ de Symfony.

Base de données : Si tu utilises une base de données MySQL, assure-toi que la connexion est correctement configurée dans le fichier .env de Symfony.


## Autre commande possible qui installe une autre forme de projet Symfony

Nous avons déjà parlé de l'installation via symfony/website-skeleton, qui est l'option la plus courante.
Une autre commande possible est l'installation via symfony/skeleton. Cette commande installe un projet très minimal, à partir duquel tu peux ajouter manuellement les composants dont tu as besoin.

Commande alternative :

```bash
composer create-project symfony/skeleton app
```

Cela installe uniquement les composants de base, comme symfony/framework-bundle, sans fonctionnalités supplémentaires. Tu devras ajouter manuellement des bundles comme Twig, Doctrine, etc., si tu en as besoin.

Différence entre les deux commandes :

symfony/website-skeleton : Installe un projet plus complet, avec des bundles comme Twig, Doctrine, et une configuration prête à l'emploi pour un site web.

symfony/skeleton : Installe une base minimale de Symfony, ce qui te permet d'ajouter uniquement les composants dont tu as besoin, avec une personnalisation plus fine.

L'installation via symfony/website-skeleton installe un projet prêt à l'emploi avec une configuration par défaut. Tu obtiens immédiatement des outils comme Twig (pour le templating) et Doctrine (pour la base de données).

L'installation via symfony/skeleton, en revanche, te donne un projet vide avec juste les dépendances de base, comme symfony/framework-bundle. Il te faudra ajouter chaque composant manuellement, ce qui peut être plus flexible mais aussi plus long.

Exemple de commandes pour tester la différence :

Installation avec symfony/website-skeleton :

```bash
composer create-project symfony/website-skeleton project_website
```
Inclut Twig, Doctrine et d'autres configurations prêtes à l'emploi.

Installation avec symfony/skeleton :

```bash
composer create-project symfony/skeleton project_skeleton
```
L'installation via symfony/website-skeleton installe un projet prêt à l'emploi avec une configuration par défaut. Tu obtiens immédiatement des outils comme Twig (pour le templating) et Doctrine (pour la base de données).

L'installation via symfony/skeleton, en revanche, te donne un projet vide avec juste les dépendances de base, comme symfony/framework-bundle. 
Il te faudra ajouter chaque composant manuellement, ce qui peut être plus flexible mais aussi plus long.

Exemple de commandes pour tester la différence :

Installation avec symfony/website-skeleton :
```bash
composer create-project symfony/website-skeleton project_website
```
Inclut Twig, Doctrine et d'autres configurations prêtes à l'emploi.

Installation avec symfony/skeleton :
```bash
composer create-project symfony/skeleton project_skeleton
```
Un projet minimal, sans composants supplémentaires.
