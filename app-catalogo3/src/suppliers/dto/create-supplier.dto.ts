import { IsString } from "class-validator";
import { ApiProperty } from "node_modules/@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateSupplierDto {
    @ApiProperty({ description: 'The business name of the supplier', example: 'Alfa s.r.l.' })
    @IsString()
    business_name!: string;

    @ApiProperty({ description: 'The VAT number of the supplier', example: 'IT012345678912' })
    @IsString()
    vat_number!: string;

    @ApiProperty({ description: 'The location of the supplier', example: 'Ancona' })
    @IsString()
    location?: string;

    @ApiProperty({ description: 'The turnover of the supplier', example: 100000 })
    turnover?: number;
}
