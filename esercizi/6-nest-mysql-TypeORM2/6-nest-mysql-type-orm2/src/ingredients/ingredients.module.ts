import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { Ingredient } from './entities/ingredient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientAllergen } from 'src/ingredient-allergen/entities/ingredient-allergen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, IngredientAllergen])],
  providers: [IngredientsService],
  controllers: [IngredientsController]
})
export class IngredientsModule {}
