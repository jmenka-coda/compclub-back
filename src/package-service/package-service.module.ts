import { Module } from '@nestjs/common';
import { PackageServiceService } from './package-service.service';
import { PackageServiceController } from './package-service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PackageService } from './package-service.model';
import { Rental } from 'src/rentals/rentals.model';

@Module({
  providers: [PackageServiceService],
  controllers: [PackageServiceController],
  imports: [
    SequelizeModule.forFeature([PackageService, Rental])
  ],
  exports:[
    PackageServiceService
  ]
})
export class PackageServiceModule { }
