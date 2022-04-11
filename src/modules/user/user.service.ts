import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable, LoggerService } from '@nestjs/common';
import { UserObject } from 'src/common/constants';
import { REPOSITORIES } from 'src/common/constants';
import { comparePassword, ERRORS, hashPassword } from 'src/common/utils';
import { Users } from './user.model';
import { generateToken } from 'src/common/utils/jwt';
import {Cache} from 'cache-manager';
import { UserDto } from './dto/UserDto.dto';
import { SignupDto } from './dto/SignupDto';
import { LoginUserDto } from './dto/login.dto';



@Injectable()
export class UserService {
  
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: typeof Users,
    @Inject(CACHE_MANAGER) 
    private cacheManager: Cache
  ) {}

  makeUserObject(user: Users, token: string): UserObject {
    return {
      id: user.id,
      username: user.username,
      token: token,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
    };
  }
  async login(userLoginInfo: LoginUserDto): Promise<UserObject> {
    const { username, password } = userLoginInfo;
    
    const user = await this.userRepository.findOne({
      where: { username },
    });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new HttpException(ERRORS.LOGIN_ERROR, HttpStatus.BAD_REQUEST);
    }
    let token: string = generateToken(user);
    delete user.password;
    await this.cacheManager.set('token', token, { ttl: 60 * 60 * 24 });
    await this.cacheManager.set('user', user['dataValues'], { ttl: 60 * 60 * 24 });
    // let tokenOfUser = await this.cacheManager.get('token');
    
    // console.log("Token: ", tokenOfUser);
    return this.makeUserObject(user, token);
  }

  getAllUsers(): Promise<Users[]> {
    return this.userRepository.findAll();
  }

  getUserByUsername(username: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { username },
    });
  }
  
  deleteUserById(id: number): Promise<number> {
    return this.userRepository.destroy({
      where: { id },
    });
  }

  getUserIdByUsername(username: string): Promise<number> {
    return this.userRepository
      .findOne({
        where: { username },
      })
      .then((user) => user.id);
  }
  findOne(where): Promise<Users> {
    return this.userRepository.findOne({ where });
  }

  changeRoleForUserById(id: number, role: string): Promise<number> {
    return this.userRepository
      .update({ role: role }, { where: { id }, returning: true })
      .then((user) => user[1][0].id);
  }

 
  async signup(userInfoBody: SignupDto): Promise<Users> {
    const { username, ...restObj } = userInfoBody;
    const user: Users = await this.getUserByUsername(username);

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: ERRORS.USER_ALREADY_EXIST,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    restObj.password = await hashPassword(restObj.password);

    const userCreated = await this.userRepository.create({
      username: username,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),  
      updatedBy: '',
      createdBy: '',
      password: restObj.password,
    });
    delete userCreated.password;
    
    return userCreated;
  }
}
