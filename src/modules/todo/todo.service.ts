import { Injectable, Inject, ExecutionContext } from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { TodoDto } from "./dto/index";
import { Todos } from "./todo.model";
import { Users } from "../user/user.model";
import { UserService } from "../user/user.service";
import { verifyToken } from "src/common/utils/jwt";

@Injectable()
export class TodoService {
    constructor (
        @Inject(REPOSITORIES.TODO_REPOSITORY)
        private todosRepository: typeof Todos,
        private readonly userService: UserService,
        ) {}

    async getAllTodos(): Promise<Todos[]> {
        return await this.todosRepository.findAll();
    }
    async getTodosByUsername(username: string): Promise<Todos[]> {
        const userId = await this.userService.getUserIdByUsername(username);
        return await this.todosRepository.findAll({ where: { userId }});
    }


    async createTodo(body, headers): Promise<Todos> {
        let username = await verifyToken(headers.token, process.env.JWTKEY);
        console.log("token", username.username);
        
        body = {
            ...body,
            username: username.username,
            userId: await this.userService.getUserIdByUsername(username.username),
            createdBy: username.username,
            updatedBy: username.username,
        };
        
        const createdTodo =  await this.todosRepository.create(body);
        return createdTodo;
    }

    deleteTodoById(id: number): Promise<number> {
        return this.todosRepository.destroy({ where: { id }});
    }
    
  

}