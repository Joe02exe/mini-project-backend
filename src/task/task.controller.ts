import { Body, Controller, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { identity } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/task')
@ApiTags('task')
export class TaskController {

    constructor (private taskService : TaskService) {}

    @Post('add')
    async signupTask(@Body() task : Task) {
      console.log(task)
      return this.taskService.createTask(task);
    }

    @Get('getAll')
    async getAll() {
      return this.taskService.getAllTasks();
    }

    @Delete('delete/:id')
    deleteTask(@Param('id') id: string) {
      return this.taskService.deleteTask(id);
    }

    @Put('update')
    updateTask(@Body() task : Task){
      return this.taskService.updateTask(task)
    }

}
