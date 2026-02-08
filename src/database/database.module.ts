import { Module } from '@nestjs/common';
import { DatabaseTriggersService } from './database-triggers.service';

@Module({
  providers: [DatabaseTriggersService],
})
export class DatabaseModule {}
