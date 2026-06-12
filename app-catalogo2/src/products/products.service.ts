import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
    id: string;
    name: string;
    price: number;
}

@Injectable()
export class ProductsService {
    constructor() {}

    private products: Product[] = [
        { id: '1', name: 'Burger Classico', price: 10 },
        { id: '2', name: 'Cheeseburger', price: 11.20 },
        { id: '3', name: 'Double Cheeseburger', price: 14.50 },
    ];
    findAll(): Product[] | null {
        return this.products.length > 0 ? this.products : null;
    }

    findOne(id: string): Product | NotFoundException {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    create(body: any): Product {
        const maxId = this.products.reduce((max, product) => (parseInt(product.id) > max ? parseInt(product.id) : max), 0); 
        const newProduct: Product = {
            id: (maxId + 1).toString(),
            name: body.name,
            price: body.price
        };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: string, body: any): Product | NotFoundException  {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new NotFoundException('Product not found');
        }
        this.products[productIndex] = { ...this.products[productIndex], ...body };
        return this.products[productIndex];
    }

    remove(id: string): Product | NotFoundException {
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
