import { Module } from '@nestjs/common';
import { DatabaseTriggersService } from './database-triggers.service';
import { DatabaseRequestController } from './database-request.controller';
import { DatabaseRequestService } from './database-request.service';

@Module({
  providers: [DatabaseTriggersService, DatabaseRequestService],
  controllers: [DatabaseRequestController]
})
export class DatabaseModule {}
