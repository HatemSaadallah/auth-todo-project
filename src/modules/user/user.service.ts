import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { UserObject } from 'src/common/constants';
import { REPOSITORIES } from 'src/common/constants';
import { comparePassword, ERRORS, hashPassword } from 'src/common/utils';
import { Users } from './user.model';
import { generateToken } from 'src/common/utils/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: typeof Users,
    
  ) {}
  async login(username: string, password: string): Promise<UserObject> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new HttpException(ERRORS.LOGIN_ERROR, HttpStatus.BAD_REQUEST);
    }

    return {
      id: user.id,
      username: user.username,
      token: generateToken(user.username),
    };
  }

  getAllUsers(): Promise<Users[]> {
    return this.userRepository.findAll();
  }
  
  getUserByUsername(username: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  getUserIdByUsername(username: string): Promise<number> {
    return this.userRepository.findOne({
        where: { username },
    }).then(user => user.id);
  }

  async signup(body): Promise<Object> {
    let { username, ...restObj } = body;
    const user = await this.getUserByUsername(username);

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
    console.log(restObj);
    const userFromDB = await this.userRepository.create({
      username: username,
      updatedAt: new Date(),
      createdBy: username,
      updatedBy: username,
      password: restObj.password,
    });
    return {
      username: username,
      updatedAt: new Date(),
      createdBy: username,
      updatedBy: username,
      // password: generateToken(restObj.password),
    };
  }
}
