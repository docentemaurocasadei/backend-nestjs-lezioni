import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allergen } from './entities/allergen.entity';

@Injectable()
export class AllergensService {
    constructor(
        @InjectRepository(Allergen)
        private readonly  allergenRepository: Repository<Allergen>  
    ) {}
    findAll(): Promise<Allergen[]> {
        return this.allergenRepository.find({relations: ['ingredientAllergens', 'ingredientAllergens.ingredient']});
    }
    findOne(id: number): Promise<Allergen | null> {
        return this.allergenRepository.findOne({where: {id}, relations: ['ingredientAllergens', 'ingredientAllergens.ingredient']});
    }
}
