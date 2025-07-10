# Church Newsletter - Frontend

Sistema de newsletter da paróquia com frontend React e backend Node.js.

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- Docker e Docker Compose (para executar o backend)

### 1. Executar o Backend
```bash
# Na raiz do projeto
docker-compose up --build -d
```

### 2. Executar o Frontend
```bash
cd church-newsletter
npm install
npm run dev
```

O frontend estará disponível em: http://localhost:5173

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na pasta `church-newsletter`:

```env
VITE_API_URL=http://localhost:3001/api
VITE_USE_MOCK_FALLBACK=true
```

### Credenciais de Acesso
- **Admin**: admin@lourdesdoellery.com / admin123
- **Editor**: (criar via backend)

## 📱 Funcionalidades

### Páginas Públicas
- **Home**: Notícias, anúncios, horários de missa e aniversariantes
- **Parish**: Informações da paróquia
- **News Detail**: Detalhes das notícias

### Páginas Protegidas
- **Dashboard**: Área administrativa (requer login)
- **Login**: Autenticação de usuários

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
├── contexts/           # Contextos (Auth)
├── hooks/              # Hooks personalizados
├── pages/              # Páginas da aplicação
├── services/           # Serviços de API
├── types/              # Tipos TypeScript
├── data/               # Dados mockados (fallback)
└── config/             # Configurações
```

## 🔌 Integração com API

O frontend se conecta automaticamente com o backend via:
- **Base URL**: http://localhost:3001/api
- **Endpoints principais**:
  - `/auth/*` - Autenticação
  - `/news/*` - Notícias
  - `/announcements/*` - Anúncios
  - `/mass-schedule/*` - Horários de missa
  - `/birthdays/*` - Aniversariantes

### Fallback para Dados Mockados
Se a API não estiver disponível, o sistema usa dados mockados automaticamente.

## 🎨 Estilização

- **Tailwind CSS** para estilização
- **Cores da paróquia**:
  - `church-blue`: #1e40af
  - `church-gold`: #f59e0b
  - `church-green`: #059669
  - `church-red`: #dc2626

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

### Docker
```bash
docker build -t church-newsletter .
docker run -p 80:80 church-newsletter
```

## 📝 Desenvolvimento

### Adicionando Novos Componentes
1. Crie o componente em `src/components/`
2. Adicione os tipos em `src/types/`
3. Crie hooks se necessário em `src/hooks/`
4. Atualize a documentação

### Adicionando Novas Páginas
1. Crie a página em `src/pages/`
2. Adicione a rota em `src/App.tsx`
3. Atualize a navegação se necessário

## 🔒 Segurança

- Autenticação JWT
- Rotas protegidas
- Validação de entrada
- CORS configurado

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento. 