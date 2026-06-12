import { Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get()
    findAll(){
        return 'Lista dei prodotti';
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return `Dettaglio prodotto ${id}`;
    }

    @Post()
    create(@Body() body: any){
        return {
            message: 'Prodotto creato',
            data: body
        };
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any){
        return {
            message: `Prodotto ${id} aggiornato`,
            data: body
        };
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return {
            message: `Prodotto ${id} eliminato`
        };
    }
}
