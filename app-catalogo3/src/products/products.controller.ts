import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseIntPipe } from '@nestjs/common';
import { ApiOperation } from 'node_modules/@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('protetta')
  protetta(){
    return { message: 'Questa è una rotta protetta' };  
  }

  @ApiOperation({ summary: 'Search products by name' })
  @Get(':search')
  search(@Param('search') search: string) {
    return this.productsService.search(search);
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiBody({ type: UpdateProductDto })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete a product by ID' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe  ) id: number) {
    return this.productsService.remove(id);
  }

}
