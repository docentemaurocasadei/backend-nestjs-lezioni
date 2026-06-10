// src/ingredient-allergen/entities/ingredient-allergen.entity.ts

import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { Allergen } from '../../allergens/entities/allergen.entity';

@Entity('ingredient_allergen')
export class IngredientAllergen {
    @PrimaryColumn()
    ingredient_id: number;

    @PrimaryColumn()
    allergen_id: number;

@ManyToOne(() => Ingredient, ingredient => ingredient.ingredientAllergens)
    @JoinColumn({ name: 'ingredient_id' })
    ingredient: Ingredient;

    @ManyToOne(() => Allergen, allergen => allergen.ingredientAllergens)
    @JoinColumn({ name: 'allergen_id' })
    allergen: Allergen;
}
