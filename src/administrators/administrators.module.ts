import { Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Administrator } from './administrators.model';
import { Rental } from 'src/rentals/rentals.model';

@Module({
  providers: [AdministratorsService],
  controllers: [AdministratorsController],
  imports: [
    SequelizeModule.forFeature([Administrator, Rental])
  ],
  exports: [
    AdministratorsService
  ]
})

export class AdministratorsModule { }
