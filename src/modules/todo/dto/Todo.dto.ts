import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsString()
    todoItem: string;
}