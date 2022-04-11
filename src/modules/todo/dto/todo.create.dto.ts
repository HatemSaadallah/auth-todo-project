import { MaxLength, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsOptional()
  @MaxLength(500)
  todoItem?: string;
}