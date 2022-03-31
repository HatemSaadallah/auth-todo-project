import { Inject, Injectable } from "@nestjs/common";
import { UserObject } from "src/common/constants";
import { REPOSITORIES } from "src/common/constants";

@Injectable()
export class UserService {
    constructor(
        @Inject(REPOSITORIES.USER_REPOSITORY)
        private userRepository: typeof Users,
    ) {}
    async login(email: string, password: string): Promise<UserObject> {
        const user = await this.userRepository.findOne({ email });
    }

}