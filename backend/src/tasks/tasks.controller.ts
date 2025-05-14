import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova tarefa'})
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso.'})
  @ApiResponse({ status: 400, description: 'Título duplicado.' })
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso.' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma tarefa por ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Título duplicado.' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTasksDto,
  ) {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}
