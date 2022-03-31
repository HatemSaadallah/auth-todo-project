import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/SignupDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return this.userService.login(username, password);
  }
  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.userService.signup(body);
  }
}
