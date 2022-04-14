import { Injectable, Inject } from "@nestjs/common";
import { REPOSITORIES, UserObject } from "src/common/constants";
import { Todos } from "./todo.model";
import { UserService } from "../user/user.service";
import { CreateTodoDto } from "./dto/todo.create.dto";
import { Cache } from "cache-manager";
import { EXCEPTIONS } from "src/common/utils";
@Injectable()
export class TodoService {
    constructor(
        @Inject(REPOSITORIES.TODO_REPOSITORY)
        private todosRepository: typeof Todos,
        private readonly userService: UserService,

    ) { }

    async getAllTodos(): Promise<Todos[]> {
        return this.todosRepository.findAll();
    }
    async getTodosByUsername(user: UserObject): Promise<Todos[]> {
        const userId = user.id;
        return this.todosRepository.findAll({ where: { userId } });
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
    updateTodoById(id: number, todo: Todos): Promise<any> {
        return this.todosRepository.update(todo, { where: { id } });
    }
    async deleteTodoById(userId: number, id: number): Promise<string> {
        const todo: Todos = await this.todosRepository.findOne({ where: { id } });
        
        if(!todo) {
            EXCEPTIONS.TODO_ALREADY_DELETED();
        }
        if (todo.userId !== userId) {
            EXCEPTIONS.USER_NOT_AUTHORIZED();
        }
        // await this.todosRepository.destroy({ where: { id } });
        await this.todosRepository.update({ deletedAt: new Date(), deletedBy: userId }, { where: { id } });
        return "Todo deleted successfully";
    }
}