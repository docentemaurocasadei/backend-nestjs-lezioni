import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientsService {
    constructor(
        @InjectRepository(Ingredient)
        private readonly ingredientRepository: Repository<Ingredient>
    ) {}

        async findAll(): Promise<Ingredient[]> {
            return this.ingredientRepository.find({relations: ['ingredientAllergens', 'ingredientAllergens.allergen']});
        }
        async findOne(id: number): Promise<Ingredient | null> {
            return this.ingredientRepository.findOne({where: {id}, relations: ['ingredientAllergens', 'ingredientAllergens.allergen']});
        }
}
