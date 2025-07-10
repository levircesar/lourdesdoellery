# API Documentation - Church Newsletter Backend

## Base URL
```
http://localhost:3001/api
```

## Autenticação
A API usa JWT (JSON Web Tokens) para autenticação. Inclua o token no header:
```
Authorization: Bearer <seu_token_jwt>
```

## Endpoints

### 🔐 Autenticação

#### POST /auth/login
Fazer login e obter token JWT
```json
{
  "email": "admin@igreja.com",
  "password": "admin123"
}
```

#### POST /auth/register
Registrar novo usuário (apenas admin)
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@igreja.com",
  "password": "senha123",
  "role": "editor"
}
```

### 📰 Notícias

#### GET /news
Listar todas as notícias (público)
- Query params: `page`, `limit`, `search`, `is_published`

#### GET /news/published
Listar notícias publicadas (público)

#### GET /news/slug/:slug
Buscar notícia por slug (público)

#### GET /news/admin
Listar todas as notícias (admin/editor)

#### GET /news/:id
Buscar notícia por ID (admin/editor)

#### POST /news
Criar nova notícia (admin/editor)
```json
{
  "title": "Título da Notícia",
  "content": "Conteúdo da notícia...",
  "excerpt": "Resumo da notícia",
  "is_published": true
}
```

#### PUT /news/:id
Atualizar notícia (admin/editor)

#### DELETE /news/:id
Remover notícia (admin)

#### PUT /news/:id/publish
Publicar/despublicar notícia (admin/editor)

#### PUT /news/order
Reordenar notícias (admin/editor)
```json
{
  "items": [
    {"id": 1, "order": 1},
    {"id": 2, "order": 2}
  ]
}
```

### 📢 Anúncios

#### GET /announcements
Listar todos os anúncios (público)
- Query params: `page`, `limit`, `search`, `is_published`, `priority`

#### GET /announcements/published
Listar anúncios publicados (público)

#### GET /announcements/active
Listar anúncios ativos e não expirados (público)

#### GET /announcements/admin
Listar todos os anúncios (admin/editor)

#### GET /announcements/:id
Buscar anúncio por ID (admin/editor)

#### POST /announcements
Criar novo anúncio (admin/editor)
```json
{
  "title": "Título do Anúncio",
  "content": "Conteúdo do anúncio...",
  "priority": "high",
  "is_published": true,
  "expires_at": "2024-12-31T23:59:59Z"
}
```

#### PUT /announcements/:id
Atualizar anúncio (admin/editor)

#### DELETE /announcements/:id
Remover anúncio (admin)

#### PUT /announcements/order
Reordenar anúncios (admin/editor)

### ⏰ Horários de Missa

#### GET /mass-schedule
Listar todos os horários (público)
- Query params: `page`, `limit`, `search`, `day_of_week`, `is_active`

#### GET /mass-schedule/active
Listar horários ativos (público)

#### GET /mass-schedule/today
Listar horários de hoje (público)

#### GET /mass-schedule/admin
Listar todos os horários (admin/editor)

#### GET /mass-schedule/:id
Buscar horário por ID (admin/editor)

#### POST /mass-schedule
Criar novo horário (admin/editor)
```json
{
  "day_of_week": 0,
  "time": "18:00",
  "description": "Missa Dominical",
  "is_active": true,
  "special_notes": "Observações especiais"
}
```

#### PUT /mass-schedule/:id
Atualizar horário (admin/editor)

#### DELETE /mass-schedule/:id
Remover horário (admin)

### 🎂 Aniversariantes

#### GET /birthdays
Listar todos os aniversariantes (público)
- Query params: `page`, `limit`, `search`, `month`, `is_active`

#### GET /birthdays/active
Listar aniversariantes ativos (público)

#### GET /birthdays/this-month
Listar aniversariantes do mês atual (público)

#### GET /birthdays/next-month
Listar aniversariantes do próximo mês (público)

#### GET /birthdays/admin
Listar todos os aniversariantes (admin/editor)

#### GET /birthdays/:id
Buscar aniversariante por ID (admin/editor)

#### POST /birthdays
Criar novo aniversariante (admin/editor)
```json
{
  "name": "João Silva",
  "birth_date": "1990-05-15",
  "is_active": true,
  "family_member": "Maria Silva",
  "notes": "Observações"
}
```

#### PUT /birthdays/:id
Atualizar aniversariante (admin/editor)

#### DELETE /birthdays/:id
Remover aniversariante (admin)

### 💰 Dizimistas

#### GET /dizimistas/active
Listar dizimistas ativos (público)

#### GET /dizimistas
Listar todos os dizimistas (admin/editor)
- Query params: `page`, `limit`, `search`, `category`, `is_active`

#### GET /dizimistas/admin
Listar todos os dizimistas (admin/editor)

#### GET /dizimistas/:id
Buscar dizimista por ID (admin/editor)

#### POST /dizimistas
Criar novo dizimista (admin/editor)
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "address": "Rua das Flores, 123",
  "category": "regular",
  "is_active": true,
  "notes": "Observações"
}
```

#### PUT /dizimistas/:id
Atualizar dizimista (admin/editor)

#### DELETE /dizimistas/:id
Remover dizimista (admin)

### 🏛️ Informações da Paróquia

#### GET /parish-info
Listar todas as informações (público)
- Query params: `page`, `limit`, `search`, `type`, `is_active`

#### GET /parish-info/active
Listar informações ativas (público)

#### GET /parish-info/type/:type
Listar informações por tipo (público)
- Tipos: `contact`, `schedule`, `history`, `mission`, `other`

#### GET /parish-info/admin
Listar todas as informações (admin/editor)

#### GET /parish-info/:id
Buscar informação por ID (admin/editor)

#### POST /parish-info
Criar nova informação (admin/editor)
```json
{
  "title": "História da Paróquia",
  "content": "Conteúdo sobre a história...",
  "type": "history",
  "is_active": true,
  "order": 1
}
```

#### PUT /parish-info/:id
Atualizar informação (admin/editor)

#### DELETE /parish-info/:id
Remover informação (admin)

#### PUT /parish-info/order
Reordenar informações (admin/editor)

### 🏥 Health Check

#### GET /health
Verificar status da API (público)
```json
{
  "success": true,
  "message": "API funcionando corretamente",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

## Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `401` - Não autorizado
- `403` - Acesso negado
- `404` - Não encontrado
- `500` - Erro interno do servidor

## Respostas de Erro

```json
{
  "success": false,
  "message": "Mensagem de erro",
  "errors": [
    {
      "field": "campo",
      "message": "Erro específico do campo"
    }
  ]
}
```

## Respostas de Sucesso

```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## Roles e Permissões

- **admin**: Acesso total a todas as funcionalidades
- **editor**: Pode criar, editar e visualizar conteúdo (não pode deletar)
- **user**: Apenas visualização de conteúdo público

## Exemplos de Uso

### Login e Obter Token
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@igreja.com", "password": "admin123"}'
```

### Criar Notícia (com token)
```bash
curl -X POST http://localhost:3001/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token>" \
  -d '{"title": "Nova Notícia", "content": "Conteúdo...", "is_published": true}'
```

### Listar Anúncios Ativos
```bash
curl -X GET http://localhost:3001/api/announcements/active
``` 