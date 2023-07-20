import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from './task';
import { TaskCategory, Status } from '@prisma/client';
import { CreateTaskDto } from '../create-task-dto/create-task-dto';

describe('TaskService', () => {
  let service: TaskService;
  let prismaService: PrismaService
  let tasks : Task[];
  let id = ""



  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, PrismaService],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prismaService = module.get<PrismaService>(PrismaService);
    prismaService.clear()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('addTask()', () => {
    const addTask: CreateTaskDto = {
      name: 'TaskName' ,
      category: TaskCategory.other,
      assignedUser: "user1",
      createdUser: "user2",
      description: "somedescription",
    }
    it('should add task', async () => {
    let task = await service.createTask(addTask)
    expect(task.name).toBe(addTask.name);
    expect(task.category).toBe(addTask.category);
    expect(task.assignedUser).toBe(addTask.assignedUser);
    expect(task.createdUser).toBe(addTask.createdUser);
    expect(task.description).toBe(addTask.description);
    });
  })

  describe('getAllTasks()', () => {
    it('should get all tasks', async () => {
    
      const result = await service.getAllTasks();
      expect(result.length).toEqual(1);
    });
  })

  describe('taskManipulation()', () => {
    //again declare a task that can be modified and deleted

    let id = ""
    const addTask: CreateTaskDto = {
      name: 'TaskName' ,
      category: TaskCategory.other,
      assignedUser: "user1",
      createdUser: "user2",
      description: "somedescription",
    }
    it('should add task with id: 1', async () => {
    await service.createTask(addTask)
    });
    describe('updateTask()', () => {
      it('should update task', async () => {

        const updateTask: Task = {
          id: '',
          name: 'Task 1',
          category: TaskCategory.other,
          assignedUser: "user1",
          createdUser: "user2",
          description: "somedescription",
          status: Status.open
        }
        tasks = await service.getAllTasks();
        const taskToUpdate = tasks.find(task => task.name === 'TaskName');
        if (taskToUpdate) {
          updateTask.id = taskToUpdate.id;
        } else {
          throw new Error("Task to update not found!");
        }
  
        let task = await service.updateTask(updateTask);
        expect(task.name).toBe(updateTask.name);
        expect(task.category).toBe(updateTask.category);
        expect(task.assignedUser).toBe(updateTask.assignedUser);
        expect(task.createdUser).toBe(updateTask.createdUser);
        expect(task.description).toBe(updateTask.description);
      });
      const invalidTask: Task = {
        id: '999',
        name: 'Task 1' ,
        category: TaskCategory.other,
        assignedUser: "u22",
        createdUser: "user2",
        description: "somedescription",
        status: Status.open
      }
      it('should not update non existing task', async () => {
        await service.updateTask(invalidTask)
        .then((task) => expect(task)
        .toBeUndefined())
        .catch((error) => expect(error));
      });  
    });
    describe('deleteTask()', () => {
      

      it('should delete task 1', async () => {
        let id = ""
        tasks = await service.getAllTasks();
        const taskToUpdate = tasks.find(task => task.name === 'TaskName');
        if (taskToUpdate) {
          id = taskToUpdate.id;
        } else {
        throw new Error("Task to update not found!");
        }
        expect(tasks.length).toBe(2);
        const result = await service.deleteTask(id);
        let newTasks = await service.getAllTasks()
        expect(newTasks.length).toBe(1);
      });
  
      it('should not delete task with invalid id', async () => {
          
        let tasks = await service.getAllTasks()
        expect(tasks.length).toBe(1);
        await service.deleteTask("2")
          .then((task) => expect(task)
          .toBeUndefined())
          .catch((error) => expect(error));
        let newTasks = await service.getAllTasks()
        expect(newTasks.length).toBe(1);
      });
    })
    


 
});
})
