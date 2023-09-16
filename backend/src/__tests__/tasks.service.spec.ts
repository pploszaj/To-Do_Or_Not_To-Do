import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '../interfaces/task.interface';
import { TasksService } from '../tasks.service';
// ... other imports ...

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should get all tasks', () => {
    service.create({
      id: 2,
      content: 'Make money',
      done: false,
    });
    service.create({
      id: 3,
      content: 'Buy car',
      done: false,
    });

    expect(service.getAll()).toEqual([
      { id: 2, content: 'Make money', done: false },
      { id: 3, content: 'Buy car', done: false },
    ]);
  });

  it('should add a task', () => {
    const result: Task = service.create({
      id: 2,
      content: 'Make money',
      done: false,
    });
    expect(result).toEqual({ id: 2, content: 'Make money', done: false });
    expect(service.getAll()).toEqual([
      { id: 2, content: 'Make money', done: false },
    ]);
  });

  it('should delete task', () => {
    service.create({
      id: 2,
      content: 'Make money',
      done: false,
    });
    service.delete(2);
    expect(service.getAll()).toEqual([]);
  });

  it('should toggle done value', () => {
    service.create({
      id: 4,
      content: 'Make money',
      done: false,
    });
    const result: Task = service.toggleStatus(4);
    expect(service.getAll()).toEqual([
      { id: 4, content: 'Make money', done: true },
    ]);
    expect(result).toEqual({ id: 4, content: 'Make money', done: true });
  });
});
