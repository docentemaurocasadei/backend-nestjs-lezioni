import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    findAll(){
        return 'lista prodotti';
    }

    findOne(id: string){
        return `prodotto ${id}`;
    }

    create(body: any){
        return `prodotto creato: ${JSON.stringify(body)}`;
    }

    update(id: string, body: any){
        return `prodotto ${id} aggiornato: ${JSON.stringify(body)}`;
    }

    remove(id: string){
        return `prodotto ${id} eliminato`;
    }

    search(q: string){
        return `ricerca prodotti con query: ${q}`;
    }
}
