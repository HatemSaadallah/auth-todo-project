import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class TodoService {
    constructor (
        @Inject(REPOSITORIES.TODO_REPOSITORY)
        private todosRepository: typeof Todos,
}