import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime";
import { IsNotEmpty, IsString } from "class-validator";

export class Depositar{
    @ApiProperty({
        description: "CPF de quem irá enviar o pix",
        example: "00000000000"
    })
    @IsNotEmpty()
    @IsString()
    cpfEnviar: string;

    @ApiProperty({
        description: "CPF de quem irá receber o pix",
        example: "00000000000"
    })
    @IsNotEmpty()
    @IsString()
    cpfReceber: string;

    @ApiProperty({
        description: "Valor a ser depositado",
        example: 5000
    })
    @IsNotEmpty()
    valorParaDepositar: Decimal;
}