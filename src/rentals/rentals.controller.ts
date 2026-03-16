import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rentals.dto';

@Controller('rentals')
export class RentalsController {

    constructor(private rentalService: RentalsService){}

    @Post()
    create(@Body() rentalDto: CreateRentalDto){
        return this.rentalService.createRental(rentalDto);
    }

    @Get()
    getAll(){
        return this.rentalService.getAllRental();
    }

    @Delete('/:id')
    deleteById(@Param('id') id: number){
        return this.rentalService.deleteRentalById(id);
    }
}
