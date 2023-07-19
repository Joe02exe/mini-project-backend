import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TaskService', () => {
  let service: TaskService;
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, PrismaService],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all tasks', async () => {
    const mockResult: any[] = [
      { id: '1', name: 'Task 1' },
      { id: '2', name: 'Task 2' },
    ];
  
    jest.spyOn(prismaService.task, 'findMany').mockResolvedValue(mockResult)
  
    // Call the getAllTasks method from the service
    const result = await service.getAllTasks();
    expect(result).toEqual(mockResult);
  });
  
});
