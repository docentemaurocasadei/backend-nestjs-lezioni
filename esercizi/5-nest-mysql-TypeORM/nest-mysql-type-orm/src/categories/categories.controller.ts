import { Controller, Delete, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    // Usa questa sintassi abbreviata, è lo standard NestJS
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    // DEVI aggiungere @Param('id') per leggere l'ID dall'URL
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findOne(id);
    }

    @Post()
    // DEVI aggiungere @Body() per leggere il JSON inviato nel Body
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Put(':id')
    // Qui servono entrambi
    async update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.remove(id);
    }
}