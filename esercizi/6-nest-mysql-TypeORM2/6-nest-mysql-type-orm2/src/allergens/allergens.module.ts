import { Module } from '@nestjs/common';
import { AllergensService } from './allergens.service';
import { AllergensController } from './allergens.controller';
import { Allergen } from './entities/allergen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientAllergen } from 'src/ingredient-allergen/entities/ingredient-allergen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Allergen,IngredientAllergen])],
  providers: [AllergensService],
  controllers: [AllergensController]
})
export class AllergensModule {}
