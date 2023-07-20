import { Body, Controller, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from '../create-task-dto/create-task-dto';

@Controller('api/task')
@ApiTags('task')
export class TaskController {

    constructor (private taskService : TaskService) {}

    @Post('add')
    async signupTask(@Body() task : CreateTaskDto) {
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
