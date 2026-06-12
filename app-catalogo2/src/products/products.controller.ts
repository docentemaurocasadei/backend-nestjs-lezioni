import { Body, Controller, Get, Param, Post, Put, Delete, Query, NotFoundException} from '@nestjs/common';
import { Product, ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ){}

    @Get()
    findAll(): Product[] | null {
        return this.productsService.findAll();
    }

    @Get('search')
    search(@Query('q') q: string): Product[] | null {
        return this.productsService.search(q);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Product | NotFoundException {
        return this.productsService.findOne(id);
    }

    @Post()
    create(@Body() body: any): Product | null {
        return this.productsService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any): Product | NotFoundException {
        return this.productsService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Product | NotFoundException {
        return this.productsService.remove(id);
    }
}
