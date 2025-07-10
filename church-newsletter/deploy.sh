#!/bin/bash

# Script de deploy para Newsletter da Paróquia Santa Maria
# Autor: Sistema de Deploy Automatizado
# Data: $(date)

set -e

echo "🚀 Iniciando deploy da Newsletter da Paróquia Santa Maria..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    error "Docker não está instalado. Por favor, instale o Docker primeiro."
fi

# Verificar se docker-compose está instalado
if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
fi

# Parar e remover container existente se houver
log "🛑 Parando container existente..."
docker-compose down --remove-orphans 2>/dev/null || true

# Remover imagem antiga se existir
log "🧹 Removendo imagem antiga..."
docker rmi church-newsletter:latest 2>/dev/null || true

# Build da nova imagem
log "🔨 Construindo nova imagem Docker..."
docker-compose build --no-cache

# Verificar se o build foi bem-sucedido
if [ $? -ne 0 ]; then
    error "Falha no build da imagem Docker"
fi

# Iniciar o container
log "🚀 Iniciando container..."
docker-compose up -d

# Aguardar o container estar pronto
log "⏳ Aguardando container estar pronto..."
sleep 10

# Verificar se o container está rodando
if ! docker-compose ps | grep -q "Up"; then
    error "Container não está rodando"
fi

# Verificar health check
log "🏥 Verificando health check..."
for i in {1..30}; do
    if curl -f http://localhost/health &>/dev/null; then
        log "✅ Health check passou!"
        break
    fi
    if [ $i -eq 30 ]; then
        error "Health check falhou após 30 tentativas"
    fi
    sleep 2
done

# Verificar se a aplicação está respondendo
log "🌐 Verificando se a aplicação está respondendo..."
if curl -f http://localhost &>/dev/null; then
    log "✅ Aplicação está respondendo corretamente!"
else
    error "Aplicação não está respondendo"
fi

# Mostrar informações do container
log "📊 Informações do container:"
docker-compose ps

# Mostrar logs recentes
log "📋 Logs recentes:"
docker-compose logs --tail=20

echo ""
echo -e "${BLUE}🎉 Deploy concluído com sucesso!${NC}"
echo ""
echo -e "${YELLOW}📱 Acesse a aplicação em:${NC}"
echo -e "   🌐 http://localhost"
echo ""
echo -e "${YELLOW}🔐 Credenciais de teste:${NC}"
echo -e "   👤 Admin: admin / admin123"
echo -e "   👤 Editor: editor / editor123"
echo ""
echo -e "${YELLOW}📋 Comandos úteis:${NC}"
echo -e "   📊 Ver logs: docker-compose logs -f"
echo -e "   🛑 Parar: docker-compose down"
echo -e "   🔄 Reiniciar: docker-compose restart"
echo ""
echo -e "${GREEN}✨ Newsletter da Paróquia Santa Maria está online!${NC}" 