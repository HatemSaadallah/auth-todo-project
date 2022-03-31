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
    console.log(token);

    if(!token){
        return false;
    }
    const decoded: any = await verifyToken(token, "secret");
    console.log("decoded", decoded);
    if(!decoded){
        return false;
    }
    return true;
  }
}