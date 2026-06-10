import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('products') //localhost:3000/products
export class ProductsController {
    @Get()
    getProducts(): string {
        return 'Elenco dei prodotti';
    }

    @Get('search')
    searchProducts(): string {
        return 'Ricerca dei prodotti';
    }

    @Get(':id') //localhost:3000/products/123
    getProductById(@Param('id') id: string): string {
        return 'Dettagli del prodotto:' + ` ${id}`; //stringa dinamica
    }


    @Post()
    createProduct(): string {
        return 'Creazione di un nuovo prodotto';
    }

    @Put(':id')
    updateProduct(@Param('id') id: string): string {
        return 'Aggiornamento del prodotto:' + `${id}`; //stringa dinamica  
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string): string {
        return 'Eliminazione del prodotto:' + `${id}`; //stringa dinamica
    }


}
