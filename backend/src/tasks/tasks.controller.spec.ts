import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: Partial<TasksService>;

  const mockTask = { id: 1, title: 'Test Task', completed: false };

  beforeEach(async () => {
    service = {
      findAll: jest.fn().mockResolvedValue([mockTask]),
      findById: jest.fn().mockResolvedValue(mockTask),
      create: jest.fn().mockResolvedValue(mockTask),
      update: jest.fn().mockResolvedValue({ ...mockTask, completed: true }),
      delete: jest.fn().mockResolvedValue(mockTask),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: service }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('deve listar todas as tarefas', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockTask]);
  });

  it('deve retornar uma tarefa por ID', async () => {
    const result = await controller.findById(1);
    expect(result).toEqual(mockTask);
  });

  it('deve criar uma nova tarefa', async () => {
    const result = await controller.create({ title: 'Nova tarefa' });
    expect(result).toEqual(mockTask);
  });

  it('deve atualizar uma tarefa', async () => {
    const result = await controller.update(1, { completed: true });
    expect(result.completed).toBe(true);
  });

  it('deve deletar uma tarefa', async () => {
    const result = await controller.delete(1);
    expect(result).toEqual(mockTask);
  });
});
