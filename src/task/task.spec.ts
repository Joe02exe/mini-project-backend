import { stringified, validateDTO } from '../transfrom';
import { Task,  } from './task';
import { TaskCategory, Status } from '@prisma/client';

describe('Task', () => {
  it('should be defined', () => {
    expect(new Task()).toBeDefined();
  });

  it("task should be validated", async () => {
    const task = {
      name: "this is a name for a task",
      category: TaskCategory.backend,
      createdUser: "erik",
      assignedUser: "erik",
      description: "some description",
    }
    const {instance, errors} = await validateDTO(Task, task)

    expect(errors.length).toBe(0);
    expect(instance.status).toBe(Status.open)
    expect(instance.name).toBe(task.name)
    expect(instance.category).toBe(task.category)
    expect(instance.createdUser).toBe(task.createdUser)
    expect(instance.assignedUser).toBe(task.assignedUser)
    expect(instance.description).toBe(task.description)
  })

  it("task with empty description and empty should be validated", async () => {
    const task = {
      name: "this is a name for a task",
      category: TaskCategory.backend,
      createdUser: "erik",
      assignedUser: "erik",
    }
    const {instance, errors} = await validateDTO(Task, task)

    expect(errors.length).toBe(0);
    expect(instance.status).toBe(Status.open)
    expect(instance.name).toBe(task.name)
    expect(instance.category).toBe(task.category)
    expect(instance.createdUser).toBe(task.createdUser)
    expect(instance.assignedUser).toBe(task.assignedUser)
  })

  it("task with empty name should not be validated", async () => {
    const task = {
      name: "",
      category: TaskCategory.backend,
      createdUser: "erik",
      assignedUser: "erik",
    }
    const {instance, errors} = await validateDTO(Task, task)
    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain("name should not be empty")

  })

  it("task with empty createUser or assignedUser should not be validated", async () => {
    const task = {
      name: "this is a name for a task",
      category: TaskCategory.backend,
      createdUser: "",
      assignedUser: "",
    }
    const {errors} = await validateDTO(Task, task)

    expect(errors.length).toBe(2);
    expect(stringified(errors)).toContain("createdUser should not be empty")
    expect(stringified(errors)).toContain("assignedUser should not be empty")
  })

  it("task with empty category, empty description and empty status should be validated", async () => {
    const task = {
      name: "this is a name for a task",
      createdUser: "anyUser",
      assignedUser: "anotherUser",
    }
    const {instance, errors} = await validateDTO(Task, task)

    expect(errors.length).toBe(0)
    expect(instance.status).toBe(Status.open)
    expect(instance.name).toBe(task.name)
    expect(instance.category).toBe(TaskCategory.other)
    expect(instance.createdUser).toBe(task.createdUser)
    expect(instance.assignedUser).toBe(task.assignedUser)
  })
});
