import { Module } from '@nestjs/common';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rental } from './rentals.model';
import { Administrator } from 'src/administrators/administrators.model';
import { PackageService } from 'src/package-service/package-service.model';
import { Visitor } from 'src/visitor/visitor.model';
import { Computer } from 'src/computers/computers.model';
import { PackageServiceModule } from 'src/package-service/package-service.module';

@Module({
    controllers: [RentalsController],
    providers: [RentalsService],
    imports: [
        SequelizeModule.forFeature([Rental, Administrator, PackageService, Visitor, Computer]),
        PackageServiceModule
    ]
})
export class RentalsModule { }
