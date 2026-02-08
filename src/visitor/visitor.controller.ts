import { Body, Controller, Get, Post } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { Visitor } from './visitor.model';
import { CreateVisitorDto } from './dto/create-visitor.dto';

@Controller('visitor')
export class VisitorController {

    constructor(private visitorService: VisitorService){}

    @Post()
    create(@Body() visitorDto: CreateVisitorDto){
        return this.visitorService.createVisitor(visitorDto);
    }

    @Get()
    getAll(){
        return this.visitorService.getAllVisitor();
    }
}
