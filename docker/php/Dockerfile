FROM php:8.3-fpm

# Extensions système nécessaires
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libicu-dev \
    zip \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Extensions PHP requises par Symfony
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl \
    opcache

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuration PHP
COPY docker/php/php.ini /usr/local/etc/php/conf.d/app.ini

WORKDIR /var/www/html

# Droits d'écriture sur var/ (cache, logs)
RUN chown -R www-data:www-data /var/www/html

EXPOSE 9000
