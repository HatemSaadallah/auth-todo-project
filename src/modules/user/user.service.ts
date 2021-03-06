import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { REPOSITORIES, UserObject } from 'src/common/constants';
import { comparePassword, ERRORS, hashPassword } from 'src/common/utils';
import { generateToken } from 'src/common/utils/jwt';
import { LoginUserDto } from './dto/login.dto';
import { SignupDto } from './dto/SignupDto';
import { Users } from './user.model';


@Injectable()
export class UserService {
  
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: typeof Users,

    
  ) {}
  private readonly logger: Logger = new Logger('UserService');
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
  async login(userLoginInfo: LoginUserDto): Promise<any> {
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
    return {user, token};
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
      this.logger.log("user", user);
      return id;
    });
  }

  getUserById(id: number): Promise<Users> {
    return this.userRepository.findOne({
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
