# Tutorial de Execução do Backend do Projeto Inv.Sort

Este documento fornece instruções para iniciar o backend do projeto **Inv.Sort** localmente.

## Pré-requisitos

- Node.js e npm instalados. Você pode fazer o download do Node.js [aqui](https://nodejs.org/).
- Acesso a um terminal ou prompt de comando.

## Passos para Iniciar o Backend

1. **Instalar Dependências**

   No diretório raiz do projeto, execute o seguinte comando para instalar as dependências necessárias:

   ```bash
   npm i
2. **Configurar o Arquivo .env**

   Crie um arquivo .env na raiz do projeto com as variáveis de ambiente necessárias. Use o exemplo abaixo para configurar o banco de dados:

   ```bash
   DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>"
- **username**: nome de usuário do banco de dados
- **password**: senha do banco de dados
- **host**: endereço do servidor de banco de dados (ex.: `localhost`)
- **port**: porta do banco de dados (ex.: `3306` para MySQL)
- **database**: nome do banco de dados

3. **Executar Migração do Banco de Dados**

   Após configurar o arquivo .env, execute o seguinte comando para criar as tabelas necessárias no banco de dados:

   ```bash
   npx prisma migrate dev --name init
4. **Iniciar o Servidor com Nodemon**

   Após a instalação, utilize o comando abaixo para iniciar o servidor com Nodemon, permitindo que ele reinicie automaticamente a cada alteração de código:

   ```bash
   npx nodemon src/server
5. **Verificar o Funcionamento**

    O backend geralmente estará disponível em http://localhost:3000 (ou outra porta, dependendo da configuração). Abra esse endereço no navegador simultaneamente ao frontend para visualizar a aplicação.
