# Uma api para bancos ultilizando NestJs e mySQL.

## Bibliotecas

Class-validator, Prisma, Crypto, Express e Swagger

## Como ultilizar
<ul>
	<li>Passo 1 - npm install no terminal </li>
	<li>Passo 2 - Criar um arquivo .env como mostra no .envExemplo</li>
	<li>Passo 2 - npx prisma db push no terminal</li>
	<li>Passo 3 - npm run start:dev no terminal</li>
	
	Observação: Necessário possuir mySQL instalado para poder ultilizar e uma tabela disponível para ultilização
</ul>

## Swagger
Para acessar a documentação da API basta acessar http://localhost:3000/api após iniciar a aplicação

## Erros 
<ul>
<li>Tipo 1- {Dado} já existente no banco de dados </li>
<li>Tipo 2- Usuário ou senha inválidos</li>
<li>Tipo 3- CPF Inválido ou inexistente </li>
<li>Tipo 4- Saldo insuficiente para realizar esta transação</li>
</ul>
