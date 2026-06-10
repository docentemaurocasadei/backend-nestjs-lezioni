import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Category | null> {
    return this.categoriesRepository.findOne({ where: { id }, relations: ['products'] });
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesRepository.create(data);
    return this.categoriesRepository.save(category);
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Category | null> {
    await this.categoriesRepository.update(id, data);
    return this.categoriesRepository.findOne({ where: { id }, relations: ['products'] });
  }

  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}