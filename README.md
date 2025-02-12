# 📦 Installation de Docker

Ce projet documente l'installation et la configuration de Docker sur notre système.

## 🔹 Vérification de l'installation

Après l'installation de Docker, nous avons utilisé les commandes suivantes pour vérifier sa bonne installation :

```sh
docker --version
docker info
```

La commande `docker --version` nous affiche la version installée, tandis que `docker info` donne plus de détails sur la configuration de Docker.

![Vérification de Docker](Job01/image/image.png)

## 🔹 Affichage des conteneurs actifs

Pour voir les conteneurs Docker en cours d’exécution (et y compris ceux qui sont arrêtés avec -a) :

```sh
docker ps
docker ps -a
```
![Affichage des conteneurs actifs](Job01/image/image2.png)

## 🔹 Gestion des images Docker

Docker propose plusieurs commandes pour gérer les images. En exécutant simplement :

```sh
docker image
```

![Affichage des commands Docker disponibles](Job01/image/image3.png)

## 🔹 Exécution d'un conteneur avec `docker run`

La commande `docker run` permet de démarrer un conteneur à partir d'une image Docker.

### ✅ Exécution simple
Nous avons testé avec une image simple pour valider le bon fonctionnement de Docker :

```sh
docker run hello-world
```

![Start conteneur à partir image Docker](Job01/image/image4.png)

## 🔹 Arrêter un conteneur avec `docker stop`

Lorsqu'un conteneur Docker tourne en arrière-plan, il peut être arrêté proprement avec la commande :

```sh
docker stop NOM_DU_CONTENEUR
```

![Stop Docker](Job01/image/image5.png)

## 🔹 Récupérer l’image "welcome-to-docker" avec `docker pull`

Nous avons utilisé la commande `docker pull` pour récupérer une image de démonstration fournie par Docker :

```sh
docker pull docker/welcome-to-docker
```

![Pull image Docker](Job01/image/image6.png)

## 🔹 Afficher les images disponibles avec `docker images`

Après avoir récupéré des images avec `docker pull`, nous avons utilisé la commande suivante pour voir la liste des images disponibles localement :

```sh
docker images
```

![Afficher les images dispo](Job01/image/image7.png)

## 🔹 Construire et exécuter un conteneur avec `docker run`

Nous avons utilisé la commande `docker run` pour exécuter notre conteneur et le rendre accessible via un navigateur à l'adresse http://localhost:8080

### ✅ Lancer le conteneur

```sh
docker run -it --rm -p 8080:80 docker/welcome-to-docker
```

![Exécution du conteneur Docker](Job01/image/image8.png)

## 🔹 Vérification de l'état des conteneurs et des images Docker

Après avoir lancé un conteneur, nous avons utilisé plusieurs commandes pour inspecter son état et obtenir des informations sur Docker.

---

### ✅ Afficher les conteneurs actifs avec `docker ps`

La commande suivante permet de voir **tous les conteneurs en cours d’exécution** :

```sh
docker ps
```

![Affichage des conteneurs actifs et inactifs](Job01/image/image9.png)

## 🔹 Vérification des images et des informations Docker

Après avoir récupéré des images Docker et exécuté des conteneurs, nous avons utilisé plusieurs commandes pour inspecter leur état et obtenir des informations sur Docker.

---

### ✅ Voir les images disponibles avec `docker images`

La commande suivante permet d'afficher toutes les images Docker stockées localement :

```sh
docker images
```
![docker images](Job01/image/image10.png)

La commande suivante permet d'afficher des informations 

```sh
docker info
```
![docker info](Job01/image/image11.png)

## 🔹 Arrêter un conteneur Docker

Lorsqu'un conteneur est exécuté en **mode interactif** sans l'option `-d` (mode détaché), il **verrouille** le terminal, et il n'est plus possible de taper de nouvelles commandes.

Dans ce cas, pour l'arrêter, nous avons utilisé :

### ✅ Arrêter le conteneur avec `CTRL + C`

Lorsque le conteneur est actif, nous avons simplement **fait `CTRL + C` dans le terminal** pour stopper son exécution.

---

### ✅ Exécuter un conteneur en arrière-plan pour pouvoir l'arrêter avec `docker stop`

Si nous voulons **garder le terminal libre** et arrêter le conteneur avec `docker stop`, nous devons exécuter le conteneur en **mode détaché** (`-d`) et **sans `--rm`** pour éviter qu'il ne soit supprimé automatiquement :

```sh
docker run -d -p 8080:80 --name welcome-to-docker docker/welcome-to-docker
```

![Arrêt du conteneur](Job01/image/image13.png)

## 🔹 Supprimer un conteneur avec `docker rm`

Après avoir arrêté un conteneur, nous avons utilisé la commande suivante pour le supprimer définitivement :

```sh
docker rm NOM_DU_CONTENEUR
```
![Suppresion du conteneur](Job01/image/image14.png)

## 🔹✅ Supprimer tous les conteneurs stoppés

```sh
docker rm $(docker ps -aq)
```

# 🔹 Suppression d’une image Docker

Docker propose plusieurs façons de supprimer une image, selon qu’elle est utilisée ou non, et selon le niveau de nettoyage souhaité.

---

## ✅ 1️⃣ Supprimer une image spécifique

Si nous voulons supprimer une **image unique**, nous pouvons utiliser son **nom** ou son **ID** :

```sh
docker rmi NOM_DE_L_IMAGE
```
ou
```sh
docker rmi ID_DE_L_IMAGE
```
![Suppresion de l'image](Job01/image/image15.png)


## ✅ 2️⃣ Supprimer toutes les images non utilisées (prune)

Si nous voulons supprimer toutes les images inutilisées, c'est-à-dire les images qui ne sont plus associées à un conteneur, nous pouvons utiliser :

```sh
docker image prune -a
```

## ✅ 3️⃣ Supprimer une image forcée (--force)

Si Docker refuse de supprimer une image parce qu'elle est toujours utilisée par un conteneur, nous pouvons forcer la suppression avec :
```sh
docker rmi -f NOM_DE_L_IMAGE
```
ou
```sh
docker rmi --force NOM_DE_L_IMAGE
```
## ✅ 4️⃣ Supprimer toutes les images d’un coup

Si nous voulons supprimer toutes les images Docker présentes sur la machine, nous pouvons utiliser :
```sh
docker rmi $(docker images -q)
```