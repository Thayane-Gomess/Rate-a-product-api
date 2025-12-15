# Rate-a-Product API - Guia de Instalação e Tecnologias

## 📋 Sobre o Projeto

API REST para avaliação de produtos com autenticação JWT, construída com Node.js, Express e Prisma ORM. O sistema permite que usuários registrados avaliem produtos com notas de 1 a 5 e comentários.

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos

- **Node.js** v18 ou superior
- **npm** ou **yarn**
- **Git**

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/Thayane-Gomess/Rate-a-product-api.git
cd Rate-a-product-api
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
JWT_SECRET=minha_chave_secreta
```

> ⚠️ **IMPORTANTE**: Altere `JWT_SECRET` para uma chave mais segura em produção!

4. **Configure o banco de dados**

Execute as migrations do Prisma para criar as tabelas:

```bash
npm run prisma:migrate
```

5. **Popule o banco com dados iniciais (opcional)**

```bash
npm run prisma:seed
```

Isso criará:
- Um usuário admin: `admin@teste.com` / `admin123`
- Um usuário comum: `user@teste.com` / `user123`
- Produtos de exemplo
- Avaliações de exemplo

6. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

7. **Acesse a documentação da API**

Abra seu navegador em:
```
http://localhost:3000/api-docs
```

## 🛠️ Tecnologias Utilizadas

### Backend Framework
- **Express 5.2.1** - Framework web minimalista e flexível para Node.js
  - Gerenciamento de rotas HTTP
  - Middleware de parsing JSON
  - Gestão de requisições e respostas

### Banco de Dados
- **SQLite** - Banco de dados relacional leve e embarcado
  - Arquivo local `dev.db`
  - Ideal para desenvolvimento e prototipagem
  - Zero configuração necessária

### ORM (Object-Relational Mapping)
- **Prisma 7.1.0** - ORM moderno para Node.js e TypeScript
  - Type-safe database queries
  - Migrations automáticas
  - Schema declarativo
  - Prisma Client para queries
  - Prisma Studio para visualização de dados

### Autenticação e Segurança
- **bcrypt 6.0.0** - Hashing de senhas
  - Criptografia segura de senhas
  - Salt rounds configurável
  - Proteção contra rainbow tables

- **jsonwebtoken 9.0.3** - Geração e validação de tokens JWT
  - Autenticação stateless
  - Tokens com expiração configurável
  - Verificação de assinatura

### Validação de Dados
- **Zod 4.1.13** - Validação de schemas TypeScript-first
  - Validação de entrada de dados
  - Type inference automático
  - Mensagens de erro customizáveis
  - Schemas reutilizáveis

### CORS
- **cors 2.8.5** - Middleware para habilitar CORS
  - Permite requisições cross-origin
  - Configuração de headers HTTP
  - Essencial para APIs públicas

### Documentação
- **swagger-ui-express 5.0.1** - Interface Swagger UI
  - Documentação interativa da API
  - Testes direto na interface
  - Geração automática a partir de comentários JSDoc

### Configuração
- **dotenv 17.2.3** - Carregamento de variáveis de ambiente
  - Gerenciamento de configurações sensíveis
  - Separação de ambientes (dev/prod)

### Ferramentas de Desenvolvimento

- **nodemon 3.1.0** - Auto-reload do servidor
  - Reinicia automaticamente ao detectar mudanças
  - Agiliza o desenvolvimento

- **ESLint 9.39.1** - Linter JavaScript
  - Mantém código consistente
  - Detecta erros comuns
  - Enforça boas práticas

- **TypeScript 5.9.3** - Superset do JavaScript (Dev)
  - Type checking
  - Integração com Prisma

- **ts-node 10.9.2** - Executor TypeScript para Node.js
  - Execução direta de arquivos .ts
  - Usado em scripts de desenvolvimento

## 📁 Estrutura do Projeto

```
Rate-a-product-api/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── migrations/            # Migrations do Prisma
│   └── seed.js               # Script de população de dados
├── src/
│   ├── config/
│   │   └── prismaClient.js   # Instância do Prisma Client
│   ├── controllers/          # Lógica de controle das rotas
│   │   ├── productController.js
│   │   ├── review.controller.js
│   │   └── user.controller.js
│   ├── middlewares/          # Middlewares customizados
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.js
│   │   └── validateSchema.middleware.js
│   ├── routes/               # Definição de rotas
│   │   ├── products.routers.js
│   │   ├── reviews.routes.js
│   │   └── user.routes.js
│   ├── services/             # Lógica de negócio
│   │   ├── reviews.service.js
│   │   └── user.service.js
│   ├── validations/          # Schemas Zod
│   │   ├── product.schemas.js
│   │   ├── review.schemas.js
│   │   └── user.schemas.js
│   ├── docs/
│   │   └── swagger.js        # Configuração Swagger
│   ├── app.js                # Configuração do Express
│   └── server.js             # Inicialização do servidor
├── .env                      # Variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Modelo de Dados

