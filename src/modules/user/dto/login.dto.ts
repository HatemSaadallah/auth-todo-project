import { IsEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsEmpty()
    @IsString()
    username: string;
    
    @IsEmpty()
    @IsString()
    password: string;
}