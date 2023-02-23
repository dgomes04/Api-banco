import {  IsNotEmpty, IsString } from "class-validator";

export class LoginUser{
     
    @IsNotEmpty()
    @IsString()
    cpf: string;


    @IsNotEmpty()
    @IsString()
    senha: string;
}