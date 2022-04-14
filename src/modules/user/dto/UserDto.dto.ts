import { IsNotEmpty, IsDate, IsString, IsNumber } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id?: number;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsString()
  username?: string;

  @IsNotEmpty()
  role?: string; 
  
  @IsNotEmpty()
  @IsDate()
  createdAt?: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt?: Date;

  
  @IsString()
  createdBy?: number;

  @IsString()
  updatedBy?: number;
}