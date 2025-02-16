import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('public/events') // 🔓 Ensure this matches the expected route
export class PublicEventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc'
  ) {
    return this.eventsService.findAll(Number(page), Number(limit), status, sortBy, sortOrder);
  }

  @Get(':id')
  async findOneEvent(@Param('id') id: string) {
      return this.eventsService.findOneEvent(id);
  }
}
