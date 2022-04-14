import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/modules/user/user.service";
import { verifyToken } from "../utils/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    ) {}
  async canActivate(

    s
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.get<string[]>(
      'public',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { token } = request.headers;
    if (!token) {
      return false;
    }
    
    try {
      const data: { id: number } = verifyToken(token, this.configService.get('JWTKEY'));
      const user = await this.userService.getUserById(data.id);
      request.user = user;
      request.user.userId = user.id;
    } catch {
      return false;
    }
    return true;
  }
}