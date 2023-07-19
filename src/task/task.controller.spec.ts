import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TaskController', () => {
  let service : TaskService;
  let controller: TaskController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, PrismaService],
    }).compile();

    service = module.get<TaskService>(TaskService);
    controller = module.get<TaskController>(TaskController);
    prismaService = module.get<PrismaService>(PrismaService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should return an array of cats', async () => {
  //     const result : Task[] = [{
  //       "id": "34144",
  //       "description": "This is the description for Task 1",
  //       "assignedUser": "john",
  //       "createdUser": "mason",
  //       "status": Status.open,
  //       "name": "task1",
  //       "category": TaskCategory.frontend
  //     },
  //     {
  //       "id": "3414422",
  //       "description": "This is the description for Task 2",
  //       "assignedUser": "harry",
  //       "createdUser": "raheem",
  //       "status": Status.done,
  //       "name": "task2",
  //       "category": TaskCategory.backend
  //   }]
  //     jest.spyOn(service, 'getAllTasks').mockResolvedValue(result);

  //     expect(await controller.getAll()).toBe(result);
  //   });
  // });
});
