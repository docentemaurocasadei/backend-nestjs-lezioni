import { Body, Controller, Get, Param, Post, Put, Delete, Query} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ){}

    @Get()
    findAll(){
        return this.productsService.findAll();
    }

    @Get('search')
    search(@Query('q') q: string){
        return this.productsService.search(q);
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productsService.findOne(id);
    }

    @Post()
    create(@Body() body: any){
        return this.productsService.create(body)    ;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any){
        return this.productsService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.productsService.remove(id);
    }
}
