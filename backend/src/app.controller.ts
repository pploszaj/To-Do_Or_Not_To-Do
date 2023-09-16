import { Body, Controller, Get, Post, Param, Delete, Patch} from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
export class AppController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: TaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async getAll(): Promise<Task[]> {
    return this.tasksService.getAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.tasksService.delete(Number(id));
  }

  @Patch(':id')
  async toggleStatus(@Param('id') id: number): Promise<Task | string> {
    return this.tasksService.toggleStatus(Number(id));
  }
}
