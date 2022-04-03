import { Module } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserProvider } from "./user.provider";
@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, ...UserProvider],
})

export class UserModule {}