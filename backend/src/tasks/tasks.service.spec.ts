import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../infra/prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  const mockTask = { id: 1, title: 'Test Task', completed: false };

  const prismaMock = {
    task: {
      findMany: jest.fn().mockResolvedValue([mockTask]),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn().mockResolvedValue(mockTask),
      update: jest.fn().mockResolvedValue({ ...mockTask, completed: true }),
      delete: jest.fn().mockResolvedValue(mockTask),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('Deve criar nova tarefa', async () => {
    prismaMock.task.findFirst.mockResolvedValueOnce(null);
    const result = await service.create({ title: 'New Task' });
    expect(result).toEqual(mockTask);
  });

  it('Deve retornar todas as tarefas', async () => {
    expect(await service.findAll()).toEqual([mockTask]);
  });

  it('Deve retornar tarefa por ID', async () => {
    prismaMock.task.findUnique.mockResolvedValueOnce(mockTask);
    const result = await service.findById(1);
    expect(result).toEqual(mockTask);
  });

  it('Deve lançar exceção se não encontrar tarefa por ID', async () => {
    prismaMock.task.findUnique.mockResolvedValueOnce(null);
    await expect(service.findById(1)).rejects.toThrow(NotFoundException);
  });

  it('Deve atualizar uma tarefa existente', async () => {
    prismaMock.task.findUnique.mockResolvedValueOnce(mockTask);
    prismaMock.task.findFirst.mockResolvedValueOnce(null);
    const result = await service.update(1, { completed: true });
    expect(result.completed).toBe(true);
  });


  it('Deve deletar tarefa existente', async () => {
    prismaMock.task.findUnique.mockResolvedValueOnce(mockTask);
    const result = await service.delete(1);
    expect(result).toEqual(mockTask);
  });
});
