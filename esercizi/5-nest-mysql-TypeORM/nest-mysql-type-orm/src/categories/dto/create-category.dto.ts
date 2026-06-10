import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {

  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Number)
  @IsInt()
  isActive: number;
}