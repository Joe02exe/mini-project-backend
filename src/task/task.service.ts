import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/create-task-dto/create-task-dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task, TaskCategory } from './task';

@Injectable()
export class TaskService {
  

    constructor(private prisma : PrismaService) {}

    // async createTask(task: CreateTaskDto): Promise<CreateTaskDto> {
    //     try {
    //       const result = await this.prisma.task.create({data: task});
    //       return result;
    //     } catch (error) {
    
    //       console.error('Error creating task:', error);
    //       throw new Error('Failed to create task.');
    //     }
    //   }
    
      async getAllTasks() {
        try {
          const result = await this.prisma.task.findMany();
          return result;
        } catch (error) {
    
          console.error('Error fetching all tasks:', error);
          throw new Error('Failed to fetch tasks.');
        }
      }
    
      async deleteTask(id: string) {
        try {
          const result = await this.prisma.task.delete({
            where: { id: id },
          });
          return result;
        } catch (error) {
    
          console.error('Error deleting task:', error);
          throw new Error('Failed to delete task.');
        }
      }
    
      async updateTask(task: Task) {
        try {
          const { id, ...updatedTask } = task;
          const result = await this.prisma.task.update({
            where: { id: id },
            data: updatedTask,
          });
          return result;
        } catch (error) {
    
          console.error('Error updating task:', error);
          throw new Error('Failed to update task.');
        }
      }  

}
