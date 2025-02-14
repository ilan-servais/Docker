# 🎮 Job05 - Faute de prendre de la hauteur, prenons du volume ! Tic Tac Toe 

## 📌 Objectif


### 📌 Étape 1 : Création des fichiers

📄 index.html (Interface du jeu)

Un fichier HTML simple affichant le plateau du Morpion et permettant d’envoyer des résultats.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }
        h1 {
            color: #333;
        }
        .status {
            font-size: 18px;
            margin-bottom: 20px;
        }
        table {
            margin: 0 auto;
            border-collapse: collapse;
        }
        td {
            width: 80px;
            height: 80px;
            text-align: center;
            vertical-align: middle;
            font-size: 36px;
            font-weight: bold;
            border: 2px solid #000;
            cursor: pointer;
        }
        td:hover {
            background-color: #f0f0f0;
        }
        td.taken {
            cursor: not-allowed;
        }
        button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Tic Tac Toe</h1>
    <div class="status">C'est au tour de <span id="currentPlayer">X</span>.</div>
    <table>
        <tr>
            <td onclick="makeMove(this)"></td>
            <td onclick="makeMove(this)"></td>
            <td onclick="makeMove(this)"></td>
        </tr>
        <tr>
            <td onclick="makeMove(this)"></td>
            <td onclick="makeMove(this)"></td>
            <td onclick="makeMove(this)"></td>
        </tr>
        <tr>
            <td onclick="makeMove(this)"></td>
            <td onclick="makeMove(this)"></td>
            <td onclick="makeMove(this)"></td>
        </tr>
    </table>
    <button onclick="resetGame()">Réinitialiser</button>
    <script>
        let currentPlayer = 'X';
        let gameActive = true;
        const statusDisplay = document.querySelector('.status');
        const cells = document.querySelectorAll('td');

        async function saveResults(winner) {
            const response = await fetch('/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ winner }),
            });
            return response.ok;
        }

        function makeMove(cell) {
            if (!gameActive || cell.textContent !== '') return;

            // Ajouter le symbole du joueur actuel
            cell.textContent = currentPlayer;
            cell.classList.add('taken');

            // Vérifier si le joueur actuel a gagné
            if (checkWin()) {
                statusDisplay.textContent = `Le joueur ${currentPlayer} a gagné !`;
                gameActive = false;
                saveResults(currentPlayer);
                return;
            }

            // Vérifier si c'est un match nul
            if (Array.from(cells).every(cell => cell.textContent !== '')) {
                statusDisplay.textContent = "C'est un match nul !";
                saveResults('Draw');
                gameActive = false;
                return;
            }

            // Passer au joueur suivant
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.innerHTML = `C'est au tour de <span id="currentPlayer">${currentPlayer}</span>.`;
        }

        function checkWin() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
                [0, 4, 8], [2, 4, 6]            // Diagonales
            ];

            return winningCombinations.some(combination => {
                return combination.every(index => {
                    return cells[index].textContent === currentPlayer;
                });
            });
        }

        function resetGame() {
            currentPlayer = 'X';
            gameActive = true;
            statusDisplay.innerHTML = `C'est au tour de <span id="currentPlayer">${currentPlayer}</span>.`;
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('taken');
            });
        }
    </script>
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
$file = __DIR__ . '/results.json';

// Lire les données envoyées
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
// Charger les résultats existants
$results = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$results[] = $data;

// Sauvegarder les résultats
file_put_contents($file, json_encode($results, JSON_PRETTY_PRINT));
echo json_encode(["status" => "success"]);
} else {
http_response_code(400);
echo json_encode(["status" => "error", "message" => "Données invalides"]);
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
# Utiliser l'image officielle PHP avec FPM
FROM php:8.2-fpm

# Installer Nginx
RUN apt-get update && apt-get install -y nginx \
    && rm -rf /var/lib/apt/lists/*

# Assurer que le dossier HTML existe
RUN mkdir -p /var/www/html

# Copier les fichiers du jeu dans le conteneur
COPY index.html /var/www/html/index.html
COPY index.php /var/www/html/index.php
COPY save.php /var/www/html/save.php
COPY results.json /var/www/html/results.json

# S'assurer que results.json est un fichier valide et non un dossier
RUN rm -rf /var/www/html/results.json && touch /var/www/html/results.json && echo "[]" > /var/www/html/results.json

# Exposer le port 80
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

### 📌 Étape 4 : Tester le serveur

Ouvre un navigateur et va sur http://localhost:8080
Teste les boutons pour envoyer un score.
![docker build](/Job05/image/image3.png)


Vérifie que les scores sont bien enregistrés dans results.json :
```sh
docker exec morpion-container cat /var/www/html/results.json
```

Si les scores apparaissent bien, alors tout est fonctionnel ! ✅


### 📌 Étape 5 : Arrêter et supprimer proprement

Si tu veux arrêter et supprimer tout proprement :

```sh
docker stop morpion-container
docker rm morpion-container
docker volume rm game-results
```
