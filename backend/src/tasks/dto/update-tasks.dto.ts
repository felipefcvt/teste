import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTasksDto {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Tarefa atualizada'})
  title?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  completed?: true;
}