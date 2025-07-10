# QA Services - Landing Page & Dashboard

Uma aplicação moderna para serviços de teste e qualidade de software, construída com React, TypeScript, Vite e Tailwind CSS.

## 🚀 Funcionalidades

### Landing Page
- **Design moderno e responsivo** com Tailwind CSS
- **Header inteligente** que minimiza no scroll
- **Seções**: Hero, Serviços, Projetos, Contato
- **Formulário de contato** funcional
- **Links para redes sociais**

### Área Restrita
- **Sistema de autenticação** com login/logout
- **Dashboard administrativo** com estatísticas
- **Cadastro de usuários** (CRUD completo)
- **Controle de permissões** (admin/user)
- **Persistência de sessão**

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **React Router DOM** para navegação
- **Context API** para gerenciamento de estado
- **Docker** para containerização

## 📋 Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**
- **Docker** (opcional, para containerização)

## 🚀 Como Executar

### Opção 1: Desenvolvimento Local

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd qa-services
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute em modo desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra o navegador em `http://localhost:5173`

### Opção 2: Docker

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd qa-services
   ```

2. **Build da imagem Docker**
   ```bash
   docker build -t qa-services .
   ```

3. **Execute o container**
   ```bash
   docker run -p 3000:80 qa-services
   ```

4. **Acesse a aplicação**
   - Abra o navegador em `http://localhost:3000`

### Opção 3: Docker Compose

1. **Crie um arquivo `docker-compose.yml`**
   ```yaml
   version: '3.8'
   services:
     qa-services:
       build: .
       ports:
         - "3000:80"
       restart: unless-stopped
   ```

2. **Execute com Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Acesse a aplicação**
   - Abra o navegador em `http://localhost:3000`

## 🔐 Credenciais de Acesso

### Área Restrita
- **Admin:** `teste` / `teste`
- **Usuário:** `user` / `user`

## 📁 Estrutura do Projeto

```
qa-services/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx      # Header com navegação
│   │   ├── Hero.tsx        # Seção principal
│   │   ├── Services.tsx    # Seção de serviços
│   │   ├── Projects.tsx    # Seção de projetos
│   │   ├── Contact.tsx     # Seção de contato
│   │   ├── Footer.tsx      # Rodapé
│   │   ├── Login.tsx       # Página de login
│   │   ├── Dashboard.tsx   # Dashboard administrativo
│   │   ├── LandingPage.tsx # Página inicial
│   │   └── ProtectedRoute.tsx # Proteção de rotas
│   ├── contexts/           # Contextos React
│   │   └── AuthContext.tsx # Contexto de autenticação
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Ponto de entrada
│   └── index.css           # Estilos globais
├── public/                 # Arquivos públicos
├── Dockerfile              # Configuração Docker
├── nginx.conf              # Configuração Nginx
├── .dockerignore           # Arquivos ignorados pelo Docker
├── tailwind.config.cjs     # Configuração Tailwind
├── postcss.config.cjs      # Configuração PostCSS
├── package.json            # Dependências e scripts
└── README.md               # Este arquivo
```

## 🎨 Personalização

### Cores e Tema
- As cores principais estão definidas no Tailwind CSS
- Gradientes: azul para roxo (`from-blue-600 to-purple-600`)
- Cores neutras: slate (50-900)

### Conteúdo
- **Serviços**: Edite o array `services` em `Services.tsx`
- **Projetos**: Edite o array `projects` em `Projects.tsx`
- **Informações de contato**: Edite em `Contact.tsx`
- **Redes sociais**: Atualize os links em `Contact.tsx`

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Executa ESLint
```

## 🌐 Deploy

### Vercel
1. Conecte seu repositório ao Vercel
2. Configure o build command: `npm run build`
3. Configure o output directory: `dist`
4. Deploy automático a cada push

### Netlify
1. Conecte seu repositório ao Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `dist`
4. Deploy automático a cada push

### Docker (Produção)
```bash
# Build otimizado
docker build -t qa-services:latest .

# Execute em produção
docker run -d -p 80:80 --name qa-services qa-services:latest
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **CSS não carrega**
   - Verifique se o Tailwind está configurado corretamente
   - Execute `npm install` novamente

2. **Login não funciona**
   - Use as credenciais corretas: `teste/teste` ou `user/user`
   - Verifique o console do navegador para logs

3. **Docker não inicia**
   - Verifique se a porta 3000 está disponível
   - Use `docker logs <container-id>` para verificar erros

4. **Roteamento não funciona**
   - Verifique se o nginx.conf está correto
   - Para desenvolvimento local, use `npm run dev`

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, envie um email para contato@qaservices.com ou abra uma issue no repositório.
