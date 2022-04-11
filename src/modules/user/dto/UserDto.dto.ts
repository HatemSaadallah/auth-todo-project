import { IsNotEmpty, IsEmail, IsDate, IsString, IsNumber } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id?: number;

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
  createdBy?: string;

  @IsString()
  updatedBy?: string;
}