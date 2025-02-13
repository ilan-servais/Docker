# 🎮 Job03 - Jouer en émulation avec une image Docker Super Mario

## 📌 Objectif

L'objectif de ce projet est de mettre en pratique l'utilisation de Docker Desktop en exécutant un émulateur Super Mario à l'aide de l'image `pengbai/supermario`

Nous allons :  

- Ouvrir et utiliser **Docker Desktop**.  
- Récupérer l’image Docker et la lancer depuis **Docker Desktop** et **le terminal**.  
- Configurer l’accès via un navigateur en mappant un port spécifique.  
- Observer le comportement de Docker pendant l'exécution.  
- Capturer des **captures d’écran** du jeu dans le navigateur.  

---

## 🛠 Prérequis

Avant de commencer, assurez-vous d'avoir :

- **Docker Desktop** installé et en cours d'exécution.  
- Un navigateur web fonctionnel (Chrome, Firefox, Edge…).  
- Un serveur X11 si vous utilisez Linux/macOS pour afficher l’émulateur hors navigateur.  

---

## 🚀 Étapes de mise en place

### 1️⃣ **Ouvrir Docker Desktop**

- Lancez **Docker Desktop** et assurez-vous qu’il fonctionne correctement.

### 2️⃣ **Rechercher et télécharger l’image Docker**

Dans Docker Desktop :

- Cliquez sur le menu **Images** à gauche.  
- Ouvrez le terminal intégré (ou votre terminal habituel).  
- Exécutez :

```sh
docker search pengbai/supermario
```
![docker search](/Job03/image/image1.png)

- ⭐ Trouvez la version qui vous convient le mieux, généralement celle avec le plus d'étoiles, puis :
```sh
docker pull pengbai/supermario
```
![docker pull](/Job03/image/image2.png)


### 2️⃣ Vérifier l’image téléchargée

Vérifiez que l'image est bien installée :

```sh
docker images
```
Vous devriez voir quelque chose comme :
![docker images](/Job03/image/image3.png)

### 3️⃣ Lancer le conteneur avec un port spécifique

Exécutez cette commande pour démarrer Super Mario Bros :

```sh
docker run -d --rm -p 8600:8080 pengbai/docker-supermario
```
![docker run](/Job03/image/image4.png)

Explication :

-d : Mode détaché (exécute en arrière-plan).  
--rm : Supprime le conteneur après arrêt.  
-p 8600:8080 : Expose le jeu sur http://localhost:8600  

Vérifiez que le conteneur tourne bien :  

```sh
docker ps
```

### 4️⃣ Accéder au jeu dans le navigateur

Ouvrez votre navigateur et allez sur :

http://localhost:8600

![docker images](/Job03/image/image5.png)

### 5️⃣ Lancer une seconde instance sur un autre port

Exécutez cette commande pour exécuter une seconde version sur un autre port :

```sh
docker run -d --rm -p 8700:8080 pengbai/docker-supermario
```
![docker run 2](/Job03/image/image6.png)

Puis, ouvrez :

http://localhost:8700

![docker run double instance](/Job03/image/image7.png)

### 🛑 Arrêt et nettoyage

Une fois terminé, vous pouvez arrêter les conteneurs en utilisant l'ID d'un conteneur spécifique :

```sh
docker stop <CONTAINER_ID>
```
![docker stop ID](/Job03/image/image8.png)

Ou simplement depuis Docker Desktop :

![docker stop ID](/Job03/image/image9.png)

Ou vous pouvez arrêter tous les conteneurs :

```sh
docker stop $(docker ps -q)
```

#### Supprimer le container 

```sh
docker rmi <CONTAINER_ID>
```
Ou
```sh
docker container prune
```

#### Supprimer l’image docker de Super Mario

```sh
docker rmi pengbai/docker-supermario
```
Ou simplement depuis Docker Desktop :

![docker supprimer manuellement](/Job03/image/image10.png)

## 🎯 Résultat attendu

À la fin de ce projet, vous aurez : 

✅ Téléchargé et exécuté Super Mario Bros via Docker.  
✅ Joué dans votre navigateur sans installation d’un émulateur.  
✅ Pris 3 captures d’écran du jeu en action.  

## 🚀 Mission accomplie, amusez-vous bien ! 🎮