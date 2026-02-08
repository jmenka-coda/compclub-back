import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Visitor } from './visitor.model';
import { CreateVisitorDto } from './dto/create-visitor.dto';

@Injectable()
export class VisitorService {

    constructor(@InjectModel(Visitor) private visitorRepository: typeof Visitor){}

    async createVisitor(dto: CreateVisitorDto){
        const visitor = await this.visitorRepository.create(dto);
        return visitor;
    }

    async getAllVisitor(){
        const visitors = await this.visitorRepository.findAll();
        return visitors;
    }
}
