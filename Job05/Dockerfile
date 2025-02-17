# Utiliser une image Alpine avec Nginx
FROM nginx:alpine

# Installer PHP-FPM et ses extensions
RUN apk add --no-cache \
    php82 \
    php82-fpm \
    php82-json \
    php82-mbstring \
    php82-opcache \
    php82-session

# Définir le répertoire de travail
WORKDIR /usr/share/nginx/html

# Copier les fichiers du projet
COPY index.html .
COPY save.php .
COPY results.json .

# Permissions pour que PHP puisse écrire dans results.json
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod 777 /usr/share/nginx/html/results.json

# Configurer PHP-FPM pour écouter sur le bon socket
RUN sed -i 's|listen = 127.0.0.1:9000|listen = /var/run/php-fpm.sock|' /etc/php82/php-fpm.d/www.conf \
    && sed -i 's|;listen.owner = nobody|listen.owner = nginx|' /etc/php82/php-fpm.d/www.conf \
    && sed -i 's|;listen.group = nobody|listen.group = nginx|' /etc/php82/php-fpm.d/www.conf \
    && sed -i 's|;listen.mode = 0660|listen.mode = 0660|' /etc/php82/php-fpm.d/www.conf

# Configurer Nginx pour utiliser PHP-FPM
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html index.php; \
    server_name localhost; \
    location / { \
    try_files $uri $uri/ =404; \
    } \
    location ~ \.php$ { \
    include fastcgi_params; \
    fastcgi_pass unix:/var/run/php-fpm.sock; \
    fastcgi_index index.php; \
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; \
    } \
    }' > /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer PHP-FPM et Nginx ensemble
CMD php-fpm82 --daemonize && nginx -g 'daemon off;'
