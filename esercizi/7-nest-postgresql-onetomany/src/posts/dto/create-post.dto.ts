import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsInt()
  @IsOptional()
  authorId?: number;

  @IsInt()
  @IsOptional()
  categoryId?: number;
}
