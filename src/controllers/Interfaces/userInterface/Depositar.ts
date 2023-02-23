import { Decimal } from "@prisma/client/runtime";
import { IsNotEmpty, IsString } from "class-validator";

export class Depositar{
    @IsNotEmpty()
    @IsString()
    cpfEnviar: string;

    @IsNotEmpty()
    @IsString()
    cpfReceber: string;

    @IsNotEmpty()
    valorParaDepositar: Decimal;
}