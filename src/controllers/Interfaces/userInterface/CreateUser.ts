import { ApiProperty } from "@nestjs/swagger/dist";
import { IsUUID,   IsNotEmpty, IsString, IsNumber, Length, IsEmail, IsHash } from "class-validator";

export class CreateUser {


    @ApiProperty({
        description: 'id em UUID',
        example: "13bb5cba-038f-498a-9866-da32da323a17"
    })
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @ApiProperty({
        description: 'idReceber em UUID',
        example: "64ae44ba-2138-4210-8abf-54c48877088a"
    })
    @IsNotEmpty()
    @IsUUID()
    idReceber: string;

    @ApiProperty({
        description: 'Nome em string',
        example: "Jhon Doe"
    })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({
        description: 'Número da conta',
        example: "123456-7"
    })
    @IsString()
    @IsNotEmpty()
    numero_conta: string;

    @ApiProperty({
        description: 'Agência em string',
        example: "0000"
    })
    @IsString()
    @IsNotEmpty()
    agencia: string;

    @ApiProperty({
        description: 'saldo em number',
        example: 25000.00
    })
    @IsNumber()
    @IsNotEmpty()   
    saldo: number

    @ApiProperty({
        description: 'CPF em string',
        example: "0000000000"
    })
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({
        description: 'Email em string',
        example: "jhondoe@random.com"
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Senha em string',
        example: "senhaaleatoria"
    })
    @IsString()
    @IsNotEmpty()
    senha: string;
}   