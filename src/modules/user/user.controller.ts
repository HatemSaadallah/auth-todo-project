import { Body, Controller, Inject, Post, Logger, Get, Delete, Param } from '@nestjs/common';
import { SignupDto } from './dto/SignupDto';
import { UserService } from './user.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Public, Roles } from 'src/common/decorators';
import { RoleStatus } from 'src/common/constants';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) 
    private readonly logger: Logger
    ) {}
  // , private readonly logger: LoggerService
  @Get('/')
  @Roles(RoleStatus.ADMIN)
  @Public()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Delete('/:id')
  @Roles(RoleStatus.ADMIN)
  @Public()
  async deleteUserById(@Param('id') id: number) {
    return await this.userService.deleteUserById(id);
  }
  
  @Post('login')
  @Public()
  login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return this.userService.login(username, password);
  }
  @Post('signup')
  @Public()
  signup(@Body() body: SignupDto) {
    return this.userService.signup(body);
  }
}