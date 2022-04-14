import { IsString, IsNotEmpty } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';

export class SignupDto {
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}