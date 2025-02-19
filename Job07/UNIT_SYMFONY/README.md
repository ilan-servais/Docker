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

UNIT_SYMFONY/
├── app/                      # Dossier contenant les fichiers Symfony  
│   ├── bin/                  # Fichiers d'exécution Symfony (bin/console, etc.)  
│   ├── config/               # Fichiers de configuration Symfony  
│   ├── public/               # Dossier public contenant index.php et les assets (images, JS, CSS)  
│   ├── src/                  # Code source de l'application (Controllers, Entity, etc.)  
│   ├── templates/            # Templates Twig  
│   ├── translations/         # Fichiers de traduction  
│   ├── var/                  # Dossier de cache, logs, etc.  
│   ├── vendor/               # Dépendances installées via Composer  
│   ├── .env                  # Fichier de configuration de l'environnement  
│   ├── .env.dev              # Fichier de configuration spécifique au développement  
│   ├── .env.test             # Fichier de configuration pour les tests  
│   ├── composer.json         # Dépendances du projet  
│   ├── composer.lock         # Lock des versions de dépendances  
│   └── symfony.lock          # Fichier de verrouillage de Symfony  
├── docker-compose.yml        # Configuration de Docker et des conteneurs  
├── Dockerfile                # Dockerfile pour le conteneur PHP (symfony_app)  
├── nginx/                    # Configuration de Nginx  
│   └── default.conf          # Fichier de configuration Nginx  
├── .gitignore                # Fichier pour ignorer certains fichiers (comme .env, .env.dev, .env.test)  
└── README.md                 # Documentation du projet  

#### Notes supplémentaires

Nginx : Si tu rencontres des problèmes d'accès ou des erreurs 504, vérifie la configuration de Nginx et assure-toi que le fichier default.conf dans le dossier nginx/ pointe bien vers le bon dossier public/ de Symfony.

Base de données : Si tu utilises une base de données MySQL, assure-toi que la connexion est correctement configurée dans le fichier .env de Symfony.
