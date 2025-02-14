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
