# 🐳 Job02 - Utilisation de Docker en ligne de commande

Dans cet exercice, nous allons analyser et utiliser l’image Docker `docker/welcome-to-docker`.

---

## 📌 1️⃣ Récupération de l’image Docker

Nous avons commencé par télécharger l’image `docker/welcome-to-docker` avec la commande suivante :

```sh
docker pull docker/welcome-to-docker
```

![docker pull](image/image1.png)

## 📌 2️⃣ Analyse et exécution de `docker/welcome-to-docker`

Avant d’exécuter le conteneur, nous avons **analysé l’image** via Docker Desktop.

📸 **Analyse de l’image dans Docker Desktop :**  
![Analyse Docker Desktop](image/image2)

### ✅ Explication :
- Permet de **visualiser les couches du Dockerfile**.
- Affiche les **ports exposés** et la configuration.
- Identifie d’éventuelles **vulnérabilités** dans l’image.

---

### ✅ Exécution du conteneur

Nous avons lancé le conteneur avec la commande :

```sh
docker run -d -p 8080:80 docker/welcome-to-docker
```

