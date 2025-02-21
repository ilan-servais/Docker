# 🎼 Projet Symfony avec Docker

## Étape 1 : Préparer l'environnement

Vérification des versions Docker et Docker Compose :

Pour Docker :

```bash
docker --version
```
Pour Docker Compose :

```bash
docker-compose --version
```
![--version](/Job07/UNIT_SYMFONY/image/--version.png)

Et Composer :
```bash
composer --version
```
![--version](/Job07/UNIT_SYMFONY/image/composer.png)

Si Docker, Docker Compose et Composer sont correctement installés, tu pourras passer à la suite.

Installer Composer dans ton conteneur Docker

Accède à ton conteneur PHP via Docker :

Assure-toi d'être dans le répertoire où se trouve ton fichier docker-compose.yml, puis lance cette commande :

```bash
docker-compose up -d
```

```bash
cd UNIT_SYMFONY
docker-compose up -d
docker ps
```
![docker-compose up -d](/Job07/UNIT_SYMFONY/image/docker-compose.png)

```bash
docker exec -it symfony_app bash
```

![docker exec](/Job07/UNIT_SYMFONY/image/image3.png)

### Étape 1 : Installer Composer dans le conteneur

Dans le conteneur symfony_app, commence par mettre à jour les paquets disponibles et installer les dépendances nécessaires :

```bash
apt-get update && apt-get install -y curl unzip git
```
![apt-get update && apt-get install](/Job07/UNIT_SYMFONY/image/image4.png)

Ensuite, utilise la commande suivante pour télécharger Composer et l'installer dans le conteneur :

```bash
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```
![curl -sS](/Job07/UNIT_SYMFONY/image/image5.png)

Ces commandes téléchargent l'installateur de Composer et le déplacent dans un répertoire où il sera accessible en tant que commande composer.

### Étape 2 : Installer Symfony dans le conteneur

Une fois Composer installé, tu peux maintenant installer Symfony. Utilise la commande suivante pour créer un projet Symfony dans le conteneur :

```bash
composer create-project symfony/website-skeleton app
```
![composer create-project](/Job07/UNIT_SYMFONY/image/image6.png)

Cela va installer Symfony dans le dossier app à l'intérieur du conteneur.

### Étape 3 : Accéder à l'application Symfony

Une fois l'installation de Symfony terminée, tu peux vérifier si ton application fonctionne en accédant à http://localhost:8080 dans ton navigateur.

![homepage Symfony](/Job07/UNIT_SYMFONY/image/image7.png)

## Structure du Projet

Voici la structure de dossiers du projet :

![structure de dossiers Symfony](/Job07/UNIT_SYMFONY/image/image8.png)


#### Notes supplémentaires

Nginx : Si tu rencontres des problèmes d'accès ou des erreurs 504, vérifie la configuration de Nginx et assure-toi que le fichier default.conf dans le dossier nginx/ pointe bien vers le bon dossier public/ de Symfony.

Base de données : Si tu utilises une base de données MySQL, assure-toi que la connexion est correctement configurée dans le fichier .env de Symfony.

## Autre commande possible qui installe une autre forme de projet Symfony

Nous avons déjà parlé de l'installation via symfony/website-skeleton, qui est l'option la plus courante.
Une autre commande possible est l'installation via symfony/skeleton. Cette commande installe un projet très minimal, à partir duquel tu peux ajouter manuellement les composants dont tu as besoin.

Commande alternative :

```bash
composer create-project symfony/skeleton app
```

Cela installe uniquement les composants de base, comme symfony/framework-bundle, sans fonctionnalités supplémentaires. Tu devras ajouter manuellement des bundles comme Twig, Doctrine, etc., si tu en as besoin.

Différence entre les deux commandes :

symfony/website-skeleton : Installe un projet plus complet, avec des bundles comme Twig, Doctrine, et une configuration prête à l'emploi pour un site web.

symfony/skeleton : Installe une base minimale de Symfony, ce qui te permet d'ajouter uniquement les composants dont tu as besoin, avec une personnalisation plus fine.

