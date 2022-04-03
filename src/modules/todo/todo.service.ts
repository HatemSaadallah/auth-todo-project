import { Injectable, Inject } from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { TodoDto } from "./dto/index";
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
        console.log(body);
        body = {
            ...body,
            createdBy: body.username,
            updatedBy: body.username,
        };
        
        const createdTodo =  await this.todosRepository.create(body);
        return createdTodo;
    }

    deleteTodoById(id: number): Promise<number> {
        return this.todosRepository.destroy({ where: { id }});
    }
}