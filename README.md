# Church Newsletter - Sistema Completo

Sistema completo de newsletter da paróquia com frontend React, backend Node.js e banco PostgreSQL.

## 🚀 Deploy Rápido

### Pré-requisitos
- Docker Desktop instalado e rodando
- Git
- projeto clone-driver no firebase para gerir o storage do site

### Executar o Sistema Completo

```bash
# 1. Clone o repositório (se ainda não fez)
git clone <url-do-repositorio>
cd cursor

# 2. Execute o script de deploy
./deploy.sh
```

**OU execute manualmente:**
```bash
docker-compose up --build -d
```

## 🌐 Acessos

Após o deploy, acesse:

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

### 🔐 Credenciais de Acesso
- **Email**: admin@lourdesdoellery.com
- **Senha**: admin123

## 📁 Estrutura do Projeto

```
cursor/
├── church-newsletter/          # Frontend React
├── church-newsletter-backend/  # Backend Node.js
├── docker-compose.yml         # Configuração Docker
├── deploy.sh                  # Script de deploy
└── README.md                  # Este arquivo
```

## 🔧 Comandos Úteis

### Ver logs em tempo real
```bash
docker-compose logs -f
```

### Ver logs de um serviço específico
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Parar todos os serviços
```bash
docker-compose down
```

### Reiniciar um serviço
```bash
docker-compose restart backend
docker-compose restart frontend
```

### Acessar container do backend
```bash
docker-compose exec backend sh
```

### Verificar status dos containers
```bash
docker-compose ps
```

## 🛠️ Desenvolvimento

### Executar apenas o backend
```bash
cd church-newsletter-backend
npm install
npm run dev
```

### Executar apenas o frontend
```bash
cd church-newsletter
npm install
npm run dev
```

### Banco de dados local
```bash
# Instalar PostgreSQL localmente
# Criar banco: church_newsletter
# Usar as credenciais do .env
```

## 🔍 Troubleshooting

### Problema: Docker não está rodando
```bash
# Inicie o Docker Desktop
# Verifique se está funcionando:
docker --version
docker info
```

### Problema: Porta já em uso
```bash
# Verifique o que está usando a porta:
netstat -ano | findstr :80
netstat -ano | findstr :3001
netstat -ano | findstr :5432

# Pare o processo ou mude as portas no docker-compose.yml
```

### Problema: Containers não iniciam
```bash
# Verifique os logs:
docker-compose logs

# Reconstrua as imagens:
docker-compose down
docker-compose up --build -d
```

### Problema: Frontend não conecta com backend
```bash
# Verifique se o backend está rodando:
curl http://localhost:3001/api/health

# Verifique as variáveis de ambiente no frontend
# O VITE_API_URL deve apontar para http://localhost:3001/api
```

## 📊 Monitoramento

### Health Checks
- **PostgreSQL**: `pg_isready -U postgres -d church_newsletter`
- **Backend**: `http://localhost:3001/api/health`
- **Frontend**: `http://localhost/health`

### Logs
- **Backend**: `docker-compose logs backend`
- **Frontend**: `docker-compose logs frontend`
- **PostgreSQL**: `docker-compose logs postgres`

## 🔒 Segurança

- **JWT**: Tokens de autenticação
- **CORS**: Configurado para localhost
- **Helmet**: Headers de segurança
- **Validação**: Express-validator
- **Senhas**: Hash com bcrypt

## 📝 Variáveis de Ambiente

### Backend (.env)
```env
NODE_ENV=production
PORT=3001
DB_HOST=postgres
DB_PORT=5432
DB_NAME=church_newsletter
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_USE_MOCK_FALLBACK=true
```

## 🚀 Produção

Para deploy em produção:

1. **Altere as variáveis de ambiente**
2. **Configure um domínio real**
3. **Use HTTPS**
4. **Configure backup do banco**
5. **Monitore logs e performance**

## 📞 Suporte

Para problemas ou dúvidas:
- Verifique os logs: `docker-compose logs`
- Consulte a documentação de cada projeto
- Entre em contato com a equipe de desenvolvimento 