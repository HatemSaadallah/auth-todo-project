import { CACHE_MANAGER, CanActivate, ExecutionContext, Inject, Injectable, Logger } from "@nestjs/common";
import { verifyToken } from "../utils/jwt";
import { Reflector } from "@nestjs/core";
import {Cache} from 'cache-manager';
import { UserObject } from "../constants";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) 
    private cacheManager: Cache
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
    const user: UserObject = await this.cacheManager.get('user');
    const token = await this.cacheManager.get('token');

    if(!user || !token) {
      return false;
    }
    console.log("cache: ", user);
    
    const decoded = verifyToken(token, 'secret');

    if(decoded === false) return false;

    return decoded.username == user.username;
  }
}