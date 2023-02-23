# Uma api para bancos ultilizando NestJs e mySQL.

## Bibliotecas

Class-validator, Prisma, Crypto e Express

## EndPoints - /usuario

/criar: end-point para registrar um novo usuário registrando dados passados para a requisição através de seu corpo com o retorno apenas de uma mensagem
<p>{
	"id": "uuid",
		"idReceber": "uuid",
		"nome": "",
		"numero_conta": "",
		"agencia": "0002",
		"saldo": 0,
		"cpf": "",
		"email": "",
		"senha": ""
}
</p>

/logar: end-point para logar um usuário na aplicação e retornar alguns dados para que possam ser consumidos pelo front-end
<p>{
	"cpf" : "",
	"senha": ""
}
</p>

/depositar: end-point para realizar um depósito PIX através do CPF de quem está enviando, CPF de quem irá receber e também o valor a ser transferido - 
 <p>{
	"cpfEnviar": "",
	"cpfReceber": "",
	"valorParaDepositar": 0
}
</p>

## Erros 
<ul>
<li>Tipo 1- {Dado} já existente no banco de dados </li>
<li>Tipo 2- Usuário ou senha inválidos</li>
<li>Tipo 3- CPF Inválido ou inexistente </li>
<li>Tipo 4- Saldo insuficiente para realizar esta transação</li>
</ul>
