import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { verifyToken } from "../utils/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token } = request.headers;
    // console.log(1111, token);

    if(!token){
        return false;
    }
    const decoded: any = await verifyToken(token, process.env.JWTJEY);
    console.log(2222, process.env.JWTKEY);
    console.log("decoded", decoded);
    if(!decoded){
        return false;
    }
    return true;
  }
}