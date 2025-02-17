# job06 - Déploiement d'une application multi-conteneurs avec Docker Compose

## 📌 Description du projet

Ce projet consiste à déployer une application web multi-conteneurs à l’aide de Docker Compose. Il comprend :

Une base de données MySQL pour stocker les données.  
Un backend Node.js pour gérer l’API.  
Un frontend Nginx pour afficher l’interface utilisateur.  
Adminer pour administrer la base de données via une interface web.  

📁 Structure du projet

```bash
job06/
│── docker-compose.yml  # Fichier Docker Compose
│── backend/            # Dossier du backend (Node.js)
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│── frontend/           # Dossier du frontend (Nginx)
│   ├── Dockerfile
│   ├── index.html
│── nginx/              # Configuration de Nginx
│   ├── nginx.conf
```
### 🏗 Installation et exécution

1️⃣ Prérequis
Docker Desktop
Docker Compose

2️⃣ Cloner le projet
```bash
git clone https://github.com/ton-repo/job06.git
cd job06
```
3️⃣ Lancer l'application
```bash
docker-compose up --build -d
```
![docker-compose](/Job06/image/image2.png)

L'option -d exécute les conteneurs en arrière-plan.

### 🌐 Accès aux services

Frontend (Nginx) : http://localhost:8080  
![frontend](/Job06/image/image1.png)  
Backend (API) : http://localhost:3000  
![backend](/Job06/image/backend.png)  
Liste des utilisateurs (API) : http://localhost:3000/users  
Adminer (gestion de la base de données) : http://localhost:8081  
Serveur : mysql_container  
Utilisateur : root  
Mot de passe : root  
Base de données : projetdb  


## 📌 Ajout d'une table et test de la base de données

1️⃣ Se connecter à MySQL via Adminer

Aller sur http://localhost:8081
![adminer](/Job06/image/adminer.png)

Renseigner :  

Serveur : mysql_container    
Utilisateur : root  
Mot de passe : root    
Base de données : projetdb  
![adminer2](/Job06/image/adminer2.png)

2️⃣ Créer une table users  

Dans Adminer, exécuter cette requête SQL :

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
INSERT INTO users (name) VALUES ('Ilan'), ('Servais');
```
![adminer3](/Job06/image/adminer3.png)


3️⃣ Vérifier les données via l'API

Ouvrir http://localhost:3000/users et vérifier que le message.
![backend](/Job06/image/backend2.png)

### 🛠 Débogage

1️⃣ Vérifier les logs des conteneurs

```bash
docker logs backend
docker logs frontend
docker logs database
docker logs adminer
```

2️⃣ Vérifier les conteneurs actifs

```bash
docker ps
```

# 🎯 Objectifs et compétences développées :  

🐳 Maîtrise de Docker Compose pour orchestrer plusieurs conteneurs  
🌍 Configuration d’un environnement multi-services (Backend, Frontend, BDD).  
⚡ Gestion des connexions réseau et volumes persistants  
🛠 Utilisation d’Adminer pour gérer la base de données  
📡 Déploiement et tests d’une API Node.js avec une base MySQL  

### 🛠 Arrêter et nettoyer les conteneurs

Pour arrêter les conteneurs :

```bash
docker-compose down
```

Pour supprimer les images et volumes associés :

```bash
docker-compose down --volumes
```

