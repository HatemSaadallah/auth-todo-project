import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { verifyToken } from "../utils/jwt";
import { Reflector } from "@nestjs/core";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // private readonly configService: ConfigService,
    private readonly reflector: Reflector,
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

    const decoded = verifyToken(token, 'secret');
    Logger.log("decoded", decoded);
    if (decoded === null) {
      return false;
    }
    return true;
  }
}