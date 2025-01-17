FROM php:8.2-fpm

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_pgsql

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# Definir o diretório de trabalho
WORKDIR /var/www/html

# Copiar todos os arquivos do projeto
COPY . .

# Instalar dependências do Composer
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Expor a porta
EXPOSE 9000

# Comando padrão
CMD ["php-fpm"]
