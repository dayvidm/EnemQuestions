FROM php:8.2-fpm

# Instalar dependências necessárias
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql

# Instalar o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Definir o diretório de trabalho
WORKDIR /var/www/html

# Copiar arquivos do projeto para o container
COPY . .

# Instalar as dependências do Composer
RUN composer install --no-dev --optimize-autoloader

# Corrigir permissões
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Expor a porta
EXPOSE 9000

# Comando padrão
CMD ["php-fpm"]
