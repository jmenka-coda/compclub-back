import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Computer } from './computers.model';
import { CreateComputerDto } from './dto/create-computer.dto';

@Injectable()
export class ComputersService {

    constructor(@InjectModel(Computer) private computerRepository: typeof Computer) { }

    async createComputer(dto: CreateComputerDto){
        const computer = await this.computerRepository.create(dto);
        return computer;
    }

    async getAllComputers(){
        const computers = await this.computerRepository.findAll();
        return computers;
    }
}
