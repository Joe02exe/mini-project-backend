import { User } from "src/user/user.interface";
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


export enum TaskCategory {
    entry1 = "frontend",
    entry2 = "backend",
    entry3 = "db",
    entry4 = "other"
}

export class Task {

    @ApiProperty()

    id: string;

    @IsNotEmpty()
    @ApiProperty()

    @ApiProperty()

    name: string;

    @IsNotEmpty()
    @ApiProperty()

    @ApiProperty()
    category: TaskCategory;

    @IsNotEmpty()
    @ApiProperty()
    assignedUser: User;

    @IsNotEmpty()
    @ApiProperty()
    createdUser: User;

    @ApiProperty()
    description: string;
    
    @ApiProperty()
    status: "open" | "in_progress" | "done";
}