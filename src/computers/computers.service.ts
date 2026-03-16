import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Computer } from './computers.model';
import { CreateComputerDto } from './dto/create-computer.dto';
import { Specification } from 'src/specifications/specifications.model';

@Injectable()
export class ComputersService {

    constructor(@InjectModel(Computer) private computerRepository: typeof Computer) { }

    async createComputer(dto: CreateComputerDto){
        const computer = await this.computerRepository.create(dto);
        return computer;
    }

    async getAllComputers(){
        const computers = await this.computerRepository.findAll({include: Specification});
        return computers;
    }

    async deleteComputerById(id: number){
        const count = await this.computerRepository.destroy({where: {id}});
        if (count === 0){
            throw new HttpException('Id not find', HttpStatus.BAD_REQUEST);
        }
        return count;
    }
}
