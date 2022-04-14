import { Injectable, Inject } from "@nestjs/common";
import { REPOSITORIES, UserObject } from "src/common/constants";
import { Todos } from "./todo.model";
import { UserService } from "../user/user.service";
import { CreateTodoDto } from "./dto/todo.create.dto";
import { Cache } from "cache-manager";
@Injectable()
export class TodoService {
    constructor (
        @Inject(REPOSITORIES.TODO_REPOSITORY)
        private todosRepository: typeof Todos,
        private readonly userService: UserService,

        ) {}

    async getAllTodos(): Promise<Todos[]> {
        return this.todosRepository.findAll();
    }
    async getTodosByUsername(user: UserObject): Promise<Todos[]> {
        const userId = user.id;
        return this.todosRepository.findAll({ where: { userId }});
    }

    async createTodo(createTodoDto: CreateTodoDto, user: any): Promise<Todos> {
        const { todoItem } = createTodoDto;
        
        return this.todosRepository.create({
            todoItem,
            createdBy: user.id,
            updatedBy: user.id,
            userId: user.id,
        }); 
    }

    deleteTodoById(id: number): Promise<number> {
        return this.todosRepository.destroy({ where: { id }});
    }
    
  

}