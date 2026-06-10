# Soluzione — Gestione Ingredienti con Allergeni (NestJS + TypeORM)

---

## Entity `Allergen`

```typescript
// allergens/entities/allergen.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IngredientAllergen } from '../../ingredient-allergen/entities/ingredient-allergen.entity';

@Entity('allergen')
export class Allergen {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => IngredientAllergen, ia => ia.allergen)
    ingredientAllergens: IngredientAllergen[];
}
```

---

## Entity `Ingredient`

```typescript
// ingredients/entities/ingredient.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IngredientAllergen } from '../../ingredient-allergen/entities/ingredient-allergen.entity';

@Entity('ingredient')
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => IngredientAllergen, ia => ia.ingredient)
    ingredientAllergens: IngredientAllergen[];
}
```

---

## Entity `IngredientAllergen`

```typescript
// ingredient-allergen/entities/ingredient-allergen.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { Allergen } from '../../allergens/entities/allergen.entity';

@Entity('ingredient_allergen')
export class IngredientAllergen {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ingredient_id: number;

    @Column()
    allergen_id: number;

    @Column({ default: true })
    active: boolean;

    @ManyToOne(() => Ingredient, ingredient => ingredient.ingredientAllergens)
    @JoinColumn({ name: 'ingredient_id' })
    ingredient: Ingredient;

    @ManyToOne(() => Allergen, allergen => allergen.ingredientAllergens)
    @JoinColumn({ name: 'allergen_id' })
    allergen: Allergen;
}
```

---

## `IngredientAllergenService`

```typescript
// ingredient-allergen/ingredient-allergen.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientAllergen } from './entities/ingredient-allergen.entity';

@Injectable()
export class IngredientAllergenService {
    constructor(
        @InjectRepository(IngredientAllergen)
        private readonly ingredientAllergenRepository: Repository<IngredientAllergen>
    ) {}

    findActiveByIngredient(ingredientId: number): Promise<IngredientAllergen[]> {
        return this.ingredientAllergenRepository.find({
            where: { ingredient_id: ingredientId, active: true },
            relations: ['allergen']
        });
    }
}
```

---

## `IngredientAllergenModule`

```typescript
// ingredient-allergen/ingredient-allergen.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientAllergen } from './entities/ingredient-allergen.entity';
import { IngredientAllergenService } from './ingredient-allergen.service';

@Module({
    imports: [TypeOrmModule.forFeature([IngredientAllergen])],
    providers: [IngredientAllergenService],
    exports: [IngredientAllergenService] // ← nessun controller, solo il service esportato
})
export class IngredientAllergenModule {}
```

---

## `IngredientsService`

```typescript
// ingredients/ingredients.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Allergen } from '../allergens/entities/allergen.entity';
import { IngredientAllergenService } from '../ingredient-allergen/ingredient-allergen.service';

@Injectable()
export class IngredientsService {
    constructor(
        @InjectRepository(Ingredient)
        private readonly ingredientRepository: Repository<Ingredient>,
        private readonly ingredientAllergenService: IngredientAllergenService
    ) {}

    async findAll(): Promise<Ingredient[]> {
        const ingredients = await this.ingredientRepository.find();

        for (const ingredient of ingredients) {
            const relations = await this.ingredientAllergenService.findActiveByIngredient(ingredient.id);
            ingredient.ingredientAllergens = relations;
        }

        return ingredients;
    }

    async findOne(id: number): Promise<Ingredient | null> {
        const ingredient = await this.ingredientRepository.findOne({ where: { id } });
        if (!ingredient) return null;

        const relations = await this.ingredientAllergenService.findActiveByIngredient(id);
        ingredient.ingredientAllergens = relations;

        return ingredient;
    }

    // Ritorna una lista piatta di Allergen (non IngredientAllergen)
    async findAllergensOfIngredient(id: number): Promise<Allergen[]> {
        const relations = await this.ingredientAllergenService.findActiveByIngredient(id);
        return relations.map(ia => ia.allergen);
    }
}
```

---

## `IngredientsController`

```typescript
// ingredients/ingredients.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @Get()
    findAll() {
        return this.ingredientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.ingredientsService.findOne(id);
    }

    @Get(':id/allergens')
    findAllergens(@Param('id') id: number) {
        return this.ingredientsService.findAllergensOfIngredient(id);
    }
}
```

---

## `IngredientsModule`

```typescript
// ingredients/ingredients.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { IngredientAllergenModule } from '../ingredient-allergen/ingredient-allergen.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ingredient]),
        IngredientAllergenModule // ← importa il modulo per usare il service
    ],
    providers: [IngredientsService],
    controllers: [IngredientsController]
})
export class IngredientsModule {}
```

---

## Punto chiave 🎯

Il trucco centrale è il `.map()` in `findAllergensOfIngredient`:

```typescript
return relations.map(ia => ia.allergen);
```

Senza il `.map()` otterresti oggetti `IngredientAllergen` invece di oggetti `Allergen` puliti.
L'altra cosa fondamentale è il `exports: [IngredientAllergenService]` nel modulo — senza di quello NestJS lancia un errore di dipendenza non trovata.
