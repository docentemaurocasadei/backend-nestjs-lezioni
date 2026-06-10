import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IngredientAllergen } from "../../ingredient-allergen/entities/ingredient-allergen.entity";

@Entity('allergens')
export class Allergen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => IngredientAllergen, ingredientAllergen => ingredientAllergen.allergen)
  ingredientAllergens: IngredientAllergen[];
}
