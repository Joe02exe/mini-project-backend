import { Body, Controller, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('api/task')
export class TaskController {

    constructor (private taskService : TaskService) {}

    @Post('add')
    async signupUser(@Body() task : Task) {
      console.log(task)
      return this.taskService.createTask(task);
    }

    @Get('getAll')
    async getAll() {
      return this.taskService.getAllTasks();
    }

    @Delete('delete/:id')
    deleteUser(@Param('id') id: string) {
      return this.taskService.deleteTask(id);
    }

    @Put('update')
    updateUser(@Body() task : Task){
      return this.taskService.updateTask(task)
    }

}
