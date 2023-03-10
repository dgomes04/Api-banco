import { Body, Controller, Post, Res } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { CreateUser } from "./Interfaces/userInterface/CreateUser";
import { LoginUser } from "./Interfaces/userInterface/LoginUser";
import * as bcrypt from 'bcrypt';
import { Response } from "express";
import { Depositar } from "./Interfaces/userInterface/Depositar";
import { randomUUID } from "crypto";
import {  ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger/dist/decorators";

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
   constructor(private readonly prisma: PrismaService) { }

   @Post('/criar')
   @ApiCreatedResponse({
      description: 'Retorna uma mensagem de sucesso'
   })
   @ApiUnauthorizedResponse({
      
      description: 'Retorna um objeto JSON com uma mensagem de erro e o tipo do erro'
   })
   async CreateUser(@Body() body: CreateUser, @Res() response: Response) {
      let erro = {
         status: 0,
         mensagem: '',
         numero: 0
      };

      try {
         const { id, idReceber, nome, numero_conta, agencia, saldo, cpf, email, senha } = body;
         const Salts = 10;
         const hash = await bcrypt.hash(senha, Salts);
         
         const existeCPF = await this.prisma.usuario.findFirst({
            where: {
               cpf: cpf
            },
            select: {
               cpf: true
            }
         })
         const existeEmail = await this.prisma.usuario.findFirst({
            where: {
               email: email
            },
            select: {
               email: true
            }
         })
         if (!existeCPF && !existeEmail) {
            await this.prisma.usuario.create({
               data: {
                  id: id,
                  agencia: agencia,
                  cpf: cpf,
                  nome: nome,
                  numero_conta: numero_conta,
                  saldo: saldo,
                  idReceber: idReceber,
                  email: email,
                  senha: hash

               }
            }).then((dados) => {
               if (dados) {

                  response.status(201).send({
                     Mensagem: "Usu??rio criado com sucesso",
                     StautsCode: 201
                  })

               }
            })
         } else {
            if (existeCPF) {
               erro.mensagem = "CPF ja registrado";
               erro.numero = 1;
               erro.status = 401;
               throw erro;
            }
            if (existeEmail) {
               erro.mensagem = "Email ja registrado";
               erro.numero = 1;
               erro.status = 401;
               throw erro;
            }
            
         }
      } catch (error) {
         var status = error.status;
         const dataEnviar = {
            Mensagem: error.mensagem,
            Tipo: error.numero
         }
         response.status(status).send(dataEnviar)
      }
      

   }
   @ApiOkResponse({description: 'Retorna um JSON com os dados do usu??rio'})
   @ApiBadRequestResponse({description: "Retorna uma mensagem de erro e o tipo do erro"})
   @Post('/logar')
   async Login(@Body() body: LoginUser, @Res() response: Response) {
      const { cpf } = body;
      let erro = {
         status: 0,
         mensagem: '',
         numero: 0
      };
      
      try {
         const dados = await this.prisma.usuario.findFirst({
            where: {
               cpf: cpf
            }, select: {
               senha: true
            }

         })

         if (dados) {
            const isMatch = await bcrypt.compare(body.senha, dados.senha);
            
            if (isMatch) {
               
               
               const dados = await this.prisma.usuario.findFirst({
                  where: {
                     cpf: cpf
                  },
                  select: {
                     cpf: true,
                     email: true,
                     agencia: true,
                     id: true,
                     nome: true,
                     saldo: true,
                     numero_conta: true,
                     idReceber: true
                  }
               })
               response.status(200).send({
                  dados
               })
            }
            else {
               erro.status = 400;
               erro.mensagem = "Usu??rio ou senha inv??lidos";
               erro.numero = 2;
               throw erro;
            }

         }
         else {
            erro.mensagem = "CPF Inv??lido ou inexistente";
            erro.status = 400;
            erro.numero = 3;
            console.log(erro);
            throw erro;
         }
      } catch (error) {
         var status = error.status;
         const dataEnviar = {
            Mensagem: error.mensagem,
            Tipo: error.numero
         }
         response.status(status).send(dataEnviar)
      }
   }
   @ApiOkResponse({description: "Retorna uma mensagem de sucesso"})
   @ApiBadRequestResponse({description: "Retorna um objeto JSON com uma mensagem de erro e o tipo do erro"})
   @Post('/depositar')
   async Pix(@Body() body:Depositar, @Res() response:Response){
      const { cpfEnviar, cpfReceber, valorParaDepositar} = body;
      let erro = {
         status: 0,
         mensagem: '',
         numero: 0
      };
      
      try {

         const {saldo, id} = await this.prisma.usuario.findFirst({
            where: {
               cpf: cpfEnviar
            },
            select: {
               saldo: true,
               id: true
            }
         })
         const usuarioDestino = await this.prisma.usuario.findFirst({
            where: {
               cpf: cpfReceber
            }
         })

         if(usuarioDestino){
            if(saldo >= valorParaDepositar){
               
               const saldoAlterado =  saldo.sub(valorParaDepositar);
               await this.prisma.usuario.update({
                  where: {
                     id: id
                  },
                  data: {
                     saldo: saldoAlterado
                  }
               })
               const saldoUsuarioReceber = await this.prisma.usuario.findFirst({
                  where: {
                     cpf: cpfReceber
                  },
                  select: {
                     saldo: true
                  }
               })
               await this.prisma.usuario.update({
                  where: {
                     id: usuarioDestino.id
                  },
                  data: {
                     saldo: saldoUsuarioReceber.saldo.plus(valorParaDepositar)
                  }
                  
               })
               await this.prisma.transacao.create({
                  data: {
                     valorTransferido: valorParaDepositar,
                     id: randomUUID(),
                     idDestino: id,
                     idUser: usuarioDestino.id
                  }
               })
               response.status(200).send({
                  Mensagem: "Dep??sito realizado com sucesso"
               })
            }else{
               erro.mensagem = "Saldo insuficiente para realizar esta transa????o";
               erro.numero = 4;
               erro.status = 401;
               throw erro;
            }
         }else{
            erro.mensagem = "CPF Inv??lido ou inexistente";
            erro.numero = 3;
            erro.status = 400;
            throw erro
         }
         
      } catch (error) {
         var status = error.status;
         const dataEnviar = {
            Mensagem: error.mensagem,
            Tipo: error.numero
         }
         response.status(status).send(dataEnviar)
      }
   }
 
}