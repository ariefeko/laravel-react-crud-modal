FROM php:7.4-fpm

WORKDIR /var/www/html/lar-react-crud

## Install main dependencies
RUN apt-get update \
    && apt-get install -y curl gnupg \
    && apt-get install nano \
    && apt-get install --quiet --yes --no-install-recommends \
        libzip-dev \
        unzip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && apt-get install -y git
    # && pecl install -o -f redis-5.1.1 \
    # && docker-php-ext-enable redis

# Install Nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs \
    && npm -v

# Install node_modules
COPY package*.json ./
RUN npm install

# Cleanup
RUN apt-get update && apt-get autoremove -y

# Auto install composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Create user non-root for project
RUN groupadd --gid 1000 appuser \
    && useradd --uid 1000 -g appuser \
        -G www-data,root --shell /bin/bash \
        --create-home appuser

# Use created user
USER appuser
