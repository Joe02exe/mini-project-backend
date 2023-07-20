import { IsDate, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { User } from 'src/user/user';
import { Transform } from 'class-transformer';
import { Status, TaskCategory } from '@prisma/client';




export class Task {

    id : string

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ enum: TaskCategory})
    @IsNotEmpty()
    @IsOptional()
    category: TaskCategory = TaskCategory.other;

    @ApiProperty()
    @IsNotEmpty()
    assignedUser: string;

    @IsNotEmpty()
    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    @IsOptional()
    description: string;

    @IsOptional()
    status: Status = Status.open;
}