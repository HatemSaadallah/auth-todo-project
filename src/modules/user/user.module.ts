import { CacheModule, Module } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserProvider } from "./user.provider";
@Module({
    imports: [
        CacheModule.register(),
    ],
    controllers: [UserController],
    providers: [UserService, ...UserProvider],
    exports: [UserService],
})

export class UserModule {}