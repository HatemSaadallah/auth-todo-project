import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RoleStatus } from 'src/common/constants';
import { Public, Roles } from 'src/common/decorators';
import { ERRORS } from 'src/common/utils';
import { LoginUserDto } from './dto/login.dto';
import { SignupDto } from './dto/SignupDto';
import { UserDto } from './dto/UserDto.dto';
import { Users } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('/')
  @Roles(RoleStatus.ADMIN)
  async getAllUsers() {   
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
    const user = this.userService.findOneById(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: ERRORS.USER_NOT_FOUND,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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