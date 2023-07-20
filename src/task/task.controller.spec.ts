import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';
import { Status, TaskCategory } from '@prisma/client';
import { Task } from './task';

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

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result : Task[] = [{
        "id": "34144",
        "description": "This is the description for Task 1",
        "assignedUser": "john",
        "createdUser": "mason",
        "status": Status.done,
        "name": "task1",
        "category": TaskCategory.frontend
      },
      {
        "id": "3414422",
        "description": "This is the description for Task 2",
        "assignedUser": "harry",
        "createdUser": "raheem",
        "status": Status.done,
        "name": "task2",
        "category": TaskCategory.backend
    }]
      jest.spyOn(service, 'getAllTasks').mockResolvedValue(result);

      expect(await controller.getAll()).toBe(result);
    });
  });

  describe('delete existing task', () => {
    it('should delete existing task', async () => {
      const result : Task = {
        id: "34144",
        description: "This is the description for Task 1",
        assignedUser: "john",
        createdUser: "mason",
        status: Status.done,
        name: "task1",
        category: TaskCategory.frontend
      }

      jest.spyOn(service, 'deleteTask').mockResolvedValue(result);

      expect(await controller.deleteTask("34144")).toBe(result);
    });
  });

  describe('delete non existing task', () => {
    it('should not delete any task', async () => {
      const result : Task = {
        "id": "34144",
        "description": "This is the description for Task 1",
        "assignedUser": "john",
        "createdUser": "mason",
        "status": Status.done,
        "name": "task1",
        "category": TaskCategory.frontend
      }

      jest.spyOn(service, 'deleteTask').mockResolvedValue(null);

      expect(await controller.deleteTask("341424")).toBeNull;
    });
  });

  describe('update existing task', () => {
    it('should update existing task', async () => {
      const result : Task = {
        "id": "34144",
        "description": "This is the description for Task 1",
        "assignedUser": "john",
        "createdUser": "mason",
        "status": Status.done,
        "name": "task1",
        "category": TaskCategory.frontend
      }

      jest.spyOn(service, 'updateTask').mockResolvedValue(result);

      expect(await controller.updateTask(result)).toBe(result);
    });
  });

  describe('update non-existing task', () => {
    it('should update existing task', async () => {
      const result : Task = {
        "id": "34144",
        "description": "This is the description for Task 1",
        "assignedUser": "john",
        "createdUser": "mason",
        "status": Status.done,
        "name": "task1",
        "category": TaskCategory.frontend
      }

      jest.spyOn(service, 'updateTask').mockResolvedValue(null);

      expect(await controller.updateTask(result)).toBe(null);
    });
  });
});
