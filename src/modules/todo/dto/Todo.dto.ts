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
    
    @IsString()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    todoItem: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    createdBy: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    updatedBy: string;

}