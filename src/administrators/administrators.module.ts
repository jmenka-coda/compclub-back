import { Module, forwardRef } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Administrator } from './administrators.model';
import { Rental } from 'src/rentals/rentals.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [AdministratorsService],
  controllers: [AdministratorsController],
  imports: [
    SequelizeModule.forFeature([Administrator, Rental]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    AdministratorsService
  ]
})

export class AdministratorsModule { }
