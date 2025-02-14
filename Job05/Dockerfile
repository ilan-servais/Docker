# Utiliser PHP avec FPM et installer Nginx
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y nginx \
    && rm -rf /var/lib/apt/lists/*

# 🔥 FORCER la création du dossier et vérifier son existence
RUN mkdir -p /var/www/html && ls -l /var/ && ls -l /var/www/

# Copier les fichiers dans l’image
COPY index.html /var/www/html/index.html
COPY index.php /var/www/html/index.php
COPY save.php /var/www/html/save.php
COPY results.json /var/www/html/results.json

# Exposer le port
EXPOSE 80

CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
