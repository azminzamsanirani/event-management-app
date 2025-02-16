import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EventsService {
    findOne(id: string) {
        throw new Error('Method not implemented.');
    }
    constructor(private prisma: PrismaService) { }

    async createEvent(data: CreateEventDto) {
        return this.prisma.event.create({ data });
    }

    async findAll(page: number = 1, limit: number = 10, status?: string, sortBy?: string, sortOrder?: 'asc' | 'desc') {
        const skip = (page - 1) * limit;

        // Define sorting logic
        const orderBy: any = {};
        if (sortBy) {
            orderBy[sortBy] = sortOrder || 'asc';
        }

        // Define filter logic
        const where: any = {};
        if (status) {
            where.status = status;
        }

        // Fetch events with pagination, filtering, and sorting
        const events = await this.prisma.event.findMany({
            where,
            orderBy,
            skip,
            take: limit,
        });

        const total = await this.prisma.event.count({ where });

        return {
            data: events,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findAllEvents() {
        return this.prisma.event.findMany();
    }

    async findOneEvent(id: string) {
        return this.prisma.event.findUnique({ where: { id } });
    }

    async updateEvent(id: string, data: UpdateEventDto) {
        return this.prisma.event.update({ where: { id }, data });
    }

    async deleteEvent(id: string) {
        return this.prisma.event.delete({ where: { id } });
    }

    async update(id: string, updateEventDto: UpdateEventDto) {
        return this.prisma.event.update({
            where: { id },
            data: updateEventDto,
        });
    }
}
