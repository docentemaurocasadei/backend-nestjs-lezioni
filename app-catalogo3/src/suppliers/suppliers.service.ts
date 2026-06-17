import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export interface Supplier {
    id: number;
    business_name: string;
    vat_number: string;
    location?: string;
    turnover?: number;
}

@Injectable()
export class SuppliersService {
    constructor(    ) {}

    private suppliers: Supplier[] = [
        { id: 1, business_name: 'Alfa s.r.l.', vat_number: 'IT012345678912', location: 'Ancona', turnover: 100000 },
        { id: 2, business_name: 'Beta s.r.l.', vat_number: 'IT987654321098', location: 'Pesaro', turnover: 200000 },
        { id: 3, business_name: 'Gamma s.r.l.', vat_number: 'IT58985588897', location: 'Senigallia', turnover: 300000 },
    ];
    findAll(): Supplier[] | null {
        console.log('suppliers.service.ts: 1 get  ');
        return this.suppliers.length > 0 ? this.suppliers : null;
    }

    findOne(id: number): Supplier | NotFoundException {
        const supplier = this.suppliers.find(supplier => supplier.id === id);
        if (!supplier) {
            throw new NotFoundException('Supplier not found');
        }
        return supplier;
    }

    create(body: any): Supplier {
        const maxId = this.suppliers.reduce((max, supplier) => (supplier.id > max ? supplier.id : max), 0);
        const newSupplier: Supplier = {
            id: maxId + 1,
            business_name: body.business_name,
            vat_number: body.vat_number,
            location: body.location,
            turnover: body.turnover,
        };
        this.suppliers.push(newSupplier);
        return newSupplier;
    }

    update(id: number, body: UpdateSupplierDto): Supplier | NotFoundException  {
        const supplierIndex = this.suppliers.findIndex(supplier => supplier.id === id);
        if (supplierIndex === -1) {
            throw new NotFoundException('Supplier not found');
        }
        this.suppliers[supplierIndex] = { ...this.suppliers[supplierIndex], ...body };
        return this.suppliers[supplierIndex];
    }

    remove(id: number): Supplier | NotFoundException {
        const supplierIndex = this.suppliers.findIndex(supplier => supplier.id === id);
        if (supplierIndex === -1) {
            throw new NotFoundException('Supplier not found');
        }
        return this.suppliers.splice(supplierIndex, 1)[0];
    }

    search(q: string): Supplier[] | null {
        const results = this.suppliers.filter(supplier => supplier.business_name.toLowerCase().includes(q.toLowerCase()));
        return results.length > 0 ? results : null;
    }
}