L'installation via symfony/website-skeleton installe un projet prêt à l'emploi avec une configuration par défaut. Tu obtiens immédiatement des outils comme Twig (pour le templating) et Doctrine (pour la base de données).

L'installation via symfony/skeleton, en revanche, te donne un projet vide avec juste les dépendances de base, comme symfony/framework-bundle. Il te faudra ajouter chaque composant manuellement, ce qui peut être plus flexible mais aussi plus long.

Exemple de commandes pour tester la différence :

Installation avec symfony/website-skeleton :

```bash
composer create-project symfony/website-skeleton project_website
```
Inclut Twig, Doctrine et d'autres configurations prêtes à l'emploi.

Installation avec symfony/skeleton :

```bash
composer create-project symfony/skeleton project_skeleton
```
L'installation via symfony/website-skeleton installe un projet prêt à l'emploi avec une configuration par défaut. Tu obtiens immédiatement des outils comme Twig (pour le templating) et Doctrine (pour la base de données).

L'installation via symfony/skeleton, en revanche, te donne un projet vide avec juste les dépendances de base, comme symfony/framework-bundle. 
Il te faudra ajouter chaque composant manuellement, ce qui peut être plus flexible mais aussi plus long.

Exemple de commandes pour tester la différence :

Installation avec symfony/website-skeleton :
```bash
composer create-project symfony/website-skeleton project_website
```
Inclut Twig, Doctrine et d'autres configurations prêtes à l'emploi.

Installation avec symfony/skeleton :
```bash
composer create-project symfony/skeleton project_skeleton
```
Un projet minimal, sans composants supplémentaires.

### Configurer la base de données

Modifier .env pour la base de données :

```dotenv
DATABASE_URL="mysql://symfony:symfony@symfony_db:3306/symfony"
```

Créer la base de données :

```bash
docker exec -it symfony_app bash
php bin/console doctrine:database:create
```

Donner les bonnes permissions aux fichiers :

```bash
chown -R www-data:www-data /var/www/html
chmod -R 775 /var/www/html/var
```

##### Dans le cas ou :

![error could not find driver](/Job07/UNIT_SYMFONY/image/image9.png)
L'erreur "could not find driver" indique que le driver PHP pour MySQL n'est pas installé ou activé dans ton conteneur. Symfony utilise Doctrine pour interagir avec la base de données MySQL, et Doctrine a besoin du driver pdo_mysql pour fonctionner.

Accéder au conteneur PHP (symfony_app) :

Exécute cette commande pour installer le driver nécessaire :
```bash
apt-get update
apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev && \
apt-get install -y libmysqlclient-dev && \
docker-php-ext-install pdo_mysql
```
![apt-get update](/Job07/UNIT_SYMFONY/image/image10.png)

Redémarrer le conteneur PHP :

Après avoir installé le driver, redémarre ton conteneur symfony_app :

```bash
docker restart symfony_app
```

1. Vérification de l'installation du driver pdo_mysql :

Si tu as déjà installé le driver et redémarré le conteneur PHP, tu devrais pouvoir vérifier que tout fonctionne correctement avec cette commande :

```bash
php -m | grep pdo_mysql
```
Cela doit afficher pdo_mysql dans la liste des modules PHP installés, ce qui signifie que Symfony peut maintenant se connecter à la base de données MySQL.

2. Revenir à la création de la base de données :

Maintenant que tu es dans le conteneur PHP et que tout est configuré, tu peux tenter à nouveau de créer la base de données Symfony avec :

```bash
php bin/console doctrine:database:create
```
Cela devrait fonctionner sans l'erreur "could not find driver".

3. Configuration de la base de données

Si la base de données symfony n'existe pas, vous pouvez la créer avec la commande suivante :

```bash
php bin/console doctrine:database:create
```

Cependant, si la base de données existe déjà et contient des données (ou des tables), vous pouvez la supprimer et la recréer avec :

