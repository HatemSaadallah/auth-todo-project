import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { UserObject } from 'src/common/constants';
import { REPOSITORIES } from 'src/common/constants';
import { comparePassword, ERRORS, hashPassword } from 'src/common/utils';
import { Users } from './user.model';
import { generateToken } from 'src/common/utils/jwt';
import {Cache} from 'cache-manager';
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
  async login(userLoginInfo: LoginUserDto): Promise<Users> {
    const { username, password } = userLoginInfo;

    const user = await this.userRepository.findOne({
      where: { username },
    });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new HttpException(ERRORS.LOGIN_ERROR, HttpStatus.BAD_REQUEST);
    }
    let token: string = generateToken(user);
    user.password = '';
    await this.cacheManager.set('token', token, { ttl: 60 * 60 * 24 });
    await this.cacheManager.set('user', user['dataValues'], { ttl: 60 * 60 * 24 });
    return user;
  }

  getAllUsers(): Promise<Users[]> {
    return this.userRepository.findAll();
  }

  getUserByUsername(username: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { username },
    });
  }
  
  async deleteUserById(id: number): Promise<number> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: ERRORS.USER_NOT_FOUND,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userRepository.destroy({
      where: { id },
    }).then((user) => {
      Logger.log("user", user);
      return id;
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

  changeRoleForUserById(id: number, role: string): Promise<Users> {
    return this.userRepository.scope('basic')
      .update({ role: role }, { where: { id }, returning: true })
      .then((user) => {
        user[1][0].password = '';
        return user[1][0];
      });
  }
  async findOneById(id: number): Promise<Users> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

 
  async signup(userInfoBody: SignupDto): Promise<Users> {
    const { username, ...restObj } = userInfoBody;
    const user: Users = await this.getUserByUsername(username);

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: ERRORS.USER_ALREADY_EXIST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    restObj.password = await hashPassword(restObj.password);

    const userCreated = await this.userRepository.create({
      username: username,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),  
      updatedBy: null,
      createdBy: null,
      password: restObj.password,
    });
    delete userCreated.password;
    
    return userCreated;
  }
}