### User (Usuário)
- `id` - ID único do usuário
- `name` - Nome do usuário
- `email` - Email único para login
- `password` - Senha criptografada
- `role` - Papel do usuário (USER ou ADMIN)
- `createdAt` - Data de criação

### Produto
- `id` - ID único do produto
- `nome` - Nome do produto
- `descricao` - Descrição do produto
- `preco` - Preço do produto
- `createdAt` - Data de criação
- `deletedAt` - Data de exclusão (soft delete)

### Avaliacao (Review)
- `id` - ID único da avaliação
- `nota` - Nota de 1 a 5
- `comentario` - Comentário do usuário
- `createdAt` - Data de criação
- `deletedAt` - Data de exclusão (soft delete)
- `produtoId` - Referência ao produto
- `userId` - Referência ao usuário

## 📡 Endpoints Principais

### Autenticação
- `POST /users/register` - Registrar novo usuário
- `POST /users/login` - Login e geração de token
- `GET /users/profile` - Buscar perfil (requer autenticação)

### Produtos
- `GET /products` - Listar produtos (paginado)
- `POST /products` - Criar produto (apenas ADMIN)
- `PUT /products/:id` - Atualizar produto (apenas ADMIN)
- `DELETE /products/:id` - Deletar produto (apenas ADMIN)

### Avaliações
- `POST /reviews` - Criar avaliação (requer autenticação)
- `GET /reviews/product/:produtoId` - Listar avaliações de um produto
- `GET /reviews/my-reviews` - Minhas avaliações (requer autenticação)
- `PUT /reviews/:id` - Atualizar minha avaliação (requer autenticação)
- `DELETE /reviews/:id` - Deletar minha avaliação (requer autenticação)
- `GET /reviews/product/:produtoId/stats` - Estatísticas de um produto

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento com auto-reload
npm run dev

# Produção
npm start

# Linting
npm run lint

# Gerar Prisma Client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Popular banco de dados
npm run prisma:seed
```

## 🔒 Segurança Implementada

1. **Hashing de Senhas** - bcrypt com 10 salt rounds
2. **JWT Tokens** - Expiração de 1 dia
3. **Validação de Entrada** - Zod schemas em todas as rotas
4. **Middleware de Autenticação** - Proteção de rotas sensíveis
5. **CORS Configurado** - Controle de acesso cross-origin
6. **Soft Delete** - Dados não são removidos permanentemente

## 🐛 Troubleshooting

### Erro: "Token não fornecido"
- Certifique-se de incluir o header `Authorization: Bearer <seu_token>`

### Erro ao executar migrations
```bash
# Resetar banco de dados
npx prisma migrate reset
npx prisma migrate dev
```

### Porta já em uso
- Altere a variável `PORT` no arquivo `.env`

## 👥 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request.