```bash
php bin/console doctrine:database:drop --force
php bin/console doctrine:database:create
```

Vérification de la configuration de la base de données

Assurez-vous que la ligne suivante dans le fichier .env est correctement définie pour que Symfony puisse se connecter à la base de données MySQL :

```dotenv
DATABASE_URL="mysql://symfony:symfony@symfony_db:3306/symfony"
```
Vérification des modules PHP

Vérifiez que le module pdo_mysql est bien installé dans votre conteneur PHP en exécutant la commande suivante dans le conteneur :

```bash
php -m | grep pdo_mysql
```

Cela doit afficher pdo_mysql, ce qui signifie que Symfony peut se connecter à la base de données MySQL.

### Étape 4 : Création de l'entité User

Créer l'entité User avec les propriétés suivantes : email, password, et roles. Utilisez la commande suivante :
```bash
php bin/console make:entity
```
![php bin/console make:entity](/Job07/UNIT_SYMFONY/image/image13.png)


Nom de l'entité : User, puis ajoutez les propriétés suivantes :

email : chaîne de caractères, longueur maximale 180, unique.
password : chaîne de caractères, longueur maximale 255.
roles : tableau de rôles (type array).

Implémentation de l'interface UserInterface et PasswordAuthenticatedUserInterface :

Modifiez l'entité User.php pour implémenter UserInterface et PasswordAuthenticatedUserInterface afin que Symfony puisse gérer l'authentification.

Générer et appliquer les migrations :

```bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```
![php bin/console make:migration](/Job07/UNIT_SYMFONY/image/image11.png)
![php bin/console doctrine:migrations:migrate](/Job07/UNIT_SYMFONY/image/image12.png)

Cela mettra à jour la base de données avec la nouvelle structure de l'entité User.

### Étape 5 : Configuration de la sécurité

Configurer la sécurité dans security.yaml : Assurez-vous que la configuration de la sécurité est correcte pour l'authentification. 

Voici un exemple de configuration dans config/packages/security.yaml :

```yaml
security:
    encoders:
        App\Entity\User:
            algorithm: bcrypt

    providers:
        app_user_provider:
            entity:
                class: App\Entity\User
                property: email

    firewalls:
        main:
            form_login:
                login_path: login
                check_path: login
                default_target_path: home
            logout:
                path: logout
                target: /

    access_control:
        - { path: ^/admin, roles: ROLE_ADMIN }
        - { path: ^/profile, roles: ROLE_USER }
        - { path: ^/, roles: IS_AUTHENTICATED_FULLY }
```

Créer un contrôleur de sécurité pour gérer la connexion et la déconnexion des utilisateurs. Ajoutez un fichier SecurityController.php :

```php
// src/Controller/SecurityController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="login")
     */
    public function login(): Response
    {
        return $this->render('security/login.html.twig');
    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logout()
    {
        // Symfony gère automatiquement la déconnexion
    }
}
```

Créer un formulaire de connexion avec Twig dans templates/security/login.html.twig :

```twig
<form action="{{ path('login') }}" method="post">
    <input type="text" name="_username" placeholder="Email" required />
    <input type="password" name="_password" placeholder="Mot de passe" required />
    <button type="submit">Se connecter</button>
</form>
```

### Étape 6 : Créer un utilisateur dans la base de données

Ajouter un utilisateur à la base de données. Voici un exemple pour créer un utilisateur avec un mot de passe hashé :

```php
$user = new User();
$user->setEmail('user@example.com');
$user->setRoles(['ROLE_USER']);

$encodedPassword = $passwordEncoder->encodePassword($user, 'password123');
$user->setPassword($encodedPassword);

// Sauvegarder l'utilisateur dans la base de données
$entityManager->persist($user);
$entityManager->flush();
```

### Étape 7 : Tester l'authentification

Testez la connexion à /login en utilisant les informations d'un utilisateur que vous avez créé dans la base de données.
Accédez à une page protégée comme /admin pour tester si la gestion des rôles fonctionne correctement.

