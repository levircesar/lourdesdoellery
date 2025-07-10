#!/bin/bash

echo "🚀 Iniciando deploy do Church Newsletter..."

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker Desktop."
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down

# Remover imagens antigas (opcional)
read -p "Deseja remover imagens antigas? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️ Removendo imagens antigas..."
    docker-compose down --rmi all
fi

# Build e iniciar containers
echo "🔨 Fazendo build e iniciando containers..."
docker-compose up --build -d

# Aguardar um pouco para os containers iniciarem
echo "⏳ Aguardando containers iniciarem..."
sleep 10

# Verificar status dos containers
echo "📊 Status dos containers:"
docker-compose ps

# Verificar logs do backend
echo "📋 Logs do Backend:"
docker-compose logs backend --tail=20

# Verificar logs do frontend
echo "📋 Logs do Frontend:"
docker-compose logs frontend --tail=10

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "🌐 Acesse:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost:3001/api"
echo "   Health Check: http://localhost:3001/api/health"
echo ""
echo "🔐 Credenciais de acesso:"
echo "   Email: admin@lourdesdoellery.com"
echo "   Senha: admin123"
echo ""
echo "📝 Para ver logs em tempo real:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Para parar:"
echo "   docker-compose down" 