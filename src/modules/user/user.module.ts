import { CacheModule, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserProvider } from "./user.provider";
import { UserService } from "./user.service";

@Module({
    imports: [
        CacheModule.register(),
    ],
    controllers: [UserController],
    providers: [UserService, ...UserProvider],
    exports: [UserService],
})

export class UserModule {}