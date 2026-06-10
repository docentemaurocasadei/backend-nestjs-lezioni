import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCategoryDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Number)
  @IsInt()
  isActive: number;
}