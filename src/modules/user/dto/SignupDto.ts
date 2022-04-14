import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from "class-validator";

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