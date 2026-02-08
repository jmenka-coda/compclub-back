import { Body, Controller, Get, Post } from '@nestjs/common';
import { SpecificationsService } from './specifications.service';
import { CreateSpecificationDto } from './dto/create-specification.dto';

@Controller('specifications')
export class SpecificationsController {

    constructor(private specificationService: SpecificationsService){}

    @Post()
    create(@Body() specificationDto: CreateSpecificationDto){
        return this.specificationService.createSpecification(specificationDto);
    }

    @Get()
    getAll(){
        return this.specificationService.getAllSpecification();
    }
}
