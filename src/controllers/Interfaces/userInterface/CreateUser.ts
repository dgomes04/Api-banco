import { IsUUID,   IsNotEmpty, IsString, IsNumber, Length, IsEmail, IsHash } from "class-validator";

export class CreateUser {

    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsUUID()
    idReceber: string;

    @IsString()
    @IsNotEmpty()
    nome: string;


    @IsString()
    @IsNotEmpty()
    numero_conta: string;

    @IsString()
    @IsNotEmpty()
    agencia: string;


    @IsNumber()
    @IsNotEmpty()   
    saldo: number


    @IsString()
    @IsNotEmpty()
    cpf: string;


    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    // @IsHash('sha256')
    senha: string;
}   