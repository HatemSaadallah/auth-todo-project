import { Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRep}
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('login')
    login(@Body() { email, password }: { email: string, password: string }) {
        return this.userService.login(email, password);
    }
}