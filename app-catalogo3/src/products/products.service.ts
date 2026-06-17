import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export interface Product {
    id: number;
    name: string;
    price: number;
}

@Injectable()
export class ProductsService {
    constructor(    ) {}

    private products: Product[] = [
        { id: 1, name: 'Burger Classico', price: 10 },
        { id: 2, name: 'Cheeseburger', price: 11.20 },
        { id: 3, name: 'Double Cheeseburger', price: 14.50 },
    ];
    findAll(): Product[] | null {
        return this.products.length > 0 ? this.products : null;
    }

    findOne(id: number): Product | NotFoundException {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    create(body: any): Product {
        const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0); 
        const newProduct: Product = {
            id: maxId + 1,
            name: body.name,
            price: body.price
        };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, body: any): Product | NotFoundException  {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new NotFoundException('Product not found');
        }
        this.products[productIndex] = { ...this.products[productIndex], ...body };
        return this.products[productIndex];
    }

    remove(id: number): Product | NotFoundException {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new NotFoundException('Product not found');
        }
        return this.products.splice(productIndex, 1)[0];
    }

    search(q: string): Product[] | null {
        const results = this.products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
        return results.length > 0 ? results : null;
    }
}
