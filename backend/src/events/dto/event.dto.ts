import { IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
    @IsString()
    name: string;

    @Type(() => Date)
    @IsDate()
    startDate: Date; // 🔥 Now this will be converted into a Date object

    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @IsString()
    location: string;

    @IsOptional()
    @IsString()
    thumbnail?: string | null;
}

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    thumbnail?: string | null;
}
