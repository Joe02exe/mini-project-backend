import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, TaskController, UserController],
  providers: [AppService, TaskService, UserService, PrismaService
  ],
})
export class AppModule {}
