import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Specification } from './specifications.model';
import { CreateSpecificationDto } from './dto/create-specification.dto';

@Injectable()
export class SpecificationsService {

    constructor(@InjectModel(Specification) private specificationRepository: typeof Specification){}

    async createSpecification(dto: CreateSpecificationDto){
        const specification = await this.specificationRepository.create(dto);
        return specification;
    }

    async getAllSpecification(){
        const specifications = await this.specificationRepository.findAll();
        return specifications;
    }
    
    async deleteSpecificationById(id: number){
        const count = await this.specificationRepository.destroy({where: {id}});
        if (count === 0){
            throw new HttpException('This id not find', HttpStatus.BAD_REQUEST);
        }
        return count;
    }
}
