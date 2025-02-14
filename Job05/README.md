# 🎮 Job05 - Faute de prendre de la hauteur, prenons du volume ! Tic Tac Toe 

## 📌 Objectif


### 📌 Étape 1 : Création des fichiers

📄 index.html (Interface du jeu)

Un fichier HTML simple affichant le plateau du Morpion et permettant d’envoyer des résultats.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jeu du Morpion</title>
    <script>
        function saveResult(winner) {
            fetch('save.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({winner: winner})
            }).then(response => response.json())
              .then(data => alert("Résultat enregistré : " + data.status));
        }
    </script>
</head>
<body>
    <h1>Morpion</h1>
    <button onclick="saveResult('X')">Victoire de X</button>
    <button onclick="saveResult('O')">Victoire de O</button>
    <button onclick="saveResult('draw')">Match nul</button>
</body>
</html>
```

📄 index.php (Affichage du jeu)

```php
<?php
echo "<h1>Jeu du Morpion</h1>";
echo "<p>Cliquez sur une case pour jouer.</p>";
?>
```

📄 save.php (Sauvegarde des résultats dans results.json)

Ce fichier PHP reçoit des résultats via une requête POST et les stocke dans results.json.

```php
<?php
$data = json_decode(file_get_contents("php://input"), true);
if ($data) {
    $resultsFile = "/var/www/html/results.json";
    $results = file_exists($resultsFile) ? json_decode(file_get_contents($resultsFile), true) : [];
    $results[] = $data;
    file_put_contents($resultsFile, json_encode($results, JSON_PRETTY_PRINT));
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
```

📄 results.json (Initialisation)

Fichier vide pour stocker les résultats.

```json
[]
```

### 📌 Étape 2 : Création du Dockerfile

On va utiliser Nginx avec PHP pour servir les fichiers.

📄 Dockerfile :

```dockerfile
# Utiliser l'image officielle Nginx avec PHP
FROM php:8.2-fpm

# Installer Nginx
RUN apt-get update && apt-get install -y nginx \
    && rm -rf /var/lib/apt/lists/*

# Copier les fichiers du jeu dans le conteneur
COPY index.html /var/www/html/index.html
COPY index.php /var/www/html/index.php
COPY save.php /var/www/html/save.php

# Créer le volume pour stocker les résultats
VOLUME [ "/var/www/html/results.json" ]

# Exposer le port 80 pour accéder au jeu
EXPOSE 80

# Lancer Nginx et PHP
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
```

### 📌 Étape 3 : Construire et exécuter l’image Docker

Dans ton terminal, exécute les commandes suivantes :

 1️⃣ Construire l’image Docker
```sh
docker build -t morpion-nginx .
```
![docker build](/Job05/image/image1.png)

2️⃣ Créer le volume game-results
```sh
docker volume create game-results
```
3️⃣ Lancer le conteneur avec le volume
```sh
docker run -d -p 8080:80 --name morpion-container -v game-results:/var/www/html morpion-nginx
```
![docker volume](/Job05/image/image2.png)

