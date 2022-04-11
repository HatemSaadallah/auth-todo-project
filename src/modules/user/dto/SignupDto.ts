import { IsString, IsNotEmpty } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}