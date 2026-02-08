import { Body, Controller, Get, Post } from '@nestjs/common';
import { ComputersService } from './computers.service';
import { CreateComputerDto } from './dto/create-computer.dto';

@Controller('computers')
export class ComputersController {

    constructor(private computerService: ComputersService){}

    @Post()
    create(@Body() computerDto: CreateComputerDto){
        return this.computerService.createComputer(computerDto);
    }

    @Get()
    getAll(){
        return this.computerService.getAllComputers();
    }
}
