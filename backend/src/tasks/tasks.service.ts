import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDto) {
    const existing = await this.findByTitle(data.title);
    if (existing) {
      throw new BadRequestException('Já existe uma tarefa com esse título.');
    }

    return this.prisma.task.create({ data });
  }

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findById(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    });
    if (!task) {
      throw new NotFoundException(`Tarefa não encontrada`);
    }
    return task;
  }

  async findByTitle(title: string) {
    return this.prisma.task.findFirst({
      where: {
        title
      }
    });
  }

  async update(id: number, data: UpdateTasksDto) {
    const task = await this.findById(id);

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.findById(id);
    return this.prisma.task.delete({
      where: {
        id
      }
    });
  }
}