### Étape 8 : (Optionnel) Réinitialiser la base de données
Si nécessaire, vous pouvez réinitialiser la base de données avec les commandes suivantes :

```bash
php bin/console doctrine:database:drop --force
php bin/console doctrine:database:create
```

Cela supprimera et recréera la base de données avant d'y ajouter de nouvelles données.

# ⚠️ Résolution des problèmes rencontrés

Pendant le processus de configuration de Symfony, plusieurs défis ont été rencontrés et résolus, notamment :

Version Symfony obsolète : 

Initialement, j'utilisais une version ancienne de Symfony (6.x) alors que la version 7.x était la dernière stable et recommandée. Cela m’a causé des conflits avec certaines dépendances et fonctionnalités. Symfony 7 apporte plusieurs améliorations, de nouvelles fonctionnalités et des corrections de bugs. 
Lors de l’installation, j’ai dû mettre à jour la configuration et refaire l’installation pour avoir une version compatible et plus stable. Cela m'a permis d'éviter des erreurs qui se produisaient fréquemment dans la version précédente, notamment liées à la gestion des composants et des outils internes (comme Doctrine ou le cache).
La mise à jour vers Symfony 7 a résolu la majorité des problèmes liés à la version obsolète.

PHP utilisé localement via XAMPP :

Un autre problème majeur provenait de la configuration de PHP localement, car j’avais installé XAMPP pour un autre projet antérieur. XAMPP était configuré pour utiliser PHP 8.0, mais Symfony et d'autres dépendances modernes nécessitaient une version plus récente de PHP (minimum 8.1). Le problème venait principalement du fait que le chemin d’accès au PHP de XAMPP était toujours présent dans le PATH de mon système, ce qui faisait qu’à chaque fois que je lançais Composer ou Symfony, c'était la version de PHP installée par XAMPP qui était utilisée, et non celle du conteneur Docker avec PHP 8.2 (que je devais utiliser dans le cadre de mon projet). Après avoir désinstallé XAMPP et nettoyé le PATH, ainsi que redémarré mon ordinateur, cela a permis de résoudre le conflit et m'a assuré que Docker utilisait correctement la version PHP requise. Ce nettoyage a été une étape clé pour garantir que toutes les commandes Symfony et Composer fonctionnaient comme prévu.

Fichier HTML corrompu :

Lors du processus d'installation et de configuration du projet, un fichier HTML corrompu a été téléchargé plusieurs fois, ce qui a causé des erreurs pendant l'exécution des commandes. Ce fichier semblait être invalide et empêchait toute action dans le répertoire de travail, notamment en tentant d'accéder au dossier /var/www/html.
Voici un exemple de ce que le terminal affichait lors de l'exécution des commandes :
```bash
root@1e334afdc0a6:/var/www/html# ls -la
ls: cannot open directory '.': No such file or directory
root@1e334afdc0a6:/var/www/html# cd ..
root@1e334afdc0a6:/var/www# ls -la
ls: cannot access 'html': No such file or directory
total 8
drwxr-xr-x 3 root root 4096 Feb  4 04:22 .
drwxr-xr-x 1 root root 4096 Feb  4 04:22 ..
d????????? ? ?    ?       ?            ? html
root@1e334afdc0a6:/var/www#
```
Comme on peut le voir dans les logs ci-dessus, le système ne pouvait même pas accéder au répertoire html, ce qui bloquait l'exécution des commandes et empêchait la bonne mise en place de l'environnement de travail. Cela ressemblait à une sorte de fichier illisible, avec des permissions corrompues qui empêchaient toute manipulation.

Bien que je n'ai pas de capture d'écran du fichier, il était visuellement étrange avec des caractères de permissions indéfinis (d?????????) et un comportement qui ne correspondait pas à un répertoire valide. Après avoir nettoyé les caches et supprimé les fichiers corrompus, le projet a pu être réinstallé et fonctionner normalement.

![Symfony 7.2.3](/Job07/UNIT_SYMFONY/image/image14.png)
