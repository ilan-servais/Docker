Étape 1 : Préparer l'environnement

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


```bash
docker exec -it symfony_app bash
composer --version
```

![alt text](/Job07/UNIT_SYMFONY/image/image3.png)