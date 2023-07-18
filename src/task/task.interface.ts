import { User } from "src/user/user.interface";
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';


export enum TaskCategory {
    entry1 = "frontend",
    entry2 = "backend",
    entry3 = "db",
    entry4 = "other"
}

export class Task {

    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    category: TaskCategory;

    @IsNotEmpty()
    assignedUser: User;

    @IsNotEmpty()
    createdUser: User;

    description: string;
    
    status: "open" | "in_progress" | "done";
}