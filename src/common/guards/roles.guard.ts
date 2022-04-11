import { Injectable, CanActivate, ExecutionContext, CACHE_MANAGER, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Cache } from "cache-manager";
import { UserObject } from "../constants";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}
    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('type', context.getHandler());
        if (!roles) {
            return true;
        }
        const user: UserObject = await this.cacheManager.get('user');
        if(!user) {
            return false;
        }
        
        return roles.includes(user.role);
    }
}