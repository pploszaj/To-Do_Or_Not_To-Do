import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  create(task: Task): Task {
    this.tasks.push(task);
    console.log('here is the list of tasks after adding: ', this.tasks);
    return task;
  }

  delete(id: number): void {
    console.log('id of task to be deleted: ', id);
    this.tasks = this.tasks.filter((task) => {
      console.log('task.id: ', task.id);
      console.log('type of id passed in from react: ', typeof id);
      console.log('type of id in array on the server: ', typeof task.id);
      console.log('check if IDs match: ', task.id === id);
      return id !== task.id;
    });
    console.log('here is list of tasks after deleting: ', this.tasks);
  }

  toggleStatus(id: number): Task {
    console.log('id of task to be toggled: ', id);
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks[taskIndex].done = !this.tasks[taskIndex].done;
    console.log('here is list of tasks after toggling: ', this.tasks);
    return this.tasks[taskIndex];
  }
}
