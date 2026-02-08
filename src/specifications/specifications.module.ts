import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Specification } from './specifications.model';
import { SpecificationsController } from './specifications.controller';
import { SpecificationsService } from './specifications.service';
import { Computer } from 'src/computers/computers.model';

@Module({
    controllers: [SpecificationsController],
    providers: [SpecificationsService],
    imports: [
        SequelizeModule.forFeature([Specification, Computer])
    ]
})
export class SpecificationsModule { }
