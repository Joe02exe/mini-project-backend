import { User } from "src/user/user.interface";

export enum TaskCategory {
    entry1 = "frontend",
    entry2 = "backend",
    entry3 = "db",
    entry4 = "other"
}

export interface Task {
    id: string;
    name: string;
    category: TaskCategory;
    assignedUser: User;
    createdUser: User;
    description: string;
    status: "open" | "in_progress" | "done";
}