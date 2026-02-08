import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
