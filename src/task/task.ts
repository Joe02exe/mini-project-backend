import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { User } from 'src/user/user';


export enum TaskCategory {
    frontend = "frontend",
    backend = "backend",
    db = "db",
    other = "other",
  }
  

export enum Status {
    open = "open",
    in_progress = "in_progress",
    done = "done",
}

export class Task {

    id : string

    @ApiProperty()
    name: string;

    @ApiProperty({ enum: TaskCategory, default: TaskCategory.other})
    category: TaskCategory;

    @ApiProperty()
    assignedUser: string;

    @IsNotEmpty()
    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    description: string;

    status: Status;
}