import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TodoDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
    
    @IsNotEmpty()
    @IsString()
    userId: string;
    
    @IsNotEmpty()
    @IsString()
    token: string;
    
    @IsString()
    todoItem: string;

    @IsNotEmpty()
    @IsString()
    createdBy: string;

    @IsNotEmpty()
    @IsString()
    updatedBy: string;

}