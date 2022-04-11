import { Injectable, Inject, Logger, CACHE_MANAGER } from "@nestjs/common";
import { REPOSITORIES, UserObject } from "src/common/constants";
import { TodoDto } from "./dto/index";
import { Todos } from "./todo.model";
import { Users } from "../user/user.model";
import { UserService } from "../user/user.service";
import { verifyToken } from "src/common/utils/jwt";
import { UserDto } from "../user/dto/UserDto.dto";
import { CreateTodoDto } from "./dto/todo.create.dto";
import { Cache } from "cache-manager";
@Injectable()
export class TodoService {
    constructor (
        @Inject(REPOSITORIES.TODO_REPOSITORY)
        private todosRepository: typeof Todos,
        private readonly userService: UserService,

        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
        ) {}

    async getAllTodos(): Promise<Todos[]> {
        return await this.todosRepository.findAll();
    }
    async getTodosByUsername(username: string): Promise<Todos[]> {
        const userId = await this.userService.getUserIdByUsername(username);
        return await this.todosRepository.findAll({ where: { userId }});
    }

    async createTodo(createTodoDto: CreateTodoDto): Promise<Todos> {
        const { todoItem } = createTodoDto;
        const user: UserObject = await this.cacheManager.get('user');
        // user = JSON.parse(user);
        // const owner = await this.userService.findOne({ where: { username } });
        // console.log("user: ", user.token);
        
        return this.todosRepository.create({
            todoItem,
            userId: user.id,
        }); 
    }

    deleteTodoById(id: number): Promise<number> {
        return this.todosRepository.destroy({ where: { id }});
    }
    
  

}