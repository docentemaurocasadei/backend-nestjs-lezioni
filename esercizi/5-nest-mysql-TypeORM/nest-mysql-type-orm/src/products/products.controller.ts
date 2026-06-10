import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    @Get()
    async findAll() {
        this.productsService.findAll();
    }
    @Get(':id')
    async findOne() {
        this.productsService.findOne(1);
    }
}
