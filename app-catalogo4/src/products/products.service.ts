import { Injectable, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  async findAll() {
    return this.databaseService.query('SELECT * FROM products join product_images on products.id = product_images.product_id');
  }

  async findOne(id: number) {
    const results = await this.databaseService.query('SELECT * FROM products join product_images on products.id = product_images.product_id WHERE products.id = ?', [id]);
    return results[0];

  }

  async search(p: string) {
    return this.databaseService.query('SELECT * FROM products join product_images on products.id = product_images.product_id WHERE products.name LIKE ?', [`%${p}%`]);
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
