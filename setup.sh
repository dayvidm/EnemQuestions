#!/bin/bash

# echo "🚀 Subindo os contêineres com Docker..."
# docker-compose up --build -d

# echo "⚙️ Instalando dependências do Laravel..."
# docker-compose run --rm api composer install

echo "🔑 Gerando chave do Laravel..."
docker-compose run --rm api php artisan key:generate

# echo "📦 Instalando dependências do React..."
# docker-compose run --rm web npm install

# echo "📂 Aplicando migrações do banco de dados..."
# docker-compose run --rm api php artisan migrate

echo "✅ Configuração concluída!"
