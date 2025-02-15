const express = require('express');
const mysql = require('mysql2');

// Configuration de la base de données
const dbConfig = {
    host: process.env.DB_HOST || 'mysql_container',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'projetdb',
};

let connection;

// Fonction pour établir une connexion à la base de données
function connectToDatabase() {
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database. Retrying in 5 seconds...', err);
            setTimeout(connectToDatabase, 5000); // Réessayer après 5 secondes
        } else {
            console.log('Connected to database');
        }
    });

    connection.on('error', (err) => {
        console.error('Database error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Reconnecting to database...');
            connectToDatabase(); // Reconnexion automatique
        } else {
            throw err;
        }
    });
}

// Initialisation de la connexion à la base de données
connectToDatabase();

// Initialisation de l'application Express
const app = express();

// Route pour la racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du backend de votre projet Docker !');
});

// Route de test pour vérifier le statut de l'API
app.get('/api/status', (req, res) => {
    connection.query('SELECT NOW() AS currentTime', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Database query failed');
        } else {
            res.json({ status: 'success', currentTime: results[0].currentTime });
        }
    });
});

// 📌 Ajout de la nouvelle route pour récupérer les utilisateurs
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error retrieving users');
        } else {
            res.json(results);
        }
    });
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
