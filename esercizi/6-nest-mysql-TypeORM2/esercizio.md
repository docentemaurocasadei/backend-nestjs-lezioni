# Esercizio — Gestione Ingredienti con Allergeni (NestJS + TypeORM)

## Contesto

Hai un database MySQL chiamato `hamburgeria` con tre tabelle:

```sql
CREATE TABLE ingredient (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE allergen (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE ingredient_allergen (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ingredient_id INT NOT NULL,
    allergen_id INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
    FOREIGN KEY (allergen_id) REFERENCES allergen(id)
);
```

---

## Obiettivo

Crea un'applicazione NestJS che esponga **solo le route `/ingredients`** ma che internamente legga tutte e tre le tabelle tramite TypeORM.

---

## Struttura del progetto richiesta

```
src/
├── ingredients/
│   ├── entities/
│   │   └── ingredient.entity.ts
│   ├── ingredients.module.ts
│   ├── ingredients.service.ts
│   └── ingredients.controller.ts
├── allergens/
│   └── entities/
│       └── allergen.entity.ts
├── ingredient-allergen/
│   ├── entities/
│   │   └── ingredient-allergen.entity.ts
│   ├── ingredient-allergen.module.ts
│   └── ingredient-allergen.service.ts
└── app.module.ts
```

---

## Route da implementare

| Method | Route                        | Descrizione                                      |
|--------|------------------------------|--------------------------------------------------|
| GET    | `/ingredients`               | Tutti gli ingredienti con i loro allergeni attivi |
| GET    | `/ingredients/:id`           | Un ingrediente con i suoi allergeni attivi        |
| GET    | `/ingredients/:id/allergens` | Solo gli allergeni attivi di un ingrediente       |

---

## Requisiti

1. Crea le entity `Ingredient`, `Allergen` e `IngredientAllergen` con le relazioni corrette tra loro
2. Crea un modulo `IngredientAllergenModule` con il suo service ed **esportalo** — senza controller (non serve una route dedicata)
3. Crea `IngredientsModule` con service e controller, che importa `IngredientAllergenModule`
4. Le route devono restituire **solo gli allergeni con `active: true`**
5. La route `GET /ingredients/:id/allergens` deve restituire una **lista piatta di oggetti `Allergen`**, non gli oggetti `IngredientAllergen` interi

---

## Suggerimenti

- Ricorda di usare `exports: [IngredientAllergenService]` nel modulo di giunzione, altrimenti NestJS non permetterà agli altri moduli di usare il service
- Per la lista piatta degli allergeni, pensa a come trasformare un array di `IngredientAllergen` in un array di `Allergen`
- Importa sempre `Repository` da `'typeorm'` e **mai** da `'typeorm/browser'`
