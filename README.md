# 🎮 Locadora de Jogos API

> API RESTful desenvolvida para o gerenciamento completo de uma locadora de jogos, cobrindo o controle de acervo, gestão de clientes e regras de negócio para locações e devoluções.

---

## 💻 Sobre o Projeto

Este projeto foi desenvolvido com foco na construção de uma arquitetura sólida para o back-end, aplicando conceitos fundamentais de desenvolvimento web, modelagem relacional e manipulação de dados em tempo real.

### 🎯 Principais Destaques

- **Arquitetura Modular:** Organização clara das rotas com o Next.js App Router (Route Handlers).
- **ORM Moderno:** Mapeamento objeto-relacional eficiente e migrações controladas via Prisma ORM.
- **Ambiente Containerizado:** Banco de dados PostgreSQL isolado e padronizado utilizando Docker Compose.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Framework:** Next.js (App Router / Route Handlers)
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma ORM
- **Infraestrutura / Container:** Docker & Docker Compose

---

## 📌 Status do Desenvolvimento & Recursos

- [x] Modelagem do banco de dados relacional (PostgreSQL + Prisma)
- [x] Ambiente de desenvolvimento padronizado com Docker Compose
- [x] CRUD completo de **Jogos** (`/api/jogos`)
- [x] CRUD completo de **Clientes** (`/api/clientes`)
- [x] Módulo de **Locações** (`/api/locacoes`)
- [x] Validação de dados de entrada na camada da API

---

## 🤖 Endpoints da API

### 🕹️ Jogos (`/api/jogos`)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/jogos` | Retorna a lista completa de jogos cadastrados |
| `POST` | `/api/jogos` | Cadastra um novo jogo no acervo |

### 👤 Clientes (`/api/clientes`)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/clientes` | Retorna a lista completa de clientes |
| `POST` | `/api/clientes` | Cadastra um novo cliente |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18+)
- [Git](https://git-scm.com/)
- [Docker & Docker Compose](https://www.docker.com/)

### Passo a Passo

Instalar as dependências:

```bash
npm install
```

Configurar as Variáveis de Ambiente:

Crie um arquivo `.env` na raiz do projeto e configure a URL de conexão com o PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA_AQUI@localhost:5432/locadora_de_jogos?schema=public"
```

Subir o Banco de Dados com Docker:

```bash
docker compose up -d
```

Executar as Migrações do Prisma:

```bash
npx prisma migrate dev
```

Iniciar o Servidor de Desenvolvimento:

```bash
npm run dev
```

A API estará disponível em http://localhost:3000.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
