import { Body, Controller, Inject, Post, Get, Delete, Param, Put, LoggerService} from '@nestjs/common';
import { SignupDto } from './dto/SignupDto';
import { UserService } from './user.service';
import { Public, Roles } from 'src/common/decorators';
import { RoleStatus } from 'src/common/constants';
import { winstonProvider } from 'src/common/constants';
import { UserDto } from './dto/UserDto.dto';
import { UserInfo } from 'os';
import { Users } from './user.model';
import { LoginUserDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(winstonProvider) 
    private readonly logger: LoggerService,
    private readonly userService: UserService,
    ) {}
  @Get('/')
  @Roles(RoleStatus.ADMIN)

  async getAllUsers() {
    console.log("I am in getAllUsers");
    
    return await this.userService.getAllUsers();
  }
  @Delete('/:id')
  @Roles(RoleStatus.ADMIN)
  async deleteUserById(@Param('id') id: number) {
    return await this.userService.deleteUserById(id);
  }

  @Put('/:id')
  @Roles(RoleStatus.ADMIN)
  async changeRoleForUserById(@Param('id') id: number, @Body() body: { role: string }) {
    this.logger.log('info', `new role ${body.role}`);
    return await this.userService.changeRoleForUserById(id, body.role);
  }

  @Post('login')
  @Public()
  login(@Body() loginInfo: LoginUserDto): Promise<UserDto> {
    return this.userService.login(loginInfo);
  }
  @Post('signup')
  @Public()
  signup(@Body() body: SignupDto): Promise<Users> {
    return this.userService.signup(body);
  }
}