import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from "@nestjs/common";
import { verifyToken } from "../utils/jwt";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    ) {}
  async canActivate(
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
      const data: { id: number } = verifyToken(token, 'secret');
      const user = await this.userService.getUserById(data.id);
      request.user = user;
      request.user.userId = user.id;
      return true;
    } catch {
      return false;
    }
  }
}