import { Injectable, Inject } from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { Todos } from "./todo.model";

@Injectable()
export class TodoService {
    constructor (
        @Inject(REPOSITORIES.TODO_REPOSITORY)
        private todosRepository: typeof Todos,
    ) {}

    async getAllTodos(): Promise<Todos[]> {
        return await this.todosRepository.findAll();
    }

    async createTodo(body): Promise<Todos> {
        body = {
            ...body,
            updatedAt: new Date(),
            username: "hatem",
            createdBy: "hatem",
            updatedBy: "hatem",
        };
        
        const createdTodo =  await this.todosRepository.create(body);
        return createdTodo;
    }
}