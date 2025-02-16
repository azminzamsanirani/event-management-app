import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PublicEventsController } from './public-events.controller'

@Module({
  imports: [PrismaModule],
  controllers: [EventsController, PublicEventsController],
  providers: [EventsService],
})
export class EventsModule { }
