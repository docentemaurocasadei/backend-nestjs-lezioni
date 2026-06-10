import { Controller, Get } from '@nestjs/common';
import { AllergensService } from './allergens.service';

@Controller('allergens')
export class AllergensController {
    constructor(
        private readonly allergensService: AllergensService
    ) {}
    @Get()
    findAll() {
        return this.allergensService.findAll();
    }
    @Get(':id')
    findOne(id: number) {
        return this.allergensService.findOne(id);
    }
}
