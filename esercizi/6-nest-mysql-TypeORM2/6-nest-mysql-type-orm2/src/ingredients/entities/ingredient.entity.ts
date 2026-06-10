import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IngredientAllergen } from "../../ingredient-allergen/entities/ingredient-allergen.entity";
@Entity('ingredients')
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @OneToMany(() => IngredientAllergen, ingredientAllergen => ingredientAllergen.ingredient)
    ingredientAllergens: IngredientAllergen[];
}