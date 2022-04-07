import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { verifyToken } from "../utils/jwt";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UserService) {}
    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('type', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers.token;

        const username = verifyToken(token, process.env.JWTKEY).username;
        console.log("token", username);
        
        const userData = await this.userService.getUserByUsername(username);
        return userData && roles.includes(userData.role);
    }
}
