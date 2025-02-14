# ⭐ Job04 : Docker Apache / PHP

## 🚀 Étape 1 : Préparation dans Visual Studio Code

### 📌 Créer un fichier index.php

Ouvre VS Code et crée un nouveau fichier nommé index.php  
Ajoute la commande PHP suivante (10 caractères) pour afficher les infos du serveur :

```sh
<?php phpinfo(); ?>
```
 ![php phpinfo](Job04/image/image1.png)
 
## 🛠️ Étape 2 : Création du Dockerfile

### 📌 Créer un fichier Dockerfile

Dans le même dossier que index.php, crée un fichier nommé Dockerfile (sans extension).
Ajoute le contenu suivant :

```sh
# Utiliser une image de base avec Apache et PHP
FROM php:8.2-apache

# Copier le fichier index.php dans le bon répertoire du serveur
COPY index.php /var/www/html/

# Exposer le port 80
EXPOSE 80

# Lancer Apache en mode foreground
CMD ["apache2-foreground"]
```
 
## 🔧 Étape 3 : Construire et exécuter l’image Docker

### 📌 Dans le terminal, exécute ces commandes :

Construire l’image Docker :

```sh
docker build -t mon-serveur-php .
```
 ![docker build -t mon-serveur-php .](Job04/image/image2.png)

Lancer le conteneur en exposant le port 80 sur le port 8080 :

```sh
docker run -d -p 8080:80 --name mon-serveur mon-serveur-php
```
 ![docker run -d -p 8080:80 --name](Job04/image/image3.png)

Vérifie que le conteneur tourne :

```sh
docker ps
```
 ![docker ps](Job04/image/image4.png)

## 🌍 Étape 4 : Tester le serveur

### 📌 Ouvre ton navigateur et accède à :

👉 http://localhost:8080

 ![localhost](Job04/image/image5.png)

## 🛑 Étape 5 : Arrêter proprement le conteneur

### 📌 Dans le terminal, exécute :

```sh
docker stop mon-serveur
docker rm mon-serveur
```
 ![docker stop docker rm](Job04/image/image6.png)

