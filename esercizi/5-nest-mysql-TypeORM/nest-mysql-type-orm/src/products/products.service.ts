import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>) {}
    public async findAll(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['categories'] });
    }
    public async findOne(id: number): Promise<Product | null> {
        return this.productRepository.findOneBy({ id });
    }
}
