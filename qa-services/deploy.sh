#!/bin/bash

# Script de Deploy para QA Services
# Uso: ./deploy.sh [dev|prod]

set -e

echo "🚀 Iniciando deploy do QA Services..."

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Função para deploy de desenvolvimento
deploy_dev() {
    echo "🔧 Deploy em modo desenvolvimento..."
    
    # Parar containers existentes
    docker-compose down 2>/dev/null || true
    
    # Build da imagem
    echo "📦 Fazendo build da imagem..."
    docker-compose build
    
    # Executar em modo desenvolvimento
    echo "🚀 Iniciando aplicação..."
    docker-compose up -d
    
    echo "✅ Deploy concluído!"
    echo "🌐 Acesse: http://localhost:3000"
    echo "📊 Logs: docker-compose logs -f"
}

# Função para deploy de produção
deploy_prod() {
    echo "🏭 Deploy em modo produção..."
    
    # Parar containers existentes
    docker-compose down 2>/dev/null || true
    
    # Build da imagem com cache limpo
    echo "📦 Fazendo build da imagem (sem cache)..."
    docker-compose build --no-cache
    
    # Executar em modo produção
    echo "🚀 Iniciando aplicação..."
    docker-compose up -d
    
    echo "✅ Deploy de produção concluído!"
    echo "🌐 Acesse: http://localhost:3000"
    echo "📊 Logs: docker-compose logs -f"
}

# Função para limpeza
cleanup() {
    echo "🧹 Limpando recursos..."
    docker-compose down
    docker system prune -f
    echo "✅ Limpeza concluída!"
}

# Função para logs
logs() {
    echo "📊 Exibindo logs..."
    docker-compose logs -f
}

# Função para status
status() {
    echo "📋 Status dos containers:"
    docker-compose ps
}

# Função para ajuda
help() {
    echo "📖 Uso: $0 [comando]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  dev     - Deploy em modo desenvolvimento"
    echo "  prod    - Deploy em modo produção"
    echo "  clean   - Limpar containers e imagens"
    echo "  logs    - Exibir logs dos containers"
    echo "  status  - Status dos containers"
    echo "  help    - Exibir esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  $0 dev      # Deploy desenvolvimento"
    echo "  $0 prod     # Deploy produção"
    echo "  $0 logs     # Ver logs"
}

# Verificar argumentos
case "${1:-dev}" in
    "dev")
        deploy_dev
        ;;
    "prod")
        deploy_prod
        ;;
    "clean")
        cleanup
        ;;
    "logs")
        logs
        ;;
    "status")
        status
        ;;
    "help"|"-h"|"--help")
        help
        ;;
    *)
        echo "❌ Comando inválido: $1"
        echo ""
        help
        exit 1
        ;;
esac 