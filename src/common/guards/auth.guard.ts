import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { verifyToken } from "../utils/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token } = request.headers;
    console.log("Token", token);
    if(!token){
        return false;
    }
    try {
      await verifyToken(token, 'secret');
      return true;
    } catch {
      console.log("Error");
      return false;
    }
    // console.log("secret", this.configService.get("jwt").secret);
    // // console.log("key",  this.configService.get("jwt").secret);
    // if(!decoded){
    //   return false;
    // }
    // return true;
  }
}