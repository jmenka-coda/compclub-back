import { Module } from '@nestjs/common';
import { VisitorController } from './visitor.controller';
import { VisitorService } from './visitor.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Visitor } from './visitor.model';
import { Rental } from 'src/rentals/rentals.model';

@Module({
  controllers: [VisitorController],
  providers: [VisitorService],
  imports: [
    SequelizeModule.forFeature([Visitor, Rental])
  ]
})
export class VisitorModule {}
