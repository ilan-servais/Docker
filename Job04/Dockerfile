# Utiliser une image de base avec Apache et PHP
FROM php:8.2-apache

# Copier le fichier index.php dans le bon répertoire du serveur
COPY index.php /var/www/html/

# Exposer le port 80
EXPOSE 80

# Lancer Apache en mode foreground
CMD ["apache2-foreground"]
