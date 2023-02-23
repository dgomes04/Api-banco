import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsString } from "class-validator";

export class LoginUser{
    @ApiProperty({
        description: "CPF para logar",
        example: "00000000000"
    })
    @IsNotEmpty()
    @IsString()
    cpf: string;

    @ApiProperty({
        description: "Senha para logar",
        example: "senhaaleatoria"
    })
    @IsNotEmpty()
    @IsString()
    senha: string;
}