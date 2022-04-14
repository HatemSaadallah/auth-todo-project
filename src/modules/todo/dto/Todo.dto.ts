import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class TodoDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
    
    @IsNotEmpty()
    @IsString()
    userId: number;
    
    
    @IsNotEmpty()
    @IsString()
    
    token: string;
    
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    todoItem: string;

    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsString()
    createdBy: string;
    
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsString()
    updatedBy: string;

}