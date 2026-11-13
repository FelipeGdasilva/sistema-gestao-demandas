
# Sistema de Gestão de Demandas Internas

Aplicação fullstack desenvolvida para o cadastro, acompanhamento e classificação automática de demandas internas por setor, construída como parte de um desafio técnico.

## Funcionalidades

- **Cadastro e Consulta de Demandas:** Registro completo com título, descrição, setor, status e data de solicitação, além de listagem em tempo real.
- **Classificação Automática de Prioridade:** Demandas que contêm as palavras `"urgente"` ou `"erro"` na descrição são automaticamente classificadas com prioridade **Alta**; as demais recebem prioridade **Normal**.
- **Validação de Dados:** Impedimento de cadastros com campos obrigatórios vazios tanto no frontend quanto na API.
- **Painel de Resumo (Dashboard):** Exibição consolidada do total de demandas e distribuição por prioridade, status e setor.

## Tecnologias Utilizadas

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Banco de Dados & ORM:** PostgreSQL, Prisma ORM

## Como Executar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Felipegdasilva/sistema-gestao-demandas.git
   cd sistema-gestao-demandas
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto com a string de conexão do PostgreSQL:

   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
   ```

4. **Execute as migrations do banco de dados:**

   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

Acesse http://localhost:3000 no navegador para utilizar o sistema.
