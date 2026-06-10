import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsService } from './ingredients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientAllergenService } from '../ingredient-allergen/ingredient-allergen.service';

describe('IngredientsService', () => {
  let service: IngredientsService;

  // Dati finti che simulano il database
  const mockIngredients: Ingredient[] = [
    { id: 1, name: 'Lattuga', ingredientAllergens: [] },
    { id: 2, name: 'Pane', ingredientAllergens: [] },
  ];

  const mockRelations = [
    {
      id: 1,
      ingredient_id: 2,
      allergen_id: 1,
      active: true,
      allergen: { id: 1, name: 'Glutine', ingredientAllergens: [] },
      ingredient: { id: 2, name: 'Pane', ingredientAllergens: [] },
    },
  ];

  const mockIngredientRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockIngredientAllergenService = {
    findActiveByIngredient: jest.fn(),
  };

  beforeEach(async () => {
    // Reset dei mock prima di ogni test per evitare interferenze
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientsService,
        {
          provide: getRepositoryToken(Ingredient),
          useValue: mockIngredientRepository,
        },
        {
          provide: IngredientAllergenService,
          useValue: mockIngredientAllergenService,
        },
      ],
    }).compile();

    service = module.get<IngredientsService>(IngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // -------------------------
  // findAll
  // -------------------------
  describe('findAll', () => {
    it('dovrebbe restituire tutti gli ingredienti', async () => {
      mockIngredientRepository.find.mockResolvedValue(mockIngredients);
      mockIngredientAllergenService.findActiveByIngredient.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Lattuga');
      expect(result[1].name).toBe('Pane');
    });

    it('dovrebbe chiamare findActiveByIngredient una volta per ogni ingrediente', async () => {
      mockIngredientRepository.find.mockResolvedValue(mockIngredients);
      mockIngredientAllergenService.findActiveByIngredient.mockResolvedValue([]);

      await service.findAll();

      expect(mockIngredientAllergenService.findActiveByIngredient).toHaveBeenCalledTimes(2);
      expect(mockIngredientAllergenService.findActiveByIngredient).toHaveBeenCalledWith(1);
      expect(mockIngredientAllergenService.findActiveByIngredient).toHaveBeenCalledWith(2);
    });

    it('dovrebbe aggiungere gli allergeni attivi ad ogni ingrediente', async () => {
      mockIngredientRepository.find.mockResolvedValue(mockIngredients);
      mockIngredientAllergenService.findActiveByIngredient
        .mockResolvedValueOnce([])             // Lattuga → nessun allergene
        .mockResolvedValueOnce(mockRelations);  // Pane → ha il Glutine

      const result = await service.findAll();

      expect(result[0].ingredientAllergens).toHaveLength(0); // Lattuga
      expect(result[1].ingredientAllergens).toHaveLength(1); // Pane
      expect(result[1].ingredientAllergens[0].allergen.name).toBe('Glutine');
    });

    it('dovrebbe restituire array vuoto se non ci sono ingredienti', async () => {
      mockIngredientRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  // -------------------------
  // findOne
  // -------------------------
  describe('findOne', () => {
    it('dovrebbe restituire un ingrediente con i suoi allergeni attivi', async () => {
      mockIngredientRepository.findOne.mockResolvedValue(mockIngredients[1]); // Pane
      mockIngredientAllergenService.findActiveByIngredient.mockResolvedValue(mockRelations);

      const result = await service.findOne(2);

      expect(result).not.toBeNull();
      expect(result!.name).toBe('Pane');
      expect(result!.ingredientAllergens).toHaveLength(1);
      expect(result!.ingredientAllergens[0].allergen.name).toBe('Glutine');
    });

    it('dovrebbe restituire null se l\'ingrediente non esiste', async () => {
      mockIngredientRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne(99);

      expect(result).toBeNull();
      // findActiveByIngredient NON deve essere chiamato se l'ingrediente non esiste
      expect(mockIngredientAllergenService.findActiveByIngredient).not.toHaveBeenCalled();
    });

    it('dovrebbe chiamare findOne con il where corretto', async () => {
      mockIngredientRepository.findOne.mockResolvedValue(mockIngredients[0]);
      mockIngredientAllergenService.findActiveByIngredient.mockResolvedValue([]);

      await service.findOne(1);

      expect(mockIngredientRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  // -------------------------
  // findAllergensOfIngredient
  // -------------------------
  describe('findAllergensOfIngredient', () => {
    it('dovrebbe restituire una lista piatta di Allergen', async () => {
      mockIngredientAllergenService.findActiveByIngredient.mockResolvedValue(mockRelations);

      const result = await service.findAllergensOfIngredient(2);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Glutine'); // oggetto Allergen, non IngredientAllergen
      expect(result[0]).not.toHaveProperty('ingredient_id'); // verifica che NON sia un IngredientAllergen
    });

    it('dovrebbe restituire array vuoto se non ci sono allergeni attivi', async () => {
      mockIngredientAllergenService.findActiveByIngredient.mockResolvedValue([]);

      const result = await service.findAllergensOfIngredient(1);

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('dovrebbe chiamare findActiveByIngredient con l\'id corretto', async () => {
      mockIngredientAllergenService.findActiveByIngredient.mockResolvedValue([]);

      await service.findAllergensOfIngredient(5);

      expect(mockIngredientAllergenService.findActiveByIngredient).toHaveBeenCalledWith(5);
    });
  });
});