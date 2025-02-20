import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, UploadedFile, UseInterceptors, Query, Request, UnauthorizedException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { AuthGuard } from '@nestjs/passport';
import { extname } from 'path';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    @UseGuards(AuthGuard('jwt')) // 🔒 Admin only
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('status') status?: string,
        @Query('sortBy') sortBy?: string,
        @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    ) {
        return this.eventsService.findAll(Number(page), Number(limit), status, sortBy, sortOrder);
    }

    @Post()
    @UseGuards(AuthGuard('jwt')) // 🔒 Protected route (Admin only)
    @UseInterceptors(FileInterceptor('thumbnail', {
        storage: diskStorage({
            destination: './uploads/', // Folder to store images
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname)); // Save with unique filename
            },
        }),
    }))
    create(@Body() createEventDto: CreateEventDto, @UploadedFile() file: Express.Multer.File) {
        const fileUrl = file ? `/uploads/${file.filename}` : undefined;
        return this.eventsService.createEvent({ ...createEventDto, thumbnail: fileUrl });
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt')) // 🔒 Protected route (Admin only)
    @UseInterceptors(FileInterceptor('thumbnail', {
        storage: diskStorage({
            destination: './uploads/',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname));
            },
        }),
    }))
    update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @UploadedFile() file: Express.Multer.File) {
        const fileUrl = file ? `/uploads/${file.filename}` : undefined;
        return this.eventsService.updateEvent(id, { ...updateEventDto, thumbnail: fileUrl });
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async delete(
        @Param('id') id: string,
        @Body('password') password: string,
        @Request() req
    ) {
        if (!req.user || !req.user.userId) {
            throw new UnauthorizedException('User not authenticated');
        }
    
        return this.eventsService.deleteEvent(id, password, req.user.userId);
    }
      
}

@Controller('public/events') // 🔓 Public endpoint
export class PublicEventsController {
    constructor(private readonly eventsService: EventsService) { }

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
