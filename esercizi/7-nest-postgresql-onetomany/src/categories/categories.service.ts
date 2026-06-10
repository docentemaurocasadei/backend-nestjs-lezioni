import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category | null> {
    const entity = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(entity);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async findWithPosts(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: { posts: true },
    });
  }
}
