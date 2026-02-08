import { Module } from '@nestjs/common';
import { ComputersController } from './computers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Computer } from './computers.model';
import { Specification } from 'src/specifications/specifications.model';
import { ComputersService } from './computers.service';
import { Rental } from 'src/rentals/rentals.model';

@Module({
  controllers: [ComputersController],
  providers: [ComputersService],
  imports: [
    SequelizeModule.forFeature([Computer, Specification, Rental])
  ]
})
export class ComputersModule {}
