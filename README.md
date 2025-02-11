# 📦 Installation de Docker

Ce projet documente l'installation et la configuration de Docker sur notre système.

## 🔹 Vérification de l'installation

Après l'installation de Docker, nous avons utilisé les commandes suivantes pour vérifier sa bonne installation :

```sh
docker --version
docker info
```

La commande `docker --version` nous affiche la version installée, tandis que `docker info` donne plus de détails sur la configuration de Docker.

![Vérification de Docker](image/image.png)

## 🔹 Affichage des conteneurs actifs

Pour voir les conteneurs Docker en cours d’exécution (et y compris ceux qui sont arrêtés avec -a) :

```sh
docker ps
docker ps -a
```
![Affichage des conteneurs actifs](image/image2.png)

## 🔹 Gestion des images Docker

Docker propose plusieurs commandes pour gérer les images. En exécutant simplement :

```sh
docker image
```

![Affichage des commands Docker disponibles](image/image3.png)

## 🔹 Exécution d'un conteneur avec `docker run`

La commande `docker run` permet de démarrer un conteneur à partir d'une image Docker.

### ✅ Exécution simple
Nous avons testé avec une image simple pour valider le bon fonctionnement de Docker :

```sh
docker run hello-world
```

![Start conteneur à partir image Docker](image/image4.png)
