# Script de Deploy para Windows PowerShell
Write-Host "🚀 Iniciando deploy do Church Newsletter..." -ForegroundColor Green

# Verificar se o Docker está rodando
try {
    docker info | Out-Null
    Write-Host "✅ Docker está rodando" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não está rodando. Por favor, inicie o Docker Desktop." -ForegroundColor Red
    exit 1
}

# Parar containers existentes
Write-Host "🛑 Parando containers existentes..." -ForegroundColor Yellow
docker-compose down

# Perguntar se quer remover imagens antigas
$removeImages = Read-Host "Deseja remover imagens antigas? (y/N)"
if ($removeImages -eq "y" -or $removeImages -eq "Y") {
    Write-Host "🗑️ Removendo imagens antigas..." -ForegroundColor Yellow
    docker-compose down --rmi all
}

# Build e iniciar containers
Write-Host "🔨 Fazendo build e iniciando containers..." -ForegroundColor Yellow
docker-compose up --build -d

# Aguardar um pouco para os containers iniciarem
Write-Host "⏳ Aguardando containers iniciarem..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar status dos containers
Write-Host "📊 Status dos containers:" -ForegroundColor Cyan
docker-compose ps

# Verificar logs do backend
Write-Host "📋 Logs do Backend:" -ForegroundColor Cyan
docker-compose logs backend --tail=20

# Verificar logs do frontend
Write-Host "📋 Logs do Frontend:" -ForegroundColor Cyan
docker-compose logs frontend --tail=10

Write-Host ""
Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Acesse:" -ForegroundColor White
Write-Host "   Frontend: http://localhost" -ForegroundColor Cyan
Write-Host "   Backend API: http://localhost:3001/api" -ForegroundColor Cyan
Write-Host "   Health Check: http://localhost:3001/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔐 Credenciais de acesso:" -ForegroundColor White
Write-Host "   Email: admin@lourdesdoellery.com" -ForegroundColor Cyan
Write-Host "   Senha: admin123" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Para ver logs em tempo real:" -ForegroundColor White
Write-Host "   docker-compose logs -f" -ForegroundColor Cyan
Write-Host ""
Write-Host "🛑 Para parar:" -ForegroundColor White
Write-Host "   docker-compose down" -ForegroundColor Cyan 