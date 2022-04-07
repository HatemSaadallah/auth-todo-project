import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
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

    const decoded: any = verifyToken(token, 'secret');
    // console.log("decoded", decoded);
    if (!decoded) {
      return false;
    }
    return true;
  }
}