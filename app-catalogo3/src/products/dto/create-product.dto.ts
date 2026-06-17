import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ description: 'The name of the product', example: 'Burger Classico' })
    @IsString()
    name!: string;

    @ApiProperty({ description: 'The price of the product', example: 10.99 })
    @IsNumber()
    price!: number;

    @ApiProperty({ description: 'The SKU of the product', example: 'SKU12345' })
    @IsString()
    @IsOptional()
    sku?: string;
}

