import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { User } from 'src/user/user';


export enum TaskCategory {
    "frontend",
    "backend",
    "db",
    "other"
}

export class Task {

    @ApiProperty()
    id: string;

    @IsNotEmpty()
    @ApiProperty()

    @ApiProperty()
    name: string;

    @ApiProperty()
    category: TaskCategory;

    @ApiProperty()
    assignedUser: string;

    @IsNotEmpty()
    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    description: string;
    
    @ApiProperty()
    status: "open" | "in_progress" | "done";
}