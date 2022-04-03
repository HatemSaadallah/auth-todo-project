import { Body, Controller, Inject, Post, Logger } from '@nestjs/common';
import { SignupDto } from './dto/SignupDto';
import { UserService } from './user.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) 
    private readonly logger: Logger
    ) {}
  // , private readonly logger: LoggerService
  
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