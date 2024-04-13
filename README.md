# Sistema de Upload de Arquivos

Este é um aplicativo Node.js que permite fazer upload de arquivos para um servidor e armazená-los em um banco de dados MySQL.

## Requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

## Instalação

1. Clone este repositório:



2. Instale as dependências:

npm install
npm install --save-dev jest @types/jest
npm install express
npm install suspend

3. Configure o arquivo `.env` com as variáveis de ambiente necessárias, como as credenciais do banco de dados.

## Configuração do Banco de Dados

Este aplicativo requer uma conexão com um banco de dados MySQL. Certifique-se de ter um servidor MySQL em execução e configure as credenciais apropriadas no arquivo `.env`.

## Uso

Para iniciar o servidor, execute o seguinte comando:

sudo systemctl start mysql



O servidor estará disponível em `http://localhost:3000`.

## Testes

Os testes são escritos usando o Jest. Para executar os testes, utilize o seguinte comando:

npm test

Para rodar os testes é necessário configurar o comando em seu arquivo package.json:

"scripts": {
    "test": "jest --passWithNoTests",
    "dev": "tsnd src/services/service.ts"
  }



## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- Jest
- MySQL

## Estrutura do Projeto

sistema-upload-arquivos/
│
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ ├── tests/
│ └── app.ts
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json


## Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests.